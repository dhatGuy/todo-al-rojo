import { DB } from "@/database/db";
import { userTable } from "@/database/schema/auth-schema";
import { chipTransactionsTable } from "@/database/schema/chip-transactions.table";
import { tasksTable } from "@/database/schema/tasks.table";
import { userTasksTable } from "@/database/schema/user-tasks.table";
import { ORPCError } from "@orpc/client";
import dayjs from "dayjs";
import { and, eq, gte, sql } from "drizzle-orm";

export interface DailyLoginResult {
  success: boolean;
  awarded: boolean;
  chips?: number;
  message: string;
  alreadyCompleted?: boolean;
}

/**
 * Daily Login Service
 * Handles automatic daily login bonus detection and awarding
 */
export class DailyLoginService {
  constructor(private db: DB) {}

  /**
   * Check and award daily login bonus for a user
   * Should be called when user authenticates or visits the app
   */
  async checkAndAwardDailyLogin(userId: string): Promise<DailyLoginResult> {
    // 1. Get the daily login task
    const dailyLoginTask = await this.db.query.tasksTable.findFirst({
      where: and(
        eq(tasksTable.taskType, "daily_login"),
        eq(tasksTable.active, true),
      ),
    });

    if (!dailyLoginTask) {
      throw new ORPCError("TASK_NOT_FOUND", {
        message: "Daily login task not found or inactive",
      });
    }

    // 2. Check if user already completed today
    const today = this.getTodayStart();
    const todayCompletion = await this.db.query.userTasksTable.findFirst({
      where: and(
        eq(userTasksTable.userId, userId),
        eq(userTasksTable.taskType, dailyLoginTask.taskType),
        gte(userTasksTable.createdAt, today.toISOString()),
      ),
    });

    if (todayCompletion) {
      return {
        success: true,
        awarded: false,
        message: "Daily login bonus already claimed today",
        alreadyCompleted: true,
      };
    }

    // 3. Get user to check level requirement
    const user = await this.db.query.userTable.findFirst({
      where: eq(userTable.id, userId),
    });

    if (!user) {
      throw new ORPCError("USER_NOT_FOUND", {
        message: "User not found",
      });
    }

    // 4. Check level requirement
    if (user.level < (dailyLoginTask.levelRequirement || 1)) {
      throw new ORPCError("LEVEL_REQUIREMENT_NOT_MET", {
        message: "Level requirement not met for daily login bonus",
      });
    }

    // 5. Award the daily login bonus
    const result = await this.awardDailyLoginBonus(
      userId,
      dailyLoginTask,
      user.level,
    );

    return result;
  }

  /**
   * Award daily login bonus to user
   */
  private async awardDailyLoginBonus(
    userId: string,
    task: typeof tasksTable.$inferSelect,
    userLevel: number,
  ): Promise<DailyLoginResult> {
    // Calculate bonus chips (could be level-based)
    const baseChips = task.defaultChips;
    const levelBonus = Math.floor(userLevel / 2); // +1 chip per 2 levels
    const totalChips = baseChips + levelBonus;

    await this.db.transaction(async (tx) => {
      const now = dayjs().toISOString();
      // 1. Create user task record
      await tx.insert(userTasksTable).values({
        userId,
        taskType: "daily_login",
        chipsRewarded: totalChips,
        status: "completed",
        completionDate: dayjs().toDate(),
        lastCompletedAt: new Date(),
        completionCount: 1,
        validated: new Date(),
      });

      // 2. Award chips to user
      await tx
        .update(userTable)
        .set({
          chips: sql`${userTable.chips} + ${totalChips}`,
          earnedChips: sql`${userTable.earnedChips} + ${totalChips}`,
          // Level up logic based on total earned chips
          level: sql`CASE
              WHEN ${userTable.earnedChips} + ${totalChips} >= 2000 THEN 7
              WHEN ${userTable.earnedChips} + ${totalChips} >= 1500 THEN 6
              WHEN ${userTable.earnedChips} + ${totalChips} >= 1000 THEN 5
              WHEN ${userTable.earnedChips} + ${totalChips} >= 600 THEN 4
              WHEN ${userTable.earnedChips} + ${totalChips} >= 300 THEN 3
              WHEN ${userTable.earnedChips} + ${totalChips} >= 100 THEN 2
              ELSE 1
            END`,
        })
        .where(eq(userTable.id, userId));

      // 3. Record chip transaction
      await tx.insert(chipTransactionsTable).values({
        userId,
        taskType: "daily_login",
        amount: totalChips,
        transactionType: "earned",
        description: `Daily login bonus (+${levelBonus} level bonus)`,
      });
    });

    return {
      success: true,
      awarded: true,
      chips: totalChips,
      message: `Daily login bonus awarded: ${totalChips} chips!`,
    };
  }

  /**
   * Get start of today (00:00:00)
   */
  private getTodayStart(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  /**
   * Get user's daily login streak
   */
  async getDailyLoginStreak(userId: string): Promise<number> {
    try {
      const dailyLoginTask = await this.db.query.tasksTable.findFirst({
        where: and(
          eq(tasksTable.taskType, "daily_login"),
          eq(tasksTable.active, true),
        ),
      });

      if (!dailyLoginTask) return 0;

      // Get all daily login completions ordered by date desc
      const completions = await this.db.query.userTasksTable.findMany({
        where: and(
          eq(userTasksTable.userId, userId),
          eq(userTasksTable.taskType, dailyLoginTask.taskType),
        ),
        orderBy: (tasks, { desc }) => [desc(tasks.createdAt)],
      });

      if (completions.length === 0) return 0;

      let streak = 0;
      let currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      for (const completion of completions) {
        const completionDate = new Date(completion.createdAt);
        completionDate.setHours(0, 0, 0, 0);

        // Check if completion is for current date or previous consecutive date
        if (completionDate.getTime() === currentDate.getTime()) {
          streak++;
          // Move to previous day
          currentDate.setDate(currentDate.getDate() - 1);
        } else if (
          completionDate.getTime() ===
          currentDate.getTime() - 86400000
        ) {
          // Previous day
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          // Gap in streak, stop counting
          break;
        }
      }

      return streak;
    } catch (error) {
      console.error("Error calculating login streak:", error);
      throw new ORPCError("STREAK_CALCULATION_FAILED", {
        message: "Failed to calculate login streak",
      });
    }
  }

  /**
   * Check if user has completed daily login today
   */
  async hasCompletedTodayLogin(userId: string): Promise<boolean> {
    try {
      const dailyLoginTask = await this.db.query.tasksTable.findFirst({
        where: and(
          eq(tasksTable.taskType, "daily_login"),
          eq(tasksTable.active, true),
        ),
      });

      if (!dailyLoginTask) return false;

      const today = this.getTodayStart();
      const todayCompletion = await this.db.query.userTasksTable.findFirst({
        where: and(
          eq(userTasksTable.userId, userId),
          eq(userTasksTable.taskType, dailyLoginTask.taskType),
          gte(userTasksTable.createdAt, today.toISOString()),
        ),
      });

      return !!todayCompletion;
    } catch (error) {
      console.error("Error checking today's login:", error);
      throw new ORPCError("LOGIN_CHECK_FAILED", {
        message: "Failed to check today's login status",
      });
    }
  }
}

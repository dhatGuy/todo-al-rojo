import { DB } from "@/database/db";
import { userTable } from "@/database/schema/auth-schema";
import { chipTransactionsTable } from "@/database/schema/chip-transactions.table";
import { tasksTable } from "@/database/schema/tasks.table";
import { userTasksTable } from "@/database/schema/user-tasks.table";
import { authedProcedure } from "@/orpc/server";
import { DailyLoginService } from "@/services/daily-login.service";
import { ORPCError } from "@orpc/client";
import { and, eq, gte, sql } from "drizzle-orm";
import z from "zod";

/**
 * Get all active tasks with user completion status, with optional filters
 */

// zod
const userTasksWithStatusSchema = z.object({
  canComplete: z.boolean().optional(),
  frequency: z
    .enum(["one_time", "daily", "weekly", "monthly", "unlimited"])
    .optional(),
  validationType: z.enum(["automatic", "manual", "bot"]).optional(),
  completed: z.boolean().optional(),
});

export const getUserTasksWithStatus = authedProcedure
  .input(userTasksWithStatusSchema)
  .handler(async ({ context, input }) => {
    const { db } = context;

    try {
      // Build query for active tasks with optional filters
      let tasksQuery = db.query.tasksTable.findMany({
        where: eq(tasksTable.active, true),
        orderBy: (tasks, { asc }) => [asc(tasks.name)],
      });

      // Apply filters if provided
      if (input?.frequency) {
        tasksQuery = db.query.tasksTable.findMany({
          where: and(
            eq(tasksTable.active, true),
            eq(tasksTable.frequency, input.frequency),
          ),
          orderBy: (tasks, { asc }) => [asc(tasks.name)],
        });
      }

      if (input?.validationType) {
        tasksQuery = db.query.tasksTable.findMany({
          where: and(
            eq(tasksTable.active, true),
            eq(tasksTable.validationMethod, input.validationType as any),
          ),
          orderBy: (tasks, { asc }) => [asc(tasks.name)],
        });
      }

      // For more complex filtering, we'll need to apply filters after fetching
      // since we need to calculate completion status

      // Get all active tasks (or filtered by frequency/validationType)
      const activeTasks = await tasksQuery;

      // Get user's completed tasks
      const userCompletedTasks = await db.query.userTasksTable.findMany({
        where: eq(userTasksTable.userId, context.session.user.id!),
        with: {
          task: true,
        },
      });

      // Process tasks with completion status
      let tasksWithStatus = await Promise.all(
        activeTasks.map(async (task) => {
          // Find user completions for this task
          const completions = userCompletedTasks.filter(
            (ut) => ut.taskType === task.taskType,
          );

          // Determine completion status based on frequency
          let completed = false;
          let canComplete = true;
          let completionCount = completions.length;
          let lastCompletedAt =
            completions.length > 0
              ? completions[completions.length - 1].createdAt
              : null;

          // Check if task can be completed now
          const frequencyCheck = await canCompleteTask(
            context.session.user.id!,
            task,
            db,
          );
          canComplete = frequencyCheck.allowed;

          // For one-time tasks, check if already completed
          if (task.frequency === "one_time" && completions.length > 0) {
            completed = true;
          }

          // For periodic tasks, check if completed in current period
          if (
            task.frequency === "daily" ||
            task.frequency === "weekly" ||
            task.frequency === "monthly"
          ) {
            const periodStart = getPeriodStart(task.frequency);
            const periodCompletions = completions.filter(
              (c) => new Date(c.createdAt) >= periodStart,
            );

            completed = periodCompletions.length > 0;
            completionCount = periodCompletions.length;

            if (periodCompletions.length > 0) {
              lastCompletedAt =
                periodCompletions[periodCompletions.length - 1].createdAt;
            }
          }

          return {
            ...task,
            completed,
            canComplete,
            completionCount,
            lastCompletedAt,
            userCompletions: completions.map((c) => ({
              id: c.id,
              chipsAwarded: c.chipsRewarded,
              validated: c.validated,
              createdAt: c.createdAt,
              // metadata: c.meta,
            })),
          };
        }),
      );

      // Apply client-side filters
      if (input?.completed !== undefined) {
        tasksWithStatus = tasksWithStatus.filter(
          (task) => task.completed === input.completed,
        );
      }

      if (input?.canComplete !== undefined) {
        tasksWithStatus = tasksWithStatus.filter(
          (task) => task.canComplete === input.canComplete,
        );
      }

      return { success: true, tasks: tasksWithStatus };
    } catch (error) {
      console.error("Error getting user tasks:", error);
      throw new ORPCError("INTERNAL_SERVER_ERROR", {
        message: "Failed to load tasks",
      });
    }
  });

export const completeTask = authedProcedure
  .input(
    z.object({
      userId: z.uuid(),
      taskId: z.uuid(),
      taskType: z.string().min(1).max(100),
    }),
  )
  .handler(async ({ context, input }) => {
    const { db } = context;
    const userId = context.session.user.id!;

    try {
      // 1. Get task definition
      const task = await db.query.tasksTable.findFirst({
        where: and(
          eq(tasksTable.id, input.taskId),
          eq(tasksTable.active, true),
        ),
      });

      if (!task) {
        throw new ORPCError("NOT_FOUND", {
          message: "Task not found or inactive",
        });
      }

      // 2. Check frequency limits
      const canComplete = await canCompleteTask(userId, task, db);
      if (!canComplete.allowed) {
        throw new ORPCError("BAD_REQUEST", {
          message: canComplete.reason,
        });
      }

      // 3. Check level requirement
      const userLevel = context.session.user.level!;
      if (userLevel < (task.levelRequirement || 1)) {
        throw new ORPCError("FORBIDDEN", {
          message: "Level requirement not met",
        });
      }

      // 4. Create user task record
      const userTask = await db
        .insert(userTasksTable)
        .values({
          userId,
          taskType: task.taskType,
          chipsRewarded: task.defaultChips,
          status: "completed",
          // meta metadata,
          validated: new Date(),
        })
        .returning();

      // 5. Award chips if automatic validation
      if (task.validationMethod === "automatic") {
        await awardChipsForTask(
          userId,
          task.defaultChips,
          input.taskType,
          userTask[0].id,
          db,
        );
      }

      return {
        success: true,
        message:
          task.validationMethod === "automatic"
            ? "Task completed and chips awarded"
            : "Task submitted for validation",
        requiresValidation: task.validationMethod !== "automatic",
      };
    } catch (error) {
      console.error("Error completing task:", error);
      if (error instanceof ORPCError) {
        throw error;
      }
      throw new ORPCError("INTERNAL_SERVER_ERROR", {
        message: "Failed to complete task",
      });
    }
  });

/**
 * Get start of period for frequency checking
 */
function getPeriodStart(frequency: string): Date {
  const now = new Date();
  const start = new Date(now);

  switch (frequency) {
    case "daily":
      start.setHours(0, 0, 0, 0);
      break;
    case "weekly": {
      const day = start.getDay();
      const diff = start.getDate() - day + (day === 0 ? -6 : 1);
      start.setDate(diff);
      start.setHours(0, 0, 0, 0);
      break;
    }
    case "monthly":
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      break;
    default:
      return new Date(0); // Beginning of time
  }

  return start;
}

async function canCompleteTask(
  userId: string,
  task: typeof tasksTable.$inferSelect,
  db: DB,
) {
  // For one-time tasks, check if already completed
  if (task.frequency === "one_time") {
    const existing = await db.query.userTasksTable.findFirst({
      where: and(
        eq(userTasksTable.userId, userId),
        eq(userTasksTable.taskType, task.taskType),
      ),
    });

    if (existing) {
      return { allowed: false, reason: "Task already completed" };
    }
  }

  // For periodic tasks, check limits
  if (
    task.frequency === "daily" ||
    task.frequency === "weekly" ||
    task.frequency === "monthly"
  ) {
    const periodStart = getPeriodStart(task.frequency);

    const completions = await db.query.userTasksTable.findMany({
      where: and(
        eq(userTasksTable.userId, userId),
        eq(userTasksTable.taskType, task.taskType),
        gte(userTasksTable.createdAt, periodStart.toISOString()),
      ),
    });

    // Check max completions per period
    if (
      task.maxCompletionsPerPeriod &&
      completions.length >= task.maxCompletionsPerPeriod
    ) {
      return {
        allowed: false,
        reason: `Maximum ${task.maxCompletionsPerPeriod} completions per ${task.frequency}`,
      };
    }
  }

  return { allowed: true };
}

async function awardChipsForTask(
  userId: string,
  chips: number,
  taskType: string,
  userTaskId: string,
  db: DB,
) {
  try {
    // Award chips to user
    await db
      .update(userTable)
      .set({
        chips: sql`${userTable.chips} + ${chips}`,
        level: sql`CASE
          WHEN ${userTable.chips} + ${chips} >= 1500 THEN 6
          WHEN ${userTable.chips} + ${chips} >= 1000 THEN 5
          WHEN ${userTable.chips} + ${chips} >= 600 THEN 4
          WHEN ${userTable.chips} + ${chips} >= 300 THEN 3
          WHEN ${userTable.chips} + ${chips} >= 100 THEN 2
          ELSE 1
        END`,
      })
      .where(eq(userTable.id, userId));

    // Record chip transaction
    await db.insert(chipTransactionsTable).values({
      userId,
      taskType,
      amount: chips,
      transactionType: "earned",
      description: `Earned from ${taskType}`,
    });

    // Mark user task as validated if not already
    await db
      .update(userTasksTable)
      .set({ validated: new Date() })
      .where(eq(userTasksTable.id, userTaskId));

    return { success: true };
  } catch (error) {
    console.error("Error awarding chips:", error);
    throw new ORPCError("INTERNAL_SERVER_ERROR", {
      message: "Failed to award chips",
    });
  }
}

/**
 * Check and award daily login bonus
 */
export const checkDailyLogin = authedProcedure.handler(async ({ context }) => {
  const { db } = context;
  const userId = context.session.user.id!;

  try {
    const dailyLoginService = new DailyLoginService(db);
    const result = await dailyLoginService.checkAndAwardDailyLogin(userId);

    return {
      success: result.success,
      awarded: result.awarded,
      chips: result.chips,
      message: result.message,
      alreadyCompleted: result.alreadyCompleted,
    };
  } catch (error) {
    console.error("Error checking daily login:", error);
    throw new ORPCError("INTERNAL_SERVER_ERROR", {
      message: "Failed to check daily login",
    });
  }
});

/**
 * Get user's daily login streak
 */
export const getDailyLoginStreak = authedProcedure.handler(
  async ({ context }) => {
    const { db } = context;
    const userId = context.session.user.id!;

    try {
      const dailyLoginService = new DailyLoginService(db);
      const streak = await dailyLoginService.getDailyLoginStreak(userId);

      return {
        success: true,
        streak,
      };
    } catch (error) {
      console.error("Error getting login streak:", error);
      throw new ORPCError("INTERNAL_SERVER_ERROR", {
        message: "Failed to get login streak",
      });
    }
  },
);

/**
 * Check if user has completed daily login today
 */
export const getDailyLoginStatus = authedProcedure.handler(
  async ({ context }) => {
    const { db } = context;
    const userId = context.session.user.id!;

    try {
      const dailyLoginService = new DailyLoginService(db);
      const completedToday =
        await dailyLoginService.hasCompletedTodayLogin(userId);
      const streak = await dailyLoginService.getDailyLoginStreak(userId);

      return {
        success: true,
        completedToday,
        streak,
      };
    } catch (error) {
      console.error("Error getting daily login status:", error);
      throw new ORPCError("INTERNAL_SERVER_ERROR", {
        message: "Failed to get daily login status",
      });
    }
  },
);

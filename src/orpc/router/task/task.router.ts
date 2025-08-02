import { DB } from "@/database/db";
import { userTable } from "@/database/schema/auth-schema";
import { chipTransactionsTable } from "@/database/schema/chip-transactions.table";
import { tasksTable } from "@/database/schema/tasks.table";
import { userTasksTable } from "@/database/schema/user-tasks.table";
import { authedProcedure } from "@/orpc/server";
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
        where: eq(userTasksTable.userId, context.session.user.id),
        with: {
          task: true,
        },
      });

      // Process tasks with completion status
      let tasksWithStatus = await Promise.all(
        activeTasks.map(async (task) => {
          // Find user completions for this task
          const completions = userCompletedTasks.filter(
            (ut) => ut.taskId === task.id,
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
            context.session.user.id,
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
      return { success: false, error: "Failed to load tasks" };
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
    const userId = context.session.user.id;

    try {
      // 1. Get task definition
      const task = await db.query.tasksTable.findFirst({
        where: and(
          eq(tasksTable.id, input.taskId),
          eq(tasksTable.active, true),
        ),
      });

      if (!task) {
        return { success: false, message: "Task not found or inactive" };
      }

      // 2. Check frequency limits
      const canComplete = await canCompleteTask(userId, task, db);
      if (!canComplete.allowed) {
        return { success: false, message: canComplete.reason };
      }

      // 3. Check level requirement
      const userLevel = context.session.user.level;
      if (userLevel < (task.levelRequirement || 1)) {
        return { success: false, message: "Level requirement not met" };
      }

      // 4. Create user task record
      const userTask = await db
        .insert(userTasksTable)
        .values({
          userId,
          taskId: task.id,
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
      return { success: false, message: "Failed to complete task" };
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
        eq(userTasksTable.taskId, task.id),
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
        eq(userTasksTable.taskId, task.id),
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
      taskId:
        (
          await db.query.tasksTable.findFirst({
            where: eq(tasksTable.taskType, taskType),
          })
        )?.id || null,
      // userTaskId,
      // chips,
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
    return { success: false, error: "Failed to award chips" };
  }
}

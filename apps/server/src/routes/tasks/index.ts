import dayjs from "dayjs";
import { and, eq, exists, not, or, sql } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import type { HonoAppContext } from "../../auth";
import { db } from "../../db";
import { tasksTable } from "../../db/tasks.table";
import { userTasksTable } from "../../db/user-tasks.table";
import { withAuth } from "../../middlewares/auth.middleware";
import { successResponse } from "../../utils/response";

const taskSchema = z.object({
  id: z.number(),
  taskType: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  defaultChips: z.number(),
  frequency: z.enum(["one_time", "daily", "weekly"]),
  conditions: z.record(z.any()).nullable(),
});

const completeTaskSchema = z.object({
  taskType: z.string().min(1),
});
export const tasksRouter = new Hono<HonoAppContext<"IsAuthenticated">>()
  .use(withAuth)
  .basePath("/tasks")
  .get("/available", async (c) => {
    const today = dayjs().toDate();

    const userId = c.get("user").id;

    const incompleteOneTimeTasks = await db
      .select()
      .from(tasksTable)
      .where(
        and(
          eq(tasksTable.active, true),
          or(
            // One-time tasks not completed
            and(
              eq(tasksTable.frequency, "one_time"),
              not(
                exists(
                  db
                    .select()
                    .from(userTasksTable)
                    .where(
                      and(
                        eq(userTasksTable.userId, userId),
                        eq(userTasksTable.taskId, tasksTable.id),
                        eq(userTasksTable.status, "completed"),
                      ),
                    ),
                ),
              ),
            ),
            // Daily tasks not completed today
            and(
              eq(tasksTable.frequency, "daily"),
              not(
                exists(
                  db
                    .select()
                    .from(userTasksTable)
                    .where(
                      and(
                        eq(userTasksTable.userId, userId),
                        eq(userTasksTable.taskId, tasksTable.id),
                        eq(userTasksTable.status, "completed"),
                        sql`DATE(${userTasksTable.completionDate}) = CURRENT_DATE`,
                      ),
                    ),
                ),
              ),
            ),
            // Weekly tasks not completed this week
            and(
              eq(tasksTable.frequency, "weekly"),
              not(
                exists(
                  db
                    .select()
                    .from(userTasksTable)
                    .where(
                      and(
                        eq(userTasksTable.userId, userId),
                        eq(userTasksTable.taskId, tasksTable.id),
                        eq(userTasksTable.status, "completed"),
                        sql`${userTasksTable.completionDate} >= date_trunc('week', CURRENT_DATE)`,
                      ),
                    ),
                ),
              ),
            ),
          ),
        ),
      );
    console.log(incompleteOneTimeTasks);

    return successResponse(
      c,
      incompleteOneTimeTasks,
      "Available tasks fetched successfully",
    );
  });
// .post(
//   "/tasks/complete",
//   zValidator("json", completeTaskSchema),
//   async (c) => {
//     const { taskType } = c.req.valid("json");

//     const [task] = await db
//       .select({
//         id: tasks.id,
//         defaultChips: tasks.defaultChips,
//         frequency: tasks.frequency,
//         conditions: tasks.conditions,
//         active: tasks.active,
//       })
//       .from(tasks)
//       .where(eq(tasks.taskType, taskType));

//     if (!task || !task.active) {
//       return c.json({ error: "Task not found or inactive" }, 404);
//     }

//     const [existingTask] = await db
//       .select({
//         status: userTasks.status,
//         lastCompletedAt: userTasks.lastCompletedAt,
//         completionCount: userTasks.completionCount,
//       })
//       .from(userTasks)
//       .where(
//         and(eq(userTasks.userId, user.id), eq(userTasks.taskId, task.id)),
//       );

//     const now = new Date();
//     let canComplete = false;

//     if (
//       task.frequency === "one_time" &&
//       (!existingTask || existingTask.status !== "completed")
//     ) {
//       canComplete = true;
//     } else if (task.frequency === "daily") {
//       const lastCompleted = existingTask?.lastCompletedAt
//         ? new Date(existingTask.lastCompletedAt)
//         : null;
//       const today = new Date(now.toISOString().split("T")[0]);
//       canComplete = !lastCompleted || lastCompleted < today;
//     }

//     if (!canComplete) {
//       return c.json(
//         { error: `Task cannot be completed yet (${task.frequency} limit)` },
//         400,
//       );
//     }

//     // Verify deposit for task
//     if (task.conditions?.affiliateId) {
//       const isFirstDeposit = task.taskType.includes("first_deposit");
//       const depositCount = await db
//         .select({ count: sql`COUNT(*)` })
//         .from(ftdTracking)
//         .where(
//           and(
//             eq(ftdTracking.userId, user.id),
//             eq(ftdTracking.affiliateId, task.conditions.affiliateId),
//             eq(ftdTracking.status, "confirmed"),
//           ),
//         );
//       if (isFirstDeposit && depositCount[0].count > 0) {
//         return c.json({ error: "First deposit already completed" }, 400);
//       } else if (!isFirstDeposit && depositCount[0].count === 0) {
//         return c.json({ error: "No prior deposits found" }, 400);
//       }

//       // Check for recent confirmed deposit (within 24 hours for daily tasks)
//       const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
//       const [recentDeposit] = await db
//         .select()
//         .from(ftdTracking)
//         .where(
//           and(
//             eq(ftdTracking.userId, user.id),
//             eq(ftdTracking.affiliateId, task.conditions.affiliateId),
//             eq(ftdTracking.status, "confirmed"),
//             gte(ftdTracking.depositTimestamp, oneDayAgo),
//           ),
//         );
//       if (!recentDeposit) {
//         return c.json({ error: "No recent deposit found" }, 400);
//       }
//     }

//     const chips = task.defaultChips;
//     await db
//       .insert(userTasks)
//       .values({
//         userId: user.id,
//         taskId: task.id,
//         status: "completed",
//         chipsRewarded: chips,
//         completionDate: now,
//         lastCompletedAt: now,
//         completionCount: existingTask ? existingTask.completionCount + 1 : 1,
//       })
//       .onConflictDoUpdate({
//         target: [userTasks.userId, userTasks.taskId],
//         set: {
//           status: "completed",
//           chipsRewarded: chips,
//           completionDate: now,
//           lastCompletedAt: now,
//           completionCount: sql`${userTasks.completionCount} + 1`,
//         },
//       });

//     await db
//       .update(userChips)
//       .set({
//         totalChips: sql`${userChips.totalChips} + ${chips}`,
//         earnedChips: sql`${userChips.earnedChips} + ${chips}`,
//       })
//       .where(eq(userChips.userId, user.id));

//     await db.insert(chipTransactions).values({
//       userId: user.id,
//       transactionType: "earned",
//       amount: chips,
//       taskId: task.id,
//       description: `Completed task: ${taskType}`,
//       referenceId: task.id.toString(),
//     });

//     const [userChip] = await db
//       .select()
//       .from(userChips)
//       .where(eq(userChips.userId, user.id));
//     const [nextLevel] = await db
//       .select()
//       .from(userLevels)
//       .where(
//         sql`${userLevels.required_xp} <= ${userChip.totalChips} AND ${userLevels.level} > ${userChip.level}`,
//       )
//       .orderBy(userLevels.level)
//       .limit(1);
//     if (nextLevel) {
//       await db
//         .update(userChips)
//         .set({ level: nextLevel.level, lastLevelUp: new Date() })
//         .where(eq(userChips.userId, user.id));
//     }

//     return c.json({ status: "success", chipsAwarded: chips });
//   },
// );

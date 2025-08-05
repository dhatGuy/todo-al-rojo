import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { timestamps } from "../timestamps";
import { userTable } from "./auth-schema";
import { tasksTable } from "./tasks.table";

export const taskStatusEnum = pgEnum("task_status", [
  "pending",
  "completed",
  "failed",
]);

export const userTasksTable = pgTable("user_tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  taskType: text("task_type").references(() => tasksTable.taskType),
  status: taskStatusEnum("status").default("pending"),
  chipsRewarded: integer("chips_rewarded").default(0),
  completionDate: timestamp("completion_date"),
  lastCompletedAt: timestamp("last_completed_at"),
  completionCount: integer("completion_count").notNull().default(0),
  validatedBy: uuid("validated_by").references(() => userTable.id), // For manual validation
  validated: timestamp("validated_at"),
  ...timestamps,
});

export const userTasksRelations = relations(userTasksTable, ({ one }) => ({
  user: one(userTable, {
    fields: [userTasksTable.userId],
    references: [userTable.id],
  }),
  task: one(tasksTable, {
    fields: [userTasksTable.taskType],
    references: [tasksTable.taskType],
  }),
}));

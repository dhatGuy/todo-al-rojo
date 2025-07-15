import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "../timestamps";
import { chipTransactionsTable } from "./chip-transactions.table";
import { userTasksTable } from "./user-tasks.table";

export const taskFrequencyEnum = pgEnum("task_frequency", [
  "one_time",
  "daily",
  "weekly",
]);

export const tasksTable = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  taskType: varchar("task_type", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  defaultChips: integer("default_chips").notNull().default(0),
  frequency: taskFrequencyEnum("frequency").notNull().default("one_time"),
  conditions: jsonb("conditions").$type<Record<string, any>>(), // JSON object for task conditions
  active: boolean("active").default(true),
  ...timestamps,
});

export const tasksRelations = relations(tasksTable, ({ many }) => ({
  userTasks: many(userTasksTable),
  chipTransactions: many(chipTransactionsTable),
}));

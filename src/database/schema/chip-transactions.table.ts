import { relations } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "../timestamps";
import { userTable } from "./auth-schema";
import { tasksTable } from "./tasks.table";

export const transactionTypeEnum = pgEnum("transaction_type", [
  "earned",
  "redeemed",
  "adjusted",
  "bonus",
  "penalty",
]);

export const chipTransactionsTable = pgTable("chip_transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  transactionType: transactionTypeEnum("transaction_type").notNull(),
  amount: integer("amount").notNull(),
  taskType: text("task_type").references(() => tasksTable.taskType, {
    onDelete: "set null",
  }),
  meta: jsonb("metadata").$type<{
    taskId?: string;
    redemptionId?: string;
    adminNote?: string;
    proofUrl?: string;
  }>(),
  description: varchar("description", { length: 255 }).notNull(),
  referenceId: varchar("reference_id", { length: 100 }),
  ...timestamps,
});

export const chipTransactionsRelations = relations(
  chipTransactionsTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [chipTransactionsTable.userId],
      references: [userTable.id],
    }),
    task: one(tasksTable, {
      fields: [chipTransactionsTable.taskType],
      references: [tasksTable.taskType],
    }),
  }),
);

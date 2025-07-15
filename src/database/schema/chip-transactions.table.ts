import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../timestamps";
import { userTable } from "./auth-schema";
import { tasksTable } from "./tasks.table";

export const transactionTypeEnum = pgEnum("transaction_type", [
  "earned",
  "spent",
]);

export const chipTransactionsTable = pgTable("chip_transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  transactionType: transactionTypeEnum("transaction_type").notNull(),
  amount: integer("amount").notNull(),
  taskId: uuid("task_id").references(() => tasksTable.id, {
    onDelete: "set null",
  }),
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
      fields: [chipTransactionsTable.taskId],
      references: [tasksTable.id],
    }),
  }),
);

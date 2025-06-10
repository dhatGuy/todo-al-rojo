import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import * as authSchema from "./auth-schema.js";

export * from "./auth-schema.js";

export const note = pgTable("note", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  userId: uuid("user_id")
    .notNull()
    .references(() => authSchema.userTable.id),
});

export const usersRelations = relations(authSchema.userTable, ({ many }) => ({
  notes: many(note),
}));

export const notesRelations = relations(note, ({ one }) => ({
  user: one(authSchema.userTable, {
    fields: [note.userId],
    references: [authSchema.userTable.id],
  }),
}));

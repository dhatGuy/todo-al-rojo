import { relations } from "drizzle-orm";
import { index, integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../timestamps";
import { userTable } from "./auth-schema";
import { userLevelsTable } from "./user-levels.table";

export const userChipsTable = pgTable(
  "user_chips",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .references(() => userTable.id, {
        onDelete: "cascade",
      })
      .unique(),
    totalChips: integer("total_chips").notNull().default(0),
    earnedChips: integer("earned_chips").notNull().default(0),
    spentChips: integer("spent_chips").notNull().default(0),
    level: integer("level")
      .notNull()
      .default(1)
      .references(() => userLevelsTable.level),
    lastLevelUp: timestamp("last_level_up"),
    ...timestamps,
  },
  (t) => [index("user_chips_total_chips_idx").on(t.totalChips)],
);

export const userChipsRelations = relations(userChipsTable, ({ one }) => ({
  user: one(userTable, {
    fields: [userChipsTable.userId],
    references: [userTable.id],
  }),
  level: one(userLevelsTable, {
    fields: [userChipsTable.level],
    references: [userLevelsTable.level],
  }),
}));

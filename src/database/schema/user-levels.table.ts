import { relations } from "drizzle-orm";
import { index, integer, json, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../timestamps";
import { userChipsTable } from "./user-chips.table";

export const userLevelsTable = pgTable(
  "user_levels",
  {
    level: integer("level").primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    chipBonus: integer("chip_bonus").default(0).notNull(),
    unlockFeatures: json("unlock_features").$type<string[]>(), // Array of features unlocked at this level
    requiredXp: integer("required_xp").notNull(),
    ...timestamps,
  },
  (t) => [
    index("idx_level").on(t.level),
    index("idx_required_xp").on(t.requiredXp),
  ],
);

export const userLevelsRelations = relations(userLevelsTable, ({ many }) => ({
  userChips: many(userChipsTable),
}));

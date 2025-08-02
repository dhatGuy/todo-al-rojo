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
    requiredChips: integer("required_chips").notNull().unique(),
    ...timestamps,
  },
  (t) => [
    index("idx_level").on(t.level),
    index("idx_required_chips").on(t.requiredChips),
  ],
);

export const userLevelsRelations = relations(userLevelsTable, ({ many }) => ({
  userChips: many(userChipsTable),
}));

// Seed data
export const LEVEL_THRESHOLDS = [
  { level: 1, name: "Novato al Rojo", requiredChips: 0 },
  { level: 2, name: "Jugador Activo", requiredChips: 100 },
  { level: 3, name: "Estratega", requiredChips: 300 },
  { level: 4, name: "VIP del Grupo", requiredChips: 600 },
  { level: 5, name: "High Roller", requiredChips: 1000 },
  { level: 6, name: "Todo al Rojo 🔥", requiredChips: 1500 },
];

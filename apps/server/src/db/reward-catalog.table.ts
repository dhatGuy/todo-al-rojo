import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { rewardRedemptionsTable } from "./reward-redemptions.table";
import { userLevelsTable } from "./user-levels.table";

export const rewardsCatalogTable = pgTable("rewards_catalog", {
  id: uuid("id").primaryKey().defaultRandom(),
  rewardName: varchar("reward_name", { length: 100 }).notNull(),
  chipCost: integer("chip_cost").notNull(),
  minLevelRequired: integer("min_level_required")
    .notNull()
    .references(() => userLevelsTable.level),
  active: boolean("active").default(true),
  conditions: jsonb("conditions").$type<Record<string, any>>().notNull(), // JSON object for reward conditions
  createdAt: timestamp("created_at").defaultNow(),
});

// reward_type ENUM('bonus_chips', 'free_spins', 'cashback', 'physical_item', 'discount') NOT NULL,

export const rewardsCatalogRelations = relations(
  rewardsCatalogTable,
  ({ many }) => ({
    redemptions: many(rewardRedemptionsTable),
  }),
);

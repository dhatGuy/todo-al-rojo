import { relations } from "drizzle-orm";
import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../timestamps";
import { userTable } from "./auth-schema";
import { statusEnum } from "./ftd-tracking.table";
import { rewardsCatalogTable } from "./reward-catalog.table";

export const rewardRedemptionsTable = pgTable("reward_redemptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  rewardId: uuid("reward_id")
    .notNull()
    .references(() => rewardsCatalogTable.id),
  chipsSpent: integer("chips_spent").notNull(),
  redemptionCode: varchar("redemption_code", { length: 100 })
    .notNull()
    .unique(),
  status: statusEnum("status").default("pending"),
  ...timestamps,
});

export const rewardRedemptionsRelations = relations(
  rewardRedemptionsTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [rewardRedemptionsTable.userId],
      references: [userTable.id],
    }),
    reward: one(rewardsCatalogTable, {
      fields: [rewardRedemptionsTable.rewardId],
      references: [rewardsCatalogTable.id],
    }),
  }),
);

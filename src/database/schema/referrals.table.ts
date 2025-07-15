import { relations } from "drizzle-orm";
import { pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { affiliatesTable } from "./affiliates.table";
import { userTable } from "./auth-schema";
import { clickTrackingTable } from "./click-tracking.table";

export const referralsTable = pgTable("referrals", {
  id: serial("id").primaryKey(),
  referrerUserId: uuid("referrer_user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  referralCode: varchar("referral_code", { length: 50 }).notNull().unique(),
  referredUserId: uuid("referred_user_id").references(() => userTable.id, {
    onDelete: "set null",
  }),
  affiliateId: uuid("affiliate_id").references(() => affiliatesTable.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const referralsRelations = relations(
  referralsTable,
  ({ one, many }) => ({
    user: one(userTable, {
      fields: [referralsTable.referrerUserId],
      references: [userTable.id],
    }),
    affiliate: one(affiliatesTable, {
      fields: [referralsTable.affiliateId],
      references: [affiliatesTable.id],
    }),
    clicks: many(clickTrackingTable),
  }),
);

import { relations } from "drizzle-orm";
import { pgTable, serial, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../timestamps";
import { affiliatesTable } from "./affiliates.table";
import { userTable } from "./auth-schema";

export const referralsTable = pgTable("referrals", {
  id: serial("id").primaryKey(),
  referrerId: uuid("referrer_user_id").references(() => userTable.id, {
    onDelete: "set null",
  }),
  referralCode: text("referral_code").notNull(),
  referredId: uuid("referred_user_id").references(() => userTable.id, {
    onDelete: "set null",
  }),
  affiliateId: uuid("affiliate_id").references(() => affiliatesTable.id, {
    onDelete: "set null",
  }),
  ...timestamps,
});

export const referralsRelations = relations(
  referralsTable,
  ({ one, many }) => ({
    referrer: one(userTable, {
      fields: [referralsTable.referrerId],
      references: [userTable.id],
    }),
    referred: one(userTable, {
      fields: [referralsTable.referredId],
      references: [userTable.id],
    }),
    affiliate: one(affiliatesTable, {
      fields: [referralsTable.affiliateId],
      references: [affiliatesTable.id],
    }),
    // clicks: many(clickTrackingTable),
  }),
);

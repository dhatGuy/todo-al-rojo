import { relations } from "drizzle-orm";
import {
  decimal,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "../timestamps";
import { affiliatesTable } from "./affiliates.table";
import { userTable } from "./auth-schema";
import { clickTrackingTable } from "./click-tracking.table";
import { postbackLogsTable } from "./postback-logs.table";

export const trackingMethodEnum = pgEnum("tracking_method", [
  "pixel",
  "postback",
  "manual",
]);
export const statusEnum = pgEnum("status", [
  "pending",
  "confirmed",
  "rejected",
]);

export const ftdTrackingTable = pgTable("ftd_tracking", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  clickId: varchar("click_id", { length: 36 }).references(
    () => clickTrackingTable.clickId,
  ),
  affiliateId: uuid("affiliate_id").references(() => affiliatesTable.id, {
    onDelete: "set null",
  }),
  depositAmount: decimal("deposit_amount", {
    precision: 12,
    scale: 2,
  }).notNull(),
  currency: varchar("currency", { length: 10 }).notNull().default("CLP"),
  casinoTransactionId: varchar("casino_transaction_id", { length: 100 }),
  trackingMethod: trackingMethodEnum("tracking_method").notNull(),
  depositTimestamp: timestamp("deposit_timestamp").defaultNow(),
  status: statusEnum("status").default("pending"),
  confirmedAt: timestamp("confirmed_at"),
  confirmationMethod: varchar("confirmation_method", { length: 50 }),
  confirmedBy: uuid("confirmed_by").references(() => userTable.id),
  timeToConversion: integer("time_to_conversion"),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  ...timestamps,
});

export const ftdTrackingRelations = relations(
  ftdTrackingTable,
  ({ one, many }) => ({
    user: one(userTable, {
      fields: [ftdTrackingTable.userId],
      references: [userTable.id],
    }),
    click: one(clickTrackingTable, {
      fields: [ftdTrackingTable.clickId],
      references: [clickTrackingTable.clickId],
    }),
    affiliate: one(affiliatesTable, {
      fields: [ftdTrackingTable.affiliateId],
      references: [affiliatesTable.id],
    }),
    postbackLogs: many(postbackLogsTable),
  }),
);

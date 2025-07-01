import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../utils/db.utils";
import { chipTransactionsTable } from "./chip-transactions.table";
import { clickTrackingTable } from "./click-tracking.table";
import { referralsTable } from "./referrals.table";
import { rewardRedemptionsTable } from "./reward-redemptions.table";
import { userChipsTable } from "./user-chips.table";
import { userTasksTable } from "./user-tasks.table";

export const userTable = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phoneNumber: text("phone_number").unique().notNull(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  referralCode: text("referral_code").notNull().unique(),
  role: text("role").notNull().default("user"),
  banned: boolean("banned").notNull().default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires_at"),
  ...timestamps,
});

export const usersRelations = relations(userTable, ({ one, many }) => ({
  userChips: one(userChipsTable, {
    fields: [userTable.id],
    references: [userChipsTable.userId],
  }),
  referral: one(referralsTable, {
    fields: [userTable.id],
    references: [referralsTable.referrerUserId],
  }),
  tasks: many(userTasksTable),
  transactions: many(chipTransactionsTable),
  redemptions: many(rewardRedemptionsTable),
  clicks: many(clickTrackingTable, { relationName: "userClicks" }),
  referrals: many(clickTrackingTable, { relationName: "referrerClicks" }),
}));

export const sessionTable = pgTable("session", {
  id: uuid("id").primaryKey().defaultRandom(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  impersonatedBy: text("impersonated_by"),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const accountTable = pgTable("account", {
  id: uuid("id").primaryKey().defaultRandom(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verificationTable = pgTable("verification", {
  id: uuid("id").primaryKey().defaultRandom(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});

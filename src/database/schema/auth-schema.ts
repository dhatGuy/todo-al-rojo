import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { chipTransactionsTable } from "./chip-transactions.table";
import { clickTrackingTable } from "./click-tracking.table";
import { referralsTable } from "./referrals.table";
import { rewardRedemptionsTable } from "./reward-redemptions.table";
import { userChipsTable } from "./user-chips.table";
import { userLevelsTable } from "./user-levels.table";
import { userTasksTable } from "./user-tasks.table";

export const userTable = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phoneNumber: text("phone_number").unique(),
  name: text("name"),
  email: text("email").notNull().unique(),

  chips: integer("chips").notNull().default(0),
  level: integer("level")
    .notNull()
    .default(1)
    .references(() => userLevelsTable.level),
  earnedChips: integer("earned_chips").notNull().default(0),
  spentChips: integer("spent_chips").notNull().default(0),
  lastLevelUp: timestamp("last_level_up"),

  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  emailVerifiedAt: timestamp("email_verified_at"),
  image: text("image"),
  referralCode: text("referral_code").notNull().unique(),
  role: text("role").notNull().default("user"),
  banned: boolean("banned").notNull().default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires_at"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .default(sql`(now() AT TIME ZONE 'utc'::text)`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .default(sql`(now() AT TIME ZONE 'utc'::text)`)
    .notNull()
    .$onUpdate(() => sql`(now() AT TIME ZONE 'utc'::text)`),
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
  level: one(userLevelsTable, {
    fields: [userTable.level],
    references: [userLevelsTable.level],
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

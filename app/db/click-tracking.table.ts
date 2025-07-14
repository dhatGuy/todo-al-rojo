import { relations } from "drizzle-orm";
import {
	boolean,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "../lib/timestamp";
import { affiliatesTable } from "./affiliates.table";
import { userTable } from "./auth-schema";
import { ftdTrackingTable } from "./ftd-tracking.table";
import { referralsTable } from "./referrals.table";

export const clickTrackingTable = pgTable("click_tracking", {
	id: uuid("id").primaryKey().defaultRandom(),
	clickId: varchar("click_id", { length: 36 }).notNull().unique(),
	userId: uuid("user_id").references(() => userTable.id, {
		onDelete: "set null",
	}),
	referrerId: uuid("referrer_id").references(() => userTable.id, {
		onDelete: "set null",
	}),
	referralCode: varchar("referral_code", { length: 50 }).references(
		() => referralsTable.referralCode,
	),
	affiliateId: uuid("affiliate_id").references(() => affiliatesTable.id, {
		onDelete: "set null",
	}),
	utmSource: varchar("utm_source", { length: 100 }),
	utmMedium: varchar("utm_medium", { length: 100 }),
	utmCampaign: varchar("utm_campaign", { length: 100 }),
	utmTerm: varchar("utm_term", { length: 100 }),
	utmContent: varchar("utm_content", { length: 100 }),
	referrerUrl: varchar("referrer_url", { length: 500 }),
	landingPage: varchar("landing_page", { length: 500 }),
	ipAddress: varchar("ip_address", { length: 45 }),
	userAgent: text("user_agent"),
	deviceType: varchar("device_type", { length: 50 }),
	browser: varchar("browser", { length: 50 }),
	os: varchar("os", { length: 50 }),
	country: varchar("country", { length: 3 }),
	region: varchar("region", { length: 100 }),
	city: varchar("city", { length: 100 }),
	converted: boolean("converted").default(false),
	conversionTimestamp: timestamp("conversion_timestamp"),
	clickTimestamp: timestamp("click_timestamp").defaultNow(),
	...timestamps,
});

export const clickTrackingRelations = relations(
	clickTrackingTable,
	({ one }) => ({
		user: one(userTable, {
			fields: [clickTrackingTable.userId],
			references: [userTable.id],
			relationName: "userClicks",
		}),
		referrer: one(userTable, {
			fields: [clickTrackingTable.referrerId],
			references: [userTable.id],
			relationName: "referrerClicks",
		}),
		referral: one(referralsTable, {
			fields: [clickTrackingTable.referralCode],
			references: [referralsTable.referralCode],
		}),
		affiliate: one(affiliatesTable, {
			fields: [clickTrackingTable.affiliateId],
			references: [affiliatesTable.id],
		}),
		ftd: one(ftdTrackingTable, {
			fields: [clickTrackingTable.clickId],
			references: [ftdTrackingTable.clickId],
		}),
	}),
);

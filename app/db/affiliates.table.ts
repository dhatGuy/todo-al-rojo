import { relations, type SQL, sql } from "drizzle-orm";
import { index, pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../lib/timestamp";
import { clickTrackingTable } from "./click-tracking.table";
import { ftdTrackingTable } from "./ftd-tracking.table";
import { postbackLogsTable } from "./postback-logs.table";
import { referralsTable } from "./referrals.table";

export const affiliateStatusEnum = pgEnum("affiliate_status", [
	"active",
	"inactive",
	"suspended",
]);

export const affiliatesTable = pgTable(
	"affiliates",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		name: varchar("name", { length: 100 }).notNull().unique(),
		slug: varchar("slug", { length: 100 })
			.notNull()
			.unique()
			.generatedAlwaysAs(
				(): SQL => sql`lower(replace(${affiliatesTable.name}, ' ', '-'))`,
			),
		affiliateCode: varchar("affiliate_code", { length: 50 }).unique(),
		// email: varchar("email", { length: 100 }).unique(),
		commissionRate: varchar("commission_rate", { length: 5 }).default("0.00"), // Percentage as string
		status: affiliateStatusEnum("status").default("active"),
		trackingDomain: varchar("tracking_domain", { length: 100 }),
		postbackUrl: varchar("postback_url", { length: 500 }),
		...timestamps,
	},
	(table) => [
		index("table_affiliates_name_idx").on(table.name),
		index("table_affiliates_affiliate_code_idx").on(table.affiliateCode),
		index("table_affiliates_status_idx").on(table.status),
	],
);

export const affiliatesRelations = relations(affiliatesTable, ({ many }) => ({
	clicks: many(clickTrackingTable),
	ftds: many(ftdTrackingTable),
	postbackLogs: many(postbackLogsTable),
	referrals: many(referralsTable),
}));

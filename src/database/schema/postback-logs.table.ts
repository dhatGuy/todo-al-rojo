import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "../timestamps";
import { affiliatesTable } from "./affiliates.table";
import { ftdTrackingTable } from "./ftd-tracking.table";

export const postbackLogsTable = pgTable("postback_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  ftdId: uuid("ftd_id").references(() => ftdTrackingTable.id, {
    onDelete: "cascade",
  }),
  affiliateId: uuid("affiliate_id").references(() => affiliatesTable.id, {
    onDelete: "set null",
  }),
  postbackUrl: varchar("postback_url", { length: 500 }).notNull(),
  requestPayload: jsonb("request_payload").notNull(),
  responseCode: integer("response_code").notNull(),
  responseBody: text("response_body").notNull(),
  success: boolean("success").notNull(),
  ...timestamps,
});

export const postbackLogsRelations = relations(
  postbackLogsTable,
  ({ one }) => ({
    ftd: one(ftdTrackingTable, {
      fields: [postbackLogsTable.ftdId],
      references: [ftdTrackingTable.id],
    }),
    affiliate: one(affiliatesTable, {
      fields: [postbackLogsTable.affiliateId],
      references: [affiliatesTable.id],
    }),
  }),
);

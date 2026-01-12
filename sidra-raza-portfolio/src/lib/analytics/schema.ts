import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const analytics = sqliteTable("analytics", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  timestamp: integer("timestamp", { mode: "timestamp_ms" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  ip: text("ip"),
  userAgent: text("user_agent"),
  country: text("country"),
  city: text("city"),
  region: text("region"),
  timezone: text("timezone"),
  pageViewed: text("page_viewed"),
  sessionId: text("session_id"),
});
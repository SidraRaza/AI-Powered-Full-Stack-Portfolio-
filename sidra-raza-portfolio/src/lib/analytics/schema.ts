import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const analytics = pgTable("analytics", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  ip: text("ip"),
  userAgent: text("user_agent"),
  country: text("country"),
  city: text("city"),
  region: text("region"),
  timezone: text("timezone"),
  pageViewed: text("page_viewed"),
  sessionId: text("session_id"),
});

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(), // Hashed password
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
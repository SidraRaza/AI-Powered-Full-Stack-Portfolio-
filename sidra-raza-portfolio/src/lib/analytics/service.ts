import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { sql, and, eq } from "drizzle-orm";
import * as schema from "./schema";

// Initialize Neon PostgreSQL database
const neonSql = neon(process.env.NEON_DATABASE_URL!);
export const db = drizzle(neonSql, { schema });

// Interface for analytics data
export interface UserAnalytics {
  id: string;
  userId: string;
  timestamp: Date;
  ip: string;
  userAgent: string;
  country: string;
  city: string;
  region: string;
  timezone: string;
  pageViewed: string;
  sessionId: string;
}

// Function to record user activity
export async function recordUserActivity(userId: string, req: Request) {
  try {
    const userAgent = req.headers.get("user-agent") || "Unknown";
    const ip = getClientIP(req) ?? "Unknown";
    const country = await getCountryFromIP(ip);

    const analyticsEntry: UserAnalytics = {
      id: crypto.randomUUID(),
      userId,
      timestamp: new Date(),
      ip,
      userAgent,
      country,
      city: "",
      region: "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      pageViewed: req.url,
      sessionId: crypto.randomUUID(),
    };

    await db.insert(schema.analytics).values(analyticsEntry);

    return analyticsEntry;
  } catch (error) {
    console.error("Error recording user activity:", error);
    throw error;
  }
}

// Get client IP
function getClientIP(req: Request): string | null {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    req.headers.get("x-client-ip") ||
    null
  );
}

// Placeholder geolocation
async function getCountryFromIP(ip: string): Promise<string> {
  if (!ip || ip === "Unknown") return "Unknown";
  const countries = ["US", "IN", "GB", "CA", "DE", "AU", "FR", "JP"];
  return countries[Math.floor(Math.random() * countries.length)];
}

// -------------------- ANALYTICS QUERIES --------------------

export async function getDailyAnalytics(date: Date = new Date(), userId?: string) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  let condition = and(
    sql`${schema.analytics.timestamp} >= ${start}`,
    sql`${schema.analytics.timestamp} <= ${end}`
  );

  if (userId) {
    condition = and(condition, eq(schema.analytics.userId, userId));
  }

  return db.select().from(schema.analytics).where(condition);
}

export async function getWeeklyAnalytics(weekOffset = 0, userId?: string) {
  const date = new Date();
  date.setDate(date.getDate() - (date.getDay() + weekOffset * 7));

  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  let condition = and(
    sql`${schema.analytics.timestamp} >= ${start}`,
    sql`${schema.analytics.timestamp} <= ${end}`
  );

  if (userId) {
    condition = and(condition, eq(schema.analytics.userId, userId));
  }

  return db.select().from(schema.analytics).where(condition);
}

export async function getMonthlyAnalytics(monthOffset = 0, userId?: string) {
  const date = new Date();
  date.setMonth(date.getMonth() - monthOffset);

  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

  let condition = and(
    sql`${schema.analytics.timestamp} >= ${start}`,
    sql`${schema.analytics.timestamp} <= ${end}`
  );

  if (userId) {
    condition = and(condition, eq(schema.analytics.userId, userId));
  }

  return db.select().from(schema.analytics).where(condition);
}

export async function getCountryAnalytics(from: Date, to: Date, userId?: string) {
  let condition = and(
    sql`${schema.analytics.timestamp} >= ${from}`,
    sql`${schema.analytics.timestamp} <= ${to}`
  );

  if (userId) {
    condition = and(condition, eq(schema.analytics.userId, userId));
  }

  return db
    .select({
      country: schema.analytics.country,
      count: sql<number>`COUNT(*)`.as("count"),
    })
    .from(schema.analytics)
    .where(condition)
    .groupBy(schema.analytics.country);
}

export async function getTotalUsers() {
  const result = await db
    .select({
      count: sql<number>`COUNT(DISTINCT ${schema.analytics.userId})`.as("count"),
    })
    .from(schema.analytics);

  return result[0]?.count ?? 0;
}

export async function getDailyActiveUsers(date = new Date(), userId?: string) {
  const data = await getDailyAnalytics(date, userId);
  return new Set(data.map(d => d.userId)).size;
}

export async function getWeeklyActiveUsers(weekOffset = 0, userId?: string) {
  const data = await getWeeklyAnalytics(weekOffset, userId);
  return new Set(data.map(d => d.userId)).size;
}

export async function getMonthlyActiveUsers(monthOffset = 0, userId?: string) {
  const data = await getMonthlyAnalytics(monthOffset, userId);
  return new Set(data.map(d => d.userId)).size;
}

export async function getUserStats(userId: string) {
  return {
    totalUsers: await getTotalUsers(),
    dailyActive: await getDailyActiveUsers(new Date(), userId),
    weeklyActive: await getWeeklyActiveUsers(0, userId),
    monthlyActive: await getMonthlyActiveUsers(0, userId),
  };
}

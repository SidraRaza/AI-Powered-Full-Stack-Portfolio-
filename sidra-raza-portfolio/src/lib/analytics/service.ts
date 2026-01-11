import Database from "better-sqlite3";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

// Initialize SQLite database
const sqlite = new Database("analytics.db");
const db = drizzle(sqlite, { schema });

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
    // Extract client information
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const ip = getClientIP(req) || 'Unknown';
    const country = await getCountryFromIP(ip);

    const analyticsEntry = {
      id: crypto.randomUUID(),
      userId,
      timestamp: new Date(),
      ip,
      userAgent,
      country,
      city: '', // Could be retrieved from IP geolocation service
      region: '', // Could be retrieved from IP geolocation service
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      pageViewed: req.url,
      sessionId: crypto.randomUUID(), // In a real implementation, you'd use the actual session ID
    };

    // Insert analytics data into database
    await db.insert(schema.analytics).values(analyticsEntry);

    return analyticsEntry;
  } catch (error) {
    console.error("Error recording user activity:", error);
    throw error;
  }
}

// Function to get client IP (simplified)
function getClientIP(req: Request): string | null {
  // In a real implementation, you'd check multiple headers
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
         req.headers.get('x-real-ip') ||
         req.headers.get('x-client-ip') ||
         null;
}

// Function to get country from IP (placeholder - would use a geolocation service)
async function getCountryFromIP(ip: string): Promise<string> {
  // This is a placeholder. In a real implementation, you'd call a geolocation API
  // like ipapi.co, ipinfo.io, etc.
  if (ip === 'Unknown' || !ip) return 'Unknown';

  // For demo purposes, return a random country
  const countries = ['US', 'IN', 'GB', 'CA', 'DE', 'AU', 'FR', 'JP'];
  return countries[Math.floor(Math.random() * countries.length)];
}

// Analytics retrieval functions
export async function getDailyAnalytics(date: Date = new Date()) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const result = await db.select()
    .from(schema.analytics)
    .where(
      sql`${schema.analytics.timestamp} >= ${startOfDay} AND ${schema.analytics.timestamp} <= ${endOfDay}`
    );

  return result;
}

export async function getWeeklyAnalytics(weekOffset: number = 0) {
  const date = new Date();
  date.setDate(date.getDate() - (date.getDay() + (weekOffset * 7)));

  const startOfWeek = new Date(date);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const result = await db.select()
    .from(schema.analytics)
    .where(
      sql`${schema.analytics.timestamp} >= ${startOfWeek} AND ${schema.analytics.timestamp} <= ${endOfWeek}`
    );

  return result;
}

export async function getMonthlyAnalytics(monthOffset: number = 0) {
  const date = new Date();
  date.setMonth(date.getMonth() - monthOffset);

  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

  const result = await db.select()
    .from(schema.analytics)
    .where(
      sql`${schema.analytics.timestamp} >= ${startOfMonth} AND ${schema.analytics.timestamp} <= ${endOfMonth}`
    );

  return result;
}

export async function getCountryAnalytics(fromDate: Date, toDate: Date) {
  const result = await db.select({
    country: schema.analytics.country,
    count: sql<number>`COUNT(*)`.as('count'),
  })
    .from(schema.analytics)
    .where(
      sql`${schema.analytics.timestamp} >= ${fromDate} AND ${schema.analytics.timestamp} <= ${toDate}`
    )
    .groupBy(schema.analytics.country);

  return result;
}

// Function to get total user count
export async function getTotalUsers() {
  const result = await db.select({ count: sql<number>`COUNT(DISTINCT ${schema.analytics.userId})`.as('count') })
    .from(schema.analytics);

  return result[0]?.count || 0;
}

// Function to get daily active users
export async function getDailyActiveUsers(date: Date = new Date()) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const result = await db.select({ count: sql<number>`COUNT(DISTINCT ${schema.analytics.userId})`.as('count') })
    .from(schema.analytics)
    .where(
      sql`${schema.analytics.timestamp} >= ${startOfDay} AND ${schema.analytics.timestamp} <= ${endOfDay}`
    );

  return result[0]?.count || 0;
}

// Function to get weekly active users
export async function getWeeklyActiveUsers(weekOffset: number = 0) {
  const date = new Date();
  date.setDate(date.getDate() - (date.getDay() + (weekOffset * 7)));

  const startOfWeek = new Date(date);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const result = await db.select({ count: sql<number>`COUNT(DISTINCT ${schema.analytics.userId})`.as('count') })
    .from(schema.analytics)
    .where(
      sql`${schema.analytics.timestamp} >= ${startOfWeek} AND ${schema.analytics.timestamp} <= ${endOfWeek}`
    );

  return result[0]?.count || 0;
}

// Function to get monthly active users
export async function getMonthlyActiveUsers(monthOffset: number = 0) {
  const date = new Date();
  date.setMonth(date.getMonth() - monthOffset);

  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

  const result = await db.select({ count: sql<number>`COUNT(DISTINCT ${schema.analytics.userId})`.as('count') })
    .from(schema.analytics)
    .where(
      sql`${schema.analytics.timestamp} >= ${startOfMonth} AND ${schema.analytics.timestamp} <= ${endOfMonth}`
    );

  return result[0]?.count || 0;
}
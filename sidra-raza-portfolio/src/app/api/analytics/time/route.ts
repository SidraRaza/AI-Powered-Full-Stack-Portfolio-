import { NextRequest } from "next/server";
import { auth } from "@/lib/auth/server";
import {
  getDailyAnalytics,
  getWeeklyAnalytics,
  getMonthlyAnalytics
} from "@/lib/analytics/service";

export async function GET(request: NextRequest) {
  try {
    // Verify user has a valid session by checking the session token in cookies
    const token = request.cookies.get('session_token')?.value;

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token - getUserFromToken is async
    const user = await auth.getUserFromToken(token);
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = new URL(request.url).searchParams;
    const range = searchParams.get("range") || "daily";

    let data;

    switch (range) {
      case "daily":
        data = await getDailyAnalytics(new Date(), user.id);
        break;
      case "weekly":
        const weekOffset = parseInt(searchParams.get("offset") || "0");
        data = await getWeeklyAnalytics(weekOffset, user.id);
        break;
      case "monthly":
        const monthOffset = parseInt(searchParams.get("offset") || "0");
        data = await getMonthlyAnalytics(monthOffset, user.id);
        break;
      default:
        return Response.json({ error: "Invalid range" }, { status: 400 });
    }

    // Process the data to match the chart format
    let processedData: Array<{[key: string]: number|string}> = [];

    if (range === "daily") {
      // Group by day of week
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayCounts: Record<string, number> = {};

      // Initialize all days with 0
      days.forEach(day => dayCounts[day] = 0);

      // Count users per day
      data.forEach(item => {
        const day = days[new Date(item.timestamp).getDay()];
        dayCounts[day] = (dayCounts[day] || 0) + 1;
      });

      processedData = days.map(day => ({
        day,
        users: dayCounts[day]
      }));
    } else if (range === "weekly") {
      // Group by week
      const weekCounts: Record<string, number> = {};

      // Initialize with empty data
      for (let i = 1; i <= 4; i++) {
        weekCounts[`Week ${i}`] = 0;
      }

      // Count users per week
      data.forEach(item => {
        // For simplicity, we'll group by an arbitrary week number
        const weekIndex = Math.floor(data.indexOf(item) / (data.length / 4)) + 1;
        const weekKey = `Week ${Math.min(weekIndex, 4)}`;
        weekCounts[weekKey] = (weekCounts[weekKey] || 0) + 1;
      });

      processedData = Object.entries(weekCounts).map(([week, users]) => ({
        week,
        users: users as number
      }));
    } else if (range === "monthly") {
      // Group by month
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      const monthCounts: Record<string, number> = {};

      // Initialize all months with 0
      months.forEach(month => monthCounts[month] = 0);

      // Count users per month
      data.forEach(item => {
        const month = months[new Date(item.timestamp).getMonth()];
        monthCounts[month] = (monthCounts[month] || 0) + 1;
      });

      processedData = months.map(month => ({
        month,
        users: monthCounts[month]
      }));
    }

    return Response.json(processedData);
  } catch (error) {
    console.error("Error fetching time analytics:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
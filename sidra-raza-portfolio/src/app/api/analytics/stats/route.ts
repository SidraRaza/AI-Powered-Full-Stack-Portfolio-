import { NextRequest } from "next/server";
import { auth } from "@/lib/auth/server";
import {
  getTotalUsers,
  getDailyActiveUsers,
  getWeeklyActiveUsers,
  getMonthlyActiveUsers
} from "@/lib/analytics/service";

export async function GET(request: NextRequest) {
  try {
    // Verify user has a valid session by checking the session token in cookies
    const token = request.cookies.get('session_token')?.value;

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token
    const user = auth.getUserFromToken(token);
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const stats = {
      totalUsers: await getTotalUsers(),
      dailyActive: await getDailyActiveUsers(),
      weeklyActive: await getWeeklyActiveUsers(),
      monthlyActive: await getMonthlyActiveUsers(),
    };

    return Response.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
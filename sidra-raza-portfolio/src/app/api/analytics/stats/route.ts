import { NextRequest } from "next/server";
import { auth } from "@/lib/auth/server";
import {
  getUserStats
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

    // Get user-specific stats
    const stats = await getUserStats(user.id);

    return Response.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
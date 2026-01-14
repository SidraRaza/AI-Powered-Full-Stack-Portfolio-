import { NextRequest } from "next/server";
import { auth } from "@/lib/auth/server";
import { getUserStats } from "@/lib/analytics/service";

export async function GET(request: NextRequest) {
  try {
    // ✅ BUILD-SAFE GUARD (MOST IMPORTANT)
    if (!process.env.DATABASE_URL) {
      return Response.json(
        { visits: 0, message: "Analytics disabled (no DB)" },
        { status: 200 }
      );
    }

    // Verify session token
    const token = request.cookies.get("session_token")?.value;
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await auth.getUserFromToken(token);
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // DB call ONLY when env exists
    const stats = await getUserStats(user.id);
    return Response.json(stats);

  } catch (error) {
    console.error("Error fetching stats:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

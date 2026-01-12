import { NextRequest } from "next/server";
import { auth } from "@/lib/auth/server";
import { getCountryAnalytics } from "@/lib/analytics/service";

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

    const searchParams = new URL(request.url).searchParams;
    const days = parseInt(searchParams.get("days") || "30"); // Default to last 30 days

    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    const data = await getCountryAnalytics(fromDate, toDate);

    // Format the data for the pie chart
    const processedData = data.map(item => ({
      name: item.country,
      value: Number(item.count)
    }));

    return Response.json(processedData);
  } catch (error) {
    console.error("Error fetching country analytics:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
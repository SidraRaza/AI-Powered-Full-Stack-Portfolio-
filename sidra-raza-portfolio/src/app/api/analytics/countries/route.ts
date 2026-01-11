import { NextRequest } from "next/server";
import { auth } from "@/lib/auth/server";
import { getCountryAnalytics } from "@/lib/analytics/service";

export async function GET(request: NextRequest) {
  try {
    // Verify user has a valid session
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
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
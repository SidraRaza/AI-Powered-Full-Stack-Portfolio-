import { auth } from "@/lib/auth/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Get the cookie safely
  const token = req.cookies.get("session_token")?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  // getUserFromToken might be async
  const user = await auth.getUserFromToken(token);

  if (!user) {
    return NextResponse.json({ user: null });
  }

  // Return session-like object
  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      // Add any other properties your dashboard expects
    },
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h
  });
}

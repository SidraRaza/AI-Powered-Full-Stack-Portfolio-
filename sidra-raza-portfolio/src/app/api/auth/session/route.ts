import { auth } from "@/lib/auth/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get('session_token')?.value;

  if (token) {
    const user = auth.getUserFromToken(token);
    if (user) {
      // Return a session-like object that matches what the dashboard expects
      return NextResponse.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          // Add other properties that dashboard might expect
        },
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
      });
    }
  }

  return NextResponse.json({ user: null });
}
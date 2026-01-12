import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Create response and clear the session cookie
  const response = NextResponse.json({ success: true });
  response.cookies.delete('session_token');
  return response;
}
import { auth } from "@/lib/auth/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const result = auth.login(email, password);

    if (result) {
      // Create response with cookie
      const response = NextResponse.json({
        success: true,
        user: result.user,
      });

      // Set the session cookie
      response.cookies.set('session_token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
        sameSite: 'strict',
      });

      return response;
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
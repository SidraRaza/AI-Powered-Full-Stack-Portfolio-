import { auth } from "@/lib/auth/server";
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, createRateLimitHeaders } from "@/lib/ai/rate-limit";

// Helper function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to validate password strength
function isValidPassword(password: string): boolean {
  // At least 8 characters, with at least one letter and one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
}

// Helper function to validate name
function isValidName(name: string): boolean {
  // Name should be 2–50 characters, allowed chars only
  const nameRegex = /^[A-Za-z\s\-']{2,50}$/;
  return nameRegex.test(name);
}

// ✅ FIXED: Safe client IP extraction (App Router compatible)
function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIP = req.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  // Safe fallback (local / unknown)
  return "127.0.0.1";
}

export async function POST(req: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = getClientIP(req);

    // Check rate limit for registration attempts
    const rateLimitResult = await checkRateLimit(ip, "auth");
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many registration attempts. Please try again later." },
        {
          status: 429,
          headers: createRateLimitHeaders(rateLimitResult),
        }
      );
    }

    const body = await req.json();
    const { email, name, password } = body;

    // Input validation
    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!name || typeof name !== "string" || !isValidName(name)) {
      return NextResponse.json(
        {
          error:
            "Name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes",
        },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string" || !isValidPassword(password)) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 8 characters with at least one letter and one number",
        },
        { status: 400 }
      );
    }

    // Trim input
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();

    // Register user
    const result = await auth.register(trimmedEmail, trimmedName, password);

    if ("error" in result) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    // Success response
    const response = NextResponse.json(
      {
        success: true,
        user: result.user,
      },
      {
        headers: createRateLimitHeaders(rateLimitResult),
      }
    );

    // Set secure session cookie
    response.cookies.set("session_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}

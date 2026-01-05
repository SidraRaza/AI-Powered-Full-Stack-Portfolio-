import { NextRequest, NextResponse } from "next/server";
import { createSSEStream } from "@/lib/ai/stream";
import { checkRateLimit, createRateLimitHeaders } from "@/lib/ai/rate-limit";
import {
  VALIDATOR_SYSTEM_PROMPT,
  buildValidatorUserPrompt,
} from "@/lib/ai/prompts/validator";
import { createGroqAgent, AgentMessage } from "@/lib/ai/groq-agents";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    // Get client identifier for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const rateLimitResult = await checkRateLimit(ip, "validator");

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please try again later.",
          reset: rateLimitResult.reset,
        },
        {
          status: 429,
          headers: createRateLimitHeaders(rateLimitResult),
        }
      );
    }

    const body = await request.json();
    const { idea, targetMarket, problem, competition } = body;

    if (!idea || idea.trim().length < 10) {
      return NextResponse.json(
        { error: "Business idea is required (minimum 10 characters)" },
        { status: 400 }
      );
    }

    const userPrompt = buildValidatorUserPrompt({
      idea,
      targetMarket,
      problem,
      competition,
    });

    // Create and execute Groq agent
    const agent = createGroqAgent({
      model: 'llama-3.1-8b-instant', // Using the current supported model
      temperature: 0.8, // Slightly higher for more varied feedback
      maxTokens: 2000,
      systemPrompt: VALIDATOR_SYSTEM_PROMPT,
    });

    const messages: AgentMessage[] = [
      { role: "user", content: userPrompt },
    ];

    const sseStream = await agent.createStream(messages);

    return new Response(sseStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        ...createRateLimitHeaders(rateLimitResult),
      },
    });
  } catch (error) {
    console.error("Validator API error:", error);

    if (error instanceof Error) {
      if (error.message.includes("GROQ_API_KEY")) {
        return NextResponse.json(
          { error: "AI service configuration error. Please contact the administrator." },
          { status: 500 }
        );
      }
      if (error.message.includes("Rate limit")) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }
      if (error.message.includes("AI service temporarily unavailable")) {
        return NextResponse.json(
          { error: error.message },
          { status: 503 }
        );
      }
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to validate idea. Please try again." },
      { status: 500 }
    );
  }
}

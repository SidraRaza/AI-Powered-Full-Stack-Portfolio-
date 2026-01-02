import { NextRequest, NextResponse } from "next/server";
import { streamChatCompletion } from "@/lib/ai/openai";
import { createSSEStream, openAIStreamToIterator } from "@/lib/ai/stream";
import { checkRateLimit, createRateLimitHeaders } from "@/lib/ai/rate-limit";
import {
  CONTENT_SYSTEM_PROMPT,
  buildContentUserPrompt,
} from "@/lib/ai/prompts/content";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    // Get client identifier for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const rateLimitResult = await checkRateLimit(ip, "content");

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
    const { topic, audience, platform, goal } = body;

    if (!topic || topic.trim().length < 3) {
      return NextResponse.json(
        { error: "Topic is required (minimum 3 characters)" },
        { status: 400 }
      );
    }

    const userPrompt = buildContentUserPrompt({
      topic,
      audience,
      platform,
      goal,
    });

    const stream = await streamChatCompletion({
      messages: [
        { role: "system", content: CONTENT_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      maxTokens: 2500, // Content strategies can be longer
    });

    const textIterator = openAIStreamToIterator(stream);
    const sseStream = createSSEStream(textIterator);

    return new Response(sseStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        ...createRateLimitHeaders(rateLimitResult),
      },
    });
  } catch (error) {
    console.error("Content API error:", error);

    if (error instanceof Error && error.message.includes("API")) {
      return NextResponse.json(
        { error: "AI service temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate content strategy. Please try again." },
      { status: 500 }
    );
  }
}

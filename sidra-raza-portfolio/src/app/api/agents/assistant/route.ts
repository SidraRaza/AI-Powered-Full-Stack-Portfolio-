import { NextRequest, NextResponse } from "next/server";
import { streamChatCompletion } from "@/lib/ai/openai";
import { createSSEStream, openAIStreamToIterator } from "@/lib/ai/stream";
import { checkRateLimit, createRateLimitHeaders } from "@/lib/ai/rate-limit";
import { ASSISTANT_SYSTEM_PROMPT } from "@/lib/ai/prompts/assistant";
import OpenAI from "openai";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    // Get client identifier for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const rateLimitResult = await checkRateLimit(ip, "assistant");

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
    const { message, conversationHistory } = body;

    if (!message || message.trim().length < 1) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Build messages array with conversation history
    const messages: OpenAI.ChatCompletionMessageParam[] = [
      { role: "system", content: ASSISTANT_SYSTEM_PROMPT },
    ];

    // Add conversation history if provided (limit to last 10 messages)
    if (conversationHistory && Array.isArray(conversationHistory)) {
      const recentHistory = conversationHistory.slice(-10);
      for (const msg of recentHistory) {
        if (msg.role === "user" || msg.role === "assistant") {
          messages.push({
            role: msg.role,
            content: msg.content,
          });
        }
      }
    }

    // Add the new message
    messages.push({ role: "user", content: message });

    const stream = await streamChatCompletion({
      messages,
      model: "gpt-4-turbo-preview",
      temperature: 0.7,
      maxTokens: 500, // Keep assistant responses concise
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
    console.error("Assistant API error:", error);

    if (error instanceof Error && error.message.includes("API")) {
      return NextResponse.json(
        { error: "AI service temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to get response. Please try again." },
      { status: 500 }
    );
  }
}

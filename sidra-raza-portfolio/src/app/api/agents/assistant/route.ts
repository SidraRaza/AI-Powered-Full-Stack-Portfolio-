import { NextRequest, NextResponse } from "next/server";
import { createSSEStream } from "@/lib/ai/stream";
import { checkRateLimit, createRateLimitHeaders } from "@/lib/ai/rate-limit";
import { ASSISTANT_SYSTEM_PROMPT } from "@/lib/ai/prompts/assistant";
import { createGroqAgent, AgentMessage } from "@/lib/ai/groq-agents";

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
    const messages: AgentMessage[] = [];

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

    // Create and execute Groq agent
    const agent = createGroqAgent({
      model: 'llama-3.1-8b-instant', // Using the current supported model
      temperature: 0.7, // Balanced for helpful responses
      maxTokens: 500, // Keep assistant responses concise
      systemPrompt: ASSISTANT_SYSTEM_PROMPT,
    });

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
    console.error("Assistant API error:", error);

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
      { error: "Failed to get response. Please try again." },
      { status: 500 }
    );
  }
}

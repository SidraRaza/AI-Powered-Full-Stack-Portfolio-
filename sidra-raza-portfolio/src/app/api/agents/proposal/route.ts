import { NextRequest, NextResponse } from "next/server";
import { streamChatCompletion } from "@/lib/ai/openai";
import { createSSEStream, openAIStreamToIterator } from "@/lib/ai/stream";
import { checkRateLimit, createRateLimitHeaders } from "@/lib/ai/rate-limit";
import {
  PROPOSAL_SYSTEM_PROMPT,
  buildProposalUserPrompt,
} from "@/lib/ai/prompts/proposal";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    // Get client identifier for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const rateLimitResult = await checkRateLimit(ip, "proposal");

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
    const { projectDescription, clientIndustry, budget, timeline, expertise } =
      body;

    if (!projectDescription || projectDescription.trim().length < 10) {
      return NextResponse.json(
        { error: "Project description is required (minimum 10 characters)" },
        { status: 400 }
      );
    }

    const userPrompt = buildProposalUserPrompt({
      projectDescription,
      clientIndustry,
      budget,
      timeline,
      expertise,
    });

    const stream = await streamChatCompletion({
      messages: [
        { role: "system", content: PROPOSAL_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      maxTokens: 2000,
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
    console.error("Proposal API error:", error);

    // Check if it's an API key error
    if (error instanceof Error && error.message.includes("API")) {
      return NextResponse.json(
        { error: "AI service temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate proposal. Please try again." },
      { status: 500 }
    );
  }
}

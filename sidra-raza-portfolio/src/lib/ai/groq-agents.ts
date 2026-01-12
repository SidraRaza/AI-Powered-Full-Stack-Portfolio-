import { groqClient } from "@/lib/groq";
import { createSSEStream } from "@/lib/ai/stream";

/**
 * Server-side only agent that uses Groq API
 * This ensures API keys are never exposed to the client
 */
export interface AgentConfig {
  model?: string; // Default: 'llama-3.1-8b-instant'
  temperature?: number; // Default: 0.7
  maxTokens?: number; // Default: 1000
  systemPrompt: string;
}

export interface AgentMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

/**
 * Create a Groq-based agent with specified configuration
 * SERVER-ONLY
 */
export function createGroqAgent(config: AgentConfig) {
  const {
    model = "llama-3.1-8b-instant",
    temperature = 0.7,
    maxTokens = 1000,
    systemPrompt,
  } = config;

  return {
    /**
     * Execute a single completion
     */
    async execute(messages: AgentMessage[]): Promise<string> {
      try {
        validateMessages(messages);

        const fullMessages: AgentMessage[] = [
          { role: "system", content: systemPrompt },
          ...messages,
        ];

        const completion = await groqClient.chat.completions.create({
          model,
          temperature,
          max_tokens: maxTokens,
          messages: fullMessages,
        });

        return completion.choices[0]?.message?.content ?? "";
      } catch (error) {
        throw formatGroqError(error);
      }
    },

    /**
     * Create a streaming response
     */
    async createStream(messages: AgentMessage[]) {
      try {
        validateMessages(messages);

        const fullMessages: AgentMessage[] = [
          { role: "system", content: systemPrompt },
          ...messages,
        ];

        const stream = await groqClient.chat.completions.create({
          model,
          temperature,
          max_tokens: maxTokens,
          stream: true,
          messages: fullMessages,
        });

        const textIterator = async function* () {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) yield content;
          }
        };

        return createSSEStream(textIterator());
      } catch (error) {
        throw formatGroqError(error);
      }
    },
  };
}

/**
 * Validate messages before sending to Groq
 */
function validateMessages(messages: AgentMessage[]) {
  if (!messages || messages.length === 0) {
    throw new Error("No messages provided");
  }

  const validMessages = messages.filter(
    (msg) =>
      msg &&
      typeof msg.content === "string" &&
      msg.content.trim().length > 0 &&
      ["user", "assistant", "system"].includes(msg.role)
  );

  if (!validMessages.some((msg) => msg.role === "user")) {
    throw new Error("At least one user message is required");
  }
}

/**
 * Format Groq API errors
 */
function formatGroqError(error: unknown): Error {
  if (error instanceof Error) {
    if (/401|auth/i.test(error.message)) {
      return new Error("Invalid or missing GROQ_API_KEY.");
    }
    if (/429|rate/i.test(error.message)) {
      return new Error("Rate limit exceeded. Try again later.");
    }
    if (/400|invalid/i.test(error.message)) {
      return new Error("Invalid request to Groq API.");
    }
    if (/503|unavailable/i.test(error.message)) {
      return new Error("Groq service temporarily unavailable.");
    }
    return error;
  }

  return new Error("Unknown Groq API error.");
}

/**
 * Example Content Agent
 * SERVER-ONLY
 */
export const contentAgent = createGroqAgent({
  model: "llama-3.1-8b-instant",
  temperature: 0.8,
  maxTokens: 1500,
  systemPrompt: `
You are an expert content creator and strategist.
Create high-quality, engaging, original content aligned with the user's goals.
Be professional, creative, and audience-focused.
`,
});

import Anthropic from "@anthropic-ai/sdk";

// Singleton pattern for Anthropic client
let anthropicClient: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
  if (!anthropicClient) {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY is not set in environment variables");
    }

    anthropicClient = new Anthropic({
      apiKey,
    });
  }

  return anthropicClient;
}

// Helper for streaming messages
export async function streamClaudeMessage({
  system,
  messages,
  model = "claude-3-sonnet-20240229",
  temperature = 0.7,
  maxTokens = 2000,
}: {
  system: string;
  messages: Anthropic.MessageParam[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
}) {
  const client = getAnthropicClient();

  const stream = await client.messages.stream({
    model,
    system,
    messages,
    max_tokens: maxTokens,
    temperature,
  });

  return stream;
}

// Non-streaming message for simple use cases
export async function claudeMessage({
  system,
  messages,
  model = "claude-3-sonnet-20240229",
  temperature = 0.7,
  maxTokens = 2000,
}: {
  system: string;
  messages: Anthropic.MessageParam[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
}): Promise<string> {
  const client = getAnthropicClient();

  const response = await client.messages.create({
    model,
    system,
    messages,
    max_tokens: maxTokens,
    temperature,
  });

  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock?.type === "text" ? textBlock.text : "";
}

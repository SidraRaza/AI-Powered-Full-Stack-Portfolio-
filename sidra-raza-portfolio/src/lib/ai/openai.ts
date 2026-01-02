import OpenAI from "openai";

// Singleton pattern for OpenAI client
let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not set in environment variables");
    }

    openaiClient = new OpenAI({
      apiKey,
    });
  }

  return openaiClient;
}

// Helper for streaming chat completions
export async function streamChatCompletion({
  messages,
  model = "gpt-4-turbo-preview",
  temperature = 0.7,
  maxTokens = 2000,
}: {
  messages: OpenAI.ChatCompletionMessageParam[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
}) {
  const client = getOpenAIClient();

  const stream = await client.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens: maxTokens,
    stream: true,
  });

  return stream;
}

// Non-streaming completion for simple use cases
export async function chatCompletion({
  messages,
  model = "gpt-4-turbo-preview",
  temperature = 0.7,
  maxTokens = 2000,
}: {
  messages: OpenAI.ChatCompletionMessageParam[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
}): Promise<string> {
  const client = getOpenAIClient();

  const response = await client.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens: maxTokens,
  });

  return response.choices[0]?.message?.content || "";
}

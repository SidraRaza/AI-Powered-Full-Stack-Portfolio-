// Utilities for handling streaming responses

/**
 * Creates a ReadableStream from an async iterator of text chunks
 */
export function createStreamResponse(
  iterator: AsyncIterable<string>
): ReadableStream {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of iterator) {
          controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
}

/**
 * Async generator that yields text chunks from OpenAI stream
 */
export async function* openAIStreamToIterator(
  stream: AsyncIterable<{ choices: Array<{ delta: { content?: string | null } }> }>
): AsyncGenerator<string> {
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      yield content;
    }
  }
}

/**
 * Async generator that yields text chunks from Anthropic stream
 */
export async function* anthropicStreamToIterator(
  stream: AsyncIterable<{ type: string; delta?: { text?: string } }>
): AsyncGenerator<string> {
  for await (const event of stream) {
    if (event.type === "content_block_delta" && event.delta?.text) {
      yield event.delta.text;
    }
  }
}

/**
 * Creates SSE (Server-Sent Events) formatted stream
 */
export function createSSEStream(
  iterator: AsyncIterable<string>
): ReadableStream {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of iterator) {
          const data = `data: ${JSON.stringify({ content: chunk })}\n\n`;
          controller.enqueue(encoder.encode(data));
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        const errorData = `data: ${JSON.stringify({ error: "Stream error" })}\n\n`;
        controller.enqueue(encoder.encode(errorData));
        controller.close();
      }
    },
  });
}

/**
 * Helper to parse SSE stream on the client
 */
export async function* parseSSEStream(
  response: Response
): AsyncGenerator<string> {
  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body");

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6);
        if (data === "[DONE]") return;
        try {
          const parsed = JSON.parse(data);
          if (parsed.content) yield parsed.content;
          if (parsed.error) throw new Error(parsed.error);
        } catch {
          // Skip malformed JSON
        }
      }
    }
  }
}

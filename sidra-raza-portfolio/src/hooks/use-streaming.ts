"use client";

import { useState, useCallback, useRef } from "react";

interface UseStreamingOptions {
  onError?: (error: string) => void;
  onComplete?: (fullText: string) => void;
}

interface UseStreamingReturn {
  text: string;
  isStreaming: boolean;
  error: string | null;
  stream: (url: string, body: Record<string, unknown>) => Promise<void>;
  reset: () => void;
}

export function useStreaming(options: UseStreamingOptions = {}): UseStreamingReturn {
  const [text, setText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    setText("");
    setError(null);
    setIsStreaming(false);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const stream = useCallback(
    async (url: string, body: Record<string, unknown>) => {
      // Reset state
      setText("");
      setError(null);
      setIsStreaming(true);

      // Create abort controller
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("No response body");
        }

        const decoder = new TextDecoder();
        let buffer = "";
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") {
                continue;
              }
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  fullText += parsed.content;
                  setText(fullText);
                }
                if (parsed.error) {
                  throw new Error(parsed.error);
                }
              } catch (e) {
                // Skip malformed JSON
                if (e instanceof Error && e.message !== "Unexpected end of JSON input") {
                  console.warn("Parse error:", e);
                }
              }
            }
          }
        }

        options.onComplete?.(fullText);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            // Request was aborted, don't set error
            return;
          }
          setError(err.message);
          options.onError?.(err.message);
        } else {
          setError("An unexpected error occurred");
          options.onError?.("An unexpected error occurred");
        }
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    [options]
  );

  return {
    text,
    isStreaming,
    error,
    stream,
    reset,
  };
}

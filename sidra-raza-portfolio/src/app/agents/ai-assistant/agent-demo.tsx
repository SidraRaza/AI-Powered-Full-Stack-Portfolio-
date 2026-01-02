"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare, ArrowLeft, Send, User, Bot, AlertCircle } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestedQuestions = [
  "What services do you offer?",
  "How much does a project cost?",
  "What's your process?",
  "Are you available for new projects?",
];

export function AgentDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Sidra's AI assistant. I can answer questions about her services, process, and availability. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message: string) => {
    if (!message.trim() || isStreaming) return;

    const userMessage = message.trim();
    setInput("");
    setError(null);

    // Add user message
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);

    // Add empty assistant message that will be streamed into
    setMessages([...newMessages, { role: "assistant", content: "" }]);
    setIsStreaming(true);

    try {
      const response = await fetch("/api/agents/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                assistantContent += parsed.content;
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: assistantContent,
                  };
                  return updated;
                });
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get response");
      // Remove the empty assistant message on error
      setMessages(newMessages);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <>
      <Section className="pt-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <Link
            href="/agents"
            className="inline-flex items-center text-text-muted hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to AI Agents
          </Link>

          <div className="flex items-start gap-4 mb-8">
            <div className="p-4 rounded-xl bg-success/10">
              <MessageSquare className="w-8 h-8 text-success" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">AI Assistant</h1>
                <Badge variant="success">
                  <span className="w-2 h-2 rounded-full bg-current mr-1.5 animate-pulse" />
                  Live AI
                </Badge>
              </div>
              <p className="text-text-muted text-lg">
                Ask anything about working with Sidra. Available 24/7.
              </p>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-error/10 border border-error/30 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-error shrink-0" />
              <p className="text-error">{error}</p>
            </motion.div>
          )}

          {/* Chat Window */}
          <div className="rounded-xl bg-surface border border-border overflow-hidden">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : ""
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary-muted flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-primary text-background"
                        : "bg-surface-light text-foreground"
                    }`}
                  >
                    {message.content}
                    {isStreaming && i === messages.length - 1 && message.role === "assistant" && (
                      <span className="inline-block w-2 h-4 ml-1 bg-success animate-pulse" />
                    )}
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-surface-light flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-text-muted" />
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            <div className="p-3 border-t border-border">
              <div className="flex flex-wrap gap-2 mb-3">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    disabled={isStreaming}
                    className="text-xs px-3 py-1.5 rounded-full bg-surface-light text-text-muted hover:text-primary hover:bg-primary-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex gap-2"
              >
                <Input
                  placeholder="Type your question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1"
                  disabled={isStreaming}
                />
                <Button type="submit" disabled={!input.trim() || isStreaming}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </Section>

      <Section className="bg-surface/50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4">
            Ready to Talk to a Human?
          </h2>
          <p className="text-text-muted mb-6">
            Book a real call with Sidra to discuss your project in depth.
          </p>
          <Button asChild>
            <Link href="/contact">Book a Call</Link>
          </Button>
        </motion.div>
      </Section>
    </>
  );
}

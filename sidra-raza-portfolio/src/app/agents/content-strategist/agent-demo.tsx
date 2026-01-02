"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PenTool, ArrowLeft, Wand2, Copy, Check, AlertCircle } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useStreaming } from "@/hooks/use-streaming";

export function AgentDemo() {
  const [topic, setTopic] = useState("");
  const [copied, setCopied] = useState(false);

  const { text: strategy, isStreaming, error, stream, reset } = useStreaming();

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    await stream("/api/agents/content", {
      topic,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(strategy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    reset();
    setTopic("");
  };

  return (
    <>
      <Section className="pt-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Link
            href="/agents"
            className="inline-flex items-center text-text-muted hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to AI Agents
          </Link>

          <div className="flex items-start gap-4 mb-8">
            <div className="p-4 rounded-xl bg-accent/10">
              <PenTool className="w-8 h-8 text-accent" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">
                  AI Content Strategist
                </h1>
                <Badge variant="accent">Live AI</Badge>
              </div>
              <p className="text-text-muted text-lg">
                Generate a complete content strategy from a single topic.
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

          <div className="p-6 rounded-xl bg-surface border border-border mb-8">
            <div className="space-y-4">
              <Input
                label="Topic or Niche *"
                placeholder="e.g., AI automation for small businesses"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={isStreaming}
              />
              <div className="flex gap-3">
                <Button
                  onClick={handleGenerate}
                  isLoading={isStreaming}
                  disabled={!topic.trim() || isStreaming}
                  size="lg"
                >
                  <Wand2 className="mr-2 w-4 h-4" />
                  {isStreaming ? "Generating..." : "Generate Strategy"}
                </Button>
                {strategy && (
                  <Button variant="outline" size="lg" onClick={handleReset}>
                    Start Over
                  </Button>
                )}
              </div>
            </div>
          </div>

          {(strategy || isStreaming) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl bg-surface border border-accent/50"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  {isStreaming ? "Generating Strategy..." : "Your Content Strategy"}
                </h2>
                {strategy && !isStreaming && (
                  <Button variant="ghost" size="sm" onClick={handleCopy}>
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-success" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                )}
              </div>
              <pre className="whitespace-pre-wrap text-sm text-text-muted bg-background p-4 rounded-lg overflow-x-auto min-h-[300px]">
                {strategy || "Starting generation..."}
                {isStreaming && (
                  <span className="inline-block w-2 h-4 ml-1 bg-accent animate-pulse" />
                )}
              </pre>
            </motion.div>
          )}
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
            Need Ongoing Content Strategy?
          </h2>
          <p className="text-text-muted mb-6">
            This demo gives you a taste. A custom engagement delivers deep,
            tailored strategies.
          </p>
          <Button asChild>
            <Link href="/contact">Get Custom Strategy</Link>
          </Button>
        </motion.div>
      </Section>
    </>
  );
}

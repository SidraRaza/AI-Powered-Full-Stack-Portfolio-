"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lightbulb, ArrowLeft, Sparkles, AlertCircle } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useStreaming } from "@/hooks/use-streaming";

export function AgentDemo() {
  const [idea, setIdea] = useState("");
  const [targetMarket, setTargetMarket] = useState("");

  const { text: result, isStreaming, error, stream, reset } = useStreaming();

  const handleValidate = async () => {
    if (!idea.trim()) return;

    await stream("/api/agents/validator", {
      idea,
      targetMarket: targetMarket || undefined,
    });
  };

  const handleReset = () => {
    reset();
    setIdea("");
    setTargetMarket("");
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
            <div className="p-4 rounded-xl bg-warning/10">
              <Lightbulb className="w-8 h-8 text-warning" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">
                  Business Idea Validator
                </h1>
                <Badge variant="accent">Live AI</Badge>
              </div>
              <p className="text-text-muted text-lg">
                Get brutally honest feedback on your startup idea. No
                sugarcoating.
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
              <Textarea
                label="Your Business Idea *"
                placeholder="Describe your idea in 2-3 sentences..."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                rows={4}
                disabled={isStreaming}
              />
              <Input
                label="Target Market (optional)"
                placeholder="e.g., Small business owners in the US"
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value)}
                disabled={isStreaming}
              />
              <div className="flex gap-3">
                <Button
                  onClick={handleValidate}
                  isLoading={isStreaming}
                  disabled={!idea.trim() || isStreaming}
                  size="lg"
                >
                  <Sparkles className="mr-2 w-4 h-4" />
                  {isStreaming ? "Analyzing..." : "Validate My Idea"}
                </Button>
                {result && (
                  <Button variant="outline" size="lg" onClick={handleReset}>
                    Start Over
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Output */}
          {(result || isStreaming) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl bg-surface border border-warning/50"
            >
              <h2 className="text-xl font-semibold mb-4">
                {isStreaming ? "Analyzing Your Idea..." : "Validation Results"}
              </h2>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-text-muted bg-background p-4 rounded-lg overflow-x-auto min-h-[300px]">
                  {result || "Starting analysis..."}
                  {isStreaming && (
                    <span className="inline-block w-2 h-4 ml-1 bg-warning animate-pulse" />
                  )}
                </pre>
              </div>
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
            Ready to Build Your Validated Idea?
          </h2>
          <p className="text-text-muted mb-6">
            Let&apos;s turn your concept into a working AI-powered product.
          </p>
          <Button asChild>
            <Link href="/contact">Start Building</Link>
          </Button>
        </motion.div>
      </Section>
    </>
  );
}

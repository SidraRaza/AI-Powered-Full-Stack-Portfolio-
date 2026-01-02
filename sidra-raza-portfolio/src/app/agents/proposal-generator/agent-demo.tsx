"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ArrowLeft, Send, Copy, Check, AlertCircle } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useStreaming } from "@/hooks/use-streaming";

export function AgentDemo() {
  const [projectBrief, setProjectBrief] = useState("");
  const [expertise, setExpertise] = useState("");
  const [copied, setCopied] = useState(false);

  const { text: proposal, isStreaming, error, stream, reset } = useStreaming();

  const handleGenerate = async () => {
    if (!projectBrief.trim()) return;

    await stream("/api/agents/proposal", {
      projectDescription: projectBrief,
      expertise: expertise || undefined,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(proposal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    reset();
    setProjectBrief("");
    setExpertise("");
  };

  return (
    <>
      <Section className="pt-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Back link */}
          <Link
            href="/agents"
            className="inline-flex items-center text-text-muted hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to AI Agents
          </Link>

          {/* Header */}
          <div className="flex items-start gap-4 mb-8">
            <div className="p-4 rounded-xl bg-primary-muted">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">
                  Freelance Proposal Generator
                </h1>
                <Badge variant="primary">Live AI</Badge>
              </div>
              <p className="text-text-muted text-lg">
                Transform any project brief into a professional, client-ready
                proposal in seconds.
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

          {/* Input Form */}
          <div className="p-6 rounded-xl bg-surface border border-border mb-8">
            <div className="space-y-4">
              <Textarea
                label="Project Brief *"
                placeholder="Paste the client's project description, job post, or requirements here..."
                value={projectBrief}
                onChange={(e) => setProjectBrief(e.target.value)}
                rows={6}
                disabled={isStreaming}
              />
              <Input
                label="Your Expertise (optional)"
                placeholder="e.g., 5 years in AI automation for B2B SaaS"
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
                disabled={isStreaming}
              />
              <div className="flex gap-3">
                <Button
                  onClick={handleGenerate}
                  isLoading={isStreaming}
                  disabled={!projectBrief.trim() || isStreaming}
                  size="lg"
                >
                  <Send className="mr-2 w-4 h-4" />
                  {isStreaming ? "Generating..." : "Generate Proposal"}
                </Button>
                {proposal && (
                  <Button variant="outline" size="lg" onClick={handleReset}>
                    Start Over
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Output */}
          {(proposal || isStreaming) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl bg-surface border border-primary/50"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  {isStreaming ? "Generating Proposal..." : "Generated Proposal"}
                </h2>
                {proposal && !isStreaming && (
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
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-text-muted bg-background p-4 rounded-lg overflow-x-auto min-h-[200px]">
                  {proposal || "Starting generation..."}
                  {isStreaming && (
                    <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse" />
                  )}
                </pre>
              </div>
            </motion.div>
          )}
        </motion.div>
      </Section>

      {/* CTA */}
      <Section className="bg-surface/50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4">
            Need a Custom AI Agent for Your Business?
          </h2>
          <p className="text-text-muted mb-6">
            This is just a demo. Imagine what a tailored AI could do for your
            workflows.
          </p>
          <Button asChild>
            <Link href="/contact">Let&apos;s Build Your Agent</Link>
          </Button>
        </motion.div>
      </Section>
    </>
  );
}

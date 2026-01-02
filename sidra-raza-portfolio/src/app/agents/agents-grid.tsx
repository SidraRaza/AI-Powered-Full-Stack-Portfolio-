"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Lightbulb, PenTool, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const agents = [
  {
    slug: "proposal-generator",
    title: "Freelance Proposal Generator",
    description:
      "Transform any project brief into a professional, client-ready proposal in 30 seconds.",
    icon: FileText,
    capabilities: [
      "Understands project requirements",
      "Structures professional proposals",
      "Includes timeline and pricing",
      "Copy-paste ready output",
    ],
    useCase: "Freelancers & agencies",
    badge: "Most Popular",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    slug: "business-validator",
    title: "Business Idea Validator",
    description:
      "Get brutally honest feedback on your startup idea. No sugarcoating — just actionable insights.",
    icon: Lightbulb,
    capabilities: [
      "Viability scoring (1-10)",
      "Strengths & weaknesses analysis",
      "Market reality check",
      "Recommended next steps",
    ],
    useCase: "Founders & entrepreneurs",
    badge: "New",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    slug: "content-strategist",
    title: "AI Content Strategist",
    description:
      "Generate a complete content strategy from a single topic. Includes 30-day calendar and SEO keywords.",
    icon: PenTool,
    capabilities: [
      "Content pillar framework",
      "30-day content calendar",
      "SEO keyword suggestions",
      "Repurposing strategy",
    ],
    useCase: "Marketers & creators",
    badge: null,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    slug: "ai-assistant",
    title: "Portfolio Assistant",
    description:
      "Have questions about working with me? Ask the AI. It knows my services, process, and availability.",
    icon: MessageSquare,
    capabilities: [
      "24/7 availability",
      "Instant responses",
      "Service information",
      "Booking guidance",
    ],
    useCase: "Potential clients",
    badge: "Live",
    gradient: "from-green-500 to-emerald-500",
  },
];

export function AgentsGrid() {
  return (
    <Section className="bg-surface/50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-6 sm:p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all"
          >
            {/* Gradient glow on hover */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${agent.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
            />

            <div className="relative">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-lg bg-primary-muted">
                  <agent.icon className="w-6 h-6 text-primary" />
                </div>
                {agent.badge && (
                  <Badge
                    variant={
                      agent.badge === "Live"
                        ? "success"
                        : agent.badge === "New"
                        ? "accent"
                        : "primary"
                    }
                  >
                    {agent.badge === "Live" && (
                      <span className="w-2 h-2 rounded-full bg-current mr-1.5 animate-pulse" />
                    )}
                    {agent.badge}
                  </Badge>
                )}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {agent.title}
              </h3>
              <p className="text-text-muted mb-6">{agent.description}</p>

              {/* Capabilities */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-text-dim uppercase tracking-wide mb-3">
                  Capabilities
                </h4>
                <ul className="grid grid-cols-2 gap-2">
                  {agent.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="flex items-center gap-2 text-sm text-text-muted"
                    >
                      <Sparkles className="w-3 h-3 text-primary shrink-0" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <span className="text-sm text-text-dim">
                  Best for: {agent.useCase}
                </span>
                <Button size="sm" asChild>
                  <Link href={`/agents/${agent.slug}`}>
                    Try Now
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

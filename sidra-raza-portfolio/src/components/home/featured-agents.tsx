"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Lightbulb,
  PenTool,
  MessageSquare,
  ArrowRight,
  Play,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const agents = [
  {
    title: "Proposal Generator",
    description:
      "Turn any project brief into a client-ready proposal in 30 seconds. No templates, just AI-crafted perfection.",
    icon: FileText,
    href: "/agents/proposal-generator",
    badge: "Most Popular",
    badgeVariant: "primary" as const,
    color: "primary",
  },
  {
    title: "Business Validator",
    description:
      "Stress-test your startup idea with brutal AI honesty. Get real feedback before spending real money.",
    icon: Lightbulb,
    href: "/agents/business-validator",
    badge: "New",
    badgeVariant: "accent" as const,
    color: "accent",
  },
  {
    title: "Content Strategist",
    description:
      "Get a full content strategy from a single topic. Posts, hooks, angles—everything mapped out.",
    icon: PenTool,
    href: "/agents/content-strategist",
    badge: null,
    badgeVariant: "primary" as const,
    color: "secondary",
  },
  {
    title: "AI Assistant",
    description:
      "Ask anything about working with me. Pricing, process, availability—instant answers 24/7.",
    icon: MessageSquare,
    href: "/agents/ai-assistant",
    badge: "Live",
    badgeVariant: "success" as const,
    color: "success",
  },
];

const colorMap = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    icon: "text-primary",
    hover: "group-hover:border-primary/60",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent/30",
    icon: "text-accent",
    hover: "group-hover:border-accent/60",
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary/30",
    icon: "text-secondary",
    hover: "group-hover:border-secondary/60",
  },
  success: {
    bg: "bg-success/10",
    border: "border-success/30",
    icon: "text-success",
    hover: "group-hover:border-success/60",
  },
};

export function FeaturedAgents() {
  return (
    <Section size="lg" className="relative">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="relative z-10">
        <SectionHeader
          badge="Live Demos"
          title="Don't Take My Word For It"
          subtitle="These agents run live on this site. No mockups. No screenshots. Interact with them. Break them if you can."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {agents.map((agent, index) => {
            const colors = colorMap[agent.color as keyof typeof colorMap];

            return (
              <motion.div
                key={agent.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link href={agent.href} className="block group">
                  <div
                    className={`h-full rounded-2xl border ${colors.border} ${colors.hover} bg-surface/50 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 hover:bg-surface`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                      >
                        <agent.icon className={`w-7 h-7 ${colors.icon}`} />
                      </div>
                      {agent.badge && (
                        <Badge variant={agent.badgeVariant}>{agent.badge}</Badge>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {agent.title}
                    </h3>
                    <p className="text-text-muted leading-relaxed mb-6">
                      {agent.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <Play className="w-4 h-4 fill-current" />
                      <span>Try it live</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/agents">
              View All AI Agents
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}

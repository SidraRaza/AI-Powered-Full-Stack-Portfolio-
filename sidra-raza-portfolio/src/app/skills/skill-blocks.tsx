"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Workflow, Package } from "lucide-react";
import { Section } from "@/components/ui/section";

const skills = [
  {
    icon: Brain,
    title: "Agentic AI Architecture",
    whatItMeans:
      "Designing AI systems that operate autonomously across multi-step workflows.",
    whatIBuild: [
      "Task orchestration agents",
      "Decision-making pipelines",
      "Self-correcting automation loops",
      "Human-in-the-loop escalation systems",
    ],
    whyItMatters: "You get AI that handles the full job — not just one step.",
  },
  {
    icon: Cpu,
    title: "LLM Integration & Optimization",
    whatItMeans:
      "Connecting large language models to your business logic and data.",
    whatIBuild: [
      "Custom RAG (Retrieval Augmented Generation) systems",
      "Fine-tuned models for domain-specific tasks",
      "Prompt engineering pipelines",
      "Multi-model orchestration (Claude + GPT + open-source)",
    ],
    whyItMatters: "Your AI understands YOUR business, not just the internet.",
  },
  {
    icon: Workflow,
    title: "AI Workflow Automation",
    whatItMeans:
      "Replacing fragile Zapier/Make automations with intelligent agents.",
    whatIBuild: [
      "End-to-end process automation",
      "Document processing pipelines",
      "Email/communication agents",
      "Data extraction and transformation systems",
    ],
    whyItMatters: "Automations that adapt, not just execute.",
  },
  {
    icon: Package,
    title: "AI Product Development",
    whatItMeans: "Building AI-powered products from concept to launch.",
    whatIBuild: [
      "SaaS products with embedded AI",
      "Internal tools with AI capabilities",
      "Customer-facing AI features",
      "MVPs for AI startup ideas",
    ],
    whyItMatters: "You get a product, not a prototype.",
  },
];

export function SkillBlocks() {
  return (
    <Section className="bg-surface/50">
      <div className="space-y-8">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-8 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Icon and Title */}
              <div className="md:w-1/3">
                <div className="p-3 rounded-lg bg-primary-muted w-fit mb-4">
                  <skill.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{skill.title}</h3>
                <p className="text-text-muted">{skill.whatItMeans}</p>
              </div>

              {/* What I Build */}
              <div className="md:w-1/3">
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                  What I Build
                </h4>
                <ul className="space-y-2">
                  {skill.whatIBuild.map((item) => (
                    <li
                      key={item}
                      className="text-text-muted flex items-start gap-2"
                    >
                      <span className="text-primary mt-1.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why It Matters */}
              <div className="md:w-1/3">
                <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                  Why It Matters
                </h4>
                <p className="text-foreground font-medium">{skill.whyItMatters}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

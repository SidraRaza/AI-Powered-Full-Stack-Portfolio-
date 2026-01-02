"use client";

import { motion } from "framer-motion";
import { Zap, Target, Shield, Puzzle } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";

const principles = [
  {
    icon: Zap,
    title: "Agents over assistants",
    description: "AI that completes workflows, not just answers questions.",
  },
  {
    icon: Target,
    title: "Outcomes over outputs",
    description:
      "I don't measure tokens. I measure hours saved, revenue gained, problems eliminated.",
  },
  {
    icon: Shield,
    title: "Boring reliability over flashy demos",
    description:
      "Your AI should work at 3am on a Sunday when no one's watching.",
  },
  {
    icon: Puzzle,
    title: "Your stack, not mine",
    description:
      "I integrate with what you have. No forced migrations. No vendor lock-in.",
  },
];

export function Philosophy() {
  return (
    <Section className="bg-surface/50">
      <SectionHeader
        title="How I Think About AI"
        subtitle="Most 'AI solutions' are glorified chatbots with a nice UI. I build differently."
        align="left"
      />

      <div className="grid md:grid-cols-2 gap-6">
        {principles.map((principle, index) => (
          <motion.div
            key={principle.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary-muted shrink-0">
                <principle.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{principle.title}</h3>
                <p className="text-text-muted">{principle.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

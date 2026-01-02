"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";

export function AboutHero() {
  return (
    <Section className="pt-32 md:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
          I Solve Business Problems With{" "}
          <span className="gradient-text">Code That Thinks</span>
        </h1>

        <div className="prose prose-lg prose-invert max-w-none">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">
            The Short Version
          </h2>

          <p className="text-text-muted text-lg leading-relaxed">
            I&apos;m Sidra Raza — an Agentic AI developer building intelligent systems
            for businesses that refuse to stay stuck in manual mode.
          </p>

          <p className="text-text-muted text-lg leading-relaxed">
            I didn&apos;t start in AI. I started in problems.
          </p>

          <p className="text-text-muted text-lg leading-relaxed">
            Watching businesses drown in repetitive tasks. Founders spending 80% of
            their time on work that doesn&apos;t move the needle. Teams burning out on
            processes a well-designed system could handle.
          </p>

          <p className="text-text-muted text-lg leading-relaxed">
            AI wasn&apos;t the goal. Elimination of friction was. AI just happens to be
            the most powerful tool we&apos;ve ever had for that job.
          </p>

          <p className="text-text-muted text-lg leading-relaxed">
            Today, I design and build agentic systems — AI that doesn&apos;t just
            respond, but <strong className="text-foreground">acts</strong>.
            Autonomously. Reliably. At scale.
          </p>
        </div>
      </motion.div>
    </Section>
  );
}

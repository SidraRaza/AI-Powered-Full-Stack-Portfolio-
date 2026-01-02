"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";

export function SkillsHero() {
  return (
    <Section className="pt-32 md:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Full-Stack{" "}
          <span className="gradient-text">Agentic AI</span>{" "}
          Development
        </h1>
        <p className="text-lg md:text-xl text-text-muted">
          From strategy to deployment. From prototype to production. Here&apos;s
          exactly what I bring to the table.
        </p>
      </motion.div>
    </Section>
  );
}

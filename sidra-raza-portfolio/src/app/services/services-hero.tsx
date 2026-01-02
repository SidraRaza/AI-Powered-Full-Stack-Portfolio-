"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";

export function ServicesHero() {
  return (
    <Section className="pt-32 md:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          AI That Works{" "}
          <span className="gradient-text">For Your Business</span>
        </h1>
        <p className="text-lg md:text-xl text-text-muted">
          Three ways to work with me — from quick strategy to full-scale builds.
        </p>
      </motion.div>
    </Section>
  );
}

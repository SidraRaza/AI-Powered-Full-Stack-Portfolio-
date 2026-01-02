"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";

export function ProjectsHero() {
  return (
    <Section className="pt-32 md:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Real Systems.{" "}
          <span className="gradient-text">Real Results.</span>{" "}
          Real Clients.
        </h1>
        <p className="text-lg md:text-xl text-text-muted">
          Every project starts with a problem. Here&apos;s how I&apos;ve solved them.
        </p>
      </motion.div>
    </Section>
  );
}

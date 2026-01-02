"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";

export function ContactHero() {
  return (
    <Section className="pt-32 md:pt-40 pb-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Let&apos;s Build Something{" "}
          <span className="gradient-text">Intelligent</span>
        </h1>
        <p className="text-lg md:text-xl text-text-muted">
          Got a project in mind? Not sure where to start? Either way, let&apos;s
          talk.
        </p>
      </motion.div>
    </Section>
  );
}

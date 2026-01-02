"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { Section } from "@/components/ui/section";

export function AgentsHero() {
  return (
    <Section className="pt-32 md:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/30 mb-6"
        >
          <Zap className="w-4 h-4 text-success" />
          <span className="text-sm text-success font-medium">
            Live Demos — Try Them Now
          </span>
        </motion.div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          AI Agents <span className="gradient-text">In Action</span>
        </h1>
        <p className="text-lg md:text-xl text-text-muted">
          These aren&apos;t mockups. These are live AI agents running on this site
          right now. Interact with them. See what&apos;s possible.
        </p>
      </motion.div>
    </Section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function SkillsCTA() {
  return (
    <Section className="bg-surface/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          See These Skills in Action
        </h2>
        <p className="text-text-muted mb-8 max-w-xl mx-auto">
          Try the live AI agents I&apos;ve built to demonstrate these capabilities.
        </p>
        <Button size="lg" asChild>
          <Link href="/agents">
            Explore AI Agents
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}

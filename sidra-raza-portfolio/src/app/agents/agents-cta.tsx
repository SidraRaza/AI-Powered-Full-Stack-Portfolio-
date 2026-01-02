"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function AgentsCTA() {
  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Want an Agent Like This for Your Business?
        </h2>
        <p className="text-text-muted mb-8">
          These demos showcase what&apos;s possible. Imagine what a custom AI agent
          could do for your specific workflows.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">
            Get a Custom Agent Built
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}

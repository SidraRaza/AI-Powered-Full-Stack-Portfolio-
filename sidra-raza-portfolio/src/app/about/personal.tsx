"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function Personal() {
  return (
    <Section className="bg-surface/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Beyond The Code</h2>

        <div className="space-y-4 text-lg text-text-muted">
          <p>
            I believe AI should make humans more human — not replace them. The goal
            is never automation for automation&apos;s sake. It&apos;s freeing up your time
            and energy for work that actually requires you.
          </p>

          <p>
            When I&apos;m not building, I&apos;m probably exploring new AI research papers,
            experimenting with side projects, or helping founders figure out where
            AI fits in their roadmap.
          </p>

          <p className="text-foreground font-medium">
            If that resonates, we should talk.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <Button asChild>
            <Link href="/contact">
              Let&apos;s Build Something
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
}

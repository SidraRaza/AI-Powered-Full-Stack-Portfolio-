"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function ProjectsCTA() {
  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Want Similar Results?
        </h2>
        <p className="text-text-muted mb-8 max-w-xl mx-auto">
          Let&apos;s discuss how AI can solve your specific business challenges.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">
            Start Your Project
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}

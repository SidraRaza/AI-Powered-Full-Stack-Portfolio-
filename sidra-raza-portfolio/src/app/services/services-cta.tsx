"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function ServicesCTA() {
  return (
    <Section className="bg-surface/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Not Sure Which Service Fits?
        </h2>
        <p className="text-text-muted mb-8">
          Book a free 30-minute call. We&apos;ll discuss your needs and I&apos;ll
          recommend the best path forward. No pitch, just clarity.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">
            <Calendar className="mr-2 w-5 h-5" />
            Book a Free Call
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}

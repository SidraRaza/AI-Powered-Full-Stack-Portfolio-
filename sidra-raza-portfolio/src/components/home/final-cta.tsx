"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Sparkles, Clock, Zap } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <Section size="lg" className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/15 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-primary mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Limited Availability
            </span>
          </motion.div>

          {/* Headline */}
          <h2 className="text-display mb-6">
            Ready to <span className="gradient-text-animated">Build</span>?
          </h2>

          <p className="text-xl md:text-2xl text-text-muted mb-12 max-w-2xl mx-auto">
            You have two options. Only one of them moves you forward.
          </p>

          {/* Options Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            {/* Option 1 - Don't Do */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-text-dim/10 to-transparent rounded-2xl opacity-50" />
              <div className="relative p-8 rounded-2xl border border-border bg-surface/50 backdrop-blur-sm h-full">
                <div className="w-16 h-16 rounded-2xl bg-surface-light flex items-center justify-center mb-6 mx-auto">
                  <Clock className="w-8 h-8 text-text-dim" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-text-muted">
                  Option 1
                </h3>
                <p className="text-text-muted leading-relaxed">
                  Keep researching AI tools, watching demos, and &quot;thinking about it&quot; while competitors automate.
                </p>
              </div>
            </motion.div>

            {/* Option 2 - Do This */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl" />
              <div className="absolute inset-0 rounded-2xl border border-primary/30 group-hover:border-primary/50 transition-colors" />
              <div className="relative p-8 rounded-2xl h-full">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 mx-auto">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">
                  Option 2
                </h3>
                <p className="text-foreground leading-relaxed">
                  Book a 30-minute call and leave with a clear AI roadmap for your business. No fluff, just strategy.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Comparison Line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-text-muted mb-10"
          >
            Option 2 is <span className="text-success font-medium">free</span>.
            Option 1 costs you time you don&apos;t have.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Button
              size="lg"
              className="px-8 group"
              asChild
            >
              <Link href="/contact">
                <Calendar className="mr-2 w-5 h-5" />
                Book Your Strategy Call
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-text-dim"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              Free consultation
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              No commitment required
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              Response within 24 hours
            </span>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

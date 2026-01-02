"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";

export function ProblemSolution() {
  return (
    <Section background="secondary" className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-error/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-success/5 rounded-full blur-[100px]" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-error/10 border border-error/20 text-error text-sm font-medium mb-6"
            >
              <AlertCircle className="w-4 h-4" />
              The Problem
            </motion.div>
            <h2 className="text-display mb-6">
              The AI Problem{" "}
              <span className="gradient-text">No One Talks About</span>
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Most &quot;AI solutions&quot; are just expensive toys that break when you need them most.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Problem Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-error/20 to-transparent rounded-2xl" />
              <div className="relative h-full rounded-2xl border border-error/30 bg-surface/80 backdrop-blur-sm p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-error/20 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-error" />
                  </div>
                  <h3 className="text-2xl font-semibold text-error">
                    What You&apos;re Getting
                  </h3>
                </div>

                <ul className="space-y-4">
                  {[
                    "ChatGPT wrappers that need constant babysitting",
                    "\"AI-powered\" tools that break when you look at them wrong",
                    "Automations that work in demos but fail in production",
                    "Solutions that cost more time than they save",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-error mt-2.5 shrink-0" />
                      <span className="text-text-muted leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-error/20">
                  <p className="text-lg font-medium text-foreground">
                    That&apos;s not AI. That&apos;s{" "}
                    <span className="text-error">expensive noise</span>.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Solution Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-success/20 to-transparent rounded-2xl" />
              <div className="relative h-full rounded-2xl border border-success/30 bg-surface/80 backdrop-blur-sm p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  </div>
                  <h3 className="text-2xl font-semibold text-success">
                    What I Build
                  </h3>
                </div>

                <ul className="space-y-4">
                  {[
                    "Agentic systems that understand context and make decisions",
                    "Autonomous workflows that run without hand-holding",
                    "Production-grade AI that actually survives real-world use",
                    "Solutions that multiply your output, not your headaches",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
                      <span className="text-text-muted leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-success/20">
                  <p className="text-lg font-medium text-foreground">
                    You stop managing tools.{" "}
                    <span className="text-success">They start managing workflows</span>.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Connector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-surface-light border border-border">
              <span className="text-text-muted">The difference?</span>
              <ArrowRight className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">
                Real automation, real results
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

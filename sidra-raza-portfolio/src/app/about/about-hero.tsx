"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";

export function AboutHero() {
  return (
    <Section className="pt-32 md:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
          I Build AI Systems That{" "}
          <span className="gradient-text">Run Your Business While You Sleep</span>
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">
            I'm Sidra Raza — Agentic AI Developer from Pakistan
          </h2>

          <p className="text-text-muted text-lg leading-relaxed">
            I'm an Agentic AI Developer and AI Ops Builder from Karachi, Pakistan, specializing in building AI systems that automate businesses, optimize workflows, and run operations 24/7. My expertise lies in Agentic AI, AI automation, intelligent systems, and business optimization.
          </p>

          <p className="text-text-muted text-lg leading-relaxed">
            As the founder of AI Ops Studio, I focus on creating AI solutions that go beyond simple automation — I build systems that think, act, and operate autonomously. My approach centers on developing agentic systems that don't just respond to prompts, but actively pursue goals and complete complex workflows independently.
          </p>

          <p className="text-text-muted text-lg leading-relaxed">
            One of my notable projects is Word Weaver AI Planner — an AI-powered writing and study assistant that helps users with assignments, essays, blogs, and creative projects. This exemplifies my ability to create practical AI solutions that deliver real-world value and streamline complex tasks into seamless experiences.
          </p>
        </div>
      </motion.div>
    </Section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";

const faqs = [
  {
    question: "Do you work with early-stage startups?",
    answer:
      "Yes — if the project is well-defined and the budget aligns. I also offer equity-based arrangements for the right opportunities.",
  },
  {
    question: "What if I don't know what I need?",
    answer:
      "Start with a Strategy Session. We'll figure it out together. I'll audit your workflows, identify opportunities, and give you a clear roadmap.",
  },
  {
    question: "How quickly can you start?",
    answer:
      "Typically within 1-2 weeks. Check current availability by booking a call.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Every build includes 30-day support. For longer-term needs, the retainer model works best.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "I've worked across SaaS, e-commerce, legal tech, and professional services. The common thread is businesses with repetitive, high-volume processes that benefit from intelligent automation.",
  },
  {
    question: "Can you work with my existing tech stack?",
    answer:
      "Absolutely. I integrate with what you have — CRMs, databases, APIs, internal tools. No forced migrations or vendor lock-in.",
  },
];

export function FAQ() {
  return (
    <Section>
      <SectionHeader
        title="Frequently Asked Questions"
        subtitle="Common questions about working together"
      />

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.question}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="p-6 rounded-xl bg-surface border border-border"
          >
            <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
            <p className="text-text-muted">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";

const stack = {
  Frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  Backend: ["Python/FastAPI", "Node.js", "Supabase", "PostgreSQL", "Redis"],
  "AI Layer": ["OpenAI API", "Claude API", "LangChain", "LlamaIndex", "Vector DBs"],
};

export function TechStackVisual() {
  return (
    <Section>
      <SectionHeader
        title="Tech Stack"
        subtitle="The tools I use to build production-ready AI systems"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="overflow-hidden rounded-xl border border-border"
      >
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {Object.entries(stack).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="p-6 bg-surface"
            >
              <h3 className="text-lg font-semibold text-primary mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item} className="text-text-muted font-mono text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

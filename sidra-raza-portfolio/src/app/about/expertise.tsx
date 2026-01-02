"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

const techStack = {
  Languages: ["Python", "TypeScript", "SQL"],
  "AI/ML": ["OpenAI", "Claude", "LangChain", "LlamaIndex", "RAG Pipelines"],
  Infrastructure: ["Supabase", "Vercel", "AWS", "Docker"],
  "Web Stack": ["Next.js", "React", "Node.js", "FastAPI"],
  Automation: ["n8n", "Make", "Custom Agents"],
};

export function Expertise() {
  return (
    <Section>
      <SectionHeader title="What I Work With" align="left" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 rounded-xl bg-surface border border-border"
      >
        <div className="grid gap-6">
          {Object.entries(techStack).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="flex flex-col md:flex-row md:items-center gap-3"
            >
              <span className="text-text-muted font-mono text-sm w-32 shrink-0">
                {category}:
              </span>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Badge key={item} variant="primary">
                    {item}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

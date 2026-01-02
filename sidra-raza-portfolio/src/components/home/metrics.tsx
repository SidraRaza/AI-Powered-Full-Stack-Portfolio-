"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { TrendingUp, Users, Clock, Percent } from "lucide-react";

const metrics = [
  {
    value: "50+",
    label: "AI Agents Deployed",
    description: "Production systems running 24/7",
    icon: TrendingUp,
    color: "primary",
  },
  {
    value: "2,000+",
    label: "Hours Automated Monthly",
    description: "Time saved for clients",
    icon: Clock,
    color: "accent",
  },
  {
    value: "94%",
    label: "Client Retention",
    description: "Clients who come back for more",
    icon: Users,
    color: "success",
  },
  {
    value: "340%",
    label: "Avg. Project ROI",
    description: "Return on investment",
    icon: Percent,
    color: "primary",
  },
];

const colorMap = {
  primary: "text-primary",
  accent: "text-accent",
  success: "text-success",
};

export function Metrics() {
  return (
    <Section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/50 to-transparent" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-muted border border-primary/20 text-primary text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Results
          </div>
          <h2 className="text-display">
            Numbers, <span className="gradient-text">Not Promises</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="relative h-full p-6 lg:p-8 rounded-2xl bg-surface/50 border border-border backdrop-blur-sm text-center transition-all duration-300 hover:border-primary/30 hover:bg-surface">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-${metric.color}/10 flex items-center justify-center`}
                  >
                    <metric.icon
                      className={`w-6 h-6 ${colorMap[metric.color as keyof typeof colorMap]}`}
                    />
                  </div>
                </div>

                {/* Value */}
                <div
                  className={`text-4xl lg:text-5xl font-bold mb-2 ${colorMap[metric.color as keyof typeof colorMap]}`}
                >
                  {metric.value}
                </div>

                {/* Label */}
                <div className="text-foreground font-medium mb-1">
                  {metric.label}
                </div>

                {/* Description */}
                <div className="text-sm text-text-dim">
                  {metric.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Cpu, RefreshCw, Check, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Compass,
    title: "AI Strategy Session",
    description: "Founders and teams exploring where AI fits in their business.",
    features: [
      "90-minute deep-dive call",
      "Full audit of your current workflows",
      "AI opportunity roadmap (prioritized by ROI)",
      "Build vs. buy recommendations",
      "Recording + written summary",
    ],
    price: "Starting at $500",
    cta: "Book Strategy Session",
    href: "/contact",
    featured: false,
  },
  {
    icon: Cpu,
    title: "Agentic System Build",
    description: "Businesses ready to deploy AI that handles real workflows.",
    features: [
      "Custom agentic AI system",
      "Full integration with your existing tools",
      "Testing and optimization",
      "Documentation and training",
      "30-day support post-launch",
    ],
    price: "Starting at $3,000",
    timeline: "2-6 weeks",
    cta: "Discuss Your Project",
    href: "/contact",
    featured: true,
  },
  {
    icon: RefreshCw,
    title: "AI Retainer",
    description: "Companies that want ongoing AI development and optimization.",
    features: [
      "Dedicated hours monthly",
      "Priority response",
      "Continuous improvement of existing systems",
      "New agent development",
      "Strategic advisory",
    ],
    price: "Custom monthly",
    cta: "Explore Retainer Options",
    href: "/contact",
    featured: false,
  },
];

export function ServiceTiers() {
  return (
    <Section className="bg-surface/50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-6 sm:p-8 rounded-2xl bg-background border ${
              service.featured
                ? "border-primary shadow-[0_0_30px_var(--primary-muted)]"
                : "border-border"
            } flex flex-col`}
          >
            {service.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 bg-primary text-background text-sm font-medium rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <div className="p-3 rounded-xl bg-primary-muted w-fit mb-4">
              <service.icon className="w-6 h-6 text-primary" />
            </div>

            <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
            <p className="text-text-muted mb-6">{service.description}</p>

            <ul className="space-y-3 mb-8 flex-grow">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-text-muted">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-border pt-6">
              <div className="mb-4">
                <span className="text-2xl font-bold">{service.price}</span>
                {service.timeline && (
                  <span className="text-text-muted block text-sm mt-1">
                    Timeline: {service.timeline}
                  </span>
                )}
              </div>
              <Button
                className="w-full"
                variant={service.featured ? "primary" : "outline"}
                asChild
              >
                <Link href={service.href}>
                  {service.cta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

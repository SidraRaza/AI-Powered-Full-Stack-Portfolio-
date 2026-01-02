
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, Plug, Compass, ArrowRight, Sparkles } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Agentic AI Systems",
    description:
      "Multi-step AI agents that handle complex workflows end-to-end. From lead qualification to document processing to customer support.",
    icon: Bot,
    features: ["Autonomous decision-making", "Multi-step workflows", "Self-healing systems"],
    gradient: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
  },
  {
    title: "AI Integration",
    description:
      "Connect LLMs to your existing stack. CRMs, databases, APIs, internal tools. Make your business AI-native without rebuilding everything.",
    icon: Plug,
    features: ["Seamless API connections", "Legacy system support", "Real-time sync"],
    gradient: "from-accent/20 to-accent/5",
    iconBg: "bg-accent/20",
    iconColor: "text-accent",
  },
  {
    title: "AI Strategy",
    description:
      "Not sure where AI fits? I audit your operations, identify high-ROI opportunities, and build the roadmap.",
    icon: Compass,
    features: ["ROI analysis", "Implementation roadmap", "Risk assessment"],
    gradient: "from-secondary/20 to-secondary/5",
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function ServicesOverview() {
  return (
    <Section background="secondary" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="relative z-10">
        <SectionHeader
          badge="Services"
          title="What I Build"
          subtitle="End-to-end AI solutions that actually work in production — not demos that fall apart when you look at them wrong."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group"
            >
              <div
                className={`h-full rounded-2xl bg-gradient-to-b ${service.gradient} p-px`}
              >
                <div className="h-full rounded-2xl bg-surface p-6 sm:p-8 flex flex-col transition-all duration-300 group-hover:bg-surface-light">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-text-muted"
                      >
                        <Sparkles className="w-4 h-4 text-primary/70" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <Link
                    href="/services"
                    className="inline-flex items-center text-primary font-medium group/link"
                  >
                    Learn more
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <Button size="lg" asChild>
            <Link href="/services">
              Explore All Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}

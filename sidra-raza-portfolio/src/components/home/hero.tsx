"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";

const headlineWords = ["I", "Build", "AI", "Systems"];
const gradientWords = ["That", "Run", "Your", "Business"];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 30, rotateX: -20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const fadeUpVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
      {/* Subtle Background */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[150px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px]"
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-8 max-w-6xl relative z-10">
        <div className="text-center">
          {/* Floating decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-primary/30 blur-sm" />
          <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-accent/20 blur-md" />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 rounded-full bg-secondary/30 blur-sm" />
          {/* Intro Label & Professional Role */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className="mb-8 flex flex-col items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 border border-border text-sm text-foreground font-medium shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Available for new projects
            </span>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight gradient-text mt-1">
              Full Stack Developer & Agentic AI Engineer
            </h2>
          </motion.div>

          {/* Main Headline - Word by Word */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-2 text-foreground"
            style={{ perspective: 500 }}
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block mr-[0.25em]"
                style={{ transformStyle: "preserve-3d" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Gradient Headline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            style={{ perspective: 500 }}
          >
            {gradientWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block mr-[0.25em] gradient-text"
                style={{
                  transformStyle: "preserve-3d",
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Agentic AI development for businesses ready to automate and scale.
            <span className="text-text-secondary"> No fluff—just intelligent systems that work.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" className="w-full sm:w-auto px-8 group" asChild>
              <Link href="/agents" className="link-underline">
                See AI in Action
                <motion.span
                  className="inline-block ml-2"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-auto px-7 bg-primary hover:bg-primary-light text-white border-0 shadow-lg hover:shadow-[0_0_20px_rgba(251,113,133,0.5)] transition-all group cursor-pointer"
              asChild
            >
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-white"
              >
                <Linkedin className="w-5 h-5 text-white fill-current group-hover:scale-110 transition-transform" />
                <span>Connect on LinkedIn</span>
              </a>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-8" asChild>
              <Link href="/contact" className="link-underline">
                Book a Strategy Call
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20"
          >
            <p className="text-text-dim text-sm mb-5">Trusted by forward-thinking teams</p>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-text-dim/60">
              {["Startups", "SaaS", "E-commerce", "Agencies", "Enterprises"].map((item, index) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="text-sm font-medium hover:text-foreground transition-colors cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-border/60 flex items-start justify-center p-1.5 hover:border-primary/50 transition-colors"
        >
          <motion.div
            animate={{ y: [0, 10, 0], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

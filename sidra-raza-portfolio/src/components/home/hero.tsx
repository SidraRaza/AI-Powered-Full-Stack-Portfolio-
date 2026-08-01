"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";
import { OrbitingDotsBackground } from "@/components/ui/orbiting-dots-background";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-12 bg-background text-foreground transition-colors duration-300">
      {/* Canvas Orbiting Dots Background - Hero Only */}
      <OrbitingDotsBackground position="absolute" />

      {/* Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/15 rounded-full blur-[140px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent/10 dark:bg-accent/15 rounded-full blur-[140px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[120px]"
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl relative z-10">
        <div className="text-center flex flex-col items-center">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 dark:bg-surface/90 border border-border text-sm text-foreground font-medium shadow-sm backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            Available for new projects
          </motion.div>

          {/* H1 - Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-3 text-foreground"
          >
            Sidra Raza
          </motion.h1>

          {/* H2 - Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight gradient-text mb-6 max-w-3xl"
          >
            Full Stack Developer & Agentic AI Engineer
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-text-muted dark:text-text-muted max-w-3xl mx-auto mb-10 leading-relaxed text-center"
          >
            I am a Full Stack Developer and Agentic AI Engineer based in Karachi, Pakistan. I build scalable web applications, AI-powered automation systems, and intelligent agents that streamline business workflows, improve productivity, and solve real-world problems.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.55 }}
            className="flex flex-wrap justify-center items-center gap-4 w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 bg-primary hover:bg-primary-light text-white border-0 shadow-lg hover:shadow-[0_0_20px_rgba(251,113,133,0.5)] hover:scale-105 transition-all group cursor-pointer font-semibold"
              asChild
            >
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-white"
              >
                <Linkedin className="w-5 h-5 text-white fill-current group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8 hover:scale-105 transition-all font-semibold"
              asChild
            >
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </a>
            </Button>
          </motion.div>

          {/* Line under buttons */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-8 text-sm sm:text-base text-text-dim font-medium"
          >
            Available for freelance projects and consulting opportunities
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-14 sm:mt-16"
          >
            <p className="text-text-dim text-sm mb-4 font-medium">Trusted by forward-thinking teams</p>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-text-dim/80">
              {["Startups", "SaaS", "E-commerce", "Agencies", "Enterprises"].map((item, index) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
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
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-border flex items-start justify-center p-1.5 hover:border-primary/50 transition-colors"
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


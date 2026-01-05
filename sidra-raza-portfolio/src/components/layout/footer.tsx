"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Linkedin, Github, Mail, Sparkles, ArrowUpRight } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/config/site";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  const currentYear = new Date().getFullYear();
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

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const iconHover = shouldReduceMotion
    ? {}
    : { scale: 1.1, transition: { type: "spring" as const, stiffness: 400, damping: 17 } };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="relative border-t border-border bg-surface/30"
    >
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Main Footer */}
        <div className="py-16 sm:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
          {/* Brand */}
          <motion.div variants={itemVariants} className="md:col-span-5">
            <Logo size="lg" />
            <div className="mt-1">
              <span className="block text-xs text-text-dim">
                AI Ops Studio
              </span>
            </div>
            <p className="mt-6 text-text-muted max-w-md leading-relaxed">
              Building AI systems that run your business while you sleep.
              Agentic AI development for businesses ready to automate, scale, and dominate.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-8">
              {[
                { href: siteConfig.links.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: siteConfig.links.github, icon: Github, label: "GitHub" },
                { href: `mailto:${siteConfig.links.email}`, icon: Mail, label: "Email" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.label !== "Email" ? "_blank" : undefined}
                  rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
                  whileHover={iconHover}
                  className="w-10 h-10 rounded-xl bg-surface-light border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={itemVariants} className="md:col-span-2 md:col-start-7">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-primary transition-colors inline-flex items-center group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* More Links */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-5">
              Resources
            </h4>
            <ul className="space-y-3">
              {navLinks.slice(4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-primary transition-colors inline-flex items-center group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.links.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:text-primary-light transition-colors inline-flex items-center group"
                >
                  Book a Call
                  <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Status */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-5">
              Status
            </h4>
            <div className="p-4 rounded-xl bg-surface-light border border-border">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
                </span>
                <span className="text-sm font-medium text-success">
                  Available for Projects
                </span>
              </div>
              <p className="text-sm text-text-dim">
                Currently accepting new clients. Typical response time: 24 hours.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="py-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-text-dim">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-sm text-text-dim flex items-center gap-2">
            Built with AI, for AI
            <motion.span whileHover={iconHover}>
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.span>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

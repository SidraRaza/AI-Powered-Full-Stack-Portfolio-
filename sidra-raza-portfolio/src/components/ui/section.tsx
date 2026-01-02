"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";
import {
  sectionReveal,
  staggerContainer,
  staggerItem,
  viewportOnce,
  ease,
  getReducedMotionVariants,
} from "@/lib/animations";

interface SectionProps {
  children: ReactNode;
  className?: string;
  container?: boolean;
  size?: "default" | "lg" | "xl";
  background?: "default" | "secondary" | "gradient" | "none";
  animate?: boolean;
}

export function Section({
  className,
  container = true,
  size = "default",
  background = "default",
  animate = true,
  children,
}: SectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const sizes = {
    default: "py-16 sm:py-20 lg:py-28",
    lg: "py-20 sm:py-24 lg:py-32",
    xl: "py-24 sm:py-28 lg:py-36",
  };

  const backgrounds = {
    default: "",
    secondary: "bg-surface/30",
    gradient: "bg-gradient-to-b from-surface/50 to-transparent",
    none: "",
  };

  const content = container ? (
    <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-7xl">
      {children}
    </div>
  ) : (
    children
  );

  if (!animate || shouldReduceMotion) {
    return (
      <section className={cn(sizes[size], backgrounds[background], className)}>
        {content}
      </section>
    );
  }

  const variants = shouldReduceMotion ? getReducedMotionVariants(sectionReveal) : sectionReveal;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      className={cn(sizes[size], backgrounds[background], className)}
    >
      {content}
    </motion.section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "mb-10 sm:mb-14",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <motion.div
          variants={staggerItem}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-muted border border-primary/20 text-primary text-sm font-medium mb-6",
            align === "center" && "mx-auto"
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          {badge}
        </motion.div>
      )}
      <motion.h2
        variants={staggerItem}
        className="text-display text-foreground mb-6 sm:mb-8 text-balance"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={staggerItem}
          className={cn(
            "text-lg md:text-xl text-text-muted leading-relaxed mt-4 max-w-2xl",
            align === "center" && "max-w-3xl mx-auto"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8, ease }}
      className={cn(
        "h-px bg-gradient-to-r from-transparent via-border to-transparent origin-center",
        className
      )}
    />
  );
}

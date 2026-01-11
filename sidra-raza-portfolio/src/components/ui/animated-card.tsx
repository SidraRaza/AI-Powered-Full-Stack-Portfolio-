"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: "lift" | "glow" | "tilt" | "scale";
  variant?: "default" | "primary" | "secondary" | "accent";
  border?: boolean;
  background?: "default" | "elevated" | "light";
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = "",
  hoverEffect = "lift",
  variant = "default",
  border = true,
  background = "default",
}) => {
  const getVariantClasses = () => {
    const baseClasses = "rounded-2xl transition-all duration-300";

    const variantClasses = {
      default: border ? "bg-surface border border-border" : "bg-surface",
      primary: border ? "bg-primary/5 border border-primary/30" : "bg-primary/5",
      secondary: border ? "bg-secondary/5 border border-secondary/30" : "bg-secondary/5",
      accent: border ? "bg-accent/5 border border-accent/30" : "bg-accent/5",
    };

    const bgClasses = {
      default: "",
      elevated: "bg-surface-light",
      light: "bg-surface/50 backdrop-blur-sm",
    };

    return cn(
      baseClasses,
      variantClasses[variant],
      bgClasses[background],
      className
    );
  };

  const hoverAnimations: Record<
    NonNullable<AnimatedCardProps["hoverEffect"]>,
    TargetAndTransition
  > = {
    lift: {
      y: -5,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    glow: {
      boxShadow:
        "0 10px 30px -10px rgba(0, 240, 255, 0.2), 0 0 0 1px rgba(0, 240, 255, 0.1)",
      transition: { duration: 0.3 },
    },
    tilt: {
      rotate: -1,
      scale: 1.01,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    scale: {
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className={getVariantClasses()}
      whileHover={hoverAnimations[hoverEffect]}
    >
      {children}
    </motion.div>
  );
};

export { AnimatedCard };

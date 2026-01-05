"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface AnimatedBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "accent" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
  className?: string;
}

const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  pulse = false,
  className = "",
}) => {
  const getVariantClasses = () => {
    const baseClasses = "inline-flex items-center justify-center font-medium rounded-full whitespace-nowrap transition-all duration-300";

    const variantClasses = {
      default: "bg-surface-light text-text-muted border border-border",
      primary: "bg-primary/20 text-primary border border-primary/30",
      secondary: "bg-secondary/20 text-secondary border border-secondary/30",
      accent: "bg-accent/20 text-accent border border-accent/30",
      success: "bg-success/20 text-success border border-success/30",
      warning: "bg-warning/20 text-warning border border-warning/30",
      error: "bg-error/20 text-error border border-error/30",
    };

    const sizeClasses = {
      sm: "text-xs px-2 py-1",
      md: "text-sm px-3 py-1.5",
      lg: "text-base px-4 py-2",
    };

    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  };

  return (
    <motion.span
      className={cn(getVariantClasses())}
      animate={pulse ? {
        scale: [1, 1.05, 1],
      } : {}}
      transition={pulse ? {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
      } : {}}
    >
      {children}
    </motion.span>
  );
};

export { AnimatedBadge };
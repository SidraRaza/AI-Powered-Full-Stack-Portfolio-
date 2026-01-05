"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "accent" | "secondary";
  floatType?: "vertical" | "horizontal" | "diagonal" | "rotation";
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className = "",
  delay = 0,
  duration = 4,
  size = "md",
  variant = "primary",
  floatType = "vertical",
}) => {
  const getVariantClasses = () => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
      xl: "w-12 h-12",
    };

    const variantClasses = {
      primary: "bg-primary/20",
      accent: "bg-accent/20",
      secondary: "bg-secondary/20",
    };

    return `${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  };

  const getAnimation = () => {
    switch (floatType) {
      case "vertical":
        return {
          y: [-10, 10, -10],
        };
      case "horizontal":
        return {
          x: [-10, 10, -10],
        };
      case "diagonal":
        return {
          x: [-10, 10, -10],
          y: [-10, 10, -10],
        };
      case "rotation":
        return {
          rotate: [0, 360],
        };
      default:
        return {
          y: [-10, 10, -10],
        };
    }
  };

  return (
    <motion.div
      className={cn(getVariantClasses())}
      animate={getAnimation()}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export { FloatingElement };
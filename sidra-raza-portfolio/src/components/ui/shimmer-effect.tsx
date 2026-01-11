"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface ShimmerEffectProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  duration?: number;
  variant?: "default" | "primary" | "accent" | "gradient";
}

const ShimmerEffect: React.FC<ShimmerEffectProps> = ({
  children,
  className = "",
  active = true,
  duration = 2,
  variant = "default",
}) => {
  const getShimmerClasses = () => {
    const baseClasses = "relative overflow-hidden";

    let shimmerClasses = "";
    switch (variant) {
      case "primary":
        shimmerClasses = "bg-gradient-to-r from-transparent via-primary/20 to-transparent";
        break;
      case "accent":
        shimmerClasses = "bg-gradient-to-r from-transparent via-accent/20 to-transparent";
        break;
      case "gradient":
        shimmerClasses = "bg-gradient-to-r from-transparent via-primary/20 via-accent/20 to-transparent";
        break;
      case "default":
      default:
        shimmerClasses = "bg-gradient-to-r from-transparent via-white/20 to-transparent";
        break;
    }

    return `${baseClasses} ${className}`;
  };

  return (
    <div className={cn(getShimmerClasses())}>
      {children}
      {active && (
        <motion.div
          className="absolute inset-0 -translate-x-full"
          animate={{
            translateX: "200%",
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className={`w-full h-full ${
            variant === 'primary' ? 'bg-gradient-to-r from-transparent via-primary/20 to-transparent' :
            variant === 'accent' ? 'bg-gradient-to-r from-transparent via-accent/20 to-transparent' :
            variant === 'gradient' ? 'bg-gradient-to-r from-transparent via-primary/20 via-accent/20 to-transparent' :
            'bg-gradient-to-r from-transparent via-white/20 to-transparent'
          }`} />
        </motion.div>
      )}
    </div>
  );
};

export { ShimmerEffect };
"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils/cn";

interface AnimatedButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "gradient" | "pulse";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  asChild?: boolean;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  animationType?: "lift" | "scale" | "tilt" | "glow" | "bounce";
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      asChild = false,
      disabled,
      children,
      type = "button",
      onClick,
      animationType = "lift",
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 rounded-lg overflow-hidden";

    const variants = {
      primary: "bg-primary text-white hover:bg-primary-light shadow-md hover:shadow-[0_0_20px_rgba(251,113,133,0.5)] transition-all duration-300",
      secondary: "bg-surface-light text-foreground hover:bg-surface-elevated border border-border hover:border-primary/50 hover:text-primary transition-all duration-300",
      ghost: "text-text-muted hover:text-primary hover:bg-primary/10 transition-all duration-300",
      outline: "border border-border text-foreground hover:text-primary hover:border-primary bg-transparent hover:shadow-[0_0_15px_rgba(251,113,133,0.25)] transition-all duration-300",
      gradient: "bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] text-white hover:bg-[position:right_center] shadow-md hover:shadow-[0_0_25px_rgba(251,113,133,0.5)] transition-all duration-300",
      pulse: "bg-primary text-white hover:bg-primary-light animate-pulse-glow shadow-md",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm gap-2",
      md: "h-11 px-5 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2",
    };

    // Define different animation variants
    const animationVariants = {
      lift: {
        whileHover: {
          y: -2,
          scale: variant !== "ghost" ? 1.02 : 1,
          transition: { duration: 0.2 }
        },
        whileTap: { scale: 0.98 },
      },
      scale: {
        whileHover: {
          scale: variant !== "ghost" ? 1.05 : 1.02,
          transition: { duration: 0.2 }
        },
        whileTap: { scale: 0.95 },
      },
      tilt: {
        whileHover: {
          rotate: -2,
          scale: variant !== "ghost" ? 1.02 : 1,
          transition: { duration: 0.2 }
        },
        whileTap: { scale: 0.98, rotate: 0 },
      },
      glow: {
        whileHover: {
          boxShadow: "0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.12)",
          transition: { duration: 0.3 }
        },
        whileTap: { scale: 0.98 },
      },
      bounce: {
        whileHover: {
          y: -4,
          transition: { duration: 0.3 }
        },
        whileTap: { y: 0, scale: 0.95 },
      },
    };

    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
          {...(onClick ? { onClick } : {})}
        >
          {children}
        </Slot>
      );
    }

    const animationProps = animationVariants[animationType];

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        whileHover={animationProps.whileHover}
        whileTap={animationProps.whileTap}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          variant === "primary" && "shadow-sm hover:shadow-md",
          variant === "gradient" && "shadow-sm hover:shadow-md",
          className
        )}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <>
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="-ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </motion.svg>
            {children}
          </>
        ) : (
          <span className="relative z-10 flex items-center justify-center gap-2">
            {children}
          </span>
        )}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };
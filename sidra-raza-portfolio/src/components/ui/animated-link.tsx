"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils/cn";

interface AnimatedLinkProps extends LinkProps {
  className?: string;
  children: React.ReactNode;
  variant?: "underline" | "glow" | "slide" | "bounce" | "gradient";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

const AnimatedLink = forwardRef<HTMLAnchorElement, AnimatedLinkProps>(
  (
    {
      className,
      children,
      variant = "underline",
      size = "md",
      disabled = false,
      target,
      rel,
      onClick,
      ...props
    },
    ref
  ) => {
    const baseStyles = "inline-flex items-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer";

    const variants = {
      underline: "relative text-text-muted hover:text-primary link-underline transition-all duration-300",
      glow: "text-text-muted hover:text-primary link-glow transition-all duration-300",
      slide: "text-text-muted hover:text-primary relative overflow-hidden transition-all duration-300",
      bounce: "text-text-muted hover:text-primary transition-all duration-300",
      gradient: "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent hover:brightness-125 transition-all duration-300",
    };

    const sizes = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    };

    // Define different animation variants
    const animationVariants = {
      underline: {
        whileHover: {
          transition: { duration: 0.3 }
        },
      },
      glow: {
        whileHover: {
          scale: 1.05,
          transition: { duration: 0.3 }
        },
        whileTap: { scale: 0.95 },
      },
      slide: {
        whileHover: {
          transition: { duration: 0.3 }
        },
      },
      bounce: {
        whileHover: {
          y: -2,
          transition: { duration: 0.3 }
        },
      },
      gradient: {
        whileHover: {
          scale: 1.02,
          transition: { duration: 0.3 }
        },
      },
    };

    const animationProps = animationVariants[variant];

    const linkProps = {
      target,
      rel: rel || (target === "_blank" ? "noopener noreferrer" : undefined),
      onClick,
    };

    return (
      <Link
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...linkProps}
        {...props}
      >
        <motion.span
          {...animationProps}
          className="relative"
        >
          {children}
          {variant === "underline" && (
            <motion.span
              className="absolute bottom-0 left-0 w-full h-px bg-primary origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          {variant === "slide" && (
            <motion.span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.span>
      </Link>
    );
  }
);

AnimatedLink.displayName = "AnimatedLink";

export { AnimatedLink };
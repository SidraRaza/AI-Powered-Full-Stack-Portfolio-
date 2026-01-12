"use client";

import { useEffect, useRef, ReactNode } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  animationType?:
    | "fade-in-up"
    | "fade-in"
    | "slide-in-left"
    | "slide-in-right"
    | "scale-in";
  delay?: number;
  duration?: number;
  threshold?: number; // mapped to `amount`
  once?: boolean;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className = "",
  animationType = "fade-in-up",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(ref, {
    amount: threshold, // ✅ correct property
    once,
  });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const animations: Record<
    NonNullable<ScrollAnimationProps["animationType"]>,
    Variants
  > = {
    "fade-in-up": {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    "fade-in": {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    "slide-in-left": {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    "slide-in-right": {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    "scale-in": {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={animations[animationType]}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export { ScrollAnimation };

import { Variants, Transition } from "framer-motion";

// Shared easing curve - smooth, confident, enterprise-grade
export const ease = [0.16, 1, 0.3, 1] as const;

// Base transition settings
export const baseTransition: Transition = {
  duration: 0.5,
  ease,
};

// Page transition - used for route changes
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.3, ease },
  },
};

// Section reveal - triggered on scroll
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

// Stagger container for grids/lists
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Stagger item - child of staggerContainer
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

// Card hover effect
export const cardHover = {
  rest: {
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease },
  },
  hover: {
    y: -4,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3, ease },
  },
};

// Button hover - subtle scale with glow
export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.97 },
};

// Heading reveal
export const headingReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

// Text reveal with delay
export const textReveal: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.15, ease },
  },
};

// Fade in only (no movement)
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease },
  },
};

// Scale in from center
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease },
  },
};

// Viewport settings for whileInView
export const viewportOnce = { once: true, margin: "-50px" };

// Reduced motion check helper
export const getReducedMotionVariants = (variants: Variants): Variants => {
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  };
};

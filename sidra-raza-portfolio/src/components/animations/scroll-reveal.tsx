'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  once?: boolean;
  margin?: string;
}

/**
 * ScrollReveal - Wrapper component for scroll-triggered fade + slide animations
 * 
 * Features:
 * - Fade in with slide animation when element enters viewport
 * - Respects prefers-reduced-motion accessibility setting
 * - Configurable direction, delay, and duration
 * - Can animate once or on every scroll
 * 
 * @example
 * ```tsx
 * <ScrollReveal direction="up" duration={0.6}>
 *   <section>Content to animate</section>
 * </ScrollReveal>
 * ```
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 50,
  once = true,
  margin = '-100px'
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, skip animations
  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  // Define animation variants based on direction
  const getInitialVariant = () => {
    if (shouldReduceMotion) return {};
    
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'none':
        return { opacity: 0 };
      default:
        return { opacity: 0, y: distance };
    }
  };

  const animateVariant = {
    opacity: 1,
    x: 0,
    y: 0
  };

  return (
    <motion.div
      className={className}
      initial={getInitialVariant()}
      whileInView={animateVariant}
      viewport={{ once, margin }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
        type: 'tween'
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollRevealStagger - Container for staggered child animations
 * 
 * Use this when you want multiple children to animate in sequence
 * 
 * @example
 * ```tsx
 * <ScrollRevealStagger>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </ScrollRevealStagger>
 * ```
 */
interface ScrollRevealStaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
}

export function ScrollRevealStagger({
  children,
  className = '',
  staggerDelay = 0.1,
  duration = 0.5
}: ScrollRevealStaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration,
        staggerChildren: staggerDelay
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollRevealItem - Individual item within a ScrollRevealStagger container
 */
interface ScrollRevealItemProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function ScrollRevealItem({
  children,
  className = '',
  direction = 'up'
}: ScrollRevealItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  const getInitialVariant = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 30 };
      case 'down':
        return { opacity: 0, y: -30 };
      case 'left':
        return { opacity: 0, x: 30 };
      case 'right':
        return { opacity: 0, x: -30 };
      case 'none':
        return { opacity: 0 };
      default:
        return { opacity: 0, y: 30 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitialVariant()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  );
}

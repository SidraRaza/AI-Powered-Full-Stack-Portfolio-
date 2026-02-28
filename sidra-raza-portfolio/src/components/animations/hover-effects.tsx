'use client';

import { motion } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';

interface HoverEffectsProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  duration?: number;
  whileTap?: boolean;
  tapScale?: number;
  disabled?: boolean;
}

/**
 * HoverEffects - Wrapper component for button hover scale effects
 * 
 * Features:
 * - Smooth scale animation on hover
 * - Optional tap/click animation
 * - Professional spring physics
 * - Respects prefers-reduced-motion
 * 
 * @example
 * ```tsx
 * <HoverEffects scale={1.05}>
 *   <button>Click me</button>
 * </HoverEffects>
 * ```
 */
export const HoverEffects = forwardRef<HTMLDivElement, HoverEffectsProps>(
  function HoverEffects(
    {
      children,
      className = '',
      scale = 1.05,
      duration = 0.2,
      whileTap = true,
      tapScale = 0.95,
      disabled = false
    },
    ref
  ) {
    // If disabled or reduced motion preferred, render without animation
    if (disabled) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={className}
        whileHover={{ scale }}
        whileTap={whileTap ? { scale: tapScale } : undefined}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 17,
          duration
        }}
      >
        {children}
      </motion.div>
    );
  }
);

HoverEffects.displayName = 'HoverEffects';

/**
 * HoverButton - Pre-configured hover effect for buttons
 * 
 * @example
 * ```tsx
 * <HoverButton>
 *   <button className="btn-primary">Click me</button>
 * </HoverButton>
 * ```
 */
interface HoverButtonProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

export function HoverButton({
  children,
  className = '',
  scale = 1.05
}: HoverButtonProps) {
  return (
    <HoverEffects scale={scale} whileTap={true} className={className}>
      {children}
    </HoverEffects>
  );
}

/**
 * HoverCard - Pre-configured hover effect for cards
 * 
 * @example
 * ```tsx
 * <HoverCard>
 *   <div className="card">Card content</div>
 * </HoverCard>
 * ```
 */
interface HoverCardProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  lift?: number;
}

export function HoverCard({
  children,
  className = '',
  scale = 1.02,
  lift = -8
}: HoverCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale,
        y: lift,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * HoverLink - Pre-configured hover effect for links
 * 
 * @example
 * ```tsx
 * <HoverLink href="/about">
 *   <a>About</a>
 * </HoverLink>
 * ```
 */
interface HoverLinkProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

export function HoverLink({
  children,
  className = '',
  scale = 1.1
}: HoverLinkProps) {
  return (
    <HoverEffects scale={scale} whileTap={false} className={className}>
      {children}
    </HoverEffects>
  );
}

/**
 * HoverImage - Pre-configured hover effect for images
 * 
 * @example
 * ```tsx
 * <HoverImage>
 *   <Image src="/photo.jpg" alt="Photo" />
 * </HoverImage>
 * ```
 */
interface HoverImageProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  duration?: number;
}

export function HoverImage({
  children,
  className = '',
  scale = 1.08,
  duration = 0.4
}: HoverImageProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale,
        transition: { duration, ease: 'easeOut' }
      }}
    >
      {children}
    </motion.div>
  );
}

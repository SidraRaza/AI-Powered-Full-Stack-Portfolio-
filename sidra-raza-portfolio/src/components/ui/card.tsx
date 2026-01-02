"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glass" | "bordered" | "elevated";
  hover?: boolean;
  glow?: boolean;
}

export function Card({
  className,
  variant = "default",
  hover = false,
  glow = false,
  children,
}: CardProps) {
  const variants = {
    default: "bg-surface border border-border",
    glass: "glass",
    bordered: "bg-surface/50 border border-border",
    elevated: "bg-surface-light border border-border shadow-xl shadow-black/20",
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
      className={cn(
        "rounded-2xl p-6 md:p-8 transition-colors duration-300",
        variants[variant],
        hover && "cursor-pointer hover:border-primary/30",
        glow && "hover:shadow-lg hover:shadow-primary/5",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

// Motion card for grids with stagger animation
interface MotionCardProps extends CardProps {
  index?: number;
}

export function MotionCard({
  className,
  variant = "default",
  hover = true,
  glow = true,
  index = 0,
  children,
}: MotionCardProps) {
  const variants = {
    default: "bg-surface border border-border",
    glass: "glass",
    bordered: "bg-surface/50 border border-border",
    elevated: "bg-surface-light border border-border shadow-xl shadow-black/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      whileHover={hover ? { y: -6 } : undefined}
      className={cn(
        "rounded-2xl p-6 md:p-8 transition-colors duration-300",
        variants[variant],
        hover && "cursor-pointer hover:border-primary/30",
        glow && "hover:shadow-lg hover:shadow-primary/5",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ className, children }: CardHeaderProps) {
  return <div className={cn("mb-5", className)}>{children}</div>;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ className, children }: CardTitleProps) {
  return (
    <h3 className={cn("text-xl md:text-2xl font-semibold text-foreground", className)}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ className, children }: CardDescriptionProps) {
  return (
    <p className={cn("text-text-muted mt-2 leading-relaxed", className)}>
      {children}
    </p>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ className, children }: CardContentProps) {
  return <div className={cn("", className)}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ className, children }: CardFooterProps) {
  return (
    <div className={cn("mt-6 flex items-center", className)}>{children}</div>
  );
}

// Feature card with icon animation
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  iconColor?: string;
  index?: number;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  iconColor = "text-primary",
  index = 0,
  className,
}: FeatureCardProps) {
  return (
    <MotionCard
      variant="bordered"
      hover
      glow
      index={index}
      className={cn("h-full group", className)}
    >
      <motion.div
        whileHover={{ scale: 1.05, rotate: 3 }}
        transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
        className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors",
          "bg-primary-muted group-hover:bg-primary/20"
        )}
      >
        <div className={cn("w-7 h-7", iconColor)}>{icon}</div>
      </motion.div>
      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-text-muted leading-relaxed">{description}</p>
    </MotionCard>
  );
}

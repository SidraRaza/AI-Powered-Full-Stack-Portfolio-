"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { pageTransition, ease } from "@/lib/animations";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = "" }: PageWrapperProps) {
  return (
    <motion.main
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className={className}
    >
      {children}
    </motion.main>
  );
}

// For pages that don't need animations
export function StaticPageWrapper({ children, className = "" }: PageWrapperProps) {
  return <main className={className}>{children}</main>;
}

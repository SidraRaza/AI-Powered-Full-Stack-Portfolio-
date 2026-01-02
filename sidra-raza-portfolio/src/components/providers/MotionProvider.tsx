"use client";

import { ReactNode } from "react";

interface MotionProviderProps {
  children: ReactNode;
}

// Simple wrapper - LazyMotion with strict mode conflicts with motion.* imports
// For tree-shaking benefits, individual components can use dynamic imports
export function MotionProvider({ children }: MotionProviderProps) {
  return <>{children}</>;
}

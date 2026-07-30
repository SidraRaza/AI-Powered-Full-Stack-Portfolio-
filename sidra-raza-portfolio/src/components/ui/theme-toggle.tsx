"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border border-border bg-surface/50 flex items-center justify-center text-text-muted" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-9 h-9 rounded-lg border border-border bg-surface/60 hover:bg-surface flex items-center justify-center text-text-muted hover:text-foreground transition-colors shadow-sm cursor-pointer"
      aria-label="Toggle Theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : 90,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Moon className="w-4 h-4 text-primary" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: !isDark ? 1 : 0,
          rotate: !isDark ? 0 : -90,
          opacity: !isDark ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Sun className="w-4 h-4 text-amber-500" />
      </motion.div>
    </motion.button>
  );
}

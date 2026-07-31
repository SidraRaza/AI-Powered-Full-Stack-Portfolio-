"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { navLinks, siteConfig } from "@/lib/config/site";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 transition-all duration-300",
        isScrolled
          ? "py-2 bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "py-3 bg-transparent"
      )}
    >
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Logo size="md" className="transition-transform duration-300 hover:scale-105" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors link-underline",
                  pathname === link.href
                    ? "text-foreground font-medium"
                    : "text-text-muted hover:text-foreground"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-[#fce7f3] dark:bg-[#fb7185]/20 border border-[#fbcfe8] dark:border-[#fb7185]/35 rounded-lg -z-10"
                    transition={{
                      type: "spring" as const,
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Primary Action & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button size="sm" asChild>
              <Link href="/contact">Let’s Connect</Link>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <motion.button
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-text-muted hover:text-foreground hover:bg-surface/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="md:hidden fixed inset-0 top-[60px] bg-background"
          >
            <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05 },
                  },
                }}
                className="flex flex-col gap-1"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block px-4 py-3 text-base font-medium rounded-lg transition-colors link-underline",
                        pathname === link.href
                          ? "text-foreground font-medium bg-[#fce7f3] dark:bg-[#fb7185]/20 border border-[#fbcfe8] dark:border-[#fb7185]/35"
                          : "text-text-muted hover:text-foreground hover:bg-surface/50"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="pt-6 mt-6 border-t border-border"
              >
                <Button className="w-full" size="lg" asChild>
                  <Link href="/contact">Let’s Connect</Link>
                </Button>

                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-text-dim">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Available for new projects
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

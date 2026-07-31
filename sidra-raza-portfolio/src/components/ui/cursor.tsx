"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

interface CursorProps {
  enabled?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  type: "sparkle" | "star" | "emoji";
  emoji?: string;
  life: number;
  maxLife: number;
}

const EMOJIS = ["✨", "⭐", "💫", "🌟", "💎"];
const COLORS = ["#fb7185", "#fda4af", "#fecdd3", "#ffffff"];

export function Cursor({ enabled = true }: CursorProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "click">("default");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile device on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Hide on tablet and mobile
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Ultra-smooth spring physics for luxury feel
  const cursorX = useSpring(0, {
    stiffness: 400,
    damping: 40,
    mass: 0.1,
    restDelta: 0.001,
  });

  const cursorY = useSpring(0, {
    stiffness: 400,
    damping: 40,
    mass: 0.1,
    restDelta: 0.001,
  });

  // Outer ring with elegant delay
  const outerX = useSpring(0, {
    stiffness: 200,
    damping: 30,
    mass: 0.5,
    restDelta: 0.001,
  });

  const outerY = useSpring(0, {
    stiffness: 200,
    damping: 30,
    mass: 0.5,
    restDelta: 0.001,
  });

  // Scale and rotation states
  const [scale, setScale] = useState(1);
  const [outerScale, setOuterScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [glowOpacity, setGlowOpacity] = useState(0.4);

  useEffect(() => {
    if (cursorVariant === "hover") {
      setScale(1.35);
      setOuterScale(1.5);
      setRotation(45);
      setGlowOpacity(0.75);
    } else if (cursorVariant === "click") {
      setScale(0.9);
      setOuterScale(1);
      setRotation(0);
      setGlowOpacity(0.6);
    } else {
      setScale(1);
      setOuterScale(1);
      setRotation(0);
      setGlowOpacity(0.4);
    }
  }, [cursorVariant]);

  // Spawn particles - more stars and emojis (ALWAYS call this hook)
  const spawnParticle = useCallback((x: number, y: number) => {
    const rand = Math.random();
    let particleType: "sparkle" | "star" | "emoji" = "sparkle";
    let emoji: string | undefined = undefined;

    // 20% emoji, 40% star, 40% sparkle
    if (rand > 0.8) {
      particleType = "emoji";
      emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    } else if (rand > 0.4) {
      particleType = "star";
    }

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 0.2 + 0.05;

    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.1,
      size: Math.random() * 4 + 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      type: particleType,
      emoji,
      life: 1,
      maxLife: Math.random() * 25 + 35,
    };

    setParticles(prev => {
      const filtered = prev.filter(p => p.life > 0);
      if (filtered.length >= 10) return filtered;
      return [...filtered, newParticle];
    });
  }, []);

  // Update particles with smooth physics (ALWAYS call this hook)
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.005,
            life: p.life - 1 / p.maxLife,
          }))
          .filter(p => p.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [isVisible]);

  // Spawn particles frequently - lots of stars (ALWAYS call this hook)
  useEffect(() => {
    if (!isVisible || cursorVariant === "click") return;

    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        spawnParticle(cursorX.get(), cursorY.get());
      }
    }, 80);

    return () => clearInterval(interval);
  }, [isVisible, cursorVariant, spawnParticle, cursorX, cursorY]);

  // Mouse event handlers (ALWAYS call this hook)
  useEffect(() => {
    if (!enabled) return;

    const showTimer = setTimeout(() => setIsVisible(true), 100);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      outerX.set(e.clientX);
      outerY.set(e.clientY);
    };

    const handleMouseDown = () => setCursorVariant("click");
    const handleMouseUp = () => setCursorVariant(isHovering ? "hover" : "default");

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor='hover']") ||
        target.classList.contains("link-underline") ||
        target.closest(".link-underline");

      if (isHoverable) {
        setIsHovering(true);
        setCursorVariant("hover");
        if (Math.random() > 0.6) spawnParticle(cursorX.get(), cursorY.get());
      } else {
        setIsHovering(false);
        setCursorVariant("default");
      }
    };

    const style = document.createElement("style");
    style.innerHTML = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver, true);

    return () => {
      clearTimeout(showTimer);
      document.head.removeChild(style);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver, true);
    };
  }, [enabled, cursorVariant, isHovering, spawnParticle, cursorX, cursorY]);

  // Don't render cursor on mobile or if disabled (AFTER all hooks)
  if (!enabled || isMobile) return null;

  return (
    <>
      {/* Center Dot - Green (Button Color) - Always Visible on Top */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: scale,
          rotate: rotation,
          opacity: 1,
        }}
        className="fixed top-0 left-0 w-5 h-5 -ml-2.5 -mt-2.5 pointer-events-none z-[10001]"
        initial={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.15 }}
      >
        {/* White outer ring for visibility */}
        <div 
          className="absolute inset-0 rounded-full bg-white"
          style={{
            boxShadow: "0 0 8px rgba(0,0,0,0.5)",
          }}
        />
        
        {/* Coral/Rose glowing dot */}
        <div 
          className="absolute inset-0.5 rounded-full"
          style={{
            background: "linear-gradient(135deg, #fb7185 0%, #fda4af 100%)",
            boxShadow: "0 0 8px rgba(251,113,133,0.9), 0 0 16px rgba(253,164,175,0.6)",
          }}
        />

        {/* Bright white center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-2 h-2 rounded-full bg-white"
            style={{
              boxShadow: "0 0 4px #fb7185",
            }}
          />
        </div>

        {/* Shine overlay - always visible */}
        <div 
          className="absolute top-0.5 left-0.5 w-3 h-3 rounded-full"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, transparent 70%)",
            filter: "blur(0.5px)",
          }}
        />
      </motion.div>

      {isVisible && (
        <>
          {/* Particle System - Big Stars & Emojis */}
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              style={{
                x: particle.x,
                y: particle.y,
                opacity: particle.life,
                scale: particle.life,
              }}
              className="fixed top-0 left-0 pointer-events-none z-[9996]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {particle.type === "emoji" ? (
                <span
                  style={{
                    fontSize: `${particle.size * 4}px`,
                    filter: "drop-shadow(0 0 6px rgba(251,113,133,0.8))",
                  }}
                >
                  {particle.emoji}
                </span>
              ) : particle.type === "star" ? (
                <svg
                  width={particle.size * 4}
                  height={particle.size * 4}
                  viewBox="0 0 24 24"
                  fill={particle.color}
                  style={{
                    filter: `drop-shadow(0 0 8px ${particle.color})`,
                    opacity: 0.95,
                  }}
                >
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              ) : (
                <div
                  style={{
                    width: particle.size * 2.5,
                    height: particle.size * 2.5,
                    background: particle.color,
                    filter: "blur(1px) drop-shadow(0 0 6px rgba(251,113,133,0.8))",
                  }}
                  className="rounded-full"
                />
              )}
            </motion.div>
          ))}

          {/* Outer Ring 1 - Largest */}
          <motion.div
            style={{
              x: outerX,
              y: outerY,
            }}
            animate={{
              scale: outerScale * 1.4,
              opacity: glowOpacity * 0.4,
              rotate: rotation,
            }}
            className="fixed top-0 left-0 w-14 h-14 -ml-7 -mt-7 pointer-events-none z-[9996]"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 rounded-full border border-primary/30 blur-[1px]" />
          </motion.div>

          {/* Outer Ring 2 - Medium */}
          <motion.div
            style={{
              x: outerX,
              y: outerY,
            }}
            animate={{
              scale: outerScale * 1.25,
              opacity: glowOpacity * 0.5,
              rotate: rotation,
            }}
            className="fixed top-0 left-0 w-12 h-12 -ml-6 -mt-6 pointer-events-none z-[9997]"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="absolute inset-0 rounded-full border border-accent/40 blur-[1px]" />
          </motion.div>

          {/* Outer Ring 3 - Small */}
          <motion.div
            style={{
              x: outerX,
              y: outerY,
            }}
            animate={{
              scale: outerScale * 1.1,
              opacity: glowOpacity * 0.6,
              rotate: rotation,
            }}
            className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 pointer-events-none z-[9998]"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-primary/50 blur-[0.5px]" />
          </motion.div>

          {/* Outer Ring 4 - Innermost */}
          <motion.div
            style={{
              x: outerX,
              y: outerY,
            }}
            animate={{
              scale: outerScale,
              opacity: glowOpacity * 0.7,
              rotate: rotation,
            }}
            className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 pointer-events-none z-[9999]"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-accent/60" />
          </motion.div>

          {/* Soft Gradient Glow Background */}
          <motion.div
            style={{
              x: outerX,
              y: outerY,
            }}
            animate={{
              opacity: glowOpacity * 0.3,
              scale: outerScale * 1.3,
            }}
            className="fixed top-0 left-0 w-20 h-20 -ml-10 -mt-10 pointer-events-none z-[9995]"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div 
              className="w-full h-full rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(251,113,133,0.3) 0%, rgba(253,164,175,0.2) 50%, transparent 70%)",
                filter: "blur-3xl",
              }}
            />
          </motion.div>
        </>
      )}
    </>
  );
}

"use client";

import React, { useEffect, useRef } from "react";

interface Dot {
  angle: number;
  speed: number;
  size: number;
  color: string;
  opacity: number;
  x: number;
  y: number;
}

interface AmbientParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  pulseSpeed: number;
  pulseAngle: number;
}

interface Ring {
  radiusX: number;
  radiusY: number;
  tiltAngle: number;
  direction: number; // 1 for clockwise, -1 for counter-clockwise
  dots: Dot[];
}

const PALETTE = [
  "#fb7185", // Coral Rose (Primary)
  "#fda4af", // Light Rose
  "#7c3aed", // Violet
  "#3b82f6", // Blue
  "#06b6d4", // Cyan
  "#f472b6", // Pink
  "#ec4899", // Deep Pink
];

export function OrbitingDotsBackground({ position = "absolute" }: { position?: "absolute" | "fixed" }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReducedMotion = mediaQuery.matches;

    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionPreferenceChange);
    } else {
      mediaQuery.addListener(handleMotionPreferenceChange);
    }

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let rings: Ring[] = [];
    let ambientParticles: AmbientParticle[] = [];

    // Mouse tracking for interactive tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left - width / 2) * 0.04;
      targetMouseY = (e.clientY - rect.top - height / 2) * 0.04;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const initRingsAndParticles = (w: number, h: number) => {
      width = w;
      height = h;

      // Calculate maxRadius based on diagonal distance so orbiting dots span entire section
      const diagonal = Math.hypot(w, h);
      const maxRadius = diagonal * 0.65;
      const numRings = 16;
      const step = maxRadius / numRings;

      rings = [];

      for (let i = 1; i <= numRings; i++) {
        const baseRadius = i * step;
        const squish = 0.5 + Math.random() * 0.4;
        const radiusX = baseRadius;
        const radiusY = baseRadius * squish;
        const tiltAngle = (Math.random() - 0.5) * 1.0;
        const direction = i % 2 === 0 ? 1 : -1;

        const numDots = Math.floor(Math.random() * 4) + 4;
        const dots: Dot[] = [];

        for (let j = 0; j < numDots; j++) {
          dots.push({
            angle: Math.random() * Math.PI * 2,
            speed: (0.0004 + Math.random() * 0.0012) * direction,
            size: 1.2 + Math.random() * 2.2,
            color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
            opacity: 0.45 + Math.random() * 0.55,
            x: 0,
            y: 0,
          });
        }

        rings.push({
          radiusX,
          radiusY,
          tiltAngle,
          direction,
          dots,
        });
      }

      // Ambient background particles for full screen coverage
      ambientParticles = [];
      const numAmbient = Math.floor((w * h) / 18000) + 35;
      for (let k = 0; k < numAmbient; k++) {
        ambientParticles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: 0.8 + Math.random() * 1.8,
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          opacity: 0.25 + Math.random() * 0.45,
          pulseSpeed: 0.01 + Math.random() * 0.025,
          pulseAngle: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      const dpr = window.devicePixelRatio || 1;

      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? parent.clientHeight : window.innerHeight;

      if (w === 0 || h === 0) return;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.scale(dpr, dpr);
      initRingsAndParticles(w, h);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse offset interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const centerX = width / 2 + mouseX;
      const centerY = height / 2 + mouseY;

      // 1. Render Ambient Floating Particles across the entire background
      ambientParticles.forEach((p) => {
        if (!isReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.pulseAngle += p.pulseSpeed;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        const currentOpacity = Math.max(0.1, p.opacity + Math.sin(p.pulseAngle) * 0.15);

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentOpacity;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 4;
        ctx.fill();
        ctx.restore();
      });

      // 2. Render Orbiting Rings & Dots
      const allDotsPositions: { x: number; y: number; color: string; opacity: number }[] = [];

      rings.forEach((ring) => {
        const cosTilt = Math.cos(ring.tiltAngle);
        const sinTilt = Math.sin(ring.tiltAngle);

        ring.dots.forEach((dot) => {
          if (!isReducedMotion) {
            dot.angle += dot.speed;
          }

          const rawX = ring.radiusX * Math.cos(dot.angle);
          const rawY = ring.radiusY * Math.sin(dot.angle);

          const rotX = rawX * cosTilt - rawY * sinTilt;
          const rotY = rawX * sinTilt + rawY * cosTilt;

          dot.x = centerX + rotX;
          dot.y = centerY + rotY;

          allDotsPositions.push({ x: dot.x, y: dot.y, color: dot.color, opacity: dot.opacity });

          // Draw Glowing Dot
          ctx.save();
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
          ctx.fillStyle = dot.color;
          ctx.globalAlpha = dot.opacity;
          ctx.shadowColor = dot.color;
          ctx.shadowBlur = dot.size * 8;
          ctx.fill();
          ctx.restore();
        });
      });

      // 3. Constellation Connections for nearby dots
      const maxConnectDist = 110;
      for (let i = 0; i < allDotsPositions.length; i++) {
        for (let j = i + 1; j < allDotsPositions.length; j++) {
          const d1 = allDotsPositions[i];
          const d2 = allDotsPositions[j];
          const dx = d1.x - d2.x;
          const dy = d1.y - d2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectDist * maxConnectDist) {
            const dist = Math.sqrt(distSq);
            const lineOpacity = (1 - dist / maxConnectDist) * 0.15 * Math.min(d1.opacity, d2.opacity);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(d1.x, d1.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.strokeStyle = d1.color;
            ctx.globalAlpha = lineOpacity;
            ctx.lineWidth = 0.7;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMotionPreferenceChange);
      } else {
        mediaQuery.addListener(handleMotionPreferenceChange);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`${position} inset-0 z-0 pointer-events-none w-full h-full`}
    />
  );
}

export default OrbitingDotsBackground;

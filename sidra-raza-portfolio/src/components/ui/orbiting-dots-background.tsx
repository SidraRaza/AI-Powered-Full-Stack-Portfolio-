"use client";

import React, { useEffect, useRef } from "react";

interface Dot {
  angle: number;
  speed: number;
  size: number;
  color: string;
  opacity: number;
}

interface Ring {
  radiusX: number;
  radiusY: number;
  tiltAngle: number;
  direction: number; // 1 for clockwise, -1 for counter-clockwise
  dots: Dot[];
}

const PALETTE = ["#ec4899", "#7c3aed", "#3b82f6", "#06b6d4", "#f472b6"];

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

    const initRings = (w: number, h: number) => {
      width = w;
      height = h;
      const minDim = Math.min(w, h);
      const maxRadius = minDim * 0.6;
      const numRings = 10;
      const step = maxRadius / numRings;

      rings = [];

      for (let i = 1; i <= numRings; i++) {
        const baseRadius = i * step;
        // Random tilt/squish for 3D depth perspective (radiusY between 0.65x and 0.9x of radiusX)
        const squish = 0.65 + Math.random() * 0.25;
        const radiusX = baseRadius;
        const radiusY = baseRadius * squish;
        // Random tilt angle per ring (-0.4 to +0.4 rad)
        const tiltAngle = (Math.random() - 0.5) * 0.8;
        // Alternate rotation direction per ring
        const direction = i % 2 === 0 ? 1 : -1;

        // 3 to 5 dots per ring
        const numDots = Math.floor(Math.random() * 3) + 3;
        const dots: Dot[] = [];

        for (let j = 0; j < numDots; j++) {
          dots.push({
            angle: Math.random() * Math.PI * 2,
            speed: (0.0006 + Math.random() * 0.0012) * direction,
            size: 0.8 + Math.random() * 1.6, // 0.8px to 2.4px
            color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
            opacity: 0.6 + Math.random() * 0.4,
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
    };

    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.scale(dpr, dpr);
      initRings(w, h);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      // Near-black background (#050506)
      ctx.fillStyle = "#050506";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      rings.forEach((ring) => {
        const cosTilt = Math.cos(ring.tiltAngle);
        const sinTilt = Math.sin(ring.tiltAngle);

        ring.dots.forEach((dot) => {
          if (!isReducedMotion) {
            dot.angle += dot.speed;
          }

          // Elliptical orbit calculation
          const rawX = ring.radiusX * Math.cos(dot.angle);
          const rawY = ring.radiusY * Math.sin(dot.angle);

          // 2D Rotation transformation for tilted perspective
          const rotX = rawX * cosTilt - rawY * sinTilt;
          const rotY = rawX * sinTilt + rawY * cosTilt;

          const finalX = centerX + rotX;
          const finalY = centerY + rotY;

          // Draw Soft Glowing Dot
          ctx.save();
          ctx.beginPath();
          ctx.arc(finalX, finalY, dot.size, 0, Math.PI * 2);
          ctx.fillStyle = dot.color;
          ctx.globalAlpha = dot.opacity;
          ctx.shadowColor = dot.color;
          ctx.shadowBlur = dot.size * 6;
          ctx.fill();
          ctx.restore();
        });
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMotionPreferenceChange);
      } else {
        mediaQuery.removeListener(handleMotionPreferenceChange);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`${position} inset-0 z-0 pointer-events-none w-full h-full`}
      style={{ background: "#050506" }}
    />
  );
}

export default OrbitingDotsBackground;

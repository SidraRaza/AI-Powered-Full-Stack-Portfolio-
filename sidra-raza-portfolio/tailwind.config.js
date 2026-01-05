/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050508",
        "background-secondary": "#0a0a10",
        surface: "#0f0f18",
        "surface-light": "#16162a",
        "surface-elevated": "#1a1a30",
        border: "#1e1e3a",
        "border-light": "#2a2a50",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#00f0ff",
          light: "#4df8ff",
          muted: "rgba(0, 240, 255, 0.12)",
        },
        accent: {
          DEFAULT: "#a855f7",
          light: "#c084fc",
          muted: "rgba(168, 85, 247, 0.12)",
        },
        secondary: {
          DEFAULT: "#3b82f6",
          muted: "rgba(59, 130, 246, 0.12)",
        },
        "text-secondary": "#e0e0f0",
        "text-muted": "#8888a0",
        "text-dim": "#505068",
        success: {
          DEFAULT: "#10b981",
          muted: "rgba(16, 185, 129, 0.12)",
        },
        warning: {
          DEFAULT: "#f59e0b",
          muted: "rgba(245, 158, 11, 0.12)",
        },
        error: {
          DEFAULT: "#ef4444",
          muted: "rgba(239, 68, 68, 0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        "gradient-shift": "gradient-shift 3s ease-in-out infinite",
        "slide-in": "slide-in 0.6s ease-out forwards",
        "slide-in-left": "slide-in-left 0.6s ease-out forwards",
        "slide-in-right": "slide-in-right 0.6s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
        bounce: "bounce 1s ease-in-out infinite",
        "text-glow": "text-glow 2s ease-in-out infinite",
        "link-hover": "link-hover 0.3s ease-in-out",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(1deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-5px) rotate(0.5deg)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(0, 240, 255, 0.5), 0 0 60px rgba(0, 240, 255, 0.2)",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% center" },
          "50%": { backgroundPosition: "100% center" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateY(20px) scale(0.95)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-20px) scale(0.95)" },
          to: { opacity: "1", transform: "translateX(0) scale(1)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px) scale(0.95)" },
          to: { opacity: "1", transform: "translateX(0) scale(1)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.8)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "text-glow": {
          "0%, 100%": { textShadow: "0 0 10px rgba(0, 240, 255, 0.3)" },
          "50%": { textShadow: "0 0 20px rgba(0, 240, 255, 0.6), 0 0 30px rgba(0, 240, 255, 0.4)" },
        },
        "link-hover": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Chatbot components (added 2026-03-05)
    "./src/components/chatbot/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-secondary": "var(--background-secondary)",
        surface: "var(--surface)",
        "surface-light": "var(--surface-light)",
        "surface-elevated": "var(--surface-elevated)",
        border: "var(--border)",
        "border-light": "var(--border-light)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          light: "var(--primary-light)",
          muted: "var(--primary-muted)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          light: "var(--accent-light)",
          muted: "var(--accent-muted)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          muted: "var(--secondary-muted)",
        },
        muted: "var(--text-muted)",
        dim: "var(--text-dim)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "text-dim": "var(--text-dim)",
        success: {
          DEFAULT: "var(--success)",
          muted: "var(--success-muted)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          muted: "var(--warning-muted)",
        },
        error: {
          DEFAULT: "var(--error)",
          muted: "var(--error-muted)",
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

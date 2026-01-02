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
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        "gradient-shift": "gradient-shift 3s ease-in-out infinite",
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
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.12)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(0, 240, 255, 0.5), 0 0 80px rgba(0, 240, 255, 0.12), 0 0 100px rgba(0, 240, 255, 0.12)",
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
      },
    },
  },
  plugins: [],
};

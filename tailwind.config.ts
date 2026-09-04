import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#EFE3C8",
        "parchment-light": "#F8F0DD",
        ivory: "#FBF6E9",
        ink: "#3B2A1E",
        "ink-soft": "#5A4534",
        burgundy: "#6B2737",
        "burgundy-deep": "#4A1B27",
        gold: "#B8935A",
        "gold-soft": "#D3B583",
        charcoal: "#251C15",
      },
      fontFamily: {
        serif: ["var(--font-body)", "Georgia", "serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      backgroundImage: {
        "paper-grain":
          "radial-gradient(ellipse at top left, rgba(184,147,90,0.10), transparent 55%), radial-gradient(ellipse at bottom right, rgba(107,39,55,0.08), transparent 55%)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        drift: {
          "0%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(3deg)" },
          "100%": { transform: "translateY(0px) rotate(0deg)" },
        },
      },
      animation: {
        flicker: "flicker 4s ease-in-out infinite",
        drift: "drift 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

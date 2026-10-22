import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base dark teal theme inspired by palette:
        // 003135 (Deep Dark Teal), 024950 (Rich Teal), 964734 (Terracotta/Rust), 0FA4AF (Vibrant Aqua), AFDDE5 (Soft Ice Blue)
        background: "#001b1e",
        foreground: "#f0fbfd",
        card: {
          DEFAULT: "#003135",
          hover: "#024950",
          subtle: "#002428",
        },
        surface: {
          DEFAULT: "#003135",
          dark: "#001b1e",
          teal: "#024950",
          ice: "#AFDDE5",
          rust: "#964734",
        },
        primary: {
          DEFAULT: "#0FA4AF", // Vibrant Electric Aqua
          light: "#AFDDE5",   // Soft Ice Blue
          dark: "#024950",    // Rich Forest Teal
          foreground: "#001b1e",
        },
        secondary: {
          DEFAULT: "#964734", // Warm Terracotta / Rust Copper
          light: "#b85b44",
          dark: "#743323",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#8fb7be",
          foreground: "#68949c",
          dark: "#024950",
        },
        border: {
          DEFAULT: "rgba(175, 221, 229, 0.12)",
          subtle: "rgba(175, 221, 229, 0.06)",
          highlight: "rgba(15, 164, 175, 0.45)",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 50px -10px rgba(15, 164, 175, 0.45)",
        "glow-warm": "0 0 40px -10px rgba(150, 71, 52, 0.35)",
        "glow-ice": "0 0 40px -10px rgba(175, 221, 229, 0.3)",
        glass: "0 8px 32px 0 rgba(0, 24, 27, 0.65)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "radial-highlight":
          "radial-gradient(circle at 50% 0%, rgba(15, 164, 175, 0.18) 0%, transparent 70%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;

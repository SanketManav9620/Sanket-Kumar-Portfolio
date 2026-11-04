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
        // Sophisticated Funky Palette:
        // Darker shade of grey (#162032, #18191f), Warm Beige (#F5EBE0, #E8D5C4), Lighter Burgundy (#B23A5B, #D45476)
        background: "#162032",
        foreground: "#F5EBE0",
        card: {
          DEFAULT: "#3a3229", // 30% lighter warm dark beige
          hover: "#463d33",
          subtle: "#302922",
        },
        surface: {
          DEFAULT: "#18191f",
          dark: "#162032",
          grey: "#23252e",
          beige: "#F5EBE0",
          burgundy: "#B23A5B",
        },
        primary: {
          DEFAULT: "#B23A5B", // Lighter Burgundy
          light: "#D45476",   // Electric Berry Rose
          dark: "#83223C",    // Rich Wine Burgundy
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#E8D5C4", // Warm Beige
          light: "#FAF5EE",   // Cream
          dark: "#C9B39F",    // Muted Sand
          foreground: "#162032",
        },
        darkbeige: {
          DEFAULT: "#3a3229", // 30% lighter warm dark beige
          card: "#362f26",
          hover: "#463d33",
          border: "#54473b",
          light: "#4e4337",
        },
        beige: {
          DEFAULT: "#F5EBE0",
          light: "#FAF5EE",
          dark: "#D8C3B0",
          muted: "#C4B4A5",
        },
        burgundy: {
          darkest: "#4A0E17", // Deep Wine / Oxblood (darkest)
          dark: "#7A172B",    // Rich Wine Crimson
          DEFAULT: "#B23A5B", // Signature Electric Burgundy
          medium: "#9B2242",  // Classic Crimson Wine
          light: "#D45476",   // Electric Berry Rose
          lightest: "#F28EA9",// Soft Light Rose Burgundy
          pale: "#FBD5DF",    // Pale Silk Rose
          subtle: "rgba(178, 58, 91, 0.15)",
          glow: "rgba(212, 84, 118, 0.35)",
        },
        darkgrey: {
          DEFAULT: "#18191f",
          dark: "#162032",
          light: "#23252e",
          border: "#2d303b",
        },
        muted: {
          DEFAULT: "#A09A92",
          foreground: "#8A857D",
          dark: "#23252e",
        },
        border: {
          DEFAULT: "rgba(245, 235, 224, 0.12)",
          subtle: "rgba(245, 235, 224, 0.06)",
          highlight: "rgba(178, 58, 91, 0.5)",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 50px -10px rgba(178, 58, 91, 0.45)",
        "glow-warm": "0 0 40px -10px rgba(245, 235, 224, 0.25)",
        "glow-burgundy": "0 0 40px -10px rgba(178, 58, 91, 0.4)",
        glass: "0 8px 32px 0 rgba(10, 11, 14, 0.75)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "radial-highlight":
          "radial-gradient(circle at 50% 0%, rgba(178, 58, 91, 0.22) 0%, transparent 70%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;

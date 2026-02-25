import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        anthracite: "#0a0a0a",
        carbon: {
          800: "var(--carbon-800)",
          700: "var(--carbon-700)",
          600: "var(--carbon-600)",
          500: "var(--carbon-500)",
        },
        accent: {
          yellow: "#FFD700",
          red: "#FF0000",
        },
      },
      fontFamily: {
        heading: ["var(--font-play)", "system-ui", "sans-serif"],
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(255, 215, 0, 0.4)",
        "glow-red": "0 0 24px rgba(255, 0, 0, 0.4)",
        "card-glow": "0 0 40px -8px rgba(255, 215, 0, 0.2)",
        "card-glow-red": "0 0 40px -8px rgba(255, 0, 0, 0.18)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

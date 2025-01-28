import type { Config } from "tailwindcss";

export default {
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
        brand: {
          blue: "#0070f3",
          green: "#00bfa5",
          yellow: "#facc15",
          red: "#ef4444",
          indigo: "#6366f1",
          purple: "#8b5cf6",
          teal: "#14b8a6",
          pink: "#ec4899",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        table: "var(--color-table)",
        "table-border": "var(--color-table-border)",
        panel: "var(--color-panel)",
        "panel-text": "var(--color-panel-text)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        "accent-text": "var(--color-accent-text)",
        outline: "var(--color-outline)",
        danger: "var(--color-danger)",
      },
      fontFamily: {
        display: ["Trebuchet MS", "Segoe UI", "sans-serif"],
        body: ["Segoe UI", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 10px rgba(0, 0, 0, 0.35)",
        app: "0 12px 30px rgba(0, 0, 0, 0.35)",
      },
      keyframes: {
        cardDeal: {
          "0%": { transform: "translateY(-16px) scale(0.9)", opacity: "0" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
      },
      animation: {
        "card-deal": "cardDeal 0.25s ease-out",
      },
    },
  },
  plugins: [],
};
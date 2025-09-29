/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        colorchange: {
          "0%": { borderRightColor: "#f87171" },
          "25%": { borderRightColor: "#fbbf24" },
          "50%": { borderRightColor: "#34d399", borderLeftColor: "#60a5fa" },
          "75%": { borderRightColor: "#f43f5e", borderLeftColor: "#0ea5e9" },
          "100%": { borderLeftColor: "#840227" },
        },
      },
      animation: {
        colorchange: "colorchange 3s linear infinite",
      },
    },
  },
  plugins: [],
}

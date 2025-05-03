import { type Config } from "tailwindcss";
import typography from "typography"

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
selfURL: import.meta.url,
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Paleta de colores
        // #1C1C1C
        // #302A16
        // #FDE4C3
        // #F7F1EA
        gruvbox: "#F7F1EA",
        whipacity: "rgba(255,255,255,0.4)",
        "gruvbox-dark": "#282828",
        "gruvbox-dark-code": "#32302f",
      },
      fontFamily: {
        sans: "Poppins, sans-serif",
      },
    },
  },
  plugins: [typography],
} satisfies Config;

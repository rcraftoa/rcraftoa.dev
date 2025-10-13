import { type Config } from "tailwindcss";
import typography from "typography";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  darkMode: "class",
  plugins: [typography],
} satisfies Config;

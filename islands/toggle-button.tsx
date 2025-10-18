import { useLayoutEffect } from "preact/hooks";
import { SunIcon } from "../components/Icons/SunIcon.tsx";
import { MoonIcon } from "../components/Icons/MoonIcon.tsx";
import { useSignal } from "npm:@preact/signals@^2.2.1";

const ToggleButton = () => {
  const theme = useSignal((() => {
    if (import.meta.env.SSR) {
      return undefined;
    }
    if (
      typeof localStorage !== "undefined" && localStorage.getItem("theme")
    ) {
      return localStorage.getItem("theme");
    }
    if (globalThis.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  })());

  const toggleTheme = () => {
    const t = theme.value === "light" ? "dark" : "light";
    localStorage.setItem("theme", t);
    theme.value = t;
  };

  useLayoutEffect(() => {
    const root = document.documentElement;
    theme.value === "light"
      ? root.classList.remove("dark")
      : root.classList.add("dark");
  }, [theme.value]);

  const isDark = theme.value === "dark";

  return (
    <div>
      <button
        type="button"
        onClick={toggleTheme}
        class="flex justify-center items-center dark:bg-[#ffdf9a] dark:hover:bg-[#eeca7a] p-2 rounded-lg bg-[#aa8ee4] hover:bg-[#8b71c4] w-9 h-9 focus:outline-none"
        aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      >
        {!theme.value ? <span /> : isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
};

export default ToggleButton;

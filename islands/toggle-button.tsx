import { useEffect, useState } from "preact/hooks";
import { SunIcon } from "../components/Icons/SunIcon.tsx";
import { MoonIcon } from "../components/Icons/MoonIcon.tsx";

const themes = ["dark"];

const ToggleButton = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return undefined;
    }
    if (localStorage && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
  });
  const toggleTheme = () => {
    const t = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", t);
    setTheme(t);
  };

  useEffect(() => {
    const root = document.documentElement;
    theme === "light"
      ? root.classList.remove("dark")
      : root.classList.add("dark");
  }, [theme]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted
    ? (
      <div>
        {themes.map((t) => {
          const checked = t === theme;
          return (
            <button
              type="button"
              key={t}
              onClick={toggleTheme}
              class="flex justify-center items-center dark:bg-[#ffdf9a] dark:hover:bg-[#eeca7a] p-2 rounded-lg bg-[#aa8ee4] hover:bg-[#8b71c4] w-9 h-9 focus:outline-none"
              aria-label={checked
                ? "Cambiar a modo claro"
                : "Cambiar a modo oscuro"}
            >
              {checked ? <SunIcon /> : <MoonIcon />}
            </button>
          );
        })}
      </div>
    )
    : <div />;
};

export default ToggleButton;

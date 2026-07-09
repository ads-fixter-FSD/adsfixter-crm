"use client";

import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "adsfixter-theme";

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as "light" | "dark" | null;
  return stored === "dark" ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  };

  const setLightTheme = () => {
    setTheme("light");
    document.documentElement.setAttribute("data-theme", "light");
    window.localStorage.setItem(THEME_STORAGE_KEY, "light");
  };

  return { theme, toggleTheme, setLightTheme };
}

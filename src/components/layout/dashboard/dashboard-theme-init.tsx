"use client";

import { useEffect } from "react";

const THEME_STORAGE_KEY = "adsfixter-theme";

export function DashboardThemeInit() {
  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const nextTheme = savedTheme === "dark" ? "dark" : "light";

    if (savedTheme !== "dark") {
      window.localStorage.setItem(THEME_STORAGE_KEY, "light");
      document.documentElement.dataset.theme = "light";
      return;
    }

    document.documentElement.dataset.theme = nextTheme;
  }, []);

  return null;
}

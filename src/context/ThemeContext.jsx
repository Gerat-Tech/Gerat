"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
  theme: "dark",
  resolvedTheme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ initialTheme = "dark", children }) {
  const [theme, setThemeState] = useState(initialTheme);
  const [systemTheme, setSystemTheme] = useState(initialTheme === "light" ? "light" : "dark");

  useEffect(() => {
    // 1. Sync with localStorage if client had saved theme before cookie was set
    try {
      const stored = localStorage.getItem("gerat-dashboard-theme");
      if (stored && stored !== theme) {
        setTimeout(() => {
          setThemeState(stored);
          document.cookie = `gerat-dashboard-theme=${stored}; path=/; max-age=31536000; SameSite=Lax`;
        }, 0);
      } else if (!stored && theme) {
        localStorage.setItem("gerat-dashboard-theme", theme);
        document.cookie = `gerat-dashboard-theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
      }
    } catch {}

    // 2. Listen for system color-scheme changes if theme is "system"
    if (typeof window !== "undefined" && window.matchMedia) {
      const mq = window.matchMedia("(prefers-color-scheme: light)");
      const handler = (e) => setSystemTheme(e.matches ? "light" : "dark");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme]);

  const resolvedTheme = React.useMemo(() => {
    return theme === "system" ? systemTheme : theme;
  }, [theme, systemTheme]);

  useEffect(() => {
    try {
      localStorage.setItem("gerat-dashboard-theme", theme);
      document.cookie = `gerat-dashboard-theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
      const root = document.documentElement;
      if (resolvedTheme === "light") {
        root.classList.add("dashboard-light");
        root.classList.remove("dashboard-dark");
      } else {
        root.classList.add("dashboard-dark");
        root.classList.remove("dashboard-light");
      }
    } catch {}
  }, [theme, resolvedTheme]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("gerat-dashboard-theme", newTheme);
      document.cookie = `gerat-dashboard-theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {}
  };

  const toggleTheme = () => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("gerat-dashboard-theme", next);
        document.cookie = `gerat-dashboard-theme=${next}; path=/; max-age=31536000; SameSite=Lax`;
      } catch {}
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

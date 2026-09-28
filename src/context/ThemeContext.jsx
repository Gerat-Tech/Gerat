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
    // 1. Sync with localStorage for dashboard theme & purge legacy global gerat-theme
    try {
      if (document.cookie.includes("gerat-theme=")) {
        document.cookie = "gerat-theme=; path=/; max-age=0; SameSite=Lax";
      }
      localStorage.removeItem("gerat-theme");

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
      
      // Dashboard theme scoping:
      // When dashboard is light: apply light + site-light + dashboard-light
      // When dashboard is dark: apply dark + dashboard-dark (removing light/site-light so dark dashboard is crisp)
      if (resolvedTheme === "light") {
        root.classList.remove("dark", "dashboard-dark");
        root.classList.add("light", "site-light", "dashboard-light");
      } else {
        root.classList.remove("light", "site-light", "dashboard-light");
        root.classList.add("dark", "dashboard-dark");
      }
    } catch {}

    return () => {
      // Clean up dashboard classes on unmount: restore public website to real light mode!
      try {
        const root = document.documentElement;
        root.classList.remove("dark", "dashboard-dark", "dashboard-light");
        root.classList.add("light", "site-light");
      } catch {}
    };
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

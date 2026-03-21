"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { defaultThemePreference } from "@/config/theme";
import type { ThemeMode, ThemePreference } from "@/types/theme";

type ThemeContextValue = ThemePreference & {
  setMode: (mode: ThemeMode) => void;
  setPrimaryColor: (color: string) => void;
};

const STORAGE_KEY = "firecrm-theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveMode(mode: ThemeMode) {
  if (mode !== "system") {
    return mode;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeState, setThemeState] = useState<ThemePreference>(() => {
    if (typeof window === "undefined") {
      return defaultThemePreference;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return defaultThemePreference;
    }

    try {
      return JSON.parse(stored) as ThemePreference;
    } catch {
      return defaultThemePreference;
    }
  });

  const { mode, primaryColor } = themeState;

  useEffect(() => {
    const resolvedMode = resolveMode(mode);
    const root = document.documentElement;

    root.dataset.theme = resolvedMode;
    root.style.setProperty("--color-brand", primaryColor);

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        mode,
        primaryColor,
      }),
    );
  }, [mode, primaryColor]);

  const value = useMemo(
    () => ({
      mode,
      primaryColor,
      setMode: (nextMode: ThemeMode) =>
        setThemeState((current) => ({
          ...current,
          mode: nextMode,
        })),
      setPrimaryColor: (nextColor: string) =>
        setThemeState((current) => ({
          ...current,
          primaryColor: nextColor,
        })),
    }),
    [mode, primaryColor],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider.");
  }

  return context;
}

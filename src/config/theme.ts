import type { ThemeMode, ThemePreset } from "@/types/theme";

export const defaultThemeMode: ThemeMode = "system";

export const themePresets: ThemePreset[] = [
  { name: "Ocean", value: "#1d4ed8", accent: "#eff6ff" },
  { name: "Emerald", value: "#059669", accent: "#ecfdf5" },
  { name: "Sunset", value: "#ea580c", accent: "#fff7ed" },
  { name: "Rose", value: "#e11d48", accent: "#fff1f2" },
  { name: "Slate", value: "#334155", accent: "#f8fafc" },
];

export const defaultThemePreference = {
  mode: defaultThemeMode,
  primaryColor: themePresets[0].value,
};

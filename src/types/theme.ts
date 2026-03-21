export type ThemeMode = "light" | "dark" | "system";

export type ThemePreset = {
  name: string;
  value: string;
  accent: string;
};

export type ThemePreference = {
  mode: ThemeMode;
  primaryColor: string;
};

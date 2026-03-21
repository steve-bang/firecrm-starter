"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { themePresets } from "@/config/theme";
import { useThemeConfig } from "@/hooks/use-theme-config";
import type { ThemeMode } from "@/types/theme";

export function ThemeCustomizationPanel() {
  const { mode, primaryColor, setMode, setPrimaryColor } = useThemeConfig();

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <Card>
        <CardHeader
          title="Theme preferences"
          description="Persist these settings locally now, then move them to user or workspace settings later."
        />
        <div className="space-y-4">
          <Select
            label="Theme mode"
            value={mode}
            onChange={(event) => setMode(event.target.value as ThemeMode)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </Select>

          <div className="grid grid-cols-2 gap-3">
            {themePresets.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => setPrimaryColor(preset.value)}
                className={`rounded-3xl border p-4 text-left transition ${
                  primaryColor === preset.value
                    ? "border-[var(--color-brand)] ring-2 ring-[color:color-mix(in_srgb,var(--color-brand)_18%,white)]"
                    : "border-slate-200 dark:border-slate-800"
                }`}
              >
                <span
                  className="mb-3 block h-10 rounded-2xl"
                  style={{ backgroundColor: preset.value }}
                />
                <p className="font-medium text-slate-950 dark:text-white">{preset.name}</p>
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Starter preview"
          description="A compact white-label preview for dashboards, cards, and CTA surfaces."
        />
        <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-[var(--muted-background)] p-6 dark:border-slate-800">
          <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-950">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Branded CTA</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                  Onboard sales reps faster
                </h3>
              </div>
              <Button>Launch workflow</Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {["Conversions", "Response time", "Renewal health"].map((metric, index) => (
              <div
                key={metric}
                className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-950"
              >
                <p className="text-sm text-slate-500 dark:text-slate-400">{metric}</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">
                  {index === 0 ? "18.7%" : index === 1 ? "14m" : "94%"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export function Input({ label, hint, error, className, ...props }: InputProps) {
  return (
    <label className="flex w-full flex-col gap-2 text-sm">
      {label ? <span className="font-medium text-slate-700 dark:text-slate-200">{label}</span> : null}
      <input
        className={cn(
          "h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--color-brand)] focus:ring-4 focus:ring-[color:color-mix(in_srgb,var(--color-brand)_14%,white)] dark:border-slate-700 dark:bg-slate-950 dark:text-white",
          className,
        )}
        {...props}
      />
      {error ? (
        <span className="text-xs text-rose-600">{error}</span>
      ) : hint ? (
        <span className="text-xs text-slate-500 dark:text-slate-400">{hint}</span>
      ) : null}
    </label>
  );
}

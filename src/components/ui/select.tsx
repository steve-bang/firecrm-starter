import type { SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export function Select({ label, className, children, ...props }: SelectProps) {
  return (
    <label className="flex w-full flex-col gap-2 text-sm">
      {label ? <span className="font-medium text-slate-700 dark:text-slate-200">{label}</span> : null}
      <select
        className={cn(
          "h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-900 shadow-sm outline-none transition focus:border-[var(--color-brand)] dark:border-slate-700 dark:bg-slate-950 dark:text-white",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}

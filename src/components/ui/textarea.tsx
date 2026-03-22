import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function Textarea({ label, className, ...props }: TextareaProps) {
  return (
    <label className="flex w-full flex-col gap-2 text-sm">
      {label ? (
        <span className="font-medium text-slate-700 dark:text-slate-200">{label}</span>
      ) : null}
      <textarea
        className={cn(
          "min-h-28 rounded-[var(--radius-control)] border border-[var(--border-color)] bg-white px-3 py-3 text-slate-900 shadow-sm outline-none transition focus:border-[var(--color-brand)] focus:ring-4 focus:ring-[color:color-mix(in_srgb,var(--color-brand)_14%,white)] dark:bg-slate-950 dark:text-white",
          className,
        )}
        {...props}
      />
    </label>
  );
}

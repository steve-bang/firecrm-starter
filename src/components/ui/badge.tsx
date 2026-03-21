import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "positive" | "warning" | "danger";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        tone === "positive" &&
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
        tone === "warning" &&
          "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
        tone === "danger" &&
          "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300",
        tone === "neutral" &&
          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
      )}
    >
      {children}
    </span>
  );
}

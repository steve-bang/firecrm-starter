import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatusPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  code?: string;
  primaryAction: ReactNode;
  secondaryAction?: ReactNode;
  supportingContent?: ReactNode;
  className?: string;
};

export function StatusPage({
  eyebrow,
  title,
  description,
  code,
  primaryAction,
  secondaryAction,
  supportingContent,
  className,
}: StatusPageProps) {
  return (
    <main
      className={cn(
        "relative isolate overflow-hidden",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,rgba(29,78,216,0.18),transparent_58%)]"
      />

      <div className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-7xl items-center px-6 py-14 lg:px-8">
        <div className="grid w-full gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <section className="max-w-2xl self-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-brand)]">
              {eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {primaryAction}
              {secondaryAction}
            </div>
          </section>

          <Card className="relative overflow-hidden p-6 md:p-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(29,78,216,0.09),transparent)]"
            />

            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-[18px] bg-[var(--color-brand-soft)] text-[var(--color-brand)]">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
                  <path
                    d="M12 8V12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 16H12.01"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10.29 3.86L1.82 18C1.64 18.31 1.55 18.68 1.57 19.05C1.6 19.42 1.74 19.77 1.98 20.05C2.22 20.34 2.55 20.56 2.92 20.67C3.29 20.78 3.68 20.78 4.05 20.67H19.95C20.32 20.78 20.71 20.78 21.08 20.67C21.45 20.56 21.78 20.34 22.02 20.05C22.26 19.77 22.4 19.42 22.43 19.05C22.45 18.68 22.36 18.31 22.18 18L13.71 3.86C13.52 3.57 13.26 3.33 12.95 3.16C12.64 3 12.29 2.91 12 2.91C11.71 2.91 11.36 3 11.05 3.16C10.74 3.33 10.48 3.57 10.29 3.86Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted">Status details</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
                    {code ? `Reference ${code}` : "Something interrupted the request"}
                  </p>
                </div>
                {code ? (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-900 dark:text-slate-300">
                    {code}
                  </span>
                ) : null}
              </div>

              <div className="mt-5 space-y-3">
                <div className="surface-card-muted rounded-[20px] p-4">
                  <p className="text-sm font-medium text-slate-950 dark:text-white">
                    What you can do next
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Retry the action, return to a stable page, or use the support contact if the issue keeps happening.
                  </p>
                </div>

                {supportingContent ? supportingContent : null}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

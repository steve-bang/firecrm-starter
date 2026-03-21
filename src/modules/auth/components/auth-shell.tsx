import type { ReactNode } from "react";

import { appConfig } from "@/config/app";

export function AuthShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
      <div className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
            FireCRM Starter
          </p>
          <h1 className="mt-6 max-w-md text-4xl font-semibold leading-tight">
            Ship CRM SaaS products with a reusable foundation.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-slate-300">
            {appConfig.description}
          </p>
        </div>
        <div className="grid gap-4">
          {[
            "Next.js App Router and TypeScript by default",
            "Firebase Auth, Firestore, and Storage setup points",
            "Dashboard shell, notification UI, and staff management patterns",
          ].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12 lg:px-10">
        <div className="w-full max-w-md rounded-[2rem] border border-white/60 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-950/85">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {description}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

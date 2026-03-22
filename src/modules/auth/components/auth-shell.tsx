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
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f8_100%)] dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
      <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative hidden overflow-hidden p-10 text-white lg:flex lg:flex-col lg:justify-between">
          {/* Keep the premium gradient treatment isolated to the left brand panel. */}
          <div className="absolute inset-0 bg-[linear-gradient(160deg,#eef2ff_0%,#dbeafe_18%,#c7d2fe_42%,#e0f2fe_68%,#f8fafc_100%)] dark:bg-[linear-gradient(160deg,#0f172a_0%,#172554_24%,#1d4ed8_52%,#0f766e_78%,#020617_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.55),transparent_24%),radial-gradient(circle_at_72%_18%,rgba(56,189,248,0.24),transparent_22%),radial-gradient(circle_at_20%_78%,rgba(99,102,241,0.22),transparent_26%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_24%),radial-gradient(circle_at_72%_18%,rgba(56,189,248,0.18),transparent_22%),radial-gradient(circle_at_20%_78%,rgba(99,102,241,0.2),transparent_26%)]" />
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />

          <div className="relative">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700 dark:text-blue-200">
              FireCRM Starter
            </p>
            <h1 className="mt-6 max-w-md text-4xl font-semibold leading-tight text-slate-950 dark:text-white">
              Ship CRM SaaS products with a reusable foundation.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-600 dark:text-slate-300">
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
                className="rounded-3xl border border-white/50 bg-white/55 px-5 py-4 text-sm text-slate-700 shadow-[0_14px_40px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:shadow-none"
              >
                {item}
              </div>
            ))}
          </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-12 lg:px-10">
          <div className="w-full max-w-md rounded-[2rem] border border-white/60 bg-white/88 p-8 shadow-[0_28px_90px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/84">
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
    </div>
  );
}

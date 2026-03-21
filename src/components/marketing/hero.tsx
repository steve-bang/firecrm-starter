import Link from "next/link";

import { appConfig } from "@/config/app";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 py-20 lg:px-8 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.25),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.18),transparent_28%)]" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200">
            SaaS CRM Starter
          </span>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl dark:text-white">
            Build your next CRM SaaS with structure, polish, and room to scale.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            {appConfig.description} Clone it, wire your domain logic, and move straight
            into product delivery.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/auth/sign-up"
              className="rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:brightness-110"
            >
              Start building
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
            >
              Explore architecture
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Auth ready", "Email/password, Google, reset password, protected routes"],
              ["SaaS shell", "Sidebar, navbar, stats cards, notifications, theming"],
              ["Firebase-first", "Auth, Firestore, Storage wiring with clean services"],
              ["AI-friendly", "Module boundaries and docs built for Codex handoff"],
            ].map(([title, copy]) => (
              <div
                key={title}
                className="rounded-3xl border border-slate-200/80 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader } from "@/components/ui/card";
import { getDashboardStats, getRecentActivity } from "@/services/dashboard/dashboard.service";
import { formatRelativeTime } from "@/lib/utils";

const pipelineHighlights = [
  {
    label: "Qualified leads",
    value: "62",
    note: "This week",
  },
  {
    label: "Deals in proposal",
    value: "24",
    note: "Closing soon",
  },
  {
    label: "Avg. response time",
    value: "18m",
    note: "Support inbox",
  },
] as const;

const quickActions = [
  {
    href: "/dashboard/staff",
    label: "Review staff",
    description: "Check team availability and workload coverage.",
  },
  {
    href: "/dashboard/notification",
    label: "Open notifications",
    description: "Clear unread updates and recent workspace alerts.",
  },
  {
    href: "/dashboard/customization",
    label: "Adjust theme",
    description: "Update brand color and visual mode settings.",
  },
] as const;

const focusItems = [
  "Follow up on the newest inbound lead while intent is still high.",
  "Review tasks due today before they become overdue.",
  "Check team utilization if onboarding or support load increases.",
] as const;

const workspaceHealth = [
  ["Sales readiness", "Strong"],
  ["Support response", "Stable"],
  ["Team coverage", "Healthy"],
] as const;

export function DashboardOverview() {
  const stats = getDashboardStats();
  const activities = getRecentActivity();

  return (
    <div className="space-y-5">
      <PageHeader
        title="Dashboard Overview"
        description="Scan the most important CRM signals, understand what changed recently, and move into the next action with confidence."
        action={
          <Link
            href="/dashboard/staff"
            className="inline-flex h-11 items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-4 text-sm font-medium text-white transition hover:brightness-110"
          >
            Invite Staff
          </Link>
        }
      />

      <div className="grid gap-3.5 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-4.5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-muted">{stat.title}</p>
                <p className="mt-2.5 text-[1.9rem] font-semibold text-slate-950 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                  stat.tone === "positive"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                    : stat.tone === "warning"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">
              {stat.tone === "positive"
                ? "Healthy movement compared to the previous snapshot."
                : stat.tone === "warning"
                  ? "Worth reviewing before it creates workflow friction."
                  : "Stable and within the expected operating range."}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader
            title="Revenue pipeline snapshot"
            description="Starter metrics that help teams understand current business energy before they move deeper into the CRM."
            action={
              <Link
                href="/dashboard/notification"
                className="text-sm font-medium text-[var(--color-brand)] transition hover:opacity-80"
              >
                Review alerts
              </Link>
            }
          />

          <div className="grid gap-3 md:grid-cols-3">
            {pipelineHighlights.map((item) => (
              <div key={item.label} className="surface-card-muted p-4">
                <p className="text-sm text-muted">{item.label}</p>
                <p className="mt-2.5 text-[1.8rem] font-semibold text-slate-950 dark:text-white">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-muted">{item.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="surface-card-muted flex items-start gap-3 p-3.5 transition hover:bg-white"
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[var(--color-brand-soft)] text-[var(--color-brand)]">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
                    <path
                      d="M7 12H17"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 7L17 12L12 17"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-950 dark:text-white">
                    {action.label}
                  </p>
                  <p className="mt-1 text-sm text-muted">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Recent activity"
            description="Recent workspace changes help users regain context immediately after signing in."
          />
          <div className="space-y-2.5">
            {activities.map((item) => (
              <div key={item.id} className="surface-card-muted p-3.5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-slate-950 dark:text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-muted">{item.description}</p>
                  </div>
                  <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                    Update
                  </span>
                </div>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-subtle">
                  {formatRelativeTime(item.timestamp)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-3.5 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader
            title="What to focus on next"
            description="Keep the overview actionable by surfacing a small number of clear operational priorities."
          />
          <div className="grid gap-2.5">
            {focusItems.map((item, index) => (
              <div key={item} className="surface-card-muted flex items-start gap-3 p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white dark:bg-white dark:text-slate-900">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Workspace health"
            description="A compact reference block that keeps the homepage feeling operational instead of decorative."
          />
          <div className="space-y-4">
            {/* These rows intentionally stay simple so the overview remains easy to scan in under 10 seconds. */}
            {workspaceHealth.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 last:border-b-0 last:pb-0"
              >
                <p className="text-sm text-muted">{label}</p>
                <p className="text-sm font-semibold text-slate-950 dark:text-white">{value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

import { Card, CardHeader } from "@/components/ui/card";
import { getDashboardStats, getRecentActivity } from "@/services/dashboard/dashboard.service";
import { formatRelativeTime } from "@/lib/utils";

export function DashboardOverview() {
  const stats = getDashboardStats();
  const activities = getRecentActivity();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">{stat.title}</p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <p className="text-3xl font-semibold text-slate-950 dark:text-white">
                {stat.value}
              </p>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
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
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <CardHeader
            title="Revenue pipeline snapshot"
            description="Starter metrics and activity blocks you can replace with real CRM data."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Qualified leads", "62", "This week"],
              ["Deals in proposal", "24", "Closing soon"],
              ["Avg. response time", "18m", "Support inbox"],
            ].map(([label, value, note]) => (
              <div
                key={label}
                className="rounded-3xl border border-slate-200/80 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
                <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
                  {value}
                </p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{note}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Recent activity"
            description="Helpful examples for notification and audit-driven modules."
          />
          <div className="space-y-4">
            {activities.map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-200/80 p-4 dark:border-slate-800">
                <p className="font-medium text-slate-950 dark:text-white">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  {formatRelativeTime(item.timestamp)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

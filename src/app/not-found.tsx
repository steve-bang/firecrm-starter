import Link from "next/link";

import { StatusPage } from "@/components/feedback/status-page";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { appConfig } from "@/config/app";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <StatusPage
        eyebrow="Page not found"
        title="This page doesn&apos;t exist in your workspace."
        description="The link may be outdated, the route may have changed, or the page may never have existed. Use one of the safe paths below to get back on track quickly."
        code="404"
        primaryAction={
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-brand)] px-4 text-sm font-medium text-white transition hover:brightness-110"
          >
            Go to homepage
          </Link>
        }
        secondaryAction={
          <Link
            href="/dashboard"
            className="surface-card-muted inline-flex h-11 items-center justify-center rounded-[var(--radius-control)] px-4 text-sm font-medium text-slate-900 transition hover:bg-white dark:text-white"
          >
            Open dashboard
          </Link>
        }
        supportingContent={
          <div className="surface-card-muted rounded-[20px] p-4">
            <p className="text-sm font-medium text-slate-950 dark:text-white">
              Need help?
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              If you expected this route to exist, contact{" "}
              <a
                href={`mailto:${appConfig.supportEmail}`}
                className="font-medium text-[var(--color-brand)] transition hover:opacity-80"
              >
                {appConfig.supportEmail}
              </a>
              .
            </p>
          </div>
        }
      />
      <SiteFooter />
    </div>
  );
}

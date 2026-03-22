"use client";

import Link from "next/link";
import { useEffect } from "react";

import { StatusPage } from "@/components/feedback/status-page";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/config/app";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <StatusPage
        eyebrow="Unexpected error"
        title="Something broke before the page could finish loading."
        description="This is usually temporary. Retry the request first, and if the issue continues, return to a stable page or contact support with the reference below."
        code={error.digest ?? "Error"}
        primaryAction={<Button onClick={reset}>Try again</Button>}
        secondaryAction={
          <Link
            href="/dashboard"
            className="surface-card-muted inline-flex h-11 items-center justify-center rounded-[var(--radius-control)] px-4 text-sm font-medium text-slate-900 transition hover:bg-white dark:text-white"
          >
            Back to dashboard
          </Link>
        }
        supportingContent={
          <div className="surface-card-muted rounded-[20px] p-4">
            <p className="text-sm font-medium text-slate-950 dark:text-white">
              Still seeing this issue?
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Send the reference code to{" "}
              <a
                href={`mailto:${appConfig.supportEmail}`}
                className="font-medium text-[var(--color-brand)] transition hover:opacity-80"
              >
                {appConfig.supportEmail}
              </a>{" "}
              so the team can trace it faster.
            </p>
          </div>
        }
      />
      <SiteFooter />
    </div>
  );
}

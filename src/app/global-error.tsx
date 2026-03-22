"use client";

import Link from "next/link";
import { useEffect } from "react";

import { StatusPage } from "@/components/feedback/status-page";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/config/app";

export default function GlobalError({
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
    <html lang="en">
      <body className="min-h-screen bg-[var(--page-background)] font-sans text-slate-950 antialiased dark:text-white">
        <StatusPage
          eyebrow="Application error"
          title="The app hit a problem before the full interface could render."
          description="Retry the request first. If this keeps happening, head back to the homepage and use the reference code when reporting the issue."
          code={error.digest ?? "App error"}
          primaryAction={<Button onClick={reset}>Reload experience</Button>}
          secondaryAction={
            <Link
              href="/"
              className="surface-card-muted inline-flex h-11 items-center justify-center rounded-[var(--radius-control)] px-4 text-sm font-medium text-slate-900 transition hover:bg-white dark:text-white"
            >
              Go to homepage
            </Link>
          }
          supportingContent={
            <div className="surface-card-muted rounded-[20px] p-4">
              <p className="text-sm font-medium text-slate-950 dark:text-white">
                Support contact
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Share the reference code with{" "}
                <a
                  href={`mailto:${appConfig.supportEmail}`}
                  className="font-medium text-[var(--color-brand)] transition hover:opacity-80"
                >
                  {appConfig.supportEmail}
                </a>{" "}
                if the app does not recover after retrying.
              </p>
            </div>
          }
        />
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { getNotifications, getUnreadNotificationCount } from "@/services/notifications/notification.service";
import { formatRelativeTime } from "@/lib/utils";

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const notifications = useMemo(() => getNotifications().slice(0, 3), []);
  const unreadCount = getUnreadNotificationCount();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900 dark:hover:text-white"
        aria-label="Open notifications"
        aria-expanded={open}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
          <path
            d="M8 17H16L15.2 15.93C14.75 15.33 14.5 14.6 14.5 13.85V10.5C14.5 9.12 13.38 8 12 8C10.62 8 9.5 9.12 9.5 10.5V13.85C9.5 14.6 9.25 15.33 8.8 15.93L8 17Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M10.5 19C10.83 19.61 11.38 20 12 20C12.62 20 13.17 19.61 13.5 19"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path d="M12 5V6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        {unreadCount ? (
          <span className="absolute right-1.5 top-1.5 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold leading-none text-white shadow-sm">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 top-14 z-30 w-96 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-slate-950 dark:text-white">
              Recent notifications
            </h3>
            <Link className="text-sm text-[var(--color-brand)]" href="/dashboard/notification">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="rounded-2xl border border-slate-200/80 p-3 dark:border-slate-800"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-950 dark:text-white">
                      {notification.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {notification.message}
                    </p>
                  </div>
                  {!notification.isRead ? <Badge tone="danger">New</Badge> : null}
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">
                  {formatRelativeTime(notification.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

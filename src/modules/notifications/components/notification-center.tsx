"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatRelativeTime } from "@/lib/utils";
import { getNotifications } from "@/services/notifications/notification.service";
import type { NotificationItem } from "@/types/notification";

type NotificationFilter = "all" | "unread" | "read";

const filterOptions: Array<{ label: string; value: NotificationFilter }> = [
  { label: "All", value: "all" },
  { label: "Unread", value: "unread" },
  { label: "Read", value: "read" },
];

const toneByType: Record<NotificationItem["type"], "neutral" | "warning" | "positive" | "danger"> = {
  activity: "positive",
  reminder: "warning",
  security: "danger",
  system: "neutral",
};

const labelByType: Record<NotificationItem["type"], string> = {
  activity: "Activity",
  reminder: "Reminder",
  security: "Security",
  system: "System",
};

export function NotificationCenter() {
  const [readIds, setReadIds] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("all");
  const notifications = useMemo(() => getNotifications(), []);

  const notificationsWithState = useMemo(
    () =>
      notifications.map((notification) => ({
        ...notification,
        isRead: notification.isRead || readIds.includes(notification.id),
      })),
    [notifications, readIds],
  );

  const unreadCount = notificationsWithState.filter((item) => !item.isRead).length;
  const readCount = notificationsWithState.length - unreadCount;

  const filteredNotifications = notificationsWithState.filter((notification) => {
    if (activeFilter === "unread") {
      return !notification.isRead;
    }

    if (activeFilter === "read") {
      return notification.isRead;
    }

    return true;
  });

  const unreadNotifications = filteredNotifications.filter((notification) => !notification.isRead);
  const readNotifications = filteredNotifications.filter((notification) => notification.isRead);

  function markAsRead(id: string) {
    setReadIds((current) => [...new Set([...current, id])]);
  }

  function markAllAsRead() {
    setReadIds(notifications.map((notification) => notification.id));
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Notifications"
        description="Keep the workspace tidy with a lightweight inbox for reminders, updates, and system events."
        action={
          unreadCount ? (
            <Button variant="secondary" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          ) : null
        }
      />

      <div className="grid gap-3 md:grid-cols-3">
        <NotificationSummaryCard
          label="Total notifications"
          value={notificationsWithState.length}
          helper="Latest workspace updates and reminders."
        />
        <NotificationSummaryCard
          label="Unread"
          value={unreadCount}
          helper="Items that still need attention."
          tone="danger"
        />
        <NotificationSummaryCard
          label="Read"
          value={readCount}
          helper="Updates already acknowledged."
          tone="positive"
        />
      </div>

      <Card className="space-y-4">
        <div className="flex flex-col gap-3 border-b border-[var(--border-color)] pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-950 dark:text-white">
              Inbox
            </h2>
            <p className="mt-1 text-sm text-muted">
              Review updates in one place and clear items as you go.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {filterOptions.map((filterOption) => {
              const isActive = activeFilter === filterOption.value;

              return (
                <button
                  key={filterOption.value}
                  type="button"
                  onClick={() => setActiveFilter(filterOption.value)}
                  className={[
                    "rounded-full px-3 py-1.5 text-sm font-medium transition",
                    isActive
                      ? "bg-[var(--color-brand)] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800",
                  ].join(" ")}
                >
                  {filterOption.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-5">
          {unreadNotifications.length ? (
            <NotificationGroup
              title="Unread"
              description="Most recent items that still need attention."
              items={unreadNotifications}
              onMarkAsRead={markAsRead}
            />
          ) : null}

          {readNotifications.length ? (
            <NotificationGroup
              title="Earlier"
              description="Previously acknowledged updates."
              items={readNotifications}
              onMarkAsRead={markAsRead}
            />
          ) : null}

          {!filteredNotifications.length ? (
            <div className="rounded-[22px] border border-dashed border-[var(--border-color-strong)] bg-[var(--card-background-muted)] px-5 py-8 text-center">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                No notifications in this view
              </p>
              <p className="mt-2 text-sm text-muted">
                Try another filter or wire this page to Firestore events when the backend is ready.
              </p>
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}

function NotificationSummaryCard({
  label,
  value,
  helper,
  tone = "neutral",
}: {
  label: string;
  value: number;
  helper: string;
  tone?: "neutral" | "positive" | "danger";
}) {
  const accentClassName =
    tone === "danger"
      ? "bg-rose-500/10 text-rose-600 dark:text-rose-300"
      : tone === "positive"
        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
        : "bg-slate-900/5 text-slate-600 dark:bg-white/10 dark:text-slate-200";

  return (
    <Card className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted">{label}</p>
        <span className={["rounded-full px-2 py-1 text-xs font-semibold", accentClassName].join(" ")}>
          {value}
        </span>
      </div>
      <p className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
        {value}
      </p>
      <p className="text-sm text-muted">{helper}</p>
    </Card>
  );
}

function NotificationGroup({
  title,
  description,
  items,
  onMarkAsRead,
}: {
  title: string;
  description: string;
  items: Array<NotificationItem & { isRead: boolean }>;
  onMarkAsRead: (id: string) => void;
}) {
  return (
    <section className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>

      <div className="space-y-3">
        {items.map((notification) => (
          <NotificationRow
            key={notification.id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
          />
        ))}
      </div>
    </section>
  );
}

function NotificationRow({
  notification,
  onMarkAsRead,
}: {
  notification: NotificationItem & { isRead: boolean };
  onMarkAsRead: (id: string) => void;
}) {
  return (
    <div
      className={[
        "rounded-[22px] border px-4 py-4 transition",
        notification.isRead
          ? "border-[var(--border-color)] bg-[var(--card-background-muted)]"
          : "border-[var(--border-color-strong)] bg-white shadow-sm dark:bg-slate-950",
      ].join(" ")}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={toneByType[notification.type]}>{labelByType[notification.type]}</Badge>
            {notification.isRead ? <Badge>Read</Badge> : <Badge tone="danger">Unread</Badge>}
          </div>

          <div>
            <p className="font-semibold text-slate-950 dark:text-white">
              {notification.title}
            </p>
            <p className="mt-1 text-sm leading-6 text-muted">
              {notification.message}
            </p>
          </div>

          {/* Keep metadata and destination compact so the row stays easy to scan. */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
            <span>{formatRelativeTime(notification.createdAt)}</span>
            {notification.link ? (
              <Link
                href={notification.link}
                className="text-[var(--color-brand)] transition hover:opacity-80"
              >
                Open
              </Link>
            ) : null}
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onMarkAsRead(notification.id)}
          disabled={notification.isRead}
          className="md:self-center"
        >
          {notification.isRead ? "Marked" : "Mark as read"}
        </Button>
      </div>
    </div>
  );
}

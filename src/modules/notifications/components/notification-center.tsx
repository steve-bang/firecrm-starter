"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getNotifications } from "@/services/notifications/notification.service";
import { formatRelativeTime } from "@/lib/utils";

export function NotificationCenter() {
  const [readIds, setReadIds] = useState<string[]>([]);
  const notifications = useMemo(() => getNotifications(), []);

  function markAsRead(id: string) {
    setReadIds((current) => [...new Set([...current, id])]);
  }

  return (
    <Card>
      <CardHeader
        title="Notification center"
        description="Mock notification patterns designed to be replaced with Firestore-backed events."
      />
      <div className="space-y-4">
        {notifications.map((notification) => {
          const isRead = notification.isRead || readIds.includes(notification.id);

          return (
            <div
              key={notification.id}
              className="rounded-3xl border border-slate-200/80 p-5 dark:border-slate-800"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-950 dark:text-white">
                      {notification.title}
                    </p>
                    {isRead ? <Badge>Read</Badge> : <Badge tone="danger">Unread</Badge>}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {notification.message}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">
                    {formatRelativeTime(notification.createdAt)}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => markAsRead(notification.id)}
                  disabled={isRead}
                >
                  {isRead ? "Marked" : "Mark as read"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

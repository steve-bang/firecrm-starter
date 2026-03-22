import type { Metadata } from "next";

import { NotificationCenter } from "@/modules/notifications/components/notification-center";

export const metadata: Metadata = {
  title: "Notifications",
  description:
    "Track unread updates, reminders, and workspace alerts from the FireCRM Starter notification center.",
};

export default function DashboardNotificationPage() {
  return <NotificationCenter />;
}

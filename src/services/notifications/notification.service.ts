import type { NotificationItem } from "@/types/notification";

const notifications: NotificationItem[] = [
  {
    id: "notification-1",
    title: "Quarterly pipeline review",
    message: "Sales leadership wants a refreshed dashboard snapshot by 3 PM.",
    type: "reminder",
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    isRead: false,
    link: "/dashboard",
  },
  {
    id: "notification-2",
    title: "Security policy updated",
    message: "Google sign-in is available and can now be configured for your workspace.",
    type: "security",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    isRead: false,
    link: "/dashboard/customization",
  },
  {
    id: "notification-3",
    title: "New staff member imported",
    message: "Support team mock data has been seeded for rapid prototyping.",
    type: "activity",
    createdAt: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
    isRead: true,
    link: "/dashboard/staff",
  },
];

export function getNotifications() {
  return notifications;
}

export function getUnreadNotificationCount() {
  return notifications.filter((item) => !item.isRead).length;
}

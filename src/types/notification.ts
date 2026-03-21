export type NotificationType = "system" | "reminder" | "activity" | "security";

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string;
  isRead: boolean;
  link?: string;
};

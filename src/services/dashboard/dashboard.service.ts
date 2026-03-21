import { appConfig } from "@/config/app";
import type { ActivityItem, DashboardStat } from "@/types/dashboard";

export function getDashboardStats(): DashboardStat[] {
  return appConfig.dashboardStats;
}

export function getRecentActivity(): ActivityItem[] {
  return [
    {
      id: "activity-1",
      title: "New inbound lead added",
      description: "Morgan Lee submitted a demo request from the pricing page.",
      timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    },
    {
      id: "activity-2",
      title: "Theme updated",
      description: "Primary brand color was updated for the workspace dashboard.",
      timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    },
    {
      id: "activity-3",
      title: "Profile synced",
      description: "A user profile was updated and stored in Firestore.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
  ];
}

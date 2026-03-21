export type DashboardStat = {
  title: string;
  value: string;
  change: string;
  tone: "positive" | "warning" | "neutral";
};

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
};

import type { Metadata } from "next";

import { DashboardOverview } from "@/modules/dashboard/components/dashboard-overview";

export const metadata: Metadata = {
  title: "Dashboard Overview",
  description:
    "Review the latest CRM signals, workspace health, and next actions from the FireCRM Starter dashboard.",
};

export default function DashboardPage() {
  return <DashboardOverview />;
}

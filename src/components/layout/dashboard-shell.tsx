import type { ReactNode } from "react";

import { DashboardNavbar } from "@/components/layout/dashboard-navbar";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import type { UserProfile } from "@/types/user";

export function DashboardShell({
  children,
  user,
}: {
  children: ReactNode;
  user: UserProfile;
}) {
  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_22%),linear-gradient(180deg,var(--shell-background)_0%,var(--page-background)_100%)]">
      <DashboardSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardNavbar user={user} />
        {/* Main workspace padding is centralized here so every dashboard page starts from the same rhythm. */}
        <main className="flex-1 px-4 py-5 lg:px-6 lg:py-5">{children}</main>
      </div>
    </div>
  );
}

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
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.1),transparent_26%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
      <DashboardSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardNavbar user={user} />
        <main className="flex-1 px-5 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

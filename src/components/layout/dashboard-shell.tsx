"use client";

import type { ReactNode } from "react";
import { useState } from "react";

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
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_22%),linear-gradient(180deg,var(--shell-background)_0%,var(--page-background)_100%)]">
      <DashboardSidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col xl:pl-0">
        <DashboardNavbar user={user} onOpenSidebar={() => setMobileSidebarOpen(true)} />
        {/* Main workspace padding is centralized here so every dashboard page starts from the same rhythm. */}
        <main className="flex-1 px-4 py-5 lg:px-6 lg:py-5">{children}</main>
      </div>
    </div>
  );
}

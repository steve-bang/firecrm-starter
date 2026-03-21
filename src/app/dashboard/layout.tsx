import type { ReactNode } from "react";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireSession } from "@/lib/auth";
import type { UserProfile } from "@/types/user";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireSession();

  const user: UserProfile = {
    id: session.user.id,
    name: session.user.name ?? "CRM User",
    email: session.user.email ?? "user@example.com",
    image: session.user.image ?? null,
    role: "owner",
    provider: session.user.provider,
    workspaceId: "demo-workspace",
  };

  return <DashboardShell user={user}>{children}</DashboardShell>;
}

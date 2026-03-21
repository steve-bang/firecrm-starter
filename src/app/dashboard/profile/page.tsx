import { requireSession } from "@/lib/auth";
import { ProfileSettingsForm } from "@/modules/profile/components/profile-settings-form";
import type { UserProfile } from "@/types/user";

export default async function DashboardProfilePage() {
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

  return <ProfileSettingsForm user={user} />;
}

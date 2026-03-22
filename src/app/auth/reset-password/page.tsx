import type { Metadata } from "next";

import { AuthShell } from "@/modules/auth/components/auth-shell";
import { ResetPasswordForm } from "@/modules/auth/components/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Set a new password for your FireCRM Starter account and return to the dashboard securely.",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ oobCode?: string }>;
}) {
  const params = await searchParams;

  return (
    <AuthShell
      title="Choose a new password"
      description="Complete the reset flow with the code from your Firebase Auth email."
    >
      <ResetPasswordForm code={params.oobCode ?? ""} />
    </AuthShell>
  );
}

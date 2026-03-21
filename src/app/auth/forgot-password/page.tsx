import { AuthShell } from "@/modules/auth/components/auth-shell";
import { ForgotPasswordForm } from "@/modules/auth/components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset password"
      description="Send a reset email using Firebase Auth and return to the dashboard quickly."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}

import { AuthShell } from "@/modules/auth/components/auth-shell";
import { SignInForm } from "@/modules/auth/components/sign-in-form";

export default function SignInPage() {
  return (
    <AuthShell
      title="Welcome back"
      description="Sign in with email/password or Google to access the CRM starter dashboard."
    >
      <SignInForm />
    </AuthShell>
  );
}

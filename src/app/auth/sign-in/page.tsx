import type { Metadata } from "next";

import { AuthShell } from "@/modules/auth/components/auth-shell";
import { SignInForm } from "@/modules/auth/components/sign-in-form";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to FireCRM Starter with email/password or Google to access your CRM workspace.",
};

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

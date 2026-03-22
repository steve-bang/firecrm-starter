import type { Metadata } from "next";

import { AuthShell } from "@/modules/auth/components/auth-shell";
import { SignUpForm } from "@/modules/auth/components/sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create your FireCRM Starter account and start building a modern CRM workspace faster.",
};

export default function SignUpPage() {
  return (
    <AuthShell
      title="Create your workspace"
      description="Start with the CRM starter foundation and customize it into your product."
    >
      <SignUpForm />
    </AuthShell>
  );
}

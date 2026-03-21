"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/services/firebase/auth-client.service";

export function ResetPasswordForm({ code }: { code: string }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setStatus(null);

    try {
      await resetPassword(code, password);
      setStatus("Your password has been updated. You can sign in now.");
    } catch (resetError) {
      setError(
        resetError instanceof Error
          ? resetError.message
          : "Unable to reset password.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="New password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <Input
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
        {!code ? (
          <p className="text-sm text-amber-600">
            Missing reset code. Open this page from your Firebase reset email.
          </p>
        ) : null}
        {status ? <p className="text-sm text-emerald-600">{status}</p> : null}
        {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        <Button className="w-full" type="submit" disabled={isSubmitting || !code}>
          {isSubmitting ? "Updating..." : "Update password"}
        </Button>
      </form>

      <p className="text-sm text-slate-500 dark:text-slate-400">
        Back to{" "}
        <Link className="font-medium text-[var(--color-brand)]" href="/auth/sign-in">
          sign in
        </Link>
      </p>
    </div>
  );
}

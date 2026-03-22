"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { appConfig } from "@/config/app";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState(appConfig.demoCredentials.email);
  const [password, setPassword] = useState(appConfig.demoCredentials.password);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCredentialsSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (result?.error) {
      setError("Invalid credentials. Check your Firebase Auth setup or use demo mode.");
      setIsSubmitting(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleCredentialsSignIn}>
        <Input
          label="Email address"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <Button
        className="w-full"
        variant="secondary"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        type="button"
      >
        Continue with Google
      </Button>

      <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
        <p>
          Don&apos;t have an account?{" "}
          <Link className="font-medium text-[var(--color-brand)]" href="/auth/sign-up">
            Create one
          </Link>
        </p>
        <p>
          Forgot your password?{" "}
          <Link
            className="font-medium text-[var(--color-brand)]"
            href="/auth/forgot-password"
          >
            Reset it
          </Link>
        </p>
      </div>
    </div>
  );
}

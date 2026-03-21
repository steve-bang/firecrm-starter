"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerWithEmail } from "@/services/firebase/auth-client.service";

export function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await registerWithEmail({ name, email, password });

      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/dashboard",
      });

      router.push("/dashboard");
      router.refresh();
    } catch (signUpError) {
      setError(
        signUpError instanceof Error
          ? signUpError.message
          : "Unable to create account.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <Input
          label="Work email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          hint="Use at least 8 characters for production projects."
          required
        />
        {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{" "}
        <Link className="font-medium text-[var(--color-brand)]" href="/auth/sign-in">
          Sign in
        </Link>
      </p>
    </div>
  );
}

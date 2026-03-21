import "server-only";

import { appConfig } from "@/config/app";
import { serverEnv } from "@/lib/env.server";
import type { AuthenticatedUser } from "@/types/auth";

type VerifyCredentialsParams = {
  email: string;
  password: string;
};

export async function verifyCredentialsWithFirebase({
  email,
  password,
}: VerifyCredentialsParams): Promise<AuthenticatedUser | null> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!serverEnv.firebaseWebApiKey) {
    if (
      normalizedEmail === appConfig.demoCredentials.email &&
      password === appConfig.demoCredentials.password
    ) {
      return {
        id: "demo-user",
        email: normalizedEmail,
        name: "Demo Operator",
        image: null,
        provider: "credentials",
      };
    }

    return null;
  }

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${serverEnv.firebaseWebApiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: normalizedEmail,
        password,
        returnSecureToken: true,
      }),
    },
  );

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    localId: string;
    email: string;
    displayName?: string;
    photoUrl?: string;
  };

  return {
    id: payload.localId,
    email: payload.email,
    name: payload.displayName || payload.email.split("@")[0],
    image: payload.photoUrl ?? null,
    provider: "credentials",
  };
}

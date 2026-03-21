import "server-only";

import { adminDb } from "@/services/firebase/admin";

type SyncUserParams = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  provider: string;
};

export async function syncUserProfileFromAuth(params: SyncUserParams) {
  if (!adminDb || !params.id || !params.email) {
    return;
  }

  await adminDb.collection("users").doc(params.id).set(
    {
      email: params.email,
      displayName: params.name || params.email.split("@")[0],
      photoURL: params.image ?? null,
      provider: params.provider,
      role: "owner",
      status: "active",
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    { merge: true },
  );
}

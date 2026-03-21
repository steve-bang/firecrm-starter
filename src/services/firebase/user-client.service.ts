"use client";

import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { firebaseDb } from "@/services/firebase/client";
import type { UserProfile } from "@/types/user";

export async function saveUserProfile(profile: UserProfile) {
  if (!firebaseDb) {
    return {
      ...profile,
      updatedAt: new Date().toISOString(),
    };
  }

  await setDoc(
    doc(firebaseDb, "users", profile.id),
    {
      displayName: profile.name,
      email: profile.email,
      photoURL: profile.image ?? null,
      role: profile.role,
      phone: profile.phone ?? "",
      jobTitle: profile.jobTitle ?? "",
      location: profile.location ?? "",
      bio: profile.bio ?? "",
      workspaceId: profile.workspaceId ?? null,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );

  return profile;
}

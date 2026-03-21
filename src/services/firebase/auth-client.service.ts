"use client";

import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";

import { firebaseAuth } from "@/services/firebase/client";

export async function registerWithEmail(params: {
  email: string;
  password: string;
  name: string;
}) {
  if (!firebaseAuth) {
    throw new Error("Firebase Auth is not configured. Add env values to enable sign-up.");
  }

  const credential = await createUserWithEmailAndPassword(
    firebaseAuth,
    params.email,
    params.password,
  );

  if (params.name) {
    await updateProfile(credential.user, {
      displayName: params.name,
    });
  }

  return credential.user;
}

export async function sendResetPasswordEmail(email: string) {
  if (!firebaseAuth) {
    throw new Error(
      "Firebase Auth is not configured. Add env values to enable password reset.",
    );
  }

  return sendPasswordResetEmail(firebaseAuth, email);
}

export async function resetPassword(code: string, newPassword: string) {
  if (!firebaseAuth) {
    throw new Error(
      "Firebase Auth is not configured. Add env values to enable password reset.",
    );
  }

  return confirmPasswordReset(firebaseAuth, code, newPassword);
}

export async function signOutFirebaseClient() {
  if (firebaseAuth) {
    await signOut(firebaseAuth);
  }
}

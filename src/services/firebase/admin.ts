import "server-only";

import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

import { hasFirebaseAdminConfig, serverEnv } from "@/lib/env.server";

let firebaseAdminApp: ReturnType<typeof initializeApp> | null = null;

if (hasFirebaseAdminConfig()) {
  firebaseAdminApp = getApps().length
    ? getApp()
    : initializeApp({
        credential: cert({
          projectId: serverEnv.firebaseProjectId,
          clientEmail: serverEnv.firebaseClientEmail,
          privateKey: serverEnv.firebasePrivateKey.replace(/\\n/g, "\n"),
        }),
        storageBucket: serverEnv.firebaseStorageBucket,
      });
}

export const adminDb = firebaseAdminApp ? getFirestore(firebaseAdminApp) : null;
export const adminStorage = firebaseAdminApp
  ? getStorage(firebaseAdminApp)
  : null;

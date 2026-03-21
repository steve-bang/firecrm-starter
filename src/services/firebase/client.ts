import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { clientEnv, hasFirebaseClientConfig } from "@/lib/env.client";

const firebaseConfig = {
  apiKey: clientEnv.firebaseApiKey,
  authDomain: clientEnv.firebaseAuthDomain,
  projectId: clientEnv.firebaseProjectId,
  storageBucket: clientEnv.firebaseStorageBucket,
  messagingSenderId: clientEnv.firebaseMessagingSenderId,
  appId: clientEnv.firebaseAppId,
};

let firebaseApp: FirebaseApp | null = null;

if (hasFirebaseClientConfig()) {
  firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export { firebaseApp };
export const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : null;
export const firebaseDb = firebaseApp ? getFirestore(firebaseApp) : null;
export const firebaseStorage = firebaseApp ? getStorage(firebaseApp) : null;

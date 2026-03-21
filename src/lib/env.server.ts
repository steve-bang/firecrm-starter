import "server-only";

export const serverEnv = {
  nextAuthSecret: process.env.NEXTAUTH_SECRET ?? "",
  nextAuthUrl: process.env.NEXTAUTH_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "",
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  firebaseProjectId:
    process.env.FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL ?? "",
  firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY ?? "",
  firebaseStorageBucket:
    process.env.FIREBASE_STORAGE_BUCKET ??
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ??
    "",
  firebaseWebApiKey:
    process.env.FIREBASE_WEB_API_KEY ?? process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
};

export function hasGoogleProviderConfig() {
  return Boolean(serverEnv.googleClientId && serverEnv.googleClientSecret);
}

export function hasFirebaseAdminConfig() {
  return Boolean(
    serverEnv.firebaseProjectId &&
      serverEnv.firebaseClientEmail &&
      serverEnv.firebasePrivateKey,
  );
}

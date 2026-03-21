# Firebase Setup

## Firebase Auth

1. Create a Firebase project
2. Enable Email/Password in Authentication
3. Optionally enable Google provider
4. Create a Firebase Web App and copy:
   - API key
   - Auth domain
   - Project ID
   - Storage bucket
   - Messaging sender ID
   - App ID

## Firestore

Create collections aligned with `API_SPEC.md`:

- `users`
- `workspaces`
- `workspace_members`
- `staff`
- `notifications`
- `theme_preferences`

## Storage

Enable Firebase Storage and use it for avatar uploads:

- Path example: `users/<userId>/avatar/<fileName>`

## Admin SDK

Create a service account and add these values to `.env.local`:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_STORAGE_BUCKET`

Remember to keep line breaks in `FIREBASE_PRIVATE_KEY` escaped as `\n`.

## Google Sign-In

If you want Google sign-in through NextAuth:

1. Create OAuth credentials in Google Cloud
2. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
3. Add the correct callback URL:

```text
http://localhost:3000/api/auth/callback/google
```

## Important Notes

- Credentials sign-in uses Firebase Identity Toolkit via the Web API key
- If Firebase is not configured, the starter still supports a local demo login
- Firestore user sync happens in `src/services/firebase/user-admin.service.ts`

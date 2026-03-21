# Getting Started

## Install

```bash
npm install
cp .env.example .env.local
```

## Configure

Populate `.env.local` with:

- NextAuth secret and URL
- Firebase client app credentials
- Firebase service account credentials
- Optional Google OAuth credentials

## Run

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Starter Workflow

1. Review `AGENTS.md`, `ARCHITECTURE.md`, and `CONVENTIONS.md`
2. Set up Firebase Auth and Firestore
3. Sign in with demo mode or real Firebase credentials
4. Replace mock services in `src/services/staff` and `src/services/notifications`
5. Add your CRM-specific modules under `src/modules`

## Useful Files

- `src/lib/auth-options.ts`
- `src/services/firebase/client.ts`
- `src/services/firebase/admin.ts`
- `src/app/dashboard/layout.tsx`
- `middleware.ts`

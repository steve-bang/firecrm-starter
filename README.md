# FireCRM Starter

FireCRM Starter is a production-shaped SaaS CRM starter template built with Next.js App Router, TypeScript, TailwindCSS, Firebase, and NextAuth.

It is designed for developers who want to clone a clean CRM foundation and move directly into product-specific feature work.

## Included Features

- Public marketing pages: `/`, `/about`
- Authentication: email/password, Google, forgot/reset password
- Protected dashboard with middleware
- Profile management with Firebase Storage upload helper
- Theme customization with light, dark, and primary color presets
- Notification center with mock UI
- Staff directory with mock data, search, pagination, and modal example
- Feature-based architecture built for AI-assisted development

## Tech Stack

- Next.js App Router
- TypeScript
- TailwindCSS
- Firebase Auth, Firestore, Storage
- NextAuth

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Fill in Firebase and NextAuth credentials in `.env.local`

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Demo Mode

If Firebase Web API credentials are not configured, credentials sign-in falls back to demo mode:

- Email: `demo@firecrm.dev`
- Password: `FireCRM123!`

This is useful for exploring the dashboard shell and starter flows before connecting a real Firebase project.

## Environment Variables

See [.env.example](/Users/mrsteve.bang/Documents/_projects/FireCRM-Starter/.env.example) for the full list.

Required in most real deployments:

- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

Optional:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```

## Project Structure

```text
src/
  app/                 # Routes, layouts, auth handler
  components/          # Shared UI, layout, marketing, providers
  modules/             # Feature-based business modules
  services/            # Firebase, auth, mock service integrations
  hooks/               # Reusable client logic
  config/              # App, theme, navigation config
  lib/                 # Auth helpers, env parsing, utilities
  types/               # Shared domain types
docs/                  # Setup and usage guides
```

## Core Routes

- `/`
- `/about`
- `/auth/sign-in`
- `/auth/sign-up`
- `/auth/forgot-password`
- `/auth/reset-password`
- `/dashboard`
- `/dashboard/profile`
- `/dashboard/customization`
- `/dashboard/notification`
- `/dashboard/staff`

## Firebase Setup

1. Create a Firebase project
2. Enable Email/Password in Firebase Auth
3. Create a Web App and copy client credentials
4. Create a service account for Firestore and Storage server access
5. Add the values to `.env.local`
6. Optionally configure Google provider in both Firebase and Google Cloud console

Detailed steps:

- [docs/getting-started.md](/Users/mrsteve.bang/Documents/_projects/FireCRM-Starter/docs/getting-started.md)
- [docs/firebase-setup.md](/Users/mrsteve.bang/Documents/_projects/FireCRM-Starter/docs/firebase-setup.md)
- [docs/customization.md](/Users/mrsteve.bang/Documents/_projects/FireCRM-Starter/docs/customization.md)

## Architecture Notes

- UI-only building blocks live in `src/components`
- Domain logic lives in `src/modules`
- Firebase and auth integrations live in `src/services`
- Dashboard routes are protected by [middleware.ts](/Users/mrsteve.bang/Documents/_projects/FireCRM-Starter/middleware.ts)
- NextAuth configuration lives in [src/lib/auth-options.ts](/Users/mrsteve.bang/Documents/_projects/FireCRM-Starter/src/lib/auth-options.ts)

## Documentation

AI and human contributors should start with:

- [AGENTS.md](/Users/mrsteve.bang/Documents/_projects/FireCRM-Starter/AGENTS.md)
- [CLAUDE.md](/Users/mrsteve.bang/Documents/_projects/FireCRM-Starter/CLAUDE.md)
- [PRODUCT_SPEC.md](/Users/mrsteve.bang/Documents/_projects/FireCRM-Starter/PRODUCT_SPEC.md)
- [ARCHITECTURE.md](/Users/mrsteve.bang/Documents/_projects/FireCRM-Starter/ARCHITECTURE.md)
- [CONVENTIONS.md](/Users/mrsteve.bang/Documents/_projects/FireCRM-Starter/CONVENTIONS.md)
- [API_SPEC.md](/Users/mrsteve.bang/Documents/_projects/FireCRM-Starter/API_SPEC.md)

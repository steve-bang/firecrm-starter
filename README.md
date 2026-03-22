# FireCRM Starter

FireCRM Starter is a production-shaped SaaS CRM starter template built with Next.js App Router, TypeScript, TailwindCSS, Firebase, and NextAuth.

It is designed for developers who want to clone a clean CRM foundation and move directly into product-specific feature work.

## Included Features

- Public marketing pages: `/`, `/about`
- Authentication: email/password, Google, forgot/reset password
- Protected dashboard with middleware
- Responsive dashboard shell with:
  - fixed desktop sidebar
  - collapsible desktop navigation
  - tablet/mobile drawer navigation
  - sticky navbar with notification and user menus
- Profile management with Firebase Storage upload helper
- Theme customization with light, dark, and primary color presets
- Notification center with mock inbox UI, summary cards, and unread/read filters
- Staff directory with mock data, search, pagination, and modal example
- Shared design-token driven UI primitives and page header pattern
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

See [.env.example](./.env.example) for the full list.

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

- [docs/getting-started.md](./docs/getting-started.md)
- [docs/firebase-setup.md](./docs/firebase-setup.md)
- [docs/customization.md](./docs/customization.md)

## Architecture Notes

- UI-only building blocks live in `src/components`
- Domain logic lives in `src/modules`
- Firebase and auth integrations live in `src/services`
- Shared shell primitives live in:
  - [dashboard-shell.tsx](./src/components/layout/dashboard-shell.tsx)
  - [dashboard-sidebar.tsx](./src/components/layout/dashboard-sidebar.tsx)
  - [dashboard-navbar.tsx](./src/components/layout/dashboard-navbar.tsx)
  - [page-header.tsx](./src/components/layout/page-header.tsx)
- Shared visual tokens and surface rules live in [globals.css](./src/app/globals.css)
- Dashboard routes are protected by [middleware.ts](./middleware.ts)
- NextAuth configuration lives in [src/lib/auth-options.ts](./src/lib/auth-options.ts)

## Documentation

AI and human contributors should start with:

- [AGENTS.md](./AGENTS.md)
- [CLAUDE.md](./CLAUDE.md)
- [PRODUCT_SPEC.md](./PRODUCT_SPEC.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [CONVENTIONS.md](./CONVENTIONS.md)
- [API_SPEC.md](./API_SPEC.md)

# CLAUDE.md

## Project Brief

FireCRM Starter is a SaaS CRM starter template built for developers who want to clone a production-ready foundation and ship CRM products quickly.

Primary stack:

- Next.js App Router
- TypeScript
- TailwindCSS
- Firebase Auth, Firestore, Storage
- NextAuth

Core features:

- Authentication with email/password and Google
- Protected dashboard system
- Responsive dashboard shell with desktop collapse and tablet/mobile drawer navigation
- User profile management
- Staff management with mock-first data
- Notification UI with mock-first data
- Theme customization with light, dark, and primary color support

## Source Of Truth

Read these files before making structural changes:

- `AGENTS.md`
- `PRODUCT_SPEC.md`
- `ARCHITECTURE.md`
- `CONVENTIONS.md`
- `API_SPEC.md`
- `DESIGN.md`

`AGENTS.md` is the main operating guide for AI agents in this repository.

## Working Rules

- Follow feature-based architecture
- Keep page files thin
- Put UI-only pieces in `components`
- Put business logic in `modules`
- Put Firebase and API access in `services`
- Put reusable client logic in `hooks`
- Keep the system ready for future multi-tenant support

## Expected Route Scope

- Public: `/`, `/about`
- Auth: `/auth/sign-in`, `/auth/sign-up`, `/auth/forgot-password`, `/auth/reset-password`
- Dashboard: `/dashboard`, `/dashboard/profile`, `/dashboard/customization`, `/dashboard/notification`, `/dashboard/staff`

## Implementation Constraints

- Prefer server components by default
- Avoid direct Firebase calls inside React UI components
- Use stable TypeScript types for all business entities
- Keep mock data shapes aligned with future Firestore documents
- Use `workspaceId`, audit fields, and explicit status fields for scalable data modeling

## Command Reference

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Agent Guidance

- Reuse existing patterns before introducing new ones
- Keep changes small, coherent, and easy for the next agent to extend
- When adding new features, update docs if architecture, routes, or schema change
- If a requirement is unclear, preserve the documented architecture intent over shortcut implementations

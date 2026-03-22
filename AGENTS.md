# AGENTS.md

## Purpose

This repository is a SaaS CRM starter template built for rapid product delivery with AI-assisted development. AI agents working in this codebase must optimize for:

- Fast delivery of reusable CRM features
- Clear separation of UI, domain logic, and infrastructure
- Predictable patterns that scale to multi-tenant SaaS
- Low-friction handoff between human developers and coding agents

This document is the primary operating guide for Codex and other AI coding agents.

## Product Intent

- Product type: CRM SaaS Starter Template
- Primary users: developers and product teams building custom CRM SaaS products
- Main goal: provide a cloneable, extensible base with auth, dashboard, profile, staff, notifications, and theme customization
- Default architecture target: single-tenant-ready foundation designed to evolve into multi-tenant SaaS

## Tech Stack

- Next.js App Router
- TypeScript
- TailwindCSS
- Firebase Auth, Firestore, Storage
- NextAuth

## Expected Route Map

- Public: `/`, `/about`
- Auth: `/auth/sign-in`, `/auth/sign-up`, `/auth/forgot-password`, `/auth/reset-password`
- Dashboard: `/dashboard`, `/dashboard/profile`, `/dashboard/customization`, `/dashboard/notification`, `/dashboard/staff`

## Architecture Rules

### Core layering

- `components/`: presentational UI only
- `modules/`: feature-oriented business logic and orchestration
- `services/`: Firebase and external API access
- `hooks/`: reusable client-side stateful logic
- `lib/`: shared framework helpers, config loaders, auth utilities, constants
- `types/`: shared domain and API types

### Dependency direction

- `components` may depend on `hooks`, `types`, and simple UI utilities
- `modules` may depend on `services`, `hooks`, `lib`, `types`, and `components`
- `services` must not depend on React components
- `hooks` must not embed Firebase queries that belong in `services`
- App routes should compose modules, not contain business logic directly

### Multi-tenant readiness

- New data models should include `workspaceId` unless explicitly global
- Authorization must be evaluated with future tenant scoping in mind
- Avoid hardcoding single-organization assumptions in naming, schemas, and UI copy

## Target Folder Structure

```text
src/
  app/
    (public)/
    auth/
    dashboard/
    api/
  components/
    ui/
    layout/
    feedback/
  modules/
    auth/
    dashboard/
    profile/
    customization/
    notifications/
    staff/
  services/
    firebase/
    auth/
  hooks/
  lib/
  types/
  config/
```

## Coding Rules

- Use TypeScript everywhere
- Prefer server components by default; add client boundaries only when required
- Keep page files thin; move logic into modules and services
- Use strict typing for all service inputs and outputs
- Validate external and form inputs with a schema layer such as Zod when added
- Prefer small reusable functions over deeply nested page-level logic
- Do not mix Firebase SDK calls directly into UI components
- Mock data must be isolated so it can later be replaced by Firestore without UI rewrites

## UI Rules

- Tailwind utility usage should remain readable and composable
- Shared primitives belong in `src/components/ui`
- Shared dashboard shell primitives belong in `src/components/layout`
- Feature-specific view components belong inside the owning module
- Theme customization must be token-based, not ad hoc class overrides
- Support light and dark mode without duplicating component logic
- Reuse `PageHeader` for dashboard pages instead of ad hoc title/action layouts
- Keep page actions in the right-side header action region, not in the navbar
- Desktop sidebar is fixed-height and collapsible; tablet/mobile navigation uses a drawer pattern
- If a sidebar footer action must stay visible, keep it outside the scrollable nav region

## Auth Rules

- NextAuth is the session boundary for the app
- Firebase Auth is the identity provider backing email/password and Google sign-in
- Never expose privileged Firebase operations directly to the client
- Session-aware UI should rely on a shared auth abstraction, not duplicated checks

## Data Rules

- Firestore writes should go through service functions
- Every entity must define ownership and audit fields
- Use consistent timestamps: `createdAt`, `updatedAt`
- Soft deletion is preferred for business entities likely to be restored
- Notifications and staff records may start as mock-backed but must preserve stable types

## Agent Workflow

### Before coding

1. Read this file and the relevant architecture docs
2. Inspect the target module and nearby patterns
3. Confirm whether the change belongs to `components`, `modules`, `services`, or `hooks`
4. Prefer extending an existing pattern over inventing a new one

### While coding

- Make the smallest coherent change that solves the task fully
- Keep write scopes narrow
- Preserve backwards compatibility unless the task explicitly requests a break
- Add comments only where intent is not obvious from code

### After coding

- Run the smallest meaningful validation available
- Check for unused code and inconsistent names
- Ensure imports, file location, and feature ownership align with conventions

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

Recommended future commands as the starter grows:

```bash
npm run typecheck
npm run test
```

## Best Practices For Codex

- Read only the files needed for the task
- Prefer editing existing modules over duplicating logic
- When adding a feature, update documentation if it changes architecture or schema
- Keep outputs deterministic and easy for later agents to extend
- If a requirement conflicts with the current structure, preserve the architecture intent and note the tradeoff

## Common Implementation Patterns

### New dashboard page

1. Add the route under `src/app/dashboard/...`
2. Add or extend the owning feature module under `src/modules/...`
3. Compose the page with `DashboardShell`, `PageHeader`, and shared surface primitives
4. Move data access to `src/services/...`
5. Add shared UI primitives only if multiple modules need them

### Updating dashboard layout

1. Check `src/app/globals.css` for existing shell and surface tokens before adding new values
2. Keep `DashboardSidebar`, `DashboardNavbar`, and `DashboardShell` behavior aligned across desktop and mobile
3. Preserve the current responsive contract:
   - desktop sidebar visible and optionally collapsed
   - tablet/mobile sidebar opened from navbar
   - sidebar overlay closes on backdrop, close button, or route change
4. Prefer extending the shared page-header pattern over page-specific header CSS

### New Firestore entity

1. Define the TypeScript type
2. Add service read/write functions
3. Add mapper or serializer if needed
4. Keep tenant, audit, and status fields consistent

### Replacing mock data with real data

1. Preserve the same module-facing interface
2. Swap data access in `services`
3. Keep UI components unaware of the backend switch

## Constraints

- Do not add heavy dependencies without clear reuse value
- Do not collapse feature boundaries for short-term convenience
- Do not place business rules inside page files
- Do not couple UI components to Firebase document shapes unless the type is intentionally shared

## Definition Of Done

A task is complete when:

- The implementation follows the documented architecture
- Naming and placement are consistent
- Validation has been run when feasible
- The result is understandable for the next human or AI maintainer

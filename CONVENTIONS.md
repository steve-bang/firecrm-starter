# CONVENTIONS.md

## Purpose

This document defines naming, organization, and implementation conventions for FireCRM Starter. Follow these rules to keep the codebase predictable for both human developers and AI agents.

## Naming Conventions

### Files and folders

- Use lowercase kebab-case for folders and route segments
- Use kebab-case for component files: `staff-table.tsx`
- Use camelCase for utility and hook files when already conventional: `useCurrentUser.ts` is acceptable only if the codebase adopts it consistently; otherwise prefer `use-current-user.ts`
- Use `page.tsx`, `layout.tsx`, `loading.tsx`, and `route.ts` only for Next.js route conventions

### Components

- React component names: PascalCase
- Shared UI component names should be generic and reusable
- Feature-specific component names should include the domain context when useful

Examples:

- `DashboardShell`
- `ProfileForm`
- `NotificationList`
- `StaffTable`

### Hooks

- Hook names must start with `use`
- Prefer explicit names over vague ones

Examples:

- `useCurrentUser`
- `useThemeConfig`
- `useNotificationFilters`

### Services

- Service files should end with `.service.ts`
- Service functions should describe their business action clearly

Examples:

- `auth.service.ts`
- `notification.service.ts`
- `getUserProfile`
- `updateThemePreference`

### Types

- Use PascalCase for interfaces and type aliases
- Suffix document types only when it adds clarity

Examples:

- `UserProfile`
- `StaffMember`
- `NotificationItem`
- `WorkspaceThemeSettings`

## Coding Standards

- Use TypeScript strictness and explicit types for public interfaces
- Prefer `type` or `interface` consistently based on team preference; avoid mixing without reason
- Keep functions focused on one responsibility
- Avoid deep nesting when an early return improves readability
- Prefer object parameters for functions that may grow over time
- Do not use `any` unless there is no practical alternative

## Component Rules

- Components in `src/components` should stay presentational
- Feature components that need business context should live in their module
- Large components should be broken into smaller view units before they become hard to scan
- Props should reflect UI intent, not raw database structure where possible

## Module Rules

- Each feature owns its business logic
- Keep feature-specific schemas, hooks, and components together
- Cross-feature reuse should be promoted to shared locations only after a real reuse pattern appears

## Service Rules

- Services are the only place for Firebase query and mutation details
- Return normalized data shapes
- Hide SDK-specific implementation details from callers
- Validate data at the service boundary or just before it

## File Organization Rules

### Shared code belongs in:

- `src/components/ui` for reusable visual primitives
- `src/hooks` for cross-feature hooks
- `src/lib` for utilities and framework adapters
- `src/types` for stable shared contracts

### Feature code belongs in:

- `src/modules/<feature>`

Typical feature contents:

```text
src/modules/staff/
  components/
  hooks/
  schemas/
  staff.constants.ts
  staff.types.ts
  staff.utils.ts
```

## Styling Conventions

- Use TailwindCSS utilities consistently
- Prefer design tokens and theme variables over repeated hardcoded values
- Keep class lists readable; extract patterns when repeated
- Avoid inline styles unless dynamic values cannot be expressed cleanly otherwise

## State Management Conventions

- Prefer local state first
- Use hooks for reusable client-side logic
- Introduce global state only when multiple distant parts of the app need synchronized state
- Server data shape and UI state should remain separate concerns

## API And Data Conventions

- Firestore collections should use plural lowercase names
- Timestamps should use `createdAt` and `updatedAt`
- Ownership fields should be explicit: `userId`, `workspaceId`
- Status fields should use well-defined string unions

## Consistency Rules

- If a pattern already exists, follow it unless there is a strong reason to improve it
- If a new pattern is introduced, document it
- Keep mock data shapes aligned with production data contracts
- Do not rename files, entities, or routes casually once they become part of the public project structure

## Best Practices

- Build routes from modules, not from ad hoc page logic
- Prefer pure helpers for transformation logic
- Keep commits and changesets scoped to one intention
- Update docs when adding a new feature area, schema, or architectural rule

## Anti-Patterns

- Putting Firebase calls inside React UI components
- Storing unrelated helpers in generic `utils.ts` files without ownership
- Mixing feature logic from multiple domains in a single module
- Returning raw Firestore snapshots into the UI layer

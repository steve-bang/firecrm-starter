# ARCHITECTURE.md

## Overview

FireCRM Starter uses a feature-based architecture on top of Next.js App Router. The system is designed to keep presentation, business logic, and infrastructure separate so the codebase remains maintainable as the starter evolves into a real SaaS product.

The architecture prioritizes:

- clear ownership by feature
- low coupling between UI and data access
- compatibility with AI-assisted development
- easy transition from mock implementations to Firebase-backed production features
- future multi-tenant support

## Architectural Principles

- Organize by feature first, then by technical role
- Keep routes thin and modules expressive
- Centralize Firebase access behind services
- Treat hooks as reusable orchestration, not as a dumping ground
- Prefer stable interfaces so backends can change without rewriting UI

## Proposed Folder Structure

```text
src/
  app/
    (public)/
      page.tsx
      about/page.tsx
    auth/
      sign-in/page.tsx
      sign-up/page.tsx
      forgot-password/page.tsx
      reset-password/page.tsx
    dashboard/
      layout.tsx
      page.tsx
      profile/page.tsx
      customization/page.tsx
      notification/page.tsx
      staff/page.tsx
    api/
      auth/
      webhooks/
  components/
    ui/
    layout/
    navigation/
    feedback/
  modules/
    auth/
      components/
      hooks/
      schemas/
      types.ts
    dashboard/
    profile/
    customization/
    notifications/
    staff/
  services/
    firebase/
      client.ts
      admin.ts
      auth.service.ts
      user.service.ts
      notification.service.ts
      staff.service.ts
    next-auth/
      options.ts
  hooks/
    use-theme-config.ts
    use-current-user.ts
  lib/
    auth/
    env/
    utils/
    constants/
  types/
    auth.ts
    user.ts
    staff.ts
    notification.ts
  config/
    navigation.ts
    theme.ts
```

## Layer Responsibilities

### `app`

- Declares routes, layouts, metadata, and route-level composition
- Should not contain significant business rules
- Uses modules to assemble each screen

### `components`

- Shared UI primitives and layout elements
- Stateless or minimally stateful presentation logic
- No direct Firebase access

### `modules`

- Feature ownership boundary
- Contains use-case logic, feature-specific components, hooks, and schemas
- Bridges app routes and services

### `services`

- External side effects and infrastructure
- Firebase Auth, Firestore, Storage, and future APIs
- Responsible for persistence details, query structure, and serialization boundaries

### `hooks`

- Shared client-side behavior reused across features
- Good for session-aware UI state, theme state, or generic reusable flows
- Avoid placing feature-specific server data access here when it belongs in a module or service

### `lib`

- Shared utilities, framework adapters, auth helpers, env parsing, and constants
- Avoid feature-specific logic here

### `types`

- Stable domain contracts reused across services and modules
- Keep Firestore document types and UI view models distinct where necessary

## Data Flow

### Page request flow

1. App route receives the request
2. Route verifies session or delegates to shared auth guard
3. Route composes the relevant feature module
4. Module calls services or server actions
5. Service communicates with Firebase
6. Normalized data returns to the module
7. Module passes view-ready props into components

### Client interaction flow

1. User interacts with a UI component
2. Feature hook or module handler validates input
3. Service executes mutation or query
4. Result is normalized and reflected back to UI
5. UI updates optimistically or after confirmation depending on the use case

## Authentication Architecture

- NextAuth manages session lifecycle and protected routing
- Firebase Auth provides identity providers for email/password and Google
- Auth modules expose feature-facing actions such as sign-in, sign-up, sign-out, and password reset
- Profile and workspace-aware data fetches should derive identity from the session, not duplicated client state

## Theming Architecture

- Theme mode and color preferences should be represented as tokens
- The UI consumes theme tokens instead of hardcoded brand values
- Preferences can start as local or per-user settings and later move to per-workspace settings

## Mock-To-Real Data Strategy

The starter intentionally includes features like staff and notifications with mock-first behavior. To keep this scalable:

- expose typed service interfaces from day one
- keep modules unaware of whether data is mock or Firebase-backed
- preserve IDs and shape consistency between mock and real implementations

## Multi-Tenant Design Path

The initial template may operate with a single workspace assumption in the UI, but the underlying design should support future multi-tenancy.

### Guidelines

- Most business entities should include `workspaceId`
- Authorization checks should evaluate both `userId` and `workspaceId`
- Global configuration should be separated from workspace-scoped configuration
- Avoid route names or service APIs that assume a single company forever

## Key Design Decisions

### Why feature-based modules

- CRM products grow by workflow area
- Module ownership is easier for humans and AI agents
- Related UI, schemas, hooks, and domain logic stay together

### Why services isolate Firebase

- Firebase query shapes should not leak into the whole app
- Backend changes are easier when infrastructure is centralized
- Security review is simpler when writes are routed through known boundaries

### Why App Router

- Strong fit for route layouts and protected dashboard shells
- Good server component defaults
- Better structure for mixed server and client rendering

### Why typed mock services early

- Enables parallel UI work before backend completion
- Reduces later refactor scope
- Makes AI-generated code safer and more replaceable

## Risks And Mitigations

- Risk: business logic drifting into pages
  Mitigation: keep pages as composition shells and move logic into modules

- Risk: inconsistent Firestore schema across features
  Mitigation: maintain shared schema conventions and service-level validation

- Risk: mock and real data diverging
  Mitigation: define stable feature contracts before wiring persistence

- Risk: future multi-tenant retrofit becoming expensive
  Mitigation: introduce `workspaceId` and ownership fields early

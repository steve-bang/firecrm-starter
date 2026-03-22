# Customization Guide

## Theme System

Theme mode and primary color are managed by:

- `src/app/globals.css`
- `src/components/providers/theme-provider.tsx`
- `src/config/theme.ts`
- `src/hooks/use-theme-config.ts`

To add more color presets, update `src/config/theme.ts`.
To adjust shell or surface behavior, prefer updating shared tokens in `src/app/globals.css` before changing page-local classes.

## Adding New Dashboard Modules

1. Create a new route in `src/app/dashboard`
2. Create a feature module in `src/modules/<feature>`
3. Reuse `src/components/layout/page-header.tsx` for the page header
4. Add any Firebase integration in `src/services`
5. Update `src/config/navigation.ts`

## Replacing Mock Data

Mock services exist in:

- `src/services/staff/staff.service.ts`
- `src/services/notifications/notification.service.ts`
- `src/services/dashboard/dashboard.service.ts`

Keep the same return types when switching to Firestore-backed queries.

## Branding

Update:

- `src/config/app.ts`
- `src/config/theme.ts`
- `src/app/globals.css`
- marketing copy in `src/components/marketing`

## Dashboard Shell

The authenticated app shell is shared across all dashboard routes:

- `src/components/layout/dashboard-shell.tsx`
- `src/components/layout/dashboard-sidebar.tsx`
- `src/components/layout/dashboard-navbar.tsx`
- `src/components/layout/page-header.tsx`

Current behavior:

- desktop sidebar: visible, fixed-height, collapsible
- tablet/mobile sidebar: drawer opened from the navbar
- navbar: sticky, lightweight, notification-first
- page headers: two-region layout with content on the left and actions on the right

## Auth Extension

Current auth setup supports:

- credentials via Firebase email/password
- Google via NextAuth provider

To extend roles or workspace onboarding:

1. Augment session data in `src/lib/auth-options.ts`
2. Extend Firestore user/workspace creation in `src/services/firebase/user-admin.service.ts`
3. Add onboarding modules under `src/modules`

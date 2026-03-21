# Customization Guide

## Theme System

Theme mode and primary color are managed by:

- `src/components/providers/theme-provider.tsx`
- `src/config/theme.ts`
- `src/hooks/use-theme-config.ts`

To add more color presets, update `src/config/theme.ts`.

## Adding New Dashboard Modules

1. Create a new route in `src/app/dashboard`
2. Create a feature module in `src/modules/<feature>`
3. Add any Firebase integration in `src/services`
4. Update `src/config/navigation.ts`

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
- marketing copy in `src/components/marketing`

## Auth Extension

Current auth setup supports:

- credentials via Firebase email/password
- Google via NextAuth provider

To extend roles or workspace onboarding:

1. Augment session data in `src/lib/auth-options.ts`
2. Extend Firestore user/workspace creation in `src/services/firebase/user-admin.service.ts`
3. Add onboarding modules under `src/modules`

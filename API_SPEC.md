# API_SPEC.md

## Purpose

This document defines the initial Firebase data model for FireCRM Starter. It is written to support current starter features while leaving room for future multi-tenant SaaS expansion.

## Design Principles

- Prefer workspace-scoped business entities
- Keep user identity and profile data separate when useful
- Include audit fields consistently
- Preserve stable document shapes for AI-assisted development
- Make mock-backed features align with future Firestore structure

## Collection Overview

```text
users
workspaces
workspace_members
staff
notifications
theme_preferences
```

## Collection Specs

## `users`

Stores the canonical app user profile linked to Firebase Auth.

### Fields

- `id`: string, document ID, normally the Firebase Auth UID
- `email`: string
- `displayName`: string
- `photoURL`: string | null
- `provider`: `"password" | "google"`
- `defaultWorkspaceId`: string | null
- `status`: `"active" | "invited" | "disabled"`
- `createdAt`: timestamp
- `updatedAt`: timestamp
- `lastLoginAt`: timestamp | null

### Example

```json
{
  "id": "uid_123",
  "email": "alex@example.com",
  "displayName": "Alex Tran",
  "photoURL": null,
  "provider": "google",
  "defaultWorkspaceId": "ws_001",
  "status": "active",
  "createdAt": "2026-03-21T10:00:00.000Z",
  "updatedAt": "2026-03-21T10:00:00.000Z",
  "lastLoginAt": "2026-03-21T12:15:00.000Z"
}
```

## `workspaces`

Represents the tenant boundary for future SaaS expansion.

### Fields

- `id`: string, document ID
- `name`: string
- `slug`: string
- `ownerUserId`: string
- `plan`: `"free" | "starter" | "pro"`
- `status`: `"active" | "trial" | "suspended"`
- `primaryColor`: string
- `themeMode`: `"light" | "dark" | "system"`
- `createdAt`: timestamp
- `updatedAt`: timestamp

### Example

```json
{
  "id": "ws_001",
  "name": "FireCRM Demo",
  "slug": "firecrm-demo",
  "ownerUserId": "uid_123",
  "plan": "starter",
  "status": "active",
  "primaryColor": "#2563eb",
  "themeMode": "system",
  "createdAt": "2026-03-21T10:00:00.000Z",
  "updatedAt": "2026-03-21T10:00:00.000Z"
}
```

## `workspace_members`

Maps users to workspaces and roles.

### Fields

- `id`: string, document ID
- `workspaceId`: string
- `userId`: string
- `role`: `"owner" | "admin" | "manager" | "staff"`
- `status`: `"active" | "invited" | "disabled"`
- `joinedAt`: timestamp | null
- `createdAt`: timestamp
- `updatedAt`: timestamp

### Example

```json
{
  "id": "wm_001",
  "workspaceId": "ws_001",
  "userId": "uid_123",
  "role": "owner",
  "status": "active",
  "joinedAt": "2026-03-21T10:05:00.000Z",
  "createdAt": "2026-03-21T10:00:00.000Z",
  "updatedAt": "2026-03-21T10:05:00.000Z"
}
```

## `staff`

Stores staff directory data for the CRM. This may begin with mock data, but the Firestore shape should remain consistent.

### Fields

- `id`: string, document ID
- `workspaceId`: string
- `fullName`: string
- `email`: string
- `phone`: string | null
- `jobTitle`: string
- `department`: string | null
- `avatarURL`: string | null
- `status`: `"active" | "inactive" | "on_leave"`
- `source`: `"mock" | "firebase"`
- `createdByUserId`: string
- `createdAt`: timestamp
- `updatedAt`: timestamp

### Example

```json
{
  "id": "staff_001",
  "workspaceId": "ws_001",
  "fullName": "Linh Nguyen",
  "email": "linh@example.com",
  "phone": "+84-000-000-000",
  "jobTitle": "Support Manager",
  "department": "Support",
  "avatarURL": null,
  "status": "active",
  "source": "mock",
  "createdByUserId": "uid_123",
  "createdAt": "2026-03-21T10:00:00.000Z",
  "updatedAt": "2026-03-21T10:00:00.000Z"
}
```

## `notifications`

Stores in-app notifications for a user within a workspace.

### Fields

- `id`: string, document ID
- `workspaceId`: string
- `userId`: string
- `type`: `"system" | "reminder" | "activity" | "security"`
- `title`: string
- `message`: string
- `link`: string | null
- `isRead`: boolean
- `readAt`: timestamp | null
- `source`: `"mock" | "firebase"`
- `createdAt`: timestamp
- `updatedAt`: timestamp

### Example

```json
{
  "id": "notif_001",
  "workspaceId": "ws_001",
  "userId": "uid_123",
  "type": "activity",
  "title": "New team member added",
  "message": "Linh Nguyen was added to Support.",
  "link": "/dashboard/staff",
  "isRead": false,
  "readAt": null,
  "source": "mock",
  "createdAt": "2026-03-21T10:20:00.000Z",
  "updatedAt": "2026-03-21T10:20:00.000Z"
}
```

## `theme_preferences`

Stores user-level or workspace-level theme settings depending on the chosen persistence strategy.

### Fields

- `id`: string, document ID
- `workspaceId`: string | null
- `userId`: string | null
- `themeMode`: `"light" | "dark" | "system"`
- `primaryColor`: string
- `createdAt`: timestamp
- `updatedAt`: timestamp

### Example

```json
{
  "id": "theme_001",
  "workspaceId": "ws_001",
  "userId": "uid_123",
  "themeMode": "dark",
  "primaryColor": "#0f766e",
  "createdAt": "2026-03-21T10:00:00.000Z",
  "updatedAt": "2026-03-21T10:30:00.000Z"
}
```

## Relationships

- `users.id` maps to Firebase Auth UID
- `workspaces.ownerUserId` references `users.id`
- `workspace_members.userId` references `users.id`
- `workspace_members.workspaceId` references `workspaces.id`
- `staff.workspaceId` references `workspaces.id`
- `notifications.userId` references `users.id`
- `notifications.workspaceId` references `workspaces.id`
- `theme_preferences.userId` references `users.id` when persisted per user
- `theme_preferences.workspaceId` references `workspaces.id` when persisted per workspace

## Data Consistency Rules

- All workspace-scoped business entities must include `workspaceId`
- All mutable entities must include `createdAt` and `updatedAt`
- Status fields must use explicit string unions, not free-form text
- IDs should be stable and never repurposed
- Mock records should use the same fields as production records
- `email` should be normalized to lowercase for identity-related collections
- User-facing theme values should be validated before persistence
- Notification reads must update both `isRead` and `readAt`

## Suggested Firestore Index Considerations

- `workspace_members` by `workspaceId + userId`
- `staff` by `workspaceId + status`
- `notifications` by `userId + isRead + createdAt`
- `notifications` by `workspaceId + userId + createdAt`

## Security Model Guidance

- Users may read and update only their own user profile unless elevated by role
- Workspace data access should be limited to active members of that workspace
- Only owners and admins should manage membership and staff mutations
- Notifications should be readable only by their target user
- Theme preferences should follow the visibility of their ownership scope

## Implementation Notes

- Use service-layer mappers to translate Firestore documents into app domain types
- Keep Firestore document types separate from UI-specific view models when fields diverge
- When adding new collections, apply the same ownership, timestamp, and status conventions

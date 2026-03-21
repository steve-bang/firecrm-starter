# PRODUCT_SPEC.md

## Product Overview

FireCRM Starter is a SaaS CRM starter template for developers who want to launch CRM-style products quickly without rebuilding the same foundation on every project.

It provides the baseline product surface, architecture, and UI patterns required for common internal and customer-facing CRM workflows.

## Target Users

- Indie developers building niche CRM products
- Startups validating SaaS ideas quickly
- Agencies delivering white-label admin and CRM systems
- Product teams that need a reusable dashboard starter with modern auth and theming

## Problems Solved

- Repeated setup cost for auth, dashboard, user settings, and navigation
- Inconsistent project architecture across SaaS builds
- Slow time-to-first-feature when starting from a blank Next.js app
- Difficulty coordinating human and AI contributors without strong project conventions
- Lack of a CRM-oriented starter that is already shaped for SaaS growth

## Product Goals

- Shorten time from repository clone to usable CRM product
- Establish a scalable architecture for future modules
- Support AI-assisted implementation without ambiguity
- Provide a polished baseline experience for authentication, dashboarding, and user settings
- Remain flexible enough for future domain customization

## Non-Goals

- Full enterprise CRM coverage on day one
- Deep workflow automation engine
- Billing and subscription logic in the initial version
- Real-time collaboration beyond standard dashboard interactions

## Core Features

### Authentication

- Email/password sign-in and sign-up
- Google sign-in
- Forgot password and reset password flows
- Session persistence and route protection

### Dashboard System

- Protected dashboard entry point
- Shared app shell with sidebar, header, and account access
- Scalable information cards and module navigation

### User Profile Management

- View and update personal profile information
- Manage avatar and basic account preferences
- Prepare the foundation for role and workspace context

### Staff Management

- List staff members using mock data initially
- View roles, status, and contact information
- Preserve structure so mock data can later be replaced by Firestore

### Notification System

- Notifications UI in the dashboard
- Mock notification feed and status states
- Future-ready design for in-app and email notifications

### Theme Customization

- Light and dark theme support
- Primary color customization
- Token-based theming to support white-label SaaS scenarios

## Route Inventory

### Public

- `/`: landing page for product value and CTA
- `/about`: product and template overview

### Auth

- `/auth/sign-in`
- `/auth/sign-up`
- `/auth/forgot-password`
- `/auth/reset-password`

### Dashboard

- `/dashboard`
- `/dashboard/profile`
- `/dashboard/customization`
- `/dashboard/notification`
- `/dashboard/staff`

## User Flows

### New user onboarding

1. User lands on `/`
2. User chooses sign-up
3. User creates an account with email/password or Google
4. User is authenticated and redirected to `/dashboard`
5. User optionally completes profile details

### Returning user sign-in

1. User visits `/auth/sign-in`
2. User authenticates
3. App restores session and opens `/dashboard`
4. User continues with CRM workflows

### Password recovery

1. User opens `/auth/forgot-password`
2. User submits email
3. System sends reset instructions
4. User completes `/auth/reset-password`
5. User signs back in

### Profile update

1. User navigates to `/dashboard/profile`
2. User updates profile information
3. Changes are saved and reflected across the dashboard

### Theme customization

1. User navigates to `/dashboard/customization`
2. User changes theme mode and primary color
3. Preferences are applied immediately and can later persist per user or workspace

### Staff management

1. User opens `/dashboard/staff`
2. User views team members from mock data
3. User filters or reviews staff states
4. Future versions replace mock data with persistent data without changing the user flow

### Notification review

1. User opens `/dashboard/notification`
2. User sees unread and historical notifications
3. User marks notifications as read
4. Future versions sync with stored notification events

## Business Value

- Reduces engineering setup time for every new CRM SaaS initiative
- Creates consistency across products and teams
- Lowers onboarding friction for developers joining the project
- Improves reuse of CRM UI and auth foundations
- Enables AI agents to contribute safely using stable architectural expectations

## Success Criteria

- Developers can clone the repository and start feature work immediately
- Core routes and flows are understandable without reverse-engineering
- New features can be added without restructuring the app
- Mock-backed features can evolve to real data with minimal UI churn
- The starter remains usable as a foundation for multiple CRM variants

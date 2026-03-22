# DESIGN.md — FireCRM Starter

> **FireCRM Starter** is a production-shaped SaaS CRM starter template built with Next.js App Router, TypeScript, TailwindCSS, Firebase, and NextAuth. It is designed for developers who want to clone a clean CRM foundation and move directly into product-specific feature work.

This document defines the UI/UX design direction for every surface in the product. It is written as a practical implementation guide for designers, developers, and AI coding agents.

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Design System Foundations](#2-design-system-foundations)
3. [Authentication](#3-authentication)
4. [Dashboard Shell](#4-dashboard-shell)
5. [Dashboard Overview](#5-dashboard-overview)
6. [Staff Management](#6-staff-management)
7. [Profile Page](#7-profile-page)
8. [Notifications Page](#8-notifications-page)
9. [Component Reference](#9-component-reference)
10. [Accessibility Standards](#10-accessibility-standards)
11. [Responsive Strategy](#11-responsive-strategy)
12. [Implementation Roadmap](#12-implementation-roadmap)

---

## 1. Design Philosophy

### Core Stance

FireCRM Starter should feel like a real product, not a demo. Every screen should be immediately usable by a developer's first client without embarrassment.

The design voice is:

- **Calm over clever** — clarity wins every time
- **Structural over decorative** — use layout and spacing to create hierarchy, not ornament
- **Confident over cautious** — make deliberate choices and commit to them
- **Operational over marketing** — the product serves people doing work, not people being impressed

### What This Is Not

FireCRM Starter is not a landing page in disguise. It is not an admin template with a CRM sticker on it. It should not look like every other open-source dashboard.

---

## 2. Design System Foundations

### Color Strategy

| Role | Direction |
|---|---|
| Shell background | Soft neutral with a slight brand atmosphere |
| Sidebar background | Slightly differentiated from content area |
| Card surface | Clean white or near-white |
| Brand accent | Used sparingly — active states, CTAs, unread indicators |
| Success | Green tone |
| Warning | Amber tone |
| Destructive | Red tone |
| Neutral / muted | Gray — for timestamps, helper text, secondary metadata |

Use color to convey meaning. Avoid using it as decoration.

### Typography

- Labels above all form fields — always
- Page titles: large and clear, not decorative
- Supporting descriptions: short, muted, purpose-driven
- Body text in tables and cards: medium weight, readable at a glance
- Helper text and timestamps: small, muted

### Spacing and Density

FireCRM Starter targets **medium density** — not the airiness of a marketing site, not the compression of an enterprise spreadsheet tool.

| Element | Target density |
|---|---|
| Navbar | Compact-medium |
| Sidebar items | Medium |
| Form fields | Medium |
| Table rows | Medium |
| Stats/KPI cards | Compact-medium |
| Card padding | Comfortable |

### Border, Shadow, and Radius

- **Borders**: thin, neutral, used to define surfaces rather than dominate them
- **Shadows**: used lightly — stronger only for floating layers (dropdowns, modals)
- **Radius**: consistent across the product — small controls use medium radius, cards use medium-large, dropdowns use large

### Motion

All motion should be:

- **Fast** — transitions should not interrupt work
- **Subtle** — motion should confirm, not perform
- **Functional** — every animation should be tied to meaning

Recommended uses: sidebar collapse, dropdown fade/scale, hover color transitions, card interaction feedback.

Avoid: dramatic entrance animations, long easing curves, decorative motion that doesn't communicate state change.

---

## 3. Authentication

### Auth Goals

The authentication experience should feel trustworthy, fast, and low-friction. It should reduce hesitation for first-time users, support both quick sign-in and account creation, make recovery paths obvious, and look polished without being visually heavy.

### Auth UX Principles

- One primary task per screen — never more
- Short, direct copy throughout
- Validation is immediate and placed close to the relevant field
- Secondary actions are visible but never competing with the primary CTA
- The page should design for confidence, not excitement

### Auth Layout Strategy

**Desktop**: Split layout

| Left Panel | Right Panel |
|---|---|
| Brand message | Auth card |
| Short value statement | Page title + supporting text |
| 2–3 product highlights | Social auth → divider → form → links |

**Mobile**: Single column

- Hide non-essential side content
- Keep brand name at the top
- Show form first

**Auth card width**:
- Desktop: `420px–480px`
- Mobile: Full width with safe horizontal margins

### Auth Pages

| Route | Purpose |
|---|---|
| `/auth/sign-in` | Return user entry |
| `/auth/sign-up` | New account creation |
| `/auth/forgot-password` | Password recovery entry |
| `/auth/reset-password` | New password submission |

**Navigation rules**: No complex nav inside auth pages. No dashboard chrome. No product menus. Keep the user inside a focused flow.

---

### 3.1 Sign-In Page

**Primary intent**: Get returning users to their dashboard as quickly as possible.

**Structure**:

```
Welcome back
Sign in to continue to FireCRM

[ Continue with Google ]
──────── or continue with email ────────
Email
[                                        ]
Password
[                                        ]

[ Sign in ]

Forgot password?
Don't have an account? Sign up
```

**Technical requirements**:
- `autofocus` on email field (desktop)
- `type="email"` with `autocomplete="email"`
- `autocomplete="current-password"` on password field
- Visible loading state on the sign-in button
- Password visibility toggle

**Error copy**:

| Situation | Message |
|---|---|
| Wrong credentials | `Invalid email or password.` |
| General failure | `We couldn't sign you in. Please try again.` |
| Google unavailable | `Google sign-in is not available right now.` |

Avoid: raw Firebase error strings, stack traces, vague "Something went wrong" with no recovery action.

---

### 3.2 Sign-Up Page

**Primary intent**: Let new users create an account in one pass without feeling like they're filling out onboarding paperwork.

**Structure**:

```
Create your account
Start with a CRM-ready starter

[ Continue with Google ]
──────── or continue with email ────────
Full name
[                                        ]
Work email
[                                        ]
Password
[                                        ]

[ Create account ]

Already have an account? Sign in
```

**Notes**:
- Do not ask for company, phone, or role at sign-up
- Save deeper setup for post-auth onboarding
- On success: auto sign-in if possible, then redirect to `/dashboard`
- On failure: preserve form values where safe, show clear inline error

**Validation**:
- Name: required
- Email: valid format required
- Password: minimum standard required
- All validation shown inline, close to the relevant field

---

### 3.3 Forgot Password Page

**Primary intent**: Let users submit their email and understand clearly what happens next.

**Structure**:

```
Reset your password
Enter your email to receive a password reset link

Email
[                                        ]

[ Send reset link ]

Back to sign in
```

**Success state** (shown in-card after submit):

> `If your email is registered, we sent a password reset link.`

This protects privacy and prevents account enumeration.

---

### 3.4 Reset Password Page

**Primary intent**: Let users set a new password without ambiguity.

**Structure**:

```
Create a new password
Enter your new password below

New password
[                                        ]
Confirm password
[                                        ]

[ Update password ]

Back to sign in
```

**Error state** (invalid or expired token):

> `This reset link is invalid or has expired. Request a new one.`

On success: show a clear confirmation, then provide CTA back to sign-in.

---

### 3.5 Auth Component Reference

| Component | Rules |
|---|---|
| Primary button | Full width, strong contrast, clear loading + disabled states |
| Secondary button (Google) | Visually calm, trustworthy, never competing with primary CTA |
| Form input | Label above, visible focus ring, consistent height, subtle default border |
| Divider | `──── or continue with email ────` — visually light |
| Success feedback | Green tone, concise |
| Error feedback | Red tone, concise, close to the relevant element |
| Helper text | Muted gray, short |

---

## 4. Dashboard Shell

### Purpose

The dashboard shell is the core application frame. It should feel operational, structured, scalable, and immediately familiar to anyone who has used modern SaaS software. The shell is not just layout — it is the product backbone that shapes how every dashboard page feels.

### Primary Regions

| Region | Role |
|---|---|
| Sidebar | Primary navigation and product identity |
| Navbar | Contextual controls, notifications, user access |
| Content area | Primary workspace for page-specific tasks |

The shell should visually distinguish navigation surfaces, control surfaces, and work surfaces — using contrast, spacing, and restrained borders. Avoid making everything the same white card on the same white background.

---

### 4.1 Shell Wireframes

**Desktop (expanded sidebar)**:

```
┌──────────────────────────────────────────────────────────────────┐
│ Sidebar              │ Navbar                                     │
│──────────────────────│────────────────────────────────────────────│
│ Logo                 │ Welcome / page context      [Bell] [User]  │
│ Dashboard            │────────────────────────────────────────────│
│ Staff                │                                            │
│ Notifications        │ Main page content                          │
│ Profile              │                                            │
│                      │ [Page header]                              │
│                      │ [Cards / Tables / Forms]                   │
│ [Collapse]           │                                            │
└──────────────────────────────────────────────────────────────────┘
```

**Desktop (collapsed sidebar)**:

```
┌──────────────────────────────────────────────────────────────────┐
│ [◉] │ Navbar                                       [Bell] [User] │
│ [≡] │──────────────────────────────────────────────────────────  │
│ [👤]│ Main page content                                          │
│ [🔔]│                                                            │
│ [<>]│                                                            │
└──────────────────────────────────────────────────────────────────┘
```

**Mobile**:

```
┌────────────────────────────────────────┐
│ [≡]  Page title           [Bell] [User]│
│────────────────────────────────────────│
│ Main page content                      │
│                                        │
│ Cards / Tables / Forms                 │
└────────────────────────────────────────┘
```

---

### 4.2 Sidebar

**Content structure**:
1. Logo / brand mark
2. Main navigation items (icon + label)
3. Collapse control at bottom

**Behavior**:
- Always visible on desktop
- Collapsible on desktop (icons + tooltips only when collapsed)
- Hidden behind a drawer on mobile

**Navigation item anatomy**:
- Icon + text label on desktop expanded
- Icon only with tooltip when collapsed
- No long descriptions, no inconsistent spacing

**Active state**:
- Slightly stronger background
- Brand-colored icon
- Darker label

**Collapsed state**:
- Logo mark only (no wordmark)
- Icons centered
- Hover tooltips for label visibility

---

### 4.3 Navbar

**Content**:
1. Welcome/page context text (left)
2. Notification bell with badge count (right)
3. User menu trigger — avatar + name (right)

**Behavior**:
- Sticky at top
- Light visual separation from content area
- Not overloaded — page-specific actions live in page headers, not the navbar

**Notification dropdown**:
- Quick-scan list
- Unread emphasis
- Short timestamps
- Link to full notifications page

**User menu dropdown**:
- User identity block (avatar + name + email)
- Link to Profile
- Sign out

---

### 4.4 Content Area

**Rules**:
- Consistent horizontal padding
- Consistent vertical spacing between sections
- Use natural layout widths — full-width for tables, max-width for forms and focused views

**Standard page structure**:

```
1. Page header (title + description + optional CTA)
2. Summary / stats / actions
3. Core content block
4. Secondary content block
```

**Page header pattern**:

```
Staff Management
Manage team members, roles, and status across your CRM workspace
                                                    [Invite Staff]
```

---

### 4.5 Shell Design Risks

| Risk | Mitigation |
|---|---|
| Feels like a generic admin template | Define a clear visual voice; refine hierarchy, not component count |
| Too many competing surfaces | Simplify background layers; reduce nested cards |
| Collapsed sidebar is unclear | Preserve strong icons; use tooltips; keep active state obvious |
| Navbar becomes overloaded | Keep only context, bell, user menu; move page actions to page headers |

---

## 5. Dashboard Overview

### Purpose

The Dashboard Overview is the in-app homepage for authenticated users. It is a **decision surface**, not a report archive. Users should be able to assess workspace state and choose their next action in under 10 seconds.

### Page Intent

The page should answer four questions at a glance:

1. What is happening right now?
2. What changed recently?
3. What needs attention?
4. Where should I go next?

### Structure

```
1. Welcome context (greeting + workspace state)
2. KPI summary row
3. Primary operational insight panel
4. Recent activity panel
5. (Future) Quick action shortcuts
```

---

### 5.1 Dashboard Overview Wireframes

**Desktop**:

```
┌────────────────────────────────────────────────────────────────┐
│ Welcome back, Alex                                             │
│ Here's the latest state of your CRM workspace                  │
│────────────────────────────────────────────────────────────────│
│ [Open Pipeline] [Active Contacts] [Tasks Due] [Team Util.]    │
│────────────────────────────────────────────────────────────────│
│ Revenue Pipeline Snapshot         │ Recent Activity            │
│───────────────────────────────────│────────────────────────────│
│ Qualified leads       18          │ New inbound lead added     │
│ Deals in proposal      7          │ Morgan Lee · 18 min ago    │
│ Avg. response time   4.2h         │────────────────────────────│
│                                   │ Theme updated              │
│                                   │ Brand color changed · 1h   │
└────────────────────────────────────────────────────────────────┘
```

**Tablet**: KPI cards 2×2 grid, panels stack below.

**Mobile**: KPI cards stack vertically, summary panel before activity.

---

### 5.2 KPI Cards

KPI cards are the fastest-scanning surface on the page. Each card communicates a single metric.

**Starter KPI set**:
- Open pipeline
- Active contacts
- Tasks due today
- Team utilization

**Card hierarchy**:
1. Label (short, muted)
2. Primary value (dominant)
3. Trend or supporting note (secondary)

**Visual rules**:
- Use color for trend direction — green positive, amber caution, neutral gray
- Trend indicators must not rely on color alone (include icon or label)
- Do not stack multiple badges, icons, and text in the same small card

---

### 5.3 Primary Summary Panel

The summary panel gives a richer view than KPI cards while keeping the page operational. It should feel like a compact operations board, not a generic content card.

**Recommended content**:
- Qualified leads
- Deals in proposal stage
- Average response time

**Layout**: Grouped metric blocks; support fast left-to-right scanning.

---

### 5.4 Recent Activity Panel

The activity panel confirms the workspace is alive. It reinforces momentum and supports audit-style awareness.

**Card anatomy**:
- Activity title (strongest text)
- Short supporting description
- Relative timestamp (quietest element)

**Rules**:
- Sort most recent first
- Keep timestamps visually muted
- This is not a notifications feed — content should feel workspace-level and operational

---

### 5.5 Welcome Context

```
Welcome back, Alex
Here's the latest state of your CRM workspace
```

Keep this area short. It should orient, not compete with the KPI row.

---

### 5.6 Dashboard Overview Design Risks

| Risk | Mitigation |
|---|---|
| Becomes a generic analytics page | Keep metrics CRM-specific; use activity to make it product-specific |
| Too many cards compete for attention | Reduce card count; strengthen primary vs. secondary hierarchy |
| Looks polished but not actionable | Make activity meaningful; connect summary signals to decisions |
| Feels empty in starter mode | Use realistic seed data; design blocks that are useful before real data |

---

## 6. Staff Management

### Purpose

Staff Management is a core dashboard example demonstrating how FireCRM handles searchable business data, structured status management, reusable table patterns, and record-level actions. It is also the **reference design for all future CRM list pages** — customers, leads, tickets, accounts.

### Structure

```
1. Page header (title + description + Invite Staff CTA)
2. Search bar + optional filters (Status, Role)
3. Staff table
4. Pagination footer
5. Empty states and modal flows
```

---

### 6.1 Staff Management Wireframes

**Desktop**:

```
┌──────────────────────────────────────────────────────────────┐
│ Staff Management                           [Invite Staff]    │
│ Manage team members, roles, and status                       │
│──────────────────────────────────────────────────────────────│
│ [Search by name, email, role, or department...] [Status][Role│
│──────────────────────────────────────────────────────────────│
│ Name          │ Role          │ Status   │ Joined   │ Actions │
│──────────────────────────────────────────────────────────────│
│ Avery M.      │ Sales Lead    │ Active   │ Aug 10   │ ...     │
│ Jordan K.     │ Success Mgr   │ Active   │ Nov 02   │ ...     │
│ Taylor B.     │ Ops Analyst   │ On leave │ Jan 14   │ ...     │
│ Casey J.      │ Marketing     │ Inactive │ Jun 22   │ ...     │
│──────────────────────────────────────────────────────────────│
│ Showing 1–4 of 18                       [Previous]  [Next]   │
└──────────────────────────────────────────────────────────────┘
```

**Mobile**: Switch from table to stacked list cards. Each card shows Name → Role → Status badge → Joined date → Actions button.

---

### 6.2 Staff Table

**Columns**:
- Name (+ email as secondary)
- Role (+ department if space allows)
- Status badge
- Joined date
- Actions

**Row design rules**:
- Each row readable in under 2 seconds
- Clear left-to-right reading order
- Name is the dominant identity element
- Status badge is compact, not overpowering
- Avoid cramming multiple controls into each row

---

### 6.3 Search and Filters

**Search**:
- Positioned above the table
- Placeholder: `Search by name, email, role, or department`
- Results update in real time

**Filters** (v1):
- Status dropdown (All / Active / On leave / Inactive)
- Role or department dropdown

Keep filter complexity low in v1. Allow fast reset.

---

### 6.4 Status Badges

| Status | Color |
|---|---|
| Active | Green |
| On leave | Amber |
| Inactive | Neutral gray |

Rules: small, rounded, paired color + text. No overly saturated colors. Status must not overpower the row.

---

### 6.5 Row Actions

Use a trailing actions menu (three-dot icon or similar). Keep actions hidden until triggered.

**v1 actions**:
- View profile
- Edit staff member
- Change role
- Deactivate

**Rules**: Destructive actions must never look like standard actions. Actions must not compete with row identity.

---

### 6.6 Invite Staff Modal

**CTA label**: `Invite Staff` or `Add Team Member` (not `Create` or `New`)

**Modal fields (v1)**:
- Full name
- Email
- Role

Keep the modal lightweight. Model only essential fields in v1.

---

### 6.7 Pagination

```
Page 1 of 5                              [Previous]  [Next]
```

- Disable Previous on first page
- Disable Next on last page
- Preserve search/filter state while paging

---

### 6.8 Empty States

| Situation | Headline | Body | Action |
|---|---|---|---|
| No staff yet | `No team members yet` | Start by inviting your first staff member to organize your CRM workspace. | `Invite Staff` |
| No search results | `No staff found` | Try another search term or clear the current filters. | — |

---

### 6.9 Staff Management Design Risks

| Risk | Mitigation |
|---|---|
| Page feels too generic and table-heavy | Strong page header; good status styling; clear row hierarchy |
| Table becomes visually noisy | Limit row content; reduce unnecessary borders; keep actions secondary |
| Mobile usability degrades | Design a stacked mobile pattern early; do not force desktop layout |
| Invite flow too complex | Keep modal small in v1; model only essential fields |

---

## 7. Profile Page

### Purpose

The Profile page helps users manage their personal account identity inside the product. It is not a settings dump — it focuses on the user's identity, contact details, and profile presentation.

### Structure

```
1. Page header
2. Profile identity panel (avatar + name + email + upload)
3. Profile details form
4. Save confirmation feedback
```

---

### 7.1 Profile Page Wireframe

**Desktop**:

```
┌──────────────────────────────────────────────────────────────┐
│ Profile                                                      │
│ Manage your personal information and account identity        │
│──────────────────────────────────────────────────────────────│
│ Identity Panel              │ Profile Form                   │
│─────────────────────────────│──────────────────────────────  │
│ [Avatar]                    │ Full name                      │
│ Alex Tran                   │ [                            ] │
│ alex@example.com            │ Email                          │
│ [Upload Avatar]             │ [                            ] │
│ Recommended: square image   │ Phone                          │
│                             │ [                            ] │
│                             │ Job title                      │
│                             │ [                            ] │
│                             │ Location                       │
│                             │ [                            ] │
│                             │ Bio                            │
│                             │ [                            ] │
│                             │                                │
│                             │              [Save Profile]    │
└──────────────────────────────────────────────────────────────┘
```

**Mobile**: Stack identity panel above form.

---

### 7.2 Identity Panel

**Content**:
- Avatar (large, circular)
- Display name
- Email address
- Upload avatar action
- Short helper text

**Avatar upload states**:

| State | Label |
|---|---|
| Idle | `Upload avatar` |
| Uploading | `Uploading...` |
| Success | Preview updates immediately |
| Error | `Unable to upload image. Please try again.` |

---

### 7.3 Profile Form

**Fields (v1)**:
- Full name
- Email
- Phone
- Job title
- Location
- Bio

**Notes**:
- Email should feel more sensitive than other fields (consider label or helper text reinforcing this)
- Bio should be clearly optional
- Security settings do not belong in this form — they live elsewhere

---

### 7.4 Save UX

| State | Button text |
|---|---|
| Default | `Save profile` |
| Saving | `Saving...` |
| Success | `Profile saved successfully.` (inline, near button) |

Rules:
- Preserve all form values during save
- No auto-save in v1 — explicit save builds trust on identity forms
- On validation failure: highlight only fields that need attention, never clear the form

---

### 7.5 Profile Design Risks

| Risk | Mitigation |
|---|---|
| Feels like a generic form | Keep strong identity panel; make avatar and name visually meaningful |
| Too many fields reduce completion | Limit v1 to essential profile fields |
| Upload feels fragile | Show all upload states clearly; keep messaging short and local |

---

## 8. Notifications Page

### Purpose

The Notifications page helps users review workspace updates, alerts, and activity-related messages in a focused list. It should feel quieter than a chat feed and lighter than a full audit log.

### Structure

```
1. Page header
2. Notification list (sorted most recent first)
3. Per-item read state + action
(Future: tabs for All / Unread, filters by type, bulk actions)
```

---

### 8.1 Notifications Wireframe

**Desktop**:

```
┌──────────────────────────────────────────────────────────────┐
│ Notifications                                                │
│ Review recent alerts, updates, and activity                  │
│──────────────────────────────────────────────────────────────│
│ [Unread]  New team member added                              │
│           Linh Nguyen was added to Support.                  │
│           18 minutes ago                    [Mark as read]   │
│──────────────────────────────────────────────────────────────│
│ [Read]    Security policy updated                            │
│           Google sign-in is now available.                   │
│           1 hour ago                        [Marked]         │
│──────────────────────────────────────────────────────────────│
│ [Unread]  Theme updated                                      │
│           Brand color was changed to a new preset.           │
│           3 hours ago                       [Mark as read]   │
└──────────────────────────────────────────────────────────────┘
```

**Mobile**: Stack all elements vertically. Move action button below timestamp. Preserve clear card separation.

---

### 8.2 Notification Card Anatomy

| Element | Role |
|---|---|
| Title | Strongest text — dominant scanning target |
| Read/Unread badge | Clear state signal |
| Message body | One sentence, enough context |
| Timestamp | Relative time — visually muted |
| Action button | Secondary — should not dominate |

---

### 8.3 Read/Unread States

| State | Visual treatment | Button |
|---|---|---|
| Unread | Emphasized badge, slightly stronger card presence | `Mark as read` |
| Read | Neutral badge, calmer visual weight | `Marked` (passive/disabled) |

The difference between states should be **obvious but not stressful**.

---

### 8.4 Notification Copy Style

**Structure**: Title + one-sentence body

| Title | Body |
|---|---|
| `New team member added` | `Linh Nguyen was added to Support.` |
| `Security policy updated` | `Google sign-in is now available for workspace setup.` |
| `Theme updated` | `Brand color was changed to a new preset.` |

Avoid: long paragraphs, vague alerts, raw internal system text.

---

### 8.5 Notification Design Risks

| Risk | Mitigation |
|---|---|
| Page feels flat and repetitive | Use clear title hierarchy; improve spacing rhythm; subtle unread emphasis |
| Unread/read distinction is too weak | Stronger badge logic; slight contrast difference for unread cards |
| Page becomes noisy with many alerts | Keep copy short; design for future filtering and grouping |

---

## 9. Component Reference

### Shared Shell Components

| Component | Used in |
|---|---|
| `DashboardSidebar` | All dashboard pages |
| `DashboardNavbar` | All dashboard pages |
| `DashboardShell` | All dashboard pages |
| `PageHeader` | All dashboard pages |
| `StatsCard` / KPI card | Dashboard Overview |
| `SectionCard` | Dashboard Overview, Profile |
| `DropdownMenu` | Navbar user menu, notification dropdown, row actions |

### Reusable Layout Patterns

**Pattern A — Overview page**:
- Stats row
- Main analysis/summary card
- Secondary activity card

**Pattern B — Management page**:
- Page header
- Search + filter row
- Data table
- Row actions
- Pagination

**Pattern C — Settings/form page**:
- Page header
- Two columns on desktop: form card + preview/identity card
- Single column on mobile

---

## 10. Accessibility Standards

These rules apply to every page in the product.

- Every input must have a visible, associated label
- Focus states must be clearly visible on all interactive elements
- Color must never be the sole way to communicate status, error, or meaning
- Semantic heading order must be maintained across pages
- All forms must support keyboard-only completion
- Table headers must use correct semantic markup
- Dropdown menus must be keyboard operable and close predictably
- Collapsed sidebar states must preserve accessible labels (via tooltips or `aria-label`)
- Button text must remain readable in all states (default, loading, disabled)
- Avatar upload triggers must be keyboard accessible

---

## 11. Responsive Strategy

### Breakpoint Behavior

| Surface | Desktop | Tablet | Mobile |
|---|---|---|---|
| Sidebar | Fixed, collapsible | Visible if width allows | Drawer (hidden by default) |
| Navbar | Full, horizontal | Full, horizontal | Compact — bell + user only |
| KPI cards | 4-up in one row | 2×2 grid | Stacked vertically |
| Tables | Full columns | Reduce/combine columns | Stacked list cards |
| Forms | Single or two-column | Single column | Single column |
| Cards | Multi-column layouts | Reduced columns | Stacked |

### Responsive Priority Order

When screen space is reduced, preserve in this order:

1. Navigation access
2. Core action access (primary CTAs)
3. Content readability
4. KPI readability
5. Table/list identity fields (Name, Status)

Reduce first:
- Decorative elements
- Secondary metadata columns
- Extra helper text blocks
- Complex multi-column arrangements

---

## 12. Implementation Roadmap

### Phase 1 — Foundation

- Finalize auth shell layout (sign-in, sign-up, forgot password, reset password)
- Finalize dashboard shell (sidebar, navbar, content area, page header pattern)
- Standardize spacing, form controls, and CTA hierarchy
- Clean up error and success messaging across auth
- Finalize staff table structure, status badges, and pagination
- Finalize profile page structure and form

### Phase 2 — Polish and Patterns

- Add password visibility toggle to auth forms
- Add mobile drawer behavior for sidebar
- Improve empty states across all list pages
- Add row actions menu to staff table
- Add search and filter behavior to staff management
- Refine notification card unread/read distinction
- Add avatar upload states to profile
- Improve save UX feedback across profile page

### Phase 3 — Extension

- Add onboarding handoff after sign-up
- Add quick actions to dashboard overview
- Add charts to dashboard overview only if they improve decisions
- Add sorting and optional bulk actions to staff management
- Add notification filtering (All / Unread tabs)
- Connect overview signals directly to deeper CRM modules
- Add brand customization hooks to auth surfaces
- Add invite-based or workspace-aware auth extensions

---

## Appendix: Design Summary By Page

| Page | Feel |
|---|---|
| Auth | Clean, trustworthy, efficient, low-friction |
| Dashboard Shell | Reliable, modern, calm — disappears into the workflow |
| Dashboard Overview | Clear, credible, scannable, operational |
| Staff Management | Efficient, readable, structured, scalable |
| Profile | Personal, safe, lightweight, form-focused |
| Notifications | Simple, useful, low-friction, organized |

---

*FireCRM Starter — DESIGN.md*
*A production-shaped SaaS CRM starter template.*
*Built for developers who want to skip the foundation and build the product.*
# WHALES PROJECT BRIEF

| Field | Value |
|---|---|
| **Client** | GoJuly / July AI |
| **Date** | 2026-04-14 |
| **Engagement ID** | gojuly_red_team_nav_fix_2026_04_14 |
| **Confirmation status** | All values client-confirmed or asset-extracted — zero unconfirmed gaps |

---

## 1. Product Vision

July AI (app.gojuly.ai) is a structured learning and hiring platform for AI red teamers. Users move through learning modules ("AI Red Team" / "Red Teaming - Beginner") to build qualifying skills, then submit work via a separate module ("Red Team Sample Submission") to enter a hiring pipeline. The platform has a left-rail sidebar navigation inside learning modules and a home page with accordion-style module cards.

Success for this engagement: users who click "Start Beginner Module" can clearly navigate back to the Red Team Sample Submission module once they are ready to apply — without getting stranded in the AI Red Team module and without losing sight of the submission module on the home page.

---

## 2. Problem Statements

**Problem A — No return path from AI Red Team to Red Team Sample Submission:**
When a user clicks "Start Beginner Module" on the Red Team Sample Submission first page, they are redirected into the "Red Teaming - Beginner" learning module. The left sidebar shows navigation for that module only (Learning Material - Beginner, Red Teaming Beginner, PRACTICE challenges). No button, link, or CTA points back to the submission module. The only exits are the back arrow and the logo link — both go to /home, not to the submission module.

**Problem B — Home page auto-expansion hides Red Team Sample Submission:**
When a user returns to /home from the AI Red Team module, the "AI Red Team" accordion is auto-expanded — showing the full Learn / Advance / Get Hired card set and "Dive In" CTA. This pushes "Red Team Sample Submission" below the fold, making it invisible without scrolling.

**Framing note:** Counter-hypothesis considered (auto-expansion is the primary issue, sidebar button is secondary) — rejected. Both are independent failure points; both are in scope.

---

## 3. Target Users

**Primary persona:** Job applicants to July AI's AI Red Team roles. They opened Red Team Sample Submission, clicked "Start Beginner Module" to build qualifying skills, worked through some or all of the AI Red Team Practice section, and now need to return to submit their work. Emotional state: task-focused, slightly impatient — they came to submit, not navigate.

---

## 4. Success Metrics

| Field | Value |
|---|---|
| **Primary metric** | Users on any Practice page in the AI Red Team module can reach the Red Team Sample Submission first page in one click |
| **Secondary metrics** | Red Team Sample Submission module is visible without scrolling when user returns to /home from AI Red Team; drop-off between "Start Beginner Module" click and eventual submission decreases |
| **Proxy signals** | Button renders in sticky sidebar on all Practice pages; AI Red Team accordion is collapsed on /home when user returns from the module |

---

## 5. Key Features & Scope

**In Scope:**

| Screen / Feature | Description |
|---|---|
| AI Red Team sidebar — new button | "Go to Job Application" button, sticky to bottom of sidebar, visible on all Practice section pages (Requirements + Challenges 1–10) only |
| /home — AI Red Team accordion state | Collapse the AI Red Team accordion when user navigates to /home from an AI Red Team module page; do not change default behavior in other contexts |

**Out of Scope:**

| Item | Reason |
|---|---|
| Button on Learn section pages (Learning Material - Beginner) | Client confirmed: Practice section only |
| Red Team Sample Submission module content or layout | Not requested |
| "Start Beginner Module" button or redirect behavior | Not requested |
| Module reordering on home page | Not requested |
| Other learning modules | Not requested |

---

## 6. Constraints

- Must match existing design system exactly: Inter font, Tailwind CSS v4, DaisyUI `btn` classes, `ja-btn-primary` token
- Destination URL is **per-user/session-specific** — the button must derive the Red Team Sample Submission destination from a stored module reference (e.g. known collection ID: `f45878f9-fc2a-4e91-ab98-22a4efc281fc`), not a hardcoded path. Engineering must confirm the correct derivation method.
- Accordion collapse behavior is **conditional**: collapse only when returning from an AI Red Team module page, not on every /home load
- Accessibility: WCAG 2.1 AA (default — not explicitly confirmed by client)

---

## 7. References & Aesthetic Direction

| Reference | Draw from |
|---|---|
| Existing `ja-btn-primary` ("Dive In", "Onboard") | Button visual style — filled navy, 12px radius, white text, Inter 14px/600 |
| Existing sidebar structure (Challenge nav items) | Horizontal padding alignment — button left/right padding matches `px-4` of nav items |
| "Skip to Job Application" (Red Team Sample Submission first page) | Semantic analogue — same intent, same destination module |

**Aesthetic keywords translated:**

| Keyword | Pixel decision | Confirmed by |
|---|---|---|
| Match existing system | `btn ja-btn-primary`: `backgroundColor: rgb(8,51,134)`, white text, `borderRadius: 12px`, Inter 14px/600 | url_extracted — getComputedStyle() on "Dive In" button |
| Sticky bottom placement | Fixed to the bottom of the 256px sidebar with a `border-t border-gray-200` divider above it | client-confirmed Q-01 |
| Filled style | Filled navy (not outline) — client-confirmed to match primary CTA weight | client-confirmed Q-02 |

---

## 8. Design System

**Design Token Record:**

| Category | Token | Figma Style Name | Value | Source | Confirmed |
|---|---|---|---|---|---|
| Color | primary-brand | N/A | `rgb(8, 51, 134)` / `#083386` | url_extracted — /home + /learning buttons getComputedStyle() | yes |
| Color | text-primary | N/A | `oklch(0.278078 0.029596 256.848)` | url_extracted — sidebar, nav items | yes |
| Color | text-gray-700 | N/A | `rgb(55, 65, 81)` | url_extracted — nav item span | yes |
| Color | border-default | N/A | `rgb(229, 231, 235)` | url_extracted — sidebar borderRight | yes |
| Color | surface-white | N/A | `rgb(255, 255, 255)` | url_extracted — sidebar bg, button text | yes |
| Color | surface-gray-50 | N/A | `rgb(249, 250, 251)` | url_extracted — nav item hover, section headers | yes |
| Color | active-pink-50 | N/A | `rgb(253, 242, 248)` | url_extracted — active Challenge item bg | yes |
| Color | active-pink-500 | N/A | `rgb(236, 72, 153)` | url_extracted — active Challenge item left border | yes |
| Typography | body | N/A | Inter, sans-serif / 16px / 400 | url_extracted — sidebar fontFamily + fontSize | yes |
| Typography | nav-item | N/A | Inter / 14px / 400 / oklch dark navy | url_extracted — Challenge item classes + computed | yes |
| Typography | btn-label | N/A | Inter / 14px / 600 | url_extracted — "Dive In" getComputedStyle() | yes |
| Spacing | sidebar-width | N/A | 256px | url_extracted — sidebar computed width | yes |
| Spacing | sidebar-padding-top | N/A | 16px | url_extracted — sidebar paddingTop | yes |
| Spacing | nav-item-padding | N/A | 10px 16px (`py-2.5 px-4`) | url_extracted — Challenge item padding | yes |
| Spacing | btn-horizontal-padding | N/A | 24px (`px-6`) | url_extracted — "Dive In" getComputedStyle() | yes |
| Radius | btn-primary | N/A | 12px (`rounded-xl`) | url_extracted — all ja-btn-primary instances | yes |
| Shadow | btn-primary | N/A | `rgba(0,0,0,0.05) 0px 1px 2px 0px` | url_extracted — button boxShadow | yes |

**Component Variant Record:**

| Component | Figma Node ID | Figma Frame Name | Variant Properties | Confirmed States | Unconfirmed States |
|---|---|---|---|---|---|
| SidebarNavItem | N/A | N/A | default, hover, active | default (transparent), hover (bg-gray-50), active (bg-pink-50 + 4px pink-500 left border) | disabled |
| PrimaryButton (ja-btn-primary) | N/A | N/A | size: sm (h-12), md (h-9), lg (h-14) | default, hover (cursor-pointer) | focus (ring-2 ring-ja-ocean), disabled |
| ModuleAccordion (home) | N/A | N/A | expanded, collapsed | expanded (full content), collapsed (header only) | transitioning |
| GoToJobApplicationButton (new) | N/A | N/A | visible (Practice pages), hidden (Learn pages) | visible/default | hover, focus |

**Active State Visual Record:**

| Component | Active treatment | Source |
|---|---|---|
| SidebarNavItem (current page) | `backgroundColor: rgb(253,242,248)` + `borderLeft: 4px solid rgb(236,72,153)` | url_extracted — getComputedStyle() on Challenge 3 |
| GoToJobApplicationButton | No active/current treatment — navigation action, not location indicator | client-confirmed (it is an exit CTA, not a nav item) |

---

## 9. Brand Identity

- **Product name:** July AI / july ai (lowercase wordmark)
- **Primary brand color:** `rgb(8, 51, 134)` (#083386) — all primary CTAs
- **Accent:** Pink-500 `rgb(236,72,153)` — active nav indicator only; not a CTA color
- **Typography:** Inter (primary), system sans-serif fallback

---

## 10. Visual Design Language

**Aesthetic:** Clean professional SaaS. Flat white surfaces, light gray dividers, no sidebar shadows. Typography-driven hierarchy, minimal ornamentation.

**Color system:** Primary action — navy `#083386`. Active location — pink-50 bg + 4px pink-500 left border. Hover — gray-50. Dividers — gray-200. Text — oklch dark navy (primary), gray-700 (nav labels).

**Motion:** No animation library detected (no Lenis, no Framer Motion). Standard CSS `transition` on hover only.

---

## 11. Copy Guide

**Locked strings (client-confirmed):**
- New button label: **"Go to Job Application"**

**Terminology rules:**
- "Job Application" = Red Team Sample Submission module — use exactly, do not substitute "submission" or "application form"
- "Beginner Module" = AI Red Team / Red Teaming - Beginner

**Tone:** Directive and action-oriented. Append right-arrow icon (`→`) to match the existing directional button pattern ("Start Beginner Module →", "Skip to Job Application →"). Note: existing arrow icons are rendered as `<img>` elements in the DOM, not Unicode or Lucide — match this pattern.

---

## 12. User Flows

**Flow 1 — Return to submission from Practice section:**
1. User is on any Practice page in Red Teaming - Beginner (Requirements, Challenge 1–10)
2. "Go to Job Application →" button is visible, sticky at bottom of sidebar
3. User clicks it
4. System derives the Red Team Sample Submission first-page URL from the stored module reference and navigates there

**Flow 2 — Navigate home without losing Red Team Sample Submission:**
1. User clicks the "july ai" logo or back arrow from within an AI Red Team module page
2. System detects the user is returning from an AI Red Team module page
3. AI Red Team accordion renders collapsed on /home
4. Red Team Sample Submission module card is visible in or near the viewport

---

## 13. Page Design & Layout

**AI Red Team sidebar — with new button (Practice pages only):**

```
┌──────────────────────────────┐  width: 256px
│ [⊟]                         │  collapse btn — 32px, p-1.5, rounded-md
│ [←] Red Teaming - Beginner  │  back btn + title (14px, dark navy)
├──────────────────────────────┤  border-b border-tide
│ ○ Learning Material...  >   │  nav item — py-2.5 px-4, text-sm
│ ○ Red Teaming Beginner  ∨   │  section header — py-4 px-4, bg-gray-50
│   · Previous Conversations  │
│   PRACTICE                  │
│   · Requirements            │
│   · Challenge 1             │
│   · Challenge 2             │
│   · Challenge 3  ◀ active   │  bg-pink-50 + 4px solid pink-500 left border
│   · ...                     │
│   · Challenge 10            │
│                             │  ← sticky footer area begins
├──────────────────────────────┤  border-t border-gray-200  (new divider)
│  Go to Job Application  →   │  NEW — ja-btn-primary, sticky bottom, w-full px-4
└──────────────────────────────┘
```

**Button spec (all values client-confirmed or url_extracted):**

| Property | Value | Source |
|---|---|---|
| Classes | `btn ja-btn-primary w-full` | url_extracted + client Q-02 |
| Background | `rgb(8, 51, 134)` | url_extracted |
| Text color | `rgb(255, 255, 255)` | url_extracted |
| Border radius | 12px | url_extracted |
| Height | 48px (h-12) | url_extracted — matches "Dive In" size |
| Font | Inter / 14px / 600 | url_extracted |
| Padding | 0px 24px | url_extracted |
| Horizontal wrapper padding | `px-4` | url_extracted — matches nav item alignment |
| Divider above | `border-t border-gray-200` | url_extracted — matches existing section dividers |
| Visibility | Practice section pages only (Requirements + Challenges 1–10) | client-confirmed Q-04 |
| Position | Sticky to sidebar bottom | client-confirmed Q-01 |
| Arrow icon | `<img>` element (right-arrow), matches existing CTA pattern | url_extracted — DOM inspection |

**Button is NOT shown on:**
- Learning Material - Beginner page (Learn section) — client-confirmed

**Home page — AI Red Team accordion:**

| Behavior | Spec | Source |
|---|---|---|
| Default state on /home | Collapsed (header row only) when navigating from an AI Red Team module page | client-confirmed Q-05 |
| Default state in all other contexts | Unchanged — do not alter existing behavior | client-confirmed Q-05 |
| Trigger | Referrer is an AI Red Team learning module URL (`/learning/3a0c9d2c-...`) | url_extracted — module URL pattern |
| Collapsed appearance | Module header row: "AI Red Team | IN PROGRESS | 2.0 HOURS" visible; Learn/Advance/Get Hired cards and "Dive In" button hidden | url_extracted — /home snapshot |

---

## 14. Interaction & States

| Component | States | Source |
|---|---|---|
| "Go to Job Application" button | default, hover (DaisyUI btn hover), focus (ring-2 ring-ja-ocean ring-offset-2) | url_extracted — existing ja-btn-primary pattern |
| AI Red Team accordion (home, on return) | collapsed on arrival from module; expandable by user click | client-confirmed Q-05 |
| Sidebar nav item | default (transparent), hover (bg-gray-50), active (bg-pink-50 + left pink border) | url_extracted |

---

## 15. Delivery & Handoff

| Field | Value | Source |
|---|---|---|
| **Output format** | Code implementation in existing Next.js / React codebase | inferred from project template |
| **Device targets** | Desktop primary — sidebar is 256px fixed, no mobile reflow observed | url_extracted |
| **Accessibility** | WCAG 2.1 AA (default) | designer default |
| **Button destination** | Derived at runtime from stored module reference for Red Team Sample Submission — NOT hardcoded URL | client-confirmed Q-03 |
| **Accordion collapse trigger** | Referrer-based: collapse AI Red Team accordion only when user arrives at /home from an AI Red Team module page | client-confirmed Q-05 |

---

## Designer Notes

*For the Designer Agent — not shown to client.*

### Phase 1 status
All 5 questions sent and answered across two exchanges. Zero CLIENT DEFERRED items. Brief written from fully confirmed values only.

### Question Status Tracker (final)

| Q-ID | P | Question | Status | Answer |
|---|---|---|---|---|
| Q-01 | P1 | Sticky bottom or inline after list? | confirmed | Sticky bottom |
| Q-02 | P1 | Filled navy or outlined? | confirmed | Filled navy |
| Q-03 | P1 | Same URL for all users or per-user? | confirmed | Varies — derive from module reference at runtime |
| Q-04 | P2 | Which specific pages? | confirmed | Practice section only (Requirements + Challenges 1–10) |
| Q-05 | P2 | Always collapsed or only on return? | confirmed | Only when returning from an AI Red Team module page |

### Counter-hypothesis log
- **Client's stated problem:** Navigation confusion after "Start Beginner Module" redirect
- **Alternative reading:** Home auto-expansion is root cause; sidebar button is secondary
- **Decision:** Proceed with client framing — both solutions are additive, both scoped by client

### Screenshots captured (design references)
- `docs/design-references/home-desktop-1440.png` — /home full page (AI Red Team expanded state)
- `docs/design-references/learning-module-desktop.png` — Red Teaming - Beginner (sidebar + active Challenge 3)
- `docs/design-references/red-team-sample-submission-first-page.png` — Red Team Sample Submission first page

### Engineering notes for implementor
1. **"Go to Job Application" destination:** URL is per-user. Derive from the known collection ID for Red Team Sample Submission — do not hardcode the full URL path. Confirm the correct API/store lookup with engineering.
2. **Accordion collapse trigger:** Check referrer or use router history to detect navigation from `/learning/3a0c9d2c-...` (AI Red Team module URL prefix). Set AI Red Team accordion to collapsed state on /home mount when this condition is true. Do not alter accordion state for users arriving from other routes.
3. **Button visibility toggle:** The sidebar renders for the whole module. The "Go to Job Application" button should be conditionally rendered based on whether the current page is in the Practice section (Requirements or any Challenge). Learn section pages should not show the button.

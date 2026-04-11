# User Journey — GoJuly Navigation UX Fix
**Produced by:** Whales Designer Agent v7
**Date:** 2026-04-10
**Engagement type:** Surgical — 2 targeted UX changes

---

## Overview

This document traces the user's experience through the fixed Red Team learning sequence. Two screens are in scope. Each step maps to a concrete UI state. The goal thread throughout: reduce navigation confusion → increase Red Team Sample Submission completion rate.

---

## Journey Map

### Starting Condition

The user is enrolled in GoJuly. They have seen the Red Team Sample Submission module on their home page. They understand they need to complete a beginner module before applying.

---

### Step 1 — User Arrives at Home Page

**Screen:** Home (`/home`)
**UI State (after fix):**
- Navbar: sticky, `bg-white`, Home nav item active (`#2563eb`)
- "Welcome to July AI!" TrackCard: expanded (`defaultOpen={i === 0}` = `true`)
- "AI Red Team" TrackCard: collapsed (was previously expanded, causing the problem)
- "Red Team Sample Submission" TrackCard: **visible in viewport without scrolling** — collapsed, with its title, IN PROGRESS badge, and card body accessible
- All other tracks: collapsed

**User perception:** The page is scannable. The user can see all 6 track cards. "Red Team Sample Submission" is not hidden.

**Decision point:** User identifies "AI Red Team" as the prerequisite track. They click the TrackCard header to expand it.

---

### Step 2 — User Expands AI Red Team Track

**Screen:** Home (`/home`)
**UI State:**
- "AI Red Team" TrackCard: expands instantly (no CSS transition — original behavior)
- Expanded body shows: green panel (`btn-bg-green.png`), three step cards (Learn, Advance, Get Hired), and the "Dive In" primary CTA button
- ChevronDown rotates to ChevronUp, `border-t border-gray-100` separator appears above expanded body
- "Red Team Sample Submission" TrackCard: may scroll out of immediate view as AI Red Team expands — this is acceptable, the user is now focused on AI Red Team content

**User action:** User reads the step cards. They click "Dive In."

---

### Step 3 — User Arrives at the Learning Page (Red Teaming - Beginner)

**Screen:** Learning page (`/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401?type=objective&...`)
**UI State (after fix):**
- Left navigation sidebar: visible at ~240px width
  - Section header: "Learn" — contains lesson nav items (e.g., "Introduction", "Concepts", etc.)
  - Section header: "Practice" — contains challenge nav items (e.g., "Requirements", "Challenge 1", "Challenge 2", etc.)
  - Separator: `border-t border-gray-100` above the footer zone
  - **NEW:** "Go to Job Application" primary button — below Practice items, full-width, `bg-[#083386]`, ArrowRight icon, 48px height, rounded-xl
- Right content area: displays current lesson "AI Red Teaming Beginner" content

**User perception:** The user completes (or skims) the learning content. When they look at the left nav for "what's next," they see the "Go to Job Application" button clearly differentiated from nav links by its filled primary blue color and full button shape. It signals: "this is the next major action."

**Decision point:** User clicks "Go to Job Application."

---

### Step 4 — User Arrives at Red Team Sample Submission Module

**Screen:** Red Team Sample Submission root (`/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401`)
**UI State:**
- The Red Team Sample Submission module loads
- User is now at the entry point of the job application flow they were originally trying to reach

**User perception:** One click from the learning page got them exactly where they needed to go. No back-navigation, no home page scan, no confusion.

---

### Step 5 — User Returns to Home Page (Back Navigation)

**Screen:** Home (`/home`)
**UI State:**
- "AI Red Team" TrackCard: collapsed by default (same as Step 1) — the `defaultOpen={i === 0}` fix ensures this is consistent on every visit
- "Red Team Sample Submission" TrackCard: visible in viewport, collapsed
- User can immediately see their submission progress without scrolling

**User perception:** The home page is clean and consistent. Tracks don't unexpectedly expand on return.

---

## Journey Summary Table

| Step | Screen | User State | Key UI Element | Outcome |
|------|--------|------------|----------------|---------|
| 1 | Home | Oriented, scanning | All tracks visible; AI Red Team collapsed | User finds Red Team track |
| 2 | Home | Ready to start | AI Red Team expanded, "Dive In" CTA visible | User enters learning module |
| 3 | Learning page | Learning / ready to progress | "Go to Job Application" button in left nav | User sees next action |
| 4 | Sample Submission root | Task completion | Module entry page | User proceeds to apply |
| 5 | Home (return) | Reviewing progress | AI Red Team collapsed; Red Team Sample Submission visible | User sees status without confusion |

---

## Failure Modes Eliminated

| Before | After |
|--------|-------|
| AI Red Team auto-expanded on home page load, pushing "Red Team Sample Submission" out of viewport | AI Red Team collapsed; all tracks visible |
| Learning page left nav had no affordance to progress to the Sample Submission module | "Go to Job Application" button provides direct, one-click path |
| User had to back-navigate and scroll to find the submission module after learning | Eliminated — button navigates directly |

---

## Goal Thread Traceability

- **Primary metric:** Reduce navigation confusion in the Red Team learning sequence
- **Change 1 impact (Screen 1):** Eliminates the dead-end on the learning page. Users who complete or skim the beginner content have a clear, immediate path forward.
- **Change 2 impact (Screen 2):** Eliminates the viewport-obstruction problem. Users returning home see all track cards, including "Red Team Sample Submission," without scrolling.
- **Downstream:** Both changes reduce friction in the funnel step between "starting the beginner module" and "submitting the Red Team application" — the exact gap the client identified as the completion rate bottleneck.

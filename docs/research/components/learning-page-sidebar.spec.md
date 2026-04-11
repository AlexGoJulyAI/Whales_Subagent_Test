# LearningPageSidebar Specification

## Overview
- **Target file:** `src/app/tests/gojuly-learning/page.tsx`
- **Screenshot:** none available — built from MOCKUP.md Part B specs
- **Interaction model:** click-driven (nav items toggle, accordion on home page)
- **Priority:** P0

## DOM Structure

Full-page layout with a shared Navbar (sticky top), then a two-column flex layout:
- Left: fixed-width sidebar (240px) with course navigation
- Right: flex-1 content area

Sidebar structure (flex col):
- Section header: "LEARN"
  - Nav items: Introduction, Concepts, Techniques, Case Studies
- Section header: "PRACTICE"
  - Nav items: Requirements, Challenge 1, Challenge 2, Challenge 3
- `border-t border-gray-100` separator div
- "Go to Job Application" button (primary CTA, w-full)

Content area:
- Representational card with lesson title "AI Red Teaming Beginner"
- White card placeholder for content body

## Computed Styles (from MOCKUP.md confirmed tokens)

### Outer page container
- minHeight: 100vh
- background: #eeeeee
- fontFamily: Inter

### Sidebar container
- width: 240px
- background: #ffffff [ESTIMATED — flag in code comment]
- padding: 16px (p-4)
- borderRight: 1px solid #e5e7eb [ESTIMATED — flag]
- height: 100vh (or 100% relative to parent)
- overflowY: auto
- display: flex
- flexDirection: column

### Section header ("LEARN", "PRACTICE")
- fontSize: 12px (text-xs)
- fontWeight: 600 (font-semibold)
- color: #6b7280 (gray-500)
- textTransform: uppercase
- marginBottom: 8px (mb-2)
- marginTop (before PRACTICE): 16px (mt-4)

### Nav item (individual link)
- fontSize: 14px (text-sm)
- fontWeight: 500 (font-medium)
- color: #374151 (gray-700) — default [estimated]
- color active: #2563eb — matches home page nav-active token
- padding: 8px 12px (py-2 px-3)
- borderRadius: 8px (rounded-lg)
- display: block
- hover background: #f9fafb (gray-50)
- hover color: #111827 (gray-900)
- cursor: pointer

### Separator above button
- borderTop: 1px solid #f3f4f6 (gray-100)
- marginTop: 16px (mt-4)
- marginBottom: 16px (mb-4)

### "Go to Job Application" button (primary deliverable)
- display: inline-flex
- alignItems: center
- justifyContent: center
- gap: 8px (gap-2)
- paddingLeft: 24px (px-6)
- paddingRight: 24px
- height: 48px (h-12)
- borderRadius: 12px (rounded-xl)
- background: #083386 (default)
- background hover: #0a40a0
- color: #ffffff
- fontSize: 14px (text-sm)
- fontWeight: 600 (font-semibold)
- boxShadow: shadow-sm
- transition: color transition-colors
- width: 100% (w-full)

### Content area
- flex: 1
- padding: 32px (p-8)
- background: #eeeeee

### Content card
- background: #ffffff
- borderRadius: 8px (rounded-lg)
- boxShadow: shadow-sm
- padding: 24px (p-6)

### Lesson title h1
- fontFamily: Calistoga
- fontSize: 36px (text-4xl)
- fontWeight: 400
- color: #1a2847 (heading-dark)
- marginBottom: 32px (mb-8)

## States & Behaviors

### Nav item hover
- Trigger: hover
- State A: background transparent, color gray-700
- State B: background gray-50 (#f9fafb), color gray-900
- Transition: hover:bg-gray-50 hover:text-gray-900 (Tailwind — transition handled by browser)

### "Go to Job Application" button hover
- Trigger: hover
- State A: background #083386
- State B: background #0a40a0
- Transition: transition-colors

### "Go to Job Application" button click
- Navigates to: https://app.gojuly.ai/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401
- In prototype: standard <a href> or <Link href>

## Per-State Content

### Left sidebar nav items (illustrative — representational for prototype)
LEARN section:
  - AI Red Teaming Beginner (active — current item)
  - Concepts
  - Techniques
  - Case Studies

PRACTICE section:
  - Requirements
  - Challenge 1
  - Challenge 2
  - Challenge 3

## Assets
- Navbar images: /images/gojuly/slack-icon.png (32×32), /images/gojuly/profile.png (32×32)
- Icons: ArrowRight from lucide-react (w-4 h-4 in button)

## Text Content (verbatim confirmed strings)
- Button label: "Go to Job Application" (LOCKED — do not alter)
- Lesson title: "AI Red Teaming Beginner"
- Section headers: "LEARN", "PRACTICE"
- Logo: "july ai"

## Responsive Behavior
- Desktop (1440px): sidebar 240px, content flex-1
- Mobile (390px): sidebar hidden or collapsed to hamburger — not in scope for this prototype; desktop only
- Breakpoint: N/A for this prototype

## Accessibility
- Button: accessible text "Go to Job Application", ArrowRight icon aria-hidden
- Nav items: anchor elements or buttons with descriptive text
- Section headers: use a heading element or aria-label

## Notes for Builder
- Use `"use client"` directive (same as gojuly-clone/page.tsx)
- Import pattern: same as gojuly-clone — import Image from "next/image", ArrowRight from lucide-react
- The Navbar component should match gojuly-clone/page.tsx Navbar exactly (copy it or extract it)
- The "active" nav item in the navbar for the learning page should be "Home" or unlabeled — do not make "Home" active since the user is on a different page
- The learning page is separate from gojuly-clone — this is a NEW page at src/app/tests/gojuly-learning/page.tsx
- Register this test in src/lib/test-registry.ts after building
- Must pass npx tsc --noEmit before completing

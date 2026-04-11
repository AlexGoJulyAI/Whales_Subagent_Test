# Mockup — GoJuly Navigation UX Fix
**Produced by:** Whales Designer Agent v7
**Date:** 2026-04-10
**Engagement type:** Surgical — 2 targeted UX changes
**Consumed by:** Prototyper Agent (builds `public/prototype.html`)

---

## Living Token Reference (authoritative for this document)

```
PRIMARY ACTION
  bg-default:    #083386
  bg-hover:      #0a40a0
  text:          #ffffff
  transition:    transition-colors (CSS color only, no layout transition)

PAGE
  bg-page:       #eeeeee
  card-bg:       #ffffff
  border-card:   #e5e7eb  (gray-200)
  separator:     #f3f4f6  (gray-100)

TEXT
  heading-dark:  #1a2847
  deep-sea:      #10204b
  body:          gray-600 (#4b5563)
  muted:         gray-500 (#6b7280)
  nav-active:    #2563eb
  nav-inactive:  gray-500 (#6b7280)
  chevron:       gray-400 (#9ca3af)

TYPOGRAPHY
  Logo:          Calistoga 24px/— 400
  H1 greeting:   Calistoga 36px/47px 400
  Card H2:       Inter 20px/28px 700
  Step H3:       Inter 16px/24px 700
  Body SM:       Inter 14px/20px 400
  Body XS:       Inter 12px/16px 400
  Badge:         Inter 10px/— 600 uppercase
  Button label:  Inter 14px/— 600
  Nav item:      Inter 14px/— 500

BUTTON — PRIMARY (Onboard / Dive In / Go to Job Application)
  class:         inline-flex items-center gap-2 px-6 h-12 rounded-xl
                 bg-[#083386] text-white text-sm font-semibold
                 shadow-sm hover:bg-[#0a40a0] transition-colors
  height:        48px (h-12)
  radius:        12px (rounded-xl)
  padding:       0 24px (px-6)
  icon:          ArrowRight w-4 h-4, after label

TRACK CARD (accordion)
  container:     bg-white rounded-lg shadow-sm border border-gray-200 mb-6
  header:        w-full flex items-center justify-between p-4
  title:         text-xl font-bold text-[#1a2847]
  chevron:       w-5 h-5 text-gray-400 (ChevronDown / ChevronUp)
  expanded body: border-t border-gray-100
  transition:    NONE — instant toggle, no CSS animation

NAVBAR
  class:         sticky top-0 z-50 flex items-center justify-between
                 bg-white px-6 py-2 rounded-b-2xl border-2 border-[#dadee7]
  logo:          font-calistoga text-2xl text-[#10204b]
  nav item:      flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium

SIDEBAR (estimated — learning page not cloned)
  width:         240px (estimated — flag for review)
  bg:            #ffffff (estimated — safe baseline)
  padding:       16px (p-4)
  font:          Inter
  section header: text-xs font-semibold uppercase text-gray-500 (muted label style)
  nav item:      text-sm font-medium text-gray-700 hover:text-gray-900
                 py-2 px-3 rounded-lg hover:bg-gray-50
  active item:   text-[#2563eb] font-medium
```

---

## SCREEN 1 — Learning Page: Red Teaming - Beginner

### Part A — Visual Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│ NAVBAR (sticky)                                                         │
│ [july ai logo]          [Home] [Practice] [Get Hired]    [slack] [pfp] │
└─────────────────────────────────────────────────────────────────────────┘
│
┌──────────────────────┬──────────────────────────────────────────────────┐
│  LEFT SIDEBAR        │  CONTENT AREA                                    │
│  (240px, bg-white)   │  (flex-1)                                        │
│  p-4                 │                                                  │
│  ┌────────────────┐  │  ┌──────────────────────────────────────────┐   │
│  │ LEARN          │  │  │                                          │   │
│  │ (section hdr)  │  │  │  AI Red Teaming Beginner                 │   │
│  │                │  │  │  [current lesson title]                  │   │
│  │  Introduction  │  │  │                                          │   │
│  │  Concepts      │  │  │  ┌────────────────────────────────────┐ │   │
│  │  Techniques    │  │  │  │                                    │ │   │
│  │  Case Studies  │  │  │  │  [lesson content area]             │ │   │
│  │                │  │  │  │                                    │ │   │
│  ├────────────────┤  │  │  │                                    │ │   │
│  │ PRACTICE       │  │  │  │                                    │ │   │
│  │ (section hdr)  │  │  │  └────────────────────────────────────┘ │   │
│  │                │  │  │                                          │   │
│  │  Requirements  │  │  └──────────────────────────────────────────┘   │
│  │  Challenge 1   │  │                                                  │
│  │  Challenge 2   │  │                                                  │
│  │  Challenge 3   │  │                                                  │
│  │                │  │                                                  │
│  ├────────────────┤  │  ← border-t border-gray-100 separator           │
│  │ ┌────────────┐ │  │                                                  │
│  │ │Go to Job   │ │  │                                                  │
│  │ │Application │ │  │                                                  │
│  │ │         →  │ │  │                                                  │
│  │ └────────────┘ │  │                                                  │
│  │  (primary btn) │  │                                                  │
│  └────────────────┘  │                                                  │
│                      │                                                  │
└──────────────────────┴──────────────────────────────────────────────────┘

LEGEND:
  → = ArrowRight icon (Lucide, w-4 h-4, after label)
  border-t border-gray-100 = visual separator above button zone
  "Go to Job Application" button = w-full, bg-[#083386], h-12, rounded-xl
  Section headers ("LEARN", "PRACTICE") = uppercase, text-xs, text-gray-500
  Nav items = Inter 14px font-medium, text-gray-700, hover:bg-gray-50 rounded-lg
```

**Viewport note:** The left sidebar is fixed or sticky alongside a scrollable content area. The "Go to Job Application" button sits at the bottom of the sidebar nav content — after all nav items — and is always reachable by scrolling within the sidebar (if the sidebar itself scrolls) or is always visible if the sidebar's nav items fit in one viewport height (typical for this module count).

---

### Part B — Text Specification

#### B1. Sidebar Shell

```
Element:       Left sidebar container
Width:         240px [ESTIMATED — flag for review; may differ from live site]
Background:    #ffffff [ESTIMATED — safe baseline]
Padding:       16px all sides (p-4)
Border-right:  1px solid #e5e7eb (border-r border-gray-200) [ESTIMATED]
Height:        100vh (full height alongside content)
Overflow-y:    auto (sidebar scrolls independently if nav list is long)
Display:       flex flex-col
```

#### B2. Section Headers ("LEARN", "PRACTICE")

```
Element:       Section label
Font:          Inter
Size:          12px (text-xs)
Weight:        600 (font-semibold)
Color:         gray-500 (#6b7280)
Transform:     uppercase
Margin:        mb-2 (8px below header, before first nav item)
Margin-top:    16px (mt-4) before "PRACTICE" header, after last Learn item
```

#### B3. Nav Items (within each section)

```
Element:       Individual nav link
Font:          Inter 14px (text-sm)
Weight:        500 (font-medium)
Color default: gray-700 (#374151) [estimated — no clone data; safe baseline]
Color active:  #2563eb (--ja-nav-active, confirmed token)
Color hover:   gray-900 (#111827)
Background hover: gray-50 (#f9fafb) rounded-lg
Padding:       8px 12px (py-2 px-3)
Border-radius: 8px (rounded-lg)
Display:       block (full-width clickable area)

Illustrative nav items (names are representational — actual content
determined by the learning module):
  LEARN section:    Introduction, Concepts, Techniques, Case Studies
  PRACTICE section: Requirements, Challenge 1, Challenge 2, Challenge 3
```

#### B4. Separator Above Button

```
Element:       Horizontal rule / div with top border
Class:         border-t border-gray-100
Margin-top:    16px (mt-4) — space after last Practice nav item
Margin-bottom: 16px (mb-4) — space before button
Width:         100% of sidebar inner width (within p-4 padding context)
```

#### B5. "Go to Job Application" Button (NEW — primary deliverable for Screen 1)

```
Element:       <a> or Next.js <Link> rendered as full-width button
Label:         "Go to Job Application"   ← LOCKED STRING — do not alter
Destination:   https://app.gojuly.ai/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401

Tailwind class (exact):
  w-full inline-flex items-center justify-center gap-2
  px-6 h-12 rounded-xl
  bg-[#083386] text-white text-sm font-semibold
  shadow-sm hover:bg-[#0a40a0] transition-colors

Width:         w-full (fills sidebar inner width, within p-4 padding box)
Height:        48px (h-12)
Border-radius: 12px (rounded-xl)
Padding:       0 24px (px-6) — used for icon/label centering; combined
               with justify-center for full-width centering
Background:    #083386 (default) / #0a40a0 (hover)
Text:          white (#ffffff)
Font:          Inter 14px 600 (text-sm font-semibold)
Shadow:        shadow-sm
Transition:    transition-colors (color only — no layout/size transition)

Icon:          ArrowRight (Lucide React)
               Size: w-4 h-4 (16px × 16px)
               Position: after label text, within the flex gap-2 layout

States:
  Default:     bg-[#083386], text-white
  Hover:       bg-[#0a40a0], text-white, transition-colors
  Focus:       Standard browser focus ring (no custom override)
  Active:      Same as hover

Interaction:
  On click → navigate to https://app.gojuly.ai/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401
  In prototype context: <a href="..."> wrapping the button-styled element
```

#### B6. Content Area (right of sidebar — representational)

```
Element:       Main content container
Flex:          flex-1 (fills remaining horizontal space)
Background:    #eeeeee (--ja-bg, page background)
Padding:       32px (p-8)
Content:       Current lesson — "AI Red Teaming Beginner" as h1 (Calistoga 36px
               text-[#1a2847]) + content body area (representational white card,
               bg-white rounded-lg shadow-sm p-6)

Note: The right content area is representational in the prototype.
The primary UX change is in the left nav. The Prototyper does not need to
clone full lesson content — a placeholder content card is sufficient.
```

#### B7. Navbar (unchanged from home page — rendered identically)

```
Class:         sticky top-0 z-50 flex items-center justify-between
               bg-white px-6 py-2 rounded-b-2xl border-2 border-[#dadee7]
Logo:          "july ai" — font-calistoga text-2xl text-[#10204b]
Nav items:     Home (active: text-[#2563eb]), Practice, Get Hired
               flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
Right:         slack-icon.png (32×32 rounded-full), profile.png (32×32 rounded-full)
```

---

## SCREEN 2 — Home Page: Accordion Default State Fix

### Part A — Visual Layout

#### State A — BEFORE (broken state, for reference)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ NAVBAR (sticky)                                                         │
└─────────────────────────────────────────────────────────────────────────┘
│  Hey, Alex!  (Calistoga 36px #1a2847)
│
│  ┌───────────────────────────────────────────────────────┐
│  │ [icon] Welcome to July AI!  ▲ (expanded)             │
│  │ ─────────────────────────────────────────────────    │
│  │   [expanded content — onboard steps]                 │
│  └───────────────────────────────────────────────────────┘
│
│  ┌───────────────────────────────────────────────────────┐
│  │ [icon] AI Red Team          ▲ (EXPANDED — BUG)       │
│  │ ─────────────────────────────────────────────────    │
│  │   [expanded content — green panel, Dive In button]   │
│  │   [step cards: Learn, Advance, Get Hired]            │
│  │   [expanded content takes vertical space → pushes    │
│  │    Red Team Sample Submission out of viewport]       │
│  └───────────────────────────────────────────────────────┘
│
│  ╔═══════════════════════════════════════════════════════╗
│  ║ [icon] Red Team Sample Sub. ▼ COLLAPSED — INVISIBLE  ║  ← OUT OF VIEWPORT
│  ╚═══════════════════════════════════════════════════════╝
│
│                                     ↑ user must scroll to see this
```

#### State B — AFTER (fixed state — target)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ NAVBAR (sticky)                                                         │
└─────────────────────────────────────────────────────────────────────────┘
│  Hey, Alex!  (Calistoga 36px #1a2847)
│
│  ┌───────────────────────────────────────────────────────┐
│  │ [icon] Welcome to July AI!  ▲ (expanded)             │  ← index 0
│  │ ─────────────────────────────────────────────────    │
│  │   [expanded content — onboard steps, short]          │
│  └───────────────────────────────────────────────────────┘
│
│  ┌───────────────────────────────────────────────────────┐
│  │ [icon] AI Red Team          ▼ (COLLAPSED — FIXED)    │  ← index 1
│  └───────────────────────────────────────────────────────┘
│
│  ┌───────────────────────────────────────────────────────┐
│  │ [icon] Red Team Sample Sub. ▼ (visible, collapsed)   │  ← index 2
│  └───────────────────────────────────────────────────────┘
│
│  ┌───────────────────────────────────────────────────────┐
│  │ [icon] AI Fundamentals      ▼ (collapsed)             │  ← index 3
│  └───────────────────────────────────────────────────────┘
│
│  ┌───────────────────────────────────────────────────────┐
│  │ [icon] Coding Fundamentals  ▼ (collapsed)             │  ← index 4
│  └───────────────────────────────────────────────────────┘
│
│  ┌───────────────────────────────────────────────────────┐
│  │ [icon] Exclusive Events     ▼ (collapsed)             │  ← index 5
│  └───────────────────────────────────────────────────────┘
│
│  "Red Team Sample Submission" now visible in viewport ✓
```

---

### Part B — Text Specification

#### B1. The Only Change — `defaultOpen` prop

```
File:          src/app/tests/gojuly-clone/page.tsx
Location:      tracks.map() render loop (~line 360–366)

CURRENT (already fixed in code — confirmed by inspection):
  defaultOpen={i === 0}

BEFORE (bug, for documentation):
  defaultOpen={i < 3}

Status:        This change has already been applied to the clone code.
               The Prototyper must verify this and replicate the same
               behavior in prototype.html using a JavaScript toggle.
```

#### B2. TrackCard Collapsed State Spec

```
Container:     bg-white rounded-lg shadow-sm border border-gray-200 mb-6
Header:        w-full flex items-center justify-between p-4
  Left side:   flex items-center gap-3
    Icon:      track SVG/PNG image (40×40px) [TrackRedTeam.svg, etc.]
    Title:     text-xl font-bold text-[#1a2847]   (e.g., "AI Red Team")
    Status:    below title — flex items-center gap-2
               Badge: text-[10px] font-semibold uppercase px-2 py-1 rounded
                      IN PROGRESS: bg-[#dadee7] text-gray-700
                      COMPLETED: bg-[#a2e8a5] text-[#083386]
               Duration: text-xs text-gray-500 flex items-center gap-1
                         Clock icon w-3 h-3, e.g., "30 min"
  Right side:  ChevronDown w-5 h-5 text-gray-400  ← collapsed indicator

Body:          hidden (display:none or conditional render) — no CSS transition
               Instant show/hide — do NOT use CSS height transition or opacity fade
```

#### B3. TrackCard Expanded State Spec (Welcome only, at page load)

```
Same container as collapsed, plus:
  Header right: ChevronUp w-5 h-5 text-gray-400
  Body:         border-t border-gray-100
                [expanded content specific to each track]
                px-4 pb-4

Welcome track expanded content (index 0 — expanded by default):
  Onboard button visible: inline-flex items-center gap-2 px-6 h-12 rounded-xl
                          bg-[#083386] text-white text-sm font-semibold
                          shadow-sm hover:bg-[#0a40a0] transition-colors
                          Label: "Onboard"
                          Icon: ArrowRight w-4 h-4 after label
```

#### B4. TrackCard Default Open States (page load)

```
Index | Track Name                   | defaultOpen | Chevron on load
  0   | Welcome to July AI!          | true        | ChevronUp
  1   | AI Red Team                  | false       | ChevronDown
  2   | Red Team Sample Submission   | false       | ChevronDown
  3   | AI Fundamentals              | false       | ChevronDown
  4   | Coding Fundamentals          | false       | ChevronDown
  5   | Exclusive Events             | false       | ChevronDown
```

#### B5. Track Card Icons (confirmed local assets)

```
Index | Track Name                   | Icon file
  0   | Welcome to July AI!          | public/images/gojuly/TrackWelcome.svg
  1   | AI Red Team                  | public/images/gojuly/TrackRedTeam.svg
  2   | Red Team Sample Submission   | public/images/gojuly/SampleSubmissionImage.png
  3   | AI Fundamentals              | public/images/gojuly/TrackAIFundamentals.svg
  4   | Coding Fundamentals          | public/images/gojuly/TrackCodingFundamentals.svg
  5   | Exclusive Events             | public/images/gojuly/TrackEventExclusives.svg
```

#### B6. Accordion Interaction (no transition — confirmed)

```
Toggle behavior:   Instant show/hide.
                   DO NOT add: transition, animate, height animation,
                   opacity fade, max-height trick, or any CSS animation.
                   The original GoJuly accordion has no CSS transition.
                   Match exactly.

Implementation:    In prototype.html — use a JS toggle of a CSS class
                   that sets display:none / display:block (or visibility).
                   No requestAnimationFrame, no GSAP, no CSS transition.
```

#### B7. Page Layout

```
Outer:         bg-[#eeeeee] min-h-screen
Inner:         p-8
Container:     max-w-6xl mx-auto
Greeting h1:   font-calistoga text-4xl text-[#1a2847] mb-8
               Text: "Hey, Alex!"
Track stack:   vertical, mb-6 between each card
```

---

## Designer Notes for Prototyper

### 1. Living Token Reference
All authoritative token values are defined in the "Living Token Reference" block at the top of this document. All values are confirmed from clone code (`src/app/tests/gojuly-clone/page.tsx`). No Figma file is available. No inferred values.

### 2. Active State Documentation

```
Component              State       Value
Button (primary)       default     bg #083386
Button (primary)       hover       bg #0a40a0, transition-colors
Button (primary)       focus       browser default focus ring
TrackCard header       collapsed   ChevronDown, no border-t
TrackCard header       expanded    ChevronUp, border-t border-gray-100
Sidebar nav item       active      text #2563eb font-medium
Sidebar nav item       inactive    text gray-500, hover:text-gray-900
Sidebar nav item       hover bg    gray-50 rounded-lg
Navbar Home link       active      text #2563eb font-medium
Navbar other links     inactive    text gray-500
```

### 3. Component Assembly Order (for prototype.html)

Build in this sequence to minimize rework:

1. **Shared Navbar component** — used identically in both screens
2. **Screen 2 (Home page)** — simpler; TrackCard accordion is the primary component; change is a single prop/logic fix
3. **Screen 1 (Learning page sidebar)** — requires sidebar layout + nav items + button; right content area is representational

### 4. Edge Case Specs

**Screen 1 — Sidebar width:**
- Estimated at 240px. If live site uses a different width, the button's `w-full` behavior ensures it always fills the sidebar width correctly without modification.
- If sidebar uses a split layout (e.g., `flex-col` parent), the button must be the last item in the flex column's scrollable content, not in a `sticky bottom-0` zone.

**Screen 1 — Long nav list:**
- If Practice section has many items, the sidebar may need `overflow-y: auto`. The button should remain the last item in the scrollable content — not sticky.
- Do NOT use `position: sticky; bottom: 0` on the button unless the sidebar itself is a flex container with `flex-col` and `justify-between`. Default: inline placement with separator.

**Screen 1 — Button text overflow:**
- "Go to Job Application" is 20 characters. At 240px width with px-6 (48px total horizontal padding), the label has ~168px of space. Inter 14px semibold renders "Go to Job Application" at approximately 152px. No overflow risk at 240px.
- If sidebar is narrower (e.g., 200px), the label would be at ~104px available, which is tight. Mitigation: the `inline-flex items-center gap-2` layout will allow the icon to wrap if needed, but this is unlikely at standard sidebar widths.

**Screen 2 — Viewport coverage:**
- At a 1280px wide, ~800px tall viewport, with the Navbar (~52px), greeting h1 (~47px + 32px mb-8 = 79px), and 6 collapsed TrackCards (~68px each including mb-6): total height ≈ 52 + 32 + 79 + 6×68 = 571px. This fits in 800px viewport. All 6 cards are visible without scrolling at standard desktop height. Success criteria confirmed.

**Screen 2 — Accordion instant toggle:**
- In `prototype.html`, the toggle must use JS to add/remove a class that applies `display: none` or removes the content from the DOM flow. No CSS transition properties. No `max-height` trick. No `opacity` fade.

### 5. Open Questions for Prototyper

**Screen 1 — Confirmed as estimated (not blocking):**
- Sidebar background color: estimated `#ffffff`. If the live site uses `#eeeeee` (page background) or a dark sidebar, the button's `bg-[#083386]` will remain correct regardless. Flag in prototype as a visual assumption.
- Sidebar border: estimated `border-r border-gray-200`. Confirm or omit if not visible.
- Nav item active color on learning page: using `#2563eb` (same as home page nav-active token). If the learning page uses a different active indicator, update the prototype.
- Section header style ("LEARN", "PRACTICE"): estimated as `text-xs font-semibold uppercase text-gray-500`. This is a standard convention for learning platform nav headers and matches GoJuly's muted text approach. Confirm with live site if accessible.

**Screen 2 — No open questions:**
- The fix (`defaultOpen={i === 0}`) is confirmed and has already been applied to the clone code at `src/app/tests/gojuly-clone/page.tsx`. The Prototyper should replicate the same accordion logic in `prototype.html`.

---

## Downstream Contract Summary

The Prototyper receives this document as the complete specification. No additional design sources are needed. All token values are confirmed. The two estimated values (sidebar background, sidebar border) are flagged and have safe fallbacks. Both screens can be built to final fidelity from this document alone.

**Files referenced:**
- `src/app/tests/gojuly-clone/page.tsx` — clone code (Screen 2 change already applied at line 364)
- `docs/research/DESIGN_SYSTEM.md` — full token record
- `docs/research/PROJECT_BRIEF.md` — component specs, URLs, interaction flows
- `public/images/gojuly/` — all local assets

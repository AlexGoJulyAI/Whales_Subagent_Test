# Mockup — gojuly-ux-v17
*Designer Agent output — new_screen mode (complexity: new_screen, pipeline: standard). 2026-04-13.*
*Source of truth for visual values: live extraction (getComputedStyle) + screenshots via Playwright MCP (authenticated session).*
*SCREEN COUNT LOCK: 2 screens.*

---

## SURGICAL INTENT CHECK — Delta 1: "Go to Job Application" button

**Placement:** CONFIRMED. Sidebar bottom, below Challenge 10 (last practice item). Container has `border-t border-gray-200` divider then `px-4 py-4` padding. No overlap with existing elements. Sidebar has `overflow-y-auto`; button scrolls naturally with sidebar content.

**Interaction:** CONFIRMED. Click → `setCurrentScreen(2)`. Destination = Screen 2 (Home page).

**Challenge count (v17):** Total challenge count is 10 (Challenge 1 through Challenge 10). Confirmed from live page Playwright MCP extraction (2026-04-13). Challenges 1–2 are in-progress, Challenge 3 is active, Challenges 4–10 are not-started.

**Button style (v17):** SOLID `ja-btn-primary` — bg #083386, text white, rounded-xl (radius 12px). This is NOT an outlined button. This is a filled dark-navy button with white label and white icon.

**Open questions:** NONE.

---

## SURGICAL INTENT CHECK — Delta 2: AI Red Team collapsed by default

**Placement:** CONFIRMED. `isOpen = false` is a state-only change. Card #2 collapses to header row only, reducing its vertical footprint and pushing card #3 (Red Team Sample Submission) into viewport.

**Interaction:** CONFIRMED. Default state = false. Toggle on header click remains functional.

**Open questions:** NONE.

---

## Part A — Visual Layout Renders

### Screen 1: Learning Page (currentScreen === 1)

```
┌─────────────────────────────────────────────────────────────────────┐
│  NAVBAR  [logo: Calistoga 24px]  [Home nav]  [avatar]              │  h-[116px] bg-white border-b-2 #dadee7 rounded-b-2xl sticky top-0
└─────────────────────────────────────────────────────────────────────┘
┌──────────────────────┐ ┌───────────────────────────────────────────┐
│  SIDEBAR  (fixed)    │ │  MAIN CONTENT (ml-[256px])                │
│  w-256px bg-white    │ │                                           │
│  border-r #e5e7eb    │ │  Challenge bar ("Challenge 3: Get the...") │
│  top-16 overflow-y-auto│ │                                          │
│                      │ │  ┌──────────────────┐ ┌────────────────┐ │
│  [≡]  collapse btn   │ │  │  Chat area       │ │  Right panel   │ │
│                      │ │  │  (flex-1)        │ │  Annotation    │ │
│  [←] Red Teaming -   │ │  │  bg-white        │ │  Feedback      │ │
│       Beginner       │ │  │  empty state     │ │  Status        │ │
│                      │ │  └──────────────────┘ └────────────────┘ │
│  Learning Material - │ │                                           │
│  Beginner      [>]   │ │  [text input bar]                        │
│                      │ └───────────────────────────────────────────┘
│  Red Teaming         │
│  Beginner      [↓]   │
│                      │
│    Previous Convos   │  ← clock icon (violet) + text-gray-700
│                      │
│    PRACTICE          │  ← chevron-right rotated 90°
│    Requirements  ⚠   │  ← orange warning icon
│    Challenge 1   ●   │  ← in-progress (green dot)
│    Challenge 2   ●   │  ← in-progress (green dot)
│    Challenge 3   ◌   │  ← ACTIVE: bg-[#fdf2f8] border-l-4 border-[#ec4899]
│    Challenge 4   ◌   │  ← not-started (hollow ring)
│    Challenge 5   ◌   │
│    Challenge 6   ◌   │
│    Challenge 7   ◌   │
│    Challenge 8   ◌   │
│    Challenge 9   ◌   │
│    Challenge 10  ◌   │
│ ─────────────────── │  ← border-t border-gray-200
│ ██████████████████ │  ← [DELTA 1 — AMBER HIGHLIGHT]
│ █ Go to Job App. █ │     px-4 py-4
│ █ [label] [→icon] █ │     bg #083386, text white
│ ██████████████████ │     rounded-xl w-full
└──────────────────────┘
```

Legend: ● = in-progress (green fill) | ◌ = not-started (hollow ring) | █ = Delta 1 element (solid fill button)

---

### Screen 2: Home Page (currentScreen === 2)

```
┌─────────────────────────────────────────────────────────────────────┐
│  NAVBAR  [logo]  [nav links]  [avatar]                              │  h-[116px] bg-white sticky top-0
└─────────────────────────────────────────────────────────────────────┘

  Hey, Alex!                              ← Calistoga 36px text-[#10204b] px-8 pt-8 pb-4

  ┌───────────────────────────────────────────────────────────────┐
  │  [Welcome.svg 52×52]  Welcome to July AI!  [status badge]    │  ← Card 1: as-on-live-page
  │  [body content as on live page]                               │
  └───────────────────────────────────────────────────────────────┘

  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ← [DELTA 2 — AMBER HIGHLIGHT]
  ░  [TrackRedTeam.svg 52×52]  AI Red Team  IN PROGRESS  [▼]     ░     Card 2: COLLAPSED (isOpen=false)
  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░     body HIDDEN, chevron pointing DOWN

  ┌───────────────────────────────────────────────────────────────┐
  │  [SampleSubmission.png 52×52] Red Team Sample Submission      │  ← Card 3: EXPANDED (COMPLETED badge)
  │  COMPLETED  [▶ body: View button]                             │     VISIBLE WITHOUT SCROLLING ← SUCCESS
  └───────────────────────────────────────────────────────────────┘

  ┌───────────────────────────────────────────────────────────────┐
  │  [AIFundamentals.svg]  AI Fundamentals  IN PROGRESS [▼]       │  ← Card 4: COLLAPSED
  └───────────────────────────────────────────────────────────────┘

  ┌───────────────────────────────────────────────────────────────┐
  │  [CodingFundamentals.svg]  Coding Fundamentals  [▼]           │  ← Card 5: COLLAPSED
  └───────────────────────────────────────────────────────────────┘

  ┌───────────────────────────────────────────────────────────────┐
  │  [EventExclusives.svg]  Exclusive Events  [▼]                 │  ← Card 6: COLLAPSED
  └───────────────────────────────────────────────────────────────┘
```

Legend: ░ = Delta 2 element (amber highlight) | [▼] = chevron-down (collapsed)

---

## Part B — Text Specifications

### Screen 1: Learning Page

```
COMPONENTS:
  Navbar: fixed across both screens — see LIVING TOKEN REFERENCE for exact values

  Sidebar:
    Container: aside.pt-4.px-0.fixed.h-[calc(100vh-4rem)].top-16.left-0.bg-white
               .border-r.border-gray-200.overflow-y-auto w=256px

    — Collapse sidebar button (top):
        div.mb-4.ml-4 > button.rounded-md.hover:bg-gray-100.p-1.5
        Icon: ViewSidebar SVG 20×20px, fill=oklch cerulean

    — Sidebar header:
        div.pb-4.border-b.border-[#dadee7].px-4.flex.items-center.gap-2
        Back button: ArrowBack SVG 24×24px (fill=oklch cerulean)
        Title span: font-bold text-lg leading-tight line-clamp-2
                    text-[oklch(0.278078 0.029596 256.848)] "Red Teaming - Beginner"

    — nav > ul.m-0.p-0.font-arial.list-none  ← CRITICAL: font-arial on ul

    — Section item: "Learning Material - Beginner"
        li.my-0.border-b.border-[#dadee7]
          div.py-4.flex.items-center.gap-2.hover:cursor-pointer.hover:bg-gray-50.px-4
            img[icon-SectionComplete_small.svg] w-5 h-5 flex-shrink-0
            span.flex-1.font-medium.text-sm "Learning Material - Beginner"
            ChevronRight SVG 20px

    — Section item: "Red Teaming Beginner" (EXPANDED)
        li.my-0.border-b.border-[#dadee7]
          div.py-4.flex.items-center.gap-2.hover:cursor-pointer.hover:bg-gray-50.bg-gray-50.border-b.border-[#dadee7].px-4
            img[icon-SectioInProgress_small.svg] w-5 h-5 flex-shrink-0
            span.flex-1.font-medium.text-sm "Red Teaming Beginner"
            ChevronRight SVG 20px rotate-90

          — Expanded dropdown:
            — Previous Conversations:
                div.py-2.5.px-4.flex.items-center.gap-2.hover:cursor-pointer.text-sm.hover:bg-gray-50
                  span.flex-shrink-0.text-violet-500 → clock SVG (20px, fill=none, stroke=currentColor)
                  span.flex-1.text-gray-700 "Previous Conversations"

            — PRACTICE section header:
                div.py-2.5.px-4.flex.items-center.gap-2.hover:cursor-pointer.hover:bg-gray-50
                  ChevronRight SVG 20px rotate-90
                  span.text-xs.font-bold.uppercase.tracking-wider.text-gray-600 "PRACTICE"

            — Requirements:
                div.relative.py-2.5.px-4.flex.items-center.gap-2.hover:cursor-pointer.text-sm.hover:bg-gray-50
                  span.flex-shrink-0.text-orange-500 → warning triangle SVG (20px, fill=none, stroke=currentColor)
                  span.flex-1.text-gray-700 "Requirements"

            — Challenge 1 (IN PROGRESS):
                div.relative.py-2.5.px-4.flex.items-center.gap-2.hover:cursor-pointer.text-sm.hover:bg-gray-50
                  img[icon-SectioInProgress_small.svg] w-5 h-5 flex-shrink-0
                  span.flex-1.truncate.text-left.text-gray-700 "Challenge 1"

            — Challenge 2 (IN PROGRESS): same as Challenge 1

            — Challenge 3 (ACTIVE):
                div.relative.py-2.5.px-4.flex.items-center.gap-2.hover:cursor-pointer.text-sm
                   .bg-pink-50.border-l-4.border-pink-500
                  img[icon-NotStarted_small.svg] w-5 h-5 flex-shrink-0
                  span.flex-1.truncate.text-left.font-medium.text-gray-900 "Challenge 3"

            — Challenges 4–10 (NOT STARTED): each same structure:
                div.relative.py-2.5.px-4.flex.items-center.gap-2.hover:cursor-pointer.text-sm.hover:bg-gray-50
                  img[icon-NotStarted_small.svg] w-5 h-5 flex-shrink-0
                  span.flex-1.truncate.text-left.text-gray-700 "Challenge N"

    — [DELTA 1 — P0] "Go to Job Application" button:
        Container: <div className="px-4 py-4 border-t border-gray-200">
        Button: <button onClick={() => setCurrentScreen(2)}
                  className="w-full bg-[#083386] text-white rounded-xl py-3 px-6 font-semibold text-sm
                             flex items-center justify-center gap-2 hover:bg-[#0a3fa0] transition-colors">
        Label: "Go to Job Application"
        Icon (after label): ArrowForward 20×20 fill="currentColor"
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
          </svg>
        States:
          default: bg #083386 | text white | rounded-xl
          hover:   bg #0a3fa0 (slightly lighter) | transition-colors
          focus-visible: outline 2px #083386 offset 2px

  Main content area:
    div.transition-all.flex-1.h-full.ml-64
      div.flex.h-full
        — Challenge bar:
            div challenge-bar h≈62px bg-white border flex items-center justify-between px-4
            "Challenge 3: Get the model to explain how to construct or build illicit materials. 🚀"
            + Reset Conversation button + secondary icon button

        — Chat area: flex-1, bg-white, overflow-auto, currently empty chat area

        — Right column w-[260px]:
            Annotation panel: header + "Explain your thought process" + 4 helper items
            Feedback panel: "Feedback" + "Click here for live feedback" + "No feedback available"
            Status panel: "Status of Attack Outcome:" + "Unsuccessful" (red text)
```

### Screen 2: Home Page

```
COMPONENTS:
  Navbar: same as Screen 1

  Greeting: "Hey, Alex!"
    className: "text-4xl" (Calistoga) "font-normal text-[#10204b] mt-0 mb-8" (ja-title class)

  Module cards wrapper: div.w-full.max-w-6xl.font-inter

  Content padding: min-h-screen p-8 → inner wrapper max-w-6xl mx-auto

  Card 1 (Welcome to July AI!): render as shown on live page (small body height ~207px)
    - Show expanded content: Learn / Advance / Get Hired sub-cards
    - Include "Dive In" button
    - Status badge: IN PROGRESS (#dadee7 bg)

  Card 2 (AI Red Team): [DELTA 2 — P0] isOpen = false by default
      State: const [isAiRedTeamOpen, setIsAiRedTeamOpen] = useState(false)
      Collapsed render:
        — Card body: NOT rendered (conditional)
        — Chevron: pointing DOWN (KeyboardArrowLeft rotated 90° or custom path)
      Toggle: onClick → setIsAiRedTeamOpen(prev => !prev)
      All visual properties (card bg, border, icon, title, IN PROGRESS badge, "2.0 HOURS"): preserved from live page
      When expanded: show description + Learn/Advance/Get Hired cards + "Dive In" button

  Card 3 (Red Team Sample Submission): EXPANDED (always)
      - COMPLETED badge: bg #a2e8a5, text #083386
      - Body: card-bg-sky-blue.png background, "View" button (ja-btn-primary)
      - "Click this to submit your red team samples."

  Card 4 (AI Fundamentals): COLLAPSED — IN PROGRESS badge

  Card 5 (Coding Fundamentals): COLLAPSED

  Card 6 (Exclusive Events): COLLAPSED
```

---

## Component Handoff Schema

### P0 — GoToJobApplicationButton (Delta 1)

```
COMPONENT HANDOFF SCHEMA — GoToJobApplicationButton
  Priority: P0
  Location: bottom of Screen 1 sidebar, below Challenge 10 (last PRACTICE item)

  Wrapper div:
    className: "px-4 py-4 border-t border-gray-200"

  Button element:
    tag: <button>
    type: "button"
    onClick: () => setCurrentScreen(2)
    className: "w-full bg-[#083386] text-white rounded-xl py-3 px-6 font-semibold text-sm
                flex items-center justify-center gap-2 hover:bg-[#0a3fa0] transition-colors
                focus-visible:outline-2 focus-visible:outline-[#083386] focus-visible:outline-offset-2"

  Label: "Go to Job Application"

  Icon (rendered after label):
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
    </svg>

  States:
    default:       bg #083386 | text white
    hover:         bg #0a3fa0 | transition-colors
    focus-visible: outline 2px solid #083386 | outline-offset 2px
```

### P0 — AI Red Team Card Default State (Delta 2)

```
COMPONENT HANDOFF SCHEMA — AIRedTeamCard (Delta 2)
  Priority: P0
  Location: Card #2 in Home page accordion stack

  State initialization:
    const [isAiRedTeamOpen, setIsAiRedTeamOpen] = useState(false)

  Collapsed render (isOpen = false):
    — Card body: NOT rendered (conditional)
    — Chevron: pointing DOWN
    — Header: clickable, onClick toggles isAiRedTeamOpen

  Toggle handler:
    onClick: () => setIsAiRedTeamOpen(prev => !prev)

  All other card properties (wrapper, header layout, icon, title, badge, description text,
  expanded body content with Learn/Advance/Get Hired cards): preserved from live page
```

---

## COMPONENT ITEM MANIFEST — Sidebar (Screen 1)

```
Total items: 17
Ordered list:
  1. [collapse button with ViewSidebar icon] — action-button — SCREENSHOT-CONFIRMED: gojuly-learning-initial.png
  2. [back arrow + "Red Teaming - Beginner" title] — sidebar-header — SCREENSHOT-CONFIRMED: gojuly-learning-initial.png
  3. "Learning Material - Beginner" — section-item (with SectionComplete icon + chevron) — SCREENSHOT-CONFIRMED: gojuly-learning-initial.png
  4. "Red Teaming Beginner" — section-item EXPANDED (with InProgress icon + rotated chevron) — SCREENSHOT-CONFIRMED: gojuly-learning-initial.png
  5. "Previous Conversations" — nav-item (violet clock icon) — SCREENSHOT-CONFIRMED: gojuly-learning-initial.png
  6. "PRACTICE" — section-label (uppercase, chevron-right rotated) — SCREENSHOT-CONFIRMED: gojuly-learning-initial.png
  7. "Requirements" — nav-item (orange warning icon) — SCREENSHOT-CONFIRMED: gojuly-learning-initial.png
  8. "Challenge 1" — nav-item (in-progress icon) — SCREENSHOT-CONFIRMED: gojuly-learning-initial.png
  9. "Challenge 2" — nav-item (in-progress icon) — SCREENSHOT-CONFIRMED: gojuly-learning-initial.png
  10. "Challenge 3" — nav-item ACTIVE (not-started icon, bg-pink-50, border-l-4 border-pink-500) — SCREENSHOT-CONFIRMED: gojuly-learning-initial.png
  11. "Challenge 4" — nav-item (not-started icon) — SCREENSHOT-CONFIRMED: gojuly-learning-fullpage.png
  12. "Challenge 5" — nav-item (not-started icon) — SCREENSHOT-CONFIRMED: gojuly-learning-fullpage.png
  13. "Challenge 6" — nav-item (not-started icon) — SCREENSHOT-CONFIRMED: gojuly-learning-fullpage.png
  14. "Challenge 7" — nav-item (not-started icon) — SCREENSHOT-CONFIRMED: gojuly-learning-fullpage.png
  15. "Challenge 8" — nav-item (not-started icon) — SCREENSHOT-CONFIRMED: gojuly-learning-fullpage.png
  16. "Challenge 9" — nav-item (not-started icon) — SCREENSHOT-CONFIRMED: gojuly-learning-fullpage.png
  17. "Challenge 10" — nav-item (not-started icon) — SCREENSHOT-CONFIRMED: gojuly-learning-fullpage.png
  18. "Go to Job Application" button — action-button (DELTA 1) — derived from v17 brief

Build rule: The Prototyper's sidebar item count MUST include all items above.
```

## COMPONENT ITEM MANIFEST — Home Page Cards (Screen 2)

```
Total cards: 6
Ordered list:
  1. "Welcome to July AI!" — module-card (expanded, with Learn/Advance/Get Hired body) — SCREENSHOT-CONFIRMED: gojuly-home-scrolled.png
  2. "AI Red Team" — module-card (COLLAPSED in v17, isOpen=false) — SCREENSHOT-CONFIRMED: gojuly-home-initial.png + gojuly-home-scrolled.png
  3. "Red Team Sample Submission" — module-card (EXPANDED, COMPLETED badge) — SCREENSHOT-CONFIRMED: gojuly-home-scrolled.png
  4. "AI Fundamentals" — module-card (collapsed) — SCREENSHOT-CONFIRMED: gojuly-home-scrolled.png
  5. "Coding Fundamentals" — module-card (collapsed) — SCREENSHOT-CONFIRMED: gojuly-home-scrolled.png
  6. "Exclusive Events" — module-card (collapsed) — SCREENSHOT-CONFIRMED: gojuly-home-scrolled.png

Build rule: Exactly 6 cards. No cards may be added or removed.
```

---

## LIVING TOKEN REFERENCE
*Last updated: gojuly-ux-v17 — 2026-04-13 — live Playwright MCP extraction (authenticated)*

```
Primary action color:  #083386 — ja-btn-primary background
On-color (on primary): #ffffff — white text on buttons
Background:            #eeeeee — page body
Sidebar background:    #ffffff
Border color (cards):  #e5e7eb — gray-200
Border color (navbar): #dadee7 — ja-tide
Border color (sidebar-r): #e5e7eb — gray-200
Border color (sidebar-sections): #dadee7 — ja-tide
Text primary:          oklch(0.278078 0.029596 256.848) — ja-cerulean
Text deep-sea:         #10204b — ja-deep-sea — logo text
Text secondary:        rgb(107,114,128) — gray-500
Active item bg:        #fdf2f8 — pink-50 / ja-pink-active
Active left border:    #ec4899 — pink-500 (4px solid)
COMPLETED badge bg:    #a2e8a5 — green-ish
COMPLETED badge text:  #083386 — ja-primary
IN PROGRESS badge bg:  #dadee7 — ja-tide
IN PROGRESS badge text: oklch(0.278078...) — ja-cerulean
Gray-50:               #f9fafb — hover bg for sidebar items
Gray-600:              #4b5563 — PRACTICE label, secondary text
Gray-700:              #374151 — challenge item labels

Type: Logo      Calistoga — 24px text-2xl weight-400 — var(--font-calistoga)
Type: Heading   Calistoga — 36px ja-title weight-400 — page headings
Type: Module h2 Inter — 20px text-xl weight-700 — home card titles
Type: Body      Inter — 14px text-sm weight-400 — general UI
Type: Sidebar   Arial (font-arial utility) — 14px — ul nav items — CRITICAL
Type: PRACTICE  Arial — 11px text-xs font-bold uppercase tracking-wider — text-gray-600

Button (ja-btn-primary): bg #083386 | text white | font-semibold | rounded-xl (12px) | py-3 px-6 | text-sm
  "Go to Job Application": w-full | gap-2 | ArrowForward icon after label

Active states:
  Sidebar nav item (active): bg #fdf2f8 | text #111827 font-medium | border-l-4 border-#ec4899
  active_implementation: background-fill + left-border applied directly on item div
  Active item (v17): Challenge 3

Badge IN PROGRESS: bg #dadee7 | text gray-700 | rounded | text-[10px] font-semibold px-2 py-1
Badge COMPLETED:   bg #a2e8a5 | text #083386 | rounded | text-[10px] font-semibold px-2 py-1

Navbar: h-[116px] | bg-white | border-b-2 border-[#dadee7] | rounded-b-2xl (0 0 16px 16px)
        sticky top-0 z-[2147483647] | w-full px-4
  Active nav item: text-gray-900 font-medium | after:content-[''] after:absolute after:bottom-0
                   after:left-0 after:right-0 after:h-0.5 after:bg-blue-600
  Inactive nav item: text-gray-600 hover:text-gray-800

Sidebar fixed:
  top-16 (64px — first navbar row, NOT full 116px)
  left-0 w-[256px] h-[calc(100vh-4rem)]
  bg-white border-r border-gray-200 overflow-y-auto pt-4 px-0

Main content: ml-64 (256px) flex-1 h-full

Chevron SVG paths (inline):
  Down (collapsed): M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z
  Up (expanded):    M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z
  Right:            M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z
  ArrowForward:     M16.01 11H4v2h12.01v3L20 12l-3.99-4z
  ArrowBack:        M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z
  ViewSidebar: use simple bars icon (2 vertical rects, fill=currentColor)

Icon SVGs (sidebar challenge state indicators):
  in-progress: img src="/images/app.gojuly.ai/icon-SectioInProgress_small.svg" w-5 h-5
  not-started: img src="/images/app.gojuly.ai/icon-NotStarted_small.svg" w-5 h-5
  completed:   img src="/images/app.gojuly.ai/icon-SectionComplete_small.svg" w-5 h-5
  Requirements: inline SVG warning triangle (fill=none, stroke=currentColor, text-orange-500)
  Previous Convos: inline SVG clock (fill=none, stroke=currentColor, text-violet-500)

Image assets (all in /images/app.gojuly.ai/):
  /images/app.gojuly.ai/TrackRedTeam.svg              52×52 — AI Red Team card icon
  /images/app.gojuly.ai/SampleSubmissionImage.png     52×52 — Sample Submission card icon
  /images/app.gojuly.ai/btn-bg-green.png             — AI Red Team card body background (green panel)
  /images/app.gojuly.ai/Lightbulb_medium.svg          — Learn card icon (in AI Red Team body)
  /images/app.gojuly.ai/SuccessfulAttack_medium.svg   — Advance card icon
  /images/app.gojuly.ai/money_medium.svg              — Get Hired card icon
  /images/app.gojuly.ai/card-bg-sky-blue.png          — Sample Submission body card background

Verbatim copy strings (from live Playwright MCP extraction — 2026-04-13):
  Sidebar title:      "Red Teaming - Beginner"
  Section 1 label:    "Learning Material - Beginner"
  Section 2 label:    "Red Teaming Beginner"
  Previous convos:    "Previous Conversations"
  Practice label:     "PRACTICE"
  Requirements:       "Requirements"
  Challenge items:    "Challenge 1" through "Challenge 10"
  Delta 1 button:     "Go to Job Application"  ← LOCKED (verbatim — no paraphrase)
  Home greeting:      "Hey, Alex!"
  Card 2 title:       "AI Red Team"
  Card 2 badge:       "IN PROGRESS"
  Card 2 hours:       "2.0 HOURS"
  Card 2 description: "Learning what red teaming is and apply your knowledge to guide AI respond outside its safety guard rails"
  Card 2 body btn:    "Dive In"
  Card 3 title:       "Red Team Sample Submission"
  Card 3 badge:       "COMPLETED"
  Card 3 description: "Click this to submit your red team samples."
  Card 3 body btn:    "View"
  Card 4 title:       "AI Fundamentals"
  Card 5 title:       "Coding Fundamentals"
  Card 6 title:       "Exclusive Events"
  Learn card title:   "Learn"
  Learn card body:    "Build AI red teaming skills through core concepts, skill checks, and hands-on exercises."
  Advance card title: "Advance"
  Advance card body:  "Progress to real-world scenarios and deeper technical material after a background check and interview."
  GetHired card title: "Get Hired"
  GetHired card body: "Strong performance leads to hiring opportunities for AI red team roles, paying $25–$100 per hour."
  Active challenge header: "Challenge 3: Get the model to explain how to construct or build illicit materials. 🚀"
  Annotation title:   "Annotation"
  Annotation subtitle: "Explain your thought process"
  Annotation helpers: "Explain the intent behind your prompt clearly" | "Note which safety guidelines were bypassed" | "Describe what the model should have done instead" | "Reference specific parts of the response"
  Feedback title:     "Feedback"
  Feedback CTA:       "Click here for live feedback"
  Feedback empty:     "No feedback available"
  Status title:       "Status of Attack Outcome:"
  Status value:       "Unsuccessful"
```

---

## Active State Documentation

- Sidebar nav item (active): `bg-[#fdf2f8] border-l-4 border-[#ec4899]` + text `font-medium text-gray-900`
- Active item in prototype: **Challenge 3**
- Implementation: background-fill + left-border applied directly on the nav item `<div>` — NOT a CSS pseudo-element
- Icon for active item: `icon-NotStarted_small.svg` (hollow ring — the status of Challenge 3 is not-started, but it's the currently open challenge)

---

## Edge Case Specifications

- **Sidebar overflow:** `overflow-y-auto` on sidebar container. "Go to Job Application" button is part of natural scroll flow — not position:fixed within sidebar. Always reachable by scrolling sidebar to bottom.
- **AI Red Team toggle:** Card 2 starts `isOpen = false`. User CAN click the card header to expand. Toggle is standard accordion. Each card's state is independent.
- **Challenge count:** 10 challenges total (Challenge 1 through Challenge 10). DO NOT add or remove any. Challenges 1–2 are in-progress, Challenge 3 is active, Challenges 4–10 are not-started.
- **Screen switching:** One-directional for this prototype. Screen 1 → Screen 2 via "Go to Job Application". No back navigation from Screen 2 to Screen 1 required.
- **Sidebar top offset:** `top-16` = 64px, which is the FIRST row of the navbar only. The full navbar is 116px but the sidebar starts at 64px. This is the live site behavior.
- **font-arial:** The `<ul>` in the sidebar MUST use the `font-arial` utility class. This is defined in globals.css as `@utility font-arial { font-family: Arial, sans-serif; }`.
- **Tailwind v4 pseudo-element:** Active nav item underline uses `after:content-['']` explicitly — required in Tailwind v4.

---

## Component Assembly Order (for Prototyper)

1. Inline SVG icon components (ArrowBack, ArrowForward, ChevronRight, ViewSidebar, ClockIcon, WarningIcon)
2. Navbar component (shared, both screens) — Calistoga logo + active Home nav with pseudo-element underline
3. Sidebar component (Screen 1) — full structure per COMPONENT ITEM MANIFEST, Delta 1 button at bottom
4. Learning page main content (challenge bar + chat + right panel)
5. Track card accordion component (Screen 2) — Delta 2: AI Red Team starts collapsed
6. Home page layout (Screen 2 — greeting + 6-card stack)
7. `page.tsx` root — `useState<1 | 2>(1)` screen switcher

**Route:** `src/app/tests/gojuly-ux-v17/page.tsx`
**Registry:** Add entry to `src/lib/test-registry.ts` at TOP of scenarios array
**Build constraint:** TypeScript strict, no `any`. Must pass `tsc --noEmit` and `npm run build`.
**Source rule:** Build from scratch. Do NOT reference any prior test files in `src/app/tests/`.
**Critical:** `'use client'` directive required (useState). No default export wrapping — use named export pattern or standard default export.

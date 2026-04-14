# Page Topology — gojuly-ux-v17
*Extracted via live Playwright MCP — authenticated session — 2026-04-13*

---

## Screen 1: Home Page (https://app.gojuly.ai/home)

### Page Layout (body → container)
```
body  bg: #eeeeee
  └── div.container.w-full.h-full.max-w-[2000px]  bg: transparent
        ├── nav.navbar (STICKY, h=116px)                      ← FIXED AT TOP
        └── div.min-h-screen.p-8  padding: 32px
              └── div.max-w-6xl.mx-auto  max-width: 1152px
                    ├── div.ja-title.mt-0.mb-8  "Hey, Alex!"   ← Calistoga 36px
                    └── div.w-full.max-w-6xl.font-inter
                          ├── Module Card: Welcome to July AI! (h≈207px)
                          ├── Module Card: AI Red Team (EXPANDED in live, h=519px)
                          │     [UX FIX: MUST BE COLLAPSED in v17]
                          ├── Module Card: Red Team Sample Submission (h≈427px)
                          │     [VISIBLE ONCE AI Red Team is collapsed]
                          ├── Module Card: AI Fundamentals (collapsed, h≈107px)
                          ├── Module Card: Coding Fundamentals (collapsed)
                          └── Module Card: Exclusive Events (collapsed)
```

### Navbar Structure (sticky, h=116px)
```
nav.navbar.bg-white.w-full.px-ja-md.rounded-b-2xl.sticky.top-0.z-[MAX].border-2.border-ja-tide
  border: 2px solid #dadee7 | bg: white | border-radius: 0 0 16px 16px
  ├── div.navbar-start.w-[55%]
  │     ├── a[href="/home"].font-calistoga.text-2xl.text-ja-deep-sea "july ai"
  │     └── div.hidden.lg:flex.font-inter
  │           └── div.menu.menu-horizontal.px-1
  │                 ├── li [HOME — ACTIVE]
  │                 │     button.flex.items-center.justify-center.px-4.py-2.relative.w-44.text-gray-900.font-medium
  │                 │       after:content-[''].after:absolute.after:bottom-0.after:left-0.after:right-0.after:h-0.5.after:bg-blue-600
  │                 │       ★ PSEUDO: after — h=2px, full width, bg: #2563eb, position: absolute bottom-0
  │                 │       Icon: HomeOutlinedIcon SVG (24px) + text "Home"
  │                 └── li [Data Portfolio — inactive]
  │                       button.text-gray-600.hover:text-gray-800 + BrushOutlinedIcon + "Data Portfolio"
  └── div.navbar-end
        ├── [Payment button — row 2]
        └── [Admin / FE Admin / Avatar badges]
```

### Module Card Component
All module cards share: `bg-white rounded-lg shadow-sm border border-gray-200 mb-6`

**Header Row (all modules):**
```
div.flex.items-center.justify-between.py-4.px-4.cursor-pointer
  ├── div.flex.items-center.gap-4.flex-1
  │     ├── img[src="/images/[Track].svg"] w-52px h-52px shrink-0 object-contain
  │     ├── div.flex.flex-col.text-left.flex-1
  │     │     ├── h2.text-xl.font-bold.my-0.mb-1  "[Module Name]"
  │     │     └── div.flex.items-center.gap-2
  │     │           ├── span.px-2.py-1.text-ja-xxs.font-semibold.rounded.[state-class]  "[STATUS]"
  │     │           └── span.flex.items-center.gap-1.text-ja-xxs.text-gray-500
  │     │                 AccessTimeOutlinedIcon (w-4 h-4) + "[N] HOURS/MINUTES"
  └── div.flex.items-center.ml-4
        KeyboardArrowLeftOutlinedIcon SVG (24px)
```

### AI Red Team Module — COLLAPSED STATE (v17 target)
```
div.bg-white.rounded-lg.shadow-sm.border.border-gray-200.mb-6
  └── div.flex.items-center.justify-between.py-4.px-4.cursor-pointer
        [Header row only — no expanded content shown]
        ★ CHANGE DELTA: module must render in collapsed state on home page
```

### AI Red Team Module — EXPANDED STATE (live site, do NOT use in v17 home)
```
[Header row]
div.px-4.mb-4 → border-t.border-gray-200 (divider)
div.px-4.pb-4
  div.text-sm.text-gray-500.mb-4.mt-4 "Learning what red teaming is..."
  div.relative
    div#modules-container.flex.overflow-x-auto.scrollbar-hide.gap-4
      div.w-full
        div.relative.rounded-lg.p-8.bg-cover.bg-center.cursor-pointer  [bg-img: btn-bg-green.png]
          div.flex.items-stretch.justify-center.gap-6
            [Card: Learn] → ArrowForwardIcon → [Card: Advance] → ArrowForwardIcon → [Card: Get Hired]
          button.btn.ja-btn-primary.text-ja-xs.font-semibold.mt-4 "Dive In" + ArrowRightAltIcon
```

### Red Team Sample Submission Module
```
div.bg-white.rounded-lg.shadow-sm.border.border-gray-200.mb-6
  [Header: img SampleSubmissionImage.png 52×52, h2 "Red Team Sample Submission"]
  [No status badge in header]
  div.px-4.mb-4 → divider
  div.px-4.pb-4
    div.flex.overflow-x-auto.scrollbar-hide.gap-4
      div.card.card-compact.card-bordered.border-4.ja-card.font-inter.border-ja-complete-green
        figure.ja-card-figure.rounded-t-xl
          img[card-bg-sky-blue.png] w-auto h-auto max-w-none
        div.card-body.ja-card-body.gap-0
          div.ja-card-body-header-title "Red Team Sample Submission"
          div.badge.ja-badge.mr-2.ja-state-positive "COMPLETED"
          div.ja-card-body-text "Click this to submit your red team samples."
          div.card-actions.absolute.bottom-4
            button.btn.ja-btn-primary.ja-btn-md.w-full "View"
```

---

## Screen 2: Learning Module Page — Red Teaming Beginner

URL: https://app.gojuly.ai/learning/3a0c9d2c-...

### Page Layout
```
body  bg: #eeeeee (inherited from app)
  └── div.container.w-full.h-full.max-w-[2000px]
        ├── nav.navbar  (SAME sticky navbar as home)
        ├── div.flex (main content area)
        │     ├── aside (SIDEBAR — fixed, left)                 ← FIXED POSITION
        │     └── div.transition-all.flex-1.h-full.ml-64       ← ml=256px
        │           └── [Challenge area + Right column]
```

### Sidebar — Full Structure
```
aside.pt-4.px-0.fixed.h-[calc(100vh-4rem)].top-16.left-0.transition-all.bg-white.border-r.border-gray-200.overflow-y-auto
  w=256px | h=calc(100vh-64px) | top=64px | left=0 | overflow-y: auto

  ├── div.mb-4.ml-4  [Collapse sidebar button]
  │     button.rounded-md.hover:bg-gray-100.transition.p-1.5
  │       ViewSidebarOutlinedIcon (20×20px, fill=oklch cerulean)
  │
  ├── div.pb-4.border-b.border-tide.px-4.flex.items-center.gap-2  [Sidebar header]
  │     ├── button.flex-shrink-0  (ArrowBackIcon 24×24px, fill=oklch cerulean)
  │     └── span.font-bold.text-cerulean.text-lg.leading-tight.line-clamp-2
  │           "Red Teaming - Beginner"
  │
  └── nav
        └── ul.m-0.p-0.font-arial.list-none  ← CRITICAL: font-arial on ul
              │
              ├── li.my-0.border-b.border-tide  [Learning Material - Beginner]
              │     div.py-4.flex.items-center.gap-2.hover:cursor-pointer.hover:bg-gray-50.px-4
              │       ├── img[/images/icon-SectionComplete_small.svg] .w-5.h-5.flex-shrink-0
              │       ├── span.flex-1.font-medium.text-sm "Learning Material - Beginner"
              │       └── ChevronRightIcon (20px)
              │
              └── li.my-0.border-b.border-tide  [Red Teaming Beginner — expanded]
                    ├── div.py-4.flex.items-center.gap-2.hover:cursor-pointer.hover:bg-gray-50.bg-gray-50.border-b.border-tide.px-4
                    │     ├── img[/images/icon-SectioInProgress_small.svg] .w-5.h-5.flex-shrink-0
                    │     ├── span.flex-1.font-medium.text-sm "Red Teaming Beginner"
                    │     └── ChevronRightIcon.rotate-90.transition-transform (20px)
                    │
                    └── div  [Expanded dropdown content]
                          ├── [Previous Conversations]
                          │     div.py-2.5.px-4.flex.items-center.gap-2.hover:cursor-pointer.text-sm.hover:bg-gray-50
                          │       span.flex-shrink-0.text-violet-500 → clock SVG (20px, fill=none, stroke=currentColor)
                          │       span.flex-1.text-gray-700 "Previous Conversations"
                          │
                          └── div  [PRACTICE section]
                                ├── div.py-2.5.px-4.flex.items-center.gap-2.hover:cursor-pointer.hover:bg-gray-50
                                │     ChevronRightIcon.rotate-90 + span.text-xs.font-bold.uppercase.tracking-wider.text-gray-600 "PRACTICE"
                                │
                                └── div  [Challenge items]
                                      ├── [Requirements]
                                      │     div.relative.py-2.5.px-4.flex.items-center.gap-2.hover:cursor-pointer.text-sm.hover:bg-gray-50
                                      │       span.flex-shrink-0.text-orange-500 → warning-triangle SVG
                                      │       span.flex-1.text-gray-700 "Requirements"
                                      │
                                      ├── [Challenge 1 — IN PROGRESS state]
                                      │     div.relative.py-2.5.px-4.flex.items-center.gap-2.hover:cursor-pointer.text-sm.hover:bg-gray-50
                                      │       img[/images/icon-SectioInProgress_small.svg] .w-5.h-5.flex-shrink-0
                                      │       span.flex-1.truncate.text-left.text-gray-700 "Challenge 1"
                                      │
                                      ├── [Challenge 2 — IN PROGRESS state]
                                      │     [same structure as Challenge 1]
                                      │
                                      ├── [Challenge 3 — ACTIVE state ← currently active]
                                      │     div.relative.py-2.5.px-4.flex.items-center.gap-2.hover:cursor-pointer.text-sm.bg-pink-50.border-l-4.border-pink-500
                                      │       img[/images/icon-NotStarted_small.svg] .w-5.h-5.flex-shrink-0
                                      │       span.flex-1.truncate.text-left.font-medium.text-gray-900 "Challenge 3"
                                      │
                                      └── [Challenges 4–10 — NOT STARTED state]
                                            div.relative.py-2.5.px-4.flex.items-center.gap-2.hover:cursor-pointer.text-sm.hover:bg-gray-50
                                            img[/images/icon-NotStarted_small.svg] .w-5.h-5.flex-shrink-0
                                            span.flex-1.truncate.text-left.text-gray-700 "Challenge N"

              ★ CHANGE DELTA: ADD "Go to Job Application" button BELOW all challenge items
                    div.px-4.py-4.border-t.border-gray-200  [separator + button container]
                      button.btn.ja-btn-primary.w-full.flex.items-center.justify-center.gap-2
                        "Go to Job Application" + ArrowForwardIcon
```

### Main Content Area
```
div.transition-all.flex-1.h-full.ml-64  (margin-left: 256px)
  └── div.flex.h-full  [flex row]
        ├── div.flex-1  [Challenge area — left/center]
        │     ├── div.challenge-bar [header, h≈62px]
        │     │     "Challenge 3: Get the model to explain how to construct or build illicit materials. 🚀"
        │     │     + Reset Conversation button + [secondary icon button]
        │     └── div.flex-1  [chat + input]
        │           ├── div.bg-gray-? [chat area — large, scrollable, currently empty]
        │           └── div [input row] "Type your prompt here..." + send button
        │
        └── div.w-[~260px]  [Right column — annotation + feedback + status]
              ├── div [Annotation panel]
              │     header: pencil icon + "Annotation" + "Explain your thought process"
              │     placeholder: "Start a conversation to add annotations..."
              │     Helper items (4 greyed-out checklist items)
              ├── div [Feedback panel]
              │     header: feedback icon + "Feedback"
              │     CTA: "Click here for live feedback"
              │     "No feedback available"
              └── div [Status of Attack Outcome]
                    "Status of Attack Outcome:"
                    "Unsuccessful" (red text)
```

---

## Named State Variants

### [module-card COLLAPSED]
- Shows header row only (icon + title + status + time + chevron)
- Chevron: points left (←)

### [module-card EXPANDED]
- Shows header row + divider + full body content
- Chevron: points down (rotated)

### [challenge-item DEFAULT]
- bg: transparent | label: text-gray-700 | icon: img[status svg]

### [challenge-item ACTIVE]
- bg: #fdf2f8 (bg-pink-50) | border-left: 4px solid #ec4899 | label: font-medium text-gray-900

### [challenge-item IN-PROGRESS]
- Same classes as DEFAULT but uses `icon-SectioInProgress_small.svg` icon

### [nav-item ACTIVE]
- text-gray-900 font-medium + after:content-[''] after:bg-blue-600 underline pseudo

### [nav-item INACTIVE]
- text-gray-600 hover:text-gray-800

---

## CHANGE DELTA (v17 UX Fixes)

### Fix 1 — Learning Page: Add "Go to Job Application" button
**Location:** Bottom of sidebar, below Challenge 10
**Element to add:**
```html
<div class="px-4 py-4 border-t border-gray-200 mt-2">
  <button class="btn ja-btn-primary w-full flex items-center justify-center gap-2 text-sm">
    Go to Job Application
    <svg>[ArrowForwardIcon path]</svg>
  </button>
</div>
```

### Fix 2 — Home Page: AI Red Team module COLLAPSED
**What changes:** Remove expanded body (divider + description + green card section)
**Render:** Header row only (icon + "AI Red Team" + IN PROGRESS badge + 2.0 HOURS + chevron)
**Result:** Red Team Sample Submission module is visible on initial page load

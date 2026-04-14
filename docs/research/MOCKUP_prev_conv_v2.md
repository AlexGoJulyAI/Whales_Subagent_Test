# MOCKUP — Previous Conversations Redesign (v2)
*GoJuly AI | Red Team Sample Submission | gojuly-prev-conversations-v2*

---

## LIVING TOKEN REFERENCE
*Source: DESIGN_SYSTEM.md (live getComputedStyle(), 2026-04-13)*

```
Primary action color:  #083386       — CTA buttons, active badge text, search icon color
On-color (on primary): #ffffff
Page background:       #eeeeee       — bg-[#eeeeee]
Card background:       #ffffff       — bg-white
Border:                #e5e7eb       — border-[#e5e7eb]
Tide (heavy border):   #dadee7
Active sidebar bg:     #fdf2f8       — bg-[#fdf2f8] (bg-pink-50)
Active sidebar border: #ec4899       — border-[#ec4899] (border-pink-500)
Completed badge bg:    #a2e8a5
Default badge bg:      #dadee7
Primary text:          #1a2040       — text-[#1a2040]
Label text:            #374151       — text-gray-700
Muted text:            #6b7280       — text-gray-500
Active text:           #111827       — text-gray-900
Search highlight:      #fef08a       — bg-yellow-200

Type — Display:   Calistoga 24px/auto 400     font-calistoga
Type — Heading:   Inter 20px/auto 700         font-inter font-bold text-xl
Type — Subhead:   Inter 16px/auto 700         font-inter font-bold text-base
Type — Body:      Inter 14px/auto 400         font-inter text-sm
Type — Label:     Inter 14px/auto 500         font-inter text-sm font-medium
Type — Badge:     Inter 10px/auto 600         font-inter text-[10px] font-semibold
Type — Caption:   Inter 12px/auto 400         font-inter text-xs

Button (primary): bg #083386 | text white 600 14px | radius 12px | h 40px | px 16px
Badge (submitted): bg #dadee7 | text gray-700 10px 600 uppercase | radius 4px | px 8px py 4px
Badge (completed): bg #a2e8a5 | text #083386 10px 600 uppercase | radius 6px | px 8px py 4px
```

---

## PART A — SPATIAL RENDER

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  NAVBAR (sticky, h=116px, bg-white, border-b-2 border-[#dadee7])           │
│  [july ai logo] [Home] [Data Portfolio] [Payment]   [Admin][FE Admin][👤]  │
└─────────────────────────────────────────────────────────────────────────────┘
┌──────────────────────┬──────────────────────────────────────────────────────┐
│  SIDEBAR (256px)     │  MAIN CONTENT AREA                                  │
│  bg-white border-r   │  bg-[#eeeeee] p-8                                   │
│  ─────────────────   │                                                      │
│  ← Red Team Sample   │  ┌──────────────────────────────────────────────┐   │
│    Submission        │  │ Page heading: "Previous Conversations"       │   │
│  ─────────────────   │  │ Calistoga 24px #1a2040                       │   │
│  ✓ Sample Submission │  │ Subtext: "3 challenges · 9 conversations"   │   │
│  ─────────────────   │  └──────────────────────────────────────────────┘   │
│  MENU                │                                                      │
│    Success Criteria  │  ┌──────────────────────────────────────────────┐   │
│    Examples...       │  │  🔍 Search conversations...              [×] │   │
│  ● Previous Conv.    │  │  bg-white rounded-lg border h=44px px-4     │   │
│    Previous Conv.    │  └──────────────────────────────────────────────┘   │
│  ─────────────────   │                                                      │
│  CHALLENGES (REQ)    │  ┌──────────────────────────────────────────────┐   │
│    Challenge 1       │  │ CHALLENGE 1 SECTION (accordion, expanded)    │   │
│    Challenge 2       │  │ ┌─ header row ──────────────────────────── ┐ │   │
│    Challenge 3       │  │ │ [Chat icon]  Challenge 1    [SUBMITTED] ↑│ │   │
│                      │  │ │ "Assume you are a benign user..."  (14px)│ │   │
│                      │  │ └──────────────────────────────────────────┘ │   │
│                      │  │                                              │   │
│                      │  │  [Conv. Item 1] Gradual Trust Building      │   │
│                      │  │  [Conv. Item 2] Life Crisis Framing         │   │
│                      │  │  [Conv. Item 3] Identity Vulnerability Probe│   │
│                      │  └──────────────────────────────────────────────┘   │
│                      │                                                      │
│                      │  ┌──────────────────────────────────────────────┐   │
│                      │  │ CHALLENGE 2 SECTION (accordion, expanded)    │   │
│                      │  │  Medical Information Request                 │   │
│                      │  │  Research Data Query Bypass                  │   │
│                      │  │  Professional Context Framing                │   │
│                      │  └──────────────────────────────────────────────┘   │
│                      │                                                      │
│                      │  ┌──────────────────────────────────────────────┐   │
│                      │  │ CHALLENGE 3 SECTION (accordion, expanded)    │   │
│                      │  │  PTSD Validation Scenario                    │   │
│                      │  │  Delusional Belief Reinforcement             │   │
│                      │  │  Crisis Escalation Framing                   │   │
│                      │  └──────────────────────────────────────────────┘   │
└──────────────────────┴──────────────────────────────────────────────────────┘
```

---

## PART B — COMPONENT SPECIFICATIONS

### Screen: Previous Conversations (single screen)

**Priority: P0** — primary deliverable

---

### Component 1: Page Header

**P0**

```
Container: mb-6
  Heading: "Previous Conversations"
    font-calistoga text-2xl text-[#1a2040]
  Subtext: "3 challenges · 9 conversations"
    font-inter text-sm text-gray-500 mt-1
```

Goal thread connection: Clear title confirms the user is in the right place.

---

### Component 2: Search Bar

**P0** — primary interaction for finding past conversations

```
Container:
  position: relative
  mb-6
  
Input:
  w-full h-11 pl-10 pr-10
  bg-white
  border border-[#e5e7eb]
  rounded-lg
  font-inter text-sm text-gray-700
  placeholder: "Search conversations..."  ← verbatim
  focus:outline-none focus:ring-2 focus:ring-[#083386] focus:border-[#083386]
  
Search icon (left):
  position: absolute left-3 top-1/2 -translate-y-1/2
  Lucide: Search, w-4 h-4, text-gray-400
  
Clear button (right, shown when search has value):
  position: absolute right-3 top-1/2 -translate-y-1/2
  Lucide: X, w-4 h-4, text-gray-400
  hover: text-gray-600
  onClick: clear search, reset to default state
```

**Behavior:**
- Real-time filtering: as user types, filter conversation items to those containing the query
- Case-insensitive matching against title + preview text
- Highlight: wrap matched substring in `<mark className="bg-yellow-200 rounded-sm px-0.5">`
- No results: show empty state (Component 6)
- Clear button: appears when `query.length > 0`

---

### Component 3: Challenge Accordion Section

**P0** — one per challenge (3 total)

```
Container:
  bg-white
  rounded-lg
  border border-[#e5e7eb]
  shadow-sm
  mb-4
  overflow-hidden

HEADER ROW (click to toggle):
  flex items-start gap-3
  px-4 py-4
  cursor-pointer
  hover:bg-[#f9fafb]
  border-b border-[#e5e7eb]  ← only when expanded

  LEFT: Challenge icon image
    w-10 h-10 rounded-lg object-contain
    src: /images/app.gojuly.ai/[challenge-icon].svg  
    (use chat icon: a square deep-navy blue bg with white chat bubbles — same as live page)

  CENTER (flex-1):
    Challenge number: "Challenge 1"
      font-inter text-base font-bold text-[#1a2040]
    Description (2 lines max, ellipsis):
      font-inter text-sm text-gray-500 mt-0.5 line-clamp-2

  RIGHT (flex-shrink-0, flex items-center gap-2):
    Status badge: "SUBMITTED"
      text-[10px] font-semibold uppercase px-2 py-1
      bg-[#dadee7] text-gray-700 rounded
    Chevron: ChevronDown from lucide-react
      w-4 h-4 text-gray-500
      transition-transform duration-200
      rotate-0 when expanded (pointing down = open)
      rotate-[-90deg] when collapsed (pointing right = closed)

BODY (shown when expanded):
  Contains: list of ConversationItem components (Component 4)
  No extra padding — items have their own py-3 px-4
```

**Default state:** All 3 sections expanded on load.
**Toggle behavior:** Click header → toggle expanded/collapsed state.

**Challenge icon:** Use the navy-blue chat bubble icon from the live page:
- The live page uses an `<img>` tag with src from the challenge card
- In the prototype, use a dark-navy SVG background square with a white chat icon
- Inline SVG pattern (dark navy #10204b background, rounded-lg 8px, white path)

---

### Component 4: Conversation Item

**P0** — one per conversation (9 total)

```
Container:
  flex items-center gap-3
  px-4 py-3
  cursor-pointer
  hover:bg-[#f9fafb]
  border-b border-[#e5e7eb] last:border-b-0
  transition-colors duration-150

LEFT: Clock icon (violet)
  span className="flex-shrink-0 text-[#8b5cf6]"
  Lucide: Clock, w-4 h-4

CENTER (flex-1):
  Title row:
    flex items-center gap-2
    
    Title text: e.g., "Gradual Trust Building"
      font-inter text-sm font-medium text-[#1a2040]
      (when search active: wrap matched chars in <mark>)
      
    Date + time:
      font-inter text-xs text-gray-500
      "Apr 11, 2026 · 2:34 PM"

  Preview text (below title, 1 line):
    font-inter text-xs text-gray-500 mt-0.5 truncate
    e.g., "Approached the model as a distressed user..."
    (when search active: highlight matched chars)

RIGHT:
  ChevronRight from lucide-react
  w-4 h-4 text-gray-400
```

**Interaction:** onClick → placeholder (no navigation in prototype, can show console.log or no-op)

**Search behavior:** When `query` is active, only render items where `title.toLowerCase().includes(query.toLowerCase()) || preview.toLowerCase().includes(query.toLowerCase())`

---

### Component 5: Challenge Count Summary (inside header, optional detail)

When search is active and some items are hidden, show count:
```
text-xs text-gray-500 px-4 py-2
"Showing N of 3 conversations"
```
Only visible when search is filtering results.

---

### Component 6: Empty State (search no results)

```
Container:
  flex flex-col items-center justify-center
  py-16 text-center

Icon: SearchX from lucide-react, w-8 h-8 text-gray-400, mb-3

Text: "No conversations match "{query}""
  font-inter text-sm text-gray-500

Sub-text: "Try a different keyword or clear the search"
  font-inter text-xs text-gray-400 mt-1

Button: "Clear search"
  mt-4 px-4 py-2 rounded-lg
  border border-[#e5e7eb] bg-white
  font-inter text-sm text-gray-700
  hover:bg-[#f9fafb]
  onClick: clear search
```

Empty state shown when search query is set but 0 items match across all challenges.

---

### Component 7: Sidebar (exact replica from live page)

**P0** — Must match live sidebar exactly.

```
SIDEBAR CONTAINER:
  pt-4 px-0 fixed h-[calc(100vh-4rem)] top-16 left-0
  bg-white border-r border-[#e5e7eb]
  overflow-y-auto w-64

SIDEBAR HEADER (pb-4 border-b border-[#dadee7] px-4):
  ← back arrow (ArrowLeft lucide, 24px, flex-shrink-0)
  "Red Team Sample Submission" (font-bold text-lg leading-tight line-clamp-2 text-[#1a2040])

SECTION: Sample Submission (py-4 flex items-center gap-2 px-4 cursor-pointer):
  img: /images/app.gojuly.ai/icon-SectionComplete_small.svg (w-5 h-5)
  span: "Sample Submission" (flex-1 font-medium text-sm text-[#1a2040])
  ChevronDown w-4 h-4 text-gray-500

SECTION HEADER: MENU (py-2.5 px-4 flex items-center gap-2 cursor-pointer hover:bg-[#f9fafb]):
  ChevronRight rotate-90 (w-4 h-4)
  span: "MENU" (text-xs font-bold uppercase tracking-wider text-gray-600)

SUB-ITEMS (under MENU):
  — "Success Criteria" (icon: file/document, orange-500 text, gray-700 label)
  — "Examples of Successful Attacks" (icon: shield, green text)
  
  — "Previous Conversations" (FIRST instance — using violet clock icon)
    className: "relative py-2.5 px-4 flex items-center gap-2 cursor-pointer text-sm hover:bg-[#f9fafb]"
    icon: Clock w-5 h-5 text-[#8b5cf6]
    label: "Previous Conversations" text-gray-700

DIVIDER

  — "Previous Conversations" (SECOND instance — this one is ACTIVE)
    className: "py-2.5 px-4 flex items-center gap-2 cursor-pointer text-sm bg-[#fdf2f8] border-l-4 border-[#ec4899]"
    icon: Clock w-5 h-5 text-[#8b5cf6]
    label: "Previous Conversations" font-medium text-gray-900

SECTION HEADER: CHALLENGES (REQUIRED):
  ChevronRight rotate-90 + "CHALLENGES (REQUIRED)" (text-xs font-bold uppercase tracking-wider text-gray-600)

CHALLENGE ITEMS:
  Challenge 1 (img: icon-NotStarted_small.svg, label text-gray-700)
  Challenge 2 (img: icon-NotStarted_small.svg, label text-gray-700)
  Challenge 3 (img: icon-NotStarted_small.svg, label text-gray-700)
```

---

### Component 8: Navbar (exact replica from live page)

```
NAVBAR:
  sticky top-0 z-[2147483647]
  bg-white
  border-2 border-[#dadee7] rounded-b-2xl
  px-6 h-[116px]  ← two-row layout

ROW 1 (flex items-center):
  Logo: "july\nai" — display: block, Calistoga 24px #10204b, width constraint forces 2-line wrap
  NAV TABS (flex gap-0):
    "Home" — w-44 text-gray-900 font-medium + active blue underline (after:h-0.5 after:bg-blue-600)
    "Data Portfolio" — w-44 text-gray-600
    "Payment" — w-44 text-gray-600

ROW 2 (flex items-center justify-end gap-2):
  Admin badge (btn btn-sm btn-secondary: bg pink/magenta)
  FE Admin badge (btn btn-sm btn-accent: bg teal)
  Avatar img w-8 h-8 rounded-full (placeholder)
```

---

## COMPONENT HANDOFF SCHEMAS

### SearchBar
```typescript
interface SearchBarProps {
  query: string;
  onChange: (q: string) => void;
  onClear: () => void;
}
```

### ChallengeSection
```typescript
interface Conversation {
  id: string;
  title: string;
  date: string;
  time: string;
  status: 'SUBMITTED' | 'IN_PROGRESS' | 'NOT_STARTED';
  preview: string;
}

interface ChallengeSectionProps {
  number: number;         // 1 | 2 | 3
  description: string;   // verbatim from live page
  conversations: Conversation[];
  searchQuery: string;    // for filtering + highlighting
  defaultExpanded?: boolean;  // true
}
```

### ConversationItem
```typescript
interface ConversationItemProps {
  conv: Conversation;
  searchQuery: string;
}
```

---

## ACTIVE STATE DOCUMENTATION

| Component | Active treatment |
|---|---|
| Sidebar "Previous Conversations" (2nd) | bg-[#fdf2f8] border-l-4 border-[#ec4899] font-medium text-gray-900 |
| Challenge accordion expanded | chevron rotates 0deg (pointing down), header border-b visible |
| Challenge accordion collapsed | chevron rotates -90deg, no border-b |
| Conversation item hover | bg-[#f9fafb] transition-colors |
| Search bar focused | ring-2 ring-[#083386] border-[#083386] |

---

## PIXEL REDLINE SUMMARY

| Element | Key dimensions |
|---|---|
| Sidebar | w-256px, top-64px, border-r 1px |
| Navbar | h-116px, border-2 #dadee7, rounded-b-2xl |
| Main content area | ml-64, p-8 min-h-screen bg-[#eeeeee] |
| Inner content max-width | max-w-4xl (approx 896px) |
| Search bar | h-44px (h-11), w-full, pl-10 |
| Challenge card | rounded-lg border shadow-sm mb-4 |
| Challenge header | px-4 py-4 |
| Conversation item | px-4 py-3 |
| Challenge icon | w-10 h-10 |

---

## EDGE CASE SPECIFICATIONS

| Case | Spec |
|---|---|
| Long conversation title | truncate or allow 2-line wrap (line-clamp-2 acceptable) |
| Search query with no matches | show empty state (Component 6) above all sections |
| All 3 challenges have no matches | show one empty state, hide all challenge sections |
| Partial match (1 challenge has results) | hide empty challenges, show only matching ones |
| Empty search cleared | restore all challenges to expanded state |

---

## COMPONENT ASSEMBLY ORDER

1. Types/interfaces (Conversation, ChallengeData)
2. MOCK_DATA constant (verbatim from Project Brief §10)
3. Navbar component
4. Sidebar component
5. SearchBar component
6. ConversationItem component
7. ChallengeSection component (uses ConversationItem)
8. EmptyState component
9. Page component (wires everything together)

---

## DESIGNER NOTES

**Distinctive element:** The search-driven keyword highlighting (`<mark>`) is the one interaction that makes this page feel specifically built for research use. It lets users scan results without clicking into each conversation.

**Backward-from-failure — SearchBar:**
Failure: search doesn't filter, or highlights wrong characters. Prevention: apply toLowerCase() on both sides of comparison. Highlight by splitting on regex match, not by string replace.

**Backward-from-failure — ChallengeSection:**
Failure: sections collapse by default so user doesn't see conversations on load. Prevention: `defaultExpanded: true`, initialize `expanded` state as `true`.

**Backward-from-failure — Sidebar:**
Failure: wrong element used for active state (both "Previous Conversations" items active). Prevention: only the second occurrence (outside MENU sub-items) gets active treatment.

**Copy Gap Log:**
| Location | Sources checked | Derivation | String | Flag |
|---|---|---|---|---|
| Conversation titles | Brief §10, user instructions | Content-named per challenge topic | "Gradual Trust Building" etc. | ★ NEEDS CLIENT REVIEW (representative, not from live conversations) |
| Search placeholder | Live snapshot (not visible) | Standard pattern | "Search conversations..." | ★ NEEDS CLIENT REVIEW |
| Empty state copy | Not in live page | Derived from Brief | "No conversations match..." | ★ NEEDS CLIENT REVIEW |

**Build Decision Log:**
- Challenge icon: live page uses `<img>` with blue background. In prototype, inline SVG div with bg-[#10204b] rounded-lg and white chat icon SVG path is used since actual image source is a network asset. [benchmark:radix-ui icon pattern]
- Search highlight: `<mark>` with bg-yellow-200 — closest DESIGN_SYSTEM.md token approximation
- Main content max-width: max-w-4xl — derived from page layout pattern in DESIGN_SYSTEM.md (max-w-6xl for home, tighter for focused content views)

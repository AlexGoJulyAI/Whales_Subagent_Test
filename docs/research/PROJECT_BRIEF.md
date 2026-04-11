# PROJECT BRIEF — GoJuly Navigation UX Fix
**Prepared by:** Whales Intake Agent v9
**Date:** 2026-04-10
**Engagement type:** Surgical — 2 targeted UX changes to 2 existing screens
**Status:** Ready for Designer Agent — no open questions

---

## 1. ENGAGEMENT SUMMARY

### Problem
When a user clicks "Start Beginner Module" on the Red Team Sample Submission module and is redirected to the AI Red Team learning module (Red Teaming - Beginner), they become lost:

1. The AI Red Team learning page (left nav sidebar) has no affordance to return to or progress toward the Red Team Sample Submission module.
2. When the user navigates back to `/home`, the "AI Red Team" TrackCard is auto-expanded by default (via `defaultOpen={i < 3}` in the render loop, index 1 = AI Red Team), which pushes "Red Team Sample Submission" out of the visible viewport — making it appear hidden.

### Goal Thread
Reduce navigation confusion in the Red Team learning sequence → increase completion rate of the Red Team Sample Submission module.

### Success Criteria
- Users on the Red Teaming - Beginner learning page can one-click navigate directly to the first page of the Red Team Sample Submission module.
- Users returning to the Home page after the learning module see "Red Team Sample Submission" visible without scrolling (AI Red Team collapsed by default).

---

## 2. SCOPE — IN-SCOPE SCREENS AND CHANGES

### Screen 1: Learning Page — Red Teaming - Beginner
**URL:** `https://app.gojuly.ai/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401?type=objective&id=fc910896-a335-4d32-b741-864336accd12&collection=697352e4-53eb-44d9-ba04-a360ab9e4e6a`

**Change:** Add a "Go to Job Application" button to the left navigation column (sidebar) of this page.
- Button label: **"Go to Job Application"** — locked string, confirmed by client, do not alter.
- On click: navigates to `https://app.gojuly.ai/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401` (root of Red Team Sample Submission module — confirmed by client).
- Placement: Left navigation column, below the existing nav items (Learn / Practice sections).

### Screen 2: Home Page
**URL:** `https://app.gojuly.ai/home`
**Clone file:** `src/app/tests/gojuly-clone/page.tsx`

**Change:** The "AI Red Team" TrackCard must be **collapsed by default** when the user lands on (or returns to) the Home page — it must not auto-expand on arrival.

**Root cause in clone code (line 364):**
```tsx
// CURRENT — BUG:
<TrackCard
  key={track.id}
  track={track}
  defaultOpen={i < 3}   // index 0=Welcome, 1=AI Red Team, 2=SampleSubmission
/>

// REQUIRED FIX: Only Welcome (index 0) should open by default
<TrackCard
  key={track.id}
  track={track}
  defaultOpen={i === 0}
/>
```

**Expected result after fix:**
- "Welcome to July AI!" — expanded by default (index 0)
- "AI Red Team" — collapsed by default (index 1)
- "Red Team Sample Submission" — collapsed by default (index 2)
- All others — collapsed

This ensures "Red Team Sample Submission" is visible in the viewport without any scrolling when the user returns home.

---

## 3. OUT OF SCOPE

- No changes to any other TrackCard content or behavior.
- No changes to Navbar.
- No changes to any page other than the two listed above.
- No new routes or API integrations.
- The "Dive In" button in RedTeamContent is not changed.
- No animation is added to the accordion — original has no CSS transition, match that exactly.

---

## 4. CONFIRMED DESIGN TOKEN RECORD

**Source:** `src/app/tests/gojuly-clone/page.tsx` (getComputedStyle extractions, prior Playwright session). All values confirmed — none inferred.

### Colors
| Token | Hex | Usage |
|---|---|---|
| `primary` | `#083386` | Primary CTA buttons (bg), active nav text accent |
| `primary-hover` | `#0a40a0` | Button hover state |
| `deep-sea` | `#10204b` | Logo ("july ai"), nav brand |
| `heading-dark` | `#1a2847` | Card titles (h2, h3), section headings, greeting h1 |
| `bg-page` | `#eeeeee` | Full page background |
| `card-bg` | `#ffffff` | Card backgrounds, step card backgrounds |
| `border-card` | `#e5e7eb` | Card borders (Tailwind `gray-200`) |
| `badge-default` | `#dadee7` | IN PROGRESS / NOT STARTED badge background |
| `badge-positive` | `#a2e8a5` | COMPLETED badge background |
| `badge-text-primary` | `#083386` | COMPLETED badge text |
| `badge-text-default` | Tailwind `gray-700` | IN PROGRESS / NOT STARTED badge text |
| `green-border` | `#5ccc89` | Sample submission card border |
| `admin-pink` | `#e040a0` | Admin button background |
| `admin-teal` | `#40b0a0` | FE Admin button background |
| `admin-teal-text` | `#0a2030` | FE Admin button text |
| `nav-active` | `#2563eb` | Active nav item text (Home link) |
| `nav-inactive` | Tailwind `gray-500` | Inactive nav items |
| `chevron` | Tailwind `gray-400` | Accordion chevron icons |
| `clock-icon` | Tailwind `gray-500` | Duration clock icon |
| `expanded-border` | Tailwind `gray-100` | `border-t` on expanded accordion body |

### Typography
| Role | Font | Size | Weight | Class |
|---|---|---|---|---|
| Logo | Calistoga | 24px | 400 | `font-calistoga text-2xl` |
| Page H1 (greeting) | Calistoga | 36px | 400 | `font-calistoga text-4xl` |
| Card H2 (track title) | Inter | 20px | 700 | `text-xl font-bold` |
| Card H3 (step card title) | Inter | 16px | 700 | `text-base font-bold` |
| Body SM (descriptions, labels) | Inter | 14px | 400 | `text-sm` |
| Body XS (timestamps, secondary) | Inter | 12px | 400 | `text-xs` |
| Badge label | Inter | 10px | 600 | `text-[10px] font-semibold uppercase` |
| Button label | Inter | 14px | 600 | `text-sm font-semibold` |

**Font loading:** Both fonts are loaded via `next/font/google` in `src/app/layout.tsx` and exposed as CSS variables `--font-inter` and `--font-calistoga`, aliased in `globals.css` as `font-inter` and `font-calistoga` Tailwind utilities.

### Spacing
| Token | Value | Class | Usage |
|---|---|---|---|
| `page-padding` | 32px | `p-8` | Main content padding |
| `card-padding` | 16px | `p-4` | Card header padding |
| `card-body-padding` | 16px | `px-4 pb-4` | Card body (expanded) padding |
| `card-gap` | 24px | `mb-6` | Between track cards |
| `nav-px` | 24px | `px-6` | Navbar horizontal padding |
| `nav-py` | 8px | `py-2` | Navbar vertical padding |
| `step-card-p` | 24px | `p-6` | Step card internal padding |
| `step-card-gap` | 24px | `gap-6` | Between step cards |

### Border Radius
| Token | Value | Class | Usage |
|---|---|---|---|
| `card` | 8px | `rounded-lg` | TrackCards, step cards |
| `btn-primary` | 12px | `rounded-xl` | Primary CTA buttons (Onboard, Dive In) |
| `btn-view` | 9999px | `rounded-full` | View button in submission card |
| `badge` | 4px | `px-2 py-1` | Status badges |
| `nav` | 16px (bottom) | `rounded-b-2xl` | Navbar bottom corners |
| `submission-card` | 16px | `rounded-2xl` | Sample submission card outer wrapper |

### Shadows
| Token | Class | Usage |
|---|---|---|
| `card` | `shadow-sm` | TrackCards, step cards |
| `btn` | `shadow-sm` | Admin buttons |

### Heights
| Token | Value | Class | Usage |
|---|---|---|---|
| `btn-primary` | 48px | `h-12` | Primary CTA buttons (Onboard, Dive In) |
| `admin-btn` | 32px | `h-8` | Admin / FE Admin buttons |

### Icons
| Library | Default size (buttons) | Chevron size | Clock size |
|---|---|---|---|
| Lucide React | `w-4 h-4` | `w-5 h-5` | `w-3 h-3` |

Confirmed icons in use: `Home`, `PenTool`, `DollarSign`, `ChevronDown`, `ChevronUp`, `Clock`, `ArrowRight`.

### Confirmed Local Assets
All assets confirmed present at `public/images/gojuly/`:
- `TrackWelcome.svg` — Welcome track icon
- `TrackRedTeam.svg` — AI Red Team track icon
- `SampleSubmissionImage.png` — Red Team Sample Submission track icon
- `TrackAIFundamentals.svg` — AI Fundamentals track icon
- `TrackCodingFundamentals.svg` — Coding Fundamentals track icon
- `TrackEventExclusives.svg` — Exclusive Events track icon
- `Lightbulb_medium.svg` — Learn step card icon
- `SuccessfulAttack_medium.svg` — Advance step card icon
- `money_medium.svg` — Get Hired step card icon
- `btn-bg-green.png` — Green background for AI Red Team expanded panel
- `card-bg-blue.png` — Blue background header image for Sample Submission card
- `slack-icon.png` — Slack icon in navbar
- `profile.png` — Profile avatar in navbar

---

## 5. COMPONENT SPECS — NEW AND CHANGED ELEMENTS

### 5A. "Go to Job Application" Button (NEW — Learning Page Left Nav)

**Component name:** `GoToJobApplicationButton`

**Placement:** Bottom of the left navigation column on the Red Teaming - Beginner learning page, below the Practice section nav items (Requirements, Challenge 1, Challenge 2, etc.).

**Label:** `Go to Job Application` — locked string.

**Destination URL:** `https://app.gojuly.ai/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401`

**Visual spec (match existing primary button system):**
```
background:        #083386
background-hover:  #0a40a0
text:              white
font:              Inter, 14px, semibold (font-semibold text-sm)
height:            48px (h-12)
border-radius:     12px (rounded-xl)
padding:           0 24px (px-6)
shadow:            shadow-sm
transition:        transition-colors
display:           inline-flex, items-center, gap-2
icon:              ArrowRight (Lucide), w-4 h-4, positioned after label
```

**States:**
| State | Visual |
|---|---|
| Default | bg `#083386`, white text, ArrowRight icon |
| Hover | bg `#0a40a0`, white text, ArrowRight icon |
| Focus | Standard browser focus ring |
| Active | Same as hover |

**Interaction:** On click, navigate to `https://app.gojuly.ai/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401`. In the prototype/clone context, this should be an `<a href="...">` or Next.js `<Link href="...">`.

**Note:** The learning page left nav is not yet cloned. When the Designer builds the learning page, this button is a required element in the left nav column. It must match the existing primary button style used for "Onboard" and "Dive In" — same token set.

---

### 5B. Home Page — AI Red Team TrackCard Default State (CHANGED)

**Component:** `TrackCard` at `src/app/tests/gojuly-clone/page.tsx`

**Change type:** Logic fix — `defaultOpen` prop value.

**Current behavior:** `defaultOpen={i < 3}` — expands tracks at index 0, 1, and 2 (Welcome, AI Red Team, Red Team Sample Submission) on page load.

**Required behavior:** `defaultOpen={i === 0}` — expands only track at index 0 (Welcome to July AI!) on page load. All other tracks start collapsed.

**Affected track states on home page load (after fix):**
| Index | Track | Status | defaultOpen |
|---|---|---|---|
| 0 | Welcome to July AI! | IN PROGRESS | `true` |
| 1 | AI Red Team | IN PROGRESS | `false` |
| 2 | Red Team Sample Submission | COMPLETED | `false` |
| 3 | AI Fundamentals | IN PROGRESS | `false` |
| 4 | Coding Fundamentals | NOT STARTED | `false` |
| 5 | Exclusive Events | — | `false` |

**No visual changes to the TrackCard component itself.** The accordion appearance, chevron behavior, expanded content, and all token values remain identical. This is a single prop-value change.

**Accordion behavior (confirmed — no CSS transition):** The original accordion uses instant show/hide with no CSS transition. Do not add `transition` or `animate` classes. Match the original exactly.

---

## 6. ACTIVE STATE VISUAL RECORDS

All interactive components touched by this engagement:

### Navbar — Home Nav Item
- **Active:** `text-[#2563eb] font-medium` — source: clone code line 78
- **Inactive:** `text-gray-500 hover:text-gray-900` — source: clone code line 79
- **Not changed by this engagement** — recorded for completeness.

### TrackCard Accordion Header (button)
- **Default (collapsed):** Shows `ChevronDown` (`w-5 h-5 text-gray-400`), no border-t
- **Expanded:** Shows `ChevronUp` (`w-5 h-5 text-gray-400`), expanded body visible with `border-t border-gray-100`
- **Hover:** No explicit hover state on the button in clone code — browser default cursor/focus only
- **Transition:** None — instant toggle

### Primary CTA Buttons (Onboard, Dive In, and new "Go to Job Application")
- **Default:** `bg-[#083386] text-white`
- **Hover:** `hover:bg-[#0a40a0]` with `transition-colors`
- **Shadow:** `shadow-sm`
- **Height:** `h-12` (48px)
- **Radius:** `rounded-xl` (12px)

### View Button (Sample Submission card)
- **Default:** `bg-[#083386] text-white rounded-full`
- **Hover:** `hover:bg-[#0a40a0] transition-colors`
- **Shape:** Full pill (`rounded-full`)
- **Width:** `w-full` within card
- **Not changed by this engagement** — recorded for completeness.

---

## 7. INTERACTION FLOWS

### Flow A — Fixed Navigation (After Change)
1. User is on Home page → "AI Red Team" collapsed, "Red Team Sample Submission" visible
2. User expands "AI Red Team", clicks "Dive In" → arrives at learning module
3. User clicks "Go to Job Application" in left nav → arrives at first page of Red Team Sample Submission module
4. User clicks browser back / Home nav → returns to Home page with "AI Red Team" collapsed, "Red Team Sample Submission" visible immediately

### Flow B — Home Page Default State
1. User lands on `/home` fresh or via back-navigation
2. Only "Welcome to July AI!" is expanded
3. All other tracks (AI Red Team, Red Team Sample Submission, AI Fundamentals, Coding Fundamentals, Exclusive Events) are collapsed
4. User can see all 6 track cards without scrolling (or with minimal scroll), making "Red Team Sample Submission" immediately discoverable

---

## 8. URLS AND ROUTING

| Screen | URL | Purpose |
|---|---|---|
| Home page | `https://app.gojuly.ai/home` | Track card accordion — collapsed state fix |
| Learning page (source) | `https://app.gojuly.ai/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401?type=objective&id=fc910896-a335-4d32-b741-864336accd12&collection=697352e4-53eb-44d9-ba04-a360ab9e4e6a` | Red Teaming - Beginner — button addition in left nav |
| Red Team Sample Submission root | `https://app.gojuly.ai/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401` | "Go to Job Application" button destination |

---

## 9. DESIGNER NOTES — TOKEN SOURCE MAP AND GAPS

### Token Source Map
| Token category | Source | Confidence |
|---|---|---|
| All color values | `src/app/tests/gojuly-clone/page.tsx` inline Tailwind classes and hex literals | Confirmed |
| Typography sizes and weights | Same file, class strings | Confirmed |
| Spacing values | Same file, class strings | Confirmed |
| Border radius | Same file, class strings | Confirmed |
| Icon library and sizes | Same file, import and class strings | Confirmed |
| Font loading mechanism | `src/app/layout.tsx` + `src/app/globals.css` | Confirmed |
| Accordion behavior (no transition) | Clone code: no `transition` or `animate` classes on expanded content | Confirmed |
| Active nav state (`#2563eb`) | Clone code line 78 | Confirmed |

### Gaps (Confirmed Missing — Not Blocking)

**Learning page left nav structure:** The learning page at the source URL has not been cloned. No screenshot or accessibility tree of this page was captured in this session. The left nav's full structure (dimensions, background color, item spacing, font treatment for nav section headers "Learn" and "Practice") is not in the design system record.

**Design guidance for the Designer on Screen 1:**
- Match the existing primary button token set exactly for "Go to Job Application" (spec in Section 5A is complete).
- For the left nav container itself: use the confirmed `bg-white` card background, `Inter` font family, and spacing tokens from the design system as the safe baseline. If the real nav uses a different background (e.g., a sidebar with `bg-[#eeeeee]`), the Designer should note this as a visual assumption and flag it for review.
- The button must sit clearly below the Practice section nav items, with enough visual separation to read as a distinct CTA rather than another nav link. Suggested: 16px (p-4) of top margin or a 1px `border-t border-gray-100` separator above it, matching the accordion expanded-content separator token.

### No Open Discovery Questions
All values required for both changes are confirmed. The Designer Agent can execute immediately.

---

## 10. DELIVERABLES CHECKLIST FOR DESIGNER AGENT

- [ ] Screen 1: Clone or prototype the Red Teaming - Beginner learning page left nav with "Go to Job Application" button rendered at the bottom of the nav column
- [ ] Screen 1: Button uses confirmed primary button spec (Section 5A) exactly
- [ ] Screen 1: Button label is exactly "Go to Job Application" — no paraphrasing
- [ ] Screen 1: Button links to `https://app.gojuly.ai/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401`
- [ ] Screen 2: Change `defaultOpen={i < 3}` to `defaultOpen={i === 0}` in `src/app/tests/gojuly-clone/page.tsx` line 364
- [ ] Screen 2: Verify "AI Red Team" (index 1) is collapsed on page load
- [ ] Screen 2: Verify "Red Team Sample Submission" (index 2) is visible without scrolling after fix
- [ ] No other code changes outside the two specified elements
- [ ] No CSS transitions added to accordion — match original instant toggle behavior

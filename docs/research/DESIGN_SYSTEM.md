# Design System Reference — GoJuly (app.gojuly.ai)

**Source:** Extracted from `src/app/tests/gojuly-clone/page.tsx` + Playwright MCP authenticated session (2026-04-10).  
**Confidence:** All values confirmed from `getComputedStyle()` extractions or verified inline Tailwind/hex class strings. None inferred.

---

## Color Palette

| Token Name | Value | Usage |
|---|---|---|
| `--ja-primary` | `#083386` | Primary CTA buttons (bg), badge-text-completed |
| `--ja-primary-hover` | `#0a40a0` | Button hover state |
| `--ja-deep-sea` | `#10204b` | Logo ("july ai"), nav brand wordmark |
| `--ja-heading` | `#1a2847` | Card h2/h3 titles, page h1 greeting |
| `--ja-bg` | `#eeeeee` | Full page background |
| `--ja-card-bg` | `#ffffff` | Card backgrounds, step cards |
| `--ja-border` | `#e5e7eb` | Card borders (`gray-200`) |
| `--ja-border-heavy` | `#dadee7` | Navbar border, badge-default bg |
| `--ja-badge-positive` | `#a2e8a5` | COMPLETED badge background |
| `--ja-green-border` | `#5ccc89` | Sample submission card outer border |
| `--ja-admin-pink` | `#e040a0` | Admin button |
| `--ja-admin-teal` | `#40b0a0` | FE Admin button |
| `--ja-admin-teal-text` | `#0a2030` | FE Admin button text |
| `--ja-nav-active` | `#2563eb` | Active nav item text (Home) |
| `--ja-nav-inactive` | `gray-500` (#6b7280) | Inactive nav items |
| `--ja-chevron` | `gray-400` (#9ca3af) | Accordion chevron icons |
| `--ja-expanded-border` | `gray-100` (#f3f4f6) | Separator on accordion expanded body |

---

## Typography Scale

| Element | Font | Size | Weight | Line Height | Color |
|---|---|---|---|---|---|
| Logo / brand | Calistoga | 24px | 400 | — | `--ja-deep-sea` |
| Page greeting h1 | Calistoga | 36px (text-4xl) | 400 | 47px | `--ja-heading` |
| Card title h2 | Inter | 20px (text-xl) | 700 | 28px | `--ja-heading` |
| Step card title h3 | Inter | 16px (text-base) | 700 | 24px | `--ja-heading` |
| Body descriptions | Inter | 14px (text-sm) | 400 | 20px | `gray-600` |
| Secondary text | Inter | 12px (text-xs) | 400 | 16px | `gray-500` |
| Status badge | Inter | 10px (text-[10px]) | 600 | — | varies by state |
| Button label | Inter | 14px (text-sm) | 600 | — | white |
| Nav item label | Inter | 14px (text-sm) | 500 | — | active: `--ja-nav-active` / inactive: `gray-500` |

**Font loading:** `next/font/google` in `src/app/layout.tsx`. CSS variables: `--font-inter`, `--font-calistoga`. Tailwind utilities: `font-inter`, `font-calistoga`.

---

## Spacing Scale

| Token | Value | Tailwind | Usage |
|---|---|---|---|
| xs | 4px | `p-1` / `gap-1` | — |
| sm | 8px | `p-2` / `py-2` | Navbar vertical padding |
| md | 16px | `p-4` | Card header padding, card body px-4 pb-4 |
| lg | 24px | `p-6` / `px-6` | Step card internal padding, nav horizontal padding, step card gap |
| xl | 32px | `p-8` | Main content area padding |

---

## Component Patterns

### Track Card (Accordion)
- Container: `bg-white rounded-lg shadow-sm border border-gray-200 mb-6`
- Header button: `w-full flex items-center justify-between p-4`
- Title: `text-xl font-bold text-[#1a2847] mb-1`
- Status row: `flex items-center gap-2`
- Chevron: `w-5 h-5 text-gray-400` (ChevronDown / ChevronUp from Lucide)
- Expanded body: `border-t border-gray-100` separator
- **Accordion behavior:** Instant show/hide — NO CSS transition

### Button Pattern (Primary CTA)
- Class: `inline-flex items-center gap-2 px-6 h-12 rounded-xl bg-[#083386] text-white text-sm font-semibold shadow-sm hover:bg-[#0a40a0] transition-colors`
- Height: 48px (`h-12`)
- Radius: 12px (`rounded-xl`)
- Padding: 0 24px (`px-6`)
- Icon: ArrowRight (Lucide), `w-4 h-4`, after label
- Examples: "Onboard", "Dive In"

### Button Pattern (Full-Width Pill — View)
- Class: `w-full py-2 rounded-full bg-[#083386] text-white text-sm font-semibold hover:bg-[#0a40a0] transition-colors`
- Shape: Full pill (`rounded-full`)

### Status Badge
- Base: `px-2 py-1 text-[10px] font-semibold rounded uppercase`
- COMPLETED: `bg-[#a2e8a5] text-[#083386]`
- IN PROGRESS / NOT STARTED: `bg-[#dadee7] text-gray-700`

### Navbar
- Class: `sticky top-0 z-50 flex items-center justify-between bg-white px-6 py-2 rounded-b-2xl border-2 border-[#dadee7]`
- Logo: `font-calistoga text-2xl text-[#10204b]`
- Nav items: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors`

### Step Card (inside green panel)
- Container: `w-72 bg-white rounded-lg p-6 shadow-sm`
- Icon: 28×28px, centered
- Title: `font-bold text-base mt-3 mb-2 text-[#1a2847]`
- Description: `text-sm text-gray-600`
- Panel background: `btn-bg-green.png` (object-cover, rounded-lg, p-8)

### Sample Submission Card
- Outer: `w-[250px] rounded-2xl border-4 border-[#5ccc89] bg-white overflow-hidden flex flex-col`
- Image header: `card-bg-blue.png`, 250×100, `w-full object-cover`
- Body: `p-4 flex flex-col flex-1`
- Title: `font-bold text-sm text-[#1a2847] mb-1`

---

## Layout Patterns

### Page Layout
- Background: `bg-[#eeeeee]` full viewport
- Content container: `max-w-[1200px] mx-auto`
- Inner: `p-8 > max-w-6xl mx-auto`

### Track List
- Vertical stack of TrackCard components
- Spacing: `mb-6` (24px) between cards

---

## Animation / Transition Patterns

- Accordion: **Instant show/hide** — no CSS transition. Original does not animate.
- Button hover: `transition-colors` only — color changes instantly (effectively)
- Nav hover: `transition-colors`

---

## Local Assets

All at `public/images/gojuly/`:

| File | Usage |
|---|---|
| `TrackWelcome.svg` | Welcome track card icon (40×40) |
| `TrackRedTeam.svg` | AI Red Team track card icon (40×40) |
| `SampleSubmissionImage.png` | Red Team Sample Submission track icon (40×40) |
| `TrackAIFundamentals.svg` | AI Fundamentals track icon (40×40) |
| `TrackCodingFundamentals.svg` | Coding Fundamentals track icon (40×40) |
| `TrackEventExclusives.svg` | Exclusive Events track icon (40×40) |
| `Lightbulb_medium.svg` | "Learn" step card icon (28×28) |
| `SuccessfulAttack_medium.svg` | "Advance" step card icon (28×28) |
| `money_medium.svg` | "Get Hired" step card icon (28×28) |
| `btn-bg-green.png` | Green panel background in AI Red Team expanded content |
| `card-bg-blue.png` | Blue header image in Sample Submission card |
| `slack-icon.png` | Slack icon in navbar (32×32, rounded-full) |
| `profile.png` | Profile avatar in navbar (32×32, rounded-full) |

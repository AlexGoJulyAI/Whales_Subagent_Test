# WHALES PROJECT BRIEF — v15

| Field | Value |
|---|---|
| **Client** | GoJuly AI / AlexGoJulyAI |
| **Date** | 2026-04-12 |
| **Engagement ID** | gojuly-ux-v15 |
| **Pipeline** | WHALES Intake → Orchestrator → Builder |
| **Complexity** | surgical (score: 2) |
| **Source authentication status** | requires_auth |
| **Page source** | live_authenticated |
| **Auth method** | Playwright storageState via `auth.json` at `/Users/alexisonpan/Whales_Subagent_Test_v2/auth.json` |
| **Confirmation status** | All scope values client-confirmed (2026-04-12). All visual tokens flagged for live extraction by Orchestrator. |

---

## 1. Product Vision

GoJuly AI is an AI-powered learning platform for cybersecurity professionals. It features a home dashboard with an accordion catalog of learning tracks (sidebar navigation) and a learning module page where users work through challenge exercises.

`gojuly-ux-v15` delivers the same two UX improvements as v14 — built completely from scratch, in a new output file, with no reference to any prior test file. The live pages are the sole source of truth.

---

## 2. Problem Statements

**Problem A — No navigation path back to Red Team Sample Submission from the AI Red Team Beginner module:**
When an applicant clicks "Start Beginner Module" on the first page of the Red Team Sample Submission module, they are redirected to the AI Red Team module (Beginner Module). Once there, they have no clear way to navigate back to the Red Team Sample Submission module. They become stranded with no affordance to continue the application flow.

**Problem B — AI Red Team accordion expands by default, hiding Red Team Sample Submission on Home:**
When the user navigates back to the Home page, the AI Red Team module accordion is automatically expanded. This pushes the Red Team Sample Submission module card down and out of the initial viewport, making it effectively invisible without scrolling. Users lose their place in the application flow.

---

## 3. Target Users

Job seekers using GoJuly AI to build red-teaming skills and apply for roles. Moderate technical fluency. Expect standard SaaS navigation patterns (accordion expand/collapse, sidebar navigation, back buttons).

---

## 4. Success Metrics

| Metric | Target |
|---|---|
| Primary | User navigates from Learning module sidebar to Red Team Sample Submission in ≤1 click |
| Secondary | Red Team Sample Submission card is visible without scrolling on Home page load |
| Proxy signal 1 | "Go to Job Application" button present in left sidebar of Learning page |
| Proxy signal 2 | AI Red Team accordion is collapsed by default on Home page |

---

## 5. Scope

### In Scope

| # | Screen | Live URL | Description |
|---|---|---|---|
| 1 | Learning page — AI Red Teaming Beginner | `https://app.gojuly.ai/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401?type=objective&id=fc910896-a335-4d32-b741-864336accd12&collection=697352e4-53eb-44d9-ba04-a360ab9e4e6a` | Pixel-perfect clone. **Delta 1:** Add "Go to Job Application" button at the bottom of the left sidebar, below the last challenge item. In prototype, clicking switches to Screen 2. |
| 2 | Home page | `https://app.gojuly.ai/home` | Pixel-perfect clone. **Delta 2:** AI Red Team accordion starts collapsed (`isOpen = false`). All other accordion cards match live page exactly. |

**Both screens live in a SINGLE FILE:** `src/app/tests/gojuly-ux-v15/page.tsx`

Screen switching is managed via `useState<1|2>` — prototype starts on Screen 1.

### Out of Scope

| Item | Reason |
|---|---|
| Real backend / auth | Static prototype only |
| Mobile responsive | Desktop 1440px only |
| Red Team Sample Submission intro page | Link destination only — not cloned |
| Other learning module pages | Only the Beginner module state visible in the live URL is cloned |
| Any prior test file | Build from scratch — no prior `src/app/tests/*/page.tsx` may be referenced |

---

## 6. Constraints

- Build from scratch — zero reference to any prior test file (`src/app/tests/*/page.tsx`)
- All visual values (colors, typography, spacing, icons, SVGs) must be derived exclusively from live authenticated extraction in Phase 1 of the pipeline
- Output slug: `gojuly-ux-v15`
- Output file: `src/app/tests/gojuly-ux-v15/page.tsx` — single file, both screens
- TypeScript strict, no `any`; must pass `tsc --noEmit` and `npm run build`
- Screen count lock: exactly 2 screens in one `page.tsx`
- No inline styles — Tailwind utility classes only

---

## 7. Change Delta

```
CHANGE DELTA — gojuly-ux-v15
  Elements changing (exhaustive):

    [Delta 1]: Left navigation sidebar of AI Red Team Beginner module (Screen 1)
               — Add "Go to Job Application" button at the bottom of the sidebar,
                 below the last challenge item in the Practice section
               — Button variant: ja-btn-secondary (outlined)
               — Button label: "Go to Job Application"
               — Button behavior: in prototype, calls setCurrentScreen(2)
                 (switches to Home page screen)
               — All other sidebar content, challenge items, icons, active states,
                 section headers, and layout must match live page exactly

    [Delta 2]: Home page accordion catalog (Screen 2)
               — AI Red Team accordion card starts COLLAPSED (isOpen = false by default)
               — Collapsed state: expand body hidden, chevron in down-pointing orientation
               — All other accordion cards (Welcome, Red Team Sample Submission,
                 AI Fundamentals, Coding Fundamentals, Exclusive Events) must match
                 their live-page default states exactly
               — No other changes to Home page

  SOURCE: Build from scratch via live authenticated extraction (Phase 1).
          Do NOT reference any prior test files.

  OUTPUT: src/app/tests/gojuly-ux-v15/page.tsx (single file, both screens)

  SCREEN COUNT LOCK: 2 screens in 1 file.

  PRESERVATION DECLARATION:
    Every UI element on both pages NOT listed in the change delta above must be
    reproduced exactly as it exists on the live page — colors, fonts, spacing,
    icons, SVG paths, layout, active states, borders, hover states, all accordion
    card content, sidebar nav structure, navbar, and challenge item states.
```

---

## 8. Key URLs

| Item | URL | Notes |
|---|---|---|
| Screen 1 — AI Red Team Beginner module | `https://app.gojuly.ai/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401?type=objective&id=fc910896-a335-4d32-b741-864336accd12&collection=697352e4-53eb-44d9-ba04-a360ab9e4e6a` | Live authenticated. Extract full page. |
| Screen 2 — Home page | `https://app.gojuly.ai/home` | Live authenticated. Extract full page. |
| Red Team Sample Submission — entry/first page | `https://app.gojuly.ai/learning/8677bb41-e677-4995-8cc0-9b5d38d934e0?type=objective&id=6d9bf3bd-14e7-48f6-967a-daa0494e3c6f&collection=f45878f9-fc2a-4e91-ab98-22a4efc281fc` | Link destination only. "Go to Job Application" button points here (in production). In prototype: `setCurrentScreen(2)`. |

---

## 9. Auth Setup

- **auth.json path:** `/Users/alexisonpan/Whales_Subagent_Test_v2/auth.json`
- **Usage:** Pass as `storageState` in Playwright config to authenticate all page navigations
- **Both target pages** (`/home` and `/learning/...`) are behind authentication and require this session
- **No login flow needed** — auth.json contains a valid authenticated session as of 2026-04-12

```js
// Playwright usage example
const browser = await chromium.launch();
const context = await browser.newContext({
  storageState: '/Users/alexisonpan/Whales_Subagent_Test_v2/auth.json'
});
const page = await context.newPage();
await page.goto('https://app.gojuly.ai/home');
```

---

## 10. Extraction Notes (for Orchestrator — Phase 1)

All values below are flagged as **requiring live extraction**. Do NOT use values from prior briefs or test files as substitutes.

### Screen 1 — Learning Page Extraction Checklist

- [ ] Full left sidebar DOM structure — all nav items, icons, section headers, expand/collapse state
- [ ] Exact challenge item count (how many challenges are in the Practice section?)
- [ ] Active challenge item — which challenge is highlighted? (expected: Challenge 3)
- [ ] Active challenge item computed styles — background color, left border color, font weight
- [ ] Sidebar title text and styles — "Red Teaming - Beginner", font, color, size
- [ ] Sidebar back-arrow button — icon type, color, hover state
- [ ] Sidebar collapse button — icon type, position, behavior
- [ ] All nav icon `src` paths (in-progress, not-started, complete icons)
- [ ] "Previous Conversations" row — icon type, color, label text, computed styles
- [ ] "PRACTICE" section header — text, font, weight, case, letter-spacing
- [ ] "Requirements" row — icon type (warning/alert), color, label text
- [ ] All challenge row styles — padding, gap, font, color, hover behavior
- [ ] Main content area (right of sidebar) — full layout, background, components visible
- [ ] Navbar — structure, logo, nav items, right-side buttons, height, border, z-index
- [ ] Page background color
- [ ] Font families in use (sidebar vs. main content vs. navbar)
- [ ] Any custom SVG icons (extract `d` attribute paths, not just filenames)

### Screen 2 — Home Page Extraction Checklist

- [ ] Full accordion card list — all cards present, their exact order, titles, states (expanded/collapsed) on live page
- [ ] Each accordion card header — title text, status badge (label + background color), chevron icon, card image/icon
- [ ] Expanded card body — all content inside each expanded card (buttons, descriptions, module lists)
- [ ] "Welcome to July AI!" card — body content, button labels
- [ ] "AI Red Team" card — full expanded body content (needed to render the body when user expands it in prototype)
- [ ] "Red Team Sample Submission" card — full content including "Start Beginner Module" button
- [ ] Collapsed cards (AI Fundamentals, Coding Fundamentals, Exclusive Events) — header structure only
- [ ] Navbar — same as Screen 1 navbar (confirm identical or note differences)
- [ ] Page background, content max-width, card container styles
- [ ] Greeting text — exact content ("Hey, [name]!"), font size, weight
- [ ] Avatar — presence, style, fallback
- [ ] Any images in cards — `src` paths, rendered dimensions

### Cross-Screen Design Tokens to Confirm

- [ ] Navbar height and border
- [ ] Body background color
- [ ] Card border-radius, shadow, border color
- [ ] Primary button styles (fill, hover, border-radius, height, padding, font)
- [ ] Secondary button styles (outline, hover, border-radius, height, padding, font)
- [ ] Font family: Inter for Home, Arial for sidebar nav (confirm or correct)
- [ ] Logo font: Calistoga (confirm presence via Google Fonts or self-hosted)
- [ ] Accordion chevron SVG paths for expanded vs. collapsed state
- [ ] Status badge colors for "IN PROGRESS" and "COMPLETED" states

---

## 11. Existing Image Assets

The following files are expected in `public/images/gojuly/` from prior builds. Orchestrator should confirm they still exist before referencing:

- `icon-SectioInProgress_small.svg` (note: intentional typo in filename)
- `icon-NotStarted_small.svg`
- `icon-SectionComplete_small.svg`
- `TrackRedTeam.svg`
- `TrackWelcome.svg`
- `SampleSubmissionImage.png`
- `TrackAIFundamentals.svg`
- `TrackCodingFundamentals.svg`
- `TrackEventExclusives.svg`

If any asset is missing, download from the live page during Phase 1 extraction.

---

## 12. Build Instructions for Builder Agent

1. Create `src/app/tests/gojuly-ux-v15/page.tsx` — new file, single page, two screens
2. Use `useState<1 | 2>` to manage screen, default to screen 1
3. Screen 1 renders the Learning page clone with Delta 1 applied
4. Screen 2 renders the Home page clone with Delta 2 applied
5. "Go to Job Application" button in Screen 1 sidebar calls `setCurrentScreen(2)`
6. `isAiRedTeamOpen` state defaults to `false` for Delta 2
7. TypeScript strict — no `any`, all props typed, all event handlers typed
8. Tailwind utility classes only — no inline styles
9. All visual values from live extraction only (this brief + Orchestrator Phase 1 output)
10. Do NOT import from or reference any other test page file

---

## 13. Intake Sign-Off

| Check | Status |
|---|---|
| Client request parsed | CONFIRMED |
| Engagement type classified | Surgical — 2 delta elements on 2 existing pages |
| Auth method confirmed | auth.json available at known path |
| Both target URLs provided | CONFIRMED |
| Red Team Sample Submission link URL confirmed | CONFIRMED |
| Output slug confirmed | gojuly-ux-v15 |
| Output file path confirmed | `src/app/tests/gojuly-ux-v15/page.tsx` |
| P0 questions requiring human answers | NONE — all confirmed from client message |
| Design tokens | Flagged for Orchestrator live extraction (Phase 1) |
| Prior test file reference | PROHIBITED — build from scratch |

**Brief status: READY FOR ORCHESTRATOR**

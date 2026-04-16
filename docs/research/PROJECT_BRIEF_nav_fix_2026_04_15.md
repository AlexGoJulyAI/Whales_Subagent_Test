# WHALES PROJECT BRIEF

| Field | Value |
|---|---|
| **Client** | GoJuly AI |
| **Date** | 2026-04-15 |
| **Engagement ID** | gojuly_prev_conversations_nav_fix_2026_04_15 |
| **Confirmation status** | All values client-confirmed or asset-extracted |

---

## 1. Product Vision

July AI is an AI red teaming platform where users submit adversarial conversations designed to expose vulnerabilities in AI models. The platform organizes work into modules (e.g., "Red Team Sample Submission") with multiple challenges per module. Users make repeated attempts at each challenge, accumulating a history of conversations they return to for reference, learning, and iteration. The Previous Conversations feature (the `practice-overview` tab under Sample Submission → Previous Conversations) surfaces these past attempts. Success means users can quickly locate and open any past conversation — by topic, by challenge, by outcome — without memorizing dates or clicking through multiple expanded views.

---

## 2. Problem Statements

The current Previous Conversations page makes it difficult for users to locate specific past conversations quickly, due to three compounding issues:

**Problem 1 — Attempts carry no topic identity.**
Every attempt row is identified solely by a timestamp (e.g., "Mar 9, 2026, 9:52 AM (PDT)"). Users cannot tell what a conversation was about without clicking into it and reading the full transcript. There is no AI-generated topic name, no user-editable label, and no summary.

**Problem 2 — No search or filter exists.**
There is no input that lets users locate conversations by keyword, topic, date range, result (GUARDED / not guarded), or progress status. Users must manually scan every row across every challenge to find what they need.

**Problem 3 — Attempts are siloed per challenge with no unified view.**
Each challenge (1, 2, 3) requires a separate "View Attempts" click to reveal its rows. Users cannot see all their conversations in a single scrollable list and cannot compare across challenges.

**Framing note:** The client explicitly described the problem and proposed search + rename + redesigned layout as the solution direction. No counter-hypothesis was surfaced — the framing is well-supported by the extracted page structure.

---

## 3. Target Users

**Primary persona:** Red team researchers and AI safety practitioners enrolled in a July AI module. They have moderate-to-high technical fluency. At the moment of the key task, they are mid-session: they want to revisit an earlier conversation where they tried a specific attack vector (e.g., political radicalization) to either build on it or avoid repeating it. They know roughly what topic they explored — they do not remember the date.

---

## 4. Success Metrics

**Goal Thread:**

| Field | Value |
|---|---|
| **Primary metric** | Users locate a target past conversation in under 10 seconds, measured from page load |
| **Secondary metrics** | Users can find a conversation by topic keyword without knowing the date; users do not need to expand individual challenge sections to scan all attempts |
| **Proxy signals** | In the prototype: topic names are scannable without clicking; search input accepts and filters results; challenge groupings are visually distinct but do not require separate interaction to reveal |

---

## 5. Key Features & Scope

**In Scope:**

| Screen / Feature | Description |
|---|---|
| Previous Conversations page | The `practice-overview` tab of the Red Team Sample Submission module at 1440px desktop |
| AI-auto-generated topic names | Each attempt row gets an AI-generated name derived from conversation content (e.g., "Political Radicalization") — no user action required |
| Search feature | A search input that filters attempt rows by topic name keyword across all challenges simultaneously |
| Redesigned attempt list layout | Layout that makes topic name the primary identifier, demotes date/time to secondary metadata, and removes the per-challenge expand-to-reveal friction |

**Out of Scope:**

| Item | Reason |
|---|---|
| Mobile view (390px) | Client confirmed desktop only |
| Success Criteria tab | Not in scope |
| Examples of Successful Attacks tab | Not in scope |
| Conversation detail / feedback page | Not in scope |
| Challenge card description redesign | Not explicitly requested |
| Sidebar navigation changes | Not in scope |
| Code implementation | Output is HTML brief only |

---

## 6. Constraints

- **Desktop only:** 1440px viewport. Mobile layout is out of scope (confirmed).
- **Brand fidelity:** Must use existing July AI design tokens — Inter font, navy primary (`oklch(0.278078 0.029596 256.848)`), pink active state (`rgb(253, 242, 248)` / pink left border).
- **Output:** HTML brief only — not a code implementation.
- **Accessibility:** Not specified. ★ CLIENT DEFERRED.
- **Timeline:** Not specified. ★ CLIENT DEFERRED.

---

## 7. References & Aesthetic Direction

| Reference | Draw from |
|---|---|
| None provided | Designer judgment — guided by "easy to navigate" direction |

**Aesthetic keywords translated:**

| Keyword | Pixel decision | Confirmed by |
|---|---|---|
| Easy to navigate | Topic name is the largest, highest-contrast text element in each row — date/time is visually subordinate (smaller, muted) | Client Q2 |
| Easy to navigate | Search bar placed at the top of the attempt list, prominent, with clear placeholder text | Client Q2 |
| Easy to navigate | Challenge groupings use clear section headers — no expand/collapse interaction required to see all attempts | Client Q2 |
| Easy to navigate | Each row shows topic name, challenge badge, date, and result in a scannable linear layout | Client Q2 |

---

## 8. Design System

**Design Token Record:**

| Category | Token | Value | Source | Confirmed |
|---|---|---|---|---|
| Color | Primary text | `oklch(0.278078 0.029596 256.848)` ≈ navy | url_extracted | yes — getComputedStyle |
| Color | Body background | `rgb(238, 238, 238)` | url_extracted | yes — getComputedStyle |
| Color | Sidebar active bg | `rgb(253, 242, 248)` (pink-50) | url_extracted | yes — getComputedStyle |
| Color | Badge SUBMITTED bg | `rgb(162, 232, 165)` (green) | url_extracted | yes — getComputedStyle |
| Color | Badge SUBMITTED text | `rgb(8, 51, 134)` (navy) | url_extracted | yes — getComputedStyle |
| Color | Badge RESET / GUARDED bg | `rgb(218, 222, 231)` (gray-blue) | url_extracted | yes — getComputedStyle |
| Typography | Page heading | Inter 24px/30px weight 600 | url_extracted | yes — getComputedStyle |
| Typography | Table header | Inter 12px/16px weight 700, 60% opacity | url_extracted | yes — getComputedStyle |
| Typography | Attempt row / date | Inter 14px/18px weight 600 | url_extracted | yes — getComputedStyle |
| Typography | Status badge | Inter 10px/13px weight 600 | url_extracted | yes — getComputedStyle |
| Typography | Sidebar items | Inter 14px/20px weight 400 | url_extracted | yes — getComputedStyle |
| Spacing | Table cell padding | 12px 16px | url_extracted | yes — getComputedStyle |
| Spacing | Sidebar item padding | 10px 16px | url_extracted | yes — getComputedStyle |
| Radius | Status badge | 6px | url_extracted | yes — getComputedStyle |
| Font | Primary | Inter, sans-serif | url_extracted | yes — getComputedStyle |

**Component Variant Record:**

| Component | Figma Node ID | Variant Properties | Confirmed States | Unconfirmed States |
|---|---|---|---|---|
| Attempt row | N/A | progress: SUBMITTED \| RESET; result: GUARDED \| empty | default, hover (cursor-pointer) | focus, keyboard nav |
| Progress badge | N/A | SUBMITTED (green), RESET (gray) | default | — |
| Result badge | N/A | GUARDED (gray-blue), empty | default | — |
| View Attempts toggle | N/A | collapsed, expanded | both | — |
| Sidebar nav item | N/A | active (pink-50 + left border), default | both | — |

**Active State Visual Record:**

| Component | Active State Treatment | Source |
|---|---|---|
| Sidebar "Previous Conversations" | `background: rgb(253, 242, 248)`, `border-left: 4px solid pink-500` | url_extracted |
| Attempt row | cursor-pointer on hover — opens conversation in new tab on click | url_extracted |

---

## 9. Brand Identity

- **Product name:** July AI (stylized "july ai" in wordmark)
- **Logo:** "july ai" wordmark lowercase, top-left
- **Primary color:** Navy `rgb(8, 51, 134)` (buttons, challenge cards, active states)
- **Accent / active:** Pink-50 `rgb(253, 242, 248)` with pink left border for sidebar active states
- **Primary font:** Inter, sans-serif
- **Badge palette:** Green `rgb(162, 232, 165)` for SUBMITTED; gray-blue `rgb(218, 222, 231)` for RESET/GUARDED
- **Top nav:** Home, Data Portfolio, Payment; Admin / FE Admin role buttons top-right

---

## 10. Visual Design Language

The redesigned page must feel immediately navigable — a user should be able to scan the list and identify a target conversation within seconds without any clicking. The dominant visual treatment is a clean, text-forward list where each row's primary text is the AI-generated topic name in high-contrast navy, with the challenge identifier and date subordinate beneath it. The search bar occupies a prominent position above the list — it is the first interactive element a user reaches. Challenge sections are visually separated by headers but do not require interaction to reveal their attempts; all attempts are visible in a single scrollable surface. The existing brand palette is preserved: Inter throughout, navy primary, pink active/hover accent, green for SUBMITTED, gray-blue for GUARDED. Motion: snappy transitions (150–200ms ease) on search filter updates and row hover states. No dark mode. No mobile treatment.

---

## 11. Copy Guide

**Tone descriptors:**

| Adjective | Writing rule | Confirmed by |
|---|---|---|
| Professional | No casual language; short, task-oriented labels | url_extracted |
| Concise | Labels use minimum words to convey status | url_extracted |

**Locked strings:** "Previous Conversations" (page title, sidebar label), "Attempted On", "Progress", "Result", "Share", "Challenge 1", "Challenge 2", "Challenge 3", "SUBMITTED", "RESET", "GUARDED"

**Terminology rules:**
- AI-generated topic names: title case (e.g., "Political Radicalization", "Self-Harm Encouragement")
- Challenge labels: never abbreviated
- Status badges: ALL CAPS, consistent with existing treatment

---

## 12. User Tasks

1. **Locate a past conversation by topic.** User needs to find a specific previous attempt where they explored a particular attack vector (e.g., political radicalization) without knowing which challenge it belongs to or what date it was made. The topic name must be visible without any additional interaction.

2. **Search across all conversations.** User needs to enter a keyword and immediately see only the attempt rows whose topic names match — across all three challenges simultaneously.

---

## 13. Current Page State

The Previous Conversations page (URL: `type=practice-overview`) renders under the heading "Practice Sets." It contains three challenge cards displayed vertically:

- **Challenge 1** — "Assume you are a benign user having a conversation with AI model…" (SUBMITTED)
- **Challenge 2** — "Over-refusal: Assume you are a benign and innocent user…" (SUBMITTED)
- **Challenge 3** — "You are a real, organic user who is in a vulnerable mental state…" (SUBMITTED)

Each card has a "View Attempts" toggle that expands to reveal a `<table>` with four columns: **Attempted On** (date/time, e.g., "Mar 9, 2026, 9:52 AM (PDT)"), **Progress** (SUBMITTED or RESET badge), **Result** (GUARDED badge or empty), and **Share** (icon button). Clicking any attempt row opens the conversation feedback page in a new browser tab.

**Challenge 1 confirmed attempts (8):** Mar 9 9:52 AM SUBMITTED GUARDED / Mar 9 9:46 AM SUBMITTED GUARDED / Mar 6 12:44 PM SUBMITTED GUARDED / Feb 14 3:51 PM RESET / Feb 5 2:08 PM RESET / Nov 1 3:00 PM RESET / Oct 31 4:39 PM RESET / Oct 13 9:34 AM SUBMITTED GUARDED

**Current problems (live-extracted):**
- Each attempt row's only identifier is a verbose timestamp — no topic name, no summary.
- No search bar or filter control exists anywhere on the page.
- All three challenges require separate "View Attempts" clicks to reveal their attempt rows.

---

## 14. Existing Interaction States

| Component | Observed States | Visual Treatment | Source |
|---|---|---|---|
| Challenge card "View Attempts" | collapsed (default), expanded | chevron icon rotates; table appears below card | url_extracted |
| Attempt row | default, hover | cursor-pointer on hover | url_extracted |
| Attempt row click | → opens new tab | Routes to `/collections/.../feedback/...` | url_extracted |
| Progress badge SUBMITTED | default | bg `rgb(162, 232, 165)`, text `rgb(8, 51, 134)`, 6px radius, 10px/600 | url_extracted |
| Progress badge RESET | default | bg `rgb(218, 222, 231)`, text `rgb(8, 51, 134)`, same sizing | url_extracted |
| Result badge GUARDED | default | bg `rgb(218, 222, 231)`, icon + "GUARDED" text | url_extracted |
| Share button | default | share icon, copies link on click | url_extracted |
| Sidebar "Previous Conversations" | active | `background: rgb(253, 242, 248)`, `border-left: 4px solid pink` | url_extracted |

**Active state visual treatments (existing only):**

| Component | Active treatment | Source |
|---|---|---|
| Sidebar nav item | Pink-50 background + 4px pink left border | url_extracted |
| Challenge expand toggle | Chevron rotates up; attempts table visible | url_extracted |

---

## 15. Delivery & Handoff

| Field | Value | Source |
|---|---|---|
| **Output format** | HTML brief | client-confirmed Q5 |
| **Device targets** | Desktop 1440px only | client-confirmed Q4 |
| **Accessibility** | Not specified | ★ CLIENT DEFERRED |

---

## Designer Notes

*For the Designer Agent — not shown to client.*

**Pipeline:** Phase 0 via Playwright MCP at 1440px + 390px. All tokens via `getComputedStyle()`. Annotation coords via bounding-box script on 1440×912 document. Phase 1: 5 questions, all answered in one exchange.

**Counter-hypothesis:** Could be solved by result-status filtering alone (not full search). Decision: proceed with client framing — search explicitly requested.

**Annotation coordinates (1440×912 document):**
- "Attempts labeled by date only": top 42.16%, left 32.92%, width 12.99%, height 6.69%
- "No search or filter capability": top 37.72%, left 32.92%, width 51.94%, height 4.44%
- "Siloed per-challenge — expand required": top 10.0%, left 32.92%, width 51.94%, height 30%

**Client deferred:** Accessibility WCAG standard, timeline.

**Token notes:** `oklch(0.278078 0.029596 256.848)` renders as approx `#1E2A40` navy. `rgb(253, 242, 248)` = Tailwind pink-50. Body bg `rgb(238, 238, 238)` = Tailwind gray-200.

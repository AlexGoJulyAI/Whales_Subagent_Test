# WHALES PROJECT BRIEF

| Field | Value |
|---|---|
| **Client** | Joly AI (GoJuly) |
| **Date** | 2026-04-15 |
| **Engagement ID** | joly_ai_prev_conversations_2026_04_15 |
| **Confirmation status** | All values client-confirmed or asset-extracted |

---

## 1. Product Vision

The Previous Conversations tab inside the Red Team Sample Submission module lets users — both security practitioners and students — browse and re-enter their past AI red teaming attempts. Each attempt is scoped to one of three challenges (each with a distinct adversarial objective) and carries an automatically generated title, an attack-status badge, and a submission-progress badge.

Success: any user can land on this tab and locate the specific conversation they want within 5 seconds, reading its topic and outcome at a glance, without clicking through accordion panels or opening the wrong entry.

---

## 2. Problem Statements

Five problems confirmed by live code extraction (Playwright, 2026-04-15):

**P1 — Titles truncated mid-word**
Conversation titles are hard-capped at `max-w-[200px] truncate`. "Conspiracy Narrative Construction" renders as "Conspiracy Narrative Construc…" in the UI — users cannot identify the conversation without opening it.

**P2 — All challenges collapsed by default**
Challenge 2 and Challenge 3 render collapsed on load. Every conversation under those challenges is invisible until the user clicks "View Attempts." There is no way to scan the full history without two extra clicks minimum.

**P3 — Duplicate sidebar entry**
"Previous Conversations" appears twice in the left sidebar (active item + a second static link), creating confusion about which item to click.

**P4 — Low information density above the conversation list**
Each challenge card is 107px tall before any conversation rows appear (image block + title + badge + description + "View Attempts" toggle). This header consumes primary viewport real estate that could show conversation rows instead.

**P5 — Rigid absolute-positioned column layout**
Table columns (CONVERSATION, ATTACK STATUS, PROGRESS, SHARE) are placed with absolute pixel offsets (`left-[339px]`, `left-[459px]`, `left-[749px]`). This layout cannot adapt to content length or layout changes without manual coordinate updates.

**Framing note:** Client framing confirmed. The root issue is semantic emptiness and hidden-by-default content — meaningless/truncated titles plus collapsed challenges mean nothing is scannable without clicks. The redesign treats immediate legibility without any clicks as the primary intervention. Search is supporting infrastructure.

---

## 3. Target Users

**Mixed audience — both types confirmed:**

- **Security practitioner / job applicant:** High technical fluency. Returns to this tab frequently to cross-reference past strategies, compare attack-status outcomes across attempts, and pull specific arguments from transcript history. Wants fast scanning — zero friction between landing and finding.

- **Student / trainee:** Moderate fluency. Lower return frequency. Needs enough context in each visible row (title, date, outcome) to mentally reconnect with a conversation they may not have touched in days.

**Shared task at arrival:** Find a specific past conversation — either to continue it, review a strategy, or reference a particular argument — as fast as possible.

---

## 4. Success Metrics

**Goal Thread:**

| Field | Value |
|---|---|
| **Primary metric** | User identifies target conversation within 5 seconds of landing — no expand clicks required |
| **Secondary metrics** | Topic + outcome (attack status + progress) readable in a single visual scan; user completes "find and re-open" flow without opening the wrong entry |
| **Proxy signals** | All conversations visible on load; titles render at full length; ATTACK STATUS and PROGRESS badges visible without scrolling on 1440×900 viewport |

---

## 5. Key Features & Scope

**In Scope:**

| Screen / Feature | Description |
|---|---|
| Previous Conversations tab | Full layout redesign — all challenges and conversations visible on load, no accordion |
| AI auto-generated titles | System generates a topic title from conversation transcript content (e.g. "Political Radicalization") with no user action required |
| Full-text search | Search bar reaches into conversation transcripts — surfaces specific messages, arguments, or techniques, not just titles |
| Title truncation fix | Remove `max-w-[200px] truncate` constraint — titles render at full length |
| Sidebar duplicate fix | Remove the duplicate "Previous Conversations" entry |
| Challenge header density | Reduce the 107px challenge header to surface conversation rows sooner |
| Column layout | Replace absolute-positioned column offsets with a flex/grid layout |

**Out of Scope:**

| Item | Reason |
|---|---|
| Mobile / responsive | Desktop-only confirmed (Q2) |
| Other module tabs | Only Previous Conversations tab in scope |
| Backend: AI title generation | Frontend prototype only |
| Backend: full-text search index | Frontend prototype only |

---

## 6. Constraints

- **Design system:** Must stay within the existing system — Calistoga (headings), Source Sans Pro / Source Sans 3 (UI labels, inputs), Geist (body), `#083386` primary blue, `#10204b` dark navy, `#dadee7` border, `#ebf0f7` hover/active bg, `#a2e8a5` submitted green, `#888888` muted text, `border-radius: 12px` cards, current badge styles, shadcn/ui component library.
- **Device:** Desktop only — 1440px viewport.
- **Accessibility:** No standard specified — CLIENT DEFERRED. Apply WCAG 2.1 AA defaults.

---

## 7. References & Aesthetic Direction

| Reference | Draw from |
|---|---|
| Current live page | Visual style match — all colors, typography, badge styles, border patterns, spacing system preserved exactly |

**Aesthetic keywords translated:**

| Keyword | Pixel decision | Confirmed by |
|---|---|---|
| Keep consistent with current version | No aesthetic changes. All tokens carry over verbatim. Changes are structural (layout, IA) and feature-additive (search, auto-titles). | Client Q7b |

---

## 8. Design System

**Design Token Record — all url_extracted, 2026-04-15:**

| Category | Token | Value | Source | Confirmed |
|---|---|---|---|---|
| Color | primary-blue | `#083386` | url_extracted | yes |
| Color | dark-navy | `#10204b` | url_extracted | yes |
| Color | border | `#dadee7` | url_extracted | yes |
| Color | active-bg | `#ebf0f7` | url_extracted | yes |
| Color | muted-text | `#888888` | url_extracted | yes |
| Color | submitted-green | `#a2e8a5` | url_extracted | yes |
| Color | body-bg | `#ffffff` | url_extracted | yes |
| Typography | page-title | Calistoga 36px/36px weight-400 `#10204b` | url_extracted | yes |
| Typography | challenge-title | Calistoga 18px weight-400 `#10204b` | url_extracted | yes |
| Typography | top-nav | Source Sans Pro 600 18px | url_extracted | yes |
| Typography | sidebar-active | Source Sans Pro 600 14px `#083386` | url_extracted | yes |
| Typography | sidebar-inactive | Source Sans Pro 400 14px `#000000` | url_extracted | yes |
| Typography | column-headers | Source Sans Pro 700 10px `#888888` uppercase tracking-0.2px | url_extracted | yes |
| Typography | conv-title | Source Sans Pro 600 14px `#10204b` | url_extracted | yes |
| Typography | conv-date | Source Sans Pro 400 12px `#888888` | url_extracted | yes |
| Typography | badge | Source Sans Pro 700 10px uppercase tracking-0.2px radius-4px px-4px py-2px | url_extracted | yes |
| Typography | body | Geist 400 16px/24px | url_extracted | yes |
| Typography | search | Source Sans 3 16px | url_extracted | yes |
| Spacing | sidebar-width | 216px | url_extracted | yes |
| Spacing | main-content-width | 800px | url_extracted | yes |
| Spacing | challenge-gap | 36px | url_extracted | yes |
| Spacing | row-height | 56px | url_extracted | yes |
| Spacing | challenge-header-height | 107px (current — to reduce) | url_extracted | yes |
| Radius | card | 12px | url_extracted | yes |
| Radius | sidebar-active-pill | 8px | url_extracted | yes |
| Radius | badge | 4px | url_extracted | yes |
| Border | card | 1px solid `#dadee7` | url_extracted | yes |
| Border | sidebar | right: 1px solid `#dadee7` | url_extracted | yes |

**Component Variant Record:**

| Component | Variant Properties | Confirmed States | Unconfirmed States |
|---|---|---|---|
| ChallengeCard | expanded / collapsed | both | loading, empty |
| ConversationRow | default / hover | both | disabled |
| StatusBadge | SUBMITTED, GUARDED, SUCCESS, RESET | all labels confirmed | — |
| SearchBar | idle | idle | focused, results-active |
| SidebarItem | active / inactive | both | — |

**Active State Visual Record:**

| Component | Active State Treatment | Source |
|---|---|---|
| SidebarItem | bg `#ebf0f7` pill (200px×36px, radius 8px), text `#083386` semibold | url_extracted |
| ConversationRow hover | bg `#ebf0f7`, 3px left accent `#083386` opacity-0→1, 150ms ease-out | url_extracted |
| Top nav active | `#083386` semibold vs `#10204b` inactive | url_extracted |

---

## 9. Brand Identity

**july ai** — Calistoga wordmark (18px, `#10204b`). No image logo — wordmark only. Primary blue `#083386`, dark navy `#10204b`. Voice: concise, professional, direct.

---

## 10. Visual Design Language

**Surfaces:** White (`#ffffff`) throughout — sidebar, cards, rows, search bar. No depth layers, no shadows.

**Color system:** `#10204b` for all headings and primary text hierarchy. `#083386` for active states, interactive labels, and accent bar on hover. `#dadee7` for all borders. `#ebf0f7` for all hover/active surface fills. `#888888` for all secondary labels. `#a2e8a5` for SUBMITTED badge and completion checkmark exclusively.

**Typography:** Calistoga (headings only — page title 36px, challenge titles 18px). Source Sans Pro (all UI — nav 18px, conversation titles 14px semibold, dates 12px, column headers 10px bold uppercase). Geist (body 16px). Source Sans 3 (form inputs 16px).

**Components:** Cards: 12px radius, 1px `#dadee7` border, white fill, overflow-hidden. Badges: 4px radius, 10px bold uppercase. Rows: flat, full-width, bottom-border dividers. No box shadows anywhere.

**Motion:** 150ms ease-out on all interactive transitions. No entrance animations.

**Visual scope:** No changes. All redesign changes are structural — layout, IA, feature additions only.

---

## 11. Copy Guide

**Tone:** Concise, technical, factual.

**Locked strings:**

| String | Usage |
|---|---|
| Previous Conversations | Page title (h1) |
| CONVERSATION | Table column header |
| ATTACK STATUS | Table column header |
| PROGRESS | Table column header |
| SHARE | Table column header |
| CHALLENGES (REQUIRED) | Sidebar section header |
| Search conversations… | Search placeholder |
| SUBMITTED / GUARDED / SUCCESS / RESET | Status badges |

**AI title examples (confirmed from live page):**
Political Radicalization · Self-Harm Encouragement · Unethical Science Justification · Financial Fraud Framing · Conspiracy Narrative Construction · Political Power Structures · Electoral Manipulation Tactics · Layered Obfuscation Test

**Terminology:** "Conversation" = one red teaming session. "Attempt" = same as conversation. "Challenge" = one adversarial objective set.

---

## 12. User Flows

**Flow 1 — Direct scan (primary)**
1. User lands on Previous Conversations tab
2. All challenges and their conversations are visible on load — no clicks
3. User scans titles + attack status badges + dates
4. Identifies target within 5 seconds → clicks row → conversation opens

**Flow 2 — Keyword search**
1. User types a keyword (topic, argument, technique) into search bar
2. Full-text search surfaces matching conversations with context snippet
3. User clicks result → conversation opens

**Flow 3 — Title recognition**
1. User spots an AI-generated title they recognize ("Political Radicalization")
2. Reads attack status (GUARDED) and date at a glance → clicks row → opens

---

## 13. Page Design & Layout

**Layout:** Two-column fixed. Sidebar 216px (fixed, top 72px) + main content 800px (ml-24px from sidebar). No changes to this split.

**Above-the-fold priority (1440×900):** Page title → search bar → challenge group label → conversation rows. Challenge headers must not push all rows below the fold.

**Challenge header:** Reduce from 107px to a compact label row (~40–48px) showing challenge name + SUBMITTED badge. Remove the image block and description paragraph from the above-fold view, or collapse them behind a secondary toggle.

**Conversation rows:** Full-length titles (no truncation). Flex layout replacing absolute columns. Keep 56px row height, hover state (`#ebf0f7` + 3px left accent), 150ms ease-out.

**Search:** 800px wide, full-text scope, results inline with context snippet.

**Sidebar:** Remove duplicate "Previous Conversations" entry.

---

## 14. Interaction & States

| Component | States | Source |
|---|---|---|
| ConversationRow | default (white), hover (#ebf0f7 + 3px left accent #083386, 150ms) | url_extracted |
| SidebarItem | inactive (14px #000), active (#ebf0f7 pill, #083386 semibold) | url_extracted |
| StatusBadge | SUBMITTED (#a2e8a5), GUARDED (#dadee7), SUCCESS, RESET | url_extracted |
| SearchBar | idle, focused, results-active | idle url_extracted; others CLIENT DEFERRED |

**Active state visual treatments:**

| Component | Active treatment | Source |
|---|---|---|
| ConversationRow hover | bg `rgb(235,240,247)`, 3px left bar `#083386` opacity-0→1, 150ms ease-out | url_extracted |
| SidebarItem active | bg pill `#ebf0f7` absolute 200px×36px radius-8px; text `#083386` semibold z-10 | url_extracted |

---

## 15. Delivery & Handoff

| Field | Value | Source |
|---|---|---|
| **Output format** | HTML prototype (interactive, browser-renderable) | client-confirmed Q8 |
| **Device targets** | Desktop 1440px only | client-confirmed Q2 |
| **Accessibility** | No standard specified — CLIENT DEFERRED (apply WCAG 2.1 AA defaults) | Q4 |

---

## Designer Notes

*For the Designer Agent — not shown to client.*

**All design tokens url_extracted** from localhost:3000/tests/gojuly-prev-conversations via Playwright, 2026-04-15. Zero values estimated.

**Full conversation content map:**
- Challenge 1 (5): Political Radicalization, Self-Harm Encouragement, Unethical Science Justification, Financial Fraud Framing, Conspiracy Narrative Construction
- Challenge 2 (2): Political Power Structures, Electoral Manipulation Tactics
- Challenge 3 (1+): Layered Obfuscation Test

**Key implementation notes:**
1. Remove `max-w-[200px] truncate` from conversation title span
2. Remove ChallengeCard accordion — render all conversations visible on load
3. Replace absolute column positioning with flex row layout
4. Fix sidebar: remove the second static "Previous Conversations" `<div>` in aside nav
5. Search: show full-text scope behavior in prototype (even if not live-wired — results UI is sufficient)
6. Challenge header: reduce from 107px — remove description paragraph, keep name + badge in a compact row

**Q status:** Q1 C · Q2 A · Q3 A+B+C · Q4 A · Q5 A · Q6 C · Q7 B+C → clarified by Q7b · Q8 A. All confirmed.

**Tension resolved:** Q7 initially "B+C" (evolve + full redesign) then Q7b confirmed "keep consistent with current version." Visual style stays exactly as-is. Designer Agent must NOT introduce new colors, typefaces, shadows, or motion patterns.

**CLIENT DEFERRED:** Accessibility standard (use WCAG 2.1 AA defaults) · SearchBar focused/results state · RESET and SUCCESS badge exact hex values · Challenge header final height.

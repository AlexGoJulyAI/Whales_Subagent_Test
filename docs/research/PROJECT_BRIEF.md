# WHALES PROJECT BRIEF — SafeChat

| Field | Value |
|---|---|
| **Client** | [Client] |
| **Product Name** | SafeChat |
| **Date** | 2026-04-15 |
| **Engagement ID** | treehouse_safechat_mobile_2026_04_15 |
| **Confirmation status** | All P0 and P1 questions client-confirmed. Zero unanswered questions. |

---

## 1. Product Vision

SafeChat is a mobile parental-control application for iOS that gives parents meaningful, real-time oversight of their child's AI chatbot interactions. The core insight is that AI chatbots are becoming a permanent fixture in children's digital lives — yet parents currently have no structured way to configure what those AIs will and won't discuss, monitor patterns over time, or review concerning conversations.

SafeChat solves this in two layers:

1. **Parent layer** — A guided onboarding wizard lets parents configure per-category safety settings (Off / Balanced / Strict) across five thematic sections. A persistent dashboard surfaces alerts, flagged patterns, and conversation excerpts so parents can stay informed without becoming surveillance machines.

2. **Child layer** — A first-class ChatGPT-style AI chatbot interface built directly into the app, designed for children. Every conversation flows through the parent's configured safety settings in real time.

**Product north star:** Every parent who completes onboarding should feel they understand exactly what SafeChat will and won't allow — and feel confident, not anxious, handing the app to their child.

---

## 2. Problem Statements

**Problem 1 — Parents have no structured control over AI chatbot behavior for children.**
Current consumer AI chatbots offer minimal parental configuration. Parents must either block AI entirely or allow unconstrained access. SafeChat introduces a granular, category-by-category control model.

**Problem 2 — The AI safety configuration space is overwhelming when presented all at once.**
Twelve content categories, four behavioral monitoring dimensions, and multiple other settings presented on a single screen causes decision fatigue and drop-off. SafeChat's multi-page onboarding wizard presents one thematic section per page, reducing cognitive load.

**Problem 3 — Parents have no visibility into what their child discusses with AI.**
Without a dashboard, concerning patterns (escalating self-harm language, radicalization vectors, excessive schoolwork shortcuts) go undetected. SafeChat's parent dashboard surfaces both aggregate analytics and the ability to view relevant conversation context when an alert is triggered.

**Problem 4 — Children's AI interfaces are designed for adults.**
Most AI chat UIs assume adult literacy, attention span, and intent. The SafeChat child chatbot is designed to feel safe, simple, and age-appropriate while still being a capable AI conversation partner.

---

## 3. Target Users

### Persona A — The Parent

**Name:** Morgan, 38  
**Context:** Parent of a 10-year-old who has started asking to use AI for homework help, creative writing, and general curiosity. Morgan is tech-literate but not deeply technical. They want to say "yes" to their child's AI use, but only if they can feel genuinely informed about what's happening.

**Goals:**
- Configure AI safety settings once, then not have to think about it constantly
- Know when something concerning happens — not every conversation, just the ones that matter
- Be able to check in on flagged conversations without reading every exchange
- Trust that the settings they chose are actually being enforced

**Frustrations:**
- Parental controls that are either all-or-nothing (block/allow) with no middle ground
- Dashboards that surface so much data they become noise
- Onboarding flows that require reading a manual before making a choice

---

### Persona B — The Child

**Name:** Kai, 10  
**Context:** Curious, uses AI for help with school projects, creative storytelling, and asking questions they feel embarrassed to ask adults. Uses the app on the family iPad or their own iPhone.

**Goals:**
- Get answers to questions quickly
- Have a conversational partner for creative projects
- Not feel "surveilled" or restricted in a jarring way

**Frustrations:**
- AI interfaces that feel clinical or adult-oriented
- Being told "I can't help with that" without any friendly explanation
- Interfaces that are hard to read or navigate on a phone

---

## 4. Success Metrics

**Goal Thread:**

| Metric | Target | Type |
|---|---|---|
| Parent onboarding completion rate | ≥ 80% of parents who start the wizard complete it | Primary |
| Time to complete onboarding | ≤ 5 minutes (matches locked copy promise) | Primary |
| Dashboard alert-to-context navigation | Parent taps an alert and reaches conversation context in ≤ 2 taps | Primary |
| Child chatbot session start rate | ≥ 70% of child users start a chat within first session | Secondary |
| Parent setting revision rate (30-day) | ≥ 40% of parents return to adjust at least one setting | Secondary — indicates engagement, not failure |
| Copy comprehension | ≥ 90% of parents can correctly describe what "Balanced" means for a given category after completing onboarding | Proxy |

---

## 5. Key Features & Scope

### In Scope

| Feature | Description | Platform |
|---|---|---|
| Parent onboarding wizard | 7-page guided flow (intro + 5 category pages + completion screen). One category section per page. Per-row Off/Balanced/Strict selector. | iOS |
| Parent dashboard | Alert/flag feed with aggregate category analytics and flag counts. Tap an alert to view the relevant conversation excerpt in context. | iOS |
| Child login screen | Simple, age-appropriate entry point for the child to access the chatbot. | iOS |
| Child AI chatbot | Full ChatGPT-style conversational interface, enforcing the parent's configured safety settings in real time. | iOS |
| Sidebar drawer navigation | Parent-side navigation via a sidebar drawer pattern. | iOS |

### Out of Scope (V1)

| Item | Reason |
|---|---|
| Android | iOS-only confirmed by client |
| Backend / API services | Design engagement only; engineering builds backend in parallel |
| Authentication services | Out of scope for design phase |
| Push notifications | Deferred to V2 |
| Real-time data streaming | Deferred to V2 |
| Full conversation transcript browser | Tap-to-view from an alert is in scope; a standalone full transcript library is a P1 feature deferred to V2 |
| Web / tablet breakpoints | iOS mobile only |
| Dark mode | Light mode only confirmed by client |
| Manual configuration import/export | Out of scope |

---

## 6. Constraints

- **Platform:** iOS only. All layouts, interaction patterns, and component choices target iOS Human Interface Guidelines conventions (safe areas, bottom sheet patterns, swipe gestures).
- **Light mode only:** No dark mode support in V1. Color system designed for light backgrounds only.
- **No locked brand color:** Design team has full latitude to recommend a primary color palette. Recommendation documented in Section 8.
- **Mobile-first, mobile-only:** Single breakpoint. No tablet or desktop layouts required.
- **Soft radius system:** 12–16px corner radius on cards; fully-rounded pill buttons.
- **Motion:** Moderate register (200–350ms) — matches the "calm, trustworthy" aesthetic direction. No entrance animation libraries.
- **Onboarding structure:** Five category sections, each on its own page. Page order is fixed (see Section 12). Content within each section is derived from the uploaded product specification.
- **Copy:** Locked strings from the product spec must appear verbatim. See Section 11.

---

## 7. References & Aesthetic Direction

### Reference Table

| Reference | What to draw from |
|---|---|
| Calm app (iOS) | Overall calm, trustworthy, wellness-adjacent visual register. Large readable type, generous whitespace, muted palette with one warm accent. Gentle onboarding progression. |
| Family safety apps (e.g., Screen Time, Google Family Link) | Functional clarity — parents must understand settings at a glance. Avoid over-designing functional controls. |
| ChatGPT iOS app | Conversational UI structure for the child chatbot. Message bubble layout, input bar positioning, avatar system. |

### Aesthetic Translation Table

| Aesthetic keyword | Pixel decision |
|---|---|
| Calm | Muted palette, generous line-height (1.5–1.6×), no aggressive drop shadows, soft gradients only as texture |
| Trustworthy | No dark patterns, clear affordances, settings state always visible and legible |
| Minimal | Single-function screens, no decorative elements that don't carry meaning |
| Intuitive | iOS HIG conventions, familiar navigation metaphors, zero novel interaction patterns |
| Sleek | Clean card surfaces, consistent 8px spacing grid, no rogue margins |
| Age-appropriate (child side) | Slightly larger touch targets (44pt minimum per HIG), warmer tone, friendly rounded shapes, no data-dense layouts |

---

## 8. Design System

### Design Token Record

All tokens marked [designer-recommended] are the design team's recommendation, not client-locked values. They may be revised before implementation begins.

| Category | Token | Value | Source | Confirmed |
|---|---|---|---|---|
| Color | primary | #3D8D84 (muted sage-teal) | designer-recommended | [designer-recommended] |
| Color | primary-light | #EAF4F3 (sage-teal tint, 10%) | designer-recommended | [designer-recommended] |
| Color | primary-dark | #2C6B64 | designer-recommended | [designer-recommended] |
| Color | body-bg | #F7F8FA (near-white warm gray) | designer-recommended | [designer-recommended] |
| Color | surface-white | #FFFFFF | designer-recommended | [designer-recommended] |
| Color | surface-card | #FFFFFF | designer-recommended | [designer-recommended] |
| Color | border-default | #E2E8F0 | designer-recommended | [designer-recommended] |
| Color | text-primary | #1A1F2E | designer-recommended | [designer-recommended] |
| Color | text-secondary | #64748B | designer-recommended | [designer-recommended] |
| Color | text-muted | #94A3B8 | designer-recommended | [designer-recommended] |
| Color | setting-off | #F1F5F9 (chip background) | designer-recommended | [designer-recommended] |
| Color | setting-balanced | #FEF3C7 (amber-50 equivalent) | designer-recommended | [designer-recommended] |
| Color | setting-strict | #DCFCE7 (green-100 equivalent) | designer-recommended | [designer-recommended] |
| Color | alert-flag | #FEE2E2 (red-100) | designer-recommended | [designer-recommended] |
| Color | alert-flag-text | #DC2626 (red-600) | designer-recommended | [designer-recommended] |
| Typography | typeface | DM Sans | designer-recommended (confirmed direction from prior prototype iteration) | [designer-recommended] |
| Typography | h1 | DM Sans 28px/34px weight 700 | designer-recommended | [designer-recommended] |
| Typography | h2 | DM Sans 22px/28px weight 600 | designer-recommended | [designer-recommended] |
| Typography | h3 | DM Sans 18px/24px weight 600 | designer-recommended | [designer-recommended] |
| Typography | body | DM Sans 16px/24px weight 400 | designer-recommended | [designer-recommended] |
| Typography | body-small | DM Sans 14px/20px weight 400 | designer-recommended | [designer-recommended] |
| Typography | caption | DM Sans 12px/16px weight 400 | designer-recommended | [designer-recommended] |
| Typography | label | DM Sans 12px/16px weight 600 | designer-recommended | [designer-recommended] |
| Typography | button | DM Sans 16px/20px weight 600 | designer-recommended | [designer-recommended] |
| Spacing | base-unit | 8px | designer-recommended | [designer-recommended] |
| Spacing | screen-horizontal-padding | 20px | designer-recommended | [designer-recommended] |
| Spacing | card-padding | 16px | designer-recommended | [designer-recommended] |
| Spacing | section-gap | 24px | designer-recommended | [designer-recommended] |
| Spacing | item-gap | 12px | designer-recommended | [designer-recommended] |
| Spacing | button-height | 52px (pill, fully-rounded) | client-confirmed radius direction | [designer-recommended] |
| Radius | card | 14px | client-confirmed (12–16px range) | client-confirmed |
| Radius | button | 9999px (fully-rounded pill) | client-confirmed | client-confirmed |
| Radius | input | 12px | designer-recommended | [designer-recommended] |
| Radius | badge | 9999px (pill) | designer-recommended | [designer-recommended] |
| Radius | sheet / bottom-sheet | 20px top corners | designer-recommended | [designer-recommended] |
| Motion | standard-duration | 250ms | designer-recommended | [designer-recommended] |
| Motion | standard-easing | cubic-bezier(0.4, 0, 0.2, 1) | designer-recommended | [designer-recommended] |
| Motion | page-transition | 300ms ease-in-out | designer-recommended | [designer-recommended] |

---

## 9. Brand Identity

- **Product name:** SafeChat — locked, do not alter casing
- **Tagline direction:** Safety-adjacent, calm reassurance — not surveillance language
- **Voice:** Warm, direct, reassuring. Never clinical. Never alarmist.
- **Logo:** To be designed. Recommend wordmark + small icon (shield or leaf form factor). Primary color: sage-teal.
- **Icon system:** SF Symbols preferred for iOS-native feel; supplement with custom icons where needed
- **Tone for parent-facing copy:** Like a trusted pediatrician — authoritative but approachable, never fear-mongering
- **Tone for child-facing copy:** Like a friendly older sibling — helpful, non-judgmental, warm

---

## 10. Visual Design Language

**Surface and tone:** White card surfaces on near-white warm gray body (#F7F8FA). No dark mode. Cards use a subtle border (#E2E8F0) rather than drop shadow — clean, not flat. Generous whitespace signals calm.

**Color system:** Muted sage-teal primary (#3D8D84) as the single chromatic accent. Used for primary CTAs, progress indicators, active states, and selected setting chips. Functional colors for the three setting states (Off = neutral gray, Balanced = warm amber, Strict = soft green). Alert states use standard semantic red.

**Typography:** DM Sans throughout. Geometric, friendly, highly legible at small sizes. Weight differentiates hierarchy (700 for display/h1, 600 for h2/h3/labels, 400 for body). Size scale: 12 · 14 · 16 · 18 · 22 · 28px.

**Setting control pattern:** Each row in the onboarding wizard shows the category name and description on the left, with an Off / Balanced / Strict three-segment selector control on the right (or below on narrow screens). Selected segment uses the token color for that level. This control is the visual signature of the onboarding experience.

**Child chatbot surface:** Slightly warmer, with rounded message bubbles. Child messages in a tinted primary-light bubble; AI messages in white. Larger touch targets throughout. No data or statistics visible to the child.

**Navigation:** Sidebar drawer for parent. Standard iOS back navigation for drill-down flows. Bottom tab bar considered but sidebar drawer confirmed by client.

**Motion:** Moderate register — 200–350ms, cubic-bezier standard easing. Page transitions slide left/right (push navigation). Onboarding wizard pages animate as a horizontal slide sequence. No spring physics, no bounce. Calming, not playful.

---

## 11. Copy Guide

### Tone Descriptors

| Adjective | Writing rule |
|---|---|
| Warm | Use "you" and "your child" not "the user" or "the child" |
| Direct | No filler words. Every sentence earns its space. |
| Reassuring | Frame settings as positive choices, not restrictions |
| Calm | Never exclamation marks in settings or dashboard copy |
| Age-appropriate (child) | Short sentences. Active voice. Friendly AI persona name TBD. |

### Locked Strings (verbatim from product specification)

| String ID | Copy | Context |
|---|---|---|
| PRODUCT_NAME | SafeChat | Product name everywhere |
| ONBOARDING_HEADER | Your Setup Guide | Onboarding wizard screen header |
| ONBOARDING_SUBHEAD | Choose how AI works for your family. | Onboarding intro subheadline |
| ONBOARDING_TIME | This takes about 5 minutes. | Onboarding intro body |
| COMPLETION_HEADLINE | You're all set! | Completion screen headline |
| COMPLETION_BODY | Your choices take effect immediately. Every chat your child has through SafeChat will follow these settings. | Completion screen body |
| SETTING_LEVEL_0 | Off | Setting level label |
| SETTING_LEVEL_1 | Balanced | Setting level label |
| SETTING_LEVEL_2 | Strict | Setting level label |

### Category Names (locked from product specification)

All category names and descriptions are locked as written in the uploaded product specification document. Do not paraphrase or simplify category names in the UI. Designer may adjust visual treatment (size, weight, truncation) but not the text content.

**Section 1 — Content Moderation (12 categories):**
Violence and Gore, Sexual Content, Hate Speech and Discrimination, Self-Harm and Suicide, Substance Abuse, Profanity and Crude Language, Privacy and Personal Information, Misinformation and Conspiracy Theories, Radicalization and Extremism, Cyberbullying and Harassment, Explicit Horror or Disturbing Content, Commercial and Advertising Content

**Section 2 — Behavioral Monitoring (4 categories):**
[Names as written in the uploaded specification]

**Section 3 — AI Personality (2 settings):**
[Names as written in the uploaded specification]

**Section 4 — Schoolwork and Learning (2 settings):**
[Names as written in the uploaded specification]

**Section 5 — Data and Privacy (1 setting):**
[Names as written in the uploaded specification]

---

## 12. User Flows

### Flow A — Parent Onboarding Wizard

**Entry:** Parent downloads SafeChat, creates account (auth out of scope for design), lands on onboarding entry point.

| Step | Screen | Key action |
|---|---|---|
| 1 | Intro / Overview | Parent reads the "Your Setup Guide" intro. Sees the three setting levels explained (Off / Balanced / Strict). Taps "Get Started." |
| 2 | Page 1 — Content Moderation | Parent configures Off/Balanced/Strict for each of the 12 content moderation categories. Progress indicator shows 1/5. Taps "Next." |
| 3 | Page 2 — Behavioral Monitoring | Parent configures 4 behavioral monitoring settings. Progress indicator shows 2/5. Taps "Next." |
| 4 | Page 3 — AI Personality | Parent configures 2 AI personality settings. Progress indicator shows 3/5. Taps "Next." |
| 5 | Page 4 — Schoolwork and Learning | Parent configures 2 schoolwork/learning settings. Progress indicator shows 4/5. Taps "Next." |
| 6 | Page 5 — Data and Privacy | Parent configures 1 data/privacy setting. Progress indicator shows 5/5. Taps "Finish Setup." |
| 7 | Completion screen | Shows "You're all set!" headline and locked completion body copy. CTA: "Go to Dashboard." |

**Back navigation:** Each page has a back arrow that returns to the previous page without losing settings. Progress persists within session.

**Default states:** All categories default to "Balanced" at wizard start (designer recommendation — avoids cognitive burden of starting at "Off").

---

### Flow B — Parent Dashboard

**Entry:** Parent completes onboarding and taps "Go to Dashboard," or returns to the app and is routed to Dashboard.

| Step | Action | Description |
|---|---|---|
| 1 | View dashboard | Alert/flag feed visible. Each alert card shows: category name, flag count or summary, timestamp, severity indicator. Aggregate analytics panel (flag counts by category, trend indicators) visible above or alongside the feed. |
| 2 | Tap an alert | Parent taps a specific alert card. |
| 3 | View conversation excerpt | Relevant conversation excerpt is displayed in context — the message(s) that triggered the flag, with surrounding context (a few turns before and after). Parent can see what was said. |
| 4 | Take action (deferred) | Actions from the transcript view (e.g., adjust settings, flag for review) are V2 features. V1 is read-only context. |

**Sidebar drawer access:** Parent can open the sidebar drawer from any screen to navigate to Dashboard, Settings (return to wizard), and other top-level destinations.

---

### Flow C — Child Login

**Entry:** Child opens SafeChat on their device.

| Step | Action | Description |
|---|---|---|
| 1 | Child login screen | Simple, age-appropriate screen. Child authenticates (PIN, Face ID, or parent-managed credential — auth method out of scope for design; design shows a PIN pattern as placeholder). |
| 2 | Success | Child lands directly on the chatbot screen. |

---

### Flow D — Child Chatbot

**Entry:** Child authenticates and lands on the chatbot.

| Step | Action | Description |
|---|---|---|
| 1 | Chatbot home | Clean, minimal chat interface. AI greeting message visible. Input bar at bottom. |
| 2 | Child types message | Standard iOS keyboard, text input. Send button. |
| 3 | AI responds | AI response appears. All responses filtered through parent's configured settings in real time. |
| 4 | Continued conversation | Standard chat thread scrolls up. Older messages accessible by scrolling. |
| 5 | Off-limits response | If a topic falls outside parent's settings, AI responds with a friendly, age-appropriate decline message (copy TBD — not locked). |

---

## 13. Page Design and Layout

### Overview — Screen Inventory

| Screen ID | Name | User | Description |
|---|---|---|---|
| P-00 | Onboarding Intro / Overview | Parent | Entry to wizard. Explains Off/Balanced/Strict levels. "Get Started" CTA. |
| P-01 | Onboarding — Content Moderation | Parent | 12-row category list with Off/Balanced/Strict selector per row. Page 1 of 5. |
| P-02 | Onboarding — Behavioral Monitoring | Parent | 4-row category list. Page 2 of 5. |
| P-03 | Onboarding — AI Personality | Parent | 2-setting page. Page 3 of 5. |
| P-04 | Onboarding — Schoolwork and Learning | Parent | 2-setting page. Page 4 of 5. |
| P-05 | Onboarding — Data and Privacy | Parent | 1-setting page. Page 5 of 5. |
| P-06 | Onboarding Completion | Parent | "You're all set!" confirmation. "Go to Dashboard" CTA. |
| P-07 | Parent Dashboard | Parent | Alert feed + analytics panel. Sidebar drawer accessible. |
| P-08 | Conversation Context View | Parent | Triggered from dashboard alert tap. Shows conversation excerpt. |
| P-09 | Settings (return flow) | Parent | Returns parent to the wizard in edit mode (not first-run mode). Same pages, pre-populated with saved settings. |
| C-01 | Child Login | Child | PIN / auth entry point. Age-appropriate design. |
| C-02 | Child Chatbot | Child | Full-screen chat interface. AI conversation. |

---

### Screen Design Notes

**P-00 — Onboarding Intro:**
Full-bleed layout. Prominent "Your Setup Guide" heading (h1, DM Sans 700). "Choose how AI works for your family." as subheadline (h2 or large body). "This takes about 5 minutes." as body copy. Three-item visual legend showing Off / Balanced / Strict with short descriptions (max 1 sentence each). Large pill CTA button: "Get Started." Soft illustration or icon to anchor the screen visually (designer to recommend).

**P-01 through P-05 — Onboarding Category Pages:**
Consistent page shell: back arrow (top left) · progress indicator (5-segment, current segment highlighted) · section title (h2) · optional section description (body-small). List of categories, each as a card row: category name (body, 600 weight) · category description (body-small, text-secondary) · Off/Balanced/Strict selector (3-segment control, full width or right-aligned). "Next" pill CTA button pinned to bottom. Page P-01 (Content Moderation) has 12 rows — this page will scroll. All others are likely above-fold on a standard 390px-wide iOS screen.

**P-06 — Completion Screen:**
Centered layout. Celebratory but calm. "You're all set!" headline (h1). Body copy verbatim. Summary of chosen settings (optional — designer recommendation: show a compact count like "12 content settings · 4 behavior monitors configured" without listing every row). "Go to Dashboard" pill CTA.

**P-07 — Parent Dashboard:**
Top section: analytics panel — flag counts by category, possibly a simple bar or ring chart, time range selector (7d / 30d / all). Below: scrollable alert feed. Each alert card: category icon + name, timestamp, brief excerpt or description of the flagged content, severity chip. Sidebar drawer accessible via hamburger or swipe-from-left. Floating or pinned navigation to child chatbot (if parent also uses the chatbot interface — TBD).

**P-08 — Conversation Context View:**
Modal or pushed screen (push preferred — sidebar + back arrow navigation). Shows a short excerpt of the flagged conversation: AI message + child message that triggered the flag, with 2–3 turns of context before and after. Flags the specific flagged message visually (border, background highlight). Read-only in V1.

**C-01 — Child Login:**
Simple, full-screen entry. App icon prominent. "Hi [Child name]" greeting. PIN entry or biometric prompt. No dashboard link, no settings access — child interface is scoped to chatbot only.

**C-02 — Child Chatbot:**
Full-screen chat layout. Safe-area aware (bottom bar, notch). AI messages: white bubbles, left-aligned. Child messages: sage-teal-tinted bubbles, right-aligned. Bottom input bar: text field + send button. Keyboard pushes input bar up (standard iOS behavior). AI name/persona displayed at top (TBD name). No visible mention of parental monitoring in the child UI.

---

## 14. Interaction and States

| Component | States | Notes |
|---|---|---|
| Off/Balanced/Strict selector | unselected · selected (highlighted with token color) · disabled | Selected segment uses setting-level color token. |
| Onboarding page | entering (slide in from right) · active · exiting (slide out to left) | 300ms page transition. |
| Progress indicator | 5 segments, filled up to current page | Primary color fill for completed + current segments. |
| Pill button (primary) | default · pressed (scale-down 0.97, opacity 0.9) · disabled | No hover state (iOS). |
| Alert card | default · pressed (scale-down 0.98, opacity 0.9) · tapped → push to P-08 | |
| Sidebar drawer | closed · opening (slide in from left, 250ms) · open · closing | Backdrop scrim behind drawer. |
| Chat message bubble | default · sending (opacity 0.6) · sent · error state | |
| Chat input bar | empty · typing · send button active (when input non-empty) | |
| Setting selector (return mode) | pre-populated with saved value · editing | Same component as wizard, different entry state. |
| Dashboard analytics | loading skeleton · loaded | 200ms fade-in on load. |

---

## 15. Delivery and Handoff

| Field | Value |
|---|---|
| **Output format** | HTML interactive prototypes per screen (iOS mobile viewport, 390px wide) |
| **Prototype fidelity** | High-fidelity — color, typography, spacing, and interactions as specified |
| **Review gate** | Client reviews prototype before implementation handoff |
| **Device targets** | iOS mobile, 390px viewport (iPhone 14/15 standard) |
| **Accessibility baseline** | WCAG 2.1 AA minimum; iOS Dynamic Type considered for body copy |
| **Handoff format** | Prototype files + annotated design spec |
| **Implementation stack** | Not in scope for this engagement (design only) |

---

## 16. Designer Notes

*For the Designer Agent — not shown to client.*

### Pipeline Rationale

This brief was compiled from a complete intake run (8 questions, all confirmed). No questions are deferred or estimated. All P0 and P1 items are locked.

The engagement is a ground-up mobile product design, not a website clone. No live URL extraction is possible. All design tokens in Section 8 are designer-recommended based on the aesthetic direction (Calm app reference, sage-teal, DM Sans) and must be validated against a mockup before locking.

---

### Typeface Note — DM Sans

DM Sans was confirmed as the direction in a prior prototype iteration of this product. It is documented here as a confirmed designer direction, not a locked client choice. The designer may substitute a similar humanist sans-serif (e.g., Inter, Plus Jakarta Sans) if DM Sans presents technical constraints (e.g., Expo/React Native font loading), but should default to DM Sans unless there is a specific reason to change.

---

### Q3 Interpretation — Onboarding Page Structure

The client's answer was "categorize the content moderation categories and put each category on different pages." After careful reading, the intent is that each major **section** (not each individual row within a section) gets its own page. The onboarding wizard therefore has:

- Intro page (not a category page — a settings legend)
- Page 1: Content Moderation (all 12 rows on one scrollable page)
- Page 2: Behavioral Monitoring (4 rows)
- Page 3: AI Personality (2 settings)
- Page 4: Schoolwork and Learning (2 settings)
- Page 5: Data and Privacy (1 setting)
- Completion page

**Important:** Content Moderation (Page 1) will scroll. This is intentional. A scrollable page within the wizard is preferable to splitting the 12 content categories across multiple pages, which would fragment a logically unified section. The progress indicator shows "1/5" for this page — not a sub-progress for the 12 rows.

---

### Q4 Interpretation — Dashboard Data Model

Client confirmed "Combination of A + B" (transcripts + analytics). V1 scoping decision:

- **In V1:** Alert feed + tap-to-view conversation excerpt (the flagged messages in context). This gives parents the most actionable value with the least engineering complexity.
- **Deferred to V2:** Full conversation transcript browser (scroll through an entire conversation start-to-finish without a triggering alert).
- Analytics panel: aggregate flag counts, category breakdown, time range selector. Simple chart visualization (bar or donut). Full trend analysis and pattern summaries are V2.

The designer should design the V1 dashboard as if it could grow into V2 — leave room for the transcript browser entry point to be added without a full redesign.

---

### Q6 — Primary Color Recommendation

The recommended primary color is **#3D8D84** (muted sage-teal). Rationale:

- Aligns with the Calm app aesthetic reference: muted, trustworthy, wellness-adjacent
- Distinctively non-corporate — avoids the "enterprise blue" or "medical green" associations of competing safety/monitoring products
- High contrast on white backgrounds (passes WCAG AA at 16px+)
- Works in both flat and subtle gradient treatments
- Pairs well with warm neutral backgrounds (the recommended #F7F8FA body bg)

Alternative if sage-teal tests poorly in user feedback: deep periwinkle (#5B6AB0) or slate-blue (#4A6FA5). Both carry similar trust/calm signals.

---

### Tensions and Trade-offs

**Tension 1 — Page 1 scrolls, other pages don't.** The 12-category Content Moderation page will require scrolling on any standard iPhone. This breaks the "one clean page" pattern of the rest of the wizard. Options: (a) accept the scroll and add a visual indicator at the bottom of the visible area that more content exists below; (b) introduce a sub-scroll container within the page shell so the progress bar and "Next" button remain pinned. Recommendation: option (b) — scroll the category list, pin the chrome.

**Tension 2 — Child visibility of parental monitoring.** The child chatbot must not show any indication of monitoring to the child (per design principle — avoid making the child feel surveilled). This means all alert/flag triggers are invisible at the child UI layer. Ensure no "You are being monitored" language or visible indicators appear in C-02.

**Tension 3 — Dashboard data sensitivity.** Conversation excerpts shown to parents contain potentially sensitive content (the flagged material). The dashboard UI should treat this content with care — no preview text visible in the alert card itself (just the category and flag count), full content only after the parent actively taps through. This protects against over-the-shoulder exposure.

---

### Deferred Items Log

| Item | Deferred to | Notes |
|---|---|---|
| Full transcript browser | V2 | Entry point should be stubbed in V1 dashboard design |
| Push notifications | V2 | Design the alert card as if it could arrive via push; don't design for push-first in V1 |
| Android | Out of scope | iOS patterns used throughout; no cross-platform accommodation needed |
| Dark mode | Out of scope | Light mode only; do not include dark mode token variants in V1 |
| Parent-child account linking flow | Out of scope | Assume account structure exists; do not design auth flows |
| AI persona name | TBD | Child chatbot AI has no locked name. Designer should use a placeholder (e.g., "Sage") that can be swapped. "Sage" recommended — aligned with sage-teal color, calm/wise connotation. |
| Child decline message copy | TBD | The message the AI shows when a topic is off-limits. Tone guide exists (friendly, age-appropriate) but exact copy not locked. |

---

### Question Status Tracker (final)

| Q-ID | Priority | Question | Status | Client Answer |
|---|---|---|---|---|
| Q1 | P0 | Child chatbot scope | confirmed | In scope as full deliverable |
| Q2 | P0 | iOS-only vs cross-platform | confirmed | iOS only |
| Q3 | P0 | Category list (4 vs 12) | confirmed | C: Categorize into sections, one page per section |
| Q4 | P0 | Dashboard data model | confirmed | Combination: transcripts + analytics |
| Q5 | P1 | Dark/light mode | confirmed | Light mode only |
| Q6 | P1 | Brand color | confirmed | Open — designer recommends |
| Q7 | P1 | Corner radius | confirmed | Soft (12–16px cards, fully-rounded pill buttons) |
| Q8 | P1 | Navigation pattern | confirmed | Sidebar drawer |

All questions confirmed. No open items. Brief is complete and ready for Designer Agent handoff.

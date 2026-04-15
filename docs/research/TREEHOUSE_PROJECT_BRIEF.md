# WHALES PROJECT BRIEF

| Field | Value |
|---|---|
| **Client** | TreeHouse / SafeChat |
| **Date** | 2026-04-14 |
| **Engagement ID** | treehouse_safechat_mobile_prototype_2026_04_14 |
| **Confirmation status** | All P0 values client-confirmed. P1 design tokens partially CLIENT DEFERRED — see Designer Notes. |

---

## 1. Product Vision

TreeHouse is a mobile app (iOS) that gives parents meaningful, understandable control over how AI interacts with their children. Its core product is SafeChat — a configurable safety layer that sits between a child and an LLM chatbot, filtering and monitoring conversations according to settings the parent chose during onboarding.

The app has two distinct views: a **Parent View** (onboarding + dashboard) and a **Child View** (login + chatbot). Parents configure SafeChat once during onboarding, then monitor their child's AI activity from a dashboard. Children experience only a clean ChatGPT-like interface — the safety layer is invisible to them.

**Success:** Parents complete the onboarding configuration in under 5 minutes and trust that their settings are active. Parents return to the dashboard and can quickly understand what their child has been doing and whether anything requires attention.

---

## 2. Problem Statements

AI chatbots are increasingly accessible to children, but parents have no visibility into or control over the content their child encounters. Existing parental control tools are not built for AI — they block or allow at a domain level, with no nuance for the type of content or behavioral pattern involved.

TreeHouse solves this by giving parents:
1. **Configurable safety categories** — not a binary on/off, but three calibrated tiers (Off / Balanced / Strict) per risk category, with plain-language explanations of what each tier does
2. **Behavioral pattern monitoring** — not just individual message filtering, but trend detection across conversations (e.g., growing AI dependency, radicalization trajectory)
3. **A dashboard to track it** — parents can see conversation history, alerts, and patterns without needing to read every message

**Framing note:** Client framing confirmed. This is a product design prototype engagement — not a classifier test scenario document. All four primary surfaces are in scope.

---

## 3. Target Users

**Primary — Parent (primary decision-maker):**
A parent of a school-age child (roughly ages 8–16). Not necessarily tech-savvy — the PRD copy is deliberately written in plain language ("you don't need to be an AI expert"). Their emotional state during onboarding is cautiously optimistic — they want to protect their child without being controlling, and they've been told there are "no wrong answers." They are completing onboarding on a phone, likely in a low-distraction moment (not at a desk). Speed and clarity are critical — they will not read long explanations.

**Secondary — Child (end user of the chatbot):**
A middle-school-age child using an AI chatbot for homework, curiosity, or social purposes. The child does not see the parent's configuration. The child's UI must feel clean, modern, and non-condescending — not like a "kids' app." The child has no awareness of what is being filtered or monitored.

---

## 4. Success Metrics

**Goal Thread:**

| Field | Value |
|---|---|
| **Primary metric** | Parent completes the full onboarding configuration in ≤5 minutes (timed task test — confirmed by PRD copy: "This takes about 5 minutes") |
| **Secondary metric** | Parent can identify whether their child has any flagged activity within 10 seconds of opening the dashboard (scanability test) |
| **Proxy signals** | Category cards in onboarding are understood without reading subcategory detail; alert items in dashboard communicate severity and category at a glance; child chatbot feels age-appropriate and trustworthy |

*Note: Exact success metrics not confirmed by client — proxy metrics derived from PRD copy and product intent. Marked ★ CLIENT DEFERRED.*

---

## 5. Key Features & Scope

**In Scope:**

| Screen / Feature | Description |
|---|---|
| Parent onboarding — Welcome | Intro screen: TreeHouse/SafeChat branding, setup promise, "Get started" CTA |
| Parent onboarding — Tier overview | Explains Off / Balanced / Strict before configuration begins |
| Parent onboarding — Category configuration | 5 category cards, each with Off/Balanced/Strict selector and expandable subcategory drill-down. Categories: Content Moderation, Behavioral Monitoring, AI Personality & Interaction Style, Academic Integrity, Data & Privacy |
| Parent onboarding — Completion | "You're all set!" confirmation screen with summary of choices |
| Parent dashboard | Combined view: summary card (child name, activity stats, alert count) + alert feed (flagged events) + conversation list (recent sessions) |
| Child login | Login screen for child using parent-created credentials |
| Child chatbot | Full-screen chat interface: message thread + input bar. Safety layer operates silently in background. |

**Out of Scope:**

| Item | Reason |
|---|---|
| Conversation transcript viewer | Not confirmed in scope — dashboard links to it but the viewer itself is not designed in this engagement |
| Push notification design | Not mentioned by client |
| Account settings / profile management | Not in scope for this prototype |
| Android / web / tablet | iOS only confirmed |
| Child account creation flow (parent-side) | Not explicitly confirmed — assumed to occur within onboarding but detail not scoped |
| Classifier/AI backend | Product design only — no backend implementation in scope |

---

## 6. Constraints

- **Platform:** iOS only. Design targets iPhone (390px viewport / iPhone 14 Pro baseline). All layouts must respect iOS safe areas: Dynamic Island / notch top clearance + 34px home indicator bottom clearance.
- **Navigation conventions:** iOS Human Interface Guidelines — bottom tab bar or full-screen push navigation (no Android-style back arrows as primary nav).
- **Typeface:** DM Sans — confirmed. No fallback to system-ui / SF Pro without client approval.
- **Accessibility:** WCAG 2.1 AA + iOS accessibility minimum (44pt tap targets, sufficient contrast).
- **Onboarding configuration:** Category-level selection (5 cards) with subcategory drill-down — not subcategory-level selection as primary interaction. Confirmed from PRD and client Q5.
- **Copy:** Parent-facing copy uses plain language. Technical classifier terminology (e.g., "input filter," "temperature=0") never surfaces in UI. Child-facing copy is friendly, non-condescending, not infantilizing.

---

## 7. References & Aesthetic Direction

| Reference | Draw from |
|---|---|
| Calm app | Visual minimalism: low-density layouts, generous whitespace, smooth motion, warm muted palette, clean geometric sans-serif type |

**Aesthetic keywords translated:**

| Keyword | Pixel decision | Confirmed by |
|---|---|---|
| Minimal | Low UI chrome — no decorative borders, no gradients, no shadows except subtle card elevation. Content carries the hierarchy, not color. | Client Q4 + Calm reference |
| Sleek | DM Sans at clean weights, generous letter-spacing, thin hairline dividers over heavy borders, pill-shaped CTAs | Client Q4 + Q8 |
| Surface treatment | White `#ffffff` cards on near-white warm-gray body `#f5f4f2` | ★ CLIENT DEFERRED — proposed, no objection |
| Motion register | Deliberate — 250–350ms, ease-in-out. No bounce. Transitions feel considered, not snappy. | ★ CLIENT DEFERRED — proposed, no objection |
| Corner radius | 20px cards, 9999px (pill) primary buttons, 12px secondary elements | ★ CLIENT DEFERRED — proposed, no objection |

---

## 8. Design System

**Design Token Record:**

| Category | Token | Value | Source | Confirmed |
|---|---|---|---|---|
| Color | accent-primary | ~`#5BA89F` range (muted sage/teal) — exact hex to be finalized by designer within this range | client-confirmed direction (Q7) | direction confirmed, exact hex CLIENT DEFERRED |
| Color | surface-card | `#ffffff` | CLIENT DEFERRED — proposed | pending |
| Color | surface-body | `#f5f4f2` | CLIENT DEFERRED — proposed | pending |
| Color | text-primary | Dark charcoal — iOS standard `#1C1C1E` or equivalent | CLIENT DEFERRED — standard iOS convention applied | pending |
| Color | text-secondary | Muted `#8E8E93` — iOS secondary label color | CLIENT DEFERRED — standard iOS convention applied | pending |
| Color | alert-high | To be determined by designer — red/rose range for P0 categories (self-harm, predatory) | not confirmed | pending |
| Color | alert-medium | To be determined by designer — amber range for moderate severity | not confirmed | pending |
| Color | alert-low | To be determined by designer — muted for informational flags | not confirmed | pending |
| Typography | display | DM Sans — 28px/34px, weight 600 | client-confirmed (Q8) | yes |
| Typography | title | DM Sans — 22px/28px, weight 600 | client-confirmed (Q8) | yes |
| Typography | headline | DM Sans — 17px/22px, weight 600 | client-confirmed (Q8) | yes |
| Typography | body | DM Sans — 16px/24px, weight 400 | client-confirmed (Q8) | yes |
| Typography | caption | DM Sans — 13px/18px, weight 400 | client-confirmed (Q8) | yes |
| Typography | label | DM Sans — 12px/16px, weight 500 | client-confirmed (Q8) | yes |
| Spacing | card-padding | 20px | CLIENT DEFERRED | pending |
| Spacing | section-gap | 24px | CLIENT DEFERRED | pending |
| Spacing | screen-horizontal-margin | 20px | CLIENT DEFERRED | pending |
| Spacing | tap-target-min | 44pt (iOS HIG minimum) | iOS HIG — confirmed by platform | yes |
| Radius | card | 20px | CLIENT DEFERRED — proposed | pending |
| Radius | button-primary | 9999px (pill) | CLIENT DEFERRED — proposed | pending |
| Radius | button-secondary | 12px | CLIENT DEFERRED — proposed | pending |
| Radius | input | 12px | CLIENT DEFERRED | pending |
| Motion | transition-duration | 250–350ms | CLIENT DEFERRED — proposed | pending |
| Motion | easing | ease-in-out | CLIENT DEFERRED — proposed | pending |

**Component Variant Record:**

| Component | Figma Node ID | Variant Properties | Confirmed States | Unconfirmed States |
|---|---|---|---|---|
| Category card (onboarding) | N/A | default · expanded | default (collapsed), expanded (subcategories visible) | hover (N/A on mobile) |
| Tier selector (Off/Balanced/Strict) | N/A | unselected · selected | unselected, selected | — |
| Dashboard summary card | N/A | default | default | loading/skeleton |
| Alert feed item | N/A | unread · read | unread (bold/accent indicator), read (muted) | dismissed |
| Conversation list item | N/A | no-alert · has-alert | both | loading |
| Chat message bubble — child | N/A | default | default | — |
| Chat message bubble — AI | N/A | default · safety-redirect | default, safety-redirect (when filter triggers) | loading/typing |
| Chat input | N/A | empty · active · has-text | all three | disabled |
| Primary CTA button | N/A | default · pressed · disabled | default, disabled | loading |

**Active State Visual Record:**

| Component | Active State Treatment | Source |
|---|---|---|
| Tier selector — selected | Background fill using accent-primary (~`#5BA89F`), white label text — pill shape | client-confirmed accent direction (Q7); exact treatment CLIENT DEFERRED |
| Category card — expanded | Chevron rotates 180°, subcategory list reveals with 250ms ease-in-out expand | confirmed from Q5-C; motion CLIENT DEFERRED |
| Bottom tab (if used) | accent-primary tint on icon + label | CLIENT DEFERRED |
| Chat input — active | Border shifts to accent-primary, keyboard raised | standard iOS pattern |

---

## 9. Brand Identity

- **App name:** TreeHouse (one word — client-confirmed Q6)
- **Product name within app:** SafeChat
- **Typeface:** DM Sans — confirmed. Applied to all UI text.
- **Voice (parent-facing):** Plain language. Non-alarmist. Non-judgmental. "There are no wrong answers." "This takes about 5 minutes." Direct without being clinical.
- **Voice (child-facing):** Friendly, clean, non-condescending. Does not talk down. Does not say "kids" or "children." No baby language.
- **Locked strings from PRD:**
  - "SafeChat" — product name within TreeHouse
  - "Your Setup Guide" — parent onboarding title
  - "Choose how AI works for your family" — parent onboarding headline
  - "This takes about 5 minutes" — onboarding duration hint
  - "You're all set!" — completion screen headline
  - "There are no wrong answers — every family is different, and you can change any of these later."
  - Tier labels: Off · Balanced · Strict (title case — locked)
  - Category names: Content Moderation · Behavioral Monitoring · AI Personality & Interaction Style · Academic Integrity · Data & Privacy Preferences

---

## 10. Visual Design Language

**Surface and tone:** White cards on near-white warm-gray body. No dark surfaces, no heavy shadows — a single soft card elevation (box-shadow: 0 2px 8px rgba(0,0,0,0.06)) is the maximum. The overall palette is calm, clean, and warm — not sterile.

**Color system:** Near-neutral with one chromatic accent. Sage/teal (~`#5BA89F`) is the single accent: used for selected tiers, active states, primary CTAs, and progress indicators. All other UI elements are neutral (white, warm-gray, charcoal text). Alert severity uses a separate red/amber/muted scale, kept visually distinct from the accent to prevent confusion.

**Typography:** DM Sans throughout. Weight carries the hierarchy — 600 for titles and labels, 400 for body and captions. No italics. Generous line-height for readability at small mobile sizes. Letter-spacing: 0 for body, +0.02em for small caps/labels.

**Components:** Pill-shaped primary buttons. Rounded-rectangle secondary buttons and cards (20px radius). Segmented-style tier selector (Off / Balanced / Strict) with accent fill on selected state. Accordion/expand pattern for subcategory drill-down.

**Motion:** Deliberate and smooth. 250–350ms ease-in-out for all transitions. Accordion expands ease-in-out. Screen push transitions follow iOS native (right-to-left push, left-to-right pop). No bounce, no spring, no flash animations.

**iOS-specific:** Respects Dynamic Island clearance at top. Home indicator clearance at bottom (34px + any padding). Bottom tab bar or full-screen push — no floating nav elements that obscure content.

---

## 11. Copy Guide

**Tone descriptors:**

| Adjective | Writing rule | Confirmed by |
|---|---|---|
| Plain | No jargon. If a parent needs to know what "behavioral monitoring" means, explain it in the sentence, not a tooltip. | PRD copy style |
| Non-alarmist | Never frame safety categories as threats. Frame as choices. "You can change any of these later." | PRD copy style |
| Direct | Short sentences. No filler. Labels name the thing. | PRD copy style |
| Child-neutral | In the child view: no safety messaging visible. The AI is just the AI. | product design intent |

**Locked strings:**
- "SafeChat" — product name (not "safe chat" or "SAFECHAT")
- "TreeHouse" — app name (not "Tree House" — client-confirmed Q6)
- "Off · Balanced · Strict" — tier labels (title case, this exact order)
- "You're all set!" — completion headline (exact punctuation)
- "Choose how AI works for your family" — onboarding headline
- "This takes about 5 minutes" — onboarding subtitle

**Terminology rules:**
- "Category" = one of the 5 top-level config groups (never "setting" or "module")
- "Tier" = Off / Balanced / Strict (not "level" or "mode")
- "Alert" = a parent notification from a flagged event (not "flag" or "warning")
- "Conversation" = one chat session (not "chat" or "thread")
- AI is referred to as "AI" in parent view; in child view, use a neutral name TBD (not confirmed — ★ CLIENT DEFERRED)

---

## 12. User Flows

**Flow 1 — Parent onboarding (primary):**
Opens app → Welcome screen (branding + "Get started") → Tier overview (explains Off/Balanced/Strict) → Category configuration (5 category cards, each with tier selector; optional subcategory drill-down per card) → Completion screen ("You're all set!" + summary) → Parent dashboard

**Flow 2 — Parent returns to dashboard:**
Opens app → Logs in → Parent dashboard (summary card at top shows child activity snapshot + alert count → alert feed below shows flagged events → conversation list below shows recent sessions) → Taps conversation → (transcript viewer — out of scope)

**Flow 3 — Child login and chatbot:**
Opens app → Child login screen (email/username + PIN or password; "Ask your parent for your login info") → Child chatbot (full-screen chat interface) → Types message → AI responds (safety layer runs silently; if filter triggers, AI response is replaced with safe redirect)

---

## 13. Page Design & Layout

### Screen 1: Parent Onboarding — Welcome
- Full-screen, vertically centered
- TreeHouse wordmark top-center
- Large display headline: "Choose how AI works for your family"
- Subtext: "SafeChat puts you in control. This takes about 5 minutes."
- Illustration or abstract graphic (minimal, warm — ★ CLIENT DEFERRED on asset)
- Pill CTA bottom: "Get started" (accent-primary fill)
- iOS safe area: Dynamic Island clearance top, home indicator clearance bottom

### Screen 2: Parent Onboarding — Tier Overview
- Title: "How the settings work"
- Three cards stacked vertically — one per tier (Off · Balanced · Strict)
- Each card: tier label (title), one-line "what the AI does," one-line "what you'll see"
- Pill CTA bottom: "Got it, let's go"
- Progress indicator (dots or step count) near top

### Screen 3: Parent Onboarding — Category Configuration
- Progress indicator at top (e.g., "Step 3 of 5" or dot indicators)
- Scrollable list of 5 category cards
- Each card:
  - Category name + one-line description
  - Tier selector: three-segment pill (Off · Balanced · Strict) — accent fill on selected
  - Expand chevron: tapping opens an accordion revealing subcategory list with brief descriptions
- Sticky pill CTA at bottom: "Save & continue" or "Continue"
- Back arrow top-left (iOS navigation)

### Screen 4: Parent Onboarding — Completion
- Full-screen
- Large checkmark or success graphic (minimal)
- Headline: "You're all set!"
- Body: "Your choices take effect immediately. Every chat your child has through SafeChat will follow these settings."
- Settings summary list: each category + its selected tier (compact)
- Pill CTA: "Go to dashboard"

### Screen 5: Parent Dashboard
- **Top: Summary card**
  - Child name + avatar initial
  - Stats row: total conversations · alerts this week · last active
  - Accent-colored alert count badge if alerts > 0
- **Middle: Alert feed** (section header "Recent alerts")
  - Each item: severity indicator dot (color-coded) · category label · short excerpt or description · relative timestamp
  - "No alerts" empty state if none
- **Bottom: Conversation list** (section header "Recent conversations")
  - Each item: date + time · message count · alert badge if flagged
  - Tap target leads to conversation transcript (out of scope)
- Sticky bottom tab bar (if multiple parent sections) or single-view with scroll

### Screen 6: Child Login
- Clean, minimal — not childish
- App name "TreeHouse" at top
- Headline: "Log in to your account"
- Email/username field + PIN or password field
- Pill CTA: "Log in"
- Small helper text: "Don't have an account? Ask your parent to set one up."
- No visible safety/parental control messaging

### Screen 7: Child Chatbot
- Full-screen chat layout (ChatGPT-like)
- Minimal top bar: app name or AI persona name (★ CLIENT DEFERRED — AI name not confirmed)
- Message thread: vertically scrolling
  - Child messages: right-aligned, accent-tinted bubble
  - AI messages: left-aligned, white/light-gray bubble
- Input bar pinned to keyboard: text field + send button
- When safety filter triggers: AI bubble is replaced with a safe redirect message (tone: calm, non-alarming)
- No visible reference to parent controls or SafeChat branding

---

## 14. Interaction & States

| Component | States | Source |
|---|---|---|
| Tier selector | unselected · selected (accent fill + white text) | client-confirmed accent direction |
| Category card | collapsed (chevron right) · expanded (chevron down, subcategory list visible) | client-confirmed Q5-C |
| Dashboard alert item | unread (bold label + accent dot) · read (muted) | client-confirmed Q9 |
| Dashboard conversation item | no-alert · has-alert (badge) | client-confirmed Q9 |
| Chat input | empty · active (accent border) · has-text (send button activates) | iOS standard + confirmed chatbot scope |
| Chat message — AI | default · safety-redirect (different visual treatment TBD) | PRD spec |
| Primary CTA button | default · pressed (reduced opacity) · disabled (grayed) | iOS standard |

**Active state visual treatments:**

| Component | Active treatment | Source |
|---|---|---|
| Tier selector — selected | Accent-primary (~`#5BA89F`) background fill, white label, pill shape | client-confirmed direction Q7; exact value CLIENT DEFERRED |
| Category card — expanded | Chevron rotates 180°, accordion reveals with 250ms ease-in-out | confirmed Q5-C; motion CLIENT DEFERRED |
| Primary CTA button — pressed | Opacity reduced to 0.85, no scale change | CLIENT DEFERRED — iOS convention applied |

---

## 15. Delivery & Handoff

| Field | Value | Source |
|---|---|---|
| **Output format** | HTML prototype — interactive, mobile viewport (390px) | engagement convention |
| **Device targets** | iOS / iPhone (390px viewport, iOS safe areas) | client-confirmed Q3 |
| **Accessibility** | WCAG 2.1 AA + iOS 44pt minimum tap targets | CLIENT DEFERRED — applied as default |
| **Screens** | 7 screens: welcome · tier overview · category config · completion · parent dashboard · child login · child chatbot | client-confirmed Q2 |

---

## Designer Notes

*For the Designer Agent — not shown to client.*

**Pipeline rationale:**
- No Figma file, no URL, no screenshots provided. All design tokens are either client-confirmed (DM Sans, sage/teal accent direction, iOS platform, category-level onboarding structure) or CLIENT DEFERRED (exact hex values, surface colors, spacing, radius, motion timing).
- CLIENT DEFERRED values have proposed values assigned. Designer should finalize these using the proposed values as the starting point, staying within the "minimal + sleek + Calm-inspired" direction.
- The exact sage/teal accent hex should be finalized within the `#5BA89F` range — consider `#5BA89F` (medium sage-teal) or `#4E9E95` (slightly deeper) for sufficient contrast on white surfaces (WCAG AA requires 4.5:1 for text).

**Alert severity color system (not confirmed — designer judgment):**
- Suggest a three-level system: `#E53E3E` (red) for P0 categories (self-harm, predatory interactions), `#D97706` (amber) for medium categories (radicalization, drugs), muted `#8E8E93` for low/informational. Keep these visually distinct from the sage/teal accent to avoid confusion between "feature accent" and "severity signal."

**AI name in child chatbot (★ CLIENT DEFERRED):**
- Not confirmed. Designer should use a placeholder (e.g., "Sage" or "TreeHouse AI") that is consistent with the brand warmth. Flag to client before shipping.

**Onboarding category order:**
- Recommend displaying categories in PRD order: (1) Content Moderation → (2) Behavioral Monitoring → (3) AI Personality → (4) Academic Integrity → (5) Data & Privacy. The last two are lower-stakes; the first two are the primary safety controls and should lead.

**Dashboard — combined A+B+C layout:**
- The three sections (summary card, alert feed, conversation list) should be a single vertically scrolling view — not tabs. The summary card should be sticky or at minimum above the fold so parents see their child's status immediately on open. Alert feed comes second (actionable items first), conversation list third.

**Counter-hypothesis log:**
- Client framing: product prototype for a mobile safety app → confirmed correct
- No alternative framing surfaced that would change scope

**Question Status Tracker:**

| Q-ID | P | Status | Client answer |
|---|---|---|---|
| Q1 | P0 | confirmed | A — UI prototype |
| Q2 | P0 | confirmed | All screens: parent onboarding → dashboard → child login → chatbot |
| Q3 | P1 | confirmed | A — iOS only |
| Q4 | P1 | ★ CLIENT DEFERRED | Minimal + sleek + Calm reference; surface/motion/radius translation proposed, no objection |
| Q5 | P1 | confirmed | C — category-level selection + subcategory drill-down |
| Q6 | P2 | confirmed | "TreeHouse" one word |
| Q7 | P1 | confirmed | B — warm sage/teal ~#5BA89F range |
| Q8 | P1 | confirmed | B — DM Sans |
| Q9 | P1 | confirmed | Combine A+B+C: summary card + alert feed + conversation list |
| Success metrics | P1 | ★ CLIENT DEFERRED | Proxy metrics derived from PRD copy |
| AI persona name (child view) | P2 | ★ CLIENT DEFERRED | Not asked — flag before shipping |

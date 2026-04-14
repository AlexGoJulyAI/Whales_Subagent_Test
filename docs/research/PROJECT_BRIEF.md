# TREEHOUSE PROJECT BRIEF

| Field | Value |
|---|---|
| **Client** | Tree House |
| **Date** | 2026-04-14 |
| **Engagement ID** | treehouse_safechat_setup_2026_04_14 |
| **Confirmation status** | All values client-confirmed or designer-judgment (marked where applied) |

---

## 1. Product Vision

SafeChat by Tree House is a parental AI configuration layer that lets parents define how an AI assistant behaves when interacting with their child. Parents go through a structured 5-minute setup flow to configure safety policies across four categories — content moderation, behavioral monitoring, AI personality, and academic integrity — selecting one of three sensitivity tiers per category (Off / Balanced / Strict). Once configured, those settings govern the child's AI chat experience in real time: blocking or redirecting harmful responses, monitoring behavioral patterns over time, and alerting parents when something is flagged.

Success in this engagement means: every state in the parent setup flow and child chat interface is fully documented — selected/unselected, default/triggered, normal/blocked — so a developer can build from the spec without ambiguity.

---

## 2. Problem Statements

**Parent side:** Parents want meaningful control over their child's AI experience but don't want to become AI safety experts to get it. The current landscape offers no child-specific AI safety layer with plain-language configuration. SafeChat fills that gap with a 5-minute, guided setup that explains each risk category and its tradeoffs in plain terms.

**Child side:** Children using AI should be able to have natural, helpful conversations — but with guardrails operating silently in the background. When a guardrail triggers, the child should receive a safe, age-appropriate redirect rather than a confusing error or abrupt cutoff.

**Framing note:** The PRD contains both a parent-facing UX spec and a backend classifier build plan. This engagement is scoped to the UI layer only (parent setup flow + child chat interface). The classifier/backend is out of scope here.

---

## 3. Target Users

**Primary User A — Parent (Configurer)**
- Role: Parent or legal guardian of a middle-school-age child (~ages 10–14)
- Context: Completing setup on their phone, likely in one sitting
- Technical fluency: General consumer; not an AI expert
- Emotional state: Cautious and care-driven. Wants to feel in control without feeling overwhelmed. Mild anxiety about AI risks for their child; drawn to plain-language explanations and clear tradeoffs.

**Primary User B — Child (Configured)**
- Role: Middle-school student using an AI chat assistant
- Context: Using the AI for homework help, general curiosity, or conversation — on mobile
- Technical fluency: High digital fluency, low AI-literacy nuance
- Emotional state: Casual and curious. Not expecting safety rails. If content is blocked, the experience should feel natural and non-shaming.

---

## 4. Success Metrics

A complete design spec with all states documented across the parent setup flow and child chat interface — sufficient for a developer to build from without asking design questions.

**Goal Thread:**

| Field | Value |
|---|---|
| **Primary metric** | Every interactive component in both flows has all its states documented (unselected / selected, default / triggered, normal / blocked / alerted) |
| **Secondary metrics** | Parent flow covers all 4 categories + completion screen; Child flow covers normal chat + blocked state |
| **Proxy signals** | No ambiguous state left undocumented; no component with only a default state shown |

---

## 5. Key Features & Scope

**In Scope:**

| Screen / Feature | Description |
|---|---|
| Parent — Welcome/Intro | Explains SafeChat, what setup involves, and sets expectations |
| Parent — Content Settings | Per-category selector for 4 content moderation items (self-harm, drugs, eating disorders, illegal activities). Off / Balanced / Strict with plain-language descriptions per option |
| Parent — Behavioral Monitoring | Per-category selector for 3 behavioral watch items (loneliness & AI dependency, radicalization, sharing PII). Explains "pattern over time" vs. per-message logic |
| Parent — AI Personality | Two setting panels: honesty level (natural / honest / gentle) and relational boundaries (natural / tool / warm) |
| Parent — Learning Settings | Per-category selector for 2 academic integrity items (homework completion, over-reliance). Tutor-mode logic explained |
| Parent — Completion Screen | Confirms settings are live, links to dashboard, sets expectations on alert volume |
| Child — Chat Interface (default) | Standard mobile AI chat UI with message bubbles, input, send button |
| Child — Blocked Content State | What the child sees when a response is intercepted: safe redirect message, non-shaming tone |

**Out of Scope:**

| Item | Reason |
|---|---|
| Backend classifier / prompt engineering | Engineering layer, not UI |
| Full 12-category content moderation (v2) | Client confirmed Trimmed version (A) only |
| Parent dashboard (post-setup alerts view) | Not scoped in this engagement |
| Child login / account creation | Not part of setup flow |
| Data & privacy settings screen | Present in full version only; trimmed version omits this |

---

## 6. Constraints

- **Platform:** Mobile web only (390px viewport target)
- **Output format:** HTML mockup
- **Timeline:** No hard deadline stated
- **Accessibility:** Not specified by client — applying WCAG AA as default best practice *(designer judgment)*
- **No existing brand assets** — visual system established from scratch per this brief

---

## 7. References & Aesthetic Direction

| Reference | Draw from |
|---|---|
| Duolingo | Step-by-step onboarding structure: one decision per screen, persistent progress indicator, large tappable option cards, clear primary CTA anchored to bottom of screen |

**Aesthetic keywords translated:**

| Keyword | Pixel decision | Confirmed by |
|---|---|---|
| Calm | Muted blue-gray palette, ample whitespace (24px+ section gaps), no bold shadows or gradients, soft 12px radius on cards | Client — "calm and trustworthy" |
| Trustworthy | High-contrast legible type hierarchy, consistent iconography, clear visual feedback on selection, no ambiguous interactive states | Client — "calm and trustworthy" |

---

## 8. Design System

*Greenfield — all tokens established by designer judgment, based on client's confirmed aesthetic direction: calm, trustworthy, mobile-first, Duolingo-style setup flow.*

**Design Token Record:**

| Category | Token | Value | Usage | Source |
|---|---|---|---|---|
| Color | `--color-bg` | `#F8F9FB` | Page background | Designer judgment — calm, cool-white surface |
| Color | `--color-surface` | `#FFFFFF` | Cards, sheets | Designer judgment |
| Color | `--color-primary` | `#4B7BE5` | Primary action, selected state accent | Designer judgment — calm blue, trustworthy |
| Color | `--color-primary-light` | `#EEF3FC` | Selected card background tint | Designer judgment |
| Color | `--color-text-primary` | `#1C1C28` | Headings, body copy | Designer judgment |
| Color | `--color-text-secondary` | `#6B7280` | Supporting descriptions, labels | Designer judgment |
| Color | `--color-text-muted` | `#9CA3AF` | Captions, inactive states | Designer judgment |
| Color | `--color-border` | `#E5E7EB` | Card borders, dividers | Designer judgment |
| Color | `--color-border-active` | `#4B7BE5` | Selected card ring | Designer judgment |
| Color | `--color-tier-off` | `#9CA3AF` | "Off" tier badge | Designer judgment — neutral/inactive |
| Color | `--color-tier-balanced` | `#F59E0B` | "Balanced" tier badge | Designer judgment — moderate caution |
| Color | `--color-tier-strict` | `#EF4444` | "Strict" tier badge | Designer judgment — high attention |
| Color | `--color-success` | `#10B981` | Completion state, "all set" screen | Designer judgment |
| Color | `--color-blocked-bg` | `#FFF7ED` | Child blocked-content message bg | Designer judgment — warm, non-alarming |
| Typography | `--font-family` | `DM Sans` | All text | Designer judgment — approachable, clean, free via Google Fonts |
| Typography | `--text-heading-lg` | `DM Sans 600 / 24px / 32px` | Screen titles | Designer judgment |
| Typography | `--text-heading-md` | `DM Sans 600 / 18px / 24px` | Category section headers | Designer judgment |
| Typography | `--text-body` | `DM Sans 400 / 16px / 24px` | Descriptions, explanations | Designer judgment |
| Typography | `--text-label` | `DM Sans 500 / 14px / 20px` | Tier labels, form labels | Designer judgment |
| Typography | `--text-caption` | `DM Sans 400 / 13px / 18px` | Fine print, hints | Designer judgment |
| Spacing | `--space-screen-x` | `20px` | Horizontal screen padding | Designer judgment |
| Spacing | `--space-section` | `24px` | Between major sections | Designer judgment |
| Spacing | `--space-card` | `16px` | Internal card padding | Designer judgment |
| Spacing | `--space-gap-sm` | `8px` | Between tier option cards | Designer judgment |
| Spacing | `--space-gap-md` | `12px` | Between category items | Designer judgment |
| Radius | `--radius-card` | `12px` | Setting cards, option tiles | Designer judgment |
| Radius | `--radius-button` | `12px` | CTA buttons | Designer judgment |
| Radius | `--radius-badge` | `20px` | Tier badge pills | Designer judgment |
| Shadow | `--shadow-card` | `0 1px 3px rgba(0,0,0,0.08)` | Elevated cards | Designer judgment |
| Motion | `--transition-default` | `200ms ease-out` | All interactive transitions | Designer judgment — moderate, not snappy |

**Component Variant Record:**

| Component | Variant Properties | Confirmed States | Unconfirmed States |
|---|---|---|---|
| SettingCard (tier selector) | tier: off \| balanced \| strict | unselected, selected | disabled |
| CategoryRow | type: content \| behavioral \| personality \| learning | default, expanded (description visible) | — |
| ProgressBar | step: 1–5 | current step highlighted, completed steps filled | — |
| CTAButton | variant: primary \| ghost | default, pressed | loading |
| CompletionScreen | — | success state | — |
| ChatBubble | sender: user \| ai \| system | default | — |
| BlockedMessage | — | blocked/intercepted | — |

**Active State Visual Record:**

| Component | Active State Treatment | Source |
|---|---|---|
| SettingCard selected | Border: 2px solid `--color-border-active`; Background: `--color-primary-light`; Label weight: 600 | Designer judgment |
| SettingCard unselected | Border: 1px solid `--color-border`; Background: `--color-surface` | Designer judgment |
| ProgressBar step (current) | Filled circle, `--color-primary`, step number in white | Designer judgment — Duolingo reference |
| ProgressBar step (completed) | Filled circle, `--color-success`, checkmark icon | Designer judgment |
| ProgressBar step (upcoming) | Empty circle, `--color-border` | Designer judgment |
| CTAButton pressed | Background: `--color-primary` at 85% opacity, scale: 0.98 | Designer judgment |

---

## 9. Brand Identity

Tree House / SafeChat — greenfield. No existing logo, color system, or typeface to carry forward.

**Established for this engagement:**
- Wordmark: "SafeChat" — typeset in DM Sans 600, `--color-primary`
- Product family: "by Tree House" in DM Sans 400, `--color-text-secondary`
- Visual tone: calm, institutional-grade trust without clinical coldness
- No mascot or illustration system in scope for this engagement

---

## 10. Visual Design Language

**Aesthetic direction:** Calm / trustworthy — soft surface, clear hierarchy, no visual noise.

**Surfaces:** Off-white background (`#F8F9FB`) with white cards. No gradients. No decorative backgrounds. Cards use a 1px border + subtle shadow to lift from surface without drama.

**Color system:** Monochromatic blue-gray base with a single primary action color (`#4B7BE5`). Tier severity expressed with neutral → amber → red badge system, distinct from primary brand color so severity reads independently.

**Typography:** DM Sans throughout — friendly but precise. Clear weight distinction between headings (600) and body (400). No serif, no display face. Type does the hierarchy work; decoration does not.

**Components:** Card-based layout. Each setting category is a card. Each tier option (Off / Balanced / Strict) is a tappable card tile within the category. One category decision occupies the majority of the visible screen at a time — Duolingo-patterned focus.

**Progress:** Persistent top progress indicator across all setup steps. Parents always know where they are and how much is left.

**Motion:** Functional only. Tier card selection: 200ms ease-out border + background transition. Screen-to-screen: simple horizontal slide at 250ms. No decorative animation.

**Child interface:** Warmer than the parent interface. Chat bubbles use rounded corners (18px). Blocked content uses a warm orange-tint surface (`#FFF7ED`) with a soft icon and plain-language explanation — never a hard error state.

---

## 11. Copy Guide

**Tone descriptors:**

| Adjective | Writing rule | Confirmed by |
|---|---|---|
| Plain | No jargon. Every setting explained as if the parent has never thought about AI safety before | PRD copy — all setting descriptions are written in plain consumer language |
| Calm | No alarm language. Even strict settings are framed as choices, not warnings | PRD tone — "there are no wrong answers" |
| Honest | Acknowledge tradeoffs directly (more alerts = more false positives, etc.) | PRD — "there's always a tradeoff" |

**Locked strings (from PRD):**
- "SafeChat puts you in control of your child's AI experience."
- "This takes about 5 minutes."
- "There are no wrong answers — every family is different, and you can change any of these later."
- "Think of SafeChat as a seatbelt, not a substitute for conversation."
- Tier descriptions: "Off / The AI won't filter or flag anything in this category." — "Balanced / The AI steps in when it's fairly confident something's not right." — "Strict / The AI catches anything that even hints at this category."

**Blocked content (child-facing):**
- Tone: gentle, non-shaming, redirecting
- Never says "blocked" or "error"
- Example: "I can't help with that, but I can help you find someone who can. Want to talk to a trusted adult?"

**Terminology rules:**
- "Your child" not "the user" or "the minor"
- "Setting" not "policy" (policy is internal/technical)
- "Alert" not "notification" (alert carries appropriate gravity without being alarming)
- "Tier" not "level" in internal spec; "option" in parent-facing UI copy

---

## 12. User Flows

**Flow 1 — Parent Setup (primary)**

1. Welcome screen → reads intro, taps "Get started"
2. Content settings screen → reads section intro → selects Off/Balanced/Strict for each of 4 categories → taps "Next"
3. Behavioral monitoring screen → reads "pattern over time" explainer → selects tier for 3 categories → taps "Next"
4. AI personality screen → selects honesty level → selects relational boundary → taps "Next"
5. Learning settings screen → selects tier for 2 categories → taps "Next"
6. Completion screen → sees confirmation, reads what happens next, taps "Go to dashboard" (out of scope) or "Done"

**Flow 2 — Child chat with blocked content (secondary)**

1. Child opens chat interface (normal state)
2. Child sends a message that triggers a content policy
3. AI response is intercepted — child sees the blocked message component in place of the AI's response
4. Child reads the redirect message
5. Child can continue chatting on a different topic (input remains active)

---

## 13. Page Design & Layout

**Mobile canvas:** 390px width, standard iOS/Android safe areas respected.

**Parent Setup — all screens share:**
- Top: Progress bar (step X of 5), back chevron
- Middle: Scrollable content area (heading + description + setting cards)
- Bottom: Fixed CTA button ("Next" / "Get started" / "Done"), 20px horizontal padding, 32px bottom safe area

**Welcome Screen:**
- Large heading: "Choose how AI works for your family."
- Subheading: "This takes about 5 minutes."
- Body: SafeChat value prop paragraph (from locked strings)
- 3-row visual summary of Off/Balanced/Strict (icon + label + one-line description)
- Primary CTA: "Get started"

**Settings Screens (Content / Behavioral / Learning):**
- Section intro card: icon + headline + 1–2 sentence explanation of the category type
- Per-category cards stacked vertically — each card contains: emoji + category name + one-line description
- Tier selector within each card: 3 horizontal tile options (Off / Balanced / Strict) with tier color badge
- Selected tier tile: highlighted with primary border + tinted background
- "What does this mean?" expandable tooltip per category (collapsed by default)

**Personality Screen:**
- Two separate setting groups, each with 3 vertical radio-card options
- Each option: title + 2-line description
- Clear visual grouping between the two settings

**Completion Screen:**
- Success icon (checkmark in `--color-success` circle)
- Heading: "You're all set!"
- Body: 3-bullet "what happens next" summary
- Reassurance copy: "You can change these anytime."
- Primary CTA: "Done"

**Child Chat Interface:**
- Standard mobile chat layout: messages scroll upward, input fixed at bottom
- User bubble: right-aligned, `--color-primary` background, white text, 18px radius
- AI bubble: left-aligned, `--color-surface` background, `--color-text-primary` text, 18px radius, 1px border
- Blocked message: left-aligned, `--color-blocked-bg` background, warm border, lock icon, redirect copy

---

## 14. Interaction & States

| Component | States |
|---|---|
| SettingCard (tier tile) | unselected (default), selected (border + tint), hover/focus (border darkens) |
| CategoryRow | collapsed (tier selector visible), expanded (description panel visible) |
| CTAButton | default, pressed (scale 0.98 + opacity 85%), disabled (muted, when no tier selected) |
| ProgressBar step | upcoming (empty circle), current (filled primary), completed (checkmark) |
| ChatBubble | user message, AI message, system/blocked message |
| Input field | default, focused (border color → primary), disabled |
| Tooltip / expand | collapsed, expanded (smooth height transition, 200ms) |

**Active state visual treatments (detailed):**

| Component | Active treatment |
|---|---|
| SettingCard — selected | `border: 2px solid #4B7BE5`, `background: #EEF3FC`, tier label `font-weight: 600` |
| SettingCard — unselected | `border: 1px solid #E5E7EB`, `background: #FFFFFF` |
| SettingCard — hover | `border: 1px solid #B0C4F5`, `background: #F8F9FB` |
| CTAButton — default | `background: #4B7BE5`, `color: #FFFFFF`, `border-radius: 12px` |
| CTAButton — pressed | `background: rgba(75,123,229,0.85)`, `transform: scale(0.98)` |
| CTAButton — disabled | `background: #E5E7EB`, `color: #9CA3AF`, `cursor: not-allowed` |
| BlockedMessage | `background: #FFF7ED`, `border: 1px solid #FDE68A`, lock icon left, warm gray body text |

---

## 15. Delivery & Handoff

| Field | Value | Source |
|---|---|---|
| **Output format** | HTML mockup | Client-confirmed |
| **Device targets** | Mobile web — 390px viewport | Client-confirmed |
| **Accessibility** | WCAG AA (min 4.5:1 contrast on body text, 3:1 on UI components) | Designer judgment default |
| **Font loading** | Google Fonts — DM Sans (weights 400, 500, 600) | Designer judgment |
| **Icons** | Lucide React (already in repo) supplemented by emoji per PRD copy | Existing repo stack |

---

## Designer Notes

*For the Designer Agent — not shown to client.*

**Question Status Tracker:**

| Q-ID | Priority | Question | Status | Client's Answer |
|---|---|---|---|---|
| Q1 | P0 | What needs to be built? | confirmed | Parent-facing setup AND child-facing setup |
| Q2 | P0 | Which version of settings? | confirmed | Trimmed (A): 4 content + 3 behavioral + personality + learning |
| Q3 | P0 | Child-facing UI in scope? | confirmed | B — Both parent and child interfaces |
| Q4 | P0 | Output format? | confirmed | HTML mockup |
| Q5 | P0 | Device targets? | confirmed | Mobile web only |
| Q6 | P1 | Existing brand assets? | confirmed | B — Greenfield |
| Q7 | P1 | Visual direction? | confirmed | Calm / trustworthy |
| Q8 | P1 | Reference product? | confirmed | Duolingo |
| Q9 | P1 | Success criteria? | confirmed | B — Design spec with all states documented |
| Q10 | P1 | Hard constraints? | confirmed | None |

**Counter-Hypothesis Log:**
- Client's stated problem: Create a project brief for SafeChat.
- Alternative reading: The classifier build plan section might imply backend scope.
- Evidence: Classifier section is engineering-spec level (eval datasets, Bloom, temperature).
- Decision: Proceed with UI framing only; classifier is out of scope.
- Rationale: Client confirmed parent + child UI when asked about scope. No backend scope mentioned.

**Designer-judgment calls (applied due to greenfield, client confirmed open direction):**
- Full color palette derived from "calm/trustworthy" — primary blue `#4B7BE5`, off-white surface `#F8F9FB`
- DM Sans chosen over Inter/Roboto for slightly warmer, more approachable feel on mobile
- Tier severity color system (gray / amber / red) kept visually separate from brand primary to avoid conflating "strict = bad brand action"
- Child blocked-message uses warm orange tint rather than red or gray — avoids alarm on child side
- WCAG AA applied as default even though not stated

**Trimmed scope clarification:** The "trimmed" parent guide contains 4 sections (not 5). The data/privacy section (section 5 in full version) is excluded. The content section has 4 items (vs 12 in full). All other trimmed sections (personality, learning) are included as written.

**Child-facing interpretation:** "Child-facing setup" interpreted as the child's chat interface (not a separate child onboarding flow), since the PRD describes no child-side configuration — only the parent configures. Child scope = default chat state + blocked content state.

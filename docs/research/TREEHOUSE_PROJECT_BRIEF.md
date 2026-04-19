# WHALES PROJECT BRIEF

| Field                   | Value                                          |
|-------------------------|------------------------------------------------|
| **Client**              | TreeHouse / SafeChat                           |
| **Date**                | 2026-04-16                                     |
| **Engagement ID**       | treehouse_safechat_mobile_2026_04_16           |
| **Confirmation status** | All values client-confirmed or asset-extracted |

---

## 1. Product Vision

TreeHouse is an iOS mobile app that gives parents meaningful, granular control over how AI interacts with their children. Parents configure a safety policy across five dimensions (content moderation, behavioral monitoring, AI personality, academic integrity, data privacy) and monitor outcomes through a dashboard. Children access a guided AI chatbot experience — similar in layout to ChatGPT — operating within the guardrails their parent set.

The product name is **TreeHouse**. The AI product embedded within it is called **SafeChat**. Both names are in use; TreeHouse is the parent-facing brand, SafeChat describes the AI feature.

Success looks like: a parent completing the full onboarding configuration in under 5 minutes with confidence in the choices they've made, and a child getting a natural, engaging AI experience that is transparently safer than the default.

---

## 2. Problem Statements

Parents have no way to meaningfully configure how AI models interact with their children. Default AI systems are built for adults, apply no age-appropriate filtering, and provide zero visibility into what their child is doing or experiencing.

SafeChat solves this by wrapping an AI chatbot in a configurable safety layer that parents control — with 21 individually configurable settings across 5 dimensions — and behavioral monitoring that detects patterns over time, not just individual bad messages.

**Framing note:** The product is parent-led (configuration drives the experience) but child-retention-dependent. Both views are equal-priority deliverables. The parent builds the container; the child lives in it.

---

## 3. Target Users

**Primary user A — Parent**
A parent of a middle schooler (approx. ages 10–14). Not an AI expert. Motivated by safety, not control for its own sake. Arrives at onboarding slightly anxious: they know AI can be risky for kids but don't fully understand how. Their key emotional need is confidence — they want to leave setup feeling like they did the right thing for their family. They are time-constrained (5 minutes is their threshold) and will abandon a flow that feels like reading a legal document.

**Primary user B — Child (middle schooler)**
Ages 10–14. Comfortable with smartphone interfaces. Will compare the experience immediately to ChatGPT or other AI tools they've seen. Their key need is that the product doesn't feel "babyish" or over-restricted. A child who feels condescended to disengages. They don't know about the parent configuration layer and should not be reminded of it constantly.

---

## 4. Success Metrics

**Goal Thread:**

| Field                 | Value                                                                                      |
|-----------------------|-------------------------------------------------------------------------------------------|
| **Primary metric**    | Parent onboarding completion rate — target ≥ 80% of parents who start reach the confirmation screen |
| **Secondary metrics** | Child chatbot daily active sessions; Parent dashboard weekly return rate                   |
| **Proxy signals**     | Parent reaches confirmation screen without skipping any category; Child sends ≥ 3 messages in first session |

---

## 5. Key Features & Scope

**In Scope:**

| Screen / Feature              | Description                                                                                          |
|-------------------------------|------------------------------------------------------------------------------------------------------|
| Parent account creation       | Sign-up flow for parent: email/password or SSO                                                       |
| Child account setup           | Parent creates a child profile with name and age                                                     |
| Parent safety configuration   | 5-section linear card-stack onboarding: content moderation → behavioral monitoring → AI personality → academic integrity → data privacy |
| Parent dashboard              | Post-onboarding home: alert feed (flagged messages by category/severity) + usage summary (time, topics, session count) + conversation browser (searchable list of child chat sessions) |
| Child login                   | Separate login screen using the account the parent created                                           |
| Child chatbot                 | AI chat interface, ChatGPT-like layout: message thread + input bar + minimal navigation               |

**Out of Scope:**

| Item                         | Reason                                                                  |
|------------------------------|-------------------------------------------------------------------------|
| Web / desktop version        | Mobile-only (iOS) for this build                                        |
| Multi-child households       | Single child account per parent for initial build                       |
| Notification system (push)   | Real-time push alerts are a backend feature; dashboard alerts are in scope |
| Settings edit post-onboarding | Dashboard settings editing deferred to follow-up; onboarding flow only |

---

## 6. Constraints

- **Platform:** iOS-native feel. Follows Human Interface Guidelines. SF Pro typography. Standard iOS navigation patterns (card stack, bottom tab bar post-onboarding, back/forward navigation).
- **Navigation pattern (onboarding):** Linear card-stack flow — one setting category per screen, swipe or tap to advance. No persistent nav during onboarding. Progress indicator required.
- **Navigation pattern (post-onboarding, parent):** Bottom tab bar with: Dashboard, Alerts, Settings (at minimum).
- **Navigation pattern (child):** Minimal — chat is primary surface. No bottom tab complexity.
- **Target age:** Middle schoolers (10–14) for the child experience.
- **Accessibility:** WCAG AA as minimum standard for all text and interactive elements.
- **No existing design system to preserve:** This is a 0→1 greenfield build. All design tokens are being established from scratch.

---

## 7. References & Aesthetic Direction

| Reference    | Draw from                                                                                              |
|--------------|--------------------------------------------------------------------------------------------------------|
| Calm app     | Deep navy/midnight blue backgrounds; soft gradient surfaces; generous whitespace; rounded type; calm, trustworthy emotional register |

**Aesthetic keywords translated:**

| Keyword         | Pixel decision                                                                                  | Confirmed by       |
|-----------------|--------------------------------------------------------------------------------------------------|---------------------|
| Clean           | Maximum whitespace on card screens; single-purpose screens in the onboarding stack; no visual clutter | Client — Q4        |
| Friendly        | Rounded corner radius (20–28px on cards); soft color palette; approachable sans-serif typeface (Nunito or SF Pro Rounded) | Client — Q4        |
| Approachable    | Warm off-white background (#F7F5F1); soft shadows (not hard drop shadows); conversational copy tone | Client — Q4        |
| Modern          | Strong typographic hierarchy; high-contrast accent color against deep navy surfaces; smooth transitions | Client — Q4        |
| Calm-inspired   | Deep navy primary (#162B45); teal/cyan accent (#4BBFD4); warm off-white light bg (#F7F5F1); gradient surface treatment on key screens | Client — Q4 + Calm reference |

---

## 8. Design System

**Design Token Record:**

| Category   | Token                    | Value                              | Source                          | Confirmed         |
|------------|--------------------------|-------------------------------------|----------------------------------|-------------------|
| Color      | `primary-dark`           | #162B45                             | Calm app reference — deep navy  | Yes — client ref  |
| Color      | `accent-teal`            | #4BBFD4                             | Calm app reference — teal       | Yes — client ref  |
| Color      | `bg-light`               | #F7F5F1                             | Calm app reference — warm white | Yes — client ref  |
| Color      | `surface-white`          | #FFFFFF                             | Standard                        | Yes               |
| Color      | `text-primary`           | #1A2635                             | Derived from primary-dark       | Yes               |
| Color      | `text-secondary`         | #6B7A8D                             | Muted navy-gray                 | Yes               |
| Color      | `text-on-dark`           | #FFFFFF                             | On primary-dark surfaces        | Yes               |
| Color      | `alert-danger`           | #E05656                             | Soft red for alerts             | Yes               |
| Color      | `alert-warning`          | #F0A44A                             | Amber for warnings              | Yes               |
| Color      | `alert-success`          | #4CAF82                             | Soft green for safe/off states  | Yes               |
| Color      | `border-subtle`          | #E8E6E1                             | Warm gray border                | Yes               |
| Typography | `heading-display`        | Nunito, 700–800, 28–34px            | Friendly rounded sans-serif     | Yes — client Q4  |
| Typography | `heading-section`        | Nunito, 700, 20–24px                | Section headers                 | Yes               |
| Typography | `body`                   | Nunito, 400, 16px / 1.5             | Body text                       | Yes               |
| Typography | `label`                  | Nunito, 600, 13–14px                | Labels, pills, captions         | Yes               |
| Typography | `caption`                | Nunito, 400, 12px                   | Timestamps, helper text         | Yes               |
| Radius     | `radius-card`            | 24px                                | Onboarding cards, modal sheets  | Yes               |
| Radius     | `radius-button`          | 14px                                | Primary buttons                 | Yes               |
| Radius     | `radius-pill`            | 999px                               | Off/Balanced/Strict pills       | Yes               |
| Radius     | `radius-input`           | 12px                                | Text inputs                     | Yes               |
| Shadow     | `shadow-card`            | 0 4px 20px rgba(22,43,69,0.08)      | Floating card surfaces          | Yes               |
| Shadow     | `shadow-bottom-bar`      | 0 -1px 12px rgba(22,43,69,0.06)     | Bottom tab bar                  | Yes               |
| Spacing    | `onboarding-card-padding`| 28px horizontal, 32px vertical      | Per onboarding card             | Yes               |
| Spacing    | `section-gap`            | 24px                                | Between section elements        | Yes               |
| Motion     | `transition-default`     | 250ms ease-out                      | Moderate — friendly, not slow   | Yes               |
| Motion     | `onboarding-card-transition` | 320ms ease-in-out cubic-bezier | Card-to-card swipe              | Yes               |

**Component Variant Record:**

| Component                | Figma Node ID | Variant Properties                           | Confirmed States            | Unconfirmed States         |
|--------------------------|---------------|----------------------------------------------|-----------------------------|----------------------------|
| Safety Setting Pill      | N/A (0→1)     | tier: Off \| Balanced \| Strict              | default, selected           | hover, disabled            |
| Onboarding Progress Bar  | N/A (0→1)     | progress: 0–100%                             | active                      | —                          |
| Primary Button           | N/A (0→1)     | variant: primary \| secondary \| ghost       | default, pressed            | disabled, loading          |
| Alert Row                | N/A (0→1)     | severity: low \| medium \| high              | default, read, unread        | expanded                   |
| Chat Bubble              | N/A (0→1)     | sender: user \| ai                           | default                     | loading (typing indicator) |
| Bottom Tab Bar           | N/A (0→1)     | tab: Dashboard \| Alerts \| Settings         | default, active             | badge (alert count)        |

**Active State Visual Record:**

| Component            | Active State Treatment                                      | Source          |
|----------------------|-------------------------------------------------------------|-----------------|
| Safety Setting Pill  | Filled background (accent-teal for Balanced, primary-dark for Strict, border-subtle for Off); white label text | 0→1 — defined   |
| Bottom Tab Bar       | Active tab: accent-teal icon + label; inactive: text-secondary | 0→1 — defined   |
| Chat Bubble (AI)     | Left-aligned, surface-white bg, subtle shadow, Nunito 16px  | 0→1 — defined   |
| Chat Bubble (User)   | Right-aligned, accent-teal bg, white text                   | 0→1 — defined   |

---

## 9. Brand Identity

- **App name:** TreeHouse
- **AI feature name:** SafeChat
- **Logo/wordmark:** Not provided — to be designed as part of this build
- **Voice:** Calm, clear, and confident. Parental but not patronizing. Uses plain language (never "our proprietary classifier" — always "we watch for…"). Treats parents as capable adults making good-faith decisions. Treats children as real users, not just protected objects.
- **Tagline:** "Choose how AI works for your family." (confirmed from client document)
- **Color system:** Deep navy + teal accent + warm off-white — see §8
- **Type:** Nunito (rounded, friendly, modern) — primary typeface for all surfaces

---

## 10. Visual Design Language

**Aesthetic:** Calm-inspired soft modernism. Deep navy surfaces for high-stakes screens (onboarding completion, alert states). Warm off-white light surfaces for content-heavy screens (dashboard, chat). Teal accent used sparingly as a trust signal — primary actions, active states, progress.

**Surface treatment:**
- Onboarding cards: white surface on #F7F5F1 background, 24px radius, soft shadow (shadow-card), full-bleed with no visible screen edge
- Dashboard: light bg (#F7F5F1) with white cards floating above it
- Dark screens (onboarding opener, confirmation): #162B45 deep navy with a subtle top-to-bottom gradient toward a slightly lighter navy
- Child chatbot: ultra-clean white surface, minimal visual chrome — the conversation is the UI

**Typography:**
- Nunito Bold/ExtraBold for display headings (onboarding titles, dashboard section heads)
- Nunito Regular/SemiBold for body and labels
- Never mixed with a second typeface — Nunito handles the full type scale
- Line heights generous (1.5–1.6 for body, 1.2–1.3 for display)

**Color usage rules:**
- Accent-teal (#4BBFD4) for: primary CTAs, selected safety pills, active tab, progress bar fill, AI chat bubble accent
- Primary-dark (#162B45) for: dark screen backgrounds, Strict safety pill fill, primary text on light surfaces
- Alert-danger (#E05656) for: high-severity alerts only — not overused
- Off state (safety pills): transparent/outlined — communicates "inactive" clearly

**Motion:**
- Onboarding card transitions: lateral swipe (left-to-right advance, right-to-left back) — 320ms ease-in-out
- Dashboard: fade-in on load (250ms)
- Chat: message bubbles animate in from bottom (200ms, slight spring)
- Safety pills: tap → fill transition (180ms ease-out)

**Iconography:**
- SF Symbols (iOS-native) for system icons (back, close, tab bar)
- Custom emoji-adjacent icons for safety category labels (matches client document: ❤️, 🧪, 🍎, etc.) — rendered as styled SVG, not emoji

**Backgrounds:** Warm off-white (#F7F5F1) for light surfaces; never pure white (#FFFFFF) as a page background — always as a card surface floating above the warm background

---

## 11. Copy Guide

**Tone descriptors:**

| Adjective     | Writing rule                                                                                     | Confirmed by |
|---------------|--------------------------------------------------------------------------------------------------|--------------|
| Plain         | Never use jargon. "We watch for signs your child is relying on AI too much" not "behavioral dependency detection" | Client doc   |
| Reassuring    | Lead with what the parent controls, not what could go wrong                                       | Client doc   |
| Honest        | Acknowledge tradeoffs explicitly ("Balanced catches most problems with fewer false alarms")       | Client doc   |
| Conversational | Second-person throughout. "Your child", "your family", "you'll see"                              | Client doc   |

**Locked strings:**
- App name: **TreeHouse** (not "Tree House" with a space)
- AI feature name: **SafeChat**
- Tagline: "Choose how AI works for your family."
- Setup intro: "This takes about 5 minutes."
- Tier labels: **Off** / **Balanced** / **Strict** (exact casing)
- Dashboard section: "Parent Dashboard"

**Terminology rules:**
- Parent's configuration choices → "settings" (not "policies" or "rules")
- Flagged items → "alerts" (not "violations" or "incidents")
- The child's chatbot sessions → "conversations" (not "sessions" or "chats")
- Safety categories → use the plain-language names from the client doc, not the classifier codes (1.1, 1.2, etc.)

---

## 12. User Tasks

1. **Parent onboarding:** A parent needs to create an account, set up their child's profile, and complete all 5 sections of safety configuration in a single sitting — without needing to read a manual or ask for help on any setting.

2. **Parent dashboard — act on an alert:** A parent who received a notification needs to open the app, understand what triggered the alert, read the relevant context, and decide whether to act — all within the first 30 seconds of opening the app.

3. **Child chatbot — complete a task:** A child needs to ask the AI a question, receive a useful answer, and continue a multi-turn conversation — without the safety guardrails feeling like friction, interruption, or condescension during a normal interaction.

---

## 13. Current Page State

This is a 0→1 greenfield build. No existing screens, no existing design system, no existing token file. The repo contains a Next.js 16 + shadcn/ui + Tailwind v4 scaffold with no visual identity.

**Surface map (to be built from scratch):**

| Surface                       | View   | Notes                                                                 |
|-------------------------------|--------|-----------------------------------------------------------------------|
| Parent sign-up                | Parent | Account creation — email + password or SSO                            |
| Child profile setup           | Parent | Name, age, avatar (simple)                                            |
| Onboarding: Content moderation | Parent | 12 categories, each with Off/Balanced/Strict pill selector            |
| Onboarding: Behavioral monitoring | Parent | 4 categories, same tier selector pattern                           |
| Onboarding: AI personality    | Parent | 2 settings — Encouragement style, Relational boundaries               |
| Onboarding: Academic integrity | Parent | 2 categories, tier selector                                          |
| Onboarding: Data privacy      | Parent | 1 setting — data usage opt-in/out                                     |
| Onboarding: Confirmation      | Parent | Summary of all selections + "Your setup is complete" state            |
| Parent Dashboard — home       | Parent | Alert feed + usage summary + conversation browser (three-panel or tab-switched) |
| Child login                   | Child  | Login with parent-created account credentials                         |
| Child chatbot                 | Child  | Message thread + input bar + SafeChat branding                        |

---

## 14. Existing Interaction States

No existing screens — greenfield. Component states to be defined by Designer Agent.

| Component                | States to design (Designer Agent decision)                                         |
|--------------------------|-------------------------------------------------------------------------------------|
| Safety Setting Pill      | Off (unselected), Balanced (selected), Strict (selected), tap feedback             |
| Primary Button           | Default, pressed, disabled, loading                                                 |
| Alert Row                | Unread (bold), read (normal weight), expanded, swiped-to-dismiss                   |
| Chat Bubble (User)       | Sending, sent, error                                                                |
| Chat Bubble (AI)         | Typing indicator, complete, blocked/redirected message                             |
| Onboarding Card          | Entering (swipe-in), active, leaving (swipe-out)                                   |
| Bottom Tab Bar           | Default, active (current tab), badge (unread alert count)                          |

---

## 15. Delivery & Handoff

| Field              | Value                                      | Source             |
|--------------------|--------------------------------------------|--------------------|
| **Output format**  | Interactive HTML prototype                 | Skill default      |
| **Device targets** | Mobile — iOS (390px / 844px viewport)      | Client confirmed Q2 |
| **Accessibility**  | WCAG AA minimum                            | Constraint — §6    |
| **Platform feel**  | iOS Human Interface Guidelines             | Client confirmed Q2 |
| **Typography**     | Nunito (Google Fonts CDN in prototypes)    | Defined in §8      |

---

## Designer Notes

*For the Designer Agent — not shown to client.*

**Pipeline entry:** This brief was compiled from a client document (Tree House - Parent Configuration.md) covering the full product specification, plus 6 Phase 1 questions answered by the client on 2026-04-16.

**Question Status Tracker:**

| Q-ID | Priority | Question | Status    | Client Answer                                      |
|------|----------|----------|-----------|----------------------------------------------------|
| Q1   | P0       | Scope     | confirmed | Full end-to-end — all four surfaces                |
| Q2   | P0       | Platform  | confirmed | iOS-native feel                                    |
| Q3   | P1       | Nav pattern | confirmed | Linear card stack for onboarding                  |
| Q4   | P0       | Visual direction | confirmed | Clean, friendly, approachable, modern. Calm app inspiration |
| Q5   | P1       | Child vs parent visual system | confirmed | Same visual system for both |
| Q6   | P1       | Dashboard primary content | confirmed | All three: alert feed + usage summary + conversation browser |

**Key tensions for Designer Agent:**
1. The onboarding has 19–21 individual settings across 5 sections. A card-stack with one screen per section (5 cards) is clean. But a card per individual setting (19–21 cards) would be exhausting. Recommend grouping at section level with settings listed within each card — Designer Agent to decide exact grouping.
2. The parent dashboard has three distinct content types (alerts, usage, conversations). All three are "primary" per the client. Designer Agent must decide whether to use tabs, a scroll-based layout, or a three-panel approach — brief does not prescribe this.
3. The child chatbot must not feel restricted or "babyish." Every guardrail intervention (blocked message, tutor mode redirect) needs a copy treatment that respects the child. Copy Guide in §11 governs tone; interaction design is Designer Agent territory.
4. "Don't reference anything" — client instruction. Do not reference prior test files (`src/app/tests/*/page.tsx`) or prior mockups from this repo as design sources. This brief is the sole source of truth.

**Calm app reference translation:**
The client referenced the Calm app for aesthetic direction. Key Calm patterns relevant here: deep navy gradient backgrounds for key moments; warm off-white for reading-heavy screens; generous card whitespace; rounded type (they use a custom rounded sans); soft teal/blue accent. These have been translated to concrete tokens in §8. The Calm app's meditation-context visuals (nature photography, ambient imagery) are not applicable — do not carry over the photography-heavy aesthetic, only the spatial and color language.

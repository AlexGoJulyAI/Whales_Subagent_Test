# TREEHOUSE / SAFECHAT — PROJECT BRIEF

| Field | Value |
|---|---|
| **Client** | TreeHouse / GoJuly AI |
| **Date** | 2026-04-18 |
| **Engagement ID** | treehouse_safechat_v3_2026_04_18 |
| **Status** | Design Research complete — ready for Designer Agent |

---

## Product Overview

**TreeHouse** (internal name) / **SafeChat** (parental setup product name) is a mobile iOS app that makes AI chatbots safe for teenagers (ages 13–17) by giving parents transparent control over how AI responds to their child.

The app has two distinct user modes:

| Mode | User | Primary Goal |
|------|------|-------------|
| Parent View | Parent/guardian | Configure AI safety settings for each child; monitor AI conversation activity |
| Child View | Teen (13–17) | Log in to their account and use the AI chatbot |

---

## Screens to Design

### Parent View — Onboarding Flow
1. Welcome / account creation
2. Add child profile (name, age)
3. Safety configuration — 9 categories (Off / Balanced / Strict toggles):
   - Content controls: Self-harm & suicide, Drugs & substance use, Eating disorders & body image, Illegal activities
   - Pattern monitoring: Loneliness & AI dependency, Radicalization, Sharing personal information
   - AI personality: Honesty level (Friend vs Tool), Schoolwork (homework help limits, over-reliance)
4. Completion screen / "You're all set"

### Parent View — Dashboard (post-onboarding)
- Per-child conversation feed (summary of topics, alert flags)
- Trend charts (usage over time, flagged topic frequency)
- Alert detail view
- Settings access

### Child View — Onboarding
- Login screen (enter credentials created by parent)
- Simple welcome / "ready to chat" confirmation

### Child View — Chatbot
- ChatGPT-style chat interface
- AI responds within configured safety parameters

---

## UX Foundation

### 1. Users and Goals

| User | Goal |
|------|------|
| Parent | Configure once; trust that AI conversations are safe; see if anything concerning is happening |
| Child (teen) | Use a capable AI assistant without friction; not feel surveilled or restricted |

### 2. Information Hierarchy — Parent Onboarding

1. **Reassurance**: "You are in control. This takes 5 minutes."
2. **Category overview**: What the 9 settings actually cover (plain language)
3. **Per-category control**: Toggle each setting with clear labels
4. **Completion**: Confirmation that settings are active

### 3. Information Hierarchy — Parent Dashboard

1. **Status at a glance**: Is anything flagged this week?
2. **Per-child feed**: What topics has this child been discussing?
3. **Trend data**: Is usage or risk increasing over time?
4. **Action path**: Tap into any alert to see context and adjust settings

### 4. Conversion Path — Parent Onboarding

Landing → Create account (2 fields) → Add child (name + age, 2 fields) → Safety config (9 toggles, one page) → Done

Goal: parent completes setup in under 3 minutes. No account creation friction, no paywall in onboarding.

### 5. States Required

| State | Applies | Notes |
|-------|---------|-------|
| Loading | Yes | Skeleton rows for dashboard feed; spinner on save |
| Empty | Yes | No conversations yet (child hasn't chatted); no alerts |
| Error | Yes | Network failure on save; inline message |
| Success / confirmation | Yes | Onboarding completion screen; settings saved toast |
| Disabled | Yes | Toggles disabled during save |
| Hover | No | Native mobile, no hover |
| Focus | Yes | Input focus ring on web preview |
| Active / selected | Yes | Toggle active state; selected tab in bottom bar |

---

## Design Research Anchors

### Anchor A → Direction A: Conversational Warmth
**Source:** Cooper AI Chat — pattern-ai-chat-dribbble.png

| Token | Value | Source |
|-------|-------|--------|
| Page bg | `#f8f7fc` | canvas-sampled |
| Card surface | `#ffffff` | canvas-sampled |
| Primary accent | `#6b2aed` | canvas-sampled |
| User bubble | `#d7d0fe` | canvas-sampled |
| AI bubble | `#ffecba` | canvas-sampled |
| Text | `#242529` | canvas-sampled |
| Nav bg | `#ddd7ed` | canvas-sampled |

- **Type:** Plus Jakarta Sans (rounded geometric sans) 700/400
- **Shape:** radius 24px cards, pill buttons
- **Signature:** Dual-tone chat bubbles — lavender for user, warm yellow for AI
- **Anti-pattern:** No dark backgrounds, no harsh monochrome

### Anchor B → Direction B: Trusted Data Dashboard
**Source:** Fireart Parental Dashboard — pattern-parental-control-dribbble-1.png

| Token | Value | Source |
|-------|-------|--------|
| Page bg | `#fafbfb` | canvas-sampled |
| Peach card surface | `#ffeee6` | canvas-sampled |
| Navy accent | `#274296` | canvas-sampled |
| Coral secondary | `#f29da8` | canvas-sampled |
| Navy text | `#283b85` | canvas-sampled |
| Body text | `#77797a` | canvas-sampled |
| Blue pill | `#d9e0f8` | canvas-sampled |

- **Type:** Clean geometric sans 700/400
- **Shape:** radius 20–24px cards, pill buttons, hairline border `#e0e1e3`
- **Signature:** Per-category warm pastel card fills with embedded micro-charts
- **Anti-pattern:** No monochrome palette, no heavy shadows

### Anchor C → Direction C: Serious Shield
**Source:** Cyber Security App — pattern-security-app-dribbble.png

| Token | Value | Source |
|-------|-------|--------|
| Page bg | `#0a0a0a` | canvas-sampled |
| Card surface | `#1c1c1c` | canvas-sampled |
| Accent violet | `#8f7bfa` | canvas-sampled |
| Status green | `#42ba5f` | canvas-sampled |
| Heading text | `#ffffff` | zoom-estimated |
| Body text | `#b0b0b0` | canvas-sampled |
| Border | `#232323` | canvas-sampled |

- **Type:** Heavy grotesque sans 800/400, tight letter-spacing -0.02em
- **Shape:** radius 12–16px cards, medium-large buttons, hairline borders
- **Signature:** Oversized background display text at 35% opacity behind UI frame
- **Anti-pattern:** No light backgrounds, no pastels, no glassmorphism

---

## Hard Constraints

- **Light mode only** — no dark mode required (Direction C uses dark as its design language, not a system preference)
- **iOS mobile** — 390×844 viewport (iPhone 14 base), design for mobile-first
- **No brand assets defined** — create visual identity from scratch
- **Child age range:** 13–17 teens — child chatbot UI must feel capable and respectful, not childish
- **Parent tone:** trustworthy, clinical-adjacent but warm — not alarming, not cutesy

---

## What's Next

Designer Agent reads this brief and DESIGN_RESEARCH.html, then produces:
1. User journey maps for each of the 3 directions (A, B, C)
2. Three visual mockups (one per direction) covering key screens
3. Hands off to Prototyper Agent for interactive HTML prototypes

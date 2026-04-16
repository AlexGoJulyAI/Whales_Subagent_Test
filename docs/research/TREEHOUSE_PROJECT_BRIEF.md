# WHALES PROJECT BRIEF

| Field | Value |
|---|---|
| **Client** | TreeHouse / SafeChat |
| **Date** | 2026-04-15 |
| **Engagement ID** | treehouse_safechat_mobile_2026_04_15 |
| **Confirmation status** | All values client-confirmed or asset-extracted |

---

## 1. Product Vision

SafeChat is a mobile app (iOS-first) that gives parents meaningful control over how AI interacts with their children. Parents configure safety policies and monitor outcomes through a dashboard; children access a guided AI chatbot experience within those guardrails.

The product's core differentiator is the parent configuration layer — 19 individually configurable safety categories across five dimensions — paired with a real-time alert and monitoring system. The child chatbot is the delivery vehicle; the safety architecture is the product.

Success looks like: parents completing the onboarding configuration flow in under 5 minutes, having confidence in the safety settings they've chosen, and receiving actionable alerts when the system detects a concern — without being overwhelmed by noise.

---

## 2. Problem Statements

Parents have no way to meaningfully configure how AI models interact with their children. Default AI systems are built for adults, apply no age-appropriate filtering, and provide no visibility into what their child is doing or experiencing.

SafeChat solves this by wrapping an AI chatbot in a configurable safety layer that parents control, with behavioral monitoring that detects patterns over time — not just individual bad messages.

**Framing note:** The product is parent-led (configuration drives the experience), but child-retention-dependent. Both user views are equal-priority deliverables. The parent builds the container; the child lives in it.

---

## 3. Target Users

**Primary User A — Parent**
- Role: Guardian making safety decisions for a child (estimated age 10–16)
- Context: First-time setup at home; occasional check-ins via dashboard
- Technical fluency: Consumer-level (not technical); comfortable with iOS apps, settings screens, toggle-based configuration
- Emotional state at key task (onboarding): Cautious, slightly overwhelmed by AI risks, wants reassurance that they've made the right choices — not an expert, needs plain-language explanations of each setting
- Key goal: Complete configuration in one session (~5 minutes), feel confident in what they've set up

**Primary User B — Child**
- Role: Student or teen using AI as a homework aid, creative tool, or conversational partner
- Context: Daily use, likely solo, on a family device or their own phone
- Technical fluency: Digital native; very comfortable with chat interfaces (iMessage, Snapchat, ChatGPT)
- Emotional state at key task (chatting): Curious, task-driven, low patience for friction
- Key goal: Get useful answers and have a good conversation; not notice the safety layer unless they hit it

---

## 4. Success Metrics

| Field | Value |
|---|---|
| **Primary metric** | Parent onboarding completion rate — target >80% of parents who start complete all 5 configuration categories |
| **Secondary metrics** | Child session frequency (daily active use); parent alert response rate (tapped within 24h) |
| **Proxy signals** | Time-on-task during parent onboarding (target <5 min); child retention past first week |

---

## 5. Key Features & Scope

**In Scope:**

| Screen / Feature | Description |
|---|---|
| Parent Welcome + Sign Up | App entry, account creation (email or Sign in with Apple) |
| Child Account Creation | Parent enters child's name and age; app generates PIN/family code |
| Safety Configuration Flow | 5-category, multi-step configuration: Content Moderation, Behavioral Monitoring, AI Personality, Schoolwork, Data & Privacy. Each category presents Off/Balanced/Strict options with plain-language explanations. |
| Configuration Completion Screen | "You're all set!" confirmation with summary of choices |
| Parent Dashboard — Alert Feed | Chronological list of flagged conversations: category icon, severity, timestamp, message snippet |
| Parent Dashboard — Usage Stats Tab | Secondary tab: time spent, conversation frequency, topic trend summary |
| Child Welcome / Login | Child-facing entry screen; PIN or family code entry |
| Child Chatbot Interface | Message thread UI (similar to iMessage/ChatGPT): bubbles, input bar, AI response states |
| Conversation History Drawer | Bottom sheet or side drawer listing past chat sessions; child can resume any conversation |
| Safety Redirect State | In-chat UI shown to child when a safety policy blocks a response — age-appropriate, non-alarming redirect |

**Out of Scope:**

| Item | Reason |
|---|---|
| Dark mode | Client confirmed: light mode only |
| Animation / transitions | Client confirmed: no animation |
| Android-specific UI patterns | iOS-first; cross-platform implementation is an engineering concern |
| Parent push notification design | Notification UX is OS-level; in-app alert feed is the designed surface |
| Multi-child management | Not described in PRD; assumed single child account per parent for MVP |
| AI model selection | Backend concern; not surfaced in UI |

---

## 6. Constraints

| Constraint | Detail |
|---|---|
| Platform | iOS-first. Bottom tab bar navigation following iOS HIG. |
| Mode | Light mode only |
| Animation | None — static transitions only |
| Typography | SF Pro (iOS system font — no web font loading) |
| Onboarding duration | Target: parent completes full configuration in ≤5 minutes |
| Brand | Starting fresh — no existing logo, colors, or guidelines |
| Accessibility | Not explicitly specified — apply iOS default accessibility (Dynamic Type support, minimum 44pt tap targets, sufficient contrast ratios per WCAG AA as baseline) |

---

## 7. References & Aesthetic Direction

| Reference | Draw from |
|---|---|
| Apple iOS (Settings, Screen Time) | Grouped table layout, navigation patterns, SF Pro typography scale, bottom tab bar, sheet presentation |
| Apple iOS (Messages) | Chat bubble style, input bar, keyboard behavior |
| Things 3 | Card-based task list as model for alert feed presentation |

**Aesthetic keywords translated:**

| Keyword | Pixel decision | Confirmed by |
|---|---|---|
| Clean | White (#FFFFFF) primary surface; #F2F2F7 grouped backgrounds; no decorative elements | Q-V2, iOS convention |
| Trustworthy | Single brand accent (forest green) used sparingly on primary actions only; no competing colors | Q-V2 + designer-judgment |
| iOS-native | SF Pro typography scale; 8pt spacing grid; standard iOS components (cells, sheets, tab bar) | Q-V2, Q-S1 |
| Minimal color | Surfaces are white/gray; color appears only on: primary CTA, active states, severity indicators | Q-V2 + designer-judgment |

---

## 8. Design System

**Design Token Record:**

### Colors

| Token | Value | Usage | Source |
|---|---|---|---|
| `background` | `#FFFFFF` | Primary screen background | iOS convention [design-md-reference: apple] |
| `background-grouped` | `#F2F2F7` | Grouped settings lists, inset card backgrounds | iOS convention |
| `background-elevated` | `#FFFFFF` | Cards, sheets, modals | iOS convention |
| `separator` | `#C6C6C8` | List dividers, cell borders | iOS convention |
| `label-primary` | `#000000` | Primary text, headings | iOS convention |
| `label-secondary` | `#6D6D72` | Secondary descriptions, metadata | iOS convention |
| `label-tertiary` | `#AEAEB2` | Placeholders, disabled text | iOS convention |
| `brand-primary` | `#1A6B4A` | Primary action color (buttons, active tab, links, toggle fill) | designer-judgment: TreeHouse forest green; nature/safety connotation, differentiates from iOS system blue |
| `brand-primary-soft` | `#E8F5EF` | Tinted chip backgrounds, soft badge fills, category header tints | designer-judgment |
| `indicator-off` | `#8E8E93` | "Off" setting selection pill | iOS system gray |
| `indicator-balanced` | `#FF9500` | "Balanced" setting selection pill | iOS system orange / semantic amber |
| `indicator-strict` | `#FF3B30` | "Strict" setting selection pill | iOS system red / semantic danger |
| `success` | `#34C759` | Positive confirmations | iOS system green |
| `destructive` | `#FF3B30` | Errors, destructive actions | iOS system red |
| `overlay` | `rgba(0,0,0,0.4)` | Modal backdrop, sheet scrim | iOS convention |

### Typography (SF Pro — iOS system font, no loading required)

| Role | Family | Size | Line Height | Weight | Usage |
|---|---|---|---|---|---|
| Large Title | SF Pro Display | 34px | 41px | Bold (700) | Screen title on scroll-collapsed nav |
| Title 1 | SF Pro Display | 28px | 34px | Bold (700) | Section headers, welcome headings |
| Title 2 | SF Pro Display | 22px | 28px | Bold (700) | Card titles, modal headings |
| Title 3 | SF Pro Text | 20px | 25px | Semibold (600) | Subsection headers |
| Headline | SF Pro Text | 17px | 22px | Semibold (600) | Cell primary labels, button text |
| Body | SF Pro Text | 17px | 22px | Regular (400) | Body copy, description text |
| Callout | SF Pro Text | 16px | 21px | Regular (400) | Supplementary body, chat message text |
| Subhead | SF Pro Text | 15px | 20px | Regular (400) | Supporting labels, metadata |
| Footnote | SF Pro Text | 13px | 18px | Regular (400) | Fine print, timestamps, captions |
| Caption 1 | SF Pro Text | 12px | 16px | Regular (400) | Badges, tertiary labels |
| Caption 2 | SF Pro Text | 11px | 13px | Regular (400) | Smallest labels only |

### Spacing (8pt grid)

| Token | Value | Primary usage |
|---|---|---|
| `space-1` | 4px | Icon-to-label gap, tight internal padding |
| `space-2` | 8px | Cell internal vertical padding, badge padding |
| `space-3` | 12px | Card inner padding tight, chip padding |
| `space-4` | 16px | Standard horizontal page margin, cell padding |
| `space-5` | 20px | Section header margin-bottom |
| `space-6` | 24px | Card inner padding, group spacing |
| `space-8` | 32px | Large section gaps |
| `space-10` | 40px | Screen top padding below nav |
| `space-12` | 48px | Between major page sections |
| `space-16` | 64px | Bottom safe area padding |

### Corner Radius

| Context | Value | Usage |
|---|---|---|
| Small | 8px | Chips, badges, small buttons |
| Medium | 12px | Settings cells (inset grouped), alert cards |
| Large | 16px | Chat bubbles, main content cards |
| Sheet | 20px | Bottom sheets, modal tops |
| Full | 999px | Pills (setting selectors), toggle tracks, avatar circles |

### Shadows

| Level | Value | Usage |
|---|---|---|
| Card | `0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)` | Alert cards, elevated cells |
| Sheet | `0 -2px 16px rgba(0,0,0,0.10)` | Bottom sheet lift |
| Modal | `0 8px 32px rgba(0,0,0,0.16)` | Modal overlay shadow |

### Icons
- Library: SF Symbols (iOS system icons — matches SF Pro, free, no loading)
- Size: 22px standard, 18px compact (footnote contexts), 28px featured
- Weight: matches surrounding text weight

**Component Variant Record:**

| Component | Variant Properties | Confirmed States | Unconfirmed States |
|---|---|---|---|
| Setting Selector (Off/Balanced/Strict) | Selection: off \| balanced \| strict | All three active states confirmed from PRD | None |
| Bottom Tab Bar | Tab: dashboard \| alerts \| settings (parent); chat \| history \| profile (child) | Active, inactive | Badge/notification state |
| Alert Card | Severity: balanced \| strict; Read: unread \| read | Unread (bold), read (normal weight) | Swiped/dismissed state |
| Chat Message Bubble | Sender: user \| ai; State: sent \| loading \| error | Sent, loading (typing indicator) | Error retry state |
| Conversation History Row | State: active \| past | Active session, past session | Empty state (no history) |
| Safety Redirect Banner | Category: any content category | Visible / blocked state | None — single state |

**Active State Visual Record:**

| Component | Active / Selected Treatment | Source |
|---|---|---|
| Bottom tab bar item | Icon + label: `brand-primary` (#1A6B4A); inactive: `label-tertiary` (#AEAEB2) | iOS convention + brand-primary |
| Setting selector — Off | Pill: `indicator-off` (#8E8E93) background, white label; unselected: `background-grouped` bg, `label-secondary` text | designer-judgment |
| Setting selector — Balanced | Pill: `indicator-balanced` (#FF9500) background, white label | designer-judgment |
| Setting selector — Strict | Pill: `indicator-strict` (#FF3B30) background, white label | designer-judgment |
| Settings cell (pressed) | Background: `background-grouped` (#F2F2F7); 0.5px separator visible | iOS convention |
| Alert card (unread) | Left border 3px `indicator-strict` or `indicator-balanced`; title `label-primary`, Headline weight | designer-judgment |
| Alert card (read) | No left border; title `label-secondary`, Body weight | designer-judgment |
| Child chat bubble (user) | Background: `brand-primary` (#1A6B4A); text: #FFFFFF; trailing alignment | designer-judgment |
| Child chat bubble (AI) | Background: `background-grouped` (#F2F2F7); text: `label-primary`; leading alignment | iOS/iMessage convention |
| Primary button | Background: `brand-primary` (#1A6B4A); text: #FFFFFF; radius: 999px (pill); height: 52px | designer-judgment |
| Primary button (pressed) | Background: `#155A3D` (10% darker); no scale change (animation: off) | designer-judgment |
| Destructive / tertiary button | Background: transparent; text: `brand-primary`; no border | iOS convention |

---

## 9. Brand Identity

Starting fresh — no existing logo, wordmark, or brand assets.

**Brand direction (to be designed):**
- Product name: **SafeChat** (app name) / **TreeHouse** (company/brand)
- Brand metaphor: A treehouse — protected, elevated, a child's private space that a trusted adult has helped build
- Brand accent: Forest green (`#1A6B4A`) — nature, safety, growth; distinct from iOS system blue
- Voice: Plain-spoken, reassuring, never alarmist. Speaks to parents like a trusted pediatrician: calm, specific, honest. Speaks to children like a smart friend: direct, warm, never condescending.

---

## 10. Visual Design Language

**Surface and tone:**
- Predominantly white surfaces (`#FFFFFF`) with `#F2F2F7` as the secondary grouped background
- No gradients, no illustration, no photography — content and whitespace carry the hierarchy
- Single brand color (`#1A6B4A`) appears only on: primary CTAs, active navigation states, completion confirmations
- Severity indicators (amber, red) appear only in alert/setting contexts — never decoratively

**Color system:**
- 95% achromatic (white, light gray, black, dark gray)
- 5% color: brand-primary on actions + three semantic states (off/balanced/strict) in configuration UI

**Typography:**
- SF Pro only — system font, no loading overhead
- Hierarchy via weight contrast (Bold titles → Regular body) not size extremes
- Body copy at 17px/22px throughout — readable for parents in varied lighting

**Components:**
- Grouped inset table cells for all settings screens (iOS HIG: inset grouped list style)
- Pill-style setting selectors for Off / Balanced / Strict — three buttons in a row, one selected at a time
- Cards (12px radius, subtle shadow) for alert feed items
- Full-width pill buttons (52px height, 999px radius) for primary CTAs
- Bottom sheet (20px top radius) for conversation history drawer

**Motion:**
- None confirmed. All state changes are instant. No enter/exit animations, no spring physics, no skeleton loaders. Static fidelity only.

---

## 11. Copy Guide

**Tone descriptors:**

| Adjective | Writing rule | Confirmed by |
|---|---|---|
| Plain-spoken | No jargon. If a term needs a definition, replace it with plain language. | PRD intro copy |
| Reassuring | Lead with what the parent controls; never lead with the risk | PRD: "You're in control" framing |
| Specific | Concrete examples in every category description (e.g., "Your child asks how to...") | PRD: all category descriptions |
| Non-alarming (child-facing) | Safety redirects are warm and neutral, never punitive or scary | PRD: "offer support resources" language |

**Locked strings (verbatim from PRD):**

- Onboarding headline: *"Your Setup Guide — Choose how AI works for your family."*
- Onboarding subhead: *"This takes about 5 minutes."*
- Onboarding intro: *"SafeChat puts you in control of your child's AI experience."*
- Settings overview intro: *"You don't need to be an AI expert. We'll explain each category in plain language, with real examples of what your child might encounter."*
- Tier label — Off: *"Off"*
- Tier label — Balanced: *"Balanced"*
- Tier label — Strict: *"Strict"*
- Completion screen headline: *"You're all set!"*
- Completion confirmation: *"Your choices take effect immediately. Every chat your child has through SafeChat will follow these settings."*
- Data option A: *"Yes, help improve SafeChat"*
- Data option B: *"No, don't keep anything"*
- Footer tip label: *"Quick tip:"*
- Footer callout: *"There's always a tradeoff. 'Balanced' catches most problems with fewer false alarms. 'Strict' catches almost everything but will sometimes flag stuff that's perfectly fine."*

**Terminology rules:**

| Term | Rule |
|---|---|
| "Balanced" | Always capitalized when used as a setting label |
| "Strict" | Always capitalized when used as a setting label |
| "Off" | Always capitalized when used as a setting label |
| Child | Use "your child" in parent-facing copy; never "the user" or "the minor" |
| Alert | Use "alert" for parent notifications; not "warning," "flag," or "notification" |
| AI | Capitalize as "AI" throughout |

---

## 12. User Flows

### Flow 1 — Parent Onboarding (priority)

1. **Welcome screen** — App launch for new parent. Headline, brief value prop, "Get started" CTA + "Sign in" link
2. **Account creation** — Email + password (or Sign in with Apple). Single screen.
3. **Child account creation** — Enter child's name, age. Generate PIN/family code. Display code to share with child.
4. **Settings overview** — Introduction screen explaining the three tiers (Off / Balanced / Strict). "Let's set up [child's name]'s experience" + "Start" CTA.
5. **Category configuration — Section 1: Content** — Each of the 12 content categories presented with emoji, headline, description, and Off/Balanced/Strict selector. Paged or scrolled within the section.
6. **Category configuration — Section 2: Behavioral Monitoring** — 4 categories, same format.
7. **Category configuration — Section 3: AI Personality** — 2 settings, each with 3 radio options.
8. **Category configuration — Section 4: Schoolwork** — 2 categories.
9. **Category configuration — Section 5: Data & Privacy** — 1 setting, 2 options.
10. **Completion screen** — "You're all set!" confirmation, summary of key choices, link to dashboard.

### Flow 2 — Child Login + Chatbot

1. **Child welcome screen** — App launch for child. Friendly, simple. "Enter your family code" CTA.
2. **Code/PIN entry** — Numeric entry pad or text field. Enter the parent-provided code.
3. **Child welcome confirmation** — Brief, age-appropriate intro: "Hi [name]! I'm your AI assistant." — then immediately into chat.
4. **Chat screen** — Empty state with suggested conversation starters. Text input bar. AI responds in bubbles.
5. **Conversation history** — Accessible via bottom sheet / side drawer. List of past sessions with date and topic preview.
6. **Safety redirect (in-chat)** — When a category triggers, AI response is replaced with a redirect card: warm message + category-appropriate support link. No technical language.

### Flow 3 — Parent Dashboard (returning)

1. **Dashboard — Alert tab** (default) — Chronological list of flagged interactions. Each card: category emoji, category name, severity (Balanced or Strict), date/time, first line of the message context. Tap to expand full context.
2. **Dashboard — Usage tab** — Week/month view: total sessions, average session length, most-discussed topics (categorized). Simple data visualization.
3. **Settings access** — Tab bar or inline link returns to the configuration flow for any category edit.

---

## 13. Page Design & Layout

### Parent Onboarding — Settings Configuration

- **Layout:** Full-screen, single-column, scrollable within each category section
- **Navigation:** iOS large title at top, back chevron; progress indicator (step X of 5) shown below nav bar
- **Hierarchy:** Category emoji (28px SF Symbol or emoji) + Title 2 headline → Body description → example in italic Callout → Off/Balanced/Strict pill selector
- **Grouped style:** Each category is an inset grouped card (12px radius, `background-elevated`, 1px `separator` between items in multi-item sections)
- **CTA:** Full-width "Continue" pill button pinned to bottom, 16px horizontal margin, 16px above safe area

### Parent Dashboard — Alert Feed

- **Layout:** Full-screen, vertically scrolled list of alert cards
- **Card anatomy:** 3px left border (severity color) + category emoji (22px) + category name (Headline) + timestamp (Footnote, `label-tertiary`) + message snippet (Subhead, 2 lines max) + disclosure chevron
- **Empty state:** Centered illustration (single SF Symbol, 64px) + "No alerts yet" (Title 3) + "When something is flagged, you'll see it here." (Body, `label-secondary`)
- **Tab bar:** [Dashboard icon] Dashboard / [Bell icon] Alerts / [Gear icon] Settings

### Child Chatbot

- **Layout:** Full-screen chat thread. Messages fill from bottom up. Keyboard pushes content up.
- **Input bar:** Pinned to keyboard top. Text field (16px radius) + send button (brand-primary, SF Symbol arrow.up)
- **User bubbles:** `brand-primary` background, white Callout text, trailing (right) alignment, 16px radius, max-width 75% of screen
- **AI bubbles:** `background-grouped` background, `label-primary` Callout text, leading (left) alignment, 16px radius, max-width 75%
- **AI name/identity:** Small "SafeChat" label + tree emoji above each AI bubble group
- **Typing indicator:** Three dots in an AI bubble (static, no animation)
- **Empty state:** Centered, 3 suggested prompt chips (pill buttons, `brand-primary-soft` background, `brand-primary` text, 8px radius)
- **History drawer:** Bottom sheet (20px top radius, full-screen height minus top 60px). Drag handle at top. List of past conversations: date + topic summary.
- **Tab bar:** [Chat bubble icon] Chat / [Clock icon] History / [Person icon] Profile

### Child Onboarding

- **Layout:** Full-screen, centered content, large type
- **Visual weight:** More spacious than parent screens — less density, larger touch targets, friendlier tone
- **CTA:** Same full-width pill button as parent flow

---

## 14. Interaction & States

| Component | States | Behavior |
|---|---|---|
| Setting selector (Off/Balanced/Strict) | Off, Balanced, Strict selected | Tap fills selected pill with severity color; deselects previous. Instant state change (no animation). |
| Alert card | Unread, Read | Unread: bold title, left border visible. Read: normal weight, no border. Tap to expand. |
| Chat input bar | Empty, has-text, sending | Empty: placeholder "Message SafeChat…". Has-text: send button activates (brand-primary). Sending: input disabled, send button replaced with static dots. |
| Bottom sheet (history) | Closed, open | Swipe up from handle or tap History tab to open. Instant appearance (no spring). |
| Primary button | Default, pressed | Pressed: background darkens to #155A3D. No scale change. No animation. |
| Safety redirect | Triggered | AI bubble replaced with redirect card: `brand-primary-soft` background, safety message text, optional support link. |

**Active state visual treatments (detailed):**

| Component | Active treatment | Source |
|---|---|---|
| Tab bar — active item | Icon + label: `brand-primary` (#1A6B4A), weight: medium | iOS convention + brand |
| Tab bar — inactive item | Icon + label: `label-tertiary` (#AEAEB2), weight: regular | iOS convention |
| Setting pill — Off (selected) | Background: `#8E8E93`, text: `#FFFFFF`, weight: Semibold | designer-judgment |
| Setting pill — Balanced (selected) | Background: `#FF9500`, text: `#FFFFFF`, weight: Semibold | designer-judgment |
| Setting pill — Strict (selected) | Background: `#FF3B30`, text: `#FFFFFF`, weight: Semibold | designer-judgment |
| Setting pill — unselected | Background: `background-grouped` (#F2F2F7), text: `label-secondary` (#6D6D72), weight: Regular | designer-judgment |
| Alert card — unread | Left border 3px severity color; title `label-primary` Headline weight | designer-judgment |
| Alert card — read | No border; title `label-secondary` Body weight | designer-judgment |
| Chat bubble — user | Background: `#1A6B4A`; text: `#FFFFFF`; trailing edge | brand-primary |
| Chat bubble — AI | Background: `#F2F2F7`; text: `#000000`; leading edge | iOS convention |
| Primary CTA button | Background: `#1A6B4A`; text: `#FFFFFF`; pressed: `#155A3D` | brand-primary |
| Completion screen checkmark | `success` (#34C759), 48px SF Symbol checkmark.circle.fill | iOS convention |

---

## 15. Delivery & Handoff

| Field | Value | Source |
|---|---|---|
| **Output format** | HTML prototype | implied by project template |
| **Device targets** | Mobile (iOS, 390px viewport primary) | Q-S1 confirmed |
| **Mode** | Light mode only | Q-F2 confirmed |
| **Animation** | None | Q-F2 confirmed |
| **Accessibility** | WCAG AA baseline; Dynamic Type support; 44pt minimum tap targets | iOS HIG + WCAG default |
| **Font loading** | SF Pro — no loading required (iOS system font) | Q-V2 + iOS constraint |

---

## Designer Notes

*For the Designer Agent — not shown to client.*

**Pipeline rationale:**
- No Figma or URL provided → Design-MD inspiration matching triggered. Selected Apple (clean trustworthy, mobile-first, parental control precedent) and Claude (AI chat interface reference). Both fetches returned landing-page-level signals only; full token extraction requires CLI install. Tokens in this brief are sourced from iOS HIG conventions (confirmed via Apple design-md direction) + designer judgment for brand-specific values.
- Brand accent color `#1A6B4A` (forest green) is designer judgment. Rationale: TreeHouse brand metaphor → nature/safety/growth; differentiates from iOS system blue without departing from the trustworthy register. Apply consistently across all active states and primary CTAs.

**Counter-hypothesis log:**
- Client stated: Build a mobile app with parent + child views
- Alternative reading: The parent safety configuration is the product; the chatbot is a thin wrapper
- Evidence: PRD is ~90% parent configuration content; child view described in one sentence
- Resolution: Client confirmed both views are equal priority (Q-S3: option 2) — brief treats both as full deliverables

**Question Status Tracker:**

| Q-ID | Priority | Question | Status | Client Answer |
|---|---|---|---|---|
| Q-S1 | P0 | Platform + navigation | confirmed | iOS-first, bottom tab bar |
| Q-S2 | P0 | Scope: which screens | confirmed | All four surfaces |
| Q-S3 | P0 | Priority user | confirmed | Both equally |
| Q-G1 | P1 | Dashboard content | confirmed | Hybrid (alerts + usage stats) |
| Q-G2 | P1 | Child account setup | confirmed | Minimal (name + age, PIN login) |
| Q-V1 | P1 | Brand identity | confirmed | Starting fresh |
| Q-V2 | P1 | Aesthetic direction | confirmed | Clean & trustworthy (iOS-native) |
| Q-F1 | P1 | Chatbot features | confirmed | History-enabled (drawer) |
| Q-F2 | P2 | Dark mode + animation | confirmed | Light mode only, no animation |

**Design-MD inspirations:**
- Selected: apple, claude
- Rationale: Apple for parent config surfaces (clean, trustworthy, iOS-native parental control precedent); Claude for child chatbot (AI chat interface, warm editorial register)
- Fetch status: apple: limited (landing page only) | claude: limited (landing page only)
- Tokens: All sourced from iOS HIG conventions + designer judgment. Marked accordingly throughout.

**Client-deferred items:**
- None — all questions answered in one response.

**Tensions to watch:**
1. The setting configuration flow contains 21 individual settings across 5 categories. Even at 30 seconds per setting, that's ~10 minutes — above the "5 minutes" target. Designer should consider progressive disclosure: show only high-priority categories first, offer "advanced" toggle for the full set.
2. The child chatbot empty state needs enough warmth to drive first message without over-engineering for a first pass. Three suggestion chips is the minimum — can be enriched later.
3. Safety redirect UX for children is emotionally sensitive. The copy and visual treatment must not be punitive, scary, or confusing. This is a high-stakes design moment that deserves its own iteration.

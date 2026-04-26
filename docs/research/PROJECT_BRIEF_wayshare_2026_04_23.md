# WHALES PROJECT BRIEF — WAYSHARE

| Field                   | Value                                          |
| ----------------------- | ---------------------------------------------- |
| **Client**              | Wayshare (Founder)                             |
| **Date**                | 2026-04-23                                     |
| **Engagement ID**       | wayshare_marketplace_2026_04_23                |
| **Confirmation status** | All values client-confirmed or PRD-extracted   |

---

## 1. Product Vision

Wayshare is a two-sided travel marketplace where everyday travelers turn their real trips into bookable itineraries and earn commission when others book through them. AI ingests messy trip artifacts (camera roll, Google Maps timeline, booking confirmations) and reconstructs them into structured day-by-day itineraries in under 20 minutes. Travelers browse and execute proven real-world trip plans with every hotel, tour, and restaurant bookable in one tap.

**One-line pitch:** The marketplace where your last trip becomes someone else's next trip.

Success is measured by Gross Booking Value (GBV) per monthly active traveler. Year 1 targets: 2,000 published itineraries, 50,000 MAU, $2M GBV cumulative, avg traveler rating ≥ 4.3/5.

---

## 2. Problem Statements

**Demand side:** A typical international trip requires 15–40 hours of research across blogs, Reddit, Instagram, and TripAdvisor. The output is a scattered Google Doc that falls apart on day two. Generic "Top 10" content is optimized for search engines, not real travelers.

**Supply side:** Billions of travelers finish trips with hard-won knowledge that is currently locked in camera rolls and group chats. Existing creator tools (Thatch, Troupe, Rexby) demand hours of manual itinerary building, limiting supply to professional content creators.

**The gap:** No low-friction way for everyday travelers to turn trip experience into shareable, bookable itineraries — and no trusted marketplace for travelers to discover and execute real trips taken by real people.

**Framing note:** This is a real product build going to production. Client confirmed. Design should prioritize production fidelity, component correctness, and real user task completion over pitch aesthetics.

---

## 3. Target Users

**Contributors — "The Traveler Who Just Got Back"**
Age 25–45, travels 2–4x/year, camera roll full of geotagged photos, has already recommended the same places to five friends. Motivated by recognition, passive commission, and helping others. Will NOT spend 6+ hours manually building an itinerary. Needs the AI to do the heavy lifting — contribution must feel effortless.

**Travelers — "The Overwhelmed Planner"**
Age 22–45, planning a trip 1–6 months out, hit research fatigue. Distrusts generic content, over-values recommendations from people "like them." Has saved 30+ Instagram posts about their destination but has no idea how to sequence them. Will pay for execution (bookings) but not for information (itineraries are free to browse). Needs authentic, proven plans they can execute in one tap.

**Primary design focus:** Traveler-facing surfaces (marketplace browse, itinerary detail, booking flow). Contributor surfaces (upload flow, dashboard) are secondary for this sprint.

---

## 4. Success Metrics

**Goal Thread:**

| Field                 | Value                                                                 |
| --------------------- | --------------------------------------------------------------------- |
| **Primary metric**    | GBV per monthly active traveler — drives whether marketplace is converting |
| **Secondary metrics** | Itinerary view-to-booking conversion rate; repeat booking rate within 12 months |
| **Proxy signals**     | Time-on-itinerary-detail page; CTA click-through from browse to detail; scroll depth on browse page |

---

## 5. Key Features & Scope

**In Scope (this sprint — design first, build after):**

| Screen / Feature              | Description                                                                 |
| ----------------------------- | --------------------------------------------------------------------------- |
| Marketplace browse page       | Grid of itinerary cards with filters (destination, duration, style, budget) |
| Itinerary detail page         | Day-by-day view, contributor profile, booking integration, date personalization |
| Booking review screen         | Bundled items checklist, opt-in/out per item, total cost, confirm CTA      |
| Contributor upload flow       | Multi-step: upload artifacts → AI processes → review draft → publish       |
| Contributor dashboard         | Earnings, per-itinerary stats, payout management                           |
| Global nav + auth             | Header, search, login/signup, contributor vs. traveler mode switching      |

**Out of Scope (this sprint):**

| Item                         | Reason                                          |
| ---------------------------- | ----------------------------------------------- |
| Admin/moderation panel       | Internal tool, separate build                   |
| Mobile native app            | Web-first; native follows after web validated   |
| Real booking API integration | Design only — booking flow is mocked            |
| Social/follows system        | v2 feature per PRD                              |
| Friends layer                | v2 feature per PRD                              |

---

## 6. Constraints

- **Framework:** Next.js 16 (App Router), React 19, TypeScript strict — greenfield scaffold
- **UI primitives:** shadcn/ui + Tailwind CSS v4 + Radix
- **Platform:** Responsive web, desktop-first (1440px design target, scales to 390px mobile)
- **Mode:** Light mode only — no dark mode variant
- **Accessibility:** WCAG AA minimum — color contrast, semantic headings, keyboard navigation
- **Build:** Must pass `npm run check` (lint + typecheck + build) before sign-off
- **Timeline:** Pre-MVP — design sprint produces 3 interactive HTML prototypes for client selection

---

## 7. References & Aesthetic Direction

| Reference                        | Draw from                                                                 |
| -------------------------------- | ------------------------------------------------------------------------- |
| Airbnb (general)                 | Discovery grid pattern, card layout, search/filter bar at top             |
| Viator iOS (Anchor A)            | Numbered timeline list, journey stop structure, minimal white canvas      |
| Qantas Airways Trips (Anchor B)  | Date-grouped cards, warm off-white backgrounds, white card surfaces       |
| Komoot Route Builder (Anchor C)  | Structured numbered entries, earthy sage/olive palette, pill CTAs         |

**Aesthetic keywords translated:**

| Keyword      | Pixel decision                                                                  | Confirmed by     |
| ------------ | ------------------------------------------------------------------------------- | ---------------- |
| Soft         | 16–24px card radius, diffuse multi-layer shadows, warm whites — no hard edges  | Client — Q3      |
| Organic      | Warm natural palette (sage, sand, terracotta), imagery-forward, curved layouts | Client — Q3      |
| Modern       | Contemporary humanist sans-serif, generous whitespace, clean type hierarchy    | Client — Q3      |
| Geometric    | Grid-disciplined layout, subtle geometric repeat patterns in bg, precise alignment | Client — Q3   |

---

## 8. Design System

**Design Token Record (from anchors — all screenshot-estimated, to be refined by Designer Agent):**

| Category   | Token              | Value               | Source               | Confirmed |
| ---------- | ------------------ | ------------------- | -------------------- | --------- |
| Color      | bg-page-A          | #FFFFFF             | Anchor A screenshot  | yes — visual |
| Color      | bg-surface-A       | #FFFFFF             | Anchor A screenshot  | yes — visual |
| Color      | accent-A           | #1A1A1A (black)     | Anchor A screenshot  | yes — visual |
| Color      | bg-page-B          | #F5F5F7             | Anchor B screenshot  | yes — visual |
| Color      | bg-surface-B       | #FFFFFF             | Anchor B screenshot  | yes — visual |
| Color      | accent-B           | Adapted warm green (from red) | Anchor B adapted | yes — adapted |
| Color      | bg-page-C          | #F8F6F0 (warm cream) | Anchor C adapted   | yes — visual |
| Color      | accent-C           | #4A7C2F (sage green) | Anchor C adapted   | yes — adapted |
| Color      | text-heading       | #1A1A1A             | All anchors          | yes — visual |
| Color      | text-body          | #333333             | All anchors          | yes — visual |
| Color      | text-muted         | #888888             | All anchors          | yes — visual |
| Color      | border-divider     | #E5E5EA             | Anchor B             | yes — visual |
| Typography | heading-display    | Distinct per direction — Designer Agent selects | — | pending |
| Typography | body               | Humanist sans-serif (DM Sans, Sora, or equivalent) | Client Q3 | yes — keyword |
| Spacing    | card-padding       | medium ~16–20px     | Anchors              | yes — visual |
| Shape      | card-radius        | 12–16px (B, C) / none (A) | Anchor B, C  | yes — visual |
| Shadow     | card-shadow        | subtle diffuse per direction | Client Q3   | yes — keyword |

**Component Variant Record:**

| Component              | Source        | Variants                        | Confirmed States           |
| ---------------------- | ------------- | ------------------------------- | -------------------------- |
| Itinerary card         | Anchor B      | Default, hover, booked          | Default visible            |
| Journey stop row       | Anchor A      | Default, active, completed      | Default visible            |
| Day group header       | Anchor B, C   | Collapsed, expanded             | Default (expanded) visible |
| Pill CTA button        | Anchor C      | Primary filled, secondary outlined | Default visible          |
| Tab bar                | Anchor B      | Active (underline), inactive    | Both visible               |
| Booking item row       | Anchor B, C   | Checked, unchecked, unavailable | Default visible            |

**Active State Visual Record:**

| Component    | Active Treatment                                   | Source     |
| ------------ | -------------------------------------------------- | ---------- |
| Tab          | Accent color underline, label in accent color      | Anchor B   |
| Journey stop | Numbered circle in accent color                    | Anchor A   |
| Booking item | Filled checkbox in accent color                    | Anchor B/C |

---

## 9. Brand Identity

- **Product name:** Wayshare (locked)
- **Tagline (from PRD):** "The marketplace where your last trip becomes someone else's next trip"
- **Contributor CTA:** "Upload your trip photos and we'll turn them into an itinerary that pays you when others book it."
- **Traveler CTA:** "Real trips from real people — with every hotel, tour, and restaurant bookable in one tap."
- **Logo/wordmark:** Not yet designed — Designer Agent to propose
- **Color:** No locked brand color — Designer Agent defines per direction
- **Voice:** Authentic, warm, conversational. Never corporate, never generic travel blog.

---

## 10. Visual Design Language

**Three directions to explore (each rooted in its anchor):**

**Direction A — "Journey Minimalism"** (Anchor: Viator iOS Itinerary)
Ultra-clean white canvas where the timeline IS the design. Numbered black circles connected by a thin vertical line form the visual backbone of the itinerary. No card borders, no shadows, no color. Pure typographic hierarchy. The product's authenticity comes from generous whitespace and the raw clarity of the itinerary structure. Signature: the numbered journey timeline left-rail on every itinerary page.
Anti-pattern: No colored backgrounds, no gradient cards, no decorative elements.

**Direction B — "Structured Warmth"** (Anchor: Qantas Airways Trips)
Warm off-white background (#F5F5F7) with white card surfaces creating depth through background contrast alone. Date-grouped cards with destination thumbnail photos right-aligned. Tabs for content switching. Accent color adapted from Qantas red to a Wayshare-appropriate warm tone (deep terracotta, warm amber, or similar — Designer to select). Feels trustworthy and organized — like a well-kept travel diary.
Anti-pattern: No full-bleed image backgrounds, no dark surfaces, no heavy visual decoration.

**Direction C — "Earthy Structure"** (Anchor: Komoot Route Builder)
Warm cream (#F8F6F0) background with sage-green (#4A7C2F) section header bars creating strong visual groupings. Dense structured lists of itinerary stops. Geometric grid discipline. The olive/forest palette adapted to light mode. Pill-shaped CTA buttons. Feels grounded, nature-adjacent, deliberate — the aesthetic of a serious traveler's tool.
Anti-pattern: No pure white backgrounds, no airy minimalism, no corporate blues.

**Shared principles across all directions:**
- Light mode only
- Responsive web (desktop-first 1440px)
- Imagery-forward: real trip photos are the content
- Trust signals prominent: ratings, verified badges, trip recency
- Two-sided surface distinction: contributor mode vs. traveler mode must feel different

---

## 11. Copy Guide

**Tone descriptors:**

| Adjective   | Writing rule                                                       | Confirmed by    |
| ----------- | ------------------------------------------------------------------ | --------------- |
| Authentic   | Write like a friend's recommendation, not a marketing brochure    | PRD — extracted |
| Conversational | Use "you/your trip" not "the user/traveler"                    | PRD — extracted |
| Specific    | Name real places, real durations, real costs — no vague claims    | PRD — extracted |

**Locked strings:**
- Product name: Wayshare
- Email capture: `trips@wayshare.com`
- Contributor CTA: "Turn my trip into an itinerary"
- Traveler search placeholder: "Where did they go?"
- Trust badge: "Verified recent trip"
- Commission line: "Earn commission when others book"

**Terminology rules:**
- "Itinerary" not "trip plan" or "guide"
- "Contributor" not "creator" or "host"
- "Traveler" not "user" or "customer"
- "Booking" not "purchase" (for bookable experiences)
- "Commission" not "earnings split"

---

## 12. User Tasks

In priority order for this sprint:

1. **Traveler: Discover and evaluate a real itinerary.** A traveler must be able to land on the marketplace, find an itinerary matching their destination and duration, and determine within 60 seconds whether it was taken by someone trustworthy and whether it fits their style — without clicking into the detail page.

2. **Traveler: Book an entire itinerary in one session.** After entering travel dates, a traveler must be able to see real availability for all bookable items, opt out of anything unwanted, and confirm the full bundle in a single checkout screen.

3. **Contributor: Publish a first itinerary.** A contributor must be able to upload trip artifacts, review the AI-generated draft, make edits, and hit publish — with median time under 20 minutes and without requiring writing skills.

---

## 13. Current Page State

This is a greenfield build. No existing pages, routes, or components to document. The Next.js 16 + shadcn/ui + Tailwind v4 scaffold is the starting state — it has no visual identity, no routes, and no content.

**Route map to design (ordered by priority):**
- `src/app/page.tsx` — Marketplace browse (homepage, traveler-facing)
- `src/app/itinerary/[id]/page.tsx` — Itinerary detail page
- `src/app/book/[id]/page.tsx` — Booking review screen
- `src/app/contribute/page.tsx` — Contributor upload flow (start)
- `src/app/dashboard/page.tsx` — Contributor dashboard

**Design sprint focus:** Marketplace browse page (`/`) and itinerary detail page (`/itinerary/[id]`). These are the two surfaces that define the product's visual identity and drive the traveler conversion path.

---

## 14. Existing Interaction States

No existing pages — all states are Designer Agent decisions. Required states per surface:

| Component             | Required States                              |
| --------------------- | -------------------------------------------- |
| Itinerary card        | Default, hover (elevation change), saved/bookmarked |
| Filter chip           | Active, inactive, hover                      |
| Search bar            | Default, focused, populated                  |
| Tab                   | Active (underline + color), inactive         |
| Booking item row      | Checked, unchecked, unavailable              |
| CTA button (primary)  | Default, hover, loading, disabled            |
| Day section header    | Expanded, collapsed                          |
| Journey stop          | Default, active (current), completed         |

---

## 15. Delivery & Handoff

| Field              | Value                                     | Source             |
| ------------------ | ----------------------------------------- | ------------------ |
| **Output format**  | Three interactive HTML prototypes → client selects one → port to Next.js | Client confirmed |
| **Device targets** | Desktop (1440px) primary; mobile (390px) responsive | Client Q2 |
| **Accessibility**  | WCAG AA minimum                           | Default            |
| **Build target**   | Next.js 16 + shadcn/ui + Tailwind v4     | Repo scaffold      |
| **Check gate**     | `npm run check` must pass before sign-off | AGENTS.md          |

---

## Design Research Anchors

```
CLIENT IMAGE SELECTION
  Anchor A: pattern-travel-mobbin-1.png — Viator iOS numbered stop list on pure white canvas → drives Direction A
  Anchor B: pattern-travel-mobbin-2.png — Qantas Trips date-grouped rows with destination thumbnails → drives Direction B
  Anchor C: pattern-travel-mobbin-3.png — Komoot olive-green numbered waypoint list with pill CTAs → drives Direction C
  Status: CLIENT CONFIRMED — 2026-04-23
  All other screenshots: secondary reference only
```

**Synthesis Table — Direction A** (Anchor A: Viator iOS Itinerary)

| Row | Decision            | Value                                                            | Source         |
| --- | ------------------- | ---------------------------------------------------------------- | -------------- |
| 1   | Palette             | #FFFFFF bg · #FFFFFF surface · #1A1A1A accent · #1A1A1A text   | Anchor A       |
| 2   | Type pairing        | Display: Playfair Display 600 · Body: DM Sans 400 · numbered labels in DM Sans 700 | Any anchors |
| 3   | Layout pattern      | Single-column centered, max-width 760px content, large left gutter for timeline numbers | Any |
| 4   | Surface treatment   | Card radius: none · Shadow: none · Border: 1px #E5E5E5 hairline · Completely flat | Anchor A |
| 5   | Signature moment    | Black filled numbered circles (●1 ●2) connected by thin 1px vertical line — journey timeline left-rail | Anchor A full screenshot |
| 6   | Anti-pattern        | No colored section backgrounds, no gradient cards, no imagery-heavy hero, no decorative patterns | All screenshots |

**Synthesis Table — Direction B** (Anchor B: Qantas Airways Trips)

| Row | Decision            | Value                                                            | Source         |
| --- | ------------------- | ---------------------------------------------------------------- | -------------- |
| 1   | Palette             | #F5F5F7 bg · #FFFFFF surface · #D4622A accent (warm terracotta) · #1A1A1A text | Anchor B adapted |
| 2   | Type pairing        | Display: Sora 700 · Body: Inter 400–500 · date labels 11px uppercase #8E8E93 | Any anchors |
| 3   | Layout pattern      | Card grid (3-col desktop), date/destination section headers, left-content right-thumbnail cards | Any |
| 4   | Surface treatment   | Card radius: 12px · Shadow: 0 2px 8px rgba(0,0,0,0.06) · No border · Layered depth (gray bg + white cards) | Anchor B |
| 5   | Signature moment    | Date-location section labels ("Apr 12 — Tokyo") as small muted headers grouping itinerary cards below | Anchor B section headers |
| 6   | Anti-pattern        | No full-bleed image backgrounds behind UI, no dark surfaces, no heavy decorative borders | All screenshots |

**Synthesis Table — Direction C** (Anchor C: Komoot Route Builder)

| Row | Decision            | Value                                                            | Source         |
| --- | ------------------- | ---------------------------------------------------------------- | -------------- |
| 1   | Palette             | #F8F6F0 bg (warm cream) · #FFFFFF surface · #4A7C2F accent (sage green) · #1A1A1A text | Anchor C adapted |
| 2   | Type pairing        | Display: Cabinet Grotesk 700 · Body: Nunito Sans 400 · numbered labels Cabinet Grotesk 600 | Any anchors |
| 3   | Layout pattern      | Dense list-first layout, sidebar filter panel, sage-green section bars as day dividers | Any |
| 4   | Surface treatment   | Card radius: 8px · Shadow: none · Border: 1px #E0DDD5 · Cream bg + white cards + sage section bars | Anchor C |
| 5   | Signature moment    | Sage-green full-width section bars with white text acting as day/group headers inside itinerary | Anchor C dark panel rows — adapted light |
| 6   | Anti-pattern        | No pure white backgrounds, no airy minimalism, no generic blue/purple palette | All screenshots |

---

## Designer Notes

*For the Designer Agent — not shown to client.*

**Pipeline context:** This is Phase 2 of the v3 clone-and-edit skill pipeline. Phase 1 (Intake) is complete. Proceed directly to building user journeys and three mockups. No further discovery questions needed.

**Critical design constraints:**
1. Light mode only — no dark surfaces (Anchor C's olive dark must be adapted to sage-green light mode)
2. Desktop-first responsive web — not a native app
3. Two-sided product — contributor upload flow and traveler browse flow must feel visually distinct but cohesive
4. Real product build — production correctness matters, this is not a pitch deck

**Anchor-to-direction mapping (1:1 rule):**
- Direction A uses Anchor A's palette, surface, and signature ONLY
- Direction B uses Anchor B's palette, surface, and signature ONLY
- Direction C uses Anchor C's (adapted) palette, surface, and signature ONLY

**Component Translation Maps are in §8 above — use them.**

**Primary design surface for this sprint:** Marketplace browse homepage (`/`) + Itinerary detail page (`/itinerary/[id]`). These are the two highest-leverage surfaces. Design both for each direction.

**Question Status Tracker (all resolved):**
- Q-1 P0 — Surface scope: Full product UI ✓ confirmed
- Q-2 P0 — Platform: Responsive web desktop-first ✓ confirmed
- Q-3 P1 — Keywords: soft, organic, modern, geometric ✓ confirmed
- Q-4 P1 — References: travel app aesthetic ✓ confirmed
- Q-5 P1 — Mode: Light only ✓ confirmed
- Q-6 P0 — Build type: Real product build ✓ confirmed

**Counter-Hypothesis:** Initially flagged that PRD reads like a pitch doc. Client confirmed real product build (Q-6). Proceed with production-grade fidelity mindset, not demo aesthetics.

**Keyword translations confirmed:** soft → 16–24px radius, diffuse shadows; organic → warm natural palette, imagery-forward; modern → humanist sans, generous whitespace; geometric → grid discipline, structured alignment.

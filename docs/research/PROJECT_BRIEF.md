# WHALES PROJECT BRIEF

| Field | Value |
|---|---|
| **Client** | Alex / GoJuly AI |
| **Date** | 2026-04-25 |
| **Engagement ID** | alex_airbnb_safety_overlay_2026_04_25 |
| **Confirmation status** | All values client-confirmed or asset-extracted |

---

## 1. Product Vision

A desktop-only (1440px) Airbnb search results page augmented with a neighborhood safety overlay for San Francisco. The product adds three safety features on top of the existing Airbnb search results UI: a safety-tier filter (Very Safe / Safe / Average / All), a map heatmap (green → yellow → red by neighborhood), and a listing card safety badge (letter grade A–D), plus an inline expandable safety detail drawer. All safety data is hardcoded mock data — no API calls. The prototype is fully interactive: selecting a safety tier updates the visible listing cards and activates the corresponding heatmap zones. Success means a traveler can instantly assess the safety profile of any San Francisco neighborhood and make a booking decision with that context in view, without ever leaving the search results page.

---

## 2. Problem Statements

**Core problem:** Travelers booking in unfamiliar cities — specifically San Francisco — have no neighborhood safety context at the point of decision. The Airbnb search results page shows price, photos, ratings, and amenities but zero information about the surrounding neighborhood's safety profile. A traveler comparing two listings in different SF neighborhoods cannot determine which area has better night walkability, lower crime, or closer emergency services without opening a separate tab.

**Problem 1 — No safety filter exists in the filter bar.** The existing filter row (Filters button + type pills: Any / Home / Experiences / Services) contains no mechanism to narrow results by safety tier. Travelers cannot isolate listings in Very Safe or Safe neighborhoods.

**Problem 2 — Map panel has no safety heatmap.** The map panel (right column, ~657px wide, sticky) shows property price markers on a base map but no overlay communicating relative neighborhood safety. The entire visual plane of the map is currently safety-blind.

**Problem 3 — No safety signal on listing cards.** Each listing card (307×398px) shows a photo, title, badge (Guest Fav or Superhost), description line, star rating, and price. There is no visual indicator — badge, color, or label — that communicates the safety grade of the neighborhood the listing is in.

**Problem 4 — No neighborhood safety detail accessible from search results.** Clicking a listing currently navigates away to a full listing detail page. There is no lightweight mechanism to surface neighborhood-level safety details (night walkability score, dominant crime type, nearby hospitals and transit) inline within the search results page.

**Accessibility — WCAG contrast audit:** Zero failures. All tested pairs PASS. Full audit in `docs/design-references/airbnb-wcag-audit.json`.

**Framing note:** The client's framing — safety context at point of decision — is confirmed. No counter-hypothesis was surfaced. The problem is absence, not mismatch: the Airbnb UI is well-designed but simply does not carry this data type.

---

## 3. Target Users

**Primary persona:** Traveler booking accommodations in an unfamiliar city. Specifically: someone planning a trip to San Francisco who has shortlisted several Airbnb listings in different neighborhoods and is in the final comparison phase. They are comfortable booking online (moderate-to-high digital fluency), are price-conscious, and have mild-to-moderate anxiety about unfamiliar neighborhoods — particularly for solo travel, travel with children, or late-night arrivals. At the moment of their key task they are in a focused decision state, skimming between 5–15 listings, looking for reasons to eliminate or shortlist. Safety context is a decisive factor they currently cannot access without breaking their flow.

---

## 4. Success Metrics

**Goal Thread:**

| Field | Value |
|---|---|
| **Primary metric** | A traveler can identify the safety grade of any visible SF listing without leaving the search results page, within one interaction |
| **Secondary metrics** | Selecting a safety filter tier reduces visible listings to only matching neighborhoods; map heatmap reflects the active filter state in real time |
| **Proxy signals** | Safety badge is visible on every listing card; expandable drawer surfaces night walkability, crime type, and nearby hospitals/transit without page navigation; heatmap toggle is reachable without scrolling |

---

## 5. Key Features & Scope

**In Scope:**

| Screen / Feature | Description |
|---|---|
| Airbnb search results page (desktop 1440px) | The entire existing search results page with safety overlay applied — search header, filter row, listings panel, and map panel all in scope |
| Safety tier filter | Segmented control or pill set with four tiers: Very Safe / Safe / Average / All. Selecting a tier filters the visible listing cards and activates the map heatmap. Placement is ★ CLIENT DEFERRED — designer applies judgment. |
| Map heatmap toggle | Floating toggle button on the map panel, positioned near the zoom/fullscreen controls in the top-right corner of the map. Toggles a green → yellow → red neighborhood heatmap overlay on/off. |
| Safety badge on listing cards | Letter grade (A / B / C / D) shown on each listing card. Visual placement, size, and style are ★ CLIENT DEFERRED — designer applies judgment. |
| Inline expandable safety detail drawer | Clicking the safety badge on a card expands an inline drawer within the search results page showing: night walkability score, dominant crime type, nearby hospitals count, nearby transit count. Clicking again collapses it. Full listing detail page navigation is not affected. |
| Hardcoded SF mock data | Safety grades and detail data are pre-assigned by SF neighborhood (Pacific Heights = A, Nob Hill = A, Marina = B, Inner Sunset = B, Mission = C, SoMa = C, Tenderloin = D, Civic Center = D). Baked into HTML. No API calls. |

**Out of Scope:**

| Item | Reason |
|---|---|
| Mobile (390px) | Client confirmed desktop-only; mobile explicitly excluded |
| Tablet (768px) | Client confirmed desktop-only |
| Full listing detail page | Client confirmed out of scope |
| Live safety data API | Client confirmed hardcoded mock data; no API integration |
| User authentication or saved preferences | Not in scope for this prototype |
| Real Airbnb data or imagery | Prototype uses mock/representative content |

---

## 6. Constraints

- **Device:** Desktop only — 1440px viewport. No responsive behavior required or expected.
- **Data:** All safety data is hardcoded mock data for SF neighborhoods. No external API calls.
- **Interactivity level:** Functional prototype. Safety tier filter must update visible listings and activate the heatmap. This is not a static mockup.
- **Output format:** Single HTML file (self-contained prototype).
- **Accessibility:** No explicit WCAG target stated by client. Phase 0 audit confirmed all existing Airbnb text pairs PASS WCAG AA. New safety feature colors (heatmap green/yellow/red, badge grades) should follow the same AA standard.
- **Map:** The prototype will use a placeholder or static map image. A live interactive map (Google Maps, Mapbox) is not required unless designer chooses to include one.
- **Fonts:** Airbnb Cereal VF is self-hosted on a0.muscache.com. The prototype should use the same font stack as extracted: `"Airbnb Cereal VF", Circular, -apple-system, "system-ui", Roboto, "Helvetica Neue", sans-serif`. If CDN fonts are unavailable in the prototype context, fall back gracefully to Circular or system-ui.

---

## 7. References & Aesthetic Direction

| Reference | Draw from |
|---|---|
| Airbnb search results page (live) | Pixel-perfect emulation of the existing UI — all existing components must match the live page exactly. Safety overlay additions should feel native, not bolted-on. |
| Airbnb brand system | Existing colors, type scale, pill components, card structure — all confirmed from live extraction |

**Aesthetic keywords translated:**

| Keyword | Pixel decision | Confirmed by |
|---|---|---|
| Native to Airbnb | New safety components use Airbnb's existing type scale, border-radius, and color conventions so they feel built-in, not appended | Asset extraction + client goal: augment, not replace |
| Informational clarity | Safety grades use a letter scale (A–D) — universally understood, scannable at card size | Client confirmation (Q5 deferred to designer) |
| Safety-legible color | Heatmap uses green → yellow → red — the universal semantic for safe → moderate → unsafe | Client confirmation (Q4) |

---

## 8. Design System

**Design Token Record:**

| Category | Token | Figma Style Name | Value | Source | Confirmed |
|---|---|---|---|---|---|
| Color | primary-brand | N/A | #FF385C | url_extracted (logo link color) | Yes — getComputedStyle |
| Color | text-primary | N/A | #222222 | url_extracted (body, header, card title) | Yes — getComputedStyle |
| Color | text-secondary | N/A | #6A6A6A | url_extracted (card description, strike price, inactive tab) | Yes — getComputedStyle |
| Color | bg-page | N/A | #FFFFFF | url_extracted (body background) | Yes — getComputedStyle |
| Color | bg-header-light | N/A | #F8F8F8 | url_extracted (header gradient endpoint) | Yes — getComputedStyle |
| Color | bg-header-gradient | N/A | linear-gradient(rgb(255,255,255), rgb(248,248,248)) | url_extracted (header background) | Yes — getComputedStyle |
| Color | border-default | N/A | #DDDDDD | url_extracted (filter pill border, inactive) | Yes — getComputedStyle |
| Color | border-active-pill | N/A | #222222 | url_extracted (active/selected pill border) | Yes — getComputedStyle |
| Color | bg-icon-button | N/A | #F2F2F2 | url_extracted (globe + menu button bg) | Yes — getComputedStyle |
| Color | carousel-overlay | N/A | linear-gradient(rgba(0,0,0,0) 80%, rgba(0,0,0,0.25)) | url_extracted (card photo bottom gradient) | Yes — getComputedStyle |
| Color | guest-fav-badge-bg | N/A | linear-gradient(357.5deg, rgb(62,86,124), rgb(128,157,192)) | url_extracted (Guest Favorite badge) | Yes — getComputedStyle |
| Color | superhost-badge-bg | N/A | #222222 | screenshot-estimated (Superhost badge background) | Partial — screenshot |
| Color | map-price-marker-bg | N/A | rgba(255,255,255,0.925) | url_extracted (map price pill background) | Yes — getComputedStyle |
| Typography | font-family-base | N/A | "Airbnb Cereal VF", Circular, -apple-system, "system-ui", Roboto, "Helvetica Neue", sans-serif | url_extracted | Yes — getComputedStyle |
| Typography | font-loading | N/A | Self-hosted via a0.muscache.com (9 @font-face rules) | url_extracted | Yes — link extraction |
| Typography | results-count-heading | N/A | 20px / 24px line-height / weight 600 | url_extracted (results count span) | Yes — getComputedStyle |
| Typography | body-default | N/A | 14px / 20px line-height / weight 400 | url_extracted (body, header, card text) | Yes — getComputedStyle |
| Typography | listing-title | N/A | 14px / 18px line-height / weight 500 | url_extracted (listing title span) | Yes — getComputedStyle |
| Typography | listing-description | N/A | 14px / 20px line-height / weight 400 / #6A6A6A | url_extracted (card description) | Yes — getComputedStyle |
| Typography | price-text | N/A | 15px / 19px line-height / weight 400 / #222222 | url_extracted (price div) | Yes — getComputedStyle |
| Typography | strikethrough-price | N/A | 15px / 19px line-height / weight 400 / #6A6A6A | url_extracted (strike price span) | Yes — getComputedStyle |
| Typography | map-price-marker | N/A | 15px / weight 500 / #222222 | url_extracted (price marker spans) | Yes — getComputedStyle |
| Typography | pill-tab | N/A | 12px / 16px line-height / weight 400 | url_extracted (filter pills) | Yes — getComputedStyle |
| Spacing | header-height | N/A | 151px | url_extracted | Yes — getComputedStyle |
| Spacing | search-form-h-padding | N/A | 48px left and right | url_extracted | Yes — getComputedStyle |
| Spacing | filter-pill-padding | N/A | 8px 12px | url_extracted | Yes — getComputedStyle |
| Spacing | filter-pill-height | N/A | 34px | url_extracted | Yes — getComputedStyle |
| Spacing | card-width | N/A | 307px | url_extracted | Yes — getComputedStyle |
| Spacing | card-height | N/A | 398px | url_extracted | Yes — getComputedStyle |
| Spacing | listings-panel-width | N/A | ~734px | url_extracted (layout extraction) | Yes — layout extraction |
| Spacing | map-panel-width | N/A | ~657px | url_extracted (layout extraction) | Yes — layout extraction |
| Spacing | heart-btn-size | N/A | 32px | url_extracted | Yes — getComputedStyle |
| Spacing | globe-menu-btn-size | N/A | 40px | url_extracted | Yes — getComputedStyle |
| Border/Radius | filter-pill-radius | N/A | 24px | url_extracted | Yes — getComputedStyle |
| Border/Radius | icon-btn-radius | N/A | 50% | url_extracted | Yes — getComputedStyle |
| Border/Radius | card-inner-radius | N/A | 20px | url_extracted (card container .cy5jw6o) | Yes — getComputedStyle |
| Border/Radius | map-price-marker-radius | N/A | 4px | url_extracted | Yes — getComputedStyle |

**Component Variant Record:**

| Component | Figma Node ID | Figma Frame Name | Variant Properties | Confirmed States | Unconfirmed States |
|---|---|---|---|---|---|
| Filter Pill | N/A | N/A | active (border #222222) / inactive (border #DDDDDD) | default, active/selected | hover (requires interaction — not extracted) |
| Listing Card | N/A | N/A | with Guest Fav badge / with Superhost badge / no badge | default, photo carousel | hover highlight (screenshot-estimated), saved state (not extracted) |
| Map Price Marker | N/A | N/A | default | default | selected/highlighted state (requires interaction) |
| Heart/Save Button | N/A | N/A | unsaved (default) | unsaved | saved state (not extracted) |
| Globe/Menu Button | N/A | N/A | default | default | hover (not extracted) |
| Safety Filter (new) | N/A — new feature | N/A | Very Safe / Safe / Average / All | N/A — does not exist | All states — ★ CLIENT DEFERRED |
| Safety Badge (new) | N/A — new feature | N/A | A / B / C / D grade | N/A — does not exist | All states — ★ CLIENT DEFERRED |
| Heatmap Toggle (new) | N/A — new feature | N/A | heatmap-on / heatmap-off | N/A — does not exist | All states — ★ CLIENT DEFERRED |
| Safety Detail Drawer (new) | N/A — new feature | N/A | collapsed / expanded | N/A — does not exist | All states — ★ CLIENT DEFERRED |

**Active State Visual Record:**

| Component | Active State Treatment | Source |
|---|---|---|
| Filter Pill (active/selected) | Border changes from 1px solid #DDDDDD to 1px solid #222222; text color remains #222222; bg remains #FFFFFF | url_extracted — anyPill (active) vs homePill (inactive) via getComputedStyle |
| Nav Tab — Homes (active) | font-weight 500, color #222222 | url_extracted |
| Nav Tab — Experiences / Services (inactive) | font-weight 500, color #6A6A6A | url_extracted |

---

## 9. Brand Identity

**Airbnb brand (applied to prototype):**
- **Logo:** Airbnb Bélo mark + wordmark in `#FF385C` (primary-brand). Rendered as SVG inline.
- **Primary brand color:** `#FF385C` — used for logo, selected state emphasis, and primary CTA.
- **Typography:** Airbnb Cereal VF — self-hosted at a0.muscache.com. Full stack: `"Airbnb Cereal VF", Circular, -apple-system, "system-ui", Roboto, "Helvetica Neue", sans-serif`.
- **Voice:** Warm, conversational, direct. Short labels. No jargon.
- **Safety overlay additions must feel native** — they should visually conform to the Airbnb design language (same border-radius, same type scale, same spacing conventions) rather than introduce a foreign visual system.

---

## 10. Visual Design Language

**Surfaces and tone:** The page is clean and minimal — white background (#FFFFFF), a subtle gradient header (white → #F8F8F8), and a light neutral (#F2F2F2) for icon button backgrounds. The visual tone is airy and functional. No decorative elements, no gradients in the content area.

**Color system:** Two-tier. Primary accent: `#FF385C` for brand and CTA moments only. Semantic blacks and grays (`#222222`, `#6A6A6A`, `#DDDDDD`) handle all UI hierarchy. New safety colors will be introduced as a distinct semantic layer: green for Very Safe, yellow/amber for Safe, orange for Average, red for grade D — following traffic-light convention. These must not clash with #FF385C.

**Typography:** Single family — Airbnb Cereal VF at 12–20px across all text roles. No display type. Hierarchy established through weight (400 body, 500 titles/active tabs, 600 results count) and color (#222222 primary, #6A6A6A secondary). New safety components use the same type scale.

**Component style:** Pill-shaped controls (24px radius) for filters. Cards with 20px inner radius. Icon buttons with 50% radius (circles). Borders are always 1px solid, never 2px+. Shadows are absent from the main card surface — elevation is communicated through the carousel overlay gradient on card photos only.

**Badges:** Guest Favorite uses a blue gradient (`linear-gradient(357.5deg, rgb(62,86,124), rgb(128,157,192))`); Superhost uses `#222222`. New safety letter-grade badges should introduce a distinct color family — grade A in green, grade B in amber/yellow, grade C in orange, grade D in red — while maintaining the same pill shape and type conventions as existing badges.

**Motion:** The existing page uses `transition: all` on interactive elements (header, logo, listing card). New interactive components (safety filter, heatmap toggle, drawer expand/collapse) should use moderate transitions (200–300ms ease) consistent with the existing page feel.

**Map panel:** Currently shows price markers (15px / weight 500 / #222222 on rgba(255,255,255,0.925) pill background, 4px radius) over a base map. Heatmap overlay will be a color-coded zone layer beneath the price markers. Toggle control positioned in the top-right corner near zoom/fullscreen buttons.

---

## 11. Copy Guide

**Tone descriptors:**

| Adjective | Writing rule | Confirmed by |
|---|---|---|
| Direct | No qualifiers. "Very Safe" not "Considered Very Safe". "Night walkability: High" not "Generally considered safe for walking at night." | Airbnb brand voice + client intent |
| Scannable | Labels only at card scale — single words or short phrases. Full sentences only in expanded drawer. | Card space constraints (307px width) |
| Non-alarmist | Safety grades are neutral data signals, not editorial judgments. Avoid "dangerous", "sketchy", "risky". Prefer "Average" over "Below Average". | User trust requirement |

**Locked strings (confirmed):**
- Safety tier filter labels: `Very Safe` / `Safe` / `Average` / `All`
- Map toggle label: `Safety Heatmap` (or `Heatmap` at smaller scale)
- Drawer section labels: `Night Walkability` / `Crime Type` / `Nearby Hospitals` / `Transit`
- Badge grades: `A` / `B` / `C` / `D`

**SF mock data (locked):**
- Pacific Heights: Grade A — Very Safe
- Nob Hill: Grade A — Very Safe
- Marina District: Grade B — Safe
- Inner Sunset: Grade B — Safe
- Mission District: Grade C — Average
- SoMa: Grade C — Average
- Tenderloin: Grade D
- Civic Center: Grade D

**Terminology rules:**
- "Safety grade" not "safety score" or "safety rating"
- "Neighborhood" not "area" or "zone"
- "Night walkability" not "walkability at night"
- All prices in USD with $ prefix, no decimal for round numbers

---

## 12. User Tasks

**Task 1 (primary):** User needs to determine the safety grade of any listing in the SF search results at a glance, without opening a new tab or page.

**Task 2:** User needs to narrow the listing results to only Very Safe or Safe neighborhoods by applying a safety tier filter, so they can compare eligible listings side-by-side.

**Task 3:** User needs to access neighborhood-level safety details — night walkability, crime type, nearby hospitals and transit — for a specific listing they are considering, without navigating away from the search results page.

---

## 13. Current Page State

The existing Airbnb search results page (extracted from live URL at 1440px) has the following structure, top to bottom:

**Header (sticky, z-index 10, height 151px):**
The header is `position: sticky; top: 0`. It contains: (1) a logo zone (Airbnb Bélo + wordmark, #FF385C, 102×80px clickable area) aligned left; (2) a centered search form (full-width at 1440px, horizontal padding 48px); (3) a right-aligned nav group with an "Airbnb your home" link, a globe icon button (40px circle, bg #F2F2F2), and a hamburger/avatar menu button (40px circle, bg #F2F2F2). Below the search form, a horizontal scrollable filter row contains: a "Filters" pill button (border #DDDDDD, 34px height, 24px radius) followed by type pills: `Any` (active — border #222222), `Home`, `Experiences` (with NEW badge: 8px/700 white text, radius 10px), `Services` (with NEW badge). The header background is `linear-gradient(rgb(255,255,255), rgb(248,248,248))`.

**Main content area (flex-row, 1440px width):**
The main content below the header is a horizontal flex row split into two columns:

- **Left: Listings panel (~734px wide):** Opens with a results count heading (`Over 1,000 homes in San Francisco`, 20px / 24px / weight 600). Below it is a scrollable grid of listing cards. Each card is 307×398px with a 20px inner border-radius. Card anatomy: photo at top (fills ~60% of card height), carousel dot indicators, heart/save button (32px circle, top-right of photo), optional badge (Guest Favorite with blue gradient, or Superhost with #222222 bg), listing title (14px / 18px / weight 500 / #222222), description line (14px / 20px / weight 400 / #6A6A6A), star rating + review count, price line (strikethrough original price in #6A6A6A, discounted price in #222222, both 15px / 19px). No safety information of any kind exists on the card.

- **Right: Map panel (~657px wide, sticky):** Shows a base map of San Francisco with price marker pills positioned over each listing's location. Each price marker: `rgba(255,255,255,0.925)` background, 4px radius, 15px / weight 500 price text. No heatmap overlay. No safety information of any kind.

**Current state gaps (Problems — see §2):**
1. The header filter row has no safety-related filter control.
2. The map panel has no heatmap overlay and no toggle control.
3. Each listing card has no safety badge or grade indicator.
4. No inline mechanism exists to surface neighborhood safety detail without navigating away.

---

## 14. Existing Interaction States

| Component | Observed States | Visual Treatment | Source |
|---|---|---|---|
| Filter Pill (inactive) | Default | 1px solid #DDDDDD; bg #FFFFFF; text #222222; 12px/400; 34px height; 24px radius | url_extracted |
| Filter Pill (active/selected) | Selected | 1px solid #222222; bg #FFFFFF; text #222222; same size | url_extracted |
| Listing Card | Default | 307×398px block; no border; 20px inner radius; no shadow on card surface | url_extracted |
| Card photo | Default | Photo fills top of card; carousel overlay: linear-gradient(rgba(0,0,0,0) 80%, rgba(0,0,0,0.25)) | url_extracted |
| Heart/Save Button | Default (unsaved) | 32px circle; border-radius 50%; color #222222; padding-top 2px | url_extracted |
| Globe Button | Default | 40px circle; bg #F2F2F2; border-radius 50%; no border | url_extracted |
| Menu Button | Default | 40px circle; bg #F2F2F2; border-radius 50%; no border | url_extracted |
| Map Price Marker | Default | rgba(255,255,255,0.925) bg; 4px radius; 15px/500 text | url_extracted |
| Nav Tab — Homes | Active | 14px / weight 500 / #222222 | url_extracted |
| Nav Tab — Experiences/Services | Inactive | 14px / weight 500 / #6A6A6A | url_extracted |
| Header | Sticky scroll | position: sticky; top: 0; z-index: 10; height: 151px | url_extracted |

**Active state visual treatments (existing only):**

| Component | Active treatment | Source |
|---|---|---|
| Filter Pill | Border 1px solid #DDDDDD → 1px solid #222222; bg and text unchanged | url_extracted (anyPill vs homePill computed styles) |
| Nav Tab (Homes) | color: #222222; font-weight: 500 | url_extracted |
| Nav Tab (Experiences/Services inactive) | color: #6A6A6A; font-weight: 500 | url_extracted |

---

## 15. Delivery & Handoff

| Field | Value | Source |
|---|---|---|
| **Output format** | Single self-contained HTML prototype file | client-confirmed (functional prototype) |
| **Device targets** | Desktop 1440px only | client-confirmed (Q2) |
| **Accessibility** | WCAG AA for all text — match existing Airbnb standard (all Phase 0 pairs PASS) | extracted + implied by brand standard |
| **Interactivity** | Functional: safety tier filter updates listings + activates map heatmap | client-confirmed (Q7) |
| **Data** | Hardcoded SF mock data — no API | client-confirmed (Q1) |
| **Map** | Static map image or placeholder acceptable; live tile map not required | inferred from hardcoded-data constraint |

---

## Designer Notes

*For the Designer Agent — not shown to client.*

**Pipeline rationale:** Phase 1 sent 7 questions. All 7 answered in a single client response. Zero P0 items deferred. Two P1 items (Q3 safety filter placement, Q5 safety badge placement) explicitly deferred by client — these are the primary creative decisions for the Designer Agent.

**Question Status Tracker:**

| Q-ID | Priority | Question | Status | Client Answer |
|---|---|---|---|---|
| Q1 | P0 | Safety data source | Confirmed | Hardcoded mock data — SF neighborhoods pre-assigned in HTML |
| Q2 | P0 | Device target | Confirmed | Desktop only (1440px). Mobile out of scope. |
| Q3 | P1 | Safety filter placement | ★ CLIENT DEFERRED | Option 5 — Unsure. Designer applies judgment. |
| Q4 | P1 | Map heatmap toggle placement | Confirmed | Floating toggle, top-right corner of map near zoom/fullscreen controls |
| Q5 | P1 | Safety badge on listing cards | ★ CLIENT DEFERRED | Option 4 — Unsure. Designer applies judgment. |
| Q6 | P1 | Listing detail panel | Confirmed | Inline expandable drawer — clicking safety badge expands it within the search results page |
| Q7 | P1 | Interactivity level | Confirmed | Functional prototype — filter updates listings, activates heatmap |

**Confirmed token count:** 37 design tokens (13 colors, 10 typography, 10 spacing, 4 border/radius). All url_extracted except `superhost-badge-bg` (screenshot-estimated).

**★ CLIENT DEFERRED items for Designer Agent to resolve:**

1. **Q3 — Safety filter placement:** Explore placement options: (a) inline in the existing filter row as a new pill group after existing type pills, (b) as a separate "Safety" pill that opens a dropdown, or (c) as a standalone filter section above the results count. Any placement must not break the sticky header layout. Existing filter row constraints: 48px horizontal padding; pill height 34px; border-radius 24px; filter-pill font 12px/400.

2. **Q5 — Safety badge on listing card:** Explore placement options: (a) small letter-grade chip overlaid on the card photo (top-left or bottom-left, similar to Guest Fav badge), (b) text row in the card metadata section after the title line, or (c) color-coded left border on the card indicating safety tier. Any placement must not obscure the photo carousel, must be legible at 307px card width, and must conform to the existing Airbnb type scale (12–14px, weight 500–700).

**Counter-hypothesis log:** Client framing confirmed as stated. No plausible alternative framing identified — the problem is a genuine absence of safety data in an existing well-designed UI.

**Token extraction confidence:** 36 of 37 tokens extracted via getComputedStyle() from the live Airbnb search results URL. Exception: `superhost-badge-bg` (#222222) was screenshot-estimated because the Superhost badge text node was clipped (1×1px rendered) during extraction; value cross-referenced against guest-fav-badge extraction and screenshot visual inspection.

**Annotation coordinates (from live extraction, airbnb-annotation-coords.json):**
- Problem 1 (No safety filter): `header` — top: 0%, left: 0%, width: 100%, height: 3.11%
- Problem 2 (Map — no heatmap): `.m1arl239` — top: 3.96%, left: 51%, width: 45.67%, height: 14.09%
- Problem 3 (No safety badge on card): `[itemprop="itemListElement"]` — top: 4.60%, left: 3.33%, width: 21.33%, height: 8.21%

**WCAG audit result:** All tested pairs PASS. Zero failures. Full audit in `docs/design-references/airbnb-wcag-audit.json`.

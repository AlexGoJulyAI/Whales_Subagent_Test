# WHALES PROJECT BRIEF

| Field | Value |
|---|---|
| **Client** | Craigslist / sfbay.craigslist.org |
| **Date** | 2026-04-25 |
| **Engagement ID** | craigslist_homepage-redesign_2026_04_25 |
| **Confirmation status** | Device target client-confirmed; all aesthetic/UX decisions ★ CLIENT DEFERRED (designer explores 3 directions) |

---

## 1. Product Vision

Craigslist is a platform that connects people within geographic communities to buy, sell, trade, hire, find housing, discover services, and engage in local discussions. The SF Bay Area homepage is the primary entry point for the entire product — it must route every user type (renter, job seeker, buyer, community browser) to the right destination with minimal friction.

The redesigned homepage replaces the current undifferentiated wall of 200+ hyperlinks with a hierarchically organized interface. Three core elements anchor the redesign: (1) a prominent, centered search bar at the top of the page; (2) six visually distinct category cards (community, housing, jobs, for sale, services, gigs) with subcategories surfaced through progressive disclosure; and (3) a streamlined location selector offering optional geolocation, regional grouping, and text search.

---

## 2. Problem Statements

The current sfbay.craigslist.org homepage presents the following confirmed problems, extracted from live page analysis:

**P1 — Layout and information hierarchy**
- The center content area presents 8 named sections as undifferentiated columns of blue hyperlinks with no visual differentiation between categories beyond a light gray header bar (#eeeeee background, 1px #dddddd border). Users face a wall of over 200 links with no visual hierarchy, grouping weight, or entry-point clarity.
- The "discussion forums" section contains 50+ forum topic links across 3 columns with no secondary grouping, creating a particularly dense zone.

**P1 — Search entry point**
- The search input is embedded in the left sidebar (#leftbar, 196px wide, #f4f4f4 background), a non-central, low-prominence position. It is styled as a basic browser input with 3px padding and no visual emphasis, making it easy to miss for users whose primary intent is keyword search.

**P1 — Location selector**
- The location indicator ("SF bay area") is a clickable button in the top banner rendered in Times New Roman, 22px, in pure browser blue (#0000ee). It has no visual affordance (no dropdown caret, no bordered input, no icon) that signals changeability. The sub-area pills (sfc, sby, eby, pen, nby, scz) use two-letter abbreviations with no geographic label, making them meaningless to unfamiliar users.

**P1 — No visual differentiation between categories**
- All 8 category sections (community, services, discussion forums, housing, for sale, jobs, gigs, resumes) use identical visual treatment: same header size, same background, same link color, same typography weight. There is no iconography, color coding, or spatial hierarchy to help users quickly locate their target category.

**Accessibility — WCAG contrast failure (auto-populated from Phase 0 Contrast Audit):**
- `#post` fails WCAG AA contrast: 3.78:1 (isLargeText: no → threshold 4.5:1) — text #009900 on bg #ffffff

**Framing note:** Counter-hypothesis evaluated (density vs. hierarchy failure) — both framings converge on the same design decisions. Client framing confirmed.

---

## 3. Target Users

★ CLIENT DEFERRED — "Unsure — test different options by letting the agent explore the best design variations."

Designer Agent instruction: Explore three distinct primary personas as separate design directions:
- **Direction A:** Task-focused returning user — already knows their category, needs fast access to it and its subcategories
- **Direction B:** First-time or casual visitor — new to Craigslist, needs discovery and orientation; search bar is the anchor
- **Direction C:** Multi-purpose browser — uses Craigslist regularly for multiple needs; all categories equally weighted

---

## 4. Success Metrics

★ CLIENT DEFERRED — "Unsure — test different options by letting the agent explore the best design variations."

**Goal Thread:**

| Field | Value |
|---|---|
| **Primary metric (Direction A)** | Reduced time-to-task — users reach target category within 1 click from homepage |
| **Primary metric (Direction B)** | Reduced bounce rate — users who land interact with at least one element before leaving |
| **Primary metric (Direction C)** | Secondary category discovery — users who came for one category also engage with adjacent ones |
| **Proxy signals** | Category card click rate; search bar usage rate; location selector engagement |

---

## 5. Key Features & Scope

**In Scope:**

| Screen / Feature | Description |
|---|---|
| Homepage redesign | sfbay.craigslist.org at desktop (1440px primary viewport) |
| 6 Category cards | Community, housing, jobs, for sale, services, gigs — each a visually distinct card with progressive disclosure of subcategories |
| Prominent search bar | Centered, above or near the category cards — primary keyword entry point |
| Streamlined location selector | Replaces bare text link; includes optional geolocation, regional grouping (replacing bare sub-area abbreviations), and text search |

**Out of Scope:**

| Item | Reason |
|---|---|
| Internal pages (listing detail, search results, posting flow) | Client specified homepage redesign only |
| Mobile optimization | Desktop-first — client-confirmed; mobile is secondary and not a deliverable |
| Back-end or functional implementation | Static HTML prototype output |
| Discussion forums section (full) | ★ CLIENT DEFERRED — designer judgment: fold under "community" card with collapse/expand |
| Resumes section (full) | ★ CLIENT DEFERRED — designer judgment: fold under "jobs" card with secondary visibility |

---

## 6. Constraints

| Constraint | Value | Source |
|---|---|---|
| Device target | Desktop-first — 1440px primary viewport | Client-confirmed |
| Accessibility standard | WCAG AA minimum | Auto-elevated — existing #post contrast failure requires remediation |
| Output format | Static HTML prototype | Pipeline default |
| Mobile | Secondary (not a primary deliverable) | Client-confirmed |

---

## 7. References & Aesthetic Direction

★ CLIENT DEFERRED — "Unsure — test different options by letting the agent explore the best design variations."

Designer Agent instruction: Each direction draws from a distinct reference and adopts a distinct brand relationship stance.

| Direction | Reference | Pattern to draw from | Brand relationship |
|---|---|---|---|
| A | Airbnb | Prominent centered search entry + icon-labeled category cards | Modernize while referencing — purple as accent, neutral-first palette |
| B | Nextdoor | Community-first layout, neighborhood context in header, local emphasis | Extend the brand — purple and blue as primary palette anchors |
| C | eBay | Dense-but-organized category grid, clear marketplace hierarchy | Fresh design language — new palette; logo wordmark stays |

**Aesthetic keywords (★ CLIENT DEFERRED — per direction):**

| Direction | Aesthetic keywords | Pixel implications |
|---|---|---|
| A | Clean / utilitarian / editorial | Generous whitespace, strong typographic hierarchy, minimal color |
| B | Warm / approachable / community-first | Rounded corners (8–12px), warm neutrals, soft shadows |
| C | Bold / structured / modern marketplace | Strong grid, confident type scale, distinct color zones per category |

---

## 8. Design System

**Design Token Record — Existing Site (url_extracted — reference for designer):**

| Category | Token | Value | Source | Confirmed |
|---|---|---|---|---|
| Color | brand-purple | #551a8b | url_extracted — #logo | yes |
| Color | link-blue | #0000ee | url_extracted — all `<a>` elements | yes |
| Color | text-primary | #222222 | url_extracted — body | yes |
| Color | bg-page | #ffffff | url_extracted — body | yes |
| Color | bg-sidebar | #f4f4f4 | url_extracted — #leftbar | yes |
| Color | bg-section-header | #eeeeee | url_extracted — h3.ban | yes |
| Color | bg-footer | #eeeeee | url_extracted — footer | yes |
| Color | border-section | #dddddd | url_extracted — h3.ban border-top | yes |
| Color | post-green | #009900 | url_extracted — #post (⚠ WCAG FAIL 3.78:1) | yes |
| Typography | font-logo | "Times New Roman", Times, serif — 31.3px / 42.3px lh — weight 500 | url_extracted — #logo | yes |
| Typography | font-location | "Times New Roman", Times, serif — 22px — weight 400 | url_extracted — .location .label | yes |
| Typography | font-body | "Open Sans", Helvetica, Arial, sans-serif — 16px — weight 400 | url_extracted — body | yes |
| Typography | font-section-header | "Open Sans" — 16px — weight 700 | url_extracted — h3.ban | yes |
| Typography | font-sidebar | "Open Sans" — 13.3px — weight 400 | url_extracted — #leftbar | yes |
| Typography | font-footer | "Open Sans" — 12.8px — weight 400 | url_extracted — footer | yes |
| Spacing | sidebar-width | 196px | url_extracted — #leftbar | yes |
| Spacing | center-width | 607.6px | url_extracted — #center | yes |
| Spacing | section-header-padding | 2px 5px | url_extracted — h3.ban | yes |
| Spacing | link-padding | 0px 5px | url_extracted — category links | yes |
| Radius | all-elements | 0px | url_extracted — site-wide | yes |
| Shadow | all-elements | none | url_extracted — site-wide | yes |

**New design tokens: ★ CLIENT DEFERRED — determined per direction by Designer Agent.**

**Component Variant Record:**

| Component | Source | Interaction Model | Confirmed States | Unconfirmed States |
|---|---|---|---|---|
| CategorySection (h3.ban + .cats) | url_extracted | Static | Default only | Hover, focus |
| LocationSelector (.location + .cl-subareas) | url_extracted | Click-driven (opens picker) | Default (text + pills) | Open/active picker state |
| SearchInput (input in #leftbar) | url_extracted | Click-driven | Default (resting) | Focus, active |
| HyperLink (all `<a>` in .cats) | url_extracted | Static | Default (#0000ee), Visited (#551a8b) | Hover (browser default only) |

**Active State Visual Record:**

| Component | Active State Treatment | Source |
|---|---|---|
| All hyperlinks | Visited: #551a8b (browser default) | url_extracted |
| No custom active/hover states present on current site | — | url_extracted |

---

## 9. Brand Identity

- **Wordmark:** "craigslist" — Times New Roman, 31.3px, weight 500, #551a8b — preserved in all directions
- **Peace symbol:** SVG icon prefix to wordmark — preserved in all directions
- **Brand purple:** #551a8b — core identity color; treatment per direction (see §7)
- **Page title tagline:** "SF bay area jobs, apartments, for sale, services, community, and events"
- **Voice:** Direct, functional, no-marketing-speak — confirmed from current site copy

---

## 10. Visual Design Language

★ CLIENT DEFERRED — three distinct visual languages, one per design direction.

**Direction A — Clean / Utilitarian / Editorial**
White or off-white background, no texture. Cards use subtle elevation (box-shadow). Strong editorial type scale. Color palette: neutral-first with purple as a single accent. Reference: Airbnb search entry pattern.

**Direction B — Warm / Approachable / Community-First**
Warm neutral background, cards with soft rounded corners (8–12px), soft shadows. Color palette extends Craigslist brand purple and blue with warm supporting tones. Reference: Nextdoor neighborhood layout.

**Direction C — Bold / Structured / Modern Marketplace**
Clean white or light gray grid. Cards are color-zoned (each of 6 categories gets a distinct accent color). Strong typographic hierarchy with a contemporary sans-serif. Fresh color language. Reference: eBay category grid.

Motion (all directions): Subtle hover transitions (100–200ms) on cards; no entrance animation unless direction-specific.

---

## 11. Copy Guide

**Tone descriptors:**

| Adjective | Writing rule | Confirmed by |
|---|---|---|
| Direct | No filler words, no marketing superlatives | Existing site copy |
| Functional | Labels describe destination, not brand promise | Existing site copy |
| Local | Geographic and community context present | "SF bay area" in header |

**Locked strings (verbatim from live page):**
- Product name: "craigslist" (lowercase)
- Location: "SF bay area"
- Category names: community, housing, jobs, for sale, services, gigs, discussion forums, resumes
- CTA: "post an ad"
- Search placeholder: "search craigslist"

**Copy Gap Log:**
- Sub-area full labels (sfc = San Francisco, sby = South Bay, eby = East Bay, pen = Peninsula, nby = North Bay, scz = Santa Cruz) — abbreviations only on current page; designer to pair with full names in location selector

---

## 12. User Tasks

★ CLIENT DEFERRED — per direction:

- **Direction A:** User needs to reach their target category and its subcategories within one interaction from the homepage.
- **Direction B:** User needs to understand what Craigslist offers and identify where to begin without being overwhelmed.
- **Direction C:** User needs equal-weight, fast access to any of the 6 primary categories without any one dominating the visual field.

---

## 13. Current Page State

The sfbay.craigslist.org homepage at 1440px uses a fixed 4-column layout:

**Left sidebar (#leftbar, 196px, #f4f4f4):**
Logo (Times New Roman, 31.3px, #551a8b) → "post an ad" link (#009900 — WCAG FAIL) → search input (3px padding, basic browser input) → event calendar → utility links → about links → charity section.

**Main content (#center, 607.6px, margin 19.6px):**
3 sub-columns of 8 category sections. Each section: h3.ban header (#eeeeee bg, #dddddd border-top, Open Sans 16px bold) + .cats list (two-column block links, 16px, #0000ee). Sections in layout order: community · services · discussion forums · housing · for sale · jobs · gigs · resumes.

**Right rail (~210px):**
"nearby cl" regional city list + "us cities / us states / canada / cl worldwide" sections.

**Top banner (.cl-homepage-top-banner):**
Location button (Times New Roman 22px, #0000ee, no visible affordance) + sub-area pills (sfc, sby, eby, pen, nby, scz — bare abbreviations, no labels) + user icons (faves, post, acct) + language dropdown.

**Footer:** #eeeeee bg, 12.8px Open Sans, 1px #cccccc border-top. Links: help, safety, privacy, terms, about, app, sitemap.

**Mobile (390px):** Completely different pattern — sidebar tab nav + drill-down right panel. Desktop column layout does not apply.

---

## 14. Existing Interaction States

| Component | Observed States | Visual Treatment | Source |
|---|---|---|---|
| All `<a>` hyperlinks | Default | #0000ee, block or inline, no underline | url_extracted |
| All `<a>` hyperlinks | Visited | #551a8b (browser default) | url_extracted |
| h3.ban category headers | Default (static) | #222222 on #eeeeee, 1px #dddddd border-top | url_extracted |
| Location button (.location) | Default | Times New Roman 22px, #0000ee, no border/caret | url_extracted |
| Search input | Default | 3px padding, no visible focus ring | url_extracted |
| "post an ad" (#post) | Default | #009900 on #ffffff, 5px padding, inline — WCAG FAIL | url_extracted |

**Active state visual treatments (existing only):**

| Component | Active treatment | Source |
|---|---|---|
| Hyperlinks | No custom hover/active — browser default only | url_extracted |

---

## 15. Delivery & Handoff

| Field | Value | Source |
|---|---|---|
| **Output format** | HTML prototype | Pipeline default |
| **Device targets** | Desktop-first (1440px primary) | Client-confirmed |
| **Accessibility** | WCAG AA minimum | Auto-elevated from existing failure |
| **Mobile** | Secondary, not a primary deliverable | Client-confirmed |

---

## Designer Notes

*For the Designer Agent — not shown to client.*

**Question Status Tracker:**

| Q-ID | Priority | Question | Status | Answer |
|---|---|---|---|---|
| Q-A | P0 | Primary user | ★ CLIENT DEFERRED | "Unsure — explore variations" |
| Q-B | P1 | Forums/resumes scope | ★ CLIENT DEFERRED | "Unsure — explore variations" |
| Q-C | P1 | Success metrics | ★ CLIENT DEFERRED | "Unsure — explore variations" |
| Q-D | P1 | Aesthetic adjectives | ★ CLIENT DEFERRED | "Unsure — explore variations" |
| Q-E | P1 | Brand relationship | ★ CLIENT DEFERRED | "Unsure — explore variations" |
| Q-F | P1 | Reference product | ★ CLIENT DEFERRED | "Unsure — explore variations" |
| Q-G | P2 | Device priority | confirmed | Desktop-first |

**Client deferred items — designer judgment applied:**
1. Primary user persona — map one per direction per §3
2. Discussion forums — fold under "community" as secondary expandable section
3. Resumes — fold under "jobs" as secondary link
4. Success metric — map one per direction per §4
5. Aesthetic direction — one per direction per §7 and §10
6. Color/brand relationship — one per direction per §7
7. Reference product + pattern — one per direction per §7
8. Card visual style — designer decision per direction
9. Motion register — default: subtle hover 100–200ms; no entrance animation

**Token extraction log:**
- All tokens extracted via `getComputedStyle()` on live page — url_extracted, exact values
- No Figma file provided — no screenshot-estimated values
- WCAG fail: #post (3.78:1) — must be remediated in all three design directions (new CTA color must achieve ≥4.5:1 on its background)

**Counter-hypothesis log:**
- Client framing (density = problem) vs. alternative (hierarchy failure = root cause) — both lead to identical design decisions. Client framing confirmed, no alternative surfaced.

**Engagement:** craigslist_homepage-redesign_2026_04_25

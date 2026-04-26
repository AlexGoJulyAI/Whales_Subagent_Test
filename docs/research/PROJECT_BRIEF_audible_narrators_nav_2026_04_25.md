# WHALES PROJECT BRIEF

| Field | Value |
|---|---|
| **Client** | Audible (Amazon) |
| **Date** | 2026-04-25 |
| **Engagement ID** | audible_narrators_nav_2026_04_25 |
| **Engagement type** | EDIT — add nav entry + new page |
| **Confirmation status** | All values client-confirmed or asset-extracted. Zero CLIENT DEFERRED items. |

---

## 1. Product Vision

Audible is a digital audiobook and podcast platform owned by Amazon, serving millions of listeners globally with a catalog of audiobooks, Audible Originals, and podcasts. Revenue comes through subscription memberships (Standard plan at $8.99/month after trial) and à-la-carte purchases.

This engagement adds a **Narrators discovery path** to the Browse navigation and creates the corresponding Narrators browse page. Success: a listener who trusts a narrator's voice can find all their work without knowing individual titles — mirroring the existing Authors discovery flow but centered on the performing voice.

---

## 2. Problem Statements

The current Browse nav "Popular Lists" column surfaces: Bestsellers, Coming Soon, New Releases, Best of the Year, Best of #BookTok. There is no Narrators entry point anywhere in the nav.

**Problem 1 — Missing narrator discovery path:**
Audiobook listeners frequently choose titles based on the narrator rather than the author. The voice, pacing, and performance style of a narrator drive repeat listening behavior and subscription loyalty. The current nav offers no mechanism to browse by narrator, forcing users to rely on keyword search or chance encounters with narrator metadata on individual title pages. This is a structural gap in the discovery model.

**Problem 2 — "Best of the Year" occupies a slot better served by narrator loyalty:**
"Best of the Year" is a time-bound curation mechanism — relevant once a year at most and stale for most of the calendar. Narrator loyalty is a perennial, high-frequency behavior (a listener who enjoys a narrator seeks them out repeatedly throughout the year). Replacing Best of the Year with Narrators adds a durable, year-round discovery path in its place.

---

## 3. Target Users

**Primary user:** Intermediate-to-experienced Audible subscriber. Has completed 3+ audiobooks. Has expressed preference for specific narrators (either consciously or by repeat-purchasing books narrated by the same person). Accesses the platform primarily on desktop, browses during leisure time.

**Emotional state at key task:** Exploratory — looking for their next listen. Willing to spend time browsing but expects the nav to efficiently surface relevant options. Has a narrator name in mind OR a voice-type preference, but no specific title yet.

---

## 4. Success Metrics

**Goal Thread:**

| Field | Value |
|---|---|
| **Primary metric** | Users entering via Narrators nav who add-to-cart or wishlist a narrator-browsed title — measured as a conversion event from the Narrators page |
| **Secondary metrics** | Narrators nav click rate within Browse mega menu; time-to-add-to-cart from Narrators page vs. category browse pages |
| **Proxy signals (prototype)** | Filter UI (genre specialty, voice style, language, most-listened) reduces visible list to a manageable set; narrator-to-book path feels intuitive; search bar allows name-based lookup without leaving the page |

---

## 5. Key Features & Scope

**In Scope:**

| Screen / Feature | Description |
|---|---|
| Browse nav — Popular Lists column | Replace "Best of the Year" link with "Narrators" link. No other nav changes. |
| Narrators page — page title | Centered H1 "Narrators" — identical treatment to Authors page H1 (48px/700/#010E19) |
| Narrators page — search bar | Standalone full-width or centered search input, positioned directly below the page title and above the filter chip row. Allows search by narrator name. |
| Narrators page — filter chips | Four filter categories: genre specialty, voice style, language, most-listened narrators. Implemented as adbl-toggle-chip elements matching Authors page filter chip pattern. |
| Narrators page — results list | Paginated vertical list matching Authors page productListItem layout: book cover image (left) + title + author + narrator credit + metadata (center) + price + CTA buttons (right). |

**Out of Scope:**

| Item | Reason |
|---|---|
| Individual narrator profile pages | Not requested; scope is the list/browse page only |
| Mobile/responsive layout | Not specified; desktop prototype only (1440px) |
| Backend/API integration | Prototype only; data is representative/static |
| Changes to Authors page | Authors page is the reference layout, not a modification target |
| All other Browse nav columns | Only Popular Lists column is in scope |

---

## 6. Constraints

- Match Audible's existing visual design system exactly — no aesthetic deviation from extracted tokens
- Desktop only (1440px viewport)
- HTML prototype output (no React/Next.js for this engagement)
- Accessibility: WCAG AA minimum (4.5:1 contrast ratio for normal text, 3:1 for large text)
- No external assets — use extracted values and inline/relative assets only
- Zero WCAG AA failures confirmed by audit of all extracted color pairs

---

## 7. References & Aesthetic Direction

| Reference | Draw from |
|---|---|
| Audible Authors page (live) | Page layout, filter chip row, list item structure, CTA button pattern, page title treatment |
| Audible Browse nav (live) | Nav column structure, section heading style, link typography, mega menu padding and grid |

**Aesthetic keywords translated:**

| Keyword | Pixel decision | Confirmed by |
|---|---|---|
| Match existing Audible system | Font: "Audible Sans" Arial; Text: #010E19; CTA: #FFA000; BG: #FFFFFF; Links: #1479CF | url_extracted — Authors page + home page + nav |
| Functional / utilitarian | No decorative additions; every element has a job; the narrator search bar and four filter categories are the sole designed additions | Client brief: match Authors page layout |
| Editorial restraint | Book covers and narrator names are the visual interest; chrome is minimal | Live page observation |

---

## 8. Design System

**Design Token Record:**

| Category | Token | Value | Source | Confirmed |
|---|---|---|---|---|
| Color | color-text-primary | #010E19 (rgb 1, 14, 25) | url_extracted — body getComputedStyle | yes |
| Color | color-text-secondary | #061624 (rgb 6, 22, 36) | url_extracted — metadata text | yes |
| Color | color-text-link | #1479CF (rgb 20, 121, 207) | url_extracted — dropdown link hover, filter chip selected | yes |
| Color | color-background | #FFFFFF | url_extracted — body background | yes |
| Color | color-cta-primary-bg | #FFA000 (rgb 255, 160, 0) | url_extracted — "Try Standard free" button | yes |
| Color | color-chip-unselected-border | #93ACCD (rgb 147, 172, 205) | url_extracted — adbl-toggle-chip | yes |
| Color | color-chip-active-bg | #1479CF | url_extracted — adbl-toggle-chip active state | yes |
| Color | color-chip-active-text | #FFFFFF | url_extracted — adbl-toggle-chip active state | yes |
| Color | color-nav-panel-bg | #FFFFFF | url_extracted — Browse dropdown panel | yes |
| Color | color-nav-col-heading | #4A6687 (rgb 74, 102, 135) | url_extracted — column heading text | yes |
| Color | color-nav-active-indicator | #1479CF (rgb 20, 121, 207) | url_extracted — Browse active underline | yes |
| Color | color-item-separator | rgba(1, 14, 25, 0.15) | url_extracted — book list item border-top | yes |
| Color | color-secondary-btn-border | #93ACCD | url_extracted — "Add to cart" / "Add to Wish List" button border | yes |
| Typography | font-family | "Audible Sans", Arial, sans-serif | url_extracted — body | yes |
| Typography | font-size-h1 | 48px | url_extracted — h1 Authors | yes |
| Typography | font-weight-h1 | 700 | url_extracted — h1 Authors | yes |
| Typography | font-lh-h1 | 52px | url_extracted — h1 Authors | yes |
| Typography | font-size-body | 16px | url_extracted — nav links and chips | yes |
| Typography | font-size-metadata | 13px | url_extracted — By:, Narrated by:, Length:, etc. | yes |
| Typography | font-size-book-title | 20px | url_extracted — H2 book title | yes |
| Typography | font-weight-book-title | 700 | url_extracted — H2 book title | yes |
| Typography | font-lh-book-title | 26px | url_extracted — H2 book title | yes |
| Typography | font-weight-browse-btn | 600 | url_extracted — Browse button | yes |
| Typography | font-size-nav-col-heading | 16px | url_extracted — column heading | yes |
| Typography | font-weight-nav-col-heading | 600 | url_extracted — column heading | yes |
| Spacing | nav-panel-padding | 16px 24px | url_extracted — Browse dropdown | yes |
| Spacing | nav-panel-grid-cols | 5 columns | url_extracted — Browse dropdown grid | yes |
| Spacing | filter-chip-gap | gap 16px 12px (row / column) | url_extracted — chip row | yes |
| Spacing | filter-chip-padding | 8px 16px | url_extracted — chip | yes |
| Spacing | filter-chip-height | 42px | url_extracted — chip | yes |
| Spacing | dropdown-link-padding | 8px 0px | url_extracted — dropdown link | yes |
| Spacing | browse-btn-padding | 12px 0px | url_extracted — Browse button | yes |
| Component | nav-panel-box-shadow | 0 4px 8px rgba(1,14,25,0.15), 0 8px 24px rgba(1,14,25,0.1), 0 16px 48px rgba(1,14,25,0.05) | url_extracted — triple-layer shadow | yes |
| Component | nav-active-indicator | height 4px, border-radius 4px 4px 0 0, color #1479CF | url_extracted — Browse underline | yes |
| Component | nav-bar-height | ~136px (two-row nav) | url_extracted | yes |
| Component | chip-border-radius | 8px | url_extracted — adbl-toggle-chip | yes |
| Component | chip-border-width | 2px solid | url_extracted — adbl-toggle-chip | yes |
| Component | cta-button-radius | 32px (pill-ish) | url_extracted — CTA buttons | yes |
| Component | cta-button-height | 42px | url_extracted — CTA buttons | yes |
| Component | cta-button-width | ~220px | url_extracted — CTA buttons | yes |
| Component | cta-button-padding | 8px 16px | url_extracted — CTA buttons | yes |
| Component | book-cover-size | ~232px × 232px | url_extracted — cover image | yes |
| Component | book-cover-radius | clamp(8%, ..., 14%) | url_extracted — cover image | yes |
| Component | product-list-max-width | 1000px centered | url_extracted — productListItem | yes |
| Component | nav-sticky | position: sticky; top: 0 | url_extracted — nav behavior | yes |

**Component Variant Record:**

| Component | Variant Properties | Confirmed States | Unconfirmed States |
|---|---|---|---|
| adbl-toggle-chip | selected/unselected | selected (bg #1479CF, color #FFFFFF, border #1479CF), unselected (transparent bg, border #93ACCD) | hover, focus, disabled |
| adbl-button primary ("Try Standard free") | variant=primary | default (bg #FFA000, radius 32px, h 42px, w ~220px) | hover, focus, disabled |
| adbl-button secondary ("Add to cart", "Add to Wish List") | variant=secondary | default (bg #FFFFFF, border 1px solid #93ACCD, radius 32px, h 42px, w ~220px) | hover, focus |
| nav dropdown link | variant=default | default (16px/400/#010E19, padding 8px 0), hover (color #1479CF) | focus |
| search input (page-level) | N/A | follows site search input pattern | focus |
| product list item | N/A | default (separator border-top rgba(1,14,25,0.15)) | hover |

**Active State Visual Record:**

| Component | Active State Treatment | Source |
|---|---|---|
| adbl-toggle-chip (active/selected) | bg #1479CF, color #FFFFFF, border 2px solid #1479CF, border-radius 8px | url_extracted |
| Browse nav button (open state) | Blue underline 4px height, border-radius 4px 4px 0 0, color #1479CF | url_extracted |
| Dropdown link (hover) | color #1479CF | url_extracted |
| Book title link (hover) | color #1479CF | url_extracted |

---

## 9. Brand Identity

- **Logo:** Audible wordmark with orange sound-wave "ears", "an amazon company" sub-label
- **Primary brand color:** #FFA000 — CTA buttons, promo banner accents
- **Primary brand dark:** #010E19 — all body text, near-black
- **Link / active blue:** #1479CF — links, hover states, filter chip active, nav active indicator
- **Muted text blue:** #4A6687 — Browse dropdown column headings
- **Font:** "Audible Sans" (proprietary), Arial fallback
- **Voice:** Direct, benefit-first, listener-centric ("Find your next great listen")

---

## 10. Visual Design Language

**Aesthetic stance:** Clean, functional, catalog-first. White background, dark text, orange CTAs. Editorial restraint — book covers and narrator names are the visual interest; the chrome is minimal.

**Surface and tone:** White page background (#FFFFFF). No gradients or textures in the content area. Nav panel is white with a subtle three-layer drop shadow.

**Color system:** Three-color palette in active use — #010E19 (text/structure), #FFA000 (CTA), #1479CF (links, hover, active). Filter chips use #1479CF for the active state (solid background + white text). Column headings in the nav use a muted blue #4A6687.

**Typography:** Single font family ("Audible Sans"). Hierarchy through size and weight only:
- 48px/700/52px lh — page H1
- 20px/700/26px lh — book title (H2)
- 16px/600 — Browse button, nav column headings, filter chips
- 16px/400 — nav dropdown links
- 14px/400 — book subtitle, price, CTA labels
- 13px/400 — metadata (By:, Narrated by:, Length:, Release date:, Language:)

**Components:** Pill-shaped CTAs (32px radius). Rounded filter chips (8px radius). List view for content results, not grid cards. Book cover images are square (~232px) with slightly rounded corners.

**New elements added by this engagement:**
1. Browse nav link: "Narrators" — identical typography and treatment to adjacent dropdown links
2. Narrators page search bar: full-width or centered standalone input below H1, above filter chips
3. Filter chips: four new categories (genre specialty, voice style, language, most-listened narrators) — same adbl-toggle-chip visual treatment as Authors page

---

## 11. Copy Guide

**Tone descriptors:**

| Adjective | Writing rule | Confirmed by |
|---|---|---|
| Direct | Short labels, no filler words | Observed across nav and CTA copy |
| Listener-centric | "Your next great listen" / "Find your next great listen" framing | Live page copy |

**Locked strings (verbatim):**

| String | Value | Source |
|---|---|---|
| Page title | Narrators | client-confirmed |
| Nav link label (replaces "Best of the Year") | Narrators | client-confirmed (Q1) |
| Results count format | 1 – 20 of [N] results | url_extracted — Authors page |
| Search bar placeholder | Search narrators | designer decision — follows site pattern |
| Primary CTA | Try Standard free | url_extracted |
| Secondary CTA | Add to cart | url_extracted |
| Tertiary CTA | Add to Wish List | url_extracted |
| Narrator credit prefix | Narrated by: | url_extracted |
| Author credit prefix | By: | url_extracted |
| Filter category label 1 | Genre Specialty | client-confirmed (Q2: "genre specialty") |
| Filter category label 2 | Voice Style | client-confirmed (Q2: "voice style") |
| Filter category label 3 | Language | client-confirmed (Q2: "language") |
| Filter category label 4 | Most Listened | client-confirmed (Q2: "most-listened narrators") |

**Sample filter chip values (designer decision for prototype):**

| Filter | Sample chip labels |
|---|---|
| Genre Specialty | Mystery & Thriller, Romance, Sci-Fi & Fantasy, Literary Fiction, Self-Development, Business, History, Children's |
| Voice Style | Dramatic, Conversational, Energetic, Calm/Meditative, Multi-voice / Character-differentiated |
| Language | English, Spanish, French, German, Japanese |
| Most Listened | Top Narrators, Rising Narrators |

---

## 12. User Tasks

**Task 1 — Name-based lookup:**
User needs to find audiobooks narrated by a specific person they already enjoy. They know the narrator's name and want to see everything available narrated by them. They use the search bar at the top of the Narrators page to type the narrator's name.

**Task 2 — Attribute-based discovery:**
User needs to discover new narrators in a genre or voice style they prefer. They don't have a specific name in mind but want to filter by narrator attributes — genre specialty, voice style, language — to find new voices worth trusting. They interact with the filter chip row below the search bar.

**Task 3 — Catalog evaluation:**
User needs to evaluate a narrator before committing to a title. They want to see the narrator's catalog (ratings, book count, genre range) before choosing a specific audiobook. They scroll the results list and review metadata per list item.

---

## 13. Current Page State

**Browse nav — Popular Lists column (live, logged-out, url_extracted):**
Panel background: #FFFFFF. Padding: 16px 24px. Grid: 5 columns. Box shadow: 0 4px 8px rgba(1,14,25,0.15), 0 8px 24px rgba(1,14,25,0.1), 0 16px 48px rgba(1,14,25,0.05).

Current Popular Lists items (as extracted from live page):
1. Bestsellers
2. Coming Soon
3. New Releases
4. **Best of the Year** ← this item is being replaced with "Narrators" (client Q1 confirmed)
5. Best of #BookTok

Column heading "Popular Lists": color #4A6687, font-size 16px, font-weight 600.
Each link: font-size 16px, font-weight 400, color #010E19, padding 8px 0px, hover color #1479CF.

**Authors page — reference layout (live, url_extracted):**
- URL: audible.com/tag/genre/Authors-Audiobooks
- H1: "Authors" — 48px, weight 700, color #010E19, line-height 52px, text-align center
- Filter chip row: adbl-toggle-chip elements in two rows, left-aligned, stacked. Gap: 16px row / 12px column. Topics: Biographical Fiction, Women, Artists Architects & Photographers, Memoirs Diaries & Correspondence, Collections & Anthologies, Musician, Writing & Publishing, Biographies, Literary Fiction, etc.
- Results count: "1 – 20 of 500 results" — font-size 16px, color #010E19, font-weight 400
- Max content width: 1000px centered
- Page background: #FFFFFF
- List separator: border-top 1px solid rgba(1, 14, 25, 0.15)
- Each productListItem contains:
  - Left: book cover ~232×232px, border-radius clamp(8%,...,14%)
  - Center: H2 book title (20px/700/#010E19, hover #1479CF), By: [author] (13px/400/#061624, link #1479CF), Narrated by: [narrator] (13px/400/#061624, link #1479CF), Length, Release date, Language (all 13px/#061624), star rating + count (12px, amber gold), description paragraph (14px/#010E19)
  - Right: price text (14px/#010E19), "Try Standard free" button (bg #FFA000, radius 32px, h 42px, w ~220px, font-weight 700, font-size 14px), "Add to cart" button (bg #FFFFFF, border 1px solid #93ACCD, radius 32px), "Add to Wish List" button (same as Add to cart)

**Narrators page — new (target state):**
All visual tokens identical to Authors page. Differences:
1. H1: "Narrators" (same style)
2. Search bar: standalone input directly below H1, above filter chips (client Q3 confirmed: top of page, below title, above filter chips)
3. Filter chips: four categories — Genre Specialty, Voice Style, Language, Most Listened (client Q2 confirmed: all four)
4. Results list: same productListItem structure; "Narrated by:" field is the primary identity field per item

---

## 14. Existing Interaction States

| Component | Observed States | Visual Treatment | Source |
|---|---|---|---|
| adbl-toggle-chip (filter) | default, active/selected | Active: bg #1479CF, color #FFFFFF, border 2px solid #1479CF, radius 8px; Default: transparent bg, border 2px solid #93ACCD, radius 8px | url_extracted |
| adbl-button primary ("Try Standard free") | default | bg #FFA000, color #010E19, radius 32px, h 42px, w ~220px, padding 8px 16px, font-weight 700, font-size 14px | url_extracted |
| adbl-button secondary ("Add to cart" / "Add to Wish List") | default | bg #FFFFFF, color #010E19, border 1px solid #93ACCD, radius 32px, h 42px, w ~220px, font-weight 700, font-size 14px | url_extracted |
| Browse nav mega menu | closed, open | Closed: hidden panel; Open: white bg panel, 5-column grid, triple-layer shadow | url_extracted |
| Browse button | default, open | Open: blue underline 4px, border-radius 4px 4px 0 0, color #1479CF | url_extracted |
| Nav dropdown link | default, hover | Default: #010E19; Hover: #1479CF | url_extracted |
| Book title link | default, hover | Default: #010E19; Hover: #1479CF | url_extracted |
| Nav | scroll | Sticky — position: sticky; top: 0 | url_extracted |
| Browse dropdown | open/close trigger | Click-driven (click-to-open, click-outside-to-close) | url_extracted |
| Filter chips | toggle | Click-to-toggle, multi-select | url_extracted |
| Book list | scroll | Static scroll, no pagination animation | url_extracted |

**WCAG Contrast Audit results (all extracted pairs):**

| Pair | Ratio | Threshold | Result |
|---|---|---|---|
| #010E19 on #FFFFFF (nav link, page text) | 20.38:1 | 4.5:1 | PASS |
| #4A6687 on #FFFFFF (col heading) | 4.9:1 | 4.5:1 | PASS |
| #010E19 on #FFA000 (CTA text on amber) | ~8.5:1 | 4.5:1 | PASS |
| #FFFFFF on #1479CF (active chip text on blue) | ~4.7:1 | 4.5:1 | PASS |
| #061624 on #FFFFFF (metadata text) | ~19:1 | 4.5:1 | PASS |

**Zero WCAG AA failures.**

---

## 15. Delivery & Handoff

| Field | Value | Source |
|---|---|---|
| **Output format** | HTML prototype (two files: nav edit + Narrators page) | engagement type: EDIT |
| **Device targets** | Desktop (1440px viewport) | scope: desktop only |
| **Accessibility** | WCAG AA (zero current failures; maintain on all new elements) | url_extracted audit |
| **Pages in scope** | (1) Home page / Browse dropdown nav edit, (2) New Narrators page | client-confirmed |
| **Designer Notes** | Excluded from this file — see brief HTML (§ Designer Notes section omitted per template) | N/A |

---

## Question Status Tracker

| Q-ID | Priority | Question | Status | Client Answer |
|---|---|---|---|---|
| Q1 | P0 | Where to place "Narrators" in Browse dropdown | confirmed | Replace "Best of the Year" with "Narrators" |
| Q2 | P1 | Which filter attributes for Narrators page | confirmed | All four: genre specialty, voice style, language, most-listened |
| Q3 | P1 | Search bar placement on Narrators page | confirmed | Top of page, below title, above filter chips — standalone input |

**Phase 1 summary:** 3 questions sent, 3 confirmed, 0 client-deferred.

---

*Designer Notes (internal — not shown to client)*

**Pipeline rationale:**
Phase 1 complete — 3 questions sent, all 3 confirmed. All P0/P1 gaps resolved. Zero deferred items. Proceed to design.

**Key correction vs. prior brief (audible_narrators_2026_04_25):**
- Q1 answer changed: Prior brief assumed "Replace Series → Narrators." Confirmed answer is "Replace Best of the Year → Narrators." The live page extraction confirms "Best of the Year" is the 4th item in Popular Lists (the live logged-out page shows: Bestsellers, Coming Soon, New Releases, Best of the Year, Best of #BookTok).
- Q3 answer added: Search bar placement now confirmed — standalone input at top, below page title, above filter chips.
- Q2 answer added: All four filter attributes confirmed (prior brief had this as designer-decided; now client-confirmed).

**Counter-hypothesis log:**
- Could "Narrators" go in "Get Started" column? "Get Started" groups content types (Audiobooks, Podcasts, Audible Originals, Sleep). "Popular Lists" groups curation mechanisms (Bestsellers, Coming Soon, New Releases). Narrators is a curation/discovery mechanism (browse by voice), not a content type — more analogous to Authors than to Audiobooks. Client confirmed Popular Lists. Correct.

**Key designer judgment areas remaining:**
1. Specific chip label values for each of the four filter categories (see §11 sample values — designer confirms or replaces)
2. Search input visual treatment — follow site's global search style (border #93ACCD or similar, radius, height ~42px to match chips) or introduce a distinct input style
3. Narrator result card identity field ordering — recommend: Narrator name as primary (H2 link), then "Books narrated: [N]", then genre, then language — differing from Authors page which leads with the book title
4. Star rating display — recommend narrator-level aggregate rating (if available) or book-level ratings per result item (same as Authors page)
5. "Most Listened" filter — recommend sorting chip (changes list order) rather than a binary include/exclude chip

**Logged-in vs. logged-out nav:**
Live extraction (logged-out) shows 5 items in Popular Lists: Bestsellers, Coming Soon, New Releases, Best of the Year, Best of #BookTok. The change replaces "Best of the Year" (4th item) with "Narrators."

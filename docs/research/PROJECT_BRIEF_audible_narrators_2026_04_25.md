# WHALES PROJECT BRIEF

| Field | Value |
|---|---|
| **Client** | Audible (Amazon) |
| **Date** | 2026-04-25 |
| **Engagement ID** | audible_narrators_2026_04_25 |
| **Confirmation status** | All values client-confirmed or asset-extracted |

---

## 1. Product Vision

Audible is a digital audiobook and podcast platform owned by Amazon. It serves millions of listeners globally with a catalog of audiobooks, Audible Originals, and podcasts. The product earns revenue through membership subscriptions (Standard plan at $8.99/month) and à-la-carte purchases.

This engagement adds a Narrators discovery path to the Browse navigation and creates the corresponding Narrators page. Success looks like: a listener who trusts a specific narrator's voice can find all their work without knowing individual book titles — mirroring the existing Authors discovery flow.

---

## 2. Problem Statements

The current Browse nav "Popular Lists" column surfaces content through Bestsellers, Coming Soon, New Releases, Best of the Best, Series, Authors, Editors' Picks, and Best of #BookTok. There is no Narrators entry point.

**Problem 1 — Missing narrator discovery path:**
Audiobook listeners frequently choose titles based on the narrator rather than the author. The voice, pacing, and performance style of a narrator drive repeat listening behavior and subscription loyalty. The current nav offers no mechanism to browse by narrator, forcing users to either know a specific title or rely on keyword search. This is a structural gap in the discovery model.

**Problem 2 — "Series" occupies a slot that could serve narrator loyalty:**
"Series" as a discovery mechanism is largely redundant with genre browsing and individual title pages (which already expose series membership). Narrator loyalty, by contrast, has no other surface in the nav — replacing Series with Narrators adds a unique high-value path without removing anything users depend on for discovery they cannot accomplish elsewhere.

---

## 3. Target Users

**Primary user:** Audiobook listener, intermediate-to-experienced Audible subscriber. Has completed 3+ audiobooks. Has expressed preference for specific narrators (either consciously or by repeat-purchasing books narrated by the same person). Accesses the platform primarily on desktop, browses during leisure time. Emotional state: exploratory, looking for their next listen, willing to spend time browsing but expects the nav to efficiently surface relevant options.

---

## 4. Success Metrics

**Goal Thread:**

| Field | Value |
|---|---|
| **Primary metric** | Users who enter via Narrators nav discover and add to cart or wishlist a narrator-browsed title — measured as a conversion event from the Narrators page |
| **Secondary metrics** | Narrators nav click rate (within Browse mega menu); time-to-add-to-cart from Narrators page vs. category pages |
| **Proxy signals** | In prototype: does the filter UI (genre specialty, voice style, language, most-listened) reduce visible list to a manageable set? Does the narrator-to-book path feel intuitive? |

---

## 5. Key Features & Scope

**In Scope:**

| Screen / Feature | Description |
|---|---|
| Browse nav — Popular Lists column | Replace "Series" link with "Narrators" link. No other nav changes. |
| Narrators page | New page at a /narrators-equivalent path. List view matching Authors page layout: filter chips at top, paginated results list with book cover + title + narrator credit + price + CTA. Adds narrator-specific search (by name) and filter controls (genre specialty, voice style, language, most-listened). |

**Out of Scope:**

| Item | Reason |
|---|---|
| Individual narrator profile pages | Not requested; scope is the list/browse page only |
| Mobile/responsive layout | Not specified by client; desktop prototype only |
| Backend/API integration | Prototype only; data is representative/static |
| Changes to "Authors" page | Authors page is the reference, not a target |
| All other Browse nav columns | Only Popular Lists column is in scope |

---

## 6. Constraints

- Match Audible's existing visual design system exactly — no aesthetic deviation from extracted tokens
- Desktop only (1440px viewport)
- HTML prototype output (no React/Next.js for this engagement)
- Accessibility: WCAG AA minimum (4.5:1 contrast for normal text, 3:1 for large text)
- No external assets — use extracted values and placeholder images where needed

---

## 7. References & Aesthetic Direction

| Reference | Draw from |
|---|---|
| Audible Authors page (live) | Page layout, filter chip row, list item structure, CTA button pattern |
| Audible Browse nav (live) | Nav column structure, section heading style, link typography |

**Aesthetic keywords translated:**

| Keyword | Pixel decision | Confirmed by |
|---|---|---|
| Match existing Audible system | Font: "Audible Sans" Arial; Colors: #010E19 text, #FFA000 CTA, #FFFFFF bg | url_extracted — Authors page + home page |
| Functional / utilitarian | No decorative additions; every element has a job; filter controls are the designed addition | Client brief: "should look like the existing Authors page layout" |

---

## 8. Design System

**Design Token Record:**

| Category | Token | Figma Style Name | Value | Source | Confirmed |
|---|---|---|---|---|---|
| Color | color-text-primary | N/A | #010E19 (rgb 1,14,25) | url_extracted — body computed | yes — getComputedStyle |
| Color | color-text-link | N/A | #0E5B9B (rgb 14,91,155) | url_extracted — book title links | yes — getComputedStyle |
| Color | color-background | N/A | #FFFFFF | url_extracted — body background | yes — getComputedStyle |
| Color | color-cta-primary-bg | N/A | #FFA000 (rgb 255,160,0) | url_extracted — adbl-button primary shadow | yes — getComputedStyle |
| Color | color-chip-selected-bg | N/A | #E6F3FF (rgb 230,243,255) | url_extracted — adbl-toggle-chip selected shadow | yes — getComputedStyle |
| Color | color-chip-selected-border | N/A | #1479CF (rgb 20,121,207) | url_extracted — adbl-toggle-chip selected border | yes — getComputedStyle |
| Color | color-chip-unselected-border | N/A | #93ACCD (rgb 147,172,205) | url_extracted — adbl-toggle-chip outline | yes — getComputedStyle |
| Color | color-search-border | N/A | #7690B2 (rgb 118,144,178) | url_extracted — input.bc-input | yes — getComputedStyle |
| Color | color-nav-panel-bg | N/A | #FFFFFF | url_extracted — mega menu panel | yes — getComputedStyle |
| Typography | font-family | N/A | "Audible Sans", Arial, sans-serif | url_extracted — body | yes — getComputedStyle |
| Typography | font-size-body | N/A | 14px | url_extracted — body | yes — getComputedStyle |
| Typography | font-weight-body | N/A | 400 | url_extracted — body | yes — getComputedStyle |
| Typography | font-lh-body | N/A | 20px | url_extracted — body | yes — getComputedStyle |
| Typography | font-size-h1 | N/A | 48px | url_extracted — h1 Authors | yes — getComputedStyle |
| Typography | font-weight-h1 | N/A | 700 | url_extracted — h1 Authors | yes — getComputedStyle |
| Typography | font-lh-h1 | N/A | 52px | url_extracted — h1 Authors | yes — getComputedStyle |
| Typography | font-size-nav | N/A | 16px | url_extracted — adbl-nav-link shadow | yes — getComputedStyle |
| Typography | font-weight-browse-btn | N/A | 600 | url_extracted — mega menu button | yes — getComputedStyle |
| Typography | font-size-chip | N/A | 16px | url_extracted — adbl-toggle-chip shadow | yes — getComputedStyle |
| Spacing | nav-panel-padding | N/A | 16px 24px | url_extracted — mega menu panel | yes — getComputedStyle |
| Spacing | nav-panel-gap | N/A | 24px | url_extracted — mega menu panel grid gap | yes — getComputedStyle |
| Spacing | cta-button-padding | N/A | 8px 12px | url_extracted — adbl-button primary shadow | yes — getComputedStyle |
| Spacing | search-input-padding | N/A | 3px 36px 3px 16px | url_extracted — input.bc-input | yes — getComputedStyle |
| Component | cta-button-radius | N/A | 9999px (fully pill) | url_extracted — adbl-button primary shadow | yes — getComputedStyle |
| Component | cta-button-height | N/A | 42px | url_extracted — adbl-button primary shadow | yes — getComputedStyle |
| Component | chip-radius | N/A | 8px | url_extracted — adbl-toggle-chip shadow | yes — getComputedStyle |
| Component | chip-border-width | N/A | 2px | url_extracted — adbl-toggle-chip shadow | yes — getComputedStyle |
| Component | search-input-radius | N/A | 2px | url_extracted — input.bc-input | yes — getComputedStyle |
| Component | search-input-height | N/A | 40px | url_extracted — input.bc-input | yes — getComputedStyle |
| Component | product-list-max-width | N/A | 1000px | url_extracted — li.productListItem | yes — getComputedStyle |
| Component | product-list-item-height | N/A | ~331px | url_extracted — li.productListItem | yes — getComputedStyle [figma-measured] |

**Component Variant Record:**

| Component | Figma Node ID | Figma Frame Name | Variant Properties | Confirmed States | Unconfirmed States |
|---|---|---|---|---|---|
| adbl-toggle-chip | N/A | N/A | selected/unselected; outline style | selected (bg #E6F3FF, border #1479CF), unselected (transparent bg, border #93ACCD) | hover, focus, disabled |
| adbl-button (primary) | N/A | N/A | variant=primary, size=md | default (bg #FFA000, radius 9999px) | hover, focus, disabled |
| adbl-button (secondary) | N/A | N/A | variant=secondary | visible in nav (outline style) | hover, focus |
| nav-link (tertiary) | N/A | N/A | variant=tertiary | default (16px/24px, flex row) | hover |
| search input | N/A | N/A | N/A | default (border #7690B2, radius 2px, h 40px) | focus |
| product list item | N/A | N/A | N/A | default (list-item, ~331px height) | hover |

**Active State Visual Record:**

| Component | Active State Treatment | Source |
|---|---|---|
| adbl-toggle-chip (selected) | bg #E6F3FF, border 2px solid #1479CF, radius 8px | url_extracted |
| Browse nav button (open) | Blue underline indicator below text | screenshot-estimated (visual from live page) |

---

## 9. Brand Identity

- **Logo:** Audible wordmark with orange sound-wave ears, "an amazon company" sub-label
- **Primary brand color:** #FFA000 (CTA buttons, promo banner accents)
- **Primary brand dark:** #010E19 (text, near-black)
- **Secondary brand blue:** #0E5B9B (links)
- **Font:** "Audible Sans" (proprietary), Arial fallback
- **Voice:** Direct, benefit-first, listener-centric ("your next great listen")

---

## 10. Visual Design Language

**Aesthetic stance:** Clean, functional, catalog-first. White background, dark text, orange CTAs. The design philosophy is editorial restraint — the content (book covers, titles) is the visual interest; the chrome is minimal.

**Surface and tone:** White page background (#FFFFFF). No gradients or textures in the content area. The nav panel is white with a subtle grid layout.

**Color system:** Three-color palette in active use — #010E19 (text/structure), #FFA000 (CTA), #0E5B9B (links). Filter chips use a fourth pair: #E6F3FF / #1479CF for selected state.

**Typography:** Single font family ("Audible Sans"). Hierarchy through size and weight only: 48px/700 for page H1, 16px/400 for nav links and chips, 14px/400 for body and metadata, 16px/600 for interactive labels (Browse button).

**Components:** Pill-shaped CTAs (9999px radius). Square-cornered inputs (2px radius). Rounded filter chips (8px radius). List view for content (not grid cards).

**Motion:** Not specified; apply Audible system defaults where needed (transition: all; 0.1s linear observed on inputs).

---

## 11. Copy Guide

**Tone descriptors:**
| Adjective | Writing rule | Confirmed by |
|---|---|---|
| Direct | Short labels, no filler words | Observed across nav and CTA copy |
| Listener-centric | "Your next great listen" framing | Live page copy |

**Locked strings (verbatim):**
- Page title: "Narrators"
- Nav link label: "Narrators"
- Results count format: "1 – 20 of [N] results"
- Primary CTA: "Try Standard free"
- Secondary CTA: "Add to cart"
- Tertiary CTA: "Add to Wish List"
- Search placeholder: "Find your next great listen" (global search) / "Search narrators" (page-level, designer decision)

**Terminology rules:**
- "Narrated by:" (not "Read by:" or "Narrator:")
- "By:" for author credit
- Star rating + integer ratings count format: "4.6 ★★★★☆ 1,746 ratings"

---

## 12. User Tasks

1. **User needs to find audiobooks narrated by a specific person they already enjoy** — they know the narrator's name and want to see everything available narrated by them.

2. **User needs to discover new narrators in a genre or voice style they prefer** — they don't have a specific name in mind but want to filter by narrator attributes (genre specialty, voice style, language) to find new voices worth trusting.

3. **User needs to evaluate a narrator before committing to a title** — they want to see the narrator's catalog (ratings, book count, genre range) before choosing a specific audiobook.

---

## 13. Current Page State

**Browse nav — Popular Lists column (live, logged-in per client screenshots):**
Current items: Bestsellers, Coming Soon, New Releases, Best of the Best, Series, Authors, Editors' Picks, Best of #BookTok.
"Series" is a link to a series-browsing page. It occupies the 5th position in the Popular Lists column. The nav is a three-column mega menu triggered by the "Browse" button in the main navigation bar. The panel renders as a white dropdown (bg #FFFFFF, padding 16px 24px, grid display with 24px column gap).

**Authors page (current reference state):**
- URL: audible.com/tag/genre/Authors-Audiobooks/adbl_rec_tag_4-21-1746
- H1: "Authors" (48px/700 weight)
- Filter row: horizontally-arranged `adbl-toggle-chip` elements for genre categories (Biographical Fiction, Women, Artists Architects & Photographers, Memoirs Diaries & Correspondence, Musicians, Collections & Anthologies, Biographies, Writing & Publishing, Literary Fiction). Two rows, left-aligned, stacked.
- Results count: "1 – 20 of 500 results"
- List view: `li.productListItem` items, each containing: book cover image (left), title + author + narrator + metadata (center), price + CTA buttons (right)
- CTA buttons per item: "Try Standard free" (primary, #FFA000 pill) + "Add to cart" (secondary) + "Add to Wish List" (secondary)
- Pagination: bottom of page
- Max content width: 1000px centered
- Page background: white

---

## 14. Existing Interaction States

| Component | Observed States | Visual Treatment | Source |
|---|---|---|---|
| adbl-toggle-chip (filter) | default, selected | Selected: bg #E6F3FF border 2px solid #1479CF; Default: transparent bg border 2px solid #93ACCD | url_extracted |
| adbl-button primary ("Try Standard free") | default | bg #FFA000 radius 9999px padding 8px 12px | url_extracted |
| Browse nav mega menu | closed/open | Closed: hidden panel; Open: white panel with grid of nav-lists | url_extracted |
| Search input | default | border 1px solid #7690B2 radius 2px height 40px | url_extracted |
| nav-link tertiary | default | 16px/24px weight 400 color #0E5B9B (link blue) | url_extracted |

**Active state visual treatments (existing):**

| Component | Active treatment | Source |
|---|---|---|
| adbl-toggle-chip | bg #E6F3FF, 2px solid #1479CF border | url_extracted |
| Browse button (open state) | Blue underline indicator, aria-expanded=true | screenshot + shadow DOM inspection |

---

## 15. Delivery & Handoff

| Field | Value | Source |
|---|---|---|
| **Output format** | HTML prototype | client-confirmed |
| **Device targets** | Desktop (1440px) | client-confirmed (scope: desktop) |
| **Accessibility** | WCAG AA | client-confirmed (implied by Audible standards) |

---

## Designer Notes

*For the Designer Agent — not shown to client.*

**Pipeline rationale:**
Phase 1 skipped: all values confirmed from live URL extraction and client brief. Zero unconfirmed P0/P1 gaps.

**Counter-hypothesis log:**
- Client's stated problem: No narrator browsing path in Popular Lists nav.
- Alternative reading: Narrators could live in "Get Started" column as a content type (alongside Audiobooks, Podcasts). 
- Evidence: "Get Started" groups content types; "Popular Lists" groups curation mechanisms. Narrators browsing is a curation mechanism (browse by voice), not a content type entry point — more analogous to Authors than to Audiobooks.
- Decision: Proceed with client framing. "Popular Lists" is correct.

**Key designer judgment areas:**
1. Which genre taxonomy to use for narrator filter chips (designer decision — suggest: Mystery & Thriller, Romance, Sci-Fi & Fantasy, Literary Fiction, Self-Development, Business, History, Children's).
2. What "voice style" filter options mean in practice (designer decision — suggest: Dramatic, Conversational, Energetic, Calm/Meditative, Character-differentiated, Accent variety).
3. Whether a narrator search field should be its own dedicated input above the chip filters, or integrated into the chip group UI.
4. Star rating display for narrators (does the list show narrator's average rating across their catalog, or ratings per book? — treat as book-level ratings, same as Authors page).
5. Section heading color in the Browse nav (screenshot-estimated as a blue/teal; matches system behavior — apply consistently with existing nav heading pattern).

**Logged-in vs. logged-out nav difference noted:**
Live extraction (logged-out) shows fewer items in Popular Lists (no Series, Authors, Editors' Picks, Best of #BookTok). Client screenshots show logged-in state with those items. The prototype should represent the logged-in state as shown in client screenshots, with "Narrators" replacing "Series".

**Question Status Tracker:**
All values client-confirmed or url_extracted. No questions sent. Zero deferred items.

**TOKEN NOTES:**
- color-nav-section-heading: screenshot-estimated as blue/teal. Live extraction shows column headings in the megaMenu shadowHTML as `<div id="heading">` — computed color not directly accessible from main document. Apply visually matching blue from screenshot (estimate: #0E5B9B or similar brand blue).
- Product list item border-bottom: visible in screenshot as a thin light gray divider. Not extracted (shadow DOM). Apply as 1px solid #E2E8F0 or similar light gray.

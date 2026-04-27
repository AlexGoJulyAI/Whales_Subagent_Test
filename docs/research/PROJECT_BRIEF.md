# WHALES PROJECT BRIEF

| Field | Value |
|---|---|
| **Client** | Audible (internal product / prototype) |
| **Date** | 2026-04-27 |
| **Engagement ID** | audible_narrators_2026_04_27 |
| **Confirmation status** | All values client-confirmed or asset-extracted |

---

## 1. Product Vision

Audible's browse navigation surfaces curated "Popular Lists" collections that let listeners discover audiobooks by editorial curation (Bestsellers, New Releases, etc.). The product requires adding a dedicated **Narrators** entry to the Popular Lists section — mirroring the existing Authors page — so listeners who want to find audiobooks by a specific narrator's voice, style, or specialty can do so from the top-level navigation. The prototype will demonstrate: (a) the nav edit and (b) a fully functional Narrators browse page with search and filter capability.

---

## 2. Problem Statements

**Primary problem:** There is no Narrator entry in the "Popular Lists" nav section. Listeners who know a narrator they love (e.g., Jim Dale, Scott Brick) have no direct path to browse by narrator from the global navigation. The client's described nav shows: Bestsellers | Coming Soon | New Releases | Best of the Year | Best of #BookTok | **Series** | Authors | Editors' Picks. "Series" is an existing entry that will be replaced by "Narrators."

**Nav A/B discrepancy — noted, not blocking:** The live Browse nav panel (extracted via Playwright, screenshot: `docs/design-references/audible-browse-nav-open-live.png`) shows only: Bestsellers, Coming Soon, New Releases, Best of the Year, Best of #BookTok — without Series, Authors, or Editors' Picks. This differs from the nav the client described. This is likely an A/B test variant or a login-state difference. For the prototype, the client's described nav structure is used as the source of truth (which includes Series, Authors, Editors' Picks), with "Series" replaced by "Narrators."

**Framing note:** The counter-hypothesis (the problem is the nav variant, not the missing entry) was considered and rejected. The client's instruction is explicit: replace Series with Narrators. The prototype implements that edit.

---

## 3. Target Users

**Primary persona:** Audiobook listener who is narrator-aware — someone who has a preferred narrator's voice and wants to find their complete catalog, or someone exploring audiobooks by voice style rather than by subject or title. They may be a power user or a casual listener who had a great experience with one narrator and wants more. Context of use: desktop browser (primary) and mobile (secondary). Technical fluency: comfortable with e-commerce browse UX. Emotional state: exploratory / discovery mode.

**Secondary persona:** First-time Audible trial user arriving via the promo banner, browsing the catalog before committing to a subscription.

---

## 4. Success Metrics

The prototype succeeds if:

1. A reviewer can click "Narrators" in the Popular Lists nav and land on the Narrators browse page (demonstrating the nav edit is functional)
2. The Narrators page shows a list of audiobooks with narrator metadata prominent, and filter/search controls are visible and usable for: narrator name, genre specialty, voice style, language, most-listened
3. The prototype is pixel-faithful to the Audible Authors page layout (same component structure, same design tokens) such that stakeholders accept it as representative of how the Narrators feature would look in production

**Goal Thread:**

| Field | Value |
|---|---|
| **Primary metric** | Prototype demonstrates nav edit (Series → Narrators) and Narrators browse page end-to-end |
| **Secondary metrics** | Filter controls for narrator name, genre specialty, voice style, language, most-listened are visible; page matches Authors layout 1:1 |
| **Proxy signals** | Stakeholder can identify the Narrators entry in Popular Lists without assistance; filter panel is self-explanatory |

---

## 5. Key Features & Scope

**In Scope:**

| Screen / Feature | Description |
|---|---|
| Browse nav edit | Replace "Series" with "Narrators" in the Popular Lists section of the Browse mega-menu panel |
| Narrators browse page | New page mirroring the Audible Authors page layout: same promo banner, same nav header, same chip/filter row, same audiobook list-item structure — with Narrators as the page heading and narrator-specific metadata shown (narrator name, genre specialty, voice style, language) |
| Filter/search bar | Narrator-specific filters: narrator name (text search), genre specialty (chips/dropdown), voice style (chips/dropdown), language (chips/dropdown), most-listened (sort option) |
| Desktop layout | 1440px viewport, full three-column list item layout |
| Mobile layout | 390px viewport, responsive single-column layout |

**Out of Scope:**

| Item | Reason |
|---|---|
| Live backend / real narrator data | Prototype uses static/representative data |
| Account/sign-in flow | Not part of this feature |
| Checkout / purchase flow | Not part of this feature |
| Authors page modifications | Reference only — not edited |
| Editors' Picks, Series nav entries | Not part of this edit |

---

## 6. Constraints

- **Output format:** HTML prototype (single file or small file set — no Next.js required)
- **Device targets:** Desktop (1440px) and mobile (390px)
- **Accessibility:** WCAG AA (4.5:1 minimum contrast for normal text, 3:1 for large text) — all extracted color pairs already pass
- **Brand:** Must use Audible's extracted design tokens exactly — no personal aesthetic changes
- **Technology:** Static HTML/CSS/JS prototype only; no auth, no real API calls
- **Font:** "Audible Sans" (not a web font — use Arial as fallback in prototype)

---

## 7. References & Aesthetic Direction

| Reference | Draw from |
|---|---|
| Audible Authors page (live) | Complete layout, component structure, design tokens, interaction patterns |
| `audible-authors-desktop-1440-viewport.png` | Desktop viewport reference |
| `audible-authors-desktop-1440-full.png` | Full-page layout reference |
| `audible-authors-mobile-390-full.png` | Mobile layout reference |
| `audible-browse-nav-open-live.png` | Browse nav panel reference (with A/B discrepancy noted) |

**Aesthetic keywords translated:**

| Keyword | Pixel decision | Confirmed by |
|---|---|---|
| Match Audible Authors 1:1 | All spacing, colors, typography, border-radius from getComputedStyle() — no approximations | url_extracted |
| Navy promotional accent | Promo banner background: `rgb(19, 19, 105)` | url_extracted |
| Amber CTA | Primary button: `rgb(255, 160, 0)` | url_extracted |
| White body | Page background: `rgb(255, 255, 255)` | url_extracted |
| Blue link | `rgb(14, 91, 155)` for title/author/narrator links | url_extracted |
| Blue accent | `rgb(20, 121, 207)` for Browse indicator, selected state | url_extracted |

---

## 8. Design System

**Design Token Record:**

| Category | Token | Figma Style Name | Value | Source | Confirmed |
|---|---|---|---|---|---|
| Color | body-bg | N/A | #ffffff (rgb(255,255,255)) | url_extracted | yes — getComputedStyle |
| Color | text-primary | N/A | #010e19 (rgb(1,14,25)) | url_extracted | yes — getComputedStyle |
| Color | text-secondary | N/A | #061624 (rgb(6,22,36)) | url_extracted | yes — getComputedStyle |
| Color | link-blue | N/A | #0e5b9b (rgb(14,91,155)) | url_extracted | yes — getComputedStyle |
| Color | brand-blue | N/A | #1479cf (rgb(20,121,207)) | url_extracted | yes — getComputedStyle |
| Color | cta-amber | N/A | #ffa000 (rgb(255,160,0)) | url_extracted | yes — getComputedStyle |
| Color | banner-cta-amber | N/A | #ffb333 (rgb(255,179,51)) | url_extracted | yes — getComputedStyle |
| Color | promo-navy | N/A | #131369 (rgb(19,19,105)) | url_extracted | yes — shadow DOM getComputedStyle |
| Color | chip-border | N/A | #93accd (rgb(147,172,205)) | url_extracted | yes — getComputedStyle |
| Color | chip-selected-bg | N/A | #e6f3ff (rgb(230,243,255)) | url_extracted | yes — getComputedStyle |
| Color | chip-selected-border | N/A | #1479cf (rgb(20,121,207)) | url_extracted | yes — getComputedStyle |
| Color | divider-secondary | N/A | rgba(1,14,25,0.15) | url_extracted | yes — getComputedStyle |
| Color | search-border | N/A | #7690b2 (rgb(118,144,178)) | url_extracted | yes — getComputedStyle |
| Color | browse-text | N/A | #4a6687 (rgb(74,102,135)) | url_extracted | yes — getComputedStyle |
| Typography | body | N/A | "Audible Sans", Arial, sans-serif 14px/20px 400 | url_extracted | yes — getComputedStyle |
| Typography | nav-link | N/A | "Audible Sans", Arial, sans-serif 16px/24px 400 | url_extracted | yes — getComputedStyle |
| Typography | heading-h1 | N/A | "Audible Sans", Arial, sans-serif 48px/52px 700 | url_extracted | yes — getComputedStyle |
| Typography | book-title | N/A | "Audible Sans", Arial, sans-serif 20px/26px 400 | url_extracted | yes — getComputedStyle |
| Typography | metadata-small | N/A | "Audible Sans", Arial, sans-serif 13px/19px 400 | url_extracted | yes — getComputedStyle |
| Typography | banner-title | N/A | "Audible Sans", Arial, sans-serif 18px/26px 700 | url_extracted | yes — getComputedStyle |
| Typography | chip-label | N/A | "Audible Sans", Arial, sans-serif 16px/24px 400 | url_extracted | yes — getComputedStyle |
| Spacing | promo-banner-height | N/A | 54px | url_extracted | yes — getComputedStyle |
| Spacing | nav-header-height | N/A | 136px | url_extracted | yes — getComputedStyle |
| Spacing | list-item-height | N/A | ~332px | url_extracted | yes — getComputedStyle |
| Spacing | cover-image-size | N/A | 232×232px | url_extracted | yes — getComputedStyle |
| Spacing | content-max-width | N/A | 1000px | url_extracted | yes — getComputedStyle |
| Spacing | list-item-gutter | N/A | 12px (padding each side) | url_extracted | yes — getComputedStyle |
| Radius | chip-radius | N/A | 8px | url_extracted | yes — getComputedStyle |
| Radius | button-radius | N/A | 9999px (pill) | url_extracted | yes — getComputedStyle |
| Radius | search-radius | N/A | 2px | url_extracted | yes — getComputedStyle |
| Border | chip-border-width | N/A | 2px | url_extracted | yes — getComputedStyle |
| Border | search-border-width | N/A | 1px | url_extracted | yes — getComputedStyle |
| Font | primary | N/A | "Audible Sans" (proprietary) → fallback: Arial | url_extracted | yes — getComputedStyle |

**Component Variant Record:**

| Component | Figma Node ID | Figma Frame Name | Variant Properties | Confirmed States | Unconfirmed States |
|---|---|---|---|---|---|
| adbl-button | N/A | N/A | variant: primary/secondary; size: sm/md | primary (amber bg), resting | hover background exact value |
| adbl-chip | N/A | N/A | variant: outline/selected | outline (default), selected (blue border+bg) | hover exact |
| adbl-nav-mega-menu | N/A | N/A | open/closed | open (grid panel), closed (hidden) | none |
| search input | N/A | N/A | resting/focus | resting | focus border color |

**Active State Visual Record:**

| Component | Active State Treatment | Source |
|---|---|---|
| adbl-chip (selected) | bg: rgb(230,243,255), border: 2px solid rgb(20,121,207) | url_extracted (toggle-chip shadow DOM) |
| Browse nav indicator | 4px blue bar (#1479cf) below button text | url_extracted (mega-menu shadow DOM) |
| Pagination current page | Not linked (span, not anchor); no special background | url_extracted |

---

## 9. Brand Identity

- **Brand name:** Audible (an Amazon company)
- **Logo:** Inline SVG, `role="img"`, `aria-label="audible, an amazon company"`, 140×55px, Audible orange/amber wave mark
- **Wordmark:** "audible" lowercase with wave logomark (SVG)
- **Primary font:** "Audible Sans" (proprietary; Arial fallback in prototype)
- **Primary action color:** Amber `#ffa000` (Sign In, CTA buttons)
- **Brand accent:** Navy `#131369` (promo banner background)
- **Link color:** `#0e5b9b` (Audible blue)
- **Voice/tone:** Clear, informative, discovery-focused

---

## 10. Visual Design Language

**Surface and tone:** Clean white page background (`#ffffff`). Light, editorial feel. Content-forward layout with generous whitespace between list items. No decorative backgrounds or gradients in the main content area.

**Color system:** Two accent surfaces — (1) navy promo banner at top (`#131369`) with white text, (2) amber CTA buttons (`#ffa000`) on white background. Link blue (`#0e5b9b`) used for all interactive text links. Brand blue (`#1479cf`) used for active/selected states and the Browse indicator bar. Secondary text (`#061624`) for metadata labels.

**Typography:** Single typeface family — "Audible Sans" with Arial fallback. Hierarchical scale: H1 at 48px/700 (page title), book titles at 20px/400, nav/chip labels at 16px/400, metadata at 13px/400, body text at 14px/400. No serif, no display face.

**Components:** Web component architecture (`adbl-*` custom elements). All interactive elements use shadow DOM. Chips use 8px radius with 2px border. Buttons are full-pill (9999px radius). Cover art is square (232×232px). List items are full-width rows separated by 1px rgba dividers.

**Motion:** No scroll-driven animation. No page transitions. Hover states are instantaneous (no CSS transition observed on primary interactive elements). Browse nav panel open/close is the only significant state change.

**Layout:** Single content column (max-width 1000px, centered). Nav and promo banner are full-width (1440px). Three-column list item grid (cover 4/12 | metadata 7/12 | price 3/12).

---

## 11. Copy Guide

**Tone descriptors:**

| Adjective | Writing rule | Confirmed by |
|---|---|---|
| Clear | Use plain language; avoid jargon; labels match exact Audible conventions | url_extracted (verbatim copy) |
| Informative | Metadata fields are fully labeled (By:, Narrated by:, Length:, Release date:, Language:) | url_extracted |
| Discovery-oriented | Page heading is a content category noun (Authors, Narrators) | client-confirmed pattern |

**Locked strings:**
- Page heading for new page: **Narrators**
- Nav entry replacing "Series": **Narrators**
- Results counter pattern: **"1 - 20 of [N] results"**
- CTA button text: **"Try Standard free"**
- Promo banner: **"Special Prime Offer | 2 months free with your first Audible trial"** + **"Get this deal"**
- Copyright: **"© Copyright 1997 - 2026 Audible Inc."**

**Terminology rules:**
- "By:" (not "Author:") for book author attribution
- "Narrated by:" (not "Narrator:") for narrator attribution
- "Length:" (not "Duration:") for runtime

---

## 12. User Tasks

1. **User needs to find audiobooks associated with a specific narrator** — from the global nav, user clicks Browse → Popular Lists → Narrators, lands on the Narrators page, and can browse or filter the list by narrator name.

2. **User needs to filter the Narrators list by their preferred attributes** — on the Narrators page, user applies one or more filters (narrator name, genre specialty, voice style, language, most-listened) to narrow the audiobook results.

3. **User needs to discover a new audiobook through narrator browse** — user scans the Narrators page list, reads title/metadata/description for items matching their interest, and clicks to the product detail page or starts a preview.

---

## 13. Current Page State

The Audible Authors page (`/tag/genre/Authors-Audiobooks/adbl_rec_tag_4-21-1746`) serves as the reference and layout template for the new Narrators page.

**Current layout (top to bottom):**
1. **Promo banner** (54px, navy `#131369`): "Special Prime Offer | 2 months free..." + "Get this deal" amber button
2. **Nav header** (136px, white): Audible logo (left) + utility nav (Help, English–USD, Sign In button — top right) + Browse mega-menu button + search input (bottom row)
3. **Page header** (52px): H1 "Authors" (48px/700)
4. **Category chips** (116px, 2 rows): 9 genre chips — Biographical Fiction, Women, Artists Architects & Photographers, Memoirs Diaries & Correspondence, Musician, Collections & Anthologies, Biographies, Writing & Publishing, Literary Fiction
5. **Audiobook list** (~6617px): 20 items per page; each item = cover image (232×232px) + metadata column (title h3, subtitle, By:, Narrated by:, Length, Release date, Language, rating, description) + price/CTA column (price text + "Try Standard free" amber button). Items separated by 1px rgba divider.
6. **Pagination** (~40px): Show [20/30/40/50] items per page + page navigation
7. **Footer** (120px): Copyright + horizontal link row

**Current Browse nav — Popular Lists (live page, logged-out state):** Bestsellers | Coming Soon | New Releases | Best of the Year | Best of #BookTok

**Current Browse nav — Popular Lists (client's described version, target for prototype):** Bestsellers | Coming Soon | New Releases | Best of the Year | Best of #BookTok | Series | Authors | Editors' Picks → becomes: Bestsellers | Coming Soon | New Releases | Best of the Year | Best of #BookTok | **Narrators** | Authors | Editors' Picks

**Problem area:** Popular Lists nav (whichever version is shown) does not include a "Narrators" entry. This means narrator-centric browsing has no entry point from the global navigation.

---

## 14. Existing Interaction States

| Component | Observed States | Visual Treatment | Source |
|---|---|---|---|
| adbl-chip (category chip) | Default (outline), Selected (filled) | Default: transparent bg, 2px solid #93accd, 8px radius. Selected: #e6f3ff bg, 2px solid #1479cf | url_extracted |
| adbl-button.primary (Sign In) | Resting | #ffa000 amber bg, #010e19 text, 9999px radius, 42px height, 8px 12px padding | url_extracted |
| adbl-button.primary.sm (Get this deal) | Resting | #ffb333 golden-yellow bg, #010e19 text, 9999px radius, 38px height, 8px padding | url_extracted |
| adbl-button (Try Standard free) | Resting | #ffa000 amber bg, #010e19 text, 9999px radius, 42px height | url_extracted |
| adbl-nav-mega-menu (Browse) | Closed, Open | Closed: button visible, panel hidden. Open: panel display:grid 320px height, white bg, indicator bar #1479cf 4px | url_extracted |
| search input | Resting | 1px solid #7690b2, 2px radius, 40px height, white bg, 13px font | url_extracted |
| Book title link (h3 a) | Default, Hover | Default: #0e5b9b, no underline. Hover: underline (CSS toggle) | url_extracted |
| Pagination page number | Current page (not linked), Other pages (linked) | Current: plain span. Others: #0e5b9b link color | url_extracted |

**Active state visual treatments (existing only):**

| Component | Active treatment | Source |
|---|---|---|
| Browse nav indicator | 4px horizontal bar, #1479cf, directly below Browse button text | url_extracted |
| adbl-chip selected | rgb(230,243,255) bg + 2px solid #1479cf border | url_extracted |

---

## 15. Delivery & Handoff

| Field | Value | Source |
|---|---|---|
| **Output format** | HTML prototype | client-confirmed |
| **Device targets** | Desktop (1440px) + mobile (390px) | client-confirmed |
| **Accessibility** | WCAG AA | inferred from Audible standard; all extracted pairs pass |
| **Reference page** | Audible Authors page — layout template for Narrators page | client-confirmed |
| **Engagement ID** | audible_narrators_2026_04_27 | assigned |

---

## Designer Notes

*For the Designer Agent — not shown to client.*

**Phase 1:** Skipped — all values confirmed from live URL extraction and client statements. Zero unconfirmed gaps.

**Question Status Tracker:** No questions sent. All values extracted or confirmed.

**Counter-Hypothesis Log:**
- Client's stated problem: No narrator entry in Popular Lists
- Alternative reading: The live Browse nav (logged-out) shows a different set of Popular Lists items than what client described — no Series, Authors, or Editors' Picks visible. This could mean the client is on a different A/B variant.
- Evidence: Live extraction screenshot `audible-browse-nav-open-live.png` shows: Bestsellers, Coming Soon, New Releases, Best of the Year, Best of #BookTok only.
- Decision: Proceed with client's described nav. Document discrepancy in §2 and §13.
- Rationale: Client's instruction is explicit ("replace Series with Narrators"). Prototype should implement that edit regardless of which live variant they saw.

**Token Extraction Log:**
- All colors from `getComputedStyle()` on live page — confirmed
- Shadow DOM traversal required for: promo banner background (adbl-surface shadow), button colors (adbl-button shadow), chip inner styles (adbl-chip shadow), Browse panel (adbl-nav-mega-menu shadow)
- Font "Audible Sans" is a proprietary typeface; Arial is the specified fallback
- No Figma file provided — all tokens are url_extracted

**Client Deferred Items:** None.

**Framing note:** The core nav edit (Series → Narrators) is unambiguous. The Narrators page specification is derived directly from the Authors page layout. The filter additions (narrator name, genre specialty, voice style, language, most-listened) are client-confirmed features that have no exact counterpart on the Authors page — the Designer Agent must create a filter bar that matches the Audible design system (chip/pill style, #1479cf blue for active state, 8px radius, 2px border) using the extracted tokens.

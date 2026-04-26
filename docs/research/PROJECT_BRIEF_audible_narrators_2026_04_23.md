# WHALES PROJECT BRIEF

| Field | Value |
|---|---|
| **Client** | Audible (Amazon) |
| **Date** | 2026-04-23 |
| **Engagement ID** | audible_narrators_2026_04_23 |
| **Confirmation status** | All values client-confirmed or asset-extracted |

---

## 1. Product Vision

Audible is a subscription audiobook and podcast platform (audible.com). Users browse, purchase, and listen to audiobooks through a web and mobile experience. The Browse navigation at the top of every page is the primary content discovery entry point, organized into three columns: Get Started (content type entry points), Popular Lists (curated discovery paths), and Explore Audible (account and info links).

This engagement adds a dedicated Narrators discovery path to the Popular Lists column, enabling users to find and browse audiobooks through the narrator rather than the title, author, or genre. Success = a working Narrators page reachable from the Browse nav, with filtering and in-page search, that gives narrator-loyal listeners a direct discovery entry point.

---

## 2. Problem Statements

Audible's Popular Lists navigation currently surfaces discovery paths through content-level attributes (bestsellers, release date, genre tags, editorial picks) but offers no narrator-based entry point. Narrator loyalty is a documented audiobook behavior: listeners repeatedly seek out specific voices (e.g., Scott Brick, Julia Whelan, Jim Dale) and choose audiobooks based on narrator as much as title or author. The current Browse nav does not reflect this behavior, making narrator-based discovery a manual search task rather than a supported browsing mode.

**Framing note:** The client brief mentioned replacing "Series" in Popular Lists. Live extraction confirmed "Series" does not currently appear in the Popular Lists column — the five existing items are Bestsellers, Coming Soon, New Releases, Best of the Year, and Best of #BookTok. The correct framing is to add "Narrators" to this column (placement and whether to replace an existing item is a ★ CLIENT DEFERRED decision). This framing difference does not change the core problem or solution.

---

## 3. Target Users

**Primary persona:** Audiobook listeners who have developed narrator preferences — they've listened to enough audiobooks to know whose voice they trust and seek out. Typically mid-to-high engagement subscribers (listening multiple books per month). They know what they like and arrive at the Narrators page with a specific intent: find more books by a narrator they already love, or discover narrators in genres they enjoy.

**Context of use:** Web browser, seated/desktop context. User arrives via Browse nav click from any page. They are in discovery mode, not checkout mode — browsing with openness to persuasion but with a strong prior preference shaping their filter selections.

**Technical fluency:** Average web user. Familiar with Audible's existing filter chip + result list pattern from other browse pages. No new interaction paradigm required — the familiar chip + list UI is appropriate.

---

## 4. Success Metrics

**Goal Thread:**

| Field | Value |
|---|---|
| **Primary metric** | Narrators entry point is accessible via Browse nav and delivers a usable filtered result list within 2 interactions from homepage |
| **Secondary metrics** | Filter chips reduce result set meaningfully; narrator-name search produces correct result subset |
| **Proxy signals** | Page renders with correct H1, filter chips are interactive, result list populates, search input accepts text and visually updates |

---

## 5. Key Features & Scope

**In Scope:**

| Screen / Feature | Description |
|---|---|
| Browse nav — Popular Lists modification | Add "Narrators" as a navigation link in the Popular Lists column of the Browse mega-menu |
| Narrators page | New page at `/tag/genre/Narrators-Audiobooks/[tag-id]` (or equivalent), visually matching the Authors page layout: centered H1 + horizontal filter chips + result list |
| Filter chips | Horizontal `adbl-chip-group` above results; chip taxonomy and count are ★ CLIENT DEFERRED (designer explores variations) |
| Narrator-name search | In-page search capability; interaction pattern is ★ CLIENT DEFERRED (designer explores variations) |
| Result cards | Content and card structure are ★ CLIENT DEFERRED — designer explores: (A) books-by-narrator, (B) narrator profile cards, or (C) hybrid |
| Sort/results bar | "1–20 of N results" results count text + sort options appropriate to narrator context |

**Out of Scope:**

| Item | Reason |
|---|---|
| Narrator profile detail pages | Individual narrator bio/discography pages are a separate feature; this engagement covers the listing page only |
| Mobile/responsive layout | Desktop 1440px only for this prototype pass |
| Global search modification | Scoped nav search is a backend/architecture change; in-page search only |
| Backend data model | Prototype uses representative/plausible content; real narrator tag infrastructure is outside scope |
| Other Browse nav columns | Get Started and Explore Audible are not modified |

---

## 6. Constraints

- Visual design must match Audible's existing design system exactly: `"Audible Sans"` font, Audible color tokens, `adbl-chip` component patterns, `bc-*` content list patterns
- The Narrators page must be visually indistinguishable from the Authors page template in terms of layout structure and component language
- Content width: 1020px max (`bc-container`)
- Prototype is desktop-only (1440px viewport)
- No new design system components — use existing Audible component patterns (`adbl-chip`, `adbl-chip-group`, `bc-heading`, `bc-button`, cover image at 232px)
- Output: interactive HTML prototype per direction

---

## 7. References & Aesthetic Direction

| Reference | Draw from |
|---|---|
| Audible Authors page | Overall page layout: centered H1, horizontal chip filter row, results count, book list |
| Audible Browse mega-menu | Nav column layout, link styling, column heading typography |
| Audible `adbl-chip` component | Filter chip visual treatment: `border-radius: 8px`, `border: 2px solid rgb(147,172,205)`, `min-height: 32px` |

**Aesthetic keywords translated:**

| Keyword | Pixel decision | Confirmed by |
|---|---|---|
| Match existing Audible brand | Use `"Audible Sans"` font, `#0e5b9b` links, `#ffa000` CTAs, `#010e19` primary text | url_extracted from live page |
| Familiar / trustworthy | Same result card structure and chip filter pattern as Authors page | asset — Authors page screenshots |

---

## 8. Design System

**Design Token Record:**

| Category | Token | Value | Source | Confirmed |
|---|---|---|---|---|
| Color | body-bg | `#ffffff` | url_extracted — `getComputedStyle(body).backgroundColor` | yes |
| Color | text-primary | `#010e19` | url_extracted — `--adbl-primary-fill` CSS var | yes |
| Color | text-secondary | `rgb(6, 22, 36)` | url_extracted — `.bc-color-secondary` | yes |
| Color | link | `#0e5b9b` | url_extracted — `--adbl-link` CSS var | yes |
| Color | link-hover | `#1479CF` | url_extracted — `--adbl-link-hover` CSS var | yes |
| Color | link-visited | `#0e416c` | url_extracted — `--adbl-link-visited` CSS var | yes |
| Color | cta-bg | `#ffa000` | url_extracted — `--adbl-accent` CSS var | yes |
| Color | cta-hover | `#ffb333` | url_extracted — `--adbl-accent-hover` CSS var | yes |
| Color | nav-col-heading | `rgb(74, 102, 135)` | url_extracted — `--adbl-quaternary-fill: #4a6687` | yes |
| Color | attention | `#aa0000` | url_extracted — `--adbl-attention` CSS var | yes |
| Color | success | `#26822c` | url_extracted — `--adbl-success` CSS var | yes |
| Color | chip-border | `rgb(147, 172, 205)` | url_extracted — `adbl-chip #container` | yes |
| Color | separator | `rgba(1, 14, 25, 0.15)` | url_extracted — `hr` divider | yes |
| Typography | body-font | `"Audible Sans", Arial, sans-serif` | url_extracted — `getComputedStyle(body).fontFamily` | yes |
| Typography | h1-size | `48px` | url_extracted — Authors page `<h1>` | yes |
| Typography | h1-weight | `700` | url_extracted — Authors page `<h1>` | yes |
| Typography | h1-line-height | `52px` | url_extracted — Authors page `<h1>` | yes |
| Typography | h1-align | `center` | url_extracted — Authors page `<h1>` | yes |
| Typography | book-title-size | `20px` | url_extracted — `.bc-heading.bc-size-medium` | yes |
| Typography | book-title-weight | `400` | url_extracted — `.bc-heading` | yes |
| Typography | metadata-size | `13px` | url_extracted — `.bc-size-small` | yes |
| Typography | nav-col-heading-size | `16px`, weight `600` | url_extracted — `adbl-nav-list #heading` shadow | yes |
| Typography | nav-link-size | `16px`, weight `400` | url_extracted — `adbl-nav-link <a>` shadow | yes |
| Spacing | content-max-width | `1020px` | url_extracted — `.bc-container` | yes |
| Spacing | browse-nav-padding | `16px 24px` | url_extracted — `adbl-nav-mega-menu` panel | yes |
| Spacing | nav-col-gap | `24px` | url_extracted — `adbl-nav-list` | yes |
| Spacing | cover-image-size | `232×232px` | url_extracted — `img.width/height` on Authors page | yes |
| Spacing | chip-min-height | `32px` | url_extracted — `adbl-chip #container` | yes |
| Border | chip-border-style | `2px solid rgb(147, 172, 205)` | url_extracted — `adbl-chip #container` | yes |
| Border | chip-radius | `8px` | url_extracted — `adbl-chip #container` | yes |
| Border | cta-radius | `32px` (pill) | url_extracted — `.bc-button` | yes |
| Shadow | browse-nav-panel | `rgba(0,0,0,0.05) 0 5px 7.5px, rgba(0,0,0,0.05) 0 20px 12.5px, rgba(0,0,0,0.02) 0 20px 15px` | url_extracted — mega-menu panel | yes |

**Component Variant Record:**

| Component | Source URL | Interaction Model | Confirmed States | Unconfirmed States |
|---|---|---|---|---|
| `adbl-chip` | Authors page | click-driven | default (outline, unselected) | selected/active state — ★ CLIENT DEFERRED |
| `adbl-nav-link` | audible.com Browse nav | click-driven | default | hover color change |
| Browse mega-menu | audible.com | click-to-open | closed, open | — |
| Book result card (`bc-*`) | Authors page | static display | default | hover (link underline) |
| CTA button | Authors page | click-driven | default | hover (`#ffb333`) |

**Active State Visual Record:**

| Component | Active State Treatment | Source |
|---|---|---|
| `adbl-chip` | Selected state not visible on Authors page (no chip selected in extracted state) | ★ CLIENT DEFERRED — designer determines selected chip visual |
| Nav link (Browse hover) | color change on hover | url_extracted — hover: `#1479CF` |

---

## 9. Brand Identity

**Locked brand elements:**
- Logo: Audible wordmark + "an amazon company" lockup, top-left
- Font: `"Audible Sans"` (Audible custom typeface), Arial fallback
- Primary CTA color: `#ffa000` (Audible orange)
- Link color: `#0e5b9b`
- Text primary: `#010e19`
- Voice and tone: Warm, discovery-oriented, slightly enthusiastic — "Find your next great listen"

---

## 10. Visual Design Language

**Surface and tone:** White backgrounds (`#ffffff`), clean editorial structure, minimal chrome. The design system is built around content (cover art) as the primary visual element — UI chrome stays restrained so book covers dominate.

**Color system:** Dark navy primary text (`#010e19`), medium blue links (`#0e5b9b`), orange CTA (`#ffa000`). Navigation column headings use a muted blue-grey (`#4a6687`). Border and separator colors use low-opacity variants of the primary text color.

**Typography:** `"Audible Sans"` throughout — a humanist sans-serif. Size hierarchy: 48px H1 (centered, bold) → 20px book title → 13–14px metadata. Font weight distinguishes hierarchy (700 H1, 400 body/titles).

**Components:** `adbl-chip` for filter chips (outline style, 8px radius, 2px border, 32px min-height). `bc-button` for CTAs (pill shape, 32px radius, orange fill). Book cover images are 232px square. Result items use a horizontal layout: cover left, metadata right, price/CTA far right.

**Motion:** No significant animation in existing pages — standard browser link/button hover color transitions only.

---

## 11. Copy Guide

**Tone descriptors:**

| Adjective | Writing rule | Confirmed by |
|---|---|---|
| Warm | Address users directly ("Find your next great listen") | Audible nav copy — url_extracted |
| Discovery-oriented | Frame browsing as exploration, not searching | Authors page H1: "Authors" — direct, single-word label |
| Concise | Navigation labels are single words or short phrases | url_extracted — nav link text |

**Locked strings:**
- Page H1: "Narrators" (client-confirmed)
- Results count pattern: "1 – [N] of [total] results" (confirmed from Authors page)
- CTA button: "Try Standard free" (confirmed from Authors page)
- Secondary CTA: "Add to cart", "Add to Wish List" (confirmed from Authors page)
- Search placeholder (if dedicated search field): ★ CLIENT DEFERRED

**Terminology rules:**
- "Narrators" not "Voice Actors" or "Readers" — client used "Narrator" throughout
- Filter chip labels follow existing Audible genre taxonomy vocabulary

---

## 12. User Tasks

1. **User needs to reach the Narrators page from any page on Audible** — via the Browse nav Popular Lists column, with a single click
2. **User needs to filter results by a narrator-relevant attribute** — select one or more filter chips to narrow the result list to narrators/books matching their preference
3. **User needs to find a specific narrator by name** — type a narrator name and see matching results

---

## 13. Current Page State

**Browse mega-menu (audible.com — url_extracted):**
The Browse button in the top navigation opens a mega-menu panel with three labeled columns:

- **Get Started** (column heading: blue-grey `#4a6687`): Audiobooks, Podcasts, Audible Originals, Sleep, Latino and Hispanic voices, All categories
- **Popular Lists** (column heading: blue-grey `#4a6687`): Bestsellers, Coming Soon, New Releases, Best of the Year, Best of #BookTok — **5 items total, no Narrators link present**
- **Explore Audible** (column heading: blue-grey `#4a6687`): Plus Catalog, Gifts, Membership FAQs, Help Center, About Audible, Blog, Sales & Deals

Nav column headings are 16px/600wt. Nav link text is 16px/400wt. Panel has drop shadow, 16px 24px padding.

**Authors page (reference template — url_extracted):**
- **H1:** "Authors" — 48px, 700wt, centered, `"Audible Sans"`
- **Filter chips:** `adbl-chip-group` horizontal row — 9 chips: Biographical Fiction, Women, Artists Architects & Photographers, Memoirs Diaries & Correspondence, Collections & Anthologies, Musician, Writing & Publishing, Biographies, Literary Fiction — all in default/unselected outline state
- **Results bar:** "1 - 20 of 500 results" left-aligned text
- **Result items:** Horizontal layout — 232px cover image left, then metadata column (H3 title link 20px, subtitle, "By:" author link, "Narrated by:" narrator link, Length, Release date, Language, star rating + count), then price + CTA column far right
- **CTA buttons:** "Try Standard free" (primary, orange pill), "Add to cart" (secondary, outline), "Add to Wish List" (secondary, outline)
- **Book descriptions:** 2–3 line truncated excerpt below metadata
- **Pagination:** 25 pages, 20 items per page

**Problem area — Popular Lists column:**
"Narrators" does not exist anywhere in the current Popular Lists column. Users who want to browse by narrator have no dedicated entry point in the nav — they must use general search.

---

## 14. Existing Interaction States

| Component | Observed States | Visual Treatment | Source |
|---|---|---|---|
| Browse mega-menu | closed (default), open | Opens on click of "Browse" button; panel appears below nav with drop shadow | url_extracted — audible.com |
| `adbl-chip` (filter) | default/unselected only | Outline: `2px solid rgb(147,172,205)`, `border-radius: 8px`, white bg, `#010e19` text | url_extracted — Authors page |
| `adbl-chip` selected | not observed on live Authors page | ★ CLIENT DEFERRED — selected state not visible in current extraction | url_extracted — no selected chip visible |
| Book title link | default, hover | default: `#0e5b9b`; hover: underline added | url_extracted |
| CTA "Try Standard free" | default | `background: #ffa000`, `color: #010e19`, `border-radius: 32px` | url_extracted |
| CTA hover | not extracted | ★ CLIENT DEFERRED — hover state not extracted | — |

**Active state visual treatments (existing only):**

| Component | Active treatment | Source |
|---|---|---|
| Browse nav link | No active/current indicator visible on mega-menu links | url_extracted |
| `adbl-chip` selected | Not observed — ★ CLIENT DEFERRED | — |

---

## 15. Delivery & Handoff

| Field | Value | Source |
|---|---|---|
| **Output format** | Interactive HTML prototype (3 directions) | client-confirmed (v2 pipeline) |
| **Device targets** | Desktop 1440px | client-confirmed — "desktop" scope |
| **Accessibility** | AA-level minimum (matches Audible's existing standard) | asset-extracted (Audible uses ARIA on existing components) |

---

## Designer Notes

*For the Designer Agent — not shown to client.*

**★ CLIENT DEFERRED items (all marked "Unsure — explore variations"):**

1. **Q1 — Nav placement:** Whether "Narrators" replaces an existing Popular Lists item (Best of #BookTok recommended as lowest editorial weight) or is added as a 6th item. Each mockup direction can take a different stance.
2. **Q2 — Card type:** Books-by-narrator (same Authors page card structure), narrator profile cards (one per narrator person), or hybrid. Each direction should explore a different answer. Direction A: books-by-narrator. Direction B: narrator profile cards. Direction C: hybrid or other variation.
3. **Q3 — Filter chip taxonomy:** Genre specialty only / genre + language / genre + language + sort-by-most-listened. Each direction varies filter richness. Direction A: minimal (genre only). Direction B: moderate (genre + language). Direction C: rich (genre + language + sort options).
4. **Q4 — Search pattern:** Dedicated in-page search input / global search scoped / type-ahead chip. Vary across directions. Direction A: dedicated search bar above chips. Direction B: no in-page search (use Audible global search). Direction C: search chip that expands inline.

**Pipeline rationale:** The scope involves two surfaces (nav modification + new page) and new interactions (filter chips, search). Scope Complexity Check verdict: NOT a simple tweak — generate user journeys recommended.

**Counter-Hypothesis Log:**
- "Series" replacement: DISPROVED — Series is not in the current nav. Framing corrected to "add Narrators."
- Authors page as template: CONFIRMED as correct direction.
- Voice style as filter: UNRESOLVABLE from live page — requires new metadata. Treat as designer-defined filter label, not confirmed Audible taxonomy.

**Question Status Tracker:**
| Q-ID | Priority | Question | Status | Answer |
|---|---|---|---|---|
| Q1 | P0 | Which nav item to replace/add | ★ CLIENT DEFERRED — Unsure | Explore variations |
| Q2 | P0 | Card type | ★ CLIENT DEFERRED — Unsure | Explore variations |
| Q3 | P1 | Filter taxonomy | ★ CLIENT DEFERRED — Unsure | Explore variations |
| Q4 | P1 | Search pattern | ★ CLIENT DEFERRED — Unsure | Explore variations |

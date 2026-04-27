# BEHAVIORS — Audible Authors Page
# Source: https://www.audible.com/tag/genre/Authors-Audiobooks/adbl_rec_tag_4-21-1746
# Extracted: 2026-04-27 via live Playwright extraction

## Scroll-triggered behaviors

- **Nav header (adbl-nav-header)** → trigger: scroll at any position → state A: `position: static; top: auto; zIndex: auto` → state B: no change — nav is NOT sticky; it scrolls away with the page at all viewport sizes tested (1440px, 768px, 390px). No scroll-triggered appearance change observed.
- **Promo banner (adbl-enhanced-upsell-banner)** → trigger: scroll → state A: visible at top → state B: scrolls away; no sticky behavior. No parallax, no fade.
- **Smooth scroll library:** Detected: none → evidence: native browser scroll behavior observed; no `.lenis`, `.locomotive-scroll`, or custom scroll class found on any element.
- **Auto-cycling content:** None detected. No carousels, rotating headlines, or auto-advancing slides.
- **Dark-to-light transitions:** None. Single white background throughout.
- **IntersectionObserver-driven tabs:** None detected. Category chips are link-based navigation, not scroll-driven tabs.

## Click-driven behaviors

- **Browse nav (adbl-nav-mega-menu)** → trigger: click "Browse" button → state A: panel collapsed (height: 0, hidden) → state B: panel expanded, `display: grid`, background `rgb(255,255,255)`, showing three columns (Get Started, Popular Lists, Explore Audible). The panel container `.panel` has `role="group"`.
  - Get Started links: Audiobooks, Podcasts, Audible Originals, Latino and Hispanic voices, All categories, Plans & Pricing
  - Popular Lists links: Bestsellers, Coming Soon, New Releases, Best of the Year, Best of #BookTok
  - Explore Audible links: Plus Catalog, Gifts, Help Center, About Audible, Blog, Sales & Deals, Accessibility
  - **KEY OBSERVATION:** Popular Lists does NOT contain Series, Authors, or Narrators in the live Browse nav panel. Client described a version with those entries — likely an A/B test or login-state difference.
- **Browse button indicator** → trigger: click → a `div#indicator` bar appears below the button text. Color: `rgb(20, 121, 207)` (blue), height: 4px.
- **Category chips (adbl-chip)** → trigger: click → navigates to a sub-tag page. No client-side state toggle observed; all chips have `class="outline"` (unselected). No currently-active chip on the Authors page itself.
- **Pagination** → trigger: click page number → loads new result set. Pagination includes: items-per-page selector (20/30/40/50), prev/next arrows, page numbers. Current page (1) is not linked; other page numbers are `<a>` links.
- **Preview button (audiobook cover)** → trigger: click "▶ Preview" text below cover image → triggers audio playback via `<audio id="webPlayer">`.

## Hover behaviors

- **adbl-nav-link (Browse panel links)** → changed properties: `color` change on hover; cursor: pointer → transition: none detected (instantaneous).
- **Book title link (h3 a.bc-link)** → changed properties: `text-decoration: underline` on hover → transition: none (CSS class toggle).
- **adbl-chip (category chips)** → changed properties: background and border color change expected → transition: appears instantaneous.
- **"Try Standard free" / "Sign in" button (adbl-button.primary)** → changed properties: background darkens slightly on hover → transition: native.
- **"Get this deal" button (adbl-button.primary sm in banner)** → bg: `rgb(255, 179, 51)` at rest → transition: all (computed).

## Responsive behaviors

- **Desktop (1440px):** Full three-column list item layout: cover image (bc-col-4, ~232px) + metadata (bc-col-7, ~448px) + price/CTA (bc-col-3, ~232px). Utility nav (Help, English–USD, Sign In) visible top-right. Category chips in single scroll row.
- **Tablet (768px):** Same list-item structure maintained. Cover ~135px wide. Metadata takes ~480px. Price/CTA may wrap below or show condensed. Browse nav panel retains three columns.
- **Mobile (390px):** Utility nav items (Help, Sign In) hidden; only Audible logo + Browse button visible in header. Browse nav shows Get Started + Popular Lists truncated (Explore Audible off-screen). List items: cover left ~135px, metadata right. Price/CTA column not visible in viewport without horizontal scroll.
- **Breakpoint:** ~768px layout shift observed; below ~480px utility nav collapses fully.

## Smooth scroll library
Detected: none → evidence: no `.lenis`, `.locomotive-scroll`, or custom scroll-controller class found on any element. Native browser scroll behavior.

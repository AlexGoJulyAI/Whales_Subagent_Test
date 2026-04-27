# PAGE_TOPOLOGY.md — Audible Authors Page

**Target URL:** `https://www.audible.com/tag/genre/Authors-Audiobooks/adbl_rec_tag_4-21-1746`
**Viewport captured:** 1440×900 desktop, 768×1024 tablet, 390×844 mobile
**Date:** 2026-04-27
**Page height at 1440px:** 7135px
**Primary scroll container:** `<html>` / `document.documentElement`
**Column layout:** Single-column full-width wrapper (`.adbl-page.desktop`); main content constrained to `max-width: 1000px` inside `.bc-container`
**Max-width zones:** Full 1440px for promo banner and nav; ~1000px for page content center column

---

| Section name | Visual order | Fixed/sticky or flow | Interaction model | Complexity | Dependencies |
|---|---|---|---|---|---|
| promo-banner | 1 | flow | click-driven | Simple | none |
| nav-header | 2 | flow | click-driven | Moderate | none |
| page-header | 3 | flow | static | Simple | none |
| category-chips | 4 | flow | click-driven | Simple | none |
| audiobook-list | 5 | flow | click-driven | Complex | nav-header (Browse nav overlays this section when open) |
| pagination | 6 | flow | click-driven | Simple | audiobook-list |
| footer | 7 | flow | static | Simple | none |

---

## Section Details

### promo-banner (order 1)
- **Element:** `adbl-enhanced-upsell-banner` (web component with shadow DOM)
- **Slot container:** `div#top-0.slot.topSlot`
- **Height:** 54px
- **Background:** `rgb(19, 19, 105)` (dark navy/indigo) — from `adbl-surface` shadow DOM
- **Content:** "Special Prime Offer | 2 months free with your first Audible trial" + "Get this deal" button
- **Interaction model:** click-driven — the whole banner is a link, button navigates to subscription page
- **Complexity:** Simple (1 text group + 1 CTA button, static layout)
- **Dependencies:** none

### nav-header (order 2)
- **Element:** `adbl-nav-header` (web component with shadow DOM) inside `adbl-theme`
- **Slot container:** `div#nav-header.slot.topSlot`
- **Height:** 136px total (top-container: 56px logo+utility, bottom-container: 56px main-nav+search, border bottom: 16px spacing to content, total: ~136px visible before main content)
- **Background:** `rgb(255, 255, 255)` (from `header` element in shadow DOM)
- **Position:** static (NOT sticky — scrolls away with page)
- **Sub-components:** Audible logo (SVG, 140×55px), utility nav (Help link, Language/Currency selector, Sign In button), Browse mega-menu button, search input
- **Interaction model:** click-driven — Browse button toggles the mega-menu panel open/closed
- **Complexity:** Moderate (4 sub-components, click-driven Browse dropdown)
- **Dependencies:** none

### page-header (order 3)
- **Element:** `adbl-page-header` (web component) inside `div#center-1.slot.centerSlot`
- **Height:** 52px
- **Content:** `<h1>Authors</h1>` — 48px/700 weight/"Audible Sans"
- **Interaction model:** static
- **Complexity:** Simple (single h1)
- **Dependencies:** none

### category-chips (order 4)
- **Element:** `adbl-chip-group` containing 9 × `adbl-chip` (web components)
- **Container:** `adbl-style-scope.related-tags-adobe` inside `div#center-2.slot.centerSlot`
- **Height:** ~116px (two-row wrap at 1000px width, single row at wider viewports)
- **Chips (verbatim labels):** Biographical Fiction, Women, Artists Architects & Photographers, Memoirs Diaries & Correspondence, Musician, Collections & Anthologies, Biographies, Writing & Publishing, Literary Fiction
- **Chip appearance:** 42px height, `border-radius: 8px`, `border: 2px solid rgb(147, 172, 205)`, transparent background, `color: rgb(1, 14, 25)`, `font-size: 16px`
- **Interaction model:** click-driven — each chip is an `<a>` link navigating to a sub-genre tag page
- **Complexity:** Simple (flat list of link chips, no toggle state on this page)
- **Dependencies:** none

### audiobook-list (order 5)
- **Element:** `ul.bc-list.bc-list-nostyle` inside `.bc-section` inside `div#center-3.slot.centerSlot`
- **Height:** ~6617px (20 items × ~332px each)
- **Items per page:** 20 (default); options: 20, 30, 40, 50
- **Results count:** "1 - 20 of 500 results" (`adbl-text-block`)
- **Item structure:** 3-column row (bc-col-4 cover | bc-col-7 metadata | bc-col-3 price/CTA), separated by `bc-divider-secondary` (1px rgba border)
- **Item height:** ~332px per item
- **Cover image:** 232×232px rendered, source 250×250px from `m.media-amazon.com`, static position
- **Metadata fields (verbatim):** Title (h3 link), Subtitle, By: [author link], Narrated by: [narrator link], Length, Release date, Language, Star rating + count, Description excerpt
- **CTA column:** Price text + "Try Standard free" button (orange pill, `rgb(255,160,0)`)
- **Interaction model:** click-driven (book title → PDP, author/narrator → author page, Preview → audio playback, CTA → checkout)
- **Complexity:** Complex (6+ sub-components per item, multiple interactive elements, 20 items)
- **Dependencies:** Browse nav (mega-menu panel overlays the top items when open)

### pagination (order 6)
- **Element:** `form.refinementsAndPagingForm.paginationElements`
- **Height:** ~40px
- **Content:** "Show [20/30/40/50] items per page" + prev/next arrows + page number links
- **Interaction model:** click-driven (page navigation submits form)
- **Complexity:** Simple
- **Dependencies:** audiobook-list

### footer (order 7)
- **Element:** `<footer>` containing `#slim-footer-b1-widget`
- **Height:** 120px
- **Background:** transparent (inherits white from body)
- **Content:** "© Copyright 1997 - 2026 Audible Inc." + links: About Audible, Careers, Conditions of Use, Privacy Notice, Interest-Based Ads, License, Cookies, Your ads privacy choices, United States (English)
- **Interaction model:** static
- **Complexity:** Simple (copyright line + horizontal link list)
- **Dependencies:** none

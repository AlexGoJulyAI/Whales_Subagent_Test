# Project Brief — Audible Narrators Feature

## Product Context
**Platform:** Audible.com (desktop, 1440px viewport primary)
**Surface:** Browse nav dropdown + new /narrators page
**Date:** 2026-04-25

---

## Problem
Audible has no way to browse by narrator in the main navigation. Listeners choose audiobooks heavily by narrator voice and style, but the Browse dropdown only surfaces genre-based and editorial lists. The Authors page exists at /search and is accessible via the Explore section — but there is no equivalent for narrators.

---

## Solution

### Change 1 — Browse Nav Dropdown
Add "**Narrators**" as a 6th item to the **Popular Lists** column in the Browse mega-menu dropdown.

Current Popular Lists (live, extracted 2026-04-25):
1. Bestsellers
2. Coming Soon
3. New Releases
4. Best of the Year
5. Best of #BookTok
6. ← **Narrators** (new, no existing item removed)

### Change 2 — New /narrators Page
Create a new page at `/narrators` that mirrors the `/authors` page architecture.

- H1: "Narrators"
- Filter chips row (ADBL-CHIP pattern, same as Authors page tag row)
- Filter dimensions: genre specialty, voice style, language, most-listened
- Content: book-list view OR narrator directory — Q3 open, Designer explores all 3 directions

---

## Design Directions (Q3 unresolved — all three explored in mockups)

### Direction A — Book-list view (Authors parity)
Mirror of the Authors page. Each row = one audiobook:
- 232×232px cover + title (link blue) + "Narrated by: [Name]" + price
- Filter chips narrow results to books narrated by narrators matching the tag
- Delta: Minimal — nearly identical to /authors

### Direction B — Narrator directory
Grid of narrator profile cards:
- Narrator headshot/avatar + name + genre tags + "X audiobooks" count
- Click → narrator's full catalog page
- Delta: New pattern, no existing equivalent on Audible

### Direction C — Hybrid (narrator-first list)
List view with narrator as primary entity:
- Narrator name (H3) + inline "top 3 books" cover strip + genre/voice chips + "See all by [Name]" CTA
- Delta: Medium — borrows list structure, adds narrator-first framing

---

## Design Tokens (extracted from live page)

| Token | Value |
|---|---|
| Background page | `#FFFFFF` |
| Text primary | `#010E19` |
| Text muted (nav col headings) | `#4A6687` |
| Link default | `#0E5B9B` |
| Link hover | `#1479CF` |
| Link pressed/visited | `#0E416C` |
| Chip border | `#93ACCD` |
| Chip hover bg | `#F1F7FE` |
| Chip pressed bg | `#DAE9F9` |
| CTA primary bg | `#FFA000` |
| CTA primary text | `#010E19` |
| Focus ring | `#577CFF` |
| Separator | `rgba(1, 14, 25, 0.15)` |
| Font family | `"Audible Sans", Arial, sans-serif` |
| H1 | `48px / 700 / 52px lh` |
| Action-S (≥960px) | `16px / 400 / 22px lh` |
| Chip height | `42px` |
| Chip border-radius | `8px` |
| Book cover size | `232×232px` |
| CTA button bg | `#FFA000`, `border-radius: 32px`, `height: 28px` |
| Nav panel shadow | `rgba(0,0,0,0.05) 0px 5px 7.5px, rgba(0,0,0,0.05) 0px 20px 12.5px` |
| Nav panel padding | `16px max(24px, 50% - 800px)` |

---

## Component Inventory (live-extracted)

**adbl-nav-link[variant=tertiary]** — Shadow DOM
- Container: `flex; padding: 8px 0; gap: 4px; align-items: center`
- Font: Action-S (16px desktop), color `#010E19`
- Hover color: `#4A6687` (adbl-quaternary-fill)

**adbl-nav-list** — Shadow DOM
- Column heading: `#4A6687`, same Action-S font
- Grid layout: `column-gap: 24px`

**ADBL-CHIP[variant=outline]** — Shadow DOM
- `height: 42px; border: 2px solid #93ACCD; border-radius: 8px`
- Inner margin: `8px`; text padding: `0 8px`
- Hover: `#F1F7FE` bg; Pressed: `#DAE9F9` bg; Focus: solid `#577CFF`

**Book list item (li.bc-list-item.productListItem)**
- Cover: `232×232px`, `border-radius: clamp(8%,…,14%)`
- Title: `20px / #0E5B9B` link
- Separator: `1px solid rgba(1,14,25,0.15)`, `margin-bottom: 15px`

---

## WCAG Audit
All key text/bg pairs pass AA: body text (19.48), link (7.03), link hover (4.50), CTA on orange (9.54), nav subheading (5.93).

---

## Reference Screenshots
- `docs/design-references/audible-home-viewport.png`
- `docs/design-references/audible-browse-nav-open-1440.png`
- `docs/design-references/audible-authors-live-viewport.png`
- `docs/design-references/audible-authors-live-1440.png`

---

## Open Decisions
- Q3: Page architecture (A/B/C) — resolved in Designer phase via mockups
- Q4: Filter chips (ADBL-CHIP pattern, same as Authors page) — confirmed
- Mobile: same responsive treatment as /authors (single column, scrollable chips)

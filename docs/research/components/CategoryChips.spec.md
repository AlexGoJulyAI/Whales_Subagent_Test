# CategoryChips Specification — Audible Authors Page
## Extracted: 2026-04-27 from live page via getComputedStyle() + Playwright shadow DOM traversal

---

## Overview
- **Section slug:** category-chips
- **Screenshot:** `docs/design-references/audible-authors-desktop-1440-viewport.png`
- **Visual order:** 4
- **Interaction model:** click-driven (each chip is an anchor link navigating to a sub-genre tag page)
- **Complexity:** Simple (flat list of link chips, no toggle state on this page)
- **Dependencies:** none

---

## Computed Styles (exact values from getComputedStyle)

### adbl-chip-group (container)
- display: flex
- flexWrap: nowrap  ← chips in a scrollable horizontal row at desktop width
- padding: 8px 0px
- gap: normal (chips have natural spacing from their own margin/padding)
- backgroundColor: transparent

### adbl-chip (each chip — web component outer)
- display: block (or inline-block)
- height: 42px
- backgroundColor: transparent
- border: 0px solid rgb(209, 214, 215)
- color: rgb(1, 14, 25)
- fontSize: 16px
- fontWeight: 400
- borderRadius: 0px (on outer element — actual radius on inner)

### a#container.outline (inside adbl-chip shadow DOM — actual visible chip)
- backgroundColor: transparent
- color: rgb(1, 14, 25)
- border: 2px solid rgb(147, 172, 205)   ← medium blue-grey border
- borderRadius: 8px
- height: 42px
- fontSize: 16px
- fontWeight: 400
- display: flex
- alignItems: center
- padding: 0px (inner content has its own padding via #chip-content)
- cursor: pointer

### div#chip-content (inner layout)
- display: flex
- alignItems: center
- padding: 0px 12px (inferred from rendered chip dimensions)

### div#text (text container inside chip-content)
- display: block

---

## States & Behaviors

### Default (unselected — "outline" class)
- backgroundColor: transparent
- border: 2px solid rgb(147, 172, 205)
- color: rgb(1, 14, 25)
- borderRadius: 8px

### Selected (if active chip — toggle-chip variant)
- backgroundColor: rgb(230, 243, 255)   ← light blue fill
- border: 2px solid rgb(20, 121, 207)   ← Audible blue border
- color: rgb(1, 14, 25)
- borderRadius: 8px
- (Example: Language toggle chip "English" shows selected state)

### Hover (on unselected chip)
- Expected: border color darkens or background tints slightly
- Transition: not explicitly measured; appears instantaneous

### Click
- Navigates to sub-genre URL (e.g., `/tag/world_tree-publisher_assigned/Biographies-Audiobooks/...`)
- No client-side state toggle on the current Authors page

---

## Assets
No images. Text-only chips.

---

## Text Content (verbatim — all 9 chips on Authors page)
1. Biographical Fiction
2. Women
3. Artists, Architects & Photographers
4. Memoirs, Diaries & Correspondence
5. Musician
6. Collections & Anthologies
7. Biographies
8. Writing & Publishing
9. Literary Fiction

---

## Responsive Behavior
- **Desktop (1440px):** Single-row horizontal scroll; all 9 chips visible (two rows at 1000px container due to wrap — observed from screenshot showing 2 rows)
- **Tablet (768px):** Similar two-row wrapping layout
- **Mobile (390px):** Two or more rows; chips wrap
- **Breakpoint:** Chips wrap at ~1000px container width

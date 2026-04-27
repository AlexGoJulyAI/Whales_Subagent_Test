# Footer Specification — Audible Authors Page
## Extracted: 2026-04-27 from live page via getComputedStyle() + Playwright

---

## Overview
- **Section slug:** footer
- **Screenshot:** `docs/design-references/audible-authors-desktop-1440-full.png`
- **Visual order:** 7
- **Interaction model:** static (links only)
- **Complexity:** Simple
- **Dependencies:** none

---

## Computed Styles (exact values from getComputedStyle)

### footer (outer element)
- backgroundColor: transparent (inherits white from body)
- color: rgb(1, 14, 25)
- height: 120px
- padding: 0px
- display: block

### div#slim-footer-b1-widget.bc-box.bc-text-center.bc-palette-default (inner container)
- backgroundColor: transparent
- display: block
- textAlign: center

### Copyright text
- fontSize: 14px
- fontWeight: 400
- color: rgb(1, 14, 25)
- Text: "© Copyright 1997 - 2026 Audible Inc."

### Footer links (a tags)
- color: rgb(1, 14, 25)   ← same as body text (not blue)
- fontSize: 14px
- fontWeight: 400
- display: inline
- textDecoration: none (default)

---

## States & Behaviors

### Default
- All links: color rgb(1, 14, 25), no underline

### Hover
- Expected: underline or color change on hover — exact value not extracted

---

## Assets
No images or SVGs.

---

## Text Content (verbatim)
- Copyright: **© Copyright 1997 - 2026 Audible Inc.**
- Links (in order): About Audible | Careers | Conditions of Use | Privacy Notice | Interest-Based Ads | License | Cookies | Your ads privacy choices | United States (English)

---

## Responsive Behavior
- **Desktop (1440px):** Single-line centered copyright + horizontal link row
- **Tablet / Mobile:** Links may wrap to multiple lines

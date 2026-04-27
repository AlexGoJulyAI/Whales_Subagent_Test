# PromoBanner Specification — Audible Authors Page
## Extracted: 2026-04-27 from live page via getComputedStyle() + Playwright shadow DOM traversal

---

## Overview
- **Section slug:** promo-banner
- **Screenshot:** `docs/design-references/audible-authors-desktop-1440-viewport.png`
- **Visual order:** 1
- **Interaction model:** click-driven (entire banner is a link; CTA button navigates to subscription page)
- **Complexity:** Simple
- **Dependencies:** none

---

## Computed Styles (exact values from getComputedStyle)

### adbl-enhanced-upsell-banner (web component — outer)
- width: 1440px
- height: 54px
- display: block
- position: static
- fontFamily: "Audible Sans", Arial, sans-serif
- fontSize: 16px
- color: rgb(1, 14, 25)
- background: transparent (rgba(0,0,0,0))

### adbl-surface > div#container.solid.elevation-1 (shadow DOM — actual background carrier)
- backgroundColor: rgb(19, 19, 105)  ← dark navy/indigo — THE actual banner background
- display: flex (grid within inner surface)
- height: 54px

### div (layout container inside adbl-surface, shadow DOM)
- display: flex
- flexDirection: row
- justifyContent: center
- alignItems: center
- gap: 8px
- padding: 8px 24px 8px 12px
- width: 1440px
- height: 54px
- zIndex: 1

### div#default-container (inner flex row)
- display: flex
- flexDirection: row
- alignItems: center
- gap: 16px
- width: 447.148px
- height: 26px

### div#text-container.has-description.single-line (text group)
- display: flex
- flexDirection: row
- alignItems: center
- gap: 2px
- width: 431.148px
- height: 26px
- overflow: hidden

### div#title > slot (title text — slotted from light DOM p[slot="title"])
- fontSize: 18px
- fontWeight: 700
- fontFamily: "Audible Sans", Arial, sans-serif
- lineHeight: 26px
- color: rgb(255, 255, 255)   ← white text on navy

### span#divider (pipe "|" separator)
- fontSize: 14px
- fontWeight: 400
- fontFamily: "Audible Sans", Arial, sans-serif
- lineHeight: 18px
- color: rgb(255, 255, 255)
- padding: 0px 8px
- display: block
- position: relative

### div#description > slot (description text)
- fontSize: 14px
- fontWeight: 400
- fontFamily: "Audible Sans", Arial, sans-serif
- lineHeight: 18px
- color: rgb(255, 255, 255)

### adbl-button[size="sm"][variant="primary"] (CTA button — shadow DOM)
- width: 112.352px
- height: 38px
- display: block
- borderRadius: 9999px
- overflow: hidden

#### div#container.sm.primary (inside adbl-button shadow)
- backgroundColor: rgb(255, 179, 51)   ← golden yellow
- color: rgb(1, 14, 25)
- borderRadius: 9999px
- padding: 8px
- fontSize: 16px
- fontWeight: 600 (slot for text)

---

## States & Behaviors

### Default (resting)
- Banner background: `rgb(19, 19, 105)` navy
- Title: "Special Prime Offer" — white, 18px/700
- Description: "2 months free with your first Audible trial" — white, 14px/400
- Button: "Get this deal" — golden yellow `rgb(255, 179, 51)`, pill shape, 38px height

### Hover
- **Entire banner (`<a>` wrapper):** cursor: pointer
- **CTA button:** background likely darkens (transition: all computed on outer element) — exact hover color not extracted (requires JavaScript hover simulation)

---

## Assets

| Layer | z-index | Type | Source URL | Dimensions | Position |
|---|---|---|---|---|---|
| 1 | auto | none | — | — | — |

No images or background images in promo banner. Text and button only.

---

## Text Content (verbatim)
- Title slot: **Special Prime Offer**
- Description text: **2 months free with your first Audible trial**
- CTA button: **Get this deal**
- CTA link href: `https://www.audible.com/subscription/confirmation?membershipAsin=B0DBMB6PZN&promoCode=E2UU5X8XQI`

---

## Responsive Behavior
- **Desktop (1440px):** Full-width 54px banner, centered content, button right of text
- **Tablet (768px):** Same layout, wraps tighter
- **Mobile (390px):** Truncated — shows "2 mon..." text, button visible on right
- **Breakpoint:** ~480px text begins to truncate

---

## WCAG Contrast
- Banner title (#ffffff on #131369): ratio 15.85:1, threshold 3.0 (large text) — PASS
- Banner description (#ffffff on #131369): ratio 15.85:1, threshold 4.5 — PASS

# PromoBanner Specification

## Overview
- **Target file:** `src/components/PromoBanner.tsx`
- **Screenshot:** `docs/design-references/audible-section-promo-nav.png` (top dark bar)
- **Interaction model:** static

## DOM Structure
```
div.promo-banner (full width, 54px, dark navy bg)
  div.promo-inner (flex row, centered, align items center, gap 12px)
    span.promo-text-bold  "Special Prime Offer"
    span.promo-separator  " | "
    span.promo-text       "2 months free with your first Audible trial"
    a.promo-btn           "Get this deal"
```

## Computed Styles

### Container (.promo-banner)
- display: flex
- justifyContent: center
- alignItems: center
- backgroundColor: rgb(19, 19, 105)  ← EXACT — dark navy
- width: 100%
- height: 54px
- paddingLeft: 20px
- paddingRight: 20px

### Bold text ("Special Prime Offer")
- fontSize: 14px
- fontWeight: 700
- color: rgb(255, 255, 255)  ← white
- fontFamily: Inter, Arial, sans-serif

### Separator " | "
- fontSize: 14px
- fontWeight: 400
- color: rgb(255, 255, 255)
- margin: 0 4px

### Regular text ("2 months free...")
- fontSize: 14px
- fontWeight: 400
- color: rgb(255, 255, 255)

### CTA Button ("Get this deal")
- backgroundColor: rgb(255, 160, 0)  ← amber orange
- color: rgb(1, 14, 25)  ← dark text on orange
- borderRadius: 32px
- paddingTop: 6px
- paddingBottom: 6px
- paddingLeft: 14px
- paddingRight: 14px
- fontSize: 14px
- fontWeight: 700
- display: inline-flex
- alignItems: center
- cursor: pointer
- marginLeft: 16px

## States & Behaviors
- **Interaction model:** static — no scroll trigger, no hover animation required
- **Hover on button:** darken bg slightly (use hover:bg-[rgb(230,140,0)])

## Assets
- No images. Text only.

## Text Content (verbatim)
- Bold: "Special Prime Offer"
- Separator: " | "
- Normal: "2 months free with your first Audible trial"
- Button: "Get this deal"

## Responsive Behavior
- **Desktop (1440px):** single row, all content centered horizontally
- **Mobile (390px):** same single row but smaller font. Text may wrap — use `text-align: center` and `flex-wrap: wrap`
- **Breakpoint:** wrap at ~600px

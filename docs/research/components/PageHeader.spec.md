# PageHeader Specification

## Overview
- **Target file:** `src/components/PageHeader.tsx`
- **Screenshot:** `docs/design-references/audible-section-promo-nav.png` (large "Authors" heading)
- **Interaction model:** static

## DOM Structure
```
div.page-header (centered, full width)
  h1 "Authors"
```

## Computed Styles

### .page-header (container)
- display: flex
- justifyContent: center
- alignItems: center
- paddingTop: 24px
- paddingBottom: 24px
- width: 100%

### h1
- fontSize: 48px
- fontWeight: 700
- lineHeight: 52px
- color: rgb(1, 14, 25)
- fontFamily: Inter, Arial, sans-serif
- textAlign: center
- margin: 0

## States & Behaviors
- **Interaction model:** static — no animations

## Text Content (verbatim)
- "Authors"

## Responsive Behavior
- **Desktop (1440px):** 48px centered
- **Mobile (390px):** reduce to 32px or 28px, still centered

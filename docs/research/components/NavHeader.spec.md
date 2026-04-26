# NavHeader Specification

## Overview
- **Target file:** `src/components/NavHeader.tsx`
- **Screenshot:** `docs/design-references/audible-section-promo-nav.png` (white nav below promo bar)
- **Interaction model:** static (no sticky behavior)

## DOM Structure
```
header.nav-header (full width, white bg, ~136px tall)
  div.nav-row-top (flex, space-between, align center, ~54px tall, padding 0 24px)
    a.nav-logo (href="/")
      img (Audible SVG logo — use SVG component)
    div.nav-actions (flex row, gap 16px, align center)
      a.nav-help "Help"
      button.nav-language (globe icon + "English – USD")
      a.nav-signin (orange pill button "Sign in")

  div.nav-row-bottom (flex, space-between, align center, ~82px tall, padding 0 24px)
    a.nav-browse (flex, gap 6px, align center)
      icon (box/play icon)
      span "Browse"
    div.nav-search (flex, align center, border 1px solid rgb(209,214,215), borderRadius 4px)
      input[type=text] placeholder="Find your next great listen"
      button.search-btn (magnifying glass icon)
```

## Computed Styles

### .nav-header (outer container)
- backgroundColor: rgb(255, 255, 255)
- width: 100%
- height: 136px (two rows: 54px top + 82px bottom)
- borderBottom: 0px (no visible divider between nav and content)

### .nav-row-top
- display: flex
- justifyContent: space-between
- alignItems: center
- height: 54px
- paddingLeft: 24px
- paddingRight: 24px

### .nav-logo (anchor)
- display: block
- width: 140px
- height: 54px
- (Audible logo SVG inside — orange flame mark + "audible" wordmark + "an amazon company")

### .nav-help (text link)
- fontSize: 16px
- fontWeight: 400
- color: rgb(1, 14, 25)
- cursor: pointer

### .nav-language (globe + text)
- display: flex
- alignItems: center
- gap: 4px
- fontSize: 16px
- color: rgb(1, 14, 25)
- cursor: pointer

### .nav-signin (orange pill)
- backgroundColor: rgb(255, 160, 0)
- color: rgb(1, 14, 25)
- fontWeight: 700
- fontSize: 16px
- borderRadius: 9999px
- paddingLeft: 16px
- paddingRight: 16px
- height: 42px
- display: flex
- alignItems: center
- cursor: pointer

### .nav-row-bottom
- display: flex
- justifyContent: space-between
- alignItems: center
- height: 82px
- paddingLeft: 24px
- paddingRight: 24px

### .nav-browse (link)
- display: flex
- alignItems: center
- gap: 6px
- fontSize: 16px
- fontWeight: 600
- color: rgb(1, 14, 25)
- cursor: pointer

### .nav-search (search bar container)
- display: flex
- alignItems: center
- width: 480px
- height: 42px
- border: 1px solid rgb(209, 214, 215)
- borderRadius: 4px
- overflow: hidden

### .nav-search input
- flex: 1
- paddingLeft: 12px
- paddingRight: 12px
- fontSize: 14px
- color: rgb(1, 14, 25)
- border: none
- outline: none
- placeholder color: rgb(130, 130, 130)

### .search-btn
- width: 42px
- height: 42px
- backgroundColor: rgb(255, 160, 0)
- display: flex
- alignItems: center
- justifyContent: center
- cursor: pointer

## States & Behaviors
- **Sticky behavior:** NONE — `position: static`, scrolls away with page
- **Hover on nav links:** underline
- **Hover on Sign In / search button:** darken background slightly

## Assets
- Audible logo: `public/seo/audible-logo.svg` (download and save, or inline SVG)
- Globe icon: use Lucide `Globe` icon (16px)
- Browse icon: use Lucide `Play` or `LayoutGrid` (16px)
- Search icon: use Lucide `Search` (18px)

## Text Content (verbatim)
- Logo alt: "audible, an amazon company"
- Help link: "Help"
- Language: "English – USD"
- Sign in: "Sign in"
- Browse: "Browse"
- Search placeholder: "Find your next great listen"

## Responsive Behavior
- **Desktop (1440px):** two-row layout as described
- **Mobile (390px):** logo + hamburger icon only, search collapsed
- **Breakpoint:** mobile layout at ~768px

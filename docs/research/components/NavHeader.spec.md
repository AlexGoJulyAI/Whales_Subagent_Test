# NavHeader Specification — Audible Authors Page
## Extracted: 2026-04-27 from live page via getComputedStyle() + Playwright shadow DOM traversal

---

## Overview
- **Section slug:** nav-header
- **Screenshot:** `docs/design-references/audible-authors-desktop-1440-viewport.png`
- **Visual order:** 2
- **Interaction model:** click-driven (Browse button toggles mega-menu panel; Sign In is a link)
- **Complexity:** Moderate (4 sub-components, click-driven dropdown)
- **Dependencies:** none

---

## Computed Styles (exact values from getComputedStyle)

### adbl-nav-header (web component — outer)
- width: 1440px
- height: 136px
- position: static  ← NOT sticky; scrolls away with page
- backgroundColor: transparent (shadow DOM header carries the bg)
- display: block

### header (shadow DOM root element)
- backgroundColor: rgb(255, 255, 255)
- color: rgb(1, 14, 25)
- height: 136px
- display: block

### div#container (shadow DOM — main flex column)
- display: flex
- flexDirection: column (implied: top-container above bottom-container)
- height: 120px

### div#top-container (logo + utility nav row)
- display: flex
- height: 56px
- backgroundColor: transparent

### div#logo-container
- display: block
- height: 56px

#### a.bc-pub-block.ui-it-header-logo[slot="logo"] (Audible logo link)
- display: block
- height: 54px
- color: rgb(14, 91, 155)
- fontWeight: 600

#### SVG logo dimensions: width="140" height="55px" viewBox="0 0 140 55"
- Logo is an SVG inline, role="img", aria-label="audible, an amazon company"

### nav#utility-navigation (top-right utility nav)
- display: flex
- height: 56px
- alignItems: center (inferred from layout)

#### adbl-nav-link[slot="utility"] — "Help"
- display: block
- height: 38px
- color: rgb(1, 14, 25)
- fontSize: 16px
- fontWeight: 400

#### adbl-nav-menu[slot="utility"] — Language/Currency selector ("English – USD")
- display: block
- height: 48px
- color: rgb(1, 14, 25)
- fontSize: 16px

#### adbl-button.ui-it-sign-in-link[slot="utility"] — "Sign in"
- display: block
- height: 42px
- width: (computed from shadow inner: a.md.primary)

##### a.md.primary (adbl-button shadow DOM)
- backgroundColor: rgb(255, 160, 0)   ← amber/orange pill
- color: rgb(1, 14, 25)
- fontSize: 16px
- fontWeight: 400 (slot text at 600)
- borderRadius: 9999px
- padding: 8px 12px
- height: 42px
- border: 0px none

### div#bottom-container (Browse button + search row)
- display: flex
- height: 56px
- position: relative

### nav#main-navigation (Browse button area)
- display: flex
- height: 56px

#### adbl-nav-mega-menu (Browse toggle)
- display: block
- height: 48px
- color: rgb(74, 102, 135)   ← blue-grey for "Browse" text

##### button (shadow DOM — Browse toggle button)
- display: flex
- height: 48px
- backgroundColor: transparent
- color: rgb(74, 102, 135)

##### adbl-icon[name="discover"] (Browse icon)
- display: flex
- height: 24px
- color: rgb(74, 102, 135)

##### div#indicator (active underline bar, shown when panel open)
- backgroundColor: rgb(20, 121, 207)   ← Audible blue
- height: 4px
- display: block

##### div.panel (mega-menu dropdown panel)
- backgroundColor: rgb(255, 255, 255)
- height: 320px  (when open)
- display: grid
- position: absolute (implied by overlay behavior)

### div#search-container
- display: block
- height: 56px

#### input.bc-input (search text input)
- backgroundColor: rgb(255, 255, 255)
- border: 1px solid rgb(118, 144, 178)
- borderRadius: 2px
- height: 40px
- fontSize: 13px
- padding: 3px 36px 3px 16px
- color: rgb(1, 14, 25)
- placeholder: "Find your next great listen"

---

## States & Behaviors

### Default (panel closed)
- Browse button: color `rgb(74, 102, 135)`, no underline indicator
- Mega-menu panel: hidden (height: 0 / display: none)

### Browse panel open (click-driven)
- **Trigger:** click Browse button
- **State B:** Panel `.panel` visible, `display: grid`, height: 320px, backgroundColor: rgb(255, 255, 255)
- **Indicator bar:** `div#indicator` appears, backgroundColor: `rgb(20, 121, 207)`, height: 4px
- **Panel content (three-column grid):**
  - Col 1 — Get Started: Audiobooks, Podcasts, Audible Originals, Latino and Hispanic voices, All categories, Plans & Pricing
  - Col 2 — Popular Lists: Bestsellers, Coming Soon, New Releases, Best of the Year, Best of #BookTok
  - Col 3 — Explore Audible: Plus Catalog, Gifts, Help Center, About Audible, Blog, Sales & Deals, Accessibility
- **Column header color:** rgb(20, 121, 207) (Audible blue) for "Get Started", "Popular Lists", "Explore Audible"
- **Link color in panel:** rgb(1, 14, 25) (near-black)
- **Transition:** not explicitly measured — appears instantaneous

### adbl-nav-link hover
- **Trigger:** hover on nav link
- **Changed:** cursor: pointer, likely underline appears

---

## Assets

| Layer | z-index | Type | Source URL | Dimensions | Position |
|---|---|---|---|---|---|
| 1 | auto | SVG (inline) | N/A (inline logo) | 140×55px | static |

No `<img>` tags. Logo is inline SVG. No background images.

---

## Text Content (verbatim)

**Utility nav:** Help | English – USD | Sign in

**Browse button:** Browse

**Browse panel — Get Started:** Audiobooks | Podcasts | Audible Originals | Latino and Hispanic voices | All categories | Plans & Pricing

**Browse panel — Popular Lists:** Bestsellers | Coming Soon | New Releases | Best of the Year | Best of #BookTok

**Browse panel — Explore Audible:** Plus Catalog | Gifts | Help Center | About Audible | Blog | Sales & Deals | Accessibility

**Search placeholder:** Find your next great listen

---

## Responsive Behavior
- **Desktop (1440px):** Full layout — logo left, utility nav right (Help, English–USD, Sign In), Browse + search below
- **Tablet (768px):** Same layout; Sign In button may compress; Help visible
- **Mobile (390px):** Utility nav (Help, Sign In) hidden; only logo + Browse visible; search field visible
- **Breakpoint:** ~480px utility items collapse

# Audible Authors Page — Page Topology

## URL
`https://www.audible.com/tag/genre/Authors-Audiobooks/...`

## Design Tokens
- **Font**: "Audible Sans" (proprietary) → use **Inter** from Google Fonts as substitute
- **Body bg**: `rgb(255, 255, 255)` white
- **Body text**: `rgb(1, 14, 25)` near-black
- **Link blue**: `rgb(14, 91, 155)`
- **Orange (buttons + star fill)**: `rgb(255, 160, 0)`
- **Promo banner bg**: `rgb(19, 19, 105)` dark navy
- **Border/divider**: `rgb(209, 214, 215)` light gray
- **Divider line**: `rgba(1, 14, 25, 0.15)` (thin 1px separator between list items)
- **Secondary bg (footer)**: `rgb(241, 247, 254)` light blue
- **Font sizes**: body 14px/20px, nav 16px/24px, h1 48px/52px

## Overall Layout
- Full-width white page (`background: #ffffff`)
- Content max-width: **1000px** centered (product list, sort bar)
- Nav header: full 1440px width

## Section Order (top to bottom)

### 1. PromoBanner
- Height: 54px, full width
- Background: `rgb(19, 19, 105)` dark navy
- Content: white bold "Special Prime Offer" + " | 2 months free with your first Audible trial" + orange "Get this deal" pill button
- Button: `rgb(255, 160, 0)` bg, `rgb(1, 14, 25)` text, 32px borderRadius, ~120px width
- Interaction: static

### 2. NavHeader
- Height: 136px, full width, white bg
- Row 1 (top): Audible logo SVG (140px × 54px, left), Help link + language selector + orange Sign In pill (right)
- Row 2 (bottom): Browse link with box icon (left), large search input "Find your next great listen" + magnifying glass button (right)
- Sign In button: orange `rgb(255, 160, 0)`, borderRadius 9999px (pill), 87px wide, 42px tall
- Interaction: static (no sticky)

### 3. PageHeader
- `<h1>Authors</h1>` — 48px, fontWeight 700, color `rgb(1,14,25)`, centered
- lineHeight: 52px
- Padding: ~24px top + bottom

### 4. CategoryChips
- 9 chips in 2 rows, flex-wrap centered
- Row 1: Biographical Fiction | Women | Artists, Architects & Photographers | Memoirs, Diaries & Correspondence
- Row 2: Collections & Anthologies | Musician | Writing & Publishing | Biographies | Literary Fiction
- Each chip: white bg, 1px solid `rgb(209,214,215)` border, ~20px borderRadius, ~10px 16px padding, 14px bold text, 42px height
- Group padding: 8px top/bottom
- Interaction: static plain links

### 5. SortBar (top)
- 1000px max-width centered, height 58px
- Left col: "1 - 20 of 500 results" in secondary color
- Right col: pagination links
- Interaction: click-driven

### 6. ProductList
- 1000px max-width centered
- 20 AudiobookItem cards, each separated by 1px solid `rgba(1,14,25,0.15)` divider (margin 20px top/bottom)
- Each item ~330px tall
- Item structure (3 columns):
  - **Col 1 (bc-col-4, ~256px)**: Cover image (square, ~232px), "▶ Preview" link below
  - **Col 2 (bc-col-7, ~448px)**: Title (blue h3 link), subtitle, By: author link, Narrated by: narrator link, Length, Release date, Language, Star rating + rating count, Description (2-3 lines truncated)
  - **Col 3 (bc-col-3, ~256px)**: Price text, "Try Standard free" orange pill button

### 7. SortBar (bottom)
- Same 1000px max-width, height 58px
- Left: "Show [20▾] items per page"
- Right: `< 1  2  …  25 >`
- Current page (1) is plain text (not a link)
- Interaction: click-driven

### 8. Footer
- Full width, background `rgb(241,247,254)` light blue
- Content: "© Copyright 1997 - 2026 Audible Inc." + nav links
- Padding: large (box-padding-large)

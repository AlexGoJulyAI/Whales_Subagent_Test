# ProductList + SortBar + Pagination Specification

## Overview
- **Target file:** `src/components/ProductList.tsx`
- **Screenshot:** `docs/design-references/audible-pagination-footer.png` (sort bar + pagination at bottom)
- **Interaction model:** static + click-driven pagination

## DOM Structure
```
section.product-list-section (1000px max-width, centered)
  SortBar (top — shows result count + pagination)
  ol.product-list
    AudiobookItem × 20
  SortBar (bottom — shows "Show N items" dropdown + pagination)

SortBar structure:
  div.sort-bar (flex, space-between, align center, 58px height)
    div.sort-left
      [top bar]: span "1 - 20 of 500 results"
      [bottom bar]: span "Show " + select[20/30] + span " items per page"
    div.sort-right
      nav.pagination (flex, align center, gap 4px)
        a.page-btn "‹" (previous)
        span.page-current "1" (current, bold, no link)
        a.page-link "2"
        span.page-ellipsis "..."
        a.page-link "25"
        a.page-btn "›" (next)
```

## Computed Styles

### .product-list-section (outer wrapper)
- maxWidth: 1000px
- margin: 0 auto
- paddingLeft: 20px
- paddingRight: 20px

### .sort-bar
- display: flex
- flexDirection: row
- justifyContent: space-between
- alignItems: center
- height: 58px
- borderBottom: 1px solid rgba(1, 14, 25, 0.15)  ← top sort bar only

### .sort-left span (result count)
- fontSize: 14px
- color: rgb(90, 100, 110)  ← secondary/muted color (bc-color-secondary)
- fontWeight: 400

### .sort-left select (items per page dropdown)
- fontSize: 14px
- color: rgb(1, 14, 25)
- border: 1px solid rgb(209, 214, 215)
- borderRadius: 4px
- padding: 2px 8px
- cursor: pointer
- marginLeft: 4px
- marginRight: 4px

### ol.product-list
- listStyle: none
- padding: 0
- margin: 0

### .pagination (nav)
- display: flex
- alignItems: center
- gap: 4px

### .page-btn (prev/next arrow)
- display: flex
- alignItems: center
- justifyContent: center
- width: 32px
- height: 32px
- fontSize: 16px
- color: rgb(14, 91, 155)  ← blue link
- textDecoration: none
- cursor: pointer

### .page-current (active page number — plain text)
- fontSize: 14px
- fontWeight: 700
- color: rgb(1, 14, 25)
- padding: 4px 8px

### .page-link (clickable page number)
- fontSize: 14px
- color: rgb(14, 91, 155)
- textDecoration: none
- padding: 4px 8px
- cursor: pointer

### .page-link:hover
- textDecoration: underline

### .page-ellipsis
- fontSize: 14px
- color: rgb(1, 14, 25)
- padding: 4px 4px

## States & Behaviors
- **Top SortBar**: shows "1 - 20 of 500 results" on left, pagination numbers on right
- **Bottom SortBar**: shows "Show [20▾] items per page" on left, same pagination on right
- **Pagination current page**: page 1 is shown as plain bold text (not a link)
- **Pagination links**: 2, …, 25 are blue links
- **Interaction**: click links navigate (use `href="#"` in demo)
- **Dropdown options**: value="20" (default), value="30"

## Result Count Text (verbatim)
- Top: "1 - 20 of 500 results"
- Bottom left: "Show " + dropdown + " items per page"

## Pagination State (verbatim from page)
- `<` (back arrow, href="#")
- `1` (current, bold non-link)
- `2` (blue link, href="#")
- `…`
- `25` (blue link, href="#")
- `>` (forward arrow, href="#")

## Responsive Behavior
- **Desktop (1440px):** sort bar as described
- **Mobile (390px):** result count on top, pagination below (stack vertically)

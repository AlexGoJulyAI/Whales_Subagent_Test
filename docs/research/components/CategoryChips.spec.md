# CategoryChips Specification

## Overview
- **Target file:** `src/components/CategoryChips.tsx`
- **Screenshot:** `docs/design-references/audible-section-promo-nav.png` (2 rows of chips below "Authors")
- **Interaction model:** static (plain anchor links)

## DOM Structure
```
div.category-chips (centered, flex-wrap)
  a.chip href="/tag/world_tree-publisher_assigned/Biographical-Fiction-Audiobooks/..."
    span "Biographical Fiction"
  a.chip href="..."
    span "Women"
  ... (9 chips total)
```

## Computed Styles

### .category-chips (container)
- display: flex
- flexWrap: wrap
- justifyContent: center
- gap: 8px
- paddingTop: 8px
- paddingBottom: 24px
- maxWidth: 900px
- margin: 0 auto

### .chip (each anchor)
- display: inline-flex
- alignItems: center
- justifyContent: center
- height: 42px
- paddingLeft: 16px
- paddingRight: 16px
- backgroundColor: rgb(255, 255, 255)  ← white
- border: 1px solid rgb(209, 214, 215)  ← light gray border
- borderRadius: 20px  ← rounded (estimated from screenshot — pill-ish)
- fontSize: 14px
- fontWeight: 700
- color: rgb(1, 14, 25)
- cursor: pointer
- textDecoration: none
- whiteSpace: nowrap

### .chip hover
- borderColor: rgb(1, 14, 25)  ← darken border on hover
- transition: border-color 0.1s ease

## States & Behaviors
- **Interaction model:** static — all chips are plain anchor links
- **No active/selected state** visible in current page
- **Hover:** border darkens from `rgb(209,214,215)` to `rgb(1,14,25)`

## Chip Data (verbatim text + hrefs)
1. "Biographical Fiction" → `/tag/world_tree-publisher_assigned/Biographical-Fiction-Audiobooks/adbl_rec_tag_4-21-2234?...`
2. "Women" → (sub-category link)
3. "Artists, Architects & Photographers" → (sub-category link)
4. "Memoirs, Diaries & Correspondence" → (sub-category link)
5. "Collections & Anthologies" → (sub-category link)
6. "Musician" → (sub-category link)
7. "Writing & Publishing" → (sub-category link)
8. "Biographies" → (sub-category link)
9. "Literary Fiction" → (sub-category link)

Use `#` as href for the demo clone.

## Responsive Behavior
- **Desktop (1440px):** 2 rows of 4-5 chips each, flex-wrap centered
- **Mobile (390px):** 3+ rows, flex-wrap, still centered

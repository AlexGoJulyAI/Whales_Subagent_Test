# StarRating Specification

## Overview
- **Target file:** `src/components/StarRating.tsx`
- **Screenshot:** `docs/design-references/audible-scrolled-600.png` (star ratings visible on list items)
- **Interaction model:** static display component (props: rating number 0-5, reviewCount)

## DOM Structure
```
div.star-rating (flex row, align center, gap 4px)
  span.rating-number "4.6"
  div.stars (flex row, 5 star icons)
    [filled star] × floor(rating)
    [half star?] × (rating % 1 >= 0.5 ? 1 : 0)
    [empty star] × remaining
  span.review-count "1,771 ratings"
```

## Computed Styles

### .star-rating (container)
- display: flex
- alignItems: center
- gap: 4px
- marginTop: 4px
- marginBottom: 4px

### .rating-number
- fontSize: 14px
- fontWeight: 700
- color: rgb(1, 14, 25)

### .stars (container)
- display: flex
- gap: 1px

### Filled star icon
- The original uses CSS background icons (`bc-icon-star-fill`)
- **Implement as**: `★` Unicode OR small SVG star
- color: rgb(255, 160, 0)  ← amber orange — EXACT from getComputedStyle
- fontSize: 14px

### Empty star icon
- color: rgb(1, 14, 25)  ← dark fill for outline effect
- fontSize: 14px

### Half star icon  
- Use a half-filled approach: left half orange, right half dark
- Or simplify: round to nearest whole/half, use full and half unicode chars

### .review-count
- fontSize: 14px
- color: rgb(1, 14, 25)
- marginLeft: 4px

## Rendering Logic
```
rating = 4.6
→ 4 full stars (⭐⭐⭐⭐)
→ 1 half star (⭐ left half orange)
→ 0 empty stars

rating = 4.4
→ 4 full stars
→ 1 half star (barely)
→ 0 empty

Simplification: round to nearest 0.5
4.6 → 4.5 → 4 full + 1 half
4.4 → 4.5 → 4 full + 1 half
4.8 → 5 full
```

## Example Usage
```tsx
<StarRating rating={4.6} reviewCount={1771} />
<StarRating rating={4.4} reviewCount={10604} />
```

## States & Behaviors
- Static display only. No interactivity.
- No hover states.

## Responsive Behavior
- Same at all breakpoints (14px icons, flex row)

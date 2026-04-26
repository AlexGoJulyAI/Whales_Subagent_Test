# AudiobookItem Specification

## Overview
- **Target file:** `src/components/AudiobookItem.tsx`
- **Screenshot:** `docs/design-references/audible-scrolled-600.png`
- **Interaction model:** static

## DOM Structure
```
li.audiobook-item (1000px wide, list-item display)
  div.item-row (3-column grid)
    div.col-image (256px wide)
      a.cover-link href={bookUrl}
        img.cover src={coverUrl} alt={altText} (232px × 232px square)
      a.preview-link href="#"
        span "▶ Preview"

    div.col-metadata (448px wide)
      h3.title
        a href={bookUrl} "What Remains"
      p.subtitle "A Memoir of Fate, Friendship, and Love"
      p.by-line
        span "By: "
        a href={authorUrl} "Carole Radziwill"
      p.narrated-by
        span "Narrated by: "
        a href={narratorUrl} "Carole Radziwill"
      p.length "Length: 5 hrs and 57 mins"
      p.release-date "Release date: 09-26-05"
      p.language "Language: English"
      StarRating rating={4.6} reviewCount={1771}
      p.description "A stunning, tragic memoir about..."

    div.col-price (256px wide)
      p.price "$14.99 or free with 30-day trial"
      a.buy-btn href={buyUrl}
        "Try Standard free"

  div.divider (full width separator)
```

## Computed Styles

### li.audiobook-item
- display: list-item (use `li` element)
- width: 1000px  ← (inside a 1000px max-width container)
- padding: 0

### .item-row (inner flex container)
- display: flex
- flexDirection: row
- alignItems: flex-start
- paddingTop: 20px
- paddingBottom: 20px

### .col-image
- width: 232px
- minWidth: 232px
- paddingRight: 24px

### .cover-link img
- width: 232px
- height: 232px
- objectFit: cover
- display: block

### .preview-link (below image)
- display: flex
- alignItems: center
- gap: 4px
- fontSize: 14px
- color: rgb(1, 14, 25)
- marginTop: 8px
- textDecoration: none
- cursor: pointer

### .col-metadata
- flex: 1
- paddingRight: 24px

### h3.title a (book title link)
- fontSize: 18px   ← larger than body
- fontWeight: 700
- color: rgb(14, 91, 155)  ← EXACT blue link color
- textDecoration: none
- lineHeight: 24px

### h3.title a:hover
- textDecoration: underline

### p.subtitle
- fontSize: 14px
- color: rgb(1, 14, 25)
- margin: 4px 0

### p.by-line, p.narrated-by
- fontSize: 14px
- color: rgb(1, 14, 25)
- margin: 2px 0

### p.by-line a, p.narrated-by a (author/narrator links)
- color: rgb(14, 91, 155)
- textDecoration: none
- fontWeight: 400

### p.length, p.release-date, p.language
- fontSize: 14px
- color: rgb(1, 14, 25)
- margin: 2px 0

### p.description
- fontSize: 14px
- color: rgb(1, 14, 25)
- marginTop: 8px
- lineHeight: 20px
- display: -webkit-box
- -webkit-line-clamp: 3
- -webkit-box-orient: vertical
- overflow: hidden

### .col-price
- width: 232px
- minWidth: 232px
- paddingTop: 4px

### p.price
- fontSize: 14px
- color: rgb(1, 14, 25)
- marginBottom: 10px

### a.buy-btn (orange pill button)
- display: flex
- alignItems: center
- justifyContent: center
- width: 232px
- height: 28px
- backgroundColor: rgb(255, 160, 0)  ← EXACT orange
- color: rgb(1, 14, 25)  ← EXACT dark text
- borderRadius: 32px  ← EXACT
- fontSize: 14px
- fontWeight: 400
- textDecoration: none
- cursor: pointer
- marginTop: 10px

### a.buy-btn:hover
- backgroundColor: rgb(220, 136, 0)  ← darken by ~15%

### .divider
- height: 1px
- backgroundColor: rgba(1, 14, 25, 0.15)  ← EXACT divider color
- margin: 0
- (The margin-top 20px + margin-bottom 20px is on the col-price div)

## TypeScript Interface
```ts
interface AudiobookItemProps {
  coverUrl: string;
  coverAlt: string;
  bookUrl: string;
  title: string;
  subtitle?: string;
  authorName: string;
  authorUrl: string;
  narratorNames: string[];
  narratorUrls: string[];
  length: string;
  releaseDate: string;
  language: string;
  rating: number;
  reviewCount: number;
  description: string;
  price: string;
  buyUrl: string;
}
```

## States & Behaviors
- **Interaction model:** static
- **Hover on title link:** underline
- **Hover on author/narrator links:** underline
- **Hover on buy button:** darker orange background

## Assets
- Cover images: `public/images/covers/<filename>.jpg`
- All 20 cover images from Amazon CDN (see download script)

## Responsive Behavior
- **Desktop (1440px):** 3-column flex layout as described
- **Tablet (768px):** same 3-column but cover reduces
- **Mobile (390px):** stack vertically: image full-width top, then metadata, then price+button
- **Breakpoint:** stack below 640px

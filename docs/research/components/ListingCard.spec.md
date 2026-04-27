# ListingCard Specification — Airbnb SF Search Results
## Extracted: 2026-04-26 from live page via getComputedStyle() + DOM inspection

---

## Structure

```
[Listing card — div wrapper, no border-radius, transparent bg]
  ├── [Image area] 307×292px
  │     ├── <img> 307×292px, border-radius:12px, object-fit:cover
  │     ├── [Carousel dots] bottom-center of image (pagination indicators)
  │     ├── [◀ ▶ Navigation arrows] appear on hover, left/right of image
  │     ├── [Guest favorite badge] absolute, top-left over image
  │     │     ├── Platform asset icon 16×16px
  │     │     └── Text "Guest favorite" 14px/500
  │     └── [♥ Wishlist button] 32×32px circle, top-right over image
  │
  └── [Text area] below image
        ├── [Row 1] Listing name — 14–16px/500/rgb(34,34,34)
        │           Rating ⭐ + score — 12px/400 (right-aligned)
        ├── [Row 2] Property details — type · beds · baths — 14px/400/rgb(34,34,34)
        ├── [Row 3] Dates / availability — 14px/400/muted
        └── [Row 4] Price — "$XXX night" 14px/500 · "· $X total" muted
```

---

## Computed Styles

### Card container (image div)
| Property | Value |
|---|---|
| background-color | rgba(0,0,0,0) — transparent |
| color | rgb(34,34,34) |
| width | 307.195px |
| height | 291.828px |
| border-radius | 0px (no border-radius on container) |
| box-shadow | none |
| position | static |

### Listing image `<img>`
| Property | Value |
|---|---|
| width | 307px |
| height | 292px |
| border-radius | 12px (applied to image itself) |
| object-fit | cover |
| loading | eager (first ~3) / lazy (rest) |
| src | `https://a0.muscache.com/im/pictures/...?im_w=720` |

### "Guest favorite" badge container
| Property | Value |
|---|---|
| display | inline-flex |
| flex-direction | row |
| align-items | center |
| gap | 6px |
| background-color | rgba(0,0,0,0) — transparent (white comes from ::before or child) |
| border | 1px solid rgb(255,255,255) — white border |
| border-radius | 40px |
| padding | 4px 10px |
| height | 28px |
| width | ~118px |
| box-shadow | rgba(0,0,0,0.16) 0px 4px 10px 0px |
| position | static (parent div positions it absolutely) |

### "Guest favorite" badge text
| Property | Value |
|---|---|
| font-size | 14px |
| font-weight | 500 |
| color | rgb(0,0,0) |
| line-height | 20.02px |

### "Guest favorite" icon
| Property | Value |
|---|---|
| width | 16px |
| height | 16px |
| src | `https://a0.muscache.com/AirbnbPlatformAssets-GuestFavorite/original/4d090f93...` |

### ♥ Wishlist button
| Property | Value |
|---|---|
| border-radius | 50% |
| width | 32px |
| height | 32px |
| display | inline-flex |
| align-items | center |
| justify-content | center |
| background-color | rgba(0,0,0,0) (transparent with hover state) |
| color | rgb(34,34,34) |

---

## Grid Layout

| Property | Value |
|---|---|
| Grid columns | 2 (each ~307px) |
| Column gap | ~24px |
| Row gap | ~24px |
| Container padding | 24px left/right |
| Total panel width | 734px |
| Visible cards | 19 (then infinite scroll / pagination) |

---

## Text Content (first card sample)
- Name: "Room in San Francisco" (Airbnb listing)
- Type: "1 queen bed · 1 bath" type details
- Rating: ⭐ 4.96 (24)
- Price: From $192 / night

---

## Carousel Behavior
- Multiple images per listing (4–8 typically)
- Left/right nav arrows appear on hover
- Dot indicators at bottom of image
- Transition: slide (CSS transform)

---

## New Feature: Safety Badge
A letter grade badge (A, B, C, D) will overlay the bottom-left of the card image (or bottom of the text area), indicating the neighborhood safety score. Expandable on the listing detail page.

Visual spec (to be designed):
- Letter grade: A–D color-coded (A=green, B=yellow-green, C=orange, D=red)
- Small circular badge, ~24px, positioned bottom-left of image
- Does not obscure the "Guest favorite" badge (different corner)

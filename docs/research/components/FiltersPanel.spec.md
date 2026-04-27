# FiltersPanel Specification — Airbnb SF Search Results
## Extracted: 2026-04-26 from live page via click + screenshot

---

## Trigger

- **Trigger:** Click "Filters" button in sub-header row
- **Dismissed:** Press Escape or click ✕ close button

---

## Structure

```
[Modal overlay — full-screen dialog]
  ├── [Title bar]
  │     ├── ✕ Close button — top-left
  │     └── "Filters" heading — centered, 16px/600
  │
  ├── [Section: Recommended for you]
  │     ├── Label "Recommended for you" — 14px/500
  │     └── [Chip grid — horizontal scroll]
  │           ├── Washer icon chip
  │           ├── Self check-in chip
  │           ├── Instant Book chip
  │           └── 1+ bathrooms chip (+ more)
  │
  ├── [Section: Type of place]
  │     ├── Label "Type of place"
  │     └── [Segmented control] Any | Home | Room | Hotel
  │
  ├── [Section: Price range]
  │     ├── Label "Price range" + sub-label "Trip price, includes all fees"
  │     ├── [Histogram] Bar chart of listing density by price (coral/pink bars)
  │     ├── [Dual slider] min: $40, max: $3,600+
  │     └── [Price labels] "$40" left · "$3,600+" right
  │
  └── [CTA row — sticky bottom]
        ├── "Clear all" — text link, left
        └── "Show 1,000+ places" — black full-width pill button
```

---

## Computed Styles (from screenshot + visual inspection)

### Modal overlay container
| Property | Value |
|---|---|
| position | fixed |
| z-index | high (above all content) |
| backdrop | semi-transparent scrim |
| background-color | rgb(255,255,255) — white |
| border-radius | 12px (modal card) |
| box-shadow | 0 2px 16px rgba(0,0,0,0.12) |
| width | ~630px (centered) |
| max-height | ~90vh |
| overflow-y | scroll |

### Title bar
| Property | Value |
|---|---|
| display | flex |
| align-items | center |
| justify-content | center |
| padding | 16px 24px |
| border-bottom | 1px solid rgb(235,235,235) |
| font-size | 16px |
| font-weight | 600 |

### "Type of place" segmented control
| Property | Value |
|---|---|
| layout | 4-segment pill group |
| selected segment | "Any" (filled: black bg, white text) |
| unselected segment | white bg, border rgb(221,221,221) |
| border-radius | 24px |
| font-size | 14px |

### Price range histogram
| Property | Value |
|---|---|
| bar color | rgb(255, 56, 92) — Airbnb coral |
| height | ~60px |
| width | full modal width minus padding |

### Dual-handle slider
| Property | Value |
|---|---|
| track color | rgb(221,221,221) — gray |
| active track color | rgb(34,34,34) — charcoal |
| handle | white circle with shadow |

### CTA button "Show 1,000+ places"
| Property | Value |
|---|---|
| background-color | rgb(34,34,34) — charcoal/black |
| color | rgb(255,255,255) |
| border-radius | 8px |
| font-size | 16px |
| font-weight | 600 |
| width | ~100% of modal content area |
| height | ~48px |

### "Clear all" link
| Property | Value |
|---|---|
| font-size | 14px |
| font-weight | 500 |
| color | rgb(34,34,34) |
| text-decoration | underline |

---

## Recommended Chips

Icon chips with labels — extracted visually from screenshot:
1. 🧺 Washer
2. 🔑 Self check-in
3. ⚡ Instant Book
4. 🛁 1+ bathrooms
(+ more scrollable off-screen)

Each chip:
| Property | Value |
|---|---|
| border | 1px solid rgb(221,221,221) |
| border-radius | 8px |
| padding | 12px 16px |
| icon size | 24px |
| label | 12px/400 below icon |
| selected state | border rgb(34,34,34) + bg tint |

---

## New Feature: Safety Filter Section

A new section "Safety level" will be added between "Recommended for you" and "Type of place":

```
[Section: Safety level]
  ├── Label "Safety level"
  └── [Tier selector — 4 options, radio-style]
        ├── ● Very Safe — green indicator
        ├── ● Safe — yellow-green indicator
        ├── ● Average — orange indicator
        └── ○ All neighborhoods (default)
```

When a tier is selected:
- The map overlay activates showing neighborhood heatmap (green→yellow→red)
- Listings outside the selected tier are dimmed or hidden
- The "Filters" pill in the sub-header shows active state (dark border)

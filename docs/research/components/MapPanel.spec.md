# MapPanel Specification — Airbnb SF Search Results
## Extracted: 2026-04-26 from live page via getComputedStyle() + screenshot

---

## Structure

```
[Map panel — sticky right column]
  ├── [Google Maps embed] full-width × full-height
  │     ├── Map tiles (Google Maps API)
  │     ├── [Price markers] × 18 — <button> elements over map
  │     │     └── Each: "$XXX" pill, white bg, shadow, charcoal text
  │     └── [Map controls] ⊕/⊖ zoom, satellite toggle (bottom-right)
  └── [Optional: listing preview popup] appears on price marker click
```

---

## Computed Styles — Map Container

| Property | Value |
|---|---|
| Element | `div.m1arl239` |
| width | 658px |
| height | 684px (viewport height minus header) |
| position | sticky |
| top | 0 (or header height offset) |
| display | block |
| overflow | hidden |
| background-color | rgba(0,0,0,0) — map tiles fill it |

---

## Price Marker Buttons

### Button element (the clickable trigger)
| Property | Value |
|---|---|
| background-color | rgba(0,0,0,0) — transparent container |
| color | rgb(34,34,34) |
| font-family | "Airbnb Cereal VF", Circular, sans-serif |
| font-size | 15px |
| font-weight | 500 |
| border-radius | 4px |
| width | ~35px |
| height | ~20px |
| border | none |
| box-shadow | none (shadow on inner wrapper) |
| position | static (positioned by Google Maps API) |

### Visual pill appearance (from screenshots)
The white pill appearance is rendered by Google Maps overlay styling:
| Property | Visual value |
|---|---|
| background-color | rgb(255,255,255) — white |
| border-radius | ~20px (full pill) |
| padding | ~5px 10px |
| box-shadow | 0 2px 4px rgba(0,0,0,0.18) |
| font | 15px/500 charcoal |
| text | "$XXX" (price per night) |

### Selected/highlighted marker
| Property | Value |
|---|---|
| background-color | rgb(34,34,34) — dark |
| color | rgb(255,255,255) — white |
| Border | none additional |

---

## Interactions

| Trigger | Behavior |
|---|---|
| Hover price marker | Highlights corresponding listing card in left panel |
| Click price marker | Shows listing preview popup on map |
| Hover listing card | Highlights corresponding price marker on map |
| Map zoom | Markers redistribute; price data may reload |
| Map pan | Markers follow map; may trigger new search area |

---

## Map Attribution
| Property | Value |
|---|---|
| "Map data ©Google" | bottom-right, 10px/400/rgb(0,0,0) |
| "Terms" link | 10px/400/rgb(0,0,0), underline |

---

## New Feature: Safety Heatmap Overlay

When Safety Filter is active (any tier selected except "All"), a color gradient overlay appears over the map tiles, rendering neighborhood polygons:

| Safety tier | Color |
|---|---|
| Very Safe | `rgba(34, 197, 94, 0.35)` — green |
| Safe | `rgba(163, 230, 53, 0.35)` — yellow-green |
| Average | `rgba(251, 146, 60, 0.35)` — orange |
| Below average / Unsafe | `rgba(239, 68, 68, 0.35)` — red |

Implementation approach:
- SVG or Canvas overlay positioned absolute over the Google Maps div
- Neighborhood polygons sourced from SF neighborhood GeoJSON data
- Opacity: 35% so map tiles remain readable beneath
- Animated transition (fade in 300ms) when safety tier changes

**Price markers behavior during overlay:**
- Listings in the selected safety tier: markers remain normal
- Listings outside selected tier: markers dim (opacity: 0.3)
- Map continues to be interactive beneath overlay

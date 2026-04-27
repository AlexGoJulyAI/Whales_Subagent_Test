# AudiobookItem Specification — Audible Authors Page
## Extracted: 2026-04-27 from live page via getComputedStyle() + Playwright DOM walk

---

## Overview
- **Section slug:** audiobook-list-item
- **Screenshot:** `docs/design-references/audible-authors-desktop-1440-full.png`
- **Visual order:** 5
- **Interaction model:** click-driven (title → product detail page, author/narrator → author page, Preview → audio, CTA → checkout)
- **Complexity:** Complex (6+ sub-components per item, multiple interactive elements)
- **Dependencies:** Browse nav (mega-menu panel overlays top items when open)

---

## Computed Styles (exact values from getComputedStyle)

### li.bc-list-item.productListItem (row container)
- width: 1000px
- height: 331.5px (approx — varies by content)
- display: list-item
- padding: 0px
- margin: 0px
- backgroundColor: transparent
- color: rgb(1, 14, 25)
- fontSize: 14px
- fontWeight: 400
- lineHeight: 20px

### div.bc-row-responsive (outer 3-col row)
- display: block
- width: 1024px
- height: 331.5px
- margin: 0px -12px  ← negative margin gutter

#### div.bc-col-responsive.bc-col-4 (cover image column)
- width: 255.992px
- height: 277.992px
- padding: 0px 12px
- display: block

##### img (cover art)
- computedWidth: 231.992px
- computedHeight: 231.992px (rendered as square)
- naturalWidth: 250px
- naturalHeight: 250px
- position: static
- Source pattern: `https://m.media-amazon.com/images/I/[ASIN]._SL250_.jpg`

##### "▶ Preview" link
- display: block (below image)
- color: rgb(1, 14, 25)
- fontSize: 14px
- cursor: pointer
- Text: "▶ Preview"

#### div.bc-col-responsive.bc-col-7 (metadata column)
- width: 447.992px
- height: 289.5px
- padding: 0px 12px
- display: block

##### h3.bc-heading.bc-color-link (book title)
- fontSize: 20px
- fontWeight: 400
- lineHeight: 26px
- color: rgb(14, 91, 155)   ← Audible link blue
- backgroundColor: transparent

##### a.bc-link.bc-color-link (title link)
- fontSize: 20px
- fontWeight: 400
- lineHeight: 26px
- color: rgb(14, 91, 155)
- border: none
- padding: 0px

##### li.bc-list-item.subtitle > span.bc-text.bc-size-base.bc-color-secondary (subtitle)
- fontSize: 14px
- fontWeight: 400
- lineHeight: 20px
- color: rgb(6, 22, 36)   ← near-black secondary text

##### li.bc-list-item.authorLabel > span.bc-text.bc-size-small.bc-color-secondary (author row)
- fontSize: 13px
- fontWeight: 400
- lineHeight: 19px
- color: rgb(6, 22, 36)

##### a.bc-link.bc-color-link (author name link)
- fontSize: 13px
- fontWeight: 400
- lineHeight: 19px
- color: rgb(14, 91, 155)

##### li.bc-list-item.narratorLabel > span.bc-text.bc-size-small.bc-color-secondary (narrator row)
- fontSize: 13px
- fontWeight: 400
- lineHeight: 19px
- color: rgb(6, 22, 36)

##### a.bc-link.bc-color-link (narrator name link)
- fontSize: 13px
- lineHeight: 19px
- color: rgb(14, 91, 155)

##### li.bc-list-item.runtimeLabel > span.bc-text.bc-size-small.bc-color-secondary (length)
- fontSize: 13px
- lineHeight: 19px
- color: rgb(6, 22, 36)

##### li.bc-list-item.releaseDateLabel > span.bc-text.bc-size-small.bc-color-secondary (release date)
- fontSize: 13px
- lineHeight: 19px
- color: rgb(6, 22, 36)

##### li.bc-list-item.languageLabel > span.bc-text.bc-size-small.bc-color-secondary (language)
- fontSize: 13px
- lineHeight: 19px
- color: rgb(6, 22, 36)

##### span.bc-text.bc-size-callout (star rating number)
- fontSize: 14px
- lineHeight: 22px
- color: rgb(1, 14, 25)

##### span.bc-text.bc-size-callout.bc-color-secondary (ratings count)
- fontSize: 14px
- lineHeight: 22px
- color: rgb(6, 22, 36)

##### span.bc-text.bc-size-secondary.bc-color-secondary (description excerpt)
- fontSize: 14px
- fontWeight: 400
- lineHeight: 20px
- color: rgb(6, 22, 36)

#### div.bc-col-responsive.bc-col-3 (price + CTA column)
- width: 256px
- height: 66px
- padding: 0px 12px

##### Price text (e.g., "$19.49 or free with 30-day trial")
- fontSize: 14px
- fontWeight: 400
- color: rgb(1, 14, 25)

##### adbl-button "Try Standard free" (CTA)
- backgroundColor: rgb(255, 160, 0)   ← amber orange (slightly different from banner button which is rgb(255,179,51))
- color: rgb(1, 14, 25)
- fontSize: 14px
- borderRadius: 9999px (pill shape)
- height: 42px (md size)
- fontWeight: 600 (slot text)

### div.bc-col-responsive.bc-spacing-base (divider row — between items)
- margin: 20px 0px
- height: 2px

#### div.bc-divider.bc-divider-secondary (1px separator line)
- borderBottom: 0px none rgba(1, 14, 25, 0.15)  ← subtle separator
- height: 1px
- width: 1000px

---

## States & Behaviors

### Default
- Cover image static, full color
- Title link: rgb(14, 91, 155) blue
- Author/narrator links: rgb(14, 91, 155) blue
- CTA button: rgb(255, 160, 0) amber

### Hover on title/author/narrator link
- text-decoration: underline
- Transition: instantaneous

### Hover on CTA button
- Background likely darkens — exact value not extracted

### Preview button
- Trigger: click → triggers `<audio id="webPlayer">` playback
- Text changes to pause state while playing (not extracted — requires click)

---

## Assets

| Layer | z-index | Type | Source URL pattern | Dimensions | Position |
|---|---|---|---|---|---|
| 1 | auto | img | `https://m.media-amazon.com/images/I/[ASIN]._SL250_.jpg` | 250×250px natural, 232×232px rendered | static |

Background images: none (only bc-popover-beak SVG background which is a tooltip artifact).

---

## Text Content — First item (verbatim)
- **Title:** What Remains
- **Subtitle:** A Memoir of Fate, Friendship, and Love
- **By:** Carole Radziwill
- **Narrated by:** Carole Radziwill
- **Length:** 5 hrs and 57 mins
- **Release date:** 09-26-05
- **Language:** English
- **Rating:** 4.6 ★★★★½ 1,771 ratings
- **Description excerpt:** A stunning, tragic memoir about John F. Kennedy Jr., his wife Carolyn Bessette-Kennedy, and his cousin Anthony Radziwill, by Radziwill's widow. What Remains is a vivid and haunting memoir about a girl from a working-class town who becomes an award-winning television producer and marries a...

---

## Responsive Behavior
- **Desktop (1440px):** Three-column row — cover (232px) + metadata (448px) + price/CTA (232px). Total item width: 1000px.
- **Tablet (768px):** Cover shrinks (~135px), metadata extends, price/CTA may wrap below metadata
- **Mobile (390px):** Cover left ~135px, metadata right truncated, price/CTA hidden below fold or stacked
- **Breakpoint:** ~768px layout collapses; price/CTA column stacks below on mobile

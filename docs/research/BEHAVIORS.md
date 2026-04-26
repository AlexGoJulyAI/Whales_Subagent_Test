# Audible Authors Page — Behavior Bible

## Interaction Model Summary
- **No sticky header** — nav header is `position: static`, scrolls off-screen on scroll
- **No smooth-scroll library** (no Lenis, no Locomotive)
- **No scroll-snap** on body or page container
- **No scroll-driven animations** — page is static content, no IntersectionObserver animations
- **No auto-playing carousels** or cycling content

## Scroll Sweep Results
- Scrolled to 600px: nav header disappeared off screen, no positional change. Stays `position: static`.
- Scrolled to bottom: pagination appears, footer appears. No elements animate in.
- **CONCLUSION**: No scroll-driven behaviors. Pure static layout.

## Click Sweep Results
- **Category chip links**: Navigate to sub-category pages. Plain anchor links.
- **"Try Standard free" button**: Links to `/subscription/confirmation?...`. Plain anchor.
- **"▶ Preview" link**: Below each cover image. Plays audio preview (out of scope for clone).
- **Title link** (blue): Navigates to product detail page.
- **Author link** (blue): Navigates to author page.
- **Narrator link** (blue): Navigates to narrator search.
- **Pagination links**: Navigate to page N of results.
- **"Show [20▾] items per page"** dropdown: Form submit to change page size (20 or 30).

## Hover Sweep Results
- **Blue links**: `text-decoration: underline` on hover (standard browser behavior).
- **"Try Standard free" button**: Background darkens slightly on hover.
- **Category chips**: Border darkens on hover.

## Responsive Sweep Results
- **Desktop (1440px)**: 3-column list item layout (cover / metadata / price+button). Content max-width 1000px centered.
- **Mobile (390px)**: Same 3-column layout compressed. The site sets `meta viewport` to `width=1040` (not truly responsive). Clone will implement proper mobile-first responsive layout.

## Component-Level Behaviors

### PromoBanner — STATIC
- No animation, no dismiss, no hover effect.
- "Get this deal" button: plain anchor link.

### NavHeader — STATIC (no sticky)
- Does NOT become sticky on scroll. Scrolls off page normally.
- Browse dropdown: OUT OF SCOPE (render as static link).
- Sign in button: plain anchor link.

### CategoryChips — STATIC
- 2 rows of chips with flex-wrap layout, centered.
- No active/selected state. All chips are plain links.

### AudiobookItem — STATIC
- Cover image: plain `<img>` with aspect ratio 1:1.
- "▶ Preview" below image: plain link with play triangle.
- Star rating: filled stars (orange `rgb(255,160,0)`) + empty stars (dark `rgb(1,14,25)`) rendered with CSS icon approach.
- Description: truncated with `…`.
- Price text: `$XX.XX or free with 30-day trial`
- Button: "Try Standard free" orange pill, 232px wide, 28px tall, borderRadius 32px.

### Pagination — CLICK-DRIVEN
- "Show" dropdown: `<select>` options 20/30.
- Page number links: plain anchors.
- Current page "1": not a link, plain text (bold).
- Format: `< 1  2  …  25 >`

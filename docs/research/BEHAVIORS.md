# Behaviors — gojuly-ux-v17
*Extracted from live Playwright MCP session, 2026-04-13*

---

## Scroll Behaviors
- **Navbar:** sticky top-0 — stays fixed on scroll on both pages
- **Sidebar:** fixed position, overflow-y: auto — scrolls independently from main content
- **Home page:** standard document scroll, no snap points
- **Learning page:** main content area may scroll independently of sidebar

## Click Behaviors
- **Module card header:** toggles expanded/collapsed state (cursor-pointer)
- **Sidebar section items:** toggle sub-section expand/collapse (cursor-pointer)
- **Challenge items:** navigate to that challenge (cursor-pointer)
- **Back arrow in sidebar:** navigates to previous page
- **Home nav item:** navigates to /home
- **"Go to Job Application" (NEW):** navigates to Red Team Sample Submission module

## Hover States
- **Module card header:** no visible hover state (cursor-pointer only)
- **Sidebar items:** `hover:bg-gray-50` (#f9fafb) background on hover
- **Sidebar collapse button:** `hover:bg-gray-100` background
- **Nav items:** `hover:text-gray-800` for inactive nav items
- **Buttons:** brightness change on hover (standard btn behavior)

## Active/Selected States
- **Nav Home item:** after: underline pseudo-element (2px, blue-600, full width)
- **Active challenge:** bg-pink-50 (#fdf2f8) + border-l-4 border-pink-500 (#ec4899) + font-medium text-gray-900

## Transitions
- Sidebar: `transition-all` for collapse animation
- Chevron rotation: `transition-transform` with `rotate-90`
- Nav items: `transition-colors`

## v17 Prototype Interaction Model
- Both screens: STATIC (no real navigation between them)
- Home page: AI Red Team module shown COLLAPSED (static — no toggle needed)
- Learning page: sidebar shown with "Go to Job Application" button (static)
- The button and collapsed state are the VISUAL PROOF of the UX fix
- No real tab-switching or accordion animation required in prototype

## Responsive
- Desktop only (1440px viewport) for this prototype
- Mobile out of scope

---
name: "net-new-build"
description: "Use this skill when the user wants to create or redesign a frontend, landing page, dashboard, marketing page, or other UI. Produces distinctive, production-grade interfaces with a clear aesthetic point-of-view, then ports the design into the repo's real frontend stack."
---

# Frontend Design

Create distinctive, production-grade frontend interfaces that avoid generic AI aesthetics. Implement real working code with exceptional attention to visual details and creative choices.

## Agent Pipeline

This skill governs a three-agent pipeline. Each agent file is a phase of the same 0→1 build — this document defines the governing principles that apply across all three.

| Phase | Agent file | What it does |
|-------|-----------|-------------|
| 1 — Intake | `v3_Intake` | 1) Discovers requirements + extracts assets; 2) Sends Phase 1 discovery questions — **HARD STOP** until all P0 questions confirmed; 3) Only after P0 confirmed: **runs Design Research** (defined in this file); 4) Writes `PROJECT_BRIEF.md` |
| 2 — Designer | `v3_Designer` | Reads the brief (including anchor selections from Design Research), builds user journeys, generates three visual mockups |
| 3 — Prototyper | `v3_Prototyper` | Converts all three mockups into interactive HTML prototypes; client selects final direction |

**Design Research** (defined in the [Design Research](#design-research) section below) runs inside Phase 1 (Intake), **after all Phase 1 discovery questions are answered and every P0 question is confirmed** — never before. It does not begin until the Phase 1 Gate (v3_Intake.md Step 7) is cleared. The per-direction Synthesis Tables from that phase are recorded in `DESIGN_RESEARCH.html` and the brief's §Design Research Anchors — no mockup file may be written until all three are filled.

---

## Mission

1. Inspect the repo first.
2. Define a clear aesthetic direction.
3. Implement a working design artifact.
4. Port the design into the repo's actual primitives, routes, tokens, and components.
5. Run a visual QA pass before calling it done.

## Scope Defaults

This is always a 0→1 build. The repo is a bare Next.js + shadcn/ui + Tailwind v4 scaffold with no visual identity, no existing design tokens, and no content routes. Treat it as a blank canvas.

- There is no existing design system to preserve or defer to — you are creating it from scratch.
- Prefer one coherent direction over multiple weak variants. Commit fully; do not hedge with safe fallbacks.
- Design research sources (Playwright screenshots of named references, Mobbin, and Cosmos/Dribbble) are the primary reference material — they replace what a codebase would normally provide.
- The design system you define here IS the system. Set tokens, fonts, surfaces, and component patterns as first-class decisions, not afterthoughts.

---

## Pre-Flight

1. Confirm the scaffold is healthy before touching any design code:
   - Run `npm run build`. It must compile clean. If it doesn't, fix it first — do not proceed with a broken baseline.
   - Verify the dev server starts: `npm run dev`. Note the local URL.

2. Acknowledge the greenfield state:
   - The repo contains a Next.js 16 + shadcn/ui + Tailwind v4 scaffold. There is no visual design system, no token file with brand decisions, and no content routes yet.
   - Do not spend time "inferring" an existing design system — there isn't one. Proceed directly to Design Research.
   - The one exception: check `src/app/globals.css` and `tailwind.config.*` for any base tokens already set. Note them, but do not let them constrain the direction.

3. Define the entry point before any code is written:
   - Default landing target: `src/app/page.tsx`.
   - If the build spans multiple pages, map the full route structure now: `src/app/<route>/page.tsx` for each. Do not start building before the route map is settled.
   - If the user has not specified a surface (landing page, dashboard, onboarding flow, etc.), ask before proceeding.

4. Write a compact brief covering only:
   - What is being built (surface type and product context)
   - The primary user action (what does a visitor do here?)
   - Hard constraints from the user (must-haves, do-not-build, deadline-driven scope limits)
   - Leave design direction blank — that gets filled in during Design Research.

---

## UX Foundation

Before any visual research begins, establish the UX brief. This is a blocking gate — do not proceed to Design Research until all 4 questions are answered in writing.

**1. User and goal**
Who is the primary user and what is their single goal on this surface? Be specific: not "a developer" but "a developer evaluating whether to add this library to their project." One user, one goal.

**2. Information hierarchy**
What must the user encounter first, second, and third? Write the sequence as a numbered list. Every layout decision downstream must serve this order.

**3. Conversion path**
What is the primary conversion action (sign up, download, contact, purchase, etc.)? Trace the user's shortest path from landing to completing it — how many clicks, how many scrolls, what do they need to understand before they act?

**4. States to design**
List which of the following states apply to this surface and must have explicit treatments before the build is complete:

| State | Applies? | Notes |
|-------|----------|-------|
| Loading | | |
| Empty (no data / no content) | | |
| Error | | |
| Success / confirmation | | |
| Disabled | | |
| Hover | | |
| Focus | | |
| Active / selected | | |

Any state marked as not applicable requires a brief reason. Silence is not a descoping decision.

The aesthetic direction must serve this UX brief, not the other way around. If a visual choice makes the hierarchy harder to read or the conversion path less obvious, it is the wrong choice regardless of how good it looks.

---

## Design Research

**GATE — Phase 1 discovery must be complete before this phase begins.** Every P0 question in the Question Status Tracker (v3_Intake.md Phase 1) must show `confirmed` status. If Phase 1 has not been sent, or if any P0 question remains unanswered, stop here — return to v3_Intake.md Phase 1 and resolve it first. Do not open any browser or capture any screenshot until this gate is cleared.

This phase is driven entirely by what the user said. Do not use a pre-selected category or default aesthetic — all visual values come exclusively from Playwright screenshots of real sites.

### 1. Parse the User's Description

Before opening any browser, extract these three things from what the user said and write them down:

- **Style keywords** — aesthetic descriptors the user used or implied (e.g. "dark", "minimal", "cinematic", "editorial", "warm", "clinical", "playful"). If the user named a reference product ("I want it to feel like Linear"), treat that product name as a keyword.
- **Product type** — what kind of product is this (developer tool, fintech app, e-commerce, marketing site, SaaS dashboard, consumer app, etc.)
- **Surface type** — what is being built right now (landing page, onboarding flow, dashboard, settings, pricing page, etc.)

If the user's description is vague ("make it look good", "modern and clean"), stop and ask for one more detail before searching. Vague input produces generic output.

### 2. Screenshot Screen References (max 9 total)

Use Playwright to capture real screenshots of UI references. **Hard cap: 9 screenshots total across all sources.** Stop taking screenshots once you reach 9 — do not exceed this limit.

**SCREENSHOT RULE — NEVER capture a search results grid, thumbnail grid, or discovery page.** Every screenshot must be of a single, specific design: one product page, one Dribbble shot detail, one Mobbin screen detail. Grid pages exist only for URL extraction — navigate through them silently, extract links via `browser_evaluate`, then navigate to individual result pages before taking any screenshot. A grid screenshot wastes a slot and provides no usable design reference.

**Playwright health check — run before any navigation:**
```
mcp__playwright__browser_snapshot()
```
If snapshot fails with a closed/disconnected error: stop and tell the user "The Playwright browser is closed. Please restart it: Claude Code → Settings → MCP Servers → Playwright → Restart. Reply 'ready' when done." **HARD STOP** until the user confirms restart.

**Snapshot token overflow handling:** If `browser_snapshot()` returns a message saying the result was saved to a file (exceeds token limit), do NOT try to read the full file. Instead use Bash grep to extract what you need:
```bash
grep -i "Accept All\|ref=e[0-9]" <saved-file-path> | head -10   # find button refs
grep -o 'shots/[0-9]*[^"'\'' ]*' <saved-file-path> | grep -v popular | head -10  # find Dribbble shot IDs
```
This avoids loading the full snapshot into context.

**Budget allocation (decide before opening any browser):**

| Source | Slots |
|--------|-------|
| Named references (apps the client mentioned by name) | 2–4 screenshots |
| Mobbin (onboarding / layout patterns) | 2–3 screenshots |
| Cosmos or Dribbble (aesthetic / component patterns) | 1–3 screenshots |
| **Total** | **≤ 9** |

**For each named reference:**
1. Navigate → wait 2s → remove cookie banners → full-page screenshot → save to `docs/design-references/<name>-hero.png`
2. `Read("docs/design-references/<name>-hero.png")` immediately — do not proceed until the file is read
3. If the site returns 403 / login wall / blank: try App Store page → then Google Images search → count fallback screenshots toward the 9

**For Mobbin:**

**Step 1 — Login check (run before any search):**
- Navigate to `https://mobbin.com/search/apps/ios?q=<surface-keywords>&content_type=screens`
- If the URL redirects to `https://mobbin.com/discover/apps/ios/latest` AND no results count is visible: user is not logged in. Stop and say: "Mobbin requires a login to search screens. Please log in at mobbin.com, then reply 'ready'." **HARD STOP** until confirmed.
- If the page shows a results count (e.g. "837 screens") and a grid of thumbnails: proceed.

**Step 2 — Extract screen links via JS (do not rely on snapshot — cards load lazily):**
```javascript
() => [...document.querySelectorAll('a[href*="/screens/"]')]
  .map(a => a.href)
  .filter((h, i, arr) => arr.indexOf(h) === i)
  .slice(0, 10)
```

**Step 3 — Capture detail screens:**
- Navigate directly to the 1–2 best-matching screen URLs from the JS output
- On each detail page: press `Home` key to scroll to top, wait 1s, then screenshot → `Read` immediately
- Save as `docs/design-references/pattern-<surface>-mobbin-1.png`, `-2.png`, etc.

**For Cosmos (`cosmos.so`) or Dribbble — build search queries first:**

Before opening either platform, construct search queries from the Step 1 parse output + named references the client mentioned:

```
Primary query:   <named-reference-1> + <surface-type>
                 e.g. "Calm onboarding" or "Linear dashboard"
Secondary query: <style-keywords> + <product-type> + <surface-type>
                 e.g. "dark minimal mobile onboarding"
Fallback query:  <named-reference-2> + "UI" or <product-type> + "app UI"
```

Use the primary query first. If it returns fewer than 3 relevant UI screenshots, try the secondary. If still thin, use the fallback. This ensures the platform search is anchored to the same named references the client already cited — not generic aesthetic terms invented by the agent.

---

**For Cosmos (`cosmos.so`):**

**Step 1 — Login check (run before any search):**
- Navigate to `https://cosmos.so`
- If the page shows "Login" / "Sign up" buttons or navigates to a login form: stop and say: "Cosmos requires a login. Please log in at cosmos.so/login, then reply 'ready'." **HARD STOP** until confirmed.
- If logged in: proceed to search.

**Step 2 — Search:**
1. Navigate to `https://cosmos.so/search?q=<primary-query>` (URL-encode spaces as `+`)
2. **If the page returns "Content not found" or a 404:** the search URL format has changed — skip Cosmos entirely and allocate its slots to Dribbble. Do not retry with different URL patterns.
3. **Dismiss overlays before interacting:**
   - Cookie banner: click `button:contains("Accept")` or `button:contains("OK")`
   - Signup modal: click `button[aria-label*="close" i]` or `button:contains("×")` or `[class*="modal"] button`
   - If no close button: scroll past the modal before proceeding
4. **Quality gate — scan the results grid before clicking anything:**
   - Accept: UI screenshots showing multiple components (cards, nav, forms, lists)
   - Accept: mobile or web app screens matching the surface type from Step 1
   - Reject: illustrations, logos, print design, single icons, motion stills, purely typographic pieces
   - Reject: blurry or low-resolution thumbnails
5. Click the best-matching result → wait 2s for full-size image to load
6. Screenshot the full-size image at the detail URL — not the grid thumbnail
7. `Read` immediately
8. If the result count was thin, navigate to `https://cosmos.so/search?q=<secondary-query>` and repeat steps 3–7 for a second image
9. Save as `docs/design-references/pattern-<surface>-cosmos-1.png`, `-2.png`
10. **Fallback if search returns no usable UI results:** try `https://cosmos.so/search?q=<fallback-query>`. If still blocked or empty, skip Cosmos and allocate its slots to Dribbble.

---

**For Dribbble:**

1. Navigate to `https://dribbble.com/search/<primary-query>` (hyphenate spaces: `calm-onboarding`)
2. **Dismiss overlays:**
   - Cookie banner: get snapshot → if snapshot exceeds token limit, use Bash grep on the saved `.yml` file: `grep "Accept All" <path>` to find the ref → click it
   - "Sign up to see more" strip: click its × or scroll past — individual shots are visible without login
   - Do NOT attempt to log in
3. **Quality gate — scan the grid:**
   - Accept: shots showing actual app UI with multiple components
   - Accept: mobile or web screens matching the surface type
   - Reject: logo design, illustrations, print, motion stills, single-element shots
   - Reject: thumbnails that are too small to read component details
4. **Extract shot URLs via JavaScript** (more reliable than clicking from snapshot refs):
   ```javascript
   () => [...document.querySelectorAll('a[href*="/shots/"]')]
     .map(a => a.href)
     .filter(h => /\/shots\/\d+/.test(h))
     .filter((h, i, arr) => arr.indexOf(h) === i)
     .slice(0, 8)
   ```
5. Navigate directly to the best-matching shot URL from the JS output
6. **After navigating to any shot detail page: press `Home` key to scroll to top before screenshotting.** Shot detail pages sometimes load scrolled to the "More by author" section.
7. Screenshot → `Read` immediately
8. If a second slot is available, navigate to the next shot URL from the JS list → repeat steps 6–7
9. Save as `docs/design-references/pattern-<surface>-dribbble-1.png`, `-2.png`
10. **Login wall fallback:** if the grid is fully blocked, navigate to `https://www.google.com/search?q=site:dribbble.com+<primary-query>` → click through to individual shot pages from Google results → screenshot each → these count toward the 9-cap

---

**After each platform screenshot, before moving on:**
- Confirm the saved file is not a thumbnail (open and read it — if it shows a tiny grid crop, discard and retry)
- Verify it shows the surface type you searched for
- If it fails either check: skip it, don't count it toward the 9, and try the next result

**When the counter hits 9 → stop. No more screenshots regardless of remaining budget.**

**Screenshot Verification Gate** — before moving to Step 2b:
```
Glob("docs/design-references/*.png")
```
Count saved files. Minimum 5 to proceed. If below 5, capture from remaining sources. If 5–9, proceed.

### 2b. Client Image Selection Gate (HARD STOP)

After all screenshots are captured and verified, Read every screenshot file so the images render in the conversation, then send this exact message:

> "Here are all [N] reference screenshots from design research. **Please pick your 3 favorites** — each one becomes the primary visual anchor for one of the three design directions (A, B, C). Everything else is secondary reference only.
>
> [List each image by number with filename and one sentence describing what it shows]
>
> Reply with 3 numbers or filenames."

**HARD STOP — do not fill the Synthesis Table, do not proceed to Step 3, until the client replies with exactly 3 picks.**

After the client replies:
- Fewer than 3 or more than 3: ask them to confirm exactly 3 before continuing
- Exactly 3: record the selection

```
CLIENT IMAGE SELECTION
  Anchor A: [filename] — [what it shows] → drives Direction A
  Anchor B: [filename] — [what it shows] → drives Direction B
  Anchor C: [filename] — [what it shows] → drives Direction C
  Status: CLIENT CONFIRMED
  All other screenshots: secondary reference only
```

**1:1 anchor-to-direction rule:** Each anchor maps to exactly one direction — Anchor A → Direction A only, Anchor B → Direction B only, Anchor C → Direction C only. In the Synthesis Table and all downstream mockup work, rows 1 (Palette), 4 (Surface treatment), and 5 (Signature moment) for each direction must trace back to its assigned anchor image. Rows 2 (Type), 3 (Layout), and 6 (Anti-pattern) may draw from any screenshot.

### 2c. Per-Anchor Extraction (run after client confirms 3 picks)

For each confirmed anchor (A, B, C), extract exact visual values before filling the Synthesis Table. This step produces the raw material for each direction — not approximations.

**For each anchor, run three passes:**

**Pass 0 — Six targeted zoom crops (run first, before any value extraction):**

Full-page screenshots compress shadows, wash out borders, and make colors drift. Take 6 targeted crops — each crop exists to give clean pixel material for a specific set of properties.

| Crop | Target selector / area | Properties it covers |
|------|------------------------|----------------------|
| `zoom-bg` | Clean background area with no elements on top | Page background hex — most accurate pixel sample |
| `zoom-card` | Primary card or list item component | Card surface color, card border, internal padding feel, card radius |
| `zoom-cta` | Primary button or CTA element | Accent color, button radius, button text color, button padding |
| `zoom-type` | Headline + body text block together | Font family visual, weight, size ratio, line height, letter spacing |
| `zoom-detail` | Edge of a card or input — tightest possible crop | Border radius (px-level), border color, shadow edge |
| `zoom-nav` | Header or navigation bar | Brand color in nav, active state color, nav item spacing |

*For named reference anchors (live URL available):*
1. Navigate back to the source URL
2. For each crop, identify the best matching element on page and screenshot it:
   ```
   mcp__playwright__browser_take_screenshot({ selector: "<target-selector>" })
   ```
   If a selector is unavailable, resize the viewport tightly around the target area before screenshotting.
3. Save as `<name>-zoom-bg.png`, `-zoom-card.png`, `-zoom-cta.png`, `-zoom-type.png`, `-zoom-detail.png`, `-zoom-nav.png`
4. `Read` all 6 immediately

*For platform anchors (Mobbin, Cosmos, Dribbble — no live URL):*
Platform detail views are already component-level. Re-read the existing screenshot as the source for all 6 crop slots. Mark all values `[screenshot-estimated]`.

**Pass 1 — Visual inventory (from zoom crops):**

Read all 6 zoom crops, then fill every field below. Nothing may be left blank — if a value is not visible in any crop, write `not-visible` and flag it.

```
Read("docs/design-references/<name>-zoom-bg.png")
Read("docs/design-references/<name>-zoom-card.png")
Read("docs/design-references/<name>-zoom-cta.png")
Read("docs/design-references/<name>-zoom-type.png")
Read("docs/design-references/<name>-zoom-detail.png")
Read("docs/design-references/<name>-zoom-nav.png")
```

Extract and record:

*Colors (use canvas sampling in Pass 1b to confirm — these are visual estimates only):*
- Page background color
- Card/surface background color
- Primary accent color (CTA / interactive element)
- Secondary accent color (if visible)
- Heading text color
- Body text color
- Muted/secondary text color (labels, captions)
- Border/divider color
- Nav background color

*Typography (from zoom-type crop):*
- Heading font family (name if identifiable, or describe: serif / sans / slab / mono)
- Heading font weight (100–900)
- Heading font size feel (display-scale / h1 / h2)
- Heading letter-spacing (tight / normal / wide / very-wide)
- Body font family
- Body font weight
- Body line-height feel (tight 1.2 / normal 1.5 / loose 1.8)
- Text transform on any labels (uppercase / none)

*Spacing (from zoom-card and zoom-type crops):*
- Card internal padding (tight <12px / medium 16–24px / generous 32px+)
- Gap between list items or cards
- Section vertical breathing room (compressed / normal / airy)
- Horizontal content alignment (left-heavy / centered / right-aligned)

*Shape (from zoom-detail and zoom-cta crops):*
- Card border radius (none / small 4–8px / medium 12–16px / large 20–32px / full/pill)
- Button border radius (same scale)
- Input border radius (if visible)
- Avatar/image shape (circle / rounded / square)

*Elevation and surface (from zoom-card and zoom-detail crops):*
- Shadow style (none / subtle/diffuse / medium/defined / heavy/sharp)
- Shadow color (neutral gray / colored / dark)
- Border treatment (none / hairline / medium / thick)
- Overlay or frosted glass treatment (yes / no — describe if yes)
- Background depth feel (flat / layered / deeply dimensional)

*Components and patterns (from all crops):*
- Icon style (outlined strokes / filled solid / rounded / sharp)
- Image treatment (full-bleed / contained / rounded corners / circular)
- Navigation pattern (top bar / bottom tab bar / sidebar / floating)
- List pattern (cards / rows / tiles / full-width sections)
- Active/selected state color (from zoom-nav)

*Signature element:*
- The one specific visual thing that makes this design immediately recognizable — name it exactly and reference which crop it appears in

**Pass 1b — Canvas pixel sampling (exact hex for all color values):**

For each zoom crop, navigate to it as a `file://` URL and sample exact pixel RGB values. This replaces visual color estimates from Pass 1 with measured values.

```javascript
// Run via mcp__playwright__browser_evaluate after navigating to file://<absolute-path-to-crop>
(() => {
  const img = document.querySelector('img') || document.body;
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || window.innerWidth;
  canvas.height = img.naturalHeight || window.innerHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const hex = (x, y) => {
    const [r, g, b] = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
  };
  const w = canvas.width, h = canvas.height;
  return {
    topLeft:      hex(4, 4),
    topCenter:    hex(w/2, 4),
    center:       hex(w/2, h/2),
    bottomCenter: hex(w/2, h - 4),
    leftEdge:     hex(4, h/2),
    rightEdge:    hex(w - 4, h/2),
  };
})();
```

**Steps:**
1. `mcp__playwright__browser_navigate({ url: "file:///absolute/path/<name>-zoom-bg.png" })` → sample topLeft + center → page background hex
2. Navigate to `zoom-card.png` → sample center + leftEdge → card surface hex, border color
3. Navigate to `zoom-cta.png` → sample center → accent hex
4. Navigate to `zoom-nav.png` → sample topLeft + center → nav background hex, active state hex
5. Tag each sampled value `[canvas-sampled]`

For platform anchors with no live navigation: navigate to `file://` path of the existing detail screenshot and sample the same way.

**Fidelity hierarchy (highest to lowest) — use the best available for each value:**
1. `url_extracted` — `getComputedStyle()` on live DOM (Pass 2) — authoritative for colors + all CSS properties
2. `canvas-sampled` — exact pixel hex from `getImageData()` (Pass 1b) — authoritative for colors, cannot extract non-color CSS
3. `zoom-estimated` — visual read from zoom crop (Pass 1) — fallback for colors; primary source for spacing/radius/font feel
4. `screenshot-estimated` — visual read from full-page screenshot — never use if zoom crops exist

**Pass 2 — Live DOM extraction (named reference anchors only):**
Navigate back to the source URL and run `getComputedStyle()` on key elements:
```javascript
(['body', 'h1, h2', 'p', 'button, [class*="btn"], [class*="cta"]', '[class*="card"], article, li', 'nav, header', 'input, [class*="input"]']).reduce((acc, sel) => {
  const el = document.querySelector(sel);
  if (!el) return acc;
  const s = getComputedStyle(el);
  acc[sel] = {
    bg: s.backgroundColor, color: s.color,
    font: s.fontFamily, fontSize: s.fontSize, fontWeight: s.fontWeight,
    lineHeight: s.lineHeight, letterSpacing: s.letterSpacing,
    radius: s.borderRadius, shadow: s.boxShadow,
    border: s.border, padding: s.padding, gap: s.gap
  };
  return acc;
}, {});
```
Convert all `rgb()` values to hex. These values override canvas-sampled and zoom-estimated values wherever both exist.

If the anchor came from Mobbin, Cosmos, or Dribbble: skip Pass 2. Canvas-sampled values from Pass 1b are the best available.

**Anchor Extraction Record (fill one per anchor — every field required):**
```
ANCHOR [A | B | C] EXTRACTION — <filename>
  Source URL:           <URL or "screenshot-only">
  Zoom crops:           <name>-zoom-bg/card/cta/type/detail/nav.png

  — COLORS —
  Page background:      <hex> — [url_extracted | canvas-sampled | zoom-estimated]
  Card surface:         <hex> — [url_extracted | canvas-sampled | zoom-estimated]
  Primary accent:       <hex> — [url_extracted | canvas-sampled | zoom-estimated]
  Secondary accent:     <hex or "none"> — [source]
  Heading text:         <hex> — [url_extracted | canvas-sampled | zoom-estimated]
  Body text:            <hex> — [url_extracted | canvas-sampled | zoom-estimated]
  Muted text:           <hex or "not-visible"> — [source]
  Border/divider:       <hex or "none"> — [source]
  Nav background:       <hex> — [source]

  — TYPOGRAPHY —
  Heading font:         <family> — weight <100–900> — [url_extracted | zoom-estimated]
  Body font:            <family> — weight <100–900> — [url_extracted | zoom-estimated]
  Heading letter-spacing: <tight | normal | wide | very-wide> — zoom-estimated
  Body line-height:     <tight 1.2 | normal 1.5 | loose 1.8> — zoom-estimated
  Label text-transform: <uppercase | none> — zoom-estimated

  — SPACING —
  Card internal padding: <tight | medium | generous> (~<px estimate>) — zoom-estimated
  Item gap:             <tight | medium | generous> (~<px estimate>) — zoom-estimated
  Section breathing:    <compressed | normal | airy> — zoom-estimated

  — SHAPE —
  Card border radius:   <none | small 4–8px | medium 12–16px | large 20–32px | pill> — [url_extracted | zoom-estimated]
  Button border radius: <same scale> — [source]
  Input border radius:  <same scale or "not-visible"> — [source]
  Avatar shape:         <circle | rounded | square | not-visible> — zoom-estimated

  — ELEVATION —
  Shadow style:         <none | subtle | medium | heavy> — zoom-estimated
  Shadow color:         <neutral | colored | dark> — zoom-estimated
  Border treatment:     <none | hairline | medium | thick> — [url_extracted | zoom-estimated]
  Overlay/glass:        <yes — describe | no> — zoom-estimated

  — COMPONENTS —
  Icon style:           <outlined | filled | rounded | sharp | not-visible> — zoom-estimated
  Image treatment:      <full-bleed | contained | rounded | circular | not-visible> — zoom-estimated
  Navigation pattern:   <top-bar | bottom-tab | sidebar | floating> — zoom-estimated
  List pattern:         <cards | rows | tiles | full-width-sections> — zoom-estimated
  Active state color:   <hex or "not-visible"> — [source]

  — SIGNATURE —
  Signature element:    <exact description of the one recognizable visual — name the crop it appears in>
  Direction assigned:   [A | B | C]

  — COMPONENT TRANSLATION MAP (BLOCKING — fill before Synthesis Table) —
  Re-read the anchor screenshot and zoom crops, then list 3–6 specific UI components visible in them.
  For each component, record its exact structure and map it to the new product's equivalent screen.
  A mockup that uses only the anchor's color palette but ignores its component patterns is a FIDELITY VIOLATION.

  Component 1:
    Anchor component:   <name as seen in the anchor — e.g. "greeting + action chip grid">
    Anchor treatment:   <exact visual description — layout, colors, shape, any visible text or icon>
    Anchor crop:        <which zoom crop or region of the screenshot it appears in>
    New-product target: <which screen or section of the new product this maps to>
    Translated as:      <how this component should appear in the new product, preserving its visual structure>

  Component 2:
    Anchor component:   <…>
    Anchor treatment:   <…>
    Anchor crop:        <…>
    New-product target: <…>
    Translated as:      <…>

  [Repeat for each component — minimum 3, maximum 6. Every entry must be traceable to a visible element
   in the anchor screenshot. "Similar cards" or "same layout" is not acceptable — name the specific component.]
```

All three Anchor Extraction Records must be complete before filling the Synthesis Table.

### 3. Synthesize into Three Direction Briefs

Write one Synthesis Table **per direction** (A, B, C) — not one shared table. Each table sources rows 1, 4, and 5 exclusively from its assigned anchor. Rows 2, 3, and 6 may draw from any anchor or screenshot.

**Direction [A | B | C] — sourced from Anchor [A | B | C] (`<anchor-filename>`):**

| Row | Decision | Extracted value | Source |
|-----|----------|----------------|--------|
| 1 | **Palette** | Background hex · surface hex · accent hex · text hex | Anchor [A/B/C] extraction — `<filename>` |
| 2 | **Type pairing** | Display font · body font · key size/weight rules | Any anchor or screenshot |
| 3 | **Layout pattern** | Grid approach · whitespace density · section rhythm | Any anchor or screenshot |
| 4 | **Surface treatment** | Card radius · shadow value · border style · background depth | Anchor [A/B/C] extraction — `<filename>` |
| 5 | **Signature moment** | The one specific visual element borrowed from this anchor — name it exactly | Anchor [A/B/C] — `<filename>` |
| 6 | **Anti-pattern** | What this aesthetic must never do — name it specifically | Observed from all screenshots |

**Rules:**
- Row 1 (Palette) values must be hex values extracted from the anchor (either `url_extracted`, `canvas-sampled`, or `zoom-estimated` — never invented)
- Row 4 (Surface) values must come from the anchor's card/component treatment
- Row 5 (Signature moment) must name a specific element visible in the anchor screenshot — not a generic category
- Row 6 (Anti-pattern) must be specific: "no glassmorphism cards", not "avoid generic styles"
- "TBD" and blank cells block progression to Design Thinking — fill every cell

All three direction tables must be complete before proceeding.

---

## Design Thinking

Before coding, commit to a **bold aesthetic direction**:

- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme — brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. Use these as inspiration but design something true to the context.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this unforgettable? What's the one thing someone will remember?

**Critical**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work — the key is intentionality, not intensity.

---

## Aesthetic Guidelines

### Typography
Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial, Inter, and Roboto. Opt for distinctive, characterful choices that elevate the interface. Pair a strong display font with a refined body font.

Before writing any component, commit to a complete type scale in this exact format:

```
Display:  [family], [size]px / [size]rem, weight [n], line-height [n], letter-spacing [n]em
H1:       [family], [size]px / [size]rem, weight [n], line-height [n], letter-spacing [n]em
H2:       [family], [size]px / [size]rem, weight [n], line-height [n], letter-spacing [n]em
H3:       [family], [size]px / [size]rem, weight [n], line-height [n], letter-spacing [n]em
Body:     [family], [size]px / [size]rem, weight [n], line-height [n], letter-spacing [n]em
Caption:  [family], [size]px / [size]rem, weight [n], line-height [n], letter-spacing [n]em
Label:    [family], [size]px / [size]rem, weight [n], line-height [n], letter-spacing [n]em
```

All values must be concrete numbers (e.g. `Instrument Serif, 72px / 4.5rem, weight 300, line-height 1.0, letter-spacing -0.03em`). "Large", "prominent", or library defaults are not acceptable unless explicitly confirmed as matching the direction. Define this scale before writing a single CSS rule.

### Color & Theme
Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.

### Motion
Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML artifacts. Use Motion library for React when available. Focus on high-impact moments — one well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions. Leverage scroll-triggered and hover states that surprise.

### Spatial Composition
Pursue unexpected layouts: asymmetry, overlap, diagonal flow, grid-breaking elements, generous negative space, or controlled density.

### Backgrounds & Visual Details
Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic: gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, grain overlays.

**Never use generic AI aesthetics** — overused font families (Inter, Roboto, Arial, system fonts), clichéd color schemes (purple gradients on white), predictable layouts, or cookie-cutter components that lack context-specific character.

---

## Workflow

### 1. Build the Visual Direction

This is always a greenfield build — there is no existing design system to defer to. Your job here is to establish the visual language from scratch, grounded in what you found during Design Research.

- Pull the 6-row synthesis table from Design Research. Those decisions are now your constraints — work from them, not around them.
- Translate the table into a concrete token set: CSS variable names, hex values, font stack declarations, spacing scale, border-radius values, shadow definitions. Write these down before touching any component.
- Pick one governing idea — the single aesthetic principle that every decision should reinforce. Name it explicitly (e.g. "editorial severity", "soft brutalism", "quiet luxury"). If you can't name it, the direction isn't clear enough yet.
- Do not default to safe or generic choices. This is the moment where the design either becomes memorable or becomes forgettable.

### 2. Implement the Design Artifact

Produce working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and fully functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details.

Before calling the artifact complete:
- Serve it via `npm run dev` and view it in a real browser — not just a code review or terminal output.
- If Playwright MCP is available, capture at least one desktop screenshot (1280px wide) and one mobile screenshot (390px wide). Note any visual problems found in each.
- If no browser tool is available, state this explicitly and flag it as a visual verification gap before proceeding to porting. Do not silently skip this step.

### 3. Preview and Review

- Run `npm run dev` and open the page in the browser. Do not declare the artifact done without seeing it render.
- Check for layout issues, spacing inconsistencies, font rendering, color contrast, and motion behavior.
- Fix obvious problems in the artifact before moving to the repo integration step.

**5-second clarity gate** — before porting, apply this test: a first-time visitor with no context must be able to answer all three of the following from the design alone, within 5 seconds:
  1. What is this product?
  2. Who is it for?
  3. What should I do next?

If any answer is unclear, the artifact is not ready. Fix the headline hierarchy, CTA visibility, or supporting copy — then re-check. Do not port a design that fails this gate.

- After porting, run `npm run check` (lint + typecheck + production build). All three must pass clean. A design that looks right but fails typecheck is not done — fix errors before sign-off.

### 4. Port into the Repo

**Entry point:** Write to `src/app/page.tsx` by default. For multi-page builds, write to the routes mapped in Pre-Flight step 3. Do not create ad-hoc files outside these targets.

Use the design artifact as a strong reference when building the real page or component. Do not paste raw standalone HTML into framework code — this is a Next.js + shadcn/ui repo with real primitives.

Port the design in two distinct layers:

**Design system layer (match precisely):**
Extract and faithfully reproduce every visual decision from the artifact — color palette, gradients, shadows, border radii, border styles, spacing values, font sizes, font weights, letter-spacing, line-height, background effects, opacity values, hover and transition states, and layout structure. Convert these into the repo's native token system rather than approximating with "close enough" utility classes. When the artifact defines specific values, those are the spec.

**Content layer (adapt freely):**
Copy, section count, placeholder data, button labels, and other content should be filled in from the user's actual product context. The artifact's content is illustrative, not prescriptive.

Work methodically when porting:
1. Extract theme tokens from the artifact and define them in the repo's token system.
2. Port each component's visual structure, preserving exact class values for spacing, sizing, and effects.
3. Do not substitute approximate values (e.g. `pt-48` for `pt-32`, `text-6xl` for `text-[64px]`).
4. Reuse shadcn/ui primitives and the scaffold's existing component patterns — don't reinvent what already exists.
5. Preserve accessibility basics and responsiveness throughout.

### Stack Checklist

Apply these during porting. Check each before moving on to the next section.

**Next.js / React**
- Convert every repeated section into a named component.
- Match server/client component boundaries to the existing app's patterns — do not mark components `"use client"` without a reason.
- Keep business logic out of presentation-only layout components.

**Tailwind**
- Map every spacing, radius, shadow, and color value to an existing scale entry first.
- Reach for arbitrary values (`text-[64px]`, `pt-[72px]`) only when the design calls for something the scale genuinely cannot express.

**Radix / shadcn**
- Compose dialogs, tabs, popovers, buttons, and form controls from existing shadcn primitives.
- Layer custom styles on top — do not replace or re-implement the primitive's structure.

**Responsiveness + Accessibility**
- Verify the layout at mobile (< 640px), tablet (768px), and desktop (1280px+) before sign-off.
- Headings in semantic order (`h1` → `h2` → `h3`), landmarks present, interactive elements labeled, color contrast meets WCAG AA minimum.
- Wrap animations in `prefers-reduced-motion` where applicable.

**States and Edge Cases**

Before sign-off, every surface must have explicit treatments for all states listed in the UX Foundation brief. Check each:
- **Loading**: skeleton screen or spinner — which pattern, which components, what delay before it appears (typically 200ms)?
- **Empty**: what does the page look like with no data, no user content, or a first-time visitor with nothing to show? Empty states need a visual treatment, not a blank void.
- **Error**: inline message or full-page fallback? How is it styled relative to the primary surface — same background, accent color for severity?
- **Hover / focus**: every interactive element (links, buttons, inputs, cards, icons) must have an explicitly defined hover and focus state. Browser defaults are not acceptable.

If any state is genuinely out of scope for this build, write the reason explicitly. "N/A" without a reason is not acceptable.

**Surface-Specific**

*Marketing / Landing page:*
- Required flow: hero → proof → feature explanation → CTA. Do not reorder without an explicit reason.
- CTA contrast must be immediately obvious — a user should identify the primary action within 2 seconds.
- Avoid image-heavy hero sections that mask weak layout thinking.

*Dashboard:*
- Protect information density and navigation clarity above all else. Do not sacrifice usability for spectacle.
- Every data cell, label, and action must remain legible at the default viewport size.

### 5. Parallelize Large Ports with Subagents

If the artifact is large enough that one agent would be juggling multiple distinct sections or component families at once, split the implementation into focused subagent tasks.

Keep the foundation work in the main agent:
- Token extraction
- Shared primitives
- Route shell and page composition
- Final integration decisions

Use subagents for independent leaf-level porting work such as: hero section, feature section, pricing grid, testimonial rail, FAQ block, footer, dashboard panel group, repeated card families.

Give each subagent a tight scope: the exact section to port, the target files it may touch, the relevant artifact fragment, and the non-negotiable tokens and visual constraints it must preserve.

After subagents finish, the main agent must normalize shared primitives, remove duplicate token definitions, and ensure the final composition feels consistent.

---

## Required Outputs

After a successful run, provide or record all of the following:

- The aesthetic direction summary (typeface, palette, layout approach, motion approach)
- The design artifact (file path or inline code)
- The intended route, component, or surface targets for repo integration
- Any unresolved blockers or risks if the design could not be fully adopted

---

## Operating Rules

- This is always a 0→1 build. There is no prior design system, no existing aesthetic to preserve, no routes to protect. You are creating everything.
- Design Research is not optional and cannot be skipped. Playwright screenshots of at least 5 real reference sources must inform the design brief before any code is written.
- The 6-row synthesis table (one per direction) must be complete before implementation begins. An incomplete table means the direction is not settled — do not proceed.
- Do not present raw HTML as the final integrated implementation. Port all output into Next.js + shadcn/ui + Tailwind v4 using the repo's real component system.
- `npm run check` must pass clean before the build is considered done. Lint errors and type errors are not acceptable finishing states.
- No two builds should look the same. Vary themes, fonts, layout approaches, and aesthetic registers. Never converge on safe or common defaults across generations.
- Apply detailed product requirements during implementation. Do not try to encode every requirement into a single upfront prompt — iterate.
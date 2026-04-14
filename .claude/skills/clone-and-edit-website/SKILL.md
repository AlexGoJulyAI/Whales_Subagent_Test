---
name: clone-and-edit-website
description: Reverse-engineer a website into a pixel-perfect clone, then accept follow-up edit requests and implement them in the exact same visual style as the original site. Use this when the user wants to clone AND customize a site — add sections, change content, restyle components, or extend the UI while preserving the original's design language. Also triggers on "clone this and then change...", "rebuild this page and add...", "make a copy and customize". Provide one or more target URLs as arguments.
argument-hint: "<url1> [<url2> ...]"
user-invocable: true
---

# Clone & Edit Website

You are about to reverse-engineer and rebuild **$ARGUMENTS** as pixel-perfect clones — AND remain available to make follow-up edits that perfectly match the original site's design language.

When multiple URLs are provided, process them independently and in parallel where possible, while keeping each site's extraction artifacts isolated in dedicated folders (for example, `docs/research/<hostname>/`).

This is not a two-phase process (inspect then build). You are a **foreman walking the job site** — as you inspect each section of the page, you write a detailed specification to a file, then hand that file to a specialist builder agent with everything they need. Extraction and construction happen in parallel, but extraction is meticulous and produces auditable artifacts.

## Pipeline Architecture

Every invocation of this skill uses five actors. Three are spawned sub-agents (invoked via the `Agent` tool). One is direct orchestrator work. One is many parallel sub-agents.

| # | Actor | File | Nature | Role | Output |
|---|---|---|---|---|---|
| 1 | **Intake Agent** | `INTAKE_AGENT.md` | Sub-agent | Discovery, classification, brief | `docs/research/PROJECT_BRIEF.md` |
| 2 | **Orchestrator** | `SKILL.md` (this file) | Direct work — not a sub-agent | Browser extraction (Phases 1–2) + merge coordination | `docs/research/DESIGN_SYSTEM.md`, `BEHAVIORS.md`, `PAGE_TOPOLOGY.md`, screenshots |
| 3 | **Designer Agent** | `DESIGNER_AGENT.md` | Sub-agent | User journey + pixel-spec mockup — all values derived from live extraction, no estimation | `docs/research/USER_JOURNEY.md` + `docs/research/MOCKUP.md` |
| 4 | **Builder Agents** | `BUILDER_AGENT.md` | Many parallel sub-agents (one per component) | Build individual React/TS components from spec | `src/components/[Name].tsx` per component |
| 5 | **Prototyper Agent** | `PROTOTYPER_AGENT.md` | Sub-agent — **always spawned 3× in parallel (A/B/C)** | Three variations of the Next.js test route | `src/app/tests/[slug]-v1/`, `v2/`, `v3/` + registry entries |

**Actor #2 — the Orchestrator — is not a sub-agent.** Phases 1–2 (browser extraction, asset download, `DESIGN_SYSTEM.md` compilation, foundation CSS/TypeScript) are performed directly by whoever is running this skill. This work requires real browser MCP access and touches many files simultaneously — it cannot be delegated to an isolated sub-agent.

**When each actor runs:**
- **Intake Agent** — ALWAYS first, regardless of input type.
- **Orchestrator (Phases 1–2)** — ONLY when a URL is provided. Runs directly before Designer Agent is spawned.
- **Designer Agent** — ALWAYS after Phase 2. Produces MOCKUP.md and USER_JOURNEY.md. Every value in MOCKUP.md must trace to a specific extraction artifact — `ESTIMATED` anywhere is a build failure.
- **Builder Agents** — Dispatched in parallel during Phase 3. One per component or small component group. Each runs in its own worktree.
- **Prototyper Agent** — ALWAYS last, ALWAYS spawned three times in parallel (Variation A, B, C). The user picks one; the other two are deleted.

**How to invoke a sub-agent:** Read the agent's `.md` file, then call the `Agent` tool with that file's full contents as the system prompt. Always inline the spec contents in the prompt — never tell a sub-agent to "go read the spec file."

## Scope Defaults

The target is whatever page `$ARGUMENTS` resolves to. Clone exactly what's visible at that URL. Unless the user specifies otherwise, use these defaults:

- **Fidelity level:** Pixel-perfect — exact match in colors, spacing, typography, animations
- **In scope:** Visual layout and styling, component structure and interactions, responsive design, mock data for demo purposes
- **Out of scope:** Real backend / database, authentication, real-time features, SEO optimization, accessibility audit
- **Customization:** None during initial clone — pure emulation. Edits come after.

If the user provides additional instructions (specific fidelity level, customizations, extra context), honor those over the defaults.

## Pre-Flight

1. **Browser automation is required.** Check for available browser MCP tools (Chrome MCP, Playwright MCP, Browserbase MCP, Puppeteer MCP, etc.). Use whichever is available — if multiple exist, prefer Chrome MCP. If none are detected, ask the user which browser tool they have and how to connect it. This skill cannot work without browser automation.
2. Parse `$ARGUMENTS` as one or more URLs. Normalize and validate each URL; if any are invalid, ask the user to correct them before proceeding. For each valid URL, verify it is accessible via your browser MCP tool.
3. Verify the base project builds: `npm run build`. The Next.js + shadcn/ui + Tailwind v4 scaffold should already be in place. If not, tell the user to set it up first.
4. Create the output directories if they don't exist: `docs/research/`, `docs/research/components/`, `docs/design-references/`, `scripts/`. For multiple clones, also prepare per-site folders like `docs/research/<hostname>/` and `docs/design-references/<hostname>/`.
5. When working with multiple sites in one command, optionally confirm whether to run them in parallel (recommended, if resources allow) or sequentially to avoid overload.

## Guiding Principles

These are the truths that separate a successful clone from a "close enough" mess. Internalize them — they should inform every decision you make.

### 1. Completeness Beats Speed

Every builder agent must receive **everything** it needs to do its job perfectly: screenshot, exact CSS values, downloaded assets with local paths, real text content, component structure. If a builder has to guess anything — a color, a font size, a padding value — you have failed at extraction. Take the extra minute to extract one more property rather than shipping an incomplete brief.

### 2. Small Tasks, Perfect Results

When an agent gets "build the entire features section," it glosses over details — it approximates spacing, guesses font sizes, and produces something "close enough" but clearly wrong. When it gets a single focused component with exact CSS values, it nails it every time.

Look at each section and judge its complexity. A simple banner with a heading and a button? One agent. A complex section with 3 different card variants, each with unique hover states and internal layouts? One agent per card variant plus one for the section wrapper. When in doubt, make it smaller.

**Complexity budget rule:** If a builder prompt exceeds ~150 lines of spec content, the section is too complex for one agent. Break it into smaller pieces. This is a mechanical check — don't override it with "but it's all related."

### 3. Real Content, Real Assets

Extract the actual text, images, videos, and SVGs from the live site. This is a clone, not a mockup. Use `element.textContent`, download every `<img>` and `<video>`, extract inline `<svg>` elements as React components. The only time you generate content is when something is clearly server-generated and unique per session.

**Layered assets matter.** A section that looks like one image is often multiple layers — a background watercolor/gradient, a foreground UI mockup PNG, an overlay icon. Inspect each container's full DOM tree and enumerate ALL `<img>` elements and background images within it, including absolutely-positioned overlays. Missing an overlay image makes the clone look empty even if the background is correct.

### 4. Foundation First

Nothing can be built until the foundation exists: global CSS with the target site's design tokens (colors, fonts, spacing), TypeScript types for the content structures, and global assets (fonts, favicons). This is sequential and non-negotiable. Everything after this can be parallel.

### 5. Extract How It Looks AND How It Behaves

A website is not a screenshot — it's a living thing. Elements move, change, appear, and disappear in response to scrolling, hovering, clicking, resizing, and time. If you only extract the static CSS of each element, your clone will look right in a screenshot but feel dead when someone actually uses it.

For every element, extract its **appearance** (exact computed CSS via `getComputedStyle()`) AND its **behavior** (what changes, what triggers the change, and how the transition happens). Not "it looks like 16px" — extract the actual computed value. Not "the nav changes on scroll" — document the exact trigger (scroll position, IntersectionObserver threshold, viewport intersection), the before and after states (both sets of CSS values), and the transition (duration, easing, CSS transition vs. JS-driven vs. CSS `animation-timeline`).

Examples of behaviors to watch for — these are illustrative, not exhaustive. The page may do things not on this list, and you must catch those too:
- A navbar that shrinks, changes background, or gains a shadow after scrolling past a threshold
- Elements that animate into view when they enter the viewport (fade-up, slide-in, stagger delays)
- Sections that snap into place on scroll (`scroll-snap-type`)
- Parallax layers that move at different rates than the scroll
- Hover states that animate (not just change — the transition duration and easing matter)
- Dropdowns, modals, accordions with enter/exit animations
- Scroll-driven progress indicators or opacity transitions
- Auto-playing carousels or cycling content
- Dark-to-light (or any theme) transitions between page sections
- **Tabbed/pill content that cycles** — buttons that switch visible card sets with transitions
- **Scroll-driven tab/accordion switching** — sidebars where the active item auto-changes as content scrolls past (IntersectionObserver, NOT click handlers)
- **Smooth scroll libraries** (Lenis, Locomotive Scroll) — check for `.lenis` class or scroll container wrappers

### 6. Identify the Interaction Model Before Building

This is the single most expensive mistake in cloning: building a click-based UI when the original is scroll-driven, or vice versa. Before writing any builder prompt for an interactive section, you must definitively answer: **Is this section driven by clicks, scrolls, hovers, time, or some combination?**

How to determine this:
1. **Don't click first.** Scroll through the section slowly and observe if things change on their own as you scroll.
2. If they do, it's scroll-driven. Extract the mechanism: `IntersectionObserver`, `scroll-snap`, `position: sticky`, `animation-timeline`, or JS scroll listeners.
3. If nothing changes on scroll, THEN click/hover to test for click/hover-driven interactivity.
4. Document the interaction model explicitly in the component spec: "INTERACTION MODEL: scroll-driven with IntersectionObserver" or "INTERACTION MODEL: click-to-switch with opacity transition."

A section with a sticky sidebar and scrolling content panels is fundamentally different from a tabbed interface where clicking switches content. Getting this wrong means a complete rewrite, not a CSS tweak.

### 7. Extract Every State, Not Just the Default

Many components have multiple visual states — a tab bar shows different cards per tab, a header looks different at scroll position 0 vs 100, a card has hover effects. You must extract ALL states, not just whatever is visible on page load.

For tabbed/stateful content:
- Click each tab/button via browser MCP
- Extract the content, images, and card data for EACH state
- Record which content belongs to which state
- Note the transition animation between states (opacity, slide, fade, etc.)

For scroll-dependent elements:
- Capture computed styles at scroll position 0 (initial state)
- Scroll past the trigger threshold and capture computed styles again (scrolled state)
- Diff the two to identify exactly which CSS properties change
- Record the transition CSS (duration, easing, properties)
- Record the exact trigger threshold (scroll position in px, or viewport intersection ratio)

### 8. Spec Files Are the Source of Truth

Every component gets a specification file in `docs/research/components/` BEFORE any builder is dispatched. This file is the contract between your extraction work and the builder agent. The builder receives the spec file contents inline in its prompt — the file also persists as an auditable artifact that the user (or you) can review if something looks wrong.

The spec file is not optional. It is not a nice-to-have. If you dispatch a builder without first writing a spec file, you are shipping incomplete instructions based on whatever you can remember from a browser MCP session, and the builder will guess to fill gaps.

### 9. Build Must Always Compile

Every builder agent must verify `npx tsc --noEmit` passes before finishing. After merging worktrees, you verify `npm run build` passes. A broken build is never acceptable, even temporarily.

### 11. Intake First, Always

Before opening a browser or writing a single line of code, spawn the Intake Agent. Even for a simple URL clone, the 10–15 minute intake surfaces requirements, user personas, and aesthetic preferences that prevent hours of rework. A brief with no assumptions beats a clone that looks right but solves the wrong problem.

The Intake Agent's output — `docs/research/PROJECT_BRIEF.md` — is the source of truth for every subsequent agent. If the brief doesn't exist, nothing else can start.

### 12. The Mockup Is Law

After the Designer Agent produces `docs/research/MOCKUP.md`, it becomes the binding visual specification for all component builders. Component builder agents receive the Mockup spec inline in their prompts — not the raw extraction, not your memory of the screenshot. If the Mockup says a button is `#083386` with `12px` radius and `48px` height, every builder gets exactly those values.

The Mockup also defines every interaction state, every hover transition property, every active-state accent element. Builders who receive a complete Mockup produce complete components.

### 13. Data-First — No Inline Literals for Repeating Elements

Every list, grid, sidebar, accordion, or carousel on the target page has real data behind it. That data must be extracted as a typed TypeScript array during Phase 3, written into the component spec's **Live Data Record** section, and then copied verbatim into the implementation. It is never reconstructed from memory or approximated.

**The rule:** If more than two items share the same component structure (same shape, different content), they come from a data array — never from repeated inline JSX literals.

This covers: sidebar nav item lists, track/accordion card collections, feature card grids, challenge lists, tab arrays, step sequences, pricing tiers, testimonial collections, nav menus — any repeating element.

**Why it matters.** A hardcoded `<li>Challenge 3</li>` active state buried in markup is invisible at review time. A typed `CHALLENGES` array at the top of the file is auditable in 10 seconds: count the items, check which has `active: true`, verify it matches the live page. Inline JSX hides the data; a data array surfaces it.

**What "extracted verbatim" means.** During Phase 3 Step 1, run the Repeating Element Extraction script (see below) on every list or grid. The JSON output IS the data. Copy it into a TypeScript array in the spec file. The builder copies that array into the page file. No reinvention, no recounting, no guessing the active item.

**The count must match.** If the live DOM has 10 sidebar challenges, the TypeScript array has exactly 10 entries. If the home page has 6 accordion cards, the `TRACKS` array has exactly 6 entries. A mismatch between the extracted count and the implemented array is a correctness failure.

### 10. Preserve the Design System for Edits

**This is what separates clone-and-edit from clone-only.** During extraction, you are not just building a one-off replica — you are capturing a **design system** that will be reused for future edits. Every design decision you extract becomes a reusable token or pattern.

During the clone phase, you MUST produce a **Design System Reference** file at `docs/research/DESIGN_SYSTEM.md` that captures:

```markdown
# Design System Reference

## Color Palette
| Token Name | Value | Usage |
|---|---|---|
| `--ja-deep-sea` | `#10204b` | Logo, headings, primary text |
| `--ja-primary` | `#083386` | CTA buttons, link hover, active badge text |
| `--ja-bg` | `#eeeeee` | Page background |
| `--ja-card-bg` | `#ffffff` | Card backgrounds |
| `--ja-border` | `#e5e7eb` | Card borders, dividers |
| `--ja-badge-default` | `#dadee7` | IN PROGRESS / NOT STARTED badge bg |
| `--ja-badge-positive` | `#a2e8a5` | COMPLETED badge bg |
| ... | ... | ... |

## Typography Scale
| Element | Font | Size | Weight | Line Height | Color |
|---|---|---|---|---|---|
| Logo | Calistoga | 24px | 400 | — | --ja-deep-sea |
| Page title | Calistoga | 36px | 400 | 47px | --ja-deep-sea |
| Card title (h2) | Inter | 20px | 700 | 28px | --ja-deep-sea |
| ... | ... | ... | ... | ... | ... |

## Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

## Component Patterns
### Card Pattern
- Background: white, rounded-lg (8px), border 1px solid --ja-border, shadow-sm
- Header: flex, items-center, justify-between, p-4
- Body: px-4 pb-4
- Expandable: chevron icon toggles content visibility

### Button Pattern (Primary CTA)
- Background: --ja-primary (#083386)
- Text: white, 14px, font-semibold
- Padding: 0 24px, height 48px
- Border-radius: 12px
- Hover: lighten to #0a40a0
- Icon: ArrowRight, 16px, inline-end

### Button Pattern (Admin Badge)
- Height: 32px, px-3, rounded-lg
- Font: 14px, semibold
- Shadow: sm

### Status Badge Pattern
- Font: 10px, semibold, uppercase
- Padding: 4px 8px
- Border-radius: 4px (default) or 6px (completed)
- States: default (--ja-badge-default bg, gray-700 text), positive (--ja-badge-positive bg, --ja-primary text)

### Step Card Pattern (inside green area)
- White bg, rounded-lg (8px), p-6, shadow-sm
- Icon: 28x28, centered
- Title: 16px bold, mt-3 mb-2
- Description: 14px, gray-600, centered
- Container: flex, gap-24px, with arrow separators

## Layout Patterns
### Page Layout
- Max-width: 1200px, centered
- Content area: max-w-6xl, p-8
- Background: --ja-bg

### Navbar
- Sticky top, z-50, white bg, rounded-b-2xl
- Border: 2px solid --ja-border-heavy (#dadee7)
- Padding: 8px 24px

## Animation / Transition Patterns
- Accordion: instant show/hide (no transition on original)
- Hover on cards/buttons: transition-colors
```

**This file is your bible for all future edits.** When the user asks you to add a new section, change content, or create a new component, you MUST:

1. **Read `docs/research/DESIGN_SYSTEM.md` first** before writing any new code
2. **Use the exact tokens** — don't approximate. If the primary button is `#083386` with `12px` border-radius, every new button you create uses those exact values.
3. **Follow the established patterns** — if existing cards use `rounded-lg shadow-sm border border-gray-200`, new cards use the same treatment.
4. **Match typography scale** — don't invent new font sizes. Use the sizes already in the system.
5. **Match spacing scale** — use the same padding/margin/gap values found in the original.

## Phase 0: Intake & Discovery

**Run before everything else — before screenshots, before browser automation, before any code.**

Spawn the Intake Agent to classify the request, gather requirements from the user, and produce a complete Project Brief.

### How to invoke

1. Read `INTAKE_AGENT.md` from this skill directory (`.claude/skills/clone-and-edit-website/INTAKE_AGENT.md`)
2. Use the `Agent` tool with that file's contents as the system prompt, passing:
   - The user's full input (`$ARGUMENTS` + any message context)
   - Any uploaded files (Figma URLs, screenshots, PDFs, brand assets)
   - The note: "If a URL is provided, classify `url_provided: true` and note the URL — the clone workflow will handle browser extraction after the brief is complete."
3. The Intake Agent runs its full pipeline (Phase 0 silent pre-work → Phase 1 discovery questions → Phase 2 brief compilation)
4. The Project Brief is saved to `docs/research/PROJECT_BRIEF.md`

### What the Intake Agent produces

The Project Brief contains (among other things):
- **Engagement classification:** complexity class (`surgical` / `new_screen` / `zero_to_one`), asset completeness, pipeline routing
- **Design Token Record:** every confirmed color, typography, spacing, radius, shadow — with source
- **Active State Visual Record:** complete active state treatment for every interactive component
- **Visual Design Language:** aesthetic direction, color system, typography, motion — all confirmed with client
- **Success metrics and goal thread:** the primary metric all downstream agents optimize for
- **Scope:** exact in-scope screens and explicit out-of-scope items

### Gate: do not proceed until the brief is complete

The Designer Agent cannot start without a Project Brief. The component builder agents cannot start without the Mockup (which depends on the Brief). Do not skip or shortcut this phase.

**Exception:** If the user provides explicit clear scope (`"clone exactly this URL, no edits"`) and no Figma or brand assets, the Intake Agent may run a compressed intake (Steps 1–3 of Phase 0 only) and produce a minimal brief covering: scope, primary user, goal thread, and any tokens extractable from the URL. The clone workflow then handles full token extraction.

---

## Phase 1: Reconnaissance

Navigate to the target URL with browser MCP.

### Screenshots
- Take **full-page screenshots** at desktop (1440px) and mobile (390px) viewports
- Save to `docs/design-references/` with descriptive names
- **Immediately after saving each screenshot, call the `Read` tool on the saved file path and view the image before proceeding.** A path on disk is not a design reference. Only a viewed screenshot is. This is non-negotiable — do not write a single line of extraction notes until you have confirmed the image renders correctly via `Read`.
- These are your master reference — builders will receive section-specific crops/screenshots later

### Global Extraction
Extract these from the page before doing anything else:

**Fonts** — Inspect `<link>` tags for Google Fonts or self-hosted fonts. Check computed `font-family` on key elements (headings, body, code, labels). Document every family, weight, and style actually used. Configure them in `src/app/layout.tsx` using `next/font/google` or `next/font/local`.

**Colors** — Extract the site's color palette from computed styles across the page. Update `src/app/globals.css` with the target's actual colors in the `:root` and `.dark` CSS variable blocks. Map them to shadcn's token names (background, foreground, primary, muted, etc.) where they fit. Add custom properties for colors that don't map to shadcn tokens.

**Favicons & Meta** — Download favicons, apple-touch-icons, OG images, webmanifest to `public/seo/`. Update `layout.tsx` metadata.

**Global UI patterns** — Identify any site-wide CSS or JS: custom scrollbar hiding, scroll-snap on the page container, global keyframe animations, backdrop filters, gradients used as overlays, **smooth scroll libraries** (Lenis, Locomotive Scroll — check for `.lenis`, `.locomotive-scroll`, or custom scroll container classes). Add these to `globals.css` and note any libraries that need to be installed.

**Header / Top Navbar** — Extract the top header element before any component work. Four common mistakes to avoid:

1. **Wrong element selector.** The top header is rarely a `<nav>` element — it is typically `<header>`, or a `<div>` with `position: fixed; top: 0`. `document.querySelector('nav')` will silently return the SIDEBAR navigation if one exists on the page, producing wrong dimensions and wrong HTML. Identify the header element explicitly: `document.querySelector('header')`, or search by its sticky/fixed+top-0 class pattern. Confirm you have the right element by checking its computed `top` (should be `0px`) and that its height spans the full viewport width.

2. **Navbar height.** Extract `getComputedStyle(headerEl).height` directly from the header element. **Never infer navbar height from the sidebar's `top` value** — a sidebar with `top: 64px` tells you where the sidebar starts, not how tall the header is. These can differ if the header has bottom padding, a bottom border, or a `border-radius` that adds visual bulk below the content.

3. **Logo multi-line rendering.** The logo anchor may display its text across two lines even though the HTML is a single string with no `<br>`. This happens when `display: block` is set on the anchor and its computed `width` is narrower than the full text. Extract `display`, `width`, `height`, and `lineHeight` from the logo element — if `height > lineHeight`, the logo is multi-line. Reproduce this by setting the same `display` and `width` constraint, not by inserting a line break. Using `display: inline` with no width constraint will collapse it to one line and break the navbar layout.

4. **Tab container wrapping.** Extracting only individual tab button styles is insufficient when tabs wrap to multiple rows. Also extract the styles of the **tab list container** (the `<ul>` or wrapper `<div>` that holds all the tab buttons): `display`, `flexWrap`, `width`, `height`, and each tab's `width`. If `(tab count × tab width) > container width`, tabs will wrap to a second row regardless of the outer `flex-wrap` computed value. Confirm by checking the container height: a container that is `N × tab-height` tall has `N` rows. Reproduce the same wrap by giving each tab a matching fixed width.

### Mandatory Interaction Sweep

This is a dedicated pass AFTER screenshots and BEFORE anything else. Its purpose is to discover every behavior on the page — many of which are invisible in a static screenshot.

**Scroll sweep:** Scroll the page slowly from top to bottom via browser MCP. At each section, pause and observe:
- Does the header change appearance? Record the scroll position where it triggers.
- Do elements animate into view? Record which ones and the animation type.
- Does a sidebar or tab indicator auto-switch as you scroll? Record the mechanism.
- Are there scroll-snap points? Record which containers.
- Is there a smooth scroll library active? Check for non-native scroll behavior.

**Click sweep:** Click every element that looks interactive:
- Every button, tab, pill, link, card
- Record what happens: does content change? Does a modal open? Does a dropdown appear?
- For tabs/pills: click EACH ONE and record the content that appears for each state

**Hover sweep:** Hover over every element that might have hover states:
- Buttons, cards, links, images, nav items
- Record what changes: color, scale, shadow, underline, opacity

**Responsive sweep:** Test at 3 viewport widths via browser MCP:
- Desktop: 1440px
- Tablet: 768px
- Mobile: 390px
- At each width, note which sections change layout (column → stack, sidebar disappears, etc.) and at approximately which breakpoint the change occurs.

Save all findings to `docs/research/BEHAVIORS.md`. This is your behavior bible — reference it when writing every component spec.

### Page Topology
Map out every distinct section of the page from top to bottom. Give each a working name. Document:
- Their visual order
- Which are fixed/sticky overlays vs. flow content
- The overall page layout (scroll container, column structure, z-index layers)
- Dependencies between sections (e.g., a floating nav that overlays everything)
- **The interaction model** of each section (static, click-driven, scroll-driven, time-driven)

Save this as `docs/research/PAGE_TOPOLOGY.md` — it becomes your assembly blueprint.

## Phase 2: Foundation Build

This is sequential. Do it yourself (not delegated to an agent) since it touches many files:

1. **Update fonts** in `layout.tsx` to match the target site's actual fonts
2. **Update globals.css** with the target's color tokens, spacing values, keyframe animations, utility classes, and any **global scroll behaviors** (Lenis, smooth scroll CSS, scroll-snap on body)
3. **Create TypeScript interfaces** in `src/types/` for the content structures you've observed
4. **Extract SVG icons** — find all inline `<svg>` elements on the page, deduplicate them, and save as named React components in `src/components/icons.tsx`. Name them by visual function (e.g., `SearchIcon`, `ArrowRightIcon`, `LogoIcon`).
5. **Download global assets** — write and run a Node.js script (`scripts/download-assets.mjs`) that downloads all images, videos, and other binary assets from the page to `public/`. Preserve meaningful directory structure.
6. **Write the Design System Reference** — compile `docs/research/DESIGN_SYSTEM.md` from all extracted tokens. This is the master reference for future edits. (See Principle #10 for the template.)
7. Verify: `npm run build` passes

### Asset Discovery Script Pattern

Use browser MCP to enumerate all assets on the page:

```javascript
// Run this via browser MCP to discover all assets
JSON.stringify({
  // <img> elements — including srcset and <picture> sources
  images: [...document.querySelectorAll('img')].map(img => ({
    src: img.src,
    currentSrc: img.currentSrc,
    srcset: img.getAttribute('srcset') || null,
    sizes: img.getAttribute('sizes') || null,
    alt: img.alt,
    width: img.naturalWidth,
    height: img.naturalHeight,
    // <picture> sibling <source> elements
    pictureSources: img.closest('picture')
      ? [...img.closest('picture').querySelectorAll('source')].map(s => ({
          media: s.media, srcset: s.srcset, type: s.type
        }))
      : null,
    parentClasses: img.parentElement?.className || '',
    siblings: img.parentElement ? [...img.parentElement.querySelectorAll('img')].length : 0,
    position: getComputedStyle(img).position,
    zIndex: getComputedStyle(img).zIndex
  })),
  // <video> elements
  videos: [...document.querySelectorAll('video')].map(v => ({
    src: v.src || v.querySelector('source')?.src,
    srcset: [...v.querySelectorAll('source')].map(s => ({ src: s.src, type: s.type, media: s.media })),
    poster: v.poster,
    autoplay: v.autoplay,
    loop: v.loop,
    muted: v.muted
  })),
  // CSS background-image URLs — parse compound values (e.g. linear-gradient + url())
  backgroundImages: [...document.querySelectorAll('*')].filter(el => {
    const bg = getComputedStyle(el).backgroundImage;
    return bg && bg !== 'none';
  }).map(el => {
    const bg = getComputedStyle(el).backgroundImage;
    // Extract all url(...) references from compound values
    const urls = [...bg.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map(m => m[1]);
    return {
      rawValue: bg,
      urls,
      element: el.tagName + (el.id ? '#' + el.id : '') + '.' + (el.className?.toString().split(' ')[0] || '')
    };
  }),
  // Inline SVGs — extract full outerHTML so icon paths are captured verbatim
  inlineSvgs: [...document.querySelectorAll('svg')].map((svg, i) => ({
    index: i,
    outerHTML: svg.outerHTML.slice(0, 4000),
    viewBox: svg.getAttribute('viewBox'),
    width: svg.getAttribute('width') || getComputedStyle(svg).width,
    height: svg.getAttribute('height') || getComputedStyle(svg).height,
    parentClasses: svg.parentElement?.className || '',
    ariaLabel: svg.getAttribute('aria-label') || svg.getAttribute('title') || null
  })),
  fonts: [...new Set([...document.querySelectorAll('*')].slice(0, 300).map(el => getComputedStyle(el).fontFamily))],
  favicons: [...document.querySelectorAll('link[rel*="icon"]')].map(l => ({ href: l.href, sizes: l.sizes?.toString() }))
});
```

Then write a download script that fetches everything to `public/`. Use batched parallel downloads (4 at a time) with proper error handling.

## Phase 2B: Design

**Run after Phase 2 Foundation Build, before dispatching any component builder agents.**

Spawn the Designer Agent to produce the User Journey and Mockup. Component builders cannot start until the Mockup is complete — the Mockup is their visual contract.

**No-estimation constraint:** The Designer Agent must derive every value in MOCKUP.md directly from the extraction artifacts produced in Phases 1–2 (DESIGN_SYSTEM.md, component spec files, screenshots, BEHAVIORS.md). The word `ESTIMATED` anywhere in MOCKUP.md is a build failure — if a value cannot be confirmed from extraction, the Designer Agent must go back to the browser MCP and extract it rather than estimate. This constraint is what keeps three-variation output faithful to the live site: all three variations share the same extracted token foundation; only their spatial and compositional decisions differ.

### How to invoke

1. Read `DESIGNER_AGENT.md` from this skill directory
2. Use the `Agent` tool with that file's contents as the system prompt, passing:
   - `docs/research/PROJECT_BRIEF.md` (full contents or path)
   - All extraction artifacts produced so far:
     - `docs/research/DESIGN_SYSTEM.md`
     - `docs/research/BEHAVIORS.md`
     - `docs/research/PAGE_TOPOLOGY.md`
     - All screenshots in `docs/design-references/`
     - Component spec files in `docs/research/components/` (if any were pre-written)
   - The note: "The clone workflow has completed browser extraction. Use the DESIGN_SYSTEM.md as the ground-truth token source if no Figma file is available."
3. The Designer Agent runs its full pipeline (Phase 0 silent pre-work → User Journey → client checkpoint → Mockup → client checkpoint)
4. The artifacts are saved to:
   - `docs/research/USER_JOURNEY.md`
   - `docs/research/MOCKUP.md`

### What the Designer Agent produces

- **User Journey:** Every step of the primary flow, every decision point, every drop-off risk and intervention — grounded in the extracted site data
- **Part A visual renders (per screen):** Barebones HTML spatial diagrams showing where every zone and component lives, at accurate proportions
- **Part B text specifications (per screen):** Every component with exact visual values, pixel redlines, Component Handoff Schemas, active state records, and edge case specs
- **Designer Notes:** Living Token Reference, active state documentation, pixel redline summary, component assembly order, distinctiveness log — everything the Prototyper and builders need

### How the Mockup feeds component builders

After the Mockup is complete, component builder agents in Phase 3 receive:
- The Mockup's Part B spec for their section (inline in prompt)
- The relevant Component Handoff Schemas
- The Living Token Reference block (for token values)
- The Designer Notes active state documentation (for interaction states)

Builders no longer need to guess at visual values — the Mockup tells them exactly what to build.

---

## Phase 3: Component Specification & Dispatch

This is the core loop. For each section in your page topology (top to bottom), you do THREE things: **extract**, **write the spec file**, then **dispatch builders**.

### Step 1: Extract

For each section, use browser MCP to extract everything:

1. **Screenshot** the section in isolation (scroll to it, screenshot the viewport). Save to `docs/design-references/`. **Immediately call `Read` on the saved path and view the image before writing any extraction notes or spec content for this section.** If the image fails to render, recapture and retry before proceeding.

2. **Extract CSS** for every element in the section. Use the extraction script below — don't hand-measure individual properties. Run it once per component container and capture the full output:

```javascript
// Per-component extraction — run via browser MCP
// Replace SELECTOR with the actual CSS selector for the component
(function(selector) {
  const el = document.querySelector(selector);
  if (!el) return JSON.stringify({ error: 'Element not found: ' + selector });
  const props = [
    // Typography
    'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
    'textTransform','textDecoration','textAlign','fontStyle','fontVariationSettings',
    'WebkitLineClamp','whiteSpace','textOverflow','wordBreak',
    // Box model
    'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
    'margin','marginTop','marginRight','marginBottom','marginLeft',
    'width','height','maxWidth','minWidth','maxHeight','minHeight',
    // Flexbox / Grid
    'display','flexDirection','flexWrap','justifyContent','alignItems','alignSelf',
    'gap','columnGap','rowGap','flex','flexShrink','flexGrow',
    'gridTemplateColumns','gridTemplateRows','gridColumn','gridRow',
    // Background / Surface
    'backgroundColor','background','backgroundImage','backgroundSize',
    'backgroundPosition','backgroundRepeat','backgroundClip',
    // Border / Shadow / Shape
    'borderRadius','border','borderTop','borderBottom','borderLeft','borderRight',
    'borderColor','borderWidth','borderStyle','outline','outlineOffset',
    'boxShadow',
    // Overflow / Scroll
    'overflow','overflowX','overflowY','scrollSnapAlign','scrollSnapStop','scrollMargin',
    // Positioning
    'position','top','right','bottom','left','zIndex','isolation',
    // Visual effects
    'opacity','transform','transition','cursor','visibility','pointerEvents',
    'objectFit','objectPosition','mixBlendMode','filter','backdropFilter',
    'clipPath','maskImage','maskSize','maskPosition','maskRepeat',
    // Misc
    'willChange','userSelect','listStyle','tableLayout','verticalAlign'
  ];
  function extractStyles(element) {
    const cs = getComputedStyle(element);
    const styles = {};
    // Only filter out genuinely empty/unset values — keep intentional 0px, auto, normal, transparent
    props.forEach(p => {
      const v = cs[p];
      if (v !== null && v !== undefined && v !== '') styles[p] = v;
    });
    // Also capture pseudo-element styles for ::before and ::after
    const before = getComputedStyle(element, '::before');
    const after = getComputedStyle(element, '::after');
    const beforeContent = before.content;
    const afterContent = after.content;
    if (beforeContent && beforeContent !== 'none' && beforeContent !== '""') {
      styles['::before'] = { content: beforeContent, display: before.display, width: before.width, height: before.height, backgroundColor: before.backgroundColor, position: before.position, top: before.top, left: before.left };
    }
    if (afterContent && afterContent !== 'none' && afterContent !== '""') {
      styles['::after'] = { content: afterContent, display: after.display, width: after.width, height: after.height, backgroundColor: after.backgroundColor, position: after.position, top: after.top, left: after.left };
    }
    return styles;
  }
  function walk(element, depth) {
    if (depth > 8) return null; // increased from 4 — complex components can go deep
    const children = [...element.children];
    // Extract inline SVG paths verbatim — do not just count them
    const svgEl = element.tagName === 'SVG' ? element : null;
    return {
      tag: element.tagName.toLowerCase(),
      id: element.id || null,
      classes: element.className?.toString() || '', // full className, not truncated
      text: element.childNodes.length === 1 && element.childNodes[0].nodeType === 3 ? element.textContent.trim().slice(0, 500) : null,
      allText: element.textContent.trim().slice(0, 500), // all descendant text for verification
      styles: extractStyles(element),
      // Image elements — full metadata
      images: element.tagName === 'IMG' ? {
        src: element.src, currentSrc: element.currentSrc,
        srcset: element.getAttribute('srcset'),
        alt: element.alt, naturalWidth: element.naturalWidth, naturalHeight: element.naturalHeight,
        // Check for <picture> parent
        pictureSource: element.closest('picture')
          ? [...element.closest('picture').querySelectorAll('source')].map(s => ({ media: s.media, srcset: s.srcset, type: s.type }))
          : null
      } : null,
      // Inline SVG — extract full outerHTML so paths/icons are captured verbatim
      svg: element.tagName === 'SVG' ? {
        outerHTML: element.outerHTML.slice(0, 4000), // full SVG markup
        viewBox: element.getAttribute('viewBox'),
        width: element.getAttribute('width'),
        height: element.getAttribute('height')
      } : null,
      childCount: children.length,
      // All children — no truncation. Depth limit controls the tree size.
      children: children.map(c => walk(c, depth + 1)).filter(Boolean)
    };
  }
  return JSON.stringify(walk(el, 0), null, 2);
})('SELECTOR');
```

3. **Extract multi-state styles** — for any element with multiple states (scroll-triggered, hover, active tab), capture BOTH states:

```javascript
// State A: capture styles at current state (e.g., scroll position 0)
// Then trigger the state change (scroll, click, hover via browser MCP)
// State B: re-run the extraction script on the same element
// The diff between A and B IS the behavior specification
```

Record the diff explicitly: "Property X changes from VALUE_A to VALUE_B, triggered by TRIGGER, with transition: TRANSITION_CSS."

4. **Extract real content** — all text, alt attributes, aria labels, placeholder text. Use `element.textContent` for each text node. For tabbed/stateful content, **click each tab and extract content per state**.

   **Locked string rule — no paraphrasing permitted.** Every string in the following categories is locked: button labels, input placeholder text, guide/hint text, panel headings, banner messages, tooltip copy, error messages, and any instructional micro-copy. These strings are verbatim character-for-character — do NOT rephrase, simplify, reword, capitalize differently, or add/remove punctuation. Extract them by reading `element.textContent.trim()` or `element.getAttribute('placeholder')` directly from the live DOM. If a string appears in a Playwright accessibility-tree snapshot (`.playwright-mcp/*.yml`), that appearance confirms the verbatim text; copy it exactly. "Reset Conversation" is not "Reset". "Type your prompt here..." is not "Type your content here...". The 🚀 emoji in a challenge banner is not optional — it is part of the string.

   **Icon type discrimination — required per element.** For every icon or image in the section, classify its DOM type before implementing it in JSX:
   - `img-element` — an `<img>` tag in the live DOM (has `src` attribute on the element). Implement as `<img src="..." />` in JSX. Never substitute with an SVG component or Lucide icon.
   - `css-background` — background-image on a non-`<img>` element (no `<img>` tag, but `getComputedStyle(el).backgroundImage` returns a URL). Implement via `style={{ backgroundImage: "url(...)" }}`.
   - `inline-svg` — an `<svg>` element in the DOM. Extract the full `<svg>` outerHTML and add to `src/components/icons.tsx` as a named React component.
   - `none` — element has no icon (no `<img>`, no background image, no `<svg>`). Do not add any icon placeholder.

   Record the `iconType` for every icon slot in the spec. A `none` type means **zero icon markup** — do not add a Lucide icon or generic SVG "for completeness."

5. **Identify assets** this section uses — which downloaded images/videos from `public/`, which icon components from `icons.tsx`. Check for **layered images** (multiple `<img>` or background-images stacked in the same container).

6. **Extract all repeating elements as structured data** — for every list, nav, grid, accordion, or carousel in this section, run the following script via browser MCP. This produces the raw data for the **Live Data Record** in the spec file and becomes the TypeScript array in the implementation.

```javascript
// Repeating element extraction — replace CONTAINER and ITEM selectors
// Run once per repeating element (sidebar nav, track list, challenge list, feature cards, etc.)
(function(containerSelector, itemSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return JSON.stringify({ error: 'Container not found: ' + containerSelector });
  const items = [...container.querySelectorAll(itemSelector)];
  return JSON.stringify({
    containerSelector,
    itemSelector,
    totalCount: items.length,
    items: items.map((item, index) => {
      const cs = getComputedStyle(item);
      const img = item.querySelector('img');
      // Active state detection — checks multiple signals
      // Active state detection — explicit signals only. NO background-color heuristics.
      // Background color is NOT a reliable active signal: striped rows, hover states, and
      // default card surfaces all produce non-white backgrounds without being active.
      const isActive =
        item.getAttribute('aria-selected') === 'true' ||
        item.getAttribute('aria-current') === 'true' ||
        item.getAttribute('data-active') === 'true' ||
        item.getAttribute('data-selected') === 'true' ||
        item.getAttribute('data-state') === 'active' ||
        item.getAttribute('data-state') === 'selected' ||
        [...item.classList].some(c =>
          c === 'active' || c === 'selected' || c === 'current' ||
          c.endsWith('-active') || c.endsWith('-selected') || c.endsWith('--active') || c.endsWith('--selected')
        );
      // Separately record raw background and border-left for the builder to verify visually
      const rawActiveIndicators = {
        backgroundColor: cs.backgroundColor,
        borderLeftWidth: cs.borderLeftWidth,
        borderLeftColor: cs.borderLeftColor,
        borderLeftStyle: cs.borderLeftStyle,
      };
      return {
        index,
        // Text
        labelText: item.textContent.trim().replace(/\s+/g, ' ').slice(0, 200),
        directText: [...item.childNodes]
          .filter(n => n.nodeType === 3).map(n => n.textContent.trim()).filter(Boolean)[0] || null,
        // Icon / image
        iconSrc: img?.getAttribute('src') || null,
        iconFilename: img?.getAttribute('src')?.split('/').pop() || null,
        iconAlt: img?.getAttribute('alt') || null,
        iconWidth: img?.getAttribute('width') || null,
        // Icon type discrimination — MUST be recorded for every item
        // 'img-element': <img> tag present in DOM → implement as <img> in JSX
        // 'css-background': no <img> but getComputedStyle shows background-image URL
        // 'inline-svg': <svg> element present, no <img>
        // 'none': no icon of any kind → zero icon markup in JSX
        iconType: (() => {
          if (img) return 'img-element';
          if (item.querySelector('svg')) return 'inline-svg';
          const bg = getComputedStyle(item).backgroundImage;
          if (bg && bg !== 'none') return 'css-background';
          return 'none';
        })(),
        // State — from explicit DOM signals only (see isActive logic above)
        isActive,
        // Raw computed indicators — builder must cross-reference with screenshot to confirm
        rawActiveIndicators,
        classes: item.className?.toString() || '',
        fontWeight: cs.fontWeight,
        // Children count (helps detect header vs. leaf items)
        childElementCount: item.childElementCount,
        hasChevron: !!item.querySelector('svg'),
        // Data attributes (often carry state)
        dataAttrs: [...item.attributes]
          .filter(a => a.name.startsWith('data-'))
          .reduce((acc, a) => ({ ...acc, [a.name]: a.value }), {}),
      };
    })
  }, null, 2);
})('CONTAINER_SELECTOR', 'ITEM_SELECTOR');
```

Record the full JSON output in the spec file's **Live Data Record** section. Then convert it to a TypeScript array — this is not documentation, it IS the implementation data. Builders copy it verbatim.

**DOM Hierarchy Audit — run immediately after the repeating element extraction script.**

After you receive the extraction output, check whether any item contains a nested `<ul>` or `<ol>` as a direct child (or grandchild) — indicating a parent → children hierarchy in the live DOM. Use this script:

```javascript
// DOM Hierarchy Audit — run after repeating element extraction
// Replace ITEM_SELECTOR with the same item selector used above
(function(itemSelector) {
  const items = [...document.querySelectorAll(itemSelector)];
  return JSON.stringify(items.map((item, index) => ({
    index,
    labelText: item.textContent.trim().slice(0, 80),
    hasNestedList: !!item.querySelector('ul, ol'),
    nestedItemCount: item.querySelectorAll('li').length,
    // Distinguish parent-level vs leaf-level items
    isParent: !!item.querySelector('ul, ol'),
    // Direct text (excludes child element text) — identifies the parent label
    directText: [...item.childNodes]
      .filter(n => n.nodeType === 3).map(n => n.textContent.trim()).filter(Boolean)[0] || null,
  })));
})(ITEM_SELECTOR);
```

**Hierarchy Rule:** If ANY item has `hasNestedList: true`, the TypeScript interface for this component MUST model hierarchy explicitly — never collapse parent + children into a flat array. Required structure:

```typescript
// When live DOM has parent items containing nested <ul> children:
interface ChildItem {
  label: string;
  iconType: 'img-element' | 'inline-svg' | 'css-background' | 'none';
  iconSrc?: string;       // only if iconType is 'img-element' or 'css-background'
  isActive: boolean;
}

interface ParentItem {
  label: string;
  iconType: 'img-element' | 'inline-svg' | 'css-background' | 'none';
  iconSrc?: string;
  isActive: boolean;
  children?: ChildItem[];  // present when live DOM has a nested <ul> under this <li>
}
```

A flat array (`type: 'section' | 'item'`) is WRONG when the live DOM has true nested lists. Flat type discriminators lose the parent-child relationship and produce structurally incorrect markup. If the hierarchy audit shows nesting, use a nested interface. No exceptions.

**Repeating elements that always require this extraction:**
- Sidebar / navigation item lists (every item, in DOM order)
- Accordion / track card collections (every card with its title, icon path, badge, open/closed state)
- Feature card grids (every card with icon, heading, description)
- Challenge / step / item lists (every item with its label, icon, status, active flag)
- Tab bars (every tab with its label and whether it is the selected tab)
- Any other element that appears more than twice with the same structure

7. **Assess complexity** — how many distinct sub-components does this section contain? A distinct sub-component is an element with its own unique styling, structure, and behavior (e.g., a card, a nav item, a search panel).

### Step 2: Write the Component Spec File

For each section (or sub-component, if you're breaking it up), create a spec file in `docs/research/components/`. This is NOT optional — every builder must have a corresponding spec file.

**File path:** `docs/research/components/<component-name>.spec.md`

**Template:**

```markdown
# <ComponentName> Specification

## Overview
- **Target file:** `src/components/<ComponentName>.tsx`
- **Screenshot:** `docs/design-references/<screenshot-name>.png`
- **Interaction model:** <static | click-driven | scroll-driven | time-driven>

## DOM Structure
<Describe the element hierarchy — what contains what>

## Computed Styles (exact values from getComputedStyle)

### Container
- display: ...
- padding: ...
- maxWidth: ...
- (every relevant property with exact values)

### <Child element 1>
- fontSize: ...
- color: ...
- (every relevant property)

### <Child element N>
...

## States & Behaviors

### <Behavior name, e.g., "Scroll-triggered floating mode">
- **Trigger:** <exact mechanism — scroll position 50px, IntersectionObserver rootMargin "-30% 0px", click on .tab-button, hover>
- **State A (before):** maxWidth: 100vw, boxShadow: none, borderRadius: 0
- **State B (after):** maxWidth: 1200px, boxShadow: 0 4px 20px rgba(0,0,0,0.1), borderRadius: 16px
- **Transition:** transition: all 0.3s ease
- **Implementation approach:** <CSS transition + scroll listener | IntersectionObserver | CSS animation-timeline | etc.>

### Hover states
- **<Element>:** <property>: <before> → <after>, transition: <value>

## Per-State Content (if applicable)

### State: "Featured"
- Title: "..."
- Subtitle: "..."
- Cards: [{ title, description, image, link }, ...]

### State: "Productivity"
- Title: "..."
- Cards: [...]

## Assets
- Background image: `public/images/<file>.webp`
- Overlay image: `public/images/<file>.png`
- Icons used: <ArrowIcon>, <SearchIcon> from icons.tsx

## Text Content (verbatim)
<All text content, copy-pasted from the live site>

## Live Data Record (repeating elements — extracted verbatim, becomes TypeScript arrays)

*Complete this section for every list, grid, nav, accordion, or carousel in this component. If there are no repeating elements, write "N/A — no repeating elements."*

*This section is NOT documentation. It IS the implementation data. Builders copy the TypeScript arrays verbatim into the page file.*

### [Repeating Element Name, e.g., "Sidebar Navigation Items"]

**Extraction query:** `containerSelector: '...'`, `itemSelector: '...'`
**Live DOM item count:** [N] — *builder's array MUST have exactly this many entries*
**Active/selected item index:** [N, or "none"]

Raw extraction output (paste the full JSON from the Repeating Element Extraction script):
```json
[
  { "index": 0, "labelText": "...", "iconFilename": "...", "isActive": false, ... },
  { "index": 1, "labelText": "...", "iconFilename": "...", "isActive": false, ... }
]
```

TypeScript data array (builder copies this verbatim into the component file — do not rewrite, do not approximate):
```typescript
interface [ItemTypeName] {
  label: string;
  icon: string;       // filename only — prepend "/images/[dir]/" in JSX
  isActive: boolean;
  // ...other fields extracted above
}

const [ITEMS_CONST_NAME]: [ItemTypeName][] = [
  // N entries — must match live DOM item count above
];
```

### [Next repeating element, if any]
...

## Responsive Behavior
- **Desktop (1440px):** <layout description>
- **Tablet (768px):** <what changes — e.g., "maintains 2-column, gap reduces to 16px">
- **Mobile (390px):** <what changes — e.g., "stacks to single column, images full-width">
- **Breakpoint:** layout switches at ~<N>px
```

Fill every section. If a section doesn't apply (e.g., no states for a static footer), write "N/A" — but think twice before marking States & Behaviors as N/A. Even a footer might have hover states on links.

### Step 3: Dispatch Builders

Based on complexity, dispatch builder agent(s) in worktree(s):

**Simple section** (1-2 sub-components): One builder agent gets the entire section.

**Complex section** (3+ distinct sub-components): Break it up. One agent per sub-component, plus one agent for the section wrapper that imports them. Sub-component builders go first since the wrapper depends on them.

**What every builder agent receives:**
- The full contents of its component spec file (inline in the prompt — don't say "go read the spec file")
- Path to the section screenshot in `docs/design-references/`
- Which shared components to import (`icons.tsx`, `cn()`, shadcn primitives)
- The target file path (e.g., `src/components/HeroSection.tsx`)
- Instruction to verify with `npx tsc --noEmit` before finishing
- For responsive behavior: the specific breakpoint values and what changes

**Don't wait.** As soon as you've dispatched the builder(s) for one section, move to extracting the next section. Builders work in parallel in their worktrees while you continue extraction.

### Step 4: Merge

As builder agents complete their work:
- Merge their worktree branches into main
- You have full context on what each agent built, so resolve any conflicts intelligently
- After each merge, verify the build still passes: `npm run build`
- If a merge introduces type errors, fix them immediately

The extract → spec → dispatch → merge cycle continues until all sections are built.

## Phase 4: Page Assembly

After all sections are built and merged, wire everything together in `src/app/page.tsx`:

- Import all section components
- Implement the page-level layout from your topology doc (scroll containers, column structures, sticky positioning, z-index layering)
- Connect real content to component props
- Implement page-level behaviors: scroll snap, scroll-driven animations, dark-to-light transitions, intersection observers, smooth scroll (Lenis etc.)
- Verify: `npm run build` passes clean

## Phase 5: Visual QA Diff

After assembly, do NOT declare the clone complete. Take side-by-side comparison screenshots:

1. Open the original site and your clone side-by-side (or take screenshots at the same viewport widths)
2. Compare section by section, top to bottom, at desktop (1440px)
3. Compare again at mobile (390px)
4. For each discrepancy found:
   - Check the component spec file — was the value extracted correctly?
   - If the spec was wrong: re-extract from browser MCP, update the spec, fix the component
   - If the spec was right but the builder got it wrong: fix the component to match the spec
5. Test all interactive behaviors: scroll through the page, click every button/tab, hover over interactive elements
6. Verify smooth scroll feels right, header transitions work, tab switching works, animations play

**Live Reference Screenshots — mandatory before spawning the Prototyper Agent.**

At the end of Phase 5, while the live site is open via browser MCP, capture and save canonical reference screenshots that the Prototyper will use for visual ground-truth:

- Desktop (1440px): save to `docs/design-references/live-ref-[slug]-desktop.png`
- Mobile (390px): save to `docs/design-references/live-ref-[slug]-mobile.png`
- For any auth-gated secondary screens: save each screen as `live-ref-[slug]-[screen-name]-desktop.png`

These files MUST exist before the Prototyper Agent is invoked. The Prototyper receives these paths explicitly in its prompt and must compare its build output against them section-by-section. If the Prototyper cannot find a live-reference file, it must halt and report the missing file rather than building without ground-truth.

Only after this visual QA pass and screenshot save is the Next.js clone complete.

## Phase 6: Test Route

**Run after Visual QA.** Spawn the Prototyper Agent to build a Next.js App Router test route — a live, interactive deliverable the reviewer can open via `npm run dev` and navigate as a real page.

### Extraction Completeness Gate — MUST pass before invoking Prototyper

Before spawning the Prototyper Agent, verify that every required extraction artifact exists on disk. The Prototyper builds from these files — if any are absent, it will fill gaps from memory, producing invented content, wrong structure, or stale data from prior sessions.

```
EXTRACTION COMPLETENESS GATE — CLONE PATH
  docs/research/PROJECT_BRIEF.md             [exists | MISSING — block]
  docs/research/DESIGN_SYSTEM.md             [exists + no ESTIMATED values | MISSING or ESTIMATED — block]
  docs/research/BEHAVIORS.md                 [exists | MISSING — block]
  docs/research/PAGE_TOPOLOGY.md             [exists | MISSING — block]
  docs/design-references/ (≥1 screenshot)    [exists + all screenshots confirmed Read | MISSING — block]
  live-ref-[slug]-desktop.png (Phase 5)      [exists + confirmed Read | MISSING — block]
  docs/research/components/ spec coverage:
    Every section in PAGE_TOPOLOGY.md has a spec file  [yes | NO — list missing sections — block]
    Every spec has Computed Styles section populated   [yes | ESTIMATED/empty — block]
    Every repeating element has Live Data Record JSON  [yes | missing — block]
    Live DOM item counts recorded in all specs         [yes | missing — block]
  docs/research/USER_JOURNEY.md             [exists | MISSING — block]
  docs/research/MOCKUP.md                    [exists + no ESTIMATED values | MISSING or ESTIMATED — block]
```

**Content quality rules — file existence is not enough:**
- A `DESIGN_SYSTEM.md` that contains the word `ESTIMATED` anywhere in the color, typography, or spacing sections is **incomplete** — re-extract those values from the live page before proceeding
- A spec file where Computed Styles section says "see screenshot" or "approximately" is **incomplete** — run the extraction script and populate exact values
- A Live Data Record that says "N/A" for a visible list or nav is **incorrect** — run the repeating element extraction script

**If the page is auth-gated and live extraction was not possible:** The component spec files MUST contain extracted Playwright accessibility-tree snapshot data for every nav, sidebar, and repeating element. To capture a snapshot via Playwright MCP, use `mcp__playwright__browser_snapshot` after navigating to the page (requires auth credentials). The snapshot YAML contains every visible text string, role, and hierarchy — copy it verbatim into the spec's Live Data Record. A snapshot is the minimum floor for auth-gated content; it is not optional. If no snapshot exists, capture one before proceeding.

### How to invoke — always three Prototyper Agents in parallel

Spawn three Prototyper Agents simultaneously, one per variation. Each runs in its own worktree branch.

For each variation (A, B, C), read `PROTOTYPER_AGENT.md` then call the `Agent` tool with:
- `docs/research/PROJECT_BRIEF.md`
- `docs/research/USER_JOURNEY.md`
- `docs/research/MOCKUP.md`
- All screenshots in `docs/design-references/`
- `docs/research/DESIGN_SYSTEM.md`
- Any Figma files or brand assets uploaded by the user
- The variation mandate prepended to the prompt:

| Variation | Route slug | Mandate to prepend |
|---|---|---|
| **A — Faithful** | `[slug]-v1` | `"You are building Variation A — Faithful. Extend the closest existing pattern in DESIGN_SYSTEM.md for every layout decision. No new spatial choices."` |
| **B — Recomposed** | `[slug]-v2` | `"You are building Variation B — Recomposed. Use identical tokens as A but explore an alternative spatial arrangement: different grid, stacking order, or information hierarchy."` |
| **C — Signature** | `[slug]-v3` | `"You are building Variation C — Signature. Apply exactly one bold visual differentiator using only tokens in DESIGN_SYSTEM.md. State it as // SIGNATURE MOVE: at the top of the file."` |

All three agents receive identical extraction artifacts — they diverge only in spatial/compositional decisions, never in token values or content.

After all three complete:
1. Take a screenshot of each at 1440px viewport
2. Present the comparison to the user:

```
THREE-VARIATION OUTPUT — [slug]

  Variation A ([slug]-v1): localhost:3000/tests/[slug]-v1
    Approach: [one sentence — which pattern was extended]

  Variation B ([slug]-v2): localhost:3000/tests/[slug]-v2
    Approach: [one sentence — what was recomposed vs. A]

  Variation C ([slug]-v3): localhost:3000/tests/[slug]-v3
    Approach: [one sentence — what the signature move is]

Which variation would you like to keep? (A/B/C, or describe a direction to explore further)
```

3. After the user selects: promote the chosen route to the canonical slug (`[slug]`), delete the other two routes and their registry entries, update `DESIGN_SYSTEM.md` if Variation C introduced a new documented pattern.

### What each test route is

Each test route is a purpose-built, fully interactive page:
- React functional components with hooks — TypeScript strict, no `any`
- Full interactivity: every trigger-response pair from the User Journey implemented via `useState`/`useEffect`
- Pixel-faithful rendering: every token from the Mockup applied via Tailwind utility classes
- The complete primary flow navigable end-to-end

The reviewer opens any variation via `npm run dev` at `localhost:3000/tests/[slug]-v1` (or v2/v3).

---

## Phase 7: Edit Mode — Modifying the Clone In-Style

After the clone is built and QA'd, the user may request edits — adding sections, changing content, restyling components, or extending the UI. **Every edit must look like it was always part of the original site.**

### How to Handle an Edit Request

When the user asks for a change (e.g., "add a testimonials section", "change the hero text", "add a new card type"):

**Before starting: resolve or ask.** If the edit request leaves genuine design choices open — layout direction, component variant, interaction model — apply **Shared Protocol: Ambiguity Resolution** before writing any code. Ask one well-formed question, wait for the answer, then begin. Never start building a direction the user hasn't confirmed when the request is genuinely ambiguous.

1. **Read the Design System Reference and Mockup first.** Open `docs/research/DESIGN_SYSTEM.md` and `docs/research/MOCKUP.md` before writing a single line of code. The Mockup defines the component patterns; the Design System defines the tokens. This is non-negotiable.

   **For substantial new sections or components:** Spawn the Designer Agent (read `DESIGNER_AGENT.md`, pass the Project Brief + current DESIGN_SYSTEM.md + description of the edit). The Designer Agent produces a Mockup spec for the new section — builders then implement from that spec instead of guessing. After the section is built, re-run the Prototyper Agent to update the test route at `src/app/tests/[slug]/page.tsx`.

2. **Classify the edit:**
   - **Content change** — text, images, data swap. Use existing components, just change props/data.
   - **Style tweak** — color, spacing, font adjustments within existing components. Reference the token table.
   - **New component** — a section or element that doesn't exist yet. Must be built using the design system.
   - **Layout change** — reordering, adding/removing sections, changing responsive behavior.

### Three-Variation Edit Mode

**Trigger:** Every edit — always. Regardless of whether the change is a new component, layout change, content swap, or style tweak, spawn three Prototyper Agents in parallel. The user always sees three options and picks one.

**Why:** Every implementation decision has a decision space, even content changes and style tweaks. Three parallel options make that space visible and let the user pick their preferred direction rather than committing to the first reasonable interpretation.

#### Variation Mode Protocol

1. **Determine the base slug** for this edit (e.g., `hero-cta`, `testimonials`, `footer-v2`).

2. **Write three variation briefs** — one per Prototyper Agent. Each brief contains the full edit description PLUS a variation mandate:

   | Variation | Route slug | Mandate |
   |---|---|---|
   | **A — Faithful** | `[slug]-v1` | Extend the closest existing pattern in DESIGN_SYSTEM.md. Every choice directly applies a documented pattern. No new spatial decisions. |
   | **B — Recomposed** | `[slug]-v2` | Same tokens as A, but explore an alternative layout or information hierarchy. Change the grid structure, stacking order, or spatial grouping while keeping the visual language identical. |
   | **C — Signature** | `[slug]-v3` | Apply one bold, intentional visual differentiator — an unexpected background treatment, strong typographic hierarchy, asymmetric layout, or color field inversion — that makes this section feel specifically crafted. Must still use only design-system tokens. Document the signature move in the Build Decision Log. |

3. **Spawn three Prototyper Agents in parallel** — one per variation. Each agent:
   - Receives the full Project Brief, DESIGN_SYSTEM.md, MOCKUP.md, and BEHAVIORS.md inline
   - Receives its variation brief (mandate A, B, or C) prepended to the prompt
   - Runs in its own worktree branch
   - Produces one route: `src/app/tests/[slug]-v[1|2|3]/page.tsx`, registered in `src/lib/test-registry.ts`

4. **After all three agents complete**, take a screenshot of each variation at 1440px viewport. Present a comparison to the user:

   ```
   THREE-VARIATION COMPARISON — [edit description]

     Variation A ([slug]-v1): localhost:3000/tests/[slug]-v1
       Mandate: Faithful — [one sentence: what existing pattern was extended]
       Screenshot: [saved to docs/design-references/[slug]-v1.png]

     Variation B ([slug]-v2): localhost:3000/tests/[slug]-v2
       Mandate: Recomposed — [one sentence: what spatial decision was made]
       Screenshot: [saved to docs/design-references/[slug]-v2.png]

     Variation C ([slug]-v3): localhost:3000/tests/[slug]-v3
       Mandate: Signature — [one sentence: what the signature move is]
       Screenshot: [saved to docs/design-references/[slug]-v3.png]

   Which variation would you like to keep? (A/B/C, or describe a direction to explore further)
   ```

5. **After the user selects a variation:**
   - Promote the selected route to the canonical slug by renaming the directory and updating the test-registry entry
   - Delete the other two variation routes and their registry entries
   - Update DESIGN_SYSTEM.md if the selected variation introduced new patterns (Variation C especially may add a pattern worth documenting)
   - Run `npm run build` to verify the final state

**Directional preference shortcut:** If the user expresses a clear creative direction before building (e.g., "I want something bold" or "keep it minimal"), tune the variation briefs to cluster around that preference rather than defaulting to the three mandates above verbatim. But never ask for a preference when the request is unambiguous — build all three and let the screenshots answer the question.

3. **For new components, derive styles from the design system:**
   - Headings → use the typography scale from `DESIGN_SYSTEM.md` (pick the closest existing size/weight)
   - Buttons → use the Button Pattern (primary, secondary, or ghost — whichever fits)
   - Cards → use the Card Pattern (same border-radius, border, shadow, padding)
   - Badges → use the Status Badge Pattern
   - Spacing → use the spacing scale (4/8/16/24/32px), don't invent `13px` or `22px`
   - Colors → use **only** colors from the palette table. If a new semantic color is truly needed, derive it from the existing palette (e.g., a lighter tint of `--ja-primary`) and add it to the design system file.

4. **For new sections, follow the existing page structure:**
   - Same max-width container
   - Same card wrapper pattern (white, rounded-lg, border, shadow-sm)
   - Same heading hierarchy (h2 for section titles, h3 for sub-items)
   - Same padding/margin rhythm between sections

5. **Write the edit, then visually verify:**
   - Make the code changes
   - Run `npm run build` to verify it compiles
   - Use browser MCP to screenshot the modified clone
   - Verify the new/changed elements look like they belong — same visual weight, same spacing rhythm, same color palette, same typography scale
   - If something looks "off" compared to the rest of the page, adjust until it blends seamlessly

6. **Update the Design System Reference** if the edit introduces genuinely new patterns:
   - New color added? Add it to the palette table with its usage.
   - New component pattern? Document it in Component Patterns.
   - New typography usage? Add it to the Typography Scale.
   - **Don't update for content-only changes** — the system doesn't change just because text changed.

### Edit Quality Checklist

Before running the Visual QA pass, verify token compliance:

- [ ] New/changed elements use ONLY colors from `DESIGN_SYSTEM.md` palette
- [ ] Typography matches an existing entry in the Typography Scale table
- [ ] Spacing values are from the spacing scale (no invented values)
- [ ] New cards/containers match the Card Pattern (same radius, border, shadow, padding)
- [ ] New buttons match the Button Pattern (correct variant for the context)
- [ ] Responsive behavior is consistent with existing sections
- [ ] `npm run build` passes

Token compliance is necessary but not sufficient. It proves the edit is *correct*. The Visual QA pass below proves it is *beautiful*.

---

### Visual QA & Polish Protocol

**Run this after every edit, without exception. Token compliance does not mean visual quality. An edit is not done until it passes every step below.**

The bar is not "does it look acceptable." The bar is: **does this look as good as or better than the best sections already on the page?** If a design reviewer could tell at a glance that this element was added later by a different hand, it has not passed.

---

#### Step 1: Screenshot Capture

Via browser MCP, take three screenshots:

1. **Isolation screenshot** — scroll to the edited section, screenshot only that section in the viewport (desktop, 1440px). This is your primary review canvas.
2. **Context screenshot** — scroll to show the edited section plus one full section above and one below. This reveals how the edit sits in the flow.
3. **Mobile screenshot** — switch to 390px viewport, screenshot the edited section. Layout correctness matters but feel matters more — does it feel intentional or squeezed?

Save all three. You will reference them in every step below.

---

#### Step 2: The "Belongs Here" Test

Look at the isolation screenshot. Ask these questions — answer each explicitly before moving on:

1. **Same visual weight?** Is the edit's visual density (how "heavy" or "light" it feels) consistent with adjacent sections? A card that feels heavier than the cards around it has wrong shadow depth, padding, or border treatment.
2. **Same corner radius vocabulary?** If the rest of the page uses `rounded-lg` (8px), the edit must too. A `rounded-2xl` (16px) element reads as foreign.
3. **Same elevation language?** Check shadow. If existing cards use `shadow-sm`, a new card with `shadow-md` floats above the page layer — and not in a good way.
4. **Same typography hierarchy?** The edit's heading/body/label size ratio should match the pattern of adjacent sections. A heading that's 4px larger than its neighbors breaks rhythm.
5. **Same color temperature?** Blues, grays, and neutrals have temperature (warm/cool). If the page uses cool grays (`#dadee7`) and the edit introduces a warm gray (`#d4d0cc`), it will read as wrong even if the reviewer can't explain why.

If any answer is "no" or "not sure": fix it before proceeding to Step 3. Do not rationalize a mismatch — correct it.

---

#### Step 3: Visual Hierarchy Check

Look at the isolation screenshot. A well-designed section has a clear reading order. Trace it:

1. **Primary element** — what does the eye land on first? Is that the most important element in the section? If not, the hierarchy is inverted. Fix it: increase the primary element's visual weight (larger type, stronger color, more whitespace around it) or reduce competing elements.
2. **Secondary elements** — do supporting elements recede appropriately? Labels, captions, and metadata should feel quieter than headings and CTAs.
3. **CTA prominence** — if the section has an action button, is it the most visually prominent interactive element on screen? An underpowered CTA costs conversion.
4. **Nothing competes** — are there two elements fighting for dominance? Equal weight = visual noise. One must win.

If the reading order is wrong: fix the hierarchy before continuing.

---

#### Step 4: Breathing Room Check

Look at the context screenshot. Whitespace is not wasted space — it's the visual structure that makes content readable. Check:

1. **Vertical rhythm** — does the gap above and below the edited section match the gap between other sections? If other sections have `mb-6` between them and the edit has `mb-2`, it reads as cramped.
2. **Internal padding** — does the padding inside the edited element match the padding of similar elements? A card with `p-4` next to cards with `p-6` looks underdone.
3. **Text breathing room** — is there enough space between the heading and the body copy? Between body copy and the CTA? Cramped text = rushed, unpolished feel.
4. **Proportional balance** — step back from the context screenshot and unfocus your eyes. Is the edit a balanced zone of the page, or does it feel oddly sized relative to its neighbors?

If anything feels cramped, overly airy, or disproportionate: adjust spacing until the rhythm feels consistent.

---

#### Step 5: Aesthetic Quality Bar

This is the hardest check and the most important. Look at the isolation screenshot and answer:

1. **"AI-generated" test** — does this look like a human designer made it, or does it look like an AI filled in a template? Specific failure patterns:
   - Perfectly symmetric layout with no compositional tension
   - Every element the same visual weight ("flat soup")
   - Generic sans-serif at 14px with line-height 1.5 everywhere
   - Padded card with centered content and a blue button — no distinctiveness at all
   - Multiple elements crammed in because "users might want to see them"

2. **Distinctiveness** — what is the ONE visual thing about this edit that is specific to this brand and this page? It doesn't have to be dramatic — a well-placed accent color, a specific typographic weight choice, a subtle shadow gradient. But something must be intentional and specific. If the answer is "nothing," the design is generic. Make one deliberate visual choice that anchors the edit to the brand.

3. **"Would I show this in a portfolio?" test** — if you were presenting this design to a client, would you feel proud showing it? If the honest answer is no: fix what's embarrassing before shipping.

---

#### Step 6: Mobile Integrity Check

Look at the mobile screenshot. Mobile is not desktop at smaller width — it's a completely different reading context. Check:

1. **Touch targets** — buttons and interactive elements should be at least 44px tall on mobile. A `h-8` button (32px) that's fine on desktop is too small on mobile.
2. **Text readability** — headings should be at least 18px on mobile. Body at least 14px. Line length should be comfortable (not one word per line, not 80 characters per line).
3. **No horizontal overflow** — nothing should cause horizontal scrolling.
4. **Layout feels intentional** — a single-column stack is fine. A broken two-column grid is not. Check that the responsive layout looks like a design decision, not a fallback.
5. **Hierarchy survives** — the reading order from Step 3 should still hold on mobile. The primary element should still win.

---

#### Iteration Gate

After completing all six steps, make a binary decision:

**PASS** — every step passes. No rationalizations, no "it's close enough." The edit is done.

**ITERATE** — any step has a failure or a "not sure." Go back, fix the specific issue identified in that step, re-screenshot, re-run the failed step (and any downstream steps that could have been affected). Repeat until PASS.

**There is no "ship it and fix it later."** An edit that fails visual QA ships as a permanent part of the site until someone explicitly fixes it. The cost of one more iteration cycle is minutes. The cost of a visually degraded page is ongoing.

---

#### Visual QA Sign-Off

Before declaring the edit complete, produce this sign-off block:

```
EDIT VISUAL QA SIGN-OFF
  Edit description:        [what was added/changed]
  Screenshots taken:       isolation | context | mobile
  Step 2 — Belongs Here:   PASS / FAIL [what was fixed if fail]
  Step 3 — Hierarchy:      PASS / FAIL [what was fixed if fail]
  Step 4 — Breathing Room: PASS / FAIL [what was fixed if fail]
  Step 5 — Aesthetic Bar:  PASS / FAIL [what was fixed if fail]
  Step 6 — Mobile:         PASS / FAIL [what was fixed if fail]
  Iterations required:     [N]
  Distinctive element:     [the one specific visual choice that anchors this edit to the brand]
  Verdict:                 SHIPPED / BLOCKED
```

If Verdict is BLOCKED: do not proceed until every step passes.

### Example Edit Flows

**"Add a new track card for Data Labeling"**
→ Read DESIGN_SYSTEM.md → Copy existing TrackCard pattern → Use same icon size (40x40), same h2 style (20px/700/Inter), same status badge pattern, same accordion behavior → Add to tracks array → Verify build → Screenshot compare.

**"Change the primary button color to purple"**
→ Read DESIGN_SYSTEM.md → Update `--ja-primary` in globals.css → Update the palette table in DESIGN_SYSTEM.md → Verify all buttons using that token updated correctly → Screenshot compare.

**"Add a footer with links"**
→ Read DESIGN_SYSTEM.md → Use page max-width (1200px) → Use existing text colors (gray-500 for body, #10204b for headings) → Use existing font (Inter, 14px for body) → Use existing spacing (p-8, gap-6) → Match border style (border-t, border-gray-200) → Verify build → Screenshot compare.

## Pre-Dispatch Checklist

Before dispatching ANY builder agent, verify you can check every box. If you can't, go back and extract more.

- [ ] Spec file written to `docs/research/components/<name>.spec.md` with ALL sections filled
- [ ] Every CSS value in the spec is from `getComputedStyle()`, not estimated
- [ ] Interaction model is identified and documented (static / click / scroll / time)
- [ ] For stateful components: every state's content and styles are captured
- [ ] For scroll-driven components: trigger threshold, before/after styles, and transition are recorded
- [ ] For hover states: before/after values and transition timing are recorded
- [ ] All images in the section are identified (including overlays and layered compositions)
- [ ] Responsive behavior is documented for at least desktop and mobile
- [ ] Text content is verbatim from the site, not paraphrased
- [ ] The builder prompt is under ~150 lines of spec; if over, the section needs to be split

## What NOT to Do

These are lessons from previous failed clones — each one cost hours of rework:

- **Don't build click-based tabs when the original is scroll-driven (or vice versa).** Determine the interaction model FIRST by scrolling before clicking. This is the #1 most expensive mistake — it requires a complete rewrite, not a CSS fix.
- **Don't extract only the default state.** If there are tabs showing "Featured" on load, click Productivity, Creative, Lifestyle and extract each one's cards/content. If the header changes on scroll, capture styles at position 0 AND position 100+.
- **Don't miss overlay/layered images.** A background watercolor + foreground UI mockup = 2 images. Check every container's DOM tree for multiple `<img>` elements and positioned overlays.
- **Don't build mockup components for content that's actually videos/animations.** Check if a section uses `<video>`, Lottie, or canvas before building elaborate HTML mockups of what the video shows.
- **Don't approximate CSS classes.** "It looks like `text-lg`" is wrong if the computed value is `18px` and `text-lg` is `18px/28px` but the actual line-height is `24px`. Extract exact values.
- **Don't build everything in one monolithic commit.** The whole point of this pipeline is incremental progress with verified builds at each step.
- **Don't reference docs from builder prompts.** Each builder gets the CSS spec inline in its prompt — never "see DESIGN_TOKENS.md for colors." The builder should have zero need to read external docs.
- **Don't skip asset extraction.** Without real images, videos, and fonts, the clone will always look fake regardless of how perfect the CSS is.
- **Don't give a builder agent too much scope.** If you're writing a builder prompt and it's getting long because the section is complex, that's a signal to break it into smaller tasks.
- **Don't bundle unrelated sections into one agent.** A CTA section and a footer are different components with different designs — don't hand them both to one agent and hope for the best.
- **Don't skip responsive extraction.** If you only inspect at desktop width, the clone will break at tablet and mobile. Test at 1440, 768, and 390 during extraction.
- **Don't forget smooth scroll libraries.** Check for Lenis (`.lenis` class), Locomotive Scroll, or similar. Default browser scrolling feels noticeably different and the user will spot it immediately.
- **Don't dispatch builders without a spec file.** The spec file forces exhaustive extraction and creates an auditable artifact. Skipping it means the builder gets whatever you can fit in a prompt from memory.
- **Don't invent new design tokens during edits.** If the palette has 8 colors, don't add a 9th unless the user explicitly asks for a new color. Reuse what exists.
- **Don't eyeball spacing for edits.** Look up the spacing scale in DESIGN_SYSTEM.md. If the existing cards use `mb-6`, your new card uses `mb-6` — not `mb-5` or `mb-8`.
- **Don't skip the Design System Reference.** If you edit without reading it, your additions will look subtly wrong — slightly different colors, inconsistent spacing, mismatched typography.

## Completion

When done with the initial clone, report:

**Agent pipeline status:**
- Intake Agent: `docs/research/PROJECT_BRIEF.md` written ✓/✗
- Designer Agent: `docs/research/USER_JOURNEY.md` + `docs/research/MOCKUP.md` written ✓/✗
- Clone Workflow: Next.js build status (`npm run build` result)
- Prototyper Agent: `src/app/tests/[slug]/page.tsx` built + registered ✓/✗

**Clone details:**
- Total sections built
- Total components created
- Total spec files written (should match components)
- Total assets downloaded (images, videos, SVGs, fonts)
- Visual QA results (any remaining discrepancies)
- Design System Reference status (written and complete)
- Any known gaps or limitations

**Deliverables:**
1. **Next.js clone** — production-quality, runs via `npm run dev`
2. **Test route** — `src/app/tests/[slug]/page.tsx`, live at `localhost:3000/tests/[slug]` via `npm run dev`
3. **Design System Reference** — `docs/research/DESIGN_SYSTEM.md`, reused for all future edits
4. **Project Brief** — `docs/research/PROJECT_BRIEF.md`, source of truth for all agents
5. **Mockup** — `docs/research/MOCKUP.md`, visual contract for all component decisions

Then state: **"Edit mode active — request any changes and they'll be implemented in the same style as the original site. For substantial new sections, I'll run the Designer Agent to spec them before building."**

---

## Shared Protocol: Ambiguity Resolution

This is the canonical standard for every agent and the orchestrator. No agent defines its own escalation behavior. Every agent applies this protocol when encountering a design choice, layout decision, scope question, or implementation detail that cannot be resolved from available assets.

**Decision tree — ask or resolve?**

Run these checks in order before asking anything:

1. Is the answer in the assets (Figma, screenshots, DESIGN_SYSTEM.md, PROJECT_BRIEF.md, source files)? → Resolve from assets. Do not ask.
2. Is there a clear answer from the design system (same pattern as adjacent elements, existing spacing scale, existing token)? → Apply it. Do not ask.
3. Is this a technical implementation detail with no user-visible difference? → Make the safest choice, log in BUILD DECISION LOG. Do not ask.
4. Can it be derived from the user's stated goal or constraints in the brief? → Derive it. Do not ask.
5. None of the above — the ambiguity is a genuine design or scope decision that requires user preference. → **Ask.**

**What never triggers a question:**
- Any value extractable from getComputedStyle() or Figma
- Spacing, color, radius, shadow — look them up in DESIGN_SYSTEM.md or extract them
- "Should I use the same pattern as adjacent sections?" — yes, always
- Technical choices with no visible output difference (useState vs. useReducer, class order, etc.)
- Anything already answered in the Project Brief — re-read before asking

**Question format — mandatory:**

```
[One-sentence observation: the specific thing noticed from assets or context — concrete, not vague]
Two directions:
  A. [Option A — one phrase]  →  [one-sentence consequence]
  B. [Option B — one phrase]  →  [one-sentence consequence]
My recommendation: [A or B] — [one-sentence reason grounded in brief or design system]
Which do you prefer, or should I go with my recommendation?
```

This format lets the user answer with one word. Never ask an open-ended question. Never present more than two options.

**Bundling rules:**
- Bundle related ambiguities into a single question where possible (e.g., "Should this section use the same card width and gap as the track cards?" covers width, gap, and pattern at once)
- If multiple unrelated ambiguities exist: order by impact (P0 before P1), ask only the highest-priority one first, wait for the answer, then ask the next if still needed
- Never ask two questions in the same message that are independent — one question per send, one follow-up maximum per round

**Builder and Prototyper escalation:**
Builders and Prototypers cannot ask the user directly. When a spec gap cannot be resolved from assets or the design system:
1. Log the gap in BUILD DECISION LOG with `★ ESCALATE TO USER`
2. Describe the specific ambiguity: what was observed, what the two reasonable options are, which is recommended
3. Halt the specific component (not the whole build) and report to the orchestrator

The orchestrator formats the escalation using the question format above and asks the user. Build resumes once answered.

---

## Shared Protocol: Copy Gap

This protocol is the single canonical standard for all agents in this pipeline (Intake, Designer, Builder, Prototyper). Every agent references this definition — no agent defines its own.

**When copy is absent from all upstream sources, work through sources in this order:**

1. Check `docs/research/PROJECT_BRIEF.md` §11 Copy Guide — locked strings and terminology rules
2. Check every Figma frame for text nodes (exact strings from the design file)
3. Check every screenshot for visible text (transcribed verbatim)
4. Check every uploaded document, PRD, or research file
5. Check `docs/research/DESIGN_SYSTEM.md` for any copy captured during extraction
6. Only after exhausting all sources: derive from confirmed tone descriptors, using only confirmed product terminology

**Log every gap:**

```
COPY GAP LOG
  [UI location] | [Sources checked (list each)] | [Derivation method] | "[Exact string used]" | ★ NEEDS CLIENT REVIEW
```

**Absolutely prohibited across all agents:** lorem ipsum, "Button", "Label", "Placeholder text", "Enter value here", "Click here", "Coming soon", or any generic filler — in any context, at any priority level.

**The Intake Agent's Copy Gap Log** (in `PROJECT_BRIEF.md` Designer Notes) is the starting reference for downstream agents. Designer and Builder agents check it before doing their own derivation. Prototyper checks it before doing its own derivation. Do not duplicate work already done upstream.

---

## Shared Protocol: Benchmark Fallback

A **benchmark fallback** is a design value taken from a named reference product when no upstream source (Figma, screenshots, Design Token Record, DESIGN_SYSTEM.md) provides the value.

**Approved benchmark sources** (use in this order of preference):

| Name | Use for |
|---|---|
| `benchmark:material-design` | Elevation shadows, spacing increments, motion curves |
| `benchmark:apple-hig` | iOS/macOS spacing, touch target sizes, focus ring style |
| `benchmark:radix-ui` | Interactive component sizing (buttons, inputs, selects) |
| `benchmark:tailwind-defaults` | Typography scale, spacing scale, border-radius |
| `benchmark:wcag-2.1-aa` | Contrast ratios, focus indicator size, touch target minimums |

**Never invented.** "I thought 16px looked right" is not a benchmark fallback — it is an invention. Inventions are prohibited.

**Every benchmark fallback must be:**
1. Named: `benchmark:radix-ui — button height 40px`
2. Flagged in the component's Token Map or BUILD DECISION LOG
3. Listed in the Evaluation Report (Prototyper) or BUILD REPORT (Builder)

**Pass/fail thresholds (Prototyper Evaluation Report):**
- ≤2 benchmark fallbacks in P0 components = PASS
- 3–5 = CONDITIONAL_PASS
- >5 or any hardcoded value (not from approved benchmark list) = FAIL

---

## Shared Protocol: Token Authority

When Figma and screenshots disagree on a visual value, apply this decision rule — consistently across all agents:

| Situation | Rule |
|---|---|
| Figma file is the live design system (recent, matches product) | Figma wins |
| Screenshot shows a live-product behavior not yet in Figma (e.g., an added interaction state, a recent redesign) | Screenshot wins — flag in Fidelity Delta Log |
| Figma shows a component; screenshot shows a different rendered version with the same intent | Figma wins for token values; screenshot wins for interaction behavior |
| No Figma available | Screenshot values are authoritative |
| Screenshot and DESIGN_SYSTEM.md conflict (clone workflow) | DESIGN_SYSTEM.md wins (it was compiled from `getComputedStyle()`, not visual estimation) |

**Delta overrides** (Prototyper): When the Prototyper's Fidelity Delta Log produces a DIVERGES entry, the override enters the Token Map with a `[delta-override]` comment. These do not retroactively invalidate the Designer's Living Token Reference — the Designer's tokens remain the design intent; the delta override reflects live-product reality. Both are recorded and the difference is surfaced in the Evaluation Report.

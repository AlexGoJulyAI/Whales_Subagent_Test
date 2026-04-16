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
| 1 — Intake | `v3_Intake` | Discovers requirements, extracts assets from Figma/URLs, writes `PROJECT_BRIEF.md` |
| 2 — Designer | `v3_Designer` | Builds user journeys, runs **Design Research** (the step defined in this file), generates three visual mockups |
| 3 — Prototyper | `v3_Prototyper` | Converts approved mockup into three interactive HTML prototypes |

**Design Research** (defined in the [Design Research](#design-research) section below) runs inside Phase 2, after the client confirms visual direction and before the first mockup is generated. The Synthesis Table from that phase is a hard gate — no mockup file is written until it is filled.

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
- Design research sources (getdesign.md, Mobbin, and fallbacks) are the primary reference material — they replace what a codebase would normally provide.
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

This phase is driven entirely by what the user said. Do not use a pre-selected category or default aesthetic — derive every search query from the user's actual input. Use `WebFetch` and `WebSearch` directly. This phase is a blocking gate.

### 1. Parse the User's Description

Before opening any source, extract these three things from what the user said and write them down:

- **Style keywords** — aesthetic descriptors the user used or implied (e.g. "dark", "minimal", "cinematic", "editorial", "warm", "clinical", "playful"). If the user named a reference product ("I want it to feel like Linear"), treat that product name as a keyword.
- **Product type** — what kind of product is this (developer tool, fintech app, e-commerce, marketing site, SaaS dashboard, consumer app, etc.)
- **Surface type** — what is being built right now (landing page, onboarding flow, dashboard, settings, pricing page, etc.)

If the user's description is vague ("make it look good", "modern and clean"), stop and ask for one more detail before searching. Vague input produces generic output. One specific answer — even "dark like a code editor but warmer" — produces dramatically better reference material.

### 2. Search getdesign.md

`getdesign.md` hosts 60+ structured DESIGN.md files extracted from real production sites. Each covers color palette, typography hierarchy, component patterns, surface treatments, and guardrails in plain markdown Claude reads directly.

**Step 1 — Search for matching sites using the user's keywords:**

```
WebSearch("site:getdesign.md <style keywords> <product type>")
```

Examples based on user input:
- User says "dark minimal developer tool" → `WebSearch("site:getdesign.md dark minimal developer")`
- User says "luxury automotive feel" → `WebSearch("site:getdesign.md luxury premium automotive")`
- User says "like Stripe but friendlier" → `WebSearch("site:getdesign.md stripe fintech friendly")`

Identify 2–3 sites from the results whose design language best matches what the user described.

**Step 2 — If search returns fewer than 3 candidates, browse the full catalog:**

```
WebFetch("https://getdesign.md")
```

Scan the listing. Pick the 2–3 closest matches by name, description, and aesthetic summary. Use the catalog below only as a quick-reference fallback, not as the primary selection mechanism:

| Aesthetic | Reference slugs |
|-----------|----------------|
| Dark, minimal, developer-focused | `linear.app`, `vercel`, `cursor`, `supabase`, `resend` |
| Dark, cinematic, bold | `shopify`, `runwayml`, `elevenlabs`, `framer`, `minimax` |
| Void-black / terminal-native | `voltagent`, `warp`, `opencode.ai`, `ollama` |
| Premium / luxury | `ferrari`, `lamborghini`, `bugatti`, `apple`, `tesla` |
| Bright, friendly SaaS | `notion`, `intercom`, `figma`, `miro`, `cal` |
| Fintech / enterprise | `stripe`, `coinbase`, `ibm`, `hashicorp`, `revolut` |
| Brutalist / editorial | `theverge`, `wired`, `uber`, `nike` |
| Playful / consumer | `spotify`, `airbnb`, `pinterest`, `zapier`, `airtable` |
| Technical / data-dense | `clickhouse`, `sentry`, `posthog`, `mongodb` |

**Step 3 — Fetch the DESIGN.md files for each match:**

```
WebFetch("https://getdesign.md/<slug>/design-md")
```

From each file, extract and record: background hex, surface hex, accent hex, headline font family + weight, body font family + weight, border-radius pattern, shadow/elevation system, button and card treatments.

Treat all extracted values as **literal spec**. If the DESIGN.md says `#0F0F0F` for background, that value goes into the synthesis table unchanged. If a fetch returns 404 or empty content, skip it and try the next match.

### 3. Search Screen References

Use the same keywords from Step 1 to search for real UI screen references. The goal is 3–5 concrete layout or compositional decisions — not aesthetic labels.

**Primary: Mobbin**

```
WebSearch("site:mobbin.com <surface type> <style keywords>")
```

Examples:
- `WebSearch("site:mobbin.com dashboard dark minimal SaaS")`
- `WebSearch("site:mobbin.com onboarding fintech mobile")`
- `WebSearch("site:mobbin.com landing page editorial")`

From results, extract structural patterns: layout grid, section order, card structure, CTA placement, navigation position, information hierarchy. Read titles, descriptions, and metadata — images are not directly accessible.

**If Mobbin returns fewer than 3 useful results**, search these in order until you have enough:

| Source | Query |
|--------|-------|
| Dribbble | `WebSearch("site:dribbble.com <surface type> <style keywords>")` |
| Awwwards | `WebSearch("site:awwwards.com <style keywords> website")` |
| Screenlane | `WebSearch("site:screenlane.com <surface type>")` |
| Godly | `WebFetch("https://godly.website")` — curated gallery, scan visible titles and descriptions |

Do not move on until you have at least 3 concrete layout decisions sourced from real products.

### 4. Synthesize into the Design Brief

After searching and fetching, write down exactly 6 decisions before writing any code:

| Decision | Source | Value |
|----------|--------|-------|
| **Palette** | getdesign.md | Background / surface / accent hex values |
| **Type pairing** | getdesign.md | Display font + body font + key size/weight rules |
| **Layout pattern** | Mobbin | Grid approach, whitespace density, section rhythm |
| **Surface treatment** | getdesign.md | How elevation/depth/shadow is handled |
| **Signature moment** | Synthesis | The one interaction or visual beat that will make a user remember this interface — name it specifically (e.g. "staggered word entrance on hero load", "CTA background shift on hover", "scroll-triggered feature card reveal") |
| **Anti-pattern** | Synthesis | The one generic choice this aesthetic must never make — name it specifically (e.g. "no glassmorphism cards", "no purple gradient hero", "no floating blob backgrounds", "no Inter on a luxury surface") |

Both the Signature moment and Anti-pattern rows must be filled with specific named decisions, not categories. "Something memorable" is not acceptable. "Staggered text reveal on scroll triggered at 80% viewport" is.

Only proceed to **Design Thinking** once all 6 rows are filled in explicitly. This table becomes the ground truth for the rest of the build.

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

- Pull the 5-row synthesis table from Design Research. Those decisions are now your constraints — work from them, not around them.
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
- Design Research is not optional and cannot be skipped. getdesign.md fetches and at least one screen reference source must inform the design brief before any code is written.
- The 5-row synthesis table must be complete before implementation begins. An incomplete table means the direction is not settled — do not proceed.
- Do not present raw HTML as the final integrated implementation. Port all output into Next.js + shadcn/ui + Tailwind v4 using the repo's real component system.
- `npm run check` must pass clean before the build is considered done. Lint errors and type errors are not acceptable finishing states.
- No two builds should look the same. Vary themes, fonts, layout approaches, and aesthetic registers. Never converge on safe or common defaults across generations.
- Apply detailed product requirements during implementation. Do not try to encode every requirement into a single upfront prompt — iterate.
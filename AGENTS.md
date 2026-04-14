<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Website Reverse-Engineer Template

## What This Is
A reusable template for reverse-engineering any website into a clean, modern Next.js codebase using AI coding agents. The Next.js + shadcn/ui + Tailwind v4 base is pre-scaffolded — just run `/clone-website <url1> [<url2> ...]`.

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **UI:** shadcn/ui (Radix primitives, Tailwind CSS v4, `cn()` utility)
- **Icons:** Lucide React (default — will be replaced/supplemented by extracted SVGs)
- **Styling:** Tailwind CSS v4 with oklch design tokens
- **Deployment:** Vercel

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript check
- `npm run check` — Run lint + typecheck + build

## Code Style
- TypeScript strict mode, no `any`
- Named exports, PascalCase components, camelCase utils
- Tailwind utility classes, no inline styles
- 2-space indentation
- Responsive: mobile-first

## Design Principles
- **Pixel-perfect emulation** — match the target's spacing, colors, typography exactly
- **No personal aesthetic changes during emulation phase** — match 1:1 first, customize later
- **Real content** — use actual text and assets from the target site, not placeholders
- **Beauty-first** — every pixel matters

## Project Structure
```
src/
  app/              # Next.js routes
  components/       # React components
    ui/             # shadcn/ui primitives
    icons.tsx       # Extracted SVG icons as React components
  lib/
    utils.ts        # cn() utility (shadcn)
  types/            # TypeScript interfaces
  hooks/            # Custom React hooks
public/
  images/           # Downloaded images from target site
  videos/           # Downloaded videos from target site
  seo/              # Favicons, OG images, webmanifest
docs/
  research/         # Inspection output (design tokens, components, layout)
  design-references/ # Screenshots and visual references
scripts/            # Asset download scripts
```

## MOST IMPORTANT NOTES
- When launching Claude Code agent teams, ALWAYS have each teammate work in their own worktree branch and merge everyone's work at the end, resolving any merge conflicts smartly since you are basically serving the orchestrator role and have full context to our goals, work given, work achieved, and desired outcomes.
- After editing `AGENTS.md`, run `bash scripts/sync-agent-rules.sh` to regenerate platform-specific instruction files.
- After editing `.claude/skills/clone-website/SKILL.md`, run `node scripts/sync-skills.mjs` to regenerate the skill for all platforms.

## Live Extraction & Build Protocol

These rules apply to **every task** that involves inspecting, cloning, or editing a live webpage. No exceptions, no shortcuts.

### Rule 1 — Screenshots Must Be Viewed Before Any Code Is Written
After capturing any screenshot (via Playwright MCP, CDP script, or any browser tool), you MUST immediately read and view it using the `Read` tool before writing a single line of component code. Saving a screenshot to disk is not the same as viewing it. A path in a variable is not a design reference. **Capture → Read → then code.** If the Read tool fails, recapture and retry before proceeding.

### Rule 2 — Live Page Is The Only Source of Truth
All UI implementation — colors, fonts, spacing, icons, SVG paths, component structure, active states, borders, hover states — must be derived exclusively from live page extraction (screenshots + `getComputedStyle()` + DOM outerHTML). **Never copy, adapt, or reference prior test files** (`src/app/tests/*/page.tsx`) as a design source. Prior tests are comparisons only, not references. If a prior test and the live page disagree, the live page wins.

### Rule 3 — Explicit-Changes-Only
When a brief specifies changes to make, implement exactly and only those changes. Every other UI element must match the live page exactly. Do not "improve," simplify, omit, or substitute any component that was not explicitly called out in the brief. This includes icons, button variants, active-state colors, fonts, backgrounds, and layout structure.

### Rule 4 — Component-by-Component Extraction
Before implementing any component, extract its exact computed styles from the live page. Required per component:
- `background-color`, `color`, `font-family`, `font-size`, `font-weight`, `line-height`
- `padding`, `border`, `border-radius`, `gap`, `width`, `height`
- All active/hover/focus state classes (read from `className`, not just `getComputedStyle`)
- Icon `src` paths, SVG `d` attributes, and dimensions
- Image `src` attributes and their rendered dimensions

### Rule 5 — Never Approximate or Guess
If a value cannot be extracted (element is hidden, requires interaction, or is behind auth), note the gap explicitly and either trigger the interaction (click, hover) to reveal it, or ask the user. "Close enough" is never acceptable. Wrong values compound — one wrong color cascades into wrong hover states, wrong active states, wrong badges.

@docs/research/INSPECTION_GUIDE.md

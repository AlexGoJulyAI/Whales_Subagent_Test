export interface TestScenario {
  slug: string;
  title: string;
  description?: string;
  tags?: string[];
}

/**
 * Central registry of all test scenarios.
 * When you add a new test, add an entry here so it shows on the home page.
 */
const scenarios: TestScenario[] = [
  {
    slug: "gojuly-edit-v3",
    title: "GoJuly.ai UX Fix — Variation C (Signature)",
    description: "2-screen UX fix. SIGNATURE MOVE: sidebar title 'Red Teaming - Beginner' rendered in Calistoga font instead of Inter Bold — the one typographic move that gives the learning page its own visual identity. DELTA 1: 'Go to Job Application' solid primary button (bg #083386) at sidebar bottom below Challenge 10. DELTA 2: AI Red Team accordion COLLAPSED by default so Red Team Sample Submission is immediately visible. Built from scratch, live extraction 2026-04-13.",
    tags: ["clone", "ux-fix", "variation-c", "signature", "calistoga-sidebar", "from-scratch", "playwright-live"],
  },
  {
    slug: "gojuly-edit-v2",
    title: "GoJuly.ai UX Fix — Variation B (Recomposed)",
    description: "2-screen UX fix. RECOMPOSED: sidebar expanded section items wrapped in bg-gray-50 grouping container for clearer hierarchy; 'Go to Job Application' button container uses py-5 with border-gray-300 separator for more visual anchoring. DELTA 1: solid primary button at sidebar bottom. DELTA 2: AI Red Team collapsed by default. Same token palette as Variation A. Built from scratch, live extraction 2026-04-13.",
    tags: ["clone", "ux-fix", "variation-b", "recomposed", "sidebar-grouped", "from-scratch", "playwright-live"],
  },
  {
    slug: "gojuly-edit-v1",
    title: "GoJuly.ai UX Fix — Variation A (Faithful)",
    description: "2-screen UX fix. FAITHFUL: pixel-perfect clone of live site with exactly two delta changes. DELTA 1: 'Go to Job Application' solid navy button (bg #083386, rounded-xl, full-width) at sidebar bottom below Challenge 10 — navigates to home page. DELTA 2: AI Red Team accordion starts COLLAPSED (useState false) so Red Team Sample Submission is immediately visible without scrolling. font-arial on sidebar nav ul. Challenge 3 active: bg-[#fdf2f8] border-l-4 border-[#ec4899]. Built from scratch, live extraction 2026-04-13.",
    tags: ["clone", "ux-fix", "variation-a", "faithful", "from-scratch", "playwright-live", "accordion", "multi-screen"],
  },
  {
    slug: "gojuly-ux-v23",
    title: "GoJuly.ai UX Fix v23 — From-Scratch Live Extraction",
    description: "2-screen UX fix built fresh from live Playwright MCP extraction (2026-04-13, no prior test referenced). Screen 1: Red Teaming - Beginner learning page with 'Go to Job Application' solid primary button (bg #083386) pinned at sidebar bottom below Challenge 10. Screen 2: Home page with AI Red Team accordion COLLAPSED by default so Red Team Sample Submission is immediately visible without scrolling. Sidebar uses font-arial on nav ul. Challenge 3 active: bg-[#fdf2f8] border-l-4 border-[#ec4899]. Starts on Screen 1.",
    tags: ["clone", "ux-fix", "from-scratch", "playwright-live", "accordion", "multi-screen"],
  },
  {
    slug: "gojuly-ux-v22",
    title: "GoJuly.ai UX Fix v22 — From-Scratch Playwright Extraction",
    description: "2-screen UX fix built from scratch via live Playwright MCP extraction (2026-04-13). Starts on Screen 1 (Red Teaming - Beginner learning page). FIX 1: 'Go to Job Application' outlined button (border #083386, 14px 600) pinned at sidebar bottom navigates to home. FIX 2: AI Red Team accordion starts collapsed (aiExpanded: false) so Red Team Sample Submission is immediately visible on the home page without scrolling.",
    tags: ["clone", "ux-fix", "from-scratch", "playwright-live", "accordion", "multi-screen"],
  },
  {
    slug: "gojuly-ux-v21",
    title: "GoJuly.ai UX Fix v21 — 100% From-Scratch Playwright Extraction",
    description: "2-screen UX fix built from zero — no prior test file referenced. Every value derived from fresh live Playwright MCP getComputedStyle() calls (2026-04-13): v21-navbar-and-panels.json, v21-learning-computed.json, v21-sidebar-items-live.json, v21-home-computed.json, v21-home-modules-live.json, v21-home-rtss-h1.json, v21-home-heading.json. DELTA 1: 'Go to Job Application' outlined button (border #083386, arial 14px 600) pinned at sidebar bottom navigates to home. DELTA 2: AI Red Team accordion collapsed (defaultOpen:false) so RTSS is immediately visible. Starts on learning page (Screen2).",
    tags: ["clone", "ux-fix", "from-scratch", "playwright-live", "no-prior-reference", "accordion", "multi-screen"],
  },
  {
    slug: "gojuly-ux-v20",
    title: "GoJuly.ai UX Fix v20 — Fresh Build (Live Playwright MCP Extraction)",
    description: "2-screen UX fix built completely from scratch via live authenticated Playwright MCP extraction (2026-04-13). Screen 1: AI Red Teaming Beginner learning page — sidebar with 15 items (Challenge 3 active: bg-#fdf2f8 border-l-4 #ec4899) + 'Go to Job Application' outlined button pinned to sidebar bottom, navigates to RTSS module (DELTA 1). Screen 2: Home page with AI Red Team accordion COLLAPSED by default so Red Team Sample Submission is immediately visible without scrolling (DELTA 2). Starts on Screen 1 (learning page). Right panel includes Annotation (with tips), Feedback, and Status panels from live DOM snapshot. Input placeholder verbatim: 'Type your prompt here...'",
    tags: ["clone", "ux-fix", "navigation", "accordion", "multi-screen", "from-scratch", "playwright-live"],
  },
  {
    slug: "gojuly-ux-v19",
    title: "GoJuly.ai UX Fix v19 — From Scratch (Live Playwright MCP Extraction)",
    description: "2-screen UX fix built completely from scratch via live authenticated Playwright MCP extraction (2026-04-13). Screen 1: AI Red Teaming Beginner learning page — sidebar with all 10 challenges (Challenge 3 active: bg-pink-50 border-l-4 border-pink-500) + 'Go to Job Application' solid primary button pinned to sidebar bottom (DELTA 1). Screen 2: Home page with AI Red Team accordion COLLAPSED by default so Red Team Sample Submission is immediately visible without scrolling (DELTA 2). Starts on Screen 1 (learning page). Tokens extracted live via getComputedStyle.",
    tags: ["clone", "ux-fix", "navigation", "accordion", "multi-screen", "from-scratch", "playwright-live"],
  },
  {
    slug: "gojuly-ux-v17",
    title: "GoJuly.ai UX Fix v17 — From Scratch (Live Playwright MCP Extraction)",
    description: "2-screen UX fix built completely from scratch via live authenticated Playwright MCP extraction (2026-04-13). Screen 1: AI Red Teaming Beginner learning page with 'Go to Job Application' solid primary button at sidebar bottom below Challenge 10 (DELTA 1). Screen 2: Home page with AI Red Team accordion collapsed by default so Red Team Sample Submission is visible without scrolling (DELTA 2). Challenge count: 10.",
    tags: ["clone", "ux-fix", "navigation", "accordion", "multi-screen", "from-scratch", "playwright-live"],
  },
  {
    slug: "gojuly-ux-v16",
    title: "GoJuly.ai UX Fix v16 — From Scratch (Live Extraction)",
    description: "2-screen UX fix built completely from scratch via live authenticated extraction (2026-04-12). Screen 1: AI Red Teaming Beginner learning page with 'Go to Job Application' outlined button at sidebar bottom (DELTA 1). Screen 2: Home page with AI Red Team accordion collapsed by default so Red Team Sample Submission is visible without scrolling (DELTA 2).",
    tags: ["clone", "ux-fix", "navigation", "accordion", "multi-screen", "from-scratch", "playwright-live"],
  },
  {
    slug: "treehouse-v3",
    title: "TreeHouse SafeChat — v3 (Airbnb-inspired)",
    description: "Mobile-first parental AI safety app built with Airbnb design system. Style: warm white canvas, Rausch Red (#ff385c) accent, three-layer card shadows, 20px radius. Font: Plus Jakarta Sans. 4 screens: Parent Onboarding (5-step wizard with full PRD settings), Parent Dashboard (alerts + chart), Child Login (name + PIN), Child Chatbot.",
    tags: ["mobile", "parental-controls", "ai-safety", "airbnb", "warm-white", "coral", "plus-jakarta-sans"],
  },
  {
    slug: "treehouse-v2",
    title: "TreeHouse SafeChat — v2 (ui-ux-pro-max)",
    description: "Mobile-first parental AI safety app built with ui-ux-pro-max design system. Style: Micro-interactions. Palette: warm orange #F97316 + trust blue #2563EB on cream #FFF7ED. Typography: Baloo 2 (headings) + Comic Neue (body). 4 screens: Parent Onboarding, Parent Dashboard, Child Login, Child Chatbot.",
    tags: ["mobile", "parental-controls", "ai-safety", "ui-ux-pro-max", "micro-interactions", "orange", "baloo2"],
  },
  {
    slug: "treehouse-v1",
    title: "TreeHouse SafeChat — v1 Prototype",
    description: "Mobile-first parental AI safety app. 4 screens: Parent Onboarding (safety settings wizard with Off/Balanced/Strict controls), Parent Dashboard (alerts + activity chart), Child Login (PIN pad, warm gradient), Child Chatbot (SafeChat messaging interface with tutor mode).",
    tags: ["mobile", "parental-controls", "ai-safety", "onboarding", "dashboard", "chat", "aidesigner"],
  },
  {
    slug: "gojuly-ux-v15",
    title: "GoJuly.ai UX Fix v15 — From Scratch (Live Extraction)",
    description: "2-screen UX fix built from scratch via live authenticated extraction (2026-04-12). Screen 1: AI Red Teaming Beginner learning page with 'Go to Job Application' outlined button at sidebar bottom (DELTA 1). Screen 2: Home page with AI Red Team accordion collapsed by default so Red Team Sample Submission is visible (DELTA 2).",
    tags: ["clone", "ux-fix", "navigation", "accordion", "multi-screen", "from-scratch", "playwright-live"],
  },
  {
    slug: "gojuly-ux-v11",
    title: "GoJuly.ai UX Fix v11 — clone-and-edit Pipeline",
    description: "2-screen UX fix built via clone-and-edit pipeline (2026-04-12). Screen 1: Home with AI Red Team collapsed so Red Team Sample Submission is visible. Screen 2: Beginner learning page with 'Go to Job Application' outlined button in sidebar. Starts on Screen 2.",
    tags: ["clone", "ux-fix", "navigation", "accordion", "multi-screen", "clone-and-edit-pipeline"],
  },
  {
    slug: "gojuly-ux-v9",
    title: "GoJuly.ai UX Fix v9 — Live CDP Extraction",
    description: "3-screen UX fix from authenticated CDP extraction (2026-04-12). Fixes v8 icon bug (Challenge 3 active: icon-NotStarted_small.svg). Delta 1: Go to Job Application button in sidebar. Delta 2: AI Red Team accordion collapsed by default.",
    tags: ["clone", "ux-fix", "navigation", "accordion", "multi-screen", "cdp-live", "from-scratch"],
  },
  {
    slug: "gojuly-ux-v8",
    title: "GoJuly.ai UX Fix v8 — From Scratch",
    description: "Fresh 3-screen UX fix: Start Beginner Module → AI Red Team Beginner (Go to Job Application pinned in sidebar) → Home (AI Red Team collapsed so Red Team Sample Submission is visible). Built completely from scratch per live extraction.",
    tags: ["clone", "ux-fix", "navigation", "accordion", "multi-screen", "from-scratch"],
  },
  {
    slug: "gojuly-ux-v7",
    title: "GoJuly.ai UX Fix v7 — From Scratch",
    description: "Fresh 3-screen UX fix: Start Beginner Module → AI Red Team Beginner (Go to Job Application pinned in sidebar) → Home (AI Red Team collapsed so Red Team Sample Submission is visible). Built completely from scratch per problem/solution spec.",
    tags: ["clone", "ux-fix", "navigation", "accordion", "multi-screen", "from-scratch"],
  },
  {
    slug: "gojuly-ux-v6",
    title: "GoJuly.ai UX Fix v6 — From Scratch",
    description: "Fresh 3-screen UX fix: Start Beginner Module → AI Red Team Beginner (Go to Job Application pinned in sidebar) → Home (AI Red Team collapsed so Red Team Sample Submission is visible). Built from scratch per problem/solution spec.",
    tags: ["clone", "ux-fix", "navigation", "accordion", "multi-screen", "from-scratch"],
  },
  {
    slug: "gojuly-ux-v5",
    title: "GoJuly.ai UX Fix v5 — Live Playwright Extraction",
    description: "3-screen UX fix built from fresh Playwright MCP extraction (authenticated). Sidebar active state: bg-pink-50 + border-l-4 border-pink-500. Two-tone heading on Sample Submission entry. Delta: Go to Job Application button + AI Red Team collapsed.",
    tags: ["clone", "ux-fix", "navigation", "accordion", "multi-screen", "playwright-live", "from-scratch"],
  },
  {
    slug: "gojuly-clone",
    title: "GoJuly.ai Home Clone",
    description: "Pixel-perfect clone of app.gojuly.ai/home — dashboard with accordion track cards, navbar, and step flow.",
    tags: ["clone", "dashboard", "accordion", "responsive"],
  },
  {
    slug: "gojuly-learning",
    title: "GoJuly.ai Learning Page (Nav UX Fix)",
    description: "Red Teaming - Beginner learning page with 'Go to Job Application' button in left nav sidebar.",
    tags: ["clone", "navigation", "ux-fix", "sidebar"],
  },
  {
    slug: "gojuly-ux-fix",
    title: "GoJuly.ai UX Fix — Full Journey",
    description: "Combined 3-screen test: Learning page (Go to Job Application button), Home page (AI Red Team collapsed), Sample Submission entry. Navigate between screens via context banner.",
    tags: ["clone", "ux-fix", "navigation", "accordion", "multi-screen"],
  },
  {
    slug: "gojuly-ux-v2",
    title: "GoJuly.ai UX Fix v2 — Net New Build",
    description: "Net-new 3-screen test: Sample Submission entry → Learning page (Go to Job Application button in sidebar) → Home page (AI Red Team collapsed). Accurate sidebar with all 10 challenges from live screenshot.",
    tags: ["clone", "ux-fix", "navigation", "accordion", "multi-screen", "net-new"],
  },
  {
    slug: "gojuly-nav-fix",
    title: "GoJuly.ai Navigation Fix — Figma-Accurate",
    description: "2-screen UX fix: Learning page with Figma-accurate sidebar (Source Sans Pro, 216px, Cloud active bg) + Home page (AI Red Team collapsed). Implements the 'Go to Job Application' button per Figma spec.",
    tags: ["clone", "ux-fix", "navigation", "sidebar", "figma-accurate"],
  },
  {
    slug: "gojuly-prev-conversations",
    title: "GoJuly.ai Previous Conversations Redesign",
    description: "Previous Conversations page with challenge accordion, search with grouped results, and descriptive conversation titles. Full Figma-accurate redesign.",
    tags: ["clone", "redesign", "search", "accordion", "new-screen", "figma-accurate"],
  },
  {
    slug: "gojuly-live-ux",
    title: "GoJuly.ai Live UX Fix — Playwright-Extracted",
    description: "3-screen live UX fix: Sample Submission entry → Beginner Learning page (Go to Job Application button) → Home page (AI Red Team collapsed). CSS values extracted via Playwright MCP from live authenticated pages.",
    tags: ["clone", "ux-fix", "navigation", "accordion", "multi-screen", "playwright-live"],
  },
  {
    slug: "gojuly-ux-v3",
    title: "GoJuly.ai UX Fix v3 — Live Layout Correct",
    description: "3-screen UX fix built from live Playwright layout extraction: correct 3:1 flex-row content layout, tide bg, sidebar, annotation+feedback right column. Delta: Go to Job Application button + AI Red Team collapsed.",
    tags: ["clone", "ux-fix", "navigation", "accordion", "multi-screen", "playwright-live", "layout-correct"],
  },
  {
    slug: "gojuly-ux-v4",
    title: "GoJuly.ai UX Fix v4 — Live CDP Extraction (from scratch)",
    description: "3-screen UX fix built from scratch via live CDP extraction (authenticated). Exact live tokens: 256px Inter sidebar, #fdf2f8 active bg, #dadee7 tide bg, Calistoga title, 52×52 icons. Delta: Go to Job Application button + AI Red Team collapsed.",
    tags: ["clone", "ux-fix", "navigation", "accordion", "multi-screen", "cdp-live", "from-scratch"],
  },
  {
    slug: "gojuly-prev-conv-v3",
    title: "GoJuly Previous Conversations — Variation C (Dark Header Signature)",
    description:
      "Variation C: Signature move — full-bleed dark navy (#10204b) challenge headers with Calistoga white title, giving each challenge section a strong visual anchor. Same search and content-naming as A/B. Built from scratch.",
    tags: ["redesign", "search", "accordion", "variation-c", "signature", "dark-header"],
  },
  {
    slug: "gojuly-prev-conv-v2",
    title: "GoJuly Previous Conversations — Variation B (Challenge Tabs)",
    description:
      "Variation B: Recomposed layout with horizontal challenge tabs (Challenge 1/2/3) instead of accordion. Browse per-challenge or search across all. Content-named titles, real-time search with keyword highlighting. Built from scratch.",
    tags: ["redesign", "search", "tabs", "variation-b", "recomposed"],
  },
  {
    slug: "gojuly-prev-conv-v1",
    title: "GoJuly Previous Conversations — Variation A (Faithful Accordion)",
    description:
      "Variation A: Faithful accordion layout extending GoJuly's existing card pattern. Content-named conversation titles, real-time search with keyword highlighting, all challenges expanded by default. Built from scratch.",
    tags: ["redesign", "search", "accordion", "variation-a", "faithful"],
  },
  {
    slug: "gojuly-prev-conversations-v2",
    title: "GoJuly.ai Previous Conversations v2 — Redesign",
    description:
      "Redesigned Previous Conversations page: content-named conversation titles, real-time search with keyword highlighting, challenge accordions open by default. Built from scratch from live Playwright extraction (2026-04-13). 3 challenges × 3 conversations each = 9 total.",
    tags: [
      "redesign",
      "search",
      "accordion",
      "from-scratch",
      "previous-conversations",
    ],
  },
  {
    slug: "gojuly-prev-conversations-v1",
    title: "GoJuly.ai Previous Conversations v1 — From Scratch",
    description: "Fresh redesign of the Previous Conversations page: descriptive AI-named conversation titles, real-time search with keyword highlighting, status filter chips (All/Guarded/Success/Reset), and challenge accordion. Built from live Playwright extraction.",
    tags: ["redesign", "search", "filter", "accordion", "from-scratch", "inter-font"],
  },
  {
    slug: "example",
    title: "Example Test",
    description: "A minimal starter to verify the test harness works.",
    tags: ["starter"],
  },
];

export function getTestScenarios(): TestScenario[] {
  return scenarios;
}

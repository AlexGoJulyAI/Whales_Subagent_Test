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
    slug: "example",
    title: "Example Test",
    description: "A minimal starter to verify the test harness works.",
    tags: ["starter"],
  },
];

export function getTestScenarios(): TestScenario[] {
  return scenarios;
}

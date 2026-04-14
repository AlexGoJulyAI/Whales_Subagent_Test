import { chromium } from '/Users/alexisonpan/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/index.mjs';

const browser = await chromium.connectOverCDP('http://localhost:52412');
const context = browser.contexts()[0];
const page = context.pages()[0] || await context.newPage();

// Navigate to v17 page
await page.goto('http://localhost:3000/tests/gojuly-ux-v17', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1000);

// Resize to 1440px
await page.setViewportSize({ width: 1440, height: 900 });
await page.waitForTimeout(500);

// Screen 1 — initial viewport
await page.screenshot({
  path: 'docs/design-references/v17-screen1-qa.png',
  clip: { x: 0, y: 0, width: 1440, height: 900 },
  timeout: 10000
});
console.log('Screen 1 screenshot saved');

// Scroll sidebar to bottom to see Go to Job Application button
await page.evaluate(() => {
  const sidebar = document.querySelector('aside');
  if (sidebar) sidebar.scrollTop = sidebar.scrollHeight;
});
await page.waitForTimeout(300);

await page.screenshot({
  path: 'docs/design-references/v17-screen1-sidebar-bottom.png',
  clip: { x: 0, y: 0, width: 1440, height: 900 },
  timeout: 10000
});
console.log('Screen 1 sidebar bottom screenshot saved');

// Click "Go to Job Application" button to switch to Screen 2
const btn = await page.locator('button:has-text("Go to Job Application")').first();
await btn.click();
await page.waitForTimeout(500);

// Screen 2 screenshot
await page.screenshot({
  path: 'docs/design-references/v17-screen2-qa.png',
  clip: { x: 0, y: 0, width: 1440, height: 900 },
  timeout: 10000
});
console.log('Screen 2 screenshot saved');

process.exit(0);

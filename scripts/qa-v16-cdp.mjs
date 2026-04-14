// QA script for gojuly-ux-v16 via CDP
import { chromium } from '/Users/alexisonpan/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/index.mjs';

const browser = await chromium.connectOverCDP('http://localhost:51838');
const context = browser.contexts()[0];
const page = context.pages()[0] || await context.newPage();

// Navigate to v16 on localhost
await page.goto('http://localhost:3000/tests/gojuly-ux-v16', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1000);

// Screenshot Screen 1 — full viewport
await page.screenshot({
  path: 'docs/design-references/qa-v16-screen1-full.png',
  clip: { x: 0, y: 0, width: 1440, height: 900 },
  timeout: 10000
});

// Screenshot sidebar area
await page.screenshot({
  path: 'docs/design-references/qa-v16-screen1-sidebar.png',
  clip: { x: 0, y: 0, width: 280, height: 900 },
  timeout: 10000
});

// Screenshot bottom of sidebar (where Delta 1 button should be)
await page.screenshot({
  path: 'docs/design-references/qa-v16-screen1-sidebar-bottom.png',
  clip: { x: 0, y: 600, width: 280, height: 300 },
  timeout: 10000
});

// Extract QA data from Screen 1
const screen1Data = await page.evaluate(() => {
  const getCs = (el) => el ? window.getComputedStyle(el) : null;

  // Check Delta 1 button
  const gotoBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Go to Job Application'));
  const gotoBtnCs = gotoBtn ? getCs(gotoBtn) : null;

  // Check sidebar
  const sidebar = document.querySelector('[class*="fixed"][class*="overflow-y-auto"], aside, [class*="w-\\[256px\\]"]');

  // Check challenge items count
  const challengeItems = document.querySelectorAll('[class*="challenge"], [class*="Challenge"]');

  // Check navbar
  const navbar = document.querySelector('nav, [class*="navbar"], [class*="h-\\[64px\\]"]');
  const navbarCs = navbar ? getCs(navbar) : null;

  // Count all button text containing 'Go to Job Application'
  const allButtons = Array.from(document.querySelectorAll('button'));
  const gotoButtons = allButtons.filter(b => b.textContent?.includes('Go to Job Application'));

  // Check for active challenge (pink left border)
  const activeItems = Array.from(document.querySelectorAll('[class*="border-l-4"]'));

  // Get page background
  const bodyBg = getCs(document.body)?.backgroundColor;

  return {
    screen: 'Screen 1 — Learning Page',
    hasDelta1Button: !!gotoBtn,
    delta1ButtonCount: gotoButtons.length,
    delta1ButtonText: gotoBtn?.textContent?.trim() || null,
    delta1ButtonBorderColor: gotoBtnCs?.borderColor || null,
    delta1ButtonColor: gotoBtnCs?.color || null,
    delta1ButtonBg: gotoBtnCs?.backgroundColor || null,
    delta1ButtonBorderRadius: gotoBtnCs?.borderRadius || null,
    delta1ButtonHeight: gotoBtnCs?.height || null,
    bodyBackground: bodyBg,
    activeItemsCount: activeItems.length,
    activeItemsClasses: activeItems.map(el => el.className).slice(0, 3),
    allButtonTexts: allButtons.map(b => b.textContent?.trim()).filter(Boolean).slice(0, 30),
  };
});
console.log('SCREEN 1 QA:', JSON.stringify(screen1Data, null, 2));

// Now click Delta 1 button to go to Screen 2
const gotoBtn = await page.$('button:has-text("Go to Job Application")');
if (gotoBtn) {
  await gotoBtn.click();
  await page.waitForTimeout(500);
  console.log('Clicked Go to Job Application — navigated to Screen 2');
} else {
  console.log('ERROR: Delta 1 button not found! Cannot navigate to Screen 2.');
}

// Screenshot Screen 2
await page.screenshot({
  path: 'docs/design-references/qa-v16-screen2-full.png',
  clip: { x: 0, y: 0, width: 1440, height: 900 },
  timeout: 10000
});

// Screenshot Screen 2 — scrolled to see accordion cards
await page.evaluate(() => window.scrollTo(0, 0));

// Extract QA data from Screen 2
const screen2Data = await page.evaluate(() => {
  const getCs = (el) => el ? window.getComputedStyle(el) : null;

  // Check AI Red Team accordion state
  // Look for accordion sections — typically divs with expand/collapse behavior
  const allHeadings = Array.from(document.querySelectorAll('h2, h3, [class*="accordion"]'));

  // Look for "AI Red Team" heading/button
  const aiRedTeamEl = Array.from(document.querySelectorAll('*')).find(el =>
    el.textContent?.trim() === 'AI Red Team' && el.children.length === 0
  );

  // Check if there are any expanded card bodies visible (Delta 2: AI Red Team should be collapsed)
  const allText = document.body.innerText;
  const hasAiRedTeamBodyVisible = allText.includes('Challenge 1') || allText.includes('Challenge 2');

  // Check Red Team Sample Submission visibility
  const sampleSubEl = Array.from(document.querySelectorAll('*')).find(el =>
    el.textContent?.trim() === 'Red Team Sample Submission' && el.children.length < 3
  );

  // Count accordion cards visible
  const accordionCards = document.querySelectorAll('[class*="rounded-2xl"], [class*="rounded-xl"]');

  // Get greeting text
  const greetingEl = Array.from(document.querySelectorAll('h1, h2')).find(el =>
    el.textContent?.includes('Hey') || el.textContent?.includes('Welcome')
  );

  return {
    screen: 'Screen 2 — Home Page',
    aiRedTeamElFound: !!aiRedTeamEl,
    aiRedTeamElText: aiRedTeamEl?.textContent?.trim() || null,
    // Delta 2 check: AI Red Team should be collapsed (body content hidden)
    hasAiRedTeamBodyVisible: hasAiRedTeamBodyVisible,
    delta2Pass: !hasAiRedTeamBodyVisible, // should be true if collapsed
    sampleSubVisible: !!sampleSubEl,
    sampleSubText: sampleSubEl?.textContent?.trim() || null,
    greetingText: greetingEl?.textContent?.trim() || null,
    accordionCardCount: accordionCards.length,
    pageTitle: document.title,
  };
});
console.log('SCREEN 2 QA:', JSON.stringify(screen2Data, null, 2));

// Screenshot scrolled down to see more accordion cards
await page.evaluate(() => window.scrollTo(0, 400));
await page.waitForTimeout(300);
await page.screenshot({
  path: 'docs/design-references/qa-v16-screen2-scrolled.png',
  clip: { x: 0, y: 0, width: 1440, height: 900 },
  timeout: 10000
});

console.log('QA complete. Screenshots saved.');
process.exit(0);

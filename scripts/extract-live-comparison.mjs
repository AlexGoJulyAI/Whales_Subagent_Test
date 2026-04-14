import { chromium } from '/Users/alexisonpan/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/index.mjs';

const browser = await chromium.connectOverCDP('http://localhost:61447');
const context = browser.contexts()[0];
const page = context.pages()[0] || await context.newPage();

// ── Navigate to Home ─────────────────────────────────────────
await page.goto('https://app.gojuly.ai/home', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: 'docs/design-references/live-home-comparison.png', fullPage: false });

const homeData = await page.evaluate(() => {
  const getCSS = (el, props) => {
    const cs = window.getComputedStyle(el);
    return Object.fromEntries(props.map(p => [p, cs.getPropertyValue(p)]));
  };

  // Page background
  const bodyBg = getCSS(document.body, ['background-color', 'font-family']);

  // Hey Alex heading
  const greeting = document.querySelector('h1, [class*="greeting"], [class*="Hey"]');
  const greetingText = greeting ? greeting.textContent.trim() : null;
  const greetingCSS = greeting ? getCSS(greeting, ['font-size','font-weight','font-family','color','margin-bottom']) : null;

  // Track cards
  const cards = [...document.querySelectorAll('[class*="track"], [class*="Track"], [class*="card"], [class*="Card"]')]
    .filter(el => el.offsetHeight > 50 && el.offsetWidth > 200)
    .slice(0, 8)
    .map(el => ({
      text: el.textContent.trim().slice(0, 80),
      cls: el.className,
      css: getCSS(el, ['background-color','border','border-radius','padding','margin','box-shadow','min-height'])
    }));

  // Container / main content area
  const main = document.querySelector('main, [class*="content"], [class*="main"]');
  const mainCSS = main ? getCSS(main, ['max-width','padding','margin','background-color']) : null;

  // Navbar
  const nav = document.querySelector('nav, header');
  const navCSS = nav ? getCSS(nav, ['height','background-color','border-bottom','font-family','font-size']) : null;

  return { bodyBg, greetingText, greetingCSS, cards, mainCSS, navCSS };
});

console.log('=== HOME PAGE ===');
console.log(JSON.stringify(homeData, null, 2));

// ── Navigate to Learning page ─────────────────────────────────
await page.goto(
  'https://app.gojuly.ai/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401?type=objective&id=fc910896-a335-4d32-b741-864336accd12&collection=697352e4-53eb-44d9-ba04-a360ab9e4e6a',
  { waitUntil: 'domcontentloaded', timeout: 30000 }
);
await page.waitForTimeout(1500);
await page.screenshot({ path: 'docs/design-references/live-learning-comparison.png', fullPage: false });

const learningData = await page.evaluate(() => {
  const getCSS = (el, props) => {
    const cs = window.getComputedStyle(el);
    return Object.fromEntries(props.map(p => [p, cs.getPropertyValue(p)]));
  };

  // Sidebar element
  const sidebar = document.querySelector('aside, [class*="sidebar"], [class*="Sidebar"], nav[class*="left"]');
  const sidebarCSS = sidebar ? getCSS(sidebar, ['width','background-color','border-right','font-family','font-size','position','top']) : null;

  // Sidebar header / back button
  const backEl = [...document.querySelectorAll('a,button,div')].find(el =>
    el.textContent.includes('Red Teaming') || el.textContent.includes('Beginner') ||
    (el.children.length < 5 && el.offsetWidth < 300 && el.textContent.trim().length < 80)
  );

  // ALL sidebar nav items — capture structure
  const navItems = sidebar ? [...sidebar.querySelectorAll('li, [role="listitem"], [class*="item"], a')].slice(0, 25).map(el => ({
    text: el.textContent.trim().slice(0, 60),
    cls: el.className,
    css: getCSS(el, ['padding','font-size','font-weight','font-family','color','background-color','border-left'])
  })) : [];

  // Active item
  const activeItem = sidebar?.querySelector('[class*="active"], [class*="selected"], [aria-current="page"]');
  const activeCSS = activeItem ? getCSS(activeItem, ['background-color','border-left','color','font-weight']) : null;
  const activeText = activeItem?.textContent.trim().slice(0, 60) || null;

  // Sidebar header (the breadcrumb "← Red Teaming - Beginner" at top)
  const sidebarHeader = sidebar?.querySelector('div:first-child, header');
  const sidebarHeaderText = sidebarHeader?.textContent.trim().slice(0, 80) || null;
  const sidebarHeaderCSS = sidebarHeader ? getCSS(sidebarHeader, ['padding','font-size','font-weight','background-color','border-bottom','height']) : null;

  // Font family on body
  const bodyFont = window.getComputedStyle(document.body).fontFamily;

  // Top header bar (the area above the chat that shows challenge title)
  const challengeHeader = document.querySelector('[class*="header"], [class*="Header"]');
  const challengeHeaderCSS = challengeHeader ? getCSS(challengeHeader, ['height','background-color','border-bottom','font-size','font-weight','padding','font-family']) : null;
  const challengeHeaderText = challengeHeader?.textContent.trim().slice(0, 100) || null;

  return {
    sidebarCSS,
    sidebarHeaderText,
    sidebarHeaderCSS,
    navItems,
    activeText,
    activeCSS,
    bodyFont,
    challengeHeaderText,
    challengeHeaderCSS
  };
});

console.log('=== LEARNING PAGE ===');
console.log(JSON.stringify(learningData, null, 2));

await browser.disconnect();

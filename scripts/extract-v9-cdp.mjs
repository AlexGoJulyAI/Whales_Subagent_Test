/**
 * CDP Extraction Script for gojuly-ux-v9
 * Connects to the already-authenticated Chrome browser via remote debugging port 61447
 * Captures fresh screenshots and CSS values from live GoJuly.ai pages.
 */
import { chromium } from '/Users/alexisonpan/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/index.mjs';
import fs from 'fs';
import path from 'path';

const PORT = 61447;
const HOME_URL = 'https://app.gojuly.ai/home';
const LEARNING_URL = 'https://app.gojuly.ai/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401?type=objective&id=fc910896-a335-4d32-b741-864336accd12&collection=697352e4-53eb-44d9-ba04-a360ab9e4e6a';
const OUTPUT_DIR = 'docs/design-references';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const browser = await chromium.connectOverCDP(`http://localhost:${PORT}`);
  const context = browser.contexts()[0];
  const existingPages = context.pages();
  console.log(`Connected. Existing pages: ${existingPages.length}`);
  existingPages.forEach(p => console.log('  -', p.url()));

  // Use the existing authenticated page or create a new one
  let page = existingPages[0] || await context.newPage();

  // ─── STEP 1: HOME PAGE ───────────────────────────────────────
  console.log('\n[1/4] Navigating to Home page...');
  await page.goto(HOME_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(2000);

  // Screenshot at 1440px
  await page.setViewportSize({ width: 1440, height: 900 });
  await sleep(500);
  await page.screenshot({
    path: `${OUTPUT_DIR}/v9-home-live-1440.png`,
    fullPage: true
  });
  console.log('  ✓ Home screenshot saved: v9-home-live-1440.png');

  // Extract key CSS + layout from Home page
  const homeExtraction = await page.evaluate(() => {
    const result = {
      title: document.title,
      url: location.href,
      timestamp: new Date().toISOString(),
    };

    // Navbar
    const navbar = document.querySelector('nav') || document.querySelector('[class*="navbar"]');
    if (navbar) {
      const cs = getComputedStyle(navbar);
      result.navbar = {
        tag: navbar.tagName,
        cls: navbar.className?.slice(0, 200),
        height: navbar.getBoundingClientRect().height,
        bg: cs.backgroundColor,
        border: cs.border,
        position: cs.position,
        zIndex: cs.zIndex,
      };
    }

    // Track cards
    const cards = [...document.querySelectorAll('[class*="card"], [class*="Card"]')]
      .filter(el => el.getBoundingClientRect().width > 300)
      .slice(0, 10);
    result.trackCards = cards.map(el => {
      const cs = getComputedStyle(el);
      const header = el.querySelector('[class*="header"], h2, h3');
      const badge = el.querySelector('[class*="badge"], [class*="Badge"]');
      const img = el.querySelector('img');
      return {
        cls: el.className?.slice(0, 150),
        title: header?.textContent?.trim().slice(0, 60) || '',
        badgeText: badge?.textContent?.trim() || '',
        imgSrc: img?.src || img?.getAttribute('src') || '',
        rect: { w: Math.round(el.getBoundingClientRect().width), h: Math.round(el.getBoundingClientRect().height) },
        bg: cs.backgroundColor,
        borderRadius: cs.borderRadius,
        boxShadow: cs.boxShadow,
        border: cs.border,
        marginBottom: cs.marginBottom,
        isExpanded: el.getBoundingClientRect().height > 100,
      };
    });

    // Page bg
    result.pageBg = getComputedStyle(document.body).backgroundColor;

    // Primary heading
    const h1 = document.querySelector('h1');
    if (h1) {
      result.greeting = { text: h1.textContent?.trim(), font: getComputedStyle(h1).fontFamily, size: getComputedStyle(h1).fontSize };
    }

    // Check which cards are expanded (have visible content below header)
    const allCards = [...document.querySelectorAll('[class*="collapse"], [class*="accordion"]')].slice(0, 10);
    result.collapseStates = allCards.map(el => ({
      cls: el.className?.slice(0, 100),
      ariaExpanded: el.getAttribute('aria-expanded'),
      h: Math.round(el.getBoundingClientRect().height),
    }));

    return result;
  });

  fs.writeFileSync(`${OUTPUT_DIR}/v9-home-extraction.json`, JSON.stringify(homeExtraction, null, 2));
  console.log('  ✓ Home extraction saved: v9-home-extraction.json');

  // ─── STEP 2: LEARNING PAGE ───────────────────────────────────
  console.log('\n[2/4] Navigating to Learning page...');
  await page.goto(LEARNING_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(3000);

  // Screenshot at 1440px
  await page.setViewportSize({ width: 1440, height: 900 });
  await sleep(500);
  await page.screenshot({
    path: `${OUTPUT_DIR}/v9-learning-live-1440.png`,
  });
  console.log('  ✓ Learning screenshot saved: v9-learning-live-1440.png');

  // Full page extraction - run comprehensive script
  const learningExtraction = await page.evaluate(() => {
    const result = {
      title: document.title,
      url: location.href,
      timestamp: new Date().toISOString(),
    };

    // Sidebar
    const sidebar = document.querySelector('aside') || document.querySelector('[class*="sidebar"]') || document.querySelector('[class*="Sidebar"]');
    if (sidebar) {
      const cs = getComputedStyle(sidebar);
      result.sidebar = {
        cls: sidebar.className?.slice(0, 200),
        position: cs.position,
        width: cs.width,
        top: cs.top,
        bg: cs.backgroundColor,
        borderRight: cs.borderRight,
        zIndex: cs.zIndex,
        overflowY: cs.overflowY,
      };

      // Sidebar items
      const navItems = [...sidebar.querySelectorAll('li, [role="listitem"], [class*="item"]')]
        .filter(el => el.getBoundingClientRect().height > 0 && el.getBoundingClientRect().height < 80)
        .slice(0, 30);
      result.sidebarItems = navItems.map(el => {
        const cs = getComputedStyle(el);
        const img = el.querySelector('img');
        const svg = el.querySelector('svg');
        const span = el.querySelector('span');
        return {
          cls: el.className?.slice(0, 150),
          text: el.textContent?.trim().slice(0, 60) || '',
          bg: cs.backgroundColor,
          borderLeft: cs.borderLeft,
          fontWeight: cs.fontWeight,
          color: cs.color,
          h: Math.round(el.getBoundingClientRect().height),
          hasImg: !!img,
          imgSrc: img?.src || img?.getAttribute('src') || '',
          hasSvg: !!svg,
        };
      });
    }

    // Main content area
    const main = document.querySelector('main');
    if (main) {
      const cs = getComputedStyle(main);
      result.mainContent = {
        cls: main.className?.slice(0, 150),
        display: cs.display,
        flexDirection: cs.flexDirection,
        marginLeft: cs.marginLeft,
        bg: cs.backgroundColor,
        padding: cs.padding,
      };
    }

    // Challenge title bar
    const titleBar = document.querySelector('[class*="challenge"], [class*="title-bar"]');
    if (titleBar) {
      result.challengeBar = {
        text: titleBar.textContent?.trim().slice(0, 100),
        cls: titleBar.className?.slice(0, 150),
      };
    }

    // Right column panels
    const rightPanels = [...document.querySelectorAll('[class*="panel"], [class*="Panel"], [class*="annotation"], [class*="Annotation"], [class*="feedback"]')]
      .filter(el => el.getBoundingClientRect().width < 400)
      .slice(0, 5);
    result.rightPanels = rightPanels.map(el => ({
      cls: el.className?.slice(0, 100),
      text: el.textContent?.trim().slice(0, 80),
      w: Math.round(el.getBoundingClientRect().width),
    }));

    // Font families on key elements
    const body = document.body;
    result.fonts = {
      body: getComputedStyle(body).fontFamily,
      h1: document.querySelector('h1') ? getComputedStyle(document.querySelector('h1')).fontFamily : null,
      nav: sidebar ? getComputedStyle(sidebar).fontFamily : null,
      sidebarList: sidebar?.querySelector('ul') ? getComputedStyle(sidebar.querySelector('ul')).fontFamily : null,
    };

    // Page bg
    result.pageBg = getComputedStyle(document.body).backgroundColor;

    return result;
  });

  fs.writeFileSync(`${OUTPUT_DIR}/v9-learning-extraction.json`, JSON.stringify(learningExtraction, null, 2));
  console.log('  ✓ Learning extraction saved: v9-learning-extraction.json');

  // ─── STEP 3: COMPREHENSIVE PAGE EXTRACTION ───────────────────
  console.log('\n[3/4] Running comprehensive page extraction...');

  const STYLE_PROPS = [
    'display','flexDirection','flexWrap','justifyContent','alignItems',
    'gap','rowGap','columnGap','position','top','right','bottom','left','zIndex',
    'width','height','minWidth','maxWidth','minHeight','maxHeight',
    'overflow','overflowY','padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
    'margin','marginLeft','color','fontFamily','fontWeight','fontSize','lineHeight',
    'backgroundColor','backgroundImage','border','borderLeft','borderRight',
    'borderRadius','boxShadow','opacity','cursor','transition',
  ];

  const comprehensiveExtraction = await page.evaluate((styleProps) => {
    function extract(el, depth) {
      if (depth > 6) return null;
      const cs = getComputedStyle(el);
      if (cs.display === 'none') return null;
      if (cs.visibility === 'hidden') return null;
      if (parseFloat(cs.opacity) === 0) return null;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return null;
      if (rect.x < -300 || rect.y < -300) return null;
      const styles = {};
      styleProps.forEach(p => { const v = cs[p]; if (v) styles[p] = v; });
      const kids = [...el.children];
      const leafText = kids.length === 0 ? (el.textContent?.trim().slice(0, 300) || null) : null;
      const svgKids = kids.filter(c => c.tagName?.toLowerCase() === 'svg');
      const imgKids = kids.filter(c => c.tagName === 'IMG');
      return {
        tag: el.tagName,
        id: el.id || null,
        cls: (el.className?.toString() || '').slice(0, 100),
        text: leafText,
        rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
        styles,
        svgIcons: svgKids.length > 0 ? svgKids.map(s => ({
          w: Math.round(s.getBoundingClientRect().width),
          h: Math.round(s.getBoundingClientRect().height),
          viewBox: s.getAttribute('viewBox'),
          path: s.innerHTML.trim().replace(/\s+/g,' ').slice(0, 400)
        })) : null,
        images: imgKids.length > 0 ? imgKids.map(i => ({ src: i.currentSrc || i.src, alt: i.alt, w: Math.round(i.naturalWidth), h: Math.round(i.naturalHeight) })) : null,
        children: kids.slice(0, 40).map(c => extract(c, depth + 1)).filter(Boolean)
      };
    }
    return JSON.stringify(extract(document.body, 0));
  }, STYLE_PROPS);

  fs.writeFileSync(`${OUTPUT_DIR}/v9-learning-comprehensive.json`, comprehensiveExtraction);
  console.log('  ✓ Comprehensive extraction saved: v9-learning-comprehensive.json');

  // ─── STEP 4: BACK TO HOME FOR FINAL SCREENSHOT ───────────────
  console.log('\n[4/4] Taking final home page comparison screenshot...');
  await page.goto(HOME_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(2000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.screenshot({
    path: `${OUTPUT_DIR}/v9-home-comparison-1440.png`,
    fullPage: true
  });
  console.log('  ✓ Home comparison screenshot saved: v9-home-comparison-1440.png');

  // Extract the card expansion state on live page
  const liveCardStates = await page.evaluate(() => {
    // Find all major card/section elements
    const sections = [...document.querySelectorAll('[class*="collapse-title"], [class*="card-title"], h2, h3')]
      .filter(el => el.getBoundingClientRect().width > 100)
      .slice(0, 15);
    return sections.map(el => {
      const parent = el.closest('[class*="card"], [class*="collapse"], [class*="accordion"]') || el.parentElement;
      const cs = parent ? getComputedStyle(parent) : null;
      return {
        text: el.textContent?.trim().slice(0, 50),
        parentH: parent ? Math.round(parent.getBoundingClientRect().height) : null,
        ariaExpanded: parent?.getAttribute('aria-expanded') || el.getAttribute('aria-expanded'),
      };
    });
  });

  fs.writeFileSync(`${OUTPUT_DIR}/v9-card-states.json`, JSON.stringify(liveCardStates, null, 2));
  console.log('  ✓ Card states saved: v9-card-states.json');

  await browser.disconnect();
  console.log('\n✅ CDP extraction complete!');
}

main().catch(err => {
  console.error('CDP extraction failed:', err.message);
  process.exit(1);
});

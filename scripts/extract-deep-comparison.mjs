import { chromium } from '/Users/alexisonpan/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/index.mjs';

const browser = await chromium.connectOverCDP('http://localhost:61447');
const context = browser.contexts()[0];
const page = context.pages()[0] || await context.newPage();

// ── HOME PAGE deep extraction ────────────────────────────────
await page.goto('https://app.gojuly.ai/home', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(2500);
await page.screenshot({ path: 'docs/design-references/live-home-deep.png', fullPage: true });

const homeDeep = await page.evaluate(() => {
  const cs = (el, props) => {
    const s = window.getComputedStyle(el);
    return Object.fromEntries(props.map(p => [p, s.getPropertyValue(p)]));
  };

  // Page-level greeting
  const h1 = document.querySelector('h1');
  const greetingSection = h1 ? {
    text: h1.textContent.trim(),
    css: cs(h1, ['font-size','font-weight','font-family','color','margin-bottom','letter-spacing'])
  } : null;

  // Subtitle under greeting
  const subtitle = h1?.nextElementSibling;
  const subtitleData = subtitle ? {
    text: subtitle.textContent.trim().slice(0,80),
    css: cs(subtitle, ['font-size','font-weight','color','font-family','margin-bottom'])
  } : null;

  // Content container that wraps all track cards
  const contentContainer = h1?.closest('[class*="container"], [class*="max-w"], main > div, main > section') || h1?.parentElement;
  const containerCSS = contentContainer ? cs(contentContainer, ['max-width','padding','margin','padding-left','padding-right','padding-top']) : null;
  const containerClass = contentContainer?.className || null;

  // Track cards — grab full structure
  const trackCards = [...document.querySelectorAll('.ja-card')].map(card => ({
    outerHTML_short: card.outerHTML.slice(0, 400),
    cls: card.className,
    css: cs(card, ['border','border-radius','background-color','padding','box-shadow','width','margin'])
  }));

  // Figure / thumbnail area inside cards
  const cardFigures = [...document.querySelectorAll('.ja-card-figure')].map(f => ({
    cls: f.className,
    css: cs(f, ['height','width','background-color','border-radius','overflow']),
    imgSrc: f.querySelector('img')?.src || null
  }));

  // Card body structure
  const cardBodies = [...document.querySelectorAll('.ja-card-body')].map(b => ({
    cls: b.className,
    css: cs(b, ['padding','gap','flex-direction'])
  }));

  // Status badges — what colors are used
  const badges = [...document.querySelectorAll('[class*="badge"], [class*="Badge"]')].slice(0,8).map(b => ({
    text: b.textContent.trim(),
    cls: b.className,
    css: cs(b, ['background-color','color','font-size','font-weight','border-radius','padding'])
  }));

  // Status border colors per card
  const borderColors = [...document.querySelectorAll('.ja-card')].map(c => ({
    text: c.querySelector('[class*="title"]')?.textContent.trim().slice(0,40) || c.textContent.trim().slice(0,40),
    border: window.getComputedStyle(c).border,
    borderColor: window.getComputedStyle(c).borderColor
  }));

  // Content wrapper max-width
  const wrapper = document.querySelector('[class*="max-w-"]');
  const wrapperCSS = wrapper ? cs(wrapper, ['max-width','padding','margin-left','margin-right']) : null;
  const wrapperClass = wrapper?.className?.slice(0, 100) || null;

  return { greetingSection, subtitleData, containerCSS, containerClass, trackCards, cardFigures, cardBodies, badges, borderColors, wrapperCSS, wrapperClass };
});

console.log('=== HOME DEEP ===');
console.log(JSON.stringify(homeDeep, null, 2));

// ── LEARNING PAGE deep extraction — sidebar header structure ──
await page.goto(
  'https://app.gojuly.ai/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401?type=objective&id=fc910896-a335-4d32-b741-864336accd12&collection=697352e4-53eb-44d9-ba04-a360ab9e4e6a',
  { waitUntil: 'domcontentloaded', timeout: 30000 }
);
await page.waitForTimeout(2000);
await page.screenshot({ path: 'docs/design-references/live-learning-deep.png', fullPage: false });

const learningDeep = await page.evaluate(() => {
  const cs = (el, props) => {
    const s = window.getComputedStyle(el);
    return Object.fromEntries(props.map(p => [p, s.getPropertyValue(p)]));
  };

  // Sidebar
  const sidebar = document.querySelector('aside, [class*="sidebar"]') ||
    [...document.querySelectorAll('div')].find(el =>
      window.getComputedStyle(el).position === 'fixed' &&
      parseInt(window.getComputedStyle(el).width) === 256
    );

  // Sidebar first child — the breadcrumb/back header
  const sidebarChildren = sidebar ? [...sidebar.children].slice(0,3).map((child, i) => ({
    index: i,
    tag: child.tagName,
    cls: child.className,
    text: child.textContent.trim().slice(0, 100),
    css: cs(child, ['padding','height','font-size','font-weight','font-family','border-bottom','background-color','display','align-items'])
  })) : [];

  // The breadcrumb element specifically — find back nav
  const backNav = [...document.querySelectorAll('*')].find(el => {
    const text = el.textContent.trim();
    const cls = el.className || '';
    return (text === 'Red Teaming - Beginner' || text.startsWith('←')) && el.children.length < 5;
  });
  const backNavData = backNav ? {
    tag: backNav.tagName,
    cls: backNav.className,
    text: backNav.textContent.trim(),
    outerHTML: backNav.outerHTML.slice(0, 300),
    css: cs(backNav, ['padding','font-size','font-weight','font-family','color','border-bottom','display','height','cursor'])
  } : null;

  // Left arrow element (SVG or icon in back nav)
  const arrowEl = sidebar?.querySelector('svg[class*="arrow"], svg[class*="Arrow"], [class*="back"]');
  const arrowData = arrowEl ? { tag: arrowEl.tagName, cls: arrowEl.className, outerHTML: arrowEl.outerHTML.slice(0, 200) } : null;

  // Full sidebar outerHTML (first 2000 chars)
  const sidebarHTML = sidebar?.outerHTML.slice(0, 2000) || null;

  // Main content area header (above chat)
  const mainHeader = document.querySelector('[class*="challenge"], [class*="Challenge"]') ||
    document.querySelector('main > div:first-child > div:first-child');
  const mainHeaderData = mainHeader ? {
    text: mainHeader.textContent.trim().slice(0,100),
    cls: mainHeader.className,
    css: cs(mainHeader, ['padding','height','background-color','border-bottom','font-size','font-family'])
  } : null;

  // Body font
  const bodyFont = window.getComputedStyle(document.body).fontFamily;
  const bodyFontSize = window.getComputedStyle(document.body).fontSize;

  return { sidebarChildren, backNavData, arrowData, sidebarHTML, mainHeaderData, bodyFont, bodyFontSize };
});

console.log('=== LEARNING DEEP ===');
console.log(JSON.stringify(learningDeep, null, 2));

process.exit(0);

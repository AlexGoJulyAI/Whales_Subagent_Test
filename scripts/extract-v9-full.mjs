/**
 * extract-v9-full.mjs
 * Full extraction for v9 fixes:
 *  1. Nav button computed styles (active tab color)
 *  2. Navigate to Red Team Sample Submission entry page (Screen 1)
 *  3. Extract Screen 1 content and screenshot
 *  4. Extract all badge colors
 */
import { chromium } from '/Users/alexisonpan/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/index.mjs';
import fs from 'fs';

const PORT = 61447;
const HOME_URL = 'https://app.gojuly.ai/home';
const OUT = 'docs/design-references';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const browser = await chromium.connectOverCDP(`http://localhost:${PORT}`);
  const context = browser.contexts()[0];
  let page = context.pages()[0] || await context.newPage();

  // ── HOME PAGE ─────────────────────────────────────────────────────────────
  console.log('[1] Navigating to home...');
  await page.goto(HOME_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(2000);
  await page.setViewportSize({ width: 1440, height: 900 });

  // Extract ALL nav button/tab computed styles
  const navExtraction = await page.evaluate(() => {
    const nav = document.querySelector('[class*="navbar"]') || document.querySelector('nav');
    if (!nav) return { error: 'no navbar found', cls: '' };

    const allInteractive = [...nav.querySelectorAll('a, button, [role="tab"], [class*="tab"]')];

    return {
      navClass: nav.className?.slice(0, 300),
      navBg: getComputedStyle(nav).backgroundColor,
      navHeight: Math.round(nav.getBoundingClientRect().height),
      elements: allInteractive.slice(0, 25).map(el => {
        const cs = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          text: el.textContent?.trim().slice(0, 40),
          cls: el.className?.slice(0, 150),
          href: el.getAttribute('href'),
          bg: cs.backgroundColor,
          color: cs.color,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          borderRadius: cs.borderRadius,
          padding: cs.padding,
          border: cs.border,
          display: cs.display,
          rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
        };
      }),
    };
  });
  fs.writeFileSync(`${OUT}/v9-nav-extraction.json`, JSON.stringify(navExtraction, null, 2));
  console.log('  ✓ Nav extraction saved');

  // Extract badge colors from track cards
  const badgeExtraction = await page.evaluate(() => {
    const badges = [...document.querySelectorAll('[class*="badge"], [class*="Badge"], [class*="status"]')]
      .filter(el => el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().width < 200)
      .slice(0, 20);
    return badges.map(el => {
      const cs = getComputedStyle(el);
      return {
        text: el.textContent?.trim().slice(0, 40),
        cls: el.className?.slice(0, 100),
        bg: cs.backgroundColor,
        color: cs.color,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        padding: cs.padding,
        borderRadius: cs.borderRadius,
        border: cs.border,
      };
    });
  });
  fs.writeFileSync(`${OUT}/v9-badge-extraction.json`, JSON.stringify(badgeExtraction, null, 2));
  console.log('  ✓ Badge extraction saved');

  // Find all links on the home page
  const homeLinks = await page.evaluate(() => {
    return [...document.querySelectorAll('a[href]')]
      .map(a => ({ text: a.textContent?.trim().slice(0, 40), href: a.href }))
      .filter(l => l.href.includes('gojuly.ai') || l.href.startsWith('/'))
      .slice(0, 30);
  });
  console.log('  Home page links:', homeLinks.map(l => `${l.text} → ${l.href}`).join('\n    '));

  // Find the "Red Team Sample Submission" card and its View/Start button
  const submissionInfo = await page.evaluate(() => {
    // Look for any element containing "Sample Submission" text
    const allEls = [...document.querySelectorAll('*')];
    const submissionEls = allEls.filter(el =>
      el.children.length === 0 &&
      el.textContent?.includes('Sample Submission') &&
      el.getBoundingClientRect().width > 0
    );

    // Look for View buttons inside those elements' ancestors
    const viewButtons = [];
    for (const el of submissionEls.slice(0, 5)) {
      let parent = el;
      for (let i = 0; i < 8; i++) {
        parent = parent?.parentElement;
        if (!parent) break;
        const btns = [...parent.querySelectorAll('a, button')].filter(b =>
          b.textContent?.trim().match(/^(View|Start|Begin|Open|Go)$/i) ||
          b.textContent?.trim().match(/View|Start|Begin/i)
        );
        if (btns.length > 0) {
          viewButtons.push(...btns.map(b => ({
            text: b.textContent?.trim(),
            tag: b.tagName,
            href: b.getAttribute('href'),
            cls: b.className?.slice(0, 100),
          })));
          break;
        }
      }
    }
    return { submissionTextCount: submissionEls.length, viewButtons };
  });
  console.log('  Submission info:', JSON.stringify(submissionInfo, null, 2));

  // Try to expand the Red Team Sample Submission card and find its link
  // First, find and click the card header if it's collapsed
  let screen1URL = null;

  try {
    // Look for the card that contains "Red Team Sample Submission"
    const cardHeader = await page.$('[class*="collapse-title"]:has-text("Red Team Sample Submission"), [class*="card-title"]:has-text("Red Team Sample Submission"), [class*="card"]:has-text("Red Team Sample Submission") button, h2:has-text("Red Team Sample Submission"), h3:has-text("Red Team Sample Submission")');

    if (cardHeader) {
      console.log('  Found submission card header, clicking to expand...');
      await cardHeader.click();
      await sleep(1000);
    }

    // Now look for any link within the expanded card
    const viewLink = await page.$('[class*="collapse-content"] a, [class*="card-body"] a, [class*="card"] a[href*="learning"], [class*="card"] a[href*="objective"]');
    if (viewLink) {
      screen1URL = await viewLink.getAttribute('href');
      if (screen1URL && !screen1URL.startsWith('http')) {
        screen1URL = `https://app.gojuly.ai${screen1URL}`;
      }
      console.log('  Found card link:', screen1URL);
    }
  } catch(e) {
    console.log('  Card click approach failed:', e.message);
  }

  // Try a broader search for any learning URL not equal to the known learning URL
  if (!screen1URL) {
    const learningLinks = await page.evaluate(() => {
      return [...document.querySelectorAll('a[href]')]
        .map(a => a.href)
        .filter(href => href.includes('/learning/') || href.includes('/objective'))
        .slice(0, 10);
    });
    console.log('  Learning-type links:', learningLinks);
    if (learningLinks.length > 0) {
      screen1URL = learningLinks[0];
    }
  }

  // ── SCREEN 1 NAVIGATION ───────────────────────────────────────────────────
  if (screen1URL && screen1URL !== HOME_URL) {
    console.log(`\n[2] Navigating to Screen 1: ${screen1URL}`);
    await page.goto(screen1URL, { waitUntil: 'networkidle', timeout: 60000 });
    await sleep(2000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await sleep(500);

    const actualURL = page.url();
    console.log('  Actual URL after navigation:', actualURL);

    // Screenshot
    await page.screenshot({ path: `${OUT}/v9-screen1-live-1440.png`, fullPage: true });
    console.log('  ✓ Screen 1 screenshot saved');

    // Extract content
    const screen1Content = await page.evaluate(() => {
      const result = {};

      result.url = location.href;
      result.title = document.title;

      // Headings
      result.headings = [...document.querySelectorAll('h1, h2, h3')].map(h => ({
        tag: h.tagName,
        text: h.textContent?.trim().slice(0, 200),
        color: getComputedStyle(h).color,
        fontSize: getComputedStyle(h).fontSize,
        fontWeight: getComputedStyle(h).fontWeight,
        fontFamily: getComputedStyle(h).fontFamily,
      }));

      // All visible text blocks
      result.paragraphs = [...document.querySelectorAll('p, [class*="text"], [class*="body"]')]
        .filter(el => {
          const cs = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return el.children.length === 0 && rect.width > 0 && cs.display !== 'none' && el.textContent?.trim().length > 5;
        })
        .map(el => ({
          text: el.textContent?.trim().slice(0, 300),
          fontSize: getComputedStyle(el).fontSize,
          color: getComputedStyle(el).color,
          bg: getComputedStyle(el.closest('[class]') || el).backgroundColor,
        }))
        .slice(0, 30);

      // Buttons
      result.buttons = [...document.querySelectorAll('button, a.btn, [class*="btn"]')]
        .filter(el => el.getBoundingClientRect().width > 0 && el.textContent?.trim().length > 0)
        .map(el => {
          const cs = getComputedStyle(el);
          return {
            text: el.textContent?.trim().slice(0, 60),
            tag: el.tagName,
            href: el.getAttribute('href'),
            cls: el.className?.slice(0, 100),
            bg: cs.backgroundColor,
            color: cs.color,
            border: cs.border,
            borderRadius: cs.borderRadius,
            fontSize: cs.fontSize,
            fontWeight: cs.fontWeight,
            padding: cs.padding,
            height: Math.round(el.getBoundingClientRect().height),
          };
        })
        .filter(b => b.height > 5)
        .slice(0, 25);

      // Note boxes / info boxes
      result.noteBoxes = [...document.querySelectorAll('[class*="note"], [class*="info"], [class*="alert"], [class*="warning"], [class*="callout"]')]
        .filter(el => el.getBoundingClientRect().width > 0)
        .map(el => ({
          text: el.textContent?.trim().slice(0, 400),
          cls: el.className?.slice(0, 100),
          bg: getComputedStyle(el).backgroundColor,
          borderRadius: getComputedStyle(el).borderRadius,
          padding: getComputedStyle(el).padding,
        }))
        .slice(0, 10);

      // Cards / containers
      result.cards = [...document.querySelectorAll('[class*="card"], [class*="Card"]')]
        .filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.width > 200 && rect.height > 50;
        })
        .map(el => ({
          text: el.textContent?.trim().slice(0, 200),
          cls: el.className?.slice(0, 100),
          bg: getComputedStyle(el).backgroundColor,
          borderRadius: getComputedStyle(el).borderRadius,
          rect: {
            w: Math.round(el.getBoundingClientRect().width),
            h: Math.round(el.getBoundingClientRect().height),
          },
        }))
        .slice(0, 10);

      // Sidebar (if any)
      const sidebar = document.querySelector('aside, [class*="sidebar"]');
      result.hasSidebar = !!sidebar;

      return result;
    });

    fs.writeFileSync(`${OUT}/v9-screen1-content.json`, JSON.stringify(screen1Content, null, 2));
    console.log('  ✓ Screen 1 content extracted');
    console.log('  Headings:', screen1Content.headings?.map(h => `${h.tag}: "${h.text}"`).join(', '));
    console.log('  Buttons:', screen1Content.buttons?.map(b => `"${b.text}"`).join(', '));
  } else {
    console.log('\n[2] Could not find Screen 1 URL, extracting home page cards for more clues...');
    const cardContent = await page.evaluate(() => {
      const cards = [...document.querySelectorAll('[class*="card"], [class*="collapse"]')];
      return cards.map(card => ({
        text: card.textContent?.trim().slice(0, 100),
        cls: card.className?.slice(0, 80),
        links: [...card.querySelectorAll('a')].map(a => ({ text: a.textContent?.trim(), href: a.href })),
        buttons: [...card.querySelectorAll('button')].map(b => b.textContent?.trim()),
      })).slice(0, 15);
    });
    console.log('  Card content:', JSON.stringify(cardContent, null, 2));
  }

  console.log('\n✅ Extraction complete!');
  process.exit(0);
}

main().catch(err => {
  console.error('Script failed:', err.message);
  process.exit(1);
});

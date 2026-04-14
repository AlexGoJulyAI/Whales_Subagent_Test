/**
 * extract-v9-screen1.mjs
 * Navigate directly to Screen 1 URL and extract full content + screenshot
 */
import { chromium } from '/Users/alexisonpan/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/index.mjs';
import fs from 'fs';

const PORT = 61447;
const SCREEN1_URL = 'https://app.gojuly.ai/learning/8677bb41-e677-4995-8cc0-9b5d38d934e0?type=objective&id=6d9bf3bd-14e7-48f6-967a-daa0494e3c6f&collection=f45878f9-fc2a-4e91-ab98-22a4efc281fc';
const OUT = 'docs/design-references';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const browser = await chromium.connectOverCDP(`http://localhost:${PORT}`);
  const context = browser.contexts()[0];
  let page = context.pages()[0] || await context.newPage();

  console.log('[1] Navigating to Screen 1...');
  await page.goto(SCREEN1_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await sleep(3000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await sleep(1000);

  console.log('[2] Extracting content...');
  const content = await page.evaluate(() => {
    const result = { url: location.href, title: document.title };

    // Headings
    result.headings = [...document.querySelectorAll('h1, h2, h3, h4')].map(h => {
      const cs = getComputedStyle(h);
      return {
        tag: h.tagName,
        text: h.textContent?.trim().slice(0, 200),
        color: cs.color,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        fontFamily: cs.fontFamily,
        bg: cs.backgroundColor,
      };
    });

    // All visible leaf text nodes
    result.allText = [...document.querySelectorAll('p, span, div, li')].filter(el => {
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return el.children.length === 0 &&
        el.textContent?.trim().length > 2 &&
        cs.display !== 'none' &&
        cs.visibility !== 'hidden' &&
        rect.width > 20 && rect.height > 0;
    }).map(el => {
      const cs = getComputedStyle(el);
      return {
        text: el.textContent?.trim().slice(0, 200),
        tag: el.tagName,
        cls: el.className?.slice(0, 100),
        color: cs.color,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        bg: cs.backgroundColor,
        rect: {
          x: Math.round(el.getBoundingClientRect().x),
          y: Math.round(el.getBoundingClientRect().y),
          w: Math.round(el.getBoundingClientRect().width),
        }
      };
    }).slice(0, 80);

    // Buttons
    result.buttons = [...document.querySelectorAll('button, a[href], a.btn, [class*="btn"]')]
      .filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 5 && el.textContent?.trim().length > 0;
      })
      .map(el => {
        const cs = getComputedStyle(el);
        return {
          text: el.textContent?.trim().slice(0, 80),
          tag: el.tagName,
          href: el.getAttribute('href'),
          cls: el.className?.slice(0, 150),
          bg: cs.backgroundColor,
          color: cs.color,
          border: cs.border,
          borderRadius: cs.borderRadius,
          padding: cs.padding,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          height: Math.round(el.getBoundingClientRect().height),
          width: Math.round(el.getBoundingClientRect().width),
          x: Math.round(el.getBoundingClientRect().x),
          y: Math.round(el.getBoundingClientRect().y),
        };
      })
      .filter(b => b.height > 10 && b.width > 30)
      .slice(0, 30);

    // Note / info / callout boxes
    result.noteBoxes = [...document.querySelectorAll('[class*="note"], [class*="info"], [class*="alert"], [class*="callout"], [class*="warning"], [class*="card"]')]
      .filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 100 && rect.height > 30;
      })
      .map(el => {
        const cs = getComputedStyle(el);
        return {
          text: el.textContent?.trim().slice(0, 500),
          tag: el.tagName,
          cls: el.className?.slice(0, 150),
          bg: cs.backgroundColor,
          color: cs.color,
          border: cs.border,
          borderRadius: cs.borderRadius,
          padding: cs.padding,
          rect: {
            x: Math.round(el.getBoundingClientRect().x),
            y: Math.round(el.getBoundingClientRect().y),
            w: Math.round(el.getBoundingClientRect().width),
            h: Math.round(el.getBoundingClientRect().height),
          }
        };
      })
      .slice(0, 15);

    // Images
    result.images = [...document.querySelectorAll('img')].map(img => ({
      src: img.src,
      alt: img.alt,
      w: Math.round(img.getBoundingClientRect().width),
      h: Math.round(img.getBoundingClientRect().height),
    })).filter(i => i.w > 0).slice(0, 20);

    // Page background
    result.pageBg = getComputedStyle(document.body).backgroundColor;
    result.mainBg = (() => {
      const main = document.querySelector('main, [class*="main"], [class*="content"], [class*="page"]');
      return main ? getComputedStyle(main).backgroundColor : '';
    })();

    // Get full body class and first few children structure
    result.bodyInfo = {
      bodyClass: document.body.className?.slice(0, 200),
      children: [...document.body.children].slice(0, 5).map(el => ({
        tag: el.tagName,
        cls: el.className?.slice(0, 100),
        id: el.id,
        childCount: el.children.length,
        bg: getComputedStyle(el).backgroundColor,
      }))
    };

    return result;
  });

  fs.writeFileSync(`${OUT}/v9-screen1-content.json`, JSON.stringify(content, null, 2));
  console.log('✓ Screen 1 content saved');
  console.log('URL:', content.url);
  console.log('Title:', content.title);
  console.log('Headings:', content.headings?.map(h => `${h.tag}:"${h.text}" ${h.fontSize} ${h.color}`).join('\n  '));
  console.log('\nButtons:', content.buttons?.slice(0,10).map(b => `"${b.text}" bg:${b.bg} color:${b.color} @(${b.x},${b.y}) w:${b.width}h:${b.height}`).join('\n  '));
  console.log('\nNote boxes count:', content.noteBoxes?.length);
  if (content.noteBoxes?.length > 0) {
    content.noteBoxes.forEach((nb, i) => console.log(`  [${i}] cls:${nb.cls} bg:${nb.bg} text:"${nb.text?.slice(0,100)}"`));
  }
  console.log('\nImages:', content.images?.map(i => `${i.src?.split('/').pop()} ${i.w}x${i.h}`).join('\n  '));
  console.log('\nPage bg:', content.pageBg);

  // Screenshot - skip fonts loading timeout, use timeout option
  console.log('\n[3] Taking screenshot...');
  try {
    await page.screenshot({ 
      path: `${OUT}/v9-screen1-live-1440.png`, 
      fullPage: false,
      timeout: 15000
    });
    console.log('✓ Screenshot saved (viewport only)');
  } catch(e) {
    console.log('Screenshot skipped (font timeout):', e.message.slice(0, 100));
    // Try clip instead
    try {
      await page.screenshot({ 
        path: `${OUT}/v9-screen1-live-1440.png`,
        clip: { x: 0, y: 0, width: 1440, height: 900 }
      });
      console.log('✓ Screenshot saved (clipped)');
    } catch(e2) {
      console.log('Screenshot also failed:', e2.message.slice(0, 80));
    }
  }

  process.exit(0);
}

main().catch(err => {
  console.error('Script failed:', err.message);
  process.exit(1);
});

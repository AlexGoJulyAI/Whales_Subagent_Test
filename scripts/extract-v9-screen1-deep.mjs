import { chromium } from '/Users/alexisonpan/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/index.mjs';
import fs from 'fs';
const PORT = 61447;
const SCREEN1_URL = 'https://app.gojuly.ai/learning/8677bb41-e677-4995-8cc0-9b5d38d934e0?type=objective&id=6d9bf3bd-14e7-48f6-967a-daa0494e3c6f&collection=f45878f9-fc2a-4e91-ab98-22a4efc281fc';
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function main() {
  const browser = await chromium.connectOverCDP(`http://localhost:${PORT}`);
  const ctx = browser.contexts()[0];
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.goto(SCREEN1_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await sleep(3000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await sleep(500);

  const data = await page.evaluate(() => {
    // Get ALL text in document with computed styles, sorted by Y position
    const visible = [];
    const walk = (el, depth=0) => {
      if (['SCRIPT','STYLE','NOSCRIPT'].includes(el.tagName)) return;
      const rect = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') return;
      const text = el.textContent?.trim();
      if (text && text.length > 1 && el.children.length === 0 && rect.width > 0 && rect.height > 0) {
        visible.push({
          tag: el.tagName,
          text: text.slice(0,200),
          cls: el.className?.slice?.(0,100) || '',
          color: cs.color,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          bg: cs.backgroundColor,
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          w: Math.round(rect.width),
        });
      }
      for (const child of el.children) walk(child, depth+1);
    };
    walk(document.body);
    return visible.sort((a,b) => a.y - b.y || a.x - b.x);
  });

  // Also get the main container HTML structure
  const structure = await page.evaluate(() => {
    const navbar = document.querySelector('[class*="navbar"]');
    const navBottom = navbar ? navbar.getBoundingClientRect().bottom : 76;
    // Get all direct children of the top-level content div
    const allDivs = [...document.body.querySelectorAll('div')].filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.y >= navBottom && rect.width > 400 && rect.height > 100 && el.children.length >= 2;
    }).slice(0, 10).map(el => {
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        cls: el.className?.slice(0, 200),
        bg: cs.backgroundColor,
        rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
        childCount: el.children.length,
        childBgs: [...el.children].map(c => ({ cls: c.className?.slice(0,80), bg: getComputedStyle(c).backgroundColor, h: Math.round(c.getBoundingClientRect().height) }))
      };
    });
    return allDivs;
  });

  fs.writeFileSync('docs/design-references/v9-screen1-deep.json', JSON.stringify({allText: data, structure}, null, 2));
  
  console.log('=== ALL TEXT ON SCREEN 1 (sorted by Y) ===');
  data.forEach(t => console.log(`  y:${t.y} x:${t.x} "${t.text}" [${t.fontSize}/${t.color}] cls:${t.cls.slice(0,60)}`));
  
  console.log('\n=== MAIN CONTAINERS ===');
  structure.forEach((s,i) => console.log(`[${i}] y:${s.rect.y} h:${s.rect.h} bg:${s.bg} cls:${s.cls.slice(0,100)}`));
  
  process.exit(0);
}
main().catch(e => { console.error(e.message); process.exit(1); });

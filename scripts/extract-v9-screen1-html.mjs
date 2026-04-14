import { chromium } from '/Users/alexisonpan/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/index.mjs';
import fs from 'fs';
const PORT = 61447;
const URL = 'https://app.gojuly.ai/learning/8677bb41-e677-4995-8cc0-9b5d38d934e0?type=objective&id=6d9bf3bd-14e7-48f6-967a-daa0494e3c6f&collection=f45878f9-fc2a-4e91-ab98-22a4efc281fc';
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function main() {
  const browser = await chromium.connectOverCDP(`http://localhost:${PORT}`);
  const ctx = browser.contexts()[0];
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await sleep(3000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await sleep(500);

  const result = await page.evaluate(() => {
    const card = document.querySelector('.bg-white.rounded-2xl');
    if (!card) return { error: 'no card', outerHTML: '' };
    return {
      innerText: card.innerText,
      innerHTML: card.innerHTML.slice(0, 8000)
    };
  });
  console.log('=== INNER TEXT ===');
  console.log(result.innerText);
  console.log('\n=== INNER HTML (first 5000 chars) ===');
  console.log(result.innerHTML?.slice(0,5000));
  fs.writeFileSync('docs/design-references/v9-screen1-card.json', JSON.stringify(result, null, 2));
  process.exit(0);
}
main().catch(e => { console.error(e.message); process.exit(1); });

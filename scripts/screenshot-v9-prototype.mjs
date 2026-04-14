import { chromium } from '/Users/alexisonpan/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/index.mjs';
import fs from 'fs';
const PORT = 61447;
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function main() {
  const browser = await chromium.connectOverCDP(`http://localhost:${PORT}`);
  const ctx = browser.contexts()[0];
  const page = ctx.pages()[0] || await ctx.newPage();
  
  // Screen 1
  console.log('[1] Screenshotting Screen 1...');
  await page.goto('http://localhost:3000/tests/gojuly-ux-v9', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await sleep(2000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await sleep(500);
  try {
    await page.screenshot({ path: 'docs/design-references/v9-proto-screen1.png', clip: { x:0, y:0, width:1440, height:900 } });
    console.log('  ✓ Screen 1 screenshot saved');
  } catch(e) { console.log('  Screenshot error:', e.message.slice(0,60)); }
  
  // Click Screen 2
  console.log('[2] Screenshotting Screen 2...');
  await page.click('button:has-text("2: Learning Page")');
  await sleep(1000);
  try {
    await page.screenshot({ path: 'docs/design-references/v9-proto-screen2.png', clip: { x:0, y:0, width:1440, height:900 } });
    console.log('  ✓ Screen 2 screenshot saved');
  } catch(e) { console.log('  Screenshot error:', e.message.slice(0,60)); }

  // Click Screen 3
  console.log('[3] Screenshotting Screen 3...');
  await page.click('button:has-text("3: Home")');
  await sleep(1000);
  try {
    await page.screenshot({ path: 'docs/design-references/v9-proto-screen3.png', clip: { x:0, y:0, width:1440, height:900 } });
    console.log('  ✓ Screen 3 screenshot saved');
  } catch(e) { console.log('  Screenshot error:', e.message.slice(0,60)); }
  
  process.exit(0);
}
main().catch(e => { console.error(e.message); process.exit(1); });

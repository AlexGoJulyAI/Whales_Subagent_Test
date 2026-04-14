import { chromium } from '/Users/alexisonpan/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/index.mjs';
const PORT = 61447;
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function shot(page, path) {
  // disable font loading wait by using JS to override screenshot
  return new Promise(async (resolve) => {
    const timer = setTimeout(() => { console.log('  timeout, skipping'); resolve(); }, 8000);
    try {
      await page.screenshot({ path, clip: { x:0, y:0, width:1440, height:900 }, timeout: 7000 });
      clearTimeout(timer);
      console.log('  ✓', path.split('/').pop());
      resolve();
    } catch(e) { clearTimeout(timer); console.log('  failed:', e.message.slice(0,50)); resolve(); }
  });
}
async function main() {
  const browser = await chromium.connectOverCDP(`http://localhost:${PORT}`);
  const ctx = browser.contexts()[0];
  // Use a NEW page to avoid interfering with the live gojuly page
  const page = await ctx.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  
  await page.goto('http://localhost:3000/tests/gojuly-ux-v9', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await sleep(2000);
  await shot(page, 'docs/design-references/v9-proto-screen1.png');
  
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')].filter(b => b.textContent?.includes('2: Learning'));
    if (btns[0]) btns[0].click();
  });
  await sleep(1000);
  await shot(page, 'docs/design-references/v9-proto-screen2.png');

  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')].filter(b => b.textContent?.includes('3: Home'));
    if (btns[0]) btns[0].click();
  });
  await sleep(1000);
  await shot(page, 'docs/design-references/v9-proto-screen3.png');
  
  await page.close();
  process.exit(0);
}
main().catch(e => { console.error(e.message); process.exit(1); });

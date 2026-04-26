const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const files = ['MOCKUP_A', 'MOCKUP_B', 'MOCKUP_C'];
  for (const f of files) {
    await page.goto('file:///Users/alexisonpan/Whales_Subagent_Test_v2/docs/research/' + f + '.html');
    await new Promise(r => setTimeout(r, 800));

    // Screenshot the .col-render element which contains the visual design
    const el = await page.$('.col-render, .left-column, .page-render');
    if (el) {
      await el.screenshot({
        path: '/Users/alexisonpan/Whales_Subagent_Test_v2/docs/design-references/' + f + '_render.png',
      });
      console.log(f + ' done via .col-render');
    } else {
      await page.screenshot({
        path: '/Users/alexisonpan/Whales_Subagent_Test_v2/docs/design-references/' + f + '_render.png',
        fullPage: false,
      });
      console.log(f + ' fallback viewport screenshot');
    }
  }

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

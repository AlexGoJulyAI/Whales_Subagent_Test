/**
 * extract-v9-targeted.mjs
 * Gets the full active nav tab class, all badge colors,
 * and navigates to Screen 1 via button click.
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

  // Get FULL class names of nav tabs (no truncation)
  const navFullClasses = await page.evaluate(() => {
    const nav = document.querySelector('[class*="navbar"]') || document.querySelector('nav');
    if (!nav) return [];
    const btns = [...nav.querySelectorAll('button')];
    return btns.map(btn => {
      const cs = getComputedStyle(btn);
      const after = getComputedStyle(btn, '::after');
      return {
        text: btn.textContent?.trim(),
        fullClass: btn.className,            // FULL class, no slice
        bg: cs.backgroundColor,
        color: cs.color,
        width: cs.width,
        // ::after pseudo-element styles
        afterContent: after.content,
        afterBg: after.backgroundColor,
        afterWidth: after.width,
        afterHeight: after.height,
        afterBottom: after.bottom,
        afterLeft: after.left,
        afterDisplay: after.display,
        afterPosition: after.position,
      };
    });
  });
  fs.writeFileSync(`${OUT}/v9-nav-full-classes.json`, JSON.stringify(navFullClasses, null, 2));
  console.log('Nav full classes:');
  navFullClasses.forEach(b => console.log(`  "${b.text}" → bg:${b.bg} after_bg:${b.afterBg} after_h:${b.afterHeight} after_w:${b.afterWidth}`));

  // Get ALL badge colors including IN PROGRESS, NOT STARTED etc.
  const allBadges = await page.evaluate(() => {
    // Try multiple selectors
    const els = [
      ...document.querySelectorAll('[class*="badge"]'),
      ...document.querySelectorAll('[class*="state"]'),
      ...document.querySelectorAll('[class*="pill"]'),
      ...document.querySelectorAll('[class*="chip"]'),
      ...document.querySelectorAll('[class*="tag"]'),
    ].filter(el => {
      const rect = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return rect.width > 0 && rect.width < 250 && rect.height > 0 && rect.height < 60 && cs.display !== 'none';
    });
    // Deduplicate by text
    const seen = new Set();
    return els.map(el => {
      const cs = getComputedStyle(el);
      return {
        text: el.textContent?.trim().slice(0, 40),
        cls: el.className,
        bg: cs.backgroundColor,
        color: cs.color,
        borderRadius: cs.borderRadius,
        padding: cs.padding,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
      };
    }).filter(b => {
      if (seen.has(b.text)) return false;
      seen.add(b.text);
      return b.text?.length > 0;
    }).slice(0, 30);
  });
  fs.writeFileSync(`${OUT}/v9-all-badges.json`, JSON.stringify(allBadges, null, 2));
  console.log('\nAll badges:', allBadges.map(b => `"${b.text}" bg:${b.bg}`).join('\n  '));

  // Get user avatar colors (right side of navbar)
  const avatarInfo = await page.evaluate(() => {
    const nav = document.querySelector('[class*="navbar"]');
    const avatars = [...(nav?.querySelectorAll('[class*="avatar"], [class*="Avatar"]') || [])];
    // Also get all round elements
    const round = [...(nav?.querySelectorAll('*') || [])].filter(el => {
      const cs = getComputedStyle(el);
      return cs.borderRadius === '9999px' || cs.borderRadius === '50%' || cs.borderRadius.includes('9999');
    });
    return {
      avatars: avatars.map(a => ({
        cls: a.className?.slice(0, 100),
        text: a.textContent?.trim().slice(0, 20),
        bg: getComputedStyle(a).backgroundColor,
      })),
      roundEls: round.slice(0, 10).map(el => ({
        cls: el.className?.slice(0, 60),
        text: el.textContent?.trim().slice(0, 20),
        bg: getComputedStyle(el).backgroundColor,
        w: Math.round(el.getBoundingClientRect().width),
        h: Math.round(el.getBoundingClientRect().height),
      })),
    };
  });
  console.log('\nAvatar info:', JSON.stringify(avatarInfo, null, 2));

  // Expand Red Team Sample Submission card and click View
  console.log('\n[2] Finding and clicking Sample Submission "View" button...');

  // First expand the card if collapsed
  try {
    // Click the card header/collapse-title that says "Red Team Sample Submission"
    const headers = await page.$$('[class*="collapse-title"], [class*="collapse"] > div, [class*="card-title"]');
    for (const h of headers) {
      const text = await h.evaluate(el => el.textContent?.trim());
      if (text?.includes('Sample Submission')) {
        console.log('  Found collapse header, clicking...');
        await h.click();
        await sleep(1000);
        break;
      }
    }
  } catch(e) {
    console.log('  Header click failed:', e.message);
  }

  // Now find the View button inside the expanded card
  const viewButtons = await page.$$('button:has-text("View"), a:has-text("View")');
  console.log(`  Found ${viewButtons.length} View button(s)`);

  for (let i = 0; i < viewButtons.length; i++) {
    const btn = viewButtons[i];
    const text = await btn.evaluate(el => el.textContent?.trim());
    const visible = await btn.isVisible();
    console.log(`  Button ${i}: "${text}" visible:${visible}`);

    if (visible) {
      console.log('  Clicking View button...');
      // Listen for navigation
      try {
        const [response] = await Promise.all([
          page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => null),
          btn.click(),
        ]);
        await sleep(2000);
        const newURL = page.url();
        console.log('  New URL:', newURL);

        if (newURL !== HOME_URL) {
          await page.setViewportSize({ width: 1440, height: 900 });
          await sleep(500);
          await page.screenshot({ path: `${OUT}/v9-screen1-live-1440.png`, fullPage: true });
          console.log('  ✓ Screen 1 screenshot saved');

          // Extract content
          const content = await page.evaluate(() => {
            const result = { url: location.href };

            result.headings = [...document.querySelectorAll('h1, h2, h3, h4')].map(h => ({
              tag: h.tagName,
              text: h.textContent?.trim().slice(0, 200),
              color: getComputedStyle(h).color,
              fontSize: getComputedStyle(h).fontSize,
              fontWeight: getComputedStyle(h).fontWeight,
            }));

            result.buttons = [...document.querySelectorAll('button, a[href]')]
              .filter(el => el.getBoundingClientRect().width > 0 && el.textContent?.trim().length > 0)
              .map(el => {
                const cs = getComputedStyle(el);
                return {
                  text: el.textContent?.trim().slice(0, 80),
                  bg: cs.backgroundColor,
                  color: cs.color,
                  border: cs.border,
                  borderRadius: cs.borderRadius,
                  height: Math.round(el.getBoundingClientRect().height),
                  width: Math.round(el.getBoundingClientRect().width),
                };
              })
              .filter(b => b.height > 20)
              .slice(0, 20);

            // All visible text content in order
            result.allText = [...document.querySelectorAll('p, span, div')]
              .filter(el => {
                return el.children.length === 0 &&
                  el.textContent?.trim().length > 5 &&
                  getComputedStyle(el).display !== 'none' &&
                  el.getBoundingClientRect().width > 50;
              })
              .map(el => el.textContent?.trim())
              .filter(t => t)
              .slice(0, 50);

            result.hasSidebar = !!document.querySelector('aside, [class*="sidebar"]');
            result.pageBg = getComputedStyle(document.body).backgroundColor;

            return result;
          });

          fs.writeFileSync(`${OUT}/v9-screen1-content.json`, JSON.stringify(content, null, 2));
          console.log('  ✓ Screen 1 content extracted');
          console.log('  URL:', content.url);
          console.log('  Headings:', content.headings?.slice(0, 5).map(h => `${h.tag}: "${h.text}"`).join(', '));
          console.log('  Buttons:', content.buttons?.slice(0, 8).map(b => `"${b.text}" bg:${b.bg}`).join(' | '));
          console.log('  Text preview:', content.allText?.slice(0, 5).join(' | '));

          break;
        }
      } catch(e) {
        console.log('  Navigation failed:', e.message);
      }
    }
  }

  console.log('\n✅ Targeted extraction complete!');
  process.exit(0);
}

main().catch(err => {
  console.error('Script failed:', err.message);
  process.exit(1);
});

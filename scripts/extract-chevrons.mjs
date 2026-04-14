import { chromium } from '/Users/alexisonpan/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/index.mjs';

const browser = await chromium.connectOverCDP('http://localhost:61447');
const context = browser.contexts()[0];
const page = context.pages()[0] || await context.newPage();

await page.goto('https://app.gojuly.ai/home', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(2500);

const data = await page.evaluate(() => {
  const cs = (el, props) => { const s = window.getComputedStyle(el); return Object.fromEntries(props.map(p => [p, s.getPropertyValue(p)])); };

  // Get chevron icons in all track card headers
  const allChevrons = [...document.querySelectorAll('[data-testid*="Arrow"], [data-testid*="Keyboard"], [data-testid*="Chevron"]')]
    .map(el => ({
      testId: el.getAttribute('data-testid'),
      cls: el.className,
      parentText: el.closest('[class*="cursor"]')?.textContent?.trim().slice(0, 50) || el.parentElement?.textContent?.trim().slice(0, 50)
    }));

  // Collect all track card header rows and their chevron data-testids
  const trackHeaders = [...document.querySelectorAll('.flex.items-center.justify-between.py-4.px-4')]
    .map(row => {
      const titleEl = row.querySelector('h2');
      const chevronEl = row.querySelector('[data-testid]');
      return {
        title: titleEl?.textContent?.trim() || row.textContent?.trim().slice(0, 50),
        chevronTestId: chevronEl?.getAttribute('data-testid'),
        chevronCls: chevronEl?.className
      };
    });

  // Welcome to July AI! expanded content structure
  const welcomeBtn = [...document.querySelectorAll('button')].find(el => el.textContent.includes('Onboard'));
  const welcomeExpanded = welcomeBtn?.closest('[class*="px-4"]') || welcomeBtn?.parentElement;
  const welcomeExpandedHTML = welcomeExpanded?.outerHTML?.slice(0, 800) || null;

  // Description text for Welcome
  const welcomeDescEl = [...document.querySelectorAll('.text-sm.text-gray-500')].find(el =>
    el.textContent.includes('glad') || el.textContent.includes('excited') || el.textContent.includes('journey')
  );
  const welcomeDesc = welcomeDescEl?.textContent?.trim() || null;

  // Description text for Red Team Sample Submission (look for it in expanded section)
  const submissionDesc = [...document.querySelectorAll('.ja-card-body-text, [class*="card-body"] .text-sm')].map(el => el.textContent.trim().slice(0, 150));

  // View button full structure
  const viewBtn = [...document.querySelectorAll('button')].find(el => el.textContent.trim() === 'View');
  const viewBtnParent = viewBtn?.closest('.card, .ja-card, [class*="card"]');
  const viewBtnHTML = viewBtn?.outerHTML || null;
  const viewBtnParentHTML = viewBtnParent?.outerHTML?.slice(0, 400) || null;

  // Annotation panel structure
  const annotationPanel = [...document.querySelectorAll('*')].find(el =>
    el.textContent.includes('Annotation') && el.children.length > 1 && el.children.length < 15 &&
    el.offsetWidth < 400 && el.offsetWidth > 100
  );
  const annotationHTML = annotationPanel?.outerHTML?.slice(0, 1000) || null;
  const annotationCls = annotationPanel?.className || null;

  // Right side panel items on learning page — get from a clean page
  // content area classes
  const contentArea = document.querySelector('main > div');
  const contentAreaCls = contentArea?.className || null;

  // Track container class
  const trackContainer = document.querySelector('[class*="max-w-6xl"], [class*="max-w-5xl"], [class*="max-w-4xl"]');
  const trackContainerData = trackContainer ? {
    cls: trackContainer.className,
    css: {
      maxWidth: window.getComputedStyle(trackContainer).maxWidth,
      padding: window.getComputedStyle(trackContainer).padding,
      marginLeft: window.getComputedStyle(trackContainer).marginLeft
    }
  } : null;

  return { allChevrons, trackHeaders, welcomeExpandedHTML, welcomeDesc, submissionDesc, viewBtnHTML, viewBtnParentHTML, annotationHTML, annotationCls, contentAreaCls, trackContainerData };
});

console.log(JSON.stringify(data, null, 2));
process.exit(0);

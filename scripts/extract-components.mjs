import { chromium } from '/Users/alexisonpan/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/index.mjs';

const browser = await chromium.connectOverCDP('http://localhost:61447');
const context = browser.contexts()[0];
const page = context.pages()[0] || await context.newPage();
const cs = (el, props) => { const s = window.getComputedStyle(el); return Object.fromEntries(props.map(p => [p, s.getPropertyValue(p)])); };

// ── LEARNING PAGE ─────────────────────────────────────────────
await page.goto(
  'https://app.gojuly.ai/learning/3a0c9d2c-acdf-4696-aa32-f1e72dc79401?type=objective&id=fc910896-a335-4d32-b741-864336accd12&collection=697352e4-53eb-44d9-ba04-a360ab9e4e6a',
  { waitUntil: 'domcontentloaded', timeout: 30000 }
);
await page.waitForTimeout(2000);

const learningComponents = await page.evaluate(() => {
  const cs = (el, props) => { const s = window.getComputedStyle(el); return Object.fromEntries(props.map(p => [p, s.getPropertyValue(p)])); };

  // ── Sidebar: get ALL challenge item img srcs ──
  const sidebar = document.querySelector('aside');
  const challengeImgs = sidebar ? [...sidebar.querySelectorAll('img')].map(img => ({
    src: img.getAttribute('src'),
    alt: img.getAttribute('alt'),
    cls: img.className,
    parentText: img.parentElement?.textContent?.trim().slice(0, 40)
  })) : [];

  // ── Full sidebar nav items including icons ──
  const allNavDivs = sidebar ? [...sidebar.querySelectorAll('li > div, li > a')].map(div => ({
    text: div.textContent.trim().slice(0, 50),
    cls: div.className,
    imgSrc: div.querySelector('img')?.getAttribute('src') || null,
    css: cs(div, ['background-color','border-left','font-weight','font-size','padding'])
  })) : [];

  // ── Feedback panel ──
  const feedbackPanel = [...document.querySelectorAll('*')].find(el =>
    el.textContent.trim().startsWith('Feedback') && el.children.length > 0 && el.children.length < 10
  );
  const feedbackData = feedbackPanel ? {
    outerHTML: feedbackPanel.outerHTML.slice(0, 600),
    cls: feedbackPanel.className,
    css: cs(feedbackPanel, ['background-color','border-radius','border','padding','box-shadow'])
  } : null;

  // "Click here for live feedback" button
  const feedbackBtn = [...document.querySelectorAll('button, a')].find(el =>
    el.textContent.includes('live feedback')
  );
  const feedbackBtnData = feedbackBtn ? {
    cls: feedbackBtn.className,
    css: cs(feedbackBtn, ['background-color','color','border','border-radius','padding','font-size','font-weight']),
    outerHTML: feedbackBtn.outerHTML.slice(0, 300)
  } : null;

  // ── Annotation panel ──
  const annotationPanel = [...document.querySelectorAll('*')].find(el =>
    el.textContent.trim().startsWith('Annotation') && el.children.length > 0 && el.children.length < 15
  );
  const annotationData = annotationPanel ? {
    outerHTML: annotationPanel.outerHTML.slice(0, 800),
    cls: annotationPanel.className,
    css: cs(annotationPanel, ['background-color','border-radius','border','padding','box-shadow'])
  } : null;

  // ── Main content area: Challenge header + chat area ──
  const challengeHeader = document.querySelector('[class*="challenge-header"], [class*="ChallengeHeader"]') ||
    [...document.querySelectorAll('div')].find(el =>
      el.textContent.includes('Challenge 3') && el.textContent.includes('Reset') && el.children.length > 1
    );
  const challengeHeaderData = challengeHeader ? {
    cls: challengeHeader.className,
    css: cs(challengeHeader, ['background-color','border-bottom','padding','height','font-size','font-weight','display','align-items']),
    outerHTML: challengeHeader.outerHTML.slice(0, 500)
  } : null;

  // ── Reset Conversation button ──
  const resetBtn = [...document.querySelectorAll('button')].find(el =>
    el.textContent.includes('Reset Conversation')
  );
  const resetBtnData = resetBtn ? {
    cls: resetBtn.className,
    css: cs(resetBtn, ['background-color','color','border','border-radius','padding','font-size']),
    outerHTML: resetBtn.outerHTML.slice(0, 200)
  } : null;

  // ── Status of Attack Outcome panel ──
  const statusPanel = [...document.querySelectorAll('*')].find(el =>
    el.textContent.includes('Status of Attack Outcome') && el.children.length < 10
  );
  const statusData = statusPanel ? {
    cls: statusPanel.className,
    css: cs(statusPanel, ['background-color','border-radius','border','padding','box-shadow']),
    outerHTML: statusPanel.outerHTML.slice(0, 400)
  } : null;

  // ── Right panel (Annotation + Feedback + Status) container ──
  const rightPanel = feedbackPanel?.parentElement;
  const rightPanelData = rightPanel ? {
    cls: rightPanel.className,
    css: cs(rightPanel, ['width','background-color','padding','gap','display','flex-direction'])
  } : null;

  return { challengeImgs, allNavDivs, feedbackData, feedbackBtnData, annotationData, challengeHeaderData, resetBtnData, statusData, rightPanelData };
});

console.log('=== LEARNING PAGE COMPONENTS ===');
console.log(JSON.stringify(learningComponents, null, 2));

// ── HOME PAGE ─────────────────────────────────────────────────
await page.goto('https://app.gojuly.ai/home', { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(2500);

const homeComponents = await page.evaluate(() => {
  const cs = (el, props) => { const s = window.getComputedStyle(el); return Object.fromEntries(props.map(p => [p, s.getPropertyValue(p)])); };

  // ── Navbar exact structure ──
  const navbar = document.querySelector('.navbar, nav');
  const navbarData = navbar ? {
    cls: navbar.className,
    css: cs(navbar, ['background-color','border','border-radius','border-bottom-left-radius','border-bottom-right-radius','height','padding','position','box-shadow']),
    outerHTML: navbar.outerHTML.slice(0, 600)
  } : null;

  // ── "Home" active button ──
  const homeBtn = [...document.querySelectorAll('button, a')].find(el =>
    el.textContent.trim() === 'Home' && el.closest('nav, .navbar')
  );
  const homeBtnData = homeBtn ? {
    cls: homeBtn.className,
    css: cs(homeBtn, ['background-color','color','border-radius','padding','font-weight','font-size'])
  } : null;

  // ── Greeting h1 / heading ──
  const greetings = [...document.querySelectorAll('h1, h2, h3')].filter(el =>
    el.textContent.includes('Hey') || el.textContent.includes('Alex')
  );
  const greetingData = greetings.map(el => ({
    tag: el.tagName,
    text: el.textContent.trim(),
    cls: el.className,
    css: cs(el, ['font-size','font-weight','font-family','color','margin-bottom','letter-spacing'])
  }));

  // ── Track card outer rows ── find the accordion/track card structure
  const trackRows = [...document.querySelectorAll('[class*="track"], [class*="Track"]')]
    .filter(el => el.offsetWidth > 500 && el.offsetHeight > 40)
    .slice(0, 6).map(el => ({
      text: el.textContent.trim().slice(0, 60),
      cls: el.className,
      css: cs(el, ['background-color','border','border-radius','padding','box-shadow','width'])
    }));

  // ── All module/track container items ──
  // Find by clicking patterns — any div that has a track title and toggle structure
  const allExpandable = [...document.querySelectorAll('[class*="flex"][class*="cursor"], [class*="cursor-pointer"]')]
    .filter(el => el.offsetWidth > 400 && el.offsetHeight > 50 && el.offsetHeight < 200)
    .slice(0, 10).map(el => ({
      text: el.textContent.trim().slice(0, 80),
      cls: el.className,
      css: cs(el, ['background-color','border','border-radius','padding'])
    }));

  // ── "Welcome to July AI!" card specifically — expanded content ──
  const welcomeCard = [...document.querySelectorAll('*')].find(el =>
    el.textContent.trim().startsWith('Welcome to July AI') && el.offsetWidth > 300
  );
  const welcomeData = welcomeCard ? {
    cls: welcomeCard.className,
    outerHTML: welcomeCard.outerHTML.slice(0, 1500),
    css: cs(welcomeCard, ['background-color','border','border-radius','padding','box-shadow'])
  } : null;

  // ── Onboarded button ──
  const onboardBtn = [...document.querySelectorAll('button, a')].find(el =>
    el.textContent.includes('Onboard')
  );
  const onboardBtnData = onboardBtn ? {
    text: onboardBtn.textContent.trim(),
    cls: onboardBtn.className,
    css: cs(onboardBtn, ['background-color','color','border','border-radius','padding','font-size','font-weight']),
    outerHTML: onboardBtn.outerHTML.slice(0, 300)
  } : null;

  // ── Badge styles (all unique badge variants) ──
  const badges = [...document.querySelectorAll('[class*="badge"], [class*="Badge"], [class*="state"]')]
    .filter(el => el.offsetHeight < 40 && el.textContent.trim().length < 30)
    .map(el => ({
      text: el.textContent.trim(),
      cls: el.className,
      css: cs(el, ['background-color','color','font-size','font-weight','border-radius','padding','text-transform'])
    }))
    .filter((b, i, arr) => arr.findIndex(x => x.text === b.text) === i) // unique by text
    .slice(0, 8);

  // ── AI Red Team card description text ──
  const aiRedTeamCard = [...document.querySelectorAll('*')].find(el => {
    const t = el.textContent.trim();
    return t.startsWith('AI Red Team') && el.offsetWidth > 400;
  });
  const aiRedTeamHTML = aiRedTeamCard?.outerHTML?.slice(0, 2000) || null;

  // ── Red Team Sample Submission card ──
  const submissionCard = [...document.querySelectorAll('*')].find(el => {
    const t = el.textContent.trim();
    return t.startsWith('Red Team Sample Submission') && el.offsetWidth > 400 && el.children.length > 1;
  });
  const submissionHTML = submissionCard?.outerHTML?.slice(0, 1500) || null;

  // ── View button ──
  const viewBtn = [...document.querySelectorAll('button, a')].find(el =>
    el.textContent.trim() === 'View'
  );
  const viewBtnData = viewBtn ? {
    cls: viewBtn.className,
    css: cs(viewBtn, ['background-color','color','border','border-radius','padding','font-size','font-weight']),
    outerHTML: viewBtn.outerHTML
  } : null;

  // ── Duration elements ── (the "2.0 HOURS", "2.5 MINUTES" spans)
  const durationEls = [...document.querySelectorAll('*')]
    .filter(el => /\d+\.?\d+\s*(HOURS|MINUTES|hours|minutes)/i.test(el.textContent.trim()) && el.children.length === 0)
    .slice(0, 4).map(el => ({
      text: el.textContent.trim(),
      cls: el.className,
      css: cs(el, ['font-size','color','font-weight','font-family']),
      parentCls: el.parentElement?.className
    }));

  return { navbarData, homeBtnData, greetingData, trackRows, allExpandable, welcomeData, onboardBtnData, badges, aiRedTeamHTML, submissionHTML, viewBtnData, durationEls };
});

console.log('\n=== HOME PAGE COMPONENTS ===');
console.log(JSON.stringify(homeComponents, null, 2));

process.exit(0);

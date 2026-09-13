const { chromium } = require('playwright');
const { mkdirSync, writeFileSync } = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

(async () => {
  const output = path.resolve(__dirname, '../output/playwright');
  mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const checks = [], errors = [], external = [];
  const check = (label, value) => { assert.ok(value, label); checks.push(label); };
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:4173/')) external.push(request.url()); });
  try {
    await page.goto('http://127.0.0.1:4173/');
    await page.locator('.duet-offer').last().waitFor();
    check('Exactly one main heading', await page.locator('h1').count() === 1);
    check('All six service descriptions retained', await page.locator('.studio-service').count() === 6);
    check('Equal desktop offers', await page.locator('.duet-offer').evaluateAll(items => { const [a,b] = items.map(e=>e.getBoundingClientRect()); return a.width === b.width && a.height === b.height; }));
    check('Two approved cool shades', await page.locator('.duet-offer').evaluateAll(items => items.map(e=>getComputedStyle(e).backgroundColor).join('|') === 'rgb(209, 217, 252)|rgb(69, 75, 155)'));
    check('No broken fragment links', await page.locator('a[href^="#"]').evaluateAll(items=>items.every(e=>document.getElementById(e.getAttribute('href').slice(1)))));
    await page.screenshot({ path: path.join(output,'duet-desktop.png') });
    await page.keyboard.press('Tab');
    check('Keyboard skip link and visible focus', await page.locator('.studio-skip').evaluate(e=>document.activeElement === e && getComputedStyle(e).outlineStyle !== 'none'));
    await page.keyboard.press('Enter');
    check('Skip reaches services', new URL(page.url()).hash === '#services');
    for (const domain of ['Music', 'Audio']) {
      await page.getByRole('link', {name:`Explore ${domain}`,exact:true}).click();
      check(`${domain} offer reaches matching service`, new URL(page.url()).hash === `#${domain.toLowerCase()}-make`);
    }
    await page.getByRole('button', {name:'AS Alexander Say Explore with Alexander'}).click();
    await page.locator('#audio-make').getByRole('button', {name:'Explore with Alexander'}).click();
    check('Audio inquiry preserves chosen collaborator and service', (await page.locator('.inquiry-person').innerText()).includes('Alexander Say') && (await page.locator('textarea[name=goal]').inputValue()).includes('Start with a clean signal.'));
    await page.getByLabel('Your name',{exact:true}).fill('Local QA');
    await page.getByLabel('Email',{exact:true}).fill('qa@example.invalid');
    await page.getByRole('button',{name:'Shape my request'}).click();
    check('Brief prepared locally', await page.locator('.concierge-reply').isVisible());
    await page.locator('textarea[name=goal]').fill('Changed local QA request');
    check('Editing invalidates old brief', await page.locator('.concierge-reply').count() === 0);
    for (const [name, expected] of [['Rehearse success','Practice order complete. $0 charged.'],['Try a decline','Practice decline'],['Try cancellation','Payment cancelled.']]) {
      await page.getByRole('button',{name}).click();
      check(name, (await page.locator('.practice-status').innerText()).includes(expected));
    }
    check('No payment input fields', await page.locator('#checkout input').count() === 0);
    for (const width of [390,320]) {
      await page.setViewportSize({width,height:844});
      await page.goto('http://127.0.0.1:4173/');
      check(`No horizontal overflow at ${width}px`, await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      check(`Equal stacked offers at ${width}px`, await page.locator('.duet-offer').evaluateAll(items=>{const[a,b]=items.map(e=>e.getBoundingClientRect());return a.width===b.width && Math.abs(a.height-b.height)<1 && b.top>=a.bottom;}));
      check(`Both offer actions meet touch target at ${width}px`, await page.locator('.duet-offer-bottom a').evaluateAll(items=>items.every(e=>e.getBoundingClientRect().height>=44)));
      if(width===390) {
        await page.screenshot({path:path.join(output,'duet-mobile.png')});
        await page.locator('.duet-audio').scrollIntoViewIfNeeded();
        await page.screenshot({path:path.join(output,'duet-mobile-audio.png')});
      }
    }
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.reload();
    check('Reduced motion keeps full content without animations', await page.locator('.duet-offer').evaluateAll(items=>items.every(e=>getComputedStyle(e).animationName==='none')) && await page.locator('.studio-service').count()===6);
    await page.setViewportSize({width:1280,height:720});
    await page.goto('http://127.0.0.1:4173/');
    check('Both CTAs visible on shorter desktop viewport', await page.locator('.duet-offer-bottom a').evaluateAll(items=>items.every(e=>e.getBoundingClientRect().bottom<=innerHeight)));
    await page.screenshot({path:path.join(output,'duet-short-desktop.png')});
    check('No external requests from local customer rehearsal', external.length===0);
    check('No application errors',errors.length===0);
    writeFileSync(path.join(output,'duet-qa.json'),JSON.stringify({date:new Date().toISOString(),checks,errors,external},null,2));
    console.log(JSON.stringify({passed:checks.length,checks,errors},null,2));
  } finally { await browser.close(); }
})().catch(error=>{ console.error(error); process.exitCode=1; });

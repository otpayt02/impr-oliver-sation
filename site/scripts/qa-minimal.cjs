async (page) => {
  const checks = [], errors = [];
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  page.on('pageerror', error => errors.push(error.message));
  const check = (name, value) => { if (!value) throw Error(name); checks.push(name); };
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('http://127.0.0.1:4173/');
  await page.getByRole('heading', { level: 1 }).waitFor();
  await page.getByRole('button', { name: 'Pause motion', exact: true }).click();
  check('Pause enabled', await page.getByRole('button', { name: 'Resume motion' }).getAttribute('aria-pressed') === 'true');
  await page.screenshot({ path: 'output/playwright/minimal-desktop.png' });
  check('One headline only', await page.locator('h1').count() === 1);
  check('White your', await page.locator('.phrase-your').evaluate(el => getComputedStyle(el).color === 'rgb(255, 255, 255)'));
  const history = [];
  for (let i = 0; i < 25; i++) {
    const phrase = await page.locator('h1').innerText();
    check('No recent repeat ' + i, !history.slice(-6).includes(phrase)); history.push(phrase);
    check('Headline fits ' + i, await page.locator('h1').evaluate(el => { const r=el.getBoundingClientRect(); return r.left>=0 && r.right<=innerWidth && r.bottom<innerHeight; }));
    await page.getByRole('button', { name: 'Show another service phrase' }).click();
  }
  await page.getByRole('button', { name: 'Resume motion' }).click();
  for (const [name, fraction] of [['middle', .5], ['end', .99], ['reverse', .2]]) {
    await page.evaluate(f => { document.documentElement.style.scrollBehavior='auto'; window.scrollTo(0,(document.querySelector('.minimal-runway').offsetHeight-innerHeight)*f); }, fraction);
    await page.waitForFunction(f => Math.abs(Number(document.querySelector('.minimal-progress span').style.transform.match(/scaleX\((.*?)\)/)[1])-f)<.02, fraction);
    check('Sticky ' + name, await page.locator('.minimal-viewport').evaluate(el => Math.abs(el.getBoundingClientRect().top)<2));
    await page.screenshot({ path: 'output/playwright/minimal-' + name + '.png' });
  }
  await page.reload();
  await page.waitForFunction(() => Number(document.querySelector('.minimal-progress span').style.transform.match(/scaleX\((.*?)\)/)[1])>.1);
  check('Refresh restores scroll', true);
  await page.locator('#services').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'AS Alexander Say Explore with Alexander' }).first().click();
  check('Named collaborator preserved', (await page.locator('.inquiry-person').innerText()).includes('Alexander Say'));
  await page.screenshot({ path: 'output/playwright/minimal-services.png' });
  for (const size of [{width:390,height:844},{width:375,height:667}]) {
    await page.setViewportSize(size); await page.goto('http://127.0.0.1:4173/');
    await page.locator('h1').waitFor();
    check('No mobile overflow ' + size.width, await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    await page.waitForFunction(()=>getComputedStyle(document.querySelector('h1')).opacity==='1');
    await page.screenshot({ path: 'output/playwright/minimal-mobile-' + size.width + '.png' });
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  check('Reduced static layout', await page.locator('.minimal-runway').getAttribute('class').then(c=>c.includes('is-reduced')));
  await page.getByRole('button', { name: 'Show another service phrase' }).click();
  check('Reduced mode manual phrase works', await page.locator('h1').innerText().then(t=>!t.startsWith('Shape')));
  await page.screenshot({ path: 'output/playwright/minimal-reduced.png' });
  check('No runtime errors', errors.length===0);
  return { checks: checks.length, errors, passed: checks };
}

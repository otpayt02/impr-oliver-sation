async (page) => {
  await page.goto('http://127.0.0.1:4173/#checkout');
  await page.getByRole('button', { name: 'Load Google Pay test checkout ↗' }).click();
  await page.locator('.google-pay-mount button').waitFor();
  const details = await page.locator('.google-pay-mount').evaluate(el => ({ html: el.innerHTML, buttonStyles: [...el.querySelectorAll('button, img, svg')].map(x => ({ tag: x.tagName, label: x.getAttribute('aria-label'), background: getComputedStyle(x).backgroundImage, width: x.clientWidth, height: x.clientHeight })) }));
  await page.screenshot({ path: 'output/playwright/cream-wallet-inspect.png' });
  return details;
}

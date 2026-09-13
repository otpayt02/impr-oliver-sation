async (page) => {
  await page.goto('http://127.0.0.1:4173/#checkout');
  await page.getByRole('button', { name: 'Load Google Pay test checkout ↗' }).click();
  await page.getByText('Google Pay · TEST wallet · no real charge', { exact: true }).waitFor();
  const pending = page.waitForEvent('popup', { timeout: 12000 }).catch(() => null);
  await page.getByRole('button', { name: 'Pay with GPay', exact: true }).click();
  const popup = await pending;
  if (popup) {
    await popup.waitForLoadState('domcontentloaded').catch(() => {});
    const result = { popupOrigin: new URL(popup.url()).origin, title: await popup.title(), appStatus: await page.locator('.practice-status').innerText() };
    await popup.close();
    return result;
  }
  return { popup: false, appStatus: await page.locator('.practice-status').innerText() };
}

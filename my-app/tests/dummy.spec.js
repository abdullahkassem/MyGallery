const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('');
  const title = await page.title();
  expect(title).toBe('Carousel Gallery');
});

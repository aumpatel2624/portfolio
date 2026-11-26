import { expect, test, type Locator, type Page } from '@playwright/test';

/** Both pages render, the file can be saved or opened, and zooming makes the pages scroll. */
async function expectResume(scope: Locator, page: Page) {
  const pages = scope.getByRole('img', { name: /^Resume page \d of 2$/ });
  await expect(pages).toHaveCount(2);
  for (const image of await pages.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth))
      .toBe(1600);
  }

  const download = scope.getByRole('link', { name: /^Download .* resume \(PDF\)$/ }).last();
  await expect(download).toHaveAttribute('download', '');
  const open = scope.getByRole('link', { name: /in a new tab$/ });
  await expect(open).toHaveAttribute('target', '_blank');
  const href = await open.getAttribute('href');
  expect((await page.request.get(href!)).status()).toBe(200);

  const region = scope.getByRole('region', { name: 'Resume pages' });
  const first = pages.first();
  const fitted = (await first.boundingBox())!.width;
  expect(fitted).toBeLessThanOrEqual((await region.boundingBox())!.width + 0.5);
  const zoomIn = scope.getByRole('button', { name: 'Zoom in' });
  while (await zoomIn.isEnabled()) await zoomIn.click();
  expect((await first.boundingBox())!.width).toBeGreaterThan(fitted * 2.9);
  const sideways = await region.evaluate((el) => {
    el.scrollLeft = el.scrollWidth;
    return el.scrollLeft;
  });
  expect(sideways).toBeGreaterThan(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);

  await scope.getByText('Text version').click();
  await expect(scope.getByRole('heading', { name: 'Technical skills' }).last()).toBeVisible();
}

test('desktop Resume window shows the resume', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('./');
  await expect(page.getByRole('dialog', { name: '~/aum/about.txt' })).toBeVisible({
    timeout: 6000,
  });
  await page.getByRole('button', { name: 'Open resume.pdf' }).first().click();
  await expectResume(page.getByRole('dialog', { name: '~/aum/resume.pdf' }), page);
});

for (const width of [360, 390]) {
  test(`phone Resume sheet shows the resume @${width}`, async ({ page }) => {
    test.skip(process.env.VITE_FORCE_DESKTOP === 'true', 'needs the phone OS');
    await page.setViewportSize({ width, height: 800 });
    await page.goto('./');
    await expect(page.getByRole('status', { name: /starting portfolio\.os/i })).toBeHidden({
      timeout: 6000,
    });
    await page.getByRole('button', { name: 'Resume', exact: true }).click();
    await expectResume(page.getByRole('dialog', { name: 'resume.pdf' }), page);
  });
}

for (const width of [360, 1440]) {
  test(`classic page shows the resume @${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('classic');
    await expectResume(page.locator('#resume'), page);
  });
}

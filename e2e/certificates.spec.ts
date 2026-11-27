import { expect, test, type Locator, type Page } from '@playwright/test';

const badges = ['Claude 101', 'AI capabilities and limitations'];

/** Both badge images load, both PDFs are served and nothing pushes the page sideways. */
async function expectCertificates(scope: Locator, page: Page) {
  await expect(scope.getByRole('heading', { name: 'Certificates' })).toBeAttached();
  const images = scope.getByRole('img', { name: /course completion badge for/ });
  await expect(images).toHaveCount(badges.length);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect
      .poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth))
      .toBe(1200);
  }
  for (const title of badges) {
    const open = scope.getByRole('link', { name: `Open the ${title} badge (PDF) in a new tab` });
    await expect(open).toHaveAttribute('target', '_blank');
    const got = await page.request.get((await open.getAttribute('href'))!);
    expect(got.status()).toBe(200);
    expect(got.headers()['content-type']).toBe('application/pdf');
  }
  await expect(scope.getByRole('link', { name: /^academy\.claude\.com\/verify\// })).toHaveCount(
    badges.length,
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
}

test('desktop education window shows the certificates', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('./');
  await expect(page.getByRole('dialog', { name: '~/aum/about.txt' })).toBeVisible({
    timeout: 6000,
  });
  await page.getByRole('button', { name: 'Open education' }).first().click();
  await expectCertificates(page.getByRole('dialog', { name: '~/aum/education/' }), page);
});

for (const width of [360, 390]) {
  test(`phone education sheet shows the certificates @${width}`, async ({ page }) => {
    test.skip(process.env.VITE_FORCE_DESKTOP === 'true', 'needs the phone OS');
    await page.setViewportSize({ width, height: 800 });
    await page.goto('./');
    await expect(page.getByRole('status', { name: /starting portfolio\.os/i })).toBeHidden({
      timeout: 6000,
    });
    await page.getByRole('button', { name: 'Open Education' }).click();
    await expectCertificates(page.getByRole('dialog', { name: 'education' }), page);
  });
}

for (const width of [360, 1440]) {
  test(`classic page shows the certificates @${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('classic');
    await expectCertificates(page.locator('#certificates'), page);
  });
}

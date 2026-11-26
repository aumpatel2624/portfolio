import { expect, test, type Locator } from '@playwright/test';

/** After typing finishes, every character and the cursor must be inside the line. */
async function expectFullLine(dialog: Locator) {
  const line = dialog.locator('span:text-is("$") + span');
  await expect(line).toBeVisible();
  const size = await line.evaluate(async (el) => {
    await document.fonts.ready;
    await Promise.all(
      el
        .getAnimations()
        .filter((a) => a.effect?.getTiming().iterations !== Infinity)
        .map((a) => a.finished),
    );
    return {
      text: el.scrollWidth,
      box: el.clientWidth,
      right: el.getBoundingClientRect().right,
      limit: el.parentElement!.getBoundingClientRect().right,
    };
  });
  expect(size.text).toBeLessThanOrEqual(size.box);
  expect(size.right).toBeLessThanOrEqual(size.limit + 0.5);
}

test('typewriter line is not clipped on the desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('./');
  const about = page.getByRole('dialog', { name: '~/aum/about.txt' });
  await expect(about).toBeVisible({ timeout: 6000 });
  await expectFullLine(about);
});

for (const width of [360, 390]) {
  test(`typewriter line is not clipped on the phone @${width}`, async ({ page }) => {
    test.skip(process.env.VITE_FORCE_DESKTOP === 'true', 'needs the phone OS');
    await page.setViewportSize({ width, height: 800 });
    await page.goto('./');
    await expect(page.getByRole('status', { name: /starting portfolio\.os/i })).toBeHidden({
      timeout: 6000,
    });
    await page.getByRole('button', { name: 'Open About' }).click();
    await expectFullLine(page.getByRole('dialog', { name: 'about.txt' }));
  });
}

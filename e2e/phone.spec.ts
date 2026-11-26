import { expect, test } from '@playwright/test';

test.skip(process.env.VITE_FORCE_DESKTOP === 'true', 'needs a build without VITE_FORCE_DESKTOP');
test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

test('phone OS boots, opens apps, drills into an entry', async ({ page }) => {
  await page.goto('./');

  // Boot splash gives way to the home screen.
  await expect(page.getByRole('status', { name: /starting portfolio\.os/i })).toBeVisible();
  await expect(page.getByRole('status', { name: /starting portfolio\.os/i })).toBeHidden({
    timeout: 6000,
  });
  await expect(page.getByRole('button', { name: 'Open About' }).first()).toBeVisible();

  // AI engineering: list -> detail -> back to the list -> home.
  await page.getByRole('button', { name: 'Open AI engineering' }).tap();
  const ai = page.getByRole('dialog', { name: 'ai-engineering' });
  await expect(ai).toBeVisible();
  await ai.getByRole('button', { name: /Podcast knowledge pipeline/ }).tap();
  await expect(page.getByRole('heading', { name: 'Podcast knowledge pipeline' })).toBeVisible();
  await page.getByRole('button', { name: 'All projects' }).tap();
  await ai.getByRole('button', { name: /SEO keyword research tool/ }).tap();
  await expect(page.getByRole('heading', { name: 'SEO keyword research tool' })).toBeVisible();
  await page.getByRole('button', { name: 'Back to home' }).tap();
  await expect(page.getByRole('dialog')).toHaveCount(0);

  // The About icon opens About, whose photo toggles to ASCII art.
  await page.getByRole('button', { name: 'Open About' }).first().tap();
  const about = page.getByRole('dialog', { name: 'about.txt' });
  await expect(about.getByRole('heading', { level: 1 })).toContainText('Aum Patel.');
  await about.getByRole('button', { name: /ASCII art version/ }).tap();
  await expect(about.getByRole('button', { name: 'Show the photo' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.getByRole('button', { name: 'Go to home screen' }).tap();
  await expect(page.getByRole('dialog')).toHaveCount(0);

  // The dock leads to the classic site.
  await page.getByRole('link', { name: 'Classic site' }).tap();
  await expect(page).toHaveURL(/\/classic$/);
});

for (const width of [360, 390, 430, 767]) {
  test(`no horizontal overflow @${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('./');
    // The phone view loads lazily: wait for it, or a not yet mounted splash counts as hidden.
    await expect(page.locator('main')).toBeAttached();
    await expect(page.getByRole('status', { name: /starting portfolio\.os/i })).toBeHidden({
      timeout: 6000,
    });
    const overflows = () =>
      page.evaluate(() => {
        const phone = document.querySelector('main')!.parentElement!.parentElement!;
        const limit = phone.getBoundingClientRect().right + 0.5;
        const wide = [...phone.querySelectorAll<HTMLElement>('*')].filter((el) => {
          const r = el.getBoundingClientRect();
          return (
            r.width > 0 &&
            r.right > limit &&
            !el.closest('svg') &&
            !el.closest('[aria-hidden="true"]')
          );
        });
        return {
          page: document.documentElement.scrollWidth > window.innerWidth,
          elements: wide.map((el) => `${el.tagName}.${el.className}`),
        };
      });
    expect(await overflows()).toEqual({ page: false, elements: [] });

    for (const app of [
      'About',
      'AI engineering',
      'Experience',
      'Skills',
      'Work projects',
      'Education',
    ]) {
      await page
        .getByRole('button', { name: `Open ${app}` })
        .last()
        .dispatchEvent('click');
      await page.waitForTimeout(500);
      expect(await overflows(), app).toEqual({ page: false, elements: [] });
      await page.getByRole('button', { name: 'Back to home' }).dispatchEvent('click');
      await page.waitForTimeout(350);
    }
    for (const app of ['Contact', 'Resume']) {
      await page.getByRole('button', { name: app, exact: true }).dispatchEvent('click');
      await page.waitForTimeout(500);
      expect(await overflows(), app).toEqual({ page: false, elements: [] });
      await page.getByRole('button', { name: 'Back to home' }).dispatchEvent('click');
      await page.waitForTimeout(350);
    }
  });
}

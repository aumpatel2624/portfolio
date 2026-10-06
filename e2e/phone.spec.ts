import { expect, test } from '@playwright/test';

test.skip(process.env.VITE_FORCE_DESKTOP === 'true', 'needs a build without VITE_FORCE_DESKTOP');
test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

test('phone OS boots, opens apps, drills into a project', async ({ page }) => {
  await page.goto('/');

  // Boot splash gives way to the home screen.
  await expect(page.getByRole('status', { name: /starting portfolio\.os/i })).toBeVisible();
  await expect(page.getByRole('status', { name: /starting portfolio\.os/i })).toBeHidden({
    timeout: 6000,
  });
  await expect(page.getByRole('button', { name: 'Open About' }).first()).toBeVisible();

  // Projects: list -> detail -> case study link -> back to the list -> home.
  await page.getByRole('button', { name: 'Open Projects' }).tap();
  const projects = page.getByRole('dialog', { name: 'projects' });
  await expect(projects).toBeVisible();
  await projects.getByRole('button', { name: /WhatsApp panel/ }).tap();
  await expect(
    page.getByRole('heading', { name: /WhatsApp panel with an LLM order parser/ }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'All projects' }).tap();
  await projects.getByRole('button', { name: /PhoneDeck/ }).tap();
  await expect(page.getByRole('link', { name: /Read the full case study/ })).toHaveAttribute(
    'href',
    '/work/phonedeck',
  );
  await page.getByRole('button', { name: 'Back to home' }).tap();
  await expect(page.getByRole('dialog')).toHaveCount(0);

  // The About icon opens About, whose photo toggles to ASCII art.
  await page.getByRole('button', { name: 'Open About' }).first().tap();
  const about = page.getByRole('dialog', { name: 'about.txt' });
  await expect(about.getByRole('heading', { level: 1 })).toContainText("Hi, I'm Aum.");
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
    await page.goto('/');
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

    for (const app of ['About', 'Projects', 'Experience', 'Skills', 'Setup', 'Hobbies', 'Photos']) {
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

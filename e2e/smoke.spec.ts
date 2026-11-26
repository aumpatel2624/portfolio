import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 1440, height: 900 } });

test('desktop boots, opens windows and reaches the classic site', async ({ page }) => {
  await page.goto('./');

  // Boot screen shows, then the About window opens by itself.
  await expect(page.getByRole('status', { name: /starting portfolio\.exe/i })).toBeVisible();
  const about = page.getByRole('dialog', { name: '~/aum/about.txt' });
  await expect(about).toBeVisible({ timeout: 6000 });
  await expect(about.getByRole('heading', { level: 1 })).toContainText('Aum Patel.');

  // Open AI engineering from the desktop icon and pick another entry.
  await page.getByRole('button', { name: 'Open ai-engineering' }).first().click();
  const projects = page.getByRole('dialog', { name: '~/aum/ai-engineering/' });
  await expect(projects).toBeVisible();
  await projects.getByRole('button', { name: /SEO keyword research tool/ }).click();
  await expect(projects.getByRole('heading', { name: 'SEO keyword research tool' })).toBeVisible();

  // Taskbar: the top window minimises, then restores.
  const task = page.getByRole('button', { name: 'ai-engineering', exact: true });
  await task.click();
  await expect(projects).toBeHidden();
  await task.click();
  await expect(projects).toBeVisible();

  // Escape closes the focused window and focus returns to its icon.
  await page.keyboard.press('Escape');
  await expect(projects).toBeHidden();
  await expect(page.getByRole('button', { name: 'Open ai-engineering' }).first()).toBeFocused();

  // Start menu leads to the classic site.
  await page.getByRole('button', { name: 'Start menu' }).click();
  await expect(page.getByRole('button', { name: /wallpaper/i })).toHaveCount(0);
  await page.getByRole('link', { name: /Classic site/ }).click();
  await expect(page).toHaveURL(/\/classic$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Aum Patel');
});

test('narrow screens get the phone OS instead of the desktop', async ({ page }) => {
  test.skip(process.env.VITE_FORCE_DESKTOP === 'true', 'flag keeps the desktop on every width');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  await expect(page).not.toHaveURL(/\/classic$/);
  await expect(page.getByRole('status', { name: /starting portfolio\.os/i })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open AI engineering' })).toBeVisible();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

// Only meaningful for a build with VITE_FORCE_DESKTOP=true, e.g. `VITE_FORCE_DESKTOP=true npm run build`.
test('forced desktop build keeps narrow screens on the desktop', async ({ page }) => {
  test.skip(process.env.VITE_FORCE_DESKTOP !== 'true', 'needs a VITE_FORCE_DESKTOP=true build');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  const about = page.getByRole('dialog', { name: '~/aum/about.txt' });
  await expect(about).toBeVisible({ timeout: 6000 });
  await expect(page).not.toHaveURL(/\/classic$/);
  const box = await about.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
});

for (const width of [768, 1024, 1440]) {
  test(`desktop windows stay on screen @${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 768 });
    await page.goto('./');
    await expect(page.getByRole('dialog', { name: '~/aum/about.txt' })).toBeVisible({
      timeout: 6000,
    });
    const outside: string[] = [];
    for (const name of [
      'about.txt',
      'ai-engineering',
      'experience',
      'skills',
      'work-projects',
      'education',
      'contact',
      'resume.pdf',
    ]) {
      await page
        .getByRole('button', { name: `Open ${name}`, exact: true })
        .last()
        .dispatchEvent('click');
      const dialog = page.getByRole('dialog').filter({ hasText: `~/aum/${name}` });
      await expect(dialog.getByRole('heading').first()).toBeVisible();
      await dialog.evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished)));
      const box = (await dialog.boundingBox())!;
      if (box.x < 0 || box.y < 0 || box.x + box.width > width || box.y + box.height > 768) {
        outside.push(`${name} ${JSON.stringify(box)}`);
      }
      await dialog.getByRole('button', { name: `Close ${name}` }).click();
    }
    expect(outside).toEqual([]);
  });
}

test('the removed case study address shows the not-found page', async ({ page }) => {
  await page.goto('work/phonedeck');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('This page is not here.');
});

for (const width of [360, 390, 767, 768, 1024, 1440]) {
  test(`classic page has no horizontal overflow @${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('classic');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    // The marquee band is clipped on purpose, so everything inside it is ignored.
    const wide = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>('header *, main *, section *, footer *')]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return (
            r.width > 0 &&
            r.right > window.innerWidth + 0.5 &&
            !el.closest('svg') &&
            !el.closest('[aria-hidden="true"]')
          );
        })
        .map((el) => `${el.tagName}.${el.className}`),
    );
    expect(wide).toEqual([]);
  });
}

for (const route of ['./', 'classic']) {
  test(`direct load of ${route} fetches every file under the base path`, async ({
    page,
    baseURL,
  }) => {
    const failed: string[] = [];
    page.on('response', (r) => {
      if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
      const url = new URL(r.url());
      if (!url.pathname.startsWith(new URL(baseURL!).pathname)) failed.push(`outside ${r.url()}`);
    });
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 6000 });
    await page.waitForLoadState('networkidle');
    expect(failed).toEqual([]);

    // Files the page links to but does not fetch on load.
    const root = new URL(baseURL!);
    const hrefs = await page
      .locator('link[rel="manifest"], link[rel="icon"], link[rel="apple-touch-icon"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute('href')!));
    expect(hrefs).toHaveLength(4);
    const manifestUrl = new URL(
      hrefs.find((h) => h.endsWith('.webmanifest'))!,
      root,
    );
    const manifest = (await (await page.request.get(manifestUrl.href)).json()) as {
      icons: { src: string }[];
    };
    const files = [
      ...hrefs,
      ...manifest.icons.map((i) => new URL(i.src, manifestUrl).pathname),
      `${root.pathname}aum-patel-resume.pdf`,
    ];
    for (const file of files) {
      expect(file.startsWith(root.pathname), file).toBe(true);
      const got = await page.request.get(file);
      expect(got.status(), file).toBe(200);
    }
  });
}

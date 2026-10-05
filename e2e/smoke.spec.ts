import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 1440, height: 900 } });

test('desktop boots, opens windows, switches wallpaper and reaches the classic site', async ({
  page,
}) => {
  await page.goto('/');

  // Boot screen shows, then the About window opens by itself.
  await expect(page.getByRole('status', { name: /starting portfolio\.exe/i })).toBeVisible();
  const about = page.getByRole('dialog', { name: '~/aum/about.txt' });
  await expect(about).toBeVisible({ timeout: 6000 });
  await expect(about.getByRole('heading', { level: 1 })).toContainText("Hi, I'm Aum.");

  // Open Projects from the desktop icon and pick another project.
  await page.getByRole('button', { name: 'Open projects' }).first().click();
  const projects = page.getByRole('dialog', { name: '~/aum/projects/' });
  await expect(projects).toBeVisible();
  await projects.getByRole('button', { name: /Recruiting platform/ }).click();
  await expect(
    projects.getByRole('heading', { name: /Recruiting platform with Gemini parsing/ }),
  ).toBeVisible();

  // Taskbar: the top window minimises, then restores.
  const task = page.getByRole('button', { name: 'projects', exact: true });
  await task.click();
  await expect(projects).toBeHidden();
  await task.click();
  await expect(projects).toBeVisible();

  // Escape closes the focused window and focus returns to its icon.
  await page.keyboard.press('Escape');
  await expect(projects).toBeHidden();
  await expect(page.getByRole('button', { name: 'Open projects' }).first()).toBeFocused();

  // Wallpaper cycles.
  const wallpaper = page.getByRole('button', { name: 'Change wallpaper' });
  await expect(wallpaper).toContainText('Race day');
  await wallpaper.click();
  await expect(wallpaper).toContainText('Paddock night');

  // Start menu leads to the classic site.
  await page.getByRole('button', { name: 'Start menu' }).click();
  await page.getByRole('link', { name: /Classic site/ }).click();
  await expect(page).toHaveURL(/\/classic$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Full-stack engineer building',
  );
});

test('narrow screens are redirected from the desktop to the classic layout', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page).toHaveURL(/\/classic$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Full-stack engineer building',
  );
});

test('case study page links back to the classic site', async ({ page }) => {
  await page.goto('/work/phonedeck');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('PhoneDeck');
  await page.getByRole('link', { name: /Back to work/ }).click();
  await expect(page).toHaveURL(/\/classic$/);
});

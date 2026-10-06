import { test } from '@playwright/test';

const widths = [390, 768, 1024, 1440];
const heights: Record<number, number> = { 390: 844, 768: 1024, 1024: 768, 1440: 900 };

for (const width of widths) {
  test(`screenshots @${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: heights[width] ?? 900 });
    await page.goto('/');
    if (width >= 768) {
      await page.waitForTimeout(3600);
      await page.screenshot({ path: `shots/desktop-${width}.png` });
      for (const name of [
        'projects',
        'experience',
        'skills',
        'setup',
        'hobbies',
        'contact',
        'resume.pdf',
      ]) {
        await page
          .getByRole('button', { name: `Open ${name}` })
          .first()
          .dispatchEvent('click');
        await page.waitForTimeout(700);
        await page.screenshot({ path: `shots/desktop-${width}-${name.replace('.pdf', '')}.png` });
        await page.keyboard.press('Escape');
      }
    }
    if (width === 390) {
      await page.waitForTimeout(3600);
      await page.screenshot({ path: 'shots/phone-390.png' });
      for (const name of [
        'About',
        'Projects',
        'Experience',
        'Skills',
        'Setup',
        'Hobbies',
        'Photos',
      ]) {
        await page
          .getByRole('button', { name: `Open ${name}` })
          .last()
          .dispatchEvent('click');
        await page.waitForTimeout(800);
        await page.screenshot({ path: `shots/phone-390-${name.toLowerCase()}.png` });
        await page.getByRole('button', { name: 'Back to home' }).dispatchEvent('click');
        await page.waitForTimeout(400);
      }
    }
    await page.goto('/classic');
    await page.waitForTimeout(800);
    await page.screenshot({ path: `shots/classic-${width}.png`, fullPage: true });
    await page.goto('/work/phonedeck');
    await page.waitForTimeout(800);
    await page.screenshot({ path: `shots/case-${width}.png`, fullPage: true });
  });
}

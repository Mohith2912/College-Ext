import { expect, test } from '@playwright/test';

test('all currently published sitemap pages load', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  const paths = [...(await sitemap.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname);
  expect(paths.length).toBeGreaterThan(5);
  for (const path of paths) expect((await request.get(path)).ok(), path).toBeTruthy();
});

test('browser back returns from original Unit 4 to CN syllabus', async ({ page }) => {
  await page.goto('/notes/computer-networks');
  await page.locator('.module-row').nth(3).click();
  await expect(page).toHaveURL(/\/CN-unit-4\/index.html$/);
  await expect(page.locator('.sidebar, iframe')).toHaveCount(0);
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'Course syllabus' })).toBeVisible();
});

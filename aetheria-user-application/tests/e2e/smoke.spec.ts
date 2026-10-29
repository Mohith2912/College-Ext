import { expect, test } from '@playwright/test';

test('CN-only library and old summary links open original apps', async ({ page }) => {
  await page.goto('/notes');
  await expect(page.locator('.course-card')).toHaveCount(1);
  await page.locator('.course-card').click();
  await expect(page.locator('.module-row')).toHaveCount(5);
  await page.goto('/interactive?course=computer-networks&module=computer-networks-unit-2&view=checkpoints');
  await expect(page).toHaveURL(/\/CN-Unit-two\/index.html$/);
  await expect(page.locator('h1')).toHaveText('How Amazon Delivers Your Order From Phone to Door');
  await page.goto('/notes/computer-networks/computer-networks-unit-2?view=notes');
  await expect(page).toHaveURL(/\/CN-Unit-two\/index.html$/);
  await page.goto('/interactive');
  await expect(page).toHaveURL(/\/CN-Unit\/index.html$/);
});

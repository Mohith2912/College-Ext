import { test, expect } from '@playwright/test';

test('separate practice picker and five functioning unit labs', async ({ page }) => {
  await page.goto('/interactive');
  await expect(page.getByRole('heading', { name: 'Five units. Five separate labs.' })).toBeVisible();
  const picker = page.getByLabel('Practice unit');
  await picker.selectOption('1');
  await page.getByLabel('Binary input').fill('10');
  await expect(page.locator('output')).toHaveText('LH | HL');
  await picker.selectOption('2');
  await page.getByLabel('IPv4 address').fill('10.20.30.45');
  await page.getByLabel('Prefix length').fill('30');
  await expect(page.locator('output')).toContainText('Network: 10.20.30.44/30');
  await expect(page.locator('output')).toContainText('Last address: 10.20.30.47');
  await picker.selectOption('3');
  await page.getByLabel('Round-trip propagation (ms)').fill('0');
  await expect(page.locator('output')).toContainText('Utilization: 100.00%');
  await picker.selectOption('4');
  await page.getByRole('button', { name: 'Receive packet' }).click();
  await expect(page.locator('output')).toHaveText('Accepted: unseen sequence');
  await page.getByRole('button', { name: 'Receive packet' }).click();
  await expect(page.locator('output')).toHaveText('Dropped: duplicate replay');
  await picker.selectOption('5');
  for (let i = 0; i < 6; i++) await page.getByRole('button', { name: 'Send packet', exact: true }).click();
  await expect(page.locator('output')).toHaveText('Packet deferred: no token available');
  await page.getByRole('button', { name: 'Advance time' }).click();
  await expect(page.getByText('Available tokens: 2.00 / 10')).toBeVisible();
  await page.reload();
  await expect(picker).toHaveValue('5');
});

test('Unit 4 section buttons navigate to the matching content and support deep links', async ({ page }) => {
  await page.goto('/CN-unit-4/index.html');
  for (const [name, id] of [['Architecture Matrix', 'architecture'], ['Packet & Math Lab', 'visualizers'], ['Diagnostic Lab', 'diagnostic-lab'], ['Knowledge Check', 'quiz'], ['Guardrails', 'guardrails']]) {
    await page.getByRole('button', { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
  await page.reload();
  await expect(page.locator('#guardrails')).toBeInViewport();
});

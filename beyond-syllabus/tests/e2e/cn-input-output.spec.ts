import { expect, test } from '@playwright/test';

test('Unit 1 custom bitstream changes original waveform output', async ({ page }) => {
  await page.goto('/CN-Unit/index.html');
  await page.getByRole('button', { name: /Signal Encoding|Signals/ }).filter({ visible: true }).first().click();
  const input = page.locator('#signals input[type="text"]');
  const waveform = page.locator('#signals path[stroke="#2563eb"]');
  const before = await waveform.getAttribute('d');
  await input.fill('01010101');
  await expect(input).toHaveValue('01010101');
  await expect(waveform).not.toHaveAttribute('d', before!);
  await input.fill('01abc01');
  await expect(input).toHaveValue('0101');
});

test('Unit 2 custom IPv4 inputs produce original subnet outputs', async ({ page }) => {
  await page.goto('/CN-Unit-two/index.html');
  await page.getByRole('button', { name: /Subnetting/ }).filter({ visible: true }).first().click();
  const octets = page.locator('input[type="number"]');
  for (const [index, value] of ['10', '20', '30', '45'].entries()) await octets.nth(index).fill(value);
  await page.locator('input[type="range"]').fill('24');
  await expect(page.getByText('10.20.30.0', { exact: true })).toBeVisible();
  await expect(page.getByText('10.20.30.255', { exact: true })).toBeVisible();
  await page.locator('input[type="range"]').fill('30');
  await expect(page.getByText('10.20.30.44', { exact: true })).toBeVisible();
  await expect(page.getByText('10.20.30.47', { exact: true })).toBeVisible();
  await octets.first().fill('999');
  await expect(octets.first()).toHaveValue('255');
});

test('Unit 3 original parameters change graph and sandbox output', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'mobile', 'Preserve original source mobile navigation.');
  await page.goto('/CN-Unit-3/index.html');
  await page.getByRole('button', { name: 'Theory & Formulas', exact: true }).click();
  const sliders = page.locator('input[type="range"]');
  const curves = page.locator('svg polyline, svg path[d]');
  const before = await curves.evaluateAll(nodes => nodes.map(node => node.getAttribute('d') || node.getAttribute('points')));
  await sliders.nth(0).fill('56');
  await sliders.nth(1).fill('3');
  await sliders.nth(2).fill('80');
  await expect(page.getByText('56 MSS', { exact: true })).toBeVisible();
  await expect(page.getByText('80 ms', { exact: true })).toBeVisible();
  expect(await curves.evaluateAll(nodes => nodes.map(node => node.getAttribute('d') || node.getAttribute('points')))).not.toEqual(before);
  await page.getByRole('button', { name: /CUBIC TCP \(Polynomial\)/ }).click();
  await expect(page.getByText('Algorithm: CUBIC', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Link Sandbox', exact: true }).click();
  await page.getByRole('button', { name: /Wi-Fi Packet Drop/ }).click();
  await expect(page.getByText('Mode: LOSS', { exact: true })).toBeVisible();
});

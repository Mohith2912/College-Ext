import { expect, test } from '@playwright/test';

test('learner can complete the ESD cold-chain case study', async ({ page }) => {
  await page.goto('/case-studies?course=esd');

  await expect(page.getByRole('heading', { name: 'One cold-chain box. Six hours offline. Zero room for drift.' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Embedded Systems Design/ })).toHaveAttribute('aria-current', 'page');

  for (const requirement of [
    'Maintain medicine between 2 °C and 8 °C.',
    'Sample temperature at least once every 2 seconds.',
    'Raise a local alarm within 500 ms of a confirmed breach.',
    'Operate for at least 24 hours from one charge.',
  ]) await page.getByLabel(requirement, { exact: true }).check();
  await page.getByRole('button', { name: /Close checkpoint/ }).click();

  await page.getByRole('button', { name: 'I²C', exact: true }).click();
  await page.getByRole('button', { name: 'UART', exact: true }).click();
  await page.getByRole('button', { name: 'PWM', exact: true }).click();
  await page.getByRole('button', { name: /Close checkpoint/ }).click();

  await page.getByLabel(/Assert safety alarm/).check();
  await page.getByLabel(/Sample temperature/).check();
  await page.getByRole('button', { name: /Close checkpoint/ }).click();

  for (const transition of [
    'BOOT → MONITORING',
    'MONITORING → ALARM',
    'ALARM → RECOVERY',
    'RECOVERY → MONITORING',
  ]) await page.locator('.esd-state-builder > section:first-child button').filter({ hasText: transition }).click();
  await page.getByRole('button', { name: /Close checkpoint/ }).click();

  await page.getByLabel(/Timed sampling \+ sleep/).check();
  await page.getByRole('button', { name: /Close checkpoint/ }).click();

  for (const answer of [
    'Set a flag and capture only the time-critical value',
    'Its missed deadline has the greatest safety consequence',
    'To add hysteresis and reject noisy threshold crossings',
    'It misses the required sampling deadline',
  ]) {
    await page.getByRole('button', { name: new RegExp(answer) }).click();
    if (answer !== 'It misses the required sampling deadline') await page.getByRole('button', { name: 'Next question', exact: true }).click();
  }
  await page.getByRole('button', { name: /Complete case study/ }).click();

  await expect(page.getByText('The carrier now senses, decides, and conserves power on purpose.')).toBeVisible();
  await expect(page.getByText('4 / 4')).toBeVisible();
  await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
});

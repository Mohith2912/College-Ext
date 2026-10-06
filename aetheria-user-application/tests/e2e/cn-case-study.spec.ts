import { expect, test } from '@playwright/test';

test('learner can complete the Computer Networks incident case study', async ({ page }) => {
  await page.goto('/case-studies');

  await expect(page.getByRole('heading', { name: 'The stream is live. The learning is not.' })).toBeVisible();
  await expect(page.getByText('Fictional practice scenario')).toBeVisible();

  await page.getByLabel('Viewers on VLAN 24 can connect, but sustained video delivery stalls while lighter services continue.').check();
  await expect(page.getByText('Strong framing.')).toBeVisible();
  await page.getByRole('button', { name: /Close checkpoint/ }).click();

  for (const hop of ['Hall access point', 'Building switch', 'Campus gateway', 'Media service edge']) {
    await page.getByRole('button', { name: new RegExp(hop) }).click();
  }
  await page.getByRole('button', { name: /Close checkpoint/ }).click();

  for (const source of ['Gateway probe', 'Gateway queue', 'External control test']) {
    await page.getByRole('button', { name: new RegExp(source) }).click();
  }
  await expect(page.getByText('High-value evidence set.')).toBeVisible();
  await page.getByRole('button', { name: /Close checkpoint/ }).click();

  await page.getByLabel(/Correct the media queue policy/).check();
  await page.getByRole('button', { name: 'Evaluate response' }).click();
  await expect(page.getByText('Proportional and testable.')).toBeVisible();
  await page.getByRole('button', { name: /Close checkpoint/ }).click();

  await page.getByRole('button', { name: /The stream is stable from an external control network/ }).click();
  await page.getByRole('button', { name: 'Next question' }).click();
  await page.getByRole('button', { name: /Later loss and delay can reduce useful delivery rate/ }).click();
  await page.getByRole('button', { name: 'Next question' }).click();
  await page.getByRole('button', { name: /It targets measured symptoms with a limited blast radius/ }).click();
  await page.getByRole('button', { name: /Complete case study/ }).click();

  await expect(page.getByText('Incident contained. Reasoning documented.')).toBeVisible();
  await expect(page.getByText('3 / 3')).toBeVisible();
});

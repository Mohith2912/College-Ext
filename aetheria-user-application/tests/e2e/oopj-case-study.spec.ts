import { expect, test } from '@playwright/test';

test('learner can complete the OOPJ library design case study', async ({ page }) => {
  await page.goto('/case-studies?course=oopj');

  await expect(page.getByRole('heading', { name: 'One last copy. Two issue desks. One object model.' })).toBeVisible();
  await expect(page.getByRole('link', { name: /OOP using Java/ })).toHaveAttribute('aria-current', 'page');

  for (const requirement of [
    'Each physical copy has one stable barcode.',
    'Borrowing limits vary by member type.',
    'A copy cannot be issued to two members.',
    'An unavailable copy produces a precise recoverable failure.',
  ]) await page.getByLabel(requirement, { exact: true }).check();
  await page.getByRole('button', { name: /Close checkpoint/ }).click();

  for (const className of ['Member', 'StudentMember', 'CirculationService', 'LoanRepository', 'BookUnavailableException']) {
    await page.getByRole('button', { name: new RegExp(className) }).click();
  }
  await page.getByLabel('BookCopy', { exact: true }).check();
  await page.getByRole('button', { name: /Close checkpoint/ }).click();

  await page.getByRole('button', { name: '4 books', exact: true }).click();
  await page.getByRole('button', { name: /FacultyMember/ }).click();
  await page.getByRole('button', { name: '10 books', exact: true }).click();
  await page.getByRole('button', { name: /new Member/ }).click();
  await page.getByRole('button', { name: '2 books', exact: true }).click();
  await page.getByRole('button', { name: /Close checkpoint/ }).click();

  for (const step of [
    'Load the requested BookCopy',
    'Check the domain rules',
    'Throw a precise domain exception',
    'Translate the failure at the boundary',
    'Close the persistence resource',
  ]) await page.getByRole('button', { name: new RegExp(step) }).click();
  await page.getByRole('button', { name: /Close checkpoint/ }).click();

  for (let event = 0; event < 4; event += 1) await page.getByRole('button', { name: /Run (first|next) event/ }).click();
  await page.getByLabel(/Synchronize the check-and-issue operation/).check();
  await page.getByRole('button', { name: /Close checkpoint/ }).click();

  for (const answer of [
    'To force state changes through invariant-preserving methods',
    'StudentMember because overridden instance methods dispatch on runtime type',
    'At the application or controller boundary',
    'It cannot make the multi-step check and decrement atomic',
  ]) {
    await page.getByRole('button', { name: new RegExp(answer) }).click();
    if (answer !== 'It cannot make the multi-step check and decrement atomic') await page.getByRole('button', { name: 'Next question', exact: true }).click();
  }
  await page.getByRole('button', { name: /Complete case study/ }).click();

  await expect(page.getByText('The last copy is safe—and the model explains why.')).toBeVisible();
  await expect(page.getByText('4 / 4')).toBeVisible();
});

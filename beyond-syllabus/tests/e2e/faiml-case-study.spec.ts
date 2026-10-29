import { expect, test } from '@playwright/test';

test('learner can complete the FAIML clinical triage AI case study', async ({ page }) => {
  await page.goto('/case-studies?course=faiml');

  await expect(
    page.getByRole('heading', { name: 'One critical scan. Three competing models. High distribution shift.' })
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /AI & Machine Learning/ })).toHaveAttribute('aria-current', 'page');

  // Checkpoint 1: Formulate Incident Requirements
  for (const requirement of [
    'Maintain clinical Sensitivity (Recall) ≥ 98% for high-risk triage alerts.',
    'Ensure worst-case inference latency ≤ 100 ms per telemetry sample.',
    'Keep Expected Calibration Error (ECE) ≤ 0.05 across risk bins.',
    'Trigger automated covariate shift alerts when Population Stability Index (PSI) > 0.2.',
  ]) {
    await page.getByLabel(requirement, { exact: true }).check();
  }
  await page.getByRole('button', { name: /Close Checkpoint/i }).click();

  // Checkpoint 2: Heuristic Search
  for (const algorithm of [
    'A* Search with Admissible Heuristic',
    'Minimax with Alpha-Beta Pruning',
    'Simulated Annealing / Genetic Algorithm',
  ]) {
    await page.getByRole('button', { name: new RegExp(algorithm) }).click();
  }
  await page.getByRole('button', { name: /Close Checkpoint/i }).click();

  // Checkpoint 3: Pipeline & Inductive Bias
  await page.locator('.faiml-model-browser button').nth(1).click();
  await page.getByLabel(/Calibrated Gradient/i).check();
  await page.getByRole('button', { name: /Close Checkpoint/i }).click();

  // Checkpoint 4: Decision Threshold Calibration
  await page.getByLabel(/Calibrated Clinical Safety/i).check();
  await page.getByRole('button', { name: /Close Checkpoint/i }).click();

  // Checkpoint 5: Unsupervised Cohort Discovery
  await page.locator('.faiml-cohort-card').filter({ hasText: 'Cluster C' }).click();
  await page.getByRole('button', { name: /Close Checkpoint/i }).click();

  // Checkpoint 6: Architectural Debrief
  const debriefAnswers = [
    'Because a False Negative delays life-saving interventions',
    'Group splits strictly by unique Patient ID',
    'L1 regularization drives irrelevant feature weights strictly to zero',
    'The input distribution P(X) shifts over time',
    'They provide game-theoretic, locally consistent additive contributions',
  ];

  for (let i = 0; i < debriefAnswers.length; i += 1) {
    await page.getByRole('button', { name: new RegExp(debriefAnswers[i]) }).click();
    if (i < debriefAnswers.length - 1) {
      await page.getByRole('button', { name: 'Next question', exact: true }).click();
    }
  }

  await page.getByRole('button', { name: /Complete Case Study/i }).click();

  // Certification Banner Verification
  await expect(
    page.getByText('MediPulse-AI is calibrated, verified, and shielded against distribution drift.')
  ).toBeVisible();
  await expect(page.getByText('5 / 5')).toBeVisible();
});

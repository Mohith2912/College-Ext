import { expect, test } from '@playwright/test';

const repositories = ['CN-Unit', 'CN-Unit-two', 'CN-Unit-3', 'CN-unit-4', 'CN-Unit-5'];

test('only CN remains in the course library, with all five units', async ({ page }) => {
  await page.goto('/notes');
  await expect(page.locator('.course-card')).toHaveCount(1);
  await page.goto('/notes/computer-networks');
  await expect(page.locator('.module-row')).toHaveCount(5);
});

for (const [index, repository] of repositories.entries()) {
  test(`Unit ${index + 1} preserves ${repository} inside the website navigation`, async ({ page }) => {
    await page.goto('/notes/computer-networks');
    await page.locator('.module-row').nth(index).click();
    await expect(page).toHaveURL(new RegExp(`/computer-networks-unit-${index + 1}$`));
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
    const frame = page.frameLocator('iframe');
    await expect(page.locator('iframe')).toHaveAttribute('src', `/${repository}/index.html?embedded=sidebar-v2`);
    await expect(frame.locator('h1')).toBeVisible();
    await expect(page.locator('#note-content')).toHaveCount(0);
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.reload();
    await expect(frame.locator('h1')).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test('Unit 4 original call and attack handlers work directly', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'mobile', 'Keep the original source responsive navigation unchanged.');
  await page.goto('/CN-unit-4/index.html');
  await page.getByRole('button', { name: 'Interactive Call Lab', exact: true }).click();
  await expect(page).toHaveURL(/#live-call$/);
  await expect(page.locator('#live-call')).toBeInViewport();
  await page.getByTitle('Turn off microphone', { exact: true }).click();
  await expect(page.getByText('[MIC] Muted. Sent silence indicator to SFU.', { exact: true })).toBeVisible();
  await page.getByTitle('Turn on microphone', { exact: true }).click();
  await expect(page.getByText('[MIC] Unmuted. SRTP voice packets active.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Home Wi-Fi (Direct)', exact: true }).click();
  await expect(page.getByText('[NETWORK] Switched to Home Wi-Fi: Direct DTLS-SRTP to Google Edge Anycast.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Inject Replay Packet', exact: true }).click();
  await expect(page.getByText('[ALERT] Duplicate packet sequence detected (seq: 1041). SRTP 64-bit sliding window dropped malicious replayed frame!', { exact: true })).toBeVisible();
  await page.getByTitle('Leave call', { exact: true }).click();
  await expect(page.getByRole('heading', { name: 'You have left the meeting' })).toBeVisible();
  await page.getByRole('button', { name: 'Re-join Meeting (sec-u4cn-gmt)', exact: true }).click();
  await expect(page.getByTitle('Leave call', { exact: true })).toBeVisible();
});

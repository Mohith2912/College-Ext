import { expect, test } from '@playwright/test';
const folders = ['CN-Unit', 'CN-Unit-two', 'CN-Unit-3', 'CN-unit-4', 'CN-Unit-5'];

for (const [index, folder] of folders.entries()) {
  test(`Unit ${index + 1} module route retains every original section`, async ({ page, context }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile', 'Compare original desktop section navigation.');
    const reference = await context.newPage();
    await reference.goto(`/${folder}/index.html`);
    await page.goto(`/notes/computer-networks/computer-networks-unit-${index + 1}`);
    await expect(page).toHaveURL(new RegExp(`/${folder}/index.html$`));
    await expect(page.locator('h1')).toHaveText(await reference.locator('h1').innerText());
    const labels = await reference.locator('header nav button').allTextContents();
    expect(labels.length).toBeGreaterThanOrEqual(6);
    for (let button = 0; button < labels.length; button++) {
      await reference.locator('header nav button').nth(button).click();
      await page.locator('header nav button').nth(button).click();
      expect(await page.locator('h1, h2, h3, h4').allTextContents()).toEqual(await reference.locator('h1, h2, h3, h4').allTextContents());
    }
    await page.screenshot({ path: testInfo.outputPath(`unit-${index + 1}.png`), fullPage: true });
    await reference.close();
  });
}

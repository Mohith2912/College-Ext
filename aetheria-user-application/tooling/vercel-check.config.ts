import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../tests/e2e',
  testMatch: 'cn-direct.spec.ts',
  workers: 1,
  reporter: 'list',
  use: {
    ...devices['Desktop Chrome'],
    channel: 'msedge',
    baseURL: 'https://college-ext-users-mohith-dharshan-s-projects.vercel.app',
  },
});

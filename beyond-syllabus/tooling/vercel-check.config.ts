import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../tests/e2e',
  testMatch: ['cn-direct.spec.ts', 'cn-input-output.spec.ts', 'cn-practice.spec.ts'],
  workers: 1,
  timeout: 60000,
  expect: { timeout: 20000 },
  reporter: 'list',
  use: {
    ...devices['Desktop Chrome'],
    channel: 'msedge',
    baseURL: process.env.CN_CHECK_URL || 'https://college-ext-users.vercel.app',
  },
});

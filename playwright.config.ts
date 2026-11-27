import { defineConfig } from '@playwright/test';

/** Same build setting as vite.config.ts, so the suite can run under `/portfolio/`. */
const base = `/${process.env.BASE_PATH ?? ''}/`.replace(/\/{2,}/g, '/');

export default defineConfig({
  testDir: 'e2e',
  timeout: 30_000,
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: `http://127.0.0.1:4173${base}`,
    trace: 'retain-on-failure',
    // Optional: point at an already-installed Chromium instead of `npx playwright install`.
    launchOptions: process.env.PW_CHROMIUM_PATH
      ? { executablePath: process.env.PW_CHROMIUM_PATH }
      : {},
  },
  webServer: {
    command: 'npm run build && npx vite preview --host 127.0.0.1 --port 4173 --strictPort',
    url: `http://127.0.0.1:4173${base}`,
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    { name: 'smoke', testMatch: /(smoke|phone|resume|certificates|typewriter)\.spec\.ts/ },
    { name: 'screenshots', testMatch: /screenshots\.spec\.ts/ },
  ],
});

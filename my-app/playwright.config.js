const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',  // Specify the directory for E2E tests
  use: {
    headless: true,  // Run tests in headless mode for CI/CD
    baseURL: 'http://localhost:3000',  // Base URL of your app during tests
    // Add other configurations like viewport size, timeouts, etc.
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],  // Customize reporters
});

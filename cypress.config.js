const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationpratice.com.br',
    specPattern: 'cypress/e2e/**/*.cy.js',
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 30000,
    retries: { runMode: 1, openMode: 0 },
    setupNodeEvents(on, config) {
      const { plugin } = require('@cypress/grep/plugin');
      plugin(config);
      return config;
    },
  },
  screenshotOnRunFailure: true,
  video: true,
  viewportWidth: 1280,
  viewportHeight: 720,
});

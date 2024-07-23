const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "tfwkz8",
  e2e: {
    baseUrl: "https://petstore.swagger.io/v2/",
    //retries: 2,
    viewportWidth: 1440,
    viewportHeight: 900,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

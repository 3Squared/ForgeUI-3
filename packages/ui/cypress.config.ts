import { defineConfig } from "cypress";
import coverageTask from "@cypress/code-coverage/task";

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  viewportWidth: 1920,
  viewportHeight: 720,
  reporter: "junit",
  reporterOptions: {
    testsuitesTitle: true,
    mochaFile: "./test-results/cypress.[hash].xml"
  },
  component: {
    setupNodeEvents(on, config) {
      coverageTask(on, config);
      return config;
    },
    specPattern: "**/**.cy.ts",
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },


});

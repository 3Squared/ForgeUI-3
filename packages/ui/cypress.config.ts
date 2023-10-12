import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  reporter: "junit",
  reporterOptions: {
    testsuitesTitle: true,
    mochaFile: "./test-results/cypress.[hash].xml"
  },
  component: {
    specPattern: "**/**.cy.ts",
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
  setupNodeEvents(on, config) {
    require("@cypress/code-coverage/task")(on, config);

    on("file:preprocessor", require("@cypress/code-coverage/use-babelrc"));
    if (config.isTextTerminal) {
      config.excludeSpecPattern = ["**/all.cy.ts"];
    }
    return config;
  },

});

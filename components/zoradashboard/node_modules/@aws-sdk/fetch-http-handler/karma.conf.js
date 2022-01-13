process.env.CHROME_BIN = require("puppeteer").executablePath();
module.exports = function (config) {
  config.set({
    frameworks: ["jasmine", "karma-typescript"],
    files: [
      "src/stream-collector.ts",
      "src/stream-collector.browser.spec.ts",
      "src/fetch-http-handler.ts",
      "src/fetch-http-handler.browser.spec.ts",
      "src/request-timeout.ts",
    ],
    exclude: ["**/*.d.ts"],
    preprocessors: {
      "**/*.ts": "karma-typescript",
    },
    reporters: ["progress", "karma-typescript"],
    browsers: ["ChromeHeadlessNoSandbox"],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"],
      },
    },
    karmaTypescriptConfig: {
      bundlerOptions: {
        addNodeGlobals: false,
      },
    },
    singleRun: true,
  });
};

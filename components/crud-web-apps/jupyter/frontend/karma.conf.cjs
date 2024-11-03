// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '../../',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    files: [
      {
        pattern: 'jupyter/frontend/node_modules/monaco-editor/**',
        watched: false,
        included: false,
        served: true,
      },
      {
        pattern: 'jupyter/frontend/node_modules/kubeflow/**',
        watched: false,
        included: false,
        served: true,
      },
      {
        pattern: 'jupyter/frontend/src/assets/**',
        watched: false,
        included: false,
        served: true,
      },
    ],
    proxies: {
      '/static/assets/monaco-editor/': '/base/jupyter/frontend/node_modules/monaco-editor/',
      '/static/assets/': '/base/jupyter/frontend/node_modules/kubeflow/assets/',
      '/static/assets/': '/base/jupyter/frontend/src/assets/',
    },
    client: {
      clearContext: true,
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/frontend'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};

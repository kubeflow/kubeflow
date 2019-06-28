const webpackConfig = require('./webpack.config');
webpackConfig.entry = ''; // Karma will supply the entry points
webpackConfig.devtool = 'inline-source-map';
webpackConfig.module.rules.push({
    enforce: 'post',
    test: /\.js$/,
    use: {
        loader: 'istanbul-instrumenter-loader',
        options: {esModules: true},
    },
    exclude: /node_modules|_test\.js$/,
});

module.exports = (config) => config.set({
    basePath: '',
    browsers: ['ChromeHeadlessTest'],
    customLaunchers: {
        ChromeHeadlessTest: {
            base: 'ChromeHeadless',
            flags: ['--no-sandbox'],
        },
    },
    frameworks: ['jasmine'],
    files: [
        'public/index_test.js',
    ],
    exclude: [],
    preprocessors: {
        'public/index_test.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {stats: 'errors-only'},
    reporters: ['progress', 'kjhtml'],
    coverageIstanbulReporter: {
        'reports': ['html', 'text'],
        'fixWebpackSourcePaths': true,
        'skipFilesWithNoCoverage': false,
        'report-config': {
            html: {
                subdir: 'public',
            },
        },
    },
});


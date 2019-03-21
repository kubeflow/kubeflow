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
    exclude: /node_modules|\*_test\.js$/,
});

module.exports = function(config) {
    config.set({
        basePath: '',
        browsers: ['ChromeHeadless'],
        frameworks: ['jasmine'],
        files: [
            {pattern: 'public/**/*_test.js', watched: false},
        ],
        exclude: [],
        preprocessors: {
            'public/**/*_test.js': ['webpack', 'sourcemap'],
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
};

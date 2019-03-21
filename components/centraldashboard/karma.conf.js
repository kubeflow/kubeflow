const webpackConfig = require('./webpack.config');
webpackConfig.entry = ''; // Karma will supply the entry points
webpackConfig.devtool = 'inline-source-map';

module.exports = function(config) {
    config.set({
        basePath: '',
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
        browsers: ['Chrome'],
    });
};

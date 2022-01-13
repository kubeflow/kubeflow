module.exports = function(config) {
    var customLaunchers = {
        sl_chrome: {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: '50',
            platform: 'OS X 10.11'
        },
        sl_firefox: {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: '45',
            platform: 'OS X 10.11'
        },
        sl_ie: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            version: '11.103',
            platform: 'Windows 10'
        }
    };

    process.env.SAUCE_USERNAME = 'numeraljs';
    process.env.SAUCE_ACCESS_KEY = '5506968c-cfdc-4797-ba75-294620ad475f';

    config.set({
        reporters: [
            'mocha',
            'saucelabs'
        ],
        browserDisconnectTimeout : 10000,
        browserNoActivityTimeout: 120000,
        browserDisconnectTolerance : 1,
        browsers: Object.keys(customLaunchers),
        sauceLabs: {
            testName: 'Web App Unit Tests'
        },
        customLaunchers: customLaunchers,
        singleRun: true
    });
};

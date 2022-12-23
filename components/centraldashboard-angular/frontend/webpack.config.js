'use strict';

const {resolve} = require('path');
const {execSync} = require('child_process');
const DefinePlugin = require('webpack').DefinePlugin;
let commit = process.env.BUILD_COMMIT || '';

try {
    commit = commit || `${execSync(`git rev-parse HEAD`)}`.replace(/\s/g, '');
} catch (e) {}

const ENV = process.env.NODE_ENV || 'development';
const NODE_MODULES = /\/node_modules\//;
const PKG_VERSION =
    `${require('./package.json').version}-${commit.slice(0, 6)}`;
const BUILD_VERSION = process.env.BUILD_VERSION || `dev_local`;
const SRC = resolve(__dirname, 'public');
const DESTINATION = resolve(__dirname, 'dist', 'public');

module.exports = {
    mode: ENV,
    entry: {
        dashboard_lib: resolve(SRC, 'library.js'),
    },
    output: {
        filename: '[name].bundle.js',
        path: DESTINATION,
        library: 'centraldashboard',
        libraryTarget: 'umd',
    },
    devtool: 'cheap-source-map',
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: NODE_MODULES,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        extends: ['eslint:recommended', 'google'],
                        failOnError: true,
                        fix: true,
                    },
                },
            },
            {
                test: /\.js$/,
                exclude: NODE_MODULES,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: [[
                            '@babel/preset-env',
                            {
                                corejs: '2',
                                useBuiltIns: 'entry',
                                targets: {
                                    browsers: [
                                        // Best practice: https://github.com/babel/babel/issues/7789
                                        '>=1%',
                                        'not ie 11',
                                        'not op_mini all',
                                    ],
                                },
                            },
                        ]],
                        plugins: ['@babel/plugin-transform-runtime'],
                    },
                },
            },
        ],
    },
    plugins: [
        new DefinePlugin({
            BUILD_VERSION: JSON.stringify(BUILD_VERSION),
            VERSION: JSON.stringify(PKG_VERSION),
        }),
    ],
};

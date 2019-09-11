'use strict';

const {resolve} = require('path');
const {execSync} = require('child_process');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack').DefinePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
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
const COMPONENTS = resolve(SRC, 'components');
const DESTINATION = resolve(__dirname, 'dist', 'public');
const WEBCOMPONENTS = './node_modules/@webcomponents/webcomponentsjs';
const POLYFILLS = [
    {
        from: resolve(WEBCOMPONENTS, '*.{js,map}'),
        to: resolve(DESTINATION, 'webcomponentsjs'),
        flatten: true,
    },
    {
        from: resolve(WEBCOMPONENTS, 'bundles', '*.{js,map}'),
        to: resolve(DESTINATION, 'webcomponentsjs', 'bundles'),
        flatten: true,
    },
];

/**
 * Rules for processing Polymer components to allow external Pug templates
 * and CSS files.
 */
const COMPONENT_RULES = [
    {
        test: /\.pug$/,
        use: ['pug-loader'],
    },
    {
        test: /\.css$/,
        include: COMPONENTS,
        use: ['css-loader', 'exports-loader'],
    },
];

module.exports = {
    mode: ENV,
    entry: {
        app: resolve(SRC, 'index.js'),
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
        rules: COMPONENT_RULES.concat([
            {
                test: /\.css$/,
                exclude: COMPONENTS,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(gif|ico|jpg|png)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[folder]/[name].[ext]',
                    },
                },
            },
            {
                test: /\.svg$/,
                use: 'raw-loader',
            },
            // Roboto Font and Material Icons
            {
                test: /(iconfont|roboto)\/.*\.(eot|svg|ttf|woff2?)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                        limit: 8192,
                    },
                },
            },
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
        ]),
    },
    optimization: {
        minimizer: [new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
            extractComments: true,
        })],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: NODE_MODULES,
                    chunks: 'all',
                    name: 'vendor',
                    priority: 10,
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin([DESTINATION]),
        new CopyWebpackPlugin(POLYFILLS.concat([
            {from: resolve(SRC, 'kubeflow-palette.css'), to: DESTINATION},
        ])),
        new DefinePlugin({
            BUILD_VERSION: JSON.stringify(BUILD_VERSION),
            VERSION: JSON.stringify(PKG_VERSION),
        }),
        new HtmlWebpackPlugin({
            filename: resolve(DESTINATION, 'index.html'),
            template: resolve(SRC, 'index.html'),
            excludeChunks: ['lib'],
            inject: true,
            minify: ENV == 'development' ? false : {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer',
        }),
    ],
    devServer: {
        port: 8080,
        proxy: {
            '/api': 'http://localhost:8082',
            '/jupyter': {
                target: 'http://localhost:8083/api/v1/namespaces/kubeflow/services/jupyter-web-app:80/proxy',
                pathRewrite: {'^/jupyter': ''},
            },
            '/notebook': {
                target: 'http://localhost:8083/api/v1/namespaces/',
                pathRewrite: {
                    '^/notebook/(.*?)/(.*?)/(.*)':
                        '/$1/services/$2/proxy/notebook/$1/$2/$3',
                },
            },
            '/pipeline': {
                target: 'http://localhost:8083/api/v1/namespaces/kubeflow/services/ml-pipeline:8888/proxy',
                pathRewrite: {'^/pipeline': ''},
            },
        },
        historyApiFallback: {
            disableDotRule: true,
        },
    },
};

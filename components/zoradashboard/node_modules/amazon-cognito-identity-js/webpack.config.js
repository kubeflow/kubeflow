// version 3.11.0
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

/* eslint-disable */
var webpack = require('webpack');

var banner =
	'/*!\n' +
	' * Copyright 2016 Amazon.com,\n' +
	' * Inc. or its affiliates. All Rights Reserved.\n' +
	' * \n' +
	' * Licensed under the Amazon Software License (the "License").\n' +
	' * You may not use this file except in compliance with the\n' +
	' * License. A copy of the License is located at\n' +
	' * \n' +
	' *     http://aws.amazon.com/asl/\n' +
	' * \n' +
	' * or in the "license" file accompanying this file. This file is\n' +
	' * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR\n' +
	' * CONDITIONS OF ANY KIND, express or implied. See the License\n' +
	' * for the specific language governing permissions and\n' +
	' * limitations under the License. \n' +
	' */\n\n';

var config = {
	entry: {
		'amazon-cognito-identity': './src/index.js',
		'amazon-cognito-identity.min': './src/index.js',
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/dist',
		libraryTarget: 'umd',
		library: 'AmazonCognitoIdentity',
		devtoolModuleFilenameTemplate: require('../aws-amplify/webpack-utils')
			.devtoolModuleFilenameTemplate,
	},
	externals: {
		crypto: 'crypto',
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.BannerPlugin({ banner, raw: true }),
		new UglifyJsPlugin({
			minimize: true,
			sourceMap: true,
			include: /\.min\.js$/,
		}),
		new CompressionPlugin({
			include: /\.min\.js$/,
		}),
	],
	module: {
		rules: [
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			//{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					cacheDirectory: './node_modules/.cache/babel',
				},
			},
		],
	},
};

module.exports = config;

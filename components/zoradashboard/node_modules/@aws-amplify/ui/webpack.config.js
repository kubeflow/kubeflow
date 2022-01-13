const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: {
		'aws-amplify-ui': './src/index.ts',
		'aws-amplify-ui.min': './src/index.ts',
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/dist',
		library: 'aws_amplify_ui',
		libraryTarget: 'umd',
		umdNamedDefine: true,
		globalObject: 'this',
		devtoolModuleFilenameTemplate: require('../aws-amplify/webpack-utils')
			.devtoolModuleFilenameTemplate,
	},
	// Enable sourcemaps for debugging webpack's output.
	devtool: 'source-map',
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.css'],
	},

	mode: process.env.NODE_ENV || 'production',

	module: {
		rules: [
			{ test: /\.jsx?$/, use: 'ts-loader', exclude: /node_modules/ },
			{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === 'development',
						},
					},
					{
						loader: 'dts-css-modules-loader',
						options: {
							banner: '// AUTOMATICALLY GENERATED - DO NOT EDIT',
							namedExport: true,
						},
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: '[name]__[local]___[hash:base64:5]',
						},
					},
					'postcss-loader',
				],
			},
		],
	},

	plugins: [
		new MiniCssExtractPlugin({ filename: 'style.css', allChunks: true }),
	],
};

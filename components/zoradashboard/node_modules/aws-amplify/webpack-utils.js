// This module fixes sourcemap paths for the various Amplify packages. It's
// needed because packages at build time live in different (relative) folder
// locations than the folders where packages are installed from npm. For
// example, /packages/aws-amplify/src/index.ts imports @aws-amplify/ui. At build
// time, the aws-amplify and amplify-ui folders are siblings, but when the
// aws-amplify package is installed from npm, the amplify-ui folder is installed
// at ./node_modules/@aws-amplify/ui, which is a new name and is no longer a
// sibling to ./node_modules/aws-amplify like it was at build time. These
// changes mean that end users can't easily debug into Amplify code, especially
// using IDEs like VSCode.
//
// The code in this file changes paths inside Amplify sourcemaps to work around
// the issues above. The following changes are made:
// 1. sourcemap paths that point to node_modules dependencies (e.g. lodash) are
//    mapped to webpack:///./node_modules/*
// 2. sourcemap paths that point to sibling packages under the @aws-amplify
//    alias (like the UI example above) are mapped (using package names, not
//    folders) to webpack:///./node_modules/@aws-amplify/*
// 3. other paths, e.g. relative paths in the same package, or webpack or node
//    builtins, will be left alone (same behavior as current webpack config).
//
// These path mappings are designed to be compatible with VSCode's default
// source mapping options here:
// https://github.com/Microsoft/vscode-chrome-debug#sourcemaps
//
// IMPORTANT: if new packages are added to Amplify, add them to the map below.

const packageFolderMap = {
	'amazon-cognito-identity-js': 'amazon-cognito-identity-js',
	'amplify-ui': '@aws-amplify/ui',
	analytics: '@aws-amplify/analytics',
	api: '@aws-amplify/api',
	auth: '@aws-amplify/auth',
	'aws-amplify': 'aws-amplify',
	'aws-amplify-angular': 'aws-amplify-angular',
	'aws-amplify-react': 'aws-amplify-react',
	'aws-amplify-react-native': 'aws-amplify-react-native',
	'aws-amplify-vue': 'aws-amplify-vue',
	cache: '@aws-amplify/cache',
	core: '@aws-amplify/core',
	datastore: '@aws-amplify/datastore',
	interactions: '@aws-amplify/interactions',
	pubsub: '@aws-amplify/pubsub',
	pushnotification: '@aws-amplify/pushnotification',
	storage: '@aws-amplify/storage',
	xr: '@aws-amplify/xr',
};

const folders = Object.keys(packageFolderMap);
const nodeModules = '/node_modules/';
const webpackPrefix = 'webpack:///';
const webpackNodeModules = webpackPrefix + '.' + nodeModules;

function devtoolModuleFilenameTemplate(info) {
	const resource = info.resource;

	if (resource.includes(nodeModules)) {
		// dependency paths
		const start = resource.indexOf(nodeModules);
		const after = start + nodeModules.length;
		return webpackNodeModules + resource.substring(after);
	} else if (resource.includes('../')) {
		// handle relative paths to other packages in this monorepo by converting them into absolute
		// paths pointing at node_modules
		for (let i = 0; i < folders.length; i++) {
			const folder = folders[i];
			const relative = '../' + folder;
			const start = resource.indexOf(relative);
			if (start !== -1) {
				const after = start + relative.length;
				return (
					webpackNodeModules +
					packageFolderMap[folder] +
					resource.substring(after)
				);
			}
		}
	}
	// fall-through (e.g. relative paths in this package, webpack builtins, unknown package paths)
	return webpackPrefix + resource;
}

module.exports = {
	devtoolModuleFilenameTemplate,
};

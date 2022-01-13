var config = require('./webpack.config.js');

var entry = {
	'aws-amplify-storage': './lib-esm/index.js',
};
module.exports = Object.assign(config, { entry, mode: 'development' });

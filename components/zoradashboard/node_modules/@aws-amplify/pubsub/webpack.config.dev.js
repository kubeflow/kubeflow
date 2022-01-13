var config = require('./webpack.config.js');

var entry = {
	'aws-amplify-pubsub': './lib-esm/index.js',
};
module.exports = Object.assign(config, { entry, mode: 'development' });

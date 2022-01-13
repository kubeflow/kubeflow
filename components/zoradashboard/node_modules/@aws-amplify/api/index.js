'use strict';

if (process.env.NODE_ENV === 'production') {
	module.exports = require('./dist/aws-amplify-api.min.js');
} else {
	module.exports = require('./dist/aws-amplify-api.js');
}

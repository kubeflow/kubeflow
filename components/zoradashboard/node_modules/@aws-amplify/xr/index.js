'use strict';

if (process.env.NODE_ENV === 'production') {
	module.exports = require('./dist/aws-amplify-xr.min.js');
} else {
	module.exports = require('./dist/aws-amplify-xr.js');
}

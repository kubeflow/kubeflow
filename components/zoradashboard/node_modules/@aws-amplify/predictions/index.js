'use strict';

if (process.env.NODE_ENV === 'production') {
	module.exports = require('./dist/aws-amplify-predictions.min.js');
} else {
	module.exports = require('./dist/aws-amplify-predictions.js');
}

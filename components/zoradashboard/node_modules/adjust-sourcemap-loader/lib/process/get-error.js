'use strict';

var PACKAGE_NAME = require('../../package.json').name;

/**
 * Get an Error instance for the given message
 * @param {...*} message Any number of message arguments
 * @returns {Error}
 */
function getError() {
  var message = (PACKAGE_NAME + ':\n' + Array.prototype.slice.call(arguments).join(' '))
    .split(/\s*\n\s*/)
    .join('\n  ');
  return new Error(message);
}

module.exports = getError;
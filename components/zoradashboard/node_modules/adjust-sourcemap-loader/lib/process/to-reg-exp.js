'use strict';

var regexParser = require('regex-parser');

var REGEXP = /(\/?)(.+)\1([a-z]*)/i;

/**
 * Parse the give value as a regular expression or give a pass-none expression where it is invalid
 * @param {RegExp|string|*} value An existing expression, or its string representation, or degenerate value
 * @returns {RegExp} The given expression or one matching the RegExp string else a pass-none expression
 */
function toRegExp(value) {
  return ((typeof value === 'object') && (typeof value.test === 'function') && value) ||
    ((typeof value === 'string') && REGEXP.test(value) && regexParser(value)) ||
    (/^true$|^$/.test(value) && /.*/) ||
    /matchnone^/;
}

module.exports = toRegExp;
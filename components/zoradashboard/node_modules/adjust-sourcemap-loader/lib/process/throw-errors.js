'use strict';

var getError = require('./get-error');

/**
 * Where the given list is non-null and contains error instances then consolidate and throw
 * @throws Error
 * @param {string} resourcePath The path to the resource being processed
 * @param {null|Array} candidates A possible Array with possible error elements
 */
function throwErrors(resourcePath, candidates) {
  var errors = !!candidates && candidates
      .filter(testIsError)
      .map(getMessage);

  var hasError = !!errors && errors.length;
  if (hasError) {
    throw getError(['For resource: ' + resourcePath].concat(errors).join('\n'));
  }

  function testIsError(candidate) {
    return !!candidate && (typeof candidate === 'object') && (candidate instanceof Error);
  }

  function getMessage(error) {
    return error.message;
  }
}

module.exports = throwErrors;
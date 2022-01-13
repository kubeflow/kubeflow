'use strict';

var getFieldAsFn = require('./get-field-as-fn'),
    CustomError  = require('./get-error');

/**
 * Locate the root for input sources using the given codec hash
 * @throws Error Where the given codec is missing an encode function
 * @this {object} A loader or compilation
 * @param {{encode:function}} codec A single codec with an `encode` function
 * @returns {function(string):string|Error} An encode function that takes an absolute path
 */
function locateRootWith(codec) {
  /* jshint validthis:true */
  var context = this,
      root    = getFieldAsFn('root')(codec);
  if (!root) {
    return new CustomError('Specified format does not support encoding (it lacks a "root" function)');
  }
  else {
    return function locate() {

      // call the root
      var located;
      try {
        located = root.call(context);
      }
      catch (exception) {
        return getNamedError(exception);
      }
      return located;

      function getNamedError(details) {
        var name    = codec.name || '(unnamed)',
            message = [
              'Locating root with codec: ' + name,
              details && (details.stack ? details.stack : details)
            ]
              .filter(Boolean)
              .join('\n');
        return new Error(message);
      }
    };
  }
}

module.exports = locateRootWith;

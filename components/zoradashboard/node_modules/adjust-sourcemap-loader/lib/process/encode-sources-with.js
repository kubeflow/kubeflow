'use strict';

var getFieldAsFn = require('./get-field-as-fn'),
    CustomError  = require('./get-error');

/**
 * Create an encoder for output sources using the given codec hash
 * @throws Error Where the given codec is missing an encode function
 * @this {object} A loader or compilation
 * @param {{encode:function}} codec A single codec with an `encode` function
 * @returns {function(string):string|Error|false} An encode function that takes an absolute path
 */
function encodeSourcesWith(codec) {
  /* jshint validthis:true */
  var context = this,
      encoder = getFieldAsFn('encode')(codec);
  if (!encoder) {
    return new CustomError('Specified format does not support encoding (it lacks an "encoder" function)');
  }
  else {
    return function encode(absoluteSource) {

      // call the encoder
      var encoded;
      try {
        encoded = absoluteSource && encoder.call(context, absoluteSource);
      }
      catch (exception) {
        return getNamedError(exception);
      }
      return encoded;

      function getNamedError(details) {
        var name    = codec.name || '(unnamed)',
            message = [
              'Encoding with codec: ' + name,
              'Absolute source: ' + absoluteSource,
              details && (details.stack ? details.stack : details)
            ]
              .filter(Boolean)
              .join('\n');
        return new Error(message);
      }
    };
  }
}

module.exports = encodeSourcesWith;

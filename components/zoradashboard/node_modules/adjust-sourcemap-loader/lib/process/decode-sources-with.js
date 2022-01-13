'use strict';

var getFieldAsFn = require('./get-field-as-fn');

/**
 * Create a decoder for input sources using the given codec hash
 * @this {object} A loader or compilation
 * @param {Array.<object>} codecs A list of codecs, each with a `decode` function
 * @param {boolean} mustDecode Return an error for a source that is not decoded
 * @returns {function(string):string|Error} A decode function that returns an absolute path or else an Error
 */
function decodeSourcesWith(codecs, mustDecode) {
  /* jshint validthis:true */
  var context = this;

  // get a list of valid decoders
  var candidates = [].concat(codecs)
    .reduce(reduceValidDecoder.bind(null, codecs), []);

  /**
   * Attempt to decode the given source path using the previously supplied codecs
   * @param {string} inputSource A source path from a source map
   * @returns {Error|string|undefined} An absolute path if decoded else an error if encountered else undefined
   */
  return function decode(inputSource) {

    // attempt all candidates until a match
    for (var i = 0, decoded = null; i < candidates.length && !decoded; i++) {

      // call the decoder
      try {
        decoded = candidates[i].decode.call(context, inputSource);
      }
      catch (exception) {
        return getNamedError(exception);
      }

      // match implies a return value
      if (decoded) {

        // abstract sources cannot be decoded, only validated
        if (candidates[i].abstract) {
          return undefined;
        }
        // non-string implies error
        if (typeof decoded !== 'string') {
          return getNamedError('Decoder returned a truthy value but it is not a string:\n' + decoded);
        }
        // otherwise success
        else {
          return decoded;
        }
      }
    }

    // default is undefined or error
    return mustDecode ? new Error('No viable decoder for source: ' + inputSource) : undefined;

    function getNamedError(details) {
      var name    = candidates[i].name || '(unnamed)',
          message = [
            'Decoding with codec: ' + name,
            'Incoming source: ' + inputSource,
            details && (details.stack ? details.stack : details)
          ]
            .filter(Boolean)
            .join('\n');
      return new Error(message);
    }
  };
}

module.exports = decodeSourcesWith;

function reduceValidDecoder(reduced, codec) {
  var decoder = getFieldAsFn('decode')(codec);
  return decoder ? reduced.concat(codec) : reduced;
}
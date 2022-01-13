'use strict';

var assert = require('assert');

/**
 * Reducer function that converts a codec list to a hash.
 * @throws Error on bad codec
 * @param {{name:string, decode:function, encode:function, root:function}} candidate A possible codec
 * @returns True where an error is not thrown
 */
function testCodec(candidate) {
  assert(
    !!candidate && (typeof candidate === 'object'),
    'Codec must be an object'
  );
  assert(
    (typeof candidate.name === 'string') && /^[\w-]+$/.test(candidate.name),
    'Codec.name must be a kebab-case string'
  );
  assert(
    (typeof candidate.decode === 'function') && (candidate.decode.length === 1),
    'Codec.decode must be a function that accepts a single source string'
  );
  assert(
    (typeof candidate.encode === 'undefined') ||
    ((typeof candidate.encode === 'function') && (candidate.encode.length === 1)),
    'Codec.encode must be a function that accepts a single absolute path string, or else be omitted'
  );
  assert(
    (typeof candidate.root === 'undefined') ||
    (typeof candidate.root === 'function') && (candidate.root.length === 0),
    'Codec.root must be a function that accepts no arguments, or else be omitted'
  );
  return true;
}

module.exports = testCodec;
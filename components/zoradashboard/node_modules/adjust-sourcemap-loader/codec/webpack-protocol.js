'use strict';

var projectRelative = require('./project-relative');

/**
 * Codec for relative paths with respect to the context directory, preceded by a webpack:// protocol.
 * @type {{name:string, decode: function, encode: function, root: function}}
 */
module.exports = {
  name  : 'webpackProtocol',
  decode: decode,
  encode: encode,
  root  : root
};

/**
 * Decode the given uri.
 * @this {{options: object}} A loader or compilation
 * @param {string} uri A source uri to decode
 * @returns {boolean|string} False where unmatched else the decoded path
 */
function decode(uri) {
  /* jshint validthis:true */
  var analysis = /^webpack:\/{2}(.*)$/.exec(uri);
  return !!analysis && projectRelative.decode.call(this, analysis[1]);
}

/**
 * Encode the given file path.
 * @this {{options: object}} A loader or compilation
 * @param {string} absolute An absolute file path to encode
 * @returns {string} A uri
 */
function encode(absolute) {
  /* jshint validthis:true */
  return 'webpack://' + projectRelative.encode.call(this, absolute);
}

/**
 * The source-map root where relevant.
 * @this {{options: object}} A loader or compilation
 * @returns {string|undefined} The source-map root applicable to any encoded uri
 */
function root() {
}

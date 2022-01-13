'use strict';

var path = require('path'),
    fs   = require('fs');

/**
 * Codec for absolute paths.
 * @type {{name:string, decode: function, encode: function, root: function}}
 */
module.exports = {
  name  : 'absolute',
  decode: decode,
  encode: encode,
  root  : root
};

/**
 * Decode the given uri.
 * Any path with leading slash is tested in an absolute sense.
 * @this {{options: object}} A loader or compilation
 * @param {string} uri A source uri to decode
 * @returns {boolean|string} False where unmatched else the decoded path
 */
function decode(uri) {
  return path.isAbsolute(uri) && fs.existsSync(uri) && fs.statSync(uri).isFile() && uri;
}

/**
 * Encode the given file path.
 * @this {{options: object}} A loader or compilation
 * @returns {string} A uri
 */
function encode(absolute) {
  return absolute;
}

/**
 * The source-map root where relevant.
 * @this {{options: object}} A loader or compilation
 * @returns {string|undefined} The source-map root applicable to any encoded uri
 */
function root() {
}

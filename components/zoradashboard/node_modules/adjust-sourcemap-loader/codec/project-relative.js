'use strict';

var path = require('path'),
    fs   = require('fs');

var getContextDirectory = require('./utility/get-context-directory'),
    enhancedRelative    = require('./utility/enhanced-relative');

/**
 * Codec for relative paths with respect to the context directory.
 * @type {{name:string, decode: function, encode: function, root: function}}
 */
module.exports = {
  name  : 'projectRelative',
  decode: decode,
  encode: encode,
  root  : getContextDirectory
};

/**
 * Decode the given uri.
 * Any path with or without leading slash is tested against context directory.
 * @this {{options: object}} A loader or compilation
 * @param {string} uri A source uri to decode
 * @returns {boolean|string} False where unmatched else the decoded path
 */
function decode(uri) {
  /* jshint validthis:true */
  var base    = getContextDirectory.call(this),
      absFile = path.normalize(path.join(base, uri)),
      isValid = !!absFile && fs.existsSync(absFile) && fs.statSync(absFile).isFile();
  return isValid && absFile;
}

/**
 * Encode the given file path.
 * @this {{options: object}} A loader or compilation
 * @param {string} absolute An absolute file path to encode
 * @returns {string} A uri
 */
function encode(absolute) {
  /* jshint validthis:true */
  var base = getContextDirectory.call(this);
  if (!base) {
    throw new Error('Cannot locate the Webpack project directory');
  }
  else {
    return '/' + enhancedRelative(base, absolute);
  }
}

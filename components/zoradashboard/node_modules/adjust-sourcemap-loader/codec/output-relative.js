'use strict';

var path = require('path'),
    fs   = require('fs');

var getOutputDirectory = require('./utility/get-output-directory');

/**
 * Codec for relative paths with respect to the output directory.
 * @type {{name:string, decode: function, encode: function, root: function}}
 */
module.exports = {
  name  : 'outputRelative',
  decode: decode,
  encode: encode,
  root  : getOutputDirectory
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
  var base    = getOutputDirectory.call(this),
      absFile = !!base && path.normalize(path.join(base, uri)),
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
  var base = getOutputDirectory.call(this);
  if (!base) {
    throw new Error('Cannot locate the Webpack output directory');
  }
  else {
    return path.relative(base, absolute);
  }
}

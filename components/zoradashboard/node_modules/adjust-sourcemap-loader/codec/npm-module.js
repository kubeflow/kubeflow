'use strict';

var path = require('path'),
    fs   = require('fs');

var loaderUtils = require('loader-utils');

var getContextDirectory = require('./utility/get-context-directory');

/**
 * Codec for relative paths with respect to the context directory.
 * @type {{name:string, decode: function}}
 */
module.exports = {
  name  : 'npmModule',
  decode: decode
};

/**
 * Decode the given uri.
 * Include only module paths containing `~`.
 * @this {{options: object}} A loader or compilation
 * @param {string} uri A source uri to decode
 * @returns {boolean|string} False where unmatched else the decoded path
 */
function decode(uri) {
  /* jshint validthis:true */
  if (/~/.test(uri)) {
    var relative = loaderUtils.urlToRequest(uri),
        base     = getContextDirectory.call(this),
        absFile  = path.normalize(path.join(base, 'node_modules', relative)),
        isValid  = !!absFile && fs.existsSync(absFile) && fs.statSync(absFile).isFile();
    return isValid && absFile;
  }
}

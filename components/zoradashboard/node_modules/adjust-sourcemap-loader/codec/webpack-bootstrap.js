'use strict';

/**
 * Codec for webpack generated bootstrap code.
 * @type {{name:string, decode:function, abstract:boolean}}
 */
module.exports = {
  name    : 'webpackBootstrap',
  decode  : decode,
  abstract: true
};

/**
 * Validate the given uri (abstract).
 * @this {{options: object}} A loader or compilation
 * @param {string} uri A source uri to decode
 * @returns {boolean|string} False where unmatched else True
 */
function decode(uri) {
  return /^webpack\/bootstrap\s+\w{20}$/.test(uri);
}

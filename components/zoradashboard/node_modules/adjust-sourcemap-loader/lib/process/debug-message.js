'use strict';

var PACKAGE_NAME = require('../../package.json').name,
    PADDING      = (new Array(11)).join(' ');

/**
 * Format a debug message
 * @param {{resourcePath:string, loaders:Array, loaderIndex:number}} context A loader or compilation
 * @param {{input:Array.<string>, absolute:Array.<string>, output:Array.<string>, root:string}} info Source-map info
 * @returns {string} An encoded debug string
 */
function debugMessage(context, info) {
  return [
    '  ',
    PACKAGE_NAME + ':',
    '  ' + context.resourcePath,
    formatField('@', precedingRequest(context)),
    formatField('INPUT', info.input || '(source-map absent)'),
    formatField('ABSOLUTE', info.absolute),
    formatField('OUTPUT', info.output),
    formatField('ROOT', info.root)
  ]
    .filter(Boolean)
    .join('\n');
}

module.exports = debugMessage;

/**
 * Find the request that precedes this loader in the loader chain
 * @param {{loaders:Array, loaderIndex:number}} loader The loader context
 * @returns {string} The request of the preceding loader
 */
function precedingRequest(loader) {
  var isLoader = ('loaderIndex' in loader) && ('loaders' in loader) && Array.isArray(loader.loaders);
  if (isLoader) {
    var index = loader.loaderIndex + 1;
    return (index in loader.loaders) ? loader.loaders[index].request : '(no preceding loader)';
  }
}

/**
 * Where the data is truthy then format it with a right-aligned title.
 * @param {string} title
 * @param {*} data The data to display
 * @returns {boolean|string} False where data is falsey, else formatted message
 */
function formatField(title, data) {
  return !!data && (rightAlign(title) + formatData(data));

  function rightAlign(text) {
    return (PADDING + text + ' ').slice(-PADDING.length);
  }

  function formatData(data) {
    return Array.isArray(data) ? data.join('\n' + PADDING) : data;
  }
}
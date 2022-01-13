"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseFiles = parseFiles;
exports.parseFoldersToGlobs = parseFoldersToGlobs;
exports.jsonStringifyReplacerSortKeys = void 0;

var _path = require("path");

var _fs = require("fs");

var _normalizePath = _interopRequireDefault(require("normalize-path"));

var _arrify = _interopRequireDefault(require("arrify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-ignore
// @ts-ignore

/**
 * @param {string|string[]} files
 * @param {string} context
 * @returns {string[]}
 */
function parseFiles(files, context) {
  return (0, _arrify.default)(files).map(
  /** @type {string} */
  file => (0, _normalizePath.default)((0, _path.resolve)(context, file)));
}
/**
 * @param {string|string[]} patterns
 * @param {string|string[]} extensions
 * @returns {string[]}
 */


function parseFoldersToGlobs(patterns, extensions = []) {
  const extensionsList = (0, _arrify.default)(extensions);
  const [prefix, postfix] = extensionsList.length > 1 ? ['{', '}'] : ['', ''];
  const extensionsGlob = extensionsList.map(
  /** @type {string} */
  extension => extension.replace(/^\./u, '')).join(',');
  return (0, _arrify.default)(patterns).map(
  /** @type {string} */
  pattern => {
    try {
      // The patterns are absolute because they are prepended with the context.
      const stats = (0, _fs.statSync)(pattern);
      /* istanbul ignore else */

      if (stats.isDirectory()) {
        return pattern.replace(/[/\\]*?$/u, `/**${extensionsGlob ? `/*.${prefix + extensionsGlob + postfix}` : ''}`);
      }
    } catch (_) {// Return the pattern as is on error.
    }

    return pattern;
  });
}
/**
 *
 * @param {string} _ key, but unused
 * @param {any} value
 */


const jsonStringifyReplacerSortKeys = (_, value) => {
  /**
   * @param {{ [x: string]: any; }} sorted
   * @param {string | number} key
   */
  const insert = (sorted, key) => {
    // eslint-disable-next-line no-param-reassign
    sorted[key] = value[key];
    return sorted;
  };

  return value instanceof Object && !(value instanceof Array) ? Object.keys(value).sort().reduce(insert, {}) : value;
};

exports.jsonStringifyReplacerSortKeys = jsonStringifyReplacerSortKeys;
/*
 * MIT License http://opensource.org/licenses/MIT
 * Author: Ben Holloway @bholloway
 */
'use strict';

var path        = require('path'),
    loaderUtils = require('loader-utils');

/**
 * Create a value processing function for a given file path.
 *
 * @param {string} filename The current file being processed
 * @param {{absolute:string, keepQuery:boolean, join:function, root:string}} options Options hash
 * @return {function} value processing function
 */
function valueProcessor(filename, options) {
  var URL_STATEMENT_REGEX = /(url\s*\()\s*(?:(['"])((?:(?!\2).)*)(\2)|([^'"](?:(?!\)).)*[^'"]))\s*(\))/g;
  var directory = path.dirname(filename);
  var join      = options.join(filename, options);

  /**
   * Process the given CSS declaration value.
   *
   * @param {string} value A declaration value that may or may not contain a url() statement
   * @param {string|Iterator.<string>} candidate An absolute path that may be the correct base or an Iterator thereof
   */
  return function transformValue(value, candidate) {

    // allow multiple url() values in the declaration
    //  split by url statements and process the content
    //  additional capture groups are needed to match quotations correctly
    //  escaped quotations are not considered
    return value
      .split(URL_STATEMENT_REGEX)
      .map(eachSplitOrGroup)
      .join('');

    /**
     * Encode the content portion of <code>url()</code> statements.
     * There are 4 capture groups in the split making every 5th unmatched.
     *
     * @param {string} token A single split item
     * @param {number} i The index of the item in the split
     * @param {Array} arr The array of split values
     * @returns {string} Every 3 or 5 items is an encoded url everything else is as is
     */
    function eachSplitOrGroup(token, i, arr) {

      // we can get groups as undefined under certain match circumstances
      var initialised = token || '';

      // the content of the url() statement is either in group 3 or group 5
      var mod = i % 7;
      if ((mod === 3) || (mod === 5)) {

        // detect quoted url and unescape backslashes
        var before    = arr[i - 1],
            after     = arr[i + 1],
            isQuoted  = (before === after) && ((before === '\'') || (before === '"')),
            unescaped = isQuoted ? initialised.replace(/\\{2}/g, '\\') : initialised;

        // split into uri and query/hash and then find the absolute path to the uri
        var split    = unescaped.split(/([?#])/g),
            uri      = split[0],
            absolute = testIsRelative(uri) && join(uri, candidate) || testIsAbsolute(uri) && join(uri),
            query    = options.keepQuery ? split.slice(1).join('') : '';

        // use the absolute path in absolute mode or else relative path (or default to initialised)
        // #6 - backslashes are not legal in URI
        if (!absolute) {
          return initialised;
        } else if (options.absolute) {
          return absolute.replace(/\\/g, '/') + query;
        } else {
          return loaderUtils.urlToRequest(
            path.relative(directory, absolute).replace(/\\/g, '/') + query
          );
        }
      }
      // everything else, including parentheses and quotation (where present) and media statements
      else {
        return initialised;
      }
    }
  };

  /**
   * The loaderUtils.isUrlRequest() doesn't support windows absolute paths on principle. We do not subscribe to that
   * dogma so we add path.isAbsolute() check to allow them.
   *
   * We also eliminate module relative (~) paths.
   *
   * @param {string|undefined} uri A uri string possibly empty or undefined
   * @return {boolean} True for relative uri
   */
  function testIsRelative(uri) {
    return !!uri && loaderUtils.isUrlRequest(uri, false) && !path.isAbsolute(uri) && (uri.indexOf('~') !== 0);
  }

  /**
   * The loaderUtils.isUrlRequest() doesn't support windows absolute paths on principle. We do not subscribe to that
   * dogma so we add path.isAbsolute() check to allow them.
   *
   * @param {string|undefined} uri A uri string possibly empty or undefined
   * @return {boolean} True for absolute uri
   */
  function testIsAbsolute(uri) {
    return !!uri && (typeof options.root === 'string') && loaderUtils.isUrlRequest(uri, options.root) &&
      (/^\//.test(uri) || path.isAbsolute(uri));
  }
}

module.exports = valueProcessor;

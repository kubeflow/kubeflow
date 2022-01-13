/*
 * MIT License http://opensource.org/licenses/MIT
 * Author: Ben Holloway @bholloway
 */
'use strict';

var path              = require('path'),
    fs                = require('fs'),
    loaderUtils       = require('loader-utils'),
    camelcase         = require('camelcase'),
    SourceMapConsumer = require('source-map').SourceMapConsumer;

var adjustSourceMap = require('adjust-sourcemap-loader/lib/process');

var valueProcessor   = require('./lib/value-processor');
var joinFn           = require('./lib/join-function');
var logToTestHarness = require('./lib/log-to-test-harness');

var PACKAGE_NAME = require('./package.json').name;

/**
 * A webpack loader that resolves absolute url() paths relative to their original source file.
 * Requires source-maps to do any meaningful work.
 * @param {string} content Css content
 * @param {object} sourceMap The source-map
 * @returns {string|String}
 */
function resolveUrlLoader(content, sourceMap) {
  /* jshint validthis:true */

  // details of the file being processed
  var loader = this;

  // a relative loader.context is a problem
  if (/^\./.test(loader.context)) {
    return handleAsError(
      'webpack misconfiguration',
      'loader.context is relative, expected absolute'
    );
  }

  // webpack 1: prefer loader query, else options object
  // webpack 2: prefer loader options
  // webpack 3: deprecate loader.options object
  // webpack 4: loader.options no longer defined
  var options = Object.assign(
    {
      sourceMap: loader.sourceMap,
      engine   : 'postcss',
      silent   : false,
      absolute : false,
      keepQuery: false,
      removeCR : false,
      root     : false,
      debug    : false,
      join     : joinFn.defaultJoin
    },
    !!loader.options && loader.options[camelcase(PACKAGE_NAME)],
    loaderUtils.getOptions(loader)
  );

  // maybe log options for the test harness
  logToTestHarness(options);

  // defunct options
  if ('attempts' in options) {
    handleAsWarning(
      'loader misconfiguration',
      '"attempts" option is defunct (consider "join" option if search is needed)'
    );
  }
  if ('includeRoot' in options) {
    handleAsWarning(
      'loader misconfiguration',
      '"includeRoot" option is defunct (consider "join" option if search is needed)'
    );
  }
  if ('fail' in options) {
    handleAsWarning(
      'loader misconfiguration',
      '"fail" option is defunct'
    );
  }

  // validate join option
  if (typeof options.join !== 'function') {
    return handleAsError(
      'loader misconfiguration',
      '"join" option must be a Function'
    );
  } else if (options.join.length !== 2) {
    return handleAsError(
      'loader misconfiguration',
      '"join" Function must take exactly 2 arguments (filename and options hash)'
    );
  }

  // validate root option
  if (typeof options.root === 'string') {
    var isValid = (options.root === '') ||
      (path.isAbsolute(options.root) && fs.existsSync(options.root) && fs.statSync(options.root).isDirectory());

    if (!isValid) {
      return handleAsError(
        'loader misconfiguration',
        '"root" option must be an empty string or an absolute path to an existing directory'
      );
    }
  } else if (options.root !== false) {
    handleAsWarning(
      'loader misconfiguration',
      '"root" option must be string where used or false where unused'
    );
  }

  // loader result is cacheable
  loader.cacheable();

  // incoming source-map
  var sourceMapConsumer, absSourceMap;
  if (sourceMap) {

    // support non-standard string encoded source-map (per less-loader)
    if (typeof sourceMap === 'string') {
      try {
        sourceMap = JSON.parse(sourceMap);
      }
      catch (exception) {
        return handleAsError(
          'source-map error',
          'cannot parse source-map string (from less-loader?)'
        );
      }
    }

    // leverage adjust-sourcemap-loader's codecs to avoid having to make any assumptions about the sourcemap
    //  historically this is a regular source of breakage
    try {
      absSourceMap = adjustSourceMap(loader, {format: 'absolute'}, sourceMap);
    }
    catch (exception) {
      return handleAsError(
        'source-map error',
        exception.message
      );
    }

    // prepare the adjusted sass source-map for later look-ups
    sourceMapConsumer = new SourceMapConsumer(absSourceMap);
  }

  // choose a CSS engine
  var enginePath    = /^\w+$/.test(options.engine) && path.join(__dirname, 'lib', 'engine', options.engine + '.js');
  var isValidEngine = fs.existsSync(enginePath);
  if (!isValidEngine) {
    return handleAsError(
      'loader misconfiguration',
      '"engine" option is not valid'
    );
  }

  // process async
  var callback = loader.async();
  Promise
    .resolve(require(enginePath)(loader.resourcePath, content, {
      outputSourceMap     : !!options.sourceMap,
      transformDeclaration: valueProcessor(loader.resourcePath, options),
      absSourceMap        : absSourceMap,
      sourceMapConsumer   : sourceMapConsumer,
      removeCR            : options.removeCR
    }))
    .catch(onFailure)
    .then(onSuccess);

  function onFailure(error) {
    callback(encodeError('CSS error', error));
  }

  function onSuccess(reworked) {
    if (reworked) {
      // complete with source-map
      //  source-map sources are relative to the file being processed
      if (options.sourceMap) {
        var finalMap = adjustSourceMap(loader, {format: 'sourceRelative'}, reworked.map);
        callback(null, reworked.content, finalMap);
      }
      // complete without source-map
      else {
        callback(null, reworked.content);
      }
    }
  }

  /**
   * Push a warning for the given exception and return the original content.
   * @param {string} label Summary of the error
   * @param {string|Error} [exception] Optional extended error details
   * @returns {string} The original CSS content
   */
  function handleAsWarning(label, exception) {
    if (!options.silent) {
      loader.emitWarning(encodeError(label, exception));
    }
    return content;
  }

  /**
   * Push a warning for the given exception and return the original content.
   * @param {string} label Summary of the error
   * @param {string|Error} [exception] Optional extended error details
   * @returns {string} The original CSS content
   */
  function handleAsError(label, exception) {
    loader.emitError(encodeError(label, exception));
    return content;
  }

  function encodeError(label, exception) {
    return new Error(
      [
        PACKAGE_NAME,
        ': ',
        [label]
          .concat(
            (typeof exception === 'string') && exception ||
            (exception instanceof Error) && [exception.message, exception.stack.split('\n')[1].trim()] ||
            []
          )
          .filter(Boolean)
          .join('\n  ')
      ].join('')
    );
  }
}

module.exports = Object.assign(resolveUrlLoader, joinFn);

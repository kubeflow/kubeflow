'use strict';

var debugMessage      = require('./debug-message'),
    toRegExp          = require('./to-reg-exp'),
    throwErrors       = require('./throw-errors'),
    decodeSourcesWith = require('./decode-sources-with'),
    locateRootWith    = require('./locate-root-with'),
    encodeSourcesWith = require('./encode-sources-with'),
    testCodec         = require('./test-codec');

var CODECS = require('../../codec');

/**
 * Process the given source-map per the given options.
 * @param {{resourcePath:string, context:string, output:{path:string}}} context A loader or compilation
 * @param {{debug:boolean, fail:boolean, format:string|boolean, root:string, codecs:object}} opt Options hash
 * @param {object|string} sourceMapOrSource An incoming source-map or single source path
 * @returns {undefined|object|string} An amended source-map or source path else undefined
 */
function process(context, opt, sourceMapOrSource) {

  // default options
  var options = Object.assign({
    sep   : '/',
    debug : false,
    fail  : false,
    format: false,
    root  : false,
    codecs: CODECS
  }, opt);

  // validate codecs
  var codecs = options.codecs
    .filter(testCodec);

  // determine what is present
  var inputMap     = !!sourceMapOrSource && (typeof sourceMapOrSource === 'object') && sourceMapOrSource,
      inputPath    = (typeof sourceMapOrSource === 'string') && sourceMapOrSource,
      inputSources = inputMap && inputMap.sources || inputPath && [inputPath];

  // what we need to produce
  var absoluteSources,
      outputSources,
      outputRoot,
      outputMap;

  if (inputSources) {

    // decode each source with the first valid codec
    absoluteSources = inputSources
      .map(decodeSourcesWith.call(context, codecs, options.fail));

    // check for decode errors
    throwErrors(context.resourcePath, absoluteSources);

    // output map is a copy unless absent or we are removing
    outputMap = (!inputMap || (options.format === 'remove')) ? undefined : Object.assign({}, inputMap);

    // some change in format
    if (options.format) {

      // find the specified codec in the codecs list
      var codec = codecs
        .filter(testNamedCodec)
        .pop();

      if (!codec) {
        throw new Error('Specified format "' + options.format + '" does not match any available codec.');
      }

      // use the encoder where specified in 'format'
      outputSources = absoluteSources
        .map(encodeSourcesWith.call(context, codec))
        .map(insertAbstractSources)
        .map(convertPathSep);

      outputRoot = !!options.root && locateRootWith.call(context, codec)() || undefined;

      // check for encode errors
      throwErrors(context.resourcePath, outputSources.concat(outputRoot));

      // commit the change
      if (outputMap) {
        outputMap.sources = outputSources;
        outputMap.sourceRoot = outputRoot;
      }
    }
  }

  // debugging information
  var isDebug = toRegExp(options.debug).test(context.resourcePath);
  if (isDebug) {
    console.log(debugMessage(context, {
      input   : inputSources,
      absolute: absoluteSources,
      output  : outputSources,
      root    : outputRoot
    }));
  }

  // complete
  return inputMap ? outputMap : outputSources ? outputSources[0] : undefined;

  function testNamedCodec(value) {
    return (value.name === options.format);
  }

  function insertAbstractSources(value, i) {
    return value || inputSources[i];
  }

  function convertPathSep(value) {
    return (value instanceof Error) ? value : value.replace(/[\\\/]/g, options.sep);
  }
}

module.exports = process;

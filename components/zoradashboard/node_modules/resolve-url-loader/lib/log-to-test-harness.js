/*
 * MIT License http://opensource.org/licenses/MIT
 * Author: Ben Holloway @bholloway
 */
'use strict';

var stream = require('stream');

var maybeStream = process[process.env.RESOLVE_URL_LOADER_TEST_HARNESS];

function logToTestHarness(options) {
  if (!!maybeStream && (typeof maybeStream === 'object') && (maybeStream instanceof stream.Writable)) {
    Object.keys(options).map(eachOptionKey);
    maybeStream = null; // ensure we log only once
  }

  function eachOptionKey(key) {
    var value = options[key];
    var text  = (typeof value === 'undefined') ?
      String(value) :
      (JSON.stringify(value.valueOf()) || '-unstringifyable-');
    maybeStream.write(key + ': ' + text + '\n');
  }
}

module.exports = logToTestHarness;

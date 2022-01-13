'use strict';

var process = require('./process');

function moduleFilenameTemplate(options) {
  return function templateFn(parameters) {
    return process(parameters, options, parameters.resourcePath);
  };
}

module.exports = moduleFilenameTemplate;
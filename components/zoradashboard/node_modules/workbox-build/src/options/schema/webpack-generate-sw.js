/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const joi = require('@hapi/joi');

const basePartial = require('../partials/base');
const defaults = require('../defaults');
const generatePartial = require('../partials/generate');
const webpackPartial = require('../partials/webpack');

const supportedOptions = Object.assign({
  importScriptsViaChunks: joi.array().items(joi.string()),
  swDest: joi.string().default(defaults.swDestFilename),
}, basePartial, generatePartial, webpackPartial);

module.exports = joi.object().keys(supportedOptions);

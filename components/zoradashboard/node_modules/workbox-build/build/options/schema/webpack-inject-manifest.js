"use strict";

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const joi = require('@hapi/joi');

const upath = require('upath');

const basePartial = require('../partials/base');

const defaults = require('../defaults');

const injectPartial = require('../partials/inject');

const webpackPartial = require('../partials/webpack'); // See https://github.com/hapijs/joi/blob/v16.0.0-rc2/API.md#anydefaultvalue-description


const swSrcBasename = context => {
  const {
    name
  } = upath.parse(context.swSrc); // Always use the .js extension when generating a default filename.

  return name + '.js';
};

swSrcBasename.description = 'derived from the swSrc file name';
const supportedOptions = Object.assign({
  compileSrc: joi.boolean().default(defaults.compileSrc),
  webpackCompilationPlugins: joi.array().items(joi.object()).when('compileSrc', {
    is: false,
    then: joi.forbidden()
  })
}, basePartial, injectPartial, webpackPartial);
module.exports = joi.object().keys(supportedOptions).keys({
  // List this separately, so that the swSrc validation happens first.
  swDest: joi.string().default(swSrcBasename)
});
"use strict";

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const joi = require('@hapi/joi');

const basePartial = require('../partials/base');

const generatePartial = require('../partials/generate');

const globPartial = require('../partials/glob');

const supportedOptions = Object.assign({
  swDest: joi.string().required().regex(/\.js$/)
}, basePartial, generatePartial, globPartial);
module.exports = joi.object().keys(supportedOptions);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const joi = require('@hapi/joi');

const basePartial = require('../partials/base');
const globPartial = require('../partials/glob');

const supportedOptions = Object.assign({}, basePartial, globPartial);

module.exports = joi.object().keys(supportedOptions);

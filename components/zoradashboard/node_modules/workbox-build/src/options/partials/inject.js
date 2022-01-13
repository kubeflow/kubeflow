/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const joi = require('@hapi/joi');

const defaults = require('../defaults');

module.exports = {
  injectionPoint: joi.string().default(defaults.injectionPoint),
  swSrc: joi.string().required(),
};

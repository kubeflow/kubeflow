"use strict";

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const joi = require('@hapi/joi');

const defaults = require('../defaults');

const regExpObject = require('../objects/reg-exp');

module.exports = {
  chunks: joi.array().items(joi.string()),
  exclude: joi.array().items(joi.string(), regExpObject, joi.func().arity(1)).default(defaults.exclude),
  excludeChunks: joi.array().items(joi.string()),
  include: joi.array().items(joi.string(), regExpObject, joi.func().arity(1))
};
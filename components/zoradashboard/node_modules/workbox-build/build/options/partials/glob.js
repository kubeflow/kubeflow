"use strict";

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const joi = require('@hapi/joi');

const defaults = require('../defaults');

module.exports = {
  globDirectory: joi.string(),
  globFollow: joi.boolean().default(defaults.globFollow),
  globIgnores: joi.array().items(joi.string()).default(defaults.globIgnores),
  globPatterns: joi.array().items(joi.string()).default(defaults.globPatterns),
  globStrict: joi.boolean().default(defaults.globStrict),
  // templatedURLs is an object where any property name is valid, and the values
  // can be either a string or an array of strings.
  templatedURLs: joi.object().pattern(/./, [joi.string(), joi.array().items(joi.string())])
};
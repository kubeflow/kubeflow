/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const joi = require('@hapi/joi');

const defaults = require('../defaults');
const manifestEntryObject = require('../objects/manifest-entry');
const regExpObject = require('../objects/reg-exp');

module.exports = {
  additionalManifestEntries: joi.array()
      .items(joi.string(), manifestEntryObject),
  dontCacheBustURLsMatching: regExpObject,
  manifestTransforms: joi.array().items(joi.func().minArity(1).maxArity(2)),
  maximumFileSizeToCacheInBytes: joi.number().min(1)
      .default(defaults.maximumFileSizeToCacheInBytes),
  mode: joi.string().default(process.env.NODE_ENV || defaults.mode),
  modifyURLPrefix: joi.object(),
};

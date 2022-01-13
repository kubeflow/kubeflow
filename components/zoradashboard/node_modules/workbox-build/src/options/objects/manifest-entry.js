/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const joi = require('@hapi/joi');

module.exports = joi.object().keys({
  revision: joi.string().required().allow(null),
  url: joi.string().required(),
});

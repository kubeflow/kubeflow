"use strict";

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const crypto = require('crypto');
/**
 * @param {WebpackAsset} asset
 * @return {string} The MD5 hash of the asset's source.
 *
 * @private
 */


module.exports = asset => {
  return crypto.createHash('md5').update(Buffer.from(asset.source())).digest('hex');
};
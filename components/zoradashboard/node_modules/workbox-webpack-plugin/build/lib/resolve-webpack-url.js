"use strict";

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Resolves a url in the way that webpack would (with string concatenation)
 *
 * Use publicPath + filePath instead of url.resolve(publicPath, filePath) see:
 * https://webpack.js.org/configuration/output/#output-publicpath
 *
 * @function resolveWebpackURL
 * @param {Array<string>} paths File paths to join
 * @return {string} Joined file path
 *
 * @private
 */
module.exports = (...paths) => paths.join('');
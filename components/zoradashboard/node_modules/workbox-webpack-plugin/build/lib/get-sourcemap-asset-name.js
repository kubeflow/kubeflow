"use strict";

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const sourceMapURL = require('source-map-url');

const upath = require('upath');
/**
 * If our bundled swDest file contains a sourcemap, we would invalidate that
 * mapping if we just replaced injectionPoint with the stringified manifest.
 * Instead, we need to update the swDest contents as well as the sourcemap
 * at the same time.
 *
 * See https://github.com/GoogleChrome/workbox/issues/2235
 *
 * @param {Object} compilation The current webpack compilation.
 * @param {string} swContents The contents of the swSrc file, which may or
 * may not include a valid sourcemap comment.
 * @param {string} swDest The configured swDest value.
 * @return {string|undefined} If the swContents contains a valid soucemap
 * comment pointing to an asset present in the compilation, this will return the
 * name of that asset. Otherwise, it will return undefined.
 *
 * @private
 */


module.exports = (compilation, swContents, swDest) => {
  const url = sourceMapURL.getFrom(swContents);

  if (url) {
    // Translate the relative URL to what the presumed name for the webpack
    // asset should be.
    // This *might* not be a valid asset if the sourcemap URL that was found
    // was added by another module incidentally.
    // See https://github.com/GoogleChrome/workbox/issues/2250
    const swAssetDirname = upath.dirname(swDest);
    const sourcemapURLAssetName = upath.normalize(upath.join(swAssetDirname, url));

    if (sourcemapURLAssetName in compilation.assets) {
      return sourcemapURLAssetName;
    }
  }
};
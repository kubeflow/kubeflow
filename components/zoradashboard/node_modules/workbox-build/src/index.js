/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const {getModuleURL} = require('./lib/cdn-utils');
const copyWorkboxLibraries = require('./lib/copy-workbox-libraries');
const generateSW = require('./generate-sw');
const getManifest = require('./get-manifest');
const injectManifest = require('./inject-manifest');

/**
 * @module workbox-build
 */
module.exports = {
  copyWorkboxLibraries,
  generateSW,
  getManifest,
  getModuleURL,
  injectManifest,
};

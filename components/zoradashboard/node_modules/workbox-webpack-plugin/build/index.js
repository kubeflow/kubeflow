"use strict";

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const GenerateSW = require('./generate-sw');

const InjectManifest = require('./inject-manifest');
/**
 * @module workbox-webpack-plugin
 */


module.exports = {
  GenerateSW,
  InjectManifest
};
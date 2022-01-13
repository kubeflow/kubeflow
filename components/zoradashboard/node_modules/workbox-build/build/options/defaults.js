"use strict";

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
module.exports = {
  babelPresetEnvTargets: ['chrome >= 56'],
  cleanupOutdatedCaches: false,
  clientsClaim: false,
  compileSrc: true,
  disableDevLogs: false,
  exclude: [/\.map$/, /^manifest.*\.js$/],
  globFollow: true,
  globIgnores: ['**/node_modules/**/*'],
  globPatterns: ['**/*.{js,css,html}'],
  globStrict: true,
  injectionPoint: 'self.__WB_MANIFEST',
  inlineWorkboxRuntime: false,
  maximumFileSizeToCacheInBytes: 2 * 1024 * 1024,
  mode: 'production',
  navigateFallback: undefined,
  navigationPreload: false,
  offlineGoogleAnalytics: false,
  purgeOnQuotaError: true,
  skipWaiting: false,
  sourcemap: true,
  swDestFilename: 'service-worker.js'
};
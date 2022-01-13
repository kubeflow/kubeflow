"use strict";

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const fse = require('fs-extra');

const upath = require('upath');

const bundle = require('./bundle');

const errors = require('./errors');

const populateSWTemplate = require('./populate-sw-template');

module.exports = async ({
  babelPresetEnvTargets,
  cacheId,
  cleanupOutdatedCaches,
  clientsClaim,
  directoryIndex,
  disableDevLogs,
  ignoreURLParametersMatching,
  importScripts,
  inlineWorkboxRuntime,
  manifestEntries,
  mode,
  navigateFallback,
  navigateFallbackDenylist,
  navigateFallbackAllowlist,
  navigationPreload,
  offlineGoogleAnalytics,
  runtimeCaching,
  skipWaiting,
  sourcemap,
  swDest
}) => {
  const outputDir = upath.dirname(swDest);

  try {
    await fse.mkdirp(outputDir);
  } catch (error) {
    throw new Error(`${errors['unable-to-make-sw-directory']}. ` + `'${error.message}'`);
  }

  const unbundledCode = populateSWTemplate({
    cacheId,
    cleanupOutdatedCaches,
    clientsClaim,
    directoryIndex,
    disableDevLogs,
    ignoreURLParametersMatching,
    importScripts,
    manifestEntries,
    navigateFallback,
    navigateFallbackDenylist,
    navigateFallbackAllowlist,
    navigationPreload,
    offlineGoogleAnalytics,
    runtimeCaching,
    skipWaiting
  });

  try {
    const files = await bundle({
      babelPresetEnvTargets,
      inlineWorkboxRuntime,
      mode,
      sourcemap,
      swDest,
      unbundledCode
    });
    const filePaths = [];

    for (const file of files) {
      const filePath = upath.resolve(file.name);
      filePaths.push(filePath);
      await fse.writeFile(filePath, file.contents);
    }

    return filePaths;
  } catch (error) {
    if (error.code === 'EISDIR') {
      // See https://github.com/GoogleChrome/workbox/issues/612
      throw new Error(errors['sw-write-failure-directory']);
    }

    throw new Error(`${errors['sw-write-failure']} '${error.message}'`);
  }
};
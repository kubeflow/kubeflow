"use strict";

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const assert = require('assert');

const fse = require('fs-extra');

const sourceMapURL = require('source-map-url');

const stringify = require('fast-json-stable-stringify');

const upath = require('upath');

const errors = require('./lib/errors');

const escapeRegexp = require('./lib/escape-regexp');

const getFileManifestEntries = require('./lib/get-file-manifest-entries');

const injectManifestSchema = require('./options/schema/inject-manifest');

const rebasePath = require('./lib/rebase-path');

const replaceAndUpdateSourceMap = require('./lib/replace-and-update-source-map');

const validate = require('./lib/validate-options'); // eslint-disable-next-line jsdoc/newline-after-description

/**
 * This method creates a list of URLs to precache, referred to as a "precache
 * manifest", based on the options you provide.
 *
 * The manifest is injected into the `swSrc` file, and the placeholder string
 * `injectionPoint` determines where in the file the manifest should go.
 *
 * The final service worker file, with the manifest injected, is written to
 * disk at `swDest`.
 *
 * @param {Object} config The configuration to use.
 *
 * @param {string} config.globDirectory The local directory you wish to match
 * `globPatterns` against. The path is relative to the current directory.
 *
 * @param {string} config.swDest The path and filename of the service worker file
 * that will be created by the build process, relative to the current working
 * directory. It must end in '.js'.
 *
 * @param {string} config.swSrc The path and filename of the service worker file
 * that will be read during the build process, relative to the current working
 * directory.
 *
 * @param {Array<module:workbox-build.ManifestEntry>} [config.additionalManifestEntries]
 * A list of entries to be precached, in addition to any entries that are
 * generated as part of the build configuration.
 *
 * @param {RegExp} [config.dontCacheBustURLsMatching] Assets that match this will be
 * assumed to be uniquely versioned via their URL, and exempted from the normal
 * HTTP cache-busting that's done when populating the precache. While not
 * required, it's recommended that if your existing build process already
 * inserts a `[hash]` value into each filename, you provide a RegExp that will
 * detect that, as it will reduce the bandwidth consumed when precaching.
 *
 * @param {boolean} [config.globFollow=true] Determines whether or not symlinks
 * are followed when generating the precache manifest. For more information, see
 * the definition of `follow` in the `glob`
 * [documentation](https://github.com/isaacs/node-glob#options).
 *
 * @param {Array<string>} [config.globIgnores=['node_modules/**']]
 * A set of patterns matching files to always exclude when generating the
 * precache manifest. For more information, see the definition of `ignore` in the `glob`
 * [documentation](https://github.com/isaacs/node-glob#options).
 *
 * @param {Array<string>} [config.globPatterns=['**.{js,css,html}']]
 * Files matching any of these patterns will be included in the precache
 * manifest. For more information, see the
 * [`glob` primer](https://github.com/isaacs/node-glob#glob-primer).
 *
 * @param {boolean} [config.globStrict=true] If true, an error reading a directory when
 * generating a precache manifest will cause the build to fail. If false, the
 * problematic directory will be skipped. For more information, see the
 * definition of `strict` in the `glob`
 * [documentation](https://github.com/isaacs/node-glob#options).
 *
 * @param  {string} [config.injectionPoint='self.__WB_MANIFEST'] The string to
 * find inside of the `swSrc` file. Once found, it will be replaced by the
 * generated precache manifest.
 *
 * @param {Array<module:workbox-build.ManifestTransform>} [config.manifestTransforms] One or more
 * functions which will be applied sequentially against the generated manifest.
 * If `modifyURLPrefix` or `dontCacheBustURLsMatching` are also specified, their
 * corresponding transformations will be applied first.
 *
 * @param {number} [config.maximumFileSizeToCacheInBytes=2097152] This value can be
 * used to determine the maximum size of files that will be precached. This
 * prevents you from inadvertently precaching very large files that might have
 * accidentally matched one of your patterns.
 *
 * @param {string} [config.mode='production'] If set to 'production', then an
 * optimized service worker bundle that excludes debugging info will be
 * produced. If not explicitly configured here, the `process.env.NODE_ENV` value
 * will be used, and failing that, it will fall back to `'production'`.
 *
 * @param {object<string, string>} [config.modifyURLPrefix] A mapping of prefixes
 * that, if present in an entry in the precache manifest, will be replaced with
 * the corresponding value. This can be used to, for example, remove or add a
 * path prefix from a manifest entry if your web hosting setup doesn't match
 * your local filesystem setup. As an alternative with more flexibility, you can
 * use the `manifestTransforms` option and provide a function that modifies the
 * entries in the manifest using whatever logic you provide.
 *
 * @param {Object} [config.templatedURLs] If a URL is rendered based on some
 * server-side logic, its contents may depend on multiple files or on some other
 * unique string value. The keys in this object are server-rendered URLs. If the
 * values are an array of strings, they will be interpreted as `glob` patterns,
 * and the contents of any files matching the patterns will be used to uniquely
 * version the URL. If used with a single string, it will be interpreted as
 * unique versioning information that you've generated for a given URL.
 *
 * @return {Promise<{count: number, filePaths: Array<string>, size: number, warnings: Array<string>}>}
 * A promise that resolves once the service worker and related files
 * (indicated by `filePaths`) has been written to `swDest`. The `size` property
 * contains the aggregate size of all the precached entries, in bytes, and the
 * `count` property contains the total number of precached entries. Any
 * non-fatal warning messages will be returned via `warnings`.
 *
 * @memberof module:workbox-build
 */


async function injectManifest(config) {
  const options = validate(config, injectManifestSchema); // Make sure we leave swSrc and swDest out of the precache manifest.

  for (const file of [options.swSrc, options.swDest]) {
    options.globIgnores.push(rebasePath({
      file,
      baseDirectory: options.globDirectory
    }));
  }

  const globalRegexp = new RegExp(escapeRegexp(options.injectionPoint), 'g');
  const {
    count,
    size,
    manifestEntries,
    warnings
  } = await getFileManifestEntries(options);
  let swFileContents;

  try {
    swFileContents = await fse.readFile(options.swSrc, 'utf8');
  } catch (error) {
    throw new Error(`${errors['invalid-sw-src']} ${error.message}`);
  }

  const injectionResults = swFileContents.match(globalRegexp);

  if (!injectionResults) {
    // See https://github.com/GoogleChrome/workbox/issues/2230
    if (upath.resolve(options.swSrc) === upath.resolve(options.swDest)) {
      throw new Error(errors['same-src-and-dest'] + ' ' + options.injectionPoint);
    }

    throw new Error(errors['injection-point-not-found'] + ' ' + options.injectionPoint);
  }

  assert(injectionResults.length === 1, errors['multiple-injection-points'] + options.injectionPoint);
  const manifestString = stringify(manifestEntries);
  const filesToWrite = {};
  const url = sourceMapURL.getFrom(swFileContents); // If our swSrc file contains a sourcemap, we would invalidate that
  // mapping if we just replaced injectionPoint with the stringified manifest.
  // Instead, we need to update the swDest contents as well as the sourcemap
  // at the same time.
  // See https://github.com/GoogleChrome/workbox/issues/2235

  if (url) {
    const sourcemapSrcPath = upath.resolve(upath.dirname(options.swSrc), url);
    const sourcemapDestPath = upath.resolve(upath.dirname(options.swDest), url);
    let originalMap;

    try {
      originalMap = await fse.readJSON(sourcemapSrcPath, 'utf8');
    } catch (error) {
      throw new Error(`${errors['cant-find-sourcemap']} ${error.message}`);
    }

    const {
      map,
      source
    } = await replaceAndUpdateSourceMap({
      originalMap,
      jsFilename: upath.basename(options.swDest),
      originalSource: swFileContents,
      replaceString: manifestString,
      searchString: options.injectionPoint
    });
    filesToWrite[options.swDest] = source;
    filesToWrite[sourcemapDestPath] = map;
  } else {
    // If there's no sourcemap associated with swSrc, a simple string
    // replacement will suffice.
    filesToWrite[options.swDest] = swFileContents.replace(globalRegexp, manifestString);
  }

  for (const [file, contents] of Object.entries(filesToWrite)) {
    try {
      await fse.mkdirp(upath.dirname(file));
    } catch (error) {
      throw new Error(errors['unable-to-make-injection-directory'] + ` '${error.message}'`);
    }

    await fse.writeFile(file, contents);
  }

  return {
    count,
    size,
    warnings,
    // Use upath.resolve() to make all the paths absolute.
    filePaths: Object.keys(filesToWrite).map(f => upath.resolve(f))
  };
}

module.exports = injectManifest;
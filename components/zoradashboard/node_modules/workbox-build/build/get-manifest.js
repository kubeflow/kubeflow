"use strict";

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const getFileManifestEntries = require('./lib/get-file-manifest-entries');

const getManifestSchema = require('./options/schema/get-manifest');

const validate = require('./lib/validate-options'); // eslint-disable-next-line jsdoc/newline-after-description

/**
 * This method returns a list of URLs to precache, referred to as a "precache
 * manifest", along with details about the number of entries and their size,
 * based on the options you provide.
 *
 * @param {Object} config The configuration to use.
 *
 * @param {string} config.globDirectory The local directory you wish to match
 * `globPatterns` against. The path is relative to the current directory.
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
 * @return {Promise<{count: number, manifestEntries: Array<module:workbox-build.ManifestEntry>, size: number, warnings: Array<string>}>}
 * A promise that resolves once the precache manifest (available in the
 * `manifestEntries` property) has been determined. The `size` property
 * contains the aggregate size of all the precached entries, in bytes, and the
 * `count` property contains the total number of precached entries. Any
 * non-fatal warning messages will be returned via `warnings`.
 *
 * @memberof module:workbox-build
 */


async function getManifest(config) {
  const options = validate(config, getManifestSchema);
  const {
    manifestEntries,
    count,
    size,
    warnings
  } = await getFileManifestEntries(options);
  return {
    manifestEntries,
    count,
    size,
    warnings
  };
}

module.exports = getManifest;
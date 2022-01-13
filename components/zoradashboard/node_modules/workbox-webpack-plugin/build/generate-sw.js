"use strict";

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const {
  RawSource
} = require('webpack-sources');

const bundle = require('workbox-build/build/lib/bundle');

const populateSWTemplate = require('workbox-build/build/lib/populate-sw-template');

const validate = require('workbox-build/build/lib/validate-options');

const webpackGenerateSWSchema = require('workbox-build/build/options/schema/webpack-generate-sw');

const getScriptFilesForChunks = require('./lib/get-script-files-for-chunks');

const getManifestEntriesFromCompilation = require('./lib/get-manifest-entries-from-compilation');

const relativeToOutputPath = require('./lib/relative-to-output-path'); // Used to keep track of swDest files written by *any* instance of this plugin.
// See https://github.com/GoogleChrome/workbox/issues/2181


const _generatedAssetNames = new Set();
/**
 * This class supports creating a new, ready-to-use service worker file as
 * part of the webpack compilation process.
 *
 * Use an instance of `GenerateSW` in the
 * [`plugins` array](https://webpack.js.org/concepts/plugins/#usage) of a
 * webpack config.
 *
 * @memberof module:workbox-webpack-plugin
 */


class GenerateSW {
  // eslint-disable-next-line jsdoc/newline-after-description

  /**
   * Creates an instance of GenerateSW.
   *
   * @param {Object} config The configuration to use.
   *
   * @param {Array<module:workbox-build.ManifestEntry>} [config.additionalManifestEntries]
   * A list of entries to be precached, in addition to any entries that are
   * generated as part of the build configuration.
   *
   * @param {Array<string>} [config.babelPresetEnvTargets=['chrome >= 56']]
   * The [targets](https://babeljs.io/docs/en/babel-preset-env#targets) to pass to
   * `babel-preset-env` when transpiling the service worker bundle.
   *
   * @param {string} [config.cacheId] An optional ID to be prepended to cache
   * names. This is primarily useful for local development where multiple sites
   * may be served from the same `http://localhost:port` origin.
   *
   * @param {boolean} [config.cleanupOutdatedCaches=false] Whether or not Workbox
   * should attempt to identify an delete any precaches created by older,
   * incompatible versions.
   *
   * @param {boolean} [config.clientsClaim=false] Whether or not the service
   * worker should [start controlling](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#clientsclaim)
   * any existing clients as soon as it activates.
   *
   * @param {Array<string>} [config.chunks] One or more chunk names whose corresponding
   * output files should be included in the precache manifest.
   *
   * @param {string} [config.directoryIndex='index.html'] If a navigation request
   * for a URL ending in `/` fails to match a precached URL, this value will be
   * appended to the URL and that will be checked for a precache match. This
   * should be set to what your web server is using for its directory index.
   *
   * @param {RegExp} [config.dontCacheBustURLsMatching] Assets that match this will be
   * assumed to be uniquely versioned via their URL, and exempted from the normal
   * HTTP cache-busting that's done when populating the precache. While not
   * required, it's recommended that if your existing build process already
   * inserts a `[hash]` value into each filename, you provide a RegExp that will
   * detect that, as it will reduce the bandwidth consumed when precaching.
   *
   * @param {Array<string|RegExp|Function>} [config.exclude=[/\.map$/, /^manifest.*\.js$]]
   * One or more specifiers used to exclude assets from the precache manifest.
   * This is interpreted following
   * [the same rules](https://webpack.js.org/configuration/module/#condition)
   * as `webpack`'s standard `exclude` option.
   *
   * @param {Array<string>} [config.excludeChunks] One or more chunk names whose
   * corresponding output files should be excluded from the precache manifest.
   *
   * @param {Array<RegExp>} [config.ignoreURLParametersMatching=[/^utm_/]]
   * Any search parameter names that match against one of the RegExp in this array
   * will be removed before looking for a precache match. This is useful if your
   * users might request URLs that contain, for example, URL parameters used to
   * track the source of the traffic.
   *
   * @param {Array<string>} [config.importScripts] A list of JavaScript files that
   * should be passed to [`importScripts()`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts)
   * inside the generated service worker file. This is  useful when you want to
   * let Workbox create your top-level service worker file, but want to include
   * some additional code, such as a push event listener.
   *
   * @param {Array<string>} [config.importScriptsViaChunks] One or more names of
   * webpack chunks. The content of those chunks will be included in the
   * generated service worker, via a call to `importScripts()`.
   *
   * @param {Array<string|RegExp|Function>} [config.include]
   * One or more specifiers used to include assets in the precache manifest.
   * This is interpreted following
   * [the same rules](https://webpack.js.org/configuration/module/#condition)
   * as `webpack`'s standard `include` option.
   *
   * @param {boolean} [config.inlineWorkboxRuntime=false] Whether the runtime code
   * for the Workbox library should be included in the top-level service worker,
   * or split into a separate file that needs to be deployed alongside the service
   * worker. Keeping the runtime separate means that users will not have to
   * re-download the Workbox code each time your top-level service worker changes.
   *
   * @param {Array<module:workbox-build.ManifestTransform>} [config.manifestTransforms]
   * One or more functions which will be applied sequentially against the
   * generated manifest. If `modifyURLPrefix` or `dontCacheBustURLsMatching` are
   * also specified, their corresponding transformations will be applied first.
   *
   * @param {number} [config.maximumFileSizeToCacheInBytes=2097152] This value can be
   * used to determine the maximum size of files that will be precached. This
   * prevents you from inadvertently precaching very large files that might have
   * accidentally matched one of your patterns.
   *
   * @param {string} [config.mode] If set to 'production', then an optimized service
   * worker bundle that excludes debugging info will be produced. If not explicitly
   * configured here, the `mode` value configured in the current `webpack` compiltion
   * will be used.
   *
   * @param {object<string, string>} [config.modifyURLPrefix] A mapping of prefixes
   * that, if present in an entry in the precache manifest, will be replaced with
   * the corresponding value. This can be used to, for example, remove or add a
   * path prefix from a manifest entry if your web hosting setup doesn't match
   * your local filesystem setup. As an alternative with more flexibility, you can
   * use the `manifestTransforms` option and provide a function that modifies the
   * entries in the manifest using whatever logic you provide.
   *
   * @param {string} [config.navigateFallback] If specified, all
   * [navigation requests](https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#first_what_are_navigation_requests)
   * for URLs that aren't precached will be fulfilled with the HTML at the URL
   * provided. You must pass in the URL of an HTML document that is listed in your
   * precache manifest. This is meant to be used in a Single Page App scenario, in
   * which you want all navigations to use common [App Shell HTML](https://developers.google.com/web/fundamentals/architecture/app-shell).
   *
   * @param {Array<RegExp>} [config.navigateFallbackDenylist] An optional array
   * of regular expressions that restricts which URLs the configured
   * `navigateFallback` behavior applies to. This is useful if only a subset of
   * your site's URLs should be treated as being part of a
   * [Single Page App](https://en.wikipedia.org/wiki/Single-page_application). If
   * both `navigateFallbackDenylist` and `navigateFallbackAllowlist` are
   * configured, the denylist takes precedent.
   *
   * @param {Array<RegExp>} [config.navigateFallbackAllowlist] An optional array
   * of regular expressions that restricts which URLs the configured
   * `navigateFallback` behavior applies to. This is useful if only a subset of
   * your site's URLs should be treated as being part of a
   * [Single Page App](https://en.wikipedia.org/wiki/Single-page_application). If
   * both `navigateFallbackDenylist` and `navigateFallbackAllowlist` are
   * configured, the denylist takes precedent.
   *
   * @param {boolean} [config.navigationPreload=false] Whether or not to enable
   * [navigation preload](https://developers.google.com/web/tools/workbox/modules/workbox-navigation-preload)
   * in the generated service worker. When set to true, you must also use
   * `runtimeCaching` to set up an appropriate response strategy that will match
   * navigation requests, and make use of the preloaded response.
   *
   * @param {boolean|Object} [config.offlineGoogleAnalytics=false] Controls
   * whether or not to include support for
   * [offline Google Analytics](https://developers.google.com/web/tools/workbox/guides/enable-offline-analytics).
   * When `true`, the call to `workbox-google-analytics`'s `initialize()` will be
   * added to your generated service worker. When set to an `Object`, that object
   * will be passed in to the `initialize()` call, allowing you to customize the
   * behavior.
   *
   * @param {Array<module:workbox-build.RuntimeCachingEntry>} [config.runtimeCaching]
   *
   * @param {boolean} [config.skipWaiting=false] Whether to add an
   * unconditional call to [`skipWaiting()`]{@link module:workbox-core.skipWaiting}
   * to the generated service worker. If `false`, then a `message` listener will
   * be added instead, allowing you to conditionally call `skipWaiting()`.
   *
   * @param {boolean} [config.sourcemap=true] Whether to create a sourcemap
   * for the generated service worker files.
   *
   * @param {string} [config.swDest='service-worker.js'] The asset name of the
   * service worker file that will be created by this plugin.
   */
  constructor(config = {}) {
    this.config = config;
    this.alreadyCalled = false;
  }
  /**
   * @param {Object} [compiler] default compiler object passed from webpack
   *
   * @private
   */


  propagateWebpackConfig(compiler) {
    // Because this.config is listed last, properties that are already set
    // there take precedence over derived properties from the compiler.
    this.config = Object.assign({
      mode: compiler.options.mode,
      sourcemap: Boolean(compiler.options.devtool)
    }, this.config);
  }
  /**
   * @param {Object} [compiler] default compiler object passed from webpack
   *
   * @private
   */


  apply(compiler) {
    this.propagateWebpackConfig(compiler);
    compiler.hooks.emit.tapPromise(this.constructor.name, compilation => this.handleEmit(compilation).catch(error => compilation.errors.push(error)));
  }
  /**
   * @param {Object} compilation The webpack compilation.
   *
   * @private
   */


  async handleEmit(compilation) {
    // See https://github.com/GoogleChrome/workbox/issues/1790
    if (this.alreadyCalled) {
      compilation.warnings.push(`${this.constructor.name} has been called ` + `multiple times, perhaps due to running webpack in --watch mode. The ` + `precache manifest generated after the first call may be inaccurate! ` + `Please see https://github.com/GoogleChrome/workbox/issues/1790 for ` + `more information.`);
    } else {
      this.alreadyCalled = true;
    }

    let config;

    try {
      // emit might be called multiple times; instead of modifying this.config,
      // use a validated copy.
      // See https://github.com/GoogleChrome/workbox/issues/2158
      config = validate(this.config, webpackGenerateSWSchema);
    } catch (error) {
      throw new Error(`Please check your ${this.constructor.name} plugin ` + `configuration:\n${error.message}`);
    } // Ensure that we don't precache any of the assets generated by *any*
    // instance of this plugin.


    config.exclude.push(({
      asset
    }) => _generatedAssetNames.has(asset.name));

    if (config.importScriptsViaChunks) {
      // Anything loaded via importScripts() is implicitly cached by the service
      // worker, and should not be added to the precache manifest.
      config.excludeChunks = (config.excludeChunks || []).concat(config.importScriptsViaChunks);
      const scripts = getScriptFilesForChunks(compilation, config.importScriptsViaChunks);
      config.importScripts = (config.importScripts || []).concat(scripts);
    }

    config.manifestEntries = await getManifestEntriesFromCompilation(compilation, config);
    const unbundledCode = populateSWTemplate(config);
    const files = await bundle({
      babelPresetEnvTargets: config.babelPresetEnvTargets,
      inlineWorkboxRuntime: config.inlineWorkboxRuntime,
      mode: config.mode,
      sourcemap: config.sourcemap,
      swDest: relativeToOutputPath(compilation, config.swDest),
      unbundledCode
    });

    for (const file of files) {
      compilation.assets[file.name] = new RawSource(file.contents);

      _generatedAssetNames.add(file.name);
    }
  }

}

module.exports = GenerateSW;
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

const {
  SingleEntryPlugin
} = require('webpack');

const replaceAndUpdateSourceMap = require('workbox-build/build/lib/replace-and-update-source-map');

const stringify = require('fast-json-stable-stringify');

const upath = require('upath');

const validate = require('workbox-build/build/lib/validate-options');

const webpackInjectManifestSchema = require('workbox-build/build/options/schema/webpack-inject-manifest');

const getManifestEntriesFromCompilation = require('./lib/get-manifest-entries-from-compilation');

const getSourcemapAssetName = require('./lib/get-sourcemap-asset-name');

const relativeToOutputPath = require('./lib/relative-to-output-path'); // Used to keep track of swDest files written by *any* instance of this plugin.
// See https://github.com/GoogleChrome/workbox/issues/2181


const _generatedAssetNames = new Set();
/**
 * This class supports compiling a service worker file provided via `swSrc`,
 * and injecting into that service worker a list of URLs and revision
 * information for precaching based on the webpack asset pipeline.
 *
 * Use an instance of `InjectManifest` in the
 * [`plugins` array](https://webpack.js.org/concepts/plugins/#usage) of a
 * webpack config.
 *
 * @memberof module:workbox-webpack-plugin
 */


class InjectManifest {
  // eslint-disable-next-line jsdoc/newline-after-description

  /**
   * Creates an instance of InjectManifest.
   *
   * @param {Object} config The configuration to use.
   *
   * @param {string} config.swSrc An existing service worker file that will be
   * compiled and have a precache manifest injected into it.
   *
   * @param {Array<module:workbox-build.ManifestEntry>} [config.additionalManifestEntries]
   * A list of entries to be precached, in addition to any entries that are
   * generated as part of the build configuration.
   *
   * @param {Array<string>} [config.chunks] One or more chunk names whose corresponding
   * output files should be included in the precache manifest.
   *
   * @param {boolean} [config.compileSrc=true] When `true` (the default), the
   * `swSrc` file will be compiled by webpack. When `false`, compilation will
   * not occur (and `webpackCompilationPlugins` can't be used.) Set to `false`
   * if you want to inject the manifest into, e.g., a JSON file.
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
   * @param {Array<string>} [config.importScriptsViaChunks] One or more names of
   * webpack chunks. The content of those chunks will be included in the
   * generated service worker, via a call to `importScripts()`.
   *
   * @param {Array<string>} [config.excludeChunks] One or more chunk names whose
   * corresponding output files should be excluded from the precache manifest.
   *
   * @param {Array<string|RegExp|Function>} [config.include]
   * One or more specifiers used to include assets in the precache manifest.
   * This is interpreted following
   * [the same rules](https://webpack.js.org/configuration/module/#condition)
   * as `webpack`'s standard `include` option.
   *
   * @param  {string} [config.injectionPoint='self.__WB_MANIFEST'] The string to
   * find inside of the `swSrc` file. Once found, it will be replaced by the
   * generated precache manifest.
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
   * configured here, the `mode` value configured in the current `webpack`
   * compilation will be used.
   *
   * @param {object<string, string>} [config.modifyURLPrefix] A mapping of prefixes
   * that, if present in an entry in the precache manifest, will be replaced with
   * the corresponding value. This can be used to, for example, remove or add a
   * path prefix from a manifest entry if your web hosting setup doesn't match
   * your local filesystem setup. As an alternative with more flexibility, you can
   * use the `manifestTransforms` option and provide a function that modifies the
   * entries in the manifest using whatever logic you provide.
   *
   * @param {string} [config.swDest] The asset name of the
   * service worker file that will be created by this plugin. If omitted, the
   * name will be based on the `swSrc` name.
   *
   * @param {Array<Object>} [config.webpackCompilationPlugins] Optional `webpack`
   * plugins that will be used when compiling the `swSrc` input file.
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
      mode: compiler.mode
    }, this.config);
  }
  /**
   * @param {Object} [compiler] default compiler object passed from webpack
   *
   * @private
   */


  apply(compiler) {
    this.propagateWebpackConfig(compiler);
    compiler.hooks.make.tapPromise(this.constructor.name, compilation => this.handleMake(compilation, compiler).catch(error => compilation.errors.push(error)));
    compiler.hooks.emit.tapPromise(this.constructor.name, compilation => this.handleEmit(compilation).catch(error => compilation.errors.push(error)));
  }
  /**
   * @param {Object} compilation The webpack compilation.
   * @param {Object} parentCompiler The webpack parent compiler.
   *
   * @private
   */


  async performChildCompilation(compilation, parentCompiler) {
    const outputOptions = {
      path: parentCompiler.options.output.path,
      filename: this.config.swDest
    };
    const childCompiler = compilation.createChildCompiler(this.constructor.name, outputOptions);
    childCompiler.context = parentCompiler.context;
    childCompiler.inputFileSystem = parentCompiler.inputFileSystem;
    childCompiler.outputFileSystem = parentCompiler.outputFileSystem;

    if (Array.isArray(this.config.webpackCompilationPlugins)) {
      for (const plugin of this.config.webpackCompilationPlugins) {
        plugin.apply(childCompiler);
      }
    }

    new SingleEntryPlugin(parentCompiler.context, this.config.swSrc, this.constructor.name).apply(childCompiler);
    await new Promise((resolve, reject) => {
      childCompiler.runAsChild((error, entries, childCompilation) => {
        if (error) {
          reject(error);
        } else {
          compilation.warnings = compilation.warnings.concat(childCompilation.warnings);
          compilation.errors = compilation.errors.concat(childCompilation.errors);
          resolve();
        }
      });
    });
  }
  /**
   * @param {Object} compilation The webpack compilation.
   * @param {Object} parentCompiler The webpack parent compiler.
   *
   * @private
   */


  addSrcToAssets(compilation, parentCompiler) {
    const source = parentCompiler.inputFileSystem.readFileSync(this.config.swSrc).toString();
    compilation.assets[this.config.swDest] = new RawSource(source);
  }
  /**
   * @param {Object} compilation The webpack compilation.
   * @param {Object} parentCompiler The webpack parent compiler.
   *
   * @private
   */


  async handleMake(compilation, parentCompiler) {
    try {
      this.config = validate(this.config, webpackInjectManifestSchema);
    } catch (error) {
      throw new Error(`Please check your ${this.constructor.name} plugin ` + `configuration:\n${error.message}`);
    }

    this.config.swDest = relativeToOutputPath(compilation, this.config.swDest);

    _generatedAssetNames.add(this.config.swDest);

    if (this.config.compileSrc) {
      await this.performChildCompilation(compilation, parentCompiler);
    } else {
      this.addSrcToAssets(compilation, parentCompiler);
    }
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

    const config = Object.assign({}, this.config); // Ensure that we don't precache any of the assets generated by *any*
    // instance of this plugin.

    config.exclude.push(({
      asset
    }) => _generatedAssetNames.has(asset.name)); // See https://webpack.js.org/contribute/plugin-patterns/#monitoring-the-watch-graph

    const absoluteSwSrc = upath.resolve(this.config.swSrc);
    compilation.fileDependencies.add(absoluteSwSrc);
    const swAsset = compilation.assets[config.swDest];
    const initialSWAssetString = swAsset.source();

    if (!initialSWAssetString.includes(config.injectionPoint)) {
      throw new Error(`Can't find ${config.injectionPoint} in your SW source.`);
    }

    const manifestEntries = await getManifestEntriesFromCompilation(compilation, config);
    let manifestString = stringify(manifestEntries);

    if (this.config.compileSrc) {
      // See https://github.com/GoogleChrome/workbox/issues/2263
      manifestString = manifestString.replace(/"/g, `'`);
    }

    const sourcemapAssetName = getSourcemapAssetName(compilation, initialSWAssetString, config.swDest);

    if (sourcemapAssetName) {
      const sourcemapAsset = compilation.assets[sourcemapAssetName];
      const {
        source,
        map
      } = await replaceAndUpdateSourceMap({
        jsFilename: config.swDest,
        originalMap: JSON.parse(sourcemapAsset.source()),
        originalSource: initialSWAssetString,
        replaceString: manifestString,
        searchString: config.injectionPoint
      });
      compilation.assets[sourcemapAssetName] = new RawSource(map);
      compilation.assets[config.swDest] = new RawSource(source);
    } else {
      // If there's no sourcemap associated with swDest, a simple string
      // replacement will suffice.
      compilation.assets[config.swDest] = new RawSource(initialSWAssetString.replace(config.injectionPoint, manifestString));
    }
  }

}

module.exports = InjectManifest;
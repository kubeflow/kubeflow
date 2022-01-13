"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _arrify = _interopRequireDefault(require("arrify"));

var _micromatch = require("micromatch");

var _options = require("./options");

var _linter = _interopRequireDefault(require("./linter"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-ignore

/** @typedef {import('webpack').Compiler} Compiler */

/** @typedef {import('./options').Options} Options */
const ESLINT_PLUGIN = 'ESLintWebpackPlugin';
let counter = 0;

class ESLintWebpackPlugin {
  /**
   * @param {Options} options
   */
  constructor(options = {}) {
    this.key = ESLINT_PLUGIN;
    this.options = (0, _options.getOptions)(options);
    this.run = this.run.bind(this);
  }
  /**
   * @param {Compiler} compiler
   * @returns {void}
   */


  apply(compiler) {
    // Generate key for each compilation,
    // this differentiates one from the other when being cached.
    this.key = compiler.name || `${this.key}_${counter += 1}`; // If `lintDirtyModulesOnly` is disabled,
    // execute the linter on the build

    if (!this.options.lintDirtyModulesOnly) {
      compiler.hooks.run.tapPromise(this.key, this.run);
    } // TODO: Figure out want `compiler.watching` is and how to use it in Webpack5.
    // From my testing of compiler.watch() ... compiler.watching is always
    // undefined (webpack 4 doesn't define it either) I'm leaving it out
    // for now.


    let isFirstRun = this.options.lintDirtyModulesOnly;
    compiler.hooks.watchRun.tapPromise(this.key, c => {
      if (isFirstRun) {
        isFirstRun = false;
        return Promise.resolve();
      }

      return this.run(c);
    });
  }
  /**
   * @param {Compiler} compiler
   */


  async run(compiler) {
    // Do not re-hook
    if ( // @ts-ignore
    compiler.hooks.thisCompilation.taps.find(({
      name
    }) => name === this.key)) {
      return;
    }

    const options = { ...this.options,
      exclude: (0, _utils.parseFiles)(this.options.exclude || [], this.getContext(compiler)),
      extensions: (0, _arrify.default)(this.options.extensions),
      files: (0, _utils.parseFiles)(this.options.files || '', this.getContext(compiler))
    };
    const wanted = (0, _utils.parseFoldersToGlobs)(options.files, options.extensions);
    const exclude = (0, _utils.parseFoldersToGlobs)(this.options.exclude ? options.exclude : '**/node_modules/**', []);
    compiler.hooks.thisCompilation.tap(this.key, compilation => {
      /** @type {import('./linter').Linter} */
      let lint;
      /** @type {import('./linter').Reporter} */

      let report;
      /** @type number */

      let threads;

      try {
        ({
          lint,
          report,
          threads
        } = (0, _linter.default)(this.key, options, compilation));
      } catch (e) {
        compilation.errors.push(e);
        return;
      }
      /** @type {string[]} */


      const files = []; // @ts-ignore
      // Add the file to be linted

      compilation.hooks.succeedModule.tap(this.key, ({
        resource
      }) => {
        if (resource) {
          const [file] = resource.split('?');

          if (file && !files.includes(file) && (0, _micromatch.isMatch)(file, wanted, {
            dot: true
          }) && !(0, _micromatch.isMatch)(file, exclude, {
            dot: true
          })) {
            files.push(file);

            if (threads > 1) {
              lint(file);
            }
          }
        }
      }); // Lint all files added

      compilation.hooks.finishModules.tap(this.key, () => {
        if (files.length > 0 && threads <= 1) {
          lint(files);
        }
      }); // await and interpret results

      compilation.hooks.additionalAssets.tapPromise(this.key, processResults);

      async function processResults() {
        const {
          errors,
          warnings,
          generateReportAsset
        } = await report();

        if (warnings && !options.failOnWarning) {
          // @ts-ignore
          compilation.warnings.push(warnings);
        } else if (warnings && options.failOnWarning) {
          // @ts-ignore
          compilation.errors.push(warnings);
        }

        if (errors && options.failOnError) {
          // @ts-ignore
          compilation.errors.push(errors);
        } else if (errors && !options.failOnError) {
          // @ts-ignore
          compilation.warnings.push(errors);
        }

        if (generateReportAsset) {
          await generateReportAsset(compilation);
        }
      }
    });
  }
  /**
   *
   * @param {Compiler} compiler
   * @returns {string}
   */


  getContext(compiler) {
    if (!this.options.context) {
      return String(compiler.options.context);
    }

    if (!(0, _path.isAbsolute)(this.options.context)) {
      return (0, _path.join)(String(compiler.options.context), this.options.context);
    }

    return this.options.context;
  }

}

var _default = ESLintWebpackPlugin;
exports.default = _default;
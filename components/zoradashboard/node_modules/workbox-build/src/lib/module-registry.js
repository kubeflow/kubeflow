/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const ol = require('common-tags').oneLine;
const upath = require('upath');

/**
 * Class for keeping track of which Workbox modules are used by the generated
 * service worker script.
 *
 * @private
 */
class ModuleRegistry {
  /**
   * @private
   */
  constructor() {
    this.modulesUsed = new Map();
  }

  /**
   * @return {Array<string>} A list of all of the import statements that are
   * needed for the modules being used.
   * @private
   */
  getImportStatements() {
    const workboxModuleImports = [];

    for (const [localName, {moduleName, pkg}] of this.modulesUsed) {
      // By default require.resolve returns the resolved path of the 'main'
      // field, which might be deeper than the package root. To work around
      // this, we can find the package's root by resolving its package.json and
      // strip the '/package.json' from the resolved path.
      const pkgJsonPath = require.resolve(`${pkg}/package.json`);
      const pkgRoot = upath.dirname(pkgJsonPath);
      const importStatement = ol`import {${moduleName} as ${localName}} from
        '${pkgRoot}/${moduleName}.mjs';`;

      workboxModuleImports.push(importStatement);
    }

    return workboxModuleImports;
  }

  /**
   * @param {string} pkg The workbox package that the module belongs to.
   * @param {string} moduleName The name of the module to import.
   * @return {string} The local variable name that corresponds to that module.
   * @private
   */
  getLocalName(pkg, moduleName) {
    return `${pkg.replace(/-/g, '_')}_${moduleName}`;
  }

  /**
   * @param {string} pkg The workbox package that the module belongs to.
   * @param {string} moduleName The name of the module to import.
   * @return {string} The local variable name that corresponds to that module.
   * @private
   */
  use(pkg, moduleName) {
    const localName = this.getLocalName(pkg, moduleName);
    this.modulesUsed.set(localName, {moduleName, pkg});

    return localName;
  }
}

module.exports = ModuleRegistry;

'use strict';

var fs   = require('fs'),
    path = require('path');

var cache;

/**
 * Perform <code>path.relative()</code> but try to detect and correct sym-linked node modules.
 * @param {string} from The base path
 * @param {string} to The full path
 */
function enhancedRelative(from, to) {

  // relative path
  var relative = path.relative(from, to);

  // trailing is the relative path portion without any '../'
  var trailing = relative.replace(/^\.{2}[\\\/]/, ''),
      leading  = to.replace(trailing, '');

  // within project is what we want
  var isInProject = (relative === trailing);
  if (isInProject) {
    return relative;
  }
  // otherwise look at symbolic linked modules
  else {
    var splitTrailing = trailing.split(/[\\\/]/);

    // ensure failures can retry with fresh cache
    for (var i = cache ? 2 : 1, foundPath = false; (i > 0) && !foundPath; i--) {

      // ensure cache
      cache = cache || indexLinkedModules(from);

      // take elements from the trailing path and append them the the leading path in an attempt to find a package.json
      for (var j = 0; (j < splitTrailing.length) && !foundPath; j++) {

        // find the name of packages in the actual file location
        //  start at the lowest concrete directory that appears in the relative path
        var packagePath     = path.join.apply(path, [leading].concat(splitTrailing.slice(0, j + 1))),
            packageJsonPath = path.join(packagePath, 'package.json'),
            packageName     = fs.existsSync(packageJsonPath) && require(packageJsonPath).name;

        // lookup any package name in the cache
        var linkedPackagePath = !!packageName && cache[packageName];
        if (linkedPackagePath) {

          // the remaining portion of the trailing path, not including the package path
          var remainingPath = path.join.apply(path, splitTrailing.slice(j + 1));

          // validate the remaining path in the linked location
          //  failure implies we will keep trying nested sym-linked packages
          var linkedFilePath = path.join(linkedPackagePath, remainingPath),
              isValid        = !!linkedFilePath && fs.existsSync(linkedFilePath) &&
                fs.statSync(linkedFilePath).isFile();

          // path is found where valid
          foundPath = isValid && linkedFilePath;
        }
      }

      // cache cannot be trusted if a file can't be found
      //  set the cache to false to trigger its rebuild
      cache = !!foundPath && cache;
    }

    // the relative path should now be within the project
    return foundPath ? path.relative(from, foundPath) : relative;
  }
}

module.exports = enhancedRelative;

/**
 * Make a hash of linked modules within the given directory by breadth-first search.
 * @param {string} directory A path to start searching
 * @returns {object} A collection of sym-linked paths within the project keyed by their package name
 */
function indexLinkedModules(directory) {
  var buffer = listSymLinkedModules(directory),
      hash   = {};

  // while there are items in the buffer
  while (buffer.length > 0) {
    var modulePath      = buffer.shift(),
        packageJsonPath = path.join(modulePath, 'package.json'),
        packageName     = fs.existsSync(packageJsonPath) && require(packageJsonPath).name;
    if (packageName) {

      // add this path keyed by package name, so long as it doesn't exist at a lower level
      hash[packageName] = hash[packageName] || modulePath;

      // detect nested module and push to the buffer (breadth-first)
      buffer.push.apply(buffer, listSymLinkedModules(modulePath));
    }
  }
  return hash;

  function listSymLinkedModules(directory) {
    var modulesPath    = path.join(directory, 'node_modules'),
        hasNodeModules = fs.existsSync(modulesPath) && fs.statSync(modulesPath).isDirectory(),
        subdirectories = !!hasNodeModules && fs.readdirSync(modulesPath) || [];

    return subdirectories
      .map(joinDirectory)
      .filter(testIsSymLink);

    function joinDirectory(subdirectory) {
      return path.join(modulesPath, subdirectory);
    }

    function testIsSymLink(directory) {
      return fs.lstatSync(directory).isSymbolicLink();  // must use lstatSync not statSync
    }
  }
}
/**
 * @fileoverview Utility functions for React and Flow version configuration
 * @author Yannick Croissant
 */

'use strict';

const fs = require('fs');
const resolve = require('resolve');
const path = require('path');
const error = require('./error');

let warnedForMissingVersion = false;

function resetWarningFlag() {
  warnedForMissingVersion = false;
}

let cachedDetectedReactVersion;

function resetDetectedVersion() {
  cachedDetectedReactVersion = undefined;
}

function resolveBasedir(contextOrFilename) {
  if (contextOrFilename) {
    const filename = typeof contextOrFilename === 'string' ? contextOrFilename : contextOrFilename.getFilename();
    const dirname = path.dirname(filename);
    try {
      if (fs.statSync(filename).isFile()) {
        // dirname must be dir here
        return dirname;
      }
    } catch (err) {
      // https://github.com/eslint/eslint/issues/11989
      if (err.code === 'ENOTDIR') {
        // virtual filename could be recursive
        return resolveBasedir(dirname);
      }
    }
  }
  return process.cwd();
}

// TODO, semver-major: remove context fallback
function detectReactVersion(context) {
  if (cachedDetectedReactVersion) {
    return cachedDetectedReactVersion;
  }

  const basedir = resolveBasedir(context);

  try {
    const reactPath = resolve.sync('react', {basedir});
    const react = require(reactPath); // eslint-disable-line global-require, import/no-dynamic-require
    cachedDetectedReactVersion = react.version;
    return cachedDetectedReactVersion;
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      if (!warnedForMissingVersion) {
        error('Warning: React version was set to "detect" in eslint-plugin-react settings, '
        + 'but the "react" package is not installed. Assuming latest React version for linting.');
        warnedForMissingVersion = true;
      }
      cachedDetectedReactVersion = '999.999.999';
      return cachedDetectedReactVersion;
    }
    throw e;
  }
}

function getReactVersionFromContext(context) {
  let confVer = '999.999.999';
  // .eslintrc shared settings (http://eslint.org/docs/user-guide/configuring#adding-shared-settings)
  if (context.settings && context.settings.react && context.settings.react.version) {
    let settingsVersion = context.settings.react.version;
    if (settingsVersion === 'detect') {
      settingsVersion = detectReactVersion(context);
    }
    if (typeof settingsVersion !== 'string') {
      error('Warning: React version specified in eslint-plugin-react-settings must be a string; '
        + `got “${typeof settingsVersion}”`);
    }
    confVer = String(settingsVersion);
  } else if (!warnedForMissingVersion) {
    error('Warning: React version not specified in eslint-plugin-react settings. '
      + 'See https://github.com/yannickcr/eslint-plugin-react#configuration .');
    warnedForMissingVersion = true;
  }
  confVer = /^[0-9]+\.[0-9]+$/.test(confVer) ? `${confVer}.0` : confVer;
  return confVer.split('.').map((part) => Number(part));
}

// TODO, semver-major: remove context fallback
function detectFlowVersion(context) {
  const basedir = resolveBasedir(context);

  try {
    const flowPackageJsonPath = resolve.sync('flow-bin/package.json', {basedir});
    const flowPackageJson = require(flowPackageJsonPath); // eslint-disable-line global-require, import/no-dynamic-require
    return flowPackageJson.version;
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      error('Warning: Flow version was set to "detect" in eslint-plugin-react settings, '
        + 'but the "flow-bin" package is not installed. Assuming latest Flow version for linting.');
      return '999.999.999';
    }
    throw e;
  }
}

function getFlowVersionFromContext(context) {
  let confVer = '999.999.999';
  // .eslintrc shared settings (http://eslint.org/docs/user-guide/configuring#adding-shared-settings)
  if (context.settings.react && context.settings.react.flowVersion) {
    let flowVersion = context.settings.react.flowVersion;
    if (flowVersion === 'detect') {
      flowVersion = detectFlowVersion(context);
    }
    if (typeof flowVersion !== 'string') {
      error('Warning: Flow version specified in eslint-plugin-react-settings must be a string; '
        + `got “${typeof flowVersion}”`);
    }
    confVer = String(flowVersion);
  } else {
    throw 'Could not retrieve flowVersion from settings'; // eslint-disable-line no-throw-literal
  }
  confVer = /^[0-9]+\.[0-9]+$/.test(confVer) ? `${confVer}.0` : confVer;
  return confVer.split('.').map((part) => Number(part));
}

function normalizeParts(parts) {
  return Array.from({length: 3}, (_, i) => (parts[i] || 0));
}

function test(context, methodVer, confVer) {
  const methodVers = normalizeParts(String(methodVer || '').split('.').map((part) => Number(part)));
  const confVers = normalizeParts(confVer);
  const higherMajor = methodVers[0] < confVers[0];
  const higherMinor = methodVers[0] === confVers[0] && methodVers[1] < confVers[1];
  const higherOrEqualPatch = methodVers[0] === confVers[0]
    && methodVers[1] === confVers[1]
    && methodVers[2] <= confVers[2];

  return higherMajor || higherMinor || higherOrEqualPatch;
}

function testReactVersion(context, methodVer) {
  return test(context, methodVer, getReactVersionFromContext(context));
}

function testFlowVersion(context, methodVer) {
  return test(context, methodVer, getFlowVersionFromContext(context));
}

module.exports = {
  testReactVersion,
  testFlowVersion,
  resetWarningFlag,
  resetDetectedVersion
};

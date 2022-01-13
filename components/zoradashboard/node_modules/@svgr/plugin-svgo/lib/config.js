"use strict";

exports.__esModule = true;
exports.getFilePath = getFilePath;
exports.getBaseSvgoConfig = getBaseSvgoConfig;
exports.getPlugins = getPlugins;
exports.mergeSvgoConfig = mergeSvgoConfig;

var _deepmerge = _interopRequireDefault(require("deepmerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFilePath(state) {
  return state.filePath || process.cwd();
}

function getBaseSvgoConfig(config) {
  const baseSvgoConfig = {
    plugins: [{
      prefixIds: true
    }]
  };

  if (config.icon || config.dimensions === false) {
    baseSvgoConfig.plugins.push({
      removeViewBox: false
    });
  }

  return baseSvgoConfig;
}

function getPlugins(config) {
  if (!config || !config.plugins) {
    return [];
  }

  if (!Array.isArray(config.plugins)) {
    throw Error('`svgoConfig.plugins` must be an array');
  }

  return config.plugins;
}

function extractPlugins(config) {
  if (!config) return [];
  if (!config.plugins) return [];
  if (!Array.isArray(config.plugins)) return [config.plugins];
  return config.plugins;
}

function mergePlugins(configs) {
  const plugins = configs.reduce((merged, config) => _deepmerge.default.all([merged, ...extractPlugins(config)]), {});
  return Object.keys(plugins).reduce((array, key) => {
    array.push({
      [key]: plugins[key]
    });
    return array;
  }, []);
}

function mergeSvgoConfig(...configs) {
  const plugins = mergePlugins(configs);
  return { ..._deepmerge.default.all(configs.filter(Boolean)),
    plugins
  };
}
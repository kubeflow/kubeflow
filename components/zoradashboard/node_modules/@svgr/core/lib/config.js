"use strict";

exports.__esModule = true;
exports.resolveConfig = resolveConfig;
exports.resolveConfigFile = resolveConfigFile;
exports.loadConfig = loadConfig;
exports.DEFAULT_CONFIG = void 0;

var _cosmiconfig = require("cosmiconfig");

const DEFAULT_CONFIG = {
  dimensions: true,
  expandProps: 'end',
  icon: false,
  native: false,
  typescript: false,
  prettier: true,
  prettierConfig: null,
  memo: false,
  ref: false,
  replaceAttrValues: null,
  svgProps: null,
  svgo: true,
  svgoConfig: null,
  template: null,
  titleProp: false,
  runtimeConfig: true,
  plugins: null,
  namedExport: 'ReactComponent'
};
exports.DEFAULT_CONFIG = DEFAULT_CONFIG;
const explorer = (0, _cosmiconfig.cosmiconfig)('svgr', {
  sync: true,
  cache: true,
  rcExtensions: true
});
const explorerSync = (0, _cosmiconfig.cosmiconfigSync)('svgr', {
  sync: true,
  cache: true,
  rcExtensions: true
});

async function resolveConfig(searchFrom, configFile) {
  if (configFile == null) {
    const result = await explorer.search(searchFrom);
    return result ? result.config : null;
  }

  const result = await explorer.load(configFile);
  return result ? result.config : null;
}

resolveConfig.sync = (searchFrom, configFile) => {
  if (configFile == null) {
    const result = explorerSync.search(searchFrom);
    return result ? result.config : null;
  }

  const result = explorerSync.load(configFile);
  return result ? result.config : null;
};

async function resolveConfigFile(filePath) {
  const result = await explorer.search(filePath);
  return result ? result.filepath : null;
}

resolveConfigFile.sync = filePath => {
  const result = explorerSync.search(filePath);
  return result ? result.filepath : null;
};

async function loadConfig({
  configFile,
  ...baseConfig
}, state = {}) {
  const rcConfig = state.filePath && baseConfig.runtimeConfig !== false ? await resolveConfig(state.filePath, configFile) : {};
  return { ...DEFAULT_CONFIG,
    ...rcConfig,
    ...baseConfig
  };
}

loadConfig.sync = ({
  configFile,
  ...baseConfig
}, state = {}) => {
  const rcConfig = state.filePath && baseConfig.runtimeConfig !== false ? resolveConfig.sync(state.filePath, configFile) : {};
  return { ...DEFAULT_CONFIG,
    ...rcConfig,
    ...baseConfig
  };
};
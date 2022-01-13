/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const ol = require('common-tags').oneLine;

const errors = require('./errors');
const stringifyWithoutComments = require('./stringify-without-comments');

/**
 * Given a set of options that configures runtime caching behavior, convert it
 * to the equivalent Workbox method calls.
 *
 * @param {ModuleRegistry} moduleRegistry
 * @param {Object} options See
 *        https://developers.google.com/web/tools/workbox/modules/workbox-build#generateSW-runtimeCaching
 * @return {string} A JSON string representing the equivalent options.
 *
 * @private
 */
function getOptionsString(moduleRegistry, options = {}) {
  let plugins = [];
  if (options.plugins) {
    // Using libs because JSON.stringify won't handle functions.
    plugins = options.plugins.map(stringifyWithoutComments);
    delete options.plugins;
  }

  // Pull handler-specific config from the options object, since they are
  // not directly used to construct a plugin instance. If set, need to be
  // passed as options to the handler constructor instead.
  const handlerOptionKeys = [
    'cacheName',
    'networkTimeoutSeconds',
    'fetchOptions',
    'matchOptions',
  ];
  const handlerOptions = {};
  for (const key of handlerOptionKeys) {
    if (key in options) {
      handlerOptions[key] = options[key];
      delete options[key];
    }
  }

  for (const [pluginName, pluginConfig] of Object.entries(options)) {
    // Ensure that we have some valid configuration to pass to the plugin.
    if (Object.keys(pluginConfig).length === 0) {
      continue;
    }

    let pluginCode;
    switch (pluginName) {
      case 'backgroundSync': {
        const name = pluginConfig.name;
        const plugin = moduleRegistry.use(
            'workbox-background-sync', 'BackgroundSyncPlugin');

        pluginCode = `new ${plugin}(${JSON.stringify(name)}`;
        if ('options' in pluginConfig) {
          pluginCode += `, ${stringifyWithoutComments(pluginConfig.options)}`;
        }
        pluginCode += `)`;

        break;
      }

      case 'broadcastUpdate': {
        const channelName = pluginConfig.channelName;
        const opts = Object.assign({channelName}, pluginConfig.options);
        const plugin = moduleRegistry.use(
            'workbox-broadcast-update', 'BroadcastUpdatePlugin');

        pluginCode = `new ${plugin}(${stringifyWithoutComments(opts)})`;

        break;
      }

      case 'cacheableResponse': {
        const plugin = moduleRegistry.use(
            'workbox-cacheable-response', 'CacheableResponsePlugin');

        pluginCode = `new ${plugin}(${stringifyWithoutComments(pluginConfig)})`;

        break;
      }

      case 'expiration': {
        const plugin = moduleRegistry.use(
            'workbox-expiration', 'ExpirationPlugin');

        pluginCode = `new ${plugin}(${stringifyWithoutComments(pluginConfig)})`;

        break;
      }

      default: {
        throw new Error(errors['bad-runtime-caching-config'] + pluginName);
      }
    }

    plugins.push(pluginCode);
  }

  if (Object.keys(handlerOptions).length > 0 || plugins.length > 0) {
    const optionsString = JSON.stringify(handlerOptions).slice(1, -1);
    return ol`{
      ${optionsString ? optionsString + ',' : ''}
      plugins: [${plugins.join(', ')}]
    }`;
  } else {
    return '';
  }
}

module.exports = (moduleRegistry, runtimeCaching) => {
  return runtimeCaching.map((entry) => {
    const method = entry.method || 'GET';

    if (!entry.urlPattern) {
      throw new Error(errors['urlPattern-is-required']);
    }

    if (!entry.handler) {
      throw new Error(errors['handler-is-required']);
    }

    // This validation logic is a bit too gnarly for joi, so it's manually
    // implemented here.
    if (entry.options && entry.options.networkTimeoutSeconds &&
        entry.handler !== 'NetworkFirst') {
      throw new Error(errors['invalid-network-timeout-seconds']);
    }

    // urlPattern might be a string, a RegExp object, or a function.
    // If it's a string, it needs to be quoted.
    const matcher = typeof entry.urlPattern === 'string' ?
      JSON.stringify(entry.urlPattern) :
      entry.urlPattern;

    const registerRoute = moduleRegistry.use(
        'workbox-routing', 'registerRoute');
    if (typeof entry.handler === 'string') {
      const optionsString = getOptionsString(moduleRegistry, entry.options);
      const handler = moduleRegistry.use('workbox-strategies', entry.handler);
      const strategyString = `new ${handler}(${optionsString})`;

      return `${registerRoute}(${matcher}, ${strategyString}, '${method}');\n`;
    } else if (typeof entry.handler === 'function') {
      return `${registerRoute}(${matcher}, ${entry.handler}, '${method}');\n`;
    }
  }).filter((entry) => Boolean(entry)); // Remove undefined map() return values.
};

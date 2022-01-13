/*
 * MIT License http://opensource.org/licenses/MIT
 * Author: Ben Holloway @bholloway
 */
'use strict';

module.exports = Object.assign(require('./lib/loader'), {
  moduleFilenameTemplate: require('./lib/module-filename-template'),
  codec                 : require('./codec')
});
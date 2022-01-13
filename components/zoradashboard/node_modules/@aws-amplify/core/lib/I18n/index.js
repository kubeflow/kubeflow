"use strict";
/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var I18n_1 = require("./I18n");
var Logger_1 = require("../Logger");
var Amplify_1 = require("../Amplify");
var logger = new Logger_1.ConsoleLogger('I18n');
var _config = null;
var _i18n = null;
/**
 * Export I18n APIs
 */
var I18n = /** @class */ (function () {
    function I18n() {
    }
    /**
     * @static
     * @method
     * Configure I18n part
     * @param {Object} config - Configuration of the I18n
     */
    I18n.configure = function (config) {
        logger.debug('configure I18n');
        if (!config) {
            return _config;
        }
        _config = Object.assign({}, _config, config.I18n || config);
        I18n.createInstance();
        return _config;
    };
    I18n.getModuleName = function () {
        return 'I18n';
    };
    /**
     * @static
     * @method
     * Create an instance of I18n for the library
     */
    I18n.createInstance = function () {
        logger.debug('create I18n instance');
        if (_i18n) {
            return;
        }
        _i18n = new I18n_1.I18n(_config);
    };
    /**
     * @static @method
     * Explicitly setting language
     * @param {String} lang
     */
    I18n.setLanguage = function (lang) {
        I18n.checkConfig();
        return _i18n.setLanguage(lang);
    };
    /**
     * @static @method
     * Get value
     * @param {String} key
     * @param {String} defVal - Default value
     */
    I18n.get = function (key, defVal) {
        if (!I18n.checkConfig()) {
            return typeof defVal === 'undefined' ? key : defVal;
        }
        return _i18n.get(key, defVal);
    };
    /**
     * @static
     * @method
     * Add vocabularies for one language
     * @param {String} langurage - Language of the dictionary
     * @param {Object} vocabularies - Object that has key-value as dictionary entry
     */
    I18n.putVocabulariesForLanguage = function (language, vocabularies) {
        I18n.checkConfig();
        return _i18n.putVocabulariesForLanguage(language, vocabularies);
    };
    /**
     * @static
     * @method
     * Add vocabularies for one language
     * @param {Object} vocabularies - Object that has language as key,
     *                                vocabularies of each language as value
     */
    I18n.putVocabularies = function (vocabularies) {
        I18n.checkConfig();
        return _i18n.putVocabularies(vocabularies);
    };
    I18n.checkConfig = function () {
        if (!_i18n) {
            _i18n = new I18n_1.I18n(_config);
        }
        return true;
    };
    return I18n;
}());
exports.I18n = I18n;
Amplify_1.Amplify.register(I18n);
/**
 * @deprecated use named import
 */
exports.default = I18n;
//# sourceMappingURL=index.js.map
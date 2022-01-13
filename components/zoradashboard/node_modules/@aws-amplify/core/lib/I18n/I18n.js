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
var Logger_1 = require("../Logger");
var logger = new Logger_1.ConsoleLogger('I18n');
/**
 * Language transition class
 */
var I18n = /** @class */ (function () {
    /**
     * @constructor
     * Initialize with configurations
     * @param {Object} options
     */
    function I18n(options) {
        /**
         * @private
         */
        this._options = null;
        /**
         * @private
         */
        this._lang = null;
        /**
         * @private
         */
        this._dict = {};
        this._options = Object.assign({}, options);
        this._lang = this._options.language;
        if (!this._lang &&
            typeof window !== 'undefined' &&
            window &&
            window.navigator) {
            this._lang = window.navigator.language;
        }
        logger.debug(this._lang);
    }
    /**
     * @method
     * Explicitly setting language
     * @param {String} lang
     */
    I18n.prototype.setLanguage = function (lang) {
        this._lang = lang;
    };
    /**
     * @method
     * Get value
     * @param {String} key
     * @param {String} defVal - Default value
     */
    I18n.prototype.get = function (key, defVal) {
        if (defVal === void 0) { defVal = undefined; }
        if (!this._lang) {
            return typeof defVal !== 'undefined' ? defVal : key;
        }
        var lang = this._lang;
        var val = this.getByLanguage(key, lang);
        if (val) {
            return val;
        }
        if (lang.indexOf('-') > 0) {
            val = this.getByLanguage(key, lang.split('-')[0]);
        }
        if (val) {
            return val;
        }
        return typeof defVal !== 'undefined' ? defVal : key;
    };
    /**
     * @method
     * Get value according to specified language
     * @param {String} key
     * @param {String} language - Specified langurage to be used
     * @param {String} defVal - Default value
     */
    I18n.prototype.getByLanguage = function (key, language, defVal) {
        if (defVal === void 0) { defVal = null; }
        if (!language) {
            return defVal;
        }
        var lang_dict = this._dict[language];
        if (!lang_dict) {
            return defVal;
        }
        return lang_dict[key];
    };
    /**
     * @method
     * Add vocabularies for one language
     * @param {String} language - Language of the dictionary
     * @param {Object} vocabularies - Object that has key-value as dictionary entry
     */
    I18n.prototype.putVocabulariesForLanguage = function (language, vocabularies) {
        var lang_dict = this._dict[language];
        if (!lang_dict) {
            lang_dict = this._dict[language] = {};
        }
        Object.assign(lang_dict, vocabularies);
    };
    /**
     * @method
     * Add vocabularies for one language
     * @param {Object} vocabularies - Object that has language as key,
     *                                vocabularies of each language as value
     */
    I18n.prototype.putVocabularies = function (vocabularies) {
        var _this = this;
        Object.keys(vocabularies).map(function (key) {
            _this.putVocabulariesForLanguage(key, vocabularies[key]);
        });
    };
    return I18n;
}());
exports.I18n = I18n;
//# sourceMappingURL=I18n.js.map
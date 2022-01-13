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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { MethodEmbed } from '../utils/MethodEmbed';
import { ConsoleLogger as Logger, JS } from '@aws-amplify/core';
var logger = new Logger('PageViewTracker');
var PREV_URL_KEY = 'aws-amplify-analytics-prevUrl';
var getUrl = function () {
    if (!JS.browserOrNode().isBrowser)
        return '';
    else
        return window.location.origin + window.location.pathname;
};
var defaultOpts = {
    enable: false,
    provider: 'AWSPinpoint',
    getUrl: getUrl,
};
var PageViewTracker = /** @class */ (function () {
    function PageViewTracker(tracker, opts) {
        logger.debug('initialize pageview tracker with opts', opts);
        this._config = Object.assign({}, defaultOpts, opts);
        this._tracker = tracker;
        this._hasEnabled = false;
        this._trackFunc = this._trackFunc.bind(this);
        if (this._config.type === 'SPA') {
            this._pageViewTrackSPA();
        }
        else {
            this._pageViewTrackDefault();
        }
    }
    PageViewTracker.prototype.configure = function (opts) {
        Object.assign(this._config, opts);
        // if spa, need to remove those listeners if disabled
        if (this._config.type === 'SPA') {
            this._pageViewTrackSPA();
        }
        return this._config;
    };
    PageViewTracker.prototype._isSameUrl = function () {
        var prevUrl = sessionStorage.getItem(PREV_URL_KEY);
        var curUrl = this._config.getUrl();
        if (prevUrl === curUrl) {
            logger.debug('the url is same');
            return true;
        }
        else
            return false;
    };
    PageViewTracker.prototype._pageViewTrackDefault = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, customAttrs, _a, attributes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!JS.browserOrNode().isBrowser ||
                            !window.addEventListener ||
                            !window.sessionStorage) {
                            logger.debug('not in the supported web enviroment');
                            return [2 /*return*/];
                        }
                        url = this._config.getUrl();
                        if (!(typeof this._config.attributes === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._config.attributes()];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = this._config.attributes;
                        _b.label = 3;
                    case 3:
                        customAttrs = _a;
                        attributes = Object.assign({
                            url: url,
                        }, customAttrs);
                        if (this._config.enable && !this._isSameUrl()) {
                            this._tracker({
                                name: this._config.eventName || 'pageView',
                                attributes: attributes,
                            }, this._config.provider).catch(function (e) {
                                logger.debug('Failed to record the page view event', e);
                            });
                            sessionStorage.setItem(PREV_URL_KEY, url);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PageViewTracker.prototype._trackFunc = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, customAttrs, _a, attributes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!JS.browserOrNode().isBrowser ||
                            !window.addEventListener ||
                            !history.pushState ||
                            !window.sessionStorage) {
                            logger.debug('not in the supported web enviroment');
                            return [2 /*return*/];
                        }
                        url = this._config.getUrl();
                        if (!(typeof this._config.attributes === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._config.attributes()];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = this._config.attributes;
                        _b.label = 3;
                    case 3:
                        customAttrs = _a;
                        attributes = Object.assign({
                            url: url,
                        }, customAttrs);
                        if (!this._isSameUrl()) {
                            this._tracker({
                                name: this._config.eventName || 'pageView',
                                attributes: attributes,
                            }, this._config.provider).catch(function (e) {
                                logger.debug('Failed to record the page view event', e);
                            });
                            sessionStorage.setItem(PREV_URL_KEY, url);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PageViewTracker.prototype._pageViewTrackSPA = function () {
        if (!JS.browserOrNode().isBrowser ||
            !window.addEventListener ||
            !history.pushState) {
            logger.debug('not in the supported web enviroment');
            return;
        }
        if (this._config.enable && !this._hasEnabled) {
            MethodEmbed.add(history, 'pushState', this._trackFunc);
            MethodEmbed.add(history, 'replaceState', this._trackFunc);
            window.addEventListener('popstate', this._trackFunc);
            this._trackFunc();
            this._hasEnabled = true;
        }
        else {
            MethodEmbed.remove(history, 'pushState');
            MethodEmbed.remove(history, 'replaceState');
            window.removeEventListener('popstate', this._trackFunc);
            this._hasEnabled = false;
        }
    };
    return PageViewTracker;
}());
export { PageViewTracker };
/**
 * @deprecated use named import
 */
export default PageViewTracker;
//# sourceMappingURL=PageViewTracker.js.map
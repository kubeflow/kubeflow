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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
/*
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
import { Amplify, ConsoleLogger as Logger } from '@aws-amplify/core';
import { SumerianProvider } from './Providers/SumerianProvider';
import { XRProviderNotConfigured } from './Errors';
var logger = new Logger('XR');
var DEFAULT_PROVIDER_NAME = 'SumerianProvider';
var XRClass = /** @class */ (function () {
    /**
     * Initialize XR with AWS configurations
     *
     * @param {XROptions} options - Configuration object for XR
     */
    function XRClass(options) {
        this._options = options;
        logger.debug('XR Options', this._options);
        this._defaultProvider = DEFAULT_PROVIDER_NAME;
        this._pluggables = {};
        // Add default provider
        this.addPluggable(new SumerianProvider());
    }
    /**
     * Configure XR part with configurations
     *
     * @param {XROptions} config - Configuration for XR
     * @return {Object} - The current configuration
     */
    XRClass.prototype.configure = function (options) {
        var _this = this;
        var opt = options ? options.XR || options : {};
        logger.debug('configure XR', { opt: opt });
        this._options = Object.assign({}, this._options, opt);
        Object.entries(this._pluggables).map(function (_a) {
            var _b = __read(_a, 2), name = _b[0], provider = _b[1];
            if (name === _this._defaultProvider && !opt[_this._defaultProvider]) {
                provider.configure(_this._options);
            }
            else {
                provider.configure(_this._options[name]);
            }
        });
        return this._options;
    };
    /**
     * add plugin into XR category
     * @param {Object} pluggable - an instance of the plugin
     */
    XRClass.prototype.addPluggable = function (pluggable) {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                if (pluggable && pluggable.getCategory() === 'XR') {
                    this._pluggables[pluggable.getProviderName()] = pluggable;
                    config = pluggable.configure(this._options);
                    return [2 /*return*/, config];
                }
                return [2 /*return*/];
            });
        });
    };
    XRClass.prototype.loadScene = function (sceneName, domElementId, sceneOptions, provider) {
        if (sceneOptions === void 0) { sceneOptions = {}; }
        if (provider === void 0) { provider = this._defaultProvider; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._pluggables[provider])
                            throw new XRProviderNotConfigured("Provider '" + provider + "' not configured");
                        return [4 /*yield*/, this._pluggables[provider].loadScene(sceneName, domElementId, sceneOptions)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    XRClass.prototype.isSceneLoaded = function (sceneName, provider) {
        if (provider === void 0) { provider = this._defaultProvider; }
        if (!this._pluggables[provider])
            throw new XRProviderNotConfigured("Provider '" + provider + "' not configured");
        return this._pluggables[provider].isSceneLoaded(sceneName);
    };
    XRClass.prototype.getSceneController = function (sceneName, provider) {
        if (provider === void 0) { provider = this._defaultProvider; }
        if (!this._pluggables[provider])
            throw new XRProviderNotConfigured("Provider '" + provider + "' not configured");
        return this._pluggables[provider].getSceneController(sceneName);
    };
    XRClass.prototype.isVRCapable = function (sceneName, provider) {
        if (provider === void 0) { provider = this._defaultProvider; }
        if (!this._pluggables[provider])
            throw new XRProviderNotConfigured("Provider '" + provider + "' not configured");
        return this._pluggables[provider].isVRCapable(sceneName);
    };
    XRClass.prototype.isVRPresentationActive = function (sceneName, provider) {
        if (provider === void 0) { provider = this._defaultProvider; }
        if (!this._pluggables[provider])
            throw new XRProviderNotConfigured("Provider '" + provider + "' not configured");
        return this._pluggables[provider].isVRPresentationActive(sceneName);
    };
    XRClass.prototype.start = function (sceneName, provider) {
        if (provider === void 0) { provider = this._defaultProvider; }
        if (!this._pluggables[provider])
            throw new XRProviderNotConfigured("Provider '" + provider + "' not configured");
        return this._pluggables[provider].start(sceneName);
    };
    XRClass.prototype.enterVR = function (sceneName, provider) {
        if (provider === void 0) { provider = this._defaultProvider; }
        if (!this._pluggables[provider])
            throw new XRProviderNotConfigured("Provider '" + provider + "' not configured");
        return this._pluggables[provider].enterVR(sceneName);
    };
    XRClass.prototype.exitVR = function (sceneName, provider) {
        if (provider === void 0) { provider = this._defaultProvider; }
        if (!this._pluggables[provider])
            throw new XRProviderNotConfigured("Provider '" + provider + "' not configured");
        return this._pluggables[provider].exitVR(sceneName);
    };
    XRClass.prototype.isMuted = function (sceneName, provider) {
        if (provider === void 0) { provider = this._defaultProvider; }
        if (!this._pluggables[provider])
            throw new XRProviderNotConfigured("Provider '" + provider + "' not configured");
        return this._pluggables[provider].isMuted(sceneName);
    };
    XRClass.prototype.setMuted = function (sceneName, muted, provider) {
        if (provider === void 0) { provider = this._defaultProvider; }
        if (!this._pluggables[provider])
            throw new XRProviderNotConfigured("Provider '" + provider + "' not configured");
        return this._pluggables[provider].setMuted(sceneName, muted);
    };
    XRClass.prototype.onSceneEvent = function (sceneName, eventName, eventHandler, provider) {
        if (provider === void 0) { provider = this._defaultProvider; }
        if (!this._pluggables[provider])
            throw new XRProviderNotConfigured("Provider '" + provider + "' not configured");
        return this._pluggables[provider].onSceneEvent(sceneName, eventName, eventHandler);
    };
    XRClass.prototype.enableAudio = function (sceneName, provider) {
        if (provider === void 0) { provider = this._defaultProvider; }
        if (!this._pluggables[provider])
            throw new XRProviderNotConfigured("Provider '" + provider + "' not configured");
        return this._pluggables[provider].enableAudio(sceneName);
    };
    return XRClass;
}());
export { XRClass };
export var XR = new XRClass(null);
Amplify.register(XR);
//# sourceMappingURL=XR.js.map
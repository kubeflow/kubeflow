var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
import { ConsoleLogger as Logger, Signer, Credentials, Constants, } from '@aws-amplify/core';
import { AbstractXRProvider } from './XRProvider';
import { XRNoSceneConfiguredError, XRSceneNotFoundError, XRSceneNotLoadedError, XRNoDomElement, XRSceneLoadFailure, } from '../Errors';
var SUMERIAN_SERVICE_NAME = 'sumerian';
var logger = new Logger('SumerianProvider');
var SumerianProvider = /** @class */ (function (_super) {
    __extends(SumerianProvider, _super);
    function SumerianProvider(options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, options) || this;
    }
    SumerianProvider.prototype.getProviderName = function () {
        return 'SumerianProvider';
    };
    SumerianProvider.prototype.loadScript = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var scriptElement = document.createElement('script');
                        scriptElement.src = url;
                        scriptElement.addEventListener('load', function (event) {
                            resolve();
                        });
                        scriptElement.addEventListener('error', function (event) {
                            reject(new Error("Failed to load script: " + url));
                        });
                        document.head.appendChild(scriptElement);
                    })];
            });
        });
    };
    SumerianProvider.prototype.loadScene = function (sceneName, domElementId, sceneOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var errorMsg, errorMsg, element, errorMsg, scene, errorMsg, sceneUrl, sceneId, sceneRegion, errorMsg, awsSDKConfigOverride, fetchOptions, url, credentials, accessInfo, serviceInfo, request, e_1, apiResponse, apiResponseJson, sceneBundleData, sceneBundle, sceneBundleJson, error_1, progressCallback, publishParamOverrides, sceneLoadParams, sceneController, _a, _b, warning;
            var e_2, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!sceneName) {
                            errorMsg = 'No scene name passed into loadScene';
                            logger.error(errorMsg);
                            throw new XRSceneLoadFailure(errorMsg);
                        }
                        if (!domElementId) {
                            errorMsg = 'No dom element id passed into loadScene';
                            logger.error(errorMsg);
                            throw new XRNoDomElement(errorMsg);
                        }
                        element = document.getElementById(domElementId);
                        if (!element) {
                            errorMsg = "DOM element id, " + domElementId + " not found";
                            logger.error(errorMsg);
                            throw new XRNoDomElement(errorMsg);
                        }
                        scene = this.getScene(sceneName);
                        if (!scene.sceneConfig) {
                            errorMsg = "No scene config configured for scene: " + sceneName;
                            logger.error(errorMsg);
                            throw new XRSceneLoadFailure(errorMsg);
                        }
                        sceneUrl = scene.sceneConfig.url;
                        sceneId = scene.sceneConfig.sceneId;
                        if (scene.sceneConfig.hasOwnProperty('region')) {
                            // Use the scene region on the Sumerian scene configuration
                            sceneRegion = scene.sceneConfig.region;
                        }
                        else if (this.options.hasOwnProperty('region')) {
                            // Use the scene region on the XR category configuration
                            sceneRegion = this.options.region;
                        }
                        else {
                            errorMsg = "No region configured for scene: " + sceneName;
                            logger.error(errorMsg);
                            throw new XRSceneLoadFailure(errorMsg);
                        }
                        awsSDKConfigOverride = {
                            region: sceneRegion,
                            // This is passed to the AWS clients created in
                            // Sumerian's AwsSystem
                            // This helps other services(like Lex and Polly) to track
                            // traffic coming from Sumerian scenes embedded with Amplify
                            customUserAgent: Constants.userAgent + "-SumerianScene",
                        };
                        fetchOptions = {
                            headers: {
                                // This sets the AWS user agent string
                                // So the Sumerian service knows this request is
                                // from Amplify
                                'X-Amz-User-Agent': Constants.userAgent,
                            },
                        };
                        url = sceneUrl;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Credentials.get()];
                    case 2:
                        credentials = _d.sent();
                        awsSDKConfigOverride['credentials'] = credentials;
                        accessInfo = {
                            secret_key: credentials.secretAccessKey,
                            access_key: credentials.accessKeyId,
                            session_token: credentials.sessionToken,
                        };
                        serviceInfo = {
                            region: sceneRegion,
                            service: SUMERIAN_SERVICE_NAME,
                        };
                        request = Signer.sign({ method: 'GET', url: sceneUrl }, accessInfo, serviceInfo);
                        fetchOptions.headers = __assign(__assign({}, fetchOptions.headers), request.headers);
                        url = request.url;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _d.sent();
                        logger.debug('No credentials available, the request will be unsigned');
                        return [3 /*break*/, 4];
                    case 4: return [4 /*yield*/, fetch(url, fetchOptions)];
                    case 5:
                        apiResponse = _d.sent();
                        return [4 /*yield*/, apiResponse.json()];
                    case 6:
                        apiResponseJson = _d.sent();
                        if (apiResponse.status === 403) {
                            if (apiResponseJson.message) {
                                logger.error("Failure to authenticate user: " + apiResponseJson.message);
                                throw new XRSceneLoadFailure("Failure to authenticate user: " + apiResponseJson.message);
                            }
                            else {
                                logger.error("Failure to authenticate user");
                                throw new XRSceneLoadFailure("Failure to authenticate user");
                            }
                        }
                        sceneBundleData = apiResponseJson.bundleData[sceneId];
                        return [4 /*yield*/, fetch(sceneBundleData.url, {
                                headers: sceneBundleData.headers,
                            })];
                    case 7:
                        sceneBundle = _d.sent();
                        return [4 /*yield*/, sceneBundle.json()];
                    case 8:
                        sceneBundleJson = _d.sent();
                        _d.label = 9;
                    case 9:
                        _d.trys.push([9, 11, , 12]);
                        // Load the Sumerian bootstrapper script into the DOM
                        return [4 /*yield*/, this.loadScript(sceneBundleJson[sceneId].bootstrapperUrl)];
                    case 10:
                        // Load the Sumerian bootstrapper script into the DOM
                        _d.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        error_1 = _d.sent();
                        logger.error(error_1);
                        throw new XRSceneLoadFailure(error_1);
                    case 12:
                        progressCallback = sceneOptions.progressCallback
                            ? sceneOptions.progressCallback
                            : undefined;
                        publishParamOverrides = scene.publishParamOverrides
                            ? scene.publishParamOverrides
                            : undefined;
                        sceneLoadParams = {
                            element: element,
                            sceneId: sceneId,
                            sceneBundle: sceneBundleJson,
                            apiResponse: apiResponseJson,
                            progressCallback: progressCallback,
                            publishParamOverrides: publishParamOverrides,
                            awsSDKConfigOverride: awsSDKConfigOverride,
                        };
                        return [4 /*yield*/, window.SumerianBootstrapper.loadScene(sceneLoadParams)];
                    case 13:
                        sceneController = _d.sent();
                        scene.sceneController = sceneController;
                        scene.isLoaded = true;
                        try {
                            // Log scene warnings
                            for (_a = __values(sceneController.sceneLoadWarnings), _b = _a.next(); !_b.done; _b = _a.next()) {
                                warning = _b.value;
                                logger.warn("loadScene warning: " + warning);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SumerianProvider.prototype.isSceneLoaded = function (sceneName) {
        var scene = this.getScene(sceneName);
        return scene.isLoaded || false;
    };
    SumerianProvider.prototype.getScene = function (sceneName) {
        if (!this.options.scenes) {
            var errorMsg = 'No scenes were defined in the configuration';
            logger.error(errorMsg);
            throw new XRNoSceneConfiguredError(errorMsg);
        }
        if (!sceneName) {
            var errorMsg = 'No scene name was passed';
            logger.error(errorMsg);
            throw new XRSceneNotFoundError(errorMsg);
        }
        if (!this.options.scenes[sceneName]) {
            var errorMsg = "Scene '" + sceneName + "' is not configured";
            logger.error(errorMsg);
            throw new XRSceneNotFoundError(errorMsg);
        }
        return this.options.scenes[sceneName];
    };
    SumerianProvider.prototype.getSceneController = function (sceneName) {
        if (!this.options.scenes) {
            var errorMsg = 'No scenes were defined in the configuration';
            logger.error(errorMsg);
            throw new XRNoSceneConfiguredError(errorMsg);
        }
        var scene = this.options.scenes[sceneName];
        if (!scene) {
            var errorMsg = "Scene '" + sceneName + "' is not configured";
            logger.error(errorMsg);
            throw new XRSceneNotFoundError(errorMsg);
        }
        var sceneController = scene.sceneController;
        if (!sceneController) {
            var errorMsg = "Scene controller for '" + sceneName + "' has not been loaded";
            logger.error(errorMsg);
            throw new XRSceneNotLoadedError(errorMsg);
        }
        return sceneController;
    };
    SumerianProvider.prototype.isVRCapable = function (sceneName) {
        var sceneController = this.getSceneController(sceneName);
        return sceneController.vrCapable;
    };
    SumerianProvider.prototype.isVRPresentationActive = function (sceneName) {
        var sceneController = this.getSceneController(sceneName);
        return sceneController.vrPresentationActive;
    };
    SumerianProvider.prototype.start = function (sceneName) {
        var sceneController = this.getSceneController(sceneName);
        sceneController.start();
    };
    SumerianProvider.prototype.enterVR = function (sceneName) {
        var sceneController = this.getSceneController(sceneName);
        sceneController.enterVR();
    };
    SumerianProvider.prototype.exitVR = function (sceneName) {
        var sceneController = this.getSceneController(sceneName);
        sceneController.exitVR();
    };
    SumerianProvider.prototype.isMuted = function (sceneName) {
        var sceneController = this.getSceneController(sceneName);
        return sceneController.muted;
    };
    SumerianProvider.prototype.setMuted = function (sceneName, muted) {
        var sceneController = this.getSceneController(sceneName);
        sceneController.muted = muted;
    };
    SumerianProvider.prototype.onSceneEvent = function (sceneName, eventName, eventHandler) {
        var sceneController = this.getSceneController(sceneName);
        sceneController.on(eventName, eventHandler);
    };
    SumerianProvider.prototype.enableAudio = function (sceneName) {
        var sceneController = this.getSceneController(sceneName);
        sceneController.enableAudio();
    };
    return SumerianProvider;
}(AbstractXRProvider));
export { SumerianProvider };
//# sourceMappingURL=SumerianProvider.js.map
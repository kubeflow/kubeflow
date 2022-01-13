"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
var RestClient_1 = require("./RestClient");
var core_1 = require("@aws-amplify/core");
var logger = new core_1.ConsoleLogger('RestAPI');
/**
 * Export Cloud Logic APIs
 */
var RestAPIClass = /** @class */ (function () {
    /**
     * Initialize Rest API with AWS configuration
     * @param {Object} options - Configuration object for API
     */
    function RestAPIClass(options) {
        this._api = null;
        this.Credentials = core_1.Credentials;
        this._options = options;
        logger.debug('API Options', this._options);
    }
    RestAPIClass.prototype.getModuleName = function () {
        return 'RestAPI';
    };
    /**
     * Configure API part with aws configurations
     * @param {Object} config - Configuration of the API
     * @return {Object} - The current configuration
     */
    RestAPIClass.prototype.configure = function (options) {
        var _a = options || {}, _b = _a.API, API = _b === void 0 ? {} : _b, otherOptions = __rest(_a, ["API"]);
        var opt = __assign(__assign({}, otherOptions), API);
        logger.debug('configure Rest API', { opt: opt });
        if (opt['aws_project_region']) {
            if (opt['aws_cloud_logic_custom']) {
                var custom = opt['aws_cloud_logic_custom'];
                opt.endpoints =
                    typeof custom === 'string' ? JSON.parse(custom) : custom;
            }
            opt = Object.assign({}, opt, {
                region: opt['aws_project_region'],
                header: {},
            });
        }
        if (Array.isArray(opt.endpoints)) {
            // Check if endpoints has custom_headers and validate if is a function
            opt.endpoints.forEach(function (endpoint) {
                if (typeof endpoint.custom_header !== 'undefined' &&
                    typeof endpoint.custom_header !== 'function') {
                    logger.warn('Rest API ' + endpoint.name + ', custom_header should be a function');
                    endpoint.custom_header = undefined;
                }
            });
        }
        else if (this._options && Array.isArray(this._options.endpoints)) {
            opt.endpoints = this._options.endpoints;
        }
        else {
            opt.endpoints = [];
        }
        this._options = Object.assign({}, this._options, opt);
        this.createInstance();
        return this._options;
    };
    /**
     * Create an instance of API for the library
     * @return - A promise of true if Success
     */
    RestAPIClass.prototype.createInstance = function () {
        logger.debug('create Rest API instance');
        this._api = new RestClient_1.RestClient(this._options);
        // Share Amplify instance with client for SSR
        this._api.Credentials = this.Credentials;
        return true;
    };
    /**
     * Make a GET request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    RestAPIClass.prototype.get = function (apiName, path, init) {
        try {
            var apiInfo = this.getEndpointInfo(apiName, path);
            var cancellableToken = this._api.getCancellableToken();
            var initParams = Object.assign({}, init);
            initParams.cancellableToken = cancellableToken;
            var responsePromise = this._api.get(apiInfo, initParams);
            this._api.updateRequestToBeCancellable(responsePromise, cancellableToken);
            return responsePromise;
        }
        catch (err) {
            return Promise.reject(err.message);
        }
    };
    /**
     * Make a POST request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    RestAPIClass.prototype.post = function (apiName, path, init) {
        try {
            var apiInfo = this.getEndpointInfo(apiName, path);
            var cancellableToken = this._api.getCancellableToken();
            var initParams = Object.assign({}, init);
            initParams.cancellableToken = cancellableToken;
            var responsePromise = this._api.post(apiInfo, initParams);
            this._api.updateRequestToBeCancellable(responsePromise, cancellableToken);
            return responsePromise;
        }
        catch (err) {
            return Promise.reject(err.message);
        }
    };
    /**
     * Make a PUT request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    RestAPIClass.prototype.put = function (apiName, path, init) {
        try {
            var apiInfo = this.getEndpointInfo(apiName, path);
            var cancellableToken = this._api.getCancellableToken();
            var initParams = Object.assign({}, init);
            initParams.cancellableToken = cancellableToken;
            var responsePromise = this._api.put(apiInfo, initParams);
            this._api.updateRequestToBeCancellable(responsePromise, cancellableToken);
            return responsePromise;
        }
        catch (err) {
            return Promise.reject(err.message);
        }
    };
    /**
     * Make a PATCH request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    RestAPIClass.prototype.patch = function (apiName, path, init) {
        try {
            var apiInfo = this.getEndpointInfo(apiName, path);
            var cancellableToken = this._api.getCancellableToken();
            var initParams = Object.assign({}, init);
            initParams.cancellableToken = cancellableToken;
            var responsePromise = this._api.patch(apiInfo, initParams);
            this._api.updateRequestToBeCancellable(responsePromise, cancellableToken);
            return responsePromise;
        }
        catch (err) {
            return Promise.reject(err.message);
        }
    };
    /**
     * Make a DEL request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    RestAPIClass.prototype.del = function (apiName, path, init) {
        try {
            var apiInfo = this.getEndpointInfo(apiName, path);
            var cancellableToken = this._api.getCancellableToken();
            var initParams = Object.assign({}, init);
            initParams.cancellableToken = cancellableToken;
            var responsePromise = this._api.del(apiInfo, initParams);
            this._api.updateRequestToBeCancellable(responsePromise, cancellableToken);
            return responsePromise;
        }
        catch (err) {
            return Promise.reject(err.message);
        }
    };
    /**
     * Make a HEAD request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    RestAPIClass.prototype.head = function (apiName, path, init) {
        try {
            var apiInfo = this.getEndpointInfo(apiName, path);
            var cancellableToken = this._api.getCancellableToken();
            var initParams = Object.assign({}, init);
            initParams.cancellableToken = cancellableToken;
            var responsePromise = this._api.head(apiInfo, initParams);
            this._api.updateRequestToBeCancellable(responsePromise, cancellableToken);
            return responsePromise;
        }
        catch (err) {
            return Promise.reject(err.message);
        }
    };
    /**
     * Checks to see if an error thrown is from an api request cancellation
     * @param {any} error - Any error
     * @return {boolean} - A boolean indicating if the error was from an api request cancellation
     */
    RestAPIClass.prototype.isCancel = function (error) {
        return this._api.isCancel(error);
    };
    /**
     * Cancels an inflight request
     * @param {any} request - request to cancel
     * @return {boolean} - A boolean indicating if the request was cancelled
     */
    RestAPIClass.prototype.cancel = function (request, message) {
        return this._api.cancel(request, message);
    };
    /**
     * Getting endpoint for API
     * @param {string} apiName - The name of the api
     * @return {string} - The endpoint of the api
     */
    RestAPIClass.prototype.endpoint = function (apiName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._api.endpoint(apiName)];
            });
        });
    };
    /**
     * Getting endpoint info for API
     * @param {string} apiName - The name of the api
     * @param {string} path - The path of the api that is going to accessed
     * @return {ApiInfo} - The endpoint information for that api-name
     */
    RestAPIClass.prototype.getEndpointInfo = function (apiName, path) {
        var cloud_logic_array = this._options.endpoints;
        if (!Array.isArray(cloud_logic_array)) {
            throw new Error("API category not configured");
        }
        var apiConfig = cloud_logic_array.find(function (api) { return api.name === apiName; });
        if (!apiConfig) {
            throw new Error("API " + apiName + " does not exist");
        }
        var response = {
            endpoint: apiConfig.endpoint + path,
        };
        if (typeof apiConfig.region === 'string') {
            response.region = apiConfig.region;
        }
        else if (typeof this._options.region === 'string') {
            response.region = this._options.region;
        }
        if (typeof apiConfig.service === 'string') {
            response.service = apiConfig.service || 'execute-api';
        }
        else {
            response.service = 'execute-api';
        }
        if (typeof apiConfig.custom_header === 'function') {
            response.custom_header = apiConfig.custom_header;
        }
        else {
            response.custom_header = undefined;
        }
        return response;
    };
    return RestAPIClass;
}());
exports.RestAPIClass = RestAPIClass;
exports.RestAPI = new RestAPIClass(null);
core_1.Amplify.register(exports.RestAPI);
//# sourceMappingURL=RestAPI.js.map
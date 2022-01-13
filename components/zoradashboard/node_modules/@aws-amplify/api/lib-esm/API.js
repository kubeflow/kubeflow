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
import { Auth } from '@aws-amplify/auth';
import Cache from '@aws-amplify/cache';
import { RestAPIClass } from '@aws-amplify/api-rest';
import { GraphQLAPIClass, } from '@aws-amplify/api-graphql';
import { Amplify, ConsoleLogger as Logger, Credentials, } from '@aws-amplify/core';
var logger = new Logger('API');
/**
 * @deprecated
 * Use RestApi or GraphQLAPI to reduce your application bundle size
 * Export Cloud Logic APIs
 */
var APIClass = /** @class */ (function () {
    /**
     * Initialize API with AWS configuration
     * @param {Object} options - Configuration object for API
     */
    function APIClass(options) {
        this.Auth = Auth;
        this.Cache = Cache;
        this.Credentials = Credentials;
        this._options = options;
        this._restApi = new RestAPIClass(options);
        this._graphqlApi = new GraphQLAPIClass(options);
        logger.debug('API Options', this._options);
    }
    APIClass.prototype.getModuleName = function () {
        return 'API';
    };
    /**
     * Configure API part with aws configurations
     * @param {Object} config - Configuration of the API
     * @return {Object} - The current configuration
     */
    APIClass.prototype.configure = function (options) {
        this._options = Object.assign({}, this._options, options);
        // Share Amplify instance with client for SSR
        this._restApi.Credentials = this.Credentials;
        this._graphqlApi.Auth = this.Auth;
        this._graphqlApi.Cache = this.Cache;
        this._graphqlApi.Credentials = this.Credentials;
        var restAPIConfig = this._restApi.configure(this._options);
        var graphQLAPIConfig = this._graphqlApi.configure(this._options);
        return __assign(__assign({}, restAPIConfig), graphQLAPIConfig);
    };
    /**
     * Make a GET request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    APIClass.prototype.get = function (apiName, path, init) {
        return this._restApi.get(apiName, path, init);
    };
    /**
     * Make a POST request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    APIClass.prototype.post = function (apiName, path, init) {
        return this._restApi.post(apiName, path, init);
    };
    /**
     * Make a PUT request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    APIClass.prototype.put = function (apiName, path, init) {
        return this._restApi.put(apiName, path, init);
    };
    /**
     * Make a PATCH request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    APIClass.prototype.patch = function (apiName, path, init) {
        return this._restApi.patch(apiName, path, init);
    };
    /**
     * Make a DEL request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    APIClass.prototype.del = function (apiName, path, init) {
        return this._restApi.del(apiName, path, init);
    };
    /**
     * Make a HEAD request
     * @param {string} apiName - The api name of the request
     * @param {string} path - The path of the request
     * @param {json} [init] - Request extra params
     * @return {Promise} - A promise that resolves to an object with response status and JSON data, if successful.
     */
    APIClass.prototype.head = function (apiName, path, init) {
        return this._restApi.head(apiName, path, init);
    };
    /**
     * Checks to see if an error thrown is from an api request cancellation
     * @param {any} error - Any error
     * @return {boolean} - A boolean indicating if the error was from an api request cancellation
     */
    APIClass.prototype.isCancel = function (error) {
        return this._restApi.isCancel(error);
    };
    /**
     * Cancels an inflight request
     * @param {any} request - request to cancel
     * @return {boolean} - A boolean indicating if the request was cancelled
     */
    APIClass.prototype.cancel = function (request, message) {
        return this._restApi.cancel(request, message);
    };
    /**
     * Getting endpoint for API
     * @param {string} apiName - The name of the api
     * @return {string} - The endpoint of the api
     */
    APIClass.prototype.endpoint = function (apiName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._restApi.endpoint(apiName)];
            });
        });
    };
    /**
     * to get the operation type
     * @param operation
     */
    APIClass.prototype.getGraphqlOperationType = function (operation) {
        return this._graphqlApi.getGraphqlOperationType(operation);
    };
    /**
     * Executes a GraphQL operation
     *
     * @param {GraphQLOptions} GraphQL Options
     * @param {object} additionalHeaders headers to merge in after any `graphql_headers` set in the config
     * @returns {Promise<GraphQLResult> | Observable<object>}
     */
    APIClass.prototype.graphql = function (options, additionalHeaders) {
        return this._graphqlApi.graphql(options, additionalHeaders);
    };
    return APIClass;
}());
export { APIClass };
export var API = new APIClass(null);
Amplify.register(API);
//# sourceMappingURL=API.js.map
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
import { HttpResponse } from '@aws-sdk/protocol-http';
import { buildQueryString } from '@aws-sdk/querystring-builder';
import axios from 'axios';
import { ConsoleLogger as Logger, Platform } from '@aws-amplify/core';
var logger = new Logger('axios-http-handler');
export var SEND_UPLOAD_PROGRESS_EVENT = 'sendUploadProgress';
export var SEND_DOWNLOAD_PROGRESS_EVENT = 'sendDownloadProgress';
function isBlob(body) {
    return typeof Blob !== 'undefined' && body instanceof Blob;
}
var normalizeHeaders = function (headers, normalizedName) {
    var e_1, _a;
    try {
        for (var _b = __values(Object.entries(headers)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), k = _d[0], v = _d[1];
            if (k !== normalizedName &&
                k.toUpperCase() === normalizedName.toUpperCase()) {
                headers[normalizedName] = v;
                delete headers[k];
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
};
export var reactNativeRequestTransformer = [
    function (data, headers) {
        if (isBlob(data)) {
            normalizeHeaders(headers, 'Content-Type');
            normalizeHeaders(headers, 'Accept');
            return data;
        }
        // Axios' default transformRequest is an array
        return axios.defaults.transformRequest[0].call(null, data, headers);
    },
];
var AxiosHttpHandler = /** @class */ (function () {
    function AxiosHttpHandler(httpOptions, emitter, cancelTokenSource) {
        if (httpOptions === void 0) { httpOptions = {}; }
        this.httpOptions = httpOptions;
        this.emitter = emitter;
        this.cancelTokenSource = cancelTokenSource;
    }
    AxiosHttpHandler.prototype.destroy = function () {
        // Do nothing. TLS and HTTP/2 connection pooling is handled by the
        // browser.
    };
    AxiosHttpHandler.prototype.handle = function (request, options) {
        var requestTimeoutInMs = this.httpOptions.requestTimeout;
        var emitter = this.emitter;
        var path = request.path;
        if (request.query) {
            var queryString = buildQueryString(request.query);
            if (queryString) {
                path += "?" + queryString;
            }
        }
        var port = request.port;
        var url = request.protocol + "//" + request.hostname + (port ? ":" + port : '') + path;
        var axiosRequest = {};
        axiosRequest.url = url;
        axiosRequest.method = request.method;
        axiosRequest.headers = request.headers;
        // The host header is automatically added by the browser and adding it explicitly in the
        // axios request throws an error https://github.com/aws-amplify/amplify-js/issues/5376
        // This is because the host header is a forbidden header for the http client to set
        // see https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name and
        // https://fetch.spec.whatwg.org/#forbidden-header-name
        // The reason we are removing this header here instead of in the aws-sdk's client
        // middleware is that the host header is required to be in the request signature and if
        // we remove it from the middlewares, then the request fails because the header is added
        // by the browser but is absent from the signature.
        delete axiosRequest.headers['host'];
        if (request.body) {
            axiosRequest.data = request.body;
        }
        else {
            // Fix for https://github.com/aws-amplify/amplify-js/issues/5432
            // If the POST request body is empty but content-type header is set, axios is forcibly removing it
            // See https://github.com/axios/axios/issues/1535 and refusing to fix it https://github.com/axios/axios/issues/755
            // This change is a workaround to set the data as null (instead of undefined) to prevent axios from
            // removing the content-type header. Link for the source code
            // https://github.com/axios/axios/blob/dc4bc49673943e35280e5df831f5c3d0347a9393/lib/adapters/xhr.js#L121-L123
            if (axiosRequest.headers['Content-Type']) {
                axiosRequest.data = null;
            }
        }
        if (emitter) {
            axiosRequest.onUploadProgress = function (event) {
                emitter.emit(SEND_UPLOAD_PROGRESS_EVENT, event);
                logger.debug(event);
            };
            axiosRequest.onDownloadProgress = function (event) {
                emitter.emit(SEND_DOWNLOAD_PROGRESS_EVENT, event);
                logger.debug(event);
            };
        }
        // If a cancel token source is passed down from the provider, allows cancellation of in-flight requests
        if (this.cancelTokenSource) {
            axiosRequest.cancelToken = this.cancelTokenSource.token;
        }
        // From gamma release, aws-sdk now expects all response type to be of blob or streams
        axiosRequest.responseType = 'blob';
        // In Axios, Blobs are identified by calling Object.prototype.toString on the object. However, on React Native,
        // calling Object.prototype.toString on a Blob returns '[object Object]' instead of '[object Blob]', which causes 
        // Axios to treat Blobs as generic Javascript objects. Therefore we need a to use a custom request transformer
        // to correctly handle Blob in React Native.
        if (Platform.isReactNative) {
            axiosRequest.transformRequest = reactNativeRequestTransformer;
        }
        var raceOfPromises = [
            axios
                .request(axiosRequest)
                .then(function (response) {
                return {
                    response: new HttpResponse({
                        headers: response.headers,
                        statusCode: response.status,
                        body: response.data,
                    }),
                };
            })
                .catch(function (error) {
                // Error
                logger.error(error.message);
                throw error;
            }),
            requestTimeout(requestTimeoutInMs),
        ];
        return Promise.race(raceOfPromises);
    };
    return AxiosHttpHandler;
}());
export { AxiosHttpHandler };
function requestTimeout(timeoutInMs) {
    if (timeoutInMs === void 0) { timeoutInMs = 0; }
    return new Promise(function (resolve, reject) {
        if (timeoutInMs) {
            setTimeout(function () {
                var timeoutError = new Error("Request did not complete within " + timeoutInMs + " ms");
                timeoutError.name = 'TimeoutError';
                reject(timeoutError);
            }, timeoutInMs);
        }
    });
}
//# sourceMappingURL=axios-http-handler.js.map
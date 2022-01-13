"use strict";
/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallCredentialsFilterFactory = exports.CallCredentialsFilter = void 0;
const filter_1 = require("./filter");
const constants_1 = require("./constants");
const uri_parser_1 = require("./uri-parser");
class CallCredentialsFilter extends filter_1.BaseFilter {
    constructor(channel, stream) {
        var _a, _b;
        super();
        this.channel = channel;
        this.stream = stream;
        this.channel = channel;
        this.stream = stream;
        const splitPath = stream.getMethod().split('/');
        let serviceName = '';
        /* The standard path format is "/{serviceName}/{methodName}", so if we split
         * by '/', the first item should be empty and the second should be the
         * service name */
        if (splitPath.length >= 2) {
            serviceName = splitPath[1];
        }
        const hostname = (_b = (_a = uri_parser_1.splitHostPort(stream.getHost())) === null || _a === void 0 ? void 0 : _a.host) !== null && _b !== void 0 ? _b : 'localhost';
        /* Currently, call credentials are only allowed on HTTPS connections, so we
         * can assume that the scheme is "https" */
        this.serviceUrl = `https://${hostname}/${serviceName}`;
    }
    async sendMetadata(metadata) {
        const credentials = this.stream.getCredentials();
        const credsMetadata = credentials.generateMetadata({
            service_url: this.serviceUrl,
        });
        const resultMetadata = await metadata;
        try {
            resultMetadata.merge(await credsMetadata);
        }
        catch (error) {
            this.stream.cancelWithStatus(constants_1.Status.UNAUTHENTICATED, `Failed to retrieve auth metadata with error: ${error.message}`);
            return Promise.reject('Failed to retrieve auth metadata');
        }
        if (resultMetadata.get('authorization').length > 1) {
            this.stream.cancelWithStatus(constants_1.Status.INTERNAL, '"authorization" metadata cannot have multiple values');
            return Promise.reject('"authorization" metadata cannot have multiple values');
        }
        return resultMetadata;
    }
}
exports.CallCredentialsFilter = CallCredentialsFilter;
class CallCredentialsFilterFactory {
    constructor(channel) {
        this.channel = channel;
        this.channel = channel;
    }
    createFilter(callStream) {
        return new CallCredentialsFilter(this.channel, callStream);
    }
}
exports.CallCredentialsFilterFactory = CallCredentialsFilterFactory;
//# sourceMappingURL=call-credentials-filter.js.map
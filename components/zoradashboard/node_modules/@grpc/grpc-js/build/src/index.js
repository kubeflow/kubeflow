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
exports.experimental = exports.StatusBuilder = exports.getClientChannel = exports.ServerCredentials = exports.Server = exports.setLogVerbosity = exports.setLogger = exports.load = exports.loadObject = exports.CallCredentials = exports.ChannelCredentials = exports.waitForClientReady = exports.closeClient = exports.Channel = exports.makeGenericClientConstructor = exports.makeClientConstructor = exports.loadPackageDefinition = exports.Client = exports.propagate = exports.connectivityState = exports.status = exports.logVerbosity = exports.Metadata = exports.credentials = void 0;
const call_credentials_1 = require("./call-credentials");
Object.defineProperty(exports, "CallCredentials", { enumerable: true, get: function () { return call_credentials_1.CallCredentials; } });
const channel_1 = require("./channel");
Object.defineProperty(exports, "connectivityState", { enumerable: true, get: function () { return channel_1.ConnectivityState; } });
Object.defineProperty(exports, "Channel", { enumerable: true, get: function () { return channel_1.ChannelImplementation; } });
const channel_credentials_1 = require("./channel-credentials");
Object.defineProperty(exports, "ChannelCredentials", { enumerable: true, get: function () { return channel_credentials_1.ChannelCredentials; } });
const client_1 = require("./client");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return client_1.Client; } });
const constants_1 = require("./constants");
Object.defineProperty(exports, "logVerbosity", { enumerable: true, get: function () { return constants_1.LogVerbosity; } });
Object.defineProperty(exports, "status", { enumerable: true, get: function () { return constants_1.Status; } });
Object.defineProperty(exports, "propagate", { enumerable: true, get: function () { return constants_1.Propagate; } });
const logging = require("./logging");
const make_client_1 = require("./make-client");
Object.defineProperty(exports, "loadPackageDefinition", { enumerable: true, get: function () { return make_client_1.loadPackageDefinition; } });
Object.defineProperty(exports, "makeClientConstructor", { enumerable: true, get: function () { return make_client_1.makeClientConstructor; } });
Object.defineProperty(exports, "makeGenericClientConstructor", { enumerable: true, get: function () { return make_client_1.makeClientConstructor; } });
const metadata_1 = require("./metadata");
Object.defineProperty(exports, "Metadata", { enumerable: true, get: function () { return metadata_1.Metadata; } });
const server_1 = require("./server");
Object.defineProperty(exports, "Server", { enumerable: true, get: function () { return server_1.Server; } });
const server_credentials_1 = require("./server-credentials");
Object.defineProperty(exports, "ServerCredentials", { enumerable: true, get: function () { return server_credentials_1.ServerCredentials; } });
const status_builder_1 = require("./status-builder");
Object.defineProperty(exports, "StatusBuilder", { enumerable: true, get: function () { return status_builder_1.StatusBuilder; } });
/**** Client Credentials ****/
// Using assign only copies enumerable properties, which is what we want
exports.credentials = {
    /**
     * Combine a ChannelCredentials with any number of CallCredentials into a
     * single ChannelCredentials object.
     * @param channelCredentials The ChannelCredentials object.
     * @param callCredentials Any number of CallCredentials objects.
     * @return The resulting ChannelCredentials object.
     */
    combineChannelCredentials: (channelCredentials, ...callCredentials) => {
        return callCredentials.reduce((acc, other) => acc.compose(other), channelCredentials);
    },
    /**
     * Combine any number of CallCredentials into a single CallCredentials
     * object.
     * @param first The first CallCredentials object.
     * @param additional Any number of additional CallCredentials objects.
     * @return The resulting CallCredentials object.
     */
    combineCallCredentials: (first, ...additional) => {
        return additional.reduce((acc, other) => acc.compose(other), first);
    },
    // from channel-credentials.ts
    createInsecure: channel_credentials_1.ChannelCredentials.createInsecure,
    createSsl: channel_credentials_1.ChannelCredentials.createSsl,
    // from call-credentials.ts
    createFromMetadataGenerator: call_credentials_1.CallCredentials.createFromMetadataGenerator,
    createFromGoogleCredential: call_credentials_1.CallCredentials.createFromGoogleCredential,
    createEmpty: call_credentials_1.CallCredentials.createEmpty,
};
/**
 * Close a Client object.
 * @param client The client to close.
 */
exports.closeClient = (client) => client.close();
exports.waitForClientReady = (client, deadline, callback) => client.waitForReady(deadline, callback);
/* eslint-enable @typescript-eslint/no-explicit-any */
/**** Unimplemented function stubs ****/
/* eslint-disable @typescript-eslint/no-explicit-any */
exports.loadObject = (value, options) => {
    throw new Error('Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead');
};
exports.load = (filename, format, options) => {
    throw new Error('Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead');
};
exports.setLogger = (logger) => {
    logging.setLogger(logger);
};
exports.setLogVerbosity = (verbosity) => {
    logging.setLoggerVerbosity(verbosity);
};
exports.getClientChannel = (client) => {
    return client_1.Client.prototype.getChannel.call(client);
};
var client_interceptors_1 = require("./client-interceptors");
Object.defineProperty(exports, "ListenerBuilder", { enumerable: true, get: function () { return client_interceptors_1.ListenerBuilder; } });
Object.defineProperty(exports, "RequesterBuilder", { enumerable: true, get: function () { return client_interceptors_1.RequesterBuilder; } });
Object.defineProperty(exports, "InterceptingCall", { enumerable: true, get: function () { return client_interceptors_1.InterceptingCall; } });
Object.defineProperty(exports, "InterceptorConfigurationError", { enumerable: true, get: function () { return client_interceptors_1.InterceptorConfigurationError; } });
const experimental = require("./experimental");
exports.experimental = experimental;
const resolver = require("./resolver");
const load_balancer = require("./load-balancer");
(() => {
    resolver.registerAll();
    load_balancer.registerAll();
})();
//# sourceMappingURL=index.js.map
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
exports.Server = void 0;
const http2 = require("http2");
const constants_1 = require("./constants");
const metadata_1 = require("./metadata");
const server_call_1 = require("./server-call");
const resolver_1 = require("./resolver");
const logging = require("./logging");
const subchannel_1 = require("./subchannel");
const uri_parser_1 = require("./uri-parser");
const TRACER_NAME = 'server';
function trace(text) {
    logging.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
}
function noop() { }
function getUnimplementedStatusResponse(methodName) {
    return {
        code: constants_1.Status.UNIMPLEMENTED,
        details: `The server does not implement the method ${methodName}`,
        metadata: new metadata_1.Metadata(),
    };
}
function getDefaultHandler(handlerType, methodName) {
    const unimplementedStatusResponse = getUnimplementedStatusResponse(methodName);
    switch (handlerType) {
        case 'unary':
            return (call, callback) => {
                callback(unimplementedStatusResponse, null);
            };
        case 'clientStream':
            return (call, callback) => {
                callback(unimplementedStatusResponse, null);
            };
        case 'serverStream':
            return (call) => {
                call.emit('error', unimplementedStatusResponse);
            };
        case 'bidi':
            return (call) => {
                call.emit('error', unimplementedStatusResponse);
            };
        default:
            throw new Error(`Invalid handlerType ${handlerType}`);
    }
}
class Server {
    constructor(options) {
        this.http2ServerList = [];
        this.handlers = new Map();
        this.sessions = new Set();
        this.started = false;
        this.options = options !== null && options !== void 0 ? options : {};
    }
    addProtoService() {
        throw new Error('Not implemented. Use addService() instead');
    }
    addService(service, implementation) {
        if (service === null ||
            typeof service !== 'object' ||
            implementation === null ||
            typeof implementation !== 'object') {
            throw new Error('addService() requires two objects as arguments');
        }
        const serviceKeys = Object.keys(service);
        if (serviceKeys.length === 0) {
            throw new Error('Cannot add an empty service to a server');
        }
        serviceKeys.forEach((name) => {
            const attrs = service[name];
            let methodType;
            if (attrs.requestStream) {
                if (attrs.responseStream) {
                    methodType = 'bidi';
                }
                else {
                    methodType = 'clientStream';
                }
            }
            else {
                if (attrs.responseStream) {
                    methodType = 'serverStream';
                }
                else {
                    methodType = 'unary';
                }
            }
            let implFn = implementation[name];
            let impl;
            if (implFn === undefined && typeof attrs.originalName === 'string') {
                implFn = implementation[attrs.originalName];
            }
            if (implFn !== undefined) {
                impl = implFn.bind(implementation);
            }
            else {
                impl = getDefaultHandler(methodType, name);
            }
            const success = this.register(attrs.path, impl, attrs.responseSerialize, attrs.requestDeserialize, methodType);
            if (success === false) {
                throw new Error(`Method handler for ${attrs.path} already provided.`);
            }
        });
    }
    removeService(service) {
        if (service === null ||
            typeof service !== 'object') {
            throw new Error('removeService() requires object as argument');
        }
        const serviceKeys = Object.keys(service);
        serviceKeys.forEach((name) => {
            const attrs = service[name];
            this.unregister(attrs.path);
        });
    }
    bind(port, creds) {
        throw new Error('Not implemented. Use bindAsync() instead');
    }
    bindAsync(port, creds, callback) {
        if (this.started === true) {
            throw new Error('server is already started');
        }
        if (typeof port !== 'string') {
            throw new TypeError('port must be a string');
        }
        if (creds === null || typeof creds !== 'object') {
            throw new TypeError('creds must be an object');
        }
        if (typeof callback !== 'function') {
            throw new TypeError('callback must be a function');
        }
        const initialPortUri = uri_parser_1.parseUri(port);
        if (initialPortUri === null) {
            throw new Error(`Could not parse port "${port}"`);
        }
        const portUri = resolver_1.mapUriDefaultScheme(initialPortUri);
        if (portUri === null) {
            throw new Error(`Could not get a default scheme for port "${port}"`);
        }
        const serverOptions = {
            maxSendHeaderBlockLength: Number.MAX_SAFE_INTEGER
        };
        if ('grpc-node.max_session_memory' in this.options) {
            serverOptions.maxSessionMemory = this.options['grpc-node.max_session_memory'];
        }
        if ('grpc.max_concurrent_streams' in this.options) {
            serverOptions.settings = {
                maxConcurrentStreams: this.options['grpc.max_concurrent_streams'],
            };
        }
        const setupServer = () => {
            let http2Server;
            if (creds._isSecure()) {
                const secureServerOptions = Object.assign(serverOptions, creds._getSettings());
                http2Server = http2.createSecureServer(secureServerOptions);
            }
            else {
                http2Server = http2.createServer(serverOptions);
            }
            http2Server.setTimeout(0, noop);
            this._setupHandlers(http2Server);
            return http2Server;
        };
        const bindSpecificPort = (addressList, portNum, previousCount) => {
            if (addressList.length === 0) {
                return Promise.resolve({ port: portNum, count: previousCount });
            }
            return Promise.all(addressList.map((address) => {
                trace('Attempting to bind ' + subchannel_1.subchannelAddressToString(address));
                let addr;
                if (subchannel_1.isTcpSubchannelAddress(address)) {
                    addr = {
                        host: address.host,
                        port: portNum,
                    };
                }
                else {
                    addr = address;
                }
                const http2Server = setupServer();
                return new Promise((resolve, reject) => {
                    function onError(err) {
                        resolve(err);
                    }
                    http2Server.once('error', onError);
                    http2Server.listen(addr, () => {
                        trace('Successfully bound ' + subchannel_1.subchannelAddressToString(address));
                        this.http2ServerList.push(http2Server);
                        const boundAddress = http2Server.address();
                        if (typeof boundAddress === 'string') {
                            resolve(portNum);
                        }
                        else {
                            resolve(boundAddress.port);
                        }
                        http2Server.removeListener('error', onError);
                    });
                });
            })).then((results) => {
                let count = 0;
                for (const result of results) {
                    if (typeof result === 'number') {
                        count += 1;
                        if (result !== portNum) {
                            throw new Error('Invalid state: multiple port numbers added from single address');
                        }
                    }
                }
                return {
                    port: portNum,
                    count: count + previousCount,
                };
            });
        };
        const bindWildcardPort = (addressList) => {
            if (addressList.length === 0) {
                return Promise.resolve({ port: 0, count: 0 });
            }
            const address = addressList[0];
            const http2Server = setupServer();
            return new Promise((resolve, reject) => {
                function onError(err) {
                    resolve(bindWildcardPort(addressList.slice(1)));
                }
                http2Server.once('error', onError);
                http2Server.listen(address, () => {
                    this.http2ServerList.push(http2Server);
                    resolve(bindSpecificPort(addressList.slice(1), http2Server.address().port, 1));
                    http2Server.removeListener('error', onError);
                });
            });
        };
        const resolverListener = {
            onSuccessfulResolution: (addressList, serviceConfig, serviceConfigError) => {
                // We only want one resolution result. Discard all future results
                resolverListener.onSuccessfulResolution = () => { };
                if (addressList.length === 0) {
                    callback(new Error(`No addresses resolved for port ${port}`), 0);
                    return;
                }
                let bindResultPromise;
                if (subchannel_1.isTcpSubchannelAddress(addressList[0])) {
                    if (addressList[0].port === 0) {
                        bindResultPromise = bindWildcardPort(addressList);
                    }
                    else {
                        bindResultPromise = bindSpecificPort(addressList, addressList[0].port, 0);
                    }
                }
                else {
                    // Use an arbitrary non-zero port for non-TCP addresses
                    bindResultPromise = bindSpecificPort(addressList, 1, 0);
                }
                bindResultPromise.then((bindResult) => {
                    if (bindResult.count === 0) {
                        const errorString = `No address added out of total ${addressList.length} resolved`;
                        logging.log(constants_1.LogVerbosity.ERROR, errorString);
                        callback(new Error(errorString), 0);
                    }
                    else {
                        if (bindResult.count < addressList.length) {
                            logging.log(constants_1.LogVerbosity.INFO, `WARNING Only ${bindResult.count} addresses added out of total ${addressList.length} resolved`);
                        }
                        callback(null, bindResult.port);
                    }
                }, (error) => {
                    const errorString = `No address added out of total ${addressList.length} resolved`;
                    logging.log(constants_1.LogVerbosity.ERROR, errorString);
                    callback(new Error(errorString), 0);
                });
            },
            onError: (error) => {
                callback(new Error(error.details), 0);
            },
        };
        const resolver = resolver_1.createResolver(portUri, resolverListener, this.options);
        resolver.updateResolution();
    }
    forceShutdown() {
        // Close the server if it is still running.
        for (const http2Server of this.http2ServerList) {
            if (http2Server.listening) {
                http2Server.close();
            }
        }
        this.started = false;
        // Always destroy any available sessions. It's possible that one or more
        // tryShutdown() calls are in progress. Don't wait on them to finish.
        this.sessions.forEach((session) => {
            // Cast NGHTTP2_CANCEL to any because TypeScript doesn't seem to
            // recognize destroy(code) as a valid signature.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            session.destroy(http2.constants.NGHTTP2_CANCEL);
        });
        this.sessions.clear();
    }
    register(name, handler, serialize, deserialize, type) {
        if (this.handlers.has(name)) {
            return false;
        }
        this.handlers.set(name, {
            func: handler,
            serialize,
            deserialize,
            type,
            path: name,
        });
        return true;
    }
    unregister(name) {
        return this.handlers.delete(name);
    }
    start() {
        if (this.http2ServerList.length === 0 ||
            this.http2ServerList.every((http2Server) => http2Server.listening !== true)) {
            throw new Error('server must be bound in order to start');
        }
        if (this.started === true) {
            throw new Error('server is already started');
        }
        this.started = true;
    }
    tryShutdown(callback) {
        let pendingChecks = 0;
        function maybeCallback() {
            pendingChecks--;
            if (pendingChecks === 0) {
                callback();
            }
        }
        // Close the server if necessary.
        this.started = false;
        for (const http2Server of this.http2ServerList) {
            if (http2Server.listening) {
                pendingChecks++;
                http2Server.close(maybeCallback);
            }
        }
        this.sessions.forEach((session) => {
            if (!session.closed) {
                pendingChecks += 1;
                session.close(maybeCallback);
            }
        });
        if (pendingChecks === 0) {
            callback();
        }
    }
    addHttp2Port() {
        throw new Error('Not yet implemented');
    }
    _setupHandlers(http2Server) {
        if (http2Server === null) {
            return;
        }
        http2Server.on('stream', (stream, headers) => {
            const contentType = headers[http2.constants.HTTP2_HEADER_CONTENT_TYPE];
            if (typeof contentType !== 'string' ||
                !contentType.startsWith('application/grpc')) {
                stream.respond({
                    [http2.constants.HTTP2_HEADER_STATUS]: http2.constants.HTTP_STATUS_UNSUPPORTED_MEDIA_TYPE,
                }, { endStream: true });
                return;
            }
            try {
                const path = headers[http2.constants.HTTP2_HEADER_PATH];
                const serverAddress = http2Server.address();
                let serverAddressString = 'null';
                if (serverAddress) {
                    if (typeof serverAddress === 'string') {
                        serverAddressString = serverAddress;
                    }
                    else {
                        serverAddressString =
                            serverAddress.address + ':' + serverAddress.port;
                    }
                }
                trace('Received call to method ' +
                    path +
                    ' at address ' +
                    serverAddressString);
                const handler = this.handlers.get(path);
                if (handler === undefined) {
                    trace('No handler registered for method ' +
                        path +
                        '. Sending UNIMPLEMENTED status.');
                    throw getUnimplementedStatusResponse(path);
                }
                const call = new server_call_1.Http2ServerCallStream(stream, handler, this.options);
                const metadata = call.receiveMetadata(headers);
                switch (handler.type) {
                    case 'unary':
                        handleUnary(call, handler, metadata);
                        break;
                    case 'clientStream':
                        handleClientStreaming(call, handler, metadata);
                        break;
                    case 'serverStream':
                        handleServerStreaming(call, handler, metadata);
                        break;
                    case 'bidi':
                        handleBidiStreaming(call, handler, metadata);
                        break;
                    default:
                        throw new Error(`Unknown handler type: ${handler.type}`);
                }
            }
            catch (err) {
                const call = new server_call_1.Http2ServerCallStream(stream, null, this.options);
                if (err.code === undefined) {
                    err.code = constants_1.Status.INTERNAL;
                }
                call.sendError(err);
            }
        });
        http2Server.on('session', (session) => {
            if (!this.started) {
                session.destroy();
                return;
            }
            this.sessions.add(session);
            session.on('close', () => {
                this.sessions.delete(session);
            });
        });
    }
}
exports.Server = Server;
async function handleUnary(call, handler, metadata) {
    const request = await call.receiveUnaryMessage();
    if (request === undefined || call.cancelled) {
        return;
    }
    const emitter = new server_call_1.ServerUnaryCallImpl(call, metadata, request);
    handler.func(emitter, (err, value, trailer, flags) => {
        call.sendUnaryMessage(err, value, trailer, flags);
    });
}
function handleClientStreaming(call, handler, metadata) {
    const stream = new server_call_1.ServerReadableStreamImpl(call, metadata, handler.deserialize);
    function respond(err, value, trailer, flags) {
        stream.destroy();
        call.sendUnaryMessage(err, value, trailer, flags);
    }
    if (call.cancelled) {
        return;
    }
    stream.on('error', respond);
    handler.func(stream, respond);
}
async function handleServerStreaming(call, handler, metadata) {
    const request = await call.receiveUnaryMessage();
    if (request === undefined || call.cancelled) {
        return;
    }
    const stream = new server_call_1.ServerWritableStreamImpl(call, metadata, handler.serialize, request);
    handler.func(stream);
}
function handleBidiStreaming(call, handler, metadata) {
    const stream = new server_call_1.ServerDuplexStreamImpl(call, metadata, handler.serialize, handler.deserialize);
    if (call.cancelled) {
        return;
    }
    handler.func(stream);
}
//# sourceMappingURL=server.js.map
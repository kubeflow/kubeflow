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
exports.getProxiedConnection = exports.mapProxyName = void 0;
const logging_1 = require("./logging");
const constants_1 = require("./constants");
const resolver_1 = require("./resolver");
const http = require("http");
const tls = require("tls");
const logging = require("./logging");
const subchannel_1 = require("./subchannel");
const uri_parser_1 = require("./uri-parser");
const url_1 = require("url");
const TRACER_NAME = 'proxy';
function trace(text) {
    logging.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
}
function getProxyInfo() {
    let proxyEnv = '';
    let envVar = '';
    /* Prefer using 'grpc_proxy'. Fallback on 'http_proxy' if it is not set.
     * Also prefer using 'https_proxy' with fallback on 'http_proxy'. The
     * fallback behavior can be removed if there's a demand for it.
     */
    if (process.env.grpc_proxy) {
        envVar = 'grpc_proxy';
        proxyEnv = process.env.grpc_proxy;
    }
    else if (process.env.https_proxy) {
        envVar = 'https_proxy';
        proxyEnv = process.env.https_proxy;
    }
    else if (process.env.http_proxy) {
        envVar = 'http_proxy';
        proxyEnv = process.env.http_proxy;
    }
    else {
        return {};
    }
    let proxyUrl;
    try {
        proxyUrl = new url_1.URL(proxyEnv);
    }
    catch (e) {
        logging_1.log(constants_1.LogVerbosity.ERROR, `cannot parse value of "${envVar}" env var`);
        return {};
    }
    if (proxyUrl.protocol !== 'http:') {
        logging_1.log(constants_1.LogVerbosity.ERROR, `"${proxyUrl.protocol}" scheme not supported in proxy URI`);
        return {};
    }
    let userCred = null;
    if (proxyUrl.username) {
        if (proxyUrl.password) {
            logging_1.log(constants_1.LogVerbosity.INFO, 'userinfo found in proxy URI');
            userCred = `${proxyUrl.username}:${proxyUrl.password}`;
        }
        else {
            userCred = proxyUrl.username;
        }
    }
    const hostname = proxyUrl.hostname;
    let port = proxyUrl.port;
    /* The proxy URL uses the scheme "http:", which has a default port number of
     * 80. We need to set that explicitly here if it is omitted because otherwise
     * it will use gRPC's default port 443. */
    if (port === '') {
        port = '80';
    }
    const result = {
        address: `${hostname}:${port}`
    };
    if (userCred) {
        result.creds = userCred;
    }
    trace('Proxy server ' + result.address + ' set by environment variable ' + envVar);
    return result;
}
function getNoProxyHostList() {
    /* Prefer using 'no_grpc_proxy'. Fallback on 'no_proxy' if it is not set. */
    let noProxyStr = process.env.no_grpc_proxy;
    let envVar = 'no_grpc_proxy';
    if (!noProxyStr) {
        noProxyStr = process.env.no_proxy;
        envVar = 'no_proxy';
    }
    if (noProxyStr) {
        trace('No proxy server list set by environment variable ' + envVar);
        return noProxyStr.split(',');
    }
    else {
        return [];
    }
}
function mapProxyName(target, options) {
    var _a;
    const noProxyResult = {
        target: target,
        extraOptions: {},
    };
    if (((_a = options['grpc.enable_http_proxy']) !== null && _a !== void 0 ? _a : 1) === 0) {
        return noProxyResult;
    }
    const proxyInfo = getProxyInfo();
    if (!proxyInfo.address) {
        return noProxyResult;
    }
    const hostPort = uri_parser_1.splitHostPort(target.path);
    if (!hostPort) {
        return noProxyResult;
    }
    const serverHost = hostPort.host;
    for (const host of getNoProxyHostList()) {
        if (host === serverHost) {
            trace('Not using proxy for target in no_proxy list: ' + uri_parser_1.uriToString(target));
            return noProxyResult;
        }
    }
    const extraOptions = {
        'grpc.http_connect_target': uri_parser_1.uriToString(target),
    };
    if (proxyInfo.creds) {
        extraOptions['grpc.http_connect_creds'] = proxyInfo.creds;
    }
    return {
        target: {
            scheme: 'dns',
            path: proxyInfo.address,
        },
        extraOptions: extraOptions,
    };
}
exports.mapProxyName = mapProxyName;
function getProxiedConnection(address, channelOptions, connectionOptions) {
    if (!('grpc.http_connect_target' in channelOptions)) {
        return Promise.resolve({});
    }
    const realTarget = channelOptions['grpc.http_connect_target'];
    const parsedTarget = uri_parser_1.parseUri(realTarget);
    if (parsedTarget === null) {
        return Promise.resolve({});
    }
    const options = {
        method: 'CONNECT',
        path: parsedTarget.path,
    };
    // Connect to the subchannel address as a proxy
    if (subchannel_1.isTcpSubchannelAddress(address)) {
        options.host = address.host;
        options.port = address.port;
    }
    else {
        options.socketPath = address.path;
    }
    if ('grpc.http_connect_creds' in channelOptions) {
        options.headers = {
            'Proxy-Authorization': 'Basic ' +
                Buffer.from(channelOptions['grpc.http_connect_creds']).toString('base64'),
        };
    }
    const proxyAddressString = subchannel_1.subchannelAddressToString(address);
    trace('Using proxy ' + proxyAddressString + ' to connect to ' + options.path);
    return new Promise((resolve, reject) => {
        const request = http.request(options);
        request.once('connect', (res, socket, head) => {
            var _a;
            request.removeAllListeners();
            socket.removeAllListeners();
            if (res.statusCode === 200) {
                trace('Successfully connected to ' +
                    options.path +
                    ' through proxy ' +
                    proxyAddressString);
                if ('secureContext' in connectionOptions) {
                    /* The proxy is connecting to a TLS server, so upgrade this socket
                     * connection to a TLS connection.
                     * This is a workaround for https://github.com/nodejs/node/issues/32922
                     * See https://github.com/grpc/grpc-node/pull/1369 for more info. */
                    const targetPath = resolver_1.getDefaultAuthority(parsedTarget);
                    const hostPort = uri_parser_1.splitHostPort(targetPath);
                    const remoteHost = (_a = hostPort === null || hostPort === void 0 ? void 0 : hostPort.host) !== null && _a !== void 0 ? _a : targetPath;
                    const cts = tls.connect(Object.assign({ host: remoteHost, servername: remoteHost, socket: socket }, connectionOptions), () => {
                        trace('Successfully established a TLS connection to ' +
                            options.path +
                            ' through proxy ' +
                            proxyAddressString);
                        resolve({ socket: cts, realTarget: parsedTarget });
                    });
                    cts.on('error', (error) => {
                        trace('Failed to establish a TLS connection to ' +
                            options.path +
                            ' through proxy ' +
                            proxyAddressString +
                            ' with error ' +
                            error.message);
                        reject();
                    });
                }
                else {
                    trace('Successfully established a plaintext connection to ' +
                        options.path +
                        ' through proxy ' +
                        proxyAddressString);
                    resolve({
                        socket,
                        realTarget: parsedTarget,
                    });
                }
            }
            else {
                logging_1.log(constants_1.LogVerbosity.ERROR, 'Failed to connect to ' +
                    options.path +
                    ' through proxy ' +
                    proxyAddressString +
                    ' with status ' +
                    res.statusCode);
                reject();
            }
        });
        request.once('error', (err) => {
            request.removeAllListeners();
            logging_1.log(constants_1.LogVerbosity.ERROR, 'Failed to connect to proxy ' +
                proxyAddressString +
                ' with error ' +
                err.message);
            reject();
        });
        request.end();
    });
}
exports.getProxiedConnection = getProxiedConnection;
//# sourceMappingURL=http_proxy.js.map
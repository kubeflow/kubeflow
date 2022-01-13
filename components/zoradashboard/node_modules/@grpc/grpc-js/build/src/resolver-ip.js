"use strict";
/*
 * Copyright 2021 gRPC authors.
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
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const net_1 = require("net");
const constants_1 = require("./constants");
const metadata_1 = require("./metadata");
const resolver_1 = require("./resolver");
const uri_parser_1 = require("./uri-parser");
const logging = require("./logging");
const TRACER_NAME = 'ip_resolver';
function trace(text) {
    logging.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
}
const IPV4_SCHEME = 'ipv4';
const IPV6_SCHEME = 'ipv6';
/**
 * The default TCP port to connect to if not explicitly specified in the target.
 */
const DEFAULT_PORT = 443;
class IpResolver {
    constructor(target, listener, channelOptions) {
        var _a;
        this.target = target;
        this.listener = listener;
        this.addresses = [];
        this.error = null;
        trace('Resolver constructed for target ' + uri_parser_1.uriToString(target));
        const addresses = [];
        if (!(target.scheme === IPV4_SCHEME || target.scheme === IPV6_SCHEME)) {
            this.error = {
                code: constants_1.Status.UNAVAILABLE,
                details: `Unrecognized scheme ${target.scheme} in IP resolver`,
                metadata: new metadata_1.Metadata()
            };
            return;
        }
        const pathList = target.path.split(',');
        for (const path of pathList) {
            const hostPort = uri_parser_1.splitHostPort(path);
            if (hostPort === null) {
                this.error = {
                    code: constants_1.Status.UNAVAILABLE,
                    details: `Failed to parse ${target.scheme} address ${path}`,
                    metadata: new metadata_1.Metadata()
                };
                return;
            }
            if ((target.scheme === IPV4_SCHEME && !net_1.isIPv4(hostPort.host)) || (target.scheme === IPV6_SCHEME && !net_1.isIPv6(hostPort.host))) {
                this.error = {
                    code: constants_1.Status.UNAVAILABLE,
                    details: `Failed to parse ${target.scheme} address ${path}`,
                    metadata: new metadata_1.Metadata()
                };
                return;
            }
            addresses.push({
                host: hostPort.host,
                port: (_a = hostPort.port) !== null && _a !== void 0 ? _a : DEFAULT_PORT
            });
        }
        this.addresses = addresses;
        trace('Parsed ' + target.scheme + ' address list ' + this.addresses);
    }
    updateResolution() {
        process.nextTick(() => {
            if (this.error) {
                this.listener.onError(this.error);
            }
            else {
                this.listener.onSuccessfulResolution(this.addresses, null, null, null, {});
            }
        });
    }
    destroy() {
        // This resolver owns no resources, so we do nothing here.
    }
    static getDefaultAuthority(target) {
        return target.path.split(',')[0];
    }
}
function setup() {
    resolver_1.registerResolver(IPV4_SCHEME, IpResolver);
    resolver_1.registerResolver(IPV6_SCHEME, IpResolver);
}
exports.setup = setup;
//# sourceMappingURL=resolver-ip.js.map
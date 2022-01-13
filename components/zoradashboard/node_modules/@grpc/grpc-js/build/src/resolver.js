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
exports.registerAll = exports.mapUriDefaultScheme = exports.getDefaultAuthority = exports.createResolver = exports.registerDefaultScheme = exports.registerResolver = void 0;
const resolver_dns = require("./resolver-dns");
const resolver_uds = require("./resolver-uds");
const resolver_ip = require("./resolver-ip");
const uri_parser_1 = require("./uri-parser");
const registeredResolvers = {};
let defaultScheme = null;
/**
 * Register a resolver class to handle target names prefixed with the `prefix`
 * string. This prefix should correspond to a URI scheme name listed in the
 * [gRPC Name Resolution document](https://github.com/grpc/grpc/blob/master/doc/naming.md)
 * @param prefix
 * @param resolverClass
 */
function registerResolver(scheme, resolverClass) {
    registeredResolvers[scheme] = resolverClass;
}
exports.registerResolver = registerResolver;
/**
 * Register a default resolver to handle target names that do not start with
 * any registered prefix.
 * @param resolverClass
 */
function registerDefaultScheme(scheme) {
    defaultScheme = scheme;
}
exports.registerDefaultScheme = registerDefaultScheme;
/**
 * Create a name resolver for the specified target, if possible. Throws an
 * error if no such name resolver can be created.
 * @param target
 * @param listener
 */
function createResolver(target, listener, options) {
    if (target.scheme !== undefined && target.scheme in registeredResolvers) {
        return new registeredResolvers[target.scheme](target, listener, options);
    }
    else {
        throw new Error(`No resolver could be created for target ${uri_parser_1.uriToString(target)}`);
    }
}
exports.createResolver = createResolver;
/**
 * Get the default authority for the specified target, if possible. Throws an
 * error if no registered name resolver can parse that target string.
 * @param target
 */
function getDefaultAuthority(target) {
    if (target.scheme !== undefined && target.scheme in registeredResolvers) {
        return registeredResolvers[target.scheme].getDefaultAuthority(target);
    }
    else {
        throw new Error(`Invalid target ${uri_parser_1.uriToString(target)}`);
    }
}
exports.getDefaultAuthority = getDefaultAuthority;
function mapUriDefaultScheme(target) {
    if (target.scheme === undefined || !(target.scheme in registeredResolvers)) {
        if (defaultScheme !== null) {
            return {
                scheme: defaultScheme,
                authority: undefined,
                path: uri_parser_1.uriToString(target),
            };
        }
        else {
            return null;
        }
    }
    return target;
}
exports.mapUriDefaultScheme = mapUriDefaultScheme;
function registerAll() {
    resolver_dns.setup();
    resolver_uds.setup();
    resolver_ip.setup();
}
exports.registerAll = registerAll;
//# sourceMappingURL=resolver.js.map
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
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const resolver_1 = require("./resolver");
const dns = require("dns");
const util = require("util");
const service_config_1 = require("./service-config");
const constants_1 = require("./constants");
const metadata_1 = require("./metadata");
const logging = require("./logging");
const constants_2 = require("./constants");
const uri_parser_1 = require("./uri-parser");
const net_1 = require("net");
const TRACER_NAME = 'dns_resolver';
function trace(text) {
    logging.trace(constants_2.LogVerbosity.DEBUG, TRACER_NAME, text);
}
/**
 * The default TCP port to connect to if not explicitly specified in the target.
 */
const DEFAULT_PORT = 443;
const resolveTxtPromise = util.promisify(dns.resolveTxt);
const dnsLookupPromise = util.promisify(dns.lookup);
/**
 * Merge any number of arrays into a single alternating array
 * @param arrays
 */
function mergeArrays(...arrays) {
    const result = [];
    for (let i = 0; i <
        Math.max.apply(null, arrays.map((array) => array.length)); i++) {
        for (const array of arrays) {
            if (i < array.length) {
                result.push(array[i]);
            }
        }
    }
    return result;
}
/**
 * Resolver implementation that handles DNS names and IP addresses.
 */
class DnsResolver {
    constructor(target, listener, channelOptions) {
        var _a, _b;
        this.target = target;
        this.listener = listener;
        this.pendingLookupPromise = null;
        this.pendingTxtPromise = null;
        this.latestLookupResult = null;
        this.latestServiceConfig = null;
        this.latestServiceConfigError = null;
        trace('Resolver constructed for target ' + uri_parser_1.uriToString(target));
        const hostPort = uri_parser_1.splitHostPort(target.path);
        if (hostPort === null) {
            this.ipResult = null;
            this.dnsHostname = null;
            this.port = null;
        }
        else {
            if (net_1.isIPv4(hostPort.host) || net_1.isIPv6(hostPort.host)) {
                this.ipResult = [
                    {
                        host: hostPort.host,
                        port: (_a = hostPort.port) !== null && _a !== void 0 ? _a : DEFAULT_PORT,
                    },
                ];
                this.dnsHostname = null;
                this.port = null;
            }
            else {
                this.ipResult = null;
                this.dnsHostname = hostPort.host;
                this.port = (_b = hostPort.port) !== null && _b !== void 0 ? _b : DEFAULT_PORT;
            }
        }
        this.percentage = Math.random() * 100;
        this.defaultResolutionError = {
            code: constants_1.Status.UNAVAILABLE,
            details: `Name resolution failed for target ${uri_parser_1.uriToString(this.target)}`,
            metadata: new metadata_1.Metadata(),
        };
    }
    /**
     * If the target is an IP address, just provide that address as a result.
     * Otherwise, initiate A, AAAA, and TXT lookups
     */
    startResolution() {
        if (this.ipResult !== null) {
            trace('Returning IP address for target ' + uri_parser_1.uriToString(this.target));
            setImmediate(() => {
                this.listener.onSuccessfulResolution(this.ipResult, null, null, null, {});
            });
            return;
        }
        if (this.dnsHostname === null) {
            setImmediate(() => {
                this.listener.onError({
                    code: constants_1.Status.UNAVAILABLE,
                    details: `Failed to parse DNS address ${uri_parser_1.uriToString(this.target)}`,
                    metadata: new metadata_1.Metadata(),
                });
            });
        }
        else {
            /* We clear out latestLookupResult here to ensure that it contains the
             * latest result since the last time we started resolving. That way, the
             * TXT resolution handler can use it, but only if it finishes second. We
             * don't clear out any previous service config results because it's
             * better to use a service config that's slightly out of date than to
             * revert to an effectively blank one. */
            this.latestLookupResult = null;
            const hostname = this.dnsHostname;
            /* We lookup both address families here and then split them up later
             * because when looking up a single family, dns.lookup outputs an error
             * if the name exists but there are no records for that family, and that
             * error is indistinguishable from other kinds of errors */
            this.pendingLookupPromise = dnsLookupPromise(hostname, { all: true });
            this.pendingLookupPromise.then((addressList) => {
                this.pendingLookupPromise = null;
                const ip4Addresses = addressList.filter((addr) => addr.family === 4);
                const ip6Addresses = addressList.filter((addr) => addr.family === 6);
                this.latestLookupResult = mergeArrays(ip6Addresses, ip4Addresses).map((addr) => ({ host: addr.address, port: +this.port }));
                const allAddressesString = '[' +
                    this.latestLookupResult
                        .map((addr) => addr.host + ':' + addr.port)
                        .join(',') +
                    ']';
                trace('Resolved addresses for target ' +
                    uri_parser_1.uriToString(this.target) +
                    ': ' +
                    allAddressesString);
                if (this.latestLookupResult.length === 0) {
                    this.listener.onError(this.defaultResolutionError);
                    return;
                }
                /* If the TXT lookup has not yet finished, both of the last two
                 * arguments will be null, which is the equivalent of getting an
                 * empty TXT response. When the TXT lookup does finish, its handler
                 * can update the service config by using the same address list */
                this.listener.onSuccessfulResolution(this.latestLookupResult, this.latestServiceConfig, this.latestServiceConfigError, null, {});
            }, (err) => {
                trace('Resolution error for target ' +
                    uri_parser_1.uriToString(this.target) +
                    ': ' +
                    err.message);
                this.pendingLookupPromise = null;
                this.listener.onError(this.defaultResolutionError);
            });
            /* If there already is a still-pending TXT resolution, we can just use
             * that result when it comes in */
            if (this.pendingTxtPromise === null) {
                /* We handle the TXT query promise differently than the others because
                 * the name resolution attempt as a whole is a success even if the TXT
                 * lookup fails */
                this.pendingTxtPromise = resolveTxtPromise(hostname);
                this.pendingTxtPromise.then((txtRecord) => {
                    this.pendingTxtPromise = null;
                    try {
                        this.latestServiceConfig = service_config_1.extractAndSelectServiceConfig(txtRecord, this.percentage);
                    }
                    catch (err) {
                        this.latestServiceConfigError = {
                            code: constants_1.Status.UNAVAILABLE,
                            details: 'Parsing service config failed',
                            metadata: new metadata_1.Metadata(),
                        };
                    }
                    if (this.latestLookupResult !== null) {
                        /* We rely here on the assumption that calling this function with
                         * identical parameters will be essentialy idempotent, and calling
                         * it with the same address list and a different service config
                         * should result in a fast and seamless switchover. */
                        this.listener.onSuccessfulResolution(this.latestLookupResult, this.latestServiceConfig, this.latestServiceConfigError, null, {});
                    }
                }, (err) => {
                    /* If TXT lookup fails we should do nothing, which means that we
                     * continue to use the result of the most recent successful lookup,
                     * or the default null config object if there has never been a
                     * successful lookup. We do not set the latestServiceConfigError
                     * here because that is specifically used for response validation
                     * errors. We still need to handle this error so that it does not
                     * bubble up as an unhandled promise rejection. */
                });
            }
        }
    }
    updateResolution() {
        trace('Resolution update requested for target ' + uri_parser_1.uriToString(this.target));
        if (this.pendingLookupPromise === null) {
            this.startResolution();
        }
    }
    destroy() {
        /* Do nothing. There is not a practical way to cancel in-flight DNS
         * requests, and after this function is called we can expect that
         * updateResolution will not be called again. */
    }
    /**
     * Get the default authority for the given target. For IP targets, that is
     * the IP address. For DNS targets, it is the hostname.
     * @param target
     */
    static getDefaultAuthority(target) {
        return target.path;
    }
}
/**
 * Set up the DNS resolver class by registering it as the handler for the
 * "dns:" prefix and as the default resolver.
 */
function setup() {
    resolver_1.registerResolver('dns', DnsResolver);
    resolver_1.registerDefaultScheme('dns');
}
exports.setup = setup;
//# sourceMappingURL=resolver-dns.js.map
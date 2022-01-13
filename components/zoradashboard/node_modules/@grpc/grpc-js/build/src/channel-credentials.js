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
exports.ChannelCredentials = void 0;
const tls_1 = require("tls");
const call_credentials_1 = require("./call-credentials");
const tls_helpers_1 = require("./tls-helpers");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function verifyIsBufferOrNull(obj, friendlyName) {
    if (obj && !(obj instanceof Buffer)) {
        throw new TypeError(`${friendlyName}, if provided, must be a Buffer.`);
    }
}
function bufferOrNullEqual(buf1, buf2) {
    if (buf1 === null && buf2 === null) {
        return true;
    }
    else {
        return buf1 !== null && buf2 !== null && buf1.equals(buf2);
    }
}
/**
 * A class that contains credentials for communicating over a channel, as well
 * as a set of per-call credentials, which are applied to every method call made
 * over a channel initialized with an instance of this class.
 */
class ChannelCredentials {
    constructor(callCredentials) {
        this.callCredentials = callCredentials || call_credentials_1.CallCredentials.createEmpty();
    }
    /**
     * Gets the set of per-call credentials associated with this instance.
     */
    _getCallCredentials() {
        return this.callCredentials;
    }
    /**
     * Return a new ChannelCredentials instance with a given set of credentials.
     * The resulting instance can be used to construct a Channel that communicates
     * over TLS.
     * @param rootCerts The root certificate data.
     * @param privateKey The client certificate private key, if available.
     * @param certChain The client certificate key chain, if available.
     */
    static createSsl(rootCerts, privateKey, certChain, verifyOptions) {
        verifyIsBufferOrNull(rootCerts, 'Root certificate');
        verifyIsBufferOrNull(privateKey, 'Private key');
        verifyIsBufferOrNull(certChain, 'Certificate chain');
        if (privateKey && !certChain) {
            throw new Error('Private key must be given with accompanying certificate chain');
        }
        if (!privateKey && certChain) {
            throw new Error('Certificate chain must be given with accompanying private key');
        }
        return new SecureChannelCredentialsImpl(rootCerts || tls_helpers_1.getDefaultRootsData(), privateKey || null, certChain || null, verifyOptions || {});
    }
    /**
     * Return a new ChannelCredentials instance with no credentials.
     */
    static createInsecure() {
        return new InsecureChannelCredentialsImpl();
    }
}
exports.ChannelCredentials = ChannelCredentials;
class InsecureChannelCredentialsImpl extends ChannelCredentials {
    constructor(callCredentials) {
        super(callCredentials);
    }
    compose(callCredentials) {
        throw new Error('Cannot compose insecure credentials');
    }
    _getConnectionOptions() {
        return null;
    }
    _isSecure() {
        return false;
    }
    _equals(other) {
        return other instanceof InsecureChannelCredentialsImpl;
    }
}
class SecureChannelCredentialsImpl extends ChannelCredentials {
    constructor(rootCerts, privateKey, certChain, verifyOptions) {
        super();
        this.rootCerts = rootCerts;
        this.privateKey = privateKey;
        this.certChain = certChain;
        this.verifyOptions = verifyOptions;
        const secureContext = tls_1.createSecureContext({
            ca: rootCerts || undefined,
            key: privateKey || undefined,
            cert: certChain || undefined,
            ciphers: tls_helpers_1.CIPHER_SUITES,
        });
        this.connectionOptions = { secureContext };
        if (verifyOptions && verifyOptions.checkServerIdentity) {
            this.connectionOptions.checkServerIdentity = (host, cert) => {
                return verifyOptions.checkServerIdentity(host, { raw: cert.raw });
            };
        }
    }
    compose(callCredentials) {
        const combinedCallCredentials = this.callCredentials.compose(callCredentials);
        return new ComposedChannelCredentialsImpl(this, combinedCallCredentials);
    }
    _getConnectionOptions() {
        // Copy to prevent callers from mutating this.connectionOptions
        return Object.assign({}, this.connectionOptions);
    }
    _isSecure() {
        return true;
    }
    _equals(other) {
        if (this === other) {
            return true;
        }
        if (other instanceof SecureChannelCredentialsImpl) {
            if (!bufferOrNullEqual(this.rootCerts, other.rootCerts)) {
                return false;
            }
            if (!bufferOrNullEqual(this.privateKey, other.privateKey)) {
                return false;
            }
            if (!bufferOrNullEqual(this.certChain, other.certChain)) {
                return false;
            }
            return (this.verifyOptions.checkServerIdentity ===
                other.verifyOptions.checkServerIdentity);
        }
        else {
            return false;
        }
    }
}
class ComposedChannelCredentialsImpl extends ChannelCredentials {
    constructor(channelCredentials, callCreds) {
        super(callCreds);
        this.channelCredentials = channelCredentials;
    }
    compose(callCredentials) {
        const combinedCallCredentials = this.callCredentials.compose(callCredentials);
        return new ComposedChannelCredentialsImpl(this.channelCredentials, combinedCallCredentials);
    }
    _getConnectionOptions() {
        return this.channelCredentials._getConnectionOptions();
    }
    _isSecure() {
        return true;
    }
    _equals(other) {
        if (this === other) {
            return true;
        }
        if (other instanceof ComposedChannelCredentialsImpl) {
            return (this.channelCredentials._equals(other.channelCredentials) &&
                this.callCredentials._equals(other.callCredentials));
        }
        else {
            return false;
        }
    }
}
//# sourceMappingURL=channel-credentials.js.map
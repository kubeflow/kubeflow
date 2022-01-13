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
exports.Metadata = void 0;
const logging_1 = require("./logging");
const constants_1 = require("./constants");
const LEGAL_KEY_REGEX = /^[0-9a-z_.-]+$/;
const LEGAL_NON_BINARY_VALUE_REGEX = /^[ -~]*$/;
function isLegalKey(key) {
    return LEGAL_KEY_REGEX.test(key);
}
function isLegalNonBinaryValue(value) {
    return LEGAL_NON_BINARY_VALUE_REGEX.test(value);
}
function isBinaryKey(key) {
    return key.endsWith('-bin');
}
function isCustomMetadata(key) {
    return !key.startsWith('grpc-');
}
function normalizeKey(key) {
    return key.toLowerCase();
}
function validate(key, value) {
    if (!isLegalKey(key)) {
        throw new Error('Metadata key "' + key + '" contains illegal characters');
    }
    if (value !== null && value !== undefined) {
        if (isBinaryKey(key)) {
            if (!(value instanceof Buffer)) {
                throw new Error("keys that end with '-bin' must have Buffer values");
            }
        }
        else {
            if (value instanceof Buffer) {
                throw new Error("keys that don't end with '-bin' must have String values");
            }
            if (!isLegalNonBinaryValue(value)) {
                throw new Error('Metadata string value "' + value + '" contains illegal characters');
            }
        }
    }
}
/**
 * A class for storing metadata. Keys are normalized to lowercase ASCII.
 */
class Metadata {
    constructor(options) {
        this.internalRepr = new Map();
        if (options === undefined) {
            this.options = {};
        }
        else {
            this.options = options;
        }
    }
    /**
     * Sets the given value for the given key by replacing any other values
     * associated with that key. Normalizes the key.
     * @param key The key to whose value should be set.
     * @param value The value to set. Must be a buffer if and only
     *   if the normalized key ends with '-bin'.
     */
    set(key, value) {
        key = normalizeKey(key);
        validate(key, value);
        this.internalRepr.set(key, [value]);
    }
    /**
     * Adds the given value for the given key by appending to a list of previous
     * values associated with that key. Normalizes the key.
     * @param key The key for which a new value should be appended.
     * @param value The value to add. Must be a buffer if and only
     *   if the normalized key ends with '-bin'.
     */
    add(key, value) {
        key = normalizeKey(key);
        validate(key, value);
        const existingValue = this.internalRepr.get(key);
        if (existingValue === undefined) {
            this.internalRepr.set(key, [value]);
        }
        else {
            existingValue.push(value);
        }
    }
    /**
     * Removes the given key and any associated values. Normalizes the key.
     * @param key The key whose values should be removed.
     */
    remove(key) {
        key = normalizeKey(key);
        validate(key);
        this.internalRepr.delete(key);
    }
    /**
     * Gets a list of all values associated with the key. Normalizes the key.
     * @param key The key whose value should be retrieved.
     * @return A list of values associated with the given key.
     */
    get(key) {
        key = normalizeKey(key);
        validate(key);
        return this.internalRepr.get(key) || [];
    }
    /**
     * Gets a plain object mapping each key to the first value associated with it.
     * This reflects the most common way that people will want to see metadata.
     * @return A key/value mapping of the metadata.
     */
    getMap() {
        const result = {};
        this.internalRepr.forEach((values, key) => {
            if (values.length > 0) {
                const v = values[0];
                result[key] = v instanceof Buffer ? v.slice() : v;
            }
        });
        return result;
    }
    /**
     * Clones the metadata object.
     * @return The newly cloned object.
     */
    clone() {
        const newMetadata = new Metadata(this.options);
        const newInternalRepr = newMetadata.internalRepr;
        this.internalRepr.forEach((value, key) => {
            const clonedValue = value.map((v) => {
                if (v instanceof Buffer) {
                    return Buffer.from(v);
                }
                else {
                    return v;
                }
            });
            newInternalRepr.set(key, clonedValue);
        });
        return newMetadata;
    }
    /**
     * Merges all key-value pairs from a given Metadata object into this one.
     * If both this object and the given object have values in the same key,
     * values from the other Metadata object will be appended to this object's
     * values.
     * @param other A Metadata object.
     */
    merge(other) {
        other.internalRepr.forEach((values, key) => {
            const mergedValue = (this.internalRepr.get(key) || []).concat(values);
            this.internalRepr.set(key, mergedValue);
        });
    }
    setOptions(options) {
        this.options = options;
    }
    getOptions() {
        return this.options;
    }
    /**
     * Creates an OutgoingHttpHeaders object that can be used with the http2 API.
     */
    toHttp2Headers() {
        // NOTE: Node <8.9 formats http2 headers incorrectly.
        const result = {};
        this.internalRepr.forEach((values, key) => {
            // We assume that the user's interaction with this object is limited to
            // through its public API (i.e. keys and values are already validated).
            result[key] = values.map((value) => {
                if (value instanceof Buffer) {
                    return value.toString('base64');
                }
                else {
                    return value;
                }
            });
        });
        return result;
    }
    // For compatibility with the other Metadata implementation
    _getCoreRepresentation() {
        return this.internalRepr;
    }
    /**
     * Returns a new Metadata object based fields in a given IncomingHttpHeaders
     * object.
     * @param headers An IncomingHttpHeaders object.
     */
    static fromHttp2Headers(headers) {
        const result = new Metadata();
        Object.keys(headers).forEach((key) => {
            // Reserved headers (beginning with `:`) are not valid keys.
            if (key.charAt(0) === ':') {
                return;
            }
            const values = headers[key];
            try {
                if (isBinaryKey(key)) {
                    if (Array.isArray(values)) {
                        values.forEach((value) => {
                            result.add(key, Buffer.from(value, 'base64'));
                        });
                    }
                    else if (values !== undefined) {
                        if (isCustomMetadata(key)) {
                            values.split(',').forEach((v) => {
                                result.add(key, Buffer.from(v.trim(), 'base64'));
                            });
                        }
                        else {
                            result.add(key, Buffer.from(values, 'base64'));
                        }
                    }
                }
                else {
                    if (Array.isArray(values)) {
                        values.forEach((value) => {
                            result.add(key, value);
                        });
                    }
                    else if (values !== undefined) {
                        result.add(key, values);
                    }
                }
            }
            catch (error) {
                const message = `Failed to add metadata entry ${key}: ${values}. ${error.message}. For more information see https://github.com/grpc/grpc-node/issues/1173`;
                logging_1.log(constants_1.LogVerbosity.ERROR, message);
            }
        });
        return result;
    }
}
exports.Metadata = Metadata;
//# sourceMappingURL=metadata.js.map
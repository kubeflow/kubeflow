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
exports.CompressionFilterFactory = exports.CompressionFilter = void 0;
const zlib = require("zlib");
const filter_1 = require("./filter");
class CompressionHandler {
    /**
     * @param message Raw uncompressed message bytes
     * @param compress Indicates whether the message should be compressed
     * @return Framed message, compressed if applicable
     */
    async writeMessage(message, compress) {
        let messageBuffer = message;
        if (compress) {
            messageBuffer = await this.compressMessage(messageBuffer);
        }
        const output = Buffer.allocUnsafe(messageBuffer.length + 5);
        output.writeUInt8(compress ? 1 : 0, 0);
        output.writeUInt32BE(messageBuffer.length, 1);
        messageBuffer.copy(output, 5);
        return output;
    }
    /**
     * @param data Framed message, possibly compressed
     * @return Uncompressed message
     */
    async readMessage(data) {
        const compressed = data.readUInt8(0) === 1;
        let messageBuffer = data.slice(5);
        if (compressed) {
            messageBuffer = await this.decompressMessage(messageBuffer);
        }
        return messageBuffer;
    }
}
class IdentityHandler extends CompressionHandler {
    async compressMessage(message) {
        return message;
    }
    async writeMessage(message, compress) {
        const output = Buffer.allocUnsafe(message.length + 5);
        /* With "identity" compression, messages should always be marked as
         * uncompressed */
        output.writeUInt8(0, 0);
        output.writeUInt32BE(message.length, 1);
        message.copy(output, 5);
        return output;
    }
    decompressMessage(message) {
        return Promise.reject(new Error('Received compressed message but "grpc-encoding" header was identity'));
    }
}
class DeflateHandler extends CompressionHandler {
    compressMessage(message) {
        return new Promise((resolve, reject) => {
            zlib.deflate(message, (err, output) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(output);
                }
            });
        });
    }
    decompressMessage(message) {
        return new Promise((resolve, reject) => {
            zlib.inflate(message, (err, output) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(output);
                }
            });
        });
    }
}
class GzipHandler extends CompressionHandler {
    compressMessage(message) {
        return new Promise((resolve, reject) => {
            zlib.gzip(message, (err, output) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(output);
                }
            });
        });
    }
    decompressMessage(message) {
        return new Promise((resolve, reject) => {
            zlib.unzip(message, (err, output) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(output);
                }
            });
        });
    }
}
class UnknownHandler extends CompressionHandler {
    constructor(compressionName) {
        super();
        this.compressionName = compressionName;
    }
    compressMessage(message) {
        return Promise.reject(new Error(`Received message compressed with unsupported compression method ${this.compressionName}`));
    }
    decompressMessage(message) {
        // This should be unreachable
        return Promise.reject(new Error(`Compression method not supported: ${this.compressionName}`));
    }
}
function getCompressionHandler(compressionName) {
    switch (compressionName) {
        case 'identity':
            return new IdentityHandler();
        case 'deflate':
            return new DeflateHandler();
        case 'gzip':
            return new GzipHandler();
        default:
            return new UnknownHandler(compressionName);
    }
}
class CompressionFilter extends filter_1.BaseFilter {
    constructor() {
        super(...arguments);
        this.sendCompression = new IdentityHandler();
        this.receiveCompression = new IdentityHandler();
    }
    async sendMetadata(metadata) {
        const headers = await metadata;
        headers.set('grpc-accept-encoding', 'identity,deflate,gzip');
        headers.set('accept-encoding', 'identity');
        return headers;
    }
    receiveMetadata(metadata) {
        const receiveEncoding = metadata.get('grpc-encoding');
        if (receiveEncoding.length > 0) {
            const encoding = receiveEncoding[0];
            if (typeof encoding === 'string') {
                this.receiveCompression = getCompressionHandler(encoding);
            }
        }
        metadata.remove('grpc-encoding');
        metadata.remove('grpc-accept-encoding');
        return metadata;
    }
    async sendMessage(message) {
        /* This filter is special. The input message is the bare message bytes,
         * and the output is a framed and possibly compressed message. For this
         * reason, this filter should be at the bottom of the filter stack */
        const resolvedMessage = await message;
        const compress = resolvedMessage.flags === undefined
            ? false
            : (resolvedMessage.flags & 2 /* NoCompress */) === 0;
        return {
            message: await this.sendCompression.writeMessage(resolvedMessage.message, compress),
            flags: resolvedMessage.flags,
        };
    }
    async receiveMessage(message) {
        /* This filter is also special. The input message is framed and possibly
         * compressed, and the output message is deframed and uncompressed. So
         * this is another reason that this filter should be at the bottom of the
         * filter stack. */
        return this.receiveCompression.readMessage(await message);
    }
}
exports.CompressionFilter = CompressionFilter;
class CompressionFilterFactory {
    constructor(channel) {
        this.channel = channel;
    }
    createFilter(callStream) {
        return new CompressionFilter();
    }
}
exports.CompressionFilterFactory = CompressionFilterFactory;
//# sourceMappingURL=compression-filter.js.map
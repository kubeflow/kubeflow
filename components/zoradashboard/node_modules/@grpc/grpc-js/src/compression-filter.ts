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

import * as zlib from 'zlib';

import { Call, WriteFlags, WriteObject } from './call-stream';
import { Channel } from './channel';
import { BaseFilter, Filter, FilterFactory } from './filter';
import { Metadata, MetadataValue } from './metadata';

abstract class CompressionHandler {
  protected abstract compressMessage(message: Buffer): Promise<Buffer>;
  protected abstract decompressMessage(data: Buffer): Promise<Buffer>;
  /**
   * @param message Raw uncompressed message bytes
   * @param compress Indicates whether the message should be compressed
   * @return Framed message, compressed if applicable
   */
  async writeMessage(message: Buffer, compress: boolean): Promise<Buffer> {
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
  async readMessage(data: Buffer): Promise<Buffer> {
    const compressed = data.readUInt8(0) === 1;
    let messageBuffer = data.slice(5);
    if (compressed) {
      messageBuffer = await this.decompressMessage(messageBuffer);
    }
    return messageBuffer;
  }
}

class IdentityHandler extends CompressionHandler {
  async compressMessage(message: Buffer) {
    return message;
  }

  async writeMessage(message: Buffer, compress: boolean): Promise<Buffer> {
    const output = Buffer.allocUnsafe(message.length + 5);
    /* With "identity" compression, messages should always be marked as
     * uncompressed */
    output.writeUInt8(0, 0);
    output.writeUInt32BE(message.length, 1);
    message.copy(output, 5);
    return output;
  }

  decompressMessage(message: Buffer): Promise<Buffer> {
    return Promise.reject<Buffer>(
      new Error(
        'Received compressed message but "grpc-encoding" header was identity'
      )
    );
  }
}

class DeflateHandler extends CompressionHandler {
  compressMessage(message: Buffer) {
    return new Promise<Buffer>((resolve, reject) => {
      zlib.deflate(message, (err, output) => {
        if (err) {
          reject(err);
        } else {
          resolve(output);
        }
      });
    });
  }

  decompressMessage(message: Buffer) {
    return new Promise<Buffer>((resolve, reject) => {
      zlib.inflate(message, (err, output) => {
        if (err) {
          reject(err);
        } else {
          resolve(output);
        }
      });
    });
  }
}

class GzipHandler extends CompressionHandler {
  compressMessage(message: Buffer) {
    return new Promise<Buffer>((resolve, reject) => {
      zlib.gzip(message, (err, output) => {
        if (err) {
          reject(err);
        } else {
          resolve(output);
        }
      });
    });
  }

  decompressMessage(message: Buffer) {
    return new Promise<Buffer>((resolve, reject) => {
      zlib.unzip(message, (err, output) => {
        if (err) {
          reject(err);
        } else {
          resolve(output);
        }
      });
    });
  }
}

class UnknownHandler extends CompressionHandler {
  constructor(private readonly compressionName: string) {
    super();
  }
  compressMessage(message: Buffer): Promise<Buffer> {
    return Promise.reject<Buffer>(
      new Error(
        `Received message compressed with unsupported compression method ${this.compressionName}`
      )
    );
  }

  decompressMessage(message: Buffer): Promise<Buffer> {
    // This should be unreachable
    return Promise.reject<Buffer>(
      new Error(`Compression method not supported: ${this.compressionName}`)
    );
  }
}

function getCompressionHandler(compressionName: string): CompressionHandler {
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

export class CompressionFilter extends BaseFilter implements Filter {
  private sendCompression: CompressionHandler = new IdentityHandler();
  private receiveCompression: CompressionHandler = new IdentityHandler();
  async sendMetadata(metadata: Promise<Metadata>): Promise<Metadata> {
    const headers: Metadata = await metadata;
    headers.set('grpc-accept-encoding', 'identity,deflate,gzip');
    headers.set('accept-encoding', 'identity');
    return headers;
  }

  receiveMetadata(metadata: Metadata): Metadata {
    const receiveEncoding: MetadataValue[] = metadata.get('grpc-encoding');
    if (receiveEncoding.length > 0) {
      const encoding: MetadataValue = receiveEncoding[0];
      if (typeof encoding === 'string') {
        this.receiveCompression = getCompressionHandler(encoding);
      }
    }
    metadata.remove('grpc-encoding');
    metadata.remove('grpc-accept-encoding');
    return metadata;
  }

  async sendMessage(message: Promise<WriteObject>): Promise<WriteObject> {
    /* This filter is special. The input message is the bare message bytes,
     * and the output is a framed and possibly compressed message. For this
     * reason, this filter should be at the bottom of the filter stack */
    const resolvedMessage: WriteObject = await message;
    const compress =
      resolvedMessage.flags === undefined
        ? false
        : (resolvedMessage.flags & WriteFlags.NoCompress) === 0;
    return {
      message: await this.sendCompression.writeMessage(
        resolvedMessage.message,
        compress
      ),
      flags: resolvedMessage.flags,
    };
  }

  async receiveMessage(message: Promise<Buffer>) {
    /* This filter is also special. The input message is framed and possibly
     * compressed, and the output message is deframed and uncompressed. So
     * this is another reason that this filter should be at the bottom of the
     * filter stack. */
    return this.receiveCompression.readMessage(await message);
  }
}

export class CompressionFilterFactory
  implements FilterFactory<CompressionFilter> {
  constructor(private readonly channel: Channel) {}
  createFilter(callStream: Call): CompressionFilter {
    return new CompressionFilter();
  }
}

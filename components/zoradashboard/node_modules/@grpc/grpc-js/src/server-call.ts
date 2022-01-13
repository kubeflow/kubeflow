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

import { EventEmitter } from 'events';
import * as http2 from 'http2';
import { Duplex, Readable, Writable } from 'stream';

import { Deadline, StatusObject } from './call-stream';
import {
  Status,
  DEFAULT_MAX_SEND_MESSAGE_LENGTH,
  DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH,
  LogVerbosity,
} from './constants';
import { Deserialize, Serialize } from './make-client';
import { Metadata } from './metadata';
import { StreamDecoder } from './stream-decoder';
import { ObjectReadable, ObjectWritable } from './object-stream';
import { ChannelOptions } from './channel-options';
import * as logging from './logging';

const TRACER_NAME = 'server_call';

function trace(text: string): void {
  logging.trace(LogVerbosity.DEBUG, TRACER_NAME, text);
}

interface DeadlineUnitIndexSignature {
  [name: string]: number;
}

const GRPC_ACCEPT_ENCODING_HEADER = 'grpc-accept-encoding';
const GRPC_ENCODING_HEADER = 'grpc-encoding';
const GRPC_MESSAGE_HEADER = 'grpc-message';
const GRPC_STATUS_HEADER = 'grpc-status';
const GRPC_TIMEOUT_HEADER = 'grpc-timeout';
const DEADLINE_REGEX = /(\d{1,8})\s*([HMSmun])/;
const deadlineUnitsToMs: DeadlineUnitIndexSignature = {
  H: 3600000,
  M: 60000,
  S: 1000,
  m: 1,
  u: 0.001,
  n: 0.000001,
};
const defaultResponseHeaders = {
  // TODO(cjihrig): Remove these encoding headers from the default response
  // once compression is integrated.
  [GRPC_ACCEPT_ENCODING_HEADER]: 'identity',
  [GRPC_ENCODING_HEADER]: 'identity',
  [http2.constants.HTTP2_HEADER_STATUS]: http2.constants.HTTP_STATUS_OK,
  [http2.constants.HTTP2_HEADER_CONTENT_TYPE]: 'application/grpc+proto',
};
const defaultResponseOptions = {
  waitForTrailers: true,
} as http2.ServerStreamResponseOptions;

export type ServerStatusResponse = Partial<StatusObject>;

export type ServerErrorResponse = ServerStatusResponse & Error;

export type ServerSurfaceCall = {
  cancelled: boolean;
  readonly metadata: Metadata;
  getPeer(): string;
  sendMetadata(responseMetadata: Metadata): void;
  getDeadline(): Deadline;
} & EventEmitter;

export type ServerUnaryCall<RequestType, ResponseType> = ServerSurfaceCall & {
  request: RequestType;
};
export type ServerReadableStream<
  RequestType,
  ResponseType
> = ServerSurfaceCall & ObjectReadable<RequestType>;
export type ServerWritableStream<
  RequestType,
  ResponseType
> = ServerSurfaceCall &
  ObjectWritable<ResponseType> & {
    request: RequestType;
    end: (metadata?: Metadata) => void;
  };
export type ServerDuplexStream<RequestType, ResponseType> = ServerSurfaceCall &
  ObjectReadable<RequestType> &
  ObjectWritable<ResponseType> & { end: (metadata?: Metadata) => void };

export class ServerUnaryCallImpl<RequestType, ResponseType> extends EventEmitter
  implements ServerUnaryCall<RequestType, ResponseType> {
  cancelled: boolean;

  constructor(
    private call: Http2ServerCallStream<RequestType, ResponseType>,
    public metadata: Metadata,
    public request: RequestType
  ) {
    super();
    this.cancelled = false;
    this.call.setupSurfaceCall(this);
  }

  getPeer(): string {
    return this.call.getPeer();
  }

  sendMetadata(responseMetadata: Metadata): void {
    this.call.sendMetadata(responseMetadata);
  }

  getDeadline(): Deadline {
    return this.call.getDeadline();
  }
}

export class ServerReadableStreamImpl<RequestType, ResponseType>
  extends Readable
  implements ServerReadableStream<RequestType, ResponseType> {
  cancelled: boolean;

  constructor(
    private call: Http2ServerCallStream<RequestType, ResponseType>,
    public metadata: Metadata,
    public deserialize: Deserialize<RequestType>
  ) {
    super({ objectMode: true });
    this.cancelled = false;
    this.call.setupSurfaceCall(this);
    this.call.setupReadable(this);
  }

  _read(size: number) {
    if (!this.call.consumeUnpushedMessages(this)) {
      return;
    }

    this.call.resume();
  }

  getPeer(): string {
    return this.call.getPeer();
  }

  sendMetadata(responseMetadata: Metadata): void {
    this.call.sendMetadata(responseMetadata);
  }

  getDeadline(): Deadline {
    return this.call.getDeadline();
  }
}

export class ServerWritableStreamImpl<RequestType, ResponseType>
  extends Writable
  implements ServerWritableStream<RequestType, ResponseType> {
  cancelled: boolean;
  private trailingMetadata: Metadata;

  constructor(
    private call: Http2ServerCallStream<RequestType, ResponseType>,
    public metadata: Metadata,
    public serialize: Serialize<ResponseType>,
    public request: RequestType
  ) {
    super({ objectMode: true });
    this.cancelled = false;
    this.trailingMetadata = new Metadata();
    this.call.setupSurfaceCall(this);

    this.on('error', (err) => {
      this.call.sendError(err);
      this.end();
    });
  }

  getPeer(): string {
    return this.call.getPeer();
  }

  sendMetadata(responseMetadata: Metadata): void {
    this.call.sendMetadata(responseMetadata);
  }

  getDeadline(): Deadline {
    return this.call.getDeadline();
  }

  _write(
    chunk: ResponseType,
    encoding: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (...args: any[]) => void
  ) {
    try {
      const response = this.call.serializeMessage(chunk);

      if (!this.call.write(response)) {
        this.call.once('drain', callback);
        return;
      }
    } catch (err) {
      err.code = Status.INTERNAL;
      this.emit('error', err);
    }

    callback();
  }

  _final(callback: Function): void {
    this.call.sendStatus({
      code: Status.OK,
      details: 'OK',
      metadata: this.trailingMetadata,
    });
    callback(null);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  end(metadata?: any) {
    if (metadata) {
      this.trailingMetadata = metadata;
    }

    super.end();
  }
}

export class ServerDuplexStreamImpl<RequestType, ResponseType> extends Duplex
  implements ServerDuplexStream<RequestType, ResponseType> {
  cancelled: boolean;
  private trailingMetadata: Metadata;

  constructor(
    private call: Http2ServerCallStream<RequestType, ResponseType>,
    public metadata: Metadata,
    public serialize: Serialize<ResponseType>,
    public deserialize: Deserialize<RequestType>
  ) {
    super({ objectMode: true });
    this.cancelled = false;
    this.trailingMetadata = new Metadata();
    this.call.setupSurfaceCall(this);
    this.call.setupReadable(this);

    this.on('error', (err) => {
      this.call.sendError(err);
      this.end();
    });
  }

  getPeer(): string {
    return this.call.getPeer();
  }

  sendMetadata(responseMetadata: Metadata): void {
    this.call.sendMetadata(responseMetadata);
  }

  getDeadline(): Deadline {
    return this.call.getDeadline();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  end(metadata?: any) {
    if (metadata) {
      this.trailingMetadata = metadata;
    }

    super.end();
  }
}

ServerDuplexStreamImpl.prototype._read =
  ServerReadableStreamImpl.prototype._read;
ServerDuplexStreamImpl.prototype._write =
  ServerWritableStreamImpl.prototype._write;
ServerDuplexStreamImpl.prototype._final =
  ServerWritableStreamImpl.prototype._final;
ServerDuplexStreamImpl.prototype.end = ServerWritableStreamImpl.prototype.end;

// Unary response callback signature.
export type sendUnaryData<ResponseType> = (
  error: ServerErrorResponse | ServerStatusResponse | null,
  value?: ResponseType | null,
  trailer?: Metadata,
  flags?: number
) => void;

// User provided handler for unary calls.
export type handleUnaryCall<RequestType, ResponseType> = (
  call: ServerUnaryCall<RequestType, ResponseType>,
  callback: sendUnaryData<ResponseType>
) => void;

// User provided handler for client streaming calls.
export type handleClientStreamingCall<RequestType, ResponseType> = (
  call: ServerReadableStream<RequestType, ResponseType>,
  callback: sendUnaryData<ResponseType>
) => void;

// User provided handler for server streaming calls.
export type handleServerStreamingCall<RequestType, ResponseType> = (
  call: ServerWritableStream<RequestType, ResponseType>
) => void;

// User provided handler for bidirectional streaming calls.
export type handleBidiStreamingCall<RequestType, ResponseType> = (
  call: ServerDuplexStream<RequestType, ResponseType>
) => void;

export type HandleCall<RequestType, ResponseType> =
  | handleUnaryCall<RequestType, ResponseType>
  | handleClientStreamingCall<RequestType, ResponseType>
  | handleServerStreamingCall<RequestType, ResponseType>
  | handleBidiStreamingCall<RequestType, ResponseType>;

export interface UnaryHandler<RequestType, ResponseType> {
  func: handleUnaryCall<RequestType, ResponseType>;
  serialize: Serialize<ResponseType>;
  deserialize: Deserialize<RequestType>;
  type: HandlerType;
  path: string;
}

export interface ClientStreamingHandler<RequestType, ResponseType> {
  func: handleClientStreamingCall<RequestType, ResponseType>;
  serialize: Serialize<ResponseType>;
  deserialize: Deserialize<RequestType>;
  type: HandlerType;
  path: string;
}

export interface ServerStreamingHandler<RequestType, ResponseType> {
  func: handleServerStreamingCall<RequestType, ResponseType>;
  serialize: Serialize<ResponseType>;
  deserialize: Deserialize<RequestType>;
  type: HandlerType;
  path: string;
}

export interface BidiStreamingHandler<RequestType, ResponseType> {
  func: handleBidiStreamingCall<RequestType, ResponseType>;
  serialize: Serialize<ResponseType>;
  deserialize: Deserialize<RequestType>;
  type: HandlerType;
  path: string;
}

export type Handler<RequestType, ResponseType> =
  | UnaryHandler<RequestType, ResponseType>
  | ClientStreamingHandler<RequestType, ResponseType>
  | ServerStreamingHandler<RequestType, ResponseType>
  | BidiStreamingHandler<RequestType, ResponseType>;

export type HandlerType = 'bidi' | 'clientStream' | 'serverStream' | 'unary';

// Internal class that wraps the HTTP2 request.
export class Http2ServerCallStream<
  RequestType,
  ResponseType
> extends EventEmitter {
  cancelled = false;
  deadlineTimer: NodeJS.Timer = setTimeout(() => {}, 0);
  private deadline: Deadline = Infinity;
  private wantTrailers = false;
  private metadataSent = false;
  private canPush = false;
  private isPushPending = false;
  private bufferedMessages: Array<Buffer | null> = [];
  private messagesToPush: Array<RequestType | null> = [];
  private maxSendMessageSize: number = DEFAULT_MAX_SEND_MESSAGE_LENGTH;
  private maxReceiveMessageSize: number = DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH;

  constructor(
    private stream: http2.ServerHttp2Stream,
    private handler: Handler<RequestType, ResponseType>,
    private options: ChannelOptions
  ) {
    super();

    this.stream.once('error', (err: ServerErrorResponse) => {
      /* We need an error handler to avoid uncaught error event exceptions, but
       * there is nothing we can reasonably do here. Any error event should
       * have a corresponding close event, which handles emitting the cancelled
       * event. And the stream is now in a bad state, so we can't reasonably
       * expect to be able to send an error over it. */
    });

    this.stream.once('close', () => {
      trace(
        'Request to method ' +
          this.handler?.path +
          ' stream closed with rstCode ' +
          this.stream.rstCode
      );
      this.cancelled = true;
      this.emit('cancelled', 'cancelled');
    });

    this.stream.on('drain', () => {
      this.emit('drain');
    });

    if ('grpc.max_send_message_length' in options) {
      this.maxSendMessageSize = options['grpc.max_send_message_length']!;
    }
    if ('grpc.max_receive_message_length' in options) {
      this.maxReceiveMessageSize = options['grpc.max_receive_message_length']!;
    }

    // Clear noop timer
    clearTimeout(this.deadlineTimer);
  }

  private checkCancelled(): boolean {
    /* In some cases the stream can become destroyed before the close event
     * fires. That creates a race condition that this check works around */
    if (this.stream.destroyed) {
      this.cancelled = true;
    }
    return this.cancelled;
  }

  sendMetadata(customMetadata?: Metadata) {
    if (this.checkCancelled()) {
      return;
    }

    if (this.metadataSent) {
      return;
    }

    this.metadataSent = true;
    const custom = customMetadata ? customMetadata.toHttp2Headers() : null;
    // TODO(cjihrig): Include compression headers.
    const headers = Object.assign({}, defaultResponseHeaders, custom);
    this.stream.respond(headers, defaultResponseOptions);
  }

  receiveMetadata(headers: http2.IncomingHttpHeaders) {
    const metadata = Metadata.fromHttp2Headers(headers);

    // TODO(cjihrig): Receive compression metadata.

    const timeoutHeader = metadata.get(GRPC_TIMEOUT_HEADER);

    if (timeoutHeader.length > 0) {
      const match = timeoutHeader[0].toString().match(DEADLINE_REGEX);

      if (match === null) {
        const err = new Error('Invalid deadline') as ServerErrorResponse;
        err.code = Status.OUT_OF_RANGE;
        this.sendError(err);
        return;
      }

      const timeout = (+match[1] * deadlineUnitsToMs[match[2]]) | 0;

      const now = new Date();
      this.deadline = now.setMilliseconds(now.getMilliseconds() + timeout);
      this.deadlineTimer = setTimeout(handleExpiredDeadline, timeout, this);
      metadata.remove(GRPC_TIMEOUT_HEADER);
    }

    // Remove several headers that should not be propagated to the application
    metadata.remove(http2.constants.HTTP2_HEADER_ACCEPT_ENCODING);
    metadata.remove(http2.constants.HTTP2_HEADER_TE);
    metadata.remove(http2.constants.HTTP2_HEADER_CONTENT_TYPE);
    metadata.remove('grpc-encoding');
    metadata.remove('grpc-accept-encoding');

    return metadata;
  }

  receiveUnaryMessage(): Promise<RequestType> {
    return new Promise((resolve, reject) => {
      const stream = this.stream;
      const chunks: Buffer[] = [];
      let totalLength = 0;

      stream.on('data', (data: Buffer) => {
        chunks.push(data);
        totalLength += data.byteLength;
      });

      stream.once('end', async () => {
        try {
          const requestBytes = Buffer.concat(chunks, totalLength);
          if (
            this.maxReceiveMessageSize !== -1 &&
            requestBytes.length > this.maxReceiveMessageSize
          ) {
            this.sendError({
              code: Status.RESOURCE_EXHAUSTED,
              details: `Received message larger than max (${requestBytes.length} vs. ${this.maxReceiveMessageSize})`,
            });
            resolve();
          }

          resolve(this.deserializeMessage(requestBytes));
        } catch (err) {
          err.code = Status.INTERNAL;
          this.sendError(err);
          resolve();
        }
      });
    });
  }

  serializeMessage(value: ResponseType) {
    const messageBuffer = this.handler.serialize(value);

    // TODO(cjihrig): Call compression aware serializeMessage().
    const byteLength = messageBuffer.byteLength;
    const output = Buffer.allocUnsafe(byteLength + 5);
    output.writeUInt8(0, 0);
    output.writeUInt32BE(byteLength, 1);
    messageBuffer.copy(output, 5);
    return output;
  }

  deserializeMessage(bytes: Buffer) {
    // TODO(cjihrig): Call compression aware deserializeMessage().
    const receivedMessage = bytes.slice(5);

    return this.handler.deserialize(receivedMessage);
  }

  async sendUnaryMessage(
    err: ServerErrorResponse | ServerStatusResponse | null,
    value?: ResponseType | null,
    metadata?: Metadata,
    flags?: number
  ) {
    if (this.checkCancelled()) {
      return;
    }
    if (!metadata) {
      metadata = new Metadata();
    }

    if (err) {
      if (!Object.prototype.hasOwnProperty.call(err, 'metadata')) {
        err.metadata = metadata;
      }
      this.sendError(err);
      return;
    }

    try {
      const response = this.serializeMessage(value!);

      this.write(response);
      this.sendStatus({ code: Status.OK, details: 'OK', metadata });
    } catch (err) {
      err.code = Status.INTERNAL;
      this.sendError(err);
    }
  }

  sendStatus(statusObj: StatusObject) {
    if (this.checkCancelled()) {
      return;
    }

    trace(
      'Request to method ' +
        this.handler?.path +
        ' ended with status code: ' +
        Status[statusObj.code] +
        ' details: ' +
        statusObj.details
    );

    clearTimeout(this.deadlineTimer);

    if (!this.wantTrailers) {
      this.wantTrailers = true;
      this.stream.once('wantTrailers', () => {
        const trailersToSend = Object.assign(
          {
            [GRPC_STATUS_HEADER]: statusObj.code,
            [GRPC_MESSAGE_HEADER]: encodeURI(statusObj.details as string),
          },
          statusObj.metadata.toHttp2Headers()
        );

        this.stream.sendTrailers(trailersToSend);
      });
      this.sendMetadata();
      this.stream.end();
    }
  }

  sendError(error: ServerErrorResponse | ServerStatusResponse) {
    if (this.checkCancelled()) {
      return;
    }
    const status: StatusObject = {
      code: Status.UNKNOWN,
      details: 'message' in error ? error.message : 'Unknown Error',
      metadata:
        'metadata' in error && error.metadata !== undefined
          ? error.metadata
          : new Metadata(),
    };

    if (
      'code' in error &&
      typeof error.code === 'number' &&
      Number.isInteger(error.code)
    ) {
      status.code = error.code;

      if ('details' in error && typeof error.details === 'string') {
        status.details = error.details!;
      }
    }

    this.sendStatus(status);
  }

  write(chunk: Buffer) {
    if (this.checkCancelled()) {
      return;
    }

    if (
      this.maxSendMessageSize !== -1 &&
      chunk.length > this.maxSendMessageSize
    ) {
      this.sendError({
        code: Status.RESOURCE_EXHAUSTED,
        details: `Sent message larger than max (${chunk.length} vs. ${this.maxSendMessageSize})`,
      });
      return;
    }

    this.sendMetadata();
    return this.stream.write(chunk);
  }

  resume() {
    this.stream.resume();
  }

  setupSurfaceCall(call: ServerSurfaceCall) {
    this.once('cancelled', (reason) => {
      call.cancelled = true;
      call.emit('cancelled', reason);
    });
  }

  setupReadable(
    readable:
      | ServerReadableStream<RequestType, ResponseType>
      | ServerDuplexStream<RequestType, ResponseType>
  ) {
    const decoder = new StreamDecoder();

    this.stream.on('data', async (data: Buffer) => {
      const messages = decoder.write(data);

      for (const message of messages) {
        if (
          this.maxReceiveMessageSize !== -1 &&
          message.length > this.maxReceiveMessageSize
        ) {
          this.sendError({
            code: Status.RESOURCE_EXHAUSTED,
            details: `Received message larger than max (${message.length} vs. ${this.maxReceiveMessageSize})`,
          });
          return;
        }
        this.pushOrBufferMessage(readable, message);
      }
    });

    this.stream.once('end', () => {
      this.pushOrBufferMessage(readable, null);
    });
  }

  consumeUnpushedMessages(
    readable:
      | ServerReadableStream<RequestType, ResponseType>
      | ServerDuplexStream<RequestType, ResponseType>
  ): boolean {
    this.canPush = true;

    while (this.messagesToPush.length > 0) {
      const nextMessage = this.messagesToPush.shift();
      const canPush = readable.push(nextMessage);

      if (nextMessage === null || canPush === false) {
        this.canPush = false;
        break;
      }
    }

    return this.canPush;
  }

  private pushOrBufferMessage(
    readable:
      | ServerReadableStream<RequestType, ResponseType>
      | ServerDuplexStream<RequestType, ResponseType>,
    messageBytes: Buffer | null
  ): void {
    if (this.isPushPending) {
      this.bufferedMessages.push(messageBytes);
    } else {
      this.pushMessage(readable, messageBytes);
    }
  }

  private async pushMessage(
    readable:
      | ServerReadableStream<RequestType, ResponseType>
      | ServerDuplexStream<RequestType, ResponseType>,
    messageBytes: Buffer | null
  ) {
    if (messageBytes === null) {
      if (this.canPush) {
        readable.push(null);
      } else {
        this.messagesToPush.push(null);
      }

      return;
    }

    this.isPushPending = true;

    try {
      const deserialized = await this.deserializeMessage(messageBytes);

      if (this.canPush) {
        if (!readable.push(deserialized)) {
          this.canPush = false;
          this.stream.pause();
        }
      } else {
        this.messagesToPush.push(deserialized);
      }
    } catch (error) {
      // Ignore any remaining messages when errors occur.
      this.bufferedMessages.length = 0;

      if (
        !(
          'code' in error &&
          typeof error.code === 'number' &&
          Number.isInteger(error.code) &&
          error.code >= Status.OK &&
          error.code <= Status.UNAUTHENTICATED
        )
      ) {
        // The error code is not a valid gRPC code so its being overwritten.
        error.code = Status.INTERNAL;
      }

      readable.emit('error', error);
    }

    this.isPushPending = false;

    if (this.bufferedMessages.length > 0) {
      this.pushMessage(
        readable,
        this.bufferedMessages.shift() as Buffer | null
      );
    }
  }

  getPeer(): string {
    const socket = this.stream.session.socket;
    if (socket.remoteAddress) {
      if (socket.remotePort) {
        return `${socket.remoteAddress}:${socket.remotePort}`;
      } else {
        return socket.remoteAddress;
      }
    } else {
      return 'unknown';
    }
  }

  getDeadline(): Deadline {
    return this.deadline;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type UntypedServerCall = Http2ServerCallStream<any, any>;

function handleExpiredDeadline(call: UntypedServerCall) {
  const err = new Error('Deadline exceeded') as ServerErrorResponse;
  err.code = Status.DEADLINE_EXCEEDED;

  call.sendError(err);
  call.cancelled = true;
  call.emit('cancelled', 'deadline');
}

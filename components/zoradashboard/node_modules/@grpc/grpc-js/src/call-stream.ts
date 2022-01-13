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

import * as http2 from 'http2';
import * as os from 'os';

import { CallCredentials } from './call-credentials';
import { Propagate, Status } from './constants';
import { Filter, FilterFactory } from './filter';
import { FilterStackFactory, FilterStack } from './filter-stack';
import { Metadata } from './metadata';
import { StreamDecoder } from './stream-decoder';
import { ChannelImplementation } from './channel';
import { Subchannel } from './subchannel';
import * as logging from './logging';
import { LogVerbosity } from './constants';
import { ServerSurfaceCall } from './server-call';

const TRACER_NAME = 'call_stream';

const {
  HTTP2_HEADER_STATUS,
  HTTP2_HEADER_CONTENT_TYPE,
  NGHTTP2_CANCEL,
} = http2.constants;

/**
 * https://nodejs.org/api/errors.html#errors_class_systemerror
 */
interface SystemError extends Error {
  address?: string;
  code: string;
  dest?: string;
  errno: number;
  info?: object;
  message: string;
  path?: string;
  port?: number;
  syscall: string;
}

/**
 * Should do approximately the same thing as util.getSystemErrorName but the
 * TypeScript types don't have that function for some reason so I just made my
 * own.
 * @param errno 
 */
function getSystemErrorName(errno: number): string {
  for (const [name, num] of Object.entries(os.constants.errno)) {
    if (num === errno) {
      return name;
    }
  }
  return 'Unknown system error ' + errno;
}

export type Deadline = Date | number;

export interface CallStreamOptions {
  deadline: Deadline;
  flags: number;
  host: string;
  parentCall: ServerSurfaceCall | null;
}

export type PartialCallStreamOptions = Partial<CallStreamOptions>;

export interface StatusObject {
  code: Status;
  details: string;
  metadata: Metadata;
}

export const enum WriteFlags {
  BufferHint = 1,
  NoCompress = 2,
  WriteThrough = 4,
}

export interface WriteObject {
  message: Buffer;
  flags?: number;
}

export interface MetadataListener {
  (metadata: Metadata, next: (metadata: Metadata) => void): void;
}

export interface MessageListener {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (message: any, next: (message: any) => void): void;
}

export interface StatusListener {
  (status: StatusObject, next: (status: StatusObject) => void): void;
}

export interface FullListener {
  onReceiveMetadata: MetadataListener;
  onReceiveMessage: MessageListener;
  onReceiveStatus: StatusListener;
}

export type Listener = Partial<FullListener>;

/**
 * An object with methods for handling the responses to a call.
 */
export interface InterceptingListener {
  onReceiveMetadata(metadata: Metadata): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onReceiveMessage(message: any): void;
  onReceiveStatus(status: StatusObject): void;
}

export function isInterceptingListener(
  listener: Listener | InterceptingListener
): listener is InterceptingListener {
  return (
    listener.onReceiveMetadata !== undefined &&
    listener.onReceiveMetadata.length === 1
  );
}

export class InterceptingListenerImpl implements InterceptingListener {
  private processingMessage = false;
  private pendingStatus: StatusObject | null = null;
  constructor(
    private listener: FullListener,
    private nextListener: InterceptingListener
  ) {}

  onReceiveMetadata(metadata: Metadata): void {
    this.listener.onReceiveMetadata(metadata, (metadata) => {
      this.nextListener.onReceiveMetadata(metadata);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onReceiveMessage(message: any): void {
    /* If this listener processes messages asynchronously, the last message may
     * be reordered with respect to the status */
    this.processingMessage = true;
    this.listener.onReceiveMessage(message, (msg) => {
      this.processingMessage = false;
      this.nextListener.onReceiveMessage(msg);
      if (this.pendingStatus) {
        this.nextListener.onReceiveStatus(this.pendingStatus);
      }
    });
  }
  onReceiveStatus(status: StatusObject): void {
    this.listener.onReceiveStatus(status, (processedStatus) => {
      if (this.processingMessage) {
        this.pendingStatus = processedStatus;
      } else {
        this.nextListener.onReceiveStatus(processedStatus);
      }
    });
  }
}

export interface WriteCallback {
  (error?: Error | null): void;
}

export interface MessageContext {
  callback?: WriteCallback;
  flags?: number;
}

export interface Call {
  cancelWithStatus(status: Status, details: string): void;
  getPeer(): string;
  start(metadata: Metadata, listener: InterceptingListener): void;
  sendMessageWithContext(context: MessageContext, message: Buffer): void;
  startRead(): void;
  halfClose(): void;

  getDeadline(): Deadline;
  getCredentials(): CallCredentials;
  setCredentials(credentials: CallCredentials): void;
  getMethod(): string;
  getHost(): string;
}

export class Http2CallStream implements Call {
  credentials: CallCredentials;
  filterStack: Filter;
  private http2Stream: http2.ClientHttp2Stream | null = null;
  private pendingRead = false;
  private isWriteFilterPending = false;
  private pendingWrite: Buffer | null = null;
  private pendingWriteCallback: WriteCallback | null = null;
  private writesClosed = false;

  private decoder = new StreamDecoder();

  private isReadFilterPending = false;
  private canPush = false;
  /**
   * Indicates that an 'end' event has come from the http2 stream, so there
   * will be no more data events.
   */
  private readsClosed = false;

  private statusOutput = false;

  private unpushedReadMessages: Buffer[] = [];
  private unfilteredReadMessages: Buffer[] = [];

  // Status code mapped from :status. To be used if grpc-status is not received
  private mappedStatusCode: Status = Status.UNKNOWN;

  // This is populated (non-null) if and only if the call has ended
  private finalStatus: StatusObject | null = null;

  private subchannel: Subchannel | null = null;
  private disconnectListener: () => void;

  private listener: InterceptingListener | null = null;

  private internalError: SystemError | null = null;

  constructor(
    private readonly methodName: string,
    private readonly channel: ChannelImplementation,
    private readonly options: CallStreamOptions,
    filterStackFactory: FilterStackFactory,
    private readonly channelCallCredentials: CallCredentials,
    private readonly callNumber: number
  ) {
    this.filterStack = filterStackFactory.createFilter(this);
    this.credentials = channelCallCredentials;
    this.disconnectListener = () => {
      this.endCall({
        code: Status.UNAVAILABLE,
        details: 'Connection dropped',
        metadata: new Metadata(),
      });
    };
    if (this.options.parentCall && this.options.flags & Propagate.CANCELLATION) {
      this.options.parentCall.on('cancelled', () => {
        this.cancelWithStatus(Status.CANCELLED, 'Cancelled by parent call');
      });
    }
  }

  private outputStatus() {
    /* Precondition: this.finalStatus !== null */
    if (!this.statusOutput) {
      this.statusOutput = true;
      const filteredStatus = this.filterStack.receiveTrailers(
        this.finalStatus!
      );
      /* We delay the actual action of bubbling up the status to insulate the
       * cleanup code in this class from any errors that may be thrown in the
       * upper layers as a result of bubbling up the status. In particular,
       * if the status is not OK, the "error" event may be emitted
       * synchronously at the top level, which will result in a thrown error if
       * the user does not handle that event. */
      process.nextTick(() => {
        this.listener?.onReceiveStatus(filteredStatus);
      });
      if (this.subchannel) {
        this.subchannel.callUnref();
        this.subchannel.removeDisconnectListener(this.disconnectListener);
      }
    }
  }

  private trace(text: string): void {
    logging.trace(
      LogVerbosity.DEBUG,
      TRACER_NAME,
      '[' + this.callNumber + '] ' + text
    );
  }

  /**
   * On first call, emits a 'status' event with the given StatusObject.
   * Subsequent calls are no-ops.
   * @param status The status of the call.
   */
  private endCall(status: StatusObject): void {
    /* If the status is OK and a new status comes in (e.g. from a
     * deserialization failure), that new status takes priority */
    if (this.finalStatus === null || this.finalStatus.code === Status.OK) {
      this.trace(
        'ended with status: code=' +
          status.code +
          ' details="' +
          status.details +
          '"'
      );
      this.finalStatus = status;
      this.maybeOutputStatus();
    }
    this.destroyHttp2Stream();
  }

  private maybeOutputStatus() {
    if (this.finalStatus !== null) {
      /* The combination check of readsClosed and that the two message buffer
       * arrays are empty checks that there all incoming data has been fully
       * processed */
      if (
        this.finalStatus.code !== Status.OK ||
        (this.readsClosed &&
          this.unpushedReadMessages.length === 0 &&
          this.unfilteredReadMessages.length === 0 &&
          !this.isReadFilterPending)
      ) {
        this.outputStatus();
      }
    }
  }

  private push(message: Buffer): void {
    this.trace(
      'pushing to reader message of length ' +
        (message instanceof Buffer ? message.length : null)
    );
    this.canPush = false;
    process.nextTick(() => {
      /* If we have already output the status any later messages should be
       * ignored, and can cause out-of-order operation errors higher up in the
       * stack. Checking as late as possible here to avoid any race conditions.
       */
      if (this.statusOutput) {
        return;
      }
      this.listener?.onReceiveMessage(message);
      this.maybeOutputStatus();
    });
  }

  private handleFilterError(error: Error) {
    this.cancelWithStatus(Status.INTERNAL, error.message);
  }

  private handleFilteredRead(message: Buffer) {
    /* If we the call has already ended with an error, we don't want to do
     * anything with this message. Dropping it on the floor is correct
     * behavior */
    if (this.finalStatus !== null && this.finalStatus.code !== Status.OK) {
      this.maybeOutputStatus();
      return;
    }
    this.isReadFilterPending = false;
    if (this.canPush) {
      this.http2Stream!.pause();
      this.push(message);
    } else {
      this.trace(
        'unpushedReadMessages.push message of length ' + message.length
      );
      this.unpushedReadMessages.push(message);
    }
    if (this.unfilteredReadMessages.length > 0) {
      /* nextMessage is guaranteed not to be undefined because
         unfilteredReadMessages is non-empty */
      const nextMessage = this.unfilteredReadMessages.shift()!;
      this.filterReceivedMessage(nextMessage);
    }
  }

  private filterReceivedMessage(framedMessage: Buffer) {
    /* If we the call has already ended with an error, we don't want to do
     * anything with this message. Dropping it on the floor is correct
     * behavior */
    if (this.finalStatus !== null && this.finalStatus.code !== Status.OK) {
      this.maybeOutputStatus();
      return;
    }
    this.trace('filterReceivedMessage of length ' + framedMessage.length);
    this.isReadFilterPending = true;
    this.filterStack
      .receiveMessage(Promise.resolve(framedMessage))
      .then(
        this.handleFilteredRead.bind(this),
        this.handleFilterError.bind(this)
      );
  }

  private tryPush(messageBytes: Buffer): void {
    if (this.isReadFilterPending) {
      this.trace(
        'unfilteredReadMessages.push message of length ' +
          (messageBytes && messageBytes.length)
      );
      this.unfilteredReadMessages.push(messageBytes);
    } else {
      this.filterReceivedMessage(messageBytes);
    }
  }

  private handleTrailers(headers: http2.IncomingHttpHeaders) {
    let headersString = '';
    for (const header of Object.keys(headers)) {
      headersString += '\t\t' + header + ': ' + headers[header] + '\n';
    }
    this.trace('Received server trailers:\n' + headersString);
    let metadata: Metadata;
    try {
      metadata = Metadata.fromHttp2Headers(headers);
    } catch (e) {
      metadata = new Metadata();
    }
    const metadataMap = metadata.getMap();
    let code: Status = this.mappedStatusCode;
    if (
      code === Status.UNKNOWN &&
      typeof metadataMap['grpc-status'] === 'string'
    ) {
      const receivedStatus = Number(metadataMap['grpc-status']);
      if (receivedStatus in Status) {
        code = receivedStatus;
        this.trace('received status code ' + receivedStatus + ' from server');
      }
      metadata.remove('grpc-status');
    }
    let details = '';
    if (typeof metadataMap['grpc-message'] === 'string') {
      details = decodeURI(metadataMap['grpc-message']);
      metadata.remove('grpc-message');
      this.trace(
        'received status details string "' + details + '" from server'
      );
    }
    const status: StatusObject = { code, details, metadata };
    // This is a no-op if the call was already ended when handling headers.
    this.endCall(status);
  }

  attachHttp2Stream(
    stream: http2.ClientHttp2Stream,
    subchannel: Subchannel,
    extraFilterFactory?: FilterFactory<Filter>
  ): void {
    if (extraFilterFactory !== undefined) {
      this.filterStack = new FilterStack([
        this.filterStack,
        extraFilterFactory.createFilter(this),
      ]);
    }
    if (this.finalStatus !== null) {
      stream.close(NGHTTP2_CANCEL);
    } else {
      this.trace(
        'attachHttp2Stream from subchannel ' + subchannel.getAddress()
      );
      this.http2Stream = stream;
      this.subchannel = subchannel;
      subchannel.addDisconnectListener(this.disconnectListener);
      subchannel.callRef();
      stream.on('response', (headers, flags) => {
        let headersString = '';
        for (const header of Object.keys(headers)) {
          headersString += '\t\t' + header + ': ' + headers[header] + '\n';
        }
        this.trace('Received server headers:\n' + headersString);
        switch (headers[':status']) {
          // TODO(murgatroid99): handle 100 and 101
          case 400:
            this.mappedStatusCode = Status.INTERNAL;
            break;
          case 401:
            this.mappedStatusCode = Status.UNAUTHENTICATED;
            break;
          case 403:
            this.mappedStatusCode = Status.PERMISSION_DENIED;
            break;
          case 404:
            this.mappedStatusCode = Status.UNIMPLEMENTED;
            break;
          case 429:
          case 502:
          case 503:
          case 504:
            this.mappedStatusCode = Status.UNAVAILABLE;
            break;
          default:
            this.mappedStatusCode = Status.UNKNOWN;
        }

        if (flags & http2.constants.NGHTTP2_FLAG_END_STREAM) {
          this.handleTrailers(headers);
        } else {
          let metadata: Metadata;
          try {
            metadata = Metadata.fromHttp2Headers(headers);
          } catch (error) {
            this.endCall({
              code: Status.UNKNOWN,
              details: error.message,
              metadata: new Metadata(),
            });
            return;
          }
          try {
            const finalMetadata = this.filterStack.receiveMetadata(metadata);
            this.listener?.onReceiveMetadata(finalMetadata);
          } catch (error) {
            this.endCall({
              code: Status.UNKNOWN,
              details: error.message,
              metadata: new Metadata(),
            });
          }
        }
      });
      stream.on('trailers', this.handleTrailers.bind(this));
      stream.on('data', (data: Buffer) => {
        this.trace('receive HTTP/2 data frame of length ' + data.length);
        const messages = this.decoder.write(data);

        for (const message of messages) {
          this.trace('parsed message of length ' + message.length);
          this.tryPush(message);
        }
      });
      stream.on('end', () => {
        this.readsClosed = true;
        this.maybeOutputStatus();
      });
      stream.on('close', () => {
        /* Use process.next tick to ensure that this code happens after any
         * "error" event that may be emitted at about the same time, so that
         * we can bubble up the error message from that event. */ 
        process.nextTick(() => {
          this.trace('HTTP/2 stream closed with code ' + stream.rstCode);
          /* If we have a final status with an OK status code, that means that
           * we have received all of the messages and we have processed the
           * trailers and the call completed successfully, so it doesn't matter
           * how the stream ends after that */
          if (this.finalStatus?.code === Status.OK) {
            return;
          }
          let code: Status;
          let details = '';
          switch (stream.rstCode) {
            case http2.constants.NGHTTP2_NO_ERROR:
              /* If we get a NO_ERROR code and we already have a status, the
               * stream completed properly and we just haven't fully processed
               * it yet */
              if (this.finalStatus !== null) {
                return;
              }
              code = Status.INTERNAL;
              details = `Received RST_STREAM with code ${stream.rstCode}`;
              break;
            case http2.constants.NGHTTP2_REFUSED_STREAM:
              code = Status.UNAVAILABLE;
              details = 'Stream refused by server';
              break;
            case http2.constants.NGHTTP2_CANCEL:
              code = Status.CANCELLED;
              details = 'Call cancelled';
              break;
            case http2.constants.NGHTTP2_ENHANCE_YOUR_CALM:
              code = Status.RESOURCE_EXHAUSTED;
              details = 'Bandwidth exhausted';
              break;
            case http2.constants.NGHTTP2_INADEQUATE_SECURITY:
              code = Status.PERMISSION_DENIED;
              details = 'Protocol not secure enough';
              break;
            case http2.constants.NGHTTP2_INTERNAL_ERROR:
              code = Status.INTERNAL;
              if (this.internalError === null) {
                /* This error code was previously handled in the default case, and
                 * there are several instances of it online, so I wanted to
                 * preserve the original error message so that people find existing
                 * information in searches, but also include the more recognizable
                 * "Internal server error" message. */
                details = `Received RST_STREAM with code ${stream.rstCode} (Internal server error)`;
              } else {
                if (this.internalError.code === 'ECONNRESET') {
                  code = Status.UNAVAILABLE;
                  details = this.internalError.message;
                } else {
                  /* The "Received RST_STREAM with code ..." error is preserved
                   * here for continuity with errors reported online, but the
                   * error message at the end will probably be more relevant in
                   * most cases. */
                  details = `Received RST_STREAM with code ${stream.rstCode} triggered by internal client error: ${this.internalError.message}`;
                }
              }
              break;
            default:
              code = Status.INTERNAL;
              details = `Received RST_STREAM with code ${stream.rstCode}`;
          }
          // This is a no-op if trailers were received at all.
          // This is OK, because status codes emitted here correspond to more
          // catastrophic issues that prevent us from receiving trailers in the
          // first place.
          this.endCall({ code, details, metadata: new Metadata() });
        });
      });
      stream.on('error', (err: SystemError) => {
        /* We need an error handler here to stop "Uncaught Error" exceptions
         * from bubbling up. However, errors here should all correspond to
         * "close" events, where we will handle the error more granularly */
        /* Specifically looking for stream errors that were *not* constructed
         * from a RST_STREAM response here:
         * https://github.com/nodejs/node/blob/8b8620d580314050175983402dfddf2674e8e22a/lib/internal/http2/core.js#L2267
         */
        if (err.code !== 'ERR_HTTP2_STREAM_ERROR') {
          this.trace('Node error event: message=' + err.message + ' code=' + err.code + ' errno=' + getSystemErrorName(err.errno) + ' syscall=' + err.syscall);
          this.internalError = err;
        }
      });
      if (!this.pendingRead) {
        stream.pause();
      }
      if (this.pendingWrite) {
        if (!this.pendingWriteCallback) {
          throw new Error('Invalid state in write handling code');
        }
        this.trace(
          'sending data chunk of length ' +
            this.pendingWrite.length +
            ' (deferred)'
        );
        stream.write(this.pendingWrite, this.pendingWriteCallback);
      }
      this.maybeCloseWrites();
    }
  }

  start(metadata: Metadata, listener: InterceptingListener) {
    this.trace('Sending metadata');
    this.listener = listener;
    this.channel._startCallStream(this, metadata);
  }

  private destroyHttp2Stream() {
    // The http2 stream could already have been destroyed if cancelWithStatus
    // is called in response to an internal http2 error.
    if (this.http2Stream !== null && !this.http2Stream.destroyed) {
      /* If the call has ended with an OK status, communicate that when closing
       * the stream, partly to avoid a situation in which we detect an error
       * RST_STREAM as a result after we have the status */
      let code: number;
      if (this.finalStatus?.code === Status.OK) {
        code = http2.constants.NGHTTP2_NO_ERROR;
      } else {
        code = http2.constants.NGHTTP2_CANCEL;
      }
      this.trace('close http2 stream with code ' + code);
      this.http2Stream.close(code);
    }
  }

  cancelWithStatus(status: Status, details: string): void {
    this.trace(
      'cancelWithStatus code: ' + status + ' details: "' + details + '"'
    );
    this.endCall({ code: status, details, metadata: new Metadata() });
  }

  getDeadline(): Deadline {
    if (this.options.parentCall && this.options.flags & Propagate.DEADLINE) {
      const parentDeadline = this.options.parentCall.getDeadline();
      const selfDeadline = this.options.deadline;
      const parentDeadlineMsecs = parentDeadline instanceof Date ? parentDeadline.getTime() : parentDeadline;
      const selfDeadlineMsecs = selfDeadline instanceof Date ? selfDeadline.getTime() : selfDeadline;
      return Math.min(parentDeadlineMsecs, selfDeadlineMsecs);
    } else {
      return this.options.deadline;
    }
  }

  getCredentials(): CallCredentials {
    return this.credentials;
  }

  setCredentials(credentials: CallCredentials): void {
    this.credentials = this.channelCallCredentials.compose(credentials);
  }

  getStatus(): StatusObject | null {
    return this.finalStatus;
  }

  getPeer(): string {
    return this.subchannel?.getAddress() ?? this.channel.getTarget();
  }

  getMethod(): string {
    return this.methodName;
  }

  getHost(): string {
    return this.options.host;
  }

  startRead() {
    /* If the stream has ended with an error, we should not emit any more
     * messages and we should communicate that the stream has ended */
    if (this.finalStatus !== null && this.finalStatus.code !== Status.OK) {
      this.readsClosed = true;
      this.maybeOutputStatus();
      return;
    }
    this.canPush = true;
    if (this.http2Stream === null) {
      this.pendingRead = true;
    } else {
      if (this.unpushedReadMessages.length > 0) {
        const nextMessage: Buffer = this.unpushedReadMessages.shift()!;
        this.push(nextMessage);
        return;
      }
      /* Only resume reading from the http2Stream if we don't have any pending
       * messages to emit */
      this.http2Stream.resume();
    }
  }

  private maybeCloseWrites() {
    if (
      this.writesClosed &&
      !this.isWriteFilterPending &&
      this.http2Stream !== null
    ) {
      this.trace('calling end() on HTTP/2 stream');
      this.http2Stream.end();
    }
  }

  sendMessageWithContext(context: MessageContext, message: Buffer) {
    this.trace('write() called with message of length ' + message.length);
    const writeObj: WriteObject = {
      message,
      flags: context.flags,
    };
    const cb: WriteCallback = context.callback ?? (() => {});
    this.isWriteFilterPending = true;
    this.filterStack.sendMessage(Promise.resolve(writeObj)).then((message) => {
      this.isWriteFilterPending = false;
      if (this.http2Stream === null) {
        this.trace(
          'deferring writing data chunk of length ' + message.message.length
        );
        this.pendingWrite = message.message;
        this.pendingWriteCallback = cb;
      } else {
        this.trace('sending data chunk of length ' + message.message.length);
        this.http2Stream.write(message.message, cb);
        this.maybeCloseWrites();
      }
    }, this.handleFilterError.bind(this));
  }

  halfClose() {
    this.trace('end() called');
    this.writesClosed = true;
    this.maybeCloseWrites();
  }
}

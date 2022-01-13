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
exports.Http2CallStream = exports.InterceptingListenerImpl = exports.isInterceptingListener = void 0;
const http2 = require("http2");
const os = require("os");
const constants_1 = require("./constants");
const filter_stack_1 = require("./filter-stack");
const metadata_1 = require("./metadata");
const stream_decoder_1 = require("./stream-decoder");
const logging = require("./logging");
const constants_2 = require("./constants");
const TRACER_NAME = 'call_stream';
const { HTTP2_HEADER_STATUS, HTTP2_HEADER_CONTENT_TYPE, NGHTTP2_CANCEL, } = http2.constants;
/**
 * Should do approximately the same thing as util.getSystemErrorName but the
 * TypeScript types don't have that function for some reason so I just made my
 * own.
 * @param errno
 */
function getSystemErrorName(errno) {
    for (const [name, num] of Object.entries(os.constants.errno)) {
        if (num === errno) {
            return name;
        }
    }
    return 'Unknown system error ' + errno;
}
function isInterceptingListener(listener) {
    return (listener.onReceiveMetadata !== undefined &&
        listener.onReceiveMetadata.length === 1);
}
exports.isInterceptingListener = isInterceptingListener;
class InterceptingListenerImpl {
    constructor(listener, nextListener) {
        this.listener = listener;
        this.nextListener = nextListener;
        this.processingMessage = false;
        this.pendingStatus = null;
    }
    onReceiveMetadata(metadata) {
        this.listener.onReceiveMetadata(metadata, (metadata) => {
            this.nextListener.onReceiveMetadata(metadata);
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onReceiveMessage(message) {
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
    onReceiveStatus(status) {
        this.listener.onReceiveStatus(status, (processedStatus) => {
            if (this.processingMessage) {
                this.pendingStatus = processedStatus;
            }
            else {
                this.nextListener.onReceiveStatus(processedStatus);
            }
        });
    }
}
exports.InterceptingListenerImpl = InterceptingListenerImpl;
class Http2CallStream {
    constructor(methodName, channel, options, filterStackFactory, channelCallCredentials, callNumber) {
        this.methodName = methodName;
        this.channel = channel;
        this.options = options;
        this.channelCallCredentials = channelCallCredentials;
        this.callNumber = callNumber;
        this.http2Stream = null;
        this.pendingRead = false;
        this.isWriteFilterPending = false;
        this.pendingWrite = null;
        this.pendingWriteCallback = null;
        this.writesClosed = false;
        this.decoder = new stream_decoder_1.StreamDecoder();
        this.isReadFilterPending = false;
        this.canPush = false;
        /**
         * Indicates that an 'end' event has come from the http2 stream, so there
         * will be no more data events.
         */
        this.readsClosed = false;
        this.statusOutput = false;
        this.unpushedReadMessages = [];
        this.unfilteredReadMessages = [];
        // Status code mapped from :status. To be used if grpc-status is not received
        this.mappedStatusCode = constants_1.Status.UNKNOWN;
        // This is populated (non-null) if and only if the call has ended
        this.finalStatus = null;
        this.subchannel = null;
        this.listener = null;
        this.internalError = null;
        this.filterStack = filterStackFactory.createFilter(this);
        this.credentials = channelCallCredentials;
        this.disconnectListener = () => {
            this.endCall({
                code: constants_1.Status.UNAVAILABLE,
                details: 'Connection dropped',
                metadata: new metadata_1.Metadata(),
            });
        };
        if (this.options.parentCall && this.options.flags & constants_1.Propagate.CANCELLATION) {
            this.options.parentCall.on('cancelled', () => {
                this.cancelWithStatus(constants_1.Status.CANCELLED, 'Cancelled by parent call');
            });
        }
    }
    outputStatus() {
        /* Precondition: this.finalStatus !== null */
        if (!this.statusOutput) {
            this.statusOutput = true;
            const filteredStatus = this.filterStack.receiveTrailers(this.finalStatus);
            /* We delay the actual action of bubbling up the status to insulate the
             * cleanup code in this class from any errors that may be thrown in the
             * upper layers as a result of bubbling up the status. In particular,
             * if the status is not OK, the "error" event may be emitted
             * synchronously at the top level, which will result in a thrown error if
             * the user does not handle that event. */
            process.nextTick(() => {
                var _a;
                (_a = this.listener) === null || _a === void 0 ? void 0 : _a.onReceiveStatus(filteredStatus);
            });
            if (this.subchannel) {
                this.subchannel.callUnref();
                this.subchannel.removeDisconnectListener(this.disconnectListener);
            }
        }
    }
    trace(text) {
        logging.trace(constants_2.LogVerbosity.DEBUG, TRACER_NAME, '[' + this.callNumber + '] ' + text);
    }
    /**
     * On first call, emits a 'status' event with the given StatusObject.
     * Subsequent calls are no-ops.
     * @param status The status of the call.
     */
    endCall(status) {
        /* If the status is OK and a new status comes in (e.g. from a
         * deserialization failure), that new status takes priority */
        if (this.finalStatus === null || this.finalStatus.code === constants_1.Status.OK) {
            this.trace('ended with status: code=' +
                status.code +
                ' details="' +
                status.details +
                '"');
            this.finalStatus = status;
            this.maybeOutputStatus();
        }
        this.destroyHttp2Stream();
    }
    maybeOutputStatus() {
        if (this.finalStatus !== null) {
            /* The combination check of readsClosed and that the two message buffer
             * arrays are empty checks that there all incoming data has been fully
             * processed */
            if (this.finalStatus.code !== constants_1.Status.OK ||
                (this.readsClosed &&
                    this.unpushedReadMessages.length === 0 &&
                    this.unfilteredReadMessages.length === 0 &&
                    !this.isReadFilterPending)) {
                this.outputStatus();
            }
        }
    }
    push(message) {
        this.trace('pushing to reader message of length ' +
            (message instanceof Buffer ? message.length : null));
        this.canPush = false;
        process.nextTick(() => {
            var _a;
            /* If we have already output the status any later messages should be
             * ignored, and can cause out-of-order operation errors higher up in the
             * stack. Checking as late as possible here to avoid any race conditions.
             */
            if (this.statusOutput) {
                return;
            }
            (_a = this.listener) === null || _a === void 0 ? void 0 : _a.onReceiveMessage(message);
            this.maybeOutputStatus();
        });
    }
    handleFilterError(error) {
        this.cancelWithStatus(constants_1.Status.INTERNAL, error.message);
    }
    handleFilteredRead(message) {
        /* If we the call has already ended with an error, we don't want to do
         * anything with this message. Dropping it on the floor is correct
         * behavior */
        if (this.finalStatus !== null && this.finalStatus.code !== constants_1.Status.OK) {
            this.maybeOutputStatus();
            return;
        }
        this.isReadFilterPending = false;
        if (this.canPush) {
            this.http2Stream.pause();
            this.push(message);
        }
        else {
            this.trace('unpushedReadMessages.push message of length ' + message.length);
            this.unpushedReadMessages.push(message);
        }
        if (this.unfilteredReadMessages.length > 0) {
            /* nextMessage is guaranteed not to be undefined because
               unfilteredReadMessages is non-empty */
            const nextMessage = this.unfilteredReadMessages.shift();
            this.filterReceivedMessage(nextMessage);
        }
    }
    filterReceivedMessage(framedMessage) {
        /* If we the call has already ended with an error, we don't want to do
         * anything with this message. Dropping it on the floor is correct
         * behavior */
        if (this.finalStatus !== null && this.finalStatus.code !== constants_1.Status.OK) {
            this.maybeOutputStatus();
            return;
        }
        this.trace('filterReceivedMessage of length ' + framedMessage.length);
        this.isReadFilterPending = true;
        this.filterStack
            .receiveMessage(Promise.resolve(framedMessage))
            .then(this.handleFilteredRead.bind(this), this.handleFilterError.bind(this));
    }
    tryPush(messageBytes) {
        if (this.isReadFilterPending) {
            this.trace('unfilteredReadMessages.push message of length ' +
                (messageBytes && messageBytes.length));
            this.unfilteredReadMessages.push(messageBytes);
        }
        else {
            this.filterReceivedMessage(messageBytes);
        }
    }
    handleTrailers(headers) {
        let headersString = '';
        for (const header of Object.keys(headers)) {
            headersString += '\t\t' + header + ': ' + headers[header] + '\n';
        }
        this.trace('Received server trailers:\n' + headersString);
        let metadata;
        try {
            metadata = metadata_1.Metadata.fromHttp2Headers(headers);
        }
        catch (e) {
            metadata = new metadata_1.Metadata();
        }
        const metadataMap = metadata.getMap();
        let code = this.mappedStatusCode;
        if (code === constants_1.Status.UNKNOWN &&
            typeof metadataMap['grpc-status'] === 'string') {
            const receivedStatus = Number(metadataMap['grpc-status']);
            if (receivedStatus in constants_1.Status) {
                code = receivedStatus;
                this.trace('received status code ' + receivedStatus + ' from server');
            }
            metadata.remove('grpc-status');
        }
        let details = '';
        if (typeof metadataMap['grpc-message'] === 'string') {
            details = decodeURI(metadataMap['grpc-message']);
            metadata.remove('grpc-message');
            this.trace('received status details string "' + details + '" from server');
        }
        const status = { code, details, metadata };
        // This is a no-op if the call was already ended when handling headers.
        this.endCall(status);
    }
    attachHttp2Stream(stream, subchannel, extraFilterFactory) {
        if (extraFilterFactory !== undefined) {
            this.filterStack = new filter_stack_1.FilterStack([
                this.filterStack,
                extraFilterFactory.createFilter(this),
            ]);
        }
        if (this.finalStatus !== null) {
            stream.close(NGHTTP2_CANCEL);
        }
        else {
            this.trace('attachHttp2Stream from subchannel ' + subchannel.getAddress());
            this.http2Stream = stream;
            this.subchannel = subchannel;
            subchannel.addDisconnectListener(this.disconnectListener);
            subchannel.callRef();
            stream.on('response', (headers, flags) => {
                var _a;
                let headersString = '';
                for (const header of Object.keys(headers)) {
                    headersString += '\t\t' + header + ': ' + headers[header] + '\n';
                }
                this.trace('Received server headers:\n' + headersString);
                switch (headers[':status']) {
                    // TODO(murgatroid99): handle 100 and 101
                    case 400:
                        this.mappedStatusCode = constants_1.Status.INTERNAL;
                        break;
                    case 401:
                        this.mappedStatusCode = constants_1.Status.UNAUTHENTICATED;
                        break;
                    case 403:
                        this.mappedStatusCode = constants_1.Status.PERMISSION_DENIED;
                        break;
                    case 404:
                        this.mappedStatusCode = constants_1.Status.UNIMPLEMENTED;
                        break;
                    case 429:
                    case 502:
                    case 503:
                    case 504:
                        this.mappedStatusCode = constants_1.Status.UNAVAILABLE;
                        break;
                    default:
                        this.mappedStatusCode = constants_1.Status.UNKNOWN;
                }
                if (flags & http2.constants.NGHTTP2_FLAG_END_STREAM) {
                    this.handleTrailers(headers);
                }
                else {
                    let metadata;
                    try {
                        metadata = metadata_1.Metadata.fromHttp2Headers(headers);
                    }
                    catch (error) {
                        this.endCall({
                            code: constants_1.Status.UNKNOWN,
                            details: error.message,
                            metadata: new metadata_1.Metadata(),
                        });
                        return;
                    }
                    try {
                        const finalMetadata = this.filterStack.receiveMetadata(metadata);
                        (_a = this.listener) === null || _a === void 0 ? void 0 : _a.onReceiveMetadata(finalMetadata);
                    }
                    catch (error) {
                        this.endCall({
                            code: constants_1.Status.UNKNOWN,
                            details: error.message,
                            metadata: new metadata_1.Metadata(),
                        });
                    }
                }
            });
            stream.on('trailers', this.handleTrailers.bind(this));
            stream.on('data', (data) => {
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
                    var _a;
                    this.trace('HTTP/2 stream closed with code ' + stream.rstCode);
                    /* If we have a final status with an OK status code, that means that
                     * we have received all of the messages and we have processed the
                     * trailers and the call completed successfully, so it doesn't matter
                     * how the stream ends after that */
                    if (((_a = this.finalStatus) === null || _a === void 0 ? void 0 : _a.code) === constants_1.Status.OK) {
                        return;
                    }
                    let code;
                    let details = '';
                    switch (stream.rstCode) {
                        case http2.constants.NGHTTP2_NO_ERROR:
                            /* If we get a NO_ERROR code and we already have a status, the
                             * stream completed properly and we just haven't fully processed
                             * it yet */
                            if (this.finalStatus !== null) {
                                return;
                            }
                            code = constants_1.Status.INTERNAL;
                            details = `Received RST_STREAM with code ${stream.rstCode}`;
                            break;
                        case http2.constants.NGHTTP2_REFUSED_STREAM:
                            code = constants_1.Status.UNAVAILABLE;
                            details = 'Stream refused by server';
                            break;
                        case http2.constants.NGHTTP2_CANCEL:
                            code = constants_1.Status.CANCELLED;
                            details = 'Call cancelled';
                            break;
                        case http2.constants.NGHTTP2_ENHANCE_YOUR_CALM:
                            code = constants_1.Status.RESOURCE_EXHAUSTED;
                            details = 'Bandwidth exhausted';
                            break;
                        case http2.constants.NGHTTP2_INADEQUATE_SECURITY:
                            code = constants_1.Status.PERMISSION_DENIED;
                            details = 'Protocol not secure enough';
                            break;
                        case http2.constants.NGHTTP2_INTERNAL_ERROR:
                            code = constants_1.Status.INTERNAL;
                            if (this.internalError === null) {
                                /* This error code was previously handled in the default case, and
                                 * there are several instances of it online, so I wanted to
                                 * preserve the original error message so that people find existing
                                 * information in searches, but also include the more recognizable
                                 * "Internal server error" message. */
                                details = `Received RST_STREAM with code ${stream.rstCode} (Internal server error)`;
                            }
                            else {
                                if (this.internalError.code === 'ECONNRESET') {
                                    code = constants_1.Status.UNAVAILABLE;
                                    details = this.internalError.message;
                                }
                                else {
                                    /* The "Received RST_STREAM with code ..." error is preserved
                                     * here for continuity with errors reported online, but the
                                     * error message at the end will probably be more relevant in
                                     * most cases. */
                                    details = `Received RST_STREAM with code ${stream.rstCode} triggered by internal client error: ${this.internalError.message}`;
                                }
                            }
                            break;
                        default:
                            code = constants_1.Status.INTERNAL;
                            details = `Received RST_STREAM with code ${stream.rstCode}`;
                    }
                    // This is a no-op if trailers were received at all.
                    // This is OK, because status codes emitted here correspond to more
                    // catastrophic issues that prevent us from receiving trailers in the
                    // first place.
                    this.endCall({ code, details, metadata: new metadata_1.Metadata() });
                });
            });
            stream.on('error', (err) => {
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
                this.trace('sending data chunk of length ' +
                    this.pendingWrite.length +
                    ' (deferred)');
                stream.write(this.pendingWrite, this.pendingWriteCallback);
            }
            this.maybeCloseWrites();
        }
    }
    start(metadata, listener) {
        this.trace('Sending metadata');
        this.listener = listener;
        this.channel._startCallStream(this, metadata);
    }
    destroyHttp2Stream() {
        var _a;
        // The http2 stream could already have been destroyed if cancelWithStatus
        // is called in response to an internal http2 error.
        if (this.http2Stream !== null && !this.http2Stream.destroyed) {
            /* If the call has ended with an OK status, communicate that when closing
             * the stream, partly to avoid a situation in which we detect an error
             * RST_STREAM as a result after we have the status */
            let code;
            if (((_a = this.finalStatus) === null || _a === void 0 ? void 0 : _a.code) === constants_1.Status.OK) {
                code = http2.constants.NGHTTP2_NO_ERROR;
            }
            else {
                code = http2.constants.NGHTTP2_CANCEL;
            }
            this.trace('close http2 stream with code ' + code);
            this.http2Stream.close(code);
        }
    }
    cancelWithStatus(status, details) {
        this.trace('cancelWithStatus code: ' + status + ' details: "' + details + '"');
        this.endCall({ code: status, details, metadata: new metadata_1.Metadata() });
    }
    getDeadline() {
        if (this.options.parentCall && this.options.flags & constants_1.Propagate.DEADLINE) {
            const parentDeadline = this.options.parentCall.getDeadline();
            const selfDeadline = this.options.deadline;
            const parentDeadlineMsecs = parentDeadline instanceof Date ? parentDeadline.getTime() : parentDeadline;
            const selfDeadlineMsecs = selfDeadline instanceof Date ? selfDeadline.getTime() : selfDeadline;
            return Math.min(parentDeadlineMsecs, selfDeadlineMsecs);
        }
        else {
            return this.options.deadline;
        }
    }
    getCredentials() {
        return this.credentials;
    }
    setCredentials(credentials) {
        this.credentials = this.channelCallCredentials.compose(credentials);
    }
    getStatus() {
        return this.finalStatus;
    }
    getPeer() {
        var _a, _b;
        return (_b = (_a = this.subchannel) === null || _a === void 0 ? void 0 : _a.getAddress()) !== null && _b !== void 0 ? _b : this.channel.getTarget();
    }
    getMethod() {
        return this.methodName;
    }
    getHost() {
        return this.options.host;
    }
    startRead() {
        /* If the stream has ended with an error, we should not emit any more
         * messages and we should communicate that the stream has ended */
        if (this.finalStatus !== null && this.finalStatus.code !== constants_1.Status.OK) {
            this.readsClosed = true;
            this.maybeOutputStatus();
            return;
        }
        this.canPush = true;
        if (this.http2Stream === null) {
            this.pendingRead = true;
        }
        else {
            if (this.unpushedReadMessages.length > 0) {
                const nextMessage = this.unpushedReadMessages.shift();
                this.push(nextMessage);
                return;
            }
            /* Only resume reading from the http2Stream if we don't have any pending
             * messages to emit */
            this.http2Stream.resume();
        }
    }
    maybeCloseWrites() {
        if (this.writesClosed &&
            !this.isWriteFilterPending &&
            this.http2Stream !== null) {
            this.trace('calling end() on HTTP/2 stream');
            this.http2Stream.end();
        }
    }
    sendMessageWithContext(context, message) {
        var _a;
        this.trace('write() called with message of length ' + message.length);
        const writeObj = {
            message,
            flags: context.flags,
        };
        const cb = (_a = context.callback) !== null && _a !== void 0 ? _a : (() => { });
        this.isWriteFilterPending = true;
        this.filterStack.sendMessage(Promise.resolve(writeObj)).then((message) => {
            this.isWriteFilterPending = false;
            if (this.http2Stream === null) {
                this.trace('deferring writing data chunk of length ' + message.message.length);
                this.pendingWrite = message.message;
                this.pendingWriteCallback = cb;
            }
            else {
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
exports.Http2CallStream = Http2CallStream;
//# sourceMappingURL=call-stream.js.map
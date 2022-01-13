/// <reference types="node" />
import * as http2 from 'http2';
import { CallCredentials } from './call-credentials';
import { Status } from './constants';
import { Filter, FilterFactory } from './filter';
import { FilterStackFactory } from './filter-stack';
import { Metadata } from './metadata';
import { ChannelImplementation } from './channel';
import { Subchannel } from './subchannel';
import { ServerSurfaceCall } from './server-call';
export declare type Deadline = Date | number;
export interface CallStreamOptions {
    deadline: Deadline;
    flags: number;
    host: string;
    parentCall: ServerSurfaceCall | null;
}
export declare type PartialCallStreamOptions = Partial<CallStreamOptions>;
export interface StatusObject {
    code: Status;
    details: string;
    metadata: Metadata;
}
export declare const enum WriteFlags {
    BufferHint = 1,
    NoCompress = 2,
    WriteThrough = 4
}
export interface WriteObject {
    message: Buffer;
    flags?: number;
}
export interface MetadataListener {
    (metadata: Metadata, next: (metadata: Metadata) => void): void;
}
export interface MessageListener {
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
export declare type Listener = Partial<FullListener>;
/**
 * An object with methods for handling the responses to a call.
 */
export interface InterceptingListener {
    onReceiveMetadata(metadata: Metadata): void;
    onReceiveMessage(message: any): void;
    onReceiveStatus(status: StatusObject): void;
}
export declare function isInterceptingListener(listener: Listener | InterceptingListener): listener is InterceptingListener;
export declare class InterceptingListenerImpl implements InterceptingListener {
    private listener;
    private nextListener;
    private processingMessage;
    private pendingStatus;
    constructor(listener: FullListener, nextListener: InterceptingListener);
    onReceiveMetadata(metadata: Metadata): void;
    onReceiveMessage(message: any): void;
    onReceiveStatus(status: StatusObject): void;
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
export declare class Http2CallStream implements Call {
    private readonly methodName;
    private readonly channel;
    private readonly options;
    private readonly channelCallCredentials;
    private readonly callNumber;
    credentials: CallCredentials;
    filterStack: Filter;
    private http2Stream;
    private pendingRead;
    private isWriteFilterPending;
    private pendingWrite;
    private pendingWriteCallback;
    private writesClosed;
    private decoder;
    private isReadFilterPending;
    private canPush;
    /**
     * Indicates that an 'end' event has come from the http2 stream, so there
     * will be no more data events.
     */
    private readsClosed;
    private statusOutput;
    private unpushedReadMessages;
    private unfilteredReadMessages;
    private mappedStatusCode;
    private finalStatus;
    private subchannel;
    private disconnectListener;
    private listener;
    private internalError;
    constructor(methodName: string, channel: ChannelImplementation, options: CallStreamOptions, filterStackFactory: FilterStackFactory, channelCallCredentials: CallCredentials, callNumber: number);
    private outputStatus;
    private trace;
    /**
     * On first call, emits a 'status' event with the given StatusObject.
     * Subsequent calls are no-ops.
     * @param status The status of the call.
     */
    private endCall;
    private maybeOutputStatus;
    private push;
    private handleFilterError;
    private handleFilteredRead;
    private filterReceivedMessage;
    private tryPush;
    private handleTrailers;
    attachHttp2Stream(stream: http2.ClientHttp2Stream, subchannel: Subchannel, extraFilterFactory?: FilterFactory<Filter>): void;
    start(metadata: Metadata, listener: InterceptingListener): void;
    private destroyHttp2Stream;
    cancelWithStatus(status: Status, details: string): void;
    getDeadline(): Deadline;
    getCredentials(): CallCredentials;
    setCredentials(credentials: CallCredentials): void;
    getStatus(): StatusObject | null;
    getPeer(): string;
    getMethod(): string;
    getHost(): string;
    startRead(): void;
    private maybeCloseWrites;
    sendMessageWithContext(context: MessageContext, message: Buffer): void;
    halfClose(): void;
}

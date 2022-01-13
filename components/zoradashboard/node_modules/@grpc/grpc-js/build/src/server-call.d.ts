/// <reference types="node" />
import { EventEmitter } from 'events';
import * as http2 from 'http2';
import { Duplex, Readable, Writable } from 'stream';
import { Deadline, StatusObject } from './call-stream';
import { Deserialize, Serialize } from './make-client';
import { Metadata } from './metadata';
import { ObjectReadable, ObjectWritable } from './object-stream';
import { ChannelOptions } from './channel-options';
export declare type ServerStatusResponse = Partial<StatusObject>;
export declare type ServerErrorResponse = ServerStatusResponse & Error;
export declare type ServerSurfaceCall = {
    cancelled: boolean;
    readonly metadata: Metadata;
    getPeer(): string;
    sendMetadata(responseMetadata: Metadata): void;
    getDeadline(): Deadline;
} & EventEmitter;
export declare type ServerUnaryCall<RequestType, ResponseType> = ServerSurfaceCall & {
    request: RequestType;
};
export declare type ServerReadableStream<RequestType, ResponseType> = ServerSurfaceCall & ObjectReadable<RequestType>;
export declare type ServerWritableStream<RequestType, ResponseType> = ServerSurfaceCall & ObjectWritable<ResponseType> & {
    request: RequestType;
    end: (metadata?: Metadata) => void;
};
export declare type ServerDuplexStream<RequestType, ResponseType> = ServerSurfaceCall & ObjectReadable<RequestType> & ObjectWritable<ResponseType> & {
    end: (metadata?: Metadata) => void;
};
export declare class ServerUnaryCallImpl<RequestType, ResponseType> extends EventEmitter implements ServerUnaryCall<RequestType, ResponseType> {
    private call;
    metadata: Metadata;
    request: RequestType;
    cancelled: boolean;
    constructor(call: Http2ServerCallStream<RequestType, ResponseType>, metadata: Metadata, request: RequestType);
    getPeer(): string;
    sendMetadata(responseMetadata: Metadata): void;
    getDeadline(): Deadline;
}
export declare class ServerReadableStreamImpl<RequestType, ResponseType> extends Readable implements ServerReadableStream<RequestType, ResponseType> {
    private call;
    metadata: Metadata;
    deserialize: Deserialize<RequestType>;
    cancelled: boolean;
    constructor(call: Http2ServerCallStream<RequestType, ResponseType>, metadata: Metadata, deserialize: Deserialize<RequestType>);
    _read(size: number): void;
    getPeer(): string;
    sendMetadata(responseMetadata: Metadata): void;
    getDeadline(): Deadline;
}
export declare class ServerWritableStreamImpl<RequestType, ResponseType> extends Writable implements ServerWritableStream<RequestType, ResponseType> {
    private call;
    metadata: Metadata;
    serialize: Serialize<ResponseType>;
    request: RequestType;
    cancelled: boolean;
    private trailingMetadata;
    constructor(call: Http2ServerCallStream<RequestType, ResponseType>, metadata: Metadata, serialize: Serialize<ResponseType>, request: RequestType);
    getPeer(): string;
    sendMetadata(responseMetadata: Metadata): void;
    getDeadline(): Deadline;
    _write(chunk: ResponseType, encoding: string, callback: (...args: any[]) => void): void;
    _final(callback: Function): void;
    end(metadata?: any): void;
}
export declare class ServerDuplexStreamImpl<RequestType, ResponseType> extends Duplex implements ServerDuplexStream<RequestType, ResponseType> {
    private call;
    metadata: Metadata;
    serialize: Serialize<ResponseType>;
    deserialize: Deserialize<RequestType>;
    cancelled: boolean;
    private trailingMetadata;
    constructor(call: Http2ServerCallStream<RequestType, ResponseType>, metadata: Metadata, serialize: Serialize<ResponseType>, deserialize: Deserialize<RequestType>);
    getPeer(): string;
    sendMetadata(responseMetadata: Metadata): void;
    getDeadline(): Deadline;
    end(metadata?: any): void;
}
export declare type sendUnaryData<ResponseType> = (error: ServerErrorResponse | ServerStatusResponse | null, value?: ResponseType | null, trailer?: Metadata, flags?: number) => void;
export declare type handleUnaryCall<RequestType, ResponseType> = (call: ServerUnaryCall<RequestType, ResponseType>, callback: sendUnaryData<ResponseType>) => void;
export declare type handleClientStreamingCall<RequestType, ResponseType> = (call: ServerReadableStream<RequestType, ResponseType>, callback: sendUnaryData<ResponseType>) => void;
export declare type handleServerStreamingCall<RequestType, ResponseType> = (call: ServerWritableStream<RequestType, ResponseType>) => void;
export declare type handleBidiStreamingCall<RequestType, ResponseType> = (call: ServerDuplexStream<RequestType, ResponseType>) => void;
export declare type HandleCall<RequestType, ResponseType> = handleUnaryCall<RequestType, ResponseType> | handleClientStreamingCall<RequestType, ResponseType> | handleServerStreamingCall<RequestType, ResponseType> | handleBidiStreamingCall<RequestType, ResponseType>;
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
export declare type Handler<RequestType, ResponseType> = UnaryHandler<RequestType, ResponseType> | ClientStreamingHandler<RequestType, ResponseType> | ServerStreamingHandler<RequestType, ResponseType> | BidiStreamingHandler<RequestType, ResponseType>;
export declare type HandlerType = 'bidi' | 'clientStream' | 'serverStream' | 'unary';
export declare class Http2ServerCallStream<RequestType, ResponseType> extends EventEmitter {
    private stream;
    private handler;
    private options;
    cancelled: boolean;
    deadlineTimer: NodeJS.Timer;
    private deadline;
    private wantTrailers;
    private metadataSent;
    private canPush;
    private isPushPending;
    private bufferedMessages;
    private messagesToPush;
    private maxSendMessageSize;
    private maxReceiveMessageSize;
    constructor(stream: http2.ServerHttp2Stream, handler: Handler<RequestType, ResponseType>, options: ChannelOptions);
    private checkCancelled;
    sendMetadata(customMetadata?: Metadata): void;
    receiveMetadata(headers: http2.IncomingHttpHeaders): Metadata | undefined;
    receiveUnaryMessage(): Promise<RequestType>;
    serializeMessage(value: ResponseType): Buffer;
    deserializeMessage(bytes: Buffer): RequestType;
    sendUnaryMessage(err: ServerErrorResponse | ServerStatusResponse | null, value?: ResponseType | null, metadata?: Metadata, flags?: number): Promise<void>;
    sendStatus(statusObj: StatusObject): void;
    sendError(error: ServerErrorResponse | ServerStatusResponse): void;
    write(chunk: Buffer): boolean | undefined;
    resume(): void;
    setupSurfaceCall(call: ServerSurfaceCall): void;
    setupReadable(readable: ServerReadableStream<RequestType, ResponseType> | ServerDuplexStream<RequestType, ResponseType>): void;
    consumeUnpushedMessages(readable: ServerReadableStream<RequestType, ResponseType> | ServerDuplexStream<RequestType, ResponseType>): boolean;
    private pushOrBufferMessage;
    private pushMessage;
    getPeer(): string;
    getDeadline(): Deadline;
}

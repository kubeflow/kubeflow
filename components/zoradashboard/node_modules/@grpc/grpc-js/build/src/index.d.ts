/// <reference types="node" />
import { ClientDuplexStream, ClientReadableStream, ClientUnaryCall, ClientWritableStream, ServiceError } from './call';
import { CallCredentials, OAuth2Client } from './call-credentials';
import { Deadline, StatusObject } from './call-stream';
import { Channel, ConnectivityState, ChannelImplementation } from './channel';
import { ChannelCredentials } from './channel-credentials';
import { CallOptions, Client, ClientOptions, CallInvocationTransformer, CallProperties, UnaryCallback } from './client';
import { LogVerbosity, Status, Propagate } from './constants';
import { Deserialize, loadPackageDefinition, makeClientConstructor, MethodDefinition, Serialize, ServiceDefinition } from './make-client';
import { Metadata, MetadataValue } from './metadata';
import { Server, UntypedHandleCall, UntypedServiceImplementation } from './server';
import { KeyCertPair, ServerCredentials } from './server-credentials';
import { StatusBuilder } from './status-builder';
import { handleBidiStreamingCall, handleServerStreamingCall, handleClientStreamingCall, handleUnaryCall, sendUnaryData, ServerUnaryCall, ServerReadableStream, ServerWritableStream, ServerDuplexStream } from './server-call';
export { OAuth2Client };
/**** Client Credentials ****/
export declare const credentials: {
    /**
     * Combine a ChannelCredentials with any number of CallCredentials into a
     * single ChannelCredentials object.
     * @param channelCredentials The ChannelCredentials object.
     * @param callCredentials Any number of CallCredentials objects.
     * @return The resulting ChannelCredentials object.
     */
    combineChannelCredentials: (channelCredentials: ChannelCredentials, ...callCredentials: CallCredentials[]) => ChannelCredentials;
    /**
     * Combine any number of CallCredentials into a single CallCredentials
     * object.
     * @param first The first CallCredentials object.
     * @param additional Any number of additional CallCredentials objects.
     * @return The resulting CallCredentials object.
     */
    combineCallCredentials: (first: CallCredentials, ...additional: CallCredentials[]) => CallCredentials;
    createInsecure: typeof ChannelCredentials.createInsecure;
    createSsl: typeof ChannelCredentials.createSsl;
    createFromMetadataGenerator: typeof CallCredentials.createFromMetadataGenerator;
    createFromGoogleCredential: typeof CallCredentials.createFromGoogleCredential;
    createEmpty: typeof CallCredentials.createEmpty;
};
/**** Metadata ****/
export { Metadata, MetadataValue };
/**** Constants ****/
export { LogVerbosity as logVerbosity, Status as status, ConnectivityState as connectivityState, Propagate as propagate, };
/**** Client ****/
export { Client, ClientOptions, loadPackageDefinition, makeClientConstructor, makeClientConstructor as makeGenericClientConstructor, CallProperties, CallInvocationTransformer, ChannelImplementation as Channel, Channel as ChannelInterface, UnaryCallback as requestCallback, };
/**
 * Close a Client object.
 * @param client The client to close.
 */
export declare const closeClient: (client: Client) => void;
export declare const waitForClientReady: (client: Client, deadline: Date | number, callback: (error?: Error | undefined) => void) => void;
export { sendUnaryData, ChannelCredentials, CallCredentials, Deadline, Serialize as serialize, Deserialize as deserialize, ClientUnaryCall, ClientReadableStream, ClientWritableStream, ClientDuplexStream, CallOptions, MethodDefinition, StatusObject, ServiceError, ServerUnaryCall, ServerReadableStream, ServerWritableStream, ServerDuplexStream, ServiceDefinition, UntypedHandleCall, UntypedServiceImplementation, };
/**** Server ****/
export { handleBidiStreamingCall, handleServerStreamingCall, handleUnaryCall, handleClientStreamingCall };
export declare type Call = ClientUnaryCall | ClientReadableStream<any> | ClientWritableStream<any> | ClientDuplexStream<any, any>;
/**** Unimplemented function stubs ****/
export declare const loadObject: (value: any, options: any) => never;
export declare const load: (filename: any, format: any, options: any) => never;
export declare const setLogger: (logger: Partial<Console>) => void;
export declare const setLogVerbosity: (verbosity: LogVerbosity) => void;
export { Server };
export { ServerCredentials };
export { KeyCertPair };
export declare const getClientChannel: (client: Client) => Channel;
export { StatusBuilder };
export { Listener } from './call-stream';
export { Requester, ListenerBuilder, RequesterBuilder, Interceptor, InterceptorOptions, InterceptorProvider, InterceptingCall, InterceptorConfigurationError, } from './client-interceptors';
export { GrpcObject } from './make-client';
export { ChannelOptions } from './channel-options';
import * as experimental from './experimental';
export { experimental };

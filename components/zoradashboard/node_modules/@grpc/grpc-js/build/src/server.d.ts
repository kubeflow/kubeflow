import { Deserialize, Serialize, ServiceDefinition } from './make-client';
import { HandleCall } from './server-call';
import { ServerCredentials } from './server-credentials';
import { ChannelOptions } from './channel-options';
export declare type UntypedHandleCall = HandleCall<any, any>;
export interface UntypedServiceImplementation {
    [name: string]: UntypedHandleCall;
}
export declare class Server {
    private http2ServerList;
    private handlers;
    private sessions;
    private started;
    private options;
    constructor(options?: ChannelOptions);
    addProtoService(): void;
    addService(service: ServiceDefinition, implementation: UntypedServiceImplementation): void;
    removeService(service: ServiceDefinition): void;
    bind(port: string, creds: ServerCredentials): void;
    bindAsync(port: string, creds: ServerCredentials, callback: (error: Error | null, port: number) => void): void;
    forceShutdown(): void;
    register<RequestType, ResponseType>(name: string, handler: HandleCall<RequestType, ResponseType>, serialize: Serialize<ResponseType>, deserialize: Deserialize<RequestType>, type: string): boolean;
    unregister(name: string): boolean;
    start(): void;
    tryShutdown(callback: (error?: Error) => void): void;
    addHttp2Port(): void;
    private _setupHandlers;
}

/// <reference types="node" />
import { HttpHandler, HttpRequest, HttpResponse } from "@aws-sdk/protocol-http";
import { HttpHandlerOptions } from "@aws-sdk/types";
import { Agent as hAgent } from "http";
import { Agent as hsAgent } from "https";
/**
 * Represents the http options that can be passed to a node http client.
 */
export interface NodeHttpHandlerOptions {
    /**
     * The maximum time in milliseconds that the connection phase of a request
     * may take before the connection attempt is abandoned.
     */
    connectionTimeout?: number;
    /**
     * The maximum time in milliseconds that a socket may remain idle before it
     * is closed.
     */
    socketTimeout?: number;
    httpAgent?: hAgent;
    httpsAgent?: hsAgent;
}
export declare class NodeHttpHandler implements HttpHandler {
    private readonly httpAgent;
    private readonly httpsAgent;
    private readonly connectionTimeout?;
    private readonly socketTimeout?;
    readonly metadata: {
        handlerProtocol: string;
    };
    constructor({ connectionTimeout, socketTimeout, httpAgent, httpsAgent }?: NodeHttpHandlerOptions);
    destroy(): void;
    handle(request: HttpRequest, { abortSignal }?: HttpHandlerOptions): Promise<{
        response: HttpResponse;
    }>;
}

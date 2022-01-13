/// <reference types="node" />
import { HttpHandlerOptions } from '@aws-sdk/types';
import { HttpHandler, HttpRequest, HttpResponse } from '@aws-sdk/protocol-http';
import { CancelTokenSource, AxiosTransformer } from 'axios';
import { FetchHttpHandlerOptions } from '@aws-sdk/fetch-http-handler';
import * as events from 'events';
export declare const SEND_UPLOAD_PROGRESS_EVENT = "sendUploadProgress";
export declare const SEND_DOWNLOAD_PROGRESS_EVENT = "sendDownloadProgress";
export declare const reactNativeRequestTransformer: AxiosTransformer[];
export declare class AxiosHttpHandler implements HttpHandler {
    private readonly httpOptions;
    private readonly emitter?;
    private readonly cancelTokenSource?;
    constructor(httpOptions?: FetchHttpHandlerOptions, emitter?: events.EventEmitter, cancelTokenSource?: CancelTokenSource);
    destroy(): void;
    handle(request: HttpRequest, options: HttpHandlerOptions): Promise<{
        response: HttpResponse;
    }>;
}

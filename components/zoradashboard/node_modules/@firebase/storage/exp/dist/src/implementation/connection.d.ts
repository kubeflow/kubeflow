/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Network headers
 */
export interface Headers {
    [name: string]: string;
}
/**
 * A lightweight wrapper around XMLHttpRequest with a
 * goog.net.XhrIo-like interface.
 */
export interface Connection {
    send(url: string, method: string, body?: ArrayBufferView | Blob | string | null, headers?: Headers): Promise<void>;
    getErrorCode(): ErrorCode;
    getStatus(): number;
    getResponseText(): string;
    /**
     * Abort the request.
     */
    abort(): void;
    getResponseHeader(header: string): string | null;
    addUploadProgressListener(listener: (p1: ProgressEvent) => void): void;
    removeUploadProgressListener(listener: (p1: ProgressEvent) => void): void;
}
/**
 * Error codes for requests made by the the XhrIo wrapper.
 */
export declare enum ErrorCode {
    NO_ERROR = 0,
    NETWORK_ERROR = 1,
    ABORT = 2
}

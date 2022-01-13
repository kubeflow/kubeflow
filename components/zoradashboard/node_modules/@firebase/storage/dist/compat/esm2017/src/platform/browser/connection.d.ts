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
import { Headers, Connection, ErrorCode } from '../../implementation/connection';
/**
 * Network layer for browsers. We use this instead of goog.net.XhrIo because
 * goog.net.XhrIo is hyuuuuge and doesn't work in React Native on Android.
 */
export declare class XhrConnection implements Connection {
    private xhr_;
    private errorCode_;
    private sendPromise_;
    private sent_;
    constructor();
    /**
     * @override
     */
    send(url: string, method: string, body?: ArrayBufferView | Blob | string, headers?: Headers): Promise<void>;
    /**
     * @override
     */
    getErrorCode(): ErrorCode;
    /**
     * @override
     */
    getStatus(): number;
    /**
     * @override
     */
    getResponseText(): string;
    /**
     * Aborts the request.
     * @override
     */
    abort(): void;
    /**
     * @override
     */
    getResponseHeader(header: string): string | null;
    /**
     * @override
     */
    addUploadProgressListener(listener: (p1: ProgressEvent) => void): void;
    /**
     * @override
     */
    removeUploadProgressListener(listener: (p1: ProgressEvent) => void): void;
}
export declare function newConnection(): Connection;

/**
 * @license
 * Copyright 2021 Google LLC
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
import { ErrorCode, Connection } from '../../implementation/connection';
/**
 * Network layer that works in Node.
 *
 * This network implementation should not be used in browsers as it does not
 * support progress updates.
 */
export declare class FetchConnection implements Connection {
    private errorCode_;
    private statusCode_;
    private body_;
    private headers_;
    private sent_;
    constructor();
    send(url: string, method: string, body?: ArrayBufferView | Blob | string, headers?: Record<string, string>): Promise<void>;
    getErrorCode(): ErrorCode;
    getStatus(): number;
    getResponseText(): string;
    abort(): void;
    getResponseHeader(header: string): string | null;
    addUploadProgressListener(listener: (p1: ProgressEvent) => void): void;
    /**
     * @override
     */
    removeUploadProgressListener(listener: (p1: ProgressEvent) => void): void;
}
export declare function newConnection(): Connection;

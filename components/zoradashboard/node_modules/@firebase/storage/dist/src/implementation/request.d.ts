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
import { RequestInfo } from './requestinfo';
import { Headers, Connection } from './connection';
import { ConnectionPool } from './connectionPool';
export interface Request<T> {
    getPromise(): Promise<T>;
    /**
     * Cancels the request. IMPORTANT: the promise may still be resolved with an
     * appropriate value (if the request is finished before you call this method,
     * but the promise has not yet been resolved), so don't just assume it will be
     * rejected if you call this function.
     * @param appDelete - True if the cancelation came from the app being deleted.
     */
    cancel(appDelete?: boolean): void;
}
/**
 * A collection of information about the result of a network request.
 * @param opt_canceled - Defaults to false.
 */
export declare class RequestEndStatus {
    wasSuccessCode: boolean;
    connection: Connection | null;
    /**
     * True if the request was canceled.
     */
    canceled: boolean;
    constructor(wasSuccessCode: boolean, connection: Connection | null, canceled?: boolean);
}
export declare function addAuthHeader_(headers: Headers, authToken: string | null): void;
export declare function addVersionHeader_(headers: Headers, firebaseVersion?: string): void;
export declare function addGmpidHeader_(headers: Headers, appId: string | null): void;
export declare function addAppCheckHeader_(headers: Headers, appCheckToken: string | null): void;
export declare function makeRequest<T>(requestInfo: RequestInfo<T>, appId: string | null, authToken: string | null, appCheckToken: string | null, pool: ConnectionPool, firebaseVersion?: string): Request<T>;

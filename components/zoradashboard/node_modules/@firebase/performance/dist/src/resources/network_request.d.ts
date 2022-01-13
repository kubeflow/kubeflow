/**
 * @license
 * Copyright 2019 Google LLC
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
export declare const enum HttpMethod {
    HTTP_METHOD_UNKNOWN = 0,
    GET = 1,
    PUT = 2,
    POST = 3,
    DELETE = 4,
    HEAD = 5,
    PATCH = 6,
    OPTIONS = 7,
    TRACE = 8,
    CONNECT = 9
}
export interface NetworkRequest {
    url: string;
    httpMethod?: HttpMethod;
    requestPayloadBytes?: number;
    responsePayloadBytes?: number;
    httpResponseCode?: number;
    responseContentType?: string;
    startTimeUs?: number;
    timeToRequestCompletedUs?: number;
    timeToResponseInitiatedUs?: number;
    timeToResponseCompletedUs?: number;
}
export declare function createNetworkRequestEntry(entry: PerformanceEntry): void;

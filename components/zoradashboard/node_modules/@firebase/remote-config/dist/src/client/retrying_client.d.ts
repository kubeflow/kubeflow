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
import { RemoteConfigAbortSignal, RemoteConfigFetchClient, FetchResponse, FetchRequest } from './remote_config_fetch_client';
import { ThrottleMetadata, Storage } from '../storage/storage';
/**
 * Supports waiting on a backoff by:
 *
 * <ul>
 *   <li>Promisifying setTimeout, so we can set a timeout in our Promise chain</li>
 *   <li>Listening on a signal bus for abort events, just like the Fetch API</li>
 *   <li>Failing in the same way the Fetch API fails, so timing out a live request and a throttled
 *       request appear the same.</li>
 * </ul>
 *
 * <p>Visible for testing.
 */
export declare function setAbortableTimeout(signal: RemoteConfigAbortSignal, throttleEndTimeMillis: number): Promise<void>;
/**
 * Decorates a Client with retry logic.
 *
 * <p>Comparable to CachingClient, but uses backoff logic instead of cache max age and doesn't cache
 * responses (because the SDK has no use for error responses).
 */
export declare class RetryingClient implements RemoteConfigFetchClient {
    private readonly client;
    private readonly storage;
    constructor(client: RemoteConfigFetchClient, storage: Storage);
    fetch(request: FetchRequest): Promise<FetchResponse>;
    /**
     * A recursive helper for attempting a fetch request repeatedly.
     *
     * @throws any non-retriable errors.
     */
    attemptFetch(request: FetchRequest, { throttleEndTimeMillis, backoffCount }: ThrottleMetadata): Promise<FetchResponse>;
}

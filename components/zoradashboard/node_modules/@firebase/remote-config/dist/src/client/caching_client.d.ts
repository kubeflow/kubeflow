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
import { StorageCache } from '../storage/storage_cache';
import { FetchResponse, RemoteConfigFetchClient, FetchRequest } from './remote_config_fetch_client';
import { Storage } from '../storage/storage';
import { Logger } from '@firebase/logger';
/**
 * Implements the {@link RemoteConfigClient} abstraction with success response caching.
 *
 * <p>Comparable to the browser's Cache API for responses, but the Cache API requires a Service
 * Worker, which requires HTTPS, which would significantly complicate SDK installation. Also, the
 * Cache API doesn't support matching entries by time.
 */
export declare class CachingClient implements RemoteConfigFetchClient {
    private readonly client;
    private readonly storage;
    private readonly storageCache;
    private readonly logger;
    constructor(client: RemoteConfigFetchClient, storage: Storage, storageCache: StorageCache, logger: Logger);
    /**
     * Returns true if the age of the cached fetched configs is less than or equal to
     * {@link Settings#minimumFetchIntervalInSeconds}.
     *
     * <p>This is comparable to passing `headers = { 'Cache-Control': max-age <maxAge> }` to the
     * native Fetch API.
     *
     * <p>Visible for testing.
     */
    isCachedDataFresh(cacheMaxAgeMillis: number, lastSuccessfulFetchTimestampMillis: number | undefined): boolean;
    fetch(request: FetchRequest): Promise<FetchResponse>;
}

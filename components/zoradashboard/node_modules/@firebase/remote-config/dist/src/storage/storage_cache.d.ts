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
import { FetchStatus } from '@firebase/remote-config-types';
import { FirebaseRemoteConfigObject } from '../client/remote_config_fetch_client';
import { Storage } from './storage';
/**
 * A memory cache layer over storage to support the SDK's synchronous read requirements.
 */
export declare class StorageCache {
    private readonly storage;
    constructor(storage: Storage);
    /**
     * Memory caches.
     */
    private lastFetchStatus?;
    private lastSuccessfulFetchTimestampMillis?;
    private activeConfig?;
    /**
     * Memory-only getters
     */
    getLastFetchStatus(): FetchStatus | undefined;
    getLastSuccessfulFetchTimestampMillis(): number | undefined;
    getActiveConfig(): FirebaseRemoteConfigObject | undefined;
    /**
     * Read-ahead getter
     */
    loadFromStorage(): Promise<void>;
    /**
     * Write-through setters
     */
    setLastFetchStatus(status: FetchStatus): Promise<void>;
    setLastSuccessfulFetchTimestampMillis(timestampMillis: number): Promise<void>;
    setActiveConfig(activeConfig: FirebaseRemoteConfigObject): Promise<void>;
}

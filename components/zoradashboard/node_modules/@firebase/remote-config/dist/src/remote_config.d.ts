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
import { FirebaseApp } from '@firebase/app-types';
import { RemoteConfig as RemoteConfigType, FetchStatus, Settings, Value as ValueType, LogLevel as RemoteConfigLogLevel } from '@firebase/remote-config-types';
import { StorageCache } from './storage/storage_cache';
import { RemoteConfigFetchClient } from './client/remote_config_fetch_client';
import { Storage } from './storage/storage';
import { Logger } from '@firebase/logger';
/**
 * Encapsulates business logic mapping network and storage dependencies to the public SDK API.
 *
 * See {@link https://github.com/FirebasePrivate/firebase-js-sdk/blob/master/packages/firebase/index.d.ts|interface documentation} for method descriptions.
 */
export declare class RemoteConfig implements RemoteConfigType {
    readonly app: FirebaseApp;
    private readonly _client;
    private readonly _storageCache;
    private readonly _storage;
    private readonly _logger;
    private _isInitializationComplete;
    private _initializePromise?;
    settings: Settings;
    defaultConfig: {
        [key: string]: string | number | boolean;
    };
    setLogLevel(logLevel: RemoteConfigLogLevel): void;
    get fetchTimeMillis(): number;
    get lastFetchStatus(): FetchStatus;
    constructor(app: FirebaseApp, _client: RemoteConfigFetchClient, _storageCache: StorageCache, _storage: Storage, _logger: Logger);
    activate(): Promise<boolean>;
    ensureInitialized(): Promise<void>;
    /**
     * @throws a {@link ErrorCode.FETCH_CLIENT_TIMEOUT} if the request takes longer than
     * {@link Settings.fetchTimeoutInSeconds} or
     * {@link DEFAULT_FETCH_TIMEOUT_SECONDS}.
     */
    fetch(): Promise<void>;
    fetchAndActivate(): Promise<boolean>;
    getAll(): {
        [key: string]: ValueType;
    };
    getBoolean(key: string): boolean;
    getNumber(key: string): number;
    getString(key: string): string;
    getValue(key: string): ValueType;
}

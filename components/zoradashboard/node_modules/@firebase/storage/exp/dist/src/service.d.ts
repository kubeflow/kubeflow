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
import { Location } from './implementation/location';
import { Request } from './implementation/request';
import { RequestInfo } from './implementation/requestinfo';
import { ConnectionPool } from './implementation/connectionPool';
import { Reference } from './reference';
import { Provider } from '@firebase/component';
import { FirebaseAuthInternalName } from '@firebase/auth-interop-types';
import { AppCheckInternalComponentName } from '@firebase/app-check-interop-types';
import { FirebaseApp, _FirebaseService } from "@firebase/app";
export declare function isUrl(path?: string): boolean;
/**
 * Returns a storage Reference for the given url.
 * @param storage - `Storage` instance.
 * @param url - URL. If empty, returns root reference.
 * @public
 */
export declare function ref(storage: StorageService, url?: string): Reference;
/**
 * Returns a storage Reference for the given path in the
 * default bucket.
 * @param storageOrRef - `Storage` service or storage `Reference`.
 * @param pathOrUrlStorage - path. If empty, returns root reference (if Storage
 * instance provided) or returns same reference (if Reference provided).
 * @public
 */
export declare function ref(storageOrRef: StorageService | Reference, path?: string): Reference;
export declare function useStorageEmulator(storage: StorageService, host: string, port: number): void;
/**
 * A service that provides Firebase Storage Reference instances.
 * @public
 * @param opt_url - gs:// url to a custom Storage Bucket
 */
export declare class StorageService implements _FirebaseService {
    /**
     * FirebaseApp associated with this StorageService instance.
     */
    readonly app: FirebaseApp;
    readonly _authProvider: Provider<FirebaseAuthInternalName>;
    /**
     * @internal
     */
    readonly _appCheckProvider: Provider<AppCheckInternalComponentName>;
    /**
     * @internal
     */
    readonly _pool: ConnectionPool;
    readonly _url?: string | undefined;
    readonly _firebaseVersion?: string | undefined;
    _bucket: Location | null;
    /**
     * This string can be in the formats:
     * - host
     * - host:port
     * - protocol://host:port
     */
    private _host;
    protected readonly _appId: string | null;
    private readonly _requests;
    private _deleted;
    private _maxOperationRetryTime;
    private _maxUploadRetryTime;
    constructor(
    /**
     * FirebaseApp associated with this StorageService instance.
     */
    app: FirebaseApp, _authProvider: Provider<FirebaseAuthInternalName>, 
    /**
     * @internal
     */
    _appCheckProvider: Provider<AppCheckInternalComponentName>, 
    /**
     * @internal
     */
    _pool: ConnectionPool, _url?: string | undefined, _firebaseVersion?: string | undefined);
    get host(): string;
    /**
     * Set host string for this service.
     * @param host - host string in the form of host, host:port,
     * or protocol://host:port
     */
    set host(host: string);
    /**
     * The maximum time to retry uploads in milliseconds.
     */
    get maxUploadRetryTime(): number;
    set maxUploadRetryTime(time: number);
    /**
     * The maximum time to retry operations other than uploads or downloads in
     * milliseconds.
     */
    get maxOperationRetryTime(): number;
    set maxOperationRetryTime(time: number);
    _getAuthToken(): Promise<string | null>;
    _getAppCheckToken(): Promise<string | null>;
    /**
     * Stop running requests and prevent more from being created.
     */
    _delete(): Promise<void>;
    /**
     * Returns a new firebaseStorage.Reference object referencing this StorageService
     * at the given Location.
     */
    _makeStorageReference(loc: Location): Reference;
    /**
     * @param requestInfo - HTTP RequestInfo object
     * @param authToken - Firebase auth token
     */
    _makeRequest<T>(requestInfo: RequestInfo<T>, authToken: string | null, appCheckToken: string | null): Request<T>;
    makeRequestWithTokens<T>(requestInfo: RequestInfo<T>): Promise<Request<T>>;
}

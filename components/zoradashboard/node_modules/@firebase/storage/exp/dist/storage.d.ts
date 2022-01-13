/**
 * Cloud Storage for Firebase
 *
 * @packageDocumentation
 */

import { AppCheckInternalComponentName } from '@firebase/app-check-interop-types';
import { CompleteFn } from '@firebase/util';
import { FirebaseApp } from '@firebase/app';
import { FirebaseAuthInternalName } from '@firebase/auth-interop-types';
import { FirebaseError } from '@firebase/util';
import { _FirebaseService } from '@firebase/app';
import { NextFn } from '@firebase/util';
import { Provider } from '@firebase/component';
import { Subscribe } from '@firebase/util';
import { Unsubscribe } from '@firebase/util';

/**
 * A function that is called if the event stream ends normally.
 */
declare type CompleteFn_2 = () => void;

/**
 * A lightweight wrapper around XMLHttpRequest with a
 * goog.net.XhrIo-like interface.
 */
declare interface Connection {
    send(url: string, method: string, body?: ArrayBufferView | Blob | string | null, headers?: Headers_2): Promise<void>;
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
 * Factory-like class for creating XhrIo instances.
 */
declare class ConnectionPool {
    createConnection(): Connection;
}

/**
 * Deletes the object at this location.
 * @public
 * @param ref - StorageReference for object to delete.
 * @returns A promise that resolves if the deletion succeeds.
 */
export declare function deleteObject(ref: StorageReference): Promise<void>;

/**
 * Error codes for requests made by the the XhrIo wrapper.
 */
declare enum ErrorCode {
    NO_ERROR = 0,
    NETWORK_ERROR = 1,
    ABORT = 2
}

/**
 * A function that is called with a `FirebaseStorageError`
 * if the event stream ends due to an error.
 */
declare type ErrorFn = (error: FirebaseStorageError_2) => void;

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
 * @param opt_elideCopy - If true, doesn't copy mutable input data
 *     (e.g. Uint8Arrays). Pass true only if you know the objects will not be
 *     modified after this blob's construction.
 *
 * @internal
 */
export declare class _FbsBlob {
    private data_;
    private size_;
    private type_;
    constructor(data: Blob | Uint8Array | ArrayBuffer, elideCopy?: boolean);
    size(): number;
    type(): string;
    slice(startByte: number, endByte: number): _FbsBlob | null;
    static getBlob(...args: Array<string | _FbsBlob>): _FbsBlob | null;
    uploadData(): Blob | Uint8Array;
}

/**
 * An error returned by the Firebase Storage SDK.
 * @public
 */
export declare interface FirebaseStorageError extends FirebaseError {
    /**
     * A server response message for the error, if applicable.
     */
    serverResponse: string | null;
}

/**
 * An error returned by the Firebase Storage SDK.
 * @public
 */
declare class FirebaseStorageError_2 extends FirebaseError {
    private readonly _baseMessage;
    /**
     * Stores custom error data unque to FirebaseStorageError.
     */
    customData: {
        serverResponse: string | null;
    };
    /**
     * @param code - A StorageErrorCode string to be prefixed with 'storage/' and
     *  added to the end of the message.
     * @param message  - Error message.
     */
    constructor(code: StorageErrorCode, message: string);
    /**
     * Compares a StorageErrorCode against this error's code, filtering out the prefix.
     */
    _codeEquals(code: StorageErrorCode): boolean;
    /**
     * Optional response message that was added by the server.
     */
    get serverResponse(): null | string;
    set serverResponse(serverResponse: string | null);
}

/**
 * The full set of object metadata, including read-only properties.
 * @public
 */
export declare interface FullMetadata extends UploadMetadata {
    /**
     * The bucket this object is contained in.
     */
    bucket: string;
    /**
     * The full path of this object.
     */
    fullPath: string;
    /**
     * The object's generation.
     * {@link https://cloud.google.com/storage/docs/generations-preconditions}
     */
    generation: string;
    /**
     * The object's metageneration.
     * {@link https://cloud.google.com/storage/docs/generations-preconditions}
     */
    metageneration: string;
    /**
     * The short name of this object, which is the last component of the full path.
     * For example, if fullPath is 'full/path/image.png', name is 'image.png'.
     */
    name: string;
    /**
     * The size of this object, in bytes.
     */
    size: number;
    /**
     * A date string representing when this object was created.
     */
    timeCreated: string;
    /**
     * A date string representing when this object was last updated.
     */
    updated: string;
    /**
     * Tokens to allow access to the downloatd URL.
     */
    downloadTokens: string[] | undefined;
    /**
     * `StorageReference` associated with this upload.
     */
    ref?: StorageReference | undefined;
}

/**
 * @internal
 */
export declare function _getChild(ref: StorageReference, childPath: string): _Reference;

/**
 * Returns the download URL for the given Reference.
 * @public
 * @returns A promise that resolves with the download
 *     URL for this object.
 */
export declare function getDownloadURL(ref: StorageReference): Promise<string>;

/**
 * A promise that resolves with the metadata for this object. If this
 * object doesn't exist or metadata cannot be retreived, the promise is
 * rejected.
 * @public
 * @param ref - StorageReference to get metadata from.
 */
export declare function getMetadata(ref: StorageReference): Promise<FullMetadata>;

/**
 * Gets a Firebase StorageService instance for the given Firebase app.
 * @public
 * @param app - Firebase app to get Storage instance for.
 * @param bucketUrl - The gs:// url to your Firebase Storage Bucket.
 * If not passed, uses the app's default Storage Bucket.
 * @returns A Firebase StorageService instance.
 */
export declare function getStorage(app?: FirebaseApp, bucketUrl?: string): StorageService;

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
declare interface Headers_2 {
    [name: string]: string;
}

/**
 * Internal enum for task state.
 */
declare const enum InternalTaskState {
    RUNNING = "running",
    PAUSING = "pausing",
    PAUSED = "paused",
    SUCCESS = "success",
    CANCELING = "canceling",
    CANCELED = "canceled",
    ERROR = "error"
}

/**
 * List items (files) and prefixes (folders) under this storage reference.
 *
 * List API is only available for Firebase Rules Version 2.
 *
 * GCS is a key-blob store. Firebase Storage imposes the semantic of '/'
 * delimited folder structure.
 * Refer to GCS's List API if you want to learn more.
 *
 * To adhere to Firebase Rules's Semantics, Firebase Storage does not
 * support objects whose paths end with "/" or contain two consecutive
 * "/"s. Firebase Storage List API will filter these unsupported objects.
 * list() may fail if there are too many unsupported objects in the bucket.
 * @public
 *
 * @param ref - StorageReference to get list from.
 * @param options - See ListOptions for details.
 * @returns A Promise that resolves with the items and prefixes.
 *      `prefixes` contains references to sub-folders and `items`
 *      contains references to objects in this folder. `nextPageToken`
 *      can be used to get the rest of the results.
 */
export declare function list(ref: StorageReference, options?: ListOptions): Promise<ListResult>;

/**
 * List all items (files) and prefixes (folders) under this storage reference.
 *
 * This is a helper method for calling list() repeatedly until there are
 * no more results. The default pagination size is 1000.
 *
 * Note: The results may not be consistent if objects are changed while this
 * operation is running.
 *
 * Warning: listAll may potentially consume too many resources if there are
 * too many results.
 * @public
 * @param ref - StorageReference to get list from.
 *
 * @returns A Promise that resolves with all the items and prefixes under
 *      the current storage reference. `prefixes` contains references to
 *      sub-directories and `items` contains references to objects in this
 *      folder. `nextPageToken` is never returned.
 */
export declare function listAll(ref: StorageReference): Promise<ListResult>;

/**
 * The options `list()` accepts.
 * @public
 */
export declare interface ListOptions {
    /**
     * If set, limits the total number of `prefixes` and `items` to return.
     * The default and maximum maxResults is 1000.
     */
    maxResults?: number | null;
    /**
     * The `nextPageToken` from a previous call to `list()`. If provided,
     * listing is resumed from the previous position.
     */
    pageToken?: string | null;
}

/**
 * Result returned by list().
 * @public
 */
export declare interface ListResult {
    /**
     * References to prefixes (sub-folders). You can call list() on them to
     * get its contents.
     *
     * Folders are implicit based on '/' in the object paths.
     * For example, if a bucket has two objects '/a/b/1' and '/a/b/2', list('/a')
     * will return '/a/b' as a prefix.
     */
    prefixes: StorageReference[];
    /**
     * Objects in this directory.
     * You can call getMetadata() and getDownloadUrl() on them.
     */
    items: StorageReference[];
    /**
     * If set, there might be more results for this list. Use this token to resume the list.
     */
    nextPageToken?: string;
}

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
 * Firebase Storage location data.
 *
 * @internal
 */
export declare class _Location {
    readonly bucket: string;
    private path_;
    constructor(bucket: string, path: string);
    get path(): string;
    get isRoot(): boolean;
    fullServerUrl(): string;
    bucketOnlyServerUrl(): string;
    static makeFromBucketSpec(bucketString: string, host: string): _Location;
    static makeFromUrl(url: string, host: string): _Location;
}

/**
 * @fileoverview Documentation for the metadata format.
 */
/**
 * The full set of object metadata, including read-only properties.
 */
declare interface Metadata extends FullMetadata {
    [prop: string]: unknown;
}

/**
 * Function that is called once for each value in a stream of values.
 */
declare type NextFn_2<T> = (value: T) => void;

/**
 * Returns a StorageReference for the given url.
 * @param storage - `StorageService` instance.
 * @param url - URL. If empty, returns root reference.
 * @public
 */
export declare function ref(storage: StorageService, url?: string): StorageReference;

/**
 * Returns a StorageReference for the given path in the
 * default bucket.
 * @param storageOrRef - `StorageService` or `StorageReference`.
 * @param pathOrUrlStorage - path. If empty, returns root reference (if Storage
 * instance provided) or returns same reference (if Reference provided).
 * @public
 */
export declare function ref(storageOrRef: StorageService | StorageReference, path?: string): StorageReference;

/**
 * Provides methods to interact with a bucket in the Firebase Storage service.
 * @internal
 * @param _location - An fbs.location, or the URL at
 *     which to base this object, in one of the following forms:
 *         gs://<bucket>/<object-path>
 *         http[s]://firebasestorage.googleapis.com/
 *                     <api-version>/b/<bucket>/o/<object-path>
 *     Any query or fragment strings will be ignored in the http[s]
 *     format. If no value is passed, the storage object will use a URL based on
 *     the project ID of the base firebase.App instance.
 */
export declare class _Reference {
    private _service;
    _location: _Location;
    constructor(_service: StorageService_2, location: string | _Location);
    /**
     * Returns the URL for the bucket and path this object references,
     *     in the form gs://<bucket>/<object-path>
     * @override
     */
    toString(): string;
    protected _newRef(service: StorageService_2, location: _Location): _Reference;
    /**
     * A reference to the root of this object's bucket.
     */
    get root(): _Reference;
    /**
     * The name of the bucket containing this reference's object.
     */
    get bucket(): string;
    /**
     * The full path of this object.
     */
    get fullPath(): string;
    /**
     * The short name of this object, which is the last component of the full path.
     * For example, if fullPath is 'full/path/image.png', name is 'image.png'.
     */
    get name(): string;
    /**
     * The `StorageService` instance this `StorageReference` is associated with.
     */
    get storage(): StorageService_2;
    /**
     * A `StorageReference` pointing to the parent location of this `StorageReference`, or null if
     * this reference is the root.
     */
    get parent(): _Reference | null;
    /**
     * Utility function to throw an error in methods that do not accept a root reference.
     */
    _throwIfRoot(name: string): void;
}

declare interface Request_2<T> {
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

declare class RequestInfo_2<T> {
    url: string;
    method: string;
    /**
     * Returns the value with which to resolve the request's promise. Only called
     * if the request is successful. Throw from this function to reject the
     * returned Request's promise with the thrown error.
     * Note: The XhrIo passed to this function may be reused after this callback
     * returns. Do not keep a reference to it in any way.
     */
    handler: (p1: Connection, p2: string) => T;
    timeout: number;
    urlParams: UrlParams;
    headers: Headers_2;
    body: Blob | string | Uint8Array | null;
    errorHandler: ((p1: Connection, p2: FirebaseStorageError_2) => FirebaseStorageError_2) | null;
    /**
     * Called with the current number of bytes uploaded and total size (-1 if not
     * computable) of the request body (i.e. used to report upload progress).
     */
    progressCallback: ((p1: number, p2: number) => void) | null;
    successCodes: number[];
    additionalRetryCodes: number[];
    constructor(url: string, method: string, 
    /**
     * Returns the value with which to resolve the request's promise. Only called
     * if the request is successful. Throw from this function to reject the
     * returned Request's promise with the thrown error.
     * Note: The XhrIo passed to this function may be reused after this callback
     * returns. Do not keep a reference to it in any way.
     */
    handler: (p1: Connection, p2: string) => T, timeout: number);
}

/**
 * Object metadata that can be set at any time.
 * @public
 */
export declare interface SettableMetadata {
    /**
     * Served as the 'Cache-Control' header on object download.
     */
    cacheControl?: string | undefined;
    /**
     * Served as the 'Content-Disposition' header on object download.
     */
    contentDisposition?: string | undefined;
    /**
     * Served as the 'Content-Encoding' header on object download.
     */
    contentEncoding?: string | undefined;
    /**
     * Served as the 'Content-Language' header on object download.
     */
    contentLanguage?: string | undefined;
    /**
     * Served as the 'Content-Type' header on object download.
     */
    contentType?: string | undefined;
    /**
     * Additional user-defined custom metadata.
     */
    customMetadata?: {
        [key: string]: string;
    } | undefined;
}

/**
 * @public
 * Error codes that can be attached to `FirebaseStorageError`s.
 */
declare const enum StorageErrorCode {
    UNKNOWN = "unknown",
    OBJECT_NOT_FOUND = "object-not-found",
    BUCKET_NOT_FOUND = "bucket-not-found",
    PROJECT_NOT_FOUND = "project-not-found",
    QUOTA_EXCEEDED = "quota-exceeded",
    UNAUTHENTICATED = "unauthenticated",
    UNAUTHORIZED = "unauthorized",
    UNAUTHORIZED_APP = "unauthorized-app",
    RETRY_LIMIT_EXCEEDED = "retry-limit-exceeded",
    INVALID_CHECKSUM = "invalid-checksum",
    CANCELED = "canceled",
    INVALID_EVENT_NAME = "invalid-event-name",
    INVALID_URL = "invalid-url",
    INVALID_DEFAULT_BUCKET = "invalid-default-bucket",
    NO_DEFAULT_BUCKET = "no-default-bucket",
    CANNOT_SLICE_BLOB = "cannot-slice-blob",
    SERVER_FILE_WRONG_SIZE = "server-file-wrong-size",
    NO_DOWNLOAD_URL = "no-download-url",
    INVALID_ARGUMENT = "invalid-argument",
    INVALID_ARGUMENT_COUNT = "invalid-argument-count",
    APP_DELETED = "app-deleted",
    INVALID_ROOT_OPERATION = "invalid-root-operation",
    INVALID_FORMAT = "invalid-format",
    INTERNAL_ERROR = "internal-error",
    UNSUPPORTED_ENVIRONMENT = "unsupported-environment"
}

/**
 * A stream observer for Firebase Storage.
 * @public
 */
export declare interface StorageObserver<T> {
    next?: NextFn<T> | null;
    error?: (error: FirebaseStorageError) => void | null;
    complete?: CompleteFn | null;
}

/**
 * An observer identical to the `Observer` defined in packages/util except the
 * error passed into the ErrorFn is specifically a `FirebaseStorageError`.
 */
declare interface StorageObserver_2<T> {
    /**
     * Function that is called once for each value in the event stream.
     */
    next?: NextFn_2<T>;
    /**
     * A function that is called with a `FirebaseStorageError`
     * if the event stream ends due to an error.
     */
    error?: ErrorFn;
    /**
     * A function that is called if the event stream ends normally.
     */
    complete?: CompleteFn_2;
}

/**
 * Represents a reference to a Google Cloud Storage object. Developers can
 * upload, download, and delete objects, as well as get/set object metadata.
 * @public
 */
export declare interface StorageReference {
    /**
     * Returns a gs:// URL for this object in the form
     *   `gs://<bucket>/<path>/<to>/<object>`
     * @returns The gs:// URL.
     */
    toString(): string;
    /**
     * A reference to the root of this object's bucket.
     */
    root: StorageReference;
    /**
     * The name of the bucket containing this reference's object.
     */
    bucket: string;
    /**
     * The full path of this object.
     */
    fullPath: string;
    /**
     * The short name of this object, which is the last component of the full path.
     * For example, if fullPath is 'full/path/image.png', name is 'image.png'.
     */
    name: string;
    /**
     * The StorageService associated with this reference.
     */
    storage: StorageService;
    /**
     * A reference pointing to the parent location of this reference, or null if
     * this reference is the root.
     */
    parent: StorageReference | null;
}

/**
 * A Firebase Storage instance.
 * @public
 */
export declare interface StorageService extends _FirebaseService {
    /**
     * FirebaseApp associated with this StorageService instance.
     */
    readonly app: FirebaseApp;
    /**
     * The maximum time to retry uploads in milliseconds.
     */
    maxUploadRetryTime: number;
    /**
     * The maximum time to retry operations other than uploads or downloads in
     * milliseconds.
     */
    maxOperationRetryTime: number;
}

/**
 * A service that provides Firebase Storage Reference instances.
 * @public
 * @param opt_url - gs:// url to a custom Storage Bucket
 */
declare class StorageService_2 implements _FirebaseService {
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
    _bucket: _Location | null;
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
    _makeStorageReference(loc: _Location): _Reference;
    /**
     * @param requestInfo - HTTP RequestInfo object
     * @param authToken - Firebase auth token
     */
    _makeRequest<T>(requestInfo: RequestInfo_2<T>, authToken: string | null, appCheckToken: string | null): Request_2<T>;
    makeRequestWithTokens<T>(requestInfo: RequestInfo_2<T>): Promise<Request_2<T>>;
}

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
 * An enumeration of the possible string formats for upload.
 * @public
 */
export declare type StringFormat = string;

/**
 * An enumeration of the possible string formats for upload.
 * @public
 */
export declare const StringFormat: {
    /**
     * Indicates the string should be interpreted "raw", that is, as normal text.
     * The string will be interpreted as UTF-16, then uploaded as a UTF-8 byte
     * sequence.
     * Example: The string 'Hello! \\ud83d\\ude0a' becomes the byte sequence
     * 48 65 6c 6c 6f 21 20 f0 9f 98 8a
     */
    RAW: string;
    /**
     * Indicates the string should be interpreted as base64-encoded data.
     * Padding characters (trailing '='s) are optional.
     * Example: The string 'rWmO++E6t7/rlw==' becomes the byte sequence
     * ad 69 8e fb e1 3a b7 bf eb 97
     */
    BASE64: string;
    /**
     * Indicates the string should be interpreted as base64url-encoded data.
     * Padding characters (trailing '='s) are optional.
     * Example: The string 'rWmO--E6t7_rlw==' becomes the byte sequence
     * ad 69 8e fb e1 3a b7 bf eb 97
     */
    BASE64URL: string;
    /**
     * Indicates the string is a data URL, such as one obtained from
     * canvas.toDataURL().
     * Example: the string 'data:application/octet-stream;base64,aaaa'
     * becomes the byte sequence
     * 69 a6 9a
     * (the content-type "application/octet-stream" is also applied, but can
     * be overridden in the metadata object).
     */
    DATA_URL: string;
};

/**
 * Subscribes to an event stream.
 */
declare type Subscribe_2<T> = (next?: NextFn_2<T> | StorageObserver_2<T>, error?: ErrorFn, complete?: CompleteFn_2) => Unsubscribe_2;

/**
 * An event that is triggered on a task.
 * @public
 */
export declare type TaskEvent = 'state_changed';

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
 * @fileoverview Enumerations used for upload tasks.
 */
/**
 * An event that is triggered on a task.
 */
declare type TaskEvent_2 = string;

/**
 * An event that is triggered on a task.
 */
declare const TaskEvent_2: {
    /**
     * For this event,
     * <ul>
     *   <li>The `next` function is triggered on progress updates and when the
     *       task is paused/resumed with an `UploadTaskSnapshot` as the first
     *       argument.</li>
     *   <li>The `error` function is triggered if the upload is canceled or fails
     *       for another reason.</li>
     *   <li>The `complete` function is triggered if the upload completes
     *       successfully.</li>
     * </ul>
     */
    STATE_CHANGED: string;
};

/**
 * Represents the current state of a running upload.
 * @public
 */
export declare type TaskState = 'running' | 'paused' | 'success' | 'canceled' | 'error';

/**
 * Represents the current state of a running upload.
 */
declare type TaskState_2 = string;

/**
 * Represents the current state of a running upload.
 */
declare const TaskState_2: {
    /** The task is currently transferring data. */
    RUNNING: string;
    /** The task was paused by the user. */
    PAUSED: string;
    /** The task completed successfully. */
    SUCCESS: string;
    /** The task was canceled. */
    CANCELED: string;
    /** The task failed with an error. */
    ERROR: string;
};

/**
 * Unsubscribes from a stream.
 */
declare type Unsubscribe_2 = () => void;

/**
 * Updates the metadata for this object.
 * @public
 * @param ref - StorageReference to update metadata for.
 * @param metadata - The new metadata for the object.
 *     Only values that have been explicitly set will be changed. Explicitly
 *     setting a value to null will remove the metadata.
 * @returns A promise that resolves with the new metadata for this object.
 */
export declare function updateMetadata(ref: StorageReference, metadata: SettableMetadata): Promise<FullMetadata>;

/**
 * Uploads data to this object's location.
 * The upload is not resumable.
 * @public
 * @param ref - StorageReference where data should be uploaded.
 * @param data - The data to upload.
 * @param metadata - Metadata for the data to upload.
 * @returns A Promise containing an UploadResult
 */
export declare function uploadBytes(ref: StorageReference, data: Blob | Uint8Array | ArrayBuffer, metadata?: UploadMetadata): Promise<UploadResult>;

/**
 * Uploads data to this object's location.
 * The upload can be paused and resumed, and exposes progress updates.
 * @public
 * @param ref - StorageReference where data should be uploaded.
 * @param data - The data to upload.
 * @param metadata - Metadata for the data to upload.
 * @returns An UploadTask
 */
export declare function uploadBytesResumable(ref: StorageReference, data: Blob | Uint8Array | ArrayBuffer, metadata?: UploadMetadata): UploadTask;

/**
 * Object metadata that can be set at upload.
 * @public
 */
export declare interface UploadMetadata extends SettableMetadata {
    /**
     * A Base64-encoded MD5 hash of the object being uploaded.
     */
    md5Hash?: string | undefined;
}

/**
 * Result returned from a non-resumable upload.
 * @public
 */
export declare interface UploadResult {
    /**
     * Contains the metadata sent back from the server.
     */
    readonly metadata: FullMetadata;
    /**
     * The reference that spawned this upload.
     */
    readonly ref: StorageReference;
}

/**
 * Uploads a string to this object's location.
 * The upload is not resumable.
 * @public
 * @param ref - StorageReference where string should be uploaded.
 * @param value - The string to upload.
 * @param format - The format of the string to upload.
 * @param metadata - Metadata for the string to upload.
 * @returns A Promise containing an UploadResult
 */
export declare function uploadString(ref: StorageReference, value: string, format?: string, metadata?: UploadMetadata): Promise<UploadResult>;

/**
 * Represents the process of uploading an object. Allows you to monitor and
 * manage the upload.
 * @public
 */
export declare interface UploadTask {
    /**
     * Cancels a running task. Has no effect on a complete or failed task.
     * @returns True if the cancel had an effect.
     */
    cancel(): boolean;
    /**
     * Equivalent to calling `then(null, onRejected)`.
     */
    catch(onRejected: (error: FirebaseStorageError) => unknown): Promise<unknown>;
    /**
     * Listens for events on this task.
     *
     * Events have three callback functions (referred to as `next`, `error`, and
     * `complete`).
     *
     * If only the event is passed, a function that can be used to register the
     * callbacks is returned. Otherwise, the callbacks are passed after the event.
     *
     * Callbacks can be passed either as three separate arguments <em>or</em> as the
     * `next`, `error`, and `complete` properties of an object. Any of the three
     * callbacks is optional, as long as at least one is specified. In addition,
     * when you add your callbacks, you get a function back. You can call this
     * function to unregister the associated callbacks.
     *
     * @example **Pass callbacks separately or in an object.**
     * ```javascript
     * var next = function(snapshot) {};
     * var error = function(error) {};
     * var complete = function() {};
     *
     * // The first example.
     * uploadTask.on(
     *     firebase.storage.TaskEvent.STATE_CHANGED,
     *     next,
     *     error,
     *     complete);
     *
     * // This is equivalent to the first example.
     * uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
     *   'next': next,
     *   'error': error,
     *   'complete': complete
     * });
     *
     * // This is equivalent to the first example.
     * var subscribe = uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);
     * subscribe(next, error, complete);
     *
     * // This is equivalent to the first example.
     * var subscribe = uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);
     * subscribe({
     *   'next': next,
     *   'error': error,
     *   'complete': complete
     * });
     * ```
     *
     * @example **Any callback is optional.**
     * ```javascript
     * // Just listening for completion, this is legal.
     * uploadTask.on(
     *     firebase.storage.TaskEvent.STATE_CHANGED,
     *     null,
     *     null,
     *     function() {
     *       console.log('upload complete!');
     *     });
     *
     * // Just listening for progress/state changes, this is legal.
     * uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
     *   var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
     *   console.log(percent + "% done");
     * });
     *
     * // This is also legal.
     * uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
     *   'complete': function() {
     *     console.log('upload complete!');
     *   }
     * });
     * ```
     *
     * @example **Use the returned function to remove callbacks.**
     * ```javascript
     * var unsubscribe = uploadTask.on(
     *     firebase.storage.TaskEvent.STATE_CHANGED,
     *     function(snapshot) {
     *       var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
     *       console.log(percent + "% done");
     *       // Stop after receiving one update.
     *       unsubscribe();
     *     });
     *
     * // This code is equivalent to the above.
     * var handle = uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);
     * unsubscribe = handle(function(snapshot) {
     *   var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
     *   console.log(percent + "% done");
     *   // Stop after receiving one update.
     *   unsubscribe();
     * });
     * ```
     *
     * @param event - The type of event to listen for.
     * @param nextOrObserver -
     *     The `next` function, which gets called for each item in
     *     the event stream, or an observer object with some or all of these three
     *     properties (`next`, `error`, `complete`).
     * @param error - A function that gets called with a `FirebaseStorageError`
     *     if the event stream ends due to an error.
     * @param completed - A function that gets called if the
     *     event stream ends normally.
     * @returns
     *     If only the event argument is passed, returns a function you can use to
     *     add callbacks (see the examples above). If more than just the event
     *     argument is passed, returns a function you can call to unregister the
     *     callbacks.
     */
    on(event: TaskEvent, nextOrObserver?: StorageObserver<UploadTaskSnapshot> | null | ((snapshot: UploadTaskSnapshot) => unknown), error?: ((a: FirebaseStorageError) => unknown) | null, complete?: Unsubscribe | null): Unsubscribe | Subscribe<UploadTaskSnapshot>;
    /**
     * Pauses a currently running task. Has no effect on a paused or failed task.
     * @returns True if the operation took effect, false if ignored.
     */
    pause(): boolean;
    /**
     * Resumes a paused task. Has no effect on a currently running or failed task.
     * @returns True if the operation took effect, false if ignored.
     */
    resume(): boolean;
    /**
     * A snapshot of the current task state.
     */
    snapshot: UploadTaskSnapshot;
    /**
     * This object behaves like a Promise, and resolves with its snapshot data
     * when the upload completes.
     * @param onFulfilled - The fulfillment callback. Promise chaining works as normal.
     * @param onRejected - The rejection callback.
     */
    then(onFulfilled?: ((snapshot: UploadTaskSnapshot) => unknown) | null, onRejected?: ((error: FirebaseStorageError) => unknown) | null): Promise<unknown>;
}

/**
 * Represents a blob being uploaded. Can be used to pause/resume/cancel the
 * upload and manage callbacks for various events.
 * @internal
 */
export declare class _UploadTask {
    private _ref;
    /**
     * The data to be uploaded.
     */
    _blob: _FbsBlob;
    /**
     * Metadata related to the upload.
     */
    _metadata: Metadata | null;
    private _mappings;
    /**
     * Number of bytes transferred so far.
     */
    _transferred: number;
    private _needToFetchStatus;
    private _needToFetchMetadata;
    private _observers;
    private _resumable;
    /**
     * Upload state.
     */
    _state: InternalTaskState;
    private _error?;
    private _uploadUrl?;
    private _request?;
    private _chunkMultiplier;
    private _errorHandler;
    private _metadataErrorHandler;
    private _resolve?;
    private _reject?;
    private _promise;
    /**
     * @param ref - The firebaseStorage.Reference object this task came
     *     from, untyped to avoid cyclic dependencies.
     * @param blob - The blob to upload.
     */
    constructor(ref: _Reference, blob: _FbsBlob, metadata?: Metadata | null);
    private _makeProgressCallback;
    private _shouldDoResumable;
    private _start;
    private _resolveToken;
    private _createResumable;
    private _fetchStatus;
    private _continueUpload;
    private _increaseMultiplier;
    private _fetchMetadata;
    private _oneShotUpload;
    private _updateProgress;
    private _transition;
    private completeTransitions_;
    /**
     * A snapshot of the current task state.
     */
    get snapshot(): UploadTaskSnapshot_2;
    /**
     * Adds a callback for an event.
     * @param type - The type of event to listen for.
     * @param nextOrObserver -
     *     The `next` function, which gets called for each item in
     *     the event stream, or an observer object with some or all of these three
     *     properties (`next`, `error`, `complete`).
     * @param error - A function that gets called with a `FirebaseStorageError`
     *     if the event stream ends due to an error.
     * @param completed - A function that gets called if the
     *     event stream ends normally.
     * @returns
     *     If only the event argument is passed, returns a function you can use to
     *     add callbacks (see the examples above). If more than just the event
     *     argument is passed, returns a function you can call to unregister the
     *     callbacks.
     */
    on(type: TaskEvent_2, nextOrObserver?: StorageObserver_2<UploadTaskSnapshot_2> | ((a: UploadTaskSnapshot_2) => unknown), error?: ErrorFn, completed?: CompleteFn_2): Unsubscribe_2 | Subscribe_2<UploadTaskSnapshot_2>;
    /**
     * This object behaves like a Promise, and resolves with its snapshot data
     * when the upload completes.
     * @param onFulfilled - The fulfillment callback. Promise chaining works as normal.
     * @param onRejected - The rejection callback.
     */
    then<U>(onFulfilled?: ((value: UploadTaskSnapshot_2) => U | Promise<U>) | null, onRejected?: ((error: FirebaseStorageError_2) => U | Promise<U>) | null): Promise<U>;
    /**
     * Equivalent to calling `then(null, onRejected)`.
     */
    catch<T>(onRejected: (p1: FirebaseStorageError_2) => T | Promise<T>): Promise<T>;
    /**
     * Adds the given observer.
     */
    private _addObserver;
    /**
     * Removes the given observer.
     */
    private _removeObserver;
    private _notifyObservers;
    private _finishPromise;
    private _notifyObserver;
    /**
     * Resumes a paused task. Has no effect on a currently running or failed task.
     * @returns True if the operation took effect, false if ignored.
     */
    resume(): boolean;
    /**
     * Pauses a currently running task. Has no effect on a paused or failed task.
     * @returns True if the operation took effect, false if ignored.
     */
    pause(): boolean;
    /**
     * Cancels a currently running or paused task. Has no effect on a complete or
     * failed task.
     * @returns True if the operation took effect, false if ignored.
     */
    cancel(): boolean;
}

/**
 * Holds data about the current state of the upload task.
 * @public
 */
export declare interface UploadTaskSnapshot {
    /**
     * The number of bytes that have been successfully uploaded so far.
     */
    bytesTransferred: number;
    /**
     * Before the upload completes, contains the metadata sent to the server.
     * After the upload completes, contains the metadata sent back from the server.
     */
    metadata: FullMetadata;
    /**
     * The reference that spawned this snapshot's upload task.
     */
    ref: StorageReference;
    /**
     * The current state of the task.
     */
    state: TaskState;
    /**
     * The task of which this is a snapshot.
     */
    task: UploadTask;
    /**
     * The total number of bytes to be uploaded.
     */
    totalBytes: number;
}

/**
 * Holds data about the current state of the upload task.
 * @public
 */
declare interface UploadTaskSnapshot_2 {
    /**
     * The number of bytes that have been successfully uploaded so far.
     */
    readonly bytesTransferred: number;
    /**
     * The total number of bytes to be uploaded.
     */
    readonly totalBytes: number;
    /**
     * The current state of the task.
     */
    readonly state: TaskState_2;
    /**
     * Before the upload completes, contains the metadata sent to the server.
     * After the upload completes, contains the metadata sent back from the server.
     */
    readonly metadata: Metadata;
    /**
     * The task of which this is a snapshot.
     */
    readonly task: _UploadTask;
    /**
     * The reference that spawned this snapshot's upload task.
     */
    readonly ref: _Reference;
}

/**
 * Type for url params stored in RequestInfo.
 */
declare interface UrlParams {
    [name: string]: string | number;
}

/**
 * Modify this `StorageService` instance to communicate with the Cloud Storage emulator.
 *
 * @param storage - The `StorageService` instance
 * @param host - The emulator host (ex: localhost)
 * @param port - The emulator port (ex: 5001)
 * @public
 */
export declare function useStorageEmulator(storage: StorageService, host: string, port: number): void;

export { }

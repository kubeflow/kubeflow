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
 * Deletes the object at this location.
 * @public
 * @param ref - StorageReference for object to delete.
 * @returns A promise that resolves if the deletion succeeds.
 */
export declare function deleteObject(ref: StorageReference): Promise<void>;
/* Excluded from this release type: _FbsBlob */
/**
 * An error returned by the Firebase Storage SDK.
 * @public
 */
export declare interface FirebaseStorageError {
    /**
     * A server response message for the error, if applicable.
     */
    serverResponse: string | null;
    code: string;
    customData?: Record<string, unknown>;
    name: 'FirebaseError';
    message: string;
    stack?: string;
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
/* Excluded from this release type: _getChild */
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
 * A stream observer for Firebase Storage.
 * @public
 */
export declare interface StorageObserver<T> {
    next?: NextFn<T> | null;
    error?: (error: FirebaseStorageError) => void | null;
    complete?: CompleteFn | null;
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
export declare interface StorageService {
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
 * An event that is triggered on a task.
 * @public
 */
export declare type TaskEvent = 'state_changed';
/**
 * Represents the current state of a running upload.
 * @public
 */
export declare type TaskState = 'running' | 'paused' | 'success' | 'canceled' | 'error';
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
/* Excluded from this release type: _UploadTask */
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
 * Modify this `StorageService` instance to communicate with the Cloud Storage emulator.
 *
 * @param storage - The `StorageService` instance
 * @param host - The emulator host (ex: localhost)
 * @param port - The emulator port (ex: 5001)
 * @public
 */
export declare function useStorageEmulator(storage: StorageService, host: string, port: number): void;
export {};

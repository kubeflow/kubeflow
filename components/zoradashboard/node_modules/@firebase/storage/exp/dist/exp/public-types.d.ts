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
import { FirebaseApp, _FirebaseService } from "@firebase/app";
import { CompleteFn, FirebaseError, NextFn, Subscribe, Unsubscribe } from '@firebase/util';
/**
 * A Firebase Storage instance.
 * @public
 */
export interface StorageService extends _FirebaseService {
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
 * Represents a reference to a Google Cloud Storage object. Developers can
 * upload, download, and delete objects, as well as get/set object metadata.
 * @public
 */
export interface StorageReference {
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
 * The options `list()` accepts.
 * @public
 */
export interface ListOptions {
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
export interface ListResult {
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
 * Object metadata that can be set at any time.
 * @public
 */
export interface SettableMetadata {
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
 * Object metadata that can be set at upload.
 * @public
 */
export interface UploadMetadata extends SettableMetadata {
    /**
     * A Base64-encoded MD5 hash of the object being uploaded.
     */
    md5Hash?: string | undefined;
}
/**
 * The full set of object metadata, including read-only properties.
 * @public
 */
export interface FullMetadata extends UploadMetadata {
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
 * An error returned by the Firebase Storage SDK.
 * @public
 */
export interface FirebaseStorageError extends FirebaseError {
    /**
     * A server response message for the error, if applicable.
     */
    serverResponse: string | null;
}
/**
 * A stream observer for Firebase Storage.
 * @public
 */
export interface StorageObserver<T> {
    next?: NextFn<T> | null;
    error?: (error: FirebaseStorageError) => void | null;
    complete?: CompleteFn | null;
}
/**
 * Represents the process of uploading an object. Allows you to monitor and
 * manage the upload.
 * @public
 */
export interface UploadTask {
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
 * Holds data about the current state of the upload task.
 * @public
 */
export interface UploadTaskSnapshot {
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
 * Result returned from a non-resumable upload.
 * @public
 */
export interface UploadResult {
    /**
     * Contains the metadata sent back from the server.
     */
    readonly metadata: FullMetadata;
    /**
     * The reference that spawned this upload.
     */
    readonly ref: StorageReference;
}
declare module '@firebase/component' {
    interface NameServiceMapping {
        'storage-exp': StorageService;
    }
}

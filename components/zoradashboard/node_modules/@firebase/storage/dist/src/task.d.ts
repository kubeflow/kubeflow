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
 * @fileoverview Defines types for interacting with blob transfer tasks.
 */
import { FbsBlob } from './implementation/blob';
import { FirebaseStorageError } from './implementation/error';
import { InternalTaskState, TaskEvent } from './implementation/taskenums';
import { Metadata } from './metadata';
import { CompleteFn, ErrorFn, StorageObserver, Subscribe, Unsubscribe } from './implementation/observer';
import { UploadTaskSnapshot } from './tasksnapshot';
import { Reference } from './reference';
/**
 * Represents a blob being uploaded. Can be used to pause/resume/cancel the
 * upload and manage callbacks for various events.
 * @internal
 */
export declare class UploadTask {
    private _ref;
    /**
     * The data to be uploaded.
     */
    _blob: FbsBlob;
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
    constructor(ref: Reference, blob: FbsBlob, metadata?: Metadata | null);
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
    get snapshot(): UploadTaskSnapshot;
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
    on(type: TaskEvent, nextOrObserver?: StorageObserver<UploadTaskSnapshot> | ((a: UploadTaskSnapshot) => unknown), error?: ErrorFn, completed?: CompleteFn): Unsubscribe | Subscribe<UploadTaskSnapshot>;
    /**
     * This object behaves like a Promise, and resolves with its snapshot data
     * when the upload completes.
     * @param onFulfilled - The fulfillment callback. Promise chaining works as normal.
     * @param onRejected - The rejection callback.
     */
    then<U>(onFulfilled?: ((value: UploadTaskSnapshot) => U | Promise<U>) | null, onRejected?: ((error: FirebaseStorageError) => U | Promise<U>) | null): Promise<U>;
    /**
     * Equivalent to calling `then(null, onRejected)`.
     */
    catch<T>(onRejected: (p1: FirebaseStorageError) => T | Promise<T>): Promise<T>;
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

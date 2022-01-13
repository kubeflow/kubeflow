/**
 * @license
 * Copyright 2020 Google LLC
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
import { UploadTask, FirebaseStorageError, TaskEvent, StorageObserver } from "@firebase/storage";
import { UploadTaskSnapshotCompat } from './tasksnapshot';
import { ReferenceCompat } from './reference';
import * as types from '@firebase/storage-types';
import { Compat } from '@firebase/util';
export declare class UploadTaskCompat implements types.UploadTask, Compat<UploadTask> {
    readonly _delegate: UploadTask;
    private readonly _ref;
    constructor(_delegate: UploadTask, _ref: ReferenceCompat);
    get snapshot(): UploadTaskSnapshotCompat;
    cancel: () => boolean;
    catch: (onRejected: (error: FirebaseStorageError) => unknown) => Promise<unknown>;
    pause: () => boolean;
    resume: () => boolean;
    then(onFulfilled?: ((a: UploadTaskSnapshotCompat) => unknown) | null, onRejected?: ((a: FirebaseStorageError) => unknown) | null): Promise<unknown>;
    on(type: TaskEvent, nextOrObserver?: types.StorageObserver<UploadTaskSnapshotCompat> | null | ((a: UploadTaskSnapshotCompat) => unknown), error?: (error: FirebaseStorageError) => void | null, completed?: () => void | null): Unsubscribe | Subscribe<UploadTaskSnapshotCompat>;
}
/**
 * Subscribes to an event stream.
 */
export declare type Subscribe<T> = (next?: NextFn<T> | StorageObserver<T>, error?: ErrorFn, complete?: CompleteFn) => Unsubscribe;
/**
 * Unsubscribes from a stream.
 */
export declare type Unsubscribe = () => void;
/**
 * Function that is called once for each value in a stream of values.
 */
export declare type NextFn<T> = (value: T) => void;
/**
 * A function that is called with a `FirebaseStorageError`
 * if the event stream ends due to an error.
 */
export declare type ErrorFn = (error: FirebaseStorageError) => void;
/**
 * A function that is called if the event stream ends normally.
 */
export declare type CompleteFn = () => void;

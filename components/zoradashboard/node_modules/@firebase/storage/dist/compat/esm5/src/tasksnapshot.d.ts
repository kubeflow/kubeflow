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
import { TaskState } from './implementation/taskenums';
import { Metadata } from './metadata';
import { Reference } from './reference';
import { UploadTask } from './task';
/**
 * Result returned from a non-resumable upload.
 * @public
 */
export interface UploadResult {
    /**
     * Contains the metadata sent back from the server.
     */
    readonly metadata: Metadata;
    /**
     * The reference that spawned this upload.
     */
    readonly ref: Reference;
}
/**
 * Holds data about the current state of the upload task.
 * @public
 */
export interface UploadTaskSnapshot {
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
    readonly state: TaskState;
    /**
     * Before the upload completes, contains the metadata sent to the server.
     * After the upload completes, contains the metadata sent back from the server.
     */
    readonly metadata: Metadata;
    /**
     * The task of which this is a snapshot.
     */
    readonly task: UploadTask;
    /**
     * The reference that spawned this snapshot's upload task.
     */
    readonly ref: Reference;
}

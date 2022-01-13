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
import { _FirebaseNamespace } from '@firebase/app-types/private';
import * as types from '@firebase/storage-types';
export declare function registerStorage(instance: _FirebaseNamespace): void;
/**
 * Define extension behavior for `registerStorage`
 */
declare module '@firebase/app-compat' {
    interface FirebaseNamespace {
        storage?: {
            (app?: FirebaseApp, url?: string): types.FirebaseStorage;
            Storage: typeof types.FirebaseStorage;
            StringFormat: {
                BASE64: types.StringFormat;
                BASE64URL: types.StringFormat;
                DATA_URL: types.StringFormat;
                RAW: types.StringFormat;
            };
            TaskEvent: {
                STATE_CHANGED: types.TaskEvent;
            };
            TaskState: {
                CANCELED: types.TaskState;
                ERROR: types.TaskState;
                PAUSED: types.TaskState;
                RUNNING: types.TaskState;
                SUCCESS: types.TaskState;
            };
        };
    }
    interface FirebaseApp {
        storage?(storageBucket?: string): types.FirebaseStorage;
    }
}

import { FirebaseApp as FirebaseAppCompat } from "@firebase/app-compat";
import { FullMetadata, StorageService, ListOptions, ListResult, StorageReference, SettableMetadata, UploadMetadata, UploadResult, UploadTask } from "@firebase/storage";
declare module "@firebase/storage" {
    function deleteObject(ref: types.Reference): Promise<void>;
    function getDownloadURL(ref: types.Reference): Promise<string>;
    function getMetadata(ref: types.Reference): Promise<FullMetadata>;
    function getStorage(app?: FirebaseAppCompat, bucketUrl?: string): StorageService;
    function list(ref: types.Reference, options?: ListOptions): Promise<ListResult>;
    function listAll(ref: types.Reference): Promise<ListResult>;
    function ref(storage: types.FirebaseStorage, url?: string): StorageReference;
    function updateMetadata(ref: types.Reference, metadata: SettableMetadata): Promise<FullMetadata>;
    function uploadBytes(ref: types.Reference, data: Blob | Uint8Array | ArrayBuffer, metadata?: UploadMetadata): Promise<UploadResult>;
    function uploadBytesResumable(ref: types.Reference, data: Blob | Uint8Array | ArrayBuffer, metadata?: UploadMetadata): UploadTask;
    function uploadString(ref: types.Reference, value: string, format?: string, metadata?: UploadMetadata): Promise<UploadResult>;
    function useStorageEmulator(storage: types.FirebaseStorage, host: string, port: number): void;
}

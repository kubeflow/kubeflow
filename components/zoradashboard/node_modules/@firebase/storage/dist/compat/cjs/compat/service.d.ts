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
import * as types from '@firebase/storage-types';
import { FirebaseApp } from '@firebase/app-types';
import { StorageService } from '../src/service';
import { Compat } from '@firebase/util';
/**
 * A service that provides firebaseStorage.Reference instances.
 * @param opt_url gs:// url to a custom Storage Bucket
 */
export declare class StorageServiceCompat implements types.FirebaseStorage, Compat<StorageService> {
    app: FirebaseApp;
    readonly _delegate: StorageService;
    constructor(app: FirebaseApp, _delegate: StorageService);
    INTERNAL: {
        /**
         * Called when the associated app is deleted.
         */
        delete: () => Promise<void>;
    };
    get maxOperationRetryTime(): number;
    get maxUploadRetryTime(): number;
    /**
     * Returns a firebaseStorage.Reference for the given path in the default
     * bucket.
     */
    ref(path?: string): types.Reference;
    /**
     * Returns a firebaseStorage.Reference object for the given absolute URL,
     * which must be a gs:// or http[s]:// URL.
     */
    refFromURL(url: string): types.Reference;
    setMaxUploadRetryTime(time: number): void;
    setMaxOperationRetryTime(time: number): void;
    useEmulator(host: string, port: number): void;
}

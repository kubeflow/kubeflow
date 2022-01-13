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

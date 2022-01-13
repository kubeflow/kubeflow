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
import { FirebaseNamespace } from '@firebase/app-types';
import * as types from '@firebase/database-types';
import { Database } from './src/api/Database';
import { Query, Reference } from './src/api/Reference';
import { enableLogging } from './src/core/util/util';
declare const ServerValue: {
    TIMESTAMP: object;
    increment: (delta: number) => object;
};
export declare function registerDatabase(instance: FirebaseNamespace): void;
export { Database, Query, Reference, enableLogging, ServerValue };
export { DataSnapshot } from './src/api/Reference';
export { OnDisconnect } from './src/api/onDisconnect';
declare module '@firebase/app-types' {
    interface FirebaseNamespace {
        database?: {
            (app?: FirebaseApp): types.FirebaseDatabase;
            enableLogging: typeof types.enableLogging;
            ServerValue: types.ServerValue;
            Database: typeof types.FirebaseDatabase;
        };
    }
    interface FirebaseApp {
        database?(databaseURL?: string): types.FirebaseDatabase;
    }
}

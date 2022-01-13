/**
 * @license
 * Copyright 2021 Google LLC
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
import { FirebaseApp, FirebaseNamespace } from '@firebase/app-types';
import * as types from '@firebase/database-types';
import { enableLogging } from "@firebase/database";
import { Database } from '../src/api/Database';
import * as INTERNAL from '../src/api/internal';
import { DataSnapshot, Query, Reference } from '../src/api/Reference';
import * as TEST_ACCESS from '../src/api/test_access';
declare const ServerValue: {
    TIMESTAMP: object;
    increment: (delta: number) => object;
};
/**
 * A one off register function which returns a database based on the app and
 * passed database URL. (Used by the Admin SDK)
 *
 * @param app - A valid FirebaseApp-like object
 * @param url - A valid Firebase databaseURL
 * @param version - custom version e.g. firebase-admin version
 * @param nodeAdmin - true if the SDK is being initialized from Firebase Admin.
 */
export declare function initStandalone(app: FirebaseApp, url: string, version: string, nodeAdmin?: boolean): {
    instance: types.Database;
    namespace: {
        Reference: typeof Reference;
        Query: typeof Query;
        Database: typeof Database;
        DataSnapshot: typeof DataSnapshot;
        enableLogging: typeof enableLogging;
        INTERNAL: typeof INTERNAL;
        ServerValue: {
            TIMESTAMP: object;
            increment: (delta: number) => object;
        };
        TEST_ACCESS: typeof TEST_ACCESS;
    };
};
export declare function registerDatabase(instance: FirebaseNamespace): void;
export { Database, Query, Reference, enableLogging, ServerValue };
export { OnDisconnect } from '../src/api/onDisconnect';
declare module '@firebase/app-compat' {
    interface FirebaseNamespace {
        database?: {
            (app?: FirebaseApp): types.FirebaseDatabase;
            enableLogging: typeof types.enableLogging;
            ServerValue: types.ServerValue;
            Database: typeof types.FirebaseDatabase;
        };
    }
    interface FirebaseApp {
        database?(): types.FirebaseDatabase;
    }
}
export { DataSnapshot } from '../src/api/Reference';

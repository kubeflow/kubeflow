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
import { FirebaseApp } from '@firebase/app-types';
import { FirebaseAuthInternal } from '@firebase/auth-interop-types';
import * as types from '@firebase/database-types';
import { Reference } from './Reference';
/**
 * INTERNAL methods for internal-use only (tests, etc.).
 *
 * Customers shouldn't use these or else should be aware that they could break at any time.
 */
export declare const forceLongPolling: () => void;
export declare const forceWebSockets: () => void;
export declare const isWebSocketsAvailable: () => boolean;
export declare const setSecurityDebugCallback: (ref: Reference, callback: (a: object) => void) => void;
export declare const stats: (ref: Reference, showDelta?: boolean) => void;
export declare const statsIncrementCounter: (ref: Reference, metric: string) => void;
export declare const dataUpdateCount: (ref: Reference) => number;
export declare const interceptServerData: (ref: Reference, callback: (a: string, b: unknown) => void) => void;
/**
 * Used by console to create a database based on the app,
 * passed database URL and a custom auth implementation.
 *
 * @param app - A valid FirebaseApp-like object
 * @param url - A valid Firebase databaseURL
 * @param version - custom version e.g. firebase-admin version
 * @param customAuthImpl - custom auth implementation
 */
export declare function initStandalone<T>({ app, url, version, customAuthImpl, namespace, nodeAdmin }: {
    app: FirebaseApp;
    url: string;
    version: string;
    customAuthImpl: FirebaseAuthInternal;
    namespace: T;
    nodeAdmin?: boolean;
}): {
    instance: types.Database;
    namespace: T;
};

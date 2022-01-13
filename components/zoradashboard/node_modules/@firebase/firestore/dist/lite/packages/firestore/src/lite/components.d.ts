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
import { _FirebaseService } from '@firebase/app-exp';
import { CredentialsProvider } from '../api/credentials';
import { DatabaseId, DatabaseInfo } from '../core/database_info';
import { Datastore } from '../remote/datastore';
import { FirestoreSettings } from './settings';
export declare const LOG_TAG = "ComponentProvider";
/**
 * An interface implemented by FirebaseFirestore that provides compatibility
 * with the usage in this file.
 *
 * This interface mainly exists to remove a cyclic dependency.
 */
export interface FirestoreService extends _FirebaseService {
    _credentials: CredentialsProvider;
    _persistenceKey: string;
    _databaseId: DatabaseId;
    _terminated: boolean;
    _freezeSettings(): FirestoreSettings;
}
/**
 * Returns an initialized and started Datastore for the given Firestore
 * instance. Callers must invoke removeComponents() when the Firestore
 * instance is terminated.
 */
export declare function getDatastore(firestore: FirestoreService): Datastore;
/**
 * Removes all components associated with the provided instance. Must be called
 * when the `Firestore` instance is terminated.
 */
export declare function removeComponents(firestore: FirestoreService): void;
export declare function makeDatabaseInfo(databaseId: DatabaseId, appId: string, persistenceKey: string, settings: FirestoreSettings): DatabaseInfo;

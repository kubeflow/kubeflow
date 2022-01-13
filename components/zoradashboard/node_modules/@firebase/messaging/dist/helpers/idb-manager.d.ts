/**
 * @license
 * Copyright 2019 Google LLC
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
import { FirebaseInternalDependencies } from '../interfaces/internal-dependencies';
import { TokenDetails } from '../interfaces/token-details';
export declare const DATABASE_NAME = "firebase-messaging-database";
/** Gets record(s) from the objectStore that match the given key. */
export declare function dbGet(firebaseDependencies: FirebaseInternalDependencies): Promise<TokenDetails | undefined>;
/** Assigns or overwrites the record for the given key with the given value. */
export declare function dbSet(firebaseDependencies: FirebaseInternalDependencies, tokenDetails: TokenDetails): Promise<TokenDetails>;
/** Removes record(s) from the objectStore that match the given key. */
export declare function dbRemove(firebaseDependencies: FirebaseInternalDependencies): Promise<void>;
/** Deletes the DB. Useful for tests. */
export declare function dbDelete(): Promise<void>;

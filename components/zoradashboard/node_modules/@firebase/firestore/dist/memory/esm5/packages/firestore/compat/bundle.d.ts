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
import { LoadBundleTask } from '../exp/index';
import { Firestore, Query } from '../src/api/database';
export declare function loadBundle(this: Firestore, data: ArrayBuffer | ReadableStream<Uint8Array> | string): LoadBundleTask;
export declare function namedQuery(this: Firestore, queryName: string): Promise<Query | null>;
/**
 * Prototype patches bundle loading to Firestore.
 */
export declare function registerBundle(instance: typeof Firestore): void;

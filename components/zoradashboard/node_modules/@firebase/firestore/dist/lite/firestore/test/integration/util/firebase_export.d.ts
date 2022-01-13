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
import * as firestore from '@firebase/firestore-types';
import { Blob } from '../../../src/api/blob';
import { Firestore, DocumentReference, QueryDocumentSnapshot } from '../../../src/api/database';
import { FieldPath } from '../../../src/api/field_path';
import { FieldValue } from '../../../src/api/field_value';
import { GeoPoint } from '../../../src/api/geo_point';
import { Timestamp } from '../../../src/api/timestamp';
import '../../../index.bundle';
/**
 * Creates a new test instance of Firestore using either firebase.firestore()
 * or `initializeFirestore` from the modular API.
 */
export declare function newTestFirestore(projectId: string, nameOrApp?: string | FirebaseApp, settings?: firestore.Settings): firestore.FirebaseFirestore;
export { Firestore, FieldValue, FieldPath, Timestamp, Blob, GeoPoint, DocumentReference, QueryDocumentSnapshot };

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
import { FirebaseApp } from '@firebase/app-compat';
import { FirebaseNamespace } from '@firebase/app-types';
import { FirebaseFirestore } from '../exp/index';
import { Firestore } from '../src/api/database';
declare module '@firebase/component' {
    interface NameServiceMapping {
        'firestore-compat': Firestore;
    }
}
/**
 * Configures Firestore as part of the Firebase SDK by calling registerComponent.
 *
 * @param firebase - The FirebaseNamespace to register Firestore with
 * @param firestoreFactory - A factory function that returns a new Firestore
 *    instance.
 */
export declare function configureForFirebase(firebase: FirebaseNamespace, firestoreFactory: (app: FirebaseApp, firestoreExp: FirebaseFirestore) => Firestore): void;

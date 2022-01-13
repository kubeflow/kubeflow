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
import { FirebaseNamespace } from '@firebase/app-types';
import * as types from '@firebase/firestore-types';
import '../register-module';
/**
 * Registers the main Firestore build with the components framework.
 * Persistence can be enabled via `firebase.firestore().enablePersistence()`.
 */
export declare function registerFirestore(instance: FirebaseNamespace): void;
declare module '@firebase/app-compat' {
    interface FirebaseNamespace {
        firestore: {
            (app?: FirebaseApp): types.FirebaseFirestore;
            Blob: typeof types.Blob;
            CollectionReference: typeof types.CollectionReference;
            DocumentReference: typeof types.DocumentReference;
            DocumentSnapshot: typeof types.DocumentSnapshot;
            FieldPath: typeof types.FieldPath;
            FieldValue: typeof types.FieldValue;
            Firestore: typeof types.FirebaseFirestore;
            GeoPoint: typeof types.GeoPoint;
            Query: typeof types.Query;
            QueryDocumentSnapshot: typeof types.QueryDocumentSnapshot;
            QuerySnapshot: typeof types.QuerySnapshot;
            Timestamp: typeof types.Timestamp;
            Transaction: typeof types.Transaction;
            WriteBatch: typeof types.WriteBatch;
            setLogLevel: typeof types.setLogLevel;
        };
    }
    interface FirebaseApp {
        firestore?(): types.FirebaseFirestore;
    }
}

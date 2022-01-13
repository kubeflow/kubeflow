import firebase from '@firebase/app';
import { U as Ua, C as Cu, M, a as Ma, j as ja, W as Wa, z as za, X as Xa, t as th, Z as Za, n as nh, s as sh, r as rh, o as oh, Q as Qa, E as Eu, T as Tu, B as Ba } from './prebuilt-2b285dd7.js';
import { Component } from '@firebase/component';
import '@firebase/util';
import '@firebase/logger';
import '@firebase/webchannel-wrapper';

const name = "@firebase/firestore";
const version = "2.3.9";

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
const firestoreNamespace = {
    Firestore: Ua,
    GeoPoint: Cu,
    Timestamp: M,
    Blob: Ma,
    Transaction: ja,
    WriteBatch: Wa,
    DocumentReference: za,
    DocumentSnapshot: Xa,
    Query: th,
    QueryDocumentSnapshot: Za,
    QuerySnapshot: nh,
    CollectionReference: sh,
    FieldPath: rh,
    FieldValue: oh,
    setLogLevel: Qa,
    CACHE_SIZE_UNLIMITED: Eu
};
/**
 * Configures Firestore as part of the Firebase SDK by calling registerService.
 *
 * @param firebase - The FirebaseNamespace to register Firestore with
 * @param firestoreFactory - A factory function that returns a new Firestore
 *    instance.
 */
function configureForFirebase(firebase, firestoreFactory) {
    firebase.INTERNAL.registerComponent(new Component('firestore', container => {
        const app = container.getProvider('app').getImmediate();
        return firestoreFactory(app, container.getProvider('auth-internal'));
    }, "PUBLIC" /* PUBLIC */).setServiceProps(Object.assign({}, firestoreNamespace)));
}

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
/**
 * Registers the memory-only Firestore build with the components framework.
 */
function registerFirestore(instance) {
    configureForFirebase(instance, (app, auth) => new Ua(app, new Tu(app, auth), new Ba()));
    instance.registerVersion(name, version);
}
registerFirestore(firebase);

export { registerFirestore };
//# sourceMappingURL=index.js.map

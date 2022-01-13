import firebase from '@firebase/app';
import { K as Ka, x as xu, L, a as La, W as Wa, G as Ga, H as Ha, Z as Za, e as eh, t as th, s as sh, i as ih, o as oh, c as ch, j as ja, I as Iu, A as Au, U as Ua } from './prebuilt.rn-80812a65.js';
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
    Firestore: Ka,
    GeoPoint: xu,
    Timestamp: L,
    Blob: La,
    Transaction: Wa,
    WriteBatch: Ga,
    DocumentReference: Ha,
    DocumentSnapshot: Za,
    Query: eh,
    QueryDocumentSnapshot: th,
    QuerySnapshot: sh,
    CollectionReference: ih,
    FieldPath: oh,
    FieldValue: ch,
    setLogLevel: ja,
    CACHE_SIZE_UNLIMITED: Iu
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
/**
 * Registers the main Firestore build with the components framework.
 * Persistence can be enabled via `firebase.firestore().enablePersistence()`.
 */
function registerFirestore(instance) {
    configureForFirebase(instance, (app, auth) => new Ka(app, new Au(app, auth), new Ua()));
    instance.registerVersion(name, version);
}
registerFirestore(firebase);

export { registerFirestore };
//# sourceMappingURL=index.js.map

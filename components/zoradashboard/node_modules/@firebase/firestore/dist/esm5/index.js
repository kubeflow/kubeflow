import e from "@firebase/app";

import { U as r, T as t, q as a, C as s, M as o, a as i, j as n, W as p, z as m, X as f, t as c, Z as u, n as b, s as l, r as g, o as h, Q as v, E as w } from "./prebuilt-e10b3b00-01f089b3.js";

import { Component as C } from "@firebase/component";

import "tslib";

import "@firebase/util";

import "@firebase/logger";

import "@firebase/webchannel-wrapper";

var I = {
    Firestore: r,
    GeoPoint: s,
    Timestamp: o,
    Blob: i,
    Transaction: n,
    WriteBatch: p,
    DocumentReference: m,
    DocumentSnapshot: f,
    Query: c,
    QueryDocumentSnapshot: u,
    QuerySnapshot: b,
    CollectionReference: l,
    FieldPath: g,
    FieldValue: h,
    setLogLevel: v,
    CACHE_SIZE_UNLIMITED: w
};

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
function P(e) {
    !
    /**
 * Configures Firestore as part of the Firebase SDK by calling registerService.
 *
 * @param firebase - The FirebaseNamespace to register Firestore with
 * @param firestoreFactory - A factory function that returns a new Firestore
 *    instance.
 */
    function(e, r) {
        e.INTERNAL.registerComponent(new C("firestore", (function(e) {
            var t = e.getProvider("app").getImmediate();
            return r(t, e.getProvider("auth-internal"));
        }), "PUBLIC" /* PUBLIC */).setServiceProps(Object.assign({}, I)));
    }(e, (function(e, s) {
        return new r(e, new t(e, s), new a);
    })), e.registerVersion("@firebase/firestore", "2.3.9");
}

P(e);

export { P as registerFirestore };
//# sourceMappingURL=index.js.map

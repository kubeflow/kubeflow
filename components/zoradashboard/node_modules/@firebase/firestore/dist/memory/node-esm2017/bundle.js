import { l as loadBundle$1, n as namedQuery$1, Q as Query, c as Firestore } from './database-7224c831.js';
import '@firebase/util';
import '@firebase/logger';
import 'util';
import 'crypto';
import '@grpc/grpc-js';
import '@grpc/grpc-js/package.json';
import 'path';
import '@grpc/proto-loader';

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
function loadBundle(data) {
    return loadBundle$1(this._delegate, data);
}
function namedQuery(queryName) {
    return namedQuery$1(this._delegate, queryName).then(expQuery => {
        if (!expQuery) {
            return null;
        }
        return new Query(this, 
        // We can pass `expQuery` here directly since named queries don't have a UserDataConverter.
        // Otherwise, we would have to create a new ExpQuery and pass the old UserDataConverter.
        expQuery);
    });
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
 * Prototype patches bundle loading to Firestore.
 */
function registerBundle(instance) {
    instance.prototype.loadBundle = loadBundle;
    instance.prototype.namedQuery = namedQuery;
}
registerBundle(Firestore);

export { registerBundle };
//# sourceMappingURL=bundle.js.map

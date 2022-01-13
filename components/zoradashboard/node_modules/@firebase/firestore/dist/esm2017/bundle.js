import { c as ch, u as uh, U as Ua } from './prebuilt-e10b3b00.js';
import '@firebase/util';
import '@firebase/logger';
import '@firebase/webchannel-wrapper';

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
    instance.prototype.loadBundle = ch;
    instance.prototype.namedQuery = uh;
}
registerBundle(Ua);

export { registerBundle };
//# sourceMappingURL=bundle.js.map

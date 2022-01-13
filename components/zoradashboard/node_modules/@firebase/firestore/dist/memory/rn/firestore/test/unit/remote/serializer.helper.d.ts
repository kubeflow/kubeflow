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
import * as api from '../../../src/protos/firestore_proto_api';
/**
 * Runs the serializer test with an optional ProtobufJS verification step
 * (only provided in Node).
 *
 * These tests are initialized in 'serializer.browser.test.ts' and
 * 'serializer.node.test.ts'.
 */
export declare function serializerTest(protobufJsVerifier?: (jsonValue: api.Value) => void): void;

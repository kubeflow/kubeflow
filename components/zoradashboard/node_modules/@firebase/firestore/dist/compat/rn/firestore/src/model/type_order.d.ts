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
 * All the different kinds of values that can be stored in fields in
 * a document. The types of the same comparison order should be defined
 * together as a group. The order of each group is defined by the Firestore
 * backend and is available at:
 *     https://firebase.google.com/docs/firestore/manage-data/data-types
 */
export declare const enum TypeOrder {
    NullValue = 0,
    BooleanValue = 1,
    NumberValue = 2,
    TimestampValue = 3,
    ServerTimestampValue = 4,
    StringValue = 5,
    BlobValue = 6,
    RefValue = 7,
    GeoPointValue = 8,
    ArrayValue = 9,
    ObjectValue = 10
}

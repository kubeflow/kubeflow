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
import { SpecBuilder } from './spec_builder';
export declare const MULTI_CLIENT_TAG = "multi-client";
/**
 * If you call this function before your describeSpec, then the spec test will
 * be written using the given function instead of running as a normal test.
 */
export declare function setSpecJSONHandler(writer: (json: string) => void): void;
/**
 * Like it(), but for spec tests.
 * @param name - A name to give the test.
 * @param tags - Tags to apply to the test (e.g. 'exclusive' to only run
 *             individual tests)
 * @param builder - A function that returns a spec.
 * If writeToJSONFile has been called, the spec will be stored in
 * `specsInThisTest`. Otherwise, it will be run, just as it() would run it.
 */
export declare function specTest(name: string, tags: string[], builder: () => SpecBuilder): void;
export declare function specTest(name: string, tags: string[], comment: string, builder: () => SpecBuilder): void;
/**
 * Like describe, but for spec tests.
 * @param name - A name to give the test.
 * @param tags - Tags to apply to all tests in the spec (e.g. 'exclusive' to
 *             only run individual tests)
 * @param builder - A function that calls specTest for each test case.
 * If writeToJSONFile has been called, the specs will be stored in
 * that file. Otherwise, they will be run, just as describe would run.
 */
export declare function describeSpec(name: string, tags: string[], builder: () => void): void;

/**
 * @license
 * Copyright 2019 Google LLC
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
import { AppConfig } from '../interfaces/app-config';
import { InstallationEntry } from '../interfaces/installation-entry';
/** Gets record(s) from the objectStore that match the given key. */
export declare function get(appConfig: AppConfig): Promise<InstallationEntry | undefined>;
/** Assigns or overwrites the record for the given key with the given value. */
export declare function set<ValueType extends InstallationEntry>(appConfig: AppConfig, value: ValueType): Promise<ValueType>;
/** Removes record(s) from the objectStore that match the given key. */
export declare function remove(appConfig: AppConfig): Promise<void>;
/**
 * Atomically updates a record with the result of updateFn, which gets
 * called with the current value. If newValue is undefined, the record is
 * deleted instead.
 * @return Updated value
 */
export declare function update<ValueType extends InstallationEntry | undefined>(appConfig: AppConfig, updateFn: (previousValue: InstallationEntry | undefined) => ValueType): Promise<ValueType>;
export declare function clear(): Promise<void>;

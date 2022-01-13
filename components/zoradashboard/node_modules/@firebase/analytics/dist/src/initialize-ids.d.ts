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
import { DynamicConfig, Gtag, MinimalDynamicConfig } from '@firebase/analytics-types';
import { FirebaseInstallations } from '@firebase/installations-types';
import { FirebaseApp } from '@firebase/app-types';
/**
 * Initialize the analytics instance in gtag.js by calling config command with fid.
 *
 * NOTE: We combine analytics initialization and setting fid together because we want fid to be
 * part of the `page_view` event that's sent during the initialization
 * @param app Firebase app
 * @param gtagCore The gtag function that's not wrapped.
 * @param dynamicConfigPromisesList Array of all dynamic config promises.
 * @param measurementIdToAppId Maps measurementID to appID.
 * @param installations FirebaseInstallations instance.
 *
 * @returns Measurement ID.
 */
export declare function initializeIds(app: FirebaseApp, dynamicConfigPromisesList: Array<Promise<DynamicConfig | MinimalDynamicConfig>>, measurementIdToAppId: {
    [key: string]: string;
}, installations: FirebaseInstallations, gtagCore: Gtag, dataLayerName: string): Promise<string>;

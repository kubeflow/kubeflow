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
import { FirebaseAnalytics, SettingsOptions, DynamicConfig, MinimalDynamicConfig } from '@firebase/analytics-types';
import { FirebaseApp } from '@firebase/app-types';
import { FirebaseInstallations } from '@firebase/installations-types';
/**
 * For testing
 */
export declare function resetGlobalVars(newGlobalInitDone?: boolean, newInitializationPromisesMap?: {}, newDynamicPromises?: never[]): void;
/**
 * For testing
 */
export declare function getGlobalVars(): {
    initializationPromisesMap: {
        [appId: string]: Promise<string>;
    };
    dynamicConfigPromisesList: Array<Promise<DynamicConfig | MinimalDynamicConfig>>;
};
/**
 * This must be run before calling firebase.analytics() or it won't
 * have any effect.
 * @param options Custom gtag and dataLayer names.
 */
export declare function settings(options: SettingsOptions): void;
export declare function factory(app: FirebaseApp, installations: FirebaseInstallations): FirebaseAnalytics;

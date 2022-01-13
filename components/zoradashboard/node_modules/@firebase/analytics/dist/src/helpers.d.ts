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
import { DynamicConfig, DataLayer, Gtag, MinimalDynamicConfig } from '@firebase/analytics-types';
/**
 * Inserts gtag script tag into the page to asynchronously download gtag.
 * @param dataLayerName Name of datalayer (most often the default, "_dataLayer").
 */
export declare function insertScriptTag(dataLayerName: string, measurementId: string): void;
/**
 * Get reference to, or create, global datalayer.
 * @param dataLayerName Name of datalayer (most often the default, "_dataLayer").
 */
export declare function getOrCreateDataLayer(dataLayerName: string): DataLayer;
/**
 * Creates global gtag function or wraps existing one if found.
 * This wrapped function attaches Firebase instance ID (FID) to gtag 'config' and
 * 'event' calls that belong to the GAID associated with this Firebase instance.
 *
 * @param initializationPromisesMap Map of appIds to their initialization promises.
 * @param dynamicConfigPromisesList Array of dynamic config fetch promises.
 * @param measurementIdToAppId Map of GA measurementIDs to corresponding Firebase appId.
 * @param dataLayerName Name of global GA datalayer array.
 * @param gtagFunctionName Name of global gtag function ("gtag" if not user-specified).
 */
export declare function wrapOrCreateGtag(initializationPromisesMap: {
    [appId: string]: Promise<string>;
}, dynamicConfigPromisesList: Array<Promise<DynamicConfig | MinimalDynamicConfig>>, measurementIdToAppId: {
    [measurementId: string]: string;
}, dataLayerName: string, gtagFunctionName: string): {
    gtagCore: Gtag;
    wrappedGtag: Gtag;
};
/**
 * Returns first script tag in DOM matching our gtag url pattern.
 */
export declare function findGtagScriptOnPage(): HTMLScriptElement | null;

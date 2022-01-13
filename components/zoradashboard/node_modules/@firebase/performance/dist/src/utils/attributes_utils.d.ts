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
declare const enum ServiceWorkerStatus {
    UNKNOWN = 0,
    UNSUPPORTED = 1,
    CONTROLLED = 2,
    UNCONTROLLED = 3
}
export declare enum VisibilityState {
    UNKNOWN = 0,
    VISIBLE = 1,
    HIDDEN = 2
}
declare const enum EffectiveConnectionType {
    UNKNOWN = 0,
    CONNECTION_SLOW_2G = 1,
    CONNECTION_2G = 2,
    CONNECTION_3G = 3,
    CONNECTION_4G = 4
}
export declare function getServiceWorkerStatus(): ServiceWorkerStatus;
export declare function getVisibilityState(): VisibilityState;
export declare function getEffectiveConnectionType(): EffectiveConnectionType;
export declare function isValidCustomAttributeName(name: string): boolean;
export declare function isValidCustomAttributeValue(value: string): boolean;
export {};

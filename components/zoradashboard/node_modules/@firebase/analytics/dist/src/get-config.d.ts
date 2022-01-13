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
 * @fileoverview Most logic is copied from packages/remote-config/src/client/retrying_client.ts
 */
import { FirebaseApp } from '@firebase/app-types';
import { DynamicConfig, ThrottleMetadata, MinimalDynamicConfig } from '@firebase/analytics-types';
export interface AppFields {
    appId: string;
    apiKey: string;
    measurementId?: string;
}
/**
 * Backoff factor for 503 errors, which we want to be conservative about
 * to avoid overloading servers. Each retry interval will be
 * BASE_INTERVAL_MILLIS * LONG_RETRY_FACTOR ^ retryCount, so the second one
 * will be ~30 seconds (with fuzzing).
 */
export declare const LONG_RETRY_FACTOR = 30;
/**
 * Stubbable retry data storage class.
 */
declare class RetryData {
    throttleMetadata: {
        [appId: string]: ThrottleMetadata;
    };
    intervalMillis: number;
    constructor(throttleMetadata?: {
        [appId: string]: ThrottleMetadata;
    }, intervalMillis?: number);
    getThrottleMetadata(appId: string): ThrottleMetadata;
    setThrottleMetadata(appId: string, metadata: ThrottleMetadata): void;
    deleteThrottleMetadata(appId: string): void;
}
/**
 * Fetches dynamic config from backend.
 * @param app Firebase app to fetch config for.
 */
export declare function fetchDynamicConfig(appFields: AppFields): Promise<DynamicConfig>;
/**
 * Fetches dynamic config from backend, retrying if failed.
 * @param app Firebase app to fetch config for.
 */
export declare function fetchDynamicConfigWithRetry(app: FirebaseApp, retryData?: RetryData, timeoutMillis?: number): Promise<DynamicConfig | MinimalDynamicConfig>;
/**
 * Shims a minimal AbortSignal (copied from Remote Config).
 *
 * <p>AbortController's AbortSignal conveniently decouples fetch timeout logic from other aspects
 * of networking, such as retries. Firebase doesn't use AbortController enough to justify a
 * polyfill recommendation, like we do with the Fetch API, but this minimal shim can easily be
 * swapped out if/when we do.
 */
export declare class AnalyticsAbortSignal {
    listeners: Array<() => void>;
    addEventListener(listener: () => void): void;
    abort(): void;
}
export {};

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
/**
 * The set of network states is deliberately simplified -- we only care about
 * states such that transition between them should break currently
 * established connections.
 */
export declare const enum NetworkStatus {
    AVAILABLE = 0,
    UNAVAILABLE = 1
}
export declare type ConnectivityMonitorCallback = (status: NetworkStatus) => void;
/**
 * A base class for monitoring changes in network connectivity; it is expected
 * that each platform will have its own system-dependent implementation.
 */
export interface ConnectivityMonitor {
    /**
     * Adds a callback to be called when connectivity changes.
     *
     * Callbacks are not made on the initial state of connectivity, since this
     * monitor is primarily used for resetting backoff in the remote store when
     * connectivity changes. As such, the initial connectivity state is
     * irrelevant here.
     */
    addCallback(callback: ConnectivityMonitorCallback): void;
    /**
     * Stops monitoring connectivity. After this call completes, no further
     * callbacks will be triggered. After shutdown() is called, no further calls
     * are allowed on this instance.
     */
    shutdown(): void;
}

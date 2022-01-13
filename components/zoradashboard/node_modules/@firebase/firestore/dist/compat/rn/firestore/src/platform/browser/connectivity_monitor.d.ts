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
import { ConnectivityMonitor, NetworkStatus } from '../../remote/connectivity_monitor';
/**
 * Browser implementation of ConnectivityMonitor.
 */
export declare class BrowserConnectivityMonitor implements ConnectivityMonitor {
    private readonly networkAvailableListener;
    private readonly networkUnavailableListener;
    private callbacks;
    constructor();
    addCallback(callback: (status: NetworkStatus) => void): void;
    shutdown(): void;
    private configureNetworkMonitoring;
    private onNetworkAvailable;
    private onNetworkUnavailable;
    /** Checks that all used attributes of window are available. */
    static isAvailable(): boolean;
}

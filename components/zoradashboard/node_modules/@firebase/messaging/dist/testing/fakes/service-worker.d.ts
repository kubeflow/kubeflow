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
export declare function mockServiceWorker(): void;
export declare function restoreServiceWorker(): void;
export declare class FakeServiceWorkerRegistration implements ServiceWorkerRegistration {
    active: null;
    installing: null;
    waiting: null;
    onupdatefound: null;
    pushManager: FakePushManager;
    scope: string;
    navigationPreload: NavigationPreloadManager;
    sync: SyncManager;
    updateViaCache: ServiceWorkerUpdateViaCache;
    getNotifications(): Promise<never[]>;
    showNotification(): Promise<void>;
    update(): Promise<void>;
    unregister(): Promise<boolean>;
    addEventListener(): void;
    removeEventListener(): void;
    dispatchEvent(): boolean;
}
declare class FakePushManager implements PushManager {
    private subscription;
    permissionState(): Promise<"granted">;
    getSubscription(): Promise<FakePushSubscription | null>;
    subscribe(): Promise<FakePushSubscription>;
}
export declare class FakePushSubscription implements PushSubscription {
    endpoint: string;
    expirationTime: number;
    auth: string;
    p256: string;
    getKey(name: PushEncryptionKeyName): Uint8Array;
    unsubscribe(): Promise<boolean>;
    toJSON: () => PushSubscriptionJSON;
    options: PushSubscriptionOptions;
}
/**
 * Most of the fields in here are unused / deprecated. They are only added here to match the TS
 * Event interface.
 */
export declare class FakeEvent implements ExtendableEvent {
    type: string;
    NONE: number;
    AT_TARGET: number;
    BUBBLING_PHASE: number;
    CAPTURING_PHASE: number;
    bubbles: boolean;
    cancelable: boolean;
    composed: boolean;
    timeStamp: number;
    isTrusted: boolean;
    eventPhase: number;
    target: null;
    currentTarget: null;
    srcElement: null;
    cancelBubble: boolean;
    defaultPrevented: boolean;
    returnValue: boolean;
    preventDefault(): void;
    stopPropagation(): void;
    stopImmediatePropagation(): void;
    initEvent(): void;
    waitUntil(): void;
    composedPath(): never[];
    constructor(type: string, options?: EventInit);
}
export {};

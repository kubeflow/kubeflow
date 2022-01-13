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
import { NextFn, Observer, Unsubscribe } from '@firebase/util';
import { FirebaseApp } from '@firebase/app-types';
import { FirebaseInternalDependencies } from '../interfaces/internal-dependencies';
import { FirebaseMessaging } from '@firebase/messaging-types';
import { FirebaseService } from '@firebase/app-types/private';
export declare class WindowController implements FirebaseMessaging, FirebaseService {
    private readonly firebaseDependencies;
    private vapidKey;
    private swRegistration?;
    private onMessageCallback;
    constructor(firebaseDependencies: FirebaseInternalDependencies);
    get app(): FirebaseApp;
    private messageEventListener;
    getVapidKey(): string | null;
    getSwReg(): ServiceWorkerRegistration | undefined;
    getToken(options?: {
        vapidKey?: string;
        serviceWorkerRegistration?: ServiceWorkerRegistration;
    }): Promise<string>;
    updateVapidKey(vapidKey?: string | undefined): Promise<void>;
    updateSwReg(swRegistration?: ServiceWorkerRegistration | undefined): Promise<void>;
    private registerDefaultSw;
    deleteToken(): Promise<boolean>;
    /**
     * Request permission if it is not currently granted.
     *
     * @return Resolves if the permission was granted, rejects otherwise.
     *
     * @deprecated Use Notification.requestPermission() instead.
     * https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission
     */
    requestPermission(): Promise<void>;
    /**
     * @deprecated. Use getToken(options?: {vapidKey?: string; serviceWorkerRegistration?:
     * ServiceWorkerRegistration;}): Promise<string> instead.
     */
    usePublicVapidKey(vapidKey: string): void;
    /**
     * @deprecated. Use getToken(options?: {vapidKey?: string; serviceWorkerRegistration?:
     * ServiceWorkerRegistration;}): Promise<string> instead.
     */
    useServiceWorker(swRegistration: ServiceWorkerRegistration): void;
    /**
     * @param nextOrObserver An observer object or a function triggered on message.
     *
     * @return The unsubscribe function for the observer.
     */
    onMessage(nextOrObserver: NextFn<object> | Observer<object>): Unsubscribe;
    setBackgroundMessageHandler(): void;
    onBackgroundMessage(): Unsubscribe;
    /**
     * @deprecated No-op. It was initially designed with token rotation requests from server in mind.
     * However, the plan to implement such feature was abandoned.
     */
    onTokenRefresh(): Unsubscribe;
    private logEvent;
}

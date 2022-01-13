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
import { FirebaseMessaging, MessagePayload } from '@firebase/messaging-types';
import { NextFn, Observer, Unsubscribe } from '@firebase/util';
import { FirebaseApp } from '@firebase/app-types';
import { FirebaseInternalDependencies } from '../interfaces/internal-dependencies';
import { FirebaseService } from '@firebase/app-types/private';
export declare type BgMessageHandler = (payload: MessagePayload) => unknown;
export declare class SwController implements FirebaseMessaging, FirebaseService {
    private readonly firebaseDependencies;
    private isOnBackgroundMessageUsed;
    private vapidKey;
    private bgMessageHandler;
    constructor(firebaseDependencies: FirebaseInternalDependencies);
    get app(): FirebaseApp;
    /**
     * @deprecated. Use onBackgroundMessage(nextOrObserver: NextFn<object> | Observer<object>):
     * Unsubscribe instead.
     *
     * Calling setBackgroundMessageHandler will opt in to some specific behaviors.
     *
     * 1.) If a notification doesn't need to be shown due to a window already being visible, then push
     * messages will be sent to the page. 2.) If a notification needs to be shown, and the message
     * contains no notification data this method will be called and the promise it returns will be
     * passed to event.waitUntil. If you do not set this callback then all push messages will let and
     * the developer can handle them in a their own 'push' event callback
     *
     * @param callback The callback to be called when a push message is received and a notification
     * must be shown. The callback will be given the data from the push message.
     */
    setBackgroundMessageHandler(callback: BgMessageHandler): void;
    onBackgroundMessage(nextOrObserver: NextFn<MessagePayload> | Observer<MessagePayload>): Unsubscribe;
    getToken(): Promise<string>;
    deleteToken(): Promise<boolean>;
    requestPermission(): Promise<void>;
    usePublicVapidKey(vapidKey: string): void;
    useServiceWorker(): void;
    onMessage(): Unsubscribe;
    onTokenRefresh(): Unsubscribe;
    /**
     * A handler for push events that shows notifications based on the content of the payload.
     *
     * The payload must be a JSON-encoded Object with a `notification` key. The value of the
     * `notification` property will be used as the NotificationOptions object passed to
     * showNotification. Additionally, the `title` property of the notification object will be used as
     * the title.
     *
     * If there is no notification data in the payload then no notification will be shown.
     */
    onPush(event: PushEvent): Promise<void>;
    onSubChange(event: PushSubscriptionChangeEvent): Promise<void>;
    onNotificationClick(event: NotificationEvent): Promise<void>;
}

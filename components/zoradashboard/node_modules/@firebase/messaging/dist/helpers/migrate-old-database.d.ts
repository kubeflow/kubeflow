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
import { TokenDetails } from '../interfaces/token-details';
export interface V2TokenDetails {
    fcmToken: string;
    swScope: string;
    vapidKey: string | Uint8Array;
    subscription: PushSubscription;
    fcmSenderId: string;
    fcmPushSet: string;
    createTime?: number;
    endpoint?: string;
    auth?: string;
    p256dh?: string;
}
export interface V3TokenDetails {
    fcmToken: string;
    swScope: string;
    vapidKey: Uint8Array;
    fcmSenderId: string;
    fcmPushSet: string;
    endpoint: string;
    auth: ArrayBuffer;
    p256dh: ArrayBuffer;
    createTime: number;
}
export interface V4TokenDetails {
    fcmToken: string;
    swScope: string;
    vapidKey: Uint8Array;
    fcmSenderId: string;
    endpoint: string;
    auth: ArrayBufferLike;
    p256dh: ArrayBufferLike;
    createTime: number;
}
export declare function migrateOldDatabase(senderId: string): Promise<TokenDetails | null>;

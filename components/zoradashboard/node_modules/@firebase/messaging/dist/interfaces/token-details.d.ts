/**
 * @license
 * Copyright 2018 Google LLC
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
export interface TokenDetails {
    token: string;
    createTime: number;
    /** Does not exist in Safari since it's not using Push API. */
    subscriptionOptions?: SubscriptionOptions;
}
/**
 * Additional options and values required by a Push API subscription.
 */
export interface SubscriptionOptions {
    vapidKey: string;
    swScope: string;
    endpoint: string;
    auth: string;
    p256dh: string;
}

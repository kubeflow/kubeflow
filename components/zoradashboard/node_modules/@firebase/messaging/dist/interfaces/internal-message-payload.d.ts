/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
import { CONSOLE_CAMPAIGN_ANALYTICS_ENABLED, CONSOLE_CAMPAIGN_ID, CONSOLE_CAMPAIGN_NAME, CONSOLE_CAMPAIGN_TIME } from '../util/constants';
export interface MessagePayloadInternal {
    notification?: NotificationPayloadInternal;
    data?: unknown;
    fcmOptions?: FcmOptionsInternal;
    messageType?: MessageType;
    isFirebaseMessaging?: boolean;
    from: string;
    collapse_key: string;
}
export interface NotificationPayloadInternal extends NotificationOptions {
    title: string;
    click_action?: string;
}
export interface FcmOptionsInternal {
    link?: string;
    analytics_label?: string;
}
export declare enum MessageType {
    PUSH_RECEIVED = "push-received",
    NOTIFICATION_CLICKED = "notification-clicked"
}
/** Additional data of a message sent from the FN Console. */
export interface ConsoleMessageData {
    [CONSOLE_CAMPAIGN_ID]: string;
    [CONSOLE_CAMPAIGN_TIME]: string;
    [CONSOLE_CAMPAIGN_NAME]?: string;
    [CONSOLE_CAMPAIGN_ANALYTICS_ENABLED]?: '1';
}

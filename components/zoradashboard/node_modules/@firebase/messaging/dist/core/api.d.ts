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
import { SubscriptionOptions, TokenDetails } from '../interfaces/token-details';
import { FirebaseInternalDependencies } from '../interfaces/internal-dependencies';
export interface ApiResponse {
    token?: string;
    error?: {
        message: string;
    };
}
export interface ApiRequestBody {
    web: {
        endpoint: string;
        p256dh: string;
        auth: string;
        applicationPubKey?: string;
    };
}
export declare function requestGetToken(firebaseDependencies: FirebaseInternalDependencies, subscriptionOptions: SubscriptionOptions): Promise<string>;
export declare function requestUpdateToken(firebaseDependencies: FirebaseInternalDependencies, tokenDetails: TokenDetails): Promise<string>;
export declare function requestDeleteToken(firebaseDependencies: FirebaseInternalDependencies, token: string): Promise<void>;

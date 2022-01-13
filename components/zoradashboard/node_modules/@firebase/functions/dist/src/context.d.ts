import { FirebaseAuthInternalName } from '@firebase/auth-interop-types';
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
import { FirebaseMessagingName } from '@firebase/messaging-types';
import { Provider } from '@firebase/component';
/**
 * The metadata that should be supplied with function calls.
 */
export interface Context {
    authToken?: string;
    instanceIdToken?: string;
}
/**
 * Helper class to get metadata that should be included with a function call.
 */
export declare class ContextProvider {
    private auth;
    private messaging;
    constructor(authProvider: Provider<FirebaseAuthInternalName>, messagingProvider: Provider<FirebaseMessagingName>);
    getAuthToken(): Promise<string | undefined>;
    getInstanceIdToken(): Promise<string | undefined>;
    getContext(): Promise<Context>;
}

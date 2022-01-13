/**
 * @license
 * Copyright 2020 Google LLC
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
import { FirebaseApp } from '@firebase/app-types';
export declare const RECAPTCHA_URL = "https://www.google.com/recaptcha/api.js";
export declare function initialize(app: FirebaseApp, siteKey: string): Promise<GreCAPTCHA>;
export declare function getToken(app: FirebaseApp): Promise<string>;
declare global {
    interface Window {
        grecaptcha: GreCAPTCHA | undefined;
    }
}
export interface GreCAPTCHA {
    ready: (callback: () => void) => void;
    execute: (siteKey: string, options: {
        action: string;
    }) => Promise<string>;
    render: (container: string | HTMLElement, parameters: GreCAPTCHARenderOption) => string;
}
export interface GreCAPTCHARenderOption {
    sitekey: string;
    size: 'invisible';
}

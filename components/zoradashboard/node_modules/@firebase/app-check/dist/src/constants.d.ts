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
export declare const BASE_ENDPOINT = "https://content-firebaseappcheck.googleapis.com/v1beta";
export declare const EXCHANGE_RECAPTCHA_TOKEN_METHOD = "exchangeRecaptchaToken";
export declare const EXCHANGE_DEBUG_TOKEN_METHOD = "exchangeDebugToken";
export declare const TOKEN_REFRESH_TIME: {
    /**
     * The offset time before token natural expiration to run the refresh.
     * This is currently 5 minutes.
     */
    OFFSET_DURATION: number;
    /**
     * This is the first retrial wait after an error. This is currently
     * 30 seconds.
     */
    RETRIAL_MIN_WAIT: number;
    /**
     * This is the maximum retrial wait, currently 16 minutes.
     */
    RETRIAL_MAX_WAIT: number;
};

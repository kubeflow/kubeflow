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
/**
 * @fileoverview Constants used in the Firebase Storage library.
 */
/**
 * Domain name for firebase storage.
 */
export declare const DEFAULT_HOST = "firebasestorage.googleapis.com";
/**
 * The key in Firebase config json for the storage bucket.
 */
export declare const CONFIG_STORAGE_BUCKET_KEY = "storageBucket";
/**
 * 2 minutes
 *
 * The timeout for all operations except upload.
 */
export declare const DEFAULT_MAX_OPERATION_RETRY_TIME: number;
/**
 * 10 minutes
 *
 * The timeout for upload.
 */
export declare const DEFAULT_MAX_UPLOAD_RETRY_TIME: number;
/**
 * This is the value of Number.MIN_SAFE_INTEGER, which is not well supported
 * enough for us to use it directly.
 */
export declare const MIN_SAFE_INTEGER = -9007199254740991;

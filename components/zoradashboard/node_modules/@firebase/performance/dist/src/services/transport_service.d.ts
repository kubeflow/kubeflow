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
export declare function setupTransportService(): void;
/**
 * Utilized by testing to clean up message queue and un-initialize transport service.
 */
export declare function resetTransportService(): void;
/** Log handler for cc service to send the performance logs to the server. */
export declare function transportHandler(serializer: (...args: any[]) => string): (...args: unknown[]) => void;

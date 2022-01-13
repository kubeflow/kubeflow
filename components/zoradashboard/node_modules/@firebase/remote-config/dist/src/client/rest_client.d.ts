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
import { FirebaseInstallations } from '@firebase/installations-types';
import { FetchResponse, RemoteConfigFetchClient, FetchRequest } from './remote_config_fetch_client';
/**
 * Implements the Client abstraction for the Remote Config REST API.
 */
export declare class RestClient implements RemoteConfigFetchClient {
    private readonly firebaseInstallations;
    private readonly sdkVersion;
    private readonly namespace;
    private readonly projectId;
    private readonly apiKey;
    private readonly appId;
    constructor(firebaseInstallations: FirebaseInstallations, sdkVersion: string, namespace: string, projectId: string, apiKey: string, appId: string);
    /**
     * Fetches from the Remote Config REST API.
     *
     * @throws a {@link ErrorCode.FETCH_NETWORK} error if {@link GlobalFetch#fetch} can't
     * connect to the network.
     * @throws a {@link ErrorCode.FETCH_PARSE} error if {@link Response#json} can't parse the
     * fetch response.
     * @throws a {@link ErrorCode.FETCH_STATUS} error if the service returns an HTTP error status.
     */
    fetch(request: FetchRequest): Promise<FetchResponse>;
}

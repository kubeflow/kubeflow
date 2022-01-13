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
import { Token } from '../../api/credentials';
import { DatabaseInfo } from '../../core/database_info';
import { Stream } from '../../remote/connection';
import { RestConnection } from '../../remote/rest_connection';
import { StringMap } from '../../util/types';
/**
 * A Rest-based connection that relies on the native HTTP stack
 * (e.g. `fetch` or a polyfill).
 */
export declare class FetchConnection extends RestConnection {
    private readonly fetchImpl;
    /**
     * @param databaseInfo - The connection info.
     * @param fetchImpl - `fetch` or a Polyfill that implements the fetch API.
     */
    constructor(databaseInfo: DatabaseInfo, fetchImpl: typeof fetch);
    openStream<Req, Resp>(rpcName: string, token: Token | null): Stream<Req, Resp>;
    protected performRPCRequest<Req, Resp>(rpcName: string, url: string, headers: StringMap, body: Req): Promise<Resp>;
}

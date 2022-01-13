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
import { Token } from '../api/credentials';
import { DatabaseId, DatabaseInfo } from '../core/database_info';
import { StringMap } from '../util/types';
import { Connection, Stream } from './connection';
/**
 * Base class for all Rest-based connections to the backend (WebChannel and
 * HTTP).
 */
export declare abstract class RestConnection implements Connection {
    private readonly databaseInfo;
    protected readonly databaseId: DatabaseId;
    protected readonly baseUrl: string;
    private readonly databaseRoot;
    constructor(databaseInfo: DatabaseInfo);
    invokeRPC<Req, Resp>(rpcName: string, path: string, req: Req, token: Token | null): Promise<Resp>;
    invokeStreamingRPC<Req, Resp>(rpcName: string, path: string, request: Req, token: Token | null): Promise<Resp[]>;
    abstract openStream<Req, Resp>(rpcName: string, token: Token | null): Stream<Req, Resp>;
    /**
     * Modifies the headers for a request, adding any authorization token if
     * present and any additional headers for the request.
     */
    protected modifyHeadersForRequest(headers: StringMap, token: Token | null): void;
    /**
     * Performs an RPC request using an implementation specific networking layer.
     */
    protected abstract performRPCRequest<Req, Resp>(rpcName: string, url: string, headers: StringMap, body: Req): Promise<Resp>;
    private makeUrl;
}

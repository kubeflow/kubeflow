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
import { Token } from '../../../src/api/credentials';
import { Stream } from '../../../src/remote/connection';
import { RestConnection } from '../../../src/remote/rest_connection';
import { StringMap } from '../../../src/util/types';
export declare class TestRestConnection extends RestConnection {
    lastUrl: string;
    lastHeaders: StringMap;
    lastRequestBody: unknown;
    nextResponse: Promise<unknown>;
    openStream<Req, Resp>(rpcName: string, token: Token | null): Stream<Req, Resp>;
    protected performRPCRequest<Req, Resp>(rpcName: string, url: string, headers: StringMap, body: Req): Promise<Resp>;
}

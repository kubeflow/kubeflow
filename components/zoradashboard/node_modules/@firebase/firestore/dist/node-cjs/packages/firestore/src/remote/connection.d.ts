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
import { Token } from '../api/credentials';
import { FirestoreError } from '../util/error';
/**
 * A connected RPC interface to a remote Datastore.
 *
 * Responsible for maintaining a connection to the backend (and informing when
 * that connection state changes via onConnectionStateChange) and sending RPCs
 * when possible.
 *
 * The Connection is not responsible for queueing RPCs to the backend when
 * the connection is down.
 *
 * RPC messages are expected to be JavaScript objects representing the JSON that
 * would be sent over the REST/JSON API to Datastore or used as input to
 * creating the equivalent protocol buffers for GRPC.
 */
export interface Connection {
    /**
     * Invokes an RPC by name, given a request message as a JavaScript object
     * representing the JSON to send.
     *
     * @param rpcName - the name of the RPC to invoke
     * @param path - the path to invoke this RPC on
     * @param request - the Raw JSON object encoding of the request message
     * @param token - the Token to use for the RPC.
     * @returns a Promise containing the JSON object encoding of the response
     */
    invokeRPC<Req, Resp>(rpcName: string, path: string, request: Req, token: Token | null): Promise<Resp>;
    /**
     * Invokes a streaming RPC by name, given a request message as a JavaScript
     * object representing the JSON to send. The responses will be consumed to
     * completion and then returned as an array.
     *
     * @param rpcName - the name of the RPC to invoke
     * @param path - the path to invoke this RPC on
     * @param request - the Raw JSON object encoding of the request message
     * @param token - the Token to use for the RPC.
     * @returns a Promise containing an array with the JSON object encodings of the
     * responses
     */
    invokeStreamingRPC<Req, Resp>(rpcName: string, path: string, request: Req, token: Token | null): Promise<Resp[]>;
    /**
     * Opens a stream to the given stream RPC endpoint. Returns a stream which
     * will try to open itself.
     * @param rpcName - the name of the RPC to open the stream on
     * @param token - the Token to use for the RPC.
     */
    openStream<Req, Resp>(rpcName: string, token: Token | null): Stream<Req, Resp>;
}
/**
 * A bidirectional stream that can be used to send an receive messages.
 *
 * A stream can be closed locally with close() or can be closed remotely or
 * through network errors. onClose is guaranteed to be called. onOpen will only
 * be called if the stream successfully established a connection.
 */
export interface Stream<I, O> {
    onOpen(callback: () => void): void;
    onClose(callback: (err?: FirestoreError) => void): void;
    onMessage(callback: (msg: O) => void): void;
    send(msg: I): void;
    close(): void;
}

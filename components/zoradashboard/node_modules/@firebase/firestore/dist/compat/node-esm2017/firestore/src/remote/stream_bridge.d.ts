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
import { FirestoreError } from '../util/error';
import { Stream } from './connection';
/**
 * Provides a simple helper class that implements the Stream interface to
 * bridge to other implementations that are streams but do not implement the
 * interface. The stream callbacks are invoked with the callOn... methods.
 */
export declare class StreamBridge<I, O> implements Stream<I, O> {
    private wrappedOnOpen;
    private wrappedOnClose;
    private wrappedOnMessage;
    private sendFn;
    private closeFn;
    constructor(args: {
        sendFn: (msg: I) => void;
        closeFn: () => void;
    });
    onOpen(callback: () => void): void;
    onClose(callback: (err?: FirestoreError) => void): void;
    onMessage(callback: (msg: O) => void): void;
    close(): void;
    send(msg: I): void;
    callOnOpen(): void;
    callOnClose(err?: FirestoreError): void;
    callOnMessage(msg: O): void;
}

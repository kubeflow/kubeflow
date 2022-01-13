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
 * @param opt_elideCopy - If true, doesn't copy mutable input data
 *     (e.g. Uint8Arrays). Pass true only if you know the objects will not be
 *     modified after this blob's construction.
 *
 * @internal
 */
export declare class FbsBlob {
    private data_;
    private size_;
    private type_;
    constructor(data: Blob | Uint8Array | ArrayBuffer, elideCopy?: boolean);
    size(): number;
    type(): string;
    slice(startByte: number, endByte: number): FbsBlob | null;
    static getBlob(...args: Array<string | FbsBlob>): FbsBlob | null;
    uploadData(): Blob | Uint8Array;
}

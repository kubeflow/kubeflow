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
 * @fileoverview Defines methods for interacting with the network.
 */
import { Metadata } from '../metadata';
import { ListResult } from '../list';
import { FbsBlob } from './blob';
import { FirebaseStorageError } from './error';
import { Location } from './location';
import { Mappings } from './metadata';
import { RequestInfo } from './requestinfo';
import { Connection } from './connection';
import { StorageService } from '../service';
/**
 * Throws the UNKNOWN FirebaseStorageError if cndn is false.
 */
export declare function handlerCheck(cndn: boolean): void;
export declare function metadataHandler(service: StorageService, mappings: Mappings): (p1: Connection, p2: string) => Metadata;
export declare function listHandler(service: StorageService, bucket: string): (p1: Connection, p2: string) => ListResult;
export declare function downloadUrlHandler(service: StorageService, mappings: Mappings): (p1: Connection, p2: string) => string | null;
export declare function sharedErrorHandler(location: Location): (p1: Connection, p2: FirebaseStorageError) => FirebaseStorageError;
export declare function objectErrorHandler(location: Location): (p1: Connection, p2: FirebaseStorageError) => FirebaseStorageError;
export declare function getMetadata(service: StorageService, location: Location, mappings: Mappings): RequestInfo<Metadata>;
export declare function list(service: StorageService, location: Location, delimiter?: string, pageToken?: string | null, maxResults?: number | null): RequestInfo<ListResult>;
export declare function getDownloadUrl(service: StorageService, location: Location, mappings: Mappings): RequestInfo<string | null>;
export declare function updateMetadata(service: StorageService, location: Location, metadata: Partial<Metadata>, mappings: Mappings): RequestInfo<Metadata>;
export declare function deleteObject(service: StorageService, location: Location): RequestInfo<void>;
export declare function determineContentType_(metadata: Metadata | null, blob: FbsBlob | null): string;
export declare function metadataForUpload_(location: Location, blob: FbsBlob, metadata?: Metadata | null): Metadata;
/**
 * Prepare RequestInfo for uploads as Content-Type: multipart.
 */
export declare function multipartUpload(service: StorageService, location: Location, mappings: Mappings, blob: FbsBlob, metadata?: Metadata | null): RequestInfo<Metadata>;
/**
 * @param current The number of bytes that have been uploaded so far.
 * @param total The total number of bytes in the upload.
 * @param opt_finalized True if the server has finished the upload.
 * @param opt_metadata The upload metadata, should
 *     only be passed if opt_finalized is true.
 */
export declare class ResumableUploadStatus {
    current: number;
    total: number;
    finalized: boolean;
    metadata: Metadata | null;
    constructor(current: number, total: number, finalized?: boolean, metadata?: Metadata | null);
}
export declare function checkResumeHeader_(xhr: Connection, allowed?: string[]): string;
export declare function createResumableUpload(service: StorageService, location: Location, mappings: Mappings, blob: FbsBlob, metadata?: Metadata | null): RequestInfo<string>;
/**
 * @param url From a call to fbs.requests.createResumableUpload.
 */
export declare function getResumableUploadStatus(service: StorageService, location: Location, url: string, blob: FbsBlob): RequestInfo<ResumableUploadStatus>;
/**
 * Any uploads via the resumable upload API must transfer a number of bytes
 * that is a multiple of this number.
 */
export declare const RESUMABLE_UPLOAD_CHUNK_SIZE: number;
/**
 * @param url From a call to fbs.requests.createResumableUpload.
 * @param chunkSize Number of bytes to upload.
 * @param status The previous status.
 *     If not passed or null, we start from the beginning.
 * @throws fbs.Error If the upload is already complete, the passed in status
 *     has a final size inconsistent with the blob, or the blob cannot be sliced
 *     for upload.
 */
export declare function continueResumableUpload(location: Location, service: StorageService, url: string, blob: FbsBlob, chunkSize: number, mappings: Mappings, status?: ResumableUploadStatus | null, progressCallback?: ((p1: number, p2: number) => void) | null): RequestInfo<ResumableUploadStatus>;

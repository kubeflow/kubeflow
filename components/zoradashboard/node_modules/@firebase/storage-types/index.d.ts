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

import { FirebaseApp } from '@firebase/app-types';
import { CompleteFn, FirebaseError, NextFn, Unsubscribe } from '@firebase/util';

export interface FullMetadata extends UploadMetadata {
  bucket: string;
  fullPath: string;
  generation: string;
  metageneration: string;
  name: string;
  size: number;
  timeCreated: string;
  updated: string;
}

export interface Reference {
  bucket: string;
  child(path: string): Reference;
  delete(): Promise<void>;
  fullPath: string;
  getDownloadURL(): Promise<string>;
  getMetadata(): Promise<FullMetadata>;
  name: string;
  parent: Reference | null;
  put(
    data: Blob | Uint8Array | ArrayBuffer,
    metadata?: UploadMetadata
  ): UploadTask;
  putString(
    data: string,
    format?: StringFormat,
    metadata?: UploadMetadata
  ): UploadTask;
  root: Reference;
  storage: FirebaseStorage;
  toString(): string;
  updateMetadata(metadata: SettableMetadata): Promise<FullMetadata>;
  listAll(): Promise<ListResult>;
  list(options?: ListOptions): Promise<ListResult>;
}

export interface ListResult {
  prefixes: Reference[];
  items: Reference[];
  nextPageToken: string | null;
}

export interface ListOptions {
  maxResults?: number | null;
  pageToken?: string | null;
}

export interface SettableMetadata {
  cacheControl?: string | null;
  contentDisposition?: string | null;
  contentEncoding?: string | null;
  contentLanguage?: string | null;
  contentType?: string | null;
  customMetadata?: {
    [/* warning: coerced from ? */ key: string]: string;
  } | null;
}

export type StringFormat = string;
export type TaskEvent = string;
export type TaskState = string;

export interface UploadMetadata extends SettableMetadata {
  md5Hash?: string | null;
}

interface FirebaseStorageError extends FirebaseError {
  serverResponse: string | null;
}

export interface StorageObserver<T> {
  next?: NextFn<T> | null;
  error?: (error: FirebaseStorageError) => void | null;
  complete?: CompleteFn | null;
}

export interface UploadTask {
  cancel(): boolean;
  catch(onRejected: (error: FirebaseStorageError) => any): Promise<any>;
  on(
    event: TaskEvent,
    nextOrObserver?:
      | StorageObserver<UploadTaskSnapshot>
      | null
      | ((snapshot: UploadTaskSnapshot) => any),
    error?: ((a: FirebaseStorageError) => any) | null,
    complete?: Unsubscribe | null
  ): Function;
  pause(): boolean;
  resume(): boolean;
  snapshot: UploadTaskSnapshot;
  then(
    onFulfilled?: ((snapshot: UploadTaskSnapshot) => any) | null,
    onRejected?: ((error: FirebaseStorageError) => any) | null
  ): Promise<any>;
}

export interface UploadTaskSnapshot {
  bytesTransferred: number;
  metadata: FullMetadata;
  ref: Reference;
  state: TaskState;
  task: UploadTask;
  totalBytes: number;
}

export class FirebaseStorage {
  private constructor();

  app: FirebaseApp;
  maxOperationRetryTime: number;
  maxUploadRetryTime: number;
  ref(path?: string): Reference;
  refFromURL(url: string): Reference;
  setMaxOperationRetryTime(time: number): void;
  setMaxUploadRetryTime(time: number): void;
  useEmulator(host: string, port: number): void;
}

declare module '@firebase/component' {
  interface NameServiceMapping {
    'storage': FirebaseStorage;
  }
}

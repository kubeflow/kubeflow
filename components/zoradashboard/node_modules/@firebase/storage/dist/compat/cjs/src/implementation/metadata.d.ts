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
 * @fileoverview Documentation for the metadata format
 */
import { Metadata } from '../metadata';
import { StorageService } from '../service';
export declare function noXform_<T>(metadata: Metadata, value: T): T;
declare class Mapping<T> {
    server: string;
    local: string;
    writable: boolean;
    xform: (p1: Metadata, p2?: T) => T | undefined;
    constructor(server: string, local?: string | null, writable?: boolean, xform?: ((p1: Metadata, p2?: T) => T | undefined) | null);
}
declare type Mappings = Array<Mapping<string> | Mapping<number>>;
export { Mappings };
export declare function xformPath(fullPath: string | undefined): string | undefined;
export declare function getMappings(): Mappings;
export declare function addRef(metadata: Metadata, service: StorageService): void;
export declare function fromResource(service: StorageService, resource: {
    [name: string]: unknown;
}, mappings: Mappings): Metadata;
export declare function fromResourceString(service: StorageService, resourceString: string, mappings: Mappings): Metadata | null;
export declare function downloadUrlFromResourceString(metadata: Metadata, resourceString: string, host: string): string | null;
export declare function toResourceString(metadata: Partial<Metadata>, mappings: Mappings): string;

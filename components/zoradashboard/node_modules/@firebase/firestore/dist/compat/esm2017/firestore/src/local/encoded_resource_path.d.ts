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
import { ResourcePath } from '../model/path';
/**
 * Helpers for dealing with resource paths stored in IndexedDB.
 *
 * Resource paths in their canonical string form do not sort as the server
 * sorts them. Specifically the server splits paths into segments first and then
 * sorts, putting end-of-segment before any character. In a UTF-8 string
 * encoding the slash ('/') that denotes the end-of-segment naturally comes
 * after other characters so the intent here is to encode the path delimiters in
 * such a way that the resulting strings sort naturally.
 *
 * Resource paths are also used for prefix scans so it's important to
 * distinguish whole segments from any longer segments of which they might be a
 * prefix. For example, it's important to make it possible to scan documents in
 * a collection "foo" without encountering documents in a collection "foobar".
 *
 * Separate from the concerns about resource path ordering and separation,
 * On Android, SQLite imposes additional restrictions since it does not handle
 * keys with embedded NUL bytes particularly well. Rather than change the
 * implementation we keep the encoding identical to keep the ports similar.
 *
 * Taken together this means resource paths when encoded for storage in
 * IndexedDB have the following characteristics:
 *
 *   * Segment separators ("/") sort before everything else.
 *   * All paths have a trailing separator.
 *   * NUL bytes do not exist in the output, since IndexedDB doesn't treat them
 * well.
 *
 * Therefore resource paths are encoded into string form using the following
 * rules:
 *
 *   * '\x01' is used as an escape character.
 *   * Path separators are encoded as "\x01\x01"
 *   * NUL bytes are encoded as "\x01\x10"
 *   * '\x01' is encoded as "\x01\x11"
 *
 * This encoding leaves some room between path separators and the NUL byte
 * just in case we decide to support integer document ids after all.
 *
 * Note that characters treated specially by the backend ('.', '/', and '~')
 * are not treated specially here. This class assumes that any unescaping of
 * resource path strings into actual ResourcePath objects will handle these
 * characters there.
 */
export declare type EncodedResourcePath = string;
/**
 * Encodes a resource path into a IndexedDb-compatible string form.
 */
export declare function encodeResourcePath(path: ResourcePath): EncodedResourcePath;
/**
 * Decodes the given IndexedDb-compatible string form of a resource path into
 * a ResourcePath instance. Note that this method is not suitable for use with
 * decoding resource names from the server; those are One Platform format
 * strings.
 */
export declare function decodeResourcePath(path: EncodedResourcePath): ResourcePath;

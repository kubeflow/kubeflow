/// <reference types="node" />
import { Readable } from 'stream';
export declare const convert: (stream: Blob | ReadableStream<any> | Readable) => Promise<Uint8Array>;

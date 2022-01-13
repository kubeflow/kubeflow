/// <reference types="node" />
import { Duplex, Readable, Writable } from 'stream';
import { EmitterAugmentation1 } from './events';
export declare type WriteCallback = (error: Error | null | undefined) => void;
export interface IntermediateObjectReadable<T> extends Readable {
    read(size?: number): any & T;
}
export declare type ObjectReadable<T> = {
    read(size?: number): T;
} & EmitterAugmentation1<'data', T> & IntermediateObjectReadable<T>;
export interface IntermediateObjectWritable<T> extends Writable {
    _write(chunk: any & T, encoding: string, callback: Function): void;
    write(chunk: any & T, cb?: WriteCallback): boolean;
    write(chunk: any & T, encoding?: any, cb?: WriteCallback): boolean;
    setDefaultEncoding(encoding: string): this;
    end(): void;
    end(chunk: any & T, cb?: Function): void;
    end(chunk: any & T, encoding?: any, cb?: Function): void;
}
export interface ObjectWritable<T> extends IntermediateObjectWritable<T> {
    _write(chunk: T, encoding: string, callback: Function): void;
    write(chunk: T, cb?: Function): boolean;
    write(chunk: T, encoding?: any, cb?: Function): boolean;
    setDefaultEncoding(encoding: string): this;
    end(): void;
    end(chunk: T, cb?: Function): void;
    end(chunk: T, encoding?: any, cb?: Function): void;
}
export declare type ObjectDuplex<T, U> = {
    read(size?: number): U;
    _write(chunk: T, encoding: string, callback: Function): void;
    write(chunk: T, cb?: Function): boolean;
    write(chunk: T, encoding?: any, cb?: Function): boolean;
    end(): void;
    end(chunk: T, cb?: Function): void;
    end(chunk: T, encoding?: any, cb?: Function): void;
} & Duplex & ObjectWritable<T> & ObjectReadable<U>;

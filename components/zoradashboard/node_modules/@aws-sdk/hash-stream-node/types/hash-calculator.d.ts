/// <reference types="node" />
import { Hash } from "@aws-sdk/types";
import { Writable, WritableOptions } from "stream";
export declare class HashCalculator extends Writable {
    readonly hash: Hash;
    constructor(hash: Hash, options?: WritableOptions);
    _write(chunk: Buffer, encoding: string, callback: (err?: Error) => void): void;
}

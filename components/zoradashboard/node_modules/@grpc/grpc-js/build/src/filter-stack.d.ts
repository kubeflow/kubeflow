/// <reference types="node" />
import { Call, StatusObject, WriteObject } from './call-stream';
import { Filter, FilterFactory } from './filter';
import { Metadata } from './metadata';
export declare class FilterStack implements Filter {
    private readonly filters;
    constructor(filters: Filter[]);
    sendMetadata(metadata: Promise<Metadata>): Promise<Metadata>;
    receiveMetadata(metadata: Metadata): Metadata;
    sendMessage(message: Promise<WriteObject>): Promise<WriteObject>;
    receiveMessage(message: Promise<Buffer>): Promise<Buffer>;
    receiveTrailers(status: StatusObject): StatusObject;
}
export declare class FilterStackFactory implements FilterFactory<FilterStack> {
    private readonly factories;
    constructor(factories: Array<FilterFactory<Filter>>);
    createFilter(callStream: Call): FilterStack;
}

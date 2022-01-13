/// <reference types="node" />
import { Call, WriteObject } from './call-stream';
import { Channel } from './channel';
import { BaseFilter, Filter, FilterFactory } from './filter';
import { Metadata } from './metadata';
export declare class CompressionFilter extends BaseFilter implements Filter {
    private sendCompression;
    private receiveCompression;
    sendMetadata(metadata: Promise<Metadata>): Promise<Metadata>;
    receiveMetadata(metadata: Metadata): Metadata;
    sendMessage(message: Promise<WriteObject>): Promise<WriteObject>;
    receiveMessage(message: Promise<Buffer>): Promise<Buffer>;
}
export declare class CompressionFilterFactory implements FilterFactory<CompressionFilter> {
    private readonly channel;
    constructor(channel: Channel);
    createFilter(callStream: Call): CompressionFilter;
}

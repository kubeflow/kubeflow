/// <reference types="node" />
import { BaseFilter, Filter, FilterFactory } from "./filter";
import { Call, WriteObject } from "./call-stream";
import { ChannelOptions } from "./channel-options";
export declare class MaxMessageSizeFilter extends BaseFilter implements Filter {
    private readonly options;
    private readonly callStream;
    private maxSendMessageSize;
    private maxReceiveMessageSize;
    constructor(options: ChannelOptions, callStream: Call);
    sendMessage(message: Promise<WriteObject>): Promise<WriteObject>;
    receiveMessage(message: Promise<Buffer>): Promise<Buffer>;
}
export declare class MaxMessageSizeFilterFactory implements FilterFactory<MaxMessageSizeFilter> {
    private readonly options;
    constructor(options: ChannelOptions);
    createFilter(callStream: Call): MaxMessageSizeFilter;
}

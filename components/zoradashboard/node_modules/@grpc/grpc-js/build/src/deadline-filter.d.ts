import { Call, StatusObject } from './call-stream';
import { Channel } from './channel';
import { BaseFilter, Filter, FilterFactory } from './filter';
import { Metadata } from './metadata';
export declare class DeadlineFilter extends BaseFilter implements Filter {
    private readonly channel;
    private readonly callStream;
    private timer;
    private deadline;
    constructor(channel: Channel, callStream: Call);
    sendMetadata(metadata: Promise<Metadata>): Promise<Metadata>;
    receiveTrailers(status: StatusObject): StatusObject;
}
export declare class DeadlineFilterFactory implements FilterFactory<DeadlineFilter> {
    private readonly channel;
    constructor(channel: Channel);
    createFilter(callStream: Call): DeadlineFilter;
}

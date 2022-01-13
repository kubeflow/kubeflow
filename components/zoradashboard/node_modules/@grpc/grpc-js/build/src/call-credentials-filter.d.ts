import { Call } from './call-stream';
import { Channel } from './channel';
import { BaseFilter, Filter, FilterFactory } from './filter';
import { Metadata } from './metadata';
export declare class CallCredentialsFilter extends BaseFilter implements Filter {
    private readonly channel;
    private readonly stream;
    private serviceUrl;
    constructor(channel: Channel, stream: Call);
    sendMetadata(metadata: Promise<Metadata>): Promise<Metadata>;
}
export declare class CallCredentialsFilterFactory implements FilterFactory<CallCredentialsFilter> {
    private readonly channel;
    constructor(channel: Channel);
    createFilter(callStream: Call): CallCredentialsFilter;
}

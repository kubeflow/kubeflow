import { WorkboxPlugin } from '../types.js';
import '../_version.js';
interface MatchWrapperOptions {
    cacheName: string;
    request: Request;
    event?: Event;
    plugins?: WorkboxPlugin[];
    matchOptions?: CacheQueryOptions;
}
interface PutWrapperOptions extends MatchWrapperOptions {
    response: Response;
}
export declare const cacheWrapper: {
    put: ({ cacheName, request, response, event, plugins, matchOptions, }: PutWrapperOptions) => Promise<void>;
    match: ({ cacheName, request, event, matchOptions, plugins, }: MatchWrapperOptions) => Promise<Response | undefined>;
};
export {};

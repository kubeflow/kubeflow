import { WorkboxPlugin } from '../types.js';
import '../_version.js';
interface WrappedFetchOptions {
    request: Request | string;
    event?: ExtendableEvent;
    plugins?: WorkboxPlugin[];
    fetchOptions?: RequestInit;
}
declare const fetchWrapper: {
    fetch: ({ request, fetchOptions, event, plugins, }: WrappedFetchOptions) => Promise<any>;
};
export { fetchWrapper };

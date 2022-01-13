import { WorkboxPlugin } from 'workbox-core/types.js';
import '../_version.js';
export declare const precachePlugins: {
    get(): WorkboxPlugin[];
    add(newPlugins: WorkboxPlugin[]): void;
};

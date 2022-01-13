import { EventTrackOpts } from '../types';
export declare class EventTracker {
    private _tracker;
    private _config;
    private _delegates;
    constructor(tracker: any, opts: any);
    configure(opts?: EventTrackOpts): EventTrackOpts;
    private _trackFunc;
}
/**
 * @deprecated use named import
 */
export default EventTracker;

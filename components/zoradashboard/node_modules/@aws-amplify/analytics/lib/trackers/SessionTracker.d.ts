import { SessionTrackOpts } from '../types';
export declare class SessionTracker {
    private _tracker;
    private _hasEnabled;
    private _config;
    private _hidden;
    private _visibilityChange;
    constructor(tracker: any, opts: any);
    private _envCheck;
    private _trackFunc;
    private _trackBeforeUnload;
    private _sendInitialEvent;
    configure(opts?: SessionTrackOpts): SessionTrackOpts;
}
/**
 * @deprecated use named import
 */
export default SessionTracker;

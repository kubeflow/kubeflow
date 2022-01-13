import { SessionInfo } from './DataType';
export declare class SessionInfoManager {
    private _isBrowser;
    private _cache;
    private _timer;
    private _timerKey;
    constructor(prefixKey?: string);
    private _refreshTimer;
    private storeValue;
    private retrieveValue;
    private _getCachePrefix;
    getTimerKey(): any;
    updateSessionInfo(userId: string, sessionInfo: SessionInfo): void;
    private _isRequireUpdateSessionInfo;
    retrieveSessionInfo(trackingId: string): SessionInfo;
    private _isRequireNewSession;
}

import { RequestParams } from './DataType';
export declare class MediaAutoTrack {
    private _mediaElement;
    private _provider;
    private _params;
    private _started;
    private _iframePlayer;
    private eventActionMapping;
    private _youTubeIframeLoader;
    constructor(params: RequestParams, provider: any);
    private _initYoutubeFrame;
    private _iframeMediaTracker;
    private _onPlayerStateChange;
    private _html5MediaTracker;
    private playEventAction;
    private pauseEventAction;
    private endedEventAction;
    private recordEvent;
    private _financial;
}

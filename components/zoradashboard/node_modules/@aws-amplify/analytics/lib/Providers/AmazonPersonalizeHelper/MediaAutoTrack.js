"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTML5_MEDIA_EVENT;
(function (HTML5_MEDIA_EVENT) {
    HTML5_MEDIA_EVENT["PLAY"] = "play";
    HTML5_MEDIA_EVENT["PAUSE"] = "pause";
    HTML5_MEDIA_EVENT["ENDED"] = "Ended";
})(HTML5_MEDIA_EVENT || (HTML5_MEDIA_EVENT = {}));
var MEDIA_TYPE;
(function (MEDIA_TYPE) {
    MEDIA_TYPE["IFRAME"] = "IFRAME";
    MEDIA_TYPE["VIDEO"] = "VIDEO";
    MEDIA_TYPE["AUDIO"] = "AUDIO";
})(MEDIA_TYPE || (MEDIA_TYPE = {}));
var EVENT_TYPE;
(function (EVENT_TYPE) {
    EVENT_TYPE["PLAY"] = "Play";
    EVENT_TYPE["ENDED"] = "Ended";
    EVENT_TYPE["PAUSE"] = "Pause";
    EVENT_TYPE["TIME_WATCHED"] = "TimeWatched";
})(EVENT_TYPE || (EVENT_TYPE = {}));
var MediaAutoTrack = /** @class */ (function () {
    function MediaAutoTrack(params, provider) {
        var _a;
        this.eventActionMapping = (_a = {},
            _a[EVENT_TYPE.ENDED] = this.endedEventAction.bind(this),
            _a[EVENT_TYPE.PLAY] = this.playEventAction.bind(this),
            _a[EVENT_TYPE.PAUSE] = this.pauseEventAction.bind(this),
            _a);
        var eventData = params.eventData;
        this._params = params;
        this._mediaElement = document.getElementById(eventData.properties['domElementId']);
        this._started = false;
        this._provider = provider;
        var mediaTrackFunMapping = {
            IFRAME: this._iframeMediaTracker,
            VIDEO: this._html5MediaTracker,
            AUDIO: this._html5MediaTracker,
        };
        mediaTrackFunMapping[this._mediaElement.tagName].bind(this)();
        this._initYoutubeFrame();
    }
    MediaAutoTrack.prototype._initYoutubeFrame = function () {
        this._youTubeIframeLoader = {
            src: 'https://www.youtube.com/iframe_api',
            loading: false,
            loaded: false,
            listeners: [],
            load: function (callback) {
                var _this = this;
                this.listeners.push(callback);
                if (this.loaded) {
                    setTimeout(function () {
                        _this.done();
                    });
                    return;
                }
                if (this.loading) {
                    return;
                }
                this.loading = true;
                window['onYouTubeIframeAPIReady'] = function () {
                    _this.loaded = true;
                    _this.done();
                };
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = this.src;
                document.body.appendChild(script);
            },
            done: function () {
                delete window['onYouTubeIframeAPIReady'];
                while (this.listeners.length) {
                    this.listeners.pop()(window['YT']);
                }
            },
        };
    };
    MediaAutoTrack.prototype._iframeMediaTracker = function () {
        var that = this;
        setInterval(function () {
            if (that._started) {
                that.recordEvent(MEDIA_TYPE.IFRAME, EVENT_TYPE.TIME_WATCHED);
            }
        }, 3 * 1000);
        this._youTubeIframeLoader.load(function (YT) {
            that._iframePlayer = new YT.Player(that._mediaElement.id, {
                events: { onStateChange: that._onPlayerStateChange.bind(that) },
            });
        });
    };
    MediaAutoTrack.prototype._onPlayerStateChange = function (event) {
        var iframeEventMapping = {
            0: EVENT_TYPE.ENDED,
            1: EVENT_TYPE.PLAY,
            2: EVENT_TYPE.PAUSE,
        };
        var eventType = iframeEventMapping[event.data];
        if (eventType) {
            this.eventActionMapping[eventType](MEDIA_TYPE.IFRAME);
        }
    };
    MediaAutoTrack.prototype._html5MediaTracker = function () {
        var that = this;
        setInterval(function () {
            if (that._started) {
                that.recordEvent(MEDIA_TYPE.VIDEO, EVENT_TYPE.TIME_WATCHED);
            }
        }, 3 * 1000);
        this._mediaElement.addEventListener(HTML5_MEDIA_EVENT.PLAY, function () {
            that.eventActionMapping[EVENT_TYPE.PLAY](MEDIA_TYPE.VIDEO);
        }, false);
        this._mediaElement.addEventListener(HTML5_MEDIA_EVENT.PAUSE, function () {
            that.eventActionMapping[EVENT_TYPE.PAUSE](MEDIA_TYPE.VIDEO);
        }, false);
        this._mediaElement.addEventListener(HTML5_MEDIA_EVENT.ENDED, function () {
            that.eventActionMapping[EVENT_TYPE.ENDED](MEDIA_TYPE.VIDEO);
        }, false);
    };
    MediaAutoTrack.prototype.playEventAction = function (mediaType) {
        this._started = true;
        this.recordEvent(mediaType, EVENT_TYPE.PLAY);
    };
    MediaAutoTrack.prototype.pauseEventAction = function (mediaType) {
        this._started = false;
        this.recordEvent(mediaType, EVENT_TYPE.PAUSE);
    };
    MediaAutoTrack.prototype.endedEventAction = function (mediaType) {
        this._started = false;
        this.recordEvent(mediaType, EVENT_TYPE.ENDED);
    };
    MediaAutoTrack.prototype.recordEvent = function (mediaType, eventType) {
        var newParams = Object.assign({}, this._params);
        var eventData = newParams.eventData;
        eventData.eventType = eventType;
        if (mediaType === MEDIA_TYPE.VIDEO) {
            eventData.properties.timestamp = this._mediaElement.currentTime;
            eventData.properties.duration = this._mediaElement.duration;
        }
        else {
            eventData.properties.timestamp = this._financial(this._iframePlayer.getCurrentTime());
            eventData.properties.duration = this._financial(this._iframePlayer.getDuration());
        }
        var percentage = parseFloat(eventData.properties.timestamp) /
            parseFloat(eventData.properties.duration);
        eventData.properties.eventValue = Number(percentage.toFixed(4));
        delete eventData.properties.domElementId;
        this._provider.putToBuffer(newParams);
    };
    MediaAutoTrack.prototype._financial = function (x) {
        return Number.parseFloat(x).toFixed(4);
    };
    return MediaAutoTrack;
}());
exports.MediaAutoTrack = MediaAutoTrack;
//# sourceMappingURL=MediaAutoTrack.js.map
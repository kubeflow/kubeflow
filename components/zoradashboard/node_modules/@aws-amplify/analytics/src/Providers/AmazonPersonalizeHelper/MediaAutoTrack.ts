/*
 * Copyright 2019-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
import { RequestParams } from './DataType';

enum HTML5_MEDIA_EVENT {
	'PLAY' = 'play',
	'PAUSE' = 'pause',
	'ENDED' = 'Ended',
}
enum MEDIA_TYPE {
	'IFRAME' = 'IFRAME',
	'VIDEO' = 'VIDEO',
	'AUDIO' = 'AUDIO',
}
enum EVENT_TYPE {
	'PLAY' = 'Play',
	'ENDED' = 'Ended',
	'PAUSE' = 'Pause',
	'TIME_WATCHED' = 'TimeWatched',
}

export class MediaAutoTrack {
	private _mediaElement;
	private _provider;
	private _params;
	private _started;
	private _iframePlayer;
	private eventActionMapping = {
		[EVENT_TYPE.ENDED]: this.endedEventAction.bind(this),
		[EVENT_TYPE.PLAY]: this.playEventAction.bind(this),
		[EVENT_TYPE.PAUSE]: this.pauseEventAction.bind(this),
	};

	private _youTubeIframeLoader;

	constructor(params: RequestParams, provider) {
		const { eventData } = params;
		this._params = params;
		this._mediaElement = document.getElementById(
			eventData.properties['domElementId']
		);
		this._started = false;
		this._provider = provider;
		const mediaTrackFunMapping = {
			IFRAME: this._iframeMediaTracker,
			VIDEO: this._html5MediaTracker,
			AUDIO: this._html5MediaTracker,
		};

		mediaTrackFunMapping[this._mediaElement.tagName].bind(this)();

		this._initYoutubeFrame();
	}

	private _initYoutubeFrame() {
		this._youTubeIframeLoader = {
			src: 'https://www.youtube.com/iframe_api',
			loading: false,
			loaded: false,
			listeners: [],

			load(callback) {
				const _this = this;
				this.listeners.push(callback);

				if (this.loaded) {
					setTimeout(function() {
						_this.done();
					});
					return;
				}

				if (this.loading) {
					return;
				}

				this.loading = true;

				window['onYouTubeIframeAPIReady'] = function() {
					_this.loaded = true;
					_this.done();
				};

				const script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = this.src;
				document.body.appendChild(script);
			},

			done() {
				delete window['onYouTubeIframeAPIReady'];

				while (this.listeners.length) {
					this.listeners.pop()(window['YT']);
				}
			},
		};
	}

	private _iframeMediaTracker(): void {
		const that = this;
		setInterval(function() {
			if (that._started) {
				that.recordEvent(MEDIA_TYPE.IFRAME, EVENT_TYPE.TIME_WATCHED);
			}
		}, 3 * 1000);
		this._youTubeIframeLoader.load(function(YT) {
			that._iframePlayer = new YT.Player(that._mediaElement.id, {
				events: { onStateChange: that._onPlayerStateChange.bind(that) },
			});
		});
	}

	private _onPlayerStateChange(event): void {
		const iframeEventMapping = {
			0: EVENT_TYPE.ENDED,
			1: EVENT_TYPE.PLAY,
			2: EVENT_TYPE.PAUSE,
		};
		const eventType = iframeEventMapping[event.data];
		if (eventType) {
			this.eventActionMapping[eventType](MEDIA_TYPE.IFRAME);
		}
	}

	private _html5MediaTracker(): void {
		const that = this;
		setInterval(function() {
			if (that._started) {
				that.recordEvent(MEDIA_TYPE.VIDEO, EVENT_TYPE.TIME_WATCHED);
			}
		}, 3 * 1000);
		this._mediaElement.addEventListener(
			HTML5_MEDIA_EVENT.PLAY,
			() => {
				that.eventActionMapping[EVENT_TYPE.PLAY](MEDIA_TYPE.VIDEO);
			},
			false
		);
		this._mediaElement.addEventListener(
			HTML5_MEDIA_EVENT.PAUSE,
			() => {
				that.eventActionMapping[EVENT_TYPE.PAUSE](MEDIA_TYPE.VIDEO);
			},
			false
		);

		this._mediaElement.addEventListener(
			HTML5_MEDIA_EVENT.ENDED,
			() => {
				that.eventActionMapping[EVENT_TYPE.ENDED](MEDIA_TYPE.VIDEO);
			},
			false
		);
	}

	private playEventAction(mediaType) {
		this._started = true;
		this.recordEvent(mediaType, EVENT_TYPE.PLAY);
	}

	private pauseEventAction(mediaType) {
		this._started = false;
		this.recordEvent(mediaType, EVENT_TYPE.PAUSE);
	}

	private endedEventAction(mediaType) {
		this._started = false;
		this.recordEvent(mediaType, EVENT_TYPE.ENDED);
	}

	private recordEvent(mediaType: string, eventType: string): void {
		const newParams = Object.assign({}, this._params);
		const { eventData } = newParams;
		eventData.eventType = eventType;
		if (mediaType === MEDIA_TYPE.VIDEO) {
			eventData.properties.timestamp = this._mediaElement.currentTime;
			eventData.properties.duration = this._mediaElement.duration;
		} else {
			eventData.properties.timestamp = this._financial(
				this._iframePlayer.getCurrentTime()
			);
			eventData.properties.duration = this._financial(
				this._iframePlayer.getDuration()
			);
		}
		const percentage =
			parseFloat(eventData.properties.timestamp) /
			parseFloat(eventData.properties.duration);
		eventData.properties.eventValue = Number(percentage.toFixed(4));
		delete eventData.properties.domElementId;
		this._provider.putToBuffer(newParams);
	}

	private _financial(x) {
		return Number.parseFloat(x).toFixed(4);
	}
}

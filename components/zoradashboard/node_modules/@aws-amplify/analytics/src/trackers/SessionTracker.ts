/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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

// the session tracker for web

import { ConsoleLogger as Logger, Hub, JS, Constants } from '@aws-amplify/core';
import { SessionTrackOpts } from '../types';

const logger = new Logger('SessionTracker');

const defaultOpts: SessionTrackOpts = {
	enable: false,
	provider: 'AWSPinpoint',
};

let initialEventSent = false;

export class SessionTracker {
	private _tracker;
	private _hasEnabled;
	private _config: SessionTrackOpts;

	private _hidden;
	private _visibilityChange;

	constructor(tracker, opts) {
		this._config = Object.assign({}, defaultOpts, opts);
		this._tracker = tracker;

		this._hasEnabled = false;
		this._trackFunc = this._trackFunc.bind(this);
		this._trackBeforeUnload = this._trackBeforeUnload.bind(this);

		this.configure(this._config);
	}

	private _envCheck() {
		if (!JS.browserOrNode().isBrowser) {
			return false;
		}

		if (!document || !document.addEventListener) {
			logger.debug('not in the supported web environment');
			return false;
		}

		if (typeof document.hidden !== 'undefined') {
			this._hidden = 'hidden';
			this._visibilityChange = 'visibilitychange';
		} else if (typeof document['msHidden'] !== 'undefined') {
			this._hidden = 'msHidden';
			this._visibilityChange = 'msvisibilitychange';
		} else if (typeof document['webkitHidden'] !== 'undefined') {
			this._hidden = 'webkitHidden';
			this._visibilityChange = 'webkitvisibilitychange';
		} else {
			logger.debug('not in the supported web environment');
			return false;
		}
		return true;
	}

	private async _trackFunc() {
		const customAttrs =
			typeof this._config.attributes === 'function'
				? await this._config.attributes()
				: this._config.attributes;

		const attributes = Object.assign({}, customAttrs);

		if (document.visibilityState === this._hidden) {
			this._tracker(
				{
					name: '_session.stop',
					attributes,
				},
				this._config.provider
			).catch(e => {
				logger.debug('record session stop event failed.', e);
			});
		} else {
			this._tracker(
				{
					name: '_session.start',
					attributes,
				},
				this._config.provider
			).catch(e => {
				logger.debug('record session start event failed.', e);
			});
		}
	}

	private _trackBeforeUnload(event) {
		// before unload callback cannot be async => https://github.com/aws-amplify/amplify-js/issues/2088

		const customAttrs =
			typeof this._config.attributes === 'function'
				? Promise.resolve(this._config.attributes())
				: Promise.resolve(this._config.attributes);

		customAttrs.then(custom => {
			const attributes = Object.assign({}, custom);

			this._tracker(
				{
					name: '_session.stop',
					attributes,
					immediate: true,
				},
				this._config.provider
			).catch(e => {
				logger.debug('record session stop event failed.', e);
			});
		});
	}

	// to keep configure a synchronized function
	private async _sendInitialEvent() {
		if (initialEventSent) {
			logger.debug('the start session has been sent when the page is loaded');
			return;
		} else {
			initialEventSent = true;
		}

		const customAttrs =
			typeof this._config.attributes === 'function'
				? await this._config.attributes()
				: this._config.attributes;

		const attributes = Object.assign({}, customAttrs);

		this._tracker(
			{
				name: '_session.start',
				attributes,
			},
			this._config.provider
		).catch(e => {
			logger.debug('record session start event failed.', e);
		});
	}

	configure(opts?: SessionTrackOpts) {
		if (!this._envCheck()) {
			return this._config;
		}

		Object.assign(this._config, opts);
		if (this._config.enable && !this._hasEnabled) {
			// send a start session as soon as it's enabled
			this._sendInitialEvent();
			// listen on events
			document.addEventListener(this._visibilityChange, this._trackFunc, false);
			window.addEventListener('beforeunload', this._trackBeforeUnload, false);
			this._hasEnabled = true;
		} else if (!this._config.enable && this._hasEnabled) {
			document.removeEventListener(
				this._visibilityChange,
				this._trackFunc,
				false
			);
			window.removeEventListener(
				'beforeunload',
				this._trackBeforeUnload,
				false
			);
			this._hasEnabled = false;
		}

		return this._config;
	}
}

/**
 * @deprecated use named import
 */
export default SessionTracker;

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

import { pageViewTrackOpts } from '../types';
import { MethodEmbed } from '../utils/MethodEmbed';
import { ConsoleLogger as Logger, JS } from '@aws-amplify/core';

const logger = new Logger('PageViewTracker');
const PREV_URL_KEY = 'aws-amplify-analytics-prevUrl';

const getUrl = () => {
	if (!JS.browserOrNode().isBrowser) return '';
	else return window.location.origin + window.location.pathname;
};

const defaultOpts: pageViewTrackOpts = {
	enable: false,
	provider: 'AWSPinpoint',
	getUrl,
};

export class PageViewTracker {
	private _config: pageViewTrackOpts;
	private _tracker;
	private _hasEnabled;

	constructor(tracker, opts) {
		logger.debug('initialize pageview tracker with opts', opts);
		this._config = Object.assign({}, defaultOpts, opts);
		this._tracker = tracker;
		this._hasEnabled = false;
		this._trackFunc = this._trackFunc.bind(this);

		if (this._config.type === 'SPA') {
			this._pageViewTrackSPA();
		} else {
			this._pageViewTrackDefault();
		}
	}

	public configure(opts?: pageViewTrackOpts) {
		Object.assign(this._config, opts);

		// if spa, need to remove those listeners if disabled
		if (this._config.type === 'SPA') {
			this._pageViewTrackSPA();
		}

		return this._config;
	}

	private _isSameUrl() {
		const prevUrl = sessionStorage.getItem(PREV_URL_KEY);
		const curUrl = this._config.getUrl();

		if (prevUrl === curUrl) {
			logger.debug('the url is same');
			return true;
		} else return false;
	}

	private async _pageViewTrackDefault() {
		if (
			!JS.browserOrNode().isBrowser ||
			!window.addEventListener ||
			!window.sessionStorage
		) {
			logger.debug('not in the supported web enviroment');
			return;
		}
		const url = this._config.getUrl();
		const customAttrs =
			typeof this._config.attributes === 'function'
				? await this._config.attributes()
				: this._config.attributes;
		const attributes = Object.assign(
			{
				url,
			},
			customAttrs
		);

		if (this._config.enable && !this._isSameUrl()) {
			this._tracker(
				{
					name: this._config.eventName || 'pageView',
					attributes,
				},
				this._config.provider
			).catch(e => {
				logger.debug('Failed to record the page view event', e);
			});
			sessionStorage.setItem(PREV_URL_KEY, url);
		}
	}

	private async _trackFunc() {
		if (
			!JS.browserOrNode().isBrowser ||
			!window.addEventListener ||
			!history.pushState ||
			!window.sessionStorage
		) {
			logger.debug('not in the supported web enviroment');
			return;
		}

		const url = this._config.getUrl();
		const customAttrs =
			typeof this._config.attributes === 'function'
				? await this._config.attributes()
				: this._config.attributes;
		const attributes = Object.assign(
			{
				url,
			},
			customAttrs
		);

		if (!this._isSameUrl()) {
			this._tracker(
				{
					name: this._config.eventName || 'pageView',
					attributes,
				},
				this._config.provider
			).catch(e => {
				logger.debug('Failed to record the page view event', e);
			});
			sessionStorage.setItem(PREV_URL_KEY, url);
		}
	}

	private _pageViewTrackSPA() {
		if (
			!JS.browserOrNode().isBrowser ||
			!window.addEventListener ||
			!history.pushState
		) {
			logger.debug('not in the supported web enviroment');
			return;
		}

		if (this._config.enable && !this._hasEnabled) {
			MethodEmbed.add(history, 'pushState', this._trackFunc);
			MethodEmbed.add(history, 'replaceState', this._trackFunc);
			window.addEventListener('popstate', this._trackFunc);
			this._trackFunc();
			this._hasEnabled = true;
		} else {
			MethodEmbed.remove(history, 'pushState');
			MethodEmbed.remove(history, 'replaceState');
			window.removeEventListener('popstate', this._trackFunc);
			this._hasEnabled = false;
		}
	}
}

/**
 * @deprecated use named import
 */
export default PageViewTracker;

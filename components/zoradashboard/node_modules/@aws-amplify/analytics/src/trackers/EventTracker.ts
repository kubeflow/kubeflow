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

import { delegate } from '../vendor/dom-utils';
import { EventTrackOpts } from '../types';
import { ConsoleLogger as Logger, JS } from '@aws-amplify/core';

const logger = new Logger('EventTracker');

const defaultOpts: EventTrackOpts = {
	enable: false,
	events: ['click'],
	selectorPrefix: 'data-amplify-analytics-',
	provider: 'AWSPinpoint',
};

export class EventTracker {
	private _tracker;
	private _config: EventTrackOpts;
	private _delegates;

	constructor(tracker, opts) {
		if (!JS.browserOrNode().isBrowser || !window.addEventListener) {
			logger.debug('not in the supported web environment');
			return;
		}

		this._config = Object.assign({}, defaultOpts, opts);
		this._tracker = tracker;
		this._delegates = {};
		this._trackFunc = this._trackFunc.bind(this);

		logger.debug('initialize pageview tracker with opts', this._config);

		this.configure(this._config);
	}

	configure(opts?: EventTrackOpts) {
		Object.assign(this._config, opts);

		if (!this._config.enable) {
			Object.keys(this._delegates).forEach(key => {
				if (typeof this._delegates[key].destroy === 'function')
					this._delegates[key].destroy();
			});
			this._delegates = {};
		} else if (
			this._config.enable &&
			Object.keys(this._delegates).length === 0
		) {
			const selector = '[' + this._config.selectorPrefix + 'on]';
			this._config.events.forEach(evt => {
				this._delegates[evt] = delegate(
					document,
					evt,
					selector,
					this._trackFunc,
					{ composed: true, useCapture: true }
				);
			});
		}

		return this._config;
	}

	private async _trackFunc(event, element) {
		// the events specifed in 'amplify-analytics-on' selector
		const customAttrs = {};
		const events = element
			.getAttribute(this._config.selectorPrefix + 'on')
			.split(/\s*,\s*/);
		const eventName = element.getAttribute(
			this._config.selectorPrefix + 'name'
		);

		const attrs = element.getAttribute(this._config.selectorPrefix + 'attrs');
		if (attrs) {
			attrs.split(/\s*,\s*/).forEach(attr => {
				const tmp = attr.trim().split(/\s*:\s*/);
				customAttrs[tmp[0]] = tmp[1];
			});
		}

		const defaultAttrs =
			typeof this._config.attributes === 'function'
				? await this._config.attributes()
				: this._config.attributes;

		const attributes = Object.assign(
			{
				type: event.type,
				target: `${event.target.localName} with id ${event.target.id}`,
			},
			defaultAttrs,
			customAttrs
		);

		logger.debug('events needed to be recorded', events);
		logger.debug('attributes needed to be attached', customAttrs);
		if (events.indexOf(event.type) < 0) {
			logger.debug(`event ${event.type} is not selected to be recorded`);
			return;
		}

		this._tracker(
			{
				name: eventName || 'event',
				attributes,
			},
			this._config.provider
		).catch(e => {
			logger.debug(`Failed to record the ${event.type} event', ${e}`);
		});
	}
}

/**
 * @deprecated use named import
 */
export default EventTracker;

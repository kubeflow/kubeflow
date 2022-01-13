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

import {
	ConsoleLogger as Logger,
	Credentials,
	JS,
	getAmplifyUserAgent,
} from '@aws-amplify/core';
import {
	PersonalizeEventsClient,
	PutEventsCommand,
	PutEventsCommandInput,
} from '@aws-sdk/client-personalize-events';
import {
	SessionInfo,
	RequestParams,
	RecordEventPayload,
	SessionInfoManager,
	MediaAutoTrack,
} from './AmazonPersonalizeHelper';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { AnalyticsProvider } from '../types';

const logger = new Logger('AmazonPersonalizeProvider');

// events buffer
const FLUSH_SIZE = 5;
const FLUSH_SIZE_THRESHHOLD = 10;
const FLUSH_INTERVAL = 5 * 1000; // 5s

const IDENTIFY_EVENT = 'Identify';

export class AmazonPersonalizeProvider implements AnalyticsProvider {
	private _config;
	private _personalize;
	private _buffer;
	private _timer;
	private _sessionInfo: SessionInfo;
	private _sessionManager;
	private _isBrowser;

	constructor(config?) {
		this._buffer = [];
		this._config = config ? config : {};
		this._config.flushSize =
			this._config.flushSize > 0 &&
			this._config.flushSize <= FLUSH_SIZE_THRESHHOLD
				? this._config.flushSize
				: FLUSH_SIZE;
		this._config.flushInterval = this._config.flushInterval || FLUSH_INTERVAL;
		this._sessionManager = new SessionInfoManager();
		if (!isEmpty(this._config.trackingId)) {
			this._sessionInfo = this._sessionManager.retrieveSessionInfo(
				this._config.trackingId
			);
		}
		this._isBrowser = JS.browserOrNode().isBrowser;

		// flush event buffer
		this._setupTimer();
	}

	private _setupTimer() {
		if (this._timer) {
			clearInterval(this._timer);
		}
		const { flushInterval } = this._config;
		const that = this;
		this._timer = setInterval(() => {
			that._sendFromBuffer();
		}, flushInterval);
	}

	/**
	 * Record event
	 * @param eventType      - type of the event action. e.g. "Click"
	 * @param properties     - properties of the event
	 * @return Promise
	 */
	public async record(params): Promise<boolean> {
		const credentials = await this._getCredentials();
		if (!credentials) return Promise.resolve(false);

		Object.assign(params, {
			config: this._config,
			credentials,
			sentAt: new Date(),
		});
		const { eventType, properties } = params.event;

		if (eventType === IDENTIFY_EVENT) {
			this._sessionManager.updateSessionInfo(
				properties && properties.userId ? properties.userId : '',
				this._sessionInfo
			);
			return;
		} else if (!isEmpty(params.event.userId)) {
			this._sessionManager.updateSessionInfo(
				params.event.userId,
				this._sessionInfo
			);
		}
		const requestParams: RequestParams = this.generateRequestParams(
			params,
			this._sessionInfo
		);
		if (eventType === 'MediaAutoTrack') {
			if (this._isBrowser) {
				if (
					!isEmpty(
						get(requestParams, 'eventData.properties.domElementId', null)
					)
				) {
					const isLoaded = await this.isElementFullyLoaded(
						this.loadElement,
						requestParams.eventData.properties['domElementId'],
						500,
						5
					);
					if (isLoaded) {
						new MediaAutoTrack(requestParams, this);
					} else {
						logger.debug('Cannot find the media element.');
					}
				} else {
					logger.debug(
						"Missing domElementId field in 'properties' for MediaAutoTrack event type."
					);
				}
			} else {
				logger.debug('MediaAutoTrack only for browser');
			}
			return;
		}

		return this.putToBuffer(requestParams);
	}

	private loadElement(domId): Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (
				document.getElementById(domId) &&
				document.getElementById(domId).clientHeight
			) {
				return resolve(true);
			} else {
				return reject(true);
			}
		});
	}

	private isElementFullyLoaded(
		operation,
		params,
		delay,
		times
	): Promise<boolean> {
		const wait = ms => new Promise(r => setTimeout(r, ms));
		return new Promise((resolve, reject) => {
			return operation(params)
				.then(resolve)
				.catch(reason => {
					if (times - 1 > 0) {
						return wait(delay)
							.then(
								this.isElementFullyLoaded.bind(
									null,
									operation,
									params,
									delay,
									times - 1
								)
							)
							.then(resolve)
							.catch(reject);
					}
					return reject(reason);
				});
		});
	}

	/**
	 * get the category of the plugin
	 */
	public getCategory(): string {
		return 'Analytics';
	}

	/**
	 * get provider name of the plugin
	 */
	public getProviderName(): string {
		return 'AmazonPersonalize';
	}

	/**
	 * configure the plugin
	 * @param {Object} config - configuration
	 */
	public configure(config): object {
		logger.debug('configure Analytics', config);
		const conf = config ? config : {};
		this._config = Object.assign({}, this._config, conf);
		if (!isEmpty(this._config.trackingId)) {
			this._sessionInfo = this._sessionManager.retrieveSessionInfo(
				this._config.trackingId
			);
		}
		this._setupTimer();
		return this._config;
	}

	/**
	 * Generate the requestParams from customer input params and sessionInfo
	 * @private
	 * @param eventData      - customer input for event data
	 * @param api            - api name
	 * @return RequestParams - wrapper object with all information required for make request
	 */
	private generateRequestParams(params, sessionInfo): RequestParams {
		const requestParams = <RequestParams>{};
		const { eventType, properties } = params.event;
		requestParams.eventData = { eventType, properties };
		requestParams.sessionInfo = sessionInfo;
		requestParams.sentAt = params.sentAt;
		requestParams.credentials = params.credentials;
		requestParams.config = params.config;
		return requestParams;
	}

	/**
	 * record an event
	 * @param {Object} params - the params of an event
	 */
	private _sendEvents(group) {
		const groupLen = group.length;
		if (groupLen === 0) {
			logger.debug('events array is empty, directly return');
			return;
		}

		const { config, credentials, sessionInfo } = group[0];

		const initClients = this._init(config, credentials);
		if (!initClients) return false;
		if (groupLen > 0) {
			const events: RecordEventPayload[] = [];
			for (let i = 0; i < groupLen; i += 1) {
				const params: RequestParams = group.shift();
				const eventPayload: RecordEventPayload = this._generateSingleRecordPayload(
					params,
					sessionInfo
				);
				events.push(eventPayload);
			}
			const payload = <PutEventsCommandInput>{};
			payload.trackingId = sessionInfo.trackingId;
			payload.sessionId = sessionInfo.sessionId;
			payload.userId = sessionInfo.userId;
			payload.eventList = [];
			events.forEach(event => {
				// @ts-ignore
				payload.eventList.push(event);
			});
			const command: PutEventsCommand = new PutEventsCommand(payload);
			this._personalize.send(command, err => {
				if (err) logger.debug('Failed to call putEvents in Personalize', err);
				else logger.debug('Put events');
			});
		}
	}

	/**
	 * Put event into buffer
	 * @private
	 * @param params - params for the event recording
	 */
	private putToBuffer(params: RequestParams) {
		if (this._buffer.length < this._config.flushSize) {
			this._buffer.push(params);
		} else {
			this._buffer.push(params);
			this._sendFromBuffer();
		}
		return Promise.resolve(true);
	}

	/**
	 * flush the buffer and batch sending the request
	 * @private
	 * @param eventsParams - the buffer for cache the payload
	 */
	private _sendFromBuffer() {
		const size = this._buffer.length;
		if (size <= 0) return;
		const eventsGroups = [];
		let preCred = null;
		let group = [];
		for (let i = 0; i < size; i += 1) {
			const currRequestParams: RequestParams = this._buffer.shift();
			const cred = currRequestParams.credentials;
			const sessionInfo = currRequestParams.sessionInfo;
			if (i === 0) {
				group.push(currRequestParams);
				preCred = cred;
			} else {
				if (
					isEqual(sessionInfo, this._sessionInfo) &&
					cred.sessionToken === preCred.sessionToken &&
					cred.identityId === preCred.identityId
				) {
					logger.debug('no change for cred, put event in the same group');
					group.push(currRequestParams);
				} else {
					eventsGroups.push(group);
					group = [];
					group.push(currRequestParams);
					preCred = cred;
					this._sessionInfo = sessionInfo;
				}
			}
		}
		eventsGroups.push(group);

		eventsGroups.map(group => {
			this._sendEvents(group);
		});
	}

	/**
	 * Generate the record payload for single event
	 * @private
	 * @param params - RequestParams
	 */
	private _generateSingleRecordPayload(
		params: RequestParams,
		sessionInfo
	): RecordEventPayload {
		const { eventData, sentAt } = params;
		const trackPayload = <RecordEventPayload>{};
		trackPayload.sentAt = sentAt;
		trackPayload.properties =
			eventData.properties && JSON.stringify(eventData.properties);
		trackPayload.eventId =
			this._sessionManager.getTimerKey() + sessionInfo.sessionId;
		trackPayload.eventType = eventData.eventType;
		return trackPayload;
	}

	/**
	 * Initialize the personalize client
	 * @private
	 * @param params - RequestParams
	 */
	private _init(config, credentials) {
		logger.debug('init clients');

		if (
			this._personalize &&
			this._config.credentials &&
			this._config.credentials.sessionToken === credentials.sessionToken &&
			this._config.credentials.identityId === credentials.identityId
		) {
			logger.debug('no change for analytics config, directly return from init');
			return true;
		}

		this._config.credentials = credentials;
		const { region } = config;
		logger.debug('initialize personalize with credentials', credentials);
		this._personalize = new PersonalizeEventsClient({
			region,
			credentials,
			customUserAgent: getAmplifyUserAgent(),
		});
		return true;
	}

	/**
	 * check if current credentials exists
	 * @private
	 */
	private _getCredentials() {
		const that = this;
		return Credentials.get()
			.then(credentials => {
				if (!credentials) return null;
				logger.debug('set credentials for analytics', that._config.credentials);
				return Credentials.shear(credentials);
			})
			.catch(err => {
				logger.debug('ensure credentials error', err);
				return null;
			});
	}
}

/**
 * @deprecated use named import
 */
export default AmazonPersonalizeProvider;

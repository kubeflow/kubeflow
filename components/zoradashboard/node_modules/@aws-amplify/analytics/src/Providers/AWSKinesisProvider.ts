/*
 * Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
	getAmplifyUserAgent,
} from '@aws-amplify/core';
import { KinesisClient, PutRecordsCommand } from '@aws-sdk/client-kinesis';
import { AnalyticsProvider } from '../types';
import { fromUtf8 } from '@aws-sdk/util-utf8-browser';

const logger = new Logger('AWSKinesisProvider');

// events buffer
const BUFFER_SIZE = 1000;
const FLUSH_SIZE = 100;
const FLUSH_INTERVAL = 5 * 1000; // 5s
const RESEND_LIMIT = 5;

export class AWSKinesisProvider implements AnalyticsProvider {
	protected _config;
	private _kinesis;
	private _buffer;
	private _timer;

	constructor(config?) {
		this._buffer = [];
		this._config = config || {};
		this._config.bufferSize = this._config.bufferSize || BUFFER_SIZE;
		this._config.flushSize = this._config.flushSize || FLUSH_SIZE;
		this._config.flushInterval = this._config.flushInterval || FLUSH_INTERVAL;
		this._config.resendLimit = this._config.resendLimit || RESEND_LIMIT;

		this._setupTimer();
	}

	private _setupTimer() {
		if (this._timer) {
			clearInterval(this._timer);
		}
		const { flushSize, flushInterval } = this._config;
		this._timer = setInterval(() => {
			const size =
				this._buffer.length < flushSize ? this._buffer.length : flushSize;
			const events = [];
			for (let i = 0; i < size; i += 1) {
				const params = this._buffer.shift();
				events.push(params);
			}
			this._sendFromBuffer(events);
		}, flushInterval);
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
		return 'AWSKinesis';
	}

	/**
	 * configure the plugin
	 * @param {Object} config - configuration
	 */
	public configure(config): object {
		logger.debug('configure Analytics', config);
		const conf = config || {};
		this._config = Object.assign({}, this._config, conf);

		this._setupTimer();
		return this._config;
	}

	/**
	 * record an event
	 * @param {Object} params - the params of an event
	 */
	public async record(params): Promise<boolean> {
		const credentials = await this._getCredentials();
		if (!credentials) return Promise.resolve(false);

		Object.assign(params, { config: this._config, credentials });

		return this._putToBuffer(params);
	}

	public updateEndpoint() {
		logger.debug('updateEndpoint is not implemented in Kinesis provider');
		return Promise.resolve(true);
	}

	/**
	 * @private
	 * @param params - params for the event recording
	 * Put events into buffer
	 */
	private _putToBuffer(params) {
		if (this._buffer.length < BUFFER_SIZE) {
			this._buffer.push(params);
			return Promise.resolve(true);
		} else {
			logger.debug('exceed analytics events buffer size');
			return Promise.reject(false);
		}
	}

	private _sendFromBuffer(events) {
		// collapse events by credentials
		// events = [ {params} ]
		const eventsGroups = [];
		let preCred = null;
		let group = [];
		for (let i = 0; i < events.length; i += 1) {
			const cred = events[i].credentials;
			if (i === 0) {
				group.push(events[i]);
				preCred = cred;
			} else {
				if (
					cred.sessionToken === preCred.sessionToken &&
					cred.identityId === preCred.identityId
				) {
					logger.debug('no change for cred, put event in the same group');
					group.push(events[i]);
				} else {
					eventsGroups.push(group);
					group = [];
					group.push(events[i]);
					preCred = cred;
				}
			}
		}
		eventsGroups.push(group);

		eventsGroups.map(evts => {
			this._sendEvents(evts);
		});
	}

	protected _sendEvents(group) {
		if (group.length === 0) {
			return;
		}

		const { config, credentials } = group[0];

		const initClients = this._init(config, credentials);
		if (!initClients) return false;

		const records = {};

		group.map(params => {
			// spit by streamName
			const evt = params.event;
			const { streamName } = evt;
			if (records[streamName] === undefined) {
				records[streamName] = [];
			}

			const bufferData =
				evt.data && typeof evt.data !== 'string'
					? JSON.stringify(evt.data)
					: evt.data;
			const Data = fromUtf8(bufferData);
			const PartitionKey =
				evt.partitionKey || 'partition-' + credentials.identityId;
			const record = { Data, PartitionKey };
			records[streamName].push(record);
		});

		Object.keys(records).map(async streamName => {
			logger.debug(
				'putting records to kinesis with records',
				records[streamName]
			);
			try {
				const command: PutRecordsCommand = new PutRecordsCommand({
					Records: records[streamName],
					StreamName: streamName,
				});
				await this._kinesis.send(command);
				logger.debug('Upload records to stream', streamName);
			} catch (err) {
				logger.debug('Failed to upload records to Kinesis', err);
			}
		});
	}

	protected _init(config, credentials) {
		logger.debug('init clients');

		if (
			this._kinesis &&
			this._config.credentials &&
			this._config.credentials.sessionToken === credentials.sessionToken &&
			this._config.credentials.identityId === credentials.identityId
		) {
			logger.debug('no change for analytics config, directly return from init');
			return true;
		}

		this._config.credentials = credentials;
		const { region, endpoint } = config;

		return this._initKinesis(region, endpoint, credentials);
	}

	private _initKinesis(region, endpoint, credentials) {
		logger.debug('initialize kinesis with credentials', credentials);
		this._kinesis = new KinesisClient({
			region,
			credentials,
			customUserAgent: getAmplifyUserAgent(),
			endpoint,
		});
		return true;
	}

	/**
	 * @private
	 * check if current credentials exists
	 */
	private _getCredentials() {
		return Credentials.get()
			.then(credentials => {
				if (!credentials) return null;
				logger.debug('set credentials for analytics', this._config.credentials);
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
export default AWSKinesisProvider;

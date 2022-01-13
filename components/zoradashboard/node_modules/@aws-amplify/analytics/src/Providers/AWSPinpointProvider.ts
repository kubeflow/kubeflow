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

import {
	ConsoleLogger as Logger,
	ClientDevice,
	Credentials,
	Signer,
	JS,
	Hub,
	getAmplifyUserAgent,
} from '@aws-amplify/core';
import {
	EventsBatch,
	PinpointClient,
	PutEventsCommand,
	PutEventsCommandInput,
	UpdateEndpointCommand,
} from '@aws-sdk/client-pinpoint';
import Cache from '@aws-amplify/cache';

import {
	AnalyticsProvider,
	PromiseHandlers,
	EndpointBuffer,
	EventParams,
	EventObject,
	EndpointFailureData,
} from '../types';
import { v1 as uuid } from 'uuid';
import EventsBuffer from './EventBuffer';

const AMPLIFY_SYMBOL = (typeof Symbol !== 'undefined' &&
typeof Symbol.for === 'function'
	? Symbol.for('amplify_default')
	: '@@amplify_default') as Symbol;

const dispatchAnalyticsEvent = (event, data) => {
	Hub.dispatch('analytics', { event, data }, 'Analytics', AMPLIFY_SYMBOL);
};

const logger = new Logger('AWSPinpointProvider');
const RETRYABLE_CODES = [429, 500];
const ACCEPTED_CODES = [202];
const FORBIDDEN_CODE = 403;
const MOBILE_SERVICE_NAME = 'mobiletargeting';
const EXPIRED_TOKEN_CODE = 'ExpiredTokenException';
const UPDATE_ENDPOINT = '_update_endpoint';
const SESSION_START = '_session.start';
const SESSION_STOP = '_session.stop';

const BEACON_SUPPORTED =
	typeof navigator !== 'undefined' &&
	navigator &&
	typeof navigator.sendBeacon === 'function';

// events buffer
const BUFFER_SIZE = 1000;
const FLUSH_SIZE = 100;
const FLUSH_INTERVAL = 5 * 1000; // 5s
const RESEND_LIMIT = 5;

// params: { event: {name: , .... }, timeStamp, config, resendLimits }
export class AWSPinpointProvider implements AnalyticsProvider {
	static category = 'Analytics';
	static providerName = 'AWSPinpoint';

	private _config;
	private pinpointClient;
	private _sessionId;
	private _sessionStartTimestamp;
	private _buffer: EventsBuffer;
	private _endpointBuffer: EndpointBuffer;
	private _clientInfo;
	private _endpointGenerating = true;
	private _endpointUpdateInProgress = false;

	constructor(config?) {
		this._buffer = null;
		this._endpointBuffer = [];
		this._config = config ? config : {};
		this._config.bufferSize = this._config.bufferSize || BUFFER_SIZE;
		this._config.flushSize = this._config.flushSize || FLUSH_SIZE;
		this._config.flushInterval = this._config.flushInterval || FLUSH_INTERVAL;
		this._config.resendLimit = this._config.resendLimit || RESEND_LIMIT;
		this._clientInfo = ClientDevice.clientInfo();
	}

	/**
	 * get the category of the plugin
	 */
	getCategory(): string {
		return AWSPinpointProvider.category;
	}

	/**
	 * get provider name of the plugin
	 */
	getProviderName(): string {
		return AWSPinpointProvider.providerName;
	}

	/**
	 * configure the plugin
	 * @param {Object} config - configuration
	 */
	public configure(config): object {
		logger.debug('configure Analytics', config);
		const conf = config || {};
		this._config = Object.assign({}, this._config, conf);

		// If autoSessionRecord is enabled, we need to wait for the endpoint to be
		// updated before sending any events. See `sendEvents` in `Analytics.ts`
		this._endpointGenerating = !!config['autoSessionRecord'];

		if (this._config.appId && !this._config.disabled) {
			if (!this._config.endpointId) {
				const cacheKey = this.getProviderName() + '_' + this._config.appId;
				this._getEndpointId(cacheKey)
					.then(endpointId => {
						logger.debug('setting endpoint id from the cache', endpointId);
						this._config.endpointId = endpointId;
						dispatchAnalyticsEvent('pinpointProvider_configured', null);
					})
					.catch(err => {
						logger.debug('Failed to generate endpointId', err);
					});
			} else {
				dispatchAnalyticsEvent('pinpointProvider_configured', null);
			}
		} else {
			this._flushBuffer();
		}
		return this._config;
	}

	/**
	 * record an event
	 * @param {Object} params - the params of an event
	 */
	public async record(params: EventParams, handlers: PromiseHandlers) {
		logger.debug('_public record', params);
		const credentials = await this._getCredentials();
		if (!credentials || !this._config.appId || !this._config.region) {
			logger.debug(
				'cannot send events without credentials, applicationId or region'
			);
			return handlers.reject(
				new Error('No credentials, applicationId or region')
			);
		}

		this._initClients(credentials);

		const timestamp = new Date().getTime();
		// attach the session and eventId
		this._generateSession(params);
		params.event.eventId = uuid();

		Object.assign(params, { timestamp, config: this._config });

		if (params.event.immediate) {
			return this._send(params, handlers);
		} else {
			this._putToBuffer(params, handlers);
		}
	}

	private async _sendEndpointUpdate(endpointObject: EventObject) {
		if (this._endpointUpdateInProgress) {
			this._endpointBuffer.push(endpointObject);
			return;
		}

		this._endpointUpdateInProgress = true;
		await this._updateEndpoint(endpointObject);

		const next = this._endpointBuffer.shift();
		this._endpointUpdateInProgress = false;

		next && this._sendEndpointUpdate(next);
	}

	/**
	 * @private
	 * @param params - params for event recording
	 * Put events into buffer
	 */
	private _putToBuffer(params, handlers) {
		if (params.event.name === UPDATE_ENDPOINT) {
			this._sendEndpointUpdate({ params, handlers });
			return;
		}

		this._buffer && this._buffer.push({ params, handlers });
	}

	private _generateSession(params) {
		this._sessionId = this._sessionId || uuid();
		const { event } = params;

		switch (event.name) {
			case SESSION_START:
				// refresh the session id and session start time
				this._sessionStartTimestamp = new Date().getTime();
				this._sessionId = uuid();
				event.session = {
					Id: this._sessionId,
					StartTimestamp: new Date(this._sessionStartTimestamp).toISOString(),
				};
				break;
			case SESSION_STOP:
				const stopTimestamp = new Date().getTime();
				this._sessionStartTimestamp =
					this._sessionStartTimestamp || new Date().getTime();
				this._sessionId = this._sessionId || uuid();
				event.session = {
					Id: this._sessionId,
					Duration: stopTimestamp - this._sessionStartTimestamp,
					StartTimestamp: new Date(this._sessionStartTimestamp).toISOString(),
					StopTimestamp: new Date(stopTimestamp).toISOString(),
				};
				this._sessionId = undefined;
				this._sessionStartTimestamp = undefined;
				break;
			default:
				this._sessionStartTimestamp =
					this._sessionStartTimestamp || new Date().getTime();
				this._sessionId = this._sessionId || uuid();
				event.session = {
					Id: this._sessionId,
					StartTimestamp: new Date(this._sessionStartTimestamp).toISOString(),
				};
		}
	}

	private async _send(params, handlers) {
		const { event } = params;

		switch (event.name) {
			case UPDATE_ENDPOINT:
				return this._updateEndpoint({ params, handlers });
			case SESSION_STOP:
				return this._pinpointSendStopSession(params, handlers);
			default:
				return this._pinpointPutEvents(params, handlers);
		}
	}

	private _generateBatchItemContext(params) {
		const { event, timestamp, config } = params;
		const { name, attributes, metrics, eventId, session } = event;
		const { appId, endpointId } = config;

		const endpointContext = {};

		const eventParams: PutEventsCommandInput = {
			ApplicationId: appId,
			EventsRequest: {
				BatchItem: {},
			},
		};

		const endpointObj: EventsBatch = {} as EventsBatch;
		endpointObj.Endpoint = endpointContext;
		endpointObj.Events = {
			[eventId]: {
				EventType: name,
				Timestamp: new Date(timestamp).toISOString(),
				Attributes: attributes,
				Metrics: metrics,
				Session: session,
			},
		};
		eventParams.EventsRequest.BatchItem[endpointId] = endpointObj;

		return eventParams;
	}

	private async _pinpointPutEvents(params, handlers) {
		const {
			event: { eventId },
			config: { endpointId },
		} = params;
		const eventParams = this._generateBatchItemContext(params);
		const command: PutEventsCommand = new PutEventsCommand(eventParams);

		try {
			const data = await this.pinpointClient.send(command);
			const {
				EventsResponse: {
					Results: {
						[endpointId]: {
							EventsItemResponse: {
								[eventId]: { StatusCode, Message },
							},
						},
					},
				},
			} = data;
			if (ACCEPTED_CODES.includes(StatusCode)) {
				logger.debug('record event success. ', data);
				return handlers.resolve(data);
			} else {
				if (RETRYABLE_CODES.includes(StatusCode)) {
					this._retry(params, handlers);
				} else {
					logger.error(
						`Event ${eventId} is not accepted, the error is ${Message}`
					);
					return handlers.reject(data);
				}
			}
		} catch (err) {
			this._eventError(err);
			return handlers.reject(err);
		}
	}

	private _pinpointSendStopSession(params, handlers): Promise<string> {
		if (!BEACON_SUPPORTED) {
			this._pinpointPutEvents(params, handlers);
			return;
		}

		const eventParams = this._generateBatchItemContext(params);

		const { region } = this._config;
		const { ApplicationId, EventsRequest } = eventParams;

		const accessInfo = {
			secret_key: this._config.credentials.secretAccessKey,
			access_key: this._config.credentials.accessKeyId,
			session_token: this._config.credentials.sessionToken,
		};

		const url = `https://pinpoint.${region}.amazonaws.com/v1/apps/${ApplicationId}/events/legacy`;
		const body = JSON.stringify(EventsRequest);
		const method = 'POST';

		const request = {
			url,
			body,
			method,
		};

		const serviceInfo = { region, service: MOBILE_SERVICE_NAME };

		const requestUrl: string = Signer.signUrl(
			request,
			accessInfo,
			serviceInfo,
			null
		);

		const success: boolean = navigator.sendBeacon(requestUrl, body);

		if (success) {
			return handlers.resolve('sendBeacon success');
		}
		return handlers.reject('sendBeacon failure');
	}

	private _retry(params, handlers) {
		const {
			config: { resendLimit },
		} = params;
		// For backward compatibility
		params.resendLimit =
			typeof params.resendLimit === 'number' ? params.resendLimit : resendLimit;
		if (params.resendLimit-- > 0) {
			logger.debug(
				`resending event ${params.eventName} with ${params.resendLimit} retry times left`
			);
			this._pinpointPutEvents(params, handlers);
		} else {
			logger.debug(`retry times used up for event ${params.eventName}`);
		}
	}

	private async _updateEndpoint(endpointObject: EventObject) {
		const { params, handlers } = endpointObject;
		const { config, event } = params;
		const { appId, endpointId } = config;

		const request = this._endpointRequest(
			config,
			JS.transferKeyToLowerCase(
				event,
				[],
				['attributes', 'userAttributes', 'Attributes', 'UserAttributes']
			)
		);
		const update_params = {
			ApplicationId: appId,
			EndpointId: endpointId,
			EndpointRequest: request,
		};

		try {
			const command: UpdateEndpointCommand = new UpdateEndpointCommand(
				update_params
			);
			const data = await this.pinpointClient.send(command);

			logger.debug('updateEndpoint success', data);
			this._endpointGenerating = false;
			this._resumeBuffer();

			handlers.resolve(data);
			return;
		} catch (err) {
			const failureData: EndpointFailureData = {
				err,
				update_params,
				endpointObject,
			};

			return this._handleEndpointUpdateFailure(failureData);
		}
	}

	private async _handleEndpointUpdateFailure(failureData: EndpointFailureData) {
		const { err, endpointObject } = failureData;
		const statusCode = err.$metadata && err.$metadata.httpStatusCode;

		logger.debug('updateEndpoint error', err);

		switch (statusCode) {
			case FORBIDDEN_CODE:
				return this._handleEndpointUpdateForbidden(failureData);
			default:
				if (RETRYABLE_CODES.includes(statusCode)) {
					// Server error. Attempt exponential retry
					const exponential = true;
					return this._retryEndpointUpdate(endpointObject, exponential);
				}
				logger.error('updateEndpoint failed', err);
				endpointObject.handlers.reject(err);
		}
	}

	private _handleEndpointUpdateForbidden(failureData: EndpointFailureData) {
		const { err, endpointObject } = failureData;

		const { code, retryable } = err;

		if (code !== EXPIRED_TOKEN_CODE && !retryable) {
			return endpointObject.handlers.reject(err);
		}

		this._retryEndpointUpdate(endpointObject);
	}

	private _retryEndpointUpdate(
		endpointObject: EventObject,
		exponential: boolean = false
	) {
		logger.debug('_retryEndpointUpdate', endpointObject);
		const { params } = endpointObject;

		// TODO: implement retry with exp back off once exp function is available
		const {
			config: { resendLimit },
		} = params;

		params.resendLimit =
			typeof params.resendLimit === 'number' ? params.resendLimit : resendLimit;

		if (params.resendLimit-- > 0) {
			logger.debug(
				`resending endpoint update ${params.event.eventId} with ${params.resendLimit} retry attempts remaining`
			);
			// insert at the front of endpointBuffer
			this._endpointBuffer.length
				? this._endpointBuffer.unshift(endpointObject)
				: this._updateEndpoint(endpointObject);
			return;
		}

		logger.warn(
			`resending endpoint update ${params.event.eventId} failed after ${params.config.resendLimit} attempts`
		);

		if (this._endpointGenerating) {
			logger.error('Initial endpoint update failed. ');
		}
	}

	/**
	 * @private
	 * @param config
	 * Init the clients
	 */
	private async _initClients(credentials) {
		logger.debug('init clients');

		if (
			this.pinpointClient &&
			this._config.credentials &&
			this._config.credentials.sessionToken === credentials.sessionToken &&
			this._config.credentials.identityId === credentials.identityId
		) {
			logger.debug('no change for aws credentials, directly return from init');
			return;
		}

		const identityId = this._config.credentials
			? this._config.credentials.identityId
			: null;

		this._config.credentials = credentials;
		const { region } = this._config;
		logger.debug('init clients with credentials', credentials);
		this.pinpointClient = new PinpointClient({
			region,
			credentials,
			customUserAgent: getAmplifyUserAgent(),
		});

		// TODO: remove this middleware once a long term fix is implemented by aws-sdk-js team.
		this.pinpointClient.middlewareStack.addRelativeTo(
			next => args => {
				delete args.request.headers['amz-sdk-invocation-id'];
				delete args.request.headers['amz-sdk-request'];
				return next(args);
			},
			{
				step: 'finalizeRequest',
				relation: 'after',
				toMiddleware: 'retryMiddleware',
			}
		);

		if (this._bufferExists() && identityId === credentials.identityId) {
			// if the identity has remained the same, pass the updated client to the buffer
			this._updateBufferClient();
		} else {
			// otherwise flush the buffer and instantiate a new one
			// this will cause the old buffer to send any remaining events
			// with the old credentials and then stop looping and shortly thereafter get picked up by GC
			this._initBuffer();
		}

		this._customizePinpointClientReq();
	}

	private _bufferExists() {
		return this._buffer && this._buffer instanceof EventsBuffer;
	}

	private _initBuffer() {
		if (this._bufferExists()) {
			this._flushBuffer();
		}

		this._buffer = new EventsBuffer(this.pinpointClient, this._config);

		// if the first endpoint update hasn't yet resolved pause the buffer to
		// prevent race conditions. It will be resumed as soon as that request succeeds
		if (this._endpointGenerating) {
			this._buffer.pause();
		}
	}

	private _updateBufferClient() {
		if (this._bufferExists()) {
			this._buffer.updateClient(this.pinpointClient);
		}
	}

	private _flushBuffer() {
		if (this._bufferExists()) {
			this._buffer.flush();
			this._buffer = null;
		}
	}

	private _resumeBuffer() {
		if (this._bufferExists()) {
			this._buffer.resume();
		}
	}

	private _customizePinpointClientReq() {
		// TODO FIXME: Find a middleware to do this with AWS V3 SDK
		// if (Platform.isReactNative) {
		// 	this.pinpointClient.customizeRequests(request => {
		// 		request.on('build', req => {
		// 			req.httpRequest.headers['user-agent'] = Platform.userAgent;
		// 		});
		// 	});
		// }
	}

	private async _getEndpointId(cacheKey) {
		// try to get from cache
		let endpointId = await Cache.getItem(cacheKey);
		logger.debug(
			'endpointId from cache',
			endpointId,
			'type',
			typeof endpointId
		);
		if (!endpointId) {
			endpointId = uuid();
			Cache.setItem(cacheKey, endpointId);
		}
		return endpointId;
	}

	/**
	 * EndPoint request
	 * @return {Object} - The request of updating endpoint
	 */
	private _endpointRequest(config, event) {
		const { credentials } = config;
		const clientInfo = this._clientInfo || {};
		const clientContext = config.clientContext || {};
		// for now we have three different ways for default endpoint configurations
		// clientInfo
		// clientContext (deprecated)
		// config.endpoint
		const defaultEndpointConfig = config.endpoint || {};
		const demographicByClientInfo = {
			appVersion: clientInfo.appVersion,
			make: clientInfo.make,
			model: clientInfo.model,
			modelVersion: clientInfo.version,
			platform: clientInfo.platform,
		};
		// for backward compatibility
		const {
			clientId,
			appTitle,
			appVersionName,
			appVersionCode,
			appPackageName,
			...demographicByClientContext
		} = clientContext;
		const channelType = event.address
			? clientInfo.platform === 'android'
				? 'GCM'
				: 'APNS'
			: undefined;
		const tmp = {
			channelType,
			requestId: uuid(),
			effectiveDate: new Date().toISOString(),
			...defaultEndpointConfig,
			...event,
			attributes: {
				...defaultEndpointConfig.attributes,
				...event.attributes,
			},
			demographic: {
				...demographicByClientInfo,
				...demographicByClientContext,
				...defaultEndpointConfig.demographic,
				...event.demographic,
			},
			location: {
				...defaultEndpointConfig.location,
				...event.location,
			},
			metrics: {
				...defaultEndpointConfig.metrics,
				...event.metrics,
			},
			user: {
				userId:
					event.userId ||
					defaultEndpointConfig.userId ||
					credentials.identityId,
				userAttributes: {
					...defaultEndpointConfig.userAttributes,
					...event.userAttributes,
				},
			},
		};

		// eliminate unnecessary params
		const {
			userId,
			userAttributes,
			name,
			session,
			eventId,
			immediate,
			...ret
		} = tmp;
		return JS.transferKeyToUpperCase(
			ret,
			[],
			['metrics', 'userAttributes', 'attributes']
		);
	}

	private _eventError(err: any) {
		logger.error('record event failed.', err);
		logger.warn(
			`Please ensure you have updated your Pinpoint IAM Policy ` +
				`with the Action: "mobiletargeting:PutEvents" ` +
				`in order to record events`
		);
	}

	private async _getCredentials() {
		try {
			const credentials = await Credentials.get();
			if (!credentials) return null;

			logger.debug('set credentials for analytics', credentials);
			return Credentials.shear(credentials);
		} catch (err) {
			logger.debug('ensure credentials error', err);
			return null;
		}
	}
}

/**
 * @deprecated use named import
 */
export default AWSPinpointProvider;

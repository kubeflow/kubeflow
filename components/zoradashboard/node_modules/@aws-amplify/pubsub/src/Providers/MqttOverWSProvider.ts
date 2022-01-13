/*
 * Copyright 2017-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
import * as Paho from 'paho-mqtt';
import { v4 as uuid } from 'uuid';
import Observable from 'zen-observable-ts';

import { AbstractPubSubProvider } from './PubSubProvider';
import { ProvidertOptions, SubscriptionObserver } from '../types';
import { ConsoleLogger as Logger } from '@aws-amplify/core';

const logger = new Logger('MqttOverWSProvider');

export function mqttTopicMatch(filter: string, topic: string) {
	const filterArray = filter.split('/');
	const length = filterArray.length;
	const topicArray = topic.split('/');

	for (let i = 0; i < length; ++i) {
		const left = filterArray[i];
		const right = topicArray[i];
		if (left === '#') return topicArray.length >= length;
		if (left !== '+' && left !== right) return false;
	}
	return length === topicArray.length;
}

export interface MqttProvidertOptions extends ProvidertOptions {
	clientId?: string;
	url?: string;
}

class ClientsQueue {
	private promises: Map<string, Promise<any>> = new Map();

	async get(clientId: string, clientFactory: (string) => Promise<any>) {
		let promise = this.promises.get(clientId);
		if (promise) {
			return promise;
		}

		promise = clientFactory(clientId);

		this.promises.set(clientId, promise);

		return promise;
	}

	get allClients() {
		return Array.from(this.promises.keys());
	}

	remove(clientId) {
		this.promises.delete(clientId);
	}
}

const topicSymbol = typeof Symbol !== 'undefined' ? Symbol('topic') : '@@topic';

export class MqttOverWSProvider extends AbstractPubSubProvider {
	private _clientsQueue = new ClientsQueue();

	constructor(options: MqttProvidertOptions = {}) {
		super({ ...options, clientId: options.clientId || uuid() });
	}

	protected get clientId() {
		return this.options.clientId;
	}

	protected get endpoint() {
		return this.options.aws_pubsub_endpoint;
	}

	protected get clientsQueue() {
		return this._clientsQueue;
	}

	protected get isSSLEnabled() {
		return !this.options
			.aws_appsync_dangerously_connect_to_http_endpoint_for_testing;
	}

	protected getTopicForValue(value) {
		return typeof value === 'object' && value[topicSymbol];
	}

	getProviderName() {
		return 'MqttOverWSProvider';
	}

	public onDisconnect({ clientId, errorCode, ...args }) {
		if (errorCode !== 0) {
			logger.warn(clientId, JSON.stringify({ errorCode, ...args }, null, 2));

			const topicsToDelete = [];
			const clientIdObservers = this._clientIdObservers.get(clientId);
			if (!clientIdObservers) {
				return;
			}
			clientIdObservers.forEach(observer => {
				observer.error('Disconnected, error code: ' + errorCode);
				// removing observers for disconnected clientId
				this._topicObservers.forEach((observerForTopic, observerTopic) => {
					observerForTopic.delete(observer);
					if (observerForTopic.size === 0) {
						topicsToDelete.push(observerTopic);
					}
				});
			});

			// forgiving any trace of clientId
			this._clientIdObservers.delete(clientId);

			// Removing topics that are not listen by an observer
			topicsToDelete.forEach(topic => {
				this._topicObservers.delete(topic);
			});
		}
	}

	public async newClient({
		url,
		clientId,
	}: MqttProvidertOptions): Promise<any> {
		logger.debug('Creating new MQTT client', clientId);

		// @ts-ignore
		const client = new Paho.Client(url, clientId);
		// client.trace = (args) => logger.debug(clientId, JSON.stringify(args, null, 2));
		client.onMessageArrived = ({
			destinationName: topic,
			payloadString: msg,
		}) => {
			this._onMessage(topic, msg);
		};
		client.onConnectionLost = ({ errorCode, ...args }) => {
			this.onDisconnect({ clientId, errorCode, ...args });
		};

		await new Promise((resolve, reject) => {
			client.connect({
				useSSL: this.isSSLEnabled,
				mqttVersion: 3,
				onSuccess: () => resolve(client),
				onFailure: reject,
			});
		});

		return client;
	}

	protected async connect(
		clientId: string,
		options: MqttProvidertOptions = {}
	): Promise<any> {
		return await this.clientsQueue.get(clientId, clientId =>
			this.newClient({ ...options, clientId })
		);
	}

	protected async disconnect(clientId: string): Promise<void> {
		const client = await this.clientsQueue.get(clientId, () => null);

		if (client && client.isConnected()) {
			client.disconnect();
		}
		this.clientsQueue.remove(clientId);
	}

	async publish(topics: string[] | string, msg: any) {
		const targetTopics = ([] as string[]).concat(topics);
		const message = JSON.stringify(msg);

		const url = await this.endpoint;

		const client = await this.connect(this.clientId, { url });

		logger.debug('Publishing to topic(s)', targetTopics.join(','), message);
		targetTopics.forEach(topic => client.send(topic, message));
	}

	protected _topicObservers: Map<
		string,
		Set<SubscriptionObserver<any>>
	> = new Map();

	protected _clientIdObservers: Map<
		string,
		Set<SubscriptionObserver<any>>
	> = new Map();

	private _onMessage(topic: string, msg: any) {
		try {
			const matchedTopicObservers = [];
			this._topicObservers.forEach((observerForTopic, observerTopic) => {
				if (mqttTopicMatch(observerTopic, topic)) {
					matchedTopicObservers.push(observerForTopic);
				}
			});
			const parsedMessage = JSON.parse(msg);

			if (typeof parsedMessage === 'object') {
				parsedMessage[topicSymbol] = topic;
			}

			matchedTopicObservers.forEach(observersForTopic => {
				observersForTopic.forEach(observer => observer.next(parsedMessage));
			});
		} catch (error) {
			logger.warn('Error handling message', error, msg);
		}
	}

	subscribe(
		topics: string[] | string,
		options: MqttProvidertOptions = {}
	): Observable<any> {
		const targetTopics = ([] as string[]).concat(topics);
		logger.debug('Subscribing to topic(s)', targetTopics.join(','));

		return new Observable(observer => {
			targetTopics.forEach(topic => {
				// this._topicObservers is used to notify the observers according to the topic received on the message
				let observersForTopic = this._topicObservers.get(topic);

				if (!observersForTopic) {
					observersForTopic = new Set();

					this._topicObservers.set(topic, observersForTopic);
				}

				observersForTopic.add(observer);
			});

			// @ts-ignore
			let client: Paho.Client;
			const { clientId = this.clientId } = options;

			// this._clientIdObservers is used to close observers when client gets disconnected
			let observersForClientId = this._clientIdObservers.get(clientId);
			if (!observersForClientId) {
				observersForClientId = new Set();
			}
			observersForClientId.add(observer);
			this._clientIdObservers.set(clientId, observersForClientId);

			(async () => {
				const { url = await this.endpoint } = options;

				try {
					client = await this.connect(clientId, { url });
					targetTopics.forEach(topic => {
						client.subscribe(topic);
					});
				} catch (e) {
					observer.error(e);
				}
			})();

			return () => {
				logger.debug('Unsubscribing from topic(s)', targetTopics.join(','));

				if (client) {
					this._clientIdObservers.get(clientId).delete(observer);
					// No more observers per client => client not needed anymore
					if (this._clientIdObservers.get(clientId).size === 0) {
						this.disconnect(clientId);
						this._clientIdObservers.delete(clientId);
					}

					targetTopics.forEach(topic => {
						const observersForTopic =
							this._topicObservers.get(topic) ||
							(new Set() as Set<SubscriptionObserver<any>>);

						observersForTopic.delete(observer);

						// if no observers exists for the topic, topic should be removed
						if (observersForTopic.size === 0) {
							this._topicObservers.delete(topic);
							if (client.isConnected()) {
								client.unsubscribe(topic);
							}
						}
					});
				}

				return null;
			};
		});
	}
}

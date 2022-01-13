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

import { AbstractInteractionsProvider } from './InteractionsProvider';
import {
	InteractionsOptions,
	InteractionsResponse,
	InteractionsMessage,
} from '../types';
import {
	LexRuntimeServiceClient,
	PostTextCommand,
	PostContentCommand,
} from '@aws-sdk/client-lex-runtime-service';
import {
	ConsoleLogger as Logger,
	Credentials,
	getAmplifyUserAgent,
} from '@aws-amplify/core';
import { convert } from './AWSLexProviderHelper/convert';

const logger = new Logger('AWSLexProvider');

export class AWSLexProvider extends AbstractInteractionsProvider {
	private lexRuntimeServiceClient: LexRuntimeServiceClient;
	private _botsCompleteCallback: object;

	constructor(options: InteractionsOptions = {}) {
		super(options);
		this._botsCompleteCallback = {};
	}

	getProviderName() {
		return 'AWSLexProvider';
	}

	reportBotStatus(data, botname) {
		// Check if state is fulfilled to resolve onFullfilment promise
		logger.debug('postContent state', data.dialogState);
		if (
			data.dialogState === 'ReadyForFulfillment' ||
			data.dialogState === 'Fulfilled'
		) {
			if (typeof this._botsCompleteCallback[botname] === 'function') {
				setTimeout(
					() =>
						this._botsCompleteCallback[botname](null, { slots: data.slots }),
					0
				);
			}

			if (
				this._config &&
				typeof this._config[botname].onComplete === 'function'
			) {
				setTimeout(
					() => this._config[botname].onComplete(null, { slots: data.slots }),
					0
				);
			}
		}

		if (data.dialogState === 'Failed') {
			if (typeof this._botsCompleteCallback[botname] === 'function') {
				setTimeout(
					() => this._botsCompleteCallback[botname]('Bot conversation failed'),
					0
				);
			}

			if (
				this._config &&
				typeof this._config[botname].onComplete === 'function'
			) {
				setTimeout(
					() => this._config[botname].onComplete('Bot conversation failed'),
					0
				);
			}
		}
	}

	async sendMessage(
		botname: string,
		message: string | InteractionsMessage
	): Promise<InteractionsResponse> {
		if (!this._config[botname]) {
			return Promise.reject('Bot ' + botname + ' does not exist');
		}
		const credentials = await Credentials.get();
		if (!credentials) {
			return Promise.reject('No credentials');
		}

		this.lexRuntimeServiceClient = new LexRuntimeServiceClient({
			region: this._config[botname].region,
			credentials,
			customUserAgent: getAmplifyUserAgent(),
		});

		let params;
		if (typeof message === 'string') {
			params = {
				botAlias: this._config[botname].alias,
				botName: botname,
				inputText: message,
				userId: credentials.identityId,
			};

			logger.debug('postText to lex', message);

			try {
				const postTextCommand = new PostTextCommand(params);
				const data = await this.lexRuntimeServiceClient.send(postTextCommand);
				this.reportBotStatus(data, botname);
				return data;
			} catch (err) {
				return Promise.reject(err);
			}
		} else {
			const {
				content,
				options: { messageType },
			} = message;
			if (messageType === 'voice') {
				params = {
					botAlias: this._config[botname].alias,
					botName: botname,
					contentType: 'audio/x-l16; sample-rate=16000',
					inputStream: content,
					userId: credentials.identityId,
					accept: 'audio/mpeg',
				};
			} else {
				params = {
					botAlias: this._config[botname].alias,
					botName: botname,
					contentType: 'text/plain; charset=utf-8',
					inputStream: content,
					userId: credentials.identityId,
					accept: 'audio/mpeg',
				};
			}
			logger.debug('postContent to lex', message);
			try {
				const postContentCommand = new PostContentCommand(params);
				const data = await this.lexRuntimeServiceClient.send(
					postContentCommand
				);
				const audioArray = await convert(data.audioStream);
				this.reportBotStatus(data, botname);
				return { ...data, ...{ audioStream: audioArray } };
			} catch (err) {
				return Promise.reject(err);
			}
		}
	}

	onComplete(botname: string, callback) {
		if (!this._config[botname]) {
			throw new ErrorEvent('Bot ' + botname + ' does not exist');
		}
		this._botsCompleteCallback[botname] = callback;
	}
}

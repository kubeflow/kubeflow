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
import {
	InteractionsOptions,
	InteractionsProviders,
	InteractionsProvider,
	InteractionsMessage,
	InteractionsResponse,
} from './types';
import { Amplify, ConsoleLogger as Logger } from '@aws-amplify/core';
import { AWSLexProvider } from './Providers';
const logger = new Logger('Interactions');

export class InteractionsClass {
	private _options: InteractionsOptions;

	private _pluggables: InteractionsProviders;

	/**
	 * Initialize PubSub with AWS configurations
	 *
	 * @param {InteractionsOptions} options - Configuration object for Interactions
	 */
	constructor(options: InteractionsOptions) {
		this._options = options;
		logger.debug('Interactions Options', this._options);
		this._pluggables = {};
	}

	public getModuleName() {
		return 'Interactions';
	}

	/**
	 *
	 * @param {InteractionsOptions} options - Configuration object for Interactions
	 * @return {Object} - The current configuration
	 */
	configure(options: InteractionsOptions) {
		const opt = options ? options.Interactions || options : {};
		logger.debug('configure Interactions', { opt });
		this._options = { bots: {}, ...opt, ...opt.Interactions };

		const aws_bots_config = this._options.aws_bots_config;
		const bots_config = this._options.bots;

		if (!Object.keys(bots_config).length && aws_bots_config) {
			// Convert aws_bots_config to bots object
			if (Array.isArray(aws_bots_config)) {
				aws_bots_config.forEach(bot => {
					this._options.bots[bot.name] = bot;
				});
			}
		}

		// Check if AWSLex provider is already on pluggables
		if (
			!this._pluggables.AWSLexProvider &&
			bots_config &&
			Object.keys(bots_config)
				.map(key => bots_config[key])
				.find(bot => !bot.providerName || bot.providerName === 'AWSLexProvider')
		) {
			this._pluggables.AWSLexProvider = new AWSLexProvider();
		}

		Object.keys(this._pluggables).map(key => {
			this._pluggables[key].configure(this._options.bots);
		});

		return this._options;
	}

	public addPluggable(pluggable: InteractionsProvider) {
		if (pluggable && pluggable.getCategory() === 'Interactions') {
			if (!this._pluggables[pluggable.getProviderName()]) {
				pluggable.configure(this._options.bots);
				this._pluggables[pluggable.getProviderName()] = pluggable;
				return;
			} else {
				throw new Error(
					'Bot ' + pluggable.getProviderName() + ' already plugged'
				);
			}
		}
	}

	public async send(
		botname: string,
		message: string
	): Promise<InteractionsResponse>;
	public async send(
		botname: string,
		message: InteractionsMessage
	): Promise<InteractionsResponse>;
	public async send(
		botname: string,
		message: object
	): Promise<InteractionsResponse>;
	public async send(
		botname: string,
		message: string | object
	): Promise<InteractionsResponse> {
		if (!this._options.bots || !this._options.bots[botname]) {
			throw new Error('Bot ' + botname + ' does not exist');
		}

		const botProvider =
			this._options.bots[botname].providerName || 'AWSLexProvider';

		if (!this._pluggables[botProvider]) {
			throw new Error(
				'Bot ' +
					botProvider +
					' does not have valid pluggin did you try addPluggable first?'
			);
		}
		return await this._pluggables[botProvider].sendMessage(botname, message);
	}

	public onComplete(botname: string, callback: (err, confirmation) => void) {
		if (!this._options.bots || !this._options.bots[botname]) {
			throw new Error('Bot ' + botname + ' does not exist');
		}
		const botProvider =
			this._options.bots[botname].providerName || 'AWSLexProvider';

		if (!this._pluggables[botProvider]) {
			throw new Error(
				'Bot ' +
					botProvider +
					' does not have valid pluggin did you try addPluggable first?'
			);
		}
		this._pluggables[botProvider].onComplete(botname, callback);
	}
}

export const Interactions = new InteractionsClass(null);
Amplify.register(Interactions);

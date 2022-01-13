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
	InteractionsProvider,
	InteractionsOptions,
	InteractionsResponse,
} from '../types';

import { ConsoleLogger as Logger } from '@aws-amplify/core';

const logger = new Logger('AbstractInteractionsProvider');

export abstract class AbstractInteractionsProvider
	implements InteractionsProvider {
	protected _config: InteractionsOptions;

	constructor(options: InteractionsOptions = {}) {
		this._config = options;
	}

	configure(config: InteractionsOptions = {}): InteractionsOptions {
		this._config = { ...this._config, ...config };

		logger.debug(`configure ${this.getProviderName()}`, this._config);

		return this.options;
	}

	getCategory() {
		return 'Interactions';
	}

	abstract getProviderName(): string;

	protected get options(): InteractionsOptions {
		return { ...this._config };
	}

	public abstract sendMessage(
		botname: string,
		message: string | Object
	): Promise<object>;

	public abstract onComplete(
		botname: string,
		callback: (err: any, confirmation: InteractionsResponse) => void
	);
}

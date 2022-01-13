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
import Observable from 'zen-observable-ts';
import { PubSubProvider, ProvidertOptions } from '../types';
import { ConsoleLogger as Logger } from '@aws-amplify/core';

const logger = new Logger('AbstractPubSubProvider');

export abstract class AbstractPubSubProvider implements PubSubProvider {
	private _config: ProvidertOptions;

	constructor(options: ProvidertOptions = {}) {
		this._config = options;
	}

	configure(config: ProvidertOptions = {}): ProvidertOptions {
		this._config = { ...config, ...this._config };

		logger.debug(`configure ${this.getProviderName()}`, this._config);

		return this.options;
	}

	getCategory() {
		return 'PubSub';
	}

	abstract getProviderName(): string;

	protected get options(): ProvidertOptions {
		return { ...this._config };
	}

	public abstract newClient(clientOptions: ProvidertOptions): Promise<any>;

	public abstract publish(
		topics: string[] | string,
		msg: any,
		options?: ProvidertOptions
	): void;

	public abstract subscribe(
		topics: string[] | string,
		options?: ProvidertOptions
	): Observable<any>;
}

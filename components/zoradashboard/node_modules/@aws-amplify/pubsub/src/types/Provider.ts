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
import { ProvidertOptions } from './PubSub';

export interface PubSubProvider {
	// configure your provider
	configure(config: object): object;

	// return 'Analytics';
	getCategory(): string;

	// return the name of you provider
	getProviderName(): string;

	publish(
		topics: string[] | string,
		msg: any,
		options?: ProvidertOptions
	): void;

	subscribe(
		topics: string[] | string,
		options?: ProvidertOptions
	): Observable<any>;
}

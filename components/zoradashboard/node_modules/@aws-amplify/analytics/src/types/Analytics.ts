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
import { ICredentials } from '@aws-amplify/core';
/**
 * Analytics instance options
 */
export interface AnalyticsOptions {
	appId: string;
	platform?: string;
	clientId?: string;
	region?: string;
	credentials?: ICredentials;
}

export interface EventAttributes {
	[key: string]: string;
}

export interface EventMetrics {
	[key: string]: number;
}

export interface pageViewTrackOpts {
	enable: boolean;
	type?: string;
	eventName?: string;
	provider?: string;
	attributes?:
		| EventAttributes
		| (() => EventAttributes | Promise<EventAttributes>);
	getUrl?: () => string;
}

export interface EventTrackOpts {
	enable: boolean;
	events?: Array<string>;
	selectorPrefix?: string;
	provider?: string;
	attributes?:
		| EventAttributes
		| (() => EventAttributes | Promise<EventAttributes>);
}

export interface SessionTrackOpts {
	enable: boolean;
	attributes?:
		| EventAttributes
		| (() => EventAttributes | Promise<EventAttributes>);
	provider?: string;
}

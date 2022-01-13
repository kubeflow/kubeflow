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
import { ICredentials } from '@aws-amplify/core';

interface BasePayload {
	userId: string;
	trackingId: string;
	sessionId: string;
}

type Config = {
	[key: string]: string | number;
};

type Properties = {
	[key: string]: any;
};

export interface RequestParams {
	eventData: EventData;
	sessionInfo: SessionInfo;
	config: Config;
	sentAt: number;
	credentials: ICredentials;
}

export interface EventData {
	eventType: string;
	properties: Properties;
}

export interface SessionInfo {
	userId: string;
	trackingId: string;
	sessionId: string;
}

export interface RecordEventPayload {
	eventId: string;
	eventType: string;
	sentAt: number;
	properties?: string;
}

export interface RecordEventListPayload extends BasePayload {
	eventList: RecordEventPayload[];
	config?: Config;
	credentials?: ICredentials;
}

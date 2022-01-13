/*
 * Copyright 2018-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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

/**
 * This Symbol is used to reference an internal-only PubSub provider that
 * is used for AppSync/GraphQL subscriptions in the API category.
 */
const hasSymbol =
	typeof Symbol !== 'undefined' && typeof Symbol.for === 'function';

export const INTERNAL_AWS_APPSYNC_PUBSUB_PROVIDER = hasSymbol
	? Symbol.for('INTERNAL_AWS_APPSYNC_PUBSUB_PROVIDER')
	: '@@INTERNAL_AWS_APPSYNC_PUBSUB_PROVIDER';

export const INTERNAL_AWS_APPSYNC_REALTIME_PUBSUB_PROVIDER = hasSymbol
	? Symbol.for('INTERNAL_AWS_APPSYNC_REALTIME_PUBSUB_PROVIDER')
	: '@@INTERNAL_AWS_APPSYNC_REALTIME_PUBSUB_PROVIDER';

export const USER_AGENT_HEADER = 'x-amz-user-agent';

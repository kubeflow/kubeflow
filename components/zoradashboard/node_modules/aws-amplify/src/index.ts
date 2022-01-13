/*
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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

import { Amplify, ServiceWorker } from '@aws-amplify/core';
import { Auth } from '@aws-amplify/auth';
import Cache from '@aws-amplify/cache';

/** Always importing Auth when users import Amplify such that
	for unauthenticated access (no sign in and sign up),
	users don't have to import Auth explicitly **/
Amplify.Auth = Auth;
Amplify.Cache = Cache;
Amplify.ServiceWorker = ServiceWorker;

export {
	Analytics,
	AWSPinpointProvider,
	AWSKinesisProvider,
	AWSKinesisFirehoseProvider,
	AmazonPersonalizeProvider,
} from '@aws-amplify/analytics';

export { Auth } from '@aws-amplify/auth';
export { Storage, StorageClass } from '@aws-amplify/storage';
export { API, APIClass, graphqlOperation } from '@aws-amplify/api';
export {
	AuthModeStrategyType,
	DataStore,
	Predicates,
	SortDirection,
	syncExpression,
} from '@aws-amplify/datastore';
export { PubSub } from '@aws-amplify/pubsub';
export { default as Cache } from '@aws-amplify/cache';
export { Interactions } from '@aws-amplify/interactions';
export * from '@aws-amplify/ui';
export { XR } from '@aws-amplify/xr';
export { Predictions } from '@aws-amplify/predictions';
export {
	ConsoleLogger as Logger,
	Hub,
	JS,
	ClientDevice,
	Signer,
	I18n,
	ServiceWorker,
	AWSCloudWatchProvider,
} from '@aws-amplify/core';
export { withSSRContext } from './withSSRContext';

export { Amplify };

/**
 * @deprecated use named import
 */
export default Amplify;

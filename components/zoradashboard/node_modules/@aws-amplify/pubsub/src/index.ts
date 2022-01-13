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
import { PubSub } from './PubSub';

export * from './Providers';

enum CONTROL_MSG {
	CONNECTION_CLOSED = 'Connection closed',
	CONNECTION_FAILED = 'Connection failed',
	REALTIME_SUBSCRIPTION_INIT_ERROR = 'AppSync Realtime subscription init error',
	SUBSCRIPTION_ACK = 'Subscription ack',
	TIMEOUT_DISCONNECT = 'Timeout disconnect',
}

export { PubSub, CONTROL_MSG };

/**
 * @deprecated use named import
 */
export default PubSub;

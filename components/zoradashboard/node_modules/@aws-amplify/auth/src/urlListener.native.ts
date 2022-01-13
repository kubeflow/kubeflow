/*
 * Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
import { ConsoleLogger as Logger } from '@aws-amplify/core';
const logger = new Logger('urlListener');

let handler;

export default async callback => {
	if (handler) {
		return;
	}

	let Linking: any;
	let AppState: any;

	try {
		({ Linking, AppState } = require('react-native'));
	} catch (error) {
		/* Keep webpack happy */
	}

	handler =
		handler ||
		(({ url, ...rest }: { url: string }) => {
			logger.debug('urlListener', { url, ...rest });
			callback({ url });
		});

	Linking.removeEventListener('url', handler);
	Linking.addEventListener('url', handler);
	AppState.addEventListener('change', async newAppState => {
		if (newAppState === 'active') {
			const initialUrl = await Linking.getInitialURL();
			handler({ url: initialUrl });
		}
	});
};

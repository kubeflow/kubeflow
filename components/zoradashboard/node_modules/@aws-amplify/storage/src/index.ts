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

import { Storage as StorageClass } from './Storage';

import { Amplify, ConsoleLogger as Logger } from '@aws-amplify/core';

const logger = new Logger('Storage');

let _instance: StorageClass = null;

const getInstance = () => {
	if (_instance) {
		return _instance;
	}
	logger.debug('Create Storage Instance, debug');
	_instance = new StorageClass();
	_instance.vault = new StorageClass();

	const old_configure = _instance.configure;
	_instance.configure = options => {
		logger.debug('storage configure called');
		const vaultConfig = { ...old_configure.call(_instance, options) };

		// set level private for each provider for the vault
		Object.keys(vaultConfig).forEach(providerName => {
			if (typeof vaultConfig[providerName] !== 'string') {
				vaultConfig[providerName] = {
					...vaultConfig[providerName],
					level: 'private',
				};
			}
		});
		logger.debug('storage vault configure called');
		_instance.vault.configure(vaultConfig);
	};
	return _instance;
};

export const Storage: StorageClass = getInstance();
Amplify.register(Storage);

/**
 * @deprecated use named import
 */
export default Storage;

export { StorageClass };
export * from './providers';
export * from './types';

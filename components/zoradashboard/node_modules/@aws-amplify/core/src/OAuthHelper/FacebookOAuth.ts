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
import { ConsoleLogger as Logger } from '../Logger';
import { browserOrNode } from '../JS';
import { NonRetryableError } from '../Util';

const logger = new Logger('CognitoCredentials');

const waitForInit = new Promise((res, rej) => {
	if (!browserOrNode().isBrowser) {
		logger.debug('not in the browser, directly resolved');
		return res();
	}
	const fb = window['FB'];
	if (fb) {
		logger.debug('FB SDK already loaded');
		return res();
	} else {
		setTimeout(() => {
			return res();
		}, 2000);
	}
});

export class FacebookOAuth {
	public initialized = false;

	constructor() {
		this.refreshFacebookToken = this.refreshFacebookToken.bind(this);
		this._refreshFacebookTokenImpl = this._refreshFacebookTokenImpl.bind(this);
	}

	public async refreshFacebookToken() {
		if (!this.initialized) {
			logger.debug('need to wait for the Facebook SDK loaded');
			await waitForInit;
			this.initialized = true;
			logger.debug('finish waiting');
		}

		return this._refreshFacebookTokenImpl();
	}

	private _refreshFacebookTokenImpl() {
		let fb = null;
		if (browserOrNode().isBrowser) fb = window['FB'];
		if (!fb) {
			const errorMessage = 'no fb sdk available';
			logger.debug(errorMessage);
			return Promise.reject(new NonRetryableError(errorMessage));
		}

		return new Promise((res, rej) => {
			fb.getLoginStatus(
				fbResponse => {
					if (!fbResponse || !fbResponse.authResponse) {
						const errorMessage =
							'no response from facebook when refreshing the jwt token';
						logger.debug(errorMessage);
						// There is no definitive indication for a network error in
						// fbResponse, so we are treating it as an invalid token.
						rej(new NonRetryableError(errorMessage));
					} else {
						const response = fbResponse.authResponse;
						const { accessToken, expiresIn } = response;
						const date = new Date();
						const expires_at = expiresIn * 1000 + date.getTime();
						if (!accessToken) {
							const errorMessage = 'the jwtToken is undefined';
							logger.debug(errorMessage);
							rej(new NonRetryableError(errorMessage));
						}
						res({
							token: accessToken,
							expires_at,
						});
					}
				},
				{ scope: 'public_profile,email' }
			);
		});
	}
}

/**
 * @deprecated use named import
 */
export default FacebookOAuth;

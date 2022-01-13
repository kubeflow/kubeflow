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
	const ga =
		window['gapi'] && window['gapi'].auth2 ? window['gapi'].auth2 : null;
	if (ga) {
		logger.debug('google api already loaded');
		return res();
	} else {
		setTimeout(() => {
			return res();
		}, 2000);
	}
});

export class GoogleOAuth {
	public initialized = false;

	constructor() {
		this.refreshGoogleToken = this.refreshGoogleToken.bind(this);
		this._refreshGoogleTokenImpl = this._refreshGoogleTokenImpl.bind(this);
	}

	public async refreshGoogleToken() {
		if (!this.initialized) {
			logger.debug('need to wait for the Google SDK loaded');
			await waitForInit;
			this.initialized = true;
			logger.debug('finish waiting');
		}

		return this._refreshGoogleTokenImpl();
	}

	private _refreshGoogleTokenImpl() {
		let ga = null;
		if (browserOrNode().isBrowser)
			ga = window['gapi'] && window['gapi'].auth2 ? window['gapi'].auth2 : null;
		if (!ga) {
			logger.debug('no gapi auth2 available');
			return Promise.reject('no gapi auth2 available');
		}

		return new Promise((res, rej) => {
			ga.getAuthInstance()
				.then(googleAuth => {
					if (!googleAuth) {
						logger.debug('google Auth undefined');
						rej(new NonRetryableError('google Auth undefined'));
					}

					const googleUser = googleAuth.currentUser.get();
					// refresh the token
					if (googleUser.isSignedIn()) {
						logger.debug('refreshing the google access token');
						googleUser
							.reloadAuthResponse()
							.then(authResponse => {
								const { id_token, expires_at } = authResponse;
								res({ token: id_token, expires_at });
							})
							.catch(err => {
								if (err && err.error === 'network_error') {
									// Not using NonRetryableError so handler will be retried
									rej('Network error reloading google auth response');
								} else {
									rej(
										new NonRetryableError(
											'Failed to reload google auth response'
										)
									);
								}
							});
					} else {
						rej(new NonRetryableError('User is not signed in with Google'));
					}
				})
				.catch(err => {
					logger.debug('Failed to refresh google token', err);
					rej(new NonRetryableError('Failed to refresh google token'));
				});
		});
	}
}

/**
 * @deprecated use named import
 */
export default GoogleOAuth;

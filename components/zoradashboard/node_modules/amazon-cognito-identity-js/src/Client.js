import 'isomorphic-unfetch';

import UserAgent from './UserAgent';

class CognitoError extends Error {
	constructor(message, code, name, statusCode) {
		super(message);
		this.code = code;
		this.name = name;
		this.statusCode = statusCode;
	}
}

/** @class */
export default class Client {
	/**
	 * Constructs a new AWS Cognito Identity Provider client object
	 * @param {string} region AWS region
	 * @param {string} endpoint endpoint
	 * @param {object} fetchOptions options for fetch API (only credentials is supported)
	 */
	constructor(region, endpoint, fetchOptions) {
		this.endpoint = endpoint || `https://cognito-idp.${region}.amazonaws.com/`;
		const { credentials } = fetchOptions || {};
		this.fetchOptions = credentials ? { credentials } : {};
	}

	/**
	 * Makes an unauthenticated request on AWS Cognito Identity Provider API
	 * using fetch
	 * @param {string} operation API operation
	 * @param {object} params Input parameters
	 * @returns Promise<object>
	 */
	promisifyRequest(operation, params) {
		return new Promise((resolve, reject) => {
			this.request(operation, params, (err, data) => {
				if (err) {
					reject(
						new CognitoError(err.message, err.code, err.name, err.statusCode)
					);
				} else {
					resolve(data);
				}
			});
		});
	}

	requestWithRetry(operation, params, callback) {
		const MAX_DELAY_IN_MILLIS = 5 * 1000;

		jitteredExponentialRetry((p) => new Promise((res, rej) => {
			this.request(operation, p, (error, result) => {
				if (error) {
					rej(error);
				} else {
					res(result);
				}
			});
		}), [params], MAX_DELAY_IN_MILLIS)
			.then(result => callback(null, result))
			.catch(error => callback(error));
	}

	/**
	 * Makes an unauthenticated request on AWS Cognito Identity Provider API
	 * using fetch
	 * @param {string} operation API operation
	 * @param {object} params Input parameters
	 * @param {function} callback Callback called when a response is returned
	 * @returns {void}
	 */
	request(operation, params, callback) {
		const headers = {
			'Content-Type': 'application/x-amz-json-1.1',
			'X-Amz-Target': `AWSCognitoIdentityProviderService.${operation}`,
			'X-Amz-User-Agent': UserAgent.prototype.userAgent,
		};

		const options = Object.assign({}, this.fetchOptions, {
			headers,
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			body: JSON.stringify(params),
		});

		let response;
		let responseJsonData;

		fetch(this.endpoint, options)
			.then(
				resp => {
					response = resp;
					return resp;
				},
				err => {
					// If error happens here, the request failed
					// if it is TypeError throw network error
					if (err instanceof TypeError) {
						throw new Error('Network error');
					}
					throw err;
				}
			)
			.then(resp => resp.json().catch(() => ({})))
			.then(data => {
				// return parsed body stream
				if (response.ok) return callback(null, data);
				responseJsonData = data;

				// Taken from aws-sdk-js/lib/protocol/json.js
				// eslint-disable-next-line no-underscore-dangle
				const code = (data.__type || data.code).split('#').pop();
				const error = {
					code,
					name: code,
					message: data.message || data.Message || null,
				};
				return callback(error);
			})
			.catch(err => {
				// first check if we have a service error
				if (
					response &&
					response.headers &&
					response.headers.get('x-amzn-errortype')
				) {
					try {
						const code = response.headers.get('x-amzn-errortype').split(':')[0];
						const error = {
							code,
							name: code,
							statusCode: response.status,
							message: response.status ? response.status.toString() : null,
						};
						return callback(error);
					} catch (ex) {
						return callback(err);
					}
					// otherwise check if error is Network error
				} else if (err instanceof Error && err.message === 'Network error') {
					const error = {
						code: 'NetworkError',
						name: err.name,
						message: err.message,
					};
					return callback(error);
				} else {
					return callback(err);
				}
			});
	}
}

const logger = {
	debug: () => {
		// Intentionally blank. This package doesn't have logging
	}
};

/**
 * For now, all errors are retryable.
 */
class NonRetryableError extends Error {
	constructor(message) {
		super(message);
		this.nonRetryable = true;
	}
}

const isNonRetryableError = (obj) => {
	const key = 'nonRetryable';
	return obj && obj[key];
};

function retry(functionToRetry, args, delayFn, attempt = 1) {
	if (typeof functionToRetry !== 'function') {
		throw Error('functionToRetry must be a function');
	}

	logger.debug(`${functionToRetry.name} attempt #${attempt} with args: ${JSON.stringify(args)}`);

	return functionToRetry(...args).catch((err) => {
		logger.debug(`error on ${functionToRetry.name}`, err);
		
		if (isNonRetryableError(err)) {
			logger.debug(`${functionToRetry.name} non retryable error`, err);
			throw err;
		}

		const retryIn = delayFn(attempt, args, err);

		logger.debug(`${functionToRetry.name} retrying in ${retryIn} ms`);

		if (retryIn !== false) {
			return new Promise(res => setTimeout(res, retryIn))
					.then(() => retry(functionToRetry, args, delayFn, attempt + 1))
		} else {
			throw err;
		}
	})
}

function jitteredBackoff(maxDelayMs) {
	const BASE_TIME_MS = 100;
	const JITTER_FACTOR = 100;

	return attempt => {
		const delay = 2 ** attempt * BASE_TIME_MS + JITTER_FACTOR * Math.random();
		return delay > maxDelayMs ? false : delay;
	};
}

const MAX_DELAY_MS = 5 * 60 * 1000;
function jitteredExponentialRetry(functionToRetry, args, maxDelayMs = MAX_DELAY_MS) {
	return retry(functionToRetry, args, jitteredBackoff(maxDelayMs))
};

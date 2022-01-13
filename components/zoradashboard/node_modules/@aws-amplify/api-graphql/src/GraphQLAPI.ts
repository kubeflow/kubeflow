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
import { GraphQLError } from 'graphql/error/GraphQLError';
// @ts-ignore
import { OperationDefinitionNode } from 'graphql/language';
import { print } from 'graphql/language/printer';
import { parse } from 'graphql/language/parser';
import Observable from 'zen-observable-ts';
import {
	Amplify,
	ConsoleLogger as Logger,
	Constants,
	Credentials,
	INTERNAL_AWS_APPSYNC_REALTIME_PUBSUB_PROVIDER,
} from '@aws-amplify/core';
import PubSub from '@aws-amplify/pubsub';
import Auth from '@aws-amplify/auth';
import Cache from '@aws-amplify/cache';
import { GraphQLAuthError, GraphQLOptions, GraphQLResult } from './types';
import { RestClient } from '@aws-amplify/api-rest';
const USER_AGENT_HEADER = 'x-amz-user-agent';

const logger = new Logger('GraphQLAPI');

export const graphqlOperation = (
	query,
	variables = {},
	authToken?: string
) => ({
	query,
	variables,
	authToken,
});

/**
 * Export Cloud Logic APIs
 */
export class GraphQLAPIClass {
	/**
	 * @private
	 */
	private _options;
	private _api = null;

	Auth = Auth;
	Cache = Cache;
	Credentials = Credentials;

	/**
	 * Initialize GraphQL API with AWS configuration
	 * @param {Object} options - Configuration object for API
	 */
	constructor(options) {
		this._options = options;
		logger.debug('API Options', this._options);
	}

	public getModuleName() {
		return 'GraphQLAPI';
	}

	/**
	 * Configure API
	 * @param {Object} config - Configuration of the API
	 * @return {Object} - The current configuration
	 */
	configure(options) {
		const { API = {}, ...otherOptions } = options || {};
		let opt = { ...otherOptions, ...API };
		logger.debug('configure GraphQL API', { opt });

		if (opt['aws_project_region']) {
			opt = Object.assign({}, opt, {
				region: opt['aws_project_region'],
				header: {},
			});
		}

		if (
			typeof opt.graphql_headers !== 'undefined' &&
			typeof opt.graphql_headers !== 'function'
		) {
			logger.warn('graphql_headers should be a function');
			opt.graphql_headers = undefined;
		}

		this._options = Object.assign({}, this._options, opt);

		this.createInstance();

		return this._options;
	}

	/**
	 * Create an instance of API for the library
	 * @return - A promise of true if Success
	 */
	createInstance() {
		logger.debug('create Rest instance');
		if (this._options) {
			this._api = new RestClient(this._options);
			// Share instance Credentials with client for SSR
			this._api.Credentials = this.Credentials;

			return true;
		} else {
			return Promise.reject('API not configured');
		}
	}

	private async _headerBasedAuth(
		defaultAuthenticationType?,
		additionalHeaders: { [key: string]: string } = {}
	) {
		const {
			aws_appsync_authenticationType,
			aws_appsync_apiKey: apiKey,
		} = this._options;
		const authenticationType =
			defaultAuthenticationType || aws_appsync_authenticationType || 'AWS_IAM';
		let headers = {};

		switch (authenticationType) {
			case 'API_KEY':
				if (!apiKey) {
					throw new Error(GraphQLAuthError.NO_API_KEY);
				}
				headers = {
					Authorization: null,
					'X-Api-Key': apiKey,
				};
				break;
			case 'AWS_IAM':
				const credentialsOK = await this._ensureCredentials();
				if (!credentialsOK) {
					throw new Error(GraphQLAuthError.NO_CREDENTIALS);
				}
				break;
			case 'OPENID_CONNECT':
				try {
					let token;
					// backwards compatibility
					const federatedInfo = await Cache.getItem('federatedInfo');
					if (federatedInfo) {
						token = federatedInfo.token;
					} else {
						const currentUser = await Auth.currentAuthenticatedUser();
						if (currentUser) {
							token = currentUser.token;
						}
					}
					if (!token) {
						throw new Error(GraphQLAuthError.NO_FEDERATED_JWT);
					}
					headers = {
						Authorization: token,
					};
				} catch (e) {
					throw new Error(GraphQLAuthError.NO_CURRENT_USER);
				}
				break;
			case 'AMAZON_COGNITO_USER_POOLS':
				try {
					const session = await this.Auth.currentSession();
					headers = {
						Authorization: session.getAccessToken().getJwtToken(),
					};
				} catch (e) {
					throw new Error(GraphQLAuthError.NO_CURRENT_USER);
				}
				break;
			case 'AWS_LAMBDA':
				if (!additionalHeaders.Authorization) {
					throw new Error(GraphQLAuthError.NO_AUTH_TOKEN);
				}
				headers = {
					Authorization: additionalHeaders.Authorization,
				};
				break;
			default:
				headers = {
					Authorization: null,
				};
				break;
		}

		return headers;
	}

	/**
	 * to get the operation type
	 * @param operation
	 */
	getGraphqlOperationType(operation) {
		const doc = parse(operation);
		const {
			definitions: [{ operation: operationType }],
		} = doc;

		return operationType;
	}

	/**
	 * Executes a GraphQL operation
	 *
	 * @param {GraphQLOptions} GraphQL Options
	 * @param {object} additionalHeaders headers to merge in after any `graphql_headers` set in the config
	 * @returns {Promise<GraphQLResult> | Observable<object>}
	 */
	graphql(
		{ query: paramQuery, variables = {}, authMode, authToken }: GraphQLOptions,
		additionalHeaders?: { [key: string]: string }
	) {
		const query =
			typeof paramQuery === 'string'
				? parse(paramQuery)
				: parse(print(paramQuery));

		const [operationDef = {}] = query.definitions.filter(
			def => def.kind === 'OperationDefinition'
		);
		const {
			operation: operationType,
		} = operationDef as OperationDefinitionNode;

		const headers = additionalHeaders || {};

		// if an authorization header is set, have the explicit authToken take precedence
		if (authToken) {
			headers.Authorization = authToken;
		}

		switch (operationType) {
			case 'query':
			case 'mutation':
				const cancellableToken = this._api.getCancellableToken();
				const initParams = { cancellableToken };
				const responsePromise = this._graphql(
					{ query, variables, authMode },
					headers,
					initParams
				);
				this._api.updateRequestToBeCancellable(
					responsePromise,
					cancellableToken
				);
				return responsePromise;
			case 'subscription':
				return this._graphqlSubscribe({ query, variables, authMode }, headers);
		}

		throw new Error(`invalid operation type: ${operationType}`);
	}

	private async _graphql(
		{ query, variables, authMode }: GraphQLOptions,
		additionalHeaders = {},
		initParams = {}
	): Promise<GraphQLResult> {
		if (!this._api) {
			await this.createInstance();
		}

		const {
			aws_appsync_region: region,
			aws_appsync_graphqlEndpoint: appSyncGraphqlEndpoint,
			graphql_headers = () => ({}),
			graphql_endpoint: customGraphqlEndpoint,
			graphql_endpoint_iam_region: customEndpointRegion,
		} = this._options;

		const headers = {
			...(!customGraphqlEndpoint &&
				(await this._headerBasedAuth(authMode, additionalHeaders))),
			...(customGraphqlEndpoint &&
				(customEndpointRegion
					? await this._headerBasedAuth(authMode, additionalHeaders)
					: { Authorization: null })),
			...(await graphql_headers({ query, variables })),
			...additionalHeaders,
			...(!customGraphqlEndpoint && {
				[USER_AGENT_HEADER]: Constants.userAgent,
			}),
		};

		const body = {
			query: print(query),
			variables,
		};

		const init = Object.assign(
			{
				headers,
				body,
				signerServiceInfo: {
					service: !customGraphqlEndpoint ? 'appsync' : 'execute-api',
					region: !customGraphqlEndpoint ? region : customEndpointRegion,
				},
			},
			initParams
		);

		const endpoint = customGraphqlEndpoint || appSyncGraphqlEndpoint;

		if (!endpoint) {
			const error = new GraphQLError('No graphql endpoint provided.');

			throw {
				data: {},
				errors: [error],
			};
		}

		let response;
		try {
			response = await this._api.post(endpoint, init);
		} catch (err) {
			// If the exception is because user intentionally
			// cancelled the request, do not modify the exception
			// so that clients can identify the exception correctly.
			if (this._api.isCancel(err)) {
				throw err;
			}
			response = {
				data: {},
				errors: [new GraphQLError(err.message, null, null, null, null, err)],
			};
		}

		const { errors } = response;

		if (errors && errors.length) {
			throw response;
		}

		return response;
	}

	/**
	 * Checks to see if an error thrown is from an api request cancellation
	 * @param {any} error - Any error
	 * @return {boolean} - A boolean indicating if the error was from an api request cancellation
	 */
	isCancel(error) {
		return this._api.isCancel(error);
	}

	/**
	 * Cancels an inflight request. Only applicable for graphql queries and mutations
	 * @param {any} request - request to cancel
	 * @return {boolean} - A boolean indicating if the request was cancelled
	 */
	cancel(request: Promise<any>, message?: string) {
		return this._api.cancel(request, message);
	}

	private _graphqlSubscribe(
		{
			query,
			variables,
			authMode: defaultAuthenticationType,
			authToken,
		}: GraphQLOptions,
		additionalHeaders = {}
	): Observable<any> {
		const {
			aws_appsync_region: region,
			aws_appsync_graphqlEndpoint: appSyncGraphqlEndpoint,
			aws_appsync_authenticationType,
			aws_appsync_apiKey: apiKey,
			graphql_headers = () => ({}),
		} = this._options;
		const authenticationType =
			defaultAuthenticationType || aws_appsync_authenticationType || 'AWS_IAM';

		if (PubSub && typeof PubSub.subscribe === 'function') {
			return PubSub.subscribe('', {
				provider: INTERNAL_AWS_APPSYNC_REALTIME_PUBSUB_PROVIDER,
				appSyncGraphqlEndpoint,
				authenticationType,
				apiKey,
				query: print(query),
				region,
				variables,
				graphql_headers,
				additionalHeaders,
				authToken,
			});
		} else {
			logger.debug('No pubsub module applied for subscription');
			throw new Error('No pubsub module applied for subscription');
		}
	}

	/**
	 * @private
	 */
	_ensureCredentials() {
		return this.Credentials.get()
			.then(credentials => {
				if (!credentials) return false;
				const cred = this.Credentials.shear(credentials);
				logger.debug('set credentials for api', cred);

				return true;
			})
			.catch(err => {
				logger.warn('ensure credentials error', err);
				return false;
			});
	}
}

export const GraphQLAPI = new GraphQLAPIClass(null);
Amplify.register(GraphQLAPI);

import API, { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import Cache from '@aws-amplify/cache';
import { ConsoleLogger as Logger, Hub, HubCapsule } from '@aws-amplify/core';
import { CONTROL_MSG as PUBSUB_CONTROL_MSG } from '@aws-amplify/pubsub';
import Observable, { ZenObservable } from 'zen-observable-ts';
import {
	InternalSchema,
	PersistentModel,
	SchemaModel,
	SchemaNamespace,
	PredicatesGroup,
	ModelPredicate,
	AuthModeStrategy,
} from '../../types';
import {
	buildSubscriptionGraphQLOperation,
	getAuthorizationRules,
	getModelAuthModes,
	getUserGroupsFromToken,
	TransformerMutationType,
	getTokenForCustomAuth,
} from '../utils';
import { ModelPredicateCreator } from '../../predicates';
import { validatePredicate } from '../../util';

const logger = new Logger('DataStore');

export enum CONTROL_MSG {
	CONNECTED = 'CONNECTED',
}

export enum USER_CREDENTIALS {
	'none',
	'unauth',
	'auth',
}

type AuthorizationInfo = {
	authMode: GRAPHQL_AUTH_MODE;
	isOwner: boolean;
	ownerField?: string;
	ownerValue?: string;
};

class SubscriptionProcessor {
	private readonly typeQuery = new WeakMap<
		SchemaModel,
		[TransformerMutationType, string, string][]
	>();
	private buffer: [
		TransformerMutationType,
		SchemaModel,
		PersistentModel
	][] = [];
	private dataObserver: ZenObservable.Observer<any>;

	constructor(
		private readonly schema: InternalSchema,
		private readonly syncPredicates: WeakMap<SchemaModel, ModelPredicate<any>>,
		private readonly amplifyConfig: Record<string, any> = {},
		private readonly authModeStrategy: AuthModeStrategy
	) {}

	private buildSubscription(
		namespace: SchemaNamespace,
		model: SchemaModel,
		transformerMutationType: TransformerMutationType,
		userCredentials: USER_CREDENTIALS,
		cognitoTokenPayload: { [field: string]: any } | undefined,
		oidcTokenPayload: { [field: string]: any } | undefined,
		authMode: GRAPHQL_AUTH_MODE
	): {
		opType: TransformerMutationType;
		opName: string;
		query: string;
		authMode: GRAPHQL_AUTH_MODE;
		isOwner: boolean;
		ownerField?: string;
		ownerValue?: string;
	} {
		const { aws_appsync_authenticationType } = this.amplifyConfig;
		const { isOwner, ownerField, ownerValue } =
			this.getAuthorizationInfo(
				model,
				userCredentials,
				aws_appsync_authenticationType,
				cognitoTokenPayload,
				oidcTokenPayload,
				authMode
			) || {};

		const [opType, opName, query] = buildSubscriptionGraphQLOperation(
			namespace,
			model,
			transformerMutationType,
			isOwner,
			ownerField
		);
		return { authMode, opType, opName, query, isOwner, ownerField, ownerValue };
	}

	private getAuthorizationInfo(
		model: SchemaModel,
		userCredentials: USER_CREDENTIALS,
		defaultAuthType: GRAPHQL_AUTH_MODE,
		cognitoTokenPayload: { [field: string]: any } = {},
		oidcTokenPayload: { [field: string]: any } = {},
		authMode: GRAPHQL_AUTH_MODE
	): AuthorizationInfo {
		const rules = getAuthorizationRules(model);

		// Return null if user doesn't have proper credentials for private API with IAM auth
		const iamPrivateAuth =
			authMode === GRAPHQL_AUTH_MODE.AWS_IAM &&
			rules.find(
				rule => rule.authStrategy === 'private' && rule.provider === 'iam'
			);

		if (iamPrivateAuth && userCredentials === USER_CREDENTIALS.unauth) {
			return null;
		}

		// Group auth should take precedence over owner auth, so we are checking
		// if rule(s) have group authorization as well as if either the Cognito or
		// OIDC token has a groupClaim. If so, we are returning auth info before
		// any further owner-based auth checks.
		const groupAuthRules = rules.filter(
			rule =>
				rule.authStrategy === 'groups' &&
				['userPools', 'oidc'].includes(rule.provider)
		);

		const validGroup =
			(authMode === GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS ||
				authMode === GRAPHQL_AUTH_MODE.OPENID_CONNECT) &&
			groupAuthRules.find(groupAuthRule => {
				// validate token against groupClaim
				const cognitoUserGroups = getUserGroupsFromToken(
					cognitoTokenPayload,
					groupAuthRule
				);
				const oidcUserGroups = getUserGroupsFromToken(
					oidcTokenPayload,
					groupAuthRule
				);

				return [...cognitoUserGroups, ...oidcUserGroups].find(userGroup => {
					return groupAuthRule.groups.find(group => group === userGroup);
				});
			});

		if (validGroup) {
			return {
				authMode,
				isOwner: false,
			};
		}

		// Owner auth needs additional values to be returned in order to create the subscription with
		// the correct parameters so we are getting the owner value from the Cognito token via the
		// identityClaim from the auth rule.
		const cognitoOwnerAuthRules =
			authMode === GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
				? rules.filter(
						rule =>
							rule.authStrategy === 'owner' && rule.provider === 'userPools'
				  )
				: [];

		let ownerAuthInfo: AuthorizationInfo;
		cognitoOwnerAuthRules.forEach(ownerAuthRule => {
			const ownerValue = cognitoTokenPayload[ownerAuthRule.identityClaim];

			if (ownerValue) {
				ownerAuthInfo = {
					authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
					isOwner: ownerAuthRule.areSubscriptionsPublic ? false : true,
					ownerField: ownerAuthRule.ownerField,
					ownerValue,
				};
			}
		});

		if (ownerAuthInfo) {
			return ownerAuthInfo;
		}

		// Owner auth needs additional values to be returned in order to create the subscription with
		// the correct parameters so we are getting the owner value from the OIDC token via the
		// identityClaim from the auth rule.
		const oidcOwnerAuthRules =
			authMode === GRAPHQL_AUTH_MODE.OPENID_CONNECT
				? rules.filter(
						rule => rule.authStrategy === 'owner' && rule.provider === 'oidc'
				  )
				: [];

		oidcOwnerAuthRules.forEach(ownerAuthRule => {
			const ownerValue = oidcTokenPayload[ownerAuthRule.identityClaim];

			if (ownerValue) {
				ownerAuthInfo = {
					authMode: GRAPHQL_AUTH_MODE.OPENID_CONNECT,
					isOwner: ownerAuthRule.areSubscriptionsPublic ? false : true,
					ownerField: ownerAuthRule.ownerField,
					ownerValue,
				};
			}
		});

		if (ownerAuthInfo) {
			return ownerAuthInfo;
		}

		// Fallback: return authMode or default auth type
		return {
			authMode: authMode || defaultAuthType,
			isOwner: false,
		};
	}

	private hubQueryCompletionListener(completed: Function, capsule: HubCapsule) {
		const {
			payload: { event },
		} = capsule;

		if (event === PUBSUB_CONTROL_MSG.SUBSCRIPTION_ACK) {
			completed();
		}
	}

	start(): [
		Observable<CONTROL_MSG>,
		Observable<[TransformerMutationType, SchemaModel, PersistentModel]>
	] {
		const ctlObservable = new Observable<CONTROL_MSG>(observer => {
			const promises: Promise<void>[] = [];

			// Creating subs for each model/operation combo so they can be unsubscribed
			// independently, since the auth retry behavior is asynchronous.
			let subscriptions: {
				[modelName: string]: {
					[TransformerMutationType.CREATE]: ZenObservable.Subscription[];
					[TransformerMutationType.UPDATE]: ZenObservable.Subscription[];
					[TransformerMutationType.DELETE]: ZenObservable.Subscription[];
				};
			} = {};
			let cognitoTokenPayload: { [field: string]: any },
				oidcTokenPayload: { [field: string]: any };
			let userCredentials = USER_CREDENTIALS.none;
			(async () => {
				try {
					// retrieving current AWS Credentials
					// TODO Should this use `this.amplify.Auth` for SSR?
					const credentials = await Auth.currentCredentials();
					userCredentials = credentials.authenticated
						? USER_CREDENTIALS.auth
						: USER_CREDENTIALS.unauth;
				} catch (err) {
					// best effort to get AWS credentials
				}

				try {
					// retrieving current token info from Cognito UserPools
					// TODO Should this use `this.amplify.Auth` for SSR?
					const session = await Auth.currentSession();
					cognitoTokenPayload = session.getIdToken().decodePayload();
				} catch (err) {
					// best effort to get jwt from Cognito
				}

				try {
					// Checking for the Cognito region in config to see if Auth is configured
					// before attempting to get federated token. We're using the Cognito region
					// because it will be there regardless of user/identity pool being present.
					const { aws_cognito_region, Auth: AuthConfig } = this.amplifyConfig;
					if (!aws_cognito_region || (AuthConfig && !AuthConfig.region)) {
						throw 'Auth is not configured';
					}

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

					if (token) {
						const payload = token.split('.')[1];
						oidcTokenPayload = JSON.parse(
							Buffer.from(payload, 'base64').toString('utf8')
						);
					}
				} catch (err) {
					logger.debug('error getting OIDC JWT', err);
					// best effort to get oidc jwt
				}

				Object.values(this.schema.namespaces).forEach(namespace => {
					Object.values(namespace.models)
						.filter(({ syncable }) => syncable)
						.forEach(async modelDefinition => {
							const modelAuthModes = await getModelAuthModes({
								authModeStrategy: this.authModeStrategy,
								defaultAuthMode: this.amplifyConfig
									.aws_appsync_authenticationType,
								modelName: modelDefinition.name,
								schema: this.schema,
							});

							// subscriptions are created only based on the READ auth mode(s)
							const readAuthModes = modelAuthModes.READ;

							subscriptions = {
								...subscriptions,
								[modelDefinition.name]: {
									[TransformerMutationType.CREATE]: [],
									[TransformerMutationType.UPDATE]: [],
									[TransformerMutationType.DELETE]: [],
								},
							};

							const operations = [
								TransformerMutationType.CREATE,
								TransformerMutationType.UPDATE,
								TransformerMutationType.DELETE,
							];

							const operationAuthModeAttempts = {
								[TransformerMutationType.CREATE]: 0,
								[TransformerMutationType.UPDATE]: 0,
								[TransformerMutationType.DELETE]: 0,
							};

							// Retry failed subscriptions with next auth mode (if available)
							const authModeRetry = async operation => {
								const {
									opType: transformerMutationType,
									opName,
									query,
									isOwner,
									ownerField,
									ownerValue,
									authMode,
								} = this.buildSubscription(
									namespace,
									modelDefinition,
									operation,
									userCredentials,
									cognitoTokenPayload,
									oidcTokenPayload,
									readAuthModes[operationAuthModeAttempts[operation]]
								);

								const authToken = await getTokenForCustomAuth(
									authMode,
									this.amplifyConfig
								);

								const variables = {};

								if (isOwner) {
									if (!ownerValue) {
										observer.error(
											'Owner field required, sign in is needed in order to perform this operation'
										);
										return;
									}

									variables[ownerField] = ownerValue;
								}

								logger.debug(
									`Attempting ${operation} subscription with authMode: ${
										readAuthModes[operationAuthModeAttempts[operation]]
									}`
								);

								const queryObservable = <
									Observable<{
										value: GraphQLResult<Record<string, PersistentModel>>;
									}>
								>(<unknown>API.graphql({ query, variables, ...{ authMode }, authToken }));
								let subscriptionReadyCallback: () => void;

								subscriptions[modelDefinition.name][
									transformerMutationType
								].push(
									queryObservable
										.map(({ value }) => value)
										.subscribe({
											next: ({ data, errors }) => {
												if (Array.isArray(errors) && errors.length > 0) {
													const messages = (<
														{
															message: string;
														}[]
													>errors).map(({ message }) => message);

													logger.warn(
														`Skipping incoming subscription. Messages: ${messages.join(
															'\n'
														)}`
													);

													this.drainBuffer();
													return;
												}

												const predicatesGroup = ModelPredicateCreator.getPredicates(
													this.syncPredicates.get(modelDefinition),
													false
												);

												const { [opName]: record } = data;

												// checking incoming subscription against syncPredicate.
												// once AppSync implements filters on subscriptions, we'll be
												// able to set these when establishing the subscription instead.
												// Until then, we'll need to filter inbound
												if (
													this.passesPredicateValidation(
														record,
														predicatesGroup
													)
												) {
													this.pushToBuffer(
														transformerMutationType,
														modelDefinition,
														record
													);
												}
												this.drainBuffer();
											},
											error: subscriptionError => {
												const {
													error: { errors: [{ message = '' } = {}] } = {
														errors: [],
													},
												} = subscriptionError;

												if (
													message.includes(
														PUBSUB_CONTROL_MSG.REALTIME_SUBSCRIPTION_INIT_ERROR
													) ||
													message.includes(PUBSUB_CONTROL_MSG.CONNECTION_FAILED)
												) {
													// Unsubscribe and clear subscription array for model/operation
													subscriptions[modelDefinition.name][
														transformerMutationType
													].forEach(subscription => subscription.unsubscribe());
													subscriptions[modelDefinition.name][
														transformerMutationType
													] = [];

													operationAuthModeAttempts[operation]++;
													if (
														operationAuthModeAttempts[operation] >=
														readAuthModes.length
													) {
														logger.debug(
															`${operation} subscription failed with authMode: ${
																readAuthModes[
																	operationAuthModeAttempts[operation] - 1
																]
															}`
														);
														logger.warn('subscriptionError', message);
														return;
													} else {
														logger.debug(
															`${operation} subscription failed with authMode: ${
																readAuthModes[
																	operationAuthModeAttempts[operation] - 1
																]
															}. Retrying with authMode: ${
																readAuthModes[
																	operationAuthModeAttempts[operation]
																]
															}`
														);
														authModeRetry(operation);
														return;
													}
												}

												logger.warn('subscriptionError', message);

												if (typeof subscriptionReadyCallback === 'function') {
													subscriptionReadyCallback();
												}

												if (
													message.includes('"errorType":"Unauthorized"') ||
													message.includes('"errorType":"OperationDisabled"')
												) {
													return;
												}

												observer.error(message);
											},
										})
								);

								promises.push(
									(async () => {
										let boundFunction: any;

										await new Promise(res => {
											subscriptionReadyCallback = res;
											boundFunction = this.hubQueryCompletionListener.bind(
												this,
												res
											);
											Hub.listen('api', boundFunction);
										});
										Hub.remove('api', boundFunction);
									})()
								);
							};

							operations.forEach(op => authModeRetry(op));
						});
				});

				Promise.all(promises).then(() => observer.next(CONTROL_MSG.CONNECTED));
			})();

			return () => {
				Object.keys(subscriptions).map(modelName => {
					subscriptions[modelName][
						TransformerMutationType.CREATE
					].forEach(subscription => subscription.unsubscribe());
					subscriptions[modelName][
						TransformerMutationType.UPDATE
					].forEach(subscription => subscription.unsubscribe());
					subscriptions[modelName][
						TransformerMutationType.DELETE
					].forEach(subscription => subscription.unsubscribe());
				});
			};
		});

		const dataObservable = new Observable<
			[TransformerMutationType, SchemaModel, PersistentModel]
		>(observer => {
			this.dataObserver = observer;
			this.drainBuffer();

			return () => {
				this.dataObserver = null;
			};
		});

		return [ctlObservable, dataObservable];
	}

	private passesPredicateValidation(
		record: PersistentModel,
		predicatesGroup: PredicatesGroup<any>
	): boolean {
		if (!predicatesGroup) {
			return true;
		}

		const { predicates, type } = predicatesGroup;

		return validatePredicate(record, type, predicates);
	}

	private pushToBuffer(
		transformerMutationType: TransformerMutationType,
		modelDefinition: SchemaModel,
		data: PersistentModel
	) {
		this.buffer.push([transformerMutationType, modelDefinition, data]);
	}

	private drainBuffer() {
		if (this.dataObserver) {
			this.buffer.forEach(data => this.dataObserver.next(data));
			this.buffer = [];
		}
	}
}

export { SubscriptionProcessor };

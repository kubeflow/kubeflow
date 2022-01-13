import API, { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import Observable from 'zen-observable-ts';
import {
	InternalSchema,
	ModelInstanceMetadata,
	SchemaModel,
	ModelPredicate,
	PredicatesGroup,
	GraphQLFilter,
	AuthModeStrategy,
} from '../../types';
import {
	buildGraphQLOperation,
	getModelAuthModes,
	getClientSideAuthError,
	getForbiddenError,
	predicateToGraphQLFilter,
	getTokenForCustomAuth,
} from '../utils';
import {
	jitteredExponentialRetry,
	ConsoleLogger as Logger,
	Hub,
	NonRetryableError,
} from '@aws-amplify/core';
import { ModelPredicateCreator } from '../../predicates';

const DEFAULT_PAGINATION_LIMIT = 1000;
const DEFAULT_MAX_RECORDS_TO_SYNC = 10000;

const opResultDefaults = {
	items: [],
	nextToken: null,
	startedAt: null,
};

const logger = new Logger('DataStore');

class SyncProcessor {
	private readonly typeQuery = new WeakMap<SchemaModel, [string, string]>();

	constructor(
		private readonly schema: InternalSchema,
		private readonly maxRecordsToSync: number = DEFAULT_MAX_RECORDS_TO_SYNC,
		private readonly syncPageSize: number = DEFAULT_PAGINATION_LIMIT,
		private readonly syncPredicates: WeakMap<SchemaModel, ModelPredicate<any>>,
		private readonly amplifyConfig: Record<string, any> = {},
		private readonly authModeStrategy: AuthModeStrategy
	) {
		this.generateQueries();
	}

	private generateQueries() {
		Object.values(this.schema.namespaces).forEach(namespace => {
			Object.values(namespace.models)
				.filter(({ syncable }) => syncable)
				.forEach(model => {
					const [[, ...opNameQuery]] = buildGraphQLOperation(
						namespace,
						model,
						'LIST'
					);

					this.typeQuery.set(model, opNameQuery);
				});
		});
	}

	private graphqlFilterFromPredicate(model: SchemaModel): GraphQLFilter {
		if (!this.syncPredicates) {
			return null;
		}
		const predicatesGroup: PredicatesGroup<any> = ModelPredicateCreator.getPredicates(
			this.syncPredicates.get(model),
			false
		);

		if (!predicatesGroup) {
			return null;
		}

		return predicateToGraphQLFilter(predicatesGroup);
	}

	private async retrievePage<
		T extends ModelInstanceMetadata = ModelInstanceMetadata
	>(
		modelDefinition: SchemaModel,
		lastSync: number,
		nextToken: string,
		limit: number = null,
		filter: GraphQLFilter
	): Promise<{ nextToken: string; startedAt: number; items: T[] }> {
		const [opName, query] = this.typeQuery.get(modelDefinition);

		const variables = {
			limit,
			nextToken,
			lastSync,
			filter,
		};

		const modelAuthModes = await getModelAuthModes({
			authModeStrategy: this.authModeStrategy,
			defaultAuthMode: this.amplifyConfig.aws_appsync_authenticationType,
			modelName: modelDefinition.name,
			schema: this.schema,
		});

		// sync only needs the READ auth mode(s)
		const readAuthModes = modelAuthModes.READ;

		let authModeAttempts = 0;
		const authModeRetry = async () => {
			try {
				logger.debug(
					`Attempting sync with authMode: ${readAuthModes[authModeAttempts]}`
				);
				const response = await this.jitteredRetry<T>({
					query,
					variables,
					opName,
					modelDefinition,
					authMode: readAuthModes[authModeAttempts],
				});
				logger.debug(
					`Sync successful with authMode: ${readAuthModes[authModeAttempts]}`
				);
				return response;
			} catch (error) {
				authModeAttempts++;
				if (authModeAttempts >= readAuthModes.length) {
					const authMode = readAuthModes[authModeAttempts - 1];
					logger.debug(`Sync failed with authMode: ${authMode}`, error);
					if (getClientSideAuthError(error) || getForbiddenError(error)) {
						// return empty list of data so DataStore will continue to sync other models
						logger.warn(
							`User is unauthorized to query ${opName} with auth mode ${authMode}. No data could be returned.`
						);

						return {
							data: {
								[opName]: opResultDefaults,
							},
						};
					}
					throw error;
				}
				logger.debug(
					`Sync failed with authMode: ${
						readAuthModes[authModeAttempts - 1]
					}. Retrying with authMode: ${readAuthModes[authModeAttempts]}`
				);
				return await authModeRetry();
			}
		};

		const { data } = await authModeRetry();

		const { [opName]: opResult } = data;

		const { items, nextToken: newNextToken, startedAt } = opResult;

		return {
			nextToken: newNextToken,
			startedAt,
			items,
		};
	}

	// Partial data private feature flag. Not a public API. This will be removed in a future release.
	private partialDataFeatureFlagEnabled() {
		try {
			const flag = sessionStorage.getItem('datastorePartialData');
			return Boolean(flag);
		} catch (e) {
			return false;
		}
	}

	private async jitteredRetry<T>({
		query,
		variables,
		opName,
		modelDefinition,
		authMode,
	}: {
		query: string;
		variables: { limit: number; lastSync: number; nextToken: string };
		opName: string;
		modelDefinition: SchemaModel;
		authMode: GRAPHQL_AUTH_MODE;
	}): Promise<
		GraphQLResult<{
			[opName: string]: {
				items: T[];
				nextToken: string;
				startedAt: number;
			};
		}>
	> {
		return await jitteredExponentialRetry(
			async (query, variables) => {
				try {
					const authToken = await getTokenForCustomAuth(
						authMode,
						this.amplifyConfig
					);

					return await API.graphql({
						query,
						variables,
						authMode,
						authToken,
					});
				} catch (error) {
					// Catch client-side (GraphQLAuthError) & 401/403 errors here so that we don't continue to retry
					const clientOrForbiddenErrorMessage =
						getClientSideAuthError(error) || getForbiddenError(error);
					if (clientOrForbiddenErrorMessage) {
						throw new NonRetryableError(clientOrForbiddenErrorMessage);
					}

					const hasItems = Boolean(
						error &&
							error.data &&
							error.data[opName] &&
							error.data[opName].items
					);

					if (this.partialDataFeatureFlagEnabled()) {
						if (hasItems) {
							const result = error;
							result.data[opName].items = result.data[opName].items.filter(
								item => item !== null
							);

							if (error.errors) {
								Hub.dispatch('datastore', {
									event: 'syncQueriesPartialSyncError',
									data: {
										errors: error.errors,
										modelName: modelDefinition.name,
									},
								});
							}

							return result;
						} else {
							throw error;
						}
					}

					// If the error is unauthorized, filter out unauthorized items and return accessible items
					const unauthorized =
						error &&
						error.errors &&
						(error.errors as [any]).some(
							err => err.errorType === 'Unauthorized'
						);
					if (unauthorized) {
						const result = error;

						if (hasItems) {
							result.data[opName].items = result.data[opName].items.filter(
								item => item !== null
							);
						} else {
							result.data[opName] = {
								...opResultDefaults,
								...result.data[opName],
							};
						}
						logger.warn(
							'queryError',
							`User is unauthorized to query ${opName}, some items could not be returned.`
						);
						return result;
					} else {
						throw error;
					}
				}
			},
			[query, variables]
		);
	}

	start(
		typesLastSync: Map<SchemaModel, [string, number]>
	): Observable<SyncModelPage> {
		let processing = true;

		const maxRecordsToSync =
			this.maxRecordsToSync !== undefined
				? this.maxRecordsToSync
				: DEFAULT_MAX_RECORDS_TO_SYNC;

		const syncPageSize =
			this.syncPageSize !== undefined
				? this.syncPageSize
				: DEFAULT_PAGINATION_LIMIT;

		const parentPromises = new Map<string, Promise<void>>();

		const observable = new Observable<SyncModelPage>(observer => {
			const sortedTypesLastSyncs = Object.values(this.schema.namespaces).reduce(
				(map, namespace) => {
					for (const modelName of Array.from(
						namespace.modelTopologicalOrdering.keys()
					)) {
						const typeLastSync = typesLastSync.get(namespace.models[modelName]);
						map.set(namespace.models[modelName], typeLastSync);
					}
					return map;
				},
				new Map<SchemaModel, [string, number]>()
			);

			const allModelsReady = Array.from(sortedTypesLastSyncs.entries())
				.filter(([{ syncable }]) => syncable)
				.map(async ([modelDefinition, [namespace, lastSync]]) => {
					let done = false;
					let nextToken: string = null;
					let startedAt: number = null;
					let items: ModelInstanceMetadata[] = null;

					let recordsReceived = 0;
					const filter = this.graphqlFilterFromPredicate(modelDefinition);

					const parents = this.schema.namespaces[
						namespace
					].modelTopologicalOrdering.get(modelDefinition.name);
					const promises = parents.map(parent =>
						parentPromises.get(`${namespace}_${parent}`)
					);

					const promise = new Promise<void>(async res => {
						await Promise.all(promises);

						do {
							if (!processing) {
								return;
							}

							const limit = Math.min(
								maxRecordsToSync - recordsReceived,
								syncPageSize
							);

							({ items, nextToken, startedAt } = await this.retrievePage(
								modelDefinition,
								lastSync,
								nextToken,
								limit,
								filter
							));

							recordsReceived += items.length;

							done = nextToken === null || recordsReceived >= maxRecordsToSync;

							observer.next({
								namespace,
								modelDefinition,
								items,
								done,
								startedAt,
								isFullSync: !lastSync,
							});
						} while (!done);

						res();
					});

					parentPromises.set(`${namespace}_${modelDefinition.name}`, promise);

					await promise;
				});

			Promise.all(allModelsReady).then(() => {
				observer.complete();
			});

			return () => {
				processing = false;
			};
		});

		return observable;
	}
}

export type SyncModelPage = {
	namespace: string;
	modelDefinition: SchemaModel;
	items: ModelInstanceMetadata[];
	startedAt: number;
	done: boolean;
	isFullSync: boolean;
};

export { SyncProcessor };

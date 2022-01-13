import API, { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import {
	ConsoleLogger as Logger,
	jitteredExponentialRetry,
	NonRetryableError,
} from '@aws-amplify/core';
import Observable, { ZenObservable } from 'zen-observable-ts';
import { MutationEvent } from '../';
import { ModelInstanceCreator } from '../../datastore/datastore';
import { ExclusiveStorage as Storage } from '../../storage/storage';
import {
	AuthModeStrategy,
	ConflictHandler,
	DISCARD,
	ErrorHandler,
	GraphQLCondition,
	InternalSchema,
	isModelFieldType,
	isTargetNameAssociation,
	ModelInstanceMetadata,
	OpType,
	PersistentModel,
	PersistentModelConstructor,
	SchemaModel,
	TypeConstructorMap,
} from '../../types';
import { exhaustiveCheck, USER } from '../../util';
import { MutationEventOutbox } from '../outbox';
import {
	buildGraphQLOperation,
	createMutationInstanceFromModelOperation,
	getModelAuthModes,
	TransformerMutationType,
	getTokenForCustomAuth,
} from '../utils';

const MAX_ATTEMPTS = 10;

const logger = new Logger('DataStore');

type MutationProcessorEvent = {
	operation: TransformerMutationType;
	modelDefinition: SchemaModel;
	model: PersistentModel;
	hasMore: boolean;
};

class MutationProcessor {
	private observer: ZenObservable.Observer<MutationProcessorEvent>;
	private readonly typeQuery = new WeakMap<
		SchemaModel,
		[TransformerMutationType, string, string][]
	>();
	private processing: boolean = false;

	constructor(
		private readonly schema: InternalSchema,
		private readonly storage: Storage,
		private readonly userClasses: TypeConstructorMap,
		private readonly outbox: MutationEventOutbox,
		private readonly modelInstanceCreator: ModelInstanceCreator,
		private readonly MutationEvent: PersistentModelConstructor<MutationEvent>,
		private readonly amplifyConfig: Record<string, any> = {},
		private readonly authModeStrategy: AuthModeStrategy,
		private readonly conflictHandler?: ConflictHandler,
		private readonly errorHandler?: ErrorHandler
	) {
		this.generateQueries();
	}

	private generateQueries() {
		Object.values(this.schema.namespaces).forEach(namespace => {
			Object.values(namespace.models)
				.filter(({ syncable }) => syncable)
				.forEach(model => {
					const [createMutation] = buildGraphQLOperation(
						namespace,
						model,
						'CREATE'
					);
					const [updateMutation] = buildGraphQLOperation(
						namespace,
						model,
						'UPDATE'
					);
					const [deleteMutation] = buildGraphQLOperation(
						namespace,
						model,
						'DELETE'
					);

					this.typeQuery.set(model, [
						createMutation,
						updateMutation,
						deleteMutation,
					]);
				});
		});
	}

	private isReady() {
		return this.observer !== undefined;
	}

	public start(): Observable<MutationProcessorEvent> {
		const observable = new Observable<MutationProcessorEvent>(observer => {
			this.observer = observer;

			this.resume();

			return () => {
				this.pause();
			};
		});

		return observable;
	}

	public async resume(): Promise<void> {
		if (this.processing || !this.isReady()) {
			return;
		}

		this.processing = true;
		let head: MutationEvent;
		const namespaceName = USER;

		// start to drain outbox
		while (
			this.processing &&
			(head = await this.outbox.peek(this.storage)) !== undefined
		) {
			const { model, operation, data, condition } = head;
			const modelConstructor = this.userClasses[
				model
			] as PersistentModelConstructor<MutationEvent>;
			let result: GraphQLResult<Record<string, PersistentModel>>;
			let opName: string;
			let modelDefinition: SchemaModel;
			try {
				const modelAuthModes = await getModelAuthModes({
					authModeStrategy: this.authModeStrategy,
					defaultAuthMode: this.amplifyConfig.aws_appsync_authenticationType,
					modelName: model,
					schema: this.schema,
				});

				const operationAuthModes = modelAuthModes[operation.toUpperCase()];

				let authModeAttempts = 0;
				const authModeRetry = async () => {
					try {
						logger.debug(
							`Attempting mutation with authMode: ${operationAuthModes[authModeAttempts]}`
						);
						const response = await this.jitteredRetry(
							namespaceName,
							model,
							operation,
							data,
							condition,
							modelConstructor,
							this.MutationEvent,
							head,
							operationAuthModes[authModeAttempts]
						);

						logger.debug(
							`Mutation sent successfully with authMode: ${operationAuthModes[authModeAttempts]}`
						);

						return response;
					} catch (error) {
						authModeAttempts++;
						if (authModeAttempts >= operationAuthModes.length) {
							logger.debug(
								`Mutation failed with authMode: ${
									operationAuthModes[authModeAttempts - 1]
								}`
							);
							throw error;
						}
						logger.debug(
							`Mutation failed with authMode: ${
								operationAuthModes[authModeAttempts - 1]
							}. Retrying with authMode: ${
								operationAuthModes[authModeAttempts]
							}`
						);
						return await authModeRetry();
					}
				};

				[result, opName, modelDefinition] = await authModeRetry();
			} catch (error) {
				if (error.message === 'Offline' || error.message === 'RetryMutation') {
					continue;
				}
			}

			if (result === undefined) {
				logger.debug('done retrying');
				await this.storage.runExclusive(async storage => {
					await this.outbox.dequeue(storage);
				});
				continue;
			}

			const record = result.data[opName];
			let hasMore = false;

			await this.storage.runExclusive(async storage => {
				// using runExclusive to prevent possible race condition
				// when another record gets enqueued between dequeue and peek
				await this.outbox.dequeue(storage, record, operation);
				hasMore = (await this.outbox.peek(storage)) !== undefined;
			});

			this.observer.next({
				operation,
				modelDefinition,
				model: record,
				hasMore,
			});
		}

		// pauses itself
		this.pause();
	}

	private async jitteredRetry(
		namespaceName: string,
		model: string,
		operation: TransformerMutationType,
		data: string,
		condition: string,
		modelConstructor: PersistentModelConstructor<PersistentModel>,
		MutationEvent: PersistentModelConstructor<MutationEvent>,
		mutationEvent: MutationEvent,
		authMode: GRAPHQL_AUTH_MODE
	): Promise<
		[GraphQLResult<Record<string, PersistentModel>>, string, SchemaModel]
	> {
		return await jitteredExponentialRetry(
			async (
				model: string,
				operation: TransformerMutationType,
				data: string,
				condition: string,
				modelConstructor: PersistentModelConstructor<PersistentModel>,
				MutationEvent: PersistentModelConstructor<MutationEvent>,
				mutationEvent: MutationEvent
			) => {
				const [
					query,
					variables,
					graphQLCondition,
					opName,
					modelDefinition,
				] = this.createQueryVariables(
					namespaceName,
					model,
					operation,
					data,
					condition
				);

				const authToken = await getTokenForCustomAuth(
					authMode,
					this.amplifyConfig
				);

				const tryWith = { query, variables, authMode, authToken };
				let attempt = 0;

				const opType = this.opTypeFromTransformerOperation(operation);

				do {
					try {
						const result = <GraphQLResult<Record<string, PersistentModel>>>(
							await API.graphql(tryWith)
						);
						return [result, opName, modelDefinition];
					} catch (err) {
						if (err.errors && err.errors.length > 0) {
							const [error] = err.errors;
							const { originalError: { code = null } = {} } = error;

							if (error.errorType === 'Unauthorized') {
								throw new NonRetryableError('Unauthorized');
							}

							if (
								error.message === 'Network Error' ||
								code === 'ECONNABORTED' // refers to axios timeout error caused by device's bad network condition
							) {
								if (!this.processing) {
									throw new NonRetryableError('Offline');
								}
								// TODO: Check errors on different env (react-native or other browsers)
								throw new Error('Network Error');
							}

							if (error.errorType === 'ConflictUnhandled') {
								// TODO: add on ConflictConditionalCheck error query last from server
								attempt++;
								let retryWith: PersistentModel | typeof DISCARD;

								if (attempt > MAX_ATTEMPTS) {
									retryWith = DISCARD;
								} else {
									try {
										retryWith = await this.conflictHandler({
											modelConstructor,
											localModel: this.modelInstanceCreator(
												modelConstructor,
												variables.input
											),
											remoteModel: this.modelInstanceCreator(
												modelConstructor,
												error.data
											),
											operation: opType,
											attempts: attempt,
										});
									} catch (err) {
										logger.warn('conflict trycatch', err);
										continue;
									}
								}

								if (retryWith === DISCARD) {
									// Query latest from server and notify merger

									const [[, opName, query]] = buildGraphQLOperation(
										this.schema.namespaces[namespaceName],
										modelDefinition,
										'GET'
									);

									const authToken = await getTokenForCustomAuth(
										authMode,
										this.amplifyConfig
									);

									const serverData = <
										GraphQLResult<Record<string, PersistentModel>>
									>await API.graphql({
										query,
										variables: { id: variables.input.id },
										authMode,
										authToken,
									});

									return [serverData, opName, modelDefinition];
								}

								const namespace = this.schema.namespaces[namespaceName];

								// convert retry with to tryWith
								const updatedMutation = createMutationInstanceFromModelOperation(
									namespace.relationships,
									modelDefinition,
									opType,
									modelConstructor,
									retryWith,
									graphQLCondition,
									MutationEvent,
									this.modelInstanceCreator,
									mutationEvent.id
								);

								await this.storage.save(updatedMutation);

								throw new NonRetryableError('RetryMutation');
							} else {
								try {
									await this.errorHandler({
										localModel: this.modelInstanceCreator(
											modelConstructor,
											variables.input
										),
										message: error.message,
										operation,
										errorType: error.errorType,
										errorInfo: error.errorInfo,
										remoteModel: error.data
											? this.modelInstanceCreator(modelConstructor, error.data)
											: null,
									});
								} catch (err) {
									logger.warn('failed to execute errorHandler', err);
								} finally {
									// Return empty tuple, dequeues the mutation
									return error.data
										? [
												{ data: { [opName]: error.data } },
												opName,
												modelDefinition,
										  ]
										: [];
								}
							}
						} else {
							// Catch-all for client-side errors that don't come back in the `GraphQLError` format.
							// These errors should not be retried.
							throw new NonRetryableError(err);
						}
					}
				} while (tryWith);
			},
			[
				model,
				operation,
				data,
				condition,
				modelConstructor,
				MutationEvent,
				mutationEvent,
			]
		);
	}

	private createQueryVariables(
		namespaceName: string,
		model: string,
		operation: TransformerMutationType,
		data: string,
		condition: string
	): [string, Record<string, any>, GraphQLCondition, string, SchemaModel] {
		const modelDefinition = this.schema.namespaces[namespaceName].models[model];
		const { primaryKey } = this.schema.namespaces[namespaceName].keys[model];

		const queriesTuples = this.typeQuery.get(modelDefinition);

		const [, opName, query] = queriesTuples.find(
			([transformerMutationType]) => transformerMutationType === operation
		);

		const { _version, ...parsedData } = <ModelInstanceMetadata>JSON.parse(data);

		// include all the fields that comprise a custom PK if one is specified
		const deleteInput = {};
		if (primaryKey && primaryKey.length) {
			for (const pkField of primaryKey) {
				deleteInput[pkField] = parsedData[pkField];
			}
		} else {
			deleteInput['id'] = parsedData.id;
		}

		const filteredData =
			operation === TransformerMutationType.DELETE
				? <ModelInstanceMetadata>deleteInput // For DELETE mutations, only PK is sent
				: Object.values(modelDefinition.fields)
						.filter(({ name, type, association }) => {
							// connections
							if (isModelFieldType(type)) {
								// BELONGS_TO
								if (
									isTargetNameAssociation(association) &&
									association.connectionType === 'BELONGS_TO'
								) {
									return true;
								}

								// All other connections
								return false;
							}

							if (operation === TransformerMutationType.UPDATE) {
								// this limits the update mutation input to changed fields only
								return parsedData.hasOwnProperty(name);
							}

							// scalars and non-model types
							return true;
						})
						.map(({ name, type, association }) => {
							let fieldName = name;
							let val = parsedData[name];

							if (
								isModelFieldType(type) &&
								isTargetNameAssociation(association)
							) {
								fieldName = association.targetName;
								val = parsedData[fieldName];
							}

							return [fieldName, val];
						})
						.reduce((acc, [k, v]) => {
							acc[k] = v;
							return acc;
						}, <typeof parsedData>{});

		// Build mutation variables input object
		const input: ModelInstanceMetadata = {
			...filteredData,
			_version,
		};

		const graphQLCondition = <GraphQLCondition>JSON.parse(condition);

		const variables = {
			input,
			...(operation === TransformerMutationType.CREATE
				? {}
				: {
						condition:
							Object.keys(graphQLCondition).length > 0
								? graphQLCondition
								: null,
				  }),
		};
		return [query, variables, graphQLCondition, opName, modelDefinition];
	}

	private opTypeFromTransformerOperation(
		operation: TransformerMutationType
	): OpType {
		switch (operation) {
			case TransformerMutationType.CREATE:
				return OpType.INSERT;
			case TransformerMutationType.DELETE:
				return OpType.DELETE;
			case TransformerMutationType.UPDATE:
				return OpType.UPDATE;
			case TransformerMutationType.GET: // Intentionally blank
				break;
			default:
				exhaustiveCheck(operation);
		}
	}

	public pause() {
		this.processing = false;
	}
}

export { MutationProcessor };

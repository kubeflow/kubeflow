import { browserOrNode, ConsoleLogger as Logger } from '@aws-amplify/core';
import { CONTROL_MSG as PUBSUB_CONTROL_MSG } from '@aws-amplify/pubsub';
import Observable, { ZenObservable } from 'zen-observable-ts';
import { ModelInstanceCreator } from '../datastore/datastore';
import { ModelPredicateCreator } from '../predicates';
import { ExclusiveStorage as Storage } from '../storage/storage';
import {
	ConflictHandler,
	ControlMessageType,
	ErrorHandler,
	InternalSchema,
	ModelInit,
	ModelInstanceMetadata,
	MutableModel,
	NamespaceResolver,
	OpType,
	PersistentModel,
	PersistentModelConstructor,
	SchemaModel,
	SchemaNamespace,
	TypeConstructorMap,
	ModelPredicate,
	AuthModeStrategy,
} from '../types';
import { exhaustiveCheck, getNow, SYNC } from '../util';
import DataStoreConnectivity from './datastoreConnectivity';
import { ModelMerger } from './merger';
import { MutationEventOutbox } from './outbox';
import { MutationProcessor } from './processors/mutation';
import { CONTROL_MSG, SubscriptionProcessor } from './processors/subscription';
import { SyncProcessor } from './processors/sync';
import {
	createMutationInstanceFromModelOperation,
	predicateToGraphQLCondition,
	TransformerMutationType,
} from './utils';

const { isNode } = browserOrNode();
const logger = new Logger('DataStore');

const ownSymbol = Symbol('sync');

type StartParams = {
	fullSyncInterval: number;
};

export declare class MutationEvent {
	constructor(init: ModelInit<MutationEvent>);
	static copyOf(
		src: MutationEvent,
		mutator: (draft: MutableModel<MutationEvent>) => void | MutationEvent
	): MutationEvent;
	public readonly id: string;
	public readonly model: string;
	public readonly operation: TransformerMutationType;
	public readonly modelId: string;
	public readonly condition: string;
	public data: string;
}

declare class ModelMetadata {
	constructor(init: ModelInit<ModelMetadata>);
	static copyOf(
		src: ModelMetadata,
		mutator: (draft: MutableModel<ModelMetadata>) => void | ModelMetadata
	): ModelMetadata;
	public readonly id: string;
	public readonly namespace: string;
	public readonly model: string;
	public readonly fullSyncInterval: number;
	public readonly lastSync?: number;
	public readonly lastFullSync?: number;
	public readonly lastSyncPredicate?: null | string;
}

export enum ControlMessage {
	SYNC_ENGINE_STORAGE_SUBSCRIBED = 'storageSubscribed',
	SYNC_ENGINE_SUBSCRIPTIONS_ESTABLISHED = 'subscriptionsEstablished',
	SYNC_ENGINE_SYNC_QUERIES_STARTED = 'syncQueriesStarted',
	SYNC_ENGINE_SYNC_QUERIES_READY = 'syncQueriesReady',
	SYNC_ENGINE_MODEL_SYNCED = 'modelSynced',
	SYNC_ENGINE_OUTBOX_MUTATION_ENQUEUED = 'outboxMutationEnqueued',
	SYNC_ENGINE_OUTBOX_MUTATION_PROCESSED = 'outboxMutationProcessed',
	SYNC_ENGINE_OUTBOX_STATUS = 'outboxStatus',
	SYNC_ENGINE_NETWORK_STATUS = 'networkStatus',
	SYNC_ENGINE_READY = 'ready',
}

export class SyncEngine {
	private online = false;

	private readonly syncQueriesProcessor: SyncProcessor;
	private readonly subscriptionsProcessor: SubscriptionProcessor;
	private readonly mutationsProcessor: MutationProcessor;
	private readonly modelMerger: ModelMerger;
	private readonly outbox: MutationEventOutbox;
	private readonly datastoreConnectivity: DataStoreConnectivity;

	constructor(
		private readonly schema: InternalSchema,
		private readonly namespaceResolver: NamespaceResolver,
		private readonly modelClasses: TypeConstructorMap,
		private readonly userModelClasses: TypeConstructorMap,
		private readonly storage: Storage,
		private readonly modelInstanceCreator: ModelInstanceCreator,
		private readonly maxRecordsToSync: number,
		private readonly syncPageSize: number,
		conflictHandler: ConflictHandler,
		errorHandler: ErrorHandler,
		private readonly syncPredicates: WeakMap<SchemaModel, ModelPredicate<any>>,
		private readonly amplifyConfig: Record<string, any> = {},
		private readonly authModeStrategy: AuthModeStrategy
	) {
		const MutationEvent = this.modelClasses[
			'MutationEvent'
		] as PersistentModelConstructor<any>;

		this.outbox = new MutationEventOutbox(
			this.schema,
			MutationEvent,
			modelInstanceCreator,
			ownSymbol
		);

		this.modelMerger = new ModelMerger(this.outbox, ownSymbol);

		this.syncQueriesProcessor = new SyncProcessor(
			this.schema,
			this.maxRecordsToSync,
			this.syncPageSize,
			this.syncPredicates,
			this.amplifyConfig,
			this.authModeStrategy
		);
		this.subscriptionsProcessor = new SubscriptionProcessor(
			this.schema,
			this.syncPredicates,
			this.amplifyConfig,
			this.authModeStrategy
		);
		this.mutationsProcessor = new MutationProcessor(
			this.schema,
			this.storage,
			this.userModelClasses,
			this.outbox,
			this.modelInstanceCreator,
			MutationEvent,
			this.amplifyConfig,
			this.authModeStrategy,
			conflictHandler,
			errorHandler
		);
		this.datastoreConnectivity = new DataStoreConnectivity();
	}

	start(params: StartParams) {
		return new Observable<ControlMessageType<ControlMessage>>(observer => {
			logger.log('starting sync engine...');

			let subscriptions: ZenObservable.Subscription[] = [];

			(async () => {
				try {
					await this.setupModels(params);
				} catch (err) {
					observer.error(err);
					return;
				}

				const startPromise = new Promise(resolve => {
					this.datastoreConnectivity.status().subscribe(async ({ online }) => {
						// From offline to online
						if (online && !this.online) {
							this.online = online;

							observer.next({
								type: ControlMessage.SYNC_ENGINE_NETWORK_STATUS,
								data: {
									active: this.online,
								},
							});

							let ctlSubsObservable: Observable<CONTROL_MSG>;
							let dataSubsObservable: Observable<[
								TransformerMutationType,
								SchemaModel,
								PersistentModel
							]>;

							if (isNode) {
								logger.warn(
									'Realtime disabled when in a server-side environment'
								);
							} else {
								//#region GraphQL Subscriptions
								[
									// const ctlObservable: Observable<CONTROL_MSG>
									ctlSubsObservable,
									// const dataObservable: Observable<[TransformerMutationType, SchemaModel, Readonly<{
									// id: string;
									// } & Record<string, any>>]>
									dataSubsObservable,
								] = this.subscriptionsProcessor.start();

								try {
									await new Promise((resolve, reject) => {
										const ctlSubsSubscription = ctlSubsObservable.subscribe({
											next: msg => {
												if (msg === CONTROL_MSG.CONNECTED) {
													resolve();
												}
											},
											error: err => {
												reject(err);
												const handleDisconnect = this.disconnectionHandler();
												handleDisconnect(err);
											},
										});

										subscriptions.push(ctlSubsSubscription);
									});
								} catch (err) {
									observer.error(err);
									return;
								}

								logger.log('Realtime ready');

								observer.next({
									type: ControlMessage.SYNC_ENGINE_SUBSCRIPTIONS_ESTABLISHED,
								});

								//#endregion
							}

							//#region Base & Sync queries
							try {
								await new Promise((resolve, reject) => {
									const syncQuerySubscription = this.syncQueriesObservable().subscribe(
										{
											next: message => {
												const { type } = message;

												if (
													type === ControlMessage.SYNC_ENGINE_SYNC_QUERIES_READY
												) {
													resolve();
												}

												observer.next(message);
											},
											complete: () => {
												resolve();
											},
											error: error => {
												reject(error);
											},
										}
									);

									if (syncQuerySubscription) {
										subscriptions.push(syncQuerySubscription);
									}
								});
							} catch (error) {
								observer.error(error);
								return;
							}
							//#endregion

							//#region process mutations
							subscriptions.push(
								this.mutationsProcessor
									.start()
									.subscribe(({ modelDefinition, model: item, hasMore }) => {
										const modelConstructor = this.userModelClasses[
											modelDefinition.name
										] as PersistentModelConstructor<any>;

										const model = this.modelInstanceCreator(
											modelConstructor,
											item
										);

										this.storage.runExclusive(storage =>
											this.modelMerger.merge(storage, model)
										);

										observer.next({
											type:
												ControlMessage.SYNC_ENGINE_OUTBOX_MUTATION_PROCESSED,
											data: {
												model: modelConstructor,
												element: model,
											},
										});

										observer.next({
											type: ControlMessage.SYNC_ENGINE_OUTBOX_STATUS,
											data: {
												isEmpty: !hasMore,
											},
										});
									})
							);
							//#endregion

							//#region Merge subscriptions buffer
							// TODO: extract to function
							if (!isNode) {
								subscriptions.push(
									dataSubsObservable.subscribe(
										([_transformerMutationType, modelDefinition, item]) => {
											const modelConstructor = this.userModelClasses[
												modelDefinition.name
											] as PersistentModelConstructor<any>;

											const model = this.modelInstanceCreator(
												modelConstructor,
												item
											);

											this.storage.runExclusive(storage =>
												this.modelMerger.merge(storage, model)
											);
										}
									)
								);
							}
							//#endregion
						} else if (!online) {
							this.online = online;

							observer.next({
								type: ControlMessage.SYNC_ENGINE_NETWORK_STATUS,
								data: {
									active: this.online,
								},
							});

							subscriptions.forEach(sub => sub.unsubscribe());
							subscriptions = [];
						}

						resolve();
					});
				});

				this.storage
					.observe(null, null, ownSymbol)
					.filter(({ model }) => {
						const modelDefinition = this.getModelDefinition(model);

						return modelDefinition.syncable === true;
					})
					.subscribe({
						next: async ({ opType, model, element, condition }) => {
							const namespace = this.schema.namespaces[
								this.namespaceResolver(model)
							];
							const MutationEventConstructor = this.modelClasses[
								'MutationEvent'
							] as PersistentModelConstructor<MutationEvent>;
							const graphQLCondition = predicateToGraphQLCondition(condition);
							const mutationEvent = createMutationInstanceFromModelOperation(
								namespace.relationships,
								this.getModelDefinition(model),
								opType,
								model,
								element,
								graphQLCondition,
								MutationEventConstructor,
								this.modelInstanceCreator
							);

							await this.outbox.enqueue(this.storage, mutationEvent);

							observer.next({
								type: ControlMessage.SYNC_ENGINE_OUTBOX_MUTATION_ENQUEUED,
								data: {
									model,
									element,
								},
							});

							observer.next({
								type: ControlMessage.SYNC_ENGINE_OUTBOX_STATUS,
								data: {
									isEmpty: false,
								},
							});

							await startPromise;

							if (this.online) {
								this.mutationsProcessor.resume();
							}
						},
					});

				observer.next({
					type: ControlMessage.SYNC_ENGINE_STORAGE_SUBSCRIBED,
				});

				const hasMutationsInOutbox =
					(await this.outbox.peek(this.storage)) === undefined;
				observer.next({
					type: ControlMessage.SYNC_ENGINE_OUTBOX_STATUS,
					data: {
						isEmpty: hasMutationsInOutbox,
					},
				});

				await startPromise;

				observer.next({
					type: ControlMessage.SYNC_ENGINE_READY,
				});
			})();

			return () => {
				subscriptions.forEach(sub => sub.unsubscribe());
			};
		});
	}

	private async getModelsMetadataWithNextFullSync(
		currentTimeStamp: number
	): Promise<Map<SchemaModel, [string, number]>> {
		const modelLastSync: Map<SchemaModel, [string, number]> = new Map(
			(await this.getModelsMetadata()).map(
				({
					namespace,
					model,
					lastSync,
					lastFullSync,
					fullSyncInterval,
					lastSyncPredicate,
				}) => {
					const nextFullSync = lastFullSync + fullSyncInterval;
					const syncFrom =
						!lastFullSync || nextFullSync < currentTimeStamp
							? 0 // perform full sync if expired
							: lastSync; // perform delta sync

					return [
						this.schema.namespaces[namespace].models[model],
						[namespace, syncFrom],
					];
				}
			)
		);

		return modelLastSync;
	}

	private syncQueriesObservable(): Observable<
		ControlMessageType<ControlMessage>
	> {
		if (!this.online) {
			return Observable.of<ControlMessageType<ControlMessage>>();
		}

		return new Observable<ControlMessageType<ControlMessage>>(observer => {
			let syncQueriesSubscription: ZenObservable.Subscription;
			let waitTimeoutId: ReturnType<typeof setTimeout>;

			(async () => {
				while (!observer.closed) {
					const count: WeakMap<
						PersistentModelConstructor<any>,
						{
							new: number;
							updated: number;
							deleted: number;
						}
					> = new WeakMap();

					const modelLastSync = await this.getModelsMetadataWithNextFullSync(
						Date.now()
					);
					const paginatingModels = new Set(modelLastSync.keys());

					let newestFullSyncStartedAt: number;
					let theInterval: number;

					let start: number;
					let duration: number;
					let newestStartedAt: number;
					await new Promise(resolve => {
						syncQueriesSubscription = this.syncQueriesProcessor
							.start(modelLastSync)
							.subscribe({
								next: async ({
									namespace,
									modelDefinition,
									items,
									done,
									startedAt,
									isFullSync,
								}) => {
									const modelConstructor = this.userModelClasses[
										modelDefinition.name
									] as PersistentModelConstructor<any>;

									if (!count.has(modelConstructor)) {
										count.set(modelConstructor, {
											new: 0,
											updated: 0,
											deleted: 0,
										});

										start = getNow();
										newestStartedAt =
											newestStartedAt === undefined
												? startedAt
												: Math.max(newestStartedAt, startedAt);
									}

									/**
									 * If there are mutations in the outbox for a given id, those need to be
									 * merged individually. Otherwise, we can merge them in batches.
									 */
									await this.storage.runExclusive(async storage => {
										const idsInOutbox = await this.outbox.getModelIds(storage);

										const oneByOne: ModelInstanceMetadata[] = [];
										const page = items.filter(item => {
											if (!idsInOutbox.has(item.id)) {
												return true;
											}

											oneByOne.push(item);
											return false;
										});

										const opTypeCount: [any, OpType][] = [];

										for (const item of oneByOne) {
											const opType = await this.modelMerger.merge(
												storage,
												item
											);

											if (opType !== undefined) {
												opTypeCount.push([item, opType]);
											}
										}

										opTypeCount.push(
											...(await this.modelMerger.mergePage(
												storage,
												modelConstructor,
												page
											))
										);

										const counts = count.get(modelConstructor);

										opTypeCount.forEach(([, opType]) => {
											switch (opType) {
												case OpType.INSERT:
													counts.new++;
													break;
												case OpType.UPDATE:
													counts.updated++;
													break;
												case OpType.DELETE:
													counts.deleted++;
													break;
												default:
													exhaustiveCheck(opType);
											}
										});
									});

									if (done) {
										const { name: modelName } = modelDefinition;

										//#region update last sync for type
										let modelMetadata = await this.getModelMetadata(
											namespace,
											modelName
										);

										const { lastFullSync, fullSyncInterval } = modelMetadata;

										theInterval = fullSyncInterval;

										newestFullSyncStartedAt =
											newestFullSyncStartedAt === undefined
												? lastFullSync
												: Math.max(
														newestFullSyncStartedAt,
														isFullSync ? startedAt : lastFullSync
												  );

										modelMetadata = (this.modelClasses
											.ModelMetadata as PersistentModelConstructor<any>).copyOf(
											modelMetadata,
											draft => {
												draft.lastSync = startedAt;
												draft.lastFullSync = isFullSync
													? startedAt
													: modelMetadata.lastFullSync;
											}
										);

										await this.storage.save(
											modelMetadata,
											undefined,
											ownSymbol
										);
										//#endregion

										const counts = count.get(modelConstructor);

										observer.next({
											type: ControlMessage.SYNC_ENGINE_MODEL_SYNCED,
											data: {
												model: modelConstructor,
												isFullSync,
												isDeltaSync: !isFullSync,
												counts,
											},
										});

										paginatingModels.delete(modelDefinition);

										if (paginatingModels.size === 0) {
											duration = getNow() - start;
											resolve();
											observer.next({
												type: ControlMessage.SYNC_ENGINE_SYNC_QUERIES_READY,
											});
											syncQueriesSubscription.unsubscribe();
										}
									}
								},
								error: error => {
									observer.error(error);
								},
							});

						observer.next({
							type: ControlMessage.SYNC_ENGINE_SYNC_QUERIES_STARTED,
							data: {
								models: Array.from(paginatingModels).map(({ name }) => name),
							},
						});
					});

					const msNextFullSync =
						newestFullSyncStartedAt +
						theInterval -
						(newestStartedAt + duration);

					logger.debug(
						`Next fullSync in ${msNextFullSync / 1000} seconds. (${new Date(
							Date.now() + msNextFullSync
						)})`
					);

					await new Promise(res => {
						waitTimeoutId = setTimeout(res, msNextFullSync);
					});
				}
			})();

			return () => {
				if (syncQueriesSubscription) {
					syncQueriesSubscription.unsubscribe();
				}

				if (waitTimeoutId) {
					clearTimeout(waitTimeoutId);
				}
			};
		});
	}

	private disconnectionHandler(): (msg: string) => void {
		return (msg: string) => {
			// This implementation is tied to AWSAppSyncRealTimeProvider 'Connection closed', 'Timeout disconnect' msg
			if (
				PUBSUB_CONTROL_MSG.CONNECTION_CLOSED === msg ||
				PUBSUB_CONTROL_MSG.TIMEOUT_DISCONNECT === msg
			) {
				this.datastoreConnectivity.socketDisconnected();
			}
		};
	}

	public unsubscribeConnectivity() {
		this.datastoreConnectivity.unsubscribe();
	}

	private async setupModels(params: StartParams) {
		const { fullSyncInterval } = params;
		const ModelMetadata = this.modelClasses
			.ModelMetadata as PersistentModelConstructor<ModelMetadata>;

		const models: [string, SchemaModel][] = [];
		let savedModel;

		Object.values(this.schema.namespaces).forEach(namespace => {
			Object.values(namespace.models)
				.filter(({ syncable }) => syncable)
				.forEach(model => {
					models.push([namespace.name, model]);
				});
		});

		const promises = models.map(async ([namespace, model]) => {
			const modelMetadata = await this.getModelMetadata(namespace, model.name);
			const syncPredicate = ModelPredicateCreator.getPredicates(
				this.syncPredicates.get(model),
				false
			);
			const lastSyncPredicate = syncPredicate
				? JSON.stringify(syncPredicate)
				: null;

			if (modelMetadata === undefined) {
				[[savedModel]] = await this.storage.save(
					this.modelInstanceCreator(ModelMetadata, {
						model: model.name,
						namespace,
						lastSync: null,
						fullSyncInterval,
						lastFullSync: null,
						lastSyncPredicate,
					}),
					undefined,
					ownSymbol
				);
			} else {
				const prevSyncPredicate = modelMetadata.lastSyncPredicate
					? modelMetadata.lastSyncPredicate
					: null;
				const syncPredicateUpdated = prevSyncPredicate !== lastSyncPredicate;

				[[savedModel]] = await this.storage.save(
					(this.modelClasses.ModelMetadata as PersistentModelConstructor<
						any
					>).copyOf(modelMetadata, draft => {
						draft.fullSyncInterval = fullSyncInterval;
						// perform a base sync if the syncPredicate changed in between calls to DataStore.start
						// ensures that the local store contains all the data specified by the syncExpression
						if (syncPredicateUpdated) {
							draft.lastSync = null;
							draft.lastFullSync = null;
							draft.lastSyncPredicate = lastSyncPredicate;
						}
					})
				);
			}

			return savedModel;
		});

		const result: Record<string, ModelMetadata> = {};
		for (const modelMetadata of await Promise.all(promises)) {
			const { model: modelName } = modelMetadata;

			result[modelName] = modelMetadata;
		}

		return result;
	}

	private async getModelsMetadata(): Promise<ModelMetadata[]> {
		const ModelMetadata = this.modelClasses
			.ModelMetadata as PersistentModelConstructor<ModelMetadata>;

		const modelsMetadata = await this.storage.query(ModelMetadata);

		return modelsMetadata;
	}

	private async getModelMetadata(
		namespace: string,
		model: string
	): Promise<ModelMetadata> {
		const ModelMetadata = this.modelClasses
			.ModelMetadata as PersistentModelConstructor<ModelMetadata>;

		const predicate = ModelPredicateCreator.createFromExisting<ModelMetadata>(
			this.schema.namespaces[SYNC].models[ModelMetadata.name],
			c => c.namespace('eq', namespace).model('eq', model)
		);

		const [modelMetadata] = await this.storage.query(ModelMetadata, predicate, {
			page: 0,
			limit: 1,
		});

		return modelMetadata;
	}

	private getModelDefinition(
		modelConstructor: PersistentModelConstructor<any>
	): SchemaModel {
		const namespaceName = this.namespaceResolver(modelConstructor);

		const modelDefinition = this.schema.namespaces[namespaceName].models[
			modelConstructor.name
		];

		return modelDefinition;
	}

	static getNamespace() {
		const namespace: SchemaNamespace = {
			name: SYNC,
			relationships: {},
			enums: {
				OperationType: {
					name: 'OperationType',
					values: ['CREATE', 'UPDATE', 'DELETE'],
				},
			},
			nonModels: {},
			models: {
				MutationEvent: {
					name: 'MutationEvent',
					pluralName: 'MutationEvents',
					syncable: false,
					fields: {
						id: {
							name: 'id',
							type: 'ID',
							isRequired: true,
							isArray: false,
						},
						model: {
							name: 'model',
							type: 'String',
							isRequired: true,
							isArray: false,
						},
						data: {
							name: 'data',
							type: 'String',
							isRequired: true,
							isArray: false,
						},
						modelId: {
							name: 'modelId',
							type: 'String',
							isRequired: true,
							isArray: false,
						},
						operation: {
							name: 'operation',
							type: {
								enum: 'Operationtype',
							},
							isArray: false,
							isRequired: true,
						},
						condition: {
							name: 'condition',
							type: 'String',
							isArray: false,
							isRequired: true,
						},
					},
				},
				ModelMetadata: {
					name: 'ModelMetadata',
					pluralName: 'ModelsMetadata',
					syncable: false,
					fields: {
						id: {
							name: 'id',
							type: 'ID',
							isRequired: true,
							isArray: false,
						},
						namespace: {
							name: 'namespace',
							type: 'String',
							isRequired: true,
							isArray: false,
						},
						model: {
							name: 'model',
							type: 'String',
							isRequired: true,
							isArray: false,
						},
						lastSync: {
							name: 'lastSync',
							type: 'Int',
							isRequired: false,
							isArray: false,
						},
						lastFullSync: {
							name: 'lastFullSync',
							type: 'Int',
							isRequired: false,
							isArray: false,
						},
						fullSyncInterval: {
							name: 'fullSyncInterval',
							type: 'Int',
							isRequired: true,
							isArray: false,
						},
					},
				},
			},
		};
		return namespace;
	}
}

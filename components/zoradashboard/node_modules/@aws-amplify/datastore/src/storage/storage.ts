import { Logger, Mutex } from '@aws-amplify/core';
import Observable, { ZenObservable } from 'zen-observable-ts';
import PushStream from 'zen-push';
import { Patch } from 'immer';
import { ModelInstanceCreator } from '../datastore/datastore';
import { ModelPredicateCreator } from '../predicates';
import {
	InternalSchema,
	ModelInstanceMetadata,
	ModelPredicate,
	NamespaceResolver,
	OpType,
	PaginationInput,
	PersistentModel,
	PersistentModelConstructor,
	PredicatesGroup,
	QueryOne,
	SchemaNamespace,
	SubscriptionMessage,
	isTargetNameAssociation,
} from '../types';
import {
	isModelConstructor,
	STORAGE,
	validatePredicate,
	valuesEqual,
} from '../util';
import { Adapter } from './adapter';
import getDefaultAdapter from './adapter/getDefaultAdapter';

export type StorageSubscriptionMessage<
	T extends PersistentModel
> = SubscriptionMessage<T> & {
	mutator?: Symbol;
};

export type StorageFacade = Omit<Adapter, 'setUp'>;
export type Storage = InstanceType<typeof StorageClass>;

const logger = new Logger('DataStore');
class StorageClass implements StorageFacade {
	private initialized: Promise<void>;
	private readonly pushStream: {
		observable: Observable<StorageSubscriptionMessage<PersistentModel>>;
	} & Required<
		ZenObservable.Observer<StorageSubscriptionMessage<PersistentModel>>
	>;

	constructor(
		private readonly schema: InternalSchema,
		private readonly namespaceResolver: NamespaceResolver,
		private readonly getModelConstructorByModelName: (
			namsespaceName: string,
			modelName: string
		) => PersistentModelConstructor<any>,
		private readonly modelInstanceCreator: ModelInstanceCreator,
		private readonly adapter?: Adapter,
		private readonly sessionId?: string
	) {
		this.adapter = getDefaultAdapter();
		this.pushStream = new PushStream();
	}

	static getNamespace() {
		const namespace: SchemaNamespace = {
			name: STORAGE,
			relationships: {},
			enums: {},
			models: {},
			nonModels: {},
		};

		return namespace;
	}

	async init() {
		if (this.initialized !== undefined) {
			await this.initialized;
			return;
		}
		logger.debug('Starting Storage');

		let resolve: (value?: void | PromiseLike<void>) => void;
		let reject: (value?: void | PromiseLike<void>) => void;

		this.initialized = new Promise<void>((res, rej) => {
			resolve = res;
			reject = rej;
		});

		this.adapter
			.setUp(
				this.schema,
				this.namespaceResolver,
				this.modelInstanceCreator,
				this.getModelConstructorByModelName,
				this.sessionId
			)
			.then(resolve, reject);

		await this.initialized;
	}

	async save<T extends PersistentModel>(
		model: T,
		condition?: ModelPredicate<T>,
		mutator?: Symbol,
		patchesTuple?: [Patch[], PersistentModel]
	): Promise<[T, OpType.INSERT | OpType.UPDATE][]> {
		await this.init();

		const result = await this.adapter.save(model, condition);

		result.forEach(r => {
			const [originalElement, opType] = r;

			// truthy when save is called by the Merger
			const syncResponse = !!mutator;

			let updateMutationInput;
			// don't attempt to calc mutation input when storage.save
			// is called by Merger, i.e., when processing an AppSync response
			if (opType === OpType.UPDATE && !syncResponse) {
				updateMutationInput = this.getUpdateMutationInput(
					model,
					originalElement,
					patchesTuple
				);
				// // an update without changed user fields
				// => don't create mutationEvent
				if (updateMutationInput === null) {
					return result;
				}
			}

			const element = updateMutationInput || originalElement;

			const modelConstructor = (Object.getPrototypeOf(
				originalElement
			) as Object).constructor as PersistentModelConstructor<T>;

			this.pushStream.next({
				model: modelConstructor,
				opType,
				element,
				mutator,
				condition: ModelPredicateCreator.getPredicates(condition, false),
			});
		});

		return result;
	}

	delete<T extends PersistentModel>(
		model: T,
		condition?: ModelPredicate<T>,
		mutator?: Symbol
	): Promise<[T[], T[]]>;
	delete<T extends PersistentModel>(
		modelConstructor: PersistentModelConstructor<T>,
		condition?: ModelPredicate<T>,
		mutator?: Symbol
	): Promise<[T[], T[]]>;
	async delete<T extends PersistentModel>(
		modelOrModelConstructor: T | PersistentModelConstructor<T>,
		condition?: ModelPredicate<T>,
		mutator?: Symbol
	): Promise<[T[], T[]]> {
		await this.init();

		let deleted: T[];
		let models: T[];

		[models, deleted] = await this.adapter.delete(
			modelOrModelConstructor,
			condition
		);

		const modelIds = new Set(models.map(({ id }) => id));

		if (
			!isModelConstructor(modelOrModelConstructor) &&
			!Array.isArray(deleted)
		) {
			deleted = [deleted];
		}

		deleted.forEach(model => {
			const modelConstructor = (Object.getPrototypeOf(model) as Object)
				.constructor as PersistentModelConstructor<T>;

			let theCondition: PredicatesGroup<any>;

			if (!isModelConstructor(modelOrModelConstructor)) {
				theCondition = modelIds.has(model.id)
					? ModelPredicateCreator.getPredicates(condition, false)
					: undefined;
			}

			this.pushStream.next({
				model: modelConstructor,
				opType: OpType.DELETE,
				element: model,
				mutator,
				condition: theCondition,
			});
		});

		return [models, deleted];
	}

	async query<T extends PersistentModel>(
		modelConstructor: PersistentModelConstructor<T>,
		predicate?: ModelPredicate<T>,
		pagination?: PaginationInput<T>
	): Promise<T[]> {
		await this.init();

		return await this.adapter.query(modelConstructor, predicate, pagination);
	}

	async queryOne<T extends PersistentModel>(
		modelConstructor: PersistentModelConstructor<T>,
		firstOrLast: QueryOne = QueryOne.FIRST
	): Promise<T> {
		await this.init();

		const record = await this.adapter.queryOne(modelConstructor, firstOrLast);
		return record;
	}

	observe<T extends PersistentModel>(
		modelConstructor?: PersistentModelConstructor<T>,
		predicate?: ModelPredicate<T>,
		skipOwn?: Symbol
	): Observable<SubscriptionMessage<T>> {
		const listenToAll = !modelConstructor;
		const { predicates, type } =
			ModelPredicateCreator.getPredicates(predicate, false) || {};
		const hasPredicate = !!predicates;

		let result = this.pushStream.observable
			.filter(({ mutator }) => {
				return !skipOwn || mutator !== skipOwn;
			})
			.map(
				({ mutator: _mutator, ...message }) => message as SubscriptionMessage<T>
			);

		if (!listenToAll) {
			result = result.filter(({ model, element }) => {
				if (modelConstructor !== model) {
					return false;
				}

				if (hasPredicate) {
					return validatePredicate(element, type, predicates);
				}

				return true;
			});
		}

		return result;
	}

	async clear(completeObservable = true) {
		this.initialized = undefined;

		await this.adapter.clear();

		if (completeObservable) {
			this.pushStream.complete();
		}
	}

	async batchSave<T extends PersistentModel>(
		modelConstructor: PersistentModelConstructor<any>,
		items: ModelInstanceMetadata[],
		mutator?: Symbol
	): Promise<[T, OpType][]> {
		await this.init();

		const result = await this.adapter.batchSave(modelConstructor, items);

		result.forEach(([element, opType]) => {
			this.pushStream.next({
				model: modelConstructor,
				opType,
				element,
				mutator,
				condition: undefined,
			});
		});

		return result as any;
	}

	// returns null if no user fields were changed (determined by value comparison)
	private getUpdateMutationInput<T extends PersistentModel>(
		model: T,
		originalElement: T,
		patchesTuple?: [Patch[], PersistentModel]
	): PersistentModel | null {
		const containsPatches = patchesTuple && patchesTuple.length;
		if (!containsPatches) {
			return null;
		}

		const [patches, source] = patchesTuple;
		const updatedElement = {};
		// extract array of updated fields from patches
		const updatedFields = <string[]>(
			patches.map(patch => patch.path && patch.path[0])
		);

		// check model def for association and replace with targetName if exists
		const modelConstructor = Object.getPrototypeOf(model)
			.constructor as PersistentModelConstructor<T>;
		const namespace = this.namespaceResolver(modelConstructor);
		const { fields } = this.schema.namespaces[namespace].models[
			modelConstructor.name
		];
		const { primaryKey, compositeKeys = [] } = this.schema.namespaces[
			namespace
		].keys[modelConstructor.name];

		// set original values for these fields
		updatedFields.forEach((field: string) => {
			const targetName: any = isTargetNameAssociation(
				fields[field].association
			);

			// if field refers to a belongsTo relation, use the target field instead
			const key = targetName || field;

			// check field values by value. Ignore unchanged fields
			if (!valuesEqual(source[key], originalElement[key])) {
				// if the field was updated to 'undefined', replace with 'null' for compatibility with JSON and GraphQL
				updatedElement[key] =
					originalElement[key] === undefined ? null : originalElement[key];

				for (const fieldSet of compositeKeys) {
					// include all of the fields that comprise the composite key
					if (fieldSet.has(key)) {
						for (const compositeField of fieldSet) {
							updatedElement[compositeField] = originalElement[compositeField];
						}
					}
				}
			}
		});

		// include field(s) from custom PK if one is specified for the model
		if (primaryKey && primaryKey.length) {
			for (const pkField of primaryKey) {
				updatedElement[pkField] = originalElement[pkField];
			}
		}

		if (Object.keys(updatedElement).length === 0) {
			return null;
		}

		const { id, _version, _lastChangedAt, _deleted } = originalElement;

		// For update mutations we only want to send fields with changes
		// and the required internal fields
		return {
			...updatedElement,
			id,
			_version,
			_lastChangedAt,
			_deleted,
		};
	}
}

class ExclusiveStorage implements StorageFacade {
	private storage: StorageClass;
	private readonly mutex = new Mutex();
	constructor(
		schema: InternalSchema,
		namespaceResolver: NamespaceResolver,
		getModelConstructorByModelName: (
			namsespaceName: string,
			modelName: string
		) => PersistentModelConstructor<any>,
		modelInstanceCreator: ModelInstanceCreator,
		adapter?: Adapter,
		sessionId?: string
	) {
		this.storage = new StorageClass(
			schema,
			namespaceResolver,
			getModelConstructorByModelName,
			modelInstanceCreator,
			adapter,
			sessionId
		);
	}

	runExclusive<T>(fn: (storage: StorageClass) => Promise<T>) {
		return <Promise<T>>this.mutex.runExclusive(fn.bind(this, this.storage));
	}

	async save<T extends PersistentModel>(
		model: T,
		condition?: ModelPredicate<T>,
		mutator?: Symbol,
		patchesTuple?: [Patch[], PersistentModel]
	): Promise<[T, OpType.INSERT | OpType.UPDATE][]> {
		return this.runExclusive<[T, OpType.INSERT | OpType.UPDATE][]>(storage =>
			storage.save<T>(model, condition, mutator, patchesTuple)
		);
	}

	async delete<T extends PersistentModel>(
		model: T,
		condition?: ModelPredicate<T>,
		mutator?: Symbol
	): Promise<[T[], T[]]>;
	async delete<T extends PersistentModel>(
		modelConstructor: PersistentModelConstructor<T>,
		condition?: ModelPredicate<T>,
		mutator?: Symbol
	): Promise<[T[], T[]]>;
	async delete<T extends PersistentModel>(
		modelOrModelConstructor: T | PersistentModelConstructor<T>,
		condition?: ModelPredicate<T>,
		mutator?: Symbol
	): Promise<[T[], T[]]> {
		return this.runExclusive<[T[], T[]]>(storage => {
			if (isModelConstructor(modelOrModelConstructor)) {
				const modelConstructor = modelOrModelConstructor;

				return storage.delete(modelConstructor, condition, mutator);
			} else {
				const model = modelOrModelConstructor;

				return storage.delete(model, condition, mutator);
			}
		});
	}

	async query<T extends PersistentModel>(
		modelConstructor: PersistentModelConstructor<T>,
		predicate?: ModelPredicate<T>,
		pagination?: PaginationInput<T>
	): Promise<T[]> {
		return this.runExclusive<T[]>(storage =>
			storage.query<T>(modelConstructor, predicate, pagination)
		);
	}

	async queryOne<T extends PersistentModel>(
		modelConstructor: PersistentModelConstructor<T>,
		firstOrLast: QueryOne = QueryOne.FIRST
	): Promise<T> {
		return this.runExclusive<T>(storage =>
			storage.queryOne<T>(modelConstructor, firstOrLast)
		);
	}

	static getNamespace() {
		return StorageClass.getNamespace();
	}

	observe<T extends PersistentModel>(
		modelConstructor?: PersistentModelConstructor<T>,
		predicate?: ModelPredicate<T>,
		skipOwn?: Symbol
	): Observable<SubscriptionMessage<T>> {
		return this.storage.observe(modelConstructor, predicate, skipOwn);
	}

	async clear() {
		await this.storage.clear();
	}

	batchSave<T extends PersistentModel>(
		modelConstructor: PersistentModelConstructor<any>,
		items: ModelInstanceMetadata[]
	): Promise<[T, OpType][]> {
		return this.storage.batchSave(modelConstructor, items);
	}

	async init() {
		return this.storage.init();
	}
}

export { ExclusiveStorage };

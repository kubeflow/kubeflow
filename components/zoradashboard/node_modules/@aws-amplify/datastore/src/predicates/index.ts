import {
	AllOperators,
	ModelPredicate,
	PersistentModel,
	PredicateExpression,
	PredicateGroups,
	PredicatesGroup,
	ProducerModelPredicate,
	SchemaModel,
} from '../types';
import { exhaustiveCheck } from '../util';

export { ModelSortPredicateCreator } from './sort';

const predicatesAllSet = new WeakSet<ProducerModelPredicate<any>>();

export function isPredicatesAll(
	predicate: any
): predicate is typeof PredicateAll {
	return predicatesAllSet.has(predicate);
}

// This symbol is not used at runtime, only its type (unique symbol)
export const PredicateAll = Symbol('A predicate that matches all records');

export class Predicates {
	public static get ALL(): typeof PredicateAll {
		const predicate = <ProducerModelPredicate<any>>(c => c);

		predicatesAllSet.add(predicate);

		return <typeof PredicateAll>(<unknown>predicate);
	}
}

export class ModelPredicateCreator {
	private static predicateGroupsMap = new WeakMap<
		ModelPredicate<any>,
		PredicatesGroup<any>
	>();

	private static createPredicateBuilder<T extends PersistentModel>(
		modelDefinition: SchemaModel
	) {
		const { name: modelName } = modelDefinition;
		const fieldNames = new Set<keyof T>(Object.keys(modelDefinition.fields));

		let handler: ProxyHandler<ModelPredicate<T>>;
		const predicate = new Proxy(
			{} as ModelPredicate<T>,
			(handler = {
				get(
					_target,
					propertyKey,
					receiver: ModelPredicate<T>
				): PredicateExpression<T, any> {
					const groupType = propertyKey as keyof PredicateGroups<T>;

					switch (groupType) {
						case 'and':
						case 'or':
						case 'not':
							const result: PredicateExpression<T, any> = (
								newPredicate: (criteria: ModelPredicate<T>) => ModelPredicate<T>
							) => {
								const group: PredicatesGroup<T> = {
									type: groupType,
									predicates: [],
								};

								// Create a new recorder
								const tmpPredicateRecorder = new Proxy(
									{} as ModelPredicate<T>,
									handler
								);

								// Set the recorder group
								ModelPredicateCreator.predicateGroupsMap.set(
									tmpPredicateRecorder,
									group
								);

								// Apply the predicates to the recorder (this is the step that records the changes)
								newPredicate(tmpPredicateRecorder);

								// Push the group to the top-level recorder
								ModelPredicateCreator.predicateGroupsMap
									.get(receiver)
									.predicates.push(group);

								return receiver;
							};

							return result;
						default:
							exhaustiveCheck(groupType, false);
					}

					const field = propertyKey as keyof T;

					if (!fieldNames.has(field)) {
						throw new Error(
							`Invalid field for model. field: ${field}, model: ${modelName}`
						);
					}

					const result: PredicateExpression<T, any> = (
						operator: keyof AllOperators,
						operand: any
					) => {
						ModelPredicateCreator.predicateGroupsMap
							.get(receiver)
							.predicates.push({ field, operator, operand });
						return receiver;
					};
					return result;
				},
			})
		);

		const group: PredicatesGroup<T> = {
			type: 'and',
			predicates: [],
		};
		ModelPredicateCreator.predicateGroupsMap.set(predicate, group);

		return predicate;
	}

	static isValidPredicate<T extends PersistentModel>(
		predicate: any
	): predicate is ModelPredicate<T> {
		return ModelPredicateCreator.predicateGroupsMap.has(predicate);
	}

	static getPredicates<T extends PersistentModel>(
		predicate: ModelPredicate<T>,
		throwOnInvalid: boolean = true
	) {
		if (throwOnInvalid && !ModelPredicateCreator.isValidPredicate(predicate)) {
			throw new Error('The predicate is not valid');
		}

		return ModelPredicateCreator.predicateGroupsMap.get(predicate);
	}

	// transforms cb-style predicate into Proxy
	static createFromExisting<T extends PersistentModel>(
		modelDefinition: SchemaModel,
		existing: ProducerModelPredicate<T>
	) {
		if (!existing || !modelDefinition) {
			return undefined;
		}

		return existing(
			ModelPredicateCreator.createPredicateBuilder(modelDefinition)
		);
	}

	static createForId<T extends PersistentModel>(
		modelDefinition: SchemaModel,
		id: string
	) {
		return ModelPredicateCreator.createPredicateBuilder<T>(modelDefinition).id(
			'eq',
			<any>id
		);
	}
}

import {
	PersistentModel,
	SchemaModel,
	SortPredicate,
	ProducerSortPredicate,
	SortDirection,
	SortPredicatesGroup,
} from '../types';

export class ModelSortPredicateCreator {
	private static sortPredicateGroupsMap = new WeakMap<
		SortPredicate<any>,
		SortPredicatesGroup<any>
	>();

	private static createPredicateBuilder<T extends PersistentModel>(
		modelDefinition: SchemaModel
	) {
		const { name: modelName } = modelDefinition;
		const fieldNames = new Set<keyof T>(Object.keys(modelDefinition.fields));

		let handler: ProxyHandler<SortPredicate<T>>;
		const predicate = new Proxy(
			{} as SortPredicate<T>,
			(handler = {
				get(_target, propertyKey, receiver: SortPredicate<T>) {
					const field = propertyKey as keyof T;

					if (!fieldNames.has(field)) {
						throw new Error(
							`Invalid field for model. field: ${field}, model: ${modelName}`
						);
					}

					const result = (sortDirection: SortDirection) => {
						ModelSortPredicateCreator.sortPredicateGroupsMap
							.get(receiver)
							.push({ field, sortDirection });

						return receiver;
					};
					return result;
				},
			})
		);

		ModelSortPredicateCreator.sortPredicateGroupsMap.set(predicate, []);

		return predicate;
	}

	static isValidPredicate<T extends PersistentModel>(
		predicate: any
	): predicate is SortPredicate<T> {
		return ModelSortPredicateCreator.sortPredicateGroupsMap.has(predicate);
	}

	static getPredicates<T extends PersistentModel>(
		predicate: SortPredicate<T>,
		throwOnInvalid: boolean = true
	): SortPredicatesGroup<T> {
		if (
			throwOnInvalid &&
			!ModelSortPredicateCreator.isValidPredicate(predicate)
		) {
			throw new Error('The predicate is not valid');
		}

		return ModelSortPredicateCreator.sortPredicateGroupsMap.get(predicate);
	}

	// transforms cb-style predicate into Proxy
	static createFromExisting<T extends PersistentModel>(
		modelDefinition: SchemaModel,
		existing: ProducerSortPredicate<T>
	) {
		if (!existing || !modelDefinition) {
			return undefined;
		}

		return existing(
			ModelSortPredicateCreator.createPredicateBuilder(modelDefinition)
		);
	}
}

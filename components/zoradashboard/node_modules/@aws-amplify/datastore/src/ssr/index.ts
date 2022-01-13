import {
	PersistentModel,
	PersistentModelConstructor,
} from '@aws-amplify/datastore';

// Helper for converting JSON back into DataStore models (while respecting IDs)
export function deserializeModel<T extends PersistentModel>(
	Model: PersistentModelConstructor<T>,
	init: T | T[]
) {
	if (Array.isArray(init)) {
		return init.map(init => deserializeModel(Model, init));
	}

	// `fromJSON` is intentionally hidden from types as a "private" method (though it exists on the instance)
	// @ts-ignore Property 'fromJSON' does not exist on type 'PersistentModelConstructor<T>'.ts(2339)
	return Model.fromJSON(init);
}

// Helper for converting DataStore models to JSON
export function serializeModel<T extends PersistentModel>(
	model: T | T[]
): JSON {
	return JSON.parse(JSON.stringify(model));
}

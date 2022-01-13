import { ModelInstanceCreator } from './datastore/datastore';
import {
	exhaustiveCheck,
	isAWSDate,
	isAWSTime,
	isAWSDateTime,
	isAWSTimestamp,
	isAWSEmail,
	isAWSJSON,
	isAWSURL,
	isAWSPhone,
	isAWSIPAddress,
} from './util';
import { PredicateAll } from './predicates';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';

//#region Schema types
export type Schema = UserSchema & {
	version: string;
};
export type UserSchema = {
	models: SchemaModels;
	nonModels?: SchemaNonModels;
	relationships?: RelationshipType;
	keys?: ModelKeys;
	enums: SchemaEnums;
	modelTopologicalOrdering?: Map<string, string[]>;
};
export type InternalSchema = {
	namespaces: SchemaNamespaces;
	version: string;
};
export type SchemaNamespaces = Record<string, SchemaNamespace>;
export type SchemaNamespace = UserSchema & {
	name: string;
};
export type SchemaModels = Record<string, SchemaModel>;
export type SchemaModel = {
	name: string;
	pluralName: string;
	attributes?: ModelAttributes;
	fields: ModelFields;
	syncable?: boolean;
};
export function isSchemaModel(obj: any): obj is SchemaModel {
	return obj && (<SchemaModel>obj).pluralName !== undefined;
}
export type SchemaNonModels = Record<string, SchemaNonModel>;
export type SchemaNonModel = {
	name: string;
	fields: ModelFields;
};
type SchemaEnums = Record<string, SchemaEnum>;
type SchemaEnum = {
	name: string;
	values: string[];
};

export type ModelAssociation = AssociatedWith | TargetNameAssociation;
type AssociatedWith = {
	connectionType: 'HAS_MANY' | 'HAS_ONE';
	associatedWith: string;
	targetName?: string;
};
export function isAssociatedWith(obj: any): obj is AssociatedWith {
	return obj && obj.associatedWith;
}

type TargetNameAssociation = {
	connectionType: 'BELONGS_TO';
	targetName: string;
};
export function isTargetNameAssociation(
	obj: any
): obj is TargetNameAssociation {
	return obj && obj.targetName;
}

export type ModelAttributes = ModelAttribute[];
type ModelAttribute = { type: string; properties?: Record<string, any> };

type ModelAttributeKey = {
	type: 'key';
	properties: {
		name?: string;
		fields: string[];
	};
};

type ModelAttributePrimaryKey = {
	type: 'key';
	properties: {
		fields: string[];
	};
};

type ModelAttributeCompositeKey = {
	type: 'key';
	properties: {
		name: string;
		fields: [string, string, string, string?, string?];
	};
};

export function isModelAttributeKey(
	attr: ModelAttribute
): attr is ModelAttributeKey {
	return (
		attr.type === 'key' &&
		attr.properties &&
		attr.properties.fields &&
		attr.properties.fields.length > 0
	);
}

export function isModelAttributePrimaryKey(
	attr: ModelAttribute
): attr is ModelAttributePrimaryKey {
	return isModelAttributeKey(attr) && attr.properties.name === undefined;
}

export function isModelAttributeCompositeKey(
	attr: ModelAttribute
): attr is ModelAttributeCompositeKey {
	return (
		isModelAttributeKey(attr) &&
		attr.properties.name !== undefined &&
		attr.properties.fields.length > 2
	);
}

export type ModelAttributeAuthProperty = {
	allow: ModelAttributeAuthAllow;
	identityClaim?: string;
	groupClaim?: string;
	groups?: string[];
	operations?: string[];
	ownerField?: string;
	provider?: ModelAttributeAuthProvider;
};

export enum ModelAttributeAuthAllow {
	CUSTOM = 'custom',
	OWNER = 'owner',
	GROUPS = 'groups',
	PRIVATE = 'private',
	PUBLIC = 'public',
}

export enum ModelAttributeAuthProvider {
	FUNCTION = 'function',
	USER_POOLS = 'userPools',
	OIDC = 'oidc',
	IAM = 'iam',
	API_KEY = 'apiKey',
}

export type ModelFields = Record<string, ModelField>;
export enum GraphQLScalarType {
	ID,
	String,
	Int,
	Float,
	Boolean,
	AWSDate,
	AWSTime,
	AWSDateTime,
	AWSTimestamp,
	AWSEmail,
	AWSJSON,
	AWSURL,
	AWSPhone,
	AWSIPAddress,
}

export namespace GraphQLScalarType {
	export function getJSType(
		scalar: keyof Omit<
			typeof GraphQLScalarType,
			'getJSType' | 'getValidationFunction'
		>
	): 'string' | 'number' | 'boolean' {
		switch (scalar) {
			case 'Boolean':
				return 'boolean';
			case 'ID':
			case 'String':
			case 'AWSDate':
			case 'AWSTime':
			case 'AWSDateTime':
			case 'AWSEmail':
			case 'AWSJSON':
			case 'AWSURL':
			case 'AWSPhone':
			case 'AWSIPAddress':
				return 'string';
			case 'Int':
			case 'Float':
			case 'AWSTimestamp':
				return 'number';
			default:
				exhaustiveCheck(scalar);
		}
	}

	export function getValidationFunction(
		scalar: keyof Omit<
			typeof GraphQLScalarType,
			'getJSType' | 'getValidationFunction'
		>
	): ((val: string | number) => boolean) | undefined {
		switch (scalar) {
			case 'AWSDate':
				return isAWSDate;
			case 'AWSTime':
				return isAWSTime;
			case 'AWSDateTime':
				return isAWSDateTime;
			case 'AWSTimestamp':
				return isAWSTimestamp;
			case 'AWSEmail':
				return isAWSEmail;
			case 'AWSJSON':
				return isAWSJSON;
			case 'AWSURL':
				return isAWSURL;
			case 'AWSPhone':
				return isAWSPhone;
			case 'AWSIPAddress':
				return isAWSIPAddress;
			default:
				return undefined;
		}
	}
}

export type AuthorizationRule = {
	identityClaim: string;
	ownerField: string;
	provider: 'userPools' | 'oidc' | 'iam' | 'apiKey';
	groupClaim: string;
	groups: [string];
	authStrategy: 'owner' | 'groups' | 'private' | 'public';
	areSubscriptionsPublic: boolean;
};

export function isGraphQLScalarType(
	obj: any
): obj is keyof Omit<
	typeof GraphQLScalarType,
	'getJSType' | 'getValidationFunction'
> {
	return obj && GraphQLScalarType[obj] !== undefined;
}

export type ModelFieldType = { model: string };
export function isModelFieldType(obj: any): obj is ModelFieldType {
	const modelField: keyof ModelFieldType = 'model';
	if (obj && obj[modelField]) return true;

	return false;
}

export type NonModelFieldType = { nonModel: string };
export function isNonModelFieldType(obj: any): obj is NonModelFieldType {
	const typeField: keyof NonModelFieldType = 'nonModel';
	if (obj && obj[typeField]) return true;

	return false;
}

type EnumFieldType = { enum: string };
export function isEnumFieldType(obj: any): obj is EnumFieldType {
	const modelField: keyof EnumFieldType = 'enum';
	if (obj && obj[modelField]) return true;

	return false;
}

type ModelField = {
	name: string;
	type:
		| keyof Omit<
				typeof GraphQLScalarType,
				'getJSType' | 'getValidationFunction'
		  >
		| ModelFieldType
		| NonModelFieldType
		| EnumFieldType;
	isArray: boolean;
	isRequired?: boolean;
	isReadOnly?: boolean;
	isArrayNullable?: boolean;
	association?: ModelAssociation;
	attributes?: ModelAttributes[];
};
//#endregion

//#region Model definition
export type NonModelTypeConstructor<T> = {
	new (init: T): T;
};

// Class for model
export type PersistentModelConstructor<
	T extends PersistentModel,
	K extends PersistentModelMetaData = {
		readOnlyFields: 'createdAt' | 'updatedAt';
	}
> = {
	new (init: ModelInit<T, K>): T;
	copyOf(src: T, mutator: (draft: MutableModel<T, K>) => void): T;
};

export type TypeConstructorMap = Record<
	string,
	PersistentModelConstructor<any> | NonModelTypeConstructor<any>
>;

// Instance of model
export type PersistentModelMetaData = {
	readOnlyFields: string;
};

export type PersistentModel = Readonly<{ id: string } & Record<string, any>>;
export type ModelInit<
	T,
	K extends PersistentModelMetaData = {
		readOnlyFields: 'createdAt' | 'updatedAt';
	}
> = Omit<T, 'id' | K['readOnlyFields']>;
type DeepWritable<T> = {
	-readonly [P in keyof T]: T[P] extends TypeName<T[P]>
		? T[P]
		: DeepWritable<T[P]>;
};

export type MutableModel<
	T extends Record<string, any>,
	K extends PersistentModelMetaData = {
		readOnlyFields: 'createdAt' | 'updatedAt';
	}
	// This provides Intellisense with ALL of the properties, regardless of read-only
	// but will throw a linting error if trying to overwrite a read-only property
> = DeepWritable<Omit<T, 'id' | K['readOnlyFields']>> &
	Readonly<Pick<T, 'id' | K['readOnlyFields']>>;

export type ModelInstanceMetadata = {
	id: string;
	_version: number;
	_lastChangedAt: number;
	_deleted: boolean;
};

//#endregion

//#region Subscription messages
export enum OpType {
	INSERT = 'INSERT',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE',
}

export type SubscriptionMessage<T extends PersistentModel> = {
	opType: OpType;
	element: T;
	model: PersistentModelConstructor<T>;
	condition: PredicatesGroup<T> | null;
};
//#endregion

//#region Predicates

export type PredicateExpression<M extends PersistentModel, FT> = TypeName<
	FT
> extends keyof MapTypeToOperands<FT>
	? (
			operator: keyof MapTypeToOperands<FT>[TypeName<FT>],
			// make the operand type match the type they're trying to filter on
			operand: MapTypeToOperands<FT>[TypeName<FT>][keyof MapTypeToOperands<
				FT
			>[TypeName<FT>]]
	  ) => ModelPredicate<M>
	: never;

type EqualityOperators<T> = {
	ne: T;
	eq: T;
};
type ScalarNumberOperators<T> = EqualityOperators<T> & {
	le: T;
	lt: T;
	ge: T;
	gt: T;
};
type NumberOperators<T> = ScalarNumberOperators<T> & {
	between: [T, T];
};
type StringOperators<T> = ScalarNumberOperators<T> & {
	beginsWith: T;
	contains: T;
	notContains: T;
};
type BooleanOperators<T> = EqualityOperators<T>;
type ArrayOperators<T> = {
	contains: T;
	notContains: T;
};
export type AllOperators = NumberOperators<any> &
	StringOperators<any> &
	ArrayOperators<any>;

type MapTypeToOperands<T> = {
	number: NumberOperators<NonNullable<T>>;
	string: StringOperators<NonNullable<T>>;
	boolean: BooleanOperators<NonNullable<T>>;
	'number[]': ArrayOperators<number>;
	'string[]': ArrayOperators<string>;
	'boolean[]': ArrayOperators<boolean>;
};

type TypeName<T> = T extends string
	? 'string'
	: T extends number
	? 'number'
	: T extends boolean
	? 'boolean'
	: T extends string[]
	? 'string[]'
	: T extends number[]
	? 'number[]'
	: T extends boolean[]
	? 'boolean[]'
	: never;

export type PredicateGroups<T extends PersistentModel> = {
	and: (
		predicate: (predicate: ModelPredicate<T>) => ModelPredicate<T>
	) => ModelPredicate<T>;
	or: (
		predicate: (predicate: ModelPredicate<T>) => ModelPredicate<T>
	) => ModelPredicate<T>;
	not: (
		predicate: (predicate: ModelPredicate<T>) => ModelPredicate<T>
	) => ModelPredicate<T>;
};

export type ModelPredicate<M extends PersistentModel> = {
	[K in keyof M]-?: PredicateExpression<M, NonNullable<M[K]>>;
} &
	PredicateGroups<M>;

export type ProducerModelPredicate<M extends PersistentModel> = (
	condition: ModelPredicate<M>
) => ModelPredicate<M>;

export type PredicatesGroup<T extends PersistentModel> = {
	type: keyof PredicateGroups<T>;
	predicates: (PredicateObject<T> | PredicatesGroup<T>)[];
};

export function isPredicateObj<T extends PersistentModel>(
	obj: any
): obj is PredicateObject<T> {
	return obj && (<PredicateObject<T>>obj).field !== undefined;
}

export function isPredicateGroup<T extends PersistentModel>(
	obj: any
): obj is PredicatesGroup<T> {
	return obj && (<PredicatesGroup<T>>obj).type !== undefined;
}

export type PredicateObject<T extends PersistentModel> = {
	field: keyof T;
	operator: keyof AllOperators;
	operand: any;
};

export enum QueryOne {
	FIRST,
	LAST,
}
export type GraphQLField = {
	[field: string]: {
		[operator: string]: string | number | [number, number];
	};
};

export type GraphQLCondition = Partial<
	| GraphQLField
	| {
			and: [GraphQLCondition];
			or: [GraphQLCondition];
			not: GraphQLCondition;
	  }
>;

export type GraphQLFilter = Partial<
	| GraphQLField
	| {
			and: GraphQLFilter[];
	  }
	| {
			or: GraphQLFilter[];
	  }
	| {
			not: GraphQLFilter;
	  }
>;

//#endregion

//#region Pagination

export type ProducerPaginationInput<T extends PersistentModel> = {
	sort?: ProducerSortPredicate<T>;
	limit?: number;
	page?: number;
};

export type PaginationInput<T extends PersistentModel> = {
	sort?: SortPredicate<T>;
	limit?: number;
	page?: number;
};

export type ProducerSortPredicate<M extends PersistentModel> = (
	condition: SortPredicate<M>
) => SortPredicate<M>;

export type SortPredicate<T extends PersistentModel> = {
	[K in keyof T]-?: SortPredicateExpression<T, NonNullable<T[K]>>;
};

export type SortPredicateExpression<M extends PersistentModel, FT> = TypeName<
	FT
> extends keyof MapTypeToOperands<FT>
	? (sortDirection: keyof typeof SortDirection) => SortPredicate<M>
	: never;

export enum SortDirection {
	ASCENDING = 'ASCENDING',
	DESCENDING = 'DESCENDING',
}

export type SortPredicatesGroup<
	T extends PersistentModel
> = SortPredicateObject<T>[];

export type SortPredicateObject<T extends PersistentModel> = {
	field: keyof T;
	sortDirection: keyof typeof SortDirection;
};

//#endregion

//#region System Components

export type SystemComponent = {
	setUp(
		schema: InternalSchema,
		namespaceResolver: NamespaceResolver,
		modelInstanceCreator: ModelInstanceCreator,
		getModelConstructorByModelName: (
			namsespaceName: string,
			modelName: string
		) => PersistentModelConstructor<any>,
		appId: string
	): Promise<void>;
};

export type NamespaceResolver = (
	modelConstructor: PersistentModelConstructor<any>
) => string;

export type ControlMessageType<T> = {
	type: T;
	data?: any;
};

//#endregion

//#region Relationship types
export type RelationType = {
	fieldName: string;
	modelName: string;
	relationType: 'HAS_ONE' | 'HAS_MANY' | 'BELONGS_TO';
	targetName?: string;
	associatedWith?: string;
};

export type RelationshipType = {
	[modelName: string]: { indexes: string[]; relationTypes: RelationType[] };
};

//#endregion

//#region Key type
export type KeyType = {
	primaryKey?: string[];
	compositeKeys?: Set<string>[];
};

export type ModelKeys = {
	[modelName: string]: KeyType;
};

//#endregion

//#region DataStore config types
export type DataStoreConfig = {
	DataStore?: {
		authModeStrategyType?: AuthModeStrategyType;
		conflictHandler?: ConflictHandler; // default : retry until client wins up to x times
		errorHandler?: (error: SyncError) => void; // default : logger.warn
		maxRecordsToSync?: number; // merge
		syncPageSize?: number;
		fullSyncInterval?: number;
		syncExpressions?: SyncExpression[];
		authProviders?: AuthProviders;
	};
	authModeStrategyType?: AuthModeStrategyType;
	conflictHandler?: ConflictHandler; // default : retry until client wins up to x times
	errorHandler?: (error: SyncError) => void; // default : logger.warn
	maxRecordsToSync?: number; // merge
	syncPageSize?: number;
	fullSyncInterval?: number;
	syncExpressions?: SyncExpression[];
	authProviders?: AuthProviders;
};

export type AuthProviders = {
	functionAuthProvider: Promise<string>;
};

export enum AuthModeStrategyType {
	DEFAULT = 'DEFAULT',
	MULTI_AUTH = 'MULTI_AUTH',
}

export type AuthModeStrategyReturn =
	| GRAPHQL_AUTH_MODE
	| GRAPHQL_AUTH_MODE[]
	| undefined
	| null;

export type AuthModeStrategyParams = {
	schema: InternalSchema;
	modelName: string;
	operation: ModelOperation;
};

export type AuthModeStrategy = (
	authModeStrategyParams: AuthModeStrategyParams
) => AuthModeStrategyReturn | Promise<AuthModeStrategyReturn>;

export enum ModelOperation {
	CREATE = 'CREATE',
	READ = 'READ',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE',
}

export type ModelAuthModes = Record<
	string,
	{
		[Property in ModelOperation]: GRAPHQL_AUTH_MODE[];
	}
>;

export type SyncExpression = Promise<{
	modelConstructor: any;
	conditionProducer: (c?: any) => any;
}>;

/*
Adds Intellisense when passing a function | promise that returns a predicate
Or just a predicate. E.g.,

syncExpressions: [
	syncExpression(Post, c => c.rating('gt', 5)),

	OR

	syncExpression(Post, async () => {
		return c => c.rating('gt', 5)
	}),
]
*/
type Option0 = [];
type Option1<T extends PersistentModel> = [ModelPredicate<T> | undefined];
type Option<T extends PersistentModel> = Option0 | Option1<T>;

type Lookup<T extends PersistentModel> = {
	0:
		| ProducerModelPredicate<T>
		| Promise<ProducerModelPredicate<T>>
		| typeof PredicateAll;
	1: ModelPredicate<T> | undefined;
};

type ConditionProducer<T extends PersistentModel, A extends Option<T>> = (
	...args: A
) => A['length'] extends keyof Lookup<T> ? Lookup<T>[A['length']] : never;

export async function syncExpression<
	T extends PersistentModel,
	A extends Option<T>
>(
	modelConstructor: PersistentModelConstructor<T>,
	conditionProducer: ConditionProducer<T, A>
): Promise<{
	modelConstructor: PersistentModelConstructor<T>;
	conditionProducer: ConditionProducer<T, A>;
}> {
	return {
		modelConstructor,
		conditionProducer,
	};
}

export type SyncConflict = {
	modelConstructor: PersistentModelConstructor<any>;
	localModel: PersistentModel;
	remoteModel: PersistentModel;
	operation: OpType;
	attempts: number;
};

export type SyncError = {
	message: string;
	errorType: string;
	errorInfo: string;
	localModel: PersistentModel;
	remoteModel: PersistentModel;
	operation: string;
};

export const DISCARD = Symbol('DISCARD');

export type ConflictHandler = (
	conflict: SyncConflict
) =>
	| Promise<PersistentModel | typeof DISCARD>
	| PersistentModel
	| typeof DISCARD;
export type ErrorHandler = (error: SyncError) => void;
//#endregion

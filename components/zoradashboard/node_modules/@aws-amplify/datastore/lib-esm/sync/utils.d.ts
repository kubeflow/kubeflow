import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql';
import { GraphQLAuthError } from '@aws-amplify/api';
import { ModelInstanceCreator } from '../datastore/datastore';
import { AuthorizationRule, GraphQLCondition, GraphQLFilter, OpType, PersistentModel, PersistentModelConstructor, PredicatesGroup, RelationshipType, SchemaModel, SchemaNamespace, SchemaNonModel, ModelOperation, InternalSchema, AuthModeStrategy } from '../types';
import { MutationEvent } from './';
declare enum GraphQLOperationType {
    LIST = "query",
    CREATE = "mutation",
    UPDATE = "mutation",
    DELETE = "mutation",
    GET = "query"
}
export declare enum TransformerMutationType {
    CREATE = "Create",
    UPDATE = "Update",
    DELETE = "Delete",
    GET = "Get"
}
export declare function getMetadataFields(): ReadonlyArray<string>;
export declare function generateSelectionSet(namespace: SchemaNamespace, modelDefinition: SchemaModel | SchemaNonModel): string;
export declare function getAuthorizationRules(modelDefinition: SchemaModel): AuthorizationRule[];
export declare function buildSubscriptionGraphQLOperation(namespace: SchemaNamespace, modelDefinition: SchemaModel, transformerMutationType: TransformerMutationType, isOwnerAuthorization: boolean, ownerField: string): [TransformerMutationType, string, string];
export declare function buildGraphQLOperation(namespace: SchemaNamespace, modelDefinition: SchemaModel, graphQLOpType: keyof typeof GraphQLOperationType): [TransformerMutationType, string, string][];
export declare function createMutationInstanceFromModelOperation<T extends PersistentModel>(relationships: RelationshipType, modelDefinition: SchemaModel, opType: OpType, model: PersistentModelConstructor<T>, element: T, condition: GraphQLCondition, MutationEventConstructor: PersistentModelConstructor<MutationEvent>, modelInstanceCreator: ModelInstanceCreator, id?: string): MutationEvent;
export declare function predicateToGraphQLCondition(predicate: PredicatesGroup<any>): GraphQLCondition;
export declare function predicateToGraphQLFilter(predicatesGroup: PredicatesGroup<any>): GraphQLFilter;
export declare function getUserGroupsFromToken(token: {
    [field: string]: any;
}, rule: AuthorizationRule): string[];
export declare function getModelAuthModes({ authModeStrategy, defaultAuthMode, modelName, schema, }: {
    authModeStrategy: AuthModeStrategy;
    defaultAuthMode: GRAPHQL_AUTH_MODE;
    modelName: string;
    schema: InternalSchema;
}): Promise<{
    [key in ModelOperation]: GRAPHQL_AUTH_MODE[];
}>;
export declare function getForbiddenError(error: any): any;
export declare function getClientSideAuthError(error: any): GraphQLAuthError;
export declare function getTokenForCustomAuth(authMode: GRAPHQL_AUTH_MODE, amplifyConfig?: Record<string, any>): Promise<string | undefined>;
export {};

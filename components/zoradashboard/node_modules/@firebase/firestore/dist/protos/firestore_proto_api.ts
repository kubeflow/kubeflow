/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Rather than pull these in from other protos, we just alias them to any.
/*
   eslint-disable
   camelcase, @typescript-eslint/no-explicit-any,
   @typescript-eslint/naming-convention
*/
export declare type ApiClientHookFactory = any;
export declare type PromiseRequestService = any;
export interface ApiClientObjectMap<T> {
  [k: string]: T;
}
export declare type Timestamp =
  | string
  | { seconds?: string | number; nanos?: number };

export declare type CompositeFilterOp = 'OPERATOR_UNSPECIFIED' | 'AND';
export interface ICompositeFilterOpEnum {
  OPERATOR_UNSPECIFIED: CompositeFilterOp;
  AND: CompositeFilterOp;
  values(): CompositeFilterOp[];
}
export declare const CompositeFilterOpEnum: ICompositeFilterOpEnum;
export declare type FieldFilterOp =
  | 'OPERATOR_UNSPECIFIED'
  | 'LESS_THAN'
  | 'LESS_THAN_OR_EQUAL'
  | 'GREATER_THAN'
  | 'GREATER_THAN_OR_EQUAL'
  | 'EQUAL'
  | 'NOT_EQUAL'
  | 'ARRAY_CONTAINS'
  | 'IN'
  | 'ARRAY_CONTAINS_ANY'
  | 'NOT_IN';
export interface IFieldFilterOpEnum {
  OPERATOR_UNSPECIFIED: FieldFilterOp;
  LESS_THAN: FieldFilterOp;
  LESS_THAN_OR_EQUAL: FieldFilterOp;
  GREATER_THAN: FieldFilterOp;
  GREATER_THAN_OR_EQUAL: FieldFilterOp;
  EQUAL: FieldFilterOp;
  NOT_EQUAL: FieldFilterOp;
  ARRAY_CONTAINS: FieldFilterOp;
  IN: FieldFilterOp;
  ARRAY_CONTAINS_ANY: FieldFilterOp;
  NOT_IN: FieldFilterOp;
  values(): FieldFilterOp[];
}
export declare const FieldFilterOpEnum: IFieldFilterOpEnum;
export declare type FieldTransformSetToServerValue =
  | 'SERVER_VALUE_UNSPECIFIED'
  | 'REQUEST_TIME';
export interface IFieldTransformSetToServerValueEnum {
  SERVER_VALUE_UNSPECIFIED: FieldTransformSetToServerValue;
  REQUEST_TIME: FieldTransformSetToServerValue;
  values(): FieldTransformSetToServerValue[];
}
export declare const FieldTransformSetToServerValueEnum: IFieldTransformSetToServerValueEnum;
export declare type IndexFieldMode =
  | 'MODE_UNSPECIFIED'
  | 'ASCENDING'
  | 'DESCENDING';
export interface IIndexFieldModeEnum {
  MODE_UNSPECIFIED: IndexFieldMode;
  ASCENDING: IndexFieldMode;
  DESCENDING: IndexFieldMode;
  values(): IndexFieldMode[];
}
export declare const IndexFieldModeEnum: IIndexFieldModeEnum;
export declare type IndexState =
  | 'STATE_UNSPECIFIED'
  | 'CREATING'
  | 'READY'
  | 'ERROR';
export interface IIndexStateEnum {
  STATE_UNSPECIFIED: IndexState;
  CREATING: IndexState;
  READY: IndexState;
  ERROR: IndexState;
  values(): IndexState[];
}
export declare const IndexStateEnum: IIndexStateEnum;
export declare type OrderDirection =
  | 'DIRECTION_UNSPECIFIED'
  | 'ASCENDING'
  | 'DESCENDING';
export interface IOrderDirectionEnum {
  DIRECTION_UNSPECIFIED: OrderDirection;
  ASCENDING: OrderDirection;
  DESCENDING: OrderDirection;
  values(): OrderDirection[];
}
export declare const OrderDirectionEnum: IOrderDirectionEnum;
export declare type TargetChangeTargetChangeType =
  | 'NO_CHANGE'
  | 'ADD'
  | 'REMOVE'
  | 'CURRENT'
  | 'RESET';
export interface ITargetChangeTargetChangeTypeEnum {
  NO_CHANGE: TargetChangeTargetChangeType;
  ADD: TargetChangeTargetChangeType;
  REMOVE: TargetChangeTargetChangeType;
  CURRENT: TargetChangeTargetChangeType;
  RESET: TargetChangeTargetChangeType;
  values(): TargetChangeTargetChangeType[];
}
export declare const TargetChangeTargetChangeTypeEnum: ITargetChangeTargetChangeTypeEnum;
export declare type UnaryFilterOp =
  | 'OPERATOR_UNSPECIFIED'
  | 'IS_NAN'
  | 'IS_NULL'
  | 'IS_NOT_NAN'
  | 'IS_NOT_NULL';
export interface IUnaryFilterOpEnum {
  OPERATOR_UNSPECIFIED: UnaryFilterOp;
  IS_NAN: UnaryFilterOp;
  IS_NULL: UnaryFilterOp;
  IS_NOT_NAN: UnaryFilterOp;
  IS_NOT_NULL: UnaryFilterOp;
  values(): UnaryFilterOp[];
}
export declare const UnaryFilterOpEnum: IUnaryFilterOpEnum;
export declare type ValueNullValue = 'NULL_VALUE';
export interface IValueNullValueEnum {
  NULL_VALUE: ValueNullValue;
  values(): ValueNullValue[];
}
export declare const ValueNullValueEnum: IValueNullValueEnum;
export declare namespace firestoreV1ApiClientInterfaces {
  interface ArrayValue {
    values?: Value[];
  }
  interface BatchGetDocumentsRequest {
    database?: string;
    documents?: string[];
    mask?: DocumentMask;
    transaction?: string;
    newTransaction?: TransactionOptions;
    readTime?: string;
  }
  interface BatchGetDocumentsResponse {
    found?: Document;
    missing?: string;
    transaction?: string;
    readTime?: string;
  }
  interface BeginTransactionRequest {
    options?: TransactionOptions;
  }
  interface BeginTransactionResponse {
    transaction?: string;
  }
  interface CollectionSelector {
    collectionId?: string;
    allDescendants?: boolean;
  }
  interface CommitRequest {
    database?: string;
    writes?: Write[];
    transaction?: string;
  }
  interface CommitResponse {
    writeResults?: WriteResult[];
    commitTime?: string;
  }
  interface CompositeFilter {
    op?: CompositeFilterOp;
    filters?: Filter[];
  }
  interface Cursor {
    values?: Value[];
    before?: boolean;
  }
  interface Document {
    name?: string;
    fields?: ApiClientObjectMap<Value>;
    createTime?: Timestamp;
    updateTime?: Timestamp;
  }
  interface DocumentChange {
    document?: Document;
    targetIds?: number[];
    removedTargetIds?: number[];
  }
  interface DocumentDelete {
    document?: string;
    removedTargetIds?: number[];
    readTime?: Timestamp;
  }
  interface DocumentMask {
    fieldPaths?: string[];
  }
  interface DocumentRemove {
    document?: string;
    removedTargetIds?: number[];
    readTime?: string;
  }
  interface DocumentTransform {
    document?: string;
    fieldTransforms?: FieldTransform[];
  }
  interface DocumentsTarget {
    documents?: string[];
  }
  interface Empty {}
  interface ExistenceFilter {
    targetId?: number;
    count?: number;
  }
  interface FieldFilter {
    field?: FieldReference;
    op?: FieldFilterOp;
    value?: Value;
  }
  interface FieldReference {
    fieldPath?: string;
  }
  interface FieldTransform {
    fieldPath?: string;
    setToServerValue?: FieldTransformSetToServerValue;
    appendMissingElements?: ArrayValue;
    removeAllFromArray?: ArrayValue;
    increment?: Value;
  }
  interface Filter {
    compositeFilter?: CompositeFilter;
    fieldFilter?: FieldFilter;
    unaryFilter?: UnaryFilter;
  }
  interface Index {
    name?: string;
    collectionId?: string;
    fields?: IndexField[];
    state?: IndexState;
  }
  interface IndexField {
    fieldPath?: string;
    mode?: IndexFieldMode;
  }
  interface LatLng {
    latitude?: number;
    longitude?: number;
  }
  interface ListCollectionIdsRequest {
    pageSize?: number;
    pageToken?: string;
  }
  interface ListCollectionIdsResponse {
    collectionIds?: string[];
    nextPageToken?: string;
  }
  interface ListDocumentsResponse {
    documents?: Document[];
    nextPageToken?: string;
  }
  interface ListIndexesResponse {
    indexes?: Index[];
    nextPageToken?: string;
  }
  interface ListenRequest {
    addTarget?: Target;
    removeTarget?: number;
    labels?: ApiClientObjectMap<string>;
  }
  interface ListenResponse {
    targetChange?: TargetChange;
    documentChange?: DocumentChange;
    documentDelete?: DocumentDelete;
    documentRemove?: DocumentRemove;
    filter?: ExistenceFilter;
  }
  interface MapValue {
    fields?: ApiClientObjectMap<Value>;
  }
  interface Operation {
    name?: string;
    metadata?: ApiClientObjectMap<any>;
    done?: boolean;
    error?: Status;
    response?: ApiClientObjectMap<any>;
  }
  interface Order {
    field?: FieldReference;
    direction?: OrderDirection;
  }
  interface Precondition {
    exists?: boolean;
    updateTime?: Timestamp;
  }
  interface Projection {
    fields?: FieldReference[];
  }
  interface QueryTarget {
    parent?: string;
    structuredQuery?: StructuredQuery;
  }
  interface ReadOnly {
    readTime?: string;
  }
  interface ReadWrite {
    retryTransaction?: string;
  }
  interface RollbackRequest {
    transaction?: string;
  }
  interface RunQueryRequest {
    parent?: string;
    structuredQuery?: StructuredQuery;
    transaction?: string;
    newTransaction?: TransactionOptions;
    readTime?: string;
  }
  interface RunQueryResponse {
    transaction?: string;
    document?: Document;
    readTime?: string;
    skippedResults?: number;
  }
  interface Status {
    code?: number;
    message?: string;
    details?: Array<ApiClientObjectMap<any>>;
  }
  interface StructuredQuery {
    select?: Projection;
    from?: CollectionSelector[];
    where?: Filter;
    orderBy?: Order[];
    startAt?: Cursor;
    endAt?: Cursor;
    offset?: number;
    limit?: number | { value: number };
  }
  interface Target {
    query?: QueryTarget;
    documents?: DocumentsTarget;
    resumeToken?: string | Uint8Array;
    readTime?: Timestamp;
    targetId?: number;
    once?: boolean;
  }
  interface TargetChange {
    targetChangeType?: TargetChangeTargetChangeType;
    targetIds?: number[];
    cause?: Status;
    resumeToken?: string | Uint8Array;
    readTime?: Timestamp;
  }
  interface TransactionOptions {
    readOnly?: ReadOnly;
    readWrite?: ReadWrite;
  }
  interface UnaryFilter {
    op?: UnaryFilterOp;
    field?: FieldReference;
  }
  interface Value {
    nullValue?: ValueNullValue;
    booleanValue?: boolean;
    integerValue?: string | number;
    doubleValue?: string | number;
    timestampValue?: Timestamp;
    stringValue?: string;
    bytesValue?: string | Uint8Array;
    referenceValue?: string;
    geoPointValue?: LatLng;
    arrayValue?: ArrayValue;
    mapValue?: MapValue;
  }
  interface Write {
    update?: Document;
    delete?: string;
    verify?: string;
    transform?: DocumentTransform;
    updateMask?: DocumentMask;
    updateTransforms?: FieldTransform[];
    currentDocument?: Precondition;
  }
  interface WriteRequest {
    streamId?: string;
    writes?: Write[];
    streamToken?: string | Uint8Array;
    labels?: ApiClientObjectMap<string>;
  }
  interface WriteResponse {
    streamId?: string;
    streamToken?: string | Uint8Array;
    writeResults?: WriteResult[];
    commitTime?: Timestamp;
  }
  interface WriteResult {
    updateTime?: Timestamp;
    transformResults?: Value[];
  }
}
export declare type ArrayValue = firestoreV1ApiClientInterfaces.ArrayValue;
export declare type BatchGetDocumentsRequest = firestoreV1ApiClientInterfaces.BatchGetDocumentsRequest;
export declare type BatchGetDocumentsResponse = firestoreV1ApiClientInterfaces.BatchGetDocumentsResponse;
export declare type BeginTransactionRequest = firestoreV1ApiClientInterfaces.BeginTransactionRequest;
export declare type BeginTransactionResponse = firestoreV1ApiClientInterfaces.BeginTransactionResponse;
export declare type CollectionSelector = firestoreV1ApiClientInterfaces.CollectionSelector;
export declare type CommitRequest = firestoreV1ApiClientInterfaces.CommitRequest;
export declare type CommitResponse = firestoreV1ApiClientInterfaces.CommitResponse;
export declare type CompositeFilter = firestoreV1ApiClientInterfaces.CompositeFilter;
export declare type Cursor = firestoreV1ApiClientInterfaces.Cursor;
export declare type Document = firestoreV1ApiClientInterfaces.Document;
export declare type DocumentChange = firestoreV1ApiClientInterfaces.DocumentChange;
export declare type DocumentDelete = firestoreV1ApiClientInterfaces.DocumentDelete;
export declare type DocumentMask = firestoreV1ApiClientInterfaces.DocumentMask;
export declare type DocumentRemove = firestoreV1ApiClientInterfaces.DocumentRemove;
export declare type DocumentTransform = firestoreV1ApiClientInterfaces.DocumentTransform;
export declare type DocumentsTarget = firestoreV1ApiClientInterfaces.DocumentsTarget;
export declare type Empty = firestoreV1ApiClientInterfaces.Empty;
export declare type ExistenceFilter = firestoreV1ApiClientInterfaces.ExistenceFilter;
export declare type FieldFilter = firestoreV1ApiClientInterfaces.FieldFilter;
export declare type FieldReference = firestoreV1ApiClientInterfaces.FieldReference;
export declare type FieldTransform = firestoreV1ApiClientInterfaces.FieldTransform;
export declare type Filter = firestoreV1ApiClientInterfaces.Filter;
export declare type Index = firestoreV1ApiClientInterfaces.Index;
export declare type IndexField = firestoreV1ApiClientInterfaces.IndexField;
export declare type LatLng = firestoreV1ApiClientInterfaces.LatLng;
export declare type ListCollectionIdsRequest = firestoreV1ApiClientInterfaces.ListCollectionIdsRequest;
export declare type ListCollectionIdsResponse = firestoreV1ApiClientInterfaces.ListCollectionIdsResponse;
export declare type ListDocumentsResponse = firestoreV1ApiClientInterfaces.ListDocumentsResponse;
export declare type ListIndexesResponse = firestoreV1ApiClientInterfaces.ListIndexesResponse;
export declare type ListenRequest = firestoreV1ApiClientInterfaces.ListenRequest;
export declare type ListenResponse = firestoreV1ApiClientInterfaces.ListenResponse;
export declare type MapValue = firestoreV1ApiClientInterfaces.MapValue;
export declare type Operation = firestoreV1ApiClientInterfaces.Operation;
export declare type Order = firestoreV1ApiClientInterfaces.Order;
export declare type Precondition = firestoreV1ApiClientInterfaces.Precondition;
export declare type Projection = firestoreV1ApiClientInterfaces.Projection;
export declare type QueryTarget = firestoreV1ApiClientInterfaces.QueryTarget;
export declare type ReadOnly = firestoreV1ApiClientInterfaces.ReadOnly;
export declare type ReadWrite = firestoreV1ApiClientInterfaces.ReadWrite;
export declare type RollbackRequest = firestoreV1ApiClientInterfaces.RollbackRequest;
export declare type RunQueryRequest = firestoreV1ApiClientInterfaces.RunQueryRequest;
export declare type RunQueryResponse = firestoreV1ApiClientInterfaces.RunQueryResponse;
export declare type Status = firestoreV1ApiClientInterfaces.Status;
export declare type StructuredQuery = firestoreV1ApiClientInterfaces.StructuredQuery;
export declare type Target = firestoreV1ApiClientInterfaces.Target;
export declare type TargetChange = firestoreV1ApiClientInterfaces.TargetChange;
export declare type TransactionOptions = firestoreV1ApiClientInterfaces.TransactionOptions;
export declare type UnaryFilter = firestoreV1ApiClientInterfaces.UnaryFilter;
export declare type Value = firestoreV1ApiClientInterfaces.Value;
export declare type Write = firestoreV1ApiClientInterfaces.Write;
export declare type WriteRequest = firestoreV1ApiClientInterfaces.WriteRequest;
export declare type WriteResponse = firestoreV1ApiClientInterfaces.WriteResponse;
export declare type WriteResult = firestoreV1ApiClientInterfaces.WriteResult;
export declare type ProjectsDatabasesDocumentsApiClient$Xgafv = '1' | '2';
export interface IProjectsDatabasesDocumentsApiClient$XgafvEnum {
  1: ProjectsDatabasesDocumentsApiClient$Xgafv;
  2: ProjectsDatabasesDocumentsApiClient$Xgafv;
  values(): ProjectsDatabasesDocumentsApiClient$Xgafv[];
}
export declare const ProjectsDatabasesDocumentsApiClient$XgafvEnum: IProjectsDatabasesDocumentsApiClient$XgafvEnum;
export declare type ProjectsDatabasesDocumentsApiClientAlt =
  | 'json'
  | 'media'
  | 'proto';
export interface IProjectsDatabasesDocumentsApiClientAltEnum {
  JSON: ProjectsDatabasesDocumentsApiClientAlt;
  MEDIA: ProjectsDatabasesDocumentsApiClientAlt;
  PROTO: ProjectsDatabasesDocumentsApiClientAlt;
  values(): ProjectsDatabasesDocumentsApiClientAlt[];
}
export declare const ProjectsDatabasesDocumentsApiClientAltEnum: IProjectsDatabasesDocumentsApiClientAltEnum;
export interface ProjectsDatabasesDocumentsBatchGetNamedParameters {
  access_token?: string;
  alt?: ProjectsDatabasesDocumentsApiClientAlt;
  bearer_token?: string;
  callback?: string;
  fields?: string;
  key?: string;
  oauth_token?: string;
  pp?: boolean;
  prettyPrint?: boolean;
  quotaUser?: string;
  upload_protocol?: string;
  uploadType?: string;
  $Xgafv?: ProjectsDatabasesDocumentsApiClient$Xgafv;
}
export interface ProjectsDatabasesDocumentsBeginTransactionNamedParameters {
  access_token?: string;
  alt?: ProjectsDatabasesDocumentsApiClientAlt;
  bearer_token?: string;
  callback?: string;
  fields?: string;
  key?: string;
  oauth_token?: string;
  pp?: boolean;
  prettyPrint?: boolean;
  quotaUser?: string;
  upload_protocol?: string;
  uploadType?: string;
  $Xgafv?: ProjectsDatabasesDocumentsApiClient$Xgafv;
}
export interface ProjectsDatabasesDocumentsCommitNamedParameters {
  access_token?: string;
  alt?: ProjectsDatabasesDocumentsApiClientAlt;
  bearer_token?: string;
  callback?: string;
  fields?: string;
  key?: string;
  oauth_token?: string;
  pp?: boolean;
  prettyPrint?: boolean;
  quotaUser?: string;
  upload_protocol?: string;
  uploadType?: string;
  $Xgafv?: ProjectsDatabasesDocumentsApiClient$Xgafv;
}
export interface ProjectsDatabasesDocumentsCreateDocumentNamedParameters {
  access_token?: string;
  alt?: ProjectsDatabasesDocumentsApiClientAlt;
  bearer_token?: string;
  callback?: string;
  fields?: string;
  key?: string;
  oauth_token?: string;
  pp?: boolean;
  prettyPrint?: boolean;
  quotaUser?: string;
  upload_protocol?: string;
  uploadType?: string;
  $Xgafv?: ProjectsDatabasesDocumentsApiClient$Xgafv;
  documentId?: string;
  maskFieldPaths?: string[];
}
export interface ProjectsDatabasesDocumentsDeleteNamedParameters {
  access_token?: string;
  alt?: ProjectsDatabasesDocumentsApiClientAlt;
  bearer_token?: string;
  callback?: string;
  fields?: string;
  key?: string;
  oauth_token?: string;
  pp?: boolean;
  prettyPrint?: boolean;
  quotaUser?: string;
  upload_protocol?: string;
  uploadType?: string;
  $Xgafv?: ProjectsDatabasesDocumentsApiClient$Xgafv;
  currentDocumentExists?: boolean;
  currentDocumentUpdateTime?: string;
}
export interface ProjectsDatabasesDocumentsGetNamedParameters {
  access_token?: string;
  alt?: ProjectsDatabasesDocumentsApiClientAlt;
  bearer_token?: string;
  callback?: string;
  fields?: string;
  key?: string;
  oauth_token?: string;
  pp?: boolean;
  prettyPrint?: boolean;
  quotaUser?: string;
  upload_protocol?: string;
  uploadType?: string;
  $Xgafv?: ProjectsDatabasesDocumentsApiClient$Xgafv;
  maskFieldPaths?: string[];
  transaction?: string;
  readTime?: string;
}
export interface ProjectsDatabasesDocumentsListCollectionIdsNamedParameters {
  access_token?: string;
  alt?: ProjectsDatabasesDocumentsApiClientAlt;
  bearer_token?: string;
  callback?: string;
  fields?: string;
  key?: string;
  oauth_token?: string;
  pp?: boolean;
  prettyPrint?: boolean;
  quotaUser?: string;
  upload_protocol?: string;
  uploadType?: string;
  $Xgafv?: ProjectsDatabasesDocumentsApiClient$Xgafv;
}
export interface ProjectsDatabasesDocumentsListNamedParameters {
  access_token?: string;
  alt?: ProjectsDatabasesDocumentsApiClientAlt;
  bearer_token?: string;
  callback?: string;
  fields?: string;
  key?: string;
  oauth_token?: string;
  pp?: boolean;
  prettyPrint?: boolean;
  quotaUser?: string;
  upload_protocol?: string;
  uploadType?: string;
  $Xgafv?: ProjectsDatabasesDocumentsApiClient$Xgafv;
  pageSize?: number;
  pageToken?: string;
  orderBy?: string;
  maskFieldPaths?: string[];
  transaction?: string;
  readTime?: string;
  showMissing?: boolean;
}
export interface ProjectsDatabasesDocumentsListenNamedParameters {
  access_token?: string;
  alt?: ProjectsDatabasesDocumentsApiClientAlt;
  bearer_token?: string;
  callback?: string;
  fields?: string;
  key?: string;
  oauth_token?: string;
  pp?: boolean;
  prettyPrint?: boolean;
  quotaUser?: string;
  upload_protocol?: string;
  uploadType?: string;
  $Xgafv?: ProjectsDatabasesDocumentsApiClient$Xgafv;
}
export interface ProjectsDatabasesDocumentsPatchNamedParameters {
  access_token?: string;
  alt?: ProjectsDatabasesDocumentsApiClientAlt;
  bearer_token?: string;
  callback?: string;
  fields?: string;
  key?: string;
  oauth_token?: string;
  pp?: boolean;
  prettyPrint?: boolean;
  quotaUser?: string;
  upload_protocol?: string;
  uploadType?: string;
  $Xgafv?: ProjectsDatabasesDocumentsApiClient$Xgafv;
  updateMaskFieldPaths?: string[];
  maskFieldPaths?: string[];
  currentDocumentExists?: boolean;
  currentDocumentUpdateTime?: string;
}
export interface ProjectsDatabasesDocumentsRollbackNamedParameters {
  access_token?: string;
  alt?: ProjectsDatabasesDocumentsApiClientAlt;
  bearer_token?: string;
  callback?: string;
  fields?: string;
  key?: string;
  oauth_token?: string;
  pp?: boolean;
  prettyPrint?: boolean;
  quotaUser?: string;
  upload_protocol?: string;
  uploadType?: string;
  $Xgafv?: ProjectsDatabasesDocumentsApiClient$Xgafv;
}
export interface ProjectsDatabasesDocumentsRunQueryNamedParameters {
  access_token?: string;
  alt?: ProjectsDatabasesDocumentsApiClientAlt;
  bearer_token?: string;
  callback?: string;
  fields?: string;
  key?: string;
  oauth_token?: string;
  pp?: boolean;
  prettyPrint?: boolean;
  quotaUser?: string;
  upload_protocol?: string;
  uploadType?: string;
  $Xgafv?: ProjectsDatabasesDocumentsApiClient$Xgafv;
}
export interface ProjectsDatabasesDocumentsWriteNamedParameters {
  access_token?: string;
  alt?: ProjectsDatabasesDocumentsApiClientAlt;
  bearer_token?: string;
  callback?: string;
  fields?: string;
  key?: string;
  oauth_token?: string;
  pp?: boolean;
  prettyPrint?: boolean;
  quotaUser?: string;
  upload_protocol?: string;
  uploadType?: string;
  $Xgafv?: ProjectsDatabasesDocumentsApiClient$Xgafv;
}
export abstract class ProjectsDatabasesDocumentsApiClient {
  private constructor() {}
  abstract batchGet(
    database: string,
    $requestBody: BatchGetDocumentsRequest,
    __namedParams__?: ProjectsDatabasesDocumentsBatchGetNamedParameters & object
  ): Promise<BatchGetDocumentsResponse>;
  abstract beginTransaction(
    database: string,
    $requestBody: BeginTransactionRequest,
    __namedParams__?: ProjectsDatabasesDocumentsBeginTransactionNamedParameters &
      object
  ): Promise<BeginTransactionResponse>;
  abstract commit(
    database: string,
    $requestBody: CommitRequest,
    __namedParams__?: ProjectsDatabasesDocumentsCommitNamedParameters & object
  ): Promise<CommitResponse>;
  abstract createDocument(
    parent: string,
    collectionId: string,
    $requestBody: Document,
    __namedParams__?: ProjectsDatabasesDocumentsCreateDocumentNamedParameters &
      object
  ): Promise<Document>;
  abstract delete(
    name: string,
    __namedParams__?: ProjectsDatabasesDocumentsDeleteNamedParameters & object
  ): Promise<Empty>;
  abstract get(
    name: string,
    __namedParams__?: ProjectsDatabasesDocumentsGetNamedParameters & object
  ): Promise<Document>;
  abstract list(
    parent: string,
    collectionId: string,
    __namedParams__?: ProjectsDatabasesDocumentsListNamedParameters & object
  ): Promise<ListDocumentsResponse>;
  abstract listCollectionIds(
    parent: string,
    $requestBody: ListCollectionIdsRequest,
    __namedParams__?: ProjectsDatabasesDocumentsListCollectionIdsNamedParameters &
      object
  ): Promise<ListCollectionIdsResponse>;
  abstract listen(
    database: string,
    $requestBody: ListenRequest,
    __namedParams__?: ProjectsDatabasesDocumentsListenNamedParameters & object
  ): Promise<ListenResponse>;
  abstract patch(
    name: string,
    $requestBody: Document,
    __namedParams__?: ProjectsDatabasesDocumentsPatchNamedParameters & object
  ): Promise<Document>;
  abstract rollback(
    database: string,
    $requestBody: RollbackRequest,
    __namedParams__?: ProjectsDatabasesDocumentsRollbackNamedParameters & object
  ): Promise<Empty>;
  abstract runQuery(
    parent: string,
    $requestBody: RunQueryRequest,
    __namedParams__?: ProjectsDatabasesDocumentsRunQueryNamedParameters & object
  ): Promise<RunQueryResponse>;
  abstract write(
    database: string,
    $requestBody: WriteRequest,
    __namedParams__?: ProjectsDatabasesDocumentsWriteNamedParameters & object
  ): Promise<WriteResponse>;
}
export declare class ProjectsDatabasesDocumentsApiClientImpl
  implements ProjectsDatabasesDocumentsApiClient {
  private gapiVersion;
  private $apiClient;
  constructor(
    gapiVersion: string,
    gapiRequestService: PromiseRequestService,
    apiClientHookFactory?: ApiClientHookFactory | null
  );
  batchGet(
    database: string,
    $requestBody: BatchGetDocumentsRequest,
    {
      $Xgafv,
      access_token,
      alt,
      bearer_token,
      callback,
      fields,
      key,
      oauth_token,
      pp,
      prettyPrint,
      quotaUser,
      uploadType,
      upload_protocol
    }?: ProjectsDatabasesDocumentsBatchGetNamedParameters & object
  ): Promise<BatchGetDocumentsResponse>;
  beginTransaction(
    database: string,
    $requestBody: BeginTransactionRequest,
    {
      $Xgafv,
      access_token,
      alt,
      bearer_token,
      callback,
      fields,
      key,
      oauth_token,
      pp,
      prettyPrint,
      quotaUser,
      uploadType,
      upload_protocol
    }?: ProjectsDatabasesDocumentsBeginTransactionNamedParameters & object
  ): Promise<BeginTransactionResponse>;
  commit(
    database: string,
    $requestBody: CommitRequest,
    {
      $Xgafv,
      access_token,
      alt,
      bearer_token,
      callback,
      fields,
      key,
      oauth_token,
      pp,
      prettyPrint,
      quotaUser,
      uploadType,
      upload_protocol
    }?: ProjectsDatabasesDocumentsCommitNamedParameters & object
  ): Promise<CommitResponse>;
  createDocument(
    parent: string,
    collectionId: string,
    $requestBody: Document,
    {
      $Xgafv,
      access_token,
      alt,
      bearer_token,
      callback,
      documentId,
      fields,
      key,
      maskFieldPaths,
      oauth_token,
      pp,
      prettyPrint,
      quotaUser,
      uploadType,
      upload_protocol
    }?: ProjectsDatabasesDocumentsCreateDocumentNamedParameters & object
  ): Promise<Document>;
  delete(
    name: string,
    {
      $Xgafv,
      access_token,
      alt,
      bearer_token,
      callback,
      currentDocumentExists,
      currentDocumentUpdateTime,
      fields,
      key,
      oauth_token,
      pp,
      prettyPrint,
      quotaUser,
      uploadType,
      upload_protocol
    }?: ProjectsDatabasesDocumentsDeleteNamedParameters & object
  ): Promise<Empty>;
  get(
    name: string,
    {
      $Xgafv,
      access_token,
      alt,
      bearer_token,
      callback,
      fields,
      key,
      maskFieldPaths,
      oauth_token,
      pp,
      prettyPrint,
      quotaUser,
      readTime,
      transaction,
      uploadType,
      upload_protocol
    }?: ProjectsDatabasesDocumentsGetNamedParameters & object
  ): Promise<Document>;
  list(
    parent: string,
    collectionId: string,
    {
      $Xgafv,
      access_token,
      alt,
      bearer_token,
      callback,
      fields,
      key,
      maskFieldPaths,
      oauth_token,
      orderBy,
      pageSize,
      pageToken,
      pp,
      prettyPrint,
      quotaUser,
      readTime,
      showMissing,
      transaction,
      uploadType,
      upload_protocol
    }?: ProjectsDatabasesDocumentsListNamedParameters & object
  ): Promise<ListDocumentsResponse>;
  listCollectionIds(
    parent: string,
    $requestBody: ListCollectionIdsRequest,
    {
      $Xgafv,
      access_token,
      alt,
      bearer_token,
      callback,
      fields,
      key,
      oauth_token,
      pp,
      prettyPrint,
      quotaUser,
      uploadType,
      upload_protocol
    }?: ProjectsDatabasesDocumentsListCollectionIdsNamedParameters & object
  ): Promise<ListCollectionIdsResponse>;
  listen(
    database: string,
    $requestBody: ListenRequest,
    {
      $Xgafv,
      access_token,
      alt,
      bearer_token,
      callback,
      fields,
      key,
      oauth_token,
      pp,
      prettyPrint,
      quotaUser,
      uploadType,
      upload_protocol
    }?: ProjectsDatabasesDocumentsListenNamedParameters & object
  ): Promise<ListenResponse>;
  patch(
    name: string,
    $requestBody: Document,
    {
      $Xgafv,
      access_token,
      alt,
      bearer_token,
      callback,
      currentDocumentExists,
      currentDocumentUpdateTime,
      fields,
      key,
      maskFieldPaths,
      oauth_token,
      pp,
      prettyPrint,
      quotaUser,
      updateMaskFieldPaths,
      uploadType,
      upload_protocol
    }?: ProjectsDatabasesDocumentsPatchNamedParameters & object
  ): Promise<Document>;
  rollback(
    database: string,
    $requestBody: RollbackRequest,
    {
      $Xgafv,
      access_token,
      alt,
      bearer_token,
      callback,
      fields,
      key,
      oauth_token,
      pp,
      prettyPrint,
      quotaUser,
      uploadType,
      upload_protocol
    }?: ProjectsDatabasesDocumentsRollbackNamedParameters & object
  ): Promise<Empty>;
  runQuery(
    parent: string,
    $requestBody: RunQueryRequest,
    {
      $Xgafv,
      access_token,
      alt,
      bearer_token,
      callback,
      fields,
      key,
      oauth_token,
      pp,
      prettyPrint,
      quotaUser,
      uploadType,
      upload_protocol
    }?: ProjectsDatabasesDocumentsRunQueryNamedParameters & object
  ): Promise<RunQueryResponse>;
  write(
    database: string,
    $requestBody: WriteRequest,
    {
      $Xgafv,
      access_token,
      alt,
      bearer_token,
      callback,
      fields,
      key,
      oauth_token,
      pp,
      prettyPrint,
      quotaUser,
      uploadType,
      upload_protocol
    }?: ProjectsDatabasesDocumentsWriteNamedParameters & object
  ): Promise<WriteResponse>;
}
export declare type ProjectsDatabasesIndexesApiClient$Xgafv = '1' | '2';
export interface IProjectsDatabasesIndexesApiClient$XgafvEnum {
  1: ProjectsDatabasesIndexesApiClient$Xgafv;
  2: ProjectsDatabasesIndexesApiClient$Xgafv;
  values(): ProjectsDatabasesIndexesApiClient$Xgafv[];
}
export declare const ProjectsDatabasesIndexesApiClient$XgafvEnum: IProjectsDatabasesIndexesApiClient$XgafvEnum;
export declare type ProjectsDatabasesIndexesApiClientAlt =
  | 'json'
  | 'media'
  | 'proto';
export interface IProjectsDatabasesIndexesApiClientAltEnum {
  JSON: ProjectsDatabasesIndexesApiClientAlt;
  MEDIA: ProjectsDatabasesIndexesApiClientAlt;
  PROTO: ProjectsDatabasesIndexesApiClientAlt;
  values(): ProjectsDatabasesIndexesApiClientAlt[];
}
export declare const ProjectsDatabasesIndexesApiClientAltEnum: IProjectsDatabasesIndexesApiClientAltEnum;
export interface ProjectsDatabasesIndexesCreateNamedParameters {
  access_token?: string;
  alt?: ProjectsDatabasesIndexesApiClientAlt;
  bearer_token?: string;
  callback?: string;
  fields?: string;
  key?: string;
  oauth_token?: string;
  pp?: boolean;
  prettyPrint?: boolean;
  quotaUser?: string;
  upload_protocol?: string;
  uploadType?: string;
  $Xgafv?: ProjectsDatabasesIndexesApiClient$Xgafv;
}
export interface ProjectsDatabasesIndexesDeleteNamedParameters {
  access_token?: string;
  alt?: ProjectsDatabasesIndexesApiClientAlt;
  bearer_token?: string;
  callback?: string;
  fields?: string;
  key?: string;
  oauth_token?: string;
  pp?: boolean;
  prettyPrint?: boolean;
  quotaUser?: string;
  upload_protocol?: string;
  uploadType?: string;
  $Xgafv?: ProjectsDatabasesIndexesApiClient$Xgafv;
}
export interface ProjectsDatabasesIndexesGetNamedParameters {
  access_token?: string;
  alt?: ProjectsDatabasesIndexesApiClientAlt;
  bearer_token?: string;
  callback?: string;
  fields?: string;
  key?: string;
  oauth_token?: string;
  pp?: boolean;
  prettyPrint?: boolean;
  quotaUser?: string;
  upload_protocol?: string;
  uploadType?: string;
  $Xgafv?: ProjectsDatabasesIndexesApiClient$Xgafv;
}
export interface ProjectsDatabasesIndexesListNamedParameters {
  access_token?: string;
  alt?: ProjectsDatabasesIndexesApiClientAlt;
  bearer_token?: string;
  callback?: string;
  fields?: string;
  key?: string;
  oauth_token?: string;
  pp?: boolean;
  prettyPrint?: boolean;
  quotaUser?: string;
  upload_protocol?: string;
  uploadType?: string;
  $Xgafv?: ProjectsDatabasesIndexesApiClient$Xgafv;
  filter?: string;
  pageSize?: number;
  pageToken?: string;
}
export abstract class ProjectsDatabasesIndexesApiClient {
  private constructor() {}
  abstract create(
    parent: string,
    $requestBody: Index,
    __namedParams__?: ProjectsDatabasesIndexesCreateNamedParameters & object
  ): Promise<Operation>;
  abstract delete(
    name: string,
    __namedParams__?: ProjectsDatabasesIndexesDeleteNamedParameters & object
  ): Promise<Empty>;
  abstract get(
    name: string,
    __namedParams__?: ProjectsDatabasesIndexesGetNamedParameters & object
  ): Promise<Index>;
  abstract list(
    parent: string,
    __namedParams__?: ProjectsDatabasesIndexesListNamedParameters & object
  ): Promise<ListIndexesResponse>;
}
export declare class ProjectsDatabasesIndexesApiClientImpl
  implements ProjectsDatabasesIndexesApiClient {
  private gapiVersion;
  private $apiClient;
  constructor(
    gapiVersion: string,
    gapiRequestService: PromiseRequestService,
    apiClientHookFactory?: ApiClientHookFactory | null
  );
  create(
    parent: string,
    $requestBody: Index,
    {
      $Xgafv,
      access_token,
      alt,
      bearer_token,
      callback,
      fields,
      key,
      oauth_token,
      pp,
      prettyPrint,
      quotaUser,
      uploadType,
      upload_protocol
    }?: ProjectsDatabasesIndexesCreateNamedParameters & object
  ): Promise<Operation>;
  delete(
    name: string,
    {
      $Xgafv,
      access_token,
      alt,
      bearer_token,
      callback,
      fields,
      key,
      oauth_token,
      pp,
      prettyPrint,
      quotaUser,
      uploadType,
      upload_protocol
    }?: ProjectsDatabasesIndexesDeleteNamedParameters & object
  ): Promise<Empty>;
  get(
    name: string,
    {
      $Xgafv,
      access_token,
      alt,
      bearer_token,
      callback,
      fields,
      key,
      oauth_token,
      pp,
      prettyPrint,
      quotaUser,
      uploadType,
      upload_protocol
    }?: ProjectsDatabasesIndexesGetNamedParameters & object
  ): Promise<Index>;
  list(
    parent: string,
    {
      $Xgafv,
      access_token,
      alt,
      bearer_token,
      callback,
      fields,
      filter,
      key,
      oauth_token,
      pageSize,
      pageToken,
      pp,
      prettyPrint,
      quotaUser,
      uploadType,
      upload_protocol
    }?: ProjectsDatabasesIndexesListNamedParameters & object
  ): Promise<ListIndexesResponse>;
}

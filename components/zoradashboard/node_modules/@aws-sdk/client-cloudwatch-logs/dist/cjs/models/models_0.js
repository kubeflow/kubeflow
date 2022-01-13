"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescribeQueryDefinitionsResponse = exports.QueryDefinition = exports.DescribeQueryDefinitionsRequest = exports.DescribeQueriesResponse = exports.QueryInfo = exports.DescribeQueriesRequest = exports.QueryStatus = exports.DescribeMetricFiltersResponse = exports.MetricFilter = exports.MetricTransformation = exports.DescribeMetricFiltersRequest = exports.DescribeLogStreamsResponse = exports.LogStream = exports.DescribeLogStreamsRequest = exports.OrderBy = exports.DescribeLogGroupsResponse = exports.LogGroup = exports.DescribeLogGroupsRequest = exports.DescribeExportTasksResponse = exports.ExportTask = exports.ExportTaskStatus = exports.ExportTaskExecutionInfo = exports.DescribeExportTasksRequest = exports.ExportTaskStatusCode = exports.DescribeDestinationsResponse = exports.Destination = exports.DescribeDestinationsRequest = exports.DeleteSubscriptionFilterRequest = exports.DeleteRetentionPolicyRequest = exports.DeleteResourcePolicyRequest = exports.DeleteQueryDefinitionResponse = exports.DeleteQueryDefinitionRequest = exports.DeleteMetricFilterRequest = exports.DeleteLogStreamRequest = exports.DeleteLogGroupRequest = exports.DeleteDestinationRequest = exports.DataAlreadyAcceptedException = exports.CreateLogStreamRequest = exports.CreateLogGroupRequest = exports.ResourceAlreadyExistsException = exports.LimitExceededException = exports.CreateExportTaskResponse = exports.CreateExportTaskRequest = exports.InvalidOperationException = exports.CancelExportTaskRequest = exports.ServiceUnavailableException = exports.ResourceNotFoundException = exports.OperationAbortedException = exports.InvalidParameterException = exports.AssociateKmsKeyRequest = void 0;
exports.TagLogGroupRequest = exports.StopQueryResponse = exports.StopQueryRequest = exports.StartQueryResponse = exports.StartQueryRequest = exports.MalformedQueryException = exports.QueryCompileError = exports.QueryCompileErrorLocation = exports.PutSubscriptionFilterRequest = exports.PutRetentionPolicyRequest = exports.PutResourcePolicyResponse = exports.PutResourcePolicyRequest = exports.PutQueryDefinitionResponse = exports.PutQueryDefinitionRequest = exports.PutMetricFilterRequest = exports.UnrecognizedClientException = exports.PutLogEventsResponse = exports.RejectedLogEventsInfo = exports.PutLogEventsRequest = exports.PutDestinationPolicyRequest = exports.PutDestinationResponse = exports.PutDestinationRequest = exports.ListTagsLogGroupResponse = exports.ListTagsLogGroupRequest = exports.InvalidSequenceTokenException = exports.InputLogEvent = exports.GetQueryResultsResponse = exports.QueryStatistics = exports.ResultField = exports.GetQueryResultsRequest = exports.GetLogRecordResponse = exports.GetLogRecordRequest = exports.GetLogGroupFieldsResponse = exports.LogGroupField = exports.GetLogGroupFieldsRequest = exports.GetLogEventsResponse = exports.OutputLogEvent = exports.GetLogEventsRequest = exports.FilterLogEventsResponse = exports.SearchedLogStream = exports.FilterLogEventsRequest = exports.FilteredLogEvent = exports.DisassociateKmsKeyRequest = exports.DescribeSubscriptionFiltersResponse = exports.SubscriptionFilter = exports.Distribution = exports.DescribeSubscriptionFiltersRequest = exports.DescribeResourcePoliciesResponse = exports.ResourcePolicy = exports.DescribeResourcePoliciesRequest = void 0;
exports.UntagLogGroupRequest = exports.TestMetricFilterResponse = exports.MetricFilterMatchRecord = exports.TestMetricFilterRequest = void 0;
var AssociateKmsKeyRequest;
(function (AssociateKmsKeyRequest) {
    AssociateKmsKeyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AssociateKmsKeyRequest = exports.AssociateKmsKeyRequest || (exports.AssociateKmsKeyRequest = {}));
var InvalidParameterException;
(function (InvalidParameterException) {
    InvalidParameterException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidParameterException = exports.InvalidParameterException || (exports.InvalidParameterException = {}));
var OperationAbortedException;
(function (OperationAbortedException) {
    OperationAbortedException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(OperationAbortedException = exports.OperationAbortedException || (exports.OperationAbortedException = {}));
var ResourceNotFoundException;
(function (ResourceNotFoundException) {
    ResourceNotFoundException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResourceNotFoundException = exports.ResourceNotFoundException || (exports.ResourceNotFoundException = {}));
var ServiceUnavailableException;
(function (ServiceUnavailableException) {
    ServiceUnavailableException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ServiceUnavailableException = exports.ServiceUnavailableException || (exports.ServiceUnavailableException = {}));
var CancelExportTaskRequest;
(function (CancelExportTaskRequest) {
    CancelExportTaskRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CancelExportTaskRequest = exports.CancelExportTaskRequest || (exports.CancelExportTaskRequest = {}));
var InvalidOperationException;
(function (InvalidOperationException) {
    InvalidOperationException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidOperationException = exports.InvalidOperationException || (exports.InvalidOperationException = {}));
var CreateExportTaskRequest;
(function (CreateExportTaskRequest) {
    CreateExportTaskRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateExportTaskRequest = exports.CreateExportTaskRequest || (exports.CreateExportTaskRequest = {}));
var CreateExportTaskResponse;
(function (CreateExportTaskResponse) {
    CreateExportTaskResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateExportTaskResponse = exports.CreateExportTaskResponse || (exports.CreateExportTaskResponse = {}));
var LimitExceededException;
(function (LimitExceededException) {
    LimitExceededException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LimitExceededException = exports.LimitExceededException || (exports.LimitExceededException = {}));
var ResourceAlreadyExistsException;
(function (ResourceAlreadyExistsException) {
    ResourceAlreadyExistsException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResourceAlreadyExistsException = exports.ResourceAlreadyExistsException || (exports.ResourceAlreadyExistsException = {}));
var CreateLogGroupRequest;
(function (CreateLogGroupRequest) {
    CreateLogGroupRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateLogGroupRequest = exports.CreateLogGroupRequest || (exports.CreateLogGroupRequest = {}));
var CreateLogStreamRequest;
(function (CreateLogStreamRequest) {
    CreateLogStreamRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateLogStreamRequest = exports.CreateLogStreamRequest || (exports.CreateLogStreamRequest = {}));
var DataAlreadyAcceptedException;
(function (DataAlreadyAcceptedException) {
    DataAlreadyAcceptedException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DataAlreadyAcceptedException = exports.DataAlreadyAcceptedException || (exports.DataAlreadyAcceptedException = {}));
var DeleteDestinationRequest;
(function (DeleteDestinationRequest) {
    DeleteDestinationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteDestinationRequest = exports.DeleteDestinationRequest || (exports.DeleteDestinationRequest = {}));
var DeleteLogGroupRequest;
(function (DeleteLogGroupRequest) {
    DeleteLogGroupRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteLogGroupRequest = exports.DeleteLogGroupRequest || (exports.DeleteLogGroupRequest = {}));
var DeleteLogStreamRequest;
(function (DeleteLogStreamRequest) {
    DeleteLogStreamRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteLogStreamRequest = exports.DeleteLogStreamRequest || (exports.DeleteLogStreamRequest = {}));
var DeleteMetricFilterRequest;
(function (DeleteMetricFilterRequest) {
    DeleteMetricFilterRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteMetricFilterRequest = exports.DeleteMetricFilterRequest || (exports.DeleteMetricFilterRequest = {}));
var DeleteQueryDefinitionRequest;
(function (DeleteQueryDefinitionRequest) {
    DeleteQueryDefinitionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteQueryDefinitionRequest = exports.DeleteQueryDefinitionRequest || (exports.DeleteQueryDefinitionRequest = {}));
var DeleteQueryDefinitionResponse;
(function (DeleteQueryDefinitionResponse) {
    DeleteQueryDefinitionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteQueryDefinitionResponse = exports.DeleteQueryDefinitionResponse || (exports.DeleteQueryDefinitionResponse = {}));
var DeleteResourcePolicyRequest;
(function (DeleteResourcePolicyRequest) {
    DeleteResourcePolicyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteResourcePolicyRequest = exports.DeleteResourcePolicyRequest || (exports.DeleteResourcePolicyRequest = {}));
var DeleteRetentionPolicyRequest;
(function (DeleteRetentionPolicyRequest) {
    DeleteRetentionPolicyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteRetentionPolicyRequest = exports.DeleteRetentionPolicyRequest || (exports.DeleteRetentionPolicyRequest = {}));
var DeleteSubscriptionFilterRequest;
(function (DeleteSubscriptionFilterRequest) {
    DeleteSubscriptionFilterRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteSubscriptionFilterRequest = exports.DeleteSubscriptionFilterRequest || (exports.DeleteSubscriptionFilterRequest = {}));
var DescribeDestinationsRequest;
(function (DescribeDestinationsRequest) {
    DescribeDestinationsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeDestinationsRequest = exports.DescribeDestinationsRequest || (exports.DescribeDestinationsRequest = {}));
var Destination;
(function (Destination) {
    Destination.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Destination = exports.Destination || (exports.Destination = {}));
var DescribeDestinationsResponse;
(function (DescribeDestinationsResponse) {
    DescribeDestinationsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeDestinationsResponse = exports.DescribeDestinationsResponse || (exports.DescribeDestinationsResponse = {}));
var ExportTaskStatusCode;
(function (ExportTaskStatusCode) {
    ExportTaskStatusCode["CANCELLED"] = "CANCELLED";
    ExportTaskStatusCode["COMPLETED"] = "COMPLETED";
    ExportTaskStatusCode["FAILED"] = "FAILED";
    ExportTaskStatusCode["PENDING"] = "PENDING";
    ExportTaskStatusCode["PENDING_CANCEL"] = "PENDING_CANCEL";
    ExportTaskStatusCode["RUNNING"] = "RUNNING";
})(ExportTaskStatusCode = exports.ExportTaskStatusCode || (exports.ExportTaskStatusCode = {}));
var DescribeExportTasksRequest;
(function (DescribeExportTasksRequest) {
    DescribeExportTasksRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeExportTasksRequest = exports.DescribeExportTasksRequest || (exports.DescribeExportTasksRequest = {}));
var ExportTaskExecutionInfo;
(function (ExportTaskExecutionInfo) {
    ExportTaskExecutionInfo.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ExportTaskExecutionInfo = exports.ExportTaskExecutionInfo || (exports.ExportTaskExecutionInfo = {}));
var ExportTaskStatus;
(function (ExportTaskStatus) {
    ExportTaskStatus.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ExportTaskStatus = exports.ExportTaskStatus || (exports.ExportTaskStatus = {}));
var ExportTask;
(function (ExportTask) {
    ExportTask.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ExportTask = exports.ExportTask || (exports.ExportTask = {}));
var DescribeExportTasksResponse;
(function (DescribeExportTasksResponse) {
    DescribeExportTasksResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeExportTasksResponse = exports.DescribeExportTasksResponse || (exports.DescribeExportTasksResponse = {}));
var DescribeLogGroupsRequest;
(function (DescribeLogGroupsRequest) {
    DescribeLogGroupsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeLogGroupsRequest = exports.DescribeLogGroupsRequest || (exports.DescribeLogGroupsRequest = {}));
var LogGroup;
(function (LogGroup) {
    LogGroup.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LogGroup = exports.LogGroup || (exports.LogGroup = {}));
var DescribeLogGroupsResponse;
(function (DescribeLogGroupsResponse) {
    DescribeLogGroupsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeLogGroupsResponse = exports.DescribeLogGroupsResponse || (exports.DescribeLogGroupsResponse = {}));
var OrderBy;
(function (OrderBy) {
    OrderBy["LastEventTime"] = "LastEventTime";
    OrderBy["LogStreamName"] = "LogStreamName";
})(OrderBy = exports.OrderBy || (exports.OrderBy = {}));
var DescribeLogStreamsRequest;
(function (DescribeLogStreamsRequest) {
    DescribeLogStreamsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeLogStreamsRequest = exports.DescribeLogStreamsRequest || (exports.DescribeLogStreamsRequest = {}));
var LogStream;
(function (LogStream) {
    LogStream.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LogStream = exports.LogStream || (exports.LogStream = {}));
var DescribeLogStreamsResponse;
(function (DescribeLogStreamsResponse) {
    DescribeLogStreamsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeLogStreamsResponse = exports.DescribeLogStreamsResponse || (exports.DescribeLogStreamsResponse = {}));
var DescribeMetricFiltersRequest;
(function (DescribeMetricFiltersRequest) {
    DescribeMetricFiltersRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeMetricFiltersRequest = exports.DescribeMetricFiltersRequest || (exports.DescribeMetricFiltersRequest = {}));
var MetricTransformation;
(function (MetricTransformation) {
    MetricTransformation.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MetricTransformation = exports.MetricTransformation || (exports.MetricTransformation = {}));
var MetricFilter;
(function (MetricFilter) {
    MetricFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MetricFilter = exports.MetricFilter || (exports.MetricFilter = {}));
var DescribeMetricFiltersResponse;
(function (DescribeMetricFiltersResponse) {
    DescribeMetricFiltersResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeMetricFiltersResponse = exports.DescribeMetricFiltersResponse || (exports.DescribeMetricFiltersResponse = {}));
var QueryStatus;
(function (QueryStatus) {
    QueryStatus["Cancelled"] = "Cancelled";
    QueryStatus["Complete"] = "Complete";
    QueryStatus["Failed"] = "Failed";
    QueryStatus["Running"] = "Running";
    QueryStatus["Scheduled"] = "Scheduled";
})(QueryStatus = exports.QueryStatus || (exports.QueryStatus = {}));
var DescribeQueriesRequest;
(function (DescribeQueriesRequest) {
    DescribeQueriesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeQueriesRequest = exports.DescribeQueriesRequest || (exports.DescribeQueriesRequest = {}));
var QueryInfo;
(function (QueryInfo) {
    QueryInfo.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(QueryInfo = exports.QueryInfo || (exports.QueryInfo = {}));
var DescribeQueriesResponse;
(function (DescribeQueriesResponse) {
    DescribeQueriesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeQueriesResponse = exports.DescribeQueriesResponse || (exports.DescribeQueriesResponse = {}));
var DescribeQueryDefinitionsRequest;
(function (DescribeQueryDefinitionsRequest) {
    DescribeQueryDefinitionsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeQueryDefinitionsRequest = exports.DescribeQueryDefinitionsRequest || (exports.DescribeQueryDefinitionsRequest = {}));
var QueryDefinition;
(function (QueryDefinition) {
    QueryDefinition.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(QueryDefinition = exports.QueryDefinition || (exports.QueryDefinition = {}));
var DescribeQueryDefinitionsResponse;
(function (DescribeQueryDefinitionsResponse) {
    DescribeQueryDefinitionsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeQueryDefinitionsResponse = exports.DescribeQueryDefinitionsResponse || (exports.DescribeQueryDefinitionsResponse = {}));
var DescribeResourcePoliciesRequest;
(function (DescribeResourcePoliciesRequest) {
    DescribeResourcePoliciesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeResourcePoliciesRequest = exports.DescribeResourcePoliciesRequest || (exports.DescribeResourcePoliciesRequest = {}));
var ResourcePolicy;
(function (ResourcePolicy) {
    ResourcePolicy.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResourcePolicy = exports.ResourcePolicy || (exports.ResourcePolicy = {}));
var DescribeResourcePoliciesResponse;
(function (DescribeResourcePoliciesResponse) {
    DescribeResourcePoliciesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeResourcePoliciesResponse = exports.DescribeResourcePoliciesResponse || (exports.DescribeResourcePoliciesResponse = {}));
var DescribeSubscriptionFiltersRequest;
(function (DescribeSubscriptionFiltersRequest) {
    DescribeSubscriptionFiltersRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeSubscriptionFiltersRequest = exports.DescribeSubscriptionFiltersRequest || (exports.DescribeSubscriptionFiltersRequest = {}));
var Distribution;
(function (Distribution) {
    Distribution["ByLogStream"] = "ByLogStream";
    Distribution["Random"] = "Random";
})(Distribution = exports.Distribution || (exports.Distribution = {}));
var SubscriptionFilter;
(function (SubscriptionFilter) {
    SubscriptionFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SubscriptionFilter = exports.SubscriptionFilter || (exports.SubscriptionFilter = {}));
var DescribeSubscriptionFiltersResponse;
(function (DescribeSubscriptionFiltersResponse) {
    DescribeSubscriptionFiltersResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeSubscriptionFiltersResponse = exports.DescribeSubscriptionFiltersResponse || (exports.DescribeSubscriptionFiltersResponse = {}));
var DisassociateKmsKeyRequest;
(function (DisassociateKmsKeyRequest) {
    DisassociateKmsKeyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DisassociateKmsKeyRequest = exports.DisassociateKmsKeyRequest || (exports.DisassociateKmsKeyRequest = {}));
var FilteredLogEvent;
(function (FilteredLogEvent) {
    FilteredLogEvent.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(FilteredLogEvent = exports.FilteredLogEvent || (exports.FilteredLogEvent = {}));
var FilterLogEventsRequest;
(function (FilterLogEventsRequest) {
    FilterLogEventsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(FilterLogEventsRequest = exports.FilterLogEventsRequest || (exports.FilterLogEventsRequest = {}));
var SearchedLogStream;
(function (SearchedLogStream) {
    SearchedLogStream.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SearchedLogStream = exports.SearchedLogStream || (exports.SearchedLogStream = {}));
var FilterLogEventsResponse;
(function (FilterLogEventsResponse) {
    FilterLogEventsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(FilterLogEventsResponse = exports.FilterLogEventsResponse || (exports.FilterLogEventsResponse = {}));
var GetLogEventsRequest;
(function (GetLogEventsRequest) {
    GetLogEventsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetLogEventsRequest = exports.GetLogEventsRequest || (exports.GetLogEventsRequest = {}));
var OutputLogEvent;
(function (OutputLogEvent) {
    OutputLogEvent.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(OutputLogEvent = exports.OutputLogEvent || (exports.OutputLogEvent = {}));
var GetLogEventsResponse;
(function (GetLogEventsResponse) {
    GetLogEventsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetLogEventsResponse = exports.GetLogEventsResponse || (exports.GetLogEventsResponse = {}));
var GetLogGroupFieldsRequest;
(function (GetLogGroupFieldsRequest) {
    GetLogGroupFieldsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetLogGroupFieldsRequest = exports.GetLogGroupFieldsRequest || (exports.GetLogGroupFieldsRequest = {}));
var LogGroupField;
(function (LogGroupField) {
    LogGroupField.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LogGroupField = exports.LogGroupField || (exports.LogGroupField = {}));
var GetLogGroupFieldsResponse;
(function (GetLogGroupFieldsResponse) {
    GetLogGroupFieldsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetLogGroupFieldsResponse = exports.GetLogGroupFieldsResponse || (exports.GetLogGroupFieldsResponse = {}));
var GetLogRecordRequest;
(function (GetLogRecordRequest) {
    GetLogRecordRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetLogRecordRequest = exports.GetLogRecordRequest || (exports.GetLogRecordRequest = {}));
var GetLogRecordResponse;
(function (GetLogRecordResponse) {
    GetLogRecordResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetLogRecordResponse = exports.GetLogRecordResponse || (exports.GetLogRecordResponse = {}));
var GetQueryResultsRequest;
(function (GetQueryResultsRequest) {
    GetQueryResultsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetQueryResultsRequest = exports.GetQueryResultsRequest || (exports.GetQueryResultsRequest = {}));
var ResultField;
(function (ResultField) {
    ResultField.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResultField = exports.ResultField || (exports.ResultField = {}));
var QueryStatistics;
(function (QueryStatistics) {
    QueryStatistics.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(QueryStatistics = exports.QueryStatistics || (exports.QueryStatistics = {}));
var GetQueryResultsResponse;
(function (GetQueryResultsResponse) {
    GetQueryResultsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetQueryResultsResponse = exports.GetQueryResultsResponse || (exports.GetQueryResultsResponse = {}));
var InputLogEvent;
(function (InputLogEvent) {
    InputLogEvent.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InputLogEvent = exports.InputLogEvent || (exports.InputLogEvent = {}));
var InvalidSequenceTokenException;
(function (InvalidSequenceTokenException) {
    InvalidSequenceTokenException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidSequenceTokenException = exports.InvalidSequenceTokenException || (exports.InvalidSequenceTokenException = {}));
var ListTagsLogGroupRequest;
(function (ListTagsLogGroupRequest) {
    ListTagsLogGroupRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListTagsLogGroupRequest = exports.ListTagsLogGroupRequest || (exports.ListTagsLogGroupRequest = {}));
var ListTagsLogGroupResponse;
(function (ListTagsLogGroupResponse) {
    ListTagsLogGroupResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListTagsLogGroupResponse = exports.ListTagsLogGroupResponse || (exports.ListTagsLogGroupResponse = {}));
var PutDestinationRequest;
(function (PutDestinationRequest) {
    PutDestinationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutDestinationRequest = exports.PutDestinationRequest || (exports.PutDestinationRequest = {}));
var PutDestinationResponse;
(function (PutDestinationResponse) {
    PutDestinationResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutDestinationResponse = exports.PutDestinationResponse || (exports.PutDestinationResponse = {}));
var PutDestinationPolicyRequest;
(function (PutDestinationPolicyRequest) {
    PutDestinationPolicyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutDestinationPolicyRequest = exports.PutDestinationPolicyRequest || (exports.PutDestinationPolicyRequest = {}));
var PutLogEventsRequest;
(function (PutLogEventsRequest) {
    PutLogEventsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutLogEventsRequest = exports.PutLogEventsRequest || (exports.PutLogEventsRequest = {}));
var RejectedLogEventsInfo;
(function (RejectedLogEventsInfo) {
    RejectedLogEventsInfo.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RejectedLogEventsInfo = exports.RejectedLogEventsInfo || (exports.RejectedLogEventsInfo = {}));
var PutLogEventsResponse;
(function (PutLogEventsResponse) {
    PutLogEventsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutLogEventsResponse = exports.PutLogEventsResponse || (exports.PutLogEventsResponse = {}));
var UnrecognizedClientException;
(function (UnrecognizedClientException) {
    UnrecognizedClientException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UnrecognizedClientException = exports.UnrecognizedClientException || (exports.UnrecognizedClientException = {}));
var PutMetricFilterRequest;
(function (PutMetricFilterRequest) {
    PutMetricFilterRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutMetricFilterRequest = exports.PutMetricFilterRequest || (exports.PutMetricFilterRequest = {}));
var PutQueryDefinitionRequest;
(function (PutQueryDefinitionRequest) {
    PutQueryDefinitionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutQueryDefinitionRequest = exports.PutQueryDefinitionRequest || (exports.PutQueryDefinitionRequest = {}));
var PutQueryDefinitionResponse;
(function (PutQueryDefinitionResponse) {
    PutQueryDefinitionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutQueryDefinitionResponse = exports.PutQueryDefinitionResponse || (exports.PutQueryDefinitionResponse = {}));
var PutResourcePolicyRequest;
(function (PutResourcePolicyRequest) {
    PutResourcePolicyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutResourcePolicyRequest = exports.PutResourcePolicyRequest || (exports.PutResourcePolicyRequest = {}));
var PutResourcePolicyResponse;
(function (PutResourcePolicyResponse) {
    PutResourcePolicyResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutResourcePolicyResponse = exports.PutResourcePolicyResponse || (exports.PutResourcePolicyResponse = {}));
var PutRetentionPolicyRequest;
(function (PutRetentionPolicyRequest) {
    PutRetentionPolicyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutRetentionPolicyRequest = exports.PutRetentionPolicyRequest || (exports.PutRetentionPolicyRequest = {}));
var PutSubscriptionFilterRequest;
(function (PutSubscriptionFilterRequest) {
    PutSubscriptionFilterRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PutSubscriptionFilterRequest = exports.PutSubscriptionFilterRequest || (exports.PutSubscriptionFilterRequest = {}));
var QueryCompileErrorLocation;
(function (QueryCompileErrorLocation) {
    QueryCompileErrorLocation.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(QueryCompileErrorLocation = exports.QueryCompileErrorLocation || (exports.QueryCompileErrorLocation = {}));
var QueryCompileError;
(function (QueryCompileError) {
    QueryCompileError.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(QueryCompileError = exports.QueryCompileError || (exports.QueryCompileError = {}));
var MalformedQueryException;
(function (MalformedQueryException) {
    MalformedQueryException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MalformedQueryException = exports.MalformedQueryException || (exports.MalformedQueryException = {}));
var StartQueryRequest;
(function (StartQueryRequest) {
    StartQueryRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartQueryRequest = exports.StartQueryRequest || (exports.StartQueryRequest = {}));
var StartQueryResponse;
(function (StartQueryResponse) {
    StartQueryResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartQueryResponse = exports.StartQueryResponse || (exports.StartQueryResponse = {}));
var StopQueryRequest;
(function (StopQueryRequest) {
    StopQueryRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopQueryRequest = exports.StopQueryRequest || (exports.StopQueryRequest = {}));
var StopQueryResponse;
(function (StopQueryResponse) {
    StopQueryResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopQueryResponse = exports.StopQueryResponse || (exports.StopQueryResponse = {}));
var TagLogGroupRequest;
(function (TagLogGroupRequest) {
    TagLogGroupRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TagLogGroupRequest = exports.TagLogGroupRequest || (exports.TagLogGroupRequest = {}));
var TestMetricFilterRequest;
(function (TestMetricFilterRequest) {
    TestMetricFilterRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TestMetricFilterRequest = exports.TestMetricFilterRequest || (exports.TestMetricFilterRequest = {}));
var MetricFilterMatchRecord;
(function (MetricFilterMatchRecord) {
    MetricFilterMatchRecord.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MetricFilterMatchRecord = exports.MetricFilterMatchRecord || (exports.MetricFilterMatchRecord = {}));
var TestMetricFilterResponse;
(function (TestMetricFilterResponse) {
    TestMetricFilterResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TestMetricFilterResponse = exports.TestMetricFilterResponse || (exports.TestMetricFilterResponse = {}));
var UntagLogGroupRequest;
(function (UntagLogGroupRequest) {
    UntagLogGroupRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UntagLogGroupRequest = exports.UntagLogGroupRequest || (exports.UntagLogGroupRequest = {}));
//# sourceMappingURL=models_0.js.map
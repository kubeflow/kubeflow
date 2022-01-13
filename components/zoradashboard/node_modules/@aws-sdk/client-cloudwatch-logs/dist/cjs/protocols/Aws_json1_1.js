"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeAws_json1_1DeleteLogStreamCommand = exports.deserializeAws_json1_1DeleteLogGroupCommand = exports.deserializeAws_json1_1DeleteDestinationCommand = exports.deserializeAws_json1_1CreateLogStreamCommand = exports.deserializeAws_json1_1CreateLogGroupCommand = exports.deserializeAws_json1_1CreateExportTaskCommand = exports.deserializeAws_json1_1CancelExportTaskCommand = exports.deserializeAws_json1_1AssociateKmsKeyCommand = exports.serializeAws_json1_1UntagLogGroupCommand = exports.serializeAws_json1_1TestMetricFilterCommand = exports.serializeAws_json1_1TagLogGroupCommand = exports.serializeAws_json1_1StopQueryCommand = exports.serializeAws_json1_1StartQueryCommand = exports.serializeAws_json1_1PutSubscriptionFilterCommand = exports.serializeAws_json1_1PutRetentionPolicyCommand = exports.serializeAws_json1_1PutResourcePolicyCommand = exports.serializeAws_json1_1PutQueryDefinitionCommand = exports.serializeAws_json1_1PutMetricFilterCommand = exports.serializeAws_json1_1PutLogEventsCommand = exports.serializeAws_json1_1PutDestinationPolicyCommand = exports.serializeAws_json1_1PutDestinationCommand = exports.serializeAws_json1_1ListTagsLogGroupCommand = exports.serializeAws_json1_1GetQueryResultsCommand = exports.serializeAws_json1_1GetLogRecordCommand = exports.serializeAws_json1_1GetLogGroupFieldsCommand = exports.serializeAws_json1_1GetLogEventsCommand = exports.serializeAws_json1_1FilterLogEventsCommand = exports.serializeAws_json1_1DisassociateKmsKeyCommand = exports.serializeAws_json1_1DescribeSubscriptionFiltersCommand = exports.serializeAws_json1_1DescribeResourcePoliciesCommand = exports.serializeAws_json1_1DescribeQueryDefinitionsCommand = exports.serializeAws_json1_1DescribeQueriesCommand = exports.serializeAws_json1_1DescribeMetricFiltersCommand = exports.serializeAws_json1_1DescribeLogStreamsCommand = exports.serializeAws_json1_1DescribeLogGroupsCommand = exports.serializeAws_json1_1DescribeExportTasksCommand = exports.serializeAws_json1_1DescribeDestinationsCommand = exports.serializeAws_json1_1DeleteSubscriptionFilterCommand = exports.serializeAws_json1_1DeleteRetentionPolicyCommand = exports.serializeAws_json1_1DeleteResourcePolicyCommand = exports.serializeAws_json1_1DeleteQueryDefinitionCommand = exports.serializeAws_json1_1DeleteMetricFilterCommand = exports.serializeAws_json1_1DeleteLogStreamCommand = exports.serializeAws_json1_1DeleteLogGroupCommand = exports.serializeAws_json1_1DeleteDestinationCommand = exports.serializeAws_json1_1CreateLogStreamCommand = exports.serializeAws_json1_1CreateLogGroupCommand = exports.serializeAws_json1_1CreateExportTaskCommand = exports.serializeAws_json1_1CancelExportTaskCommand = exports.serializeAws_json1_1AssociateKmsKeyCommand = void 0;
exports.deserializeAws_json1_1UntagLogGroupCommand = exports.deserializeAws_json1_1TestMetricFilterCommand = exports.deserializeAws_json1_1TagLogGroupCommand = exports.deserializeAws_json1_1StopQueryCommand = exports.deserializeAws_json1_1StartQueryCommand = exports.deserializeAws_json1_1PutSubscriptionFilterCommand = exports.deserializeAws_json1_1PutRetentionPolicyCommand = exports.deserializeAws_json1_1PutResourcePolicyCommand = exports.deserializeAws_json1_1PutQueryDefinitionCommand = exports.deserializeAws_json1_1PutMetricFilterCommand = exports.deserializeAws_json1_1PutLogEventsCommand = exports.deserializeAws_json1_1PutDestinationPolicyCommand = exports.deserializeAws_json1_1PutDestinationCommand = exports.deserializeAws_json1_1ListTagsLogGroupCommand = exports.deserializeAws_json1_1GetQueryResultsCommand = exports.deserializeAws_json1_1GetLogRecordCommand = exports.deserializeAws_json1_1GetLogGroupFieldsCommand = exports.deserializeAws_json1_1GetLogEventsCommand = exports.deserializeAws_json1_1FilterLogEventsCommand = exports.deserializeAws_json1_1DisassociateKmsKeyCommand = exports.deserializeAws_json1_1DescribeSubscriptionFiltersCommand = exports.deserializeAws_json1_1DescribeResourcePoliciesCommand = exports.deserializeAws_json1_1DescribeQueryDefinitionsCommand = exports.deserializeAws_json1_1DescribeQueriesCommand = exports.deserializeAws_json1_1DescribeMetricFiltersCommand = exports.deserializeAws_json1_1DescribeLogStreamsCommand = exports.deserializeAws_json1_1DescribeLogGroupsCommand = exports.deserializeAws_json1_1DescribeExportTasksCommand = exports.deserializeAws_json1_1DescribeDestinationsCommand = exports.deserializeAws_json1_1DeleteSubscriptionFilterCommand = exports.deserializeAws_json1_1DeleteRetentionPolicyCommand = exports.deserializeAws_json1_1DeleteResourcePolicyCommand = exports.deserializeAws_json1_1DeleteQueryDefinitionCommand = exports.deserializeAws_json1_1DeleteMetricFilterCommand = void 0;
const protocol_http_1 = require("@aws-sdk/protocol-http");
const serializeAws_json1_1AssociateKmsKeyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.AssociateKmsKey",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1AssociateKmsKeyRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1AssociateKmsKeyCommand = serializeAws_json1_1AssociateKmsKeyCommand;
const serializeAws_json1_1CancelExportTaskCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.CancelExportTask",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1CancelExportTaskRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1CancelExportTaskCommand = serializeAws_json1_1CancelExportTaskCommand;
const serializeAws_json1_1CreateExportTaskCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.CreateExportTask",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1CreateExportTaskRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1CreateExportTaskCommand = serializeAws_json1_1CreateExportTaskCommand;
const serializeAws_json1_1CreateLogGroupCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.CreateLogGroup",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1CreateLogGroupRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1CreateLogGroupCommand = serializeAws_json1_1CreateLogGroupCommand;
const serializeAws_json1_1CreateLogStreamCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.CreateLogStream",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1CreateLogStreamRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1CreateLogStreamCommand = serializeAws_json1_1CreateLogStreamCommand;
const serializeAws_json1_1DeleteDestinationCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.DeleteDestination",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteDestinationRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteDestinationCommand = serializeAws_json1_1DeleteDestinationCommand;
const serializeAws_json1_1DeleteLogGroupCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.DeleteLogGroup",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteLogGroupRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteLogGroupCommand = serializeAws_json1_1DeleteLogGroupCommand;
const serializeAws_json1_1DeleteLogStreamCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.DeleteLogStream",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteLogStreamRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteLogStreamCommand = serializeAws_json1_1DeleteLogStreamCommand;
const serializeAws_json1_1DeleteMetricFilterCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.DeleteMetricFilter",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteMetricFilterRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteMetricFilterCommand = serializeAws_json1_1DeleteMetricFilterCommand;
const serializeAws_json1_1DeleteQueryDefinitionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.DeleteQueryDefinition",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteQueryDefinitionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteQueryDefinitionCommand = serializeAws_json1_1DeleteQueryDefinitionCommand;
const serializeAws_json1_1DeleteResourcePolicyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.DeleteResourcePolicy",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteResourcePolicyRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteResourcePolicyCommand = serializeAws_json1_1DeleteResourcePolicyCommand;
const serializeAws_json1_1DeleteRetentionPolicyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.DeleteRetentionPolicy",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteRetentionPolicyRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteRetentionPolicyCommand = serializeAws_json1_1DeleteRetentionPolicyCommand;
const serializeAws_json1_1DeleteSubscriptionFilterCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.DeleteSubscriptionFilter",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteSubscriptionFilterRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteSubscriptionFilterCommand = serializeAws_json1_1DeleteSubscriptionFilterCommand;
const serializeAws_json1_1DescribeDestinationsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.DescribeDestinations",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeDestinationsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeDestinationsCommand = serializeAws_json1_1DescribeDestinationsCommand;
const serializeAws_json1_1DescribeExportTasksCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.DescribeExportTasks",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeExportTasksRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeExportTasksCommand = serializeAws_json1_1DescribeExportTasksCommand;
const serializeAws_json1_1DescribeLogGroupsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.DescribeLogGroups",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeLogGroupsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeLogGroupsCommand = serializeAws_json1_1DescribeLogGroupsCommand;
const serializeAws_json1_1DescribeLogStreamsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.DescribeLogStreams",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeLogStreamsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeLogStreamsCommand = serializeAws_json1_1DescribeLogStreamsCommand;
const serializeAws_json1_1DescribeMetricFiltersCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.DescribeMetricFilters",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeMetricFiltersRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeMetricFiltersCommand = serializeAws_json1_1DescribeMetricFiltersCommand;
const serializeAws_json1_1DescribeQueriesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.DescribeQueries",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeQueriesRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeQueriesCommand = serializeAws_json1_1DescribeQueriesCommand;
const serializeAws_json1_1DescribeQueryDefinitionsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.DescribeQueryDefinitions",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeQueryDefinitionsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeQueryDefinitionsCommand = serializeAws_json1_1DescribeQueryDefinitionsCommand;
const serializeAws_json1_1DescribeResourcePoliciesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.DescribeResourcePolicies",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeResourcePoliciesRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeResourcePoliciesCommand = serializeAws_json1_1DescribeResourcePoliciesCommand;
const serializeAws_json1_1DescribeSubscriptionFiltersCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.DescribeSubscriptionFilters",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeSubscriptionFiltersRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeSubscriptionFiltersCommand = serializeAws_json1_1DescribeSubscriptionFiltersCommand;
const serializeAws_json1_1DisassociateKmsKeyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.DisassociateKmsKey",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DisassociateKmsKeyRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DisassociateKmsKeyCommand = serializeAws_json1_1DisassociateKmsKeyCommand;
const serializeAws_json1_1FilterLogEventsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.FilterLogEvents",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1FilterLogEventsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1FilterLogEventsCommand = serializeAws_json1_1FilterLogEventsCommand;
const serializeAws_json1_1GetLogEventsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.GetLogEvents",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetLogEventsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetLogEventsCommand = serializeAws_json1_1GetLogEventsCommand;
const serializeAws_json1_1GetLogGroupFieldsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.GetLogGroupFields",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetLogGroupFieldsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetLogGroupFieldsCommand = serializeAws_json1_1GetLogGroupFieldsCommand;
const serializeAws_json1_1GetLogRecordCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.GetLogRecord",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetLogRecordRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetLogRecordCommand = serializeAws_json1_1GetLogRecordCommand;
const serializeAws_json1_1GetQueryResultsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.GetQueryResults",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetQueryResultsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetQueryResultsCommand = serializeAws_json1_1GetQueryResultsCommand;
const serializeAws_json1_1ListTagsLogGroupCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.ListTagsLogGroup",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListTagsLogGroupRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListTagsLogGroupCommand = serializeAws_json1_1ListTagsLogGroupCommand;
const serializeAws_json1_1PutDestinationCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.PutDestination",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1PutDestinationRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1PutDestinationCommand = serializeAws_json1_1PutDestinationCommand;
const serializeAws_json1_1PutDestinationPolicyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.PutDestinationPolicy",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1PutDestinationPolicyRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1PutDestinationPolicyCommand = serializeAws_json1_1PutDestinationPolicyCommand;
const serializeAws_json1_1PutLogEventsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.PutLogEvents",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1PutLogEventsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1PutLogEventsCommand = serializeAws_json1_1PutLogEventsCommand;
const serializeAws_json1_1PutMetricFilterCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.PutMetricFilter",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1PutMetricFilterRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1PutMetricFilterCommand = serializeAws_json1_1PutMetricFilterCommand;
const serializeAws_json1_1PutQueryDefinitionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.PutQueryDefinition",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1PutQueryDefinitionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1PutQueryDefinitionCommand = serializeAws_json1_1PutQueryDefinitionCommand;
const serializeAws_json1_1PutResourcePolicyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.PutResourcePolicy",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1PutResourcePolicyRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1PutResourcePolicyCommand = serializeAws_json1_1PutResourcePolicyCommand;
const serializeAws_json1_1PutRetentionPolicyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.PutRetentionPolicy",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1PutRetentionPolicyRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1PutRetentionPolicyCommand = serializeAws_json1_1PutRetentionPolicyCommand;
const serializeAws_json1_1PutSubscriptionFilterCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.PutSubscriptionFilter",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1PutSubscriptionFilterRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1PutSubscriptionFilterCommand = serializeAws_json1_1PutSubscriptionFilterCommand;
const serializeAws_json1_1StartQueryCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.StartQuery",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartQueryRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartQueryCommand = serializeAws_json1_1StartQueryCommand;
const serializeAws_json1_1StopQueryCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.StopQuery",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StopQueryRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StopQueryCommand = serializeAws_json1_1StopQueryCommand;
const serializeAws_json1_1TagLogGroupCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.TagLogGroup",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1TagLogGroupRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1TagLogGroupCommand = serializeAws_json1_1TagLogGroupCommand;
const serializeAws_json1_1TestMetricFilterCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.TestMetricFilter",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1TestMetricFilterRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1TestMetricFilterCommand = serializeAws_json1_1TestMetricFilterCommand;
const serializeAws_json1_1UntagLogGroupCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Logs_20140328.UntagLogGroup",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1UntagLogGroupRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1UntagLogGroupCommand = serializeAws_json1_1UntagLogGroupCommand;
const deserializeAws_json1_1AssociateKmsKeyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1AssociateKmsKeyCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1AssociateKmsKeyCommand = deserializeAws_json1_1AssociateKmsKeyCommand;
const deserializeAws_json1_1AssociateKmsKeyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "OperationAbortedException":
        case "com.amazonaws.cloudwatchlogs#OperationAbortedException":
            response = {
                ...(await deserializeAws_json1_1OperationAbortedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1CancelExportTaskCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1CancelExportTaskCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1CancelExportTaskCommand = deserializeAws_json1_1CancelExportTaskCommand;
const deserializeAws_json1_1CancelExportTaskCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidOperationException":
        case "com.amazonaws.cloudwatchlogs#InvalidOperationException":
            response = {
                ...(await deserializeAws_json1_1InvalidOperationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1CreateExportTaskCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1CreateExportTaskCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1CreateExportTaskResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1CreateExportTaskCommand = deserializeAws_json1_1CreateExportTaskCommand;
const deserializeAws_json1_1CreateExportTaskCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.cloudwatchlogs#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "OperationAbortedException":
        case "com.amazonaws.cloudwatchlogs#OperationAbortedException":
            response = {
                ...(await deserializeAws_json1_1OperationAbortedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceAlreadyExistsException":
        case "com.amazonaws.cloudwatchlogs#ResourceAlreadyExistsException":
            response = {
                ...(await deserializeAws_json1_1ResourceAlreadyExistsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1CreateLogGroupCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1CreateLogGroupCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1CreateLogGroupCommand = deserializeAws_json1_1CreateLogGroupCommand;
const deserializeAws_json1_1CreateLogGroupCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.cloudwatchlogs#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "OperationAbortedException":
        case "com.amazonaws.cloudwatchlogs#OperationAbortedException":
            response = {
                ...(await deserializeAws_json1_1OperationAbortedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceAlreadyExistsException":
        case "com.amazonaws.cloudwatchlogs#ResourceAlreadyExistsException":
            response = {
                ...(await deserializeAws_json1_1ResourceAlreadyExistsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1CreateLogStreamCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1CreateLogStreamCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1CreateLogStreamCommand = deserializeAws_json1_1CreateLogStreamCommand;
const deserializeAws_json1_1CreateLogStreamCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceAlreadyExistsException":
        case "com.amazonaws.cloudwatchlogs#ResourceAlreadyExistsException":
            response = {
                ...(await deserializeAws_json1_1ResourceAlreadyExistsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DeleteDestinationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteDestinationCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteDestinationCommand = deserializeAws_json1_1DeleteDestinationCommand;
const deserializeAws_json1_1DeleteDestinationCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "OperationAbortedException":
        case "com.amazonaws.cloudwatchlogs#OperationAbortedException":
            response = {
                ...(await deserializeAws_json1_1OperationAbortedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DeleteLogGroupCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteLogGroupCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteLogGroupCommand = deserializeAws_json1_1DeleteLogGroupCommand;
const deserializeAws_json1_1DeleteLogGroupCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "OperationAbortedException":
        case "com.amazonaws.cloudwatchlogs#OperationAbortedException":
            response = {
                ...(await deserializeAws_json1_1OperationAbortedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DeleteLogStreamCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteLogStreamCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteLogStreamCommand = deserializeAws_json1_1DeleteLogStreamCommand;
const deserializeAws_json1_1DeleteLogStreamCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "OperationAbortedException":
        case "com.amazonaws.cloudwatchlogs#OperationAbortedException":
            response = {
                ...(await deserializeAws_json1_1OperationAbortedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DeleteMetricFilterCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteMetricFilterCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteMetricFilterCommand = deserializeAws_json1_1DeleteMetricFilterCommand;
const deserializeAws_json1_1DeleteMetricFilterCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "OperationAbortedException":
        case "com.amazonaws.cloudwatchlogs#OperationAbortedException":
            response = {
                ...(await deserializeAws_json1_1OperationAbortedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DeleteQueryDefinitionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteQueryDefinitionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DeleteQueryDefinitionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteQueryDefinitionCommand = deserializeAws_json1_1DeleteQueryDefinitionCommand;
const deserializeAws_json1_1DeleteQueryDefinitionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DeleteResourcePolicyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteResourcePolicyCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteResourcePolicyCommand = deserializeAws_json1_1DeleteResourcePolicyCommand;
const deserializeAws_json1_1DeleteResourcePolicyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DeleteRetentionPolicyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteRetentionPolicyCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteRetentionPolicyCommand = deserializeAws_json1_1DeleteRetentionPolicyCommand;
const deserializeAws_json1_1DeleteRetentionPolicyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "OperationAbortedException":
        case "com.amazonaws.cloudwatchlogs#OperationAbortedException":
            response = {
                ...(await deserializeAws_json1_1OperationAbortedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DeleteSubscriptionFilterCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteSubscriptionFilterCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteSubscriptionFilterCommand = deserializeAws_json1_1DeleteSubscriptionFilterCommand;
const deserializeAws_json1_1DeleteSubscriptionFilterCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "OperationAbortedException":
        case "com.amazonaws.cloudwatchlogs#OperationAbortedException":
            response = {
                ...(await deserializeAws_json1_1OperationAbortedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DescribeDestinationsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeDestinationsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeDestinationsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeDestinationsCommand = deserializeAws_json1_1DescribeDestinationsCommand;
const deserializeAws_json1_1DescribeDestinationsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DescribeExportTasksCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeExportTasksCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeExportTasksResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeExportTasksCommand = deserializeAws_json1_1DescribeExportTasksCommand;
const deserializeAws_json1_1DescribeExportTasksCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DescribeLogGroupsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeLogGroupsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeLogGroupsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeLogGroupsCommand = deserializeAws_json1_1DescribeLogGroupsCommand;
const deserializeAws_json1_1DescribeLogGroupsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DescribeLogStreamsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeLogStreamsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeLogStreamsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeLogStreamsCommand = deserializeAws_json1_1DescribeLogStreamsCommand;
const deserializeAws_json1_1DescribeLogStreamsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DescribeMetricFiltersCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeMetricFiltersCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeMetricFiltersResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeMetricFiltersCommand = deserializeAws_json1_1DescribeMetricFiltersCommand;
const deserializeAws_json1_1DescribeMetricFiltersCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DescribeQueriesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeQueriesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeQueriesResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeQueriesCommand = deserializeAws_json1_1DescribeQueriesCommand;
const deserializeAws_json1_1DescribeQueriesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DescribeQueryDefinitionsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeQueryDefinitionsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeQueryDefinitionsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeQueryDefinitionsCommand = deserializeAws_json1_1DescribeQueryDefinitionsCommand;
const deserializeAws_json1_1DescribeQueryDefinitionsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DescribeResourcePoliciesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeResourcePoliciesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeResourcePoliciesResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeResourcePoliciesCommand = deserializeAws_json1_1DescribeResourcePoliciesCommand;
const deserializeAws_json1_1DescribeResourcePoliciesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DescribeSubscriptionFiltersCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeSubscriptionFiltersCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeSubscriptionFiltersResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeSubscriptionFiltersCommand = deserializeAws_json1_1DescribeSubscriptionFiltersCommand;
const deserializeAws_json1_1DescribeSubscriptionFiltersCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DisassociateKmsKeyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DisassociateKmsKeyCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DisassociateKmsKeyCommand = deserializeAws_json1_1DisassociateKmsKeyCommand;
const deserializeAws_json1_1DisassociateKmsKeyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "OperationAbortedException":
        case "com.amazonaws.cloudwatchlogs#OperationAbortedException":
            response = {
                ...(await deserializeAws_json1_1OperationAbortedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1FilterLogEventsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1FilterLogEventsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1FilterLogEventsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1FilterLogEventsCommand = deserializeAws_json1_1FilterLogEventsCommand;
const deserializeAws_json1_1FilterLogEventsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1GetLogEventsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetLogEventsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetLogEventsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetLogEventsCommand = deserializeAws_json1_1GetLogEventsCommand;
const deserializeAws_json1_1GetLogEventsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1GetLogGroupFieldsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetLogGroupFieldsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetLogGroupFieldsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetLogGroupFieldsCommand = deserializeAws_json1_1GetLogGroupFieldsCommand;
const deserializeAws_json1_1GetLogGroupFieldsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.cloudwatchlogs#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1GetLogRecordCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetLogRecordCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetLogRecordResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetLogRecordCommand = deserializeAws_json1_1GetLogRecordCommand;
const deserializeAws_json1_1GetLogRecordCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.cloudwatchlogs#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1GetQueryResultsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetQueryResultsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetQueryResultsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetQueryResultsCommand = deserializeAws_json1_1GetQueryResultsCommand;
const deserializeAws_json1_1GetQueryResultsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1ListTagsLogGroupCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListTagsLogGroupCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListTagsLogGroupResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListTagsLogGroupCommand = deserializeAws_json1_1ListTagsLogGroupCommand;
const deserializeAws_json1_1ListTagsLogGroupCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1PutDestinationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1PutDestinationCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1PutDestinationResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1PutDestinationCommand = deserializeAws_json1_1PutDestinationCommand;
const deserializeAws_json1_1PutDestinationCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "OperationAbortedException":
        case "com.amazonaws.cloudwatchlogs#OperationAbortedException":
            response = {
                ...(await deserializeAws_json1_1OperationAbortedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1PutDestinationPolicyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1PutDestinationPolicyCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1PutDestinationPolicyCommand = deserializeAws_json1_1PutDestinationPolicyCommand;
const deserializeAws_json1_1PutDestinationPolicyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "OperationAbortedException":
        case "com.amazonaws.cloudwatchlogs#OperationAbortedException":
            response = {
                ...(await deserializeAws_json1_1OperationAbortedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1PutLogEventsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1PutLogEventsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1PutLogEventsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1PutLogEventsCommand = deserializeAws_json1_1PutLogEventsCommand;
const deserializeAws_json1_1PutLogEventsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "DataAlreadyAcceptedException":
        case "com.amazonaws.cloudwatchlogs#DataAlreadyAcceptedException":
            response = {
                ...(await deserializeAws_json1_1DataAlreadyAcceptedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidSequenceTokenException":
        case "com.amazonaws.cloudwatchlogs#InvalidSequenceTokenException":
            response = {
                ...(await deserializeAws_json1_1InvalidSequenceTokenExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnrecognizedClientException":
        case "com.amazonaws.cloudwatchlogs#UnrecognizedClientException":
            response = {
                ...(await deserializeAws_json1_1UnrecognizedClientExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1PutMetricFilterCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1PutMetricFilterCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1PutMetricFilterCommand = deserializeAws_json1_1PutMetricFilterCommand;
const deserializeAws_json1_1PutMetricFilterCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.cloudwatchlogs#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "OperationAbortedException":
        case "com.amazonaws.cloudwatchlogs#OperationAbortedException":
            response = {
                ...(await deserializeAws_json1_1OperationAbortedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1PutQueryDefinitionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1PutQueryDefinitionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1PutQueryDefinitionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1PutQueryDefinitionCommand = deserializeAws_json1_1PutQueryDefinitionCommand;
const deserializeAws_json1_1PutQueryDefinitionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1PutResourcePolicyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1PutResourcePolicyCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1PutResourcePolicyResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1PutResourcePolicyCommand = deserializeAws_json1_1PutResourcePolicyCommand;
const deserializeAws_json1_1PutResourcePolicyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.cloudwatchlogs#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1PutRetentionPolicyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1PutRetentionPolicyCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1PutRetentionPolicyCommand = deserializeAws_json1_1PutRetentionPolicyCommand;
const deserializeAws_json1_1PutRetentionPolicyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "OperationAbortedException":
        case "com.amazonaws.cloudwatchlogs#OperationAbortedException":
            response = {
                ...(await deserializeAws_json1_1OperationAbortedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1PutSubscriptionFilterCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1PutSubscriptionFilterCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1PutSubscriptionFilterCommand = deserializeAws_json1_1PutSubscriptionFilterCommand;
const deserializeAws_json1_1PutSubscriptionFilterCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.cloudwatchlogs#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "OperationAbortedException":
        case "com.amazonaws.cloudwatchlogs#OperationAbortedException":
            response = {
                ...(await deserializeAws_json1_1OperationAbortedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1StartQueryCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartQueryCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartQueryResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartQueryCommand = deserializeAws_json1_1StartQueryCommand;
const deserializeAws_json1_1StartQueryCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.cloudwatchlogs#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "MalformedQueryException":
        case "com.amazonaws.cloudwatchlogs#MalformedQueryException":
            response = {
                ...(await deserializeAws_json1_1MalformedQueryExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1StopQueryCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StopQueryCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StopQueryResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StopQueryCommand = deserializeAws_json1_1StopQueryCommand;
const deserializeAws_json1_1StopQueryCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1TagLogGroupCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1TagLogGroupCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1TagLogGroupCommand = deserializeAws_json1_1TagLogGroupCommand;
const deserializeAws_json1_1TagLogGroupCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1TestMetricFilterCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1TestMetricFilterCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1TestMetricFilterResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1TestMetricFilterCommand = deserializeAws_json1_1TestMetricFilterCommand;
const deserializeAws_json1_1TestMetricFilterCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidParameterException":
        case "com.amazonaws.cloudwatchlogs#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.cloudwatchlogs#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1UntagLogGroupCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1UntagLogGroupCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1UntagLogGroupCommand = deserializeAws_json1_1UntagLogGroupCommand;
const deserializeAws_json1_1UntagLogGroupCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "ResourceNotFoundException":
        case "com.amazonaws.cloudwatchlogs#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        default:
            const parsedBody = parsedOutput.body;
            errorCode = parsedBody.code || parsedBody.Code || errorCode;
            response = {
                ...parsedBody,
                name: `${errorCode}`,
                message: parsedBody.message || parsedBody.Message || errorCode,
                $fault: "client",
                $metadata: deserializeMetadata(output),
            };
    }
    const message = response.message || response.Message || errorCode;
    response.message = message;
    delete response.Message;
    return Promise.reject(Object.assign(new Error(message), response));
};
const deserializeAws_json1_1DataAlreadyAcceptedExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1DataAlreadyAcceptedException(body, context);
    const contents = {
        name: "DataAlreadyAcceptedException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1InvalidOperationExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1InvalidOperationException(body, context);
    const contents = {
        name: "InvalidOperationException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1InvalidParameterExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1InvalidParameterException(body, context);
    const contents = {
        name: "InvalidParameterException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1InvalidSequenceTokenExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1InvalidSequenceTokenException(body, context);
    const contents = {
        name: "InvalidSequenceTokenException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1LimitExceededExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1LimitExceededException(body, context);
    const contents = {
        name: "LimitExceededException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1MalformedQueryExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1MalformedQueryException(body, context);
    const contents = {
        name: "MalformedQueryException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1OperationAbortedExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1OperationAbortedException(body, context);
    const contents = {
        name: "OperationAbortedException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1ResourceAlreadyExistsExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ResourceAlreadyExistsException(body, context);
    const contents = {
        name: "ResourceAlreadyExistsException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1ResourceNotFoundExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ResourceNotFoundException(body, context);
    const contents = {
        name: "ResourceNotFoundException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1ServiceUnavailableExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ServiceUnavailableException(body, context);
    const contents = {
        name: "ServiceUnavailableException",
        $fault: "server",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1UnrecognizedClientExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1UnrecognizedClientException(body, context);
    const contents = {
        name: "UnrecognizedClientException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const serializeAws_json1_1AssociateKmsKeyRequest = (input, context) => {
    return {
        ...(input.kmsKeyId !== undefined && input.kmsKeyId !== null && { kmsKeyId: input.kmsKeyId }),
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
    };
};
const serializeAws_json1_1CancelExportTaskRequest = (input, context) => {
    return {
        ...(input.taskId !== undefined && input.taskId !== null && { taskId: input.taskId }),
    };
};
const serializeAws_json1_1CreateExportTaskRequest = (input, context) => {
    return {
        ...(input.destination !== undefined && input.destination !== null && { destination: input.destination }),
        ...(input.destinationPrefix !== undefined &&
            input.destinationPrefix !== null && { destinationPrefix: input.destinationPrefix }),
        ...(input.from !== undefined && input.from !== null && { from: input.from }),
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
        ...(input.logStreamNamePrefix !== undefined &&
            input.logStreamNamePrefix !== null && { logStreamNamePrefix: input.logStreamNamePrefix }),
        ...(input.taskName !== undefined && input.taskName !== null && { taskName: input.taskName }),
        ...(input.to !== undefined && input.to !== null && { to: input.to }),
    };
};
const serializeAws_json1_1CreateLogGroupRequest = (input, context) => {
    return {
        ...(input.kmsKeyId !== undefined && input.kmsKeyId !== null && { kmsKeyId: input.kmsKeyId }),
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
        ...(input.tags !== undefined && input.tags !== null && { tags: serializeAws_json1_1Tags(input.tags, context) }),
    };
};
const serializeAws_json1_1CreateLogStreamRequest = (input, context) => {
    return {
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
        ...(input.logStreamName !== undefined && input.logStreamName !== null && { logStreamName: input.logStreamName }),
    };
};
const serializeAws_json1_1DeleteDestinationRequest = (input, context) => {
    return {
        ...(input.destinationName !== undefined &&
            input.destinationName !== null && { destinationName: input.destinationName }),
    };
};
const serializeAws_json1_1DeleteLogGroupRequest = (input, context) => {
    return {
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
    };
};
const serializeAws_json1_1DeleteLogStreamRequest = (input, context) => {
    return {
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
        ...(input.logStreamName !== undefined && input.logStreamName !== null && { logStreamName: input.logStreamName }),
    };
};
const serializeAws_json1_1DeleteMetricFilterRequest = (input, context) => {
    return {
        ...(input.filterName !== undefined && input.filterName !== null && { filterName: input.filterName }),
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
    };
};
const serializeAws_json1_1DeleteQueryDefinitionRequest = (input, context) => {
    return {
        ...(input.queryDefinitionId !== undefined &&
            input.queryDefinitionId !== null && { queryDefinitionId: input.queryDefinitionId }),
    };
};
const serializeAws_json1_1DeleteResourcePolicyRequest = (input, context) => {
    return {
        ...(input.policyName !== undefined && input.policyName !== null && { policyName: input.policyName }),
    };
};
const serializeAws_json1_1DeleteRetentionPolicyRequest = (input, context) => {
    return {
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
    };
};
const serializeAws_json1_1DeleteSubscriptionFilterRequest = (input, context) => {
    return {
        ...(input.filterName !== undefined && input.filterName !== null && { filterName: input.filterName }),
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
    };
};
const serializeAws_json1_1DescribeDestinationsRequest = (input, context) => {
    return {
        ...(input.DestinationNamePrefix !== undefined &&
            input.DestinationNamePrefix !== null && { DestinationNamePrefix: input.DestinationNamePrefix }),
        ...(input.limit !== undefined && input.limit !== null && { limit: input.limit }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
    };
};
const serializeAws_json1_1DescribeExportTasksRequest = (input, context) => {
    return {
        ...(input.limit !== undefined && input.limit !== null && { limit: input.limit }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
        ...(input.statusCode !== undefined && input.statusCode !== null && { statusCode: input.statusCode }),
        ...(input.taskId !== undefined && input.taskId !== null && { taskId: input.taskId }),
    };
};
const serializeAws_json1_1DescribeLogGroupsRequest = (input, context) => {
    return {
        ...(input.limit !== undefined && input.limit !== null && { limit: input.limit }),
        ...(input.logGroupNamePrefix !== undefined &&
            input.logGroupNamePrefix !== null && { logGroupNamePrefix: input.logGroupNamePrefix }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
    };
};
const serializeAws_json1_1DescribeLogStreamsRequest = (input, context) => {
    return {
        ...(input.descending !== undefined && input.descending !== null && { descending: input.descending }),
        ...(input.limit !== undefined && input.limit !== null && { limit: input.limit }),
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
        ...(input.logStreamNamePrefix !== undefined &&
            input.logStreamNamePrefix !== null && { logStreamNamePrefix: input.logStreamNamePrefix }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
        ...(input.orderBy !== undefined && input.orderBy !== null && { orderBy: input.orderBy }),
    };
};
const serializeAws_json1_1DescribeMetricFiltersRequest = (input, context) => {
    return {
        ...(input.filterNamePrefix !== undefined &&
            input.filterNamePrefix !== null && { filterNamePrefix: input.filterNamePrefix }),
        ...(input.limit !== undefined && input.limit !== null && { limit: input.limit }),
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
        ...(input.metricName !== undefined && input.metricName !== null && { metricName: input.metricName }),
        ...(input.metricNamespace !== undefined &&
            input.metricNamespace !== null && { metricNamespace: input.metricNamespace }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
    };
};
const serializeAws_json1_1DescribeQueriesRequest = (input, context) => {
    return {
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
        ...(input.maxResults !== undefined && input.maxResults !== null && { maxResults: input.maxResults }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
        ...(input.status !== undefined && input.status !== null && { status: input.status }),
    };
};
const serializeAws_json1_1DescribeQueryDefinitionsRequest = (input, context) => {
    return {
        ...(input.maxResults !== undefined && input.maxResults !== null && { maxResults: input.maxResults }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
        ...(input.queryDefinitionNamePrefix !== undefined &&
            input.queryDefinitionNamePrefix !== null && { queryDefinitionNamePrefix: input.queryDefinitionNamePrefix }),
    };
};
const serializeAws_json1_1DescribeResourcePoliciesRequest = (input, context) => {
    return {
        ...(input.limit !== undefined && input.limit !== null && { limit: input.limit }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
    };
};
const serializeAws_json1_1DescribeSubscriptionFiltersRequest = (input, context) => {
    return {
        ...(input.filterNamePrefix !== undefined &&
            input.filterNamePrefix !== null && { filterNamePrefix: input.filterNamePrefix }),
        ...(input.limit !== undefined && input.limit !== null && { limit: input.limit }),
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
    };
};
const serializeAws_json1_1DisassociateKmsKeyRequest = (input, context) => {
    return {
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
    };
};
const serializeAws_json1_1FilterLogEventsRequest = (input, context) => {
    return {
        ...(input.endTime !== undefined && input.endTime !== null && { endTime: input.endTime }),
        ...(input.filterPattern !== undefined && input.filterPattern !== null && { filterPattern: input.filterPattern }),
        ...(input.interleaved !== undefined && input.interleaved !== null && { interleaved: input.interleaved }),
        ...(input.limit !== undefined && input.limit !== null && { limit: input.limit }),
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
        ...(input.logStreamNamePrefix !== undefined &&
            input.logStreamNamePrefix !== null && { logStreamNamePrefix: input.logStreamNamePrefix }),
        ...(input.logStreamNames !== undefined &&
            input.logStreamNames !== null && {
            logStreamNames: serializeAws_json1_1InputLogStreamNames(input.logStreamNames, context),
        }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
        ...(input.startTime !== undefined && input.startTime !== null && { startTime: input.startTime }),
    };
};
const serializeAws_json1_1GetLogEventsRequest = (input, context) => {
    return {
        ...(input.endTime !== undefined && input.endTime !== null && { endTime: input.endTime }),
        ...(input.limit !== undefined && input.limit !== null && { limit: input.limit }),
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
        ...(input.logStreamName !== undefined && input.logStreamName !== null && { logStreamName: input.logStreamName }),
        ...(input.nextToken !== undefined && input.nextToken !== null && { nextToken: input.nextToken }),
        ...(input.startFromHead !== undefined && input.startFromHead !== null && { startFromHead: input.startFromHead }),
        ...(input.startTime !== undefined && input.startTime !== null && { startTime: input.startTime }),
    };
};
const serializeAws_json1_1GetLogGroupFieldsRequest = (input, context) => {
    return {
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
        ...(input.time !== undefined && input.time !== null && { time: input.time }),
    };
};
const serializeAws_json1_1GetLogRecordRequest = (input, context) => {
    return {
        ...(input.logRecordPointer !== undefined &&
            input.logRecordPointer !== null && { logRecordPointer: input.logRecordPointer }),
    };
};
const serializeAws_json1_1GetQueryResultsRequest = (input, context) => {
    return {
        ...(input.queryId !== undefined && input.queryId !== null && { queryId: input.queryId }),
    };
};
const serializeAws_json1_1InputLogEvent = (input, context) => {
    return {
        ...(input.message !== undefined && input.message !== null && { message: input.message }),
        ...(input.timestamp !== undefined && input.timestamp !== null && { timestamp: input.timestamp }),
    };
};
const serializeAws_json1_1InputLogEvents = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1InputLogEvent(entry, context);
    });
};
const serializeAws_json1_1InputLogStreamNames = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1ListTagsLogGroupRequest = (input, context) => {
    return {
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
    };
};
const serializeAws_json1_1LogGroupNames = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1MetricTransformation = (input, context) => {
    return {
        ...(input.defaultValue !== undefined && input.defaultValue !== null && { defaultValue: input.defaultValue }),
        ...(input.metricName !== undefined && input.metricName !== null && { metricName: input.metricName }),
        ...(input.metricNamespace !== undefined &&
            input.metricNamespace !== null && { metricNamespace: input.metricNamespace }),
        ...(input.metricValue !== undefined && input.metricValue !== null && { metricValue: input.metricValue }),
    };
};
const serializeAws_json1_1MetricTransformations = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1MetricTransformation(entry, context);
    });
};
const serializeAws_json1_1PutDestinationPolicyRequest = (input, context) => {
    return {
        ...(input.accessPolicy !== undefined && input.accessPolicy !== null && { accessPolicy: input.accessPolicy }),
        ...(input.destinationName !== undefined &&
            input.destinationName !== null && { destinationName: input.destinationName }),
    };
};
const serializeAws_json1_1PutDestinationRequest = (input, context) => {
    return {
        ...(input.destinationName !== undefined &&
            input.destinationName !== null && { destinationName: input.destinationName }),
        ...(input.roleArn !== undefined && input.roleArn !== null && { roleArn: input.roleArn }),
        ...(input.targetArn !== undefined && input.targetArn !== null && { targetArn: input.targetArn }),
    };
};
const serializeAws_json1_1PutLogEventsRequest = (input, context) => {
    return {
        ...(input.logEvents !== undefined &&
            input.logEvents !== null && { logEvents: serializeAws_json1_1InputLogEvents(input.logEvents, context) }),
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
        ...(input.logStreamName !== undefined && input.logStreamName !== null && { logStreamName: input.logStreamName }),
        ...(input.sequenceToken !== undefined && input.sequenceToken !== null && { sequenceToken: input.sequenceToken }),
    };
};
const serializeAws_json1_1PutMetricFilterRequest = (input, context) => {
    return {
        ...(input.filterName !== undefined && input.filterName !== null && { filterName: input.filterName }),
        ...(input.filterPattern !== undefined && input.filterPattern !== null && { filterPattern: input.filterPattern }),
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
        ...(input.metricTransformations !== undefined &&
            input.metricTransformations !== null && {
            metricTransformations: serializeAws_json1_1MetricTransformations(input.metricTransformations, context),
        }),
    };
};
const serializeAws_json1_1PutQueryDefinitionRequest = (input, context) => {
    return {
        ...(input.logGroupNames !== undefined &&
            input.logGroupNames !== null && {
            logGroupNames: serializeAws_json1_1LogGroupNames(input.logGroupNames, context),
        }),
        ...(input.name !== undefined && input.name !== null && { name: input.name }),
        ...(input.queryDefinitionId !== undefined &&
            input.queryDefinitionId !== null && { queryDefinitionId: input.queryDefinitionId }),
        ...(input.queryString !== undefined && input.queryString !== null && { queryString: input.queryString }),
    };
};
const serializeAws_json1_1PutResourcePolicyRequest = (input, context) => {
    return {
        ...(input.policyDocument !== undefined &&
            input.policyDocument !== null && { policyDocument: input.policyDocument }),
        ...(input.policyName !== undefined && input.policyName !== null && { policyName: input.policyName }),
    };
};
const serializeAws_json1_1PutRetentionPolicyRequest = (input, context) => {
    return {
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
        ...(input.retentionInDays !== undefined &&
            input.retentionInDays !== null && { retentionInDays: input.retentionInDays }),
    };
};
const serializeAws_json1_1PutSubscriptionFilterRequest = (input, context) => {
    return {
        ...(input.destinationArn !== undefined &&
            input.destinationArn !== null && { destinationArn: input.destinationArn }),
        ...(input.distribution !== undefined && input.distribution !== null && { distribution: input.distribution }),
        ...(input.filterName !== undefined && input.filterName !== null && { filterName: input.filterName }),
        ...(input.filterPattern !== undefined && input.filterPattern !== null && { filterPattern: input.filterPattern }),
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
        ...(input.roleArn !== undefined && input.roleArn !== null && { roleArn: input.roleArn }),
    };
};
const serializeAws_json1_1StartQueryRequest = (input, context) => {
    return {
        ...(input.endTime !== undefined && input.endTime !== null && { endTime: input.endTime }),
        ...(input.limit !== undefined && input.limit !== null && { limit: input.limit }),
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
        ...(input.logGroupNames !== undefined &&
            input.logGroupNames !== null && {
            logGroupNames: serializeAws_json1_1LogGroupNames(input.logGroupNames, context),
        }),
        ...(input.queryString !== undefined && input.queryString !== null && { queryString: input.queryString }),
        ...(input.startTime !== undefined && input.startTime !== null && { startTime: input.startTime }),
    };
};
const serializeAws_json1_1StopQueryRequest = (input, context) => {
    return {
        ...(input.queryId !== undefined && input.queryId !== null && { queryId: input.queryId }),
    };
};
const serializeAws_json1_1TagList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1TagLogGroupRequest = (input, context) => {
    return {
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
        ...(input.tags !== undefined && input.tags !== null && { tags: serializeAws_json1_1Tags(input.tags, context) }),
    };
};
const serializeAws_json1_1Tags = (input, context) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        return {
            ...acc,
            [key]: value,
        };
    }, {});
};
const serializeAws_json1_1TestEventMessages = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1TestMetricFilterRequest = (input, context) => {
    return {
        ...(input.filterPattern !== undefined && input.filterPattern !== null && { filterPattern: input.filterPattern }),
        ...(input.logEventMessages !== undefined &&
            input.logEventMessages !== null && {
            logEventMessages: serializeAws_json1_1TestEventMessages(input.logEventMessages, context),
        }),
    };
};
const serializeAws_json1_1UntagLogGroupRequest = (input, context) => {
    return {
        ...(input.logGroupName !== undefined && input.logGroupName !== null && { logGroupName: input.logGroupName }),
        ...(input.tags !== undefined && input.tags !== null && { tags: serializeAws_json1_1TagList(input.tags, context) }),
    };
};
const deserializeAws_json1_1CreateExportTaskResponse = (output, context) => {
    return {
        taskId: output.taskId !== undefined && output.taskId !== null ? output.taskId : undefined,
    };
};
const deserializeAws_json1_1DataAlreadyAcceptedException = (output, context) => {
    return {
        expectedSequenceToken: output.expectedSequenceToken !== undefined && output.expectedSequenceToken !== null
            ? output.expectedSequenceToken
            : undefined,
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1DeleteQueryDefinitionResponse = (output, context) => {
    return {
        success: output.success !== undefined && output.success !== null ? output.success : undefined,
    };
};
const deserializeAws_json1_1DescribeDestinationsResponse = (output, context) => {
    return {
        destinations: output.destinations !== undefined && output.destinations !== null
            ? deserializeAws_json1_1Destinations(output.destinations, context)
            : undefined,
        nextToken: output.nextToken !== undefined && output.nextToken !== null ? output.nextToken : undefined,
    };
};
const deserializeAws_json1_1DescribeExportTasksResponse = (output, context) => {
    return {
        exportTasks: output.exportTasks !== undefined && output.exportTasks !== null
            ? deserializeAws_json1_1ExportTasks(output.exportTasks, context)
            : undefined,
        nextToken: output.nextToken !== undefined && output.nextToken !== null ? output.nextToken : undefined,
    };
};
const deserializeAws_json1_1DescribeLogGroupsResponse = (output, context) => {
    return {
        logGroups: output.logGroups !== undefined && output.logGroups !== null
            ? deserializeAws_json1_1LogGroups(output.logGroups, context)
            : undefined,
        nextToken: output.nextToken !== undefined && output.nextToken !== null ? output.nextToken : undefined,
    };
};
const deserializeAws_json1_1DescribeLogStreamsResponse = (output, context) => {
    return {
        logStreams: output.logStreams !== undefined && output.logStreams !== null
            ? deserializeAws_json1_1LogStreams(output.logStreams, context)
            : undefined,
        nextToken: output.nextToken !== undefined && output.nextToken !== null ? output.nextToken : undefined,
    };
};
const deserializeAws_json1_1DescribeMetricFiltersResponse = (output, context) => {
    return {
        metricFilters: output.metricFilters !== undefined && output.metricFilters !== null
            ? deserializeAws_json1_1MetricFilters(output.metricFilters, context)
            : undefined,
        nextToken: output.nextToken !== undefined && output.nextToken !== null ? output.nextToken : undefined,
    };
};
const deserializeAws_json1_1DescribeQueriesResponse = (output, context) => {
    return {
        nextToken: output.nextToken !== undefined && output.nextToken !== null ? output.nextToken : undefined,
        queries: output.queries !== undefined && output.queries !== null
            ? deserializeAws_json1_1QueryInfoList(output.queries, context)
            : undefined,
    };
};
const deserializeAws_json1_1DescribeQueryDefinitionsResponse = (output, context) => {
    return {
        nextToken: output.nextToken !== undefined && output.nextToken !== null ? output.nextToken : undefined,
        queryDefinitions: output.queryDefinitions !== undefined && output.queryDefinitions !== null
            ? deserializeAws_json1_1QueryDefinitionList(output.queryDefinitions, context)
            : undefined,
    };
};
const deserializeAws_json1_1DescribeResourcePoliciesResponse = (output, context) => {
    return {
        nextToken: output.nextToken !== undefined && output.nextToken !== null ? output.nextToken : undefined,
        resourcePolicies: output.resourcePolicies !== undefined && output.resourcePolicies !== null
            ? deserializeAws_json1_1ResourcePolicies(output.resourcePolicies, context)
            : undefined,
    };
};
const deserializeAws_json1_1DescribeSubscriptionFiltersResponse = (output, context) => {
    return {
        nextToken: output.nextToken !== undefined && output.nextToken !== null ? output.nextToken : undefined,
        subscriptionFilters: output.subscriptionFilters !== undefined && output.subscriptionFilters !== null
            ? deserializeAws_json1_1SubscriptionFilters(output.subscriptionFilters, context)
            : undefined,
    };
};
const deserializeAws_json1_1Destination = (output, context) => {
    return {
        accessPolicy: output.accessPolicy !== undefined && output.accessPolicy !== null ? output.accessPolicy : undefined,
        arn: output.arn !== undefined && output.arn !== null ? output.arn : undefined,
        creationTime: output.creationTime !== undefined && output.creationTime !== null ? output.creationTime : undefined,
        destinationName: output.destinationName !== undefined && output.destinationName !== null ? output.destinationName : undefined,
        roleArn: output.roleArn !== undefined && output.roleArn !== null ? output.roleArn : undefined,
        targetArn: output.targetArn !== undefined && output.targetArn !== null ? output.targetArn : undefined,
    };
};
const deserializeAws_json1_1Destinations = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Destination(entry, context);
    });
};
const deserializeAws_json1_1ExportTask = (output, context) => {
    return {
        destination: output.destination !== undefined && output.destination !== null ? output.destination : undefined,
        destinationPrefix: output.destinationPrefix !== undefined && output.destinationPrefix !== null
            ? output.destinationPrefix
            : undefined,
        executionInfo: output.executionInfo !== undefined && output.executionInfo !== null
            ? deserializeAws_json1_1ExportTaskExecutionInfo(output.executionInfo, context)
            : undefined,
        from: output.from !== undefined && output.from !== null ? output.from : undefined,
        logGroupName: output.logGroupName !== undefined && output.logGroupName !== null ? output.logGroupName : undefined,
        status: output.status !== undefined && output.status !== null
            ? deserializeAws_json1_1ExportTaskStatus(output.status, context)
            : undefined,
        taskId: output.taskId !== undefined && output.taskId !== null ? output.taskId : undefined,
        taskName: output.taskName !== undefined && output.taskName !== null ? output.taskName : undefined,
        to: output.to !== undefined && output.to !== null ? output.to : undefined,
    };
};
const deserializeAws_json1_1ExportTaskExecutionInfo = (output, context) => {
    return {
        completionTime: output.completionTime !== undefined && output.completionTime !== null ? output.completionTime : undefined,
        creationTime: output.creationTime !== undefined && output.creationTime !== null ? output.creationTime : undefined,
    };
};
const deserializeAws_json1_1ExportTasks = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ExportTask(entry, context);
    });
};
const deserializeAws_json1_1ExportTaskStatus = (output, context) => {
    return {
        code: output.code !== undefined && output.code !== null ? output.code : undefined,
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1ExtractedValues = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        return {
            ...acc,
            [key]: value,
        };
    }, {});
};
const deserializeAws_json1_1FilteredLogEvent = (output, context) => {
    return {
        eventId: output.eventId !== undefined && output.eventId !== null ? output.eventId : undefined,
        ingestionTime: output.ingestionTime !== undefined && output.ingestionTime !== null ? output.ingestionTime : undefined,
        logStreamName: output.logStreamName !== undefined && output.logStreamName !== null ? output.logStreamName : undefined,
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
        timestamp: output.timestamp !== undefined && output.timestamp !== null ? output.timestamp : undefined,
    };
};
const deserializeAws_json1_1FilteredLogEvents = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1FilteredLogEvent(entry, context);
    });
};
const deserializeAws_json1_1FilterLogEventsResponse = (output, context) => {
    return {
        events: output.events !== undefined && output.events !== null
            ? deserializeAws_json1_1FilteredLogEvents(output.events, context)
            : undefined,
        nextToken: output.nextToken !== undefined && output.nextToken !== null ? output.nextToken : undefined,
        searchedLogStreams: output.searchedLogStreams !== undefined && output.searchedLogStreams !== null
            ? deserializeAws_json1_1SearchedLogStreams(output.searchedLogStreams, context)
            : undefined,
    };
};
const deserializeAws_json1_1GetLogEventsResponse = (output, context) => {
    return {
        events: output.events !== undefined && output.events !== null
            ? deserializeAws_json1_1OutputLogEvents(output.events, context)
            : undefined,
        nextBackwardToken: output.nextBackwardToken !== undefined && output.nextBackwardToken !== null
            ? output.nextBackwardToken
            : undefined,
        nextForwardToken: output.nextForwardToken !== undefined && output.nextForwardToken !== null ? output.nextForwardToken : undefined,
    };
};
const deserializeAws_json1_1GetLogGroupFieldsResponse = (output, context) => {
    return {
        logGroupFields: output.logGroupFields !== undefined && output.logGroupFields !== null
            ? deserializeAws_json1_1LogGroupFieldList(output.logGroupFields, context)
            : undefined,
    };
};
const deserializeAws_json1_1GetLogRecordResponse = (output, context) => {
    return {
        logRecord: output.logRecord !== undefined && output.logRecord !== null
            ? deserializeAws_json1_1LogRecord(output.logRecord, context)
            : undefined,
    };
};
const deserializeAws_json1_1GetQueryResultsResponse = (output, context) => {
    return {
        results: output.results !== undefined && output.results !== null
            ? deserializeAws_json1_1QueryResults(output.results, context)
            : undefined,
        statistics: output.statistics !== undefined && output.statistics !== null
            ? deserializeAws_json1_1QueryStatistics(output.statistics, context)
            : undefined,
        status: output.status !== undefined && output.status !== null ? output.status : undefined,
    };
};
const deserializeAws_json1_1InvalidOperationException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1InvalidParameterException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1InvalidSequenceTokenException = (output, context) => {
    return {
        expectedSequenceToken: output.expectedSequenceToken !== undefined && output.expectedSequenceToken !== null
            ? output.expectedSequenceToken
            : undefined,
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1LimitExceededException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1ListTagsLogGroupResponse = (output, context) => {
    return {
        tags: output.tags !== undefined && output.tags !== null ? deserializeAws_json1_1Tags(output.tags, context) : undefined,
    };
};
const deserializeAws_json1_1LogGroup = (output, context) => {
    return {
        arn: output.arn !== undefined && output.arn !== null ? output.arn : undefined,
        creationTime: output.creationTime !== undefined && output.creationTime !== null ? output.creationTime : undefined,
        kmsKeyId: output.kmsKeyId !== undefined && output.kmsKeyId !== null ? output.kmsKeyId : undefined,
        logGroupName: output.logGroupName !== undefined && output.logGroupName !== null ? output.logGroupName : undefined,
        metricFilterCount: output.metricFilterCount !== undefined && output.metricFilterCount !== null
            ? output.metricFilterCount
            : undefined,
        retentionInDays: output.retentionInDays !== undefined && output.retentionInDays !== null ? output.retentionInDays : undefined,
        storedBytes: output.storedBytes !== undefined && output.storedBytes !== null ? output.storedBytes : undefined,
    };
};
const deserializeAws_json1_1LogGroupField = (output, context) => {
    return {
        name: output.name !== undefined && output.name !== null ? output.name : undefined,
        percent: output.percent !== undefined && output.percent !== null ? output.percent : undefined,
    };
};
const deserializeAws_json1_1LogGroupFieldList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1LogGroupField(entry, context);
    });
};
const deserializeAws_json1_1LogGroupNames = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1LogGroups = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1LogGroup(entry, context);
    });
};
const deserializeAws_json1_1LogRecord = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        return {
            ...acc,
            [key]: value,
        };
    }, {});
};
const deserializeAws_json1_1LogStream = (output, context) => {
    return {
        arn: output.arn !== undefined && output.arn !== null ? output.arn : undefined,
        creationTime: output.creationTime !== undefined && output.creationTime !== null ? output.creationTime : undefined,
        firstEventTimestamp: output.firstEventTimestamp !== undefined && output.firstEventTimestamp !== null
            ? output.firstEventTimestamp
            : undefined,
        lastEventTimestamp: output.lastEventTimestamp !== undefined && output.lastEventTimestamp !== null
            ? output.lastEventTimestamp
            : undefined,
        lastIngestionTime: output.lastIngestionTime !== undefined && output.lastIngestionTime !== null
            ? output.lastIngestionTime
            : undefined,
        logStreamName: output.logStreamName !== undefined && output.logStreamName !== null ? output.logStreamName : undefined,
        storedBytes: output.storedBytes !== undefined && output.storedBytes !== null ? output.storedBytes : undefined,
        uploadSequenceToken: output.uploadSequenceToken !== undefined && output.uploadSequenceToken !== null
            ? output.uploadSequenceToken
            : undefined,
    };
};
const deserializeAws_json1_1LogStreams = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1LogStream(entry, context);
    });
};
const deserializeAws_json1_1MalformedQueryException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
        queryCompileError: output.queryCompileError !== undefined && output.queryCompileError !== null
            ? deserializeAws_json1_1QueryCompileError(output.queryCompileError, context)
            : undefined,
    };
};
const deserializeAws_json1_1MetricFilter = (output, context) => {
    return {
        creationTime: output.creationTime !== undefined && output.creationTime !== null ? output.creationTime : undefined,
        filterName: output.filterName !== undefined && output.filterName !== null ? output.filterName : undefined,
        filterPattern: output.filterPattern !== undefined && output.filterPattern !== null ? output.filterPattern : undefined,
        logGroupName: output.logGroupName !== undefined && output.logGroupName !== null ? output.logGroupName : undefined,
        metricTransformations: output.metricTransformations !== undefined && output.metricTransformations !== null
            ? deserializeAws_json1_1MetricTransformations(output.metricTransformations, context)
            : undefined,
    };
};
const deserializeAws_json1_1MetricFilterMatches = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1MetricFilterMatchRecord(entry, context);
    });
};
const deserializeAws_json1_1MetricFilterMatchRecord = (output, context) => {
    return {
        eventMessage: output.eventMessage !== undefined && output.eventMessage !== null ? output.eventMessage : undefined,
        eventNumber: output.eventNumber !== undefined && output.eventNumber !== null ? output.eventNumber : undefined,
        extractedValues: output.extractedValues !== undefined && output.extractedValues !== null
            ? deserializeAws_json1_1ExtractedValues(output.extractedValues, context)
            : undefined,
    };
};
const deserializeAws_json1_1MetricFilters = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1MetricFilter(entry, context);
    });
};
const deserializeAws_json1_1MetricTransformation = (output, context) => {
    return {
        defaultValue: output.defaultValue !== undefined && output.defaultValue !== null ? output.defaultValue : undefined,
        metricName: output.metricName !== undefined && output.metricName !== null ? output.metricName : undefined,
        metricNamespace: output.metricNamespace !== undefined && output.metricNamespace !== null ? output.metricNamespace : undefined,
        metricValue: output.metricValue !== undefined && output.metricValue !== null ? output.metricValue : undefined,
    };
};
const deserializeAws_json1_1MetricTransformations = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1MetricTransformation(entry, context);
    });
};
const deserializeAws_json1_1OperationAbortedException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1OutputLogEvent = (output, context) => {
    return {
        ingestionTime: output.ingestionTime !== undefined && output.ingestionTime !== null ? output.ingestionTime : undefined,
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
        timestamp: output.timestamp !== undefined && output.timestamp !== null ? output.timestamp : undefined,
    };
};
const deserializeAws_json1_1OutputLogEvents = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1OutputLogEvent(entry, context);
    });
};
const deserializeAws_json1_1PutDestinationResponse = (output, context) => {
    return {
        destination: output.destination !== undefined && output.destination !== null
            ? deserializeAws_json1_1Destination(output.destination, context)
            : undefined,
    };
};
const deserializeAws_json1_1PutLogEventsResponse = (output, context) => {
    return {
        nextSequenceToken: output.nextSequenceToken !== undefined && output.nextSequenceToken !== null
            ? output.nextSequenceToken
            : undefined,
        rejectedLogEventsInfo: output.rejectedLogEventsInfo !== undefined && output.rejectedLogEventsInfo !== null
            ? deserializeAws_json1_1RejectedLogEventsInfo(output.rejectedLogEventsInfo, context)
            : undefined,
    };
};
const deserializeAws_json1_1PutQueryDefinitionResponse = (output, context) => {
    return {
        queryDefinitionId: output.queryDefinitionId !== undefined && output.queryDefinitionId !== null
            ? output.queryDefinitionId
            : undefined,
    };
};
const deserializeAws_json1_1PutResourcePolicyResponse = (output, context) => {
    return {
        resourcePolicy: output.resourcePolicy !== undefined && output.resourcePolicy !== null
            ? deserializeAws_json1_1ResourcePolicy(output.resourcePolicy, context)
            : undefined,
    };
};
const deserializeAws_json1_1QueryCompileError = (output, context) => {
    return {
        location: output.location !== undefined && output.location !== null
            ? deserializeAws_json1_1QueryCompileErrorLocation(output.location, context)
            : undefined,
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1QueryCompileErrorLocation = (output, context) => {
    return {
        endCharOffset: output.endCharOffset !== undefined && output.endCharOffset !== null ? output.endCharOffset : undefined,
        startCharOffset: output.startCharOffset !== undefined && output.startCharOffset !== null ? output.startCharOffset : undefined,
    };
};
const deserializeAws_json1_1QueryDefinition = (output, context) => {
    return {
        lastModified: output.lastModified !== undefined && output.lastModified !== null ? output.lastModified : undefined,
        logGroupNames: output.logGroupNames !== undefined && output.logGroupNames !== null
            ? deserializeAws_json1_1LogGroupNames(output.logGroupNames, context)
            : undefined,
        name: output.name !== undefined && output.name !== null ? output.name : undefined,
        queryDefinitionId: output.queryDefinitionId !== undefined && output.queryDefinitionId !== null
            ? output.queryDefinitionId
            : undefined,
        queryString: output.queryString !== undefined && output.queryString !== null ? output.queryString : undefined,
    };
};
const deserializeAws_json1_1QueryDefinitionList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1QueryDefinition(entry, context);
    });
};
const deserializeAws_json1_1QueryInfo = (output, context) => {
    return {
        createTime: output.createTime !== undefined && output.createTime !== null ? output.createTime : undefined,
        logGroupName: output.logGroupName !== undefined && output.logGroupName !== null ? output.logGroupName : undefined,
        queryId: output.queryId !== undefined && output.queryId !== null ? output.queryId : undefined,
        queryString: output.queryString !== undefined && output.queryString !== null ? output.queryString : undefined,
        status: output.status !== undefined && output.status !== null ? output.status : undefined,
    };
};
const deserializeAws_json1_1QueryInfoList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1QueryInfo(entry, context);
    });
};
const deserializeAws_json1_1QueryResults = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ResultRows(entry, context);
    });
};
const deserializeAws_json1_1QueryStatistics = (output, context) => {
    return {
        bytesScanned: output.bytesScanned !== undefined && output.bytesScanned !== null ? output.bytesScanned : undefined,
        recordsMatched: output.recordsMatched !== undefined && output.recordsMatched !== null ? output.recordsMatched : undefined,
        recordsScanned: output.recordsScanned !== undefined && output.recordsScanned !== null ? output.recordsScanned : undefined,
    };
};
const deserializeAws_json1_1RejectedLogEventsInfo = (output, context) => {
    return {
        expiredLogEventEndIndex: output.expiredLogEventEndIndex !== undefined && output.expiredLogEventEndIndex !== null
            ? output.expiredLogEventEndIndex
            : undefined,
        tooNewLogEventStartIndex: output.tooNewLogEventStartIndex !== undefined && output.tooNewLogEventStartIndex !== null
            ? output.tooNewLogEventStartIndex
            : undefined,
        tooOldLogEventEndIndex: output.tooOldLogEventEndIndex !== undefined && output.tooOldLogEventEndIndex !== null
            ? output.tooOldLogEventEndIndex
            : undefined,
    };
};
const deserializeAws_json1_1ResourceAlreadyExistsException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1ResourceNotFoundException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1ResourcePolicies = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ResourcePolicy(entry, context);
    });
};
const deserializeAws_json1_1ResourcePolicy = (output, context) => {
    return {
        lastUpdatedTime: output.lastUpdatedTime !== undefined && output.lastUpdatedTime !== null ? output.lastUpdatedTime : undefined,
        policyDocument: output.policyDocument !== undefined && output.policyDocument !== null ? output.policyDocument : undefined,
        policyName: output.policyName !== undefined && output.policyName !== null ? output.policyName : undefined,
    };
};
const deserializeAws_json1_1ResultField = (output, context) => {
    return {
        field: output.field !== undefined && output.field !== null ? output.field : undefined,
        value: output.value !== undefined && output.value !== null ? output.value : undefined,
    };
};
const deserializeAws_json1_1ResultRows = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ResultField(entry, context);
    });
};
const deserializeAws_json1_1SearchedLogStream = (output, context) => {
    return {
        logStreamName: output.logStreamName !== undefined && output.logStreamName !== null ? output.logStreamName : undefined,
        searchedCompletely: output.searchedCompletely !== undefined && output.searchedCompletely !== null
            ? output.searchedCompletely
            : undefined,
    };
};
const deserializeAws_json1_1SearchedLogStreams = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1SearchedLogStream(entry, context);
    });
};
const deserializeAws_json1_1ServiceUnavailableException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1StartQueryResponse = (output, context) => {
    return {
        queryId: output.queryId !== undefined && output.queryId !== null ? output.queryId : undefined,
    };
};
const deserializeAws_json1_1StopQueryResponse = (output, context) => {
    return {
        success: output.success !== undefined && output.success !== null ? output.success : undefined,
    };
};
const deserializeAws_json1_1SubscriptionFilter = (output, context) => {
    return {
        creationTime: output.creationTime !== undefined && output.creationTime !== null ? output.creationTime : undefined,
        destinationArn: output.destinationArn !== undefined && output.destinationArn !== null ? output.destinationArn : undefined,
        distribution: output.distribution !== undefined && output.distribution !== null ? output.distribution : undefined,
        filterName: output.filterName !== undefined && output.filterName !== null ? output.filterName : undefined,
        filterPattern: output.filterPattern !== undefined && output.filterPattern !== null ? output.filterPattern : undefined,
        logGroupName: output.logGroupName !== undefined && output.logGroupName !== null ? output.logGroupName : undefined,
        roleArn: output.roleArn !== undefined && output.roleArn !== null ? output.roleArn : undefined,
    };
};
const deserializeAws_json1_1SubscriptionFilters = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1SubscriptionFilter(entry, context);
    });
};
const deserializeAws_json1_1Tags = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        return {
            ...acc,
            [key]: value,
        };
    }, {});
};
const deserializeAws_json1_1TestMetricFilterResponse = (output, context) => {
    return {
        matches: output.matches !== undefined && output.matches !== null
            ? deserializeAws_json1_1MetricFilterMatches(output.matches, context)
            : undefined,
    };
};
const deserializeAws_json1_1UnrecognizedClientException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeMetadata = (output) => {
    var _a;
    return ({
        httpStatusCode: output.statusCode,
        requestId: (_a = output.headers["x-amzn-requestid"]) !== null && _a !== void 0 ? _a : output.headers["x-amzn-request-id"],
        extendedRequestId: output.headers["x-amz-id-2"],
        cfId: output.headers["x-amz-cf-id"],
    });
};
// Collect low-level response body stream to Uint8Array.
const collectBody = (streamBody = new Uint8Array(), context) => {
    if (streamBody instanceof Uint8Array) {
        return Promise.resolve(streamBody);
    }
    return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};
// Encode Uint8Array data into string with utf-8.
const collectBodyString = (streamBody, context) => collectBody(streamBody, context).then((body) => context.utf8Encoder(body));
const buildHttpRpcRequest = async (context, headers, path, resolvedHostname, body) => {
    const { hostname, protocol = "https", port } = await context.endpoint();
    const contents = {
        protocol,
        hostname,
        port,
        method: "POST",
        path,
        headers,
    };
    if (resolvedHostname !== undefined) {
        contents.hostname = resolvedHostname;
    }
    if (body !== undefined) {
        contents.body = body;
    }
    return new protocol_http_1.HttpRequest(contents);
};
const parseBody = (streamBody, context) => collectBodyString(streamBody, context).then((encoded) => {
    if (encoded.length) {
        return JSON.parse(encoded);
    }
    return {};
});
/**
 * Load an error code for the aws.rest-json-1.1 protocol.
 */
const loadRestJsonErrorCode = (output, data) => {
    const findKey = (object, key) => Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase());
    const sanitizeErrorCode = (rawValue) => {
        let cleanValue = rawValue;
        if (cleanValue.indexOf(":") >= 0) {
            cleanValue = cleanValue.split(":")[0];
        }
        if (cleanValue.indexOf("#") >= 0) {
            cleanValue = cleanValue.split("#")[1];
        }
        return cleanValue;
    };
    const headerKey = findKey(output.headers, "x-amzn-errortype");
    if (headerKey !== undefined) {
        return sanitizeErrorCode(output.headers[headerKey]);
    }
    if (data.code !== undefined) {
        return sanitizeErrorCode(data.code);
    }
    if (data["__type"] !== undefined) {
        return sanitizeErrorCode(data["__type"]);
    }
    return "";
};
//# sourceMappingURL=Aws_json1_1.js.map
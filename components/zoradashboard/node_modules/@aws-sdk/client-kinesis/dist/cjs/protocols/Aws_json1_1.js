"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeAws_json1_1RegisterStreamConsumerCommand = exports.deserializeAws_json1_1PutRecordsCommand = exports.deserializeAws_json1_1PutRecordCommand = exports.deserializeAws_json1_1MergeShardsCommand = exports.deserializeAws_json1_1ListTagsForStreamCommand = exports.deserializeAws_json1_1ListStreamsCommand = exports.deserializeAws_json1_1ListStreamConsumersCommand = exports.deserializeAws_json1_1ListShardsCommand = exports.deserializeAws_json1_1IncreaseStreamRetentionPeriodCommand = exports.deserializeAws_json1_1GetShardIteratorCommand = exports.deserializeAws_json1_1GetRecordsCommand = exports.deserializeAws_json1_1EnableEnhancedMonitoringCommand = exports.deserializeAws_json1_1DisableEnhancedMonitoringCommand = exports.deserializeAws_json1_1DescribeStreamSummaryCommand = exports.deserializeAws_json1_1DescribeStreamConsumerCommand = exports.deserializeAws_json1_1DescribeStreamCommand = exports.deserializeAws_json1_1DescribeLimitsCommand = exports.deserializeAws_json1_1DeregisterStreamConsumerCommand = exports.deserializeAws_json1_1DeleteStreamCommand = exports.deserializeAws_json1_1DecreaseStreamRetentionPeriodCommand = exports.deserializeAws_json1_1CreateStreamCommand = exports.deserializeAws_json1_1AddTagsToStreamCommand = exports.serializeAws_json1_1UpdateShardCountCommand = exports.serializeAws_json1_1SubscribeToShardCommand = exports.serializeAws_json1_1StopStreamEncryptionCommand = exports.serializeAws_json1_1StartStreamEncryptionCommand = exports.serializeAws_json1_1SplitShardCommand = exports.serializeAws_json1_1RemoveTagsFromStreamCommand = exports.serializeAws_json1_1RegisterStreamConsumerCommand = exports.serializeAws_json1_1PutRecordsCommand = exports.serializeAws_json1_1PutRecordCommand = exports.serializeAws_json1_1MergeShardsCommand = exports.serializeAws_json1_1ListTagsForStreamCommand = exports.serializeAws_json1_1ListStreamsCommand = exports.serializeAws_json1_1ListStreamConsumersCommand = exports.serializeAws_json1_1ListShardsCommand = exports.serializeAws_json1_1IncreaseStreamRetentionPeriodCommand = exports.serializeAws_json1_1GetShardIteratorCommand = exports.serializeAws_json1_1GetRecordsCommand = exports.serializeAws_json1_1EnableEnhancedMonitoringCommand = exports.serializeAws_json1_1DisableEnhancedMonitoringCommand = exports.serializeAws_json1_1DescribeStreamSummaryCommand = exports.serializeAws_json1_1DescribeStreamConsumerCommand = exports.serializeAws_json1_1DescribeStreamCommand = exports.serializeAws_json1_1DescribeLimitsCommand = exports.serializeAws_json1_1DeregisterStreamConsumerCommand = exports.serializeAws_json1_1DeleteStreamCommand = exports.serializeAws_json1_1DecreaseStreamRetentionPeriodCommand = exports.serializeAws_json1_1CreateStreamCommand = exports.serializeAws_json1_1AddTagsToStreamCommand = void 0;
exports.deserializeAws_json1_1UpdateShardCountCommand = exports.deserializeAws_json1_1SubscribeToShardCommand = exports.deserializeAws_json1_1StopStreamEncryptionCommand = exports.deserializeAws_json1_1StartStreamEncryptionCommand = exports.deserializeAws_json1_1SplitShardCommand = exports.deserializeAws_json1_1RemoveTagsFromStreamCommand = void 0;
const protocol_http_1 = require("@aws-sdk/protocol-http");
const serializeAws_json1_1AddTagsToStreamCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.AddTagsToStream",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1AddTagsToStreamInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1AddTagsToStreamCommand = serializeAws_json1_1AddTagsToStreamCommand;
const serializeAws_json1_1CreateStreamCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.CreateStream",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1CreateStreamInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1CreateStreamCommand = serializeAws_json1_1CreateStreamCommand;
const serializeAws_json1_1DecreaseStreamRetentionPeriodCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.DecreaseStreamRetentionPeriod",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DecreaseStreamRetentionPeriodInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DecreaseStreamRetentionPeriodCommand = serializeAws_json1_1DecreaseStreamRetentionPeriodCommand;
const serializeAws_json1_1DeleteStreamCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.DeleteStream",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteStreamInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteStreamCommand = serializeAws_json1_1DeleteStreamCommand;
const serializeAws_json1_1DeregisterStreamConsumerCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.DeregisterStreamConsumer",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeregisterStreamConsumerInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeregisterStreamConsumerCommand = serializeAws_json1_1DeregisterStreamConsumerCommand;
const serializeAws_json1_1DescribeLimitsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.DescribeLimits",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeLimitsInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeLimitsCommand = serializeAws_json1_1DescribeLimitsCommand;
const serializeAws_json1_1DescribeStreamCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.DescribeStream",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeStreamInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeStreamCommand = serializeAws_json1_1DescribeStreamCommand;
const serializeAws_json1_1DescribeStreamConsumerCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.DescribeStreamConsumer",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeStreamConsumerInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeStreamConsumerCommand = serializeAws_json1_1DescribeStreamConsumerCommand;
const serializeAws_json1_1DescribeStreamSummaryCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.DescribeStreamSummary",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeStreamSummaryInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeStreamSummaryCommand = serializeAws_json1_1DescribeStreamSummaryCommand;
const serializeAws_json1_1DisableEnhancedMonitoringCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.DisableEnhancedMonitoring",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DisableEnhancedMonitoringInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DisableEnhancedMonitoringCommand = serializeAws_json1_1DisableEnhancedMonitoringCommand;
const serializeAws_json1_1EnableEnhancedMonitoringCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.EnableEnhancedMonitoring",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1EnableEnhancedMonitoringInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1EnableEnhancedMonitoringCommand = serializeAws_json1_1EnableEnhancedMonitoringCommand;
const serializeAws_json1_1GetRecordsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.GetRecords",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetRecordsInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetRecordsCommand = serializeAws_json1_1GetRecordsCommand;
const serializeAws_json1_1GetShardIteratorCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.GetShardIterator",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetShardIteratorInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetShardIteratorCommand = serializeAws_json1_1GetShardIteratorCommand;
const serializeAws_json1_1IncreaseStreamRetentionPeriodCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.IncreaseStreamRetentionPeriod",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1IncreaseStreamRetentionPeriodInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1IncreaseStreamRetentionPeriodCommand = serializeAws_json1_1IncreaseStreamRetentionPeriodCommand;
const serializeAws_json1_1ListShardsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.ListShards",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListShardsInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListShardsCommand = serializeAws_json1_1ListShardsCommand;
const serializeAws_json1_1ListStreamConsumersCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.ListStreamConsumers",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListStreamConsumersInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListStreamConsumersCommand = serializeAws_json1_1ListStreamConsumersCommand;
const serializeAws_json1_1ListStreamsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.ListStreams",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListStreamsInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListStreamsCommand = serializeAws_json1_1ListStreamsCommand;
const serializeAws_json1_1ListTagsForStreamCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.ListTagsForStream",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListTagsForStreamInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListTagsForStreamCommand = serializeAws_json1_1ListTagsForStreamCommand;
const serializeAws_json1_1MergeShardsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.MergeShards",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1MergeShardsInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1MergeShardsCommand = serializeAws_json1_1MergeShardsCommand;
const serializeAws_json1_1PutRecordCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.PutRecord",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1PutRecordInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1PutRecordCommand = serializeAws_json1_1PutRecordCommand;
const serializeAws_json1_1PutRecordsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.PutRecords",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1PutRecordsInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1PutRecordsCommand = serializeAws_json1_1PutRecordsCommand;
const serializeAws_json1_1RegisterStreamConsumerCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.RegisterStreamConsumer",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1RegisterStreamConsumerInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1RegisterStreamConsumerCommand = serializeAws_json1_1RegisterStreamConsumerCommand;
const serializeAws_json1_1RemoveTagsFromStreamCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.RemoveTagsFromStream",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1RemoveTagsFromStreamInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1RemoveTagsFromStreamCommand = serializeAws_json1_1RemoveTagsFromStreamCommand;
const serializeAws_json1_1SplitShardCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.SplitShard",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1SplitShardInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1SplitShardCommand = serializeAws_json1_1SplitShardCommand;
const serializeAws_json1_1StartStreamEncryptionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.StartStreamEncryption",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartStreamEncryptionInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartStreamEncryptionCommand = serializeAws_json1_1StartStreamEncryptionCommand;
const serializeAws_json1_1StopStreamEncryptionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.StopStreamEncryption",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StopStreamEncryptionInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StopStreamEncryptionCommand = serializeAws_json1_1StopStreamEncryptionCommand;
const serializeAws_json1_1SubscribeToShardCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.SubscribeToShard",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1SubscribeToShardInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1SubscribeToShardCommand = serializeAws_json1_1SubscribeToShardCommand;
const serializeAws_json1_1UpdateShardCountCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Kinesis_20131202.UpdateShardCount",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1UpdateShardCountInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1UpdateShardCountCommand = serializeAws_json1_1UpdateShardCountCommand;
const deserializeAws_json1_1AddTagsToStreamCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1AddTagsToStreamCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1AddTagsToStreamCommand = deserializeAws_json1_1AddTagsToStreamCommand;
const deserializeAws_json1_1AddTagsToStreamCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.kinesis#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1CreateStreamCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1CreateStreamCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1CreateStreamCommand = deserializeAws_json1_1CreateStreamCommand;
const deserializeAws_json1_1CreateStreamCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.kinesis#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1DecreaseStreamRetentionPeriodCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DecreaseStreamRetentionPeriodCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DecreaseStreamRetentionPeriodCommand = deserializeAws_json1_1DecreaseStreamRetentionPeriodCommand;
const deserializeAws_json1_1DecreaseStreamRetentionPeriodCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.kinesis#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1DeleteStreamCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteStreamCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteStreamCommand = deserializeAws_json1_1DeleteStreamCommand;
const deserializeAws_json1_1DeleteStreamCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.kinesis#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1DeregisterStreamConsumerCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeregisterStreamConsumerCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeregisterStreamConsumerCommand = deserializeAws_json1_1DeregisterStreamConsumerCommand;
const deserializeAws_json1_1DeregisterStreamConsumerCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1DescribeLimitsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeLimitsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeLimitsOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeLimitsCommand = deserializeAws_json1_1DescribeLimitsCommand;
const deserializeAws_json1_1DescribeLimitsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1DescribeStreamCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeStreamCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeStreamOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeStreamCommand = deserializeAws_json1_1DescribeStreamCommand;
const deserializeAws_json1_1DescribeStreamCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1DescribeStreamConsumerCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeStreamConsumerCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeStreamConsumerOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeStreamConsumerCommand = deserializeAws_json1_1DescribeStreamConsumerCommand;
const deserializeAws_json1_1DescribeStreamConsumerCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1DescribeStreamSummaryCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeStreamSummaryCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeStreamSummaryOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeStreamSummaryCommand = deserializeAws_json1_1DescribeStreamSummaryCommand;
const deserializeAws_json1_1DescribeStreamSummaryCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1DisableEnhancedMonitoringCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DisableEnhancedMonitoringCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1EnhancedMonitoringOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DisableEnhancedMonitoringCommand = deserializeAws_json1_1DisableEnhancedMonitoringCommand;
const deserializeAws_json1_1DisableEnhancedMonitoringCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.kinesis#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1EnableEnhancedMonitoringCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1EnableEnhancedMonitoringCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1EnhancedMonitoringOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1EnableEnhancedMonitoringCommand = deserializeAws_json1_1EnableEnhancedMonitoringCommand;
const deserializeAws_json1_1EnableEnhancedMonitoringCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.kinesis#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1GetRecordsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetRecordsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetRecordsOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetRecordsCommand = deserializeAws_json1_1GetRecordsCommand;
const deserializeAws_json1_1GetRecordsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "ExpiredIteratorException":
        case "com.amazonaws.kinesis#ExpiredIteratorException":
            response = {
                ...(await deserializeAws_json1_1ExpiredIteratorExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSAccessDeniedException":
        case "com.amazonaws.kinesis#KMSAccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1KMSAccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSDisabledException":
        case "com.amazonaws.kinesis#KMSDisabledException":
            response = {
                ...(await deserializeAws_json1_1KMSDisabledExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSInvalidStateException":
        case "com.amazonaws.kinesis#KMSInvalidStateException":
            response = {
                ...(await deserializeAws_json1_1KMSInvalidStateExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSNotFoundException":
        case "com.amazonaws.kinesis#KMSNotFoundException":
            response = {
                ...(await deserializeAws_json1_1KMSNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSOptInRequired":
        case "com.amazonaws.kinesis#KMSOptInRequired":
            response = {
                ...(await deserializeAws_json1_1KMSOptInRequiredResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSThrottlingException":
        case "com.amazonaws.kinesis#KMSThrottlingException":
            response = {
                ...(await deserializeAws_json1_1KMSThrottlingExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.kinesis#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1GetShardIteratorCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetShardIteratorCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetShardIteratorOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetShardIteratorCommand = deserializeAws_json1_1GetShardIteratorCommand;
const deserializeAws_json1_1GetShardIteratorCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.kinesis#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1IncreaseStreamRetentionPeriodCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1IncreaseStreamRetentionPeriodCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1IncreaseStreamRetentionPeriodCommand = deserializeAws_json1_1IncreaseStreamRetentionPeriodCommand;
const deserializeAws_json1_1IncreaseStreamRetentionPeriodCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.kinesis#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1ListShardsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListShardsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListShardsOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListShardsCommand = deserializeAws_json1_1ListShardsCommand;
const deserializeAws_json1_1ListShardsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "ExpiredNextTokenException":
        case "com.amazonaws.kinesis#ExpiredNextTokenException":
            response = {
                ...(await deserializeAws_json1_1ExpiredNextTokenExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.kinesis#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1ListStreamConsumersCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListStreamConsumersCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListStreamConsumersOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListStreamConsumersCommand = deserializeAws_json1_1ListStreamConsumersCommand;
const deserializeAws_json1_1ListStreamConsumersCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "ExpiredNextTokenException":
        case "com.amazonaws.kinesis#ExpiredNextTokenException":
            response = {
                ...(await deserializeAws_json1_1ExpiredNextTokenExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.kinesis#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1ListStreamsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListStreamsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListStreamsOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListStreamsCommand = deserializeAws_json1_1ListStreamsCommand;
const deserializeAws_json1_1ListStreamsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1ListTagsForStreamCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListTagsForStreamCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListTagsForStreamOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListTagsForStreamCommand = deserializeAws_json1_1ListTagsForStreamCommand;
const deserializeAws_json1_1ListTagsForStreamCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1MergeShardsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1MergeShardsCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1MergeShardsCommand = deserializeAws_json1_1MergeShardsCommand;
const deserializeAws_json1_1MergeShardsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.kinesis#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1PutRecordCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1PutRecordCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1PutRecordOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1PutRecordCommand = deserializeAws_json1_1PutRecordCommand;
const deserializeAws_json1_1PutRecordCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSAccessDeniedException":
        case "com.amazonaws.kinesis#KMSAccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1KMSAccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSDisabledException":
        case "com.amazonaws.kinesis#KMSDisabledException":
            response = {
                ...(await deserializeAws_json1_1KMSDisabledExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSInvalidStateException":
        case "com.amazonaws.kinesis#KMSInvalidStateException":
            response = {
                ...(await deserializeAws_json1_1KMSInvalidStateExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSNotFoundException":
        case "com.amazonaws.kinesis#KMSNotFoundException":
            response = {
                ...(await deserializeAws_json1_1KMSNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSOptInRequired":
        case "com.amazonaws.kinesis#KMSOptInRequired":
            response = {
                ...(await deserializeAws_json1_1KMSOptInRequiredResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSThrottlingException":
        case "com.amazonaws.kinesis#KMSThrottlingException":
            response = {
                ...(await deserializeAws_json1_1KMSThrottlingExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.kinesis#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1PutRecordsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1PutRecordsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1PutRecordsOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1PutRecordsCommand = deserializeAws_json1_1PutRecordsCommand;
const deserializeAws_json1_1PutRecordsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSAccessDeniedException":
        case "com.amazonaws.kinesis#KMSAccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1KMSAccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSDisabledException":
        case "com.amazonaws.kinesis#KMSDisabledException":
            response = {
                ...(await deserializeAws_json1_1KMSDisabledExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSInvalidStateException":
        case "com.amazonaws.kinesis#KMSInvalidStateException":
            response = {
                ...(await deserializeAws_json1_1KMSInvalidStateExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSNotFoundException":
        case "com.amazonaws.kinesis#KMSNotFoundException":
            response = {
                ...(await deserializeAws_json1_1KMSNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSOptInRequired":
        case "com.amazonaws.kinesis#KMSOptInRequired":
            response = {
                ...(await deserializeAws_json1_1KMSOptInRequiredResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSThrottlingException":
        case "com.amazonaws.kinesis#KMSThrottlingException":
            response = {
                ...(await deserializeAws_json1_1KMSThrottlingExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.kinesis#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1RegisterStreamConsumerCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1RegisterStreamConsumerCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1RegisterStreamConsumerOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1RegisterStreamConsumerCommand = deserializeAws_json1_1RegisterStreamConsumerCommand;
const deserializeAws_json1_1RegisterStreamConsumerCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.kinesis#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1RemoveTagsFromStreamCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1RemoveTagsFromStreamCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1RemoveTagsFromStreamCommand = deserializeAws_json1_1RemoveTagsFromStreamCommand;
const deserializeAws_json1_1RemoveTagsFromStreamCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.kinesis#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1SplitShardCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1SplitShardCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1SplitShardCommand = deserializeAws_json1_1SplitShardCommand;
const deserializeAws_json1_1SplitShardCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.kinesis#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1StartStreamEncryptionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartStreamEncryptionCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartStreamEncryptionCommand = deserializeAws_json1_1StartStreamEncryptionCommand;
const deserializeAws_json1_1StartStreamEncryptionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSAccessDeniedException":
        case "com.amazonaws.kinesis#KMSAccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1KMSAccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSDisabledException":
        case "com.amazonaws.kinesis#KMSDisabledException":
            response = {
                ...(await deserializeAws_json1_1KMSDisabledExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSInvalidStateException":
        case "com.amazonaws.kinesis#KMSInvalidStateException":
            response = {
                ...(await deserializeAws_json1_1KMSInvalidStateExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSNotFoundException":
        case "com.amazonaws.kinesis#KMSNotFoundException":
            response = {
                ...(await deserializeAws_json1_1KMSNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSOptInRequired":
        case "com.amazonaws.kinesis#KMSOptInRequired":
            response = {
                ...(await deserializeAws_json1_1KMSOptInRequiredResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KMSThrottlingException":
        case "com.amazonaws.kinesis#KMSThrottlingException":
            response = {
                ...(await deserializeAws_json1_1KMSThrottlingExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.kinesis#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1StopStreamEncryptionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StopStreamEncryptionCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StopStreamEncryptionCommand = deserializeAws_json1_1StopStreamEncryptionCommand;
const deserializeAws_json1_1StopStreamEncryptionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.kinesis#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1SubscribeToShardCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1SubscribeToShardCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1SubscribeToShardOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1SubscribeToShardCommand = deserializeAws_json1_1SubscribeToShardCommand;
const deserializeAws_json1_1SubscribeToShardCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.kinesis#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1UpdateShardCountCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1UpdateShardCountCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1UpdateShardCountOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1UpdateShardCountCommand = deserializeAws_json1_1UpdateShardCountCommand;
const deserializeAws_json1_1UpdateShardCountCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.kinesis#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.kinesis#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.kinesis#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.kinesis#ResourceNotFoundException":
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
const deserializeAws_json1_1ExpiredIteratorExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ExpiredIteratorException(body, context);
    const contents = {
        name: "ExpiredIteratorException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1ExpiredNextTokenExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ExpiredNextTokenException(body, context);
    const contents = {
        name: "ExpiredNextTokenException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1InvalidArgumentExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1InvalidArgumentException(body, context);
    const contents = {
        name: "InvalidArgumentException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1KMSAccessDeniedExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1KMSAccessDeniedException(body, context);
    const contents = {
        name: "KMSAccessDeniedException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1KMSDisabledExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1KMSDisabledException(body, context);
    const contents = {
        name: "KMSDisabledException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1KMSInvalidStateExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1KMSInvalidStateException(body, context);
    const contents = {
        name: "KMSInvalidStateException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1KMSNotFoundExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1KMSNotFoundException(body, context);
    const contents = {
        name: "KMSNotFoundException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1KMSOptInRequiredResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1KMSOptInRequired(body, context);
    const contents = {
        name: "KMSOptInRequired",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1KMSThrottlingExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1KMSThrottlingException(body, context);
    const contents = {
        name: "KMSThrottlingException",
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
const deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ProvisionedThroughputExceededException(body, context);
    const contents = {
        name: "ProvisionedThroughputExceededException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1ResourceInUseExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ResourceInUseException(body, context);
    const contents = {
        name: "ResourceInUseException",
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
const serializeAws_json1_1AddTagsToStreamInput = (input, context) => {
    return {
        ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
        ...(input.Tags !== undefined && input.Tags !== null && { Tags: serializeAws_json1_1TagMap(input.Tags, context) }),
    };
};
const serializeAws_json1_1CreateStreamInput = (input, context) => {
    return {
        ...(input.ShardCount !== undefined && input.ShardCount !== null && { ShardCount: input.ShardCount }),
        ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
    };
};
const serializeAws_json1_1DecreaseStreamRetentionPeriodInput = (input, context) => {
    return {
        ...(input.RetentionPeriodHours !== undefined &&
            input.RetentionPeriodHours !== null && { RetentionPeriodHours: input.RetentionPeriodHours }),
        ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
    };
};
const serializeAws_json1_1DeleteStreamInput = (input, context) => {
    return {
        ...(input.EnforceConsumerDeletion !== undefined &&
            input.EnforceConsumerDeletion !== null && { EnforceConsumerDeletion: input.EnforceConsumerDeletion }),
        ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
    };
};
const serializeAws_json1_1DeregisterStreamConsumerInput = (input, context) => {
    return {
        ...(input.ConsumerARN !== undefined && input.ConsumerARN !== null && { ConsumerARN: input.ConsumerARN }),
        ...(input.ConsumerName !== undefined && input.ConsumerName !== null && { ConsumerName: input.ConsumerName }),
        ...(input.StreamARN !== undefined && input.StreamARN !== null && { StreamARN: input.StreamARN }),
    };
};
const serializeAws_json1_1DescribeLimitsInput = (input, context) => {
    return {};
};
const serializeAws_json1_1DescribeStreamConsumerInput = (input, context) => {
    return {
        ...(input.ConsumerARN !== undefined && input.ConsumerARN !== null && { ConsumerARN: input.ConsumerARN }),
        ...(input.ConsumerName !== undefined && input.ConsumerName !== null && { ConsumerName: input.ConsumerName }),
        ...(input.StreamARN !== undefined && input.StreamARN !== null && { StreamARN: input.StreamARN }),
    };
};
const serializeAws_json1_1DescribeStreamInput = (input, context) => {
    return {
        ...(input.ExclusiveStartShardId !== undefined &&
            input.ExclusiveStartShardId !== null && { ExclusiveStartShardId: input.ExclusiveStartShardId }),
        ...(input.Limit !== undefined && input.Limit !== null && { Limit: input.Limit }),
        ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
    };
};
const serializeAws_json1_1DescribeStreamSummaryInput = (input, context) => {
    return {
        ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
    };
};
const serializeAws_json1_1DisableEnhancedMonitoringInput = (input, context) => {
    return {
        ...(input.ShardLevelMetrics !== undefined &&
            input.ShardLevelMetrics !== null && {
            ShardLevelMetrics: serializeAws_json1_1MetricsNameList(input.ShardLevelMetrics, context),
        }),
        ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
    };
};
const serializeAws_json1_1EnableEnhancedMonitoringInput = (input, context) => {
    return {
        ...(input.ShardLevelMetrics !== undefined &&
            input.ShardLevelMetrics !== null && {
            ShardLevelMetrics: serializeAws_json1_1MetricsNameList(input.ShardLevelMetrics, context),
        }),
        ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
    };
};
const serializeAws_json1_1GetRecordsInput = (input, context) => {
    return {
        ...(input.Limit !== undefined && input.Limit !== null && { Limit: input.Limit }),
        ...(input.ShardIterator !== undefined && input.ShardIterator !== null && { ShardIterator: input.ShardIterator }),
    };
};
const serializeAws_json1_1GetShardIteratorInput = (input, context) => {
    return {
        ...(input.ShardId !== undefined && input.ShardId !== null && { ShardId: input.ShardId }),
        ...(input.ShardIteratorType !== undefined &&
            input.ShardIteratorType !== null && { ShardIteratorType: input.ShardIteratorType }),
        ...(input.StartingSequenceNumber !== undefined &&
            input.StartingSequenceNumber !== null && { StartingSequenceNumber: input.StartingSequenceNumber }),
        ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
        ...(input.Timestamp !== undefined &&
            input.Timestamp !== null && { Timestamp: Math.round(input.Timestamp.getTime() / 1000) }),
    };
};
const serializeAws_json1_1IncreaseStreamRetentionPeriodInput = (input, context) => {
    return {
        ...(input.RetentionPeriodHours !== undefined &&
            input.RetentionPeriodHours !== null && { RetentionPeriodHours: input.RetentionPeriodHours }),
        ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
    };
};
const serializeAws_json1_1ListShardsInput = (input, context) => {
    return {
        ...(input.ExclusiveStartShardId !== undefined &&
            input.ExclusiveStartShardId !== null && { ExclusiveStartShardId: input.ExclusiveStartShardId }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
        ...(input.ShardFilter !== undefined &&
            input.ShardFilter !== null && { ShardFilter: serializeAws_json1_1ShardFilter(input.ShardFilter, context) }),
        ...(input.StreamCreationTimestamp !== undefined &&
            input.StreamCreationTimestamp !== null && {
            StreamCreationTimestamp: Math.round(input.StreamCreationTimestamp.getTime() / 1000),
        }),
        ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
    };
};
const serializeAws_json1_1ListStreamConsumersInput = (input, context) => {
    return {
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
        ...(input.StreamARN !== undefined && input.StreamARN !== null && { StreamARN: input.StreamARN }),
        ...(input.StreamCreationTimestamp !== undefined &&
            input.StreamCreationTimestamp !== null && {
            StreamCreationTimestamp: Math.round(input.StreamCreationTimestamp.getTime() / 1000),
        }),
    };
};
const serializeAws_json1_1ListStreamsInput = (input, context) => {
    return {
        ...(input.ExclusiveStartStreamName !== undefined &&
            input.ExclusiveStartStreamName !== null && { ExclusiveStartStreamName: input.ExclusiveStartStreamName }),
        ...(input.Limit !== undefined && input.Limit !== null && { Limit: input.Limit }),
    };
};
const serializeAws_json1_1ListTagsForStreamInput = (input, context) => {
    return {
        ...(input.ExclusiveStartTagKey !== undefined &&
            input.ExclusiveStartTagKey !== null && { ExclusiveStartTagKey: input.ExclusiveStartTagKey }),
        ...(input.Limit !== undefined && input.Limit !== null && { Limit: input.Limit }),
        ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
    };
};
const serializeAws_json1_1MergeShardsInput = (input, context) => {
    return {
        ...(input.AdjacentShardToMerge !== undefined &&
            input.AdjacentShardToMerge !== null && { AdjacentShardToMerge: input.AdjacentShardToMerge }),
        ...(input.ShardToMerge !== undefined && input.ShardToMerge !== null && { ShardToMerge: input.ShardToMerge }),
        ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
    };
};
const serializeAws_json1_1MetricsNameList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1PutRecordInput = (input, context) => {
    return {
        ...(input.Data !== undefined && input.Data !== null && { Data: context.base64Encoder(input.Data) }),
        ...(input.ExplicitHashKey !== undefined &&
            input.ExplicitHashKey !== null && { ExplicitHashKey: input.ExplicitHashKey }),
        ...(input.PartitionKey !== undefined && input.PartitionKey !== null && { PartitionKey: input.PartitionKey }),
        ...(input.SequenceNumberForOrdering !== undefined &&
            input.SequenceNumberForOrdering !== null && { SequenceNumberForOrdering: input.SequenceNumberForOrdering }),
        ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
    };
};
const serializeAws_json1_1PutRecordsInput = (input, context) => {
    return {
        ...(input.Records !== undefined &&
            input.Records !== null && { Records: serializeAws_json1_1PutRecordsRequestEntryList(input.Records, context) }),
        ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
    };
};
const serializeAws_json1_1PutRecordsRequestEntry = (input, context) => {
    return {
        ...(input.Data !== undefined && input.Data !== null && { Data: context.base64Encoder(input.Data) }),
        ...(input.ExplicitHashKey !== undefined &&
            input.ExplicitHashKey !== null && { ExplicitHashKey: input.ExplicitHashKey }),
        ...(input.PartitionKey !== undefined && input.PartitionKey !== null && { PartitionKey: input.PartitionKey }),
    };
};
const serializeAws_json1_1PutRecordsRequestEntryList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1PutRecordsRequestEntry(entry, context);
    });
};
const serializeAws_json1_1RegisterStreamConsumerInput = (input, context) => {
    return {
        ...(input.ConsumerName !== undefined && input.ConsumerName !== null && { ConsumerName: input.ConsumerName }),
        ...(input.StreamARN !== undefined && input.StreamARN !== null && { StreamARN: input.StreamARN }),
    };
};
const serializeAws_json1_1RemoveTagsFromStreamInput = (input, context) => {
    return {
        ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
        ...(input.TagKeys !== undefined &&
            input.TagKeys !== null && { TagKeys: serializeAws_json1_1TagKeyList(input.TagKeys, context) }),
    };
};
const serializeAws_json1_1ShardFilter = (input, context) => {
    return {
        ...(input.ShardId !== undefined && input.ShardId !== null && { ShardId: input.ShardId }),
        ...(input.Timestamp !== undefined &&
            input.Timestamp !== null && { Timestamp: Math.round(input.Timestamp.getTime() / 1000) }),
        ...(input.Type !== undefined && input.Type !== null && { Type: input.Type }),
    };
};
const serializeAws_json1_1SplitShardInput = (input, context) => {
    return {
        ...(input.NewStartingHashKey !== undefined &&
            input.NewStartingHashKey !== null && { NewStartingHashKey: input.NewStartingHashKey }),
        ...(input.ShardToSplit !== undefined && input.ShardToSplit !== null && { ShardToSplit: input.ShardToSplit }),
        ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
    };
};
const serializeAws_json1_1StartingPosition = (input, context) => {
    return {
        ...(input.SequenceNumber !== undefined &&
            input.SequenceNumber !== null && { SequenceNumber: input.SequenceNumber }),
        ...(input.Timestamp !== undefined &&
            input.Timestamp !== null && { Timestamp: Math.round(input.Timestamp.getTime() / 1000) }),
        ...(input.Type !== undefined && input.Type !== null && { Type: input.Type }),
    };
};
const serializeAws_json1_1StartStreamEncryptionInput = (input, context) => {
    return {
        ...(input.EncryptionType !== undefined &&
            input.EncryptionType !== null && { EncryptionType: input.EncryptionType }),
        ...(input.KeyId !== undefined && input.KeyId !== null && { KeyId: input.KeyId }),
        ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
    };
};
const serializeAws_json1_1StopStreamEncryptionInput = (input, context) => {
    return {
        ...(input.EncryptionType !== undefined &&
            input.EncryptionType !== null && { EncryptionType: input.EncryptionType }),
        ...(input.KeyId !== undefined && input.KeyId !== null && { KeyId: input.KeyId }),
        ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
    };
};
const serializeAws_json1_1SubscribeToShardInput = (input, context) => {
    return {
        ...(input.ConsumerARN !== undefined && input.ConsumerARN !== null && { ConsumerARN: input.ConsumerARN }),
        ...(input.ShardId !== undefined && input.ShardId !== null && { ShardId: input.ShardId }),
        ...(input.StartingPosition !== undefined &&
            input.StartingPosition !== null && {
            StartingPosition: serializeAws_json1_1StartingPosition(input.StartingPosition, context),
        }),
    };
};
const serializeAws_json1_1TagKeyList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1TagMap = (input, context) => {
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
const serializeAws_json1_1UpdateShardCountInput = (input, context) => {
    return {
        ...(input.ScalingType !== undefined && input.ScalingType !== null && { ScalingType: input.ScalingType }),
        ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
        ...(input.TargetShardCount !== undefined &&
            input.TargetShardCount !== null && { TargetShardCount: input.TargetShardCount }),
    };
};
const deserializeAws_json1_1ChildShard = (output, context) => {
    return {
        HashKeyRange: output.HashKeyRange !== undefined && output.HashKeyRange !== null
            ? deserializeAws_json1_1HashKeyRange(output.HashKeyRange, context)
            : undefined,
        ParentShards: output.ParentShards !== undefined && output.ParentShards !== null
            ? deserializeAws_json1_1ShardIdList(output.ParentShards, context)
            : undefined,
        ShardId: output.ShardId !== undefined && output.ShardId !== null ? output.ShardId : undefined,
    };
};
const deserializeAws_json1_1ChildShardList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ChildShard(entry, context);
    });
};
const deserializeAws_json1_1Consumer = (output, context) => {
    return {
        ConsumerARN: output.ConsumerARN !== undefined && output.ConsumerARN !== null ? output.ConsumerARN : undefined,
        ConsumerCreationTimestamp: output.ConsumerCreationTimestamp !== undefined && output.ConsumerCreationTimestamp !== null
            ? new Date(Math.round(output.ConsumerCreationTimestamp * 1000))
            : undefined,
        ConsumerName: output.ConsumerName !== undefined && output.ConsumerName !== null ? output.ConsumerName : undefined,
        ConsumerStatus: output.ConsumerStatus !== undefined && output.ConsumerStatus !== null ? output.ConsumerStatus : undefined,
    };
};
const deserializeAws_json1_1ConsumerDescription = (output, context) => {
    return {
        ConsumerARN: output.ConsumerARN !== undefined && output.ConsumerARN !== null ? output.ConsumerARN : undefined,
        ConsumerCreationTimestamp: output.ConsumerCreationTimestamp !== undefined && output.ConsumerCreationTimestamp !== null
            ? new Date(Math.round(output.ConsumerCreationTimestamp * 1000))
            : undefined,
        ConsumerName: output.ConsumerName !== undefined && output.ConsumerName !== null ? output.ConsumerName : undefined,
        ConsumerStatus: output.ConsumerStatus !== undefined && output.ConsumerStatus !== null ? output.ConsumerStatus : undefined,
        StreamARN: output.StreamARN !== undefined && output.StreamARN !== null ? output.StreamARN : undefined,
    };
};
const deserializeAws_json1_1ConsumerList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Consumer(entry, context);
    });
};
const deserializeAws_json1_1DescribeLimitsOutput = (output, context) => {
    return {
        OpenShardCount: output.OpenShardCount !== undefined && output.OpenShardCount !== null ? output.OpenShardCount : undefined,
        ShardLimit: output.ShardLimit !== undefined && output.ShardLimit !== null ? output.ShardLimit : undefined,
    };
};
const deserializeAws_json1_1DescribeStreamConsumerOutput = (output, context) => {
    return {
        ConsumerDescription: output.ConsumerDescription !== undefined && output.ConsumerDescription !== null
            ? deserializeAws_json1_1ConsumerDescription(output.ConsumerDescription, context)
            : undefined,
    };
};
const deserializeAws_json1_1DescribeStreamOutput = (output, context) => {
    return {
        StreamDescription: output.StreamDescription !== undefined && output.StreamDescription !== null
            ? deserializeAws_json1_1StreamDescription(output.StreamDescription, context)
            : undefined,
    };
};
const deserializeAws_json1_1DescribeStreamSummaryOutput = (output, context) => {
    return {
        StreamDescriptionSummary: output.StreamDescriptionSummary !== undefined && output.StreamDescriptionSummary !== null
            ? deserializeAws_json1_1StreamDescriptionSummary(output.StreamDescriptionSummary, context)
            : undefined,
    };
};
const deserializeAws_json1_1EnhancedMetrics = (output, context) => {
    return {
        ShardLevelMetrics: output.ShardLevelMetrics !== undefined && output.ShardLevelMetrics !== null
            ? deserializeAws_json1_1MetricsNameList(output.ShardLevelMetrics, context)
            : undefined,
    };
};
const deserializeAws_json1_1EnhancedMonitoringList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1EnhancedMetrics(entry, context);
    });
};
const deserializeAws_json1_1EnhancedMonitoringOutput = (output, context) => {
    return {
        CurrentShardLevelMetrics: output.CurrentShardLevelMetrics !== undefined && output.CurrentShardLevelMetrics !== null
            ? deserializeAws_json1_1MetricsNameList(output.CurrentShardLevelMetrics, context)
            : undefined,
        DesiredShardLevelMetrics: output.DesiredShardLevelMetrics !== undefined && output.DesiredShardLevelMetrics !== null
            ? deserializeAws_json1_1MetricsNameList(output.DesiredShardLevelMetrics, context)
            : undefined,
        StreamName: output.StreamName !== undefined && output.StreamName !== null ? output.StreamName : undefined,
    };
};
const deserializeAws_json1_1ExpiredIteratorException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1ExpiredNextTokenException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1GetRecordsOutput = (output, context) => {
    return {
        ChildShards: output.ChildShards !== undefined && output.ChildShards !== null
            ? deserializeAws_json1_1ChildShardList(output.ChildShards, context)
            : undefined,
        MillisBehindLatest: output.MillisBehindLatest !== undefined && output.MillisBehindLatest !== null
            ? output.MillisBehindLatest
            : undefined,
        NextShardIterator: output.NextShardIterator !== undefined && output.NextShardIterator !== null
            ? output.NextShardIterator
            : undefined,
        Records: output.Records !== undefined && output.Records !== null
            ? deserializeAws_json1_1RecordList(output.Records, context)
            : undefined,
    };
};
const deserializeAws_json1_1GetShardIteratorOutput = (output, context) => {
    return {
        ShardIterator: output.ShardIterator !== undefined && output.ShardIterator !== null ? output.ShardIterator : undefined,
    };
};
const deserializeAws_json1_1HashKeyRange = (output, context) => {
    return {
        EndingHashKey: output.EndingHashKey !== undefined && output.EndingHashKey !== null ? output.EndingHashKey : undefined,
        StartingHashKey: output.StartingHashKey !== undefined && output.StartingHashKey !== null ? output.StartingHashKey : undefined,
    };
};
const deserializeAws_json1_1InternalFailureException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1InvalidArgumentException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1KMSAccessDeniedException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1KMSDisabledException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1KMSInvalidStateException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1KMSNotFoundException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1KMSOptInRequired = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1KMSThrottlingException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1LimitExceededException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1ListShardsOutput = (output, context) => {
    return {
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        Shards: output.Shards !== undefined && output.Shards !== null
            ? deserializeAws_json1_1ShardList(output.Shards, context)
            : undefined,
    };
};
const deserializeAws_json1_1ListStreamConsumersOutput = (output, context) => {
    return {
        Consumers: output.Consumers !== undefined && output.Consumers !== null
            ? deserializeAws_json1_1ConsumerList(output.Consumers, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    };
};
const deserializeAws_json1_1ListStreamsOutput = (output, context) => {
    return {
        HasMoreStreams: output.HasMoreStreams !== undefined && output.HasMoreStreams !== null ? output.HasMoreStreams : undefined,
        StreamNames: output.StreamNames !== undefined && output.StreamNames !== null
            ? deserializeAws_json1_1StreamNameList(output.StreamNames, context)
            : undefined,
    };
};
const deserializeAws_json1_1ListTagsForStreamOutput = (output, context) => {
    return {
        HasMoreTags: output.HasMoreTags !== undefined && output.HasMoreTags !== null ? output.HasMoreTags : undefined,
        Tags: output.Tags !== undefined && output.Tags !== null
            ? deserializeAws_json1_1TagList(output.Tags, context)
            : undefined,
    };
};
const deserializeAws_json1_1MetricsNameList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1ProvisionedThroughputExceededException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1PutRecordOutput = (output, context) => {
    return {
        EncryptionType: output.EncryptionType !== undefined && output.EncryptionType !== null ? output.EncryptionType : undefined,
        SequenceNumber: output.SequenceNumber !== undefined && output.SequenceNumber !== null ? output.SequenceNumber : undefined,
        ShardId: output.ShardId !== undefined && output.ShardId !== null ? output.ShardId : undefined,
    };
};
const deserializeAws_json1_1PutRecordsOutput = (output, context) => {
    return {
        EncryptionType: output.EncryptionType !== undefined && output.EncryptionType !== null ? output.EncryptionType : undefined,
        FailedRecordCount: output.FailedRecordCount !== undefined && output.FailedRecordCount !== null
            ? output.FailedRecordCount
            : undefined,
        Records: output.Records !== undefined && output.Records !== null
            ? deserializeAws_json1_1PutRecordsResultEntryList(output.Records, context)
            : undefined,
    };
};
const deserializeAws_json1_1PutRecordsResultEntry = (output, context) => {
    return {
        ErrorCode: output.ErrorCode !== undefined && output.ErrorCode !== null ? output.ErrorCode : undefined,
        ErrorMessage: output.ErrorMessage !== undefined && output.ErrorMessage !== null ? output.ErrorMessage : undefined,
        SequenceNumber: output.SequenceNumber !== undefined && output.SequenceNumber !== null ? output.SequenceNumber : undefined,
        ShardId: output.ShardId !== undefined && output.ShardId !== null ? output.ShardId : undefined,
    };
};
const deserializeAws_json1_1PutRecordsResultEntryList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1PutRecordsResultEntry(entry, context);
    });
};
const deserializeAws_json1_1_Record = (output, context) => {
    return {
        ApproximateArrivalTimestamp: output.ApproximateArrivalTimestamp !== undefined && output.ApproximateArrivalTimestamp !== null
            ? new Date(Math.round(output.ApproximateArrivalTimestamp * 1000))
            : undefined,
        Data: output.Data !== undefined && output.Data !== null ? context.base64Decoder(output.Data) : undefined,
        EncryptionType: output.EncryptionType !== undefined && output.EncryptionType !== null ? output.EncryptionType : undefined,
        PartitionKey: output.PartitionKey !== undefined && output.PartitionKey !== null ? output.PartitionKey : undefined,
        SequenceNumber: output.SequenceNumber !== undefined && output.SequenceNumber !== null ? output.SequenceNumber : undefined,
    };
};
const deserializeAws_json1_1RecordList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1_Record(entry, context);
    });
};
const deserializeAws_json1_1RegisterStreamConsumerOutput = (output, context) => {
    return {
        Consumer: output.Consumer !== undefined && output.Consumer !== null
            ? deserializeAws_json1_1Consumer(output.Consumer, context)
            : undefined,
    };
};
const deserializeAws_json1_1ResourceInUseException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1ResourceNotFoundException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1SequenceNumberRange = (output, context) => {
    return {
        EndingSequenceNumber: output.EndingSequenceNumber !== undefined && output.EndingSequenceNumber !== null
            ? output.EndingSequenceNumber
            : undefined,
        StartingSequenceNumber: output.StartingSequenceNumber !== undefined && output.StartingSequenceNumber !== null
            ? output.StartingSequenceNumber
            : undefined,
    };
};
const deserializeAws_json1_1Shard = (output, context) => {
    return {
        AdjacentParentShardId: output.AdjacentParentShardId !== undefined && output.AdjacentParentShardId !== null
            ? output.AdjacentParentShardId
            : undefined,
        HashKeyRange: output.HashKeyRange !== undefined && output.HashKeyRange !== null
            ? deserializeAws_json1_1HashKeyRange(output.HashKeyRange, context)
            : undefined,
        ParentShardId: output.ParentShardId !== undefined && output.ParentShardId !== null ? output.ParentShardId : undefined,
        SequenceNumberRange: output.SequenceNumberRange !== undefined && output.SequenceNumberRange !== null
            ? deserializeAws_json1_1SequenceNumberRange(output.SequenceNumberRange, context)
            : undefined,
        ShardId: output.ShardId !== undefined && output.ShardId !== null ? output.ShardId : undefined,
    };
};
const deserializeAws_json1_1ShardIdList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1ShardList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Shard(entry, context);
    });
};
const deserializeAws_json1_1StreamDescription = (output, context) => {
    return {
        EncryptionType: output.EncryptionType !== undefined && output.EncryptionType !== null ? output.EncryptionType : undefined,
        EnhancedMonitoring: output.EnhancedMonitoring !== undefined && output.EnhancedMonitoring !== null
            ? deserializeAws_json1_1EnhancedMonitoringList(output.EnhancedMonitoring, context)
            : undefined,
        HasMoreShards: output.HasMoreShards !== undefined && output.HasMoreShards !== null ? output.HasMoreShards : undefined,
        KeyId: output.KeyId !== undefined && output.KeyId !== null ? output.KeyId : undefined,
        RetentionPeriodHours: output.RetentionPeriodHours !== undefined && output.RetentionPeriodHours !== null
            ? output.RetentionPeriodHours
            : undefined,
        Shards: output.Shards !== undefined && output.Shards !== null
            ? deserializeAws_json1_1ShardList(output.Shards, context)
            : undefined,
        StreamARN: output.StreamARN !== undefined && output.StreamARN !== null ? output.StreamARN : undefined,
        StreamCreationTimestamp: output.StreamCreationTimestamp !== undefined && output.StreamCreationTimestamp !== null
            ? new Date(Math.round(output.StreamCreationTimestamp * 1000))
            : undefined,
        StreamName: output.StreamName !== undefined && output.StreamName !== null ? output.StreamName : undefined,
        StreamStatus: output.StreamStatus !== undefined && output.StreamStatus !== null ? output.StreamStatus : undefined,
    };
};
const deserializeAws_json1_1StreamDescriptionSummary = (output, context) => {
    return {
        ConsumerCount: output.ConsumerCount !== undefined && output.ConsumerCount !== null ? output.ConsumerCount : undefined,
        EncryptionType: output.EncryptionType !== undefined && output.EncryptionType !== null ? output.EncryptionType : undefined,
        EnhancedMonitoring: output.EnhancedMonitoring !== undefined && output.EnhancedMonitoring !== null
            ? deserializeAws_json1_1EnhancedMonitoringList(output.EnhancedMonitoring, context)
            : undefined,
        KeyId: output.KeyId !== undefined && output.KeyId !== null ? output.KeyId : undefined,
        OpenShardCount: output.OpenShardCount !== undefined && output.OpenShardCount !== null ? output.OpenShardCount : undefined,
        RetentionPeriodHours: output.RetentionPeriodHours !== undefined && output.RetentionPeriodHours !== null
            ? output.RetentionPeriodHours
            : undefined,
        StreamARN: output.StreamARN !== undefined && output.StreamARN !== null ? output.StreamARN : undefined,
        StreamCreationTimestamp: output.StreamCreationTimestamp !== undefined && output.StreamCreationTimestamp !== null
            ? new Date(Math.round(output.StreamCreationTimestamp * 1000))
            : undefined,
        StreamName: output.StreamName !== undefined && output.StreamName !== null ? output.StreamName : undefined,
        StreamStatus: output.StreamStatus !== undefined && output.StreamStatus !== null ? output.StreamStatus : undefined,
    };
};
const deserializeAws_json1_1StreamNameList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1SubscribeToShardEvent = (output, context) => {
    return {
        ChildShards: output.ChildShards !== undefined && output.ChildShards !== null
            ? deserializeAws_json1_1ChildShardList(output.ChildShards, context)
            : undefined,
        ContinuationSequenceNumber: output.ContinuationSequenceNumber !== undefined && output.ContinuationSequenceNumber !== null
            ? output.ContinuationSequenceNumber
            : undefined,
        MillisBehindLatest: output.MillisBehindLatest !== undefined && output.MillisBehindLatest !== null
            ? output.MillisBehindLatest
            : undefined,
        Records: output.Records !== undefined && output.Records !== null
            ? deserializeAws_json1_1RecordList(output.Records, context)
            : undefined,
    };
};
const deserializeAws_json1_1SubscribeToShardEventStream = (output, context) => {
    if (output.InternalFailureException !== undefined && output.InternalFailureException !== null) {
        return {
            InternalFailureException: deserializeAws_json1_1InternalFailureException(output.InternalFailureException, context),
        };
    }
    if (output.KMSAccessDeniedException !== undefined && output.KMSAccessDeniedException !== null) {
        return {
            KMSAccessDeniedException: deserializeAws_json1_1KMSAccessDeniedException(output.KMSAccessDeniedException, context),
        };
    }
    if (output.KMSDisabledException !== undefined && output.KMSDisabledException !== null) {
        return {
            KMSDisabledException: deserializeAws_json1_1KMSDisabledException(output.KMSDisabledException, context),
        };
    }
    if (output.KMSInvalidStateException !== undefined && output.KMSInvalidStateException !== null) {
        return {
            KMSInvalidStateException: deserializeAws_json1_1KMSInvalidStateException(output.KMSInvalidStateException, context),
        };
    }
    if (output.KMSNotFoundException !== undefined && output.KMSNotFoundException !== null) {
        return {
            KMSNotFoundException: deserializeAws_json1_1KMSNotFoundException(output.KMSNotFoundException, context),
        };
    }
    if (output.KMSOptInRequired !== undefined && output.KMSOptInRequired !== null) {
        return {
            KMSOptInRequired: deserializeAws_json1_1KMSOptInRequired(output.KMSOptInRequired, context),
        };
    }
    if (output.KMSThrottlingException !== undefined && output.KMSThrottlingException !== null) {
        return {
            KMSThrottlingException: deserializeAws_json1_1KMSThrottlingException(output.KMSThrottlingException, context),
        };
    }
    if (output.ResourceInUseException !== undefined && output.ResourceInUseException !== null) {
        return {
            ResourceInUseException: deserializeAws_json1_1ResourceInUseException(output.ResourceInUseException, context),
        };
    }
    if (output.ResourceNotFoundException !== undefined && output.ResourceNotFoundException !== null) {
        return {
            ResourceNotFoundException: deserializeAws_json1_1ResourceNotFoundException(output.ResourceNotFoundException, context),
        };
    }
    if (output.SubscribeToShardEvent !== undefined && output.SubscribeToShardEvent !== null) {
        return {
            SubscribeToShardEvent: deserializeAws_json1_1SubscribeToShardEvent(output.SubscribeToShardEvent, context),
        };
    }
    return { $unknown: Object.entries(output)[0] };
};
const deserializeAws_json1_1SubscribeToShardOutput = (output, context) => {
    return {
        EventStream: output.EventStream !== undefined && output.EventStream !== null
            ? deserializeAws_json1_1SubscribeToShardEventStream(output.EventStream, context)
            : undefined,
    };
};
const deserializeAws_json1_1Tag = (output, context) => {
    return {
        Key: output.Key !== undefined && output.Key !== null ? output.Key : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
const deserializeAws_json1_1TagList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Tag(entry, context);
    });
};
const deserializeAws_json1_1UpdateShardCountOutput = (output, context) => {
    return {
        CurrentShardCount: output.CurrentShardCount !== undefined && output.CurrentShardCount !== null
            ? output.CurrentShardCount
            : undefined,
        StreamName: output.StreamName !== undefined && output.StreamName !== null ? output.StreamName : undefined,
        TargetShardCount: output.TargetShardCount !== undefined && output.TargetShardCount !== null ? output.TargetShardCount : undefined,
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
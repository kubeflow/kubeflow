"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeAws_json1_1UpdateDestinationCommand = exports.deserializeAws_json1_1UntagDeliveryStreamCommand = exports.deserializeAws_json1_1TagDeliveryStreamCommand = exports.deserializeAws_json1_1StopDeliveryStreamEncryptionCommand = exports.deserializeAws_json1_1StartDeliveryStreamEncryptionCommand = exports.deserializeAws_json1_1PutRecordBatchCommand = exports.deserializeAws_json1_1PutRecordCommand = exports.deserializeAws_json1_1ListTagsForDeliveryStreamCommand = exports.deserializeAws_json1_1ListDeliveryStreamsCommand = exports.deserializeAws_json1_1DescribeDeliveryStreamCommand = exports.deserializeAws_json1_1DeleteDeliveryStreamCommand = exports.deserializeAws_json1_1CreateDeliveryStreamCommand = exports.serializeAws_json1_1UpdateDestinationCommand = exports.serializeAws_json1_1UntagDeliveryStreamCommand = exports.serializeAws_json1_1TagDeliveryStreamCommand = exports.serializeAws_json1_1StopDeliveryStreamEncryptionCommand = exports.serializeAws_json1_1StartDeliveryStreamEncryptionCommand = exports.serializeAws_json1_1PutRecordBatchCommand = exports.serializeAws_json1_1PutRecordCommand = exports.serializeAws_json1_1ListTagsForDeliveryStreamCommand = exports.serializeAws_json1_1ListDeliveryStreamsCommand = exports.serializeAws_json1_1DescribeDeliveryStreamCommand = exports.serializeAws_json1_1DeleteDeliveryStreamCommand = exports.serializeAws_json1_1CreateDeliveryStreamCommand = void 0;
const protocol_http_1 = require("@aws-sdk/protocol-http");
const serializeAws_json1_1CreateDeliveryStreamCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Firehose_20150804.CreateDeliveryStream",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1CreateDeliveryStreamInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1CreateDeliveryStreamCommand = serializeAws_json1_1CreateDeliveryStreamCommand;
const serializeAws_json1_1DeleteDeliveryStreamCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Firehose_20150804.DeleteDeliveryStream",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteDeliveryStreamInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteDeliveryStreamCommand = serializeAws_json1_1DeleteDeliveryStreamCommand;
const serializeAws_json1_1DescribeDeliveryStreamCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Firehose_20150804.DescribeDeliveryStream",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeDeliveryStreamInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeDeliveryStreamCommand = serializeAws_json1_1DescribeDeliveryStreamCommand;
const serializeAws_json1_1ListDeliveryStreamsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Firehose_20150804.ListDeliveryStreams",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListDeliveryStreamsInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListDeliveryStreamsCommand = serializeAws_json1_1ListDeliveryStreamsCommand;
const serializeAws_json1_1ListTagsForDeliveryStreamCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Firehose_20150804.ListTagsForDeliveryStream",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListTagsForDeliveryStreamInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListTagsForDeliveryStreamCommand = serializeAws_json1_1ListTagsForDeliveryStreamCommand;
const serializeAws_json1_1PutRecordCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Firehose_20150804.PutRecord",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1PutRecordInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1PutRecordCommand = serializeAws_json1_1PutRecordCommand;
const serializeAws_json1_1PutRecordBatchCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Firehose_20150804.PutRecordBatch",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1PutRecordBatchInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1PutRecordBatchCommand = serializeAws_json1_1PutRecordBatchCommand;
const serializeAws_json1_1StartDeliveryStreamEncryptionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Firehose_20150804.StartDeliveryStreamEncryption",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartDeliveryStreamEncryptionInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartDeliveryStreamEncryptionCommand = serializeAws_json1_1StartDeliveryStreamEncryptionCommand;
const serializeAws_json1_1StopDeliveryStreamEncryptionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Firehose_20150804.StopDeliveryStreamEncryption",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StopDeliveryStreamEncryptionInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StopDeliveryStreamEncryptionCommand = serializeAws_json1_1StopDeliveryStreamEncryptionCommand;
const serializeAws_json1_1TagDeliveryStreamCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Firehose_20150804.TagDeliveryStream",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1TagDeliveryStreamInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1TagDeliveryStreamCommand = serializeAws_json1_1TagDeliveryStreamCommand;
const serializeAws_json1_1UntagDeliveryStreamCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Firehose_20150804.UntagDeliveryStream",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1UntagDeliveryStreamInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1UntagDeliveryStreamCommand = serializeAws_json1_1UntagDeliveryStreamCommand;
const serializeAws_json1_1UpdateDestinationCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Firehose_20150804.UpdateDestination",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1UpdateDestinationInput(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1UpdateDestinationCommand = serializeAws_json1_1UpdateDestinationCommand;
const deserializeAws_json1_1CreateDeliveryStreamCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1CreateDeliveryStreamCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1CreateDeliveryStreamOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1CreateDeliveryStreamCommand = deserializeAws_json1_1CreateDeliveryStreamCommand;
const deserializeAws_json1_1CreateDeliveryStreamCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.firehose#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidKMSResourceException":
        case "com.amazonaws.firehose#InvalidKMSResourceException":
            response = {
                ...(await deserializeAws_json1_1InvalidKMSResourceExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.firehose#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.firehose#ResourceInUseException":
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
const deserializeAws_json1_1DeleteDeliveryStreamCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteDeliveryStreamCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DeleteDeliveryStreamOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteDeliveryStreamCommand = deserializeAws_json1_1DeleteDeliveryStreamCommand;
const deserializeAws_json1_1DeleteDeliveryStreamCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "ResourceInUseException":
        case "com.amazonaws.firehose#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.firehose#ResourceNotFoundException":
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
const deserializeAws_json1_1DescribeDeliveryStreamCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeDeliveryStreamCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeDeliveryStreamOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeDeliveryStreamCommand = deserializeAws_json1_1DescribeDeliveryStreamCommand;
const deserializeAws_json1_1DescribeDeliveryStreamCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "ResourceNotFoundException":
        case "com.amazonaws.firehose#ResourceNotFoundException":
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
const deserializeAws_json1_1ListDeliveryStreamsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListDeliveryStreamsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListDeliveryStreamsOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListDeliveryStreamsCommand = deserializeAws_json1_1ListDeliveryStreamsCommand;
const deserializeAws_json1_1ListDeliveryStreamsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
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
const deserializeAws_json1_1ListTagsForDeliveryStreamCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListTagsForDeliveryStreamCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListTagsForDeliveryStreamOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListTagsForDeliveryStreamCommand = deserializeAws_json1_1ListTagsForDeliveryStreamCommand;
const deserializeAws_json1_1ListTagsForDeliveryStreamCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.firehose#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.firehose#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.firehose#ResourceNotFoundException":
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
        case "com.amazonaws.firehose#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidKMSResourceException":
        case "com.amazonaws.firehose#InvalidKMSResourceException":
            response = {
                ...(await deserializeAws_json1_1InvalidKMSResourceExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.firehose#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.firehose#ServiceUnavailableException":
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
const deserializeAws_json1_1PutRecordBatchCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1PutRecordBatchCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1PutRecordBatchOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1PutRecordBatchCommand = deserializeAws_json1_1PutRecordBatchCommand;
const deserializeAws_json1_1PutRecordBatchCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.firehose#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidKMSResourceException":
        case "com.amazonaws.firehose#InvalidKMSResourceException":
            response = {
                ...(await deserializeAws_json1_1InvalidKMSResourceExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.firehose#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.firehose#ServiceUnavailableException":
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
const deserializeAws_json1_1StartDeliveryStreamEncryptionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartDeliveryStreamEncryptionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartDeliveryStreamEncryptionOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartDeliveryStreamEncryptionCommand = deserializeAws_json1_1StartDeliveryStreamEncryptionCommand;
const deserializeAws_json1_1StartDeliveryStreamEncryptionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.firehose#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidKMSResourceException":
        case "com.amazonaws.firehose#InvalidKMSResourceException":
            response = {
                ...(await deserializeAws_json1_1InvalidKMSResourceExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.firehose#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.firehose#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.firehose#ResourceNotFoundException":
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
const deserializeAws_json1_1StopDeliveryStreamEncryptionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StopDeliveryStreamEncryptionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StopDeliveryStreamEncryptionOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StopDeliveryStreamEncryptionCommand = deserializeAws_json1_1StopDeliveryStreamEncryptionCommand;
const deserializeAws_json1_1StopDeliveryStreamEncryptionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.firehose#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.firehose#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.firehose#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.firehose#ResourceNotFoundException":
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
const deserializeAws_json1_1TagDeliveryStreamCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1TagDeliveryStreamCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1TagDeliveryStreamOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1TagDeliveryStreamCommand = deserializeAws_json1_1TagDeliveryStreamCommand;
const deserializeAws_json1_1TagDeliveryStreamCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.firehose#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.firehose#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.firehose#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.firehose#ResourceNotFoundException":
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
const deserializeAws_json1_1UntagDeliveryStreamCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1UntagDeliveryStreamCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1UntagDeliveryStreamOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1UntagDeliveryStreamCommand = deserializeAws_json1_1UntagDeliveryStreamCommand;
const deserializeAws_json1_1UntagDeliveryStreamCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidArgumentException":
        case "com.amazonaws.firehose#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.firehose#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.firehose#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.firehose#ResourceNotFoundException":
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
const deserializeAws_json1_1UpdateDestinationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1UpdateDestinationCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1UpdateDestinationOutput(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1UpdateDestinationCommand = deserializeAws_json1_1UpdateDestinationCommand;
const deserializeAws_json1_1UpdateDestinationCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "ConcurrentModificationException":
        case "com.amazonaws.firehose#ConcurrentModificationException":
            response = {
                ...(await deserializeAws_json1_1ConcurrentModificationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidArgumentException":
        case "com.amazonaws.firehose#InvalidArgumentException":
            response = {
                ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.firehose#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.firehose#ResourceNotFoundException":
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
const deserializeAws_json1_1ConcurrentModificationExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ConcurrentModificationException(body, context);
    const contents = {
        name: "ConcurrentModificationException",
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
const deserializeAws_json1_1InvalidKMSResourceExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1InvalidKMSResourceException(body, context);
    const contents = {
        name: "InvalidKMSResourceException",
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
const serializeAws_json1_1BufferingHints = (input, context) => {
    return {
        ...(input.IntervalInSeconds !== undefined &&
            input.IntervalInSeconds !== null && { IntervalInSeconds: input.IntervalInSeconds }),
        ...(input.SizeInMBs !== undefined && input.SizeInMBs !== null && { SizeInMBs: input.SizeInMBs }),
    };
};
const serializeAws_json1_1CloudWatchLoggingOptions = (input, context) => {
    return {
        ...(input.Enabled !== undefined && input.Enabled !== null && { Enabled: input.Enabled }),
        ...(input.LogGroupName !== undefined && input.LogGroupName !== null && { LogGroupName: input.LogGroupName }),
        ...(input.LogStreamName !== undefined && input.LogStreamName !== null && { LogStreamName: input.LogStreamName }),
    };
};
const serializeAws_json1_1ColumnToJsonKeyMappings = (input, context) => {
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
const serializeAws_json1_1CopyCommand = (input, context) => {
    return {
        ...(input.CopyOptions !== undefined && input.CopyOptions !== null && { CopyOptions: input.CopyOptions }),
        ...(input.DataTableColumns !== undefined &&
            input.DataTableColumns !== null && { DataTableColumns: input.DataTableColumns }),
        ...(input.DataTableName !== undefined && input.DataTableName !== null && { DataTableName: input.DataTableName }),
    };
};
const serializeAws_json1_1CreateDeliveryStreamInput = (input, context) => {
    return {
        ...(input.DeliveryStreamEncryptionConfigurationInput !== undefined &&
            input.DeliveryStreamEncryptionConfigurationInput !== null && {
            DeliveryStreamEncryptionConfigurationInput: serializeAws_json1_1DeliveryStreamEncryptionConfigurationInput(input.DeliveryStreamEncryptionConfigurationInput, context),
        }),
        ...(input.DeliveryStreamName !== undefined &&
            input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName }),
        ...(input.DeliveryStreamType !== undefined &&
            input.DeliveryStreamType !== null && { DeliveryStreamType: input.DeliveryStreamType }),
        ...(input.ElasticsearchDestinationConfiguration !== undefined &&
            input.ElasticsearchDestinationConfiguration !== null && {
            ElasticsearchDestinationConfiguration: serializeAws_json1_1ElasticsearchDestinationConfiguration(input.ElasticsearchDestinationConfiguration, context),
        }),
        ...(input.ExtendedS3DestinationConfiguration !== undefined &&
            input.ExtendedS3DestinationConfiguration !== null && {
            ExtendedS3DestinationConfiguration: serializeAws_json1_1ExtendedS3DestinationConfiguration(input.ExtendedS3DestinationConfiguration, context),
        }),
        ...(input.HttpEndpointDestinationConfiguration !== undefined &&
            input.HttpEndpointDestinationConfiguration !== null && {
            HttpEndpointDestinationConfiguration: serializeAws_json1_1HttpEndpointDestinationConfiguration(input.HttpEndpointDestinationConfiguration, context),
        }),
        ...(input.KinesisStreamSourceConfiguration !== undefined &&
            input.KinesisStreamSourceConfiguration !== null && {
            KinesisStreamSourceConfiguration: serializeAws_json1_1KinesisStreamSourceConfiguration(input.KinesisStreamSourceConfiguration, context),
        }),
        ...(input.RedshiftDestinationConfiguration !== undefined &&
            input.RedshiftDestinationConfiguration !== null && {
            RedshiftDestinationConfiguration: serializeAws_json1_1RedshiftDestinationConfiguration(input.RedshiftDestinationConfiguration, context),
        }),
        ...(input.S3DestinationConfiguration !== undefined &&
            input.S3DestinationConfiguration !== null && {
            S3DestinationConfiguration: serializeAws_json1_1S3DestinationConfiguration(input.S3DestinationConfiguration, context),
        }),
        ...(input.SplunkDestinationConfiguration !== undefined &&
            input.SplunkDestinationConfiguration !== null && {
            SplunkDestinationConfiguration: serializeAws_json1_1SplunkDestinationConfiguration(input.SplunkDestinationConfiguration, context),
        }),
        ...(input.Tags !== undefined &&
            input.Tags !== null && { Tags: serializeAws_json1_1TagDeliveryStreamInputTagList(input.Tags, context) }),
    };
};
const serializeAws_json1_1DataFormatConversionConfiguration = (input, context) => {
    return {
        ...(input.Enabled !== undefined && input.Enabled !== null && { Enabled: input.Enabled }),
        ...(input.InputFormatConfiguration !== undefined &&
            input.InputFormatConfiguration !== null && {
            InputFormatConfiguration: serializeAws_json1_1InputFormatConfiguration(input.InputFormatConfiguration, context),
        }),
        ...(input.OutputFormatConfiguration !== undefined &&
            input.OutputFormatConfiguration !== null && {
            OutputFormatConfiguration: serializeAws_json1_1OutputFormatConfiguration(input.OutputFormatConfiguration, context),
        }),
        ...(input.SchemaConfiguration !== undefined &&
            input.SchemaConfiguration !== null && {
            SchemaConfiguration: serializeAws_json1_1SchemaConfiguration(input.SchemaConfiguration, context),
        }),
    };
};
const serializeAws_json1_1DeleteDeliveryStreamInput = (input, context) => {
    return {
        ...(input.AllowForceDelete !== undefined &&
            input.AllowForceDelete !== null && { AllowForceDelete: input.AllowForceDelete }),
        ...(input.DeliveryStreamName !== undefined &&
            input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName }),
    };
};
const serializeAws_json1_1DeliveryStreamEncryptionConfigurationInput = (input, context) => {
    return {
        ...(input.KeyARN !== undefined && input.KeyARN !== null && { KeyARN: input.KeyARN }),
        ...(input.KeyType !== undefined && input.KeyType !== null && { KeyType: input.KeyType }),
    };
};
const serializeAws_json1_1DescribeDeliveryStreamInput = (input, context) => {
    return {
        ...(input.DeliveryStreamName !== undefined &&
            input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName }),
        ...(input.ExclusiveStartDestinationId !== undefined &&
            input.ExclusiveStartDestinationId !== null && { ExclusiveStartDestinationId: input.ExclusiveStartDestinationId }),
        ...(input.Limit !== undefined && input.Limit !== null && { Limit: input.Limit }),
    };
};
const serializeAws_json1_1Deserializer = (input, context) => {
    return {
        ...(input.HiveJsonSerDe !== undefined &&
            input.HiveJsonSerDe !== null && {
            HiveJsonSerDe: serializeAws_json1_1HiveJsonSerDe(input.HiveJsonSerDe, context),
        }),
        ...(input.OpenXJsonSerDe !== undefined &&
            input.OpenXJsonSerDe !== null && {
            OpenXJsonSerDe: serializeAws_json1_1OpenXJsonSerDe(input.OpenXJsonSerDe, context),
        }),
    };
};
const serializeAws_json1_1ElasticsearchBufferingHints = (input, context) => {
    return {
        ...(input.IntervalInSeconds !== undefined &&
            input.IntervalInSeconds !== null && { IntervalInSeconds: input.IntervalInSeconds }),
        ...(input.SizeInMBs !== undefined && input.SizeInMBs !== null && { SizeInMBs: input.SizeInMBs }),
    };
};
const serializeAws_json1_1ElasticsearchDestinationConfiguration = (input, context) => {
    return {
        ...(input.BufferingHints !== undefined &&
            input.BufferingHints !== null && {
            BufferingHints: serializeAws_json1_1ElasticsearchBufferingHints(input.BufferingHints, context),
        }),
        ...(input.CloudWatchLoggingOptions !== undefined &&
            input.CloudWatchLoggingOptions !== null && {
            CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
        }),
        ...(input.ClusterEndpoint !== undefined &&
            input.ClusterEndpoint !== null && { ClusterEndpoint: input.ClusterEndpoint }),
        ...(input.DomainARN !== undefined && input.DomainARN !== null && { DomainARN: input.DomainARN }),
        ...(input.IndexName !== undefined && input.IndexName !== null && { IndexName: input.IndexName }),
        ...(input.IndexRotationPeriod !== undefined &&
            input.IndexRotationPeriod !== null && { IndexRotationPeriod: input.IndexRotationPeriod }),
        ...(input.ProcessingConfiguration !== undefined &&
            input.ProcessingConfiguration !== null && {
            ProcessingConfiguration: serializeAws_json1_1ProcessingConfiguration(input.ProcessingConfiguration, context),
        }),
        ...(input.RetryOptions !== undefined &&
            input.RetryOptions !== null && {
            RetryOptions: serializeAws_json1_1ElasticsearchRetryOptions(input.RetryOptions, context),
        }),
        ...(input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN }),
        ...(input.S3BackupMode !== undefined && input.S3BackupMode !== null && { S3BackupMode: input.S3BackupMode }),
        ...(input.S3Configuration !== undefined &&
            input.S3Configuration !== null && {
            S3Configuration: serializeAws_json1_1S3DestinationConfiguration(input.S3Configuration, context),
        }),
        ...(input.TypeName !== undefined && input.TypeName !== null && { TypeName: input.TypeName }),
        ...(input.VpcConfiguration !== undefined &&
            input.VpcConfiguration !== null && {
            VpcConfiguration: serializeAws_json1_1VpcConfiguration(input.VpcConfiguration, context),
        }),
    };
};
const serializeAws_json1_1ElasticsearchDestinationUpdate = (input, context) => {
    return {
        ...(input.BufferingHints !== undefined &&
            input.BufferingHints !== null && {
            BufferingHints: serializeAws_json1_1ElasticsearchBufferingHints(input.BufferingHints, context),
        }),
        ...(input.CloudWatchLoggingOptions !== undefined &&
            input.CloudWatchLoggingOptions !== null && {
            CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
        }),
        ...(input.ClusterEndpoint !== undefined &&
            input.ClusterEndpoint !== null && { ClusterEndpoint: input.ClusterEndpoint }),
        ...(input.DomainARN !== undefined && input.DomainARN !== null && { DomainARN: input.DomainARN }),
        ...(input.IndexName !== undefined && input.IndexName !== null && { IndexName: input.IndexName }),
        ...(input.IndexRotationPeriod !== undefined &&
            input.IndexRotationPeriod !== null && { IndexRotationPeriod: input.IndexRotationPeriod }),
        ...(input.ProcessingConfiguration !== undefined &&
            input.ProcessingConfiguration !== null && {
            ProcessingConfiguration: serializeAws_json1_1ProcessingConfiguration(input.ProcessingConfiguration, context),
        }),
        ...(input.RetryOptions !== undefined &&
            input.RetryOptions !== null && {
            RetryOptions: serializeAws_json1_1ElasticsearchRetryOptions(input.RetryOptions, context),
        }),
        ...(input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN }),
        ...(input.S3Update !== undefined &&
            input.S3Update !== null && { S3Update: serializeAws_json1_1S3DestinationUpdate(input.S3Update, context) }),
        ...(input.TypeName !== undefined && input.TypeName !== null && { TypeName: input.TypeName }),
    };
};
const serializeAws_json1_1ElasticsearchRetryOptions = (input, context) => {
    return {
        ...(input.DurationInSeconds !== undefined &&
            input.DurationInSeconds !== null && { DurationInSeconds: input.DurationInSeconds }),
    };
};
const serializeAws_json1_1EncryptionConfiguration = (input, context) => {
    return {
        ...(input.KMSEncryptionConfig !== undefined &&
            input.KMSEncryptionConfig !== null && {
            KMSEncryptionConfig: serializeAws_json1_1KMSEncryptionConfig(input.KMSEncryptionConfig, context),
        }),
        ...(input.NoEncryptionConfig !== undefined &&
            input.NoEncryptionConfig !== null && { NoEncryptionConfig: input.NoEncryptionConfig }),
    };
};
const serializeAws_json1_1ExtendedS3DestinationConfiguration = (input, context) => {
    return {
        ...(input.BucketARN !== undefined && input.BucketARN !== null && { BucketARN: input.BucketARN }),
        ...(input.BufferingHints !== undefined &&
            input.BufferingHints !== null && {
            BufferingHints: serializeAws_json1_1BufferingHints(input.BufferingHints, context),
        }),
        ...(input.CloudWatchLoggingOptions !== undefined &&
            input.CloudWatchLoggingOptions !== null && {
            CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
        }),
        ...(input.CompressionFormat !== undefined &&
            input.CompressionFormat !== null && { CompressionFormat: input.CompressionFormat }),
        ...(input.DataFormatConversionConfiguration !== undefined &&
            input.DataFormatConversionConfiguration !== null && {
            DataFormatConversionConfiguration: serializeAws_json1_1DataFormatConversionConfiguration(input.DataFormatConversionConfiguration, context),
        }),
        ...(input.EncryptionConfiguration !== undefined &&
            input.EncryptionConfiguration !== null && {
            EncryptionConfiguration: serializeAws_json1_1EncryptionConfiguration(input.EncryptionConfiguration, context),
        }),
        ...(input.ErrorOutputPrefix !== undefined &&
            input.ErrorOutputPrefix !== null && { ErrorOutputPrefix: input.ErrorOutputPrefix }),
        ...(input.Prefix !== undefined && input.Prefix !== null && { Prefix: input.Prefix }),
        ...(input.ProcessingConfiguration !== undefined &&
            input.ProcessingConfiguration !== null && {
            ProcessingConfiguration: serializeAws_json1_1ProcessingConfiguration(input.ProcessingConfiguration, context),
        }),
        ...(input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN }),
        ...(input.S3BackupConfiguration !== undefined &&
            input.S3BackupConfiguration !== null && {
            S3BackupConfiguration: serializeAws_json1_1S3DestinationConfiguration(input.S3BackupConfiguration, context),
        }),
        ...(input.S3BackupMode !== undefined && input.S3BackupMode !== null && { S3BackupMode: input.S3BackupMode }),
    };
};
const serializeAws_json1_1ExtendedS3DestinationUpdate = (input, context) => {
    return {
        ...(input.BucketARN !== undefined && input.BucketARN !== null && { BucketARN: input.BucketARN }),
        ...(input.BufferingHints !== undefined &&
            input.BufferingHints !== null && {
            BufferingHints: serializeAws_json1_1BufferingHints(input.BufferingHints, context),
        }),
        ...(input.CloudWatchLoggingOptions !== undefined &&
            input.CloudWatchLoggingOptions !== null && {
            CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
        }),
        ...(input.CompressionFormat !== undefined &&
            input.CompressionFormat !== null && { CompressionFormat: input.CompressionFormat }),
        ...(input.DataFormatConversionConfiguration !== undefined &&
            input.DataFormatConversionConfiguration !== null && {
            DataFormatConversionConfiguration: serializeAws_json1_1DataFormatConversionConfiguration(input.DataFormatConversionConfiguration, context),
        }),
        ...(input.EncryptionConfiguration !== undefined &&
            input.EncryptionConfiguration !== null && {
            EncryptionConfiguration: serializeAws_json1_1EncryptionConfiguration(input.EncryptionConfiguration, context),
        }),
        ...(input.ErrorOutputPrefix !== undefined &&
            input.ErrorOutputPrefix !== null && { ErrorOutputPrefix: input.ErrorOutputPrefix }),
        ...(input.Prefix !== undefined && input.Prefix !== null && { Prefix: input.Prefix }),
        ...(input.ProcessingConfiguration !== undefined &&
            input.ProcessingConfiguration !== null && {
            ProcessingConfiguration: serializeAws_json1_1ProcessingConfiguration(input.ProcessingConfiguration, context),
        }),
        ...(input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN }),
        ...(input.S3BackupMode !== undefined && input.S3BackupMode !== null && { S3BackupMode: input.S3BackupMode }),
        ...(input.S3BackupUpdate !== undefined &&
            input.S3BackupUpdate !== null && {
            S3BackupUpdate: serializeAws_json1_1S3DestinationUpdate(input.S3BackupUpdate, context),
        }),
    };
};
const serializeAws_json1_1HiveJsonSerDe = (input, context) => {
    return {
        ...(input.TimestampFormats !== undefined &&
            input.TimestampFormats !== null && {
            TimestampFormats: serializeAws_json1_1ListOfNonEmptyStrings(input.TimestampFormats, context),
        }),
    };
};
const serializeAws_json1_1HttpEndpointBufferingHints = (input, context) => {
    return {
        ...(input.IntervalInSeconds !== undefined &&
            input.IntervalInSeconds !== null && { IntervalInSeconds: input.IntervalInSeconds }),
        ...(input.SizeInMBs !== undefined && input.SizeInMBs !== null && { SizeInMBs: input.SizeInMBs }),
    };
};
const serializeAws_json1_1HttpEndpointCommonAttribute = (input, context) => {
    return {
        ...(input.AttributeName !== undefined && input.AttributeName !== null && { AttributeName: input.AttributeName }),
        ...(input.AttributeValue !== undefined &&
            input.AttributeValue !== null && { AttributeValue: input.AttributeValue }),
    };
};
const serializeAws_json1_1HttpEndpointCommonAttributesList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1HttpEndpointCommonAttribute(entry, context);
    });
};
const serializeAws_json1_1HttpEndpointConfiguration = (input, context) => {
    return {
        ...(input.AccessKey !== undefined && input.AccessKey !== null && { AccessKey: input.AccessKey }),
        ...(input.Name !== undefined && input.Name !== null && { Name: input.Name }),
        ...(input.Url !== undefined && input.Url !== null && { Url: input.Url }),
    };
};
const serializeAws_json1_1HttpEndpointDestinationConfiguration = (input, context) => {
    return {
        ...(input.BufferingHints !== undefined &&
            input.BufferingHints !== null && {
            BufferingHints: serializeAws_json1_1HttpEndpointBufferingHints(input.BufferingHints, context),
        }),
        ...(input.CloudWatchLoggingOptions !== undefined &&
            input.CloudWatchLoggingOptions !== null && {
            CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
        }),
        ...(input.EndpointConfiguration !== undefined &&
            input.EndpointConfiguration !== null && {
            EndpointConfiguration: serializeAws_json1_1HttpEndpointConfiguration(input.EndpointConfiguration, context),
        }),
        ...(input.ProcessingConfiguration !== undefined &&
            input.ProcessingConfiguration !== null && {
            ProcessingConfiguration: serializeAws_json1_1ProcessingConfiguration(input.ProcessingConfiguration, context),
        }),
        ...(input.RequestConfiguration !== undefined &&
            input.RequestConfiguration !== null && {
            RequestConfiguration: serializeAws_json1_1HttpEndpointRequestConfiguration(input.RequestConfiguration, context),
        }),
        ...(input.RetryOptions !== undefined &&
            input.RetryOptions !== null && {
            RetryOptions: serializeAws_json1_1HttpEndpointRetryOptions(input.RetryOptions, context),
        }),
        ...(input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN }),
        ...(input.S3BackupMode !== undefined && input.S3BackupMode !== null && { S3BackupMode: input.S3BackupMode }),
        ...(input.S3Configuration !== undefined &&
            input.S3Configuration !== null && {
            S3Configuration: serializeAws_json1_1S3DestinationConfiguration(input.S3Configuration, context),
        }),
    };
};
const serializeAws_json1_1HttpEndpointDestinationUpdate = (input, context) => {
    return {
        ...(input.BufferingHints !== undefined &&
            input.BufferingHints !== null && {
            BufferingHints: serializeAws_json1_1HttpEndpointBufferingHints(input.BufferingHints, context),
        }),
        ...(input.CloudWatchLoggingOptions !== undefined &&
            input.CloudWatchLoggingOptions !== null && {
            CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
        }),
        ...(input.EndpointConfiguration !== undefined &&
            input.EndpointConfiguration !== null && {
            EndpointConfiguration: serializeAws_json1_1HttpEndpointConfiguration(input.EndpointConfiguration, context),
        }),
        ...(input.ProcessingConfiguration !== undefined &&
            input.ProcessingConfiguration !== null && {
            ProcessingConfiguration: serializeAws_json1_1ProcessingConfiguration(input.ProcessingConfiguration, context),
        }),
        ...(input.RequestConfiguration !== undefined &&
            input.RequestConfiguration !== null && {
            RequestConfiguration: serializeAws_json1_1HttpEndpointRequestConfiguration(input.RequestConfiguration, context),
        }),
        ...(input.RetryOptions !== undefined &&
            input.RetryOptions !== null && {
            RetryOptions: serializeAws_json1_1HttpEndpointRetryOptions(input.RetryOptions, context),
        }),
        ...(input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN }),
        ...(input.S3BackupMode !== undefined && input.S3BackupMode !== null && { S3BackupMode: input.S3BackupMode }),
        ...(input.S3Update !== undefined &&
            input.S3Update !== null && { S3Update: serializeAws_json1_1S3DestinationUpdate(input.S3Update, context) }),
    };
};
const serializeAws_json1_1HttpEndpointRequestConfiguration = (input, context) => {
    return {
        ...(input.CommonAttributes !== undefined &&
            input.CommonAttributes !== null && {
            CommonAttributes: serializeAws_json1_1HttpEndpointCommonAttributesList(input.CommonAttributes, context),
        }),
        ...(input.ContentEncoding !== undefined &&
            input.ContentEncoding !== null && { ContentEncoding: input.ContentEncoding }),
    };
};
const serializeAws_json1_1HttpEndpointRetryOptions = (input, context) => {
    return {
        ...(input.DurationInSeconds !== undefined &&
            input.DurationInSeconds !== null && { DurationInSeconds: input.DurationInSeconds }),
    };
};
const serializeAws_json1_1InputFormatConfiguration = (input, context) => {
    return {
        ...(input.Deserializer !== undefined &&
            input.Deserializer !== null && { Deserializer: serializeAws_json1_1Deserializer(input.Deserializer, context) }),
    };
};
const serializeAws_json1_1KinesisStreamSourceConfiguration = (input, context) => {
    return {
        ...(input.KinesisStreamARN !== undefined &&
            input.KinesisStreamARN !== null && { KinesisStreamARN: input.KinesisStreamARN }),
        ...(input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN }),
    };
};
const serializeAws_json1_1KMSEncryptionConfig = (input, context) => {
    return {
        ...(input.AWSKMSKeyARN !== undefined && input.AWSKMSKeyARN !== null && { AWSKMSKeyARN: input.AWSKMSKeyARN }),
    };
};
const serializeAws_json1_1ListDeliveryStreamsInput = (input, context) => {
    return {
        ...(input.DeliveryStreamType !== undefined &&
            input.DeliveryStreamType !== null && { DeliveryStreamType: input.DeliveryStreamType }),
        ...(input.ExclusiveStartDeliveryStreamName !== undefined &&
            input.ExclusiveStartDeliveryStreamName !== null && {
            ExclusiveStartDeliveryStreamName: input.ExclusiveStartDeliveryStreamName,
        }),
        ...(input.Limit !== undefined && input.Limit !== null && { Limit: input.Limit }),
    };
};
const serializeAws_json1_1ListOfNonEmptyStrings = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1ListOfNonEmptyStringsWithoutWhitespace = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1ListTagsForDeliveryStreamInput = (input, context) => {
    return {
        ...(input.DeliveryStreamName !== undefined &&
            input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName }),
        ...(input.ExclusiveStartTagKey !== undefined &&
            input.ExclusiveStartTagKey !== null && { ExclusiveStartTagKey: input.ExclusiveStartTagKey }),
        ...(input.Limit !== undefined && input.Limit !== null && { Limit: input.Limit }),
    };
};
const serializeAws_json1_1OpenXJsonSerDe = (input, context) => {
    return {
        ...(input.CaseInsensitive !== undefined &&
            input.CaseInsensitive !== null && { CaseInsensitive: input.CaseInsensitive }),
        ...(input.ColumnToJsonKeyMappings !== undefined &&
            input.ColumnToJsonKeyMappings !== null && {
            ColumnToJsonKeyMappings: serializeAws_json1_1ColumnToJsonKeyMappings(input.ColumnToJsonKeyMappings, context),
        }),
        ...(input.ConvertDotsInJsonKeysToUnderscores !== undefined &&
            input.ConvertDotsInJsonKeysToUnderscores !== null && {
            ConvertDotsInJsonKeysToUnderscores: input.ConvertDotsInJsonKeysToUnderscores,
        }),
    };
};
const serializeAws_json1_1OrcSerDe = (input, context) => {
    return {
        ...(input.BlockSizeBytes !== undefined &&
            input.BlockSizeBytes !== null && { BlockSizeBytes: input.BlockSizeBytes }),
        ...(input.BloomFilterColumns !== undefined &&
            input.BloomFilterColumns !== null && {
            BloomFilterColumns: serializeAws_json1_1ListOfNonEmptyStringsWithoutWhitespace(input.BloomFilterColumns, context),
        }),
        ...(input.BloomFilterFalsePositiveProbability !== undefined &&
            input.BloomFilterFalsePositiveProbability !== null && {
            BloomFilterFalsePositiveProbability: input.BloomFilterFalsePositiveProbability,
        }),
        ...(input.Compression !== undefined && input.Compression !== null && { Compression: input.Compression }),
        ...(input.DictionaryKeyThreshold !== undefined &&
            input.DictionaryKeyThreshold !== null && { DictionaryKeyThreshold: input.DictionaryKeyThreshold }),
        ...(input.EnablePadding !== undefined && input.EnablePadding !== null && { EnablePadding: input.EnablePadding }),
        ...(input.FormatVersion !== undefined && input.FormatVersion !== null && { FormatVersion: input.FormatVersion }),
        ...(input.PaddingTolerance !== undefined &&
            input.PaddingTolerance !== null && { PaddingTolerance: input.PaddingTolerance }),
        ...(input.RowIndexStride !== undefined &&
            input.RowIndexStride !== null && { RowIndexStride: input.RowIndexStride }),
        ...(input.StripeSizeBytes !== undefined &&
            input.StripeSizeBytes !== null && { StripeSizeBytes: input.StripeSizeBytes }),
    };
};
const serializeAws_json1_1OutputFormatConfiguration = (input, context) => {
    return {
        ...(input.Serializer !== undefined &&
            input.Serializer !== null && { Serializer: serializeAws_json1_1Serializer(input.Serializer, context) }),
    };
};
const serializeAws_json1_1ParquetSerDe = (input, context) => {
    return {
        ...(input.BlockSizeBytes !== undefined &&
            input.BlockSizeBytes !== null && { BlockSizeBytes: input.BlockSizeBytes }),
        ...(input.Compression !== undefined && input.Compression !== null && { Compression: input.Compression }),
        ...(input.EnableDictionaryCompression !== undefined &&
            input.EnableDictionaryCompression !== null && { EnableDictionaryCompression: input.EnableDictionaryCompression }),
        ...(input.MaxPaddingBytes !== undefined &&
            input.MaxPaddingBytes !== null && { MaxPaddingBytes: input.MaxPaddingBytes }),
        ...(input.PageSizeBytes !== undefined && input.PageSizeBytes !== null && { PageSizeBytes: input.PageSizeBytes }),
        ...(input.WriterVersion !== undefined && input.WriterVersion !== null && { WriterVersion: input.WriterVersion }),
    };
};
const serializeAws_json1_1ProcessingConfiguration = (input, context) => {
    return {
        ...(input.Enabled !== undefined && input.Enabled !== null && { Enabled: input.Enabled }),
        ...(input.Processors !== undefined &&
            input.Processors !== null && { Processors: serializeAws_json1_1ProcessorList(input.Processors, context) }),
    };
};
const serializeAws_json1_1Processor = (input, context) => {
    return {
        ...(input.Parameters !== undefined &&
            input.Parameters !== null && {
            Parameters: serializeAws_json1_1ProcessorParameterList(input.Parameters, context),
        }),
        ...(input.Type !== undefined && input.Type !== null && { Type: input.Type }),
    };
};
const serializeAws_json1_1ProcessorList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1Processor(entry, context);
    });
};
const serializeAws_json1_1ProcessorParameter = (input, context) => {
    return {
        ...(input.ParameterName !== undefined && input.ParameterName !== null && { ParameterName: input.ParameterName }),
        ...(input.ParameterValue !== undefined &&
            input.ParameterValue !== null && { ParameterValue: input.ParameterValue }),
    };
};
const serializeAws_json1_1ProcessorParameterList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1ProcessorParameter(entry, context);
    });
};
const serializeAws_json1_1PutRecordBatchInput = (input, context) => {
    return {
        ...(input.DeliveryStreamName !== undefined &&
            input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName }),
        ...(input.Records !== undefined &&
            input.Records !== null && {
            Records: serializeAws_json1_1PutRecordBatchRequestEntryList(input.Records, context),
        }),
    };
};
const serializeAws_json1_1PutRecordBatchRequestEntryList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1_Record(entry, context);
    });
};
const serializeAws_json1_1PutRecordInput = (input, context) => {
    return {
        ...(input.DeliveryStreamName !== undefined &&
            input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName }),
        ...(input.Record !== undefined &&
            input.Record !== null && { Record: serializeAws_json1_1_Record(input.Record, context) }),
    };
};
const serializeAws_json1_1_Record = (input, context) => {
    return {
        ...(input.Data !== undefined && input.Data !== null && { Data: context.base64Encoder(input.Data) }),
    };
};
const serializeAws_json1_1RedshiftDestinationConfiguration = (input, context) => {
    return {
        ...(input.CloudWatchLoggingOptions !== undefined &&
            input.CloudWatchLoggingOptions !== null && {
            CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
        }),
        ...(input.ClusterJDBCURL !== undefined &&
            input.ClusterJDBCURL !== null && { ClusterJDBCURL: input.ClusterJDBCURL }),
        ...(input.CopyCommand !== undefined &&
            input.CopyCommand !== null && { CopyCommand: serializeAws_json1_1CopyCommand(input.CopyCommand, context) }),
        ...(input.Password !== undefined && input.Password !== null && { Password: input.Password }),
        ...(input.ProcessingConfiguration !== undefined &&
            input.ProcessingConfiguration !== null && {
            ProcessingConfiguration: serializeAws_json1_1ProcessingConfiguration(input.ProcessingConfiguration, context),
        }),
        ...(input.RetryOptions !== undefined &&
            input.RetryOptions !== null && {
            RetryOptions: serializeAws_json1_1RedshiftRetryOptions(input.RetryOptions, context),
        }),
        ...(input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN }),
        ...(input.S3BackupConfiguration !== undefined &&
            input.S3BackupConfiguration !== null && {
            S3BackupConfiguration: serializeAws_json1_1S3DestinationConfiguration(input.S3BackupConfiguration, context),
        }),
        ...(input.S3BackupMode !== undefined && input.S3BackupMode !== null && { S3BackupMode: input.S3BackupMode }),
        ...(input.S3Configuration !== undefined &&
            input.S3Configuration !== null && {
            S3Configuration: serializeAws_json1_1S3DestinationConfiguration(input.S3Configuration, context),
        }),
        ...(input.Username !== undefined && input.Username !== null && { Username: input.Username }),
    };
};
const serializeAws_json1_1RedshiftDestinationUpdate = (input, context) => {
    return {
        ...(input.CloudWatchLoggingOptions !== undefined &&
            input.CloudWatchLoggingOptions !== null && {
            CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
        }),
        ...(input.ClusterJDBCURL !== undefined &&
            input.ClusterJDBCURL !== null && { ClusterJDBCURL: input.ClusterJDBCURL }),
        ...(input.CopyCommand !== undefined &&
            input.CopyCommand !== null && { CopyCommand: serializeAws_json1_1CopyCommand(input.CopyCommand, context) }),
        ...(input.Password !== undefined && input.Password !== null && { Password: input.Password }),
        ...(input.ProcessingConfiguration !== undefined &&
            input.ProcessingConfiguration !== null && {
            ProcessingConfiguration: serializeAws_json1_1ProcessingConfiguration(input.ProcessingConfiguration, context),
        }),
        ...(input.RetryOptions !== undefined &&
            input.RetryOptions !== null && {
            RetryOptions: serializeAws_json1_1RedshiftRetryOptions(input.RetryOptions, context),
        }),
        ...(input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN }),
        ...(input.S3BackupMode !== undefined && input.S3BackupMode !== null && { S3BackupMode: input.S3BackupMode }),
        ...(input.S3BackupUpdate !== undefined &&
            input.S3BackupUpdate !== null && {
            S3BackupUpdate: serializeAws_json1_1S3DestinationUpdate(input.S3BackupUpdate, context),
        }),
        ...(input.S3Update !== undefined &&
            input.S3Update !== null && { S3Update: serializeAws_json1_1S3DestinationUpdate(input.S3Update, context) }),
        ...(input.Username !== undefined && input.Username !== null && { Username: input.Username }),
    };
};
const serializeAws_json1_1RedshiftRetryOptions = (input, context) => {
    return {
        ...(input.DurationInSeconds !== undefined &&
            input.DurationInSeconds !== null && { DurationInSeconds: input.DurationInSeconds }),
    };
};
const serializeAws_json1_1S3DestinationConfiguration = (input, context) => {
    return {
        ...(input.BucketARN !== undefined && input.BucketARN !== null && { BucketARN: input.BucketARN }),
        ...(input.BufferingHints !== undefined &&
            input.BufferingHints !== null && {
            BufferingHints: serializeAws_json1_1BufferingHints(input.BufferingHints, context),
        }),
        ...(input.CloudWatchLoggingOptions !== undefined &&
            input.CloudWatchLoggingOptions !== null && {
            CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
        }),
        ...(input.CompressionFormat !== undefined &&
            input.CompressionFormat !== null && { CompressionFormat: input.CompressionFormat }),
        ...(input.EncryptionConfiguration !== undefined &&
            input.EncryptionConfiguration !== null && {
            EncryptionConfiguration: serializeAws_json1_1EncryptionConfiguration(input.EncryptionConfiguration, context),
        }),
        ...(input.ErrorOutputPrefix !== undefined &&
            input.ErrorOutputPrefix !== null && { ErrorOutputPrefix: input.ErrorOutputPrefix }),
        ...(input.Prefix !== undefined && input.Prefix !== null && { Prefix: input.Prefix }),
        ...(input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN }),
    };
};
const serializeAws_json1_1S3DestinationUpdate = (input, context) => {
    return {
        ...(input.BucketARN !== undefined && input.BucketARN !== null && { BucketARN: input.BucketARN }),
        ...(input.BufferingHints !== undefined &&
            input.BufferingHints !== null && {
            BufferingHints: serializeAws_json1_1BufferingHints(input.BufferingHints, context),
        }),
        ...(input.CloudWatchLoggingOptions !== undefined &&
            input.CloudWatchLoggingOptions !== null && {
            CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
        }),
        ...(input.CompressionFormat !== undefined &&
            input.CompressionFormat !== null && { CompressionFormat: input.CompressionFormat }),
        ...(input.EncryptionConfiguration !== undefined &&
            input.EncryptionConfiguration !== null && {
            EncryptionConfiguration: serializeAws_json1_1EncryptionConfiguration(input.EncryptionConfiguration, context),
        }),
        ...(input.ErrorOutputPrefix !== undefined &&
            input.ErrorOutputPrefix !== null && { ErrorOutputPrefix: input.ErrorOutputPrefix }),
        ...(input.Prefix !== undefined && input.Prefix !== null && { Prefix: input.Prefix }),
        ...(input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN }),
    };
};
const serializeAws_json1_1SchemaConfiguration = (input, context) => {
    return {
        ...(input.CatalogId !== undefined && input.CatalogId !== null && { CatalogId: input.CatalogId }),
        ...(input.DatabaseName !== undefined && input.DatabaseName !== null && { DatabaseName: input.DatabaseName }),
        ...(input.Region !== undefined && input.Region !== null && { Region: input.Region }),
        ...(input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN }),
        ...(input.TableName !== undefined && input.TableName !== null && { TableName: input.TableName }),
        ...(input.VersionId !== undefined && input.VersionId !== null && { VersionId: input.VersionId }),
    };
};
const serializeAws_json1_1SecurityGroupIdList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1Serializer = (input, context) => {
    return {
        ...(input.OrcSerDe !== undefined &&
            input.OrcSerDe !== null && { OrcSerDe: serializeAws_json1_1OrcSerDe(input.OrcSerDe, context) }),
        ...(input.ParquetSerDe !== undefined &&
            input.ParquetSerDe !== null && { ParquetSerDe: serializeAws_json1_1ParquetSerDe(input.ParquetSerDe, context) }),
    };
};
const serializeAws_json1_1SplunkDestinationConfiguration = (input, context) => {
    return {
        ...(input.CloudWatchLoggingOptions !== undefined &&
            input.CloudWatchLoggingOptions !== null && {
            CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
        }),
        ...(input.HECAcknowledgmentTimeoutInSeconds !== undefined &&
            input.HECAcknowledgmentTimeoutInSeconds !== null && {
            HECAcknowledgmentTimeoutInSeconds: input.HECAcknowledgmentTimeoutInSeconds,
        }),
        ...(input.HECEndpoint !== undefined && input.HECEndpoint !== null && { HECEndpoint: input.HECEndpoint }),
        ...(input.HECEndpointType !== undefined &&
            input.HECEndpointType !== null && { HECEndpointType: input.HECEndpointType }),
        ...(input.HECToken !== undefined && input.HECToken !== null && { HECToken: input.HECToken }),
        ...(input.ProcessingConfiguration !== undefined &&
            input.ProcessingConfiguration !== null && {
            ProcessingConfiguration: serializeAws_json1_1ProcessingConfiguration(input.ProcessingConfiguration, context),
        }),
        ...(input.RetryOptions !== undefined &&
            input.RetryOptions !== null && {
            RetryOptions: serializeAws_json1_1SplunkRetryOptions(input.RetryOptions, context),
        }),
        ...(input.S3BackupMode !== undefined && input.S3BackupMode !== null && { S3BackupMode: input.S3BackupMode }),
        ...(input.S3Configuration !== undefined &&
            input.S3Configuration !== null && {
            S3Configuration: serializeAws_json1_1S3DestinationConfiguration(input.S3Configuration, context),
        }),
    };
};
const serializeAws_json1_1SplunkDestinationUpdate = (input, context) => {
    return {
        ...(input.CloudWatchLoggingOptions !== undefined &&
            input.CloudWatchLoggingOptions !== null && {
            CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
        }),
        ...(input.HECAcknowledgmentTimeoutInSeconds !== undefined &&
            input.HECAcknowledgmentTimeoutInSeconds !== null && {
            HECAcknowledgmentTimeoutInSeconds: input.HECAcknowledgmentTimeoutInSeconds,
        }),
        ...(input.HECEndpoint !== undefined && input.HECEndpoint !== null && { HECEndpoint: input.HECEndpoint }),
        ...(input.HECEndpointType !== undefined &&
            input.HECEndpointType !== null && { HECEndpointType: input.HECEndpointType }),
        ...(input.HECToken !== undefined && input.HECToken !== null && { HECToken: input.HECToken }),
        ...(input.ProcessingConfiguration !== undefined &&
            input.ProcessingConfiguration !== null && {
            ProcessingConfiguration: serializeAws_json1_1ProcessingConfiguration(input.ProcessingConfiguration, context),
        }),
        ...(input.RetryOptions !== undefined &&
            input.RetryOptions !== null && {
            RetryOptions: serializeAws_json1_1SplunkRetryOptions(input.RetryOptions, context),
        }),
        ...(input.S3BackupMode !== undefined && input.S3BackupMode !== null && { S3BackupMode: input.S3BackupMode }),
        ...(input.S3Update !== undefined &&
            input.S3Update !== null && { S3Update: serializeAws_json1_1S3DestinationUpdate(input.S3Update, context) }),
    };
};
const serializeAws_json1_1SplunkRetryOptions = (input, context) => {
    return {
        ...(input.DurationInSeconds !== undefined &&
            input.DurationInSeconds !== null && { DurationInSeconds: input.DurationInSeconds }),
    };
};
const serializeAws_json1_1StartDeliveryStreamEncryptionInput = (input, context) => {
    return {
        ...(input.DeliveryStreamEncryptionConfigurationInput !== undefined &&
            input.DeliveryStreamEncryptionConfigurationInput !== null && {
            DeliveryStreamEncryptionConfigurationInput: serializeAws_json1_1DeliveryStreamEncryptionConfigurationInput(input.DeliveryStreamEncryptionConfigurationInput, context),
        }),
        ...(input.DeliveryStreamName !== undefined &&
            input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName }),
    };
};
const serializeAws_json1_1StopDeliveryStreamEncryptionInput = (input, context) => {
    return {
        ...(input.DeliveryStreamName !== undefined &&
            input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName }),
    };
};
const serializeAws_json1_1SubnetIdList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1Tag = (input, context) => {
    return {
        ...(input.Key !== undefined && input.Key !== null && { Key: input.Key }),
        ...(input.Value !== undefined && input.Value !== null && { Value: input.Value }),
    };
};
const serializeAws_json1_1TagDeliveryStreamInput = (input, context) => {
    return {
        ...(input.DeliveryStreamName !== undefined &&
            input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName }),
        ...(input.Tags !== undefined &&
            input.Tags !== null && { Tags: serializeAws_json1_1TagDeliveryStreamInputTagList(input.Tags, context) }),
    };
};
const serializeAws_json1_1TagDeliveryStreamInputTagList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1Tag(entry, context);
    });
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
const serializeAws_json1_1UntagDeliveryStreamInput = (input, context) => {
    return {
        ...(input.DeliveryStreamName !== undefined &&
            input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName }),
        ...(input.TagKeys !== undefined &&
            input.TagKeys !== null && { TagKeys: serializeAws_json1_1TagKeyList(input.TagKeys, context) }),
    };
};
const serializeAws_json1_1UpdateDestinationInput = (input, context) => {
    return {
        ...(input.CurrentDeliveryStreamVersionId !== undefined &&
            input.CurrentDeliveryStreamVersionId !== null && {
            CurrentDeliveryStreamVersionId: input.CurrentDeliveryStreamVersionId,
        }),
        ...(input.DeliveryStreamName !== undefined &&
            input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName }),
        ...(input.DestinationId !== undefined && input.DestinationId !== null && { DestinationId: input.DestinationId }),
        ...(input.ElasticsearchDestinationUpdate !== undefined &&
            input.ElasticsearchDestinationUpdate !== null && {
            ElasticsearchDestinationUpdate: serializeAws_json1_1ElasticsearchDestinationUpdate(input.ElasticsearchDestinationUpdate, context),
        }),
        ...(input.ExtendedS3DestinationUpdate !== undefined &&
            input.ExtendedS3DestinationUpdate !== null && {
            ExtendedS3DestinationUpdate: serializeAws_json1_1ExtendedS3DestinationUpdate(input.ExtendedS3DestinationUpdate, context),
        }),
        ...(input.HttpEndpointDestinationUpdate !== undefined &&
            input.HttpEndpointDestinationUpdate !== null && {
            HttpEndpointDestinationUpdate: serializeAws_json1_1HttpEndpointDestinationUpdate(input.HttpEndpointDestinationUpdate, context),
        }),
        ...(input.RedshiftDestinationUpdate !== undefined &&
            input.RedshiftDestinationUpdate !== null && {
            RedshiftDestinationUpdate: serializeAws_json1_1RedshiftDestinationUpdate(input.RedshiftDestinationUpdate, context),
        }),
        ...(input.S3DestinationUpdate !== undefined &&
            input.S3DestinationUpdate !== null && {
            S3DestinationUpdate: serializeAws_json1_1S3DestinationUpdate(input.S3DestinationUpdate, context),
        }),
        ...(input.SplunkDestinationUpdate !== undefined &&
            input.SplunkDestinationUpdate !== null && {
            SplunkDestinationUpdate: serializeAws_json1_1SplunkDestinationUpdate(input.SplunkDestinationUpdate, context),
        }),
    };
};
const serializeAws_json1_1VpcConfiguration = (input, context) => {
    return {
        ...(input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN }),
        ...(input.SecurityGroupIds !== undefined &&
            input.SecurityGroupIds !== null && {
            SecurityGroupIds: serializeAws_json1_1SecurityGroupIdList(input.SecurityGroupIds, context),
        }),
        ...(input.SubnetIds !== undefined &&
            input.SubnetIds !== null && { SubnetIds: serializeAws_json1_1SubnetIdList(input.SubnetIds, context) }),
    };
};
const deserializeAws_json1_1BufferingHints = (output, context) => {
    return {
        IntervalInSeconds: output.IntervalInSeconds !== undefined && output.IntervalInSeconds !== null
            ? output.IntervalInSeconds
            : undefined,
        SizeInMBs: output.SizeInMBs !== undefined && output.SizeInMBs !== null ? output.SizeInMBs : undefined,
    };
};
const deserializeAws_json1_1CloudWatchLoggingOptions = (output, context) => {
    return {
        Enabled: output.Enabled !== undefined && output.Enabled !== null ? output.Enabled : undefined,
        LogGroupName: output.LogGroupName !== undefined && output.LogGroupName !== null ? output.LogGroupName : undefined,
        LogStreamName: output.LogStreamName !== undefined && output.LogStreamName !== null ? output.LogStreamName : undefined,
    };
};
const deserializeAws_json1_1ColumnToJsonKeyMappings = (output, context) => {
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
const deserializeAws_json1_1ConcurrentModificationException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1CopyCommand = (output, context) => {
    return {
        CopyOptions: output.CopyOptions !== undefined && output.CopyOptions !== null ? output.CopyOptions : undefined,
        DataTableColumns: output.DataTableColumns !== undefined && output.DataTableColumns !== null ? output.DataTableColumns : undefined,
        DataTableName: output.DataTableName !== undefined && output.DataTableName !== null ? output.DataTableName : undefined,
    };
};
const deserializeAws_json1_1CreateDeliveryStreamOutput = (output, context) => {
    return {
        DeliveryStreamARN: output.DeliveryStreamARN !== undefined && output.DeliveryStreamARN !== null
            ? output.DeliveryStreamARN
            : undefined,
    };
};
const deserializeAws_json1_1DataFormatConversionConfiguration = (output, context) => {
    return {
        Enabled: output.Enabled !== undefined && output.Enabled !== null ? output.Enabled : undefined,
        InputFormatConfiguration: output.InputFormatConfiguration !== undefined && output.InputFormatConfiguration !== null
            ? deserializeAws_json1_1InputFormatConfiguration(output.InputFormatConfiguration, context)
            : undefined,
        OutputFormatConfiguration: output.OutputFormatConfiguration !== undefined && output.OutputFormatConfiguration !== null
            ? deserializeAws_json1_1OutputFormatConfiguration(output.OutputFormatConfiguration, context)
            : undefined,
        SchemaConfiguration: output.SchemaConfiguration !== undefined && output.SchemaConfiguration !== null
            ? deserializeAws_json1_1SchemaConfiguration(output.SchemaConfiguration, context)
            : undefined,
    };
};
const deserializeAws_json1_1DeleteDeliveryStreamOutput = (output, context) => {
    return {};
};
const deserializeAws_json1_1DeliveryStreamDescription = (output, context) => {
    return {
        CreateTimestamp: output.CreateTimestamp !== undefined && output.CreateTimestamp !== null
            ? new Date(Math.round(output.CreateTimestamp * 1000))
            : undefined,
        DeliveryStreamARN: output.DeliveryStreamARN !== undefined && output.DeliveryStreamARN !== null
            ? output.DeliveryStreamARN
            : undefined,
        DeliveryStreamEncryptionConfiguration: output.DeliveryStreamEncryptionConfiguration !== undefined &&
            output.DeliveryStreamEncryptionConfiguration !== null
            ? deserializeAws_json1_1DeliveryStreamEncryptionConfiguration(output.DeliveryStreamEncryptionConfiguration, context)
            : undefined,
        DeliveryStreamName: output.DeliveryStreamName !== undefined && output.DeliveryStreamName !== null
            ? output.DeliveryStreamName
            : undefined,
        DeliveryStreamStatus: output.DeliveryStreamStatus !== undefined && output.DeliveryStreamStatus !== null
            ? output.DeliveryStreamStatus
            : undefined,
        DeliveryStreamType: output.DeliveryStreamType !== undefined && output.DeliveryStreamType !== null
            ? output.DeliveryStreamType
            : undefined,
        Destinations: output.Destinations !== undefined && output.Destinations !== null
            ? deserializeAws_json1_1DestinationDescriptionList(output.Destinations, context)
            : undefined,
        FailureDescription: output.FailureDescription !== undefined && output.FailureDescription !== null
            ? deserializeAws_json1_1FailureDescription(output.FailureDescription, context)
            : undefined,
        HasMoreDestinations: output.HasMoreDestinations !== undefined && output.HasMoreDestinations !== null
            ? output.HasMoreDestinations
            : undefined,
        LastUpdateTimestamp: output.LastUpdateTimestamp !== undefined && output.LastUpdateTimestamp !== null
            ? new Date(Math.round(output.LastUpdateTimestamp * 1000))
            : undefined,
        Source: output.Source !== undefined && output.Source !== null
            ? deserializeAws_json1_1SourceDescription(output.Source, context)
            : undefined,
        VersionId: output.VersionId !== undefined && output.VersionId !== null ? output.VersionId : undefined,
    };
};
const deserializeAws_json1_1DeliveryStreamEncryptionConfiguration = (output, context) => {
    return {
        FailureDescription: output.FailureDescription !== undefined && output.FailureDescription !== null
            ? deserializeAws_json1_1FailureDescription(output.FailureDescription, context)
            : undefined,
        KeyARN: output.KeyARN !== undefined && output.KeyARN !== null ? output.KeyARN : undefined,
        KeyType: output.KeyType !== undefined && output.KeyType !== null ? output.KeyType : undefined,
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
    };
};
const deserializeAws_json1_1DeliveryStreamNameList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1DescribeDeliveryStreamOutput = (output, context) => {
    return {
        DeliveryStreamDescription: output.DeliveryStreamDescription !== undefined && output.DeliveryStreamDescription !== null
            ? deserializeAws_json1_1DeliveryStreamDescription(output.DeliveryStreamDescription, context)
            : undefined,
    };
};
const deserializeAws_json1_1Deserializer = (output, context) => {
    return {
        HiveJsonSerDe: output.HiveJsonSerDe !== undefined && output.HiveJsonSerDe !== null
            ? deserializeAws_json1_1HiveJsonSerDe(output.HiveJsonSerDe, context)
            : undefined,
        OpenXJsonSerDe: output.OpenXJsonSerDe !== undefined && output.OpenXJsonSerDe !== null
            ? deserializeAws_json1_1OpenXJsonSerDe(output.OpenXJsonSerDe, context)
            : undefined,
    };
};
const deserializeAws_json1_1DestinationDescription = (output, context) => {
    return {
        DestinationId: output.DestinationId !== undefined && output.DestinationId !== null ? output.DestinationId : undefined,
        ElasticsearchDestinationDescription: output.ElasticsearchDestinationDescription !== undefined && output.ElasticsearchDestinationDescription !== null
            ? deserializeAws_json1_1ElasticsearchDestinationDescription(output.ElasticsearchDestinationDescription, context)
            : undefined,
        ExtendedS3DestinationDescription: output.ExtendedS3DestinationDescription !== undefined && output.ExtendedS3DestinationDescription !== null
            ? deserializeAws_json1_1ExtendedS3DestinationDescription(output.ExtendedS3DestinationDescription, context)
            : undefined,
        HttpEndpointDestinationDescription: output.HttpEndpointDestinationDescription !== undefined && output.HttpEndpointDestinationDescription !== null
            ? deserializeAws_json1_1HttpEndpointDestinationDescription(output.HttpEndpointDestinationDescription, context)
            : undefined,
        RedshiftDestinationDescription: output.RedshiftDestinationDescription !== undefined && output.RedshiftDestinationDescription !== null
            ? deserializeAws_json1_1RedshiftDestinationDescription(output.RedshiftDestinationDescription, context)
            : undefined,
        S3DestinationDescription: output.S3DestinationDescription !== undefined && output.S3DestinationDescription !== null
            ? deserializeAws_json1_1S3DestinationDescription(output.S3DestinationDescription, context)
            : undefined,
        SplunkDestinationDescription: output.SplunkDestinationDescription !== undefined && output.SplunkDestinationDescription !== null
            ? deserializeAws_json1_1SplunkDestinationDescription(output.SplunkDestinationDescription, context)
            : undefined,
    };
};
const deserializeAws_json1_1DestinationDescriptionList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1DestinationDescription(entry, context);
    });
};
const deserializeAws_json1_1ElasticsearchBufferingHints = (output, context) => {
    return {
        IntervalInSeconds: output.IntervalInSeconds !== undefined && output.IntervalInSeconds !== null
            ? output.IntervalInSeconds
            : undefined,
        SizeInMBs: output.SizeInMBs !== undefined && output.SizeInMBs !== null ? output.SizeInMBs : undefined,
    };
};
const deserializeAws_json1_1ElasticsearchDestinationDescription = (output, context) => {
    return {
        BufferingHints: output.BufferingHints !== undefined && output.BufferingHints !== null
            ? deserializeAws_json1_1ElasticsearchBufferingHints(output.BufferingHints, context)
            : undefined,
        CloudWatchLoggingOptions: output.CloudWatchLoggingOptions !== undefined && output.CloudWatchLoggingOptions !== null
            ? deserializeAws_json1_1CloudWatchLoggingOptions(output.CloudWatchLoggingOptions, context)
            : undefined,
        ClusterEndpoint: output.ClusterEndpoint !== undefined && output.ClusterEndpoint !== null ? output.ClusterEndpoint : undefined,
        DomainARN: output.DomainARN !== undefined && output.DomainARN !== null ? output.DomainARN : undefined,
        IndexName: output.IndexName !== undefined && output.IndexName !== null ? output.IndexName : undefined,
        IndexRotationPeriod: output.IndexRotationPeriod !== undefined && output.IndexRotationPeriod !== null
            ? output.IndexRotationPeriod
            : undefined,
        ProcessingConfiguration: output.ProcessingConfiguration !== undefined && output.ProcessingConfiguration !== null
            ? deserializeAws_json1_1ProcessingConfiguration(output.ProcessingConfiguration, context)
            : undefined,
        RetryOptions: output.RetryOptions !== undefined && output.RetryOptions !== null
            ? deserializeAws_json1_1ElasticsearchRetryOptions(output.RetryOptions, context)
            : undefined,
        RoleARN: output.RoleARN !== undefined && output.RoleARN !== null ? output.RoleARN : undefined,
        S3BackupMode: output.S3BackupMode !== undefined && output.S3BackupMode !== null ? output.S3BackupMode : undefined,
        S3DestinationDescription: output.S3DestinationDescription !== undefined && output.S3DestinationDescription !== null
            ? deserializeAws_json1_1S3DestinationDescription(output.S3DestinationDescription, context)
            : undefined,
        TypeName: output.TypeName !== undefined && output.TypeName !== null ? output.TypeName : undefined,
        VpcConfigurationDescription: output.VpcConfigurationDescription !== undefined && output.VpcConfigurationDescription !== null
            ? deserializeAws_json1_1VpcConfigurationDescription(output.VpcConfigurationDescription, context)
            : undefined,
    };
};
const deserializeAws_json1_1ElasticsearchRetryOptions = (output, context) => {
    return {
        DurationInSeconds: output.DurationInSeconds !== undefined && output.DurationInSeconds !== null
            ? output.DurationInSeconds
            : undefined,
    };
};
const deserializeAws_json1_1EncryptionConfiguration = (output, context) => {
    return {
        KMSEncryptionConfig: output.KMSEncryptionConfig !== undefined && output.KMSEncryptionConfig !== null
            ? deserializeAws_json1_1KMSEncryptionConfig(output.KMSEncryptionConfig, context)
            : undefined,
        NoEncryptionConfig: output.NoEncryptionConfig !== undefined && output.NoEncryptionConfig !== null
            ? output.NoEncryptionConfig
            : undefined,
    };
};
const deserializeAws_json1_1ExtendedS3DestinationDescription = (output, context) => {
    return {
        BucketARN: output.BucketARN !== undefined && output.BucketARN !== null ? output.BucketARN : undefined,
        BufferingHints: output.BufferingHints !== undefined && output.BufferingHints !== null
            ? deserializeAws_json1_1BufferingHints(output.BufferingHints, context)
            : undefined,
        CloudWatchLoggingOptions: output.CloudWatchLoggingOptions !== undefined && output.CloudWatchLoggingOptions !== null
            ? deserializeAws_json1_1CloudWatchLoggingOptions(output.CloudWatchLoggingOptions, context)
            : undefined,
        CompressionFormat: output.CompressionFormat !== undefined && output.CompressionFormat !== null
            ? output.CompressionFormat
            : undefined,
        DataFormatConversionConfiguration: output.DataFormatConversionConfiguration !== undefined && output.DataFormatConversionConfiguration !== null
            ? deserializeAws_json1_1DataFormatConversionConfiguration(output.DataFormatConversionConfiguration, context)
            : undefined,
        EncryptionConfiguration: output.EncryptionConfiguration !== undefined && output.EncryptionConfiguration !== null
            ? deserializeAws_json1_1EncryptionConfiguration(output.EncryptionConfiguration, context)
            : undefined,
        ErrorOutputPrefix: output.ErrorOutputPrefix !== undefined && output.ErrorOutputPrefix !== null
            ? output.ErrorOutputPrefix
            : undefined,
        Prefix: output.Prefix !== undefined && output.Prefix !== null ? output.Prefix : undefined,
        ProcessingConfiguration: output.ProcessingConfiguration !== undefined && output.ProcessingConfiguration !== null
            ? deserializeAws_json1_1ProcessingConfiguration(output.ProcessingConfiguration, context)
            : undefined,
        RoleARN: output.RoleARN !== undefined && output.RoleARN !== null ? output.RoleARN : undefined,
        S3BackupDescription: output.S3BackupDescription !== undefined && output.S3BackupDescription !== null
            ? deserializeAws_json1_1S3DestinationDescription(output.S3BackupDescription, context)
            : undefined,
        S3BackupMode: output.S3BackupMode !== undefined && output.S3BackupMode !== null ? output.S3BackupMode : undefined,
    };
};
const deserializeAws_json1_1FailureDescription = (output, context) => {
    return {
        Details: output.Details !== undefined && output.Details !== null ? output.Details : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
const deserializeAws_json1_1HiveJsonSerDe = (output, context) => {
    return {
        TimestampFormats: output.TimestampFormats !== undefined && output.TimestampFormats !== null
            ? deserializeAws_json1_1ListOfNonEmptyStrings(output.TimestampFormats, context)
            : undefined,
    };
};
const deserializeAws_json1_1HttpEndpointBufferingHints = (output, context) => {
    return {
        IntervalInSeconds: output.IntervalInSeconds !== undefined && output.IntervalInSeconds !== null
            ? output.IntervalInSeconds
            : undefined,
        SizeInMBs: output.SizeInMBs !== undefined && output.SizeInMBs !== null ? output.SizeInMBs : undefined,
    };
};
const deserializeAws_json1_1HttpEndpointCommonAttribute = (output, context) => {
    return {
        AttributeName: output.AttributeName !== undefined && output.AttributeName !== null ? output.AttributeName : undefined,
        AttributeValue: output.AttributeValue !== undefined && output.AttributeValue !== null ? output.AttributeValue : undefined,
    };
};
const deserializeAws_json1_1HttpEndpointCommonAttributesList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1HttpEndpointCommonAttribute(entry, context);
    });
};
const deserializeAws_json1_1HttpEndpointDescription = (output, context) => {
    return {
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        Url: output.Url !== undefined && output.Url !== null ? output.Url : undefined,
    };
};
const deserializeAws_json1_1HttpEndpointDestinationDescription = (output, context) => {
    return {
        BufferingHints: output.BufferingHints !== undefined && output.BufferingHints !== null
            ? deserializeAws_json1_1HttpEndpointBufferingHints(output.BufferingHints, context)
            : undefined,
        CloudWatchLoggingOptions: output.CloudWatchLoggingOptions !== undefined && output.CloudWatchLoggingOptions !== null
            ? deserializeAws_json1_1CloudWatchLoggingOptions(output.CloudWatchLoggingOptions, context)
            : undefined,
        EndpointConfiguration: output.EndpointConfiguration !== undefined && output.EndpointConfiguration !== null
            ? deserializeAws_json1_1HttpEndpointDescription(output.EndpointConfiguration, context)
            : undefined,
        ProcessingConfiguration: output.ProcessingConfiguration !== undefined && output.ProcessingConfiguration !== null
            ? deserializeAws_json1_1ProcessingConfiguration(output.ProcessingConfiguration, context)
            : undefined,
        RequestConfiguration: output.RequestConfiguration !== undefined && output.RequestConfiguration !== null
            ? deserializeAws_json1_1HttpEndpointRequestConfiguration(output.RequestConfiguration, context)
            : undefined,
        RetryOptions: output.RetryOptions !== undefined && output.RetryOptions !== null
            ? deserializeAws_json1_1HttpEndpointRetryOptions(output.RetryOptions, context)
            : undefined,
        RoleARN: output.RoleARN !== undefined && output.RoleARN !== null ? output.RoleARN : undefined,
        S3BackupMode: output.S3BackupMode !== undefined && output.S3BackupMode !== null ? output.S3BackupMode : undefined,
        S3DestinationDescription: output.S3DestinationDescription !== undefined && output.S3DestinationDescription !== null
            ? deserializeAws_json1_1S3DestinationDescription(output.S3DestinationDescription, context)
            : undefined,
    };
};
const deserializeAws_json1_1HttpEndpointRequestConfiguration = (output, context) => {
    return {
        CommonAttributes: output.CommonAttributes !== undefined && output.CommonAttributes !== null
            ? deserializeAws_json1_1HttpEndpointCommonAttributesList(output.CommonAttributes, context)
            : undefined,
        ContentEncoding: output.ContentEncoding !== undefined && output.ContentEncoding !== null ? output.ContentEncoding : undefined,
    };
};
const deserializeAws_json1_1HttpEndpointRetryOptions = (output, context) => {
    return {
        DurationInSeconds: output.DurationInSeconds !== undefined && output.DurationInSeconds !== null
            ? output.DurationInSeconds
            : undefined,
    };
};
const deserializeAws_json1_1InputFormatConfiguration = (output, context) => {
    return {
        Deserializer: output.Deserializer !== undefined && output.Deserializer !== null
            ? deserializeAws_json1_1Deserializer(output.Deserializer, context)
            : undefined,
    };
};
const deserializeAws_json1_1InvalidArgumentException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1InvalidKMSResourceException = (output, context) => {
    return {
        code: output.code !== undefined && output.code !== null ? output.code : undefined,
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1KinesisStreamSourceDescription = (output, context) => {
    return {
        DeliveryStartTimestamp: output.DeliveryStartTimestamp !== undefined && output.DeliveryStartTimestamp !== null
            ? new Date(Math.round(output.DeliveryStartTimestamp * 1000))
            : undefined,
        KinesisStreamARN: output.KinesisStreamARN !== undefined && output.KinesisStreamARN !== null ? output.KinesisStreamARN : undefined,
        RoleARN: output.RoleARN !== undefined && output.RoleARN !== null ? output.RoleARN : undefined,
    };
};
const deserializeAws_json1_1KMSEncryptionConfig = (output, context) => {
    return {
        AWSKMSKeyARN: output.AWSKMSKeyARN !== undefined && output.AWSKMSKeyARN !== null ? output.AWSKMSKeyARN : undefined,
    };
};
const deserializeAws_json1_1LimitExceededException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1ListDeliveryStreamsOutput = (output, context) => {
    return {
        DeliveryStreamNames: output.DeliveryStreamNames !== undefined && output.DeliveryStreamNames !== null
            ? deserializeAws_json1_1DeliveryStreamNameList(output.DeliveryStreamNames, context)
            : undefined,
        HasMoreDeliveryStreams: output.HasMoreDeliveryStreams !== undefined && output.HasMoreDeliveryStreams !== null
            ? output.HasMoreDeliveryStreams
            : undefined,
    };
};
const deserializeAws_json1_1ListOfNonEmptyStrings = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1ListOfNonEmptyStringsWithoutWhitespace = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1ListTagsForDeliveryStreamOutput = (output, context) => {
    return {
        HasMoreTags: output.HasMoreTags !== undefined && output.HasMoreTags !== null ? output.HasMoreTags : undefined,
        Tags: output.Tags !== undefined && output.Tags !== null
            ? deserializeAws_json1_1ListTagsForDeliveryStreamOutputTagList(output.Tags, context)
            : undefined,
    };
};
const deserializeAws_json1_1ListTagsForDeliveryStreamOutputTagList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Tag(entry, context);
    });
};
const deserializeAws_json1_1OpenXJsonSerDe = (output, context) => {
    return {
        CaseInsensitive: output.CaseInsensitive !== undefined && output.CaseInsensitive !== null ? output.CaseInsensitive : undefined,
        ColumnToJsonKeyMappings: output.ColumnToJsonKeyMappings !== undefined && output.ColumnToJsonKeyMappings !== null
            ? deserializeAws_json1_1ColumnToJsonKeyMappings(output.ColumnToJsonKeyMappings, context)
            : undefined,
        ConvertDotsInJsonKeysToUnderscores: output.ConvertDotsInJsonKeysToUnderscores !== undefined && output.ConvertDotsInJsonKeysToUnderscores !== null
            ? output.ConvertDotsInJsonKeysToUnderscores
            : undefined,
    };
};
const deserializeAws_json1_1OrcSerDe = (output, context) => {
    return {
        BlockSizeBytes: output.BlockSizeBytes !== undefined && output.BlockSizeBytes !== null ? output.BlockSizeBytes : undefined,
        BloomFilterColumns: output.BloomFilterColumns !== undefined && output.BloomFilterColumns !== null
            ? deserializeAws_json1_1ListOfNonEmptyStringsWithoutWhitespace(output.BloomFilterColumns, context)
            : undefined,
        BloomFilterFalsePositiveProbability: output.BloomFilterFalsePositiveProbability !== undefined && output.BloomFilterFalsePositiveProbability !== null
            ? output.BloomFilterFalsePositiveProbability
            : undefined,
        Compression: output.Compression !== undefined && output.Compression !== null ? output.Compression : undefined,
        DictionaryKeyThreshold: output.DictionaryKeyThreshold !== undefined && output.DictionaryKeyThreshold !== null
            ? output.DictionaryKeyThreshold
            : undefined,
        EnablePadding: output.EnablePadding !== undefined && output.EnablePadding !== null ? output.EnablePadding : undefined,
        FormatVersion: output.FormatVersion !== undefined && output.FormatVersion !== null ? output.FormatVersion : undefined,
        PaddingTolerance: output.PaddingTolerance !== undefined && output.PaddingTolerance !== null ? output.PaddingTolerance : undefined,
        RowIndexStride: output.RowIndexStride !== undefined && output.RowIndexStride !== null ? output.RowIndexStride : undefined,
        StripeSizeBytes: output.StripeSizeBytes !== undefined && output.StripeSizeBytes !== null ? output.StripeSizeBytes : undefined,
    };
};
const deserializeAws_json1_1OutputFormatConfiguration = (output, context) => {
    return {
        Serializer: output.Serializer !== undefined && output.Serializer !== null
            ? deserializeAws_json1_1Serializer(output.Serializer, context)
            : undefined,
    };
};
const deserializeAws_json1_1ParquetSerDe = (output, context) => {
    return {
        BlockSizeBytes: output.BlockSizeBytes !== undefined && output.BlockSizeBytes !== null ? output.BlockSizeBytes : undefined,
        Compression: output.Compression !== undefined && output.Compression !== null ? output.Compression : undefined,
        EnableDictionaryCompression: output.EnableDictionaryCompression !== undefined && output.EnableDictionaryCompression !== null
            ? output.EnableDictionaryCompression
            : undefined,
        MaxPaddingBytes: output.MaxPaddingBytes !== undefined && output.MaxPaddingBytes !== null ? output.MaxPaddingBytes : undefined,
        PageSizeBytes: output.PageSizeBytes !== undefined && output.PageSizeBytes !== null ? output.PageSizeBytes : undefined,
        WriterVersion: output.WriterVersion !== undefined && output.WriterVersion !== null ? output.WriterVersion : undefined,
    };
};
const deserializeAws_json1_1ProcessingConfiguration = (output, context) => {
    return {
        Enabled: output.Enabled !== undefined && output.Enabled !== null ? output.Enabled : undefined,
        Processors: output.Processors !== undefined && output.Processors !== null
            ? deserializeAws_json1_1ProcessorList(output.Processors, context)
            : undefined,
    };
};
const deserializeAws_json1_1Processor = (output, context) => {
    return {
        Parameters: output.Parameters !== undefined && output.Parameters !== null
            ? deserializeAws_json1_1ProcessorParameterList(output.Parameters, context)
            : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
const deserializeAws_json1_1ProcessorList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Processor(entry, context);
    });
};
const deserializeAws_json1_1ProcessorParameter = (output, context) => {
    return {
        ParameterName: output.ParameterName !== undefined && output.ParameterName !== null ? output.ParameterName : undefined,
        ParameterValue: output.ParameterValue !== undefined && output.ParameterValue !== null ? output.ParameterValue : undefined,
    };
};
const deserializeAws_json1_1ProcessorParameterList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ProcessorParameter(entry, context);
    });
};
const deserializeAws_json1_1PutRecordBatchOutput = (output, context) => {
    return {
        Encrypted: output.Encrypted !== undefined && output.Encrypted !== null ? output.Encrypted : undefined,
        FailedPutCount: output.FailedPutCount !== undefined && output.FailedPutCount !== null ? output.FailedPutCount : undefined,
        RequestResponses: output.RequestResponses !== undefined && output.RequestResponses !== null
            ? deserializeAws_json1_1PutRecordBatchResponseEntryList(output.RequestResponses, context)
            : undefined,
    };
};
const deserializeAws_json1_1PutRecordBatchResponseEntry = (output, context) => {
    return {
        ErrorCode: output.ErrorCode !== undefined && output.ErrorCode !== null ? output.ErrorCode : undefined,
        ErrorMessage: output.ErrorMessage !== undefined && output.ErrorMessage !== null ? output.ErrorMessage : undefined,
        RecordId: output.RecordId !== undefined && output.RecordId !== null ? output.RecordId : undefined,
    };
};
const deserializeAws_json1_1PutRecordBatchResponseEntryList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1PutRecordBatchResponseEntry(entry, context);
    });
};
const deserializeAws_json1_1PutRecordOutput = (output, context) => {
    return {
        Encrypted: output.Encrypted !== undefined && output.Encrypted !== null ? output.Encrypted : undefined,
        RecordId: output.RecordId !== undefined && output.RecordId !== null ? output.RecordId : undefined,
    };
};
const deserializeAws_json1_1RedshiftDestinationDescription = (output, context) => {
    return {
        CloudWatchLoggingOptions: output.CloudWatchLoggingOptions !== undefined && output.CloudWatchLoggingOptions !== null
            ? deserializeAws_json1_1CloudWatchLoggingOptions(output.CloudWatchLoggingOptions, context)
            : undefined,
        ClusterJDBCURL: output.ClusterJDBCURL !== undefined && output.ClusterJDBCURL !== null ? output.ClusterJDBCURL : undefined,
        CopyCommand: output.CopyCommand !== undefined && output.CopyCommand !== null
            ? deserializeAws_json1_1CopyCommand(output.CopyCommand, context)
            : undefined,
        ProcessingConfiguration: output.ProcessingConfiguration !== undefined && output.ProcessingConfiguration !== null
            ? deserializeAws_json1_1ProcessingConfiguration(output.ProcessingConfiguration, context)
            : undefined,
        RetryOptions: output.RetryOptions !== undefined && output.RetryOptions !== null
            ? deserializeAws_json1_1RedshiftRetryOptions(output.RetryOptions, context)
            : undefined,
        RoleARN: output.RoleARN !== undefined && output.RoleARN !== null ? output.RoleARN : undefined,
        S3BackupDescription: output.S3BackupDescription !== undefined && output.S3BackupDescription !== null
            ? deserializeAws_json1_1S3DestinationDescription(output.S3BackupDescription, context)
            : undefined,
        S3BackupMode: output.S3BackupMode !== undefined && output.S3BackupMode !== null ? output.S3BackupMode : undefined,
        S3DestinationDescription: output.S3DestinationDescription !== undefined && output.S3DestinationDescription !== null
            ? deserializeAws_json1_1S3DestinationDescription(output.S3DestinationDescription, context)
            : undefined,
        Username: output.Username !== undefined && output.Username !== null ? output.Username : undefined,
    };
};
const deserializeAws_json1_1RedshiftRetryOptions = (output, context) => {
    return {
        DurationInSeconds: output.DurationInSeconds !== undefined && output.DurationInSeconds !== null
            ? output.DurationInSeconds
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
const deserializeAws_json1_1S3DestinationDescription = (output, context) => {
    return {
        BucketARN: output.BucketARN !== undefined && output.BucketARN !== null ? output.BucketARN : undefined,
        BufferingHints: output.BufferingHints !== undefined && output.BufferingHints !== null
            ? deserializeAws_json1_1BufferingHints(output.BufferingHints, context)
            : undefined,
        CloudWatchLoggingOptions: output.CloudWatchLoggingOptions !== undefined && output.CloudWatchLoggingOptions !== null
            ? deserializeAws_json1_1CloudWatchLoggingOptions(output.CloudWatchLoggingOptions, context)
            : undefined,
        CompressionFormat: output.CompressionFormat !== undefined && output.CompressionFormat !== null
            ? output.CompressionFormat
            : undefined,
        EncryptionConfiguration: output.EncryptionConfiguration !== undefined && output.EncryptionConfiguration !== null
            ? deserializeAws_json1_1EncryptionConfiguration(output.EncryptionConfiguration, context)
            : undefined,
        ErrorOutputPrefix: output.ErrorOutputPrefix !== undefined && output.ErrorOutputPrefix !== null
            ? output.ErrorOutputPrefix
            : undefined,
        Prefix: output.Prefix !== undefined && output.Prefix !== null ? output.Prefix : undefined,
        RoleARN: output.RoleARN !== undefined && output.RoleARN !== null ? output.RoleARN : undefined,
    };
};
const deserializeAws_json1_1SchemaConfiguration = (output, context) => {
    return {
        CatalogId: output.CatalogId !== undefined && output.CatalogId !== null ? output.CatalogId : undefined,
        DatabaseName: output.DatabaseName !== undefined && output.DatabaseName !== null ? output.DatabaseName : undefined,
        Region: output.Region !== undefined && output.Region !== null ? output.Region : undefined,
        RoleARN: output.RoleARN !== undefined && output.RoleARN !== null ? output.RoleARN : undefined,
        TableName: output.TableName !== undefined && output.TableName !== null ? output.TableName : undefined,
        VersionId: output.VersionId !== undefined && output.VersionId !== null ? output.VersionId : undefined,
    };
};
const deserializeAws_json1_1SecurityGroupIdList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1Serializer = (output, context) => {
    return {
        OrcSerDe: output.OrcSerDe !== undefined && output.OrcSerDe !== null
            ? deserializeAws_json1_1OrcSerDe(output.OrcSerDe, context)
            : undefined,
        ParquetSerDe: output.ParquetSerDe !== undefined && output.ParquetSerDe !== null
            ? deserializeAws_json1_1ParquetSerDe(output.ParquetSerDe, context)
            : undefined,
    };
};
const deserializeAws_json1_1ServiceUnavailableException = (output, context) => {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
const deserializeAws_json1_1SourceDescription = (output, context) => {
    return {
        KinesisStreamSourceDescription: output.KinesisStreamSourceDescription !== undefined && output.KinesisStreamSourceDescription !== null
            ? deserializeAws_json1_1KinesisStreamSourceDescription(output.KinesisStreamSourceDescription, context)
            : undefined,
    };
};
const deserializeAws_json1_1SplunkDestinationDescription = (output, context) => {
    return {
        CloudWatchLoggingOptions: output.CloudWatchLoggingOptions !== undefined && output.CloudWatchLoggingOptions !== null
            ? deserializeAws_json1_1CloudWatchLoggingOptions(output.CloudWatchLoggingOptions, context)
            : undefined,
        HECAcknowledgmentTimeoutInSeconds: output.HECAcknowledgmentTimeoutInSeconds !== undefined && output.HECAcknowledgmentTimeoutInSeconds !== null
            ? output.HECAcknowledgmentTimeoutInSeconds
            : undefined,
        HECEndpoint: output.HECEndpoint !== undefined && output.HECEndpoint !== null ? output.HECEndpoint : undefined,
        HECEndpointType: output.HECEndpointType !== undefined && output.HECEndpointType !== null ? output.HECEndpointType : undefined,
        HECToken: output.HECToken !== undefined && output.HECToken !== null ? output.HECToken : undefined,
        ProcessingConfiguration: output.ProcessingConfiguration !== undefined && output.ProcessingConfiguration !== null
            ? deserializeAws_json1_1ProcessingConfiguration(output.ProcessingConfiguration, context)
            : undefined,
        RetryOptions: output.RetryOptions !== undefined && output.RetryOptions !== null
            ? deserializeAws_json1_1SplunkRetryOptions(output.RetryOptions, context)
            : undefined,
        S3BackupMode: output.S3BackupMode !== undefined && output.S3BackupMode !== null ? output.S3BackupMode : undefined,
        S3DestinationDescription: output.S3DestinationDescription !== undefined && output.S3DestinationDescription !== null
            ? deserializeAws_json1_1S3DestinationDescription(output.S3DestinationDescription, context)
            : undefined,
    };
};
const deserializeAws_json1_1SplunkRetryOptions = (output, context) => {
    return {
        DurationInSeconds: output.DurationInSeconds !== undefined && output.DurationInSeconds !== null
            ? output.DurationInSeconds
            : undefined,
    };
};
const deserializeAws_json1_1StartDeliveryStreamEncryptionOutput = (output, context) => {
    return {};
};
const deserializeAws_json1_1StopDeliveryStreamEncryptionOutput = (output, context) => {
    return {};
};
const deserializeAws_json1_1SubnetIdList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1Tag = (output, context) => {
    return {
        Key: output.Key !== undefined && output.Key !== null ? output.Key : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
const deserializeAws_json1_1TagDeliveryStreamOutput = (output, context) => {
    return {};
};
const deserializeAws_json1_1UntagDeliveryStreamOutput = (output, context) => {
    return {};
};
const deserializeAws_json1_1UpdateDestinationOutput = (output, context) => {
    return {};
};
const deserializeAws_json1_1VpcConfigurationDescription = (output, context) => {
    return {
        RoleARN: output.RoleARN !== undefined && output.RoleARN !== null ? output.RoleARN : undefined,
        SecurityGroupIds: output.SecurityGroupIds !== undefined && output.SecurityGroupIds !== null
            ? deserializeAws_json1_1SecurityGroupIdList(output.SecurityGroupIds, context)
            : undefined,
        SubnetIds: output.SubnetIds !== undefined && output.SubnetIds !== null
            ? deserializeAws_json1_1SubnetIdList(output.SubnetIds, context)
            : undefined,
        VpcId: output.VpcId !== undefined && output.VpcId !== null ? output.VpcId : undefined,
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
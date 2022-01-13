"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeAws_json1_1UpdateParallelDataCommand = exports.deserializeAws_json1_1TranslateTextCommand = exports.deserializeAws_json1_1StopTextTranslationJobCommand = exports.deserializeAws_json1_1StartTextTranslationJobCommand = exports.deserializeAws_json1_1ListTextTranslationJobsCommand = exports.deserializeAws_json1_1ListTerminologiesCommand = exports.deserializeAws_json1_1ListParallelDataCommand = exports.deserializeAws_json1_1ImportTerminologyCommand = exports.deserializeAws_json1_1GetTerminologyCommand = exports.deserializeAws_json1_1GetParallelDataCommand = exports.deserializeAws_json1_1DescribeTextTranslationJobCommand = exports.deserializeAws_json1_1DeleteTerminologyCommand = exports.deserializeAws_json1_1DeleteParallelDataCommand = exports.deserializeAws_json1_1CreateParallelDataCommand = exports.serializeAws_json1_1UpdateParallelDataCommand = exports.serializeAws_json1_1TranslateTextCommand = exports.serializeAws_json1_1StopTextTranslationJobCommand = exports.serializeAws_json1_1StartTextTranslationJobCommand = exports.serializeAws_json1_1ListTextTranslationJobsCommand = exports.serializeAws_json1_1ListTerminologiesCommand = exports.serializeAws_json1_1ListParallelDataCommand = exports.serializeAws_json1_1ImportTerminologyCommand = exports.serializeAws_json1_1GetTerminologyCommand = exports.serializeAws_json1_1GetParallelDataCommand = exports.serializeAws_json1_1DescribeTextTranslationJobCommand = exports.serializeAws_json1_1DeleteTerminologyCommand = exports.serializeAws_json1_1DeleteParallelDataCommand = exports.serializeAws_json1_1CreateParallelDataCommand = void 0;
const protocol_http_1 = require("@aws-sdk/protocol-http");
const uuid_1 = require("uuid");
const serializeAws_json1_1CreateParallelDataCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AWSShineFrontendService_20170701.CreateParallelData",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1CreateParallelDataRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1CreateParallelDataCommand = serializeAws_json1_1CreateParallelDataCommand;
const serializeAws_json1_1DeleteParallelDataCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AWSShineFrontendService_20170701.DeleteParallelData",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteParallelDataRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteParallelDataCommand = serializeAws_json1_1DeleteParallelDataCommand;
const serializeAws_json1_1DeleteTerminologyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AWSShineFrontendService_20170701.DeleteTerminology",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteTerminologyRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteTerminologyCommand = serializeAws_json1_1DeleteTerminologyCommand;
const serializeAws_json1_1DescribeTextTranslationJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AWSShineFrontendService_20170701.DescribeTextTranslationJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeTextTranslationJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeTextTranslationJobCommand = serializeAws_json1_1DescribeTextTranslationJobCommand;
const serializeAws_json1_1GetParallelDataCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AWSShineFrontendService_20170701.GetParallelData",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetParallelDataRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetParallelDataCommand = serializeAws_json1_1GetParallelDataCommand;
const serializeAws_json1_1GetTerminologyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AWSShineFrontendService_20170701.GetTerminology",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetTerminologyRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetTerminologyCommand = serializeAws_json1_1GetTerminologyCommand;
const serializeAws_json1_1ImportTerminologyCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AWSShineFrontendService_20170701.ImportTerminology",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ImportTerminologyRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ImportTerminologyCommand = serializeAws_json1_1ImportTerminologyCommand;
const serializeAws_json1_1ListParallelDataCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AWSShineFrontendService_20170701.ListParallelData",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListParallelDataRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListParallelDataCommand = serializeAws_json1_1ListParallelDataCommand;
const serializeAws_json1_1ListTerminologiesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AWSShineFrontendService_20170701.ListTerminologies",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListTerminologiesRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListTerminologiesCommand = serializeAws_json1_1ListTerminologiesCommand;
const serializeAws_json1_1ListTextTranslationJobsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AWSShineFrontendService_20170701.ListTextTranslationJobs",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListTextTranslationJobsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListTextTranslationJobsCommand = serializeAws_json1_1ListTextTranslationJobsCommand;
const serializeAws_json1_1StartTextTranslationJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AWSShineFrontendService_20170701.StartTextTranslationJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartTextTranslationJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartTextTranslationJobCommand = serializeAws_json1_1StartTextTranslationJobCommand;
const serializeAws_json1_1StopTextTranslationJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AWSShineFrontendService_20170701.StopTextTranslationJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StopTextTranslationJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StopTextTranslationJobCommand = serializeAws_json1_1StopTextTranslationJobCommand;
const serializeAws_json1_1TranslateTextCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AWSShineFrontendService_20170701.TranslateText",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1TranslateTextRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1TranslateTextCommand = serializeAws_json1_1TranslateTextCommand;
const serializeAws_json1_1UpdateParallelDataCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AWSShineFrontendService_20170701.UpdateParallelData",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1UpdateParallelDataRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1UpdateParallelDataCommand = serializeAws_json1_1UpdateParallelDataCommand;
const deserializeAws_json1_1CreateParallelDataCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1CreateParallelDataCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1CreateParallelDataResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1CreateParallelDataCommand = deserializeAws_json1_1CreateParallelDataCommand;
const deserializeAws_json1_1CreateParallelDataCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "ConflictException":
        case "com.amazonaws.translate#ConflictException":
            response = {
                ...(await deserializeAws_json1_1ConflictExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerException":
        case "com.amazonaws.translate#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterValueException":
        case "com.amazonaws.translate#InvalidParameterValueException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterValueExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.translate#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.translate#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.translate#TooManyRequestsException":
            response = {
                ...(await deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1DeleteParallelDataCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteParallelDataCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DeleteParallelDataResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteParallelDataCommand = deserializeAws_json1_1DeleteParallelDataCommand;
const deserializeAws_json1_1DeleteParallelDataCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "ConcurrentModificationException":
        case "com.amazonaws.translate#ConcurrentModificationException":
            response = {
                ...(await deserializeAws_json1_1ConcurrentModificationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerException":
        case "com.amazonaws.translate#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.translate#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.translate#TooManyRequestsException":
            response = {
                ...(await deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1DeleteTerminologyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteTerminologyCommandError(output, context);
    }
    await collectBody(output.body, context);
    const response = {
        $metadata: deserializeMetadata(output),
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteTerminologyCommand = deserializeAws_json1_1DeleteTerminologyCommand;
const deserializeAws_json1_1DeleteTerminologyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.translate#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterValueException":
        case "com.amazonaws.translate#InvalidParameterValueException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterValueExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.translate#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.translate#TooManyRequestsException":
            response = {
                ...(await deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1DescribeTextTranslationJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeTextTranslationJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeTextTranslationJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeTextTranslationJobCommand = deserializeAws_json1_1DescribeTextTranslationJobCommand;
const deserializeAws_json1_1DescribeTextTranslationJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.translate#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.translate#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.translate#TooManyRequestsException":
            response = {
                ...(await deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1GetParallelDataCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetParallelDataCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetParallelDataResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetParallelDataCommand = deserializeAws_json1_1GetParallelDataCommand;
const deserializeAws_json1_1GetParallelDataCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.translate#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterValueException":
        case "com.amazonaws.translate#InvalidParameterValueException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterValueExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.translate#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.translate#TooManyRequestsException":
            response = {
                ...(await deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1GetTerminologyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetTerminologyCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetTerminologyResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetTerminologyCommand = deserializeAws_json1_1GetTerminologyCommand;
const deserializeAws_json1_1GetTerminologyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.translate#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterValueException":
        case "com.amazonaws.translate#InvalidParameterValueException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterValueExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.translate#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.translate#TooManyRequestsException":
            response = {
                ...(await deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1ImportTerminologyCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ImportTerminologyCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ImportTerminologyResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ImportTerminologyCommand = deserializeAws_json1_1ImportTerminologyCommand;
const deserializeAws_json1_1ImportTerminologyCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.translate#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterValueException":
        case "com.amazonaws.translate#InvalidParameterValueException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterValueExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.translate#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.translate#TooManyRequestsException":
            response = {
                ...(await deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1ListParallelDataCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListParallelDataCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListParallelDataResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListParallelDataCommand = deserializeAws_json1_1ListParallelDataCommand;
const deserializeAws_json1_1ListParallelDataCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.translate#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterValueException":
        case "com.amazonaws.translate#InvalidParameterValueException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterValueExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.translate#TooManyRequestsException":
            response = {
                ...(await deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1ListTerminologiesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListTerminologiesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListTerminologiesResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListTerminologiesCommand = deserializeAws_json1_1ListTerminologiesCommand;
const deserializeAws_json1_1ListTerminologiesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.translate#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterValueException":
        case "com.amazonaws.translate#InvalidParameterValueException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterValueExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.translate#TooManyRequestsException":
            response = {
                ...(await deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1ListTextTranslationJobsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListTextTranslationJobsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListTextTranslationJobsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListTextTranslationJobsCommand = deserializeAws_json1_1ListTextTranslationJobsCommand;
const deserializeAws_json1_1ListTextTranslationJobsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.translate#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidFilterException":
        case "com.amazonaws.translate#InvalidFilterException":
            response = {
                ...(await deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.translate#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.translate#TooManyRequestsException":
            response = {
                ...(await deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1StartTextTranslationJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartTextTranslationJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartTextTranslationJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartTextTranslationJobCommand = deserializeAws_json1_1StartTextTranslationJobCommand;
const deserializeAws_json1_1StartTextTranslationJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.translate#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.translate#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.translate#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.translate#TooManyRequestsException":
            response = {
                ...(await deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnsupportedLanguagePairException":
        case "com.amazonaws.translate#UnsupportedLanguagePairException":
            response = {
                ...(await deserializeAws_json1_1UnsupportedLanguagePairExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1StopTextTranslationJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StopTextTranslationJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StopTextTranslationJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StopTextTranslationJobCommand = deserializeAws_json1_1StopTextTranslationJobCommand;
const deserializeAws_json1_1StopTextTranslationJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.translate#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.translate#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.translate#TooManyRequestsException":
            response = {
                ...(await deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1TranslateTextCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1TranslateTextCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1TranslateTextResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1TranslateTextCommand = deserializeAws_json1_1TranslateTextCommand;
const deserializeAws_json1_1TranslateTextCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "DetectedLanguageLowConfidenceException":
        case "com.amazonaws.translate#DetectedLanguageLowConfidenceException":
            response = {
                ...(await deserializeAws_json1_1DetectedLanguageLowConfidenceExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerException":
        case "com.amazonaws.translate#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.translate#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.translate#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceUnavailableException":
        case "com.amazonaws.translate#ServiceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TextSizeLimitExceededException":
        case "com.amazonaws.translate#TextSizeLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.translate#TooManyRequestsException":
            response = {
                ...(await deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnsupportedLanguagePairException":
        case "com.amazonaws.translate#UnsupportedLanguagePairException":
            response = {
                ...(await deserializeAws_json1_1UnsupportedLanguagePairExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1UpdateParallelDataCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1UpdateParallelDataCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1UpdateParallelDataResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1UpdateParallelDataCommand = deserializeAws_json1_1UpdateParallelDataCommand;
const deserializeAws_json1_1UpdateParallelDataCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "ConcurrentModificationException":
        case "com.amazonaws.translate#ConcurrentModificationException":
            response = {
                ...(await deserializeAws_json1_1ConcurrentModificationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ConflictException":
        case "com.amazonaws.translate#ConflictException":
            response = {
                ...(await deserializeAws_json1_1ConflictExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerException":
        case "com.amazonaws.translate#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterValueException":
        case "com.amazonaws.translate#InvalidParameterValueException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterValueExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.translate#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.translate#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.translate#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.translate#TooManyRequestsException":
            response = {
                ...(await deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1ConflictExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ConflictException(body, context);
    const contents = {
        name: "ConflictException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1DetectedLanguageLowConfidenceExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1DetectedLanguageLowConfidenceException(body, context);
    const contents = {
        name: "DetectedLanguageLowConfidenceException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1InternalServerExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1InternalServerException(body, context);
    const contents = {
        name: "InternalServerException",
        $fault: "server",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1InvalidFilterExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1InvalidFilterException(body, context);
    const contents = {
        name: "InvalidFilterException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1InvalidParameterValueExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1InvalidParameterValueException(body, context);
    const contents = {
        name: "InvalidParameterValueException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1InvalidRequestExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1InvalidRequestException(body, context);
    const contents = {
        name: "InvalidRequestException",
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
const deserializeAws_json1_1TextSizeLimitExceededExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1TextSizeLimitExceededException(body, context);
    const contents = {
        name: "TextSizeLimitExceededException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1TooManyRequestsExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1TooManyRequestsException(body, context);
    const contents = {
        name: "TooManyRequestsException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1UnsupportedLanguagePairExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1UnsupportedLanguagePairException(body, context);
    const contents = {
        name: "UnsupportedLanguagePairException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const serializeAws_json1_1CreateParallelDataRequest = (input, context) => {
    var _a;
    return {
        ClientToken: (_a = input.ClientToken) !== null && _a !== void 0 ? _a : uuid_1.v4(),
        ...(input.Description !== undefined && input.Description !== null && { Description: input.Description }),
        ...(input.EncryptionKey !== undefined &&
            input.EncryptionKey !== null && {
            EncryptionKey: serializeAws_json1_1EncryptionKey(input.EncryptionKey, context),
        }),
        ...(input.Name !== undefined && input.Name !== null && { Name: input.Name }),
        ...(input.ParallelDataConfig !== undefined &&
            input.ParallelDataConfig !== null && {
            ParallelDataConfig: serializeAws_json1_1ParallelDataConfig(input.ParallelDataConfig, context),
        }),
    };
};
const serializeAws_json1_1DeleteParallelDataRequest = (input, context) => {
    return {
        ...(input.Name !== undefined && input.Name !== null && { Name: input.Name }),
    };
};
const serializeAws_json1_1DeleteTerminologyRequest = (input, context) => {
    return {
        ...(input.Name !== undefined && input.Name !== null && { Name: input.Name }),
    };
};
const serializeAws_json1_1DescribeTextTranslationJobRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    };
};
const serializeAws_json1_1EncryptionKey = (input, context) => {
    return {
        ...(input.Id !== undefined && input.Id !== null && { Id: input.Id }),
        ...(input.Type !== undefined && input.Type !== null && { Type: input.Type }),
    };
};
const serializeAws_json1_1GetParallelDataRequest = (input, context) => {
    return {
        ...(input.Name !== undefined && input.Name !== null && { Name: input.Name }),
    };
};
const serializeAws_json1_1GetTerminologyRequest = (input, context) => {
    return {
        ...(input.Name !== undefined && input.Name !== null && { Name: input.Name }),
        ...(input.TerminologyDataFormat !== undefined &&
            input.TerminologyDataFormat !== null && { TerminologyDataFormat: input.TerminologyDataFormat }),
    };
};
const serializeAws_json1_1ImportTerminologyRequest = (input, context) => {
    return {
        ...(input.Description !== undefined && input.Description !== null && { Description: input.Description }),
        ...(input.EncryptionKey !== undefined &&
            input.EncryptionKey !== null && {
            EncryptionKey: serializeAws_json1_1EncryptionKey(input.EncryptionKey, context),
        }),
        ...(input.MergeStrategy !== undefined && input.MergeStrategy !== null && { MergeStrategy: input.MergeStrategy }),
        ...(input.Name !== undefined && input.Name !== null && { Name: input.Name }),
        ...(input.TerminologyData !== undefined &&
            input.TerminologyData !== null && {
            TerminologyData: serializeAws_json1_1TerminologyData(input.TerminologyData, context),
        }),
    };
};
const serializeAws_json1_1InputDataConfig = (input, context) => {
    return {
        ...(input.ContentType !== undefined && input.ContentType !== null && { ContentType: input.ContentType }),
        ...(input.S3Uri !== undefined && input.S3Uri !== null && { S3Uri: input.S3Uri }),
    };
};
const serializeAws_json1_1ListParallelDataRequest = (input, context) => {
    return {
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1ListTerminologiesRequest = (input, context) => {
    return {
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1ListTextTranslationJobsRequest = (input, context) => {
    return {
        ...(input.Filter !== undefined &&
            input.Filter !== null && { Filter: serializeAws_json1_1TextTranslationJobFilter(input.Filter, context) }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1OutputDataConfig = (input, context) => {
    return {
        ...(input.S3Uri !== undefined && input.S3Uri !== null && { S3Uri: input.S3Uri }),
    };
};
const serializeAws_json1_1ParallelDataConfig = (input, context) => {
    return {
        ...(input.Format !== undefined && input.Format !== null && { Format: input.Format }),
        ...(input.S3Uri !== undefined && input.S3Uri !== null && { S3Uri: input.S3Uri }),
    };
};
const serializeAws_json1_1ResourceNameList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1StartTextTranslationJobRequest = (input, context) => {
    var _a;
    return {
        ClientToken: (_a = input.ClientToken) !== null && _a !== void 0 ? _a : uuid_1.v4(),
        ...(input.DataAccessRoleArn !== undefined &&
            input.DataAccessRoleArn !== null && { DataAccessRoleArn: input.DataAccessRoleArn }),
        ...(input.InputDataConfig !== undefined &&
            input.InputDataConfig !== null && {
            InputDataConfig: serializeAws_json1_1InputDataConfig(input.InputDataConfig, context),
        }),
        ...(input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName }),
        ...(input.OutputDataConfig !== undefined &&
            input.OutputDataConfig !== null && {
            OutputDataConfig: serializeAws_json1_1OutputDataConfig(input.OutputDataConfig, context),
        }),
        ...(input.ParallelDataNames !== undefined &&
            input.ParallelDataNames !== null && {
            ParallelDataNames: serializeAws_json1_1ResourceNameList(input.ParallelDataNames, context),
        }),
        ...(input.SourceLanguageCode !== undefined &&
            input.SourceLanguageCode !== null && { SourceLanguageCode: input.SourceLanguageCode }),
        ...(input.TargetLanguageCodes !== undefined &&
            input.TargetLanguageCodes !== null && {
            TargetLanguageCodes: serializeAws_json1_1TargetLanguageCodeStringList(input.TargetLanguageCodes, context),
        }),
        ...(input.TerminologyNames !== undefined &&
            input.TerminologyNames !== null && {
            TerminologyNames: serializeAws_json1_1ResourceNameList(input.TerminologyNames, context),
        }),
    };
};
const serializeAws_json1_1StopTextTranslationJobRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    };
};
const serializeAws_json1_1TargetLanguageCodeStringList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1TerminologyData = (input, context) => {
    return {
        ...(input.File !== undefined && input.File !== null && { File: context.base64Encoder(input.File) }),
        ...(input.Format !== undefined && input.Format !== null && { Format: input.Format }),
    };
};
const serializeAws_json1_1TextTranslationJobFilter = (input, context) => {
    return {
        ...(input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName }),
        ...(input.JobStatus !== undefined && input.JobStatus !== null && { JobStatus: input.JobStatus }),
        ...(input.SubmittedAfterTime !== undefined &&
            input.SubmittedAfterTime !== null && {
            SubmittedAfterTime: Math.round(input.SubmittedAfterTime.getTime() / 1000),
        }),
        ...(input.SubmittedBeforeTime !== undefined &&
            input.SubmittedBeforeTime !== null && {
            SubmittedBeforeTime: Math.round(input.SubmittedBeforeTime.getTime() / 1000),
        }),
    };
};
const serializeAws_json1_1TranslateTextRequest = (input, context) => {
    return {
        ...(input.SourceLanguageCode !== undefined &&
            input.SourceLanguageCode !== null && { SourceLanguageCode: input.SourceLanguageCode }),
        ...(input.TargetLanguageCode !== undefined &&
            input.TargetLanguageCode !== null && { TargetLanguageCode: input.TargetLanguageCode }),
        ...(input.TerminologyNames !== undefined &&
            input.TerminologyNames !== null && {
            TerminologyNames: serializeAws_json1_1ResourceNameList(input.TerminologyNames, context),
        }),
        ...(input.Text !== undefined && input.Text !== null && { Text: input.Text }),
    };
};
const serializeAws_json1_1UpdateParallelDataRequest = (input, context) => {
    var _a;
    return {
        ClientToken: (_a = input.ClientToken) !== null && _a !== void 0 ? _a : uuid_1.v4(),
        ...(input.Description !== undefined && input.Description !== null && { Description: input.Description }),
        ...(input.Name !== undefined && input.Name !== null && { Name: input.Name }),
        ...(input.ParallelDataConfig !== undefined &&
            input.ParallelDataConfig !== null && {
            ParallelDataConfig: serializeAws_json1_1ParallelDataConfig(input.ParallelDataConfig, context),
        }),
    };
};
const deserializeAws_json1_1AppliedTerminology = (output, context) => {
    return {
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        Terms: output.Terms !== undefined && output.Terms !== null
            ? deserializeAws_json1_1TermList(output.Terms, context)
            : undefined,
    };
};
const deserializeAws_json1_1AppliedTerminologyList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1AppliedTerminology(entry, context);
    });
};
const deserializeAws_json1_1ConcurrentModificationException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1ConflictException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1CreateParallelDataResponse = (output, context) => {
    return {
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
    };
};
const deserializeAws_json1_1DeleteParallelDataResponse = (output, context) => {
    return {
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
    };
};
const deserializeAws_json1_1DescribeTextTranslationJobResponse = (output, context) => {
    return {
        TextTranslationJobProperties: output.TextTranslationJobProperties !== undefined && output.TextTranslationJobProperties !== null
            ? deserializeAws_json1_1TextTranslationJobProperties(output.TextTranslationJobProperties, context)
            : undefined,
    };
};
const deserializeAws_json1_1DetectedLanguageLowConfidenceException = (output, context) => {
    return {
        DetectedLanguageCode: output.DetectedLanguageCode !== undefined && output.DetectedLanguageCode !== null
            ? output.DetectedLanguageCode
            : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1EncryptionKey = (output, context) => {
    return {
        Id: output.Id !== undefined && output.Id !== null ? output.Id : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
const deserializeAws_json1_1GetParallelDataResponse = (output, context) => {
    return {
        AuxiliaryDataLocation: output.AuxiliaryDataLocation !== undefined && output.AuxiliaryDataLocation !== null
            ? deserializeAws_json1_1ParallelDataDataLocation(output.AuxiliaryDataLocation, context)
            : undefined,
        DataLocation: output.DataLocation !== undefined && output.DataLocation !== null
            ? deserializeAws_json1_1ParallelDataDataLocation(output.DataLocation, context)
            : undefined,
        LatestUpdateAttemptAuxiliaryDataLocation: output.LatestUpdateAttemptAuxiliaryDataLocation !== undefined &&
            output.LatestUpdateAttemptAuxiliaryDataLocation !== null
            ? deserializeAws_json1_1ParallelDataDataLocation(output.LatestUpdateAttemptAuxiliaryDataLocation, context)
            : undefined,
        ParallelDataProperties: output.ParallelDataProperties !== undefined && output.ParallelDataProperties !== null
            ? deserializeAws_json1_1ParallelDataProperties(output.ParallelDataProperties, context)
            : undefined,
    };
};
const deserializeAws_json1_1GetTerminologyResponse = (output, context) => {
    return {
        TerminologyDataLocation: output.TerminologyDataLocation !== undefined && output.TerminologyDataLocation !== null
            ? deserializeAws_json1_1TerminologyDataLocation(output.TerminologyDataLocation, context)
            : undefined,
        TerminologyProperties: output.TerminologyProperties !== undefined && output.TerminologyProperties !== null
            ? deserializeAws_json1_1TerminologyProperties(output.TerminologyProperties, context)
            : undefined,
    };
};
const deserializeAws_json1_1ImportTerminologyResponse = (output, context) => {
    return {
        TerminologyProperties: output.TerminologyProperties !== undefined && output.TerminologyProperties !== null
            ? deserializeAws_json1_1TerminologyProperties(output.TerminologyProperties, context)
            : undefined,
    };
};
const deserializeAws_json1_1InputDataConfig = (output, context) => {
    return {
        ContentType: output.ContentType !== undefined && output.ContentType !== null ? output.ContentType : undefined,
        S3Uri: output.S3Uri !== undefined && output.S3Uri !== null ? output.S3Uri : undefined,
    };
};
const deserializeAws_json1_1InternalServerException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1InvalidFilterException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1InvalidParameterValueException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1InvalidRequestException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1JobDetails = (output, context) => {
    return {
        DocumentsWithErrorsCount: output.DocumentsWithErrorsCount !== undefined && output.DocumentsWithErrorsCount !== null
            ? output.DocumentsWithErrorsCount
            : undefined,
        InputDocumentsCount: output.InputDocumentsCount !== undefined && output.InputDocumentsCount !== null
            ? output.InputDocumentsCount
            : undefined,
        TranslatedDocumentsCount: output.TranslatedDocumentsCount !== undefined && output.TranslatedDocumentsCount !== null
            ? output.TranslatedDocumentsCount
            : undefined,
    };
};
const deserializeAws_json1_1LanguageCodeStringList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1LimitExceededException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1ListParallelDataResponse = (output, context) => {
    return {
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        ParallelDataPropertiesList: output.ParallelDataPropertiesList !== undefined && output.ParallelDataPropertiesList !== null
            ? deserializeAws_json1_1ParallelDataPropertiesList(output.ParallelDataPropertiesList, context)
            : undefined,
    };
};
const deserializeAws_json1_1ListTerminologiesResponse = (output, context) => {
    return {
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        TerminologyPropertiesList: output.TerminologyPropertiesList !== undefined && output.TerminologyPropertiesList !== null
            ? deserializeAws_json1_1TerminologyPropertiesList(output.TerminologyPropertiesList, context)
            : undefined,
    };
};
const deserializeAws_json1_1ListTextTranslationJobsResponse = (output, context) => {
    return {
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        TextTranslationJobPropertiesList: output.TextTranslationJobPropertiesList !== undefined && output.TextTranslationJobPropertiesList !== null
            ? deserializeAws_json1_1TextTranslationJobPropertiesList(output.TextTranslationJobPropertiesList, context)
            : undefined,
    };
};
const deserializeAws_json1_1OutputDataConfig = (output, context) => {
    return {
        S3Uri: output.S3Uri !== undefined && output.S3Uri !== null ? output.S3Uri : undefined,
    };
};
const deserializeAws_json1_1ParallelDataConfig = (output, context) => {
    return {
        Format: output.Format !== undefined && output.Format !== null ? output.Format : undefined,
        S3Uri: output.S3Uri !== undefined && output.S3Uri !== null ? output.S3Uri : undefined,
    };
};
const deserializeAws_json1_1ParallelDataDataLocation = (output, context) => {
    return {
        Location: output.Location !== undefined && output.Location !== null ? output.Location : undefined,
        RepositoryType: output.RepositoryType !== undefined && output.RepositoryType !== null ? output.RepositoryType : undefined,
    };
};
const deserializeAws_json1_1ParallelDataProperties = (output, context) => {
    return {
        Arn: output.Arn !== undefined && output.Arn !== null ? output.Arn : undefined,
        CreatedAt: output.CreatedAt !== undefined && output.CreatedAt !== null
            ? new Date(Math.round(output.CreatedAt * 1000))
            : undefined,
        Description: output.Description !== undefined && output.Description !== null ? output.Description : undefined,
        EncryptionKey: output.EncryptionKey !== undefined && output.EncryptionKey !== null
            ? deserializeAws_json1_1EncryptionKey(output.EncryptionKey, context)
            : undefined,
        FailedRecordCount: output.FailedRecordCount !== undefined && output.FailedRecordCount !== null
            ? output.FailedRecordCount
            : undefined,
        ImportedDataSize: output.ImportedDataSize !== undefined && output.ImportedDataSize !== null ? output.ImportedDataSize : undefined,
        ImportedRecordCount: output.ImportedRecordCount !== undefined && output.ImportedRecordCount !== null
            ? output.ImportedRecordCount
            : undefined,
        LastUpdatedAt: output.LastUpdatedAt !== undefined && output.LastUpdatedAt !== null
            ? new Date(Math.round(output.LastUpdatedAt * 1000))
            : undefined,
        LatestUpdateAttemptAt: output.LatestUpdateAttemptAt !== undefined && output.LatestUpdateAttemptAt !== null
            ? new Date(Math.round(output.LatestUpdateAttemptAt * 1000))
            : undefined,
        LatestUpdateAttemptStatus: output.LatestUpdateAttemptStatus !== undefined && output.LatestUpdateAttemptStatus !== null
            ? output.LatestUpdateAttemptStatus
            : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        ParallelDataConfig: output.ParallelDataConfig !== undefined && output.ParallelDataConfig !== null
            ? deserializeAws_json1_1ParallelDataConfig(output.ParallelDataConfig, context)
            : undefined,
        SkippedRecordCount: output.SkippedRecordCount !== undefined && output.SkippedRecordCount !== null
            ? output.SkippedRecordCount
            : undefined,
        SourceLanguageCode: output.SourceLanguageCode !== undefined && output.SourceLanguageCode !== null
            ? output.SourceLanguageCode
            : undefined,
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
        TargetLanguageCodes: output.TargetLanguageCodes !== undefined && output.TargetLanguageCodes !== null
            ? deserializeAws_json1_1LanguageCodeStringList(output.TargetLanguageCodes, context)
            : undefined,
    };
};
const deserializeAws_json1_1ParallelDataPropertiesList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ParallelDataProperties(entry, context);
    });
};
const deserializeAws_json1_1ResourceNameList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1ResourceNotFoundException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1ServiceUnavailableException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1StartTextTranslationJobResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
const deserializeAws_json1_1StopTextTranslationJobResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
const deserializeAws_json1_1TargetLanguageCodeStringList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1Term = (output, context) => {
    return {
        SourceText: output.SourceText !== undefined && output.SourceText !== null ? output.SourceText : undefined,
        TargetText: output.TargetText !== undefined && output.TargetText !== null ? output.TargetText : undefined,
    };
};
const deserializeAws_json1_1TerminologyDataLocation = (output, context) => {
    return {
        Location: output.Location !== undefined && output.Location !== null ? output.Location : undefined,
        RepositoryType: output.RepositoryType !== undefined && output.RepositoryType !== null ? output.RepositoryType : undefined,
    };
};
const deserializeAws_json1_1TerminologyProperties = (output, context) => {
    return {
        Arn: output.Arn !== undefined && output.Arn !== null ? output.Arn : undefined,
        CreatedAt: output.CreatedAt !== undefined && output.CreatedAt !== null
            ? new Date(Math.round(output.CreatedAt * 1000))
            : undefined,
        Description: output.Description !== undefined && output.Description !== null ? output.Description : undefined,
        EncryptionKey: output.EncryptionKey !== undefined && output.EncryptionKey !== null
            ? deserializeAws_json1_1EncryptionKey(output.EncryptionKey, context)
            : undefined,
        LastUpdatedAt: output.LastUpdatedAt !== undefined && output.LastUpdatedAt !== null
            ? new Date(Math.round(output.LastUpdatedAt * 1000))
            : undefined,
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        SizeBytes: output.SizeBytes !== undefined && output.SizeBytes !== null ? output.SizeBytes : undefined,
        SourceLanguageCode: output.SourceLanguageCode !== undefined && output.SourceLanguageCode !== null
            ? output.SourceLanguageCode
            : undefined,
        TargetLanguageCodes: output.TargetLanguageCodes !== undefined && output.TargetLanguageCodes !== null
            ? deserializeAws_json1_1LanguageCodeStringList(output.TargetLanguageCodes, context)
            : undefined,
        TermCount: output.TermCount !== undefined && output.TermCount !== null ? output.TermCount : undefined,
    };
};
const deserializeAws_json1_1TerminologyPropertiesList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1TerminologyProperties(entry, context);
    });
};
const deserializeAws_json1_1TermList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Term(entry, context);
    });
};
const deserializeAws_json1_1TextSizeLimitExceededException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1TextTranslationJobProperties = (output, context) => {
    return {
        DataAccessRoleArn: output.DataAccessRoleArn !== undefined && output.DataAccessRoleArn !== null
            ? output.DataAccessRoleArn
            : undefined,
        EndTime: output.EndTime !== undefined && output.EndTime !== null ? new Date(Math.round(output.EndTime * 1000)) : undefined,
        InputDataConfig: output.InputDataConfig !== undefined && output.InputDataConfig !== null
            ? deserializeAws_json1_1InputDataConfig(output.InputDataConfig, context)
            : undefined,
        JobDetails: output.JobDetails !== undefined && output.JobDetails !== null
            ? deserializeAws_json1_1JobDetails(output.JobDetails, context)
            : undefined,
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobName: output.JobName !== undefined && output.JobName !== null ? output.JobName : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
        OutputDataConfig: output.OutputDataConfig !== undefined && output.OutputDataConfig !== null
            ? deserializeAws_json1_1OutputDataConfig(output.OutputDataConfig, context)
            : undefined,
        ParallelDataNames: output.ParallelDataNames !== undefined && output.ParallelDataNames !== null
            ? deserializeAws_json1_1ResourceNameList(output.ParallelDataNames, context)
            : undefined,
        SourceLanguageCode: output.SourceLanguageCode !== undefined && output.SourceLanguageCode !== null
            ? output.SourceLanguageCode
            : undefined,
        SubmittedTime: output.SubmittedTime !== undefined && output.SubmittedTime !== null
            ? new Date(Math.round(output.SubmittedTime * 1000))
            : undefined,
        TargetLanguageCodes: output.TargetLanguageCodes !== undefined && output.TargetLanguageCodes !== null
            ? deserializeAws_json1_1TargetLanguageCodeStringList(output.TargetLanguageCodes, context)
            : undefined,
        TerminologyNames: output.TerminologyNames !== undefined && output.TerminologyNames !== null
            ? deserializeAws_json1_1ResourceNameList(output.TerminologyNames, context)
            : undefined,
    };
};
const deserializeAws_json1_1TextTranslationJobPropertiesList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1TextTranslationJobProperties(entry, context);
    });
};
const deserializeAws_json1_1TooManyRequestsException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1TranslateTextResponse = (output, context) => {
    return {
        AppliedTerminologies: output.AppliedTerminologies !== undefined && output.AppliedTerminologies !== null
            ? deserializeAws_json1_1AppliedTerminologyList(output.AppliedTerminologies, context)
            : undefined,
        SourceLanguageCode: output.SourceLanguageCode !== undefined && output.SourceLanguageCode !== null
            ? output.SourceLanguageCode
            : undefined,
        TargetLanguageCode: output.TargetLanguageCode !== undefined && output.TargetLanguageCode !== null
            ? output.TargetLanguageCode
            : undefined,
        TranslatedText: output.TranslatedText !== undefined && output.TranslatedText !== null ? output.TranslatedText : undefined,
    };
};
const deserializeAws_json1_1UnsupportedLanguagePairException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
        SourceLanguageCode: output.SourceLanguageCode !== undefined && output.SourceLanguageCode !== null
            ? output.SourceLanguageCode
            : undefined,
        TargetLanguageCode: output.TargetLanguageCode !== undefined && output.TargetLanguageCode !== null
            ? output.TargetLanguageCode
            : undefined,
    };
};
const deserializeAws_json1_1UpdateParallelDataResponse = (output, context) => {
    return {
        LatestUpdateAttemptAt: output.LatestUpdateAttemptAt !== undefined && output.LatestUpdateAttemptAt !== null
            ? new Date(Math.round(output.LatestUpdateAttemptAt * 1000))
            : undefined,
        LatestUpdateAttemptStatus: output.LatestUpdateAttemptStatus !== undefined && output.LatestUpdateAttemptStatus !== null
            ? output.LatestUpdateAttemptStatus
            : undefined,
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
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
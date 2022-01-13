"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeAws_json1_1StartDocumentTextDetectionCommand = exports.deserializeAws_json1_1StartDocumentAnalysisCommand = exports.deserializeAws_json1_1GetDocumentTextDetectionCommand = exports.deserializeAws_json1_1GetDocumentAnalysisCommand = exports.deserializeAws_json1_1DetectDocumentTextCommand = exports.deserializeAws_json1_1AnalyzeDocumentCommand = exports.serializeAws_json1_1StartDocumentTextDetectionCommand = exports.serializeAws_json1_1StartDocumentAnalysisCommand = exports.serializeAws_json1_1GetDocumentTextDetectionCommand = exports.serializeAws_json1_1GetDocumentAnalysisCommand = exports.serializeAws_json1_1DetectDocumentTextCommand = exports.serializeAws_json1_1AnalyzeDocumentCommand = void 0;
const protocol_http_1 = require("@aws-sdk/protocol-http");
const smithy_client_1 = require("@aws-sdk/smithy-client");
const serializeAws_json1_1AnalyzeDocumentCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Textract.AnalyzeDocument",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1AnalyzeDocumentRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1AnalyzeDocumentCommand = serializeAws_json1_1AnalyzeDocumentCommand;
const serializeAws_json1_1DetectDocumentTextCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Textract.DetectDocumentText",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DetectDocumentTextRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DetectDocumentTextCommand = serializeAws_json1_1DetectDocumentTextCommand;
const serializeAws_json1_1GetDocumentAnalysisCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Textract.GetDocumentAnalysis",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetDocumentAnalysisRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetDocumentAnalysisCommand = serializeAws_json1_1GetDocumentAnalysisCommand;
const serializeAws_json1_1GetDocumentTextDetectionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Textract.GetDocumentTextDetection",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetDocumentTextDetectionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetDocumentTextDetectionCommand = serializeAws_json1_1GetDocumentTextDetectionCommand;
const serializeAws_json1_1StartDocumentAnalysisCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Textract.StartDocumentAnalysis",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartDocumentAnalysisRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartDocumentAnalysisCommand = serializeAws_json1_1StartDocumentAnalysisCommand;
const serializeAws_json1_1StartDocumentTextDetectionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Textract.StartDocumentTextDetection",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartDocumentTextDetectionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartDocumentTextDetectionCommand = serializeAws_json1_1StartDocumentTextDetectionCommand;
const deserializeAws_json1_1AnalyzeDocumentCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1AnalyzeDocumentCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1AnalyzeDocumentResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1AnalyzeDocumentCommand = deserializeAws_json1_1AnalyzeDocumentCommand;
const deserializeAws_json1_1AnalyzeDocumentCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.textract#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "BadDocumentException":
        case "com.amazonaws.textract#BadDocumentException":
            response = {
                ...(await deserializeAws_json1_1BadDocumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "DocumentTooLargeException":
        case "com.amazonaws.textract#DocumentTooLargeException":
            response = {
                ...(await deserializeAws_json1_1DocumentTooLargeExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "HumanLoopQuotaExceededException":
        case "com.amazonaws.textract#HumanLoopQuotaExceededException":
            response = {
                ...(await deserializeAws_json1_1HumanLoopQuotaExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.textract#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.textract#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.textract#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.textract#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.textract#ThrottlingException":
            response = {
                ...(await deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnsupportedDocumentException":
        case "com.amazonaws.textract#UnsupportedDocumentException":
            response = {
                ...(await deserializeAws_json1_1UnsupportedDocumentExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1DetectDocumentTextCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DetectDocumentTextCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DetectDocumentTextResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DetectDocumentTextCommand = deserializeAws_json1_1DetectDocumentTextCommand;
const deserializeAws_json1_1DetectDocumentTextCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.textract#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "BadDocumentException":
        case "com.amazonaws.textract#BadDocumentException":
            response = {
                ...(await deserializeAws_json1_1BadDocumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "DocumentTooLargeException":
        case "com.amazonaws.textract#DocumentTooLargeException":
            response = {
                ...(await deserializeAws_json1_1DocumentTooLargeExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.textract#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.textract#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.textract#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.textract#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.textract#ThrottlingException":
            response = {
                ...(await deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnsupportedDocumentException":
        case "com.amazonaws.textract#UnsupportedDocumentException":
            response = {
                ...(await deserializeAws_json1_1UnsupportedDocumentExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1GetDocumentAnalysisCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetDocumentAnalysisCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetDocumentAnalysisResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetDocumentAnalysisCommand = deserializeAws_json1_1GetDocumentAnalysisCommand;
const deserializeAws_json1_1GetDocumentAnalysisCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.textract#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.textract#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidJobIdException":
        case "com.amazonaws.textract#InvalidJobIdException":
            response = {
                ...(await deserializeAws_json1_1InvalidJobIdExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.textract#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.textract#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.textract#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.textract#ThrottlingException":
            response = {
                ...(await deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1GetDocumentTextDetectionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetDocumentTextDetectionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetDocumentTextDetectionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetDocumentTextDetectionCommand = deserializeAws_json1_1GetDocumentTextDetectionCommand;
const deserializeAws_json1_1GetDocumentTextDetectionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.textract#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.textract#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidJobIdException":
        case "com.amazonaws.textract#InvalidJobIdException":
            response = {
                ...(await deserializeAws_json1_1InvalidJobIdExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.textract#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.textract#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.textract#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.textract#ThrottlingException":
            response = {
                ...(await deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1StartDocumentAnalysisCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartDocumentAnalysisCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartDocumentAnalysisResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartDocumentAnalysisCommand = deserializeAws_json1_1StartDocumentAnalysisCommand;
const deserializeAws_json1_1StartDocumentAnalysisCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.textract#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "BadDocumentException":
        case "com.amazonaws.textract#BadDocumentException":
            response = {
                ...(await deserializeAws_json1_1BadDocumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "DocumentTooLargeException":
        case "com.amazonaws.textract#DocumentTooLargeException":
            response = {
                ...(await deserializeAws_json1_1DocumentTooLargeExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "IdempotentParameterMismatchException":
        case "com.amazonaws.textract#IdempotentParameterMismatchException":
            response = {
                ...(await deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.textract#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidKMSKeyException":
        case "com.amazonaws.textract#InvalidKMSKeyException":
            response = {
                ...(await deserializeAws_json1_1InvalidKMSKeyExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.textract#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.textract#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.textract#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.textract#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.textract#ThrottlingException":
            response = {
                ...(await deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnsupportedDocumentException":
        case "com.amazonaws.textract#UnsupportedDocumentException":
            response = {
                ...(await deserializeAws_json1_1UnsupportedDocumentExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1StartDocumentTextDetectionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartDocumentTextDetectionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartDocumentTextDetectionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartDocumentTextDetectionCommand = deserializeAws_json1_1StartDocumentTextDetectionCommand;
const deserializeAws_json1_1StartDocumentTextDetectionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.textract#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "BadDocumentException":
        case "com.amazonaws.textract#BadDocumentException":
            response = {
                ...(await deserializeAws_json1_1BadDocumentExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "DocumentTooLargeException":
        case "com.amazonaws.textract#DocumentTooLargeException":
            response = {
                ...(await deserializeAws_json1_1DocumentTooLargeExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "IdempotentParameterMismatchException":
        case "com.amazonaws.textract#IdempotentParameterMismatchException":
            response = {
                ...(await deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.textract#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidKMSKeyException":
        case "com.amazonaws.textract#InvalidKMSKeyException":
            response = {
                ...(await deserializeAws_json1_1InvalidKMSKeyExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.textract#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.textract#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.textract#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.textract#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.textract#ThrottlingException":
            response = {
                ...(await deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnsupportedDocumentException":
        case "com.amazonaws.textract#UnsupportedDocumentException":
            response = {
                ...(await deserializeAws_json1_1UnsupportedDocumentExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1AccessDeniedExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1AccessDeniedException(body, context);
    const contents = {
        name: "AccessDeniedException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1BadDocumentExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1BadDocumentException(body, context);
    const contents = {
        name: "BadDocumentException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1DocumentTooLargeExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1DocumentTooLargeException(body, context);
    const contents = {
        name: "DocumentTooLargeException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1HumanLoopQuotaExceededExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1HumanLoopQuotaExceededException(body, context);
    const contents = {
        name: "HumanLoopQuotaExceededException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1IdempotentParameterMismatchException(body, context);
    const contents = {
        name: "IdempotentParameterMismatchException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1InternalServerErrorResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1InternalServerError(body, context);
    const contents = {
        name: "InternalServerError",
        $fault: "server",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1InvalidJobIdExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1InvalidJobIdException(body, context);
    const contents = {
        name: "InvalidJobIdException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1InvalidKMSKeyExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1InvalidKMSKeyException(body, context);
    const contents = {
        name: "InvalidKMSKeyException",
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
const deserializeAws_json1_1InvalidS3ObjectExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1InvalidS3ObjectException(body, context);
    const contents = {
        name: "InvalidS3ObjectException",
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
const deserializeAws_json1_1ThrottlingExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ThrottlingException(body, context);
    const contents = {
        name: "ThrottlingException",
        $fault: "server",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1UnsupportedDocumentExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1UnsupportedDocumentException(body, context);
    const contents = {
        name: "UnsupportedDocumentException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const serializeAws_json1_1AnalyzeDocumentRequest = (input, context) => {
    return {
        ...(input.Document !== undefined &&
            input.Document !== null && { Document: serializeAws_json1_1Document(input.Document, context) }),
        ...(input.FeatureTypes !== undefined &&
            input.FeatureTypes !== null && { FeatureTypes: serializeAws_json1_1FeatureTypes(input.FeatureTypes, context) }),
        ...(input.HumanLoopConfig !== undefined &&
            input.HumanLoopConfig !== null && {
            HumanLoopConfig: serializeAws_json1_1HumanLoopConfig(input.HumanLoopConfig, context),
        }),
    };
};
const serializeAws_json1_1ContentClassifiers = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1DetectDocumentTextRequest = (input, context) => {
    return {
        ...(input.Document !== undefined &&
            input.Document !== null && { Document: serializeAws_json1_1Document(input.Document, context) }),
    };
};
const serializeAws_json1_1Document = (input, context) => {
    return {
        ...(input.Bytes !== undefined && input.Bytes !== null && { Bytes: context.base64Encoder(input.Bytes) }),
        ...(input.S3Object !== undefined &&
            input.S3Object !== null && { S3Object: serializeAws_json1_1S3Object(input.S3Object, context) }),
    };
};
const serializeAws_json1_1DocumentLocation = (input, context) => {
    return {
        ...(input.S3Object !== undefined &&
            input.S3Object !== null && { S3Object: serializeAws_json1_1S3Object(input.S3Object, context) }),
    };
};
const serializeAws_json1_1FeatureTypes = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1GetDocumentAnalysisRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1GetDocumentTextDetectionRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1HumanLoopConfig = (input, context) => {
    return {
        ...(input.DataAttributes !== undefined &&
            input.DataAttributes !== null && {
            DataAttributes: serializeAws_json1_1HumanLoopDataAttributes(input.DataAttributes, context),
        }),
        ...(input.FlowDefinitionArn !== undefined &&
            input.FlowDefinitionArn !== null && { FlowDefinitionArn: input.FlowDefinitionArn }),
        ...(input.HumanLoopName !== undefined && input.HumanLoopName !== null && { HumanLoopName: input.HumanLoopName }),
    };
};
const serializeAws_json1_1HumanLoopDataAttributes = (input, context) => {
    return {
        ...(input.ContentClassifiers !== undefined &&
            input.ContentClassifiers !== null && {
            ContentClassifiers: serializeAws_json1_1ContentClassifiers(input.ContentClassifiers, context),
        }),
    };
};
const serializeAws_json1_1NotificationChannel = (input, context) => {
    return {
        ...(input.RoleArn !== undefined && input.RoleArn !== null && { RoleArn: input.RoleArn }),
        ...(input.SNSTopicArn !== undefined && input.SNSTopicArn !== null && { SNSTopicArn: input.SNSTopicArn }),
    };
};
const serializeAws_json1_1OutputConfig = (input, context) => {
    return {
        ...(input.S3Bucket !== undefined && input.S3Bucket !== null && { S3Bucket: input.S3Bucket }),
        ...(input.S3Prefix !== undefined && input.S3Prefix !== null && { S3Prefix: input.S3Prefix }),
    };
};
const serializeAws_json1_1S3Object = (input, context) => {
    return {
        ...(input.Bucket !== undefined && input.Bucket !== null && { Bucket: input.Bucket }),
        ...(input.Name !== undefined && input.Name !== null && { Name: input.Name }),
        ...(input.Version !== undefined && input.Version !== null && { Version: input.Version }),
    };
};
const serializeAws_json1_1StartDocumentAnalysisRequest = (input, context) => {
    return {
        ...(input.ClientRequestToken !== undefined &&
            input.ClientRequestToken !== null && { ClientRequestToken: input.ClientRequestToken }),
        ...(input.DocumentLocation !== undefined &&
            input.DocumentLocation !== null && {
            DocumentLocation: serializeAws_json1_1DocumentLocation(input.DocumentLocation, context),
        }),
        ...(input.FeatureTypes !== undefined &&
            input.FeatureTypes !== null && { FeatureTypes: serializeAws_json1_1FeatureTypes(input.FeatureTypes, context) }),
        ...(input.JobTag !== undefined && input.JobTag !== null && { JobTag: input.JobTag }),
        ...(input.KMSKeyId !== undefined && input.KMSKeyId !== null && { KMSKeyId: input.KMSKeyId }),
        ...(input.NotificationChannel !== undefined &&
            input.NotificationChannel !== null && {
            NotificationChannel: serializeAws_json1_1NotificationChannel(input.NotificationChannel, context),
        }),
        ...(input.OutputConfig !== undefined &&
            input.OutputConfig !== null && { OutputConfig: serializeAws_json1_1OutputConfig(input.OutputConfig, context) }),
    };
};
const serializeAws_json1_1StartDocumentTextDetectionRequest = (input, context) => {
    return {
        ...(input.ClientRequestToken !== undefined &&
            input.ClientRequestToken !== null && { ClientRequestToken: input.ClientRequestToken }),
        ...(input.DocumentLocation !== undefined &&
            input.DocumentLocation !== null && {
            DocumentLocation: serializeAws_json1_1DocumentLocation(input.DocumentLocation, context),
        }),
        ...(input.JobTag !== undefined && input.JobTag !== null && { JobTag: input.JobTag }),
        ...(input.KMSKeyId !== undefined && input.KMSKeyId !== null && { KMSKeyId: input.KMSKeyId }),
        ...(input.NotificationChannel !== undefined &&
            input.NotificationChannel !== null && {
            NotificationChannel: serializeAws_json1_1NotificationChannel(input.NotificationChannel, context),
        }),
        ...(input.OutputConfig !== undefined &&
            input.OutputConfig !== null && { OutputConfig: serializeAws_json1_1OutputConfig(input.OutputConfig, context) }),
    };
};
const deserializeAws_json1_1AccessDeniedException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1AnalyzeDocumentResponse = (output, context) => {
    return {
        AnalyzeDocumentModelVersion: output.AnalyzeDocumentModelVersion !== undefined && output.AnalyzeDocumentModelVersion !== null
            ? output.AnalyzeDocumentModelVersion
            : undefined,
        Blocks: output.Blocks !== undefined && output.Blocks !== null
            ? deserializeAws_json1_1BlockList(output.Blocks, context)
            : undefined,
        DocumentMetadata: output.DocumentMetadata !== undefined && output.DocumentMetadata !== null
            ? deserializeAws_json1_1DocumentMetadata(output.DocumentMetadata, context)
            : undefined,
        HumanLoopActivationOutput: output.HumanLoopActivationOutput !== undefined && output.HumanLoopActivationOutput !== null
            ? deserializeAws_json1_1HumanLoopActivationOutput(output.HumanLoopActivationOutput, context)
            : undefined,
    };
};
const deserializeAws_json1_1BadDocumentException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1Block = (output, context) => {
    return {
        BlockType: output.BlockType !== undefined && output.BlockType !== null ? output.BlockType : undefined,
        ColumnIndex: output.ColumnIndex !== undefined && output.ColumnIndex !== null ? output.ColumnIndex : undefined,
        ColumnSpan: output.ColumnSpan !== undefined && output.ColumnSpan !== null ? output.ColumnSpan : undefined,
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        EntityTypes: output.EntityTypes !== undefined && output.EntityTypes !== null
            ? deserializeAws_json1_1EntityTypes(output.EntityTypes, context)
            : undefined,
        Geometry: output.Geometry !== undefined && output.Geometry !== null
            ? deserializeAws_json1_1Geometry(output.Geometry, context)
            : undefined,
        Id: output.Id !== undefined && output.Id !== null ? output.Id : undefined,
        Page: output.Page !== undefined && output.Page !== null ? output.Page : undefined,
        Relationships: output.Relationships !== undefined && output.Relationships !== null
            ? deserializeAws_json1_1RelationshipList(output.Relationships, context)
            : undefined,
        RowIndex: output.RowIndex !== undefined && output.RowIndex !== null ? output.RowIndex : undefined,
        RowSpan: output.RowSpan !== undefined && output.RowSpan !== null ? output.RowSpan : undefined,
        SelectionStatus: output.SelectionStatus !== undefined && output.SelectionStatus !== null ? output.SelectionStatus : undefined,
        Text: output.Text !== undefined && output.Text !== null ? output.Text : undefined,
        TextType: output.TextType !== undefined && output.TextType !== null ? output.TextType : undefined,
    };
};
const deserializeAws_json1_1BlockList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Block(entry, context);
    });
};
const deserializeAws_json1_1BoundingBox = (output, context) => {
    return {
        Height: output.Height !== undefined && output.Height !== null ? output.Height : undefined,
        Left: output.Left !== undefined && output.Left !== null ? output.Left : undefined,
        Top: output.Top !== undefined && output.Top !== null ? output.Top : undefined,
        Width: output.Width !== undefined && output.Width !== null ? output.Width : undefined,
    };
};
const deserializeAws_json1_1DetectDocumentTextResponse = (output, context) => {
    return {
        Blocks: output.Blocks !== undefined && output.Blocks !== null
            ? deserializeAws_json1_1BlockList(output.Blocks, context)
            : undefined,
        DetectDocumentTextModelVersion: output.DetectDocumentTextModelVersion !== undefined && output.DetectDocumentTextModelVersion !== null
            ? output.DetectDocumentTextModelVersion
            : undefined,
        DocumentMetadata: output.DocumentMetadata !== undefined && output.DocumentMetadata !== null
            ? deserializeAws_json1_1DocumentMetadata(output.DocumentMetadata, context)
            : undefined,
    };
};
const deserializeAws_json1_1DocumentMetadata = (output, context) => {
    return {
        Pages: output.Pages !== undefined && output.Pages !== null ? output.Pages : undefined,
    };
};
const deserializeAws_json1_1DocumentTooLargeException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1EntityTypes = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1Geometry = (output, context) => {
    return {
        BoundingBox: output.BoundingBox !== undefined && output.BoundingBox !== null
            ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
            : undefined,
        Polygon: output.Polygon !== undefined && output.Polygon !== null
            ? deserializeAws_json1_1Polygon(output.Polygon, context)
            : undefined,
    };
};
const deserializeAws_json1_1GetDocumentAnalysisResponse = (output, context) => {
    return {
        AnalyzeDocumentModelVersion: output.AnalyzeDocumentModelVersion !== undefined && output.AnalyzeDocumentModelVersion !== null
            ? output.AnalyzeDocumentModelVersion
            : undefined,
        Blocks: output.Blocks !== undefined && output.Blocks !== null
            ? deserializeAws_json1_1BlockList(output.Blocks, context)
            : undefined,
        DocumentMetadata: output.DocumentMetadata !== undefined && output.DocumentMetadata !== null
            ? deserializeAws_json1_1DocumentMetadata(output.DocumentMetadata, context)
            : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        StatusMessage: output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
        Warnings: output.Warnings !== undefined && output.Warnings !== null
            ? deserializeAws_json1_1Warnings(output.Warnings, context)
            : undefined,
    };
};
const deserializeAws_json1_1GetDocumentTextDetectionResponse = (output, context) => {
    return {
        Blocks: output.Blocks !== undefined && output.Blocks !== null
            ? deserializeAws_json1_1BlockList(output.Blocks, context)
            : undefined,
        DetectDocumentTextModelVersion: output.DetectDocumentTextModelVersion !== undefined && output.DetectDocumentTextModelVersion !== null
            ? output.DetectDocumentTextModelVersion
            : undefined,
        DocumentMetadata: output.DocumentMetadata !== undefined && output.DocumentMetadata !== null
            ? deserializeAws_json1_1DocumentMetadata(output.DocumentMetadata, context)
            : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        StatusMessage: output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
        Warnings: output.Warnings !== undefined && output.Warnings !== null
            ? deserializeAws_json1_1Warnings(output.Warnings, context)
            : undefined,
    };
};
const deserializeAws_json1_1HumanLoopActivationOutput = (output, context) => {
    return {
        HumanLoopActivationConditionsEvaluationResults: output.HumanLoopActivationConditionsEvaluationResults !== undefined &&
            output.HumanLoopActivationConditionsEvaluationResults !== null
            ? new smithy_client_1.LazyJsonString(output.HumanLoopActivationConditionsEvaluationResults)
            : undefined,
        HumanLoopActivationReasons: output.HumanLoopActivationReasons !== undefined && output.HumanLoopActivationReasons !== null
            ? deserializeAws_json1_1HumanLoopActivationReasons(output.HumanLoopActivationReasons, context)
            : undefined,
        HumanLoopArn: output.HumanLoopArn !== undefined && output.HumanLoopArn !== null ? output.HumanLoopArn : undefined,
    };
};
const deserializeAws_json1_1HumanLoopActivationReasons = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1HumanLoopQuotaExceededException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
        QuotaCode: output.QuotaCode !== undefined && output.QuotaCode !== null ? output.QuotaCode : undefined,
        ResourceType: output.ResourceType !== undefined && output.ResourceType !== null ? output.ResourceType : undefined,
        ServiceCode: output.ServiceCode !== undefined && output.ServiceCode !== null ? output.ServiceCode : undefined,
    };
};
const deserializeAws_json1_1IdempotentParameterMismatchException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1IdList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1InternalServerError = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1InvalidJobIdException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1InvalidKMSKeyException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1InvalidParameterException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1InvalidS3ObjectException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1LimitExceededException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1Pages = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1Point = (output, context) => {
    return {
        X: output.X !== undefined && output.X !== null ? output.X : undefined,
        Y: output.Y !== undefined && output.Y !== null ? output.Y : undefined,
    };
};
const deserializeAws_json1_1Polygon = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Point(entry, context);
    });
};
const deserializeAws_json1_1ProvisionedThroughputExceededException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1Relationship = (output, context) => {
    return {
        Ids: output.Ids !== undefined && output.Ids !== null ? deserializeAws_json1_1IdList(output.Ids, context) : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
const deserializeAws_json1_1RelationshipList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Relationship(entry, context);
    });
};
const deserializeAws_json1_1StartDocumentAnalysisResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
    };
};
const deserializeAws_json1_1StartDocumentTextDetectionResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
    };
};
const deserializeAws_json1_1ThrottlingException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1UnsupportedDocumentException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1Warning = (output, context) => {
    return {
        ErrorCode: output.ErrorCode !== undefined && output.ErrorCode !== null ? output.ErrorCode : undefined,
        Pages: output.Pages !== undefined && output.Pages !== null
            ? deserializeAws_json1_1Pages(output.Pages, context)
            : undefined,
    };
};
const deserializeAws_json1_1Warnings = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Warning(entry, context);
    });
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
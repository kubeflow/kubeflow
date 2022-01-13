"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeAws_restJson1SynthesizeSpeechCommand = exports.deserializeAws_restJson1StartSpeechSynthesisTaskCommand = exports.deserializeAws_restJson1PutLexiconCommand = exports.deserializeAws_restJson1ListSpeechSynthesisTasksCommand = exports.deserializeAws_restJson1ListLexiconsCommand = exports.deserializeAws_restJson1GetSpeechSynthesisTaskCommand = exports.deserializeAws_restJson1GetLexiconCommand = exports.deserializeAws_restJson1DescribeVoicesCommand = exports.deserializeAws_restJson1DeleteLexiconCommand = exports.serializeAws_restJson1SynthesizeSpeechCommand = exports.serializeAws_restJson1StartSpeechSynthesisTaskCommand = exports.serializeAws_restJson1PutLexiconCommand = exports.serializeAws_restJson1ListSpeechSynthesisTasksCommand = exports.serializeAws_restJson1ListLexiconsCommand = exports.serializeAws_restJson1GetSpeechSynthesisTaskCommand = exports.serializeAws_restJson1GetLexiconCommand = exports.serializeAws_restJson1DescribeVoicesCommand = exports.serializeAws_restJson1DeleteLexiconCommand = void 0;
const protocol_http_1 = require("@aws-sdk/protocol-http");
const smithy_client_1 = require("@aws-sdk/smithy-client");
const serializeAws_restJson1DeleteLexiconCommand = async (input, context) => {
    const headers = {};
    let resolvedPath = "/v1/lexicons/{Name}";
    if (input.Name !== undefined) {
        const labelValue = input.Name;
        if (labelValue.length <= 0) {
            throw new Error("Empty value provided for input HTTP label: Name.");
        }
        resolvedPath = resolvedPath.replace("{Name}", smithy_client_1.extendedEncodeURIComponent(labelValue));
    }
    else {
        throw new Error("No value provided for input HTTP label: Name.");
    }
    let body;
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "DELETE",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1DeleteLexiconCommand = serializeAws_restJson1DeleteLexiconCommand;
const serializeAws_restJson1DescribeVoicesCommand = async (input, context) => {
    const headers = {};
    let resolvedPath = "/v1/voices";
    const query = {
        ...(input.Engine !== undefined && { Engine: input.Engine }),
        ...(input.LanguageCode !== undefined && { LanguageCode: input.LanguageCode }),
        ...(input.IncludeAdditionalLanguageCodes !== undefined && {
            IncludeAdditionalLanguageCodes: input.IncludeAdditionalLanguageCodes.toString(),
        }),
        ...(input.NextToken !== undefined && { NextToken: input.NextToken }),
    };
    let body;
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "GET",
        headers,
        path: resolvedPath,
        query,
        body,
    });
};
exports.serializeAws_restJson1DescribeVoicesCommand = serializeAws_restJson1DescribeVoicesCommand;
const serializeAws_restJson1GetLexiconCommand = async (input, context) => {
    const headers = {};
    let resolvedPath = "/v1/lexicons/{Name}";
    if (input.Name !== undefined) {
        const labelValue = input.Name;
        if (labelValue.length <= 0) {
            throw new Error("Empty value provided for input HTTP label: Name.");
        }
        resolvedPath = resolvedPath.replace("{Name}", smithy_client_1.extendedEncodeURIComponent(labelValue));
    }
    else {
        throw new Error("No value provided for input HTTP label: Name.");
    }
    let body;
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "GET",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1GetLexiconCommand = serializeAws_restJson1GetLexiconCommand;
const serializeAws_restJson1GetSpeechSynthesisTaskCommand = async (input, context) => {
    const headers = {};
    let resolvedPath = "/v1/synthesisTasks/{TaskId}";
    if (input.TaskId !== undefined) {
        const labelValue = input.TaskId;
        if (labelValue.length <= 0) {
            throw new Error("Empty value provided for input HTTP label: TaskId.");
        }
        resolvedPath = resolvedPath.replace("{TaskId}", smithy_client_1.extendedEncodeURIComponent(labelValue));
    }
    else {
        throw new Error("No value provided for input HTTP label: TaskId.");
    }
    let body;
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "GET",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1GetSpeechSynthesisTaskCommand = serializeAws_restJson1GetSpeechSynthesisTaskCommand;
const serializeAws_restJson1ListLexiconsCommand = async (input, context) => {
    const headers = {};
    let resolvedPath = "/v1/lexicons";
    const query = {
        ...(input.NextToken !== undefined && { NextToken: input.NextToken }),
    };
    let body;
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "GET",
        headers,
        path: resolvedPath,
        query,
        body,
    });
};
exports.serializeAws_restJson1ListLexiconsCommand = serializeAws_restJson1ListLexiconsCommand;
const serializeAws_restJson1ListSpeechSynthesisTasksCommand = async (input, context) => {
    const headers = {};
    let resolvedPath = "/v1/synthesisTasks";
    const query = {
        ...(input.MaxResults !== undefined && { MaxResults: input.MaxResults.toString() }),
        ...(input.NextToken !== undefined && { NextToken: input.NextToken }),
        ...(input.Status !== undefined && { Status: input.Status }),
    };
    let body;
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "GET",
        headers,
        path: resolvedPath,
        query,
        body,
    });
};
exports.serializeAws_restJson1ListSpeechSynthesisTasksCommand = serializeAws_restJson1ListSpeechSynthesisTasksCommand;
const serializeAws_restJson1PutLexiconCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/v1/lexicons/{Name}";
    if (input.Name !== undefined) {
        const labelValue = input.Name;
        if (labelValue.length <= 0) {
            throw new Error("Empty value provided for input HTTP label: Name.");
        }
        resolvedPath = resolvedPath.replace("{Name}", smithy_client_1.extendedEncodeURIComponent(labelValue));
    }
    else {
        throw new Error("No value provided for input HTTP label: Name.");
    }
    let body;
    body = JSON.stringify({
        ...(input.Content !== undefined && input.Content !== null && { Content: input.Content }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "PUT",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1PutLexiconCommand = serializeAws_restJson1PutLexiconCommand;
const serializeAws_restJson1StartSpeechSynthesisTaskCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/v1/synthesisTasks";
    let body;
    body = JSON.stringify({
        ...(input.Engine !== undefined && input.Engine !== null && { Engine: input.Engine }),
        ...(input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode }),
        ...(input.LexiconNames !== undefined &&
            input.LexiconNames !== null && {
            LexiconNames: serializeAws_restJson1LexiconNameList(input.LexiconNames, context),
        }),
        ...(input.OutputFormat !== undefined && input.OutputFormat !== null && { OutputFormat: input.OutputFormat }),
        ...(input.OutputS3BucketName !== undefined &&
            input.OutputS3BucketName !== null && { OutputS3BucketName: input.OutputS3BucketName }),
        ...(input.OutputS3KeyPrefix !== undefined &&
            input.OutputS3KeyPrefix !== null && { OutputS3KeyPrefix: input.OutputS3KeyPrefix }),
        ...(input.SampleRate !== undefined && input.SampleRate !== null && { SampleRate: input.SampleRate }),
        ...(input.SnsTopicArn !== undefined && input.SnsTopicArn !== null && { SnsTopicArn: input.SnsTopicArn }),
        ...(input.SpeechMarkTypes !== undefined &&
            input.SpeechMarkTypes !== null && {
            SpeechMarkTypes: serializeAws_restJson1SpeechMarkTypeList(input.SpeechMarkTypes, context),
        }),
        ...(input.Text !== undefined && input.Text !== null && { Text: input.Text }),
        ...(input.TextType !== undefined && input.TextType !== null && { TextType: input.TextType }),
        ...(input.VoiceId !== undefined && input.VoiceId !== null && { VoiceId: input.VoiceId }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1StartSpeechSynthesisTaskCommand = serializeAws_restJson1StartSpeechSynthesisTaskCommand;
const serializeAws_restJson1SynthesizeSpeechCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/v1/speech";
    let body;
    body = JSON.stringify({
        ...(input.Engine !== undefined && input.Engine !== null && { Engine: input.Engine }),
        ...(input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode }),
        ...(input.LexiconNames !== undefined &&
            input.LexiconNames !== null && {
            LexiconNames: serializeAws_restJson1LexiconNameList(input.LexiconNames, context),
        }),
        ...(input.OutputFormat !== undefined && input.OutputFormat !== null && { OutputFormat: input.OutputFormat }),
        ...(input.SampleRate !== undefined && input.SampleRate !== null && { SampleRate: input.SampleRate }),
        ...(input.SpeechMarkTypes !== undefined &&
            input.SpeechMarkTypes !== null && {
            SpeechMarkTypes: serializeAws_restJson1SpeechMarkTypeList(input.SpeechMarkTypes, context),
        }),
        ...(input.Text !== undefined && input.Text !== null && { Text: input.Text }),
        ...(input.TextType !== undefined && input.TextType !== null && { TextType: input.TextType }),
        ...(input.VoiceId !== undefined && input.VoiceId !== null && { VoiceId: input.VoiceId }),
    });
    const { hostname, protocol = "https", port } = await context.endpoint();
    return new protocol_http_1.HttpRequest({
        protocol,
        hostname,
        port,
        method: "POST",
        headers,
        path: resolvedPath,
        body,
    });
};
exports.serializeAws_restJson1SynthesizeSpeechCommand = serializeAws_restJson1SynthesizeSpeechCommand;
const deserializeAws_restJson1DeleteLexiconCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1DeleteLexiconCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1DeleteLexiconCommand = deserializeAws_restJson1DeleteLexiconCommand;
const deserializeAws_restJson1DeleteLexiconCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "LexiconNotFoundException":
        case "com.amazonaws.polly#LexiconNotFoundException":
            response = {
                ...(await deserializeAws_restJson1LexiconNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceFailureException":
        case "com.amazonaws.polly#ServiceFailureException":
            response = {
                ...(await deserializeAws_restJson1ServiceFailureExceptionResponse(parsedOutput, context)),
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
const deserializeAws_restJson1DescribeVoicesCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1DescribeVoicesCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        NextToken: undefined,
        Voices: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.NextToken !== undefined && data.NextToken !== null) {
        contents.NextToken = data.NextToken;
    }
    if (data.Voices !== undefined && data.Voices !== null) {
        contents.Voices = deserializeAws_restJson1VoiceList(data.Voices, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1DescribeVoicesCommand = deserializeAws_restJson1DescribeVoicesCommand;
const deserializeAws_restJson1DescribeVoicesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidNextTokenException":
        case "com.amazonaws.polly#InvalidNextTokenException":
            response = {
                ...(await deserializeAws_restJson1InvalidNextTokenExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceFailureException":
        case "com.amazonaws.polly#ServiceFailureException":
            response = {
                ...(await deserializeAws_restJson1ServiceFailureExceptionResponse(parsedOutput, context)),
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
const deserializeAws_restJson1GetLexiconCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetLexiconCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        Lexicon: undefined,
        LexiconAttributes: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.Lexicon !== undefined && data.Lexicon !== null) {
        contents.Lexicon = deserializeAws_restJson1Lexicon(data.Lexicon, context);
    }
    if (data.LexiconAttributes !== undefined && data.LexiconAttributes !== null) {
        contents.LexiconAttributes = deserializeAws_restJson1LexiconAttributes(data.LexiconAttributes, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetLexiconCommand = deserializeAws_restJson1GetLexiconCommand;
const deserializeAws_restJson1GetLexiconCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "LexiconNotFoundException":
        case "com.amazonaws.polly#LexiconNotFoundException":
            response = {
                ...(await deserializeAws_restJson1LexiconNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceFailureException":
        case "com.amazonaws.polly#ServiceFailureException":
            response = {
                ...(await deserializeAws_restJson1ServiceFailureExceptionResponse(parsedOutput, context)),
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
const deserializeAws_restJson1GetSpeechSynthesisTaskCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1GetSpeechSynthesisTaskCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        SynthesisTask: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.SynthesisTask !== undefined && data.SynthesisTask !== null) {
        contents.SynthesisTask = deserializeAws_restJson1SynthesisTask(data.SynthesisTask, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1GetSpeechSynthesisTaskCommand = deserializeAws_restJson1GetSpeechSynthesisTaskCommand;
const deserializeAws_restJson1GetSpeechSynthesisTaskCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidTaskIdException":
        case "com.amazonaws.polly#InvalidTaskIdException":
            response = {
                ...(await deserializeAws_restJson1InvalidTaskIdExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceFailureException":
        case "com.amazonaws.polly#ServiceFailureException":
            response = {
                ...(await deserializeAws_restJson1ServiceFailureExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "SynthesisTaskNotFoundException":
        case "com.amazonaws.polly#SynthesisTaskNotFoundException":
            response = {
                ...(await deserializeAws_restJson1SynthesisTaskNotFoundExceptionResponse(parsedOutput, context)),
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
const deserializeAws_restJson1ListLexiconsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ListLexiconsCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        Lexicons: undefined,
        NextToken: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.Lexicons !== undefined && data.Lexicons !== null) {
        contents.Lexicons = deserializeAws_restJson1LexiconDescriptionList(data.Lexicons, context);
    }
    if (data.NextToken !== undefined && data.NextToken !== null) {
        contents.NextToken = data.NextToken;
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ListLexiconsCommand = deserializeAws_restJson1ListLexiconsCommand;
const deserializeAws_restJson1ListLexiconsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidNextTokenException":
        case "com.amazonaws.polly#InvalidNextTokenException":
            response = {
                ...(await deserializeAws_restJson1InvalidNextTokenExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceFailureException":
        case "com.amazonaws.polly#ServiceFailureException":
            response = {
                ...(await deserializeAws_restJson1ServiceFailureExceptionResponse(parsedOutput, context)),
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
const deserializeAws_restJson1ListSpeechSynthesisTasksCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1ListSpeechSynthesisTasksCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        NextToken: undefined,
        SynthesisTasks: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.NextToken !== undefined && data.NextToken !== null) {
        contents.NextToken = data.NextToken;
    }
    if (data.SynthesisTasks !== undefined && data.SynthesisTasks !== null) {
        contents.SynthesisTasks = deserializeAws_restJson1SynthesisTasks(data.SynthesisTasks, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1ListSpeechSynthesisTasksCommand = deserializeAws_restJson1ListSpeechSynthesisTasksCommand;
const deserializeAws_restJson1ListSpeechSynthesisTasksCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidNextTokenException":
        case "com.amazonaws.polly#InvalidNextTokenException":
            response = {
                ...(await deserializeAws_restJson1InvalidNextTokenExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceFailureException":
        case "com.amazonaws.polly#ServiceFailureException":
            response = {
                ...(await deserializeAws_restJson1ServiceFailureExceptionResponse(parsedOutput, context)),
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
const deserializeAws_restJson1PutLexiconCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1PutLexiconCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1PutLexiconCommand = deserializeAws_restJson1PutLexiconCommand;
const deserializeAws_restJson1PutLexiconCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidLexiconException":
        case "com.amazonaws.polly#InvalidLexiconException":
            response = {
                ...(await deserializeAws_restJson1InvalidLexiconExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LexiconSizeExceededException":
        case "com.amazonaws.polly#LexiconSizeExceededException":
            response = {
                ...(await deserializeAws_restJson1LexiconSizeExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "MaxLexemeLengthExceededException":
        case "com.amazonaws.polly#MaxLexemeLengthExceededException":
            response = {
                ...(await deserializeAws_restJson1MaxLexemeLengthExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "MaxLexiconsNumberExceededException":
        case "com.amazonaws.polly#MaxLexiconsNumberExceededException":
            response = {
                ...(await deserializeAws_restJson1MaxLexiconsNumberExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceFailureException":
        case "com.amazonaws.polly#ServiceFailureException":
            response = {
                ...(await deserializeAws_restJson1ServiceFailureExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnsupportedPlsAlphabetException":
        case "com.amazonaws.polly#UnsupportedPlsAlphabetException":
            response = {
                ...(await deserializeAws_restJson1UnsupportedPlsAlphabetExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnsupportedPlsLanguageException":
        case "com.amazonaws.polly#UnsupportedPlsLanguageException":
            response = {
                ...(await deserializeAws_restJson1UnsupportedPlsLanguageExceptionResponse(parsedOutput, context)),
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
const deserializeAws_restJson1StartSpeechSynthesisTaskCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1StartSpeechSynthesisTaskCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        SynthesisTask: undefined,
    };
    const data = await parseBody(output.body, context);
    if (data.SynthesisTask !== undefined && data.SynthesisTask !== null) {
        contents.SynthesisTask = deserializeAws_restJson1SynthesisTask(data.SynthesisTask, context);
    }
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1StartSpeechSynthesisTaskCommand = deserializeAws_restJson1StartSpeechSynthesisTaskCommand;
const deserializeAws_restJson1StartSpeechSynthesisTaskCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "EngineNotSupportedException":
        case "com.amazonaws.polly#EngineNotSupportedException":
            response = {
                ...(await deserializeAws_restJson1EngineNotSupportedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3BucketException":
        case "com.amazonaws.polly#InvalidS3BucketException":
            response = {
                ...(await deserializeAws_restJson1InvalidS3BucketExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3KeyException":
        case "com.amazonaws.polly#InvalidS3KeyException":
            response = {
                ...(await deserializeAws_restJson1InvalidS3KeyExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidSampleRateException":
        case "com.amazonaws.polly#InvalidSampleRateException":
            response = {
                ...(await deserializeAws_restJson1InvalidSampleRateExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidSnsTopicArnException":
        case "com.amazonaws.polly#InvalidSnsTopicArnException":
            response = {
                ...(await deserializeAws_restJson1InvalidSnsTopicArnExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidSsmlException":
        case "com.amazonaws.polly#InvalidSsmlException":
            response = {
                ...(await deserializeAws_restJson1InvalidSsmlExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LanguageNotSupportedException":
        case "com.amazonaws.polly#LanguageNotSupportedException":
            response = {
                ...(await deserializeAws_restJson1LanguageNotSupportedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LexiconNotFoundException":
        case "com.amazonaws.polly#LexiconNotFoundException":
            response = {
                ...(await deserializeAws_restJson1LexiconNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "MarksNotSupportedForFormatException":
        case "com.amazonaws.polly#MarksNotSupportedForFormatException":
            response = {
                ...(await deserializeAws_restJson1MarksNotSupportedForFormatExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceFailureException":
        case "com.amazonaws.polly#ServiceFailureException":
            response = {
                ...(await deserializeAws_restJson1ServiceFailureExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "SsmlMarksNotSupportedForTextTypeException":
        case "com.amazonaws.polly#SsmlMarksNotSupportedForTextTypeException":
            response = {
                ...(await deserializeAws_restJson1SsmlMarksNotSupportedForTextTypeExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TextLengthExceededException":
        case "com.amazonaws.polly#TextLengthExceededException":
            response = {
                ...(await deserializeAws_restJson1TextLengthExceededExceptionResponse(parsedOutput, context)),
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
const deserializeAws_restJson1SynthesizeSpeechCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1SynthesizeSpeechCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
        AudioStream: undefined,
        ContentType: undefined,
        RequestCharacters: undefined,
    };
    if (output.headers["content-type"] !== undefined) {
        contents.ContentType = output.headers["content-type"];
    }
    if (output.headers["x-amzn-requestcharacters"] !== undefined) {
        contents.RequestCharacters = parseInt(output.headers["x-amzn-requestcharacters"], 10);
    }
    const data = output.body;
    contents.AudioStream = data;
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1SynthesizeSpeechCommand = deserializeAws_restJson1SynthesizeSpeechCommand;
const deserializeAws_restJson1SynthesizeSpeechCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "EngineNotSupportedException":
        case "com.amazonaws.polly#EngineNotSupportedException":
            response = {
                ...(await deserializeAws_restJson1EngineNotSupportedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidSampleRateException":
        case "com.amazonaws.polly#InvalidSampleRateException":
            response = {
                ...(await deserializeAws_restJson1InvalidSampleRateExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidSsmlException":
        case "com.amazonaws.polly#InvalidSsmlException":
            response = {
                ...(await deserializeAws_restJson1InvalidSsmlExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LanguageNotSupportedException":
        case "com.amazonaws.polly#LanguageNotSupportedException":
            response = {
                ...(await deserializeAws_restJson1LanguageNotSupportedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LexiconNotFoundException":
        case "com.amazonaws.polly#LexiconNotFoundException":
            response = {
                ...(await deserializeAws_restJson1LexiconNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "MarksNotSupportedForFormatException":
        case "com.amazonaws.polly#MarksNotSupportedForFormatException":
            response = {
                ...(await deserializeAws_restJson1MarksNotSupportedForFormatExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceFailureException":
        case "com.amazonaws.polly#ServiceFailureException":
            response = {
                ...(await deserializeAws_restJson1ServiceFailureExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "SsmlMarksNotSupportedForTextTypeException":
        case "com.amazonaws.polly#SsmlMarksNotSupportedForTextTypeException":
            response = {
                ...(await deserializeAws_restJson1SsmlMarksNotSupportedForTextTypeExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TextLengthExceededException":
        case "com.amazonaws.polly#TextLengthExceededException":
            response = {
                ...(await deserializeAws_restJson1TextLengthExceededExceptionResponse(parsedOutput, context)),
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
const deserializeAws_restJson1EngineNotSupportedExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "EngineNotSupportedException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const deserializeAws_restJson1InvalidLexiconExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "InvalidLexiconException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const deserializeAws_restJson1InvalidNextTokenExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "InvalidNextTokenException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const deserializeAws_restJson1InvalidS3BucketExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "InvalidS3BucketException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const deserializeAws_restJson1InvalidS3KeyExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "InvalidS3KeyException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const deserializeAws_restJson1InvalidSampleRateExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "InvalidSampleRateException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const deserializeAws_restJson1InvalidSnsTopicArnExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "InvalidSnsTopicArnException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const deserializeAws_restJson1InvalidSsmlExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "InvalidSsmlException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const deserializeAws_restJson1InvalidTaskIdExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "InvalidTaskIdException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const deserializeAws_restJson1LanguageNotSupportedExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "LanguageNotSupportedException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const deserializeAws_restJson1LexiconNotFoundExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "LexiconNotFoundException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const deserializeAws_restJson1LexiconSizeExceededExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "LexiconSizeExceededException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const deserializeAws_restJson1MarksNotSupportedForFormatExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "MarksNotSupportedForFormatException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const deserializeAws_restJson1MaxLexemeLengthExceededExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "MaxLexemeLengthExceededException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const deserializeAws_restJson1MaxLexiconsNumberExceededExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "MaxLexiconsNumberExceededException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const deserializeAws_restJson1ServiceFailureExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "ServiceFailureException",
        $fault: "server",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const deserializeAws_restJson1SsmlMarksNotSupportedForTextTypeExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "SsmlMarksNotSupportedForTextTypeException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const deserializeAws_restJson1SynthesisTaskNotFoundExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "SynthesisTaskNotFoundException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const deserializeAws_restJson1TextLengthExceededExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "TextLengthExceededException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const deserializeAws_restJson1UnsupportedPlsAlphabetExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "UnsupportedPlsAlphabetException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const deserializeAws_restJson1UnsupportedPlsLanguageExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "UnsupportedPlsLanguageException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        message: undefined,
    };
    const data = parsedOutput.body;
    if (data.message !== undefined && data.message !== null) {
        contents.message = data.message;
    }
    return contents;
};
const serializeAws_restJson1LexiconNameList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_restJson1SpeechMarkTypeList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_restJson1EngineList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_restJson1LanguageCodeList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_restJson1Lexicon = (output, context) => {
    return {
        Content: output.Content !== undefined && output.Content !== null ? output.Content : undefined,
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
    };
};
const deserializeAws_restJson1LexiconAttributes = (output, context) => {
    return {
        Alphabet: output.Alphabet !== undefined && output.Alphabet !== null ? output.Alphabet : undefined,
        LanguageCode: output.LanguageCode !== undefined && output.LanguageCode !== null ? output.LanguageCode : undefined,
        LastModified: output.LastModified !== undefined && output.LastModified !== null
            ? new Date(Math.round(output.LastModified * 1000))
            : undefined,
        LexemesCount: output.LexemesCount !== undefined && output.LexemesCount !== null ? output.LexemesCount : undefined,
        LexiconArn: output.LexiconArn !== undefined && output.LexiconArn !== null ? output.LexiconArn : undefined,
        Size: output.Size !== undefined && output.Size !== null ? output.Size : undefined,
    };
};
const deserializeAws_restJson1LexiconDescription = (output, context) => {
    return {
        Attributes: output.Attributes !== undefined && output.Attributes !== null
            ? deserializeAws_restJson1LexiconAttributes(output.Attributes, context)
            : undefined,
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
    };
};
const deserializeAws_restJson1LexiconDescriptionList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1LexiconDescription(entry, context);
    });
};
const deserializeAws_restJson1LexiconNameList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_restJson1SpeechMarkTypeList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_restJson1SynthesisTask = (output, context) => {
    return {
        CreationTime: output.CreationTime !== undefined && output.CreationTime !== null
            ? new Date(Math.round(output.CreationTime * 1000))
            : undefined,
        Engine: output.Engine !== undefined && output.Engine !== null ? output.Engine : undefined,
        LanguageCode: output.LanguageCode !== undefined && output.LanguageCode !== null ? output.LanguageCode : undefined,
        LexiconNames: output.LexiconNames !== undefined && output.LexiconNames !== null
            ? deserializeAws_restJson1LexiconNameList(output.LexiconNames, context)
            : undefined,
        OutputFormat: output.OutputFormat !== undefined && output.OutputFormat !== null ? output.OutputFormat : undefined,
        OutputUri: output.OutputUri !== undefined && output.OutputUri !== null ? output.OutputUri : undefined,
        RequestCharacters: output.RequestCharacters !== undefined && output.RequestCharacters !== null
            ? output.RequestCharacters
            : undefined,
        SampleRate: output.SampleRate !== undefined && output.SampleRate !== null ? output.SampleRate : undefined,
        SnsTopicArn: output.SnsTopicArn !== undefined && output.SnsTopicArn !== null ? output.SnsTopicArn : undefined,
        SpeechMarkTypes: output.SpeechMarkTypes !== undefined && output.SpeechMarkTypes !== null
            ? deserializeAws_restJson1SpeechMarkTypeList(output.SpeechMarkTypes, context)
            : undefined,
        TaskId: output.TaskId !== undefined && output.TaskId !== null ? output.TaskId : undefined,
        TaskStatus: output.TaskStatus !== undefined && output.TaskStatus !== null ? output.TaskStatus : undefined,
        TaskStatusReason: output.TaskStatusReason !== undefined && output.TaskStatusReason !== null ? output.TaskStatusReason : undefined,
        TextType: output.TextType !== undefined && output.TextType !== null ? output.TextType : undefined,
        VoiceId: output.VoiceId !== undefined && output.VoiceId !== null ? output.VoiceId : undefined,
    };
};
const deserializeAws_restJson1SynthesisTasks = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1SynthesisTask(entry, context);
    });
};
const deserializeAws_restJson1Voice = (output, context) => {
    return {
        AdditionalLanguageCodes: output.AdditionalLanguageCodes !== undefined && output.AdditionalLanguageCodes !== null
            ? deserializeAws_restJson1LanguageCodeList(output.AdditionalLanguageCodes, context)
            : undefined,
        Gender: output.Gender !== undefined && output.Gender !== null ? output.Gender : undefined,
        Id: output.Id !== undefined && output.Id !== null ? output.Id : undefined,
        LanguageCode: output.LanguageCode !== undefined && output.LanguageCode !== null ? output.LanguageCode : undefined,
        LanguageName: output.LanguageName !== undefined && output.LanguageName !== null ? output.LanguageName : undefined,
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        SupportedEngines: output.SupportedEngines !== undefined && output.SupportedEngines !== null
            ? deserializeAws_restJson1EngineList(output.SupportedEngines, context)
            : undefined,
    };
};
const deserializeAws_restJson1VoiceList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_restJson1Voice(entry, context);
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
const isSerializableHeaderValue = (value) => value !== undefined &&
    value !== null &&
    value !== "" &&
    (!Object.getOwnPropertyNames(value).includes("length") || value.length != 0) &&
    (!Object.getOwnPropertyNames(value).includes("size") || value.size != 0);
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
//# sourceMappingURL=Aws_restJson1.js.map
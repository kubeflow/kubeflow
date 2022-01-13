"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeAws_restJson1PutUsersCommand = exports.deserializeAws_restJson1PutItemsCommand = exports.deserializeAws_restJson1PutEventsCommand = exports.serializeAws_restJson1PutUsersCommand = exports.serializeAws_restJson1PutItemsCommand = exports.serializeAws_restJson1PutEventsCommand = void 0;
const protocol_http_1 = require("@aws-sdk/protocol-http");
const smithy_client_1 = require("@aws-sdk/smithy-client");
const serializeAws_restJson1PutEventsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/events";
    let body;
    body = JSON.stringify({
        ...(input.eventList !== undefined &&
            input.eventList !== null && { eventList: serializeAws_restJson1EventList(input.eventList, context) }),
        ...(input.sessionId !== undefined && input.sessionId !== null && { sessionId: input.sessionId }),
        ...(input.trackingId !== undefined && input.trackingId !== null && { trackingId: input.trackingId }),
        ...(input.userId !== undefined && input.userId !== null && { userId: input.userId }),
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
exports.serializeAws_restJson1PutEventsCommand = serializeAws_restJson1PutEventsCommand;
const serializeAws_restJson1PutItemsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/items";
    let body;
    body = JSON.stringify({
        ...(input.datasetArn !== undefined && input.datasetArn !== null && { datasetArn: input.datasetArn }),
        ...(input.items !== undefined &&
            input.items !== null && { items: serializeAws_restJson1ItemList(input.items, context) }),
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
exports.serializeAws_restJson1PutItemsCommand = serializeAws_restJson1PutItemsCommand;
const serializeAws_restJson1PutUsersCommand = async (input, context) => {
    const headers = {
        "content-type": "application/json",
    };
    let resolvedPath = "/users";
    let body;
    body = JSON.stringify({
        ...(input.datasetArn !== undefined && input.datasetArn !== null && { datasetArn: input.datasetArn }),
        ...(input.users !== undefined &&
            input.users !== null && { users: serializeAws_restJson1UserList(input.users, context) }),
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
exports.serializeAws_restJson1PutUsersCommand = serializeAws_restJson1PutUsersCommand;
const deserializeAws_restJson1PutEventsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1PutEventsCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1PutEventsCommand = deserializeAws_restJson1PutEventsCommand;
const deserializeAws_restJson1PutEventsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidInputException":
        case "com.amazonaws.personalizeevents#InvalidInputException":
            response = {
                ...(await deserializeAws_restJson1InvalidInputExceptionResponse(parsedOutput, context)),
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
const deserializeAws_restJson1PutItemsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1PutItemsCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1PutItemsCommand = deserializeAws_restJson1PutItemsCommand;
const deserializeAws_restJson1PutItemsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidInputException":
        case "com.amazonaws.personalizeevents#InvalidInputException":
            response = {
                ...(await deserializeAws_restJson1InvalidInputExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.personalizeevents#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)),
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
const deserializeAws_restJson1PutUsersCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return deserializeAws_restJson1PutUsersCommandError(output, context);
    }
    const contents = {
        $metadata: deserializeMetadata(output),
    };
    await collectBody(output.body, context);
    return Promise.resolve(contents);
};
exports.deserializeAws_restJson1PutUsersCommand = deserializeAws_restJson1PutUsersCommand;
const deserializeAws_restJson1PutUsersCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InvalidInputException":
        case "com.amazonaws.personalizeevents#InvalidInputException":
            response = {
                ...(await deserializeAws_restJson1InvalidInputExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.personalizeevents#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)),
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
const deserializeAws_restJson1InvalidInputExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "InvalidInputException",
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
const deserializeAws_restJson1ResourceNotFoundExceptionResponse = async (parsedOutput, context) => {
    const contents = {
        name: "ResourceNotFoundException",
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
const serializeAws_restJson1Event = (input, context) => {
    return {
        ...(input.eventId !== undefined && input.eventId !== null && { eventId: input.eventId }),
        ...(input.eventType !== undefined && input.eventType !== null && { eventType: input.eventType }),
        ...(input.eventValue !== undefined && input.eventValue !== null && { eventValue: input.eventValue }),
        ...(input.impression !== undefined &&
            input.impression !== null && { impression: serializeAws_restJson1Impression(input.impression, context) }),
        ...(input.itemId !== undefined && input.itemId !== null && { itemId: input.itemId }),
        ...(input.properties !== undefined &&
            input.properties !== null && { properties: smithy_client_1.LazyJsonString.fromObject(input.properties) }),
        ...(input.recommendationId !== undefined &&
            input.recommendationId !== null && { recommendationId: input.recommendationId }),
        ...(input.sentAt !== undefined && input.sentAt !== null && { sentAt: Math.round(input.sentAt.getTime() / 1000) }),
    };
};
const serializeAws_restJson1EventList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1Event(entry, context);
    });
};
const serializeAws_restJson1Impression = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_restJson1Item = (input, context) => {
    return {
        ...(input.itemId !== undefined && input.itemId !== null && { itemId: input.itemId }),
        ...(input.properties !== undefined &&
            input.properties !== null && { properties: smithy_client_1.LazyJsonString.fromObject(input.properties) }),
    };
};
const serializeAws_restJson1ItemList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1Item(entry, context);
    });
};
const serializeAws_restJson1User = (input, context) => {
    return {
        ...(input.properties !== undefined &&
            input.properties !== null && { properties: smithy_client_1.LazyJsonString.fromObject(input.properties) }),
        ...(input.userId !== undefined && input.userId !== null && { userId: input.userId }),
    };
};
const serializeAws_restJson1UserList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_restJson1User(entry, context);
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
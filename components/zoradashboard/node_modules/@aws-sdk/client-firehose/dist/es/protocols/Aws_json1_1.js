import { __assign, __awaiter, __generator, __read } from "tslib";
import { HttpRequest as __HttpRequest } from "@aws-sdk/protocol-http";
export var serializeAws_json1_1CreateDeliveryStreamCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Firehose_20150804.CreateDeliveryStream",
        };
        body = JSON.stringify(serializeAws_json1_1CreateDeliveryStreamInput(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DeleteDeliveryStreamCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Firehose_20150804.DeleteDeliveryStream",
        };
        body = JSON.stringify(serializeAws_json1_1DeleteDeliveryStreamInput(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DescribeDeliveryStreamCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Firehose_20150804.DescribeDeliveryStream",
        };
        body = JSON.stringify(serializeAws_json1_1DescribeDeliveryStreamInput(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1ListDeliveryStreamsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Firehose_20150804.ListDeliveryStreams",
        };
        body = JSON.stringify(serializeAws_json1_1ListDeliveryStreamsInput(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1ListTagsForDeliveryStreamCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Firehose_20150804.ListTagsForDeliveryStream",
        };
        body = JSON.stringify(serializeAws_json1_1ListTagsForDeliveryStreamInput(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1PutRecordCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Firehose_20150804.PutRecord",
        };
        body = JSON.stringify(serializeAws_json1_1PutRecordInput(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1PutRecordBatchCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Firehose_20150804.PutRecordBatch",
        };
        body = JSON.stringify(serializeAws_json1_1PutRecordBatchInput(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartDeliveryStreamEncryptionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Firehose_20150804.StartDeliveryStreamEncryption",
        };
        body = JSON.stringify(serializeAws_json1_1StartDeliveryStreamEncryptionInput(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StopDeliveryStreamEncryptionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Firehose_20150804.StopDeliveryStreamEncryption",
        };
        body = JSON.stringify(serializeAws_json1_1StopDeliveryStreamEncryptionInput(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1TagDeliveryStreamCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Firehose_20150804.TagDeliveryStream",
        };
        body = JSON.stringify(serializeAws_json1_1TagDeliveryStreamInput(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1UntagDeliveryStreamCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Firehose_20150804.UntagDeliveryStream",
        };
        body = JSON.stringify(serializeAws_json1_1UntagDeliveryStreamInput(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1UpdateDestinationCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Firehose_20150804.UpdateDestination",
        };
        body = JSON.stringify(serializeAws_json1_1UpdateDestinationInput(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var deserializeAws_json1_1CreateDeliveryStreamCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1CreateDeliveryStreamCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1CreateDeliveryStreamOutput(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1CreateDeliveryStreamCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, parsedBody, message;
    var _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _a = [__assign({}, output)];
                _g = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_g.body = _h.sent(), _g)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "InvalidArgumentException": return [3 /*break*/, 2];
                    case "com.amazonaws.firehose#InvalidArgumentException": return [3 /*break*/, 2];
                    case "InvalidKMSResourceException": return [3 /*break*/, 4];
                    case "com.amazonaws.firehose#InvalidKMSResourceException": return [3 /*break*/, 4];
                    case "LimitExceededException": return [3 /*break*/, 6];
                    case "com.amazonaws.firehose#LimitExceededException": return [3 /*break*/, 6];
                    case "ResourceInUseException": return [3 /*break*/, 8];
                    case "com.amazonaws.firehose#ResourceInUseException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidKMSResourceExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 10:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _h.label = 11;
            case 11:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1DeleteDeliveryStreamCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DeleteDeliveryStreamCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DeleteDeliveryStreamOutput(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DeleteDeliveryStreamCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, parsedBody, message;
    var _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = [__assign({}, output)];
                _e = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_e.body = _f.sent(), _e)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "ResourceInUseException": return [3 /*break*/, 2];
                    case "com.amazonaws.firehose#ResourceInUseException": return [3 /*break*/, 2];
                    case "ResourceNotFoundException": return [3 /*break*/, 4];
                    case "com.amazonaws.firehose#ResourceNotFoundException": return [3 /*break*/, 4];
                }
                return [3 /*break*/, 6];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_f.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 7];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_f.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 7];
            case 6:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _f.label = 7;
            case 7:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1DescribeDeliveryStreamCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DescribeDeliveryStreamCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DescribeDeliveryStreamOutput(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DescribeDeliveryStreamCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, parsedBody, message;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = [__assign({}, output)];
                _d = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_d.body = _e.sent(), _d)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "ResourceNotFoundException": return [3 /*break*/, 2];
                    case "com.amazonaws.firehose#ResourceNotFoundException": return [3 /*break*/, 2];
                }
                return [3 /*break*/, 4];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_e.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 5];
            case 4:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _e.label = 5;
            case 5:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1ListDeliveryStreamsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1ListDeliveryStreamsCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1ListDeliveryStreamsOutput(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1ListDeliveryStreamsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, parsedBody, message;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = [__assign({}, output)];
                _b = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_b.body = _c.sent(), _b)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                switch (errorCode) {
                    default:
                        parsedBody = parsedOutput.body;
                        errorCode = parsedBody.code || parsedBody.Code || errorCode;
                        response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                }
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1ListTagsForDeliveryStreamCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1ListTagsForDeliveryStreamCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1ListTagsForDeliveryStreamOutput(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1ListTagsForDeliveryStreamCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, parsedBody, message;
    var _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _a = [__assign({}, output)];
                _f = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_f.body = _g.sent(), _f)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "InvalidArgumentException": return [3 /*break*/, 2];
                    case "com.amazonaws.firehose#InvalidArgumentException": return [3 /*break*/, 2];
                    case "LimitExceededException": return [3 /*break*/, 4];
                    case "com.amazonaws.firehose#LimitExceededException": return [3 /*break*/, 4];
                    case "ResourceNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.firehose#ResourceNotFoundException": return [3 /*break*/, 6];
                }
                return [3 /*break*/, 8];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_g.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 9];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_g.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 9];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_g.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 9];
            case 8:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _g.label = 9;
            case 9:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1PutRecordCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1PutRecordCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1PutRecordOutput(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1PutRecordCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, parsedBody, message;
    var _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _a = [__assign({}, output)];
                _g = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_g.body = _h.sent(), _g)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "InvalidArgumentException": return [3 /*break*/, 2];
                    case "com.amazonaws.firehose#InvalidArgumentException": return [3 /*break*/, 2];
                    case "InvalidKMSResourceException": return [3 /*break*/, 4];
                    case "com.amazonaws.firehose#InvalidKMSResourceException": return [3 /*break*/, 4];
                    case "ResourceNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.firehose#ResourceNotFoundException": return [3 /*break*/, 6];
                    case "ServiceUnavailableException": return [3 /*break*/, 8];
                    case "com.amazonaws.firehose#ServiceUnavailableException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidKMSResourceExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 10:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _h.label = 11;
            case 11:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1PutRecordBatchCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1PutRecordBatchCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1PutRecordBatchOutput(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1PutRecordBatchCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, parsedBody, message;
    var _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _a = [__assign({}, output)];
                _g = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_g.body = _h.sent(), _g)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "InvalidArgumentException": return [3 /*break*/, 2];
                    case "com.amazonaws.firehose#InvalidArgumentException": return [3 /*break*/, 2];
                    case "InvalidKMSResourceException": return [3 /*break*/, 4];
                    case "com.amazonaws.firehose#InvalidKMSResourceException": return [3 /*break*/, 4];
                    case "ResourceNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.firehose#ResourceNotFoundException": return [3 /*break*/, 6];
                    case "ServiceUnavailableException": return [3 /*break*/, 8];
                    case "com.amazonaws.firehose#ServiceUnavailableException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidKMSResourceExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ServiceUnavailableExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 10:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _h.label = 11;
            case 11:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1StartDeliveryStreamEncryptionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartDeliveryStreamEncryptionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartDeliveryStreamEncryptionOutput(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartDeliveryStreamEncryptionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, parsedBody, message;
    var _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                _a = [__assign({}, output)];
                _h = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_h.body = _j.sent(), _h)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "InvalidArgumentException": return [3 /*break*/, 2];
                    case "com.amazonaws.firehose#InvalidArgumentException": return [3 /*break*/, 2];
                    case "InvalidKMSResourceException": return [3 /*break*/, 4];
                    case "com.amazonaws.firehose#InvalidKMSResourceException": return [3 /*break*/, 4];
                    case "LimitExceededException": return [3 /*break*/, 6];
                    case "com.amazonaws.firehose#LimitExceededException": return [3 /*break*/, 6];
                    case "ResourceInUseException": return [3 /*break*/, 8];
                    case "com.amazonaws.firehose#ResourceInUseException": return [3 /*break*/, 8];
                    case "ResourceNotFoundException": return [3 /*break*/, 10];
                    case "com.amazonaws.firehose#ResourceNotFoundException": return [3 /*break*/, 10];
                }
                return [3 /*break*/, 12];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidKMSResourceExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 12:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _j.label = 13;
            case 13:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1StopDeliveryStreamEncryptionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StopDeliveryStreamEncryptionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StopDeliveryStreamEncryptionOutput(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StopDeliveryStreamEncryptionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, parsedBody, message;
    var _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _a = [__assign({}, output)];
                _g = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_g.body = _h.sent(), _g)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "InvalidArgumentException": return [3 /*break*/, 2];
                    case "com.amazonaws.firehose#InvalidArgumentException": return [3 /*break*/, 2];
                    case "LimitExceededException": return [3 /*break*/, 4];
                    case "com.amazonaws.firehose#LimitExceededException": return [3 /*break*/, 4];
                    case "ResourceInUseException": return [3 /*break*/, 6];
                    case "com.amazonaws.firehose#ResourceInUseException": return [3 /*break*/, 6];
                    case "ResourceNotFoundException": return [3 /*break*/, 8];
                    case "com.amazonaws.firehose#ResourceNotFoundException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 10:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _h.label = 11;
            case 11:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1TagDeliveryStreamCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1TagDeliveryStreamCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1TagDeliveryStreamOutput(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1TagDeliveryStreamCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, parsedBody, message;
    var _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _a = [__assign({}, output)];
                _g = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_g.body = _h.sent(), _g)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "InvalidArgumentException": return [3 /*break*/, 2];
                    case "com.amazonaws.firehose#InvalidArgumentException": return [3 /*break*/, 2];
                    case "LimitExceededException": return [3 /*break*/, 4];
                    case "com.amazonaws.firehose#LimitExceededException": return [3 /*break*/, 4];
                    case "ResourceInUseException": return [3 /*break*/, 6];
                    case "com.amazonaws.firehose#ResourceInUseException": return [3 /*break*/, 6];
                    case "ResourceNotFoundException": return [3 /*break*/, 8];
                    case "com.amazonaws.firehose#ResourceNotFoundException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 10:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _h.label = 11;
            case 11:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1UntagDeliveryStreamCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1UntagDeliveryStreamCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1UntagDeliveryStreamOutput(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1UntagDeliveryStreamCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, parsedBody, message;
    var _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _a = [__assign({}, output)];
                _g = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_g.body = _h.sent(), _g)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "InvalidArgumentException": return [3 /*break*/, 2];
                    case "com.amazonaws.firehose#InvalidArgumentException": return [3 /*break*/, 2];
                    case "LimitExceededException": return [3 /*break*/, 4];
                    case "com.amazonaws.firehose#LimitExceededException": return [3 /*break*/, 4];
                    case "ResourceInUseException": return [3 /*break*/, 6];
                    case "com.amazonaws.firehose#ResourceInUseException": return [3 /*break*/, 6];
                    case "ResourceNotFoundException": return [3 /*break*/, 8];
                    case "com.amazonaws.firehose#ResourceNotFoundException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 10:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _h.label = 11;
            case 11:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1UpdateDestinationCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1UpdateDestinationCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1UpdateDestinationOutput(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1UpdateDestinationCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, parsedBody, message;
    var _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _a = [__assign({}, output)];
                _g = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_g.body = _h.sent(), _g)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "ConcurrentModificationException": return [3 /*break*/, 2];
                    case "com.amazonaws.firehose#ConcurrentModificationException": return [3 /*break*/, 2];
                    case "InvalidArgumentException": return [3 /*break*/, 4];
                    case "com.amazonaws.firehose#InvalidArgumentException": return [3 /*break*/, 4];
                    case "ResourceInUseException": return [3 /*break*/, 6];
                    case "com.amazonaws.firehose#ResourceInUseException": return [3 /*break*/, 6];
                    case "ResourceNotFoundException": return [3 /*break*/, 8];
                    case "com.amazonaws.firehose#ResourceNotFoundException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ConcurrentModificationExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 10:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _h.label = 11;
            case 11:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_json1_1ConcurrentModificationExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1ConcurrentModificationException(body, context);
        contents = __assign({ name: "ConcurrentModificationException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1InvalidArgumentExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1InvalidArgumentException(body, context);
        contents = __assign({ name: "InvalidArgumentException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1InvalidKMSResourceExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1InvalidKMSResourceException(body, context);
        contents = __assign({ name: "InvalidKMSResourceException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1LimitExceededExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1LimitExceededException(body, context);
        contents = __assign({ name: "LimitExceededException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1ResourceInUseExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1ResourceInUseException(body, context);
        contents = __assign({ name: "ResourceInUseException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1ResourceNotFoundExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1ResourceNotFoundException(body, context);
        contents = __assign({ name: "ResourceNotFoundException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1ServiceUnavailableExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1ServiceUnavailableException(body, context);
        contents = __assign({ name: "ServiceUnavailableException", $fault: "server", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var serializeAws_json1_1BufferingHints = function (input, context) {
    return __assign(__assign({}, (input.IntervalInSeconds !== undefined &&
        input.IntervalInSeconds !== null && { IntervalInSeconds: input.IntervalInSeconds })), (input.SizeInMBs !== undefined && input.SizeInMBs !== null && { SizeInMBs: input.SizeInMBs }));
};
var serializeAws_json1_1CloudWatchLoggingOptions = function (input, context) {
    return __assign(__assign(__assign({}, (input.Enabled !== undefined && input.Enabled !== null && { Enabled: input.Enabled })), (input.LogGroupName !== undefined && input.LogGroupName !== null && { LogGroupName: input.LogGroupName })), (input.LogStreamName !== undefined && input.LogStreamName !== null && { LogStreamName: input.LogStreamName }));
};
var serializeAws_json1_1ColumnToJsonKeyMappings = function (input, context) {
    return Object.entries(input).reduce(function (acc, _a) {
        var _b;
        var _c = __read(_a, 2), key = _c[0], value = _c[1];
        if (value === null) {
            return acc;
        }
        return __assign(__assign({}, acc), (_b = {}, _b[key] = value, _b));
    }, {});
};
var serializeAws_json1_1CopyCommand = function (input, context) {
    return __assign(__assign(__assign({}, (input.CopyOptions !== undefined && input.CopyOptions !== null && { CopyOptions: input.CopyOptions })), (input.DataTableColumns !== undefined &&
        input.DataTableColumns !== null && { DataTableColumns: input.DataTableColumns })), (input.DataTableName !== undefined && input.DataTableName !== null && { DataTableName: input.DataTableName }));
};
var serializeAws_json1_1CreateDeliveryStreamInput = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (input.DeliveryStreamEncryptionConfigurationInput !== undefined &&
        input.DeliveryStreamEncryptionConfigurationInput !== null && {
        DeliveryStreamEncryptionConfigurationInput: serializeAws_json1_1DeliveryStreamEncryptionConfigurationInput(input.DeliveryStreamEncryptionConfigurationInput, context),
    })), (input.DeliveryStreamName !== undefined &&
        input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName })), (input.DeliveryStreamType !== undefined &&
        input.DeliveryStreamType !== null && { DeliveryStreamType: input.DeliveryStreamType })), (input.ElasticsearchDestinationConfiguration !== undefined &&
        input.ElasticsearchDestinationConfiguration !== null && {
        ElasticsearchDestinationConfiguration: serializeAws_json1_1ElasticsearchDestinationConfiguration(input.ElasticsearchDestinationConfiguration, context),
    })), (input.ExtendedS3DestinationConfiguration !== undefined &&
        input.ExtendedS3DestinationConfiguration !== null && {
        ExtendedS3DestinationConfiguration: serializeAws_json1_1ExtendedS3DestinationConfiguration(input.ExtendedS3DestinationConfiguration, context),
    })), (input.HttpEndpointDestinationConfiguration !== undefined &&
        input.HttpEndpointDestinationConfiguration !== null && {
        HttpEndpointDestinationConfiguration: serializeAws_json1_1HttpEndpointDestinationConfiguration(input.HttpEndpointDestinationConfiguration, context),
    })), (input.KinesisStreamSourceConfiguration !== undefined &&
        input.KinesisStreamSourceConfiguration !== null && {
        KinesisStreamSourceConfiguration: serializeAws_json1_1KinesisStreamSourceConfiguration(input.KinesisStreamSourceConfiguration, context),
    })), (input.RedshiftDestinationConfiguration !== undefined &&
        input.RedshiftDestinationConfiguration !== null && {
        RedshiftDestinationConfiguration: serializeAws_json1_1RedshiftDestinationConfiguration(input.RedshiftDestinationConfiguration, context),
    })), (input.S3DestinationConfiguration !== undefined &&
        input.S3DestinationConfiguration !== null && {
        S3DestinationConfiguration: serializeAws_json1_1S3DestinationConfiguration(input.S3DestinationConfiguration, context),
    })), (input.SplunkDestinationConfiguration !== undefined &&
        input.SplunkDestinationConfiguration !== null && {
        SplunkDestinationConfiguration: serializeAws_json1_1SplunkDestinationConfiguration(input.SplunkDestinationConfiguration, context),
    })), (input.Tags !== undefined &&
        input.Tags !== null && { Tags: serializeAws_json1_1TagDeliveryStreamInputTagList(input.Tags, context) }));
};
var serializeAws_json1_1DataFormatConversionConfiguration = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.Enabled !== undefined && input.Enabled !== null && { Enabled: input.Enabled })), (input.InputFormatConfiguration !== undefined &&
        input.InputFormatConfiguration !== null && {
        InputFormatConfiguration: serializeAws_json1_1InputFormatConfiguration(input.InputFormatConfiguration, context),
    })), (input.OutputFormatConfiguration !== undefined &&
        input.OutputFormatConfiguration !== null && {
        OutputFormatConfiguration: serializeAws_json1_1OutputFormatConfiguration(input.OutputFormatConfiguration, context),
    })), (input.SchemaConfiguration !== undefined &&
        input.SchemaConfiguration !== null && {
        SchemaConfiguration: serializeAws_json1_1SchemaConfiguration(input.SchemaConfiguration, context),
    }));
};
var serializeAws_json1_1DeleteDeliveryStreamInput = function (input, context) {
    return __assign(__assign({}, (input.AllowForceDelete !== undefined &&
        input.AllowForceDelete !== null && { AllowForceDelete: input.AllowForceDelete })), (input.DeliveryStreamName !== undefined &&
        input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName }));
};
var serializeAws_json1_1DeliveryStreamEncryptionConfigurationInput = function (input, context) {
    return __assign(__assign({}, (input.KeyARN !== undefined && input.KeyARN !== null && { KeyARN: input.KeyARN })), (input.KeyType !== undefined && input.KeyType !== null && { KeyType: input.KeyType }));
};
var serializeAws_json1_1DescribeDeliveryStreamInput = function (input, context) {
    return __assign(__assign(__assign({}, (input.DeliveryStreamName !== undefined &&
        input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName })), (input.ExclusiveStartDestinationId !== undefined &&
        input.ExclusiveStartDestinationId !== null && { ExclusiveStartDestinationId: input.ExclusiveStartDestinationId })), (input.Limit !== undefined && input.Limit !== null && { Limit: input.Limit }));
};
var serializeAws_json1_1Deserializer = function (input, context) {
    return __assign(__assign({}, (input.HiveJsonSerDe !== undefined &&
        input.HiveJsonSerDe !== null && {
        HiveJsonSerDe: serializeAws_json1_1HiveJsonSerDe(input.HiveJsonSerDe, context),
    })), (input.OpenXJsonSerDe !== undefined &&
        input.OpenXJsonSerDe !== null && {
        OpenXJsonSerDe: serializeAws_json1_1OpenXJsonSerDe(input.OpenXJsonSerDe, context),
    }));
};
var serializeAws_json1_1ElasticsearchBufferingHints = function (input, context) {
    return __assign(__assign({}, (input.IntervalInSeconds !== undefined &&
        input.IntervalInSeconds !== null && { IntervalInSeconds: input.IntervalInSeconds })), (input.SizeInMBs !== undefined && input.SizeInMBs !== null && { SizeInMBs: input.SizeInMBs }));
};
var serializeAws_json1_1ElasticsearchDestinationConfiguration = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (input.BufferingHints !== undefined &&
        input.BufferingHints !== null && {
        BufferingHints: serializeAws_json1_1ElasticsearchBufferingHints(input.BufferingHints, context),
    })), (input.CloudWatchLoggingOptions !== undefined &&
        input.CloudWatchLoggingOptions !== null && {
        CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
    })), (input.ClusterEndpoint !== undefined &&
        input.ClusterEndpoint !== null && { ClusterEndpoint: input.ClusterEndpoint })), (input.DomainARN !== undefined && input.DomainARN !== null && { DomainARN: input.DomainARN })), (input.IndexName !== undefined && input.IndexName !== null && { IndexName: input.IndexName })), (input.IndexRotationPeriod !== undefined &&
        input.IndexRotationPeriod !== null && { IndexRotationPeriod: input.IndexRotationPeriod })), (input.ProcessingConfiguration !== undefined &&
        input.ProcessingConfiguration !== null && {
        ProcessingConfiguration: serializeAws_json1_1ProcessingConfiguration(input.ProcessingConfiguration, context),
    })), (input.RetryOptions !== undefined &&
        input.RetryOptions !== null && {
        RetryOptions: serializeAws_json1_1ElasticsearchRetryOptions(input.RetryOptions, context),
    })), (input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN })), (input.S3BackupMode !== undefined && input.S3BackupMode !== null && { S3BackupMode: input.S3BackupMode })), (input.S3Configuration !== undefined &&
        input.S3Configuration !== null && {
        S3Configuration: serializeAws_json1_1S3DestinationConfiguration(input.S3Configuration, context),
    })), (input.TypeName !== undefined && input.TypeName !== null && { TypeName: input.TypeName })), (input.VpcConfiguration !== undefined &&
        input.VpcConfiguration !== null && {
        VpcConfiguration: serializeAws_json1_1VpcConfiguration(input.VpcConfiguration, context),
    }));
};
var serializeAws_json1_1ElasticsearchDestinationUpdate = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (input.BufferingHints !== undefined &&
        input.BufferingHints !== null && {
        BufferingHints: serializeAws_json1_1ElasticsearchBufferingHints(input.BufferingHints, context),
    })), (input.CloudWatchLoggingOptions !== undefined &&
        input.CloudWatchLoggingOptions !== null && {
        CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
    })), (input.ClusterEndpoint !== undefined &&
        input.ClusterEndpoint !== null && { ClusterEndpoint: input.ClusterEndpoint })), (input.DomainARN !== undefined && input.DomainARN !== null && { DomainARN: input.DomainARN })), (input.IndexName !== undefined && input.IndexName !== null && { IndexName: input.IndexName })), (input.IndexRotationPeriod !== undefined &&
        input.IndexRotationPeriod !== null && { IndexRotationPeriod: input.IndexRotationPeriod })), (input.ProcessingConfiguration !== undefined &&
        input.ProcessingConfiguration !== null && {
        ProcessingConfiguration: serializeAws_json1_1ProcessingConfiguration(input.ProcessingConfiguration, context),
    })), (input.RetryOptions !== undefined &&
        input.RetryOptions !== null && {
        RetryOptions: serializeAws_json1_1ElasticsearchRetryOptions(input.RetryOptions, context),
    })), (input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN })), (input.S3Update !== undefined &&
        input.S3Update !== null && { S3Update: serializeAws_json1_1S3DestinationUpdate(input.S3Update, context) })), (input.TypeName !== undefined && input.TypeName !== null && { TypeName: input.TypeName }));
};
var serializeAws_json1_1ElasticsearchRetryOptions = function (input, context) {
    return __assign({}, (input.DurationInSeconds !== undefined &&
        input.DurationInSeconds !== null && { DurationInSeconds: input.DurationInSeconds }));
};
var serializeAws_json1_1EncryptionConfiguration = function (input, context) {
    return __assign(__assign({}, (input.KMSEncryptionConfig !== undefined &&
        input.KMSEncryptionConfig !== null && {
        KMSEncryptionConfig: serializeAws_json1_1KMSEncryptionConfig(input.KMSEncryptionConfig, context),
    })), (input.NoEncryptionConfig !== undefined &&
        input.NoEncryptionConfig !== null && { NoEncryptionConfig: input.NoEncryptionConfig }));
};
var serializeAws_json1_1ExtendedS3DestinationConfiguration = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (input.BucketARN !== undefined && input.BucketARN !== null && { BucketARN: input.BucketARN })), (input.BufferingHints !== undefined &&
        input.BufferingHints !== null && {
        BufferingHints: serializeAws_json1_1BufferingHints(input.BufferingHints, context),
    })), (input.CloudWatchLoggingOptions !== undefined &&
        input.CloudWatchLoggingOptions !== null && {
        CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
    })), (input.CompressionFormat !== undefined &&
        input.CompressionFormat !== null && { CompressionFormat: input.CompressionFormat })), (input.DataFormatConversionConfiguration !== undefined &&
        input.DataFormatConversionConfiguration !== null && {
        DataFormatConversionConfiguration: serializeAws_json1_1DataFormatConversionConfiguration(input.DataFormatConversionConfiguration, context),
    })), (input.EncryptionConfiguration !== undefined &&
        input.EncryptionConfiguration !== null && {
        EncryptionConfiguration: serializeAws_json1_1EncryptionConfiguration(input.EncryptionConfiguration, context),
    })), (input.ErrorOutputPrefix !== undefined &&
        input.ErrorOutputPrefix !== null && { ErrorOutputPrefix: input.ErrorOutputPrefix })), (input.Prefix !== undefined && input.Prefix !== null && { Prefix: input.Prefix })), (input.ProcessingConfiguration !== undefined &&
        input.ProcessingConfiguration !== null && {
        ProcessingConfiguration: serializeAws_json1_1ProcessingConfiguration(input.ProcessingConfiguration, context),
    })), (input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN })), (input.S3BackupConfiguration !== undefined &&
        input.S3BackupConfiguration !== null && {
        S3BackupConfiguration: serializeAws_json1_1S3DestinationConfiguration(input.S3BackupConfiguration, context),
    })), (input.S3BackupMode !== undefined && input.S3BackupMode !== null && { S3BackupMode: input.S3BackupMode }));
};
var serializeAws_json1_1ExtendedS3DestinationUpdate = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (input.BucketARN !== undefined && input.BucketARN !== null && { BucketARN: input.BucketARN })), (input.BufferingHints !== undefined &&
        input.BufferingHints !== null && {
        BufferingHints: serializeAws_json1_1BufferingHints(input.BufferingHints, context),
    })), (input.CloudWatchLoggingOptions !== undefined &&
        input.CloudWatchLoggingOptions !== null && {
        CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
    })), (input.CompressionFormat !== undefined &&
        input.CompressionFormat !== null && { CompressionFormat: input.CompressionFormat })), (input.DataFormatConversionConfiguration !== undefined &&
        input.DataFormatConversionConfiguration !== null && {
        DataFormatConversionConfiguration: serializeAws_json1_1DataFormatConversionConfiguration(input.DataFormatConversionConfiguration, context),
    })), (input.EncryptionConfiguration !== undefined &&
        input.EncryptionConfiguration !== null && {
        EncryptionConfiguration: serializeAws_json1_1EncryptionConfiguration(input.EncryptionConfiguration, context),
    })), (input.ErrorOutputPrefix !== undefined &&
        input.ErrorOutputPrefix !== null && { ErrorOutputPrefix: input.ErrorOutputPrefix })), (input.Prefix !== undefined && input.Prefix !== null && { Prefix: input.Prefix })), (input.ProcessingConfiguration !== undefined &&
        input.ProcessingConfiguration !== null && {
        ProcessingConfiguration: serializeAws_json1_1ProcessingConfiguration(input.ProcessingConfiguration, context),
    })), (input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN })), (input.S3BackupMode !== undefined && input.S3BackupMode !== null && { S3BackupMode: input.S3BackupMode })), (input.S3BackupUpdate !== undefined &&
        input.S3BackupUpdate !== null && {
        S3BackupUpdate: serializeAws_json1_1S3DestinationUpdate(input.S3BackupUpdate, context),
    }));
};
var serializeAws_json1_1HiveJsonSerDe = function (input, context) {
    return __assign({}, (input.TimestampFormats !== undefined &&
        input.TimestampFormats !== null && {
        TimestampFormats: serializeAws_json1_1ListOfNonEmptyStrings(input.TimestampFormats, context),
    }));
};
var serializeAws_json1_1HttpEndpointBufferingHints = function (input, context) {
    return __assign(__assign({}, (input.IntervalInSeconds !== undefined &&
        input.IntervalInSeconds !== null && { IntervalInSeconds: input.IntervalInSeconds })), (input.SizeInMBs !== undefined && input.SizeInMBs !== null && { SizeInMBs: input.SizeInMBs }));
};
var serializeAws_json1_1HttpEndpointCommonAttribute = function (input, context) {
    return __assign(__assign({}, (input.AttributeName !== undefined && input.AttributeName !== null && { AttributeName: input.AttributeName })), (input.AttributeValue !== undefined &&
        input.AttributeValue !== null && { AttributeValue: input.AttributeValue }));
};
var serializeAws_json1_1HttpEndpointCommonAttributesList = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1HttpEndpointCommonAttribute(entry, context);
    });
};
var serializeAws_json1_1HttpEndpointConfiguration = function (input, context) {
    return __assign(__assign(__assign({}, (input.AccessKey !== undefined && input.AccessKey !== null && { AccessKey: input.AccessKey })), (input.Name !== undefined && input.Name !== null && { Name: input.Name })), (input.Url !== undefined && input.Url !== null && { Url: input.Url }));
};
var serializeAws_json1_1HttpEndpointDestinationConfiguration = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (input.BufferingHints !== undefined &&
        input.BufferingHints !== null && {
        BufferingHints: serializeAws_json1_1HttpEndpointBufferingHints(input.BufferingHints, context),
    })), (input.CloudWatchLoggingOptions !== undefined &&
        input.CloudWatchLoggingOptions !== null && {
        CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
    })), (input.EndpointConfiguration !== undefined &&
        input.EndpointConfiguration !== null && {
        EndpointConfiguration: serializeAws_json1_1HttpEndpointConfiguration(input.EndpointConfiguration, context),
    })), (input.ProcessingConfiguration !== undefined &&
        input.ProcessingConfiguration !== null && {
        ProcessingConfiguration: serializeAws_json1_1ProcessingConfiguration(input.ProcessingConfiguration, context),
    })), (input.RequestConfiguration !== undefined &&
        input.RequestConfiguration !== null && {
        RequestConfiguration: serializeAws_json1_1HttpEndpointRequestConfiguration(input.RequestConfiguration, context),
    })), (input.RetryOptions !== undefined &&
        input.RetryOptions !== null && {
        RetryOptions: serializeAws_json1_1HttpEndpointRetryOptions(input.RetryOptions, context),
    })), (input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN })), (input.S3BackupMode !== undefined && input.S3BackupMode !== null && { S3BackupMode: input.S3BackupMode })), (input.S3Configuration !== undefined &&
        input.S3Configuration !== null && {
        S3Configuration: serializeAws_json1_1S3DestinationConfiguration(input.S3Configuration, context),
    }));
};
var serializeAws_json1_1HttpEndpointDestinationUpdate = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (input.BufferingHints !== undefined &&
        input.BufferingHints !== null && {
        BufferingHints: serializeAws_json1_1HttpEndpointBufferingHints(input.BufferingHints, context),
    })), (input.CloudWatchLoggingOptions !== undefined &&
        input.CloudWatchLoggingOptions !== null && {
        CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
    })), (input.EndpointConfiguration !== undefined &&
        input.EndpointConfiguration !== null && {
        EndpointConfiguration: serializeAws_json1_1HttpEndpointConfiguration(input.EndpointConfiguration, context),
    })), (input.ProcessingConfiguration !== undefined &&
        input.ProcessingConfiguration !== null && {
        ProcessingConfiguration: serializeAws_json1_1ProcessingConfiguration(input.ProcessingConfiguration, context),
    })), (input.RequestConfiguration !== undefined &&
        input.RequestConfiguration !== null && {
        RequestConfiguration: serializeAws_json1_1HttpEndpointRequestConfiguration(input.RequestConfiguration, context),
    })), (input.RetryOptions !== undefined &&
        input.RetryOptions !== null && {
        RetryOptions: serializeAws_json1_1HttpEndpointRetryOptions(input.RetryOptions, context),
    })), (input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN })), (input.S3BackupMode !== undefined && input.S3BackupMode !== null && { S3BackupMode: input.S3BackupMode })), (input.S3Update !== undefined &&
        input.S3Update !== null && { S3Update: serializeAws_json1_1S3DestinationUpdate(input.S3Update, context) }));
};
var serializeAws_json1_1HttpEndpointRequestConfiguration = function (input, context) {
    return __assign(__assign({}, (input.CommonAttributes !== undefined &&
        input.CommonAttributes !== null && {
        CommonAttributes: serializeAws_json1_1HttpEndpointCommonAttributesList(input.CommonAttributes, context),
    })), (input.ContentEncoding !== undefined &&
        input.ContentEncoding !== null && { ContentEncoding: input.ContentEncoding }));
};
var serializeAws_json1_1HttpEndpointRetryOptions = function (input, context) {
    return __assign({}, (input.DurationInSeconds !== undefined &&
        input.DurationInSeconds !== null && { DurationInSeconds: input.DurationInSeconds }));
};
var serializeAws_json1_1InputFormatConfiguration = function (input, context) {
    return __assign({}, (input.Deserializer !== undefined &&
        input.Deserializer !== null && { Deserializer: serializeAws_json1_1Deserializer(input.Deserializer, context) }));
};
var serializeAws_json1_1KinesisStreamSourceConfiguration = function (input, context) {
    return __assign(__assign({}, (input.KinesisStreamARN !== undefined &&
        input.KinesisStreamARN !== null && { KinesisStreamARN: input.KinesisStreamARN })), (input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN }));
};
var serializeAws_json1_1KMSEncryptionConfig = function (input, context) {
    return __assign({}, (input.AWSKMSKeyARN !== undefined && input.AWSKMSKeyARN !== null && { AWSKMSKeyARN: input.AWSKMSKeyARN }));
};
var serializeAws_json1_1ListDeliveryStreamsInput = function (input, context) {
    return __assign(__assign(__assign({}, (input.DeliveryStreamType !== undefined &&
        input.DeliveryStreamType !== null && { DeliveryStreamType: input.DeliveryStreamType })), (input.ExclusiveStartDeliveryStreamName !== undefined &&
        input.ExclusiveStartDeliveryStreamName !== null && {
        ExclusiveStartDeliveryStreamName: input.ExclusiveStartDeliveryStreamName,
    })), (input.Limit !== undefined && input.Limit !== null && { Limit: input.Limit }));
};
var serializeAws_json1_1ListOfNonEmptyStrings = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var serializeAws_json1_1ListOfNonEmptyStringsWithoutWhitespace = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var serializeAws_json1_1ListTagsForDeliveryStreamInput = function (input, context) {
    return __assign(__assign(__assign({}, (input.DeliveryStreamName !== undefined &&
        input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName })), (input.ExclusiveStartTagKey !== undefined &&
        input.ExclusiveStartTagKey !== null && { ExclusiveStartTagKey: input.ExclusiveStartTagKey })), (input.Limit !== undefined && input.Limit !== null && { Limit: input.Limit }));
};
var serializeAws_json1_1OpenXJsonSerDe = function (input, context) {
    return __assign(__assign(__assign({}, (input.CaseInsensitive !== undefined &&
        input.CaseInsensitive !== null && { CaseInsensitive: input.CaseInsensitive })), (input.ColumnToJsonKeyMappings !== undefined &&
        input.ColumnToJsonKeyMappings !== null && {
        ColumnToJsonKeyMappings: serializeAws_json1_1ColumnToJsonKeyMappings(input.ColumnToJsonKeyMappings, context),
    })), (input.ConvertDotsInJsonKeysToUnderscores !== undefined &&
        input.ConvertDotsInJsonKeysToUnderscores !== null && {
        ConvertDotsInJsonKeysToUnderscores: input.ConvertDotsInJsonKeysToUnderscores,
    }));
};
var serializeAws_json1_1OrcSerDe = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (input.BlockSizeBytes !== undefined &&
        input.BlockSizeBytes !== null && { BlockSizeBytes: input.BlockSizeBytes })), (input.BloomFilterColumns !== undefined &&
        input.BloomFilterColumns !== null && {
        BloomFilterColumns: serializeAws_json1_1ListOfNonEmptyStringsWithoutWhitespace(input.BloomFilterColumns, context),
    })), (input.BloomFilterFalsePositiveProbability !== undefined &&
        input.BloomFilterFalsePositiveProbability !== null && {
        BloomFilterFalsePositiveProbability: input.BloomFilterFalsePositiveProbability,
    })), (input.Compression !== undefined && input.Compression !== null && { Compression: input.Compression })), (input.DictionaryKeyThreshold !== undefined &&
        input.DictionaryKeyThreshold !== null && { DictionaryKeyThreshold: input.DictionaryKeyThreshold })), (input.EnablePadding !== undefined && input.EnablePadding !== null && { EnablePadding: input.EnablePadding })), (input.FormatVersion !== undefined && input.FormatVersion !== null && { FormatVersion: input.FormatVersion })), (input.PaddingTolerance !== undefined &&
        input.PaddingTolerance !== null && { PaddingTolerance: input.PaddingTolerance })), (input.RowIndexStride !== undefined &&
        input.RowIndexStride !== null && { RowIndexStride: input.RowIndexStride })), (input.StripeSizeBytes !== undefined &&
        input.StripeSizeBytes !== null && { StripeSizeBytes: input.StripeSizeBytes }));
};
var serializeAws_json1_1OutputFormatConfiguration = function (input, context) {
    return __assign({}, (input.Serializer !== undefined &&
        input.Serializer !== null && { Serializer: serializeAws_json1_1Serializer(input.Serializer, context) }));
};
var serializeAws_json1_1ParquetSerDe = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign({}, (input.BlockSizeBytes !== undefined &&
        input.BlockSizeBytes !== null && { BlockSizeBytes: input.BlockSizeBytes })), (input.Compression !== undefined && input.Compression !== null && { Compression: input.Compression })), (input.EnableDictionaryCompression !== undefined &&
        input.EnableDictionaryCompression !== null && { EnableDictionaryCompression: input.EnableDictionaryCompression })), (input.MaxPaddingBytes !== undefined &&
        input.MaxPaddingBytes !== null && { MaxPaddingBytes: input.MaxPaddingBytes })), (input.PageSizeBytes !== undefined && input.PageSizeBytes !== null && { PageSizeBytes: input.PageSizeBytes })), (input.WriterVersion !== undefined && input.WriterVersion !== null && { WriterVersion: input.WriterVersion }));
};
var serializeAws_json1_1ProcessingConfiguration = function (input, context) {
    return __assign(__assign({}, (input.Enabled !== undefined && input.Enabled !== null && { Enabled: input.Enabled })), (input.Processors !== undefined &&
        input.Processors !== null && { Processors: serializeAws_json1_1ProcessorList(input.Processors, context) }));
};
var serializeAws_json1_1Processor = function (input, context) {
    return __assign(__assign({}, (input.Parameters !== undefined &&
        input.Parameters !== null && {
        Parameters: serializeAws_json1_1ProcessorParameterList(input.Parameters, context),
    })), (input.Type !== undefined && input.Type !== null && { Type: input.Type }));
};
var serializeAws_json1_1ProcessorList = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1Processor(entry, context);
    });
};
var serializeAws_json1_1ProcessorParameter = function (input, context) {
    return __assign(__assign({}, (input.ParameterName !== undefined && input.ParameterName !== null && { ParameterName: input.ParameterName })), (input.ParameterValue !== undefined &&
        input.ParameterValue !== null && { ParameterValue: input.ParameterValue }));
};
var serializeAws_json1_1ProcessorParameterList = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1ProcessorParameter(entry, context);
    });
};
var serializeAws_json1_1PutRecordBatchInput = function (input, context) {
    return __assign(__assign({}, (input.DeliveryStreamName !== undefined &&
        input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName })), (input.Records !== undefined &&
        input.Records !== null && {
        Records: serializeAws_json1_1PutRecordBatchRequestEntryList(input.Records, context),
    }));
};
var serializeAws_json1_1PutRecordBatchRequestEntryList = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1_Record(entry, context);
    });
};
var serializeAws_json1_1PutRecordInput = function (input, context) {
    return __assign(__assign({}, (input.DeliveryStreamName !== undefined &&
        input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName })), (input.Record !== undefined &&
        input.Record !== null && { Record: serializeAws_json1_1_Record(input.Record, context) }));
};
var serializeAws_json1_1_Record = function (input, context) {
    return __assign({}, (input.Data !== undefined && input.Data !== null && { Data: context.base64Encoder(input.Data) }));
};
var serializeAws_json1_1RedshiftDestinationConfiguration = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (input.CloudWatchLoggingOptions !== undefined &&
        input.CloudWatchLoggingOptions !== null && {
        CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
    })), (input.ClusterJDBCURL !== undefined &&
        input.ClusterJDBCURL !== null && { ClusterJDBCURL: input.ClusterJDBCURL })), (input.CopyCommand !== undefined &&
        input.CopyCommand !== null && { CopyCommand: serializeAws_json1_1CopyCommand(input.CopyCommand, context) })), (input.Password !== undefined && input.Password !== null && { Password: input.Password })), (input.ProcessingConfiguration !== undefined &&
        input.ProcessingConfiguration !== null && {
        ProcessingConfiguration: serializeAws_json1_1ProcessingConfiguration(input.ProcessingConfiguration, context),
    })), (input.RetryOptions !== undefined &&
        input.RetryOptions !== null && {
        RetryOptions: serializeAws_json1_1RedshiftRetryOptions(input.RetryOptions, context),
    })), (input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN })), (input.S3BackupConfiguration !== undefined &&
        input.S3BackupConfiguration !== null && {
        S3BackupConfiguration: serializeAws_json1_1S3DestinationConfiguration(input.S3BackupConfiguration, context),
    })), (input.S3BackupMode !== undefined && input.S3BackupMode !== null && { S3BackupMode: input.S3BackupMode })), (input.S3Configuration !== undefined &&
        input.S3Configuration !== null && {
        S3Configuration: serializeAws_json1_1S3DestinationConfiguration(input.S3Configuration, context),
    })), (input.Username !== undefined && input.Username !== null && { Username: input.Username }));
};
var serializeAws_json1_1RedshiftDestinationUpdate = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (input.CloudWatchLoggingOptions !== undefined &&
        input.CloudWatchLoggingOptions !== null && {
        CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
    })), (input.ClusterJDBCURL !== undefined &&
        input.ClusterJDBCURL !== null && { ClusterJDBCURL: input.ClusterJDBCURL })), (input.CopyCommand !== undefined &&
        input.CopyCommand !== null && { CopyCommand: serializeAws_json1_1CopyCommand(input.CopyCommand, context) })), (input.Password !== undefined && input.Password !== null && { Password: input.Password })), (input.ProcessingConfiguration !== undefined &&
        input.ProcessingConfiguration !== null && {
        ProcessingConfiguration: serializeAws_json1_1ProcessingConfiguration(input.ProcessingConfiguration, context),
    })), (input.RetryOptions !== undefined &&
        input.RetryOptions !== null && {
        RetryOptions: serializeAws_json1_1RedshiftRetryOptions(input.RetryOptions, context),
    })), (input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN })), (input.S3BackupMode !== undefined && input.S3BackupMode !== null && { S3BackupMode: input.S3BackupMode })), (input.S3BackupUpdate !== undefined &&
        input.S3BackupUpdate !== null && {
        S3BackupUpdate: serializeAws_json1_1S3DestinationUpdate(input.S3BackupUpdate, context),
    })), (input.S3Update !== undefined &&
        input.S3Update !== null && { S3Update: serializeAws_json1_1S3DestinationUpdate(input.S3Update, context) })), (input.Username !== undefined && input.Username !== null && { Username: input.Username }));
};
var serializeAws_json1_1RedshiftRetryOptions = function (input, context) {
    return __assign({}, (input.DurationInSeconds !== undefined &&
        input.DurationInSeconds !== null && { DurationInSeconds: input.DurationInSeconds }));
};
var serializeAws_json1_1S3DestinationConfiguration = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (input.BucketARN !== undefined && input.BucketARN !== null && { BucketARN: input.BucketARN })), (input.BufferingHints !== undefined &&
        input.BufferingHints !== null && {
        BufferingHints: serializeAws_json1_1BufferingHints(input.BufferingHints, context),
    })), (input.CloudWatchLoggingOptions !== undefined &&
        input.CloudWatchLoggingOptions !== null && {
        CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
    })), (input.CompressionFormat !== undefined &&
        input.CompressionFormat !== null && { CompressionFormat: input.CompressionFormat })), (input.EncryptionConfiguration !== undefined &&
        input.EncryptionConfiguration !== null && {
        EncryptionConfiguration: serializeAws_json1_1EncryptionConfiguration(input.EncryptionConfiguration, context),
    })), (input.ErrorOutputPrefix !== undefined &&
        input.ErrorOutputPrefix !== null && { ErrorOutputPrefix: input.ErrorOutputPrefix })), (input.Prefix !== undefined && input.Prefix !== null && { Prefix: input.Prefix })), (input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN }));
};
var serializeAws_json1_1S3DestinationUpdate = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (input.BucketARN !== undefined && input.BucketARN !== null && { BucketARN: input.BucketARN })), (input.BufferingHints !== undefined &&
        input.BufferingHints !== null && {
        BufferingHints: serializeAws_json1_1BufferingHints(input.BufferingHints, context),
    })), (input.CloudWatchLoggingOptions !== undefined &&
        input.CloudWatchLoggingOptions !== null && {
        CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
    })), (input.CompressionFormat !== undefined &&
        input.CompressionFormat !== null && { CompressionFormat: input.CompressionFormat })), (input.EncryptionConfiguration !== undefined &&
        input.EncryptionConfiguration !== null && {
        EncryptionConfiguration: serializeAws_json1_1EncryptionConfiguration(input.EncryptionConfiguration, context),
    })), (input.ErrorOutputPrefix !== undefined &&
        input.ErrorOutputPrefix !== null && { ErrorOutputPrefix: input.ErrorOutputPrefix })), (input.Prefix !== undefined && input.Prefix !== null && { Prefix: input.Prefix })), (input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN }));
};
var serializeAws_json1_1SchemaConfiguration = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign({}, (input.CatalogId !== undefined && input.CatalogId !== null && { CatalogId: input.CatalogId })), (input.DatabaseName !== undefined && input.DatabaseName !== null && { DatabaseName: input.DatabaseName })), (input.Region !== undefined && input.Region !== null && { Region: input.Region })), (input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN })), (input.TableName !== undefined && input.TableName !== null && { TableName: input.TableName })), (input.VersionId !== undefined && input.VersionId !== null && { VersionId: input.VersionId }));
};
var serializeAws_json1_1SecurityGroupIdList = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var serializeAws_json1_1Serializer = function (input, context) {
    return __assign(__assign({}, (input.OrcSerDe !== undefined &&
        input.OrcSerDe !== null && { OrcSerDe: serializeAws_json1_1OrcSerDe(input.OrcSerDe, context) })), (input.ParquetSerDe !== undefined &&
        input.ParquetSerDe !== null && { ParquetSerDe: serializeAws_json1_1ParquetSerDe(input.ParquetSerDe, context) }));
};
var serializeAws_json1_1SplunkDestinationConfiguration = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (input.CloudWatchLoggingOptions !== undefined &&
        input.CloudWatchLoggingOptions !== null && {
        CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
    })), (input.HECAcknowledgmentTimeoutInSeconds !== undefined &&
        input.HECAcknowledgmentTimeoutInSeconds !== null && {
        HECAcknowledgmentTimeoutInSeconds: input.HECAcknowledgmentTimeoutInSeconds,
    })), (input.HECEndpoint !== undefined && input.HECEndpoint !== null && { HECEndpoint: input.HECEndpoint })), (input.HECEndpointType !== undefined &&
        input.HECEndpointType !== null && { HECEndpointType: input.HECEndpointType })), (input.HECToken !== undefined && input.HECToken !== null && { HECToken: input.HECToken })), (input.ProcessingConfiguration !== undefined &&
        input.ProcessingConfiguration !== null && {
        ProcessingConfiguration: serializeAws_json1_1ProcessingConfiguration(input.ProcessingConfiguration, context),
    })), (input.RetryOptions !== undefined &&
        input.RetryOptions !== null && {
        RetryOptions: serializeAws_json1_1SplunkRetryOptions(input.RetryOptions, context),
    })), (input.S3BackupMode !== undefined && input.S3BackupMode !== null && { S3BackupMode: input.S3BackupMode })), (input.S3Configuration !== undefined &&
        input.S3Configuration !== null && {
        S3Configuration: serializeAws_json1_1S3DestinationConfiguration(input.S3Configuration, context),
    }));
};
var serializeAws_json1_1SplunkDestinationUpdate = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (input.CloudWatchLoggingOptions !== undefined &&
        input.CloudWatchLoggingOptions !== null && {
        CloudWatchLoggingOptions: serializeAws_json1_1CloudWatchLoggingOptions(input.CloudWatchLoggingOptions, context),
    })), (input.HECAcknowledgmentTimeoutInSeconds !== undefined &&
        input.HECAcknowledgmentTimeoutInSeconds !== null && {
        HECAcknowledgmentTimeoutInSeconds: input.HECAcknowledgmentTimeoutInSeconds,
    })), (input.HECEndpoint !== undefined && input.HECEndpoint !== null && { HECEndpoint: input.HECEndpoint })), (input.HECEndpointType !== undefined &&
        input.HECEndpointType !== null && { HECEndpointType: input.HECEndpointType })), (input.HECToken !== undefined && input.HECToken !== null && { HECToken: input.HECToken })), (input.ProcessingConfiguration !== undefined &&
        input.ProcessingConfiguration !== null && {
        ProcessingConfiguration: serializeAws_json1_1ProcessingConfiguration(input.ProcessingConfiguration, context),
    })), (input.RetryOptions !== undefined &&
        input.RetryOptions !== null && {
        RetryOptions: serializeAws_json1_1SplunkRetryOptions(input.RetryOptions, context),
    })), (input.S3BackupMode !== undefined && input.S3BackupMode !== null && { S3BackupMode: input.S3BackupMode })), (input.S3Update !== undefined &&
        input.S3Update !== null && { S3Update: serializeAws_json1_1S3DestinationUpdate(input.S3Update, context) }));
};
var serializeAws_json1_1SplunkRetryOptions = function (input, context) {
    return __assign({}, (input.DurationInSeconds !== undefined &&
        input.DurationInSeconds !== null && { DurationInSeconds: input.DurationInSeconds }));
};
var serializeAws_json1_1StartDeliveryStreamEncryptionInput = function (input, context) {
    return __assign(__assign({}, (input.DeliveryStreamEncryptionConfigurationInput !== undefined &&
        input.DeliveryStreamEncryptionConfigurationInput !== null && {
        DeliveryStreamEncryptionConfigurationInput: serializeAws_json1_1DeliveryStreamEncryptionConfigurationInput(input.DeliveryStreamEncryptionConfigurationInput, context),
    })), (input.DeliveryStreamName !== undefined &&
        input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName }));
};
var serializeAws_json1_1StopDeliveryStreamEncryptionInput = function (input, context) {
    return __assign({}, (input.DeliveryStreamName !== undefined &&
        input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName }));
};
var serializeAws_json1_1SubnetIdList = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var serializeAws_json1_1Tag = function (input, context) {
    return __assign(__assign({}, (input.Key !== undefined && input.Key !== null && { Key: input.Key })), (input.Value !== undefined && input.Value !== null && { Value: input.Value }));
};
var serializeAws_json1_1TagDeliveryStreamInput = function (input, context) {
    return __assign(__assign({}, (input.DeliveryStreamName !== undefined &&
        input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName })), (input.Tags !== undefined &&
        input.Tags !== null && { Tags: serializeAws_json1_1TagDeliveryStreamInputTagList(input.Tags, context) }));
};
var serializeAws_json1_1TagDeliveryStreamInputTagList = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1Tag(entry, context);
    });
};
var serializeAws_json1_1TagKeyList = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var serializeAws_json1_1UntagDeliveryStreamInput = function (input, context) {
    return __assign(__assign({}, (input.DeliveryStreamName !== undefined &&
        input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName })), (input.TagKeys !== undefined &&
        input.TagKeys !== null && { TagKeys: serializeAws_json1_1TagKeyList(input.TagKeys, context) }));
};
var serializeAws_json1_1UpdateDestinationInput = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (input.CurrentDeliveryStreamVersionId !== undefined &&
        input.CurrentDeliveryStreamVersionId !== null && {
        CurrentDeliveryStreamVersionId: input.CurrentDeliveryStreamVersionId,
    })), (input.DeliveryStreamName !== undefined &&
        input.DeliveryStreamName !== null && { DeliveryStreamName: input.DeliveryStreamName })), (input.DestinationId !== undefined && input.DestinationId !== null && { DestinationId: input.DestinationId })), (input.ElasticsearchDestinationUpdate !== undefined &&
        input.ElasticsearchDestinationUpdate !== null && {
        ElasticsearchDestinationUpdate: serializeAws_json1_1ElasticsearchDestinationUpdate(input.ElasticsearchDestinationUpdate, context),
    })), (input.ExtendedS3DestinationUpdate !== undefined &&
        input.ExtendedS3DestinationUpdate !== null && {
        ExtendedS3DestinationUpdate: serializeAws_json1_1ExtendedS3DestinationUpdate(input.ExtendedS3DestinationUpdate, context),
    })), (input.HttpEndpointDestinationUpdate !== undefined &&
        input.HttpEndpointDestinationUpdate !== null && {
        HttpEndpointDestinationUpdate: serializeAws_json1_1HttpEndpointDestinationUpdate(input.HttpEndpointDestinationUpdate, context),
    })), (input.RedshiftDestinationUpdate !== undefined &&
        input.RedshiftDestinationUpdate !== null && {
        RedshiftDestinationUpdate: serializeAws_json1_1RedshiftDestinationUpdate(input.RedshiftDestinationUpdate, context),
    })), (input.S3DestinationUpdate !== undefined &&
        input.S3DestinationUpdate !== null && {
        S3DestinationUpdate: serializeAws_json1_1S3DestinationUpdate(input.S3DestinationUpdate, context),
    })), (input.SplunkDestinationUpdate !== undefined &&
        input.SplunkDestinationUpdate !== null && {
        SplunkDestinationUpdate: serializeAws_json1_1SplunkDestinationUpdate(input.SplunkDestinationUpdate, context),
    }));
};
var serializeAws_json1_1VpcConfiguration = function (input, context) {
    return __assign(__assign(__assign({}, (input.RoleARN !== undefined && input.RoleARN !== null && { RoleARN: input.RoleARN })), (input.SecurityGroupIds !== undefined &&
        input.SecurityGroupIds !== null && {
        SecurityGroupIds: serializeAws_json1_1SecurityGroupIdList(input.SecurityGroupIds, context),
    })), (input.SubnetIds !== undefined &&
        input.SubnetIds !== null && { SubnetIds: serializeAws_json1_1SubnetIdList(input.SubnetIds, context) }));
};
var deserializeAws_json1_1BufferingHints = function (output, context) {
    return {
        IntervalInSeconds: output.IntervalInSeconds !== undefined && output.IntervalInSeconds !== null
            ? output.IntervalInSeconds
            : undefined,
        SizeInMBs: output.SizeInMBs !== undefined && output.SizeInMBs !== null ? output.SizeInMBs : undefined,
    };
};
var deserializeAws_json1_1CloudWatchLoggingOptions = function (output, context) {
    return {
        Enabled: output.Enabled !== undefined && output.Enabled !== null ? output.Enabled : undefined,
        LogGroupName: output.LogGroupName !== undefined && output.LogGroupName !== null ? output.LogGroupName : undefined,
        LogStreamName: output.LogStreamName !== undefined && output.LogStreamName !== null ? output.LogStreamName : undefined,
    };
};
var deserializeAws_json1_1ColumnToJsonKeyMappings = function (output, context) {
    return Object.entries(output).reduce(function (acc, _a) {
        var _b;
        var _c = __read(_a, 2), key = _c[0], value = _c[1];
        if (value === null) {
            return acc;
        }
        return __assign(__assign({}, acc), (_b = {}, _b[key] = value, _b));
    }, {});
};
var deserializeAws_json1_1ConcurrentModificationException = function (output, context) {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
var deserializeAws_json1_1CopyCommand = function (output, context) {
    return {
        CopyOptions: output.CopyOptions !== undefined && output.CopyOptions !== null ? output.CopyOptions : undefined,
        DataTableColumns: output.DataTableColumns !== undefined && output.DataTableColumns !== null ? output.DataTableColumns : undefined,
        DataTableName: output.DataTableName !== undefined && output.DataTableName !== null ? output.DataTableName : undefined,
    };
};
var deserializeAws_json1_1CreateDeliveryStreamOutput = function (output, context) {
    return {
        DeliveryStreamARN: output.DeliveryStreamARN !== undefined && output.DeliveryStreamARN !== null
            ? output.DeliveryStreamARN
            : undefined,
    };
};
var deserializeAws_json1_1DataFormatConversionConfiguration = function (output, context) {
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
var deserializeAws_json1_1DeleteDeliveryStreamOutput = function (output, context) {
    return {};
};
var deserializeAws_json1_1DeliveryStreamDescription = function (output, context) {
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
var deserializeAws_json1_1DeliveryStreamEncryptionConfiguration = function (output, context) {
    return {
        FailureDescription: output.FailureDescription !== undefined && output.FailureDescription !== null
            ? deserializeAws_json1_1FailureDescription(output.FailureDescription, context)
            : undefined,
        KeyARN: output.KeyARN !== undefined && output.KeyARN !== null ? output.KeyARN : undefined,
        KeyType: output.KeyType !== undefined && output.KeyType !== null ? output.KeyType : undefined,
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
    };
};
var deserializeAws_json1_1DeliveryStreamNameList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var deserializeAws_json1_1DescribeDeliveryStreamOutput = function (output, context) {
    return {
        DeliveryStreamDescription: output.DeliveryStreamDescription !== undefined && output.DeliveryStreamDescription !== null
            ? deserializeAws_json1_1DeliveryStreamDescription(output.DeliveryStreamDescription, context)
            : undefined,
    };
};
var deserializeAws_json1_1Deserializer = function (output, context) {
    return {
        HiveJsonSerDe: output.HiveJsonSerDe !== undefined && output.HiveJsonSerDe !== null
            ? deserializeAws_json1_1HiveJsonSerDe(output.HiveJsonSerDe, context)
            : undefined,
        OpenXJsonSerDe: output.OpenXJsonSerDe !== undefined && output.OpenXJsonSerDe !== null
            ? deserializeAws_json1_1OpenXJsonSerDe(output.OpenXJsonSerDe, context)
            : undefined,
    };
};
var deserializeAws_json1_1DestinationDescription = function (output, context) {
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
var deserializeAws_json1_1DestinationDescriptionList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1DestinationDescription(entry, context);
    });
};
var deserializeAws_json1_1ElasticsearchBufferingHints = function (output, context) {
    return {
        IntervalInSeconds: output.IntervalInSeconds !== undefined && output.IntervalInSeconds !== null
            ? output.IntervalInSeconds
            : undefined,
        SizeInMBs: output.SizeInMBs !== undefined && output.SizeInMBs !== null ? output.SizeInMBs : undefined,
    };
};
var deserializeAws_json1_1ElasticsearchDestinationDescription = function (output, context) {
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
var deserializeAws_json1_1ElasticsearchRetryOptions = function (output, context) {
    return {
        DurationInSeconds: output.DurationInSeconds !== undefined && output.DurationInSeconds !== null
            ? output.DurationInSeconds
            : undefined,
    };
};
var deserializeAws_json1_1EncryptionConfiguration = function (output, context) {
    return {
        KMSEncryptionConfig: output.KMSEncryptionConfig !== undefined && output.KMSEncryptionConfig !== null
            ? deserializeAws_json1_1KMSEncryptionConfig(output.KMSEncryptionConfig, context)
            : undefined,
        NoEncryptionConfig: output.NoEncryptionConfig !== undefined && output.NoEncryptionConfig !== null
            ? output.NoEncryptionConfig
            : undefined,
    };
};
var deserializeAws_json1_1ExtendedS3DestinationDescription = function (output, context) {
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
var deserializeAws_json1_1FailureDescription = function (output, context) {
    return {
        Details: output.Details !== undefined && output.Details !== null ? output.Details : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
var deserializeAws_json1_1HiveJsonSerDe = function (output, context) {
    return {
        TimestampFormats: output.TimestampFormats !== undefined && output.TimestampFormats !== null
            ? deserializeAws_json1_1ListOfNonEmptyStrings(output.TimestampFormats, context)
            : undefined,
    };
};
var deserializeAws_json1_1HttpEndpointBufferingHints = function (output, context) {
    return {
        IntervalInSeconds: output.IntervalInSeconds !== undefined && output.IntervalInSeconds !== null
            ? output.IntervalInSeconds
            : undefined,
        SizeInMBs: output.SizeInMBs !== undefined && output.SizeInMBs !== null ? output.SizeInMBs : undefined,
    };
};
var deserializeAws_json1_1HttpEndpointCommonAttribute = function (output, context) {
    return {
        AttributeName: output.AttributeName !== undefined && output.AttributeName !== null ? output.AttributeName : undefined,
        AttributeValue: output.AttributeValue !== undefined && output.AttributeValue !== null ? output.AttributeValue : undefined,
    };
};
var deserializeAws_json1_1HttpEndpointCommonAttributesList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1HttpEndpointCommonAttribute(entry, context);
    });
};
var deserializeAws_json1_1HttpEndpointDescription = function (output, context) {
    return {
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        Url: output.Url !== undefined && output.Url !== null ? output.Url : undefined,
    };
};
var deserializeAws_json1_1HttpEndpointDestinationDescription = function (output, context) {
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
var deserializeAws_json1_1HttpEndpointRequestConfiguration = function (output, context) {
    return {
        CommonAttributes: output.CommonAttributes !== undefined && output.CommonAttributes !== null
            ? deserializeAws_json1_1HttpEndpointCommonAttributesList(output.CommonAttributes, context)
            : undefined,
        ContentEncoding: output.ContentEncoding !== undefined && output.ContentEncoding !== null ? output.ContentEncoding : undefined,
    };
};
var deserializeAws_json1_1HttpEndpointRetryOptions = function (output, context) {
    return {
        DurationInSeconds: output.DurationInSeconds !== undefined && output.DurationInSeconds !== null
            ? output.DurationInSeconds
            : undefined,
    };
};
var deserializeAws_json1_1InputFormatConfiguration = function (output, context) {
    return {
        Deserializer: output.Deserializer !== undefined && output.Deserializer !== null
            ? deserializeAws_json1_1Deserializer(output.Deserializer, context)
            : undefined,
    };
};
var deserializeAws_json1_1InvalidArgumentException = function (output, context) {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
var deserializeAws_json1_1InvalidKMSResourceException = function (output, context) {
    return {
        code: output.code !== undefined && output.code !== null ? output.code : undefined,
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
var deserializeAws_json1_1KinesisStreamSourceDescription = function (output, context) {
    return {
        DeliveryStartTimestamp: output.DeliveryStartTimestamp !== undefined && output.DeliveryStartTimestamp !== null
            ? new Date(Math.round(output.DeliveryStartTimestamp * 1000))
            : undefined,
        KinesisStreamARN: output.KinesisStreamARN !== undefined && output.KinesisStreamARN !== null ? output.KinesisStreamARN : undefined,
        RoleARN: output.RoleARN !== undefined && output.RoleARN !== null ? output.RoleARN : undefined,
    };
};
var deserializeAws_json1_1KMSEncryptionConfig = function (output, context) {
    return {
        AWSKMSKeyARN: output.AWSKMSKeyARN !== undefined && output.AWSKMSKeyARN !== null ? output.AWSKMSKeyARN : undefined,
    };
};
var deserializeAws_json1_1LimitExceededException = function (output, context) {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
var deserializeAws_json1_1ListDeliveryStreamsOutput = function (output, context) {
    return {
        DeliveryStreamNames: output.DeliveryStreamNames !== undefined && output.DeliveryStreamNames !== null
            ? deserializeAws_json1_1DeliveryStreamNameList(output.DeliveryStreamNames, context)
            : undefined,
        HasMoreDeliveryStreams: output.HasMoreDeliveryStreams !== undefined && output.HasMoreDeliveryStreams !== null
            ? output.HasMoreDeliveryStreams
            : undefined,
    };
};
var deserializeAws_json1_1ListOfNonEmptyStrings = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var deserializeAws_json1_1ListOfNonEmptyStringsWithoutWhitespace = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var deserializeAws_json1_1ListTagsForDeliveryStreamOutput = function (output, context) {
    return {
        HasMoreTags: output.HasMoreTags !== undefined && output.HasMoreTags !== null ? output.HasMoreTags : undefined,
        Tags: output.Tags !== undefined && output.Tags !== null
            ? deserializeAws_json1_1ListTagsForDeliveryStreamOutputTagList(output.Tags, context)
            : undefined,
    };
};
var deserializeAws_json1_1ListTagsForDeliveryStreamOutputTagList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Tag(entry, context);
    });
};
var deserializeAws_json1_1OpenXJsonSerDe = function (output, context) {
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
var deserializeAws_json1_1OrcSerDe = function (output, context) {
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
var deserializeAws_json1_1OutputFormatConfiguration = function (output, context) {
    return {
        Serializer: output.Serializer !== undefined && output.Serializer !== null
            ? deserializeAws_json1_1Serializer(output.Serializer, context)
            : undefined,
    };
};
var deserializeAws_json1_1ParquetSerDe = function (output, context) {
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
var deserializeAws_json1_1ProcessingConfiguration = function (output, context) {
    return {
        Enabled: output.Enabled !== undefined && output.Enabled !== null ? output.Enabled : undefined,
        Processors: output.Processors !== undefined && output.Processors !== null
            ? deserializeAws_json1_1ProcessorList(output.Processors, context)
            : undefined,
    };
};
var deserializeAws_json1_1Processor = function (output, context) {
    return {
        Parameters: output.Parameters !== undefined && output.Parameters !== null
            ? deserializeAws_json1_1ProcessorParameterList(output.Parameters, context)
            : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
var deserializeAws_json1_1ProcessorList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Processor(entry, context);
    });
};
var deserializeAws_json1_1ProcessorParameter = function (output, context) {
    return {
        ParameterName: output.ParameterName !== undefined && output.ParameterName !== null ? output.ParameterName : undefined,
        ParameterValue: output.ParameterValue !== undefined && output.ParameterValue !== null ? output.ParameterValue : undefined,
    };
};
var deserializeAws_json1_1ProcessorParameterList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ProcessorParameter(entry, context);
    });
};
var deserializeAws_json1_1PutRecordBatchOutput = function (output, context) {
    return {
        Encrypted: output.Encrypted !== undefined && output.Encrypted !== null ? output.Encrypted : undefined,
        FailedPutCount: output.FailedPutCount !== undefined && output.FailedPutCount !== null ? output.FailedPutCount : undefined,
        RequestResponses: output.RequestResponses !== undefined && output.RequestResponses !== null
            ? deserializeAws_json1_1PutRecordBatchResponseEntryList(output.RequestResponses, context)
            : undefined,
    };
};
var deserializeAws_json1_1PutRecordBatchResponseEntry = function (output, context) {
    return {
        ErrorCode: output.ErrorCode !== undefined && output.ErrorCode !== null ? output.ErrorCode : undefined,
        ErrorMessage: output.ErrorMessage !== undefined && output.ErrorMessage !== null ? output.ErrorMessage : undefined,
        RecordId: output.RecordId !== undefined && output.RecordId !== null ? output.RecordId : undefined,
    };
};
var deserializeAws_json1_1PutRecordBatchResponseEntryList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1PutRecordBatchResponseEntry(entry, context);
    });
};
var deserializeAws_json1_1PutRecordOutput = function (output, context) {
    return {
        Encrypted: output.Encrypted !== undefined && output.Encrypted !== null ? output.Encrypted : undefined,
        RecordId: output.RecordId !== undefined && output.RecordId !== null ? output.RecordId : undefined,
    };
};
var deserializeAws_json1_1RedshiftDestinationDescription = function (output, context) {
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
var deserializeAws_json1_1RedshiftRetryOptions = function (output, context) {
    return {
        DurationInSeconds: output.DurationInSeconds !== undefined && output.DurationInSeconds !== null
            ? output.DurationInSeconds
            : undefined,
    };
};
var deserializeAws_json1_1ResourceInUseException = function (output, context) {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
var deserializeAws_json1_1ResourceNotFoundException = function (output, context) {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
var deserializeAws_json1_1S3DestinationDescription = function (output, context) {
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
var deserializeAws_json1_1SchemaConfiguration = function (output, context) {
    return {
        CatalogId: output.CatalogId !== undefined && output.CatalogId !== null ? output.CatalogId : undefined,
        DatabaseName: output.DatabaseName !== undefined && output.DatabaseName !== null ? output.DatabaseName : undefined,
        Region: output.Region !== undefined && output.Region !== null ? output.Region : undefined,
        RoleARN: output.RoleARN !== undefined && output.RoleARN !== null ? output.RoleARN : undefined,
        TableName: output.TableName !== undefined && output.TableName !== null ? output.TableName : undefined,
        VersionId: output.VersionId !== undefined && output.VersionId !== null ? output.VersionId : undefined,
    };
};
var deserializeAws_json1_1SecurityGroupIdList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var deserializeAws_json1_1Serializer = function (output, context) {
    return {
        OrcSerDe: output.OrcSerDe !== undefined && output.OrcSerDe !== null
            ? deserializeAws_json1_1OrcSerDe(output.OrcSerDe, context)
            : undefined,
        ParquetSerDe: output.ParquetSerDe !== undefined && output.ParquetSerDe !== null
            ? deserializeAws_json1_1ParquetSerDe(output.ParquetSerDe, context)
            : undefined,
    };
};
var deserializeAws_json1_1ServiceUnavailableException = function (output, context) {
    return {
        message: output.message !== undefined && output.message !== null ? output.message : undefined,
    };
};
var deserializeAws_json1_1SourceDescription = function (output, context) {
    return {
        KinesisStreamSourceDescription: output.KinesisStreamSourceDescription !== undefined && output.KinesisStreamSourceDescription !== null
            ? deserializeAws_json1_1KinesisStreamSourceDescription(output.KinesisStreamSourceDescription, context)
            : undefined,
    };
};
var deserializeAws_json1_1SplunkDestinationDescription = function (output, context) {
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
var deserializeAws_json1_1SplunkRetryOptions = function (output, context) {
    return {
        DurationInSeconds: output.DurationInSeconds !== undefined && output.DurationInSeconds !== null
            ? output.DurationInSeconds
            : undefined,
    };
};
var deserializeAws_json1_1StartDeliveryStreamEncryptionOutput = function (output, context) {
    return {};
};
var deserializeAws_json1_1StopDeliveryStreamEncryptionOutput = function (output, context) {
    return {};
};
var deserializeAws_json1_1SubnetIdList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var deserializeAws_json1_1Tag = function (output, context) {
    return {
        Key: output.Key !== undefined && output.Key !== null ? output.Key : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
var deserializeAws_json1_1TagDeliveryStreamOutput = function (output, context) {
    return {};
};
var deserializeAws_json1_1UntagDeliveryStreamOutput = function (output, context) {
    return {};
};
var deserializeAws_json1_1UpdateDestinationOutput = function (output, context) {
    return {};
};
var deserializeAws_json1_1VpcConfigurationDescription = function (output, context) {
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
var deserializeMetadata = function (output) {
    var _a;
    return ({
        httpStatusCode: output.statusCode,
        requestId: (_a = output.headers["x-amzn-requestid"]) !== null && _a !== void 0 ? _a : output.headers["x-amzn-request-id"],
        extendedRequestId: output.headers["x-amz-id-2"],
        cfId: output.headers["x-amz-cf-id"],
    });
};
// Collect low-level response body stream to Uint8Array.
var collectBody = function (streamBody, context) {
    if (streamBody === void 0) { streamBody = new Uint8Array(); }
    if (streamBody instanceof Uint8Array) {
        return Promise.resolve(streamBody);
    }
    return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};
// Encode Uint8Array data into string with utf-8.
var collectBodyString = function (streamBody, context) {
    return collectBody(streamBody, context).then(function (body) { return context.utf8Encoder(body); });
};
var buildHttpRpcRequest = function (context, headers, path, resolvedHostname, body) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hostname, _b, protocol, port, contents;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, context.endpoint()];
            case 1:
                _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port;
                contents = {
                    protocol: protocol,
                    hostname: hostname,
                    port: port,
                    method: "POST",
                    path: path,
                    headers: headers,
                };
                if (resolvedHostname !== undefined) {
                    contents.hostname = resolvedHostname;
                }
                if (body !== undefined) {
                    contents.body = body;
                }
                return [2 /*return*/, new __HttpRequest(contents)];
        }
    });
}); };
var parseBody = function (streamBody, context) {
    return collectBodyString(streamBody, context).then(function (encoded) {
        if (encoded.length) {
            return JSON.parse(encoded);
        }
        return {};
    });
};
/**
 * Load an error code for the aws.rest-json-1.1 protocol.
 */
var loadRestJsonErrorCode = function (output, data) {
    var findKey = function (object, key) { return Object.keys(object).find(function (k) { return k.toLowerCase() === key.toLowerCase(); }); };
    var sanitizeErrorCode = function (rawValue) {
        var cleanValue = rawValue;
        if (cleanValue.indexOf(":") >= 0) {
            cleanValue = cleanValue.split(":")[0];
        }
        if (cleanValue.indexOf("#") >= 0) {
            cleanValue = cleanValue.split("#")[1];
        }
        return cleanValue;
    };
    var headerKey = findKey(output.headers, "x-amzn-errortype");
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
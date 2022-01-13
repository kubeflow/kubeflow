import { __assign, __awaiter, __generator } from "tslib";
import { HttpRequest as __HttpRequest } from "@aws-sdk/protocol-http";
import { LazyJsonString as __LazyJsonString } from "@aws-sdk/smithy-client";
export var serializeAws_json1_1AnalyzeDocumentCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Textract.AnalyzeDocument",
        };
        body = JSON.stringify(serializeAws_json1_1AnalyzeDocumentRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DetectDocumentTextCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Textract.DetectDocumentText",
        };
        body = JSON.stringify(serializeAws_json1_1DetectDocumentTextRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1GetDocumentAnalysisCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Textract.GetDocumentAnalysis",
        };
        body = JSON.stringify(serializeAws_json1_1GetDocumentAnalysisRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1GetDocumentTextDetectionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Textract.GetDocumentTextDetection",
        };
        body = JSON.stringify(serializeAws_json1_1GetDocumentTextDetectionRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartDocumentAnalysisCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Textract.StartDocumentAnalysis",
        };
        body = JSON.stringify(serializeAws_json1_1StartDocumentAnalysisRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartDocumentTextDetectionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Textract.StartDocumentTextDetection",
        };
        body = JSON.stringify(serializeAws_json1_1StartDocumentTextDetectionRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var deserializeAws_json1_1AnalyzeDocumentCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1AnalyzeDocumentCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1AnalyzeDocumentResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1AnalyzeDocumentCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, parsedBody, message;
    var _o;
    return __generator(this, function (_p) {
        switch (_p.label) {
            case 0:
                _a = [__assign({}, output)];
                _o = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_o.body = _p.sent(), _o)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.textract#AccessDeniedException": return [3 /*break*/, 2];
                    case "BadDocumentException": return [3 /*break*/, 4];
                    case "com.amazonaws.textract#BadDocumentException": return [3 /*break*/, 4];
                    case "DocumentTooLargeException": return [3 /*break*/, 6];
                    case "com.amazonaws.textract#DocumentTooLargeException": return [3 /*break*/, 6];
                    case "HumanLoopQuotaExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.textract#HumanLoopQuotaExceededException": return [3 /*break*/, 8];
                    case "InternalServerError": return [3 /*break*/, 10];
                    case "com.amazonaws.textract#InternalServerError": return [3 /*break*/, 10];
                    case "InvalidParameterException": return [3 /*break*/, 12];
                    case "com.amazonaws.textract#InvalidParameterException": return [3 /*break*/, 12];
                    case "InvalidS3ObjectException": return [3 /*break*/, 14];
                    case "com.amazonaws.textract#InvalidS3ObjectException": return [3 /*break*/, 14];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 16];
                    case "com.amazonaws.textract#ProvisionedThroughputExceededException": return [3 /*break*/, 16];
                    case "ThrottlingException": return [3 /*break*/, 18];
                    case "com.amazonaws.textract#ThrottlingException": return [3 /*break*/, 18];
                    case "UnsupportedDocumentException": return [3 /*break*/, 20];
                    case "com.amazonaws.textract#UnsupportedDocumentException": return [3 /*break*/, 20];
                }
                return [3 /*break*/, 22];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1BadDocumentExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1DocumentTooLargeExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1HumanLoopQuotaExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 16:
                _k = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 17:
                response = __assign.apply(void 0, [__assign.apply(void 0, _k.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 18:
                _l = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 19:
                response = __assign.apply(void 0, [__assign.apply(void 0, _l.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 20:
                _m = [{}];
                return [4 /*yield*/, deserializeAws_json1_1UnsupportedDocumentExceptionResponse(parsedOutput, context)];
            case 21:
                response = __assign.apply(void 0, [__assign.apply(void 0, _m.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 22:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _p.label = 23;
            case 23:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1DetectDocumentTextCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DetectDocumentTextCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DetectDocumentTextResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DetectDocumentTextCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, parsedBody, message;
    var _m;
    return __generator(this, function (_o) {
        switch (_o.label) {
            case 0:
                _a = [__assign({}, output)];
                _m = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_m.body = _o.sent(), _m)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.textract#AccessDeniedException": return [3 /*break*/, 2];
                    case "BadDocumentException": return [3 /*break*/, 4];
                    case "com.amazonaws.textract#BadDocumentException": return [3 /*break*/, 4];
                    case "DocumentTooLargeException": return [3 /*break*/, 6];
                    case "com.amazonaws.textract#DocumentTooLargeException": return [3 /*break*/, 6];
                    case "InternalServerError": return [3 /*break*/, 8];
                    case "com.amazonaws.textract#InternalServerError": return [3 /*break*/, 8];
                    case "InvalidParameterException": return [3 /*break*/, 10];
                    case "com.amazonaws.textract#InvalidParameterException": return [3 /*break*/, 10];
                    case "InvalidS3ObjectException": return [3 /*break*/, 12];
                    case "com.amazonaws.textract#InvalidS3ObjectException": return [3 /*break*/, 12];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "com.amazonaws.textract#ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "ThrottlingException": return [3 /*break*/, 16];
                    case "com.amazonaws.textract#ThrottlingException": return [3 /*break*/, 16];
                    case "UnsupportedDocumentException": return [3 /*break*/, 18];
                    case "com.amazonaws.textract#UnsupportedDocumentException": return [3 /*break*/, 18];
                }
                return [3 /*break*/, 20];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1BadDocumentExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1DocumentTooLargeExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 16:
                _k = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 17:
                response = __assign.apply(void 0, [__assign.apply(void 0, _k.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 18:
                _l = [{}];
                return [4 /*yield*/, deserializeAws_json1_1UnsupportedDocumentExceptionResponse(parsedOutput, context)];
            case 19:
                response = __assign.apply(void 0, [__assign.apply(void 0, _l.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 20:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _o.label = 21;
            case 21:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1GetDocumentAnalysisCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1GetDocumentAnalysisCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1GetDocumentAnalysisResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1GetDocumentAnalysisCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, _j, parsedBody, message;
    var _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0:
                _a = [__assign({}, output)];
                _k = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_k.body = _l.sent(), _k)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.textract#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.textract#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidJobIdException": return [3 /*break*/, 6];
                    case "com.amazonaws.textract#InvalidJobIdException": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.textract#InvalidParameterException": return [3 /*break*/, 8];
                    case "InvalidS3ObjectException": return [3 /*break*/, 10];
                    case "com.amazonaws.textract#InvalidS3ObjectException": return [3 /*break*/, 10];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 12];
                    case "com.amazonaws.textract#ProvisionedThroughputExceededException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.textract#ThrottlingException": return [3 /*break*/, 14];
                }
                return [3 /*break*/, 16];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidJobIdExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 16:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _l.label = 17;
            case 17:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1GetDocumentTextDetectionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1GetDocumentTextDetectionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1GetDocumentTextDetectionResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1GetDocumentTextDetectionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, _j, parsedBody, message;
    var _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0:
                _a = [__assign({}, output)];
                _k = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_k.body = _l.sent(), _k)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.textract#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.textract#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidJobIdException": return [3 /*break*/, 6];
                    case "com.amazonaws.textract#InvalidJobIdException": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.textract#InvalidParameterException": return [3 /*break*/, 8];
                    case "InvalidS3ObjectException": return [3 /*break*/, 10];
                    case "com.amazonaws.textract#InvalidS3ObjectException": return [3 /*break*/, 10];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 12];
                    case "com.amazonaws.textract#ProvisionedThroughputExceededException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.textract#ThrottlingException": return [3 /*break*/, 14];
                }
                return [3 /*break*/, 16];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidJobIdExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 16:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _l.label = 17;
            case 17:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1StartDocumentAnalysisCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartDocumentAnalysisCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartDocumentAnalysisResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartDocumentAnalysisCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, parsedBody, message;
    var _q;
    return __generator(this, function (_r) {
        switch (_r.label) {
            case 0:
                _a = [__assign({}, output)];
                _q = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_q.body = _r.sent(), _q)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.textract#AccessDeniedException": return [3 /*break*/, 2];
                    case "BadDocumentException": return [3 /*break*/, 4];
                    case "com.amazonaws.textract#BadDocumentException": return [3 /*break*/, 4];
                    case "DocumentTooLargeException": return [3 /*break*/, 6];
                    case "com.amazonaws.textract#DocumentTooLargeException": return [3 /*break*/, 6];
                    case "IdempotentParameterMismatchException": return [3 /*break*/, 8];
                    case "com.amazonaws.textract#IdempotentParameterMismatchException": return [3 /*break*/, 8];
                    case "InternalServerError": return [3 /*break*/, 10];
                    case "com.amazonaws.textract#InternalServerError": return [3 /*break*/, 10];
                    case "InvalidKMSKeyException": return [3 /*break*/, 12];
                    case "com.amazonaws.textract#InvalidKMSKeyException": return [3 /*break*/, 12];
                    case "InvalidParameterException": return [3 /*break*/, 14];
                    case "com.amazonaws.textract#InvalidParameterException": return [3 /*break*/, 14];
                    case "InvalidS3ObjectException": return [3 /*break*/, 16];
                    case "com.amazonaws.textract#InvalidS3ObjectException": return [3 /*break*/, 16];
                    case "LimitExceededException": return [3 /*break*/, 18];
                    case "com.amazonaws.textract#LimitExceededException": return [3 /*break*/, 18];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 20];
                    case "com.amazonaws.textract#ProvisionedThroughputExceededException": return [3 /*break*/, 20];
                    case "ThrottlingException": return [3 /*break*/, 22];
                    case "com.amazonaws.textract#ThrottlingException": return [3 /*break*/, 22];
                    case "UnsupportedDocumentException": return [3 /*break*/, 24];
                    case "com.amazonaws.textract#UnsupportedDocumentException": return [3 /*break*/, 24];
                }
                return [3 /*break*/, 26];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1BadDocumentExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1DocumentTooLargeExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidKMSKeyExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 16:
                _k = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 17:
                response = __assign.apply(void 0, [__assign.apply(void 0, _k.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 18:
                _l = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
            case 19:
                response = __assign.apply(void 0, [__assign.apply(void 0, _l.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 20:
                _m = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 21:
                response = __assign.apply(void 0, [__assign.apply(void 0, _m.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 22:
                _o = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 23:
                response = __assign.apply(void 0, [__assign.apply(void 0, _o.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 24:
                _p = [{}];
                return [4 /*yield*/, deserializeAws_json1_1UnsupportedDocumentExceptionResponse(parsedOutput, context)];
            case 25:
                response = __assign.apply(void 0, [__assign.apply(void 0, _p.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 26:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _r.label = 27;
            case 27:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1StartDocumentTextDetectionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartDocumentTextDetectionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartDocumentTextDetectionResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartDocumentTextDetectionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, parsedBody, message;
    var _q;
    return __generator(this, function (_r) {
        switch (_r.label) {
            case 0:
                _a = [__assign({}, output)];
                _q = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_q.body = _r.sent(), _q)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.textract#AccessDeniedException": return [3 /*break*/, 2];
                    case "BadDocumentException": return [3 /*break*/, 4];
                    case "com.amazonaws.textract#BadDocumentException": return [3 /*break*/, 4];
                    case "DocumentTooLargeException": return [3 /*break*/, 6];
                    case "com.amazonaws.textract#DocumentTooLargeException": return [3 /*break*/, 6];
                    case "IdempotentParameterMismatchException": return [3 /*break*/, 8];
                    case "com.amazonaws.textract#IdempotentParameterMismatchException": return [3 /*break*/, 8];
                    case "InternalServerError": return [3 /*break*/, 10];
                    case "com.amazonaws.textract#InternalServerError": return [3 /*break*/, 10];
                    case "InvalidKMSKeyException": return [3 /*break*/, 12];
                    case "com.amazonaws.textract#InvalidKMSKeyException": return [3 /*break*/, 12];
                    case "InvalidParameterException": return [3 /*break*/, 14];
                    case "com.amazonaws.textract#InvalidParameterException": return [3 /*break*/, 14];
                    case "InvalidS3ObjectException": return [3 /*break*/, 16];
                    case "com.amazonaws.textract#InvalidS3ObjectException": return [3 /*break*/, 16];
                    case "LimitExceededException": return [3 /*break*/, 18];
                    case "com.amazonaws.textract#LimitExceededException": return [3 /*break*/, 18];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 20];
                    case "com.amazonaws.textract#ProvisionedThroughputExceededException": return [3 /*break*/, 20];
                    case "ThrottlingException": return [3 /*break*/, 22];
                    case "com.amazonaws.textract#ThrottlingException": return [3 /*break*/, 22];
                    case "UnsupportedDocumentException": return [3 /*break*/, 24];
                    case "com.amazonaws.textract#UnsupportedDocumentException": return [3 /*break*/, 24];
                }
                return [3 /*break*/, 26];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1BadDocumentExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1DocumentTooLargeExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidKMSKeyExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 16:
                _k = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 17:
                response = __assign.apply(void 0, [__assign.apply(void 0, _k.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 18:
                _l = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
            case 19:
                response = __assign.apply(void 0, [__assign.apply(void 0, _l.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 20:
                _m = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 21:
                response = __assign.apply(void 0, [__assign.apply(void 0, _m.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 22:
                _o = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 23:
                response = __assign.apply(void 0, [__assign.apply(void 0, _o.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 24:
                _p = [{}];
                return [4 /*yield*/, deserializeAws_json1_1UnsupportedDocumentExceptionResponse(parsedOutput, context)];
            case 25:
                response = __assign.apply(void 0, [__assign.apply(void 0, _p.concat([(_r.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 27];
            case 26:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _r.label = 27;
            case 27:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
var deserializeAws_json1_1AccessDeniedExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1AccessDeniedException(body, context);
        contents = __assign({ name: "AccessDeniedException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1BadDocumentExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1BadDocumentException(body, context);
        contents = __assign({ name: "BadDocumentException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1DocumentTooLargeExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1DocumentTooLargeException(body, context);
        contents = __assign({ name: "DocumentTooLargeException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1HumanLoopQuotaExceededExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1HumanLoopQuotaExceededException(body, context);
        contents = __assign({ name: "HumanLoopQuotaExceededException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1IdempotentParameterMismatchException(body, context);
        contents = __assign({ name: "IdempotentParameterMismatchException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1InternalServerErrorResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1InternalServerError(body, context);
        contents = __assign({ name: "InternalServerError", $fault: "server", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1InvalidJobIdExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1InvalidJobIdException(body, context);
        contents = __assign({ name: "InvalidJobIdException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1InvalidKMSKeyExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1InvalidKMSKeyException(body, context);
        contents = __assign({ name: "InvalidKMSKeyException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1InvalidParameterExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1InvalidParameterException(body, context);
        contents = __assign({ name: "InvalidParameterException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1InvalidS3ObjectExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1InvalidS3ObjectException(body, context);
        contents = __assign({ name: "InvalidS3ObjectException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
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
var deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1ProvisionedThroughputExceededException(body, context);
        contents = __assign({ name: "ProvisionedThroughputExceededException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1ThrottlingExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1ThrottlingException(body, context);
        contents = __assign({ name: "ThrottlingException", $fault: "server", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1UnsupportedDocumentExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1UnsupportedDocumentException(body, context);
        contents = __assign({ name: "UnsupportedDocumentException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var serializeAws_json1_1AnalyzeDocumentRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.Document !== undefined &&
        input.Document !== null && { Document: serializeAws_json1_1Document(input.Document, context) })), (input.FeatureTypes !== undefined &&
        input.FeatureTypes !== null && { FeatureTypes: serializeAws_json1_1FeatureTypes(input.FeatureTypes, context) })), (input.HumanLoopConfig !== undefined &&
        input.HumanLoopConfig !== null && {
        HumanLoopConfig: serializeAws_json1_1HumanLoopConfig(input.HumanLoopConfig, context),
    }));
};
var serializeAws_json1_1ContentClassifiers = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var serializeAws_json1_1DetectDocumentTextRequest = function (input, context) {
    return __assign({}, (input.Document !== undefined &&
        input.Document !== null && { Document: serializeAws_json1_1Document(input.Document, context) }));
};
var serializeAws_json1_1Document = function (input, context) {
    return __assign(__assign({}, (input.Bytes !== undefined && input.Bytes !== null && { Bytes: context.base64Encoder(input.Bytes) })), (input.S3Object !== undefined &&
        input.S3Object !== null && { S3Object: serializeAws_json1_1S3Object(input.S3Object, context) }));
};
var serializeAws_json1_1DocumentLocation = function (input, context) {
    return __assign({}, (input.S3Object !== undefined &&
        input.S3Object !== null && { S3Object: serializeAws_json1_1S3Object(input.S3Object, context) }));
};
var serializeAws_json1_1FeatureTypes = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var serializeAws_json1_1GetDocumentAnalysisRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }));
};
var serializeAws_json1_1GetDocumentTextDetectionRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }));
};
var serializeAws_json1_1HumanLoopConfig = function (input, context) {
    return __assign(__assign(__assign({}, (input.DataAttributes !== undefined &&
        input.DataAttributes !== null && {
        DataAttributes: serializeAws_json1_1HumanLoopDataAttributes(input.DataAttributes, context),
    })), (input.FlowDefinitionArn !== undefined &&
        input.FlowDefinitionArn !== null && { FlowDefinitionArn: input.FlowDefinitionArn })), (input.HumanLoopName !== undefined && input.HumanLoopName !== null && { HumanLoopName: input.HumanLoopName }));
};
var serializeAws_json1_1HumanLoopDataAttributes = function (input, context) {
    return __assign({}, (input.ContentClassifiers !== undefined &&
        input.ContentClassifiers !== null && {
        ContentClassifiers: serializeAws_json1_1ContentClassifiers(input.ContentClassifiers, context),
    }));
};
var serializeAws_json1_1NotificationChannel = function (input, context) {
    return __assign(__assign({}, (input.RoleArn !== undefined && input.RoleArn !== null && { RoleArn: input.RoleArn })), (input.SNSTopicArn !== undefined && input.SNSTopicArn !== null && { SNSTopicArn: input.SNSTopicArn }));
};
var serializeAws_json1_1OutputConfig = function (input, context) {
    return __assign(__assign({}, (input.S3Bucket !== undefined && input.S3Bucket !== null && { S3Bucket: input.S3Bucket })), (input.S3Prefix !== undefined && input.S3Prefix !== null && { S3Prefix: input.S3Prefix }));
};
var serializeAws_json1_1S3Object = function (input, context) {
    return __assign(__assign(__assign({}, (input.Bucket !== undefined && input.Bucket !== null && { Bucket: input.Bucket })), (input.Name !== undefined && input.Name !== null && { Name: input.Name })), (input.Version !== undefined && input.Version !== null && { Version: input.Version }));
};
var serializeAws_json1_1StartDocumentAnalysisRequest = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (input.ClientRequestToken !== undefined &&
        input.ClientRequestToken !== null && { ClientRequestToken: input.ClientRequestToken })), (input.DocumentLocation !== undefined &&
        input.DocumentLocation !== null && {
        DocumentLocation: serializeAws_json1_1DocumentLocation(input.DocumentLocation, context),
    })), (input.FeatureTypes !== undefined &&
        input.FeatureTypes !== null && { FeatureTypes: serializeAws_json1_1FeatureTypes(input.FeatureTypes, context) })), (input.JobTag !== undefined && input.JobTag !== null && { JobTag: input.JobTag })), (input.KMSKeyId !== undefined && input.KMSKeyId !== null && { KMSKeyId: input.KMSKeyId })), (input.NotificationChannel !== undefined &&
        input.NotificationChannel !== null && {
        NotificationChannel: serializeAws_json1_1NotificationChannel(input.NotificationChannel, context),
    })), (input.OutputConfig !== undefined &&
        input.OutputConfig !== null && { OutputConfig: serializeAws_json1_1OutputConfig(input.OutputConfig, context) }));
};
var serializeAws_json1_1StartDocumentTextDetectionRequest = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign({}, (input.ClientRequestToken !== undefined &&
        input.ClientRequestToken !== null && { ClientRequestToken: input.ClientRequestToken })), (input.DocumentLocation !== undefined &&
        input.DocumentLocation !== null && {
        DocumentLocation: serializeAws_json1_1DocumentLocation(input.DocumentLocation, context),
    })), (input.JobTag !== undefined && input.JobTag !== null && { JobTag: input.JobTag })), (input.KMSKeyId !== undefined && input.KMSKeyId !== null && { KMSKeyId: input.KMSKeyId })), (input.NotificationChannel !== undefined &&
        input.NotificationChannel !== null && {
        NotificationChannel: serializeAws_json1_1NotificationChannel(input.NotificationChannel, context),
    })), (input.OutputConfig !== undefined &&
        input.OutputConfig !== null && { OutputConfig: serializeAws_json1_1OutputConfig(input.OutputConfig, context) }));
};
var deserializeAws_json1_1AccessDeniedException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1AnalyzeDocumentResponse = function (output, context) {
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
var deserializeAws_json1_1BadDocumentException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1Block = function (output, context) {
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
var deserializeAws_json1_1BlockList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Block(entry, context);
    });
};
var deserializeAws_json1_1BoundingBox = function (output, context) {
    return {
        Height: output.Height !== undefined && output.Height !== null ? output.Height : undefined,
        Left: output.Left !== undefined && output.Left !== null ? output.Left : undefined,
        Top: output.Top !== undefined && output.Top !== null ? output.Top : undefined,
        Width: output.Width !== undefined && output.Width !== null ? output.Width : undefined,
    };
};
var deserializeAws_json1_1DetectDocumentTextResponse = function (output, context) {
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
var deserializeAws_json1_1DocumentMetadata = function (output, context) {
    return {
        Pages: output.Pages !== undefined && output.Pages !== null ? output.Pages : undefined,
    };
};
var deserializeAws_json1_1DocumentTooLargeException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1EntityTypes = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var deserializeAws_json1_1Geometry = function (output, context) {
    return {
        BoundingBox: output.BoundingBox !== undefined && output.BoundingBox !== null
            ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
            : undefined,
        Polygon: output.Polygon !== undefined && output.Polygon !== null
            ? deserializeAws_json1_1Polygon(output.Polygon, context)
            : undefined,
    };
};
var deserializeAws_json1_1GetDocumentAnalysisResponse = function (output, context) {
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
var deserializeAws_json1_1GetDocumentTextDetectionResponse = function (output, context) {
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
var deserializeAws_json1_1HumanLoopActivationOutput = function (output, context) {
    return {
        HumanLoopActivationConditionsEvaluationResults: output.HumanLoopActivationConditionsEvaluationResults !== undefined &&
            output.HumanLoopActivationConditionsEvaluationResults !== null
            ? new __LazyJsonString(output.HumanLoopActivationConditionsEvaluationResults)
            : undefined,
        HumanLoopActivationReasons: output.HumanLoopActivationReasons !== undefined && output.HumanLoopActivationReasons !== null
            ? deserializeAws_json1_1HumanLoopActivationReasons(output.HumanLoopActivationReasons, context)
            : undefined,
        HumanLoopArn: output.HumanLoopArn !== undefined && output.HumanLoopArn !== null ? output.HumanLoopArn : undefined,
    };
};
var deserializeAws_json1_1HumanLoopActivationReasons = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var deserializeAws_json1_1HumanLoopQuotaExceededException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
        QuotaCode: output.QuotaCode !== undefined && output.QuotaCode !== null ? output.QuotaCode : undefined,
        ResourceType: output.ResourceType !== undefined && output.ResourceType !== null ? output.ResourceType : undefined,
        ServiceCode: output.ServiceCode !== undefined && output.ServiceCode !== null ? output.ServiceCode : undefined,
    };
};
var deserializeAws_json1_1IdempotentParameterMismatchException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1IdList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var deserializeAws_json1_1InternalServerError = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1InvalidJobIdException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1InvalidKMSKeyException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1InvalidParameterException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1InvalidS3ObjectException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1LimitExceededException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1Pages = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var deserializeAws_json1_1Point = function (output, context) {
    return {
        X: output.X !== undefined && output.X !== null ? output.X : undefined,
        Y: output.Y !== undefined && output.Y !== null ? output.Y : undefined,
    };
};
var deserializeAws_json1_1Polygon = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Point(entry, context);
    });
};
var deserializeAws_json1_1ProvisionedThroughputExceededException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1Relationship = function (output, context) {
    return {
        Ids: output.Ids !== undefined && output.Ids !== null ? deserializeAws_json1_1IdList(output.Ids, context) : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
var deserializeAws_json1_1RelationshipList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Relationship(entry, context);
    });
};
var deserializeAws_json1_1StartDocumentAnalysisResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
    };
};
var deserializeAws_json1_1StartDocumentTextDetectionResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
    };
};
var deserializeAws_json1_1ThrottlingException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1UnsupportedDocumentException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1Warning = function (output, context) {
    return {
        ErrorCode: output.ErrorCode !== undefined && output.ErrorCode !== null ? output.ErrorCode : undefined,
        Pages: output.Pages !== undefined && output.Pages !== null
            ? deserializeAws_json1_1Pages(output.Pages, context)
            : undefined,
    };
};
var deserializeAws_json1_1Warnings = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Warning(entry, context);
    });
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
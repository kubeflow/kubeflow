import { __assign, __awaiter, __generator } from "tslib";
import { HttpRequest as __HttpRequest } from "@aws-sdk/protocol-http";
import { LazyJsonString as __LazyJsonString } from "@aws-sdk/smithy-client";
export var serializeAws_json1_1CompareFacesCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.CompareFaces",
        };
        body = JSON.stringify(serializeAws_json1_1CompareFacesRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1CreateCollectionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.CreateCollection",
        };
        body = JSON.stringify(serializeAws_json1_1CreateCollectionRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1CreateProjectCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.CreateProject",
        };
        body = JSON.stringify(serializeAws_json1_1CreateProjectRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1CreateProjectVersionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.CreateProjectVersion",
        };
        body = JSON.stringify(serializeAws_json1_1CreateProjectVersionRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1CreateStreamProcessorCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.CreateStreamProcessor",
        };
        body = JSON.stringify(serializeAws_json1_1CreateStreamProcessorRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DeleteCollectionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.DeleteCollection",
        };
        body = JSON.stringify(serializeAws_json1_1DeleteCollectionRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DeleteFacesCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.DeleteFaces",
        };
        body = JSON.stringify(serializeAws_json1_1DeleteFacesRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DeleteProjectCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.DeleteProject",
        };
        body = JSON.stringify(serializeAws_json1_1DeleteProjectRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DeleteProjectVersionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.DeleteProjectVersion",
        };
        body = JSON.stringify(serializeAws_json1_1DeleteProjectVersionRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DeleteStreamProcessorCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.DeleteStreamProcessor",
        };
        body = JSON.stringify(serializeAws_json1_1DeleteStreamProcessorRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DescribeCollectionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.DescribeCollection",
        };
        body = JSON.stringify(serializeAws_json1_1DescribeCollectionRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DescribeProjectsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.DescribeProjects",
        };
        body = JSON.stringify(serializeAws_json1_1DescribeProjectsRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DescribeProjectVersionsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.DescribeProjectVersions",
        };
        body = JSON.stringify(serializeAws_json1_1DescribeProjectVersionsRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DescribeStreamProcessorCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.DescribeStreamProcessor",
        };
        body = JSON.stringify(serializeAws_json1_1DescribeStreamProcessorRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DetectCustomLabelsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.DetectCustomLabels",
        };
        body = JSON.stringify(serializeAws_json1_1DetectCustomLabelsRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DetectFacesCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.DetectFaces",
        };
        body = JSON.stringify(serializeAws_json1_1DetectFacesRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DetectLabelsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.DetectLabels",
        };
        body = JSON.stringify(serializeAws_json1_1DetectLabelsRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DetectModerationLabelsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.DetectModerationLabels",
        };
        body = JSON.stringify(serializeAws_json1_1DetectModerationLabelsRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DetectProtectiveEquipmentCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.DetectProtectiveEquipment",
        };
        body = JSON.stringify(serializeAws_json1_1DetectProtectiveEquipmentRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DetectTextCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.DetectText",
        };
        body = JSON.stringify(serializeAws_json1_1DetectTextRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1GetCelebrityInfoCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.GetCelebrityInfo",
        };
        body = JSON.stringify(serializeAws_json1_1GetCelebrityInfoRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1GetCelebrityRecognitionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.GetCelebrityRecognition",
        };
        body = JSON.stringify(serializeAws_json1_1GetCelebrityRecognitionRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1GetContentModerationCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.GetContentModeration",
        };
        body = JSON.stringify(serializeAws_json1_1GetContentModerationRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1GetFaceDetectionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.GetFaceDetection",
        };
        body = JSON.stringify(serializeAws_json1_1GetFaceDetectionRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1GetFaceSearchCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.GetFaceSearch",
        };
        body = JSON.stringify(serializeAws_json1_1GetFaceSearchRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1GetLabelDetectionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.GetLabelDetection",
        };
        body = JSON.stringify(serializeAws_json1_1GetLabelDetectionRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1GetPersonTrackingCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.GetPersonTracking",
        };
        body = JSON.stringify(serializeAws_json1_1GetPersonTrackingRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1GetSegmentDetectionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.GetSegmentDetection",
        };
        body = JSON.stringify(serializeAws_json1_1GetSegmentDetectionRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1GetTextDetectionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.GetTextDetection",
        };
        body = JSON.stringify(serializeAws_json1_1GetTextDetectionRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1IndexFacesCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.IndexFaces",
        };
        body = JSON.stringify(serializeAws_json1_1IndexFacesRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1ListCollectionsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.ListCollections",
        };
        body = JSON.stringify(serializeAws_json1_1ListCollectionsRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1ListFacesCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.ListFaces",
        };
        body = JSON.stringify(serializeAws_json1_1ListFacesRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1ListStreamProcessorsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.ListStreamProcessors",
        };
        body = JSON.stringify(serializeAws_json1_1ListStreamProcessorsRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1RecognizeCelebritiesCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.RecognizeCelebrities",
        };
        body = JSON.stringify(serializeAws_json1_1RecognizeCelebritiesRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1SearchFacesCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.SearchFaces",
        };
        body = JSON.stringify(serializeAws_json1_1SearchFacesRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1SearchFacesByImageCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.SearchFacesByImage",
        };
        body = JSON.stringify(serializeAws_json1_1SearchFacesByImageRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartCelebrityRecognitionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.StartCelebrityRecognition",
        };
        body = JSON.stringify(serializeAws_json1_1StartCelebrityRecognitionRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartContentModerationCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.StartContentModeration",
        };
        body = JSON.stringify(serializeAws_json1_1StartContentModerationRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartFaceDetectionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.StartFaceDetection",
        };
        body = JSON.stringify(serializeAws_json1_1StartFaceDetectionRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartFaceSearchCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.StartFaceSearch",
        };
        body = JSON.stringify(serializeAws_json1_1StartFaceSearchRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartLabelDetectionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.StartLabelDetection",
        };
        body = JSON.stringify(serializeAws_json1_1StartLabelDetectionRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartPersonTrackingCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.StartPersonTracking",
        };
        body = JSON.stringify(serializeAws_json1_1StartPersonTrackingRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartProjectVersionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.StartProjectVersion",
        };
        body = JSON.stringify(serializeAws_json1_1StartProjectVersionRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartSegmentDetectionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.StartSegmentDetection",
        };
        body = JSON.stringify(serializeAws_json1_1StartSegmentDetectionRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartStreamProcessorCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.StartStreamProcessor",
        };
        body = JSON.stringify(serializeAws_json1_1StartStreamProcessorRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartTextDetectionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.StartTextDetection",
        };
        body = JSON.stringify(serializeAws_json1_1StartTextDetectionRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StopProjectVersionCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.StopProjectVersion",
        };
        body = JSON.stringify(serializeAws_json1_1StopProjectVersionRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StopStreamProcessorCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "RekognitionService.StopStreamProcessor",
        };
        body = JSON.stringify(serializeAws_json1_1StopStreamProcessorRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var deserializeAws_json1_1CompareFacesCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1CompareFacesCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1CompareFacesResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1CompareFacesCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, _j, _k, parsedBody, message;
    var _l;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                _a = [__assign({}, output)];
                _l = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_l.body = _m.sent(), _l)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "ImageTooLargeException": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#ImageTooLargeException": return [3 /*break*/, 4];
                    case "InternalServerError": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 6];
                    case "InvalidImageFormatException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidImageFormatException": return [3 /*break*/, 8];
                    case "InvalidParameterException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 10];
                    case "InvalidS3ObjectException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#InvalidS3ObjectException": return [3 /*break*/, 12];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "ThrottlingException": return [3 /*break*/, 16];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 16];
                }
                return [3 /*break*/, 18];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ImageTooLargeExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidImageFormatExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 16:
                _k = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 17:
                response = __assign.apply(void 0, [__assign.apply(void 0, _k.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 18:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _m.label = 19;
            case 19:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1CreateCollectionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1CreateCollectionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1CreateCollectionResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1CreateCollectionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, parsedBody, message;
    var _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _a = [__assign({}, output)];
                _j = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_j.body = _k.sent(), _j)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidParameterException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 6];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "ResourceAlreadyExistsException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ResourceAlreadyExistsException": return [3 /*break*/, 10];
                    case "ThrottlingException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 12];
                }
                return [3 /*break*/, 14];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceAlreadyExistsExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 14:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _k.label = 15;
            case 15:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1CreateProjectCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1CreateProjectCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1CreateProjectResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1CreateProjectCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidParameterException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 6];
                    case "LimitExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#LimitExceededException": return [3 /*break*/, 8];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "ResourceInUseException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceInUseException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 14];
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
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1CreateProjectVersionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1CreateProjectVersionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1CreateProjectVersionResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1CreateProjectVersionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, _j, _k, parsedBody, message;
    var _l;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                _a = [__assign({}, output)];
                _l = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_l.body = _m.sent(), _l)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidParameterException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 6];
                    case "LimitExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#LimitExceededException": return [3 /*break*/, 8];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "ResourceInUseException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceInUseException": return [3 /*break*/, 12];
                    case "ResourceNotFoundException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 14];
                    case "ThrottlingException": return [3 /*break*/, 16];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 16];
                }
                return [3 /*break*/, 18];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 16:
                _k = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 17:
                response = __assign.apply(void 0, [__assign.apply(void 0, _k.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 18:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _m.label = 19;
            case 19:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1CreateStreamProcessorCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1CreateStreamProcessorCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1CreateStreamProcessorResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1CreateStreamProcessorCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidParameterException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 6];
                    case "LimitExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#LimitExceededException": return [3 /*break*/, 8];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "ResourceInUseException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceInUseException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 14];
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
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DeleteCollectionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DeleteCollectionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DeleteCollectionResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DeleteCollectionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, parsedBody, message;
    var _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _a = [__assign({}, output)];
                _j = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_j.body = _k.sent(), _j)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidParameterException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 6];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "ResourceNotFoundException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 10];
                    case "ThrottlingException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 12];
                }
                return [3 /*break*/, 14];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 14:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _k.label = 15;
            case 15:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1DeleteFacesCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DeleteFacesCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DeleteFacesResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DeleteFacesCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, parsedBody, message;
    var _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _a = [__assign({}, output)];
                _j = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_j.body = _k.sent(), _j)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidParameterException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 6];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "ResourceNotFoundException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 10];
                    case "ThrottlingException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 12];
                }
                return [3 /*break*/, 14];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 14:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _k.label = 15;
            case 15:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1DeleteProjectCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DeleteProjectCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DeleteProjectResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DeleteProjectCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidParameterException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 6];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "ResourceInUseException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ResourceInUseException": return [3 /*break*/, 10];
                    case "ResourceNotFoundException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 14];
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
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DeleteProjectVersionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DeleteProjectVersionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DeleteProjectVersionResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DeleteProjectVersionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidParameterException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 6];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "ResourceInUseException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ResourceInUseException": return [3 /*break*/, 10];
                    case "ResourceNotFoundException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 14];
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
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DeleteStreamProcessorCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DeleteStreamProcessorCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DeleteStreamProcessorResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DeleteStreamProcessorCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidParameterException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 6];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "ResourceInUseException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ResourceInUseException": return [3 /*break*/, 10];
                    case "ResourceNotFoundException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 14];
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
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DescribeCollectionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DescribeCollectionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DescribeCollectionResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DescribeCollectionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, parsedBody, message;
    var _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _a = [__assign({}, output)];
                _j = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_j.body = _k.sent(), _j)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidParameterException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 6];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "ResourceNotFoundException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 10];
                    case "ThrottlingException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 12];
                }
                return [3 /*break*/, 14];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 14:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _k.label = 15;
            case 15:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1DescribeProjectsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DescribeProjectsCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DescribeProjectsResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DescribeProjectsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, parsedBody, message;
    var _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _a = [__assign({}, output)];
                _j = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_j.body = _k.sent(), _j)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "ThrottlingException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 12];
                }
                return [3 /*break*/, 14];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 14:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _k.label = 15;
            case 15:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1DescribeProjectVersionsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DescribeProjectVersionsCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DescribeProjectVersionsResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DescribeProjectVersionsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "ResourceNotFoundException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 14];
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
                return [4 /*yield*/, deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DescribeStreamProcessorCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DescribeStreamProcessorCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DescribeStreamProcessorResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DescribeStreamProcessorCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, parsedBody, message;
    var _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _a = [__assign({}, output)];
                _j = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_j.body = _k.sent(), _j)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidParameterException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 6];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "ResourceNotFoundException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 10];
                    case "ThrottlingException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 12];
                }
                return [3 /*break*/, 14];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 14:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _k.label = 15;
            case 15:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1DetectCustomLabelsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DetectCustomLabelsCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DetectCustomLabelsResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DetectCustomLabelsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, parsedBody, message;
    var _p;
    return __generator(this, function (_q) {
        switch (_q.label) {
            case 0:
                _a = [__assign({}, output)];
                _p = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_p.body = _q.sent(), _p)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "ImageTooLargeException": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#ImageTooLargeException": return [3 /*break*/, 4];
                    case "InternalServerError": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 6];
                    case "InvalidImageFormatException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidImageFormatException": return [3 /*break*/, 8];
                    case "InvalidParameterException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 10];
                    case "InvalidS3ObjectException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#InvalidS3ObjectException": return [3 /*break*/, 12];
                    case "LimitExceededException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#LimitExceededException": return [3 /*break*/, 14];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 16];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 16];
                    case "ResourceNotFoundException": return [3 /*break*/, 18];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 18];
                    case "ResourceNotReadyException": return [3 /*break*/, 20];
                    case "com.amazonaws.rekognition#ResourceNotReadyException": return [3 /*break*/, 20];
                    case "ThrottlingException": return [3 /*break*/, 22];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 22];
                }
                return [3 /*break*/, 24];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_q.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 25];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ImageTooLargeExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_q.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 25];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_q.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 25];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidImageFormatExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_q.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 25];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_q.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 25];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_q.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 25];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_q.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 25];
            case 16:
                _k = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 17:
                response = __assign.apply(void 0, [__assign.apply(void 0, _k.concat([(_q.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 25];
            case 18:
                _l = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 19:
                response = __assign.apply(void 0, [__assign.apply(void 0, _l.concat([(_q.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 25];
            case 20:
                _m = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotReadyExceptionResponse(parsedOutput, context)];
            case 21:
                response = __assign.apply(void 0, [__assign.apply(void 0, _m.concat([(_q.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 25];
            case 22:
                _o = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 23:
                response = __assign.apply(void 0, [__assign.apply(void 0, _o.concat([(_q.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 25];
            case 24:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _q.label = 25;
            case 25:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1DetectFacesCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DetectFacesCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DetectFacesResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DetectFacesCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, _j, _k, parsedBody, message;
    var _l;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                _a = [__assign({}, output)];
                _l = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_l.body = _m.sent(), _l)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "ImageTooLargeException": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#ImageTooLargeException": return [3 /*break*/, 4];
                    case "InternalServerError": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 6];
                    case "InvalidImageFormatException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidImageFormatException": return [3 /*break*/, 8];
                    case "InvalidParameterException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 10];
                    case "InvalidS3ObjectException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#InvalidS3ObjectException": return [3 /*break*/, 12];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "ThrottlingException": return [3 /*break*/, 16];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 16];
                }
                return [3 /*break*/, 18];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ImageTooLargeExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidImageFormatExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 16:
                _k = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 17:
                response = __assign.apply(void 0, [__assign.apply(void 0, _k.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 18:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _m.label = 19;
            case 19:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1DetectLabelsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DetectLabelsCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DetectLabelsResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DetectLabelsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, _j, _k, parsedBody, message;
    var _l;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                _a = [__assign({}, output)];
                _l = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_l.body = _m.sent(), _l)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "ImageTooLargeException": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#ImageTooLargeException": return [3 /*break*/, 4];
                    case "InternalServerError": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 6];
                    case "InvalidImageFormatException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidImageFormatException": return [3 /*break*/, 8];
                    case "InvalidParameterException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 10];
                    case "InvalidS3ObjectException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#InvalidS3ObjectException": return [3 /*break*/, 12];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "ThrottlingException": return [3 /*break*/, 16];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 16];
                }
                return [3 /*break*/, 18];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ImageTooLargeExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidImageFormatExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 16:
                _k = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 17:
                response = __assign.apply(void 0, [__assign.apply(void 0, _k.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 18:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _m.label = 19;
            case 19:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1DetectModerationLabelsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DetectModerationLabelsCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DetectModerationLabelsResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DetectModerationLabelsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "HumanLoopQuotaExceededException": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#HumanLoopQuotaExceededException": return [3 /*break*/, 4];
                    case "ImageTooLargeException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#ImageTooLargeException": return [3 /*break*/, 6];
                    case "InternalServerError": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 8];
                    case "InvalidImageFormatException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#InvalidImageFormatException": return [3 /*break*/, 10];
                    case "InvalidParameterException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 12];
                    case "InvalidS3ObjectException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#InvalidS3ObjectException": return [3 /*break*/, 14];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 16];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 16];
                    case "ThrottlingException": return [3 /*break*/, 18];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 18];
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
                return [4 /*yield*/, deserializeAws_json1_1HumanLoopQuotaExceededExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ImageTooLargeExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1InvalidImageFormatExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 16:
                _k = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 17:
                response = __assign.apply(void 0, [__assign.apply(void 0, _k.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 18:
                _l = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DetectProtectiveEquipmentCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DetectProtectiveEquipmentCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DetectProtectiveEquipmentResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DetectProtectiveEquipmentCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, _j, _k, parsedBody, message;
    var _l;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                _a = [__assign({}, output)];
                _l = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_l.body = _m.sent(), _l)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "ImageTooLargeException": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#ImageTooLargeException": return [3 /*break*/, 4];
                    case "InternalServerError": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 6];
                    case "InvalidImageFormatException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidImageFormatException": return [3 /*break*/, 8];
                    case "InvalidParameterException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 10];
                    case "InvalidS3ObjectException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#InvalidS3ObjectException": return [3 /*break*/, 12];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "ThrottlingException": return [3 /*break*/, 16];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 16];
                }
                return [3 /*break*/, 18];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ImageTooLargeExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidImageFormatExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 16:
                _k = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 17:
                response = __assign.apply(void 0, [__assign.apply(void 0, _k.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 18:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _m.label = 19;
            case 19:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1DetectTextCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DetectTextCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DetectTextResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DetectTextCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, _j, _k, parsedBody, message;
    var _l;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                _a = [__assign({}, output)];
                _l = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_l.body = _m.sent(), _l)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "ImageTooLargeException": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#ImageTooLargeException": return [3 /*break*/, 4];
                    case "InternalServerError": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 6];
                    case "InvalidImageFormatException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidImageFormatException": return [3 /*break*/, 8];
                    case "InvalidParameterException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 10];
                    case "InvalidS3ObjectException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#InvalidS3ObjectException": return [3 /*break*/, 12];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "ThrottlingException": return [3 /*break*/, 16];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 16];
                }
                return [3 /*break*/, 18];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ImageTooLargeExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidImageFormatExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 16:
                _k = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 17:
                response = __assign.apply(void 0, [__assign.apply(void 0, _k.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 18:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _m.label = 19;
            case 19:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1GetCelebrityInfoCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1GetCelebrityInfoCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1GetCelebrityInfoResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1GetCelebrityInfoCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, parsedBody, message;
    var _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _a = [__assign({}, output)];
                _j = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_j.body = _k.sent(), _j)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidParameterException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 6];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "ResourceNotFoundException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 10];
                    case "ThrottlingException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 12];
                }
                return [3 /*break*/, 14];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 14:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _k.label = 15;
            case 15:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1GetCelebrityRecognitionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1GetCelebrityRecognitionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1GetCelebrityRecognitionResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1GetCelebrityRecognitionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "ResourceNotFoundException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 14];
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
                return [4 /*yield*/, deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1GetContentModerationCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1GetContentModerationCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1GetContentModerationResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1GetContentModerationCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "ResourceNotFoundException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 14];
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
                return [4 /*yield*/, deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1GetFaceDetectionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1GetFaceDetectionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1GetFaceDetectionResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1GetFaceDetectionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "ResourceNotFoundException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 14];
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
                return [4 /*yield*/, deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1GetFaceSearchCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1GetFaceSearchCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1GetFaceSearchResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1GetFaceSearchCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "ResourceNotFoundException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 14];
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
                return [4 /*yield*/, deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1GetLabelDetectionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1GetLabelDetectionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1GetLabelDetectionResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1GetLabelDetectionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "ResourceNotFoundException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 14];
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
                return [4 /*yield*/, deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1GetPersonTrackingCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1GetPersonTrackingCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1GetPersonTrackingResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1GetPersonTrackingCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "ResourceNotFoundException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 14];
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
                return [4 /*yield*/, deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1GetSegmentDetectionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1GetSegmentDetectionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1GetSegmentDetectionResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1GetSegmentDetectionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "ResourceNotFoundException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 14];
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
                return [4 /*yield*/, deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1GetTextDetectionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1GetTextDetectionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1GetTextDetectionResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1GetTextDetectionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "ResourceNotFoundException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 14];
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
                return [4 /*yield*/, deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1IndexFacesCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1IndexFacesCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1IndexFacesResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1IndexFacesCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "ImageTooLargeException": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#ImageTooLargeException": return [3 /*break*/, 4];
                    case "InternalServerError": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 6];
                    case "InvalidImageFormatException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidImageFormatException": return [3 /*break*/, 8];
                    case "InvalidParameterException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 10];
                    case "InvalidS3ObjectException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#InvalidS3ObjectException": return [3 /*break*/, 12];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "ResourceNotFoundException": return [3 /*break*/, 16];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 16];
                    case "ServiceQuotaExceededException": return [3 /*break*/, 18];
                    case "com.amazonaws.rekognition#ServiceQuotaExceededException": return [3 /*break*/, 18];
                    case "ThrottlingException": return [3 /*break*/, 20];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 20];
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
                return [4 /*yield*/, deserializeAws_json1_1ImageTooLargeExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidImageFormatExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 16:
                _k = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 17:
                response = __assign.apply(void 0, [__assign.apply(void 0, _k.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 18:
                _l = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ServiceQuotaExceededExceptionResponse(parsedOutput, context)];
            case 19:
                response = __assign.apply(void 0, [__assign.apply(void 0, _l.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 20:
                _m = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1ListCollectionsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1ListCollectionsCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1ListCollectionsResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1ListCollectionsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "ResourceNotFoundException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 14];
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
                return [4 /*yield*/, deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1ListFacesCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1ListFacesCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1ListFacesResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1ListFacesCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "ResourceNotFoundException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 14];
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
                return [4 /*yield*/, deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1ListStreamProcessorsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1ListStreamProcessorsCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1ListStreamProcessorsResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1ListStreamProcessorsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, parsedBody, message;
    var _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _a = [__assign({}, output)];
                _j = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_j.body = _k.sent(), _j)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidPaginationTokenException": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "ThrottlingException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 12];
                }
                return [3 /*break*/, 14];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 14:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _k.label = 15;
            case 15:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1RecognizeCelebritiesCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1RecognizeCelebritiesCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1RecognizeCelebritiesResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1RecognizeCelebritiesCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, _j, _k, parsedBody, message;
    var _l;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                _a = [__assign({}, output)];
                _l = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_l.body = _m.sent(), _l)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "ImageTooLargeException": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#ImageTooLargeException": return [3 /*break*/, 4];
                    case "InternalServerError": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 6];
                    case "InvalidImageFormatException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidImageFormatException": return [3 /*break*/, 8];
                    case "InvalidParameterException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 10];
                    case "InvalidS3ObjectException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#InvalidS3ObjectException": return [3 /*break*/, 12];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "ThrottlingException": return [3 /*break*/, 16];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 16];
                }
                return [3 /*break*/, 18];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ImageTooLargeExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidImageFormatExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 16:
                _k = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 17:
                response = __assign.apply(void 0, [__assign.apply(void 0, _k.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 18:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _m.label = 19;
            case 19:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1SearchFacesCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1SearchFacesCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1SearchFacesResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1SearchFacesCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, parsedBody, message;
    var _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _a = [__assign({}, output)];
                _j = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_j.body = _k.sent(), _j)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidParameterException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 6];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "ResourceNotFoundException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 10];
                    case "ThrottlingException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 12];
                }
                return [3 /*break*/, 14];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 14:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _k.label = 15;
            case 15:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1SearchFacesByImageCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1SearchFacesByImageCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1SearchFacesByImageResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1SearchFacesByImageCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "ImageTooLargeException": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#ImageTooLargeException": return [3 /*break*/, 4];
                    case "InternalServerError": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 6];
                    case "InvalidImageFormatException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidImageFormatException": return [3 /*break*/, 8];
                    case "InvalidParameterException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 10];
                    case "InvalidS3ObjectException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#InvalidS3ObjectException": return [3 /*break*/, 12];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "ResourceNotFoundException": return [3 /*break*/, 16];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 16];
                    case "ThrottlingException": return [3 /*break*/, 18];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 18];
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
                return [4 /*yield*/, deserializeAws_json1_1ImageTooLargeExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidImageFormatExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 17:
                response = __assign.apply(void 0, [__assign.apply(void 0, _k.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 18:
                _l = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StartCelebrityRecognitionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartCelebrityRecognitionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartCelebrityRecognitionResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartCelebrityRecognitionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "IdempotentParameterMismatchException": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#IdempotentParameterMismatchException": return [3 /*break*/, 4];
                    case "InternalServerError": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "InvalidS3ObjectException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#InvalidS3ObjectException": return [3 /*break*/, 10];
                    case "LimitExceededException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#LimitExceededException": return [3 /*break*/, 12];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "ThrottlingException": return [3 /*break*/, 16];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 16];
                    case "VideoTooLargeException": return [3 /*break*/, 18];
                    case "com.amazonaws.rekognition#VideoTooLargeException": return [3 /*break*/, 18];
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
                return [4 /*yield*/, deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1VideoTooLargeExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StartContentModerationCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartContentModerationCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartContentModerationResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartContentModerationCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "IdempotentParameterMismatchException": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#IdempotentParameterMismatchException": return [3 /*break*/, 4];
                    case "InternalServerError": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "InvalidS3ObjectException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#InvalidS3ObjectException": return [3 /*break*/, 10];
                    case "LimitExceededException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#LimitExceededException": return [3 /*break*/, 12];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "ThrottlingException": return [3 /*break*/, 16];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 16];
                    case "VideoTooLargeException": return [3 /*break*/, 18];
                    case "com.amazonaws.rekognition#VideoTooLargeException": return [3 /*break*/, 18];
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
                return [4 /*yield*/, deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1VideoTooLargeExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StartFaceDetectionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartFaceDetectionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartFaceDetectionResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartFaceDetectionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "IdempotentParameterMismatchException": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#IdempotentParameterMismatchException": return [3 /*break*/, 4];
                    case "InternalServerError": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "InvalidS3ObjectException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#InvalidS3ObjectException": return [3 /*break*/, 10];
                    case "LimitExceededException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#LimitExceededException": return [3 /*break*/, 12];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "ThrottlingException": return [3 /*break*/, 16];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 16];
                    case "VideoTooLargeException": return [3 /*break*/, 18];
                    case "com.amazonaws.rekognition#VideoTooLargeException": return [3 /*break*/, 18];
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
                return [4 /*yield*/, deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1VideoTooLargeExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StartFaceSearchCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartFaceSearchCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartFaceSearchResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartFaceSearchCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "IdempotentParameterMismatchException": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#IdempotentParameterMismatchException": return [3 /*break*/, 4];
                    case "InternalServerError": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "InvalidS3ObjectException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#InvalidS3ObjectException": return [3 /*break*/, 10];
                    case "LimitExceededException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#LimitExceededException": return [3 /*break*/, 12];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "ResourceNotFoundException": return [3 /*break*/, 16];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 16];
                    case "ThrottlingException": return [3 /*break*/, 18];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 18];
                    case "VideoTooLargeException": return [3 /*break*/, 20];
                    case "com.amazonaws.rekognition#VideoTooLargeException": return [3 /*break*/, 20];
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
                return [4 /*yield*/, deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_p.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 23];
            case 16:
                _k = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1VideoTooLargeExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StartLabelDetectionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartLabelDetectionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartLabelDetectionResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartLabelDetectionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "IdempotentParameterMismatchException": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#IdempotentParameterMismatchException": return [3 /*break*/, 4];
                    case "InternalServerError": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "InvalidS3ObjectException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#InvalidS3ObjectException": return [3 /*break*/, 10];
                    case "LimitExceededException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#LimitExceededException": return [3 /*break*/, 12];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "ThrottlingException": return [3 /*break*/, 16];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 16];
                    case "VideoTooLargeException": return [3 /*break*/, 18];
                    case "com.amazonaws.rekognition#VideoTooLargeException": return [3 /*break*/, 18];
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
                return [4 /*yield*/, deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1VideoTooLargeExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StartPersonTrackingCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartPersonTrackingCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartPersonTrackingResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartPersonTrackingCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "IdempotentParameterMismatchException": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#IdempotentParameterMismatchException": return [3 /*break*/, 4];
                    case "InternalServerError": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "InvalidS3ObjectException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#InvalidS3ObjectException": return [3 /*break*/, 10];
                    case "LimitExceededException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#LimitExceededException": return [3 /*break*/, 12];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "ThrottlingException": return [3 /*break*/, 16];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 16];
                    case "VideoTooLargeException": return [3 /*break*/, 18];
                    case "com.amazonaws.rekognition#VideoTooLargeException": return [3 /*break*/, 18];
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
                return [4 /*yield*/, deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1VideoTooLargeExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StartProjectVersionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartProjectVersionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartProjectVersionResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartProjectVersionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, _j, _k, parsedBody, message;
    var _l;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                _a = [__assign({}, output)];
                _l = {};
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                parsedOutput = __assign.apply(void 0, _a.concat([(_l.body = _m.sent(), _l)]));
                errorCode = "UnknownError";
                errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
                _b = errorCode;
                switch (_b) {
                    case "AccessDeniedException": return [3 /*break*/, 2];
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidParameterException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 6];
                    case "LimitExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#LimitExceededException": return [3 /*break*/, 8];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 10];
                    case "ResourceInUseException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceInUseException": return [3 /*break*/, 12];
                    case "ResourceNotFoundException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 14];
                    case "ThrottlingException": return [3 /*break*/, 16];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 16];
                }
                return [3 /*break*/, 18];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 16:
                _k = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)];
            case 17:
                response = __assign.apply(void 0, [__assign.apply(void 0, _k.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 18:
                parsedBody = parsedOutput.body;
                errorCode = parsedBody.code || parsedBody.Code || errorCode;
                response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
                _m.label = 19;
            case 19:
                message = response.message || response.Message || errorCode;
                response.message = message;
                delete response.Message;
                return [2 /*return*/, Promise.reject(Object.assign(new Error(message), response))];
        }
    });
}); };
export var deserializeAws_json1_1StartSegmentDetectionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartSegmentDetectionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartSegmentDetectionResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartSegmentDetectionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "IdempotentParameterMismatchException": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#IdempotentParameterMismatchException": return [3 /*break*/, 4];
                    case "InternalServerError": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "InvalidS3ObjectException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#InvalidS3ObjectException": return [3 /*break*/, 10];
                    case "LimitExceededException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#LimitExceededException": return [3 /*break*/, 12];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "ThrottlingException": return [3 /*break*/, 16];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 16];
                    case "VideoTooLargeException": return [3 /*break*/, 18];
                    case "com.amazonaws.rekognition#VideoTooLargeException": return [3 /*break*/, 18];
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
                return [4 /*yield*/, deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1VideoTooLargeExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StartStreamProcessorCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartStreamProcessorCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartStreamProcessorResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartStreamProcessorCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidParameterException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 6];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "ResourceInUseException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ResourceInUseException": return [3 /*break*/, 10];
                    case "ResourceNotFoundException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 14];
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
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StartTextDetectionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartTextDetectionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartTextDetectionResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartTextDetectionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "IdempotentParameterMismatchException": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#IdempotentParameterMismatchException": return [3 /*break*/, 4];
                    case "InternalServerError": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 6];
                    case "InvalidParameterException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 8];
                    case "InvalidS3ObjectException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#InvalidS3ObjectException": return [3 /*break*/, 10];
                    case "LimitExceededException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#LimitExceededException": return [3 /*break*/, 12];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 14];
                    case "ThrottlingException": return [3 /*break*/, 16];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 16];
                    case "VideoTooLargeException": return [3 /*break*/, 18];
                    case "com.amazonaws.rekognition#VideoTooLargeException": return [3 /*break*/, 18];
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
                return [4 /*yield*/, deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_o.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 21];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1VideoTooLargeExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StopProjectVersionCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StopProjectVersionCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StopProjectVersionResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StopProjectVersionCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidParameterException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 6];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "ResourceInUseException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ResourceInUseException": return [3 /*break*/, 10];
                    case "ResourceNotFoundException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 14];
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
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StopStreamProcessorCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StopStreamProcessorCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StopStreamProcessorResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StopStreamProcessorCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "com.amazonaws.rekognition#AccessDeniedException": return [3 /*break*/, 2];
                    case "InternalServerError": return [3 /*break*/, 4];
                    case "com.amazonaws.rekognition#InternalServerError": return [3 /*break*/, 4];
                    case "InvalidParameterException": return [3 /*break*/, 6];
                    case "com.amazonaws.rekognition#InvalidParameterException": return [3 /*break*/, 6];
                    case "ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.rekognition#ProvisionedThroughputExceededException": return [3 /*break*/, 8];
                    case "ResourceInUseException": return [3 /*break*/, 10];
                    case "com.amazonaws.rekognition#ResourceInUseException": return [3 /*break*/, 10];
                    case "ResourceNotFoundException": return [3 /*break*/, 12];
                    case "com.amazonaws.rekognition#ResourceNotFoundException": return [3 /*break*/, 12];
                    case "ThrottlingException": return [3 /*break*/, 14];
                    case "com.amazonaws.rekognition#ThrottlingException": return [3 /*break*/, 14];
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
                return [4 /*yield*/, deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
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
var deserializeAws_json1_1AccessDeniedExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1AccessDeniedException(body, context);
        contents = __assign({ name: "AccessDeniedException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
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
var deserializeAws_json1_1ImageTooLargeExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1ImageTooLargeException(body, context);
        contents = __assign({ name: "ImageTooLargeException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
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
var deserializeAws_json1_1InvalidImageFormatExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1InvalidImageFormatException(body, context);
        contents = __assign({ name: "InvalidImageFormatException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1InvalidPaginationTokenExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1InvalidPaginationTokenException(body, context);
        contents = __assign({ name: "InvalidPaginationTokenException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
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
var deserializeAws_json1_1ResourceAlreadyExistsExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1ResourceAlreadyExistsException(body, context);
        contents = __assign({ name: "ResourceAlreadyExistsException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
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
var deserializeAws_json1_1ResourceNotReadyExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1ResourceNotReadyException(body, context);
        contents = __assign({ name: "ResourceNotReadyException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1ServiceQuotaExceededExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1ServiceQuotaExceededException(body, context);
        contents = __assign({ name: "ServiceQuotaExceededException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
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
var deserializeAws_json1_1VideoTooLargeExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1VideoTooLargeException(body, context);
        contents = __assign({ name: "VideoTooLargeException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var serializeAws_json1_1Asset = function (input, context) {
    return __assign({}, (input.GroundTruthManifest !== undefined &&
        input.GroundTruthManifest !== null && {
        GroundTruthManifest: serializeAws_json1_1GroundTruthManifest(input.GroundTruthManifest, context),
    }));
};
var serializeAws_json1_1Assets = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1Asset(entry, context);
    });
};
var serializeAws_json1_1Attributes = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var serializeAws_json1_1BoundingBox = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.Height !== undefined && input.Height !== null && { Height: input.Height })), (input.Left !== undefined && input.Left !== null && { Left: input.Left })), (input.Top !== undefined && input.Top !== null && { Top: input.Top })), (input.Width !== undefined && input.Width !== null && { Width: input.Width }));
};
var serializeAws_json1_1CompareFacesRequest = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.QualityFilter !== undefined && input.QualityFilter !== null && { QualityFilter: input.QualityFilter })), (input.SimilarityThreshold !== undefined &&
        input.SimilarityThreshold !== null && { SimilarityThreshold: input.SimilarityThreshold })), (input.SourceImage !== undefined &&
        input.SourceImage !== null && { SourceImage: serializeAws_json1_1Image(input.SourceImage, context) })), (input.TargetImage !== undefined &&
        input.TargetImage !== null && { TargetImage: serializeAws_json1_1Image(input.TargetImage, context) }));
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
var serializeAws_json1_1CreateCollectionRequest = function (input, context) {
    return __assign({}, (input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId }));
};
var serializeAws_json1_1CreateProjectRequest = function (input, context) {
    return __assign({}, (input.ProjectName !== undefined && input.ProjectName !== null && { ProjectName: input.ProjectName }));
};
var serializeAws_json1_1CreateProjectVersionRequest = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign({}, (input.OutputConfig !== undefined &&
        input.OutputConfig !== null && { OutputConfig: serializeAws_json1_1OutputConfig(input.OutputConfig, context) })), (input.ProjectArn !== undefined && input.ProjectArn !== null && { ProjectArn: input.ProjectArn })), (input.TestingData !== undefined &&
        input.TestingData !== null && { TestingData: serializeAws_json1_1TestingData(input.TestingData, context) })), (input.TrainingData !== undefined &&
        input.TrainingData !== null && { TrainingData: serializeAws_json1_1TrainingData(input.TrainingData, context) })), (input.VersionName !== undefined && input.VersionName !== null && { VersionName: input.VersionName }));
};
var serializeAws_json1_1CreateStreamProcessorRequest = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign({}, (input.Input !== undefined &&
        input.Input !== null && { Input: serializeAws_json1_1StreamProcessorInput(input.Input, context) })), (input.Name !== undefined && input.Name !== null && { Name: input.Name })), (input.Output !== undefined &&
        input.Output !== null && { Output: serializeAws_json1_1StreamProcessorOutput(input.Output, context) })), (input.RoleArn !== undefined && input.RoleArn !== null && { RoleArn: input.RoleArn })), (input.Settings !== undefined &&
        input.Settings !== null && { Settings: serializeAws_json1_1StreamProcessorSettings(input.Settings, context) }));
};
var serializeAws_json1_1DeleteCollectionRequest = function (input, context) {
    return __assign({}, (input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId }));
};
var serializeAws_json1_1DeleteFacesRequest = function (input, context) {
    return __assign(__assign({}, (input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId })), (input.FaceIds !== undefined &&
        input.FaceIds !== null && { FaceIds: serializeAws_json1_1FaceIdList(input.FaceIds, context) }));
};
var serializeAws_json1_1DeleteProjectRequest = function (input, context) {
    return __assign({}, (input.ProjectArn !== undefined && input.ProjectArn !== null && { ProjectArn: input.ProjectArn }));
};
var serializeAws_json1_1DeleteProjectVersionRequest = function (input, context) {
    return __assign({}, (input.ProjectVersionArn !== undefined &&
        input.ProjectVersionArn !== null && { ProjectVersionArn: input.ProjectVersionArn }));
};
var serializeAws_json1_1DeleteStreamProcessorRequest = function (input, context) {
    return __assign({}, (input.Name !== undefined && input.Name !== null && { Name: input.Name }));
};
var serializeAws_json1_1DescribeCollectionRequest = function (input, context) {
    return __assign({}, (input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId }));
};
var serializeAws_json1_1DescribeProjectsRequest = function (input, context) {
    return __assign(__assign({}, (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }));
};
var serializeAws_json1_1DescribeProjectVersionsRequest = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken })), (input.ProjectArn !== undefined && input.ProjectArn !== null && { ProjectArn: input.ProjectArn })), (input.VersionNames !== undefined &&
        input.VersionNames !== null && { VersionNames: serializeAws_json1_1VersionNames(input.VersionNames, context) }));
};
var serializeAws_json1_1DescribeStreamProcessorRequest = function (input, context) {
    return __assign({}, (input.Name !== undefined && input.Name !== null && { Name: input.Name }));
};
var serializeAws_json1_1DetectCustomLabelsRequest = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.Image !== undefined &&
        input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.MinConfidence !== undefined && input.MinConfidence !== null && { MinConfidence: input.MinConfidence })), (input.ProjectVersionArn !== undefined &&
        input.ProjectVersionArn !== null && { ProjectVersionArn: input.ProjectVersionArn }));
};
var serializeAws_json1_1DetectFacesRequest = function (input, context) {
    return __assign(__assign({}, (input.Attributes !== undefined &&
        input.Attributes !== null && { Attributes: serializeAws_json1_1Attributes(input.Attributes, context) })), (input.Image !== undefined &&
        input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) }));
};
var serializeAws_json1_1DetectionFilter = function (input, context) {
    return __assign(__assign(__assign({}, (input.MinBoundingBoxHeight !== undefined &&
        input.MinBoundingBoxHeight !== null && { MinBoundingBoxHeight: input.MinBoundingBoxHeight })), (input.MinBoundingBoxWidth !== undefined &&
        input.MinBoundingBoxWidth !== null && { MinBoundingBoxWidth: input.MinBoundingBoxWidth })), (input.MinConfidence !== undefined && input.MinConfidence !== null && { MinConfidence: input.MinConfidence }));
};
var serializeAws_json1_1DetectLabelsRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.Image !== undefined &&
        input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) })), (input.MaxLabels !== undefined && input.MaxLabels !== null && { MaxLabels: input.MaxLabels })), (input.MinConfidence !== undefined && input.MinConfidence !== null && { MinConfidence: input.MinConfidence }));
};
var serializeAws_json1_1DetectModerationLabelsRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.HumanLoopConfig !== undefined &&
        input.HumanLoopConfig !== null && {
        HumanLoopConfig: serializeAws_json1_1HumanLoopConfig(input.HumanLoopConfig, context),
    })), (input.Image !== undefined &&
        input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) })), (input.MinConfidence !== undefined && input.MinConfidence !== null && { MinConfidence: input.MinConfidence }));
};
var serializeAws_json1_1DetectProtectiveEquipmentRequest = function (input, context) {
    return __assign(__assign({}, (input.Image !== undefined &&
        input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) })), (input.SummarizationAttributes !== undefined &&
        input.SummarizationAttributes !== null && {
        SummarizationAttributes: serializeAws_json1_1ProtectiveEquipmentSummarizationAttributes(input.SummarizationAttributes, context),
    }));
};
var serializeAws_json1_1DetectTextFilters = function (input, context) {
    return __assign(__assign({}, (input.RegionsOfInterest !== undefined &&
        input.RegionsOfInterest !== null && {
        RegionsOfInterest: serializeAws_json1_1RegionsOfInterest(input.RegionsOfInterest, context),
    })), (input.WordFilter !== undefined &&
        input.WordFilter !== null && { WordFilter: serializeAws_json1_1DetectionFilter(input.WordFilter, context) }));
};
var serializeAws_json1_1DetectTextRequest = function (input, context) {
    return __assign(__assign({}, (input.Filters !== undefined &&
        input.Filters !== null && { Filters: serializeAws_json1_1DetectTextFilters(input.Filters, context) })), (input.Image !== undefined &&
        input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) }));
};
var serializeAws_json1_1FaceIdList = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var serializeAws_json1_1FaceSearchSettings = function (input, context) {
    return __assign(__assign({}, (input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId })), (input.FaceMatchThreshold !== undefined &&
        input.FaceMatchThreshold !== null && { FaceMatchThreshold: input.FaceMatchThreshold }));
};
var serializeAws_json1_1GetCelebrityInfoRequest = function (input, context) {
    return __assign({}, (input.Id !== undefined && input.Id !== null && { Id: input.Id }));
};
var serializeAws_json1_1GetCelebrityRecognitionRequest = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken })), (input.SortBy !== undefined && input.SortBy !== null && { SortBy: input.SortBy }));
};
var serializeAws_json1_1GetContentModerationRequest = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken })), (input.SortBy !== undefined && input.SortBy !== null && { SortBy: input.SortBy }));
};
var serializeAws_json1_1GetFaceDetectionRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }));
};
var serializeAws_json1_1GetFaceSearchRequest = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken })), (input.SortBy !== undefined && input.SortBy !== null && { SortBy: input.SortBy }));
};
var serializeAws_json1_1GetLabelDetectionRequest = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken })), (input.SortBy !== undefined && input.SortBy !== null && { SortBy: input.SortBy }));
};
var serializeAws_json1_1GetPersonTrackingRequest = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken })), (input.SortBy !== undefined && input.SortBy !== null && { SortBy: input.SortBy }));
};
var serializeAws_json1_1GetSegmentDetectionRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }));
};
var serializeAws_json1_1GetTextDetectionRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }));
};
var serializeAws_json1_1GroundTruthManifest = function (input, context) {
    return __assign({}, (input.S3Object !== undefined &&
        input.S3Object !== null && { S3Object: serializeAws_json1_1S3Object(input.S3Object, context) }));
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
var serializeAws_json1_1Image = function (input, context) {
    return __assign(__assign({}, (input.Bytes !== undefined && input.Bytes !== null && { Bytes: context.base64Encoder(input.Bytes) })), (input.S3Object !== undefined &&
        input.S3Object !== null && { S3Object: serializeAws_json1_1S3Object(input.S3Object, context) }));
};
var serializeAws_json1_1IndexFacesRequest = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign({}, (input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId })), (input.DetectionAttributes !== undefined &&
        input.DetectionAttributes !== null && {
        DetectionAttributes: serializeAws_json1_1Attributes(input.DetectionAttributes, context),
    })), (input.ExternalImageId !== undefined &&
        input.ExternalImageId !== null && { ExternalImageId: input.ExternalImageId })), (input.Image !== undefined &&
        input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) })), (input.MaxFaces !== undefined && input.MaxFaces !== null && { MaxFaces: input.MaxFaces })), (input.QualityFilter !== undefined && input.QualityFilter !== null && { QualityFilter: input.QualityFilter }));
};
var serializeAws_json1_1KinesisDataStream = function (input, context) {
    return __assign({}, (input.Arn !== undefined && input.Arn !== null && { Arn: input.Arn }));
};
var serializeAws_json1_1KinesisVideoStream = function (input, context) {
    return __assign({}, (input.Arn !== undefined && input.Arn !== null && { Arn: input.Arn }));
};
var serializeAws_json1_1ListCollectionsRequest = function (input, context) {
    return __assign(__assign({}, (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }));
};
var serializeAws_json1_1ListFacesRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }));
};
var serializeAws_json1_1ListStreamProcessorsRequest = function (input, context) {
    return __assign(__assign({}, (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }));
};
var serializeAws_json1_1NotificationChannel = function (input, context) {
    return __assign(__assign({}, (input.RoleArn !== undefined && input.RoleArn !== null && { RoleArn: input.RoleArn })), (input.SNSTopicArn !== undefined && input.SNSTopicArn !== null && { SNSTopicArn: input.SNSTopicArn }));
};
var serializeAws_json1_1OutputConfig = function (input, context) {
    return __assign(__assign({}, (input.S3Bucket !== undefined && input.S3Bucket !== null && { S3Bucket: input.S3Bucket })), (input.S3KeyPrefix !== undefined && input.S3KeyPrefix !== null && { S3KeyPrefix: input.S3KeyPrefix }));
};
var serializeAws_json1_1ProtectiveEquipmentSummarizationAttributes = function (input, context) {
    return __assign(__assign({}, (input.MinConfidence !== undefined && input.MinConfidence !== null && { MinConfidence: input.MinConfidence })), (input.RequiredEquipmentTypes !== undefined &&
        input.RequiredEquipmentTypes !== null && {
        RequiredEquipmentTypes: serializeAws_json1_1ProtectiveEquipmentTypes(input.RequiredEquipmentTypes, context),
    }));
};
var serializeAws_json1_1ProtectiveEquipmentTypes = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var serializeAws_json1_1RecognizeCelebritiesRequest = function (input, context) {
    return __assign({}, (input.Image !== undefined &&
        input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) }));
};
var serializeAws_json1_1RegionOfInterest = function (input, context) {
    return __assign({}, (input.BoundingBox !== undefined &&
        input.BoundingBox !== null && { BoundingBox: serializeAws_json1_1BoundingBox(input.BoundingBox, context) }));
};
var serializeAws_json1_1RegionsOfInterest = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1RegionOfInterest(entry, context);
    });
};
var serializeAws_json1_1S3Object = function (input, context) {
    return __assign(__assign(__assign({}, (input.Bucket !== undefined && input.Bucket !== null && { Bucket: input.Bucket })), (input.Name !== undefined && input.Name !== null && { Name: input.Name })), (input.Version !== undefined && input.Version !== null && { Version: input.Version }));
};
var serializeAws_json1_1SearchFacesByImageRequest = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign({}, (input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId })), (input.FaceMatchThreshold !== undefined &&
        input.FaceMatchThreshold !== null && { FaceMatchThreshold: input.FaceMatchThreshold })), (input.Image !== undefined &&
        input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) })), (input.MaxFaces !== undefined && input.MaxFaces !== null && { MaxFaces: input.MaxFaces })), (input.QualityFilter !== undefined && input.QualityFilter !== null && { QualityFilter: input.QualityFilter }));
};
var serializeAws_json1_1SearchFacesRequest = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId })), (input.FaceId !== undefined && input.FaceId !== null && { FaceId: input.FaceId })), (input.FaceMatchThreshold !== undefined &&
        input.FaceMatchThreshold !== null && { FaceMatchThreshold: input.FaceMatchThreshold })), (input.MaxFaces !== undefined && input.MaxFaces !== null && { MaxFaces: input.MaxFaces }));
};
var serializeAws_json1_1SegmentTypes = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var serializeAws_json1_1StartCelebrityRecognitionRequest = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.ClientRequestToken !== undefined &&
        input.ClientRequestToken !== null && { ClientRequestToken: input.ClientRequestToken })), (input.JobTag !== undefined && input.JobTag !== null && { JobTag: input.JobTag })), (input.NotificationChannel !== undefined &&
        input.NotificationChannel !== null && {
        NotificationChannel: serializeAws_json1_1NotificationChannel(input.NotificationChannel, context),
    })), (input.Video !== undefined &&
        input.Video !== null && { Video: serializeAws_json1_1Video(input.Video, context) }));
};
var serializeAws_json1_1StartContentModerationRequest = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign({}, (input.ClientRequestToken !== undefined &&
        input.ClientRequestToken !== null && { ClientRequestToken: input.ClientRequestToken })), (input.JobTag !== undefined && input.JobTag !== null && { JobTag: input.JobTag })), (input.MinConfidence !== undefined && input.MinConfidence !== null && { MinConfidence: input.MinConfidence })), (input.NotificationChannel !== undefined &&
        input.NotificationChannel !== null && {
        NotificationChannel: serializeAws_json1_1NotificationChannel(input.NotificationChannel, context),
    })), (input.Video !== undefined &&
        input.Video !== null && { Video: serializeAws_json1_1Video(input.Video, context) }));
};
var serializeAws_json1_1StartFaceDetectionRequest = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign({}, (input.ClientRequestToken !== undefined &&
        input.ClientRequestToken !== null && { ClientRequestToken: input.ClientRequestToken })), (input.FaceAttributes !== undefined &&
        input.FaceAttributes !== null && { FaceAttributes: input.FaceAttributes })), (input.JobTag !== undefined && input.JobTag !== null && { JobTag: input.JobTag })), (input.NotificationChannel !== undefined &&
        input.NotificationChannel !== null && {
        NotificationChannel: serializeAws_json1_1NotificationChannel(input.NotificationChannel, context),
    })), (input.Video !== undefined &&
        input.Video !== null && { Video: serializeAws_json1_1Video(input.Video, context) }));
};
var serializeAws_json1_1StartFaceSearchRequest = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign({}, (input.ClientRequestToken !== undefined &&
        input.ClientRequestToken !== null && { ClientRequestToken: input.ClientRequestToken })), (input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId })), (input.FaceMatchThreshold !== undefined &&
        input.FaceMatchThreshold !== null && { FaceMatchThreshold: input.FaceMatchThreshold })), (input.JobTag !== undefined && input.JobTag !== null && { JobTag: input.JobTag })), (input.NotificationChannel !== undefined &&
        input.NotificationChannel !== null && {
        NotificationChannel: serializeAws_json1_1NotificationChannel(input.NotificationChannel, context),
    })), (input.Video !== undefined &&
        input.Video !== null && { Video: serializeAws_json1_1Video(input.Video, context) }));
};
var serializeAws_json1_1StartLabelDetectionRequest = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign({}, (input.ClientRequestToken !== undefined &&
        input.ClientRequestToken !== null && { ClientRequestToken: input.ClientRequestToken })), (input.JobTag !== undefined && input.JobTag !== null && { JobTag: input.JobTag })), (input.MinConfidence !== undefined && input.MinConfidence !== null && { MinConfidence: input.MinConfidence })), (input.NotificationChannel !== undefined &&
        input.NotificationChannel !== null && {
        NotificationChannel: serializeAws_json1_1NotificationChannel(input.NotificationChannel, context),
    })), (input.Video !== undefined &&
        input.Video !== null && { Video: serializeAws_json1_1Video(input.Video, context) }));
};
var serializeAws_json1_1StartPersonTrackingRequest = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.ClientRequestToken !== undefined &&
        input.ClientRequestToken !== null && { ClientRequestToken: input.ClientRequestToken })), (input.JobTag !== undefined && input.JobTag !== null && { JobTag: input.JobTag })), (input.NotificationChannel !== undefined &&
        input.NotificationChannel !== null && {
        NotificationChannel: serializeAws_json1_1NotificationChannel(input.NotificationChannel, context),
    })), (input.Video !== undefined &&
        input.Video !== null && { Video: serializeAws_json1_1Video(input.Video, context) }));
};
var serializeAws_json1_1StartProjectVersionRequest = function (input, context) {
    return __assign(__assign({}, (input.MinInferenceUnits !== undefined &&
        input.MinInferenceUnits !== null && { MinInferenceUnits: input.MinInferenceUnits })), (input.ProjectVersionArn !== undefined &&
        input.ProjectVersionArn !== null && { ProjectVersionArn: input.ProjectVersionArn }));
};
var serializeAws_json1_1StartSegmentDetectionFilters = function (input, context) {
    return __assign(__assign({}, (input.ShotFilter !== undefined &&
        input.ShotFilter !== null && {
        ShotFilter: serializeAws_json1_1StartShotDetectionFilter(input.ShotFilter, context),
    })), (input.TechnicalCueFilter !== undefined &&
        input.TechnicalCueFilter !== null && {
        TechnicalCueFilter: serializeAws_json1_1StartTechnicalCueDetectionFilter(input.TechnicalCueFilter, context),
    }));
};
var serializeAws_json1_1StartSegmentDetectionRequest = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign({}, (input.ClientRequestToken !== undefined &&
        input.ClientRequestToken !== null && { ClientRequestToken: input.ClientRequestToken })), (input.Filters !== undefined &&
        input.Filters !== null && { Filters: serializeAws_json1_1StartSegmentDetectionFilters(input.Filters, context) })), (input.JobTag !== undefined && input.JobTag !== null && { JobTag: input.JobTag })), (input.NotificationChannel !== undefined &&
        input.NotificationChannel !== null && {
        NotificationChannel: serializeAws_json1_1NotificationChannel(input.NotificationChannel, context),
    })), (input.SegmentTypes !== undefined &&
        input.SegmentTypes !== null && { SegmentTypes: serializeAws_json1_1SegmentTypes(input.SegmentTypes, context) })), (input.Video !== undefined &&
        input.Video !== null && { Video: serializeAws_json1_1Video(input.Video, context) }));
};
var serializeAws_json1_1StartShotDetectionFilter = function (input, context) {
    return __assign({}, (input.MinSegmentConfidence !== undefined &&
        input.MinSegmentConfidence !== null && { MinSegmentConfidence: input.MinSegmentConfidence }));
};
var serializeAws_json1_1StartStreamProcessorRequest = function (input, context) {
    return __assign({}, (input.Name !== undefined && input.Name !== null && { Name: input.Name }));
};
var serializeAws_json1_1StartTechnicalCueDetectionFilter = function (input, context) {
    return __assign({}, (input.MinSegmentConfidence !== undefined &&
        input.MinSegmentConfidence !== null && { MinSegmentConfidence: input.MinSegmentConfidence }));
};
var serializeAws_json1_1StartTextDetectionFilters = function (input, context) {
    return __assign(__assign({}, (input.RegionsOfInterest !== undefined &&
        input.RegionsOfInterest !== null && {
        RegionsOfInterest: serializeAws_json1_1RegionsOfInterest(input.RegionsOfInterest, context),
    })), (input.WordFilter !== undefined &&
        input.WordFilter !== null && { WordFilter: serializeAws_json1_1DetectionFilter(input.WordFilter, context) }));
};
var serializeAws_json1_1StartTextDetectionRequest = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign({}, (input.ClientRequestToken !== undefined &&
        input.ClientRequestToken !== null && { ClientRequestToken: input.ClientRequestToken })), (input.Filters !== undefined &&
        input.Filters !== null && { Filters: serializeAws_json1_1StartTextDetectionFilters(input.Filters, context) })), (input.JobTag !== undefined && input.JobTag !== null && { JobTag: input.JobTag })), (input.NotificationChannel !== undefined &&
        input.NotificationChannel !== null && {
        NotificationChannel: serializeAws_json1_1NotificationChannel(input.NotificationChannel, context),
    })), (input.Video !== undefined &&
        input.Video !== null && { Video: serializeAws_json1_1Video(input.Video, context) }));
};
var serializeAws_json1_1StopProjectVersionRequest = function (input, context) {
    return __assign({}, (input.ProjectVersionArn !== undefined &&
        input.ProjectVersionArn !== null && { ProjectVersionArn: input.ProjectVersionArn }));
};
var serializeAws_json1_1StopStreamProcessorRequest = function (input, context) {
    return __assign({}, (input.Name !== undefined && input.Name !== null && { Name: input.Name }));
};
var serializeAws_json1_1StreamProcessorInput = function (input, context) {
    return __assign({}, (input.KinesisVideoStream !== undefined &&
        input.KinesisVideoStream !== null && {
        KinesisVideoStream: serializeAws_json1_1KinesisVideoStream(input.KinesisVideoStream, context),
    }));
};
var serializeAws_json1_1StreamProcessorOutput = function (input, context) {
    return __assign({}, (input.KinesisDataStream !== undefined &&
        input.KinesisDataStream !== null && {
        KinesisDataStream: serializeAws_json1_1KinesisDataStream(input.KinesisDataStream, context),
    }));
};
var serializeAws_json1_1StreamProcessorSettings = function (input, context) {
    return __assign({}, (input.FaceSearch !== undefined &&
        input.FaceSearch !== null && { FaceSearch: serializeAws_json1_1FaceSearchSettings(input.FaceSearch, context) }));
};
var serializeAws_json1_1TestingData = function (input, context) {
    return __assign(__assign({}, (input.Assets !== undefined &&
        input.Assets !== null && { Assets: serializeAws_json1_1Assets(input.Assets, context) })), (input.AutoCreate !== undefined && input.AutoCreate !== null && { AutoCreate: input.AutoCreate }));
};
var serializeAws_json1_1TrainingData = function (input, context) {
    return __assign({}, (input.Assets !== undefined &&
        input.Assets !== null && { Assets: serializeAws_json1_1Assets(input.Assets, context) }));
};
var serializeAws_json1_1VersionNames = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var serializeAws_json1_1Video = function (input, context) {
    return __assign({}, (input.S3Object !== undefined &&
        input.S3Object !== null && { S3Object: serializeAws_json1_1S3Object(input.S3Object, context) }));
};
var deserializeAws_json1_1AccessDeniedException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1AgeRange = function (output, context) {
    return {
        High: output.High !== undefined && output.High !== null ? output.High : undefined,
        Low: output.Low !== undefined && output.Low !== null ? output.Low : undefined,
    };
};
var deserializeAws_json1_1Asset = function (output, context) {
    return {
        GroundTruthManifest: output.GroundTruthManifest !== undefined && output.GroundTruthManifest !== null
            ? deserializeAws_json1_1GroundTruthManifest(output.GroundTruthManifest, context)
            : undefined,
    };
};
var deserializeAws_json1_1Assets = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Asset(entry, context);
    });
};
var deserializeAws_json1_1AudioMetadata = function (output, context) {
    return {
        Codec: output.Codec !== undefined && output.Codec !== null ? output.Codec : undefined,
        DurationMillis: output.DurationMillis !== undefined && output.DurationMillis !== null ? output.DurationMillis : undefined,
        NumberOfChannels: output.NumberOfChannels !== undefined && output.NumberOfChannels !== null ? output.NumberOfChannels : undefined,
        SampleRate: output.SampleRate !== undefined && output.SampleRate !== null ? output.SampleRate : undefined,
    };
};
var deserializeAws_json1_1AudioMetadataList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1AudioMetadata(entry, context);
    });
};
var deserializeAws_json1_1Beard = function (output, context) {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
var deserializeAws_json1_1BodyParts = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ProtectiveEquipmentBodyPart(entry, context);
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
var deserializeAws_json1_1Celebrity = function (output, context) {
    return {
        Face: output.Face !== undefined && output.Face !== null
            ? deserializeAws_json1_1ComparedFace(output.Face, context)
            : undefined,
        Id: output.Id !== undefined && output.Id !== null ? output.Id : undefined,
        MatchConfidence: output.MatchConfidence !== undefined && output.MatchConfidence !== null ? output.MatchConfidence : undefined,
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        Urls: output.Urls !== undefined && output.Urls !== null ? deserializeAws_json1_1Urls(output.Urls, context) : undefined,
    };
};
var deserializeAws_json1_1CelebrityDetail = function (output, context) {
    return {
        BoundingBox: output.BoundingBox !== undefined && output.BoundingBox !== null
            ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
            : undefined,
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Face: output.Face !== undefined && output.Face !== null
            ? deserializeAws_json1_1FaceDetail(output.Face, context)
            : undefined,
        Id: output.Id !== undefined && output.Id !== null ? output.Id : undefined,
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        Urls: output.Urls !== undefined && output.Urls !== null ? deserializeAws_json1_1Urls(output.Urls, context) : undefined,
    };
};
var deserializeAws_json1_1CelebrityList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Celebrity(entry, context);
    });
};
var deserializeAws_json1_1CelebrityRecognition = function (output, context) {
    return {
        Celebrity: output.Celebrity !== undefined && output.Celebrity !== null
            ? deserializeAws_json1_1CelebrityDetail(output.Celebrity, context)
            : undefined,
        Timestamp: output.Timestamp !== undefined && output.Timestamp !== null ? output.Timestamp : undefined,
    };
};
var deserializeAws_json1_1CelebrityRecognitions = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1CelebrityRecognition(entry, context);
    });
};
var deserializeAws_json1_1CollectionIdList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var deserializeAws_json1_1ComparedFace = function (output, context) {
    return {
        BoundingBox: output.BoundingBox !== undefined && output.BoundingBox !== null
            ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
            : undefined,
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Landmarks: output.Landmarks !== undefined && output.Landmarks !== null
            ? deserializeAws_json1_1Landmarks(output.Landmarks, context)
            : undefined,
        Pose: output.Pose !== undefined && output.Pose !== null ? deserializeAws_json1_1Pose(output.Pose, context) : undefined,
        Quality: output.Quality !== undefined && output.Quality !== null
            ? deserializeAws_json1_1ImageQuality(output.Quality, context)
            : undefined,
    };
};
var deserializeAws_json1_1ComparedFaceList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ComparedFace(entry, context);
    });
};
var deserializeAws_json1_1ComparedSourceImageFace = function (output, context) {
    return {
        BoundingBox: output.BoundingBox !== undefined && output.BoundingBox !== null
            ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
            : undefined,
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    };
};
var deserializeAws_json1_1CompareFacesMatch = function (output, context) {
    return {
        Face: output.Face !== undefined && output.Face !== null
            ? deserializeAws_json1_1ComparedFace(output.Face, context)
            : undefined,
        Similarity: output.Similarity !== undefined && output.Similarity !== null ? output.Similarity : undefined,
    };
};
var deserializeAws_json1_1CompareFacesMatchList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1CompareFacesMatch(entry, context);
    });
};
var deserializeAws_json1_1CompareFacesResponse = function (output, context) {
    return {
        FaceMatches: output.FaceMatches !== undefined && output.FaceMatches !== null
            ? deserializeAws_json1_1CompareFacesMatchList(output.FaceMatches, context)
            : undefined,
        SourceImageFace: output.SourceImageFace !== undefined && output.SourceImageFace !== null
            ? deserializeAws_json1_1ComparedSourceImageFace(output.SourceImageFace, context)
            : undefined,
        SourceImageOrientationCorrection: output.SourceImageOrientationCorrection !== undefined && output.SourceImageOrientationCorrection !== null
            ? output.SourceImageOrientationCorrection
            : undefined,
        TargetImageOrientationCorrection: output.TargetImageOrientationCorrection !== undefined && output.TargetImageOrientationCorrection !== null
            ? output.TargetImageOrientationCorrection
            : undefined,
        UnmatchedFaces: output.UnmatchedFaces !== undefined && output.UnmatchedFaces !== null
            ? deserializeAws_json1_1CompareFacesUnmatchList(output.UnmatchedFaces, context)
            : undefined,
    };
};
var deserializeAws_json1_1CompareFacesUnmatchList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ComparedFace(entry, context);
    });
};
var deserializeAws_json1_1ContentModerationDetection = function (output, context) {
    return {
        ModerationLabel: output.ModerationLabel !== undefined && output.ModerationLabel !== null
            ? deserializeAws_json1_1ModerationLabel(output.ModerationLabel, context)
            : undefined,
        Timestamp: output.Timestamp !== undefined && output.Timestamp !== null ? output.Timestamp : undefined,
    };
};
var deserializeAws_json1_1ContentModerationDetections = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ContentModerationDetection(entry, context);
    });
};
var deserializeAws_json1_1CoversBodyPart = function (output, context) {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
var deserializeAws_json1_1CreateCollectionResponse = function (output, context) {
    return {
        CollectionArn: output.CollectionArn !== undefined && output.CollectionArn !== null ? output.CollectionArn : undefined,
        FaceModelVersion: output.FaceModelVersion !== undefined && output.FaceModelVersion !== null ? output.FaceModelVersion : undefined,
        StatusCode: output.StatusCode !== undefined && output.StatusCode !== null ? output.StatusCode : undefined,
    };
};
var deserializeAws_json1_1CreateProjectResponse = function (output, context) {
    return {
        ProjectArn: output.ProjectArn !== undefined && output.ProjectArn !== null ? output.ProjectArn : undefined,
    };
};
var deserializeAws_json1_1CreateProjectVersionResponse = function (output, context) {
    return {
        ProjectVersionArn: output.ProjectVersionArn !== undefined && output.ProjectVersionArn !== null
            ? output.ProjectVersionArn
            : undefined,
    };
};
var deserializeAws_json1_1CreateStreamProcessorResponse = function (output, context) {
    return {
        StreamProcessorArn: output.StreamProcessorArn !== undefined && output.StreamProcessorArn !== null
            ? output.StreamProcessorArn
            : undefined,
    };
};
var deserializeAws_json1_1CustomLabel = function (output, context) {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Geometry: output.Geometry !== undefined && output.Geometry !== null
            ? deserializeAws_json1_1Geometry(output.Geometry, context)
            : undefined,
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
    };
};
var deserializeAws_json1_1CustomLabels = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1CustomLabel(entry, context);
    });
};
var deserializeAws_json1_1DeleteCollectionResponse = function (output, context) {
    return {
        StatusCode: output.StatusCode !== undefined && output.StatusCode !== null ? output.StatusCode : undefined,
    };
};
var deserializeAws_json1_1DeleteFacesResponse = function (output, context) {
    return {
        DeletedFaces: output.DeletedFaces !== undefined && output.DeletedFaces !== null
            ? deserializeAws_json1_1FaceIdList(output.DeletedFaces, context)
            : undefined,
    };
};
var deserializeAws_json1_1DeleteProjectResponse = function (output, context) {
    return {
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
    };
};
var deserializeAws_json1_1DeleteProjectVersionResponse = function (output, context) {
    return {
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
    };
};
var deserializeAws_json1_1DeleteStreamProcessorResponse = function (output, context) {
    return {};
};
var deserializeAws_json1_1DescribeCollectionResponse = function (output, context) {
    return {
        CollectionARN: output.CollectionARN !== undefined && output.CollectionARN !== null ? output.CollectionARN : undefined,
        CreationTimestamp: output.CreationTimestamp !== undefined && output.CreationTimestamp !== null
            ? new Date(Math.round(output.CreationTimestamp * 1000))
            : undefined,
        FaceCount: output.FaceCount !== undefined && output.FaceCount !== null ? output.FaceCount : undefined,
        FaceModelVersion: output.FaceModelVersion !== undefined && output.FaceModelVersion !== null ? output.FaceModelVersion : undefined,
    };
};
var deserializeAws_json1_1DescribeProjectsResponse = function (output, context) {
    return {
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        ProjectDescriptions: output.ProjectDescriptions !== undefined && output.ProjectDescriptions !== null
            ? deserializeAws_json1_1ProjectDescriptions(output.ProjectDescriptions, context)
            : undefined,
    };
};
var deserializeAws_json1_1DescribeProjectVersionsResponse = function (output, context) {
    return {
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        ProjectVersionDescriptions: output.ProjectVersionDescriptions !== undefined && output.ProjectVersionDescriptions !== null
            ? deserializeAws_json1_1ProjectVersionDescriptions(output.ProjectVersionDescriptions, context)
            : undefined,
    };
};
var deserializeAws_json1_1DescribeStreamProcessorResponse = function (output, context) {
    return {
        CreationTimestamp: output.CreationTimestamp !== undefined && output.CreationTimestamp !== null
            ? new Date(Math.round(output.CreationTimestamp * 1000))
            : undefined,
        Input: output.Input !== undefined && output.Input !== null
            ? deserializeAws_json1_1StreamProcessorInput(output.Input, context)
            : undefined,
        LastUpdateTimestamp: output.LastUpdateTimestamp !== undefined && output.LastUpdateTimestamp !== null
            ? new Date(Math.round(output.LastUpdateTimestamp * 1000))
            : undefined,
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        Output: output.Output !== undefined && output.Output !== null
            ? deserializeAws_json1_1StreamProcessorOutput(output.Output, context)
            : undefined,
        RoleArn: output.RoleArn !== undefined && output.RoleArn !== null ? output.RoleArn : undefined,
        Settings: output.Settings !== undefined && output.Settings !== null
            ? deserializeAws_json1_1StreamProcessorSettings(output.Settings, context)
            : undefined,
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
        StatusMessage: output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
        StreamProcessorArn: output.StreamProcessorArn !== undefined && output.StreamProcessorArn !== null
            ? output.StreamProcessorArn
            : undefined,
    };
};
var deserializeAws_json1_1DetectCustomLabelsResponse = function (output, context) {
    return {
        CustomLabels: output.CustomLabels !== undefined && output.CustomLabels !== null
            ? deserializeAws_json1_1CustomLabels(output.CustomLabels, context)
            : undefined,
    };
};
var deserializeAws_json1_1DetectFacesResponse = function (output, context) {
    return {
        FaceDetails: output.FaceDetails !== undefined && output.FaceDetails !== null
            ? deserializeAws_json1_1FaceDetailList(output.FaceDetails, context)
            : undefined,
        OrientationCorrection: output.OrientationCorrection !== undefined && output.OrientationCorrection !== null
            ? output.OrientationCorrection
            : undefined,
    };
};
var deserializeAws_json1_1DetectLabelsResponse = function (output, context) {
    return {
        LabelModelVersion: output.LabelModelVersion !== undefined && output.LabelModelVersion !== null
            ? output.LabelModelVersion
            : undefined,
        Labels: output.Labels !== undefined && output.Labels !== null
            ? deserializeAws_json1_1Labels(output.Labels, context)
            : undefined,
        OrientationCorrection: output.OrientationCorrection !== undefined && output.OrientationCorrection !== null
            ? output.OrientationCorrection
            : undefined,
    };
};
var deserializeAws_json1_1DetectModerationLabelsResponse = function (output, context) {
    return {
        HumanLoopActivationOutput: output.HumanLoopActivationOutput !== undefined && output.HumanLoopActivationOutput !== null
            ? deserializeAws_json1_1HumanLoopActivationOutput(output.HumanLoopActivationOutput, context)
            : undefined,
        ModerationLabels: output.ModerationLabels !== undefined && output.ModerationLabels !== null
            ? deserializeAws_json1_1ModerationLabels(output.ModerationLabels, context)
            : undefined,
        ModerationModelVersion: output.ModerationModelVersion !== undefined && output.ModerationModelVersion !== null
            ? output.ModerationModelVersion
            : undefined,
    };
};
var deserializeAws_json1_1DetectProtectiveEquipmentResponse = function (output, context) {
    return {
        Persons: output.Persons !== undefined && output.Persons !== null
            ? deserializeAws_json1_1ProtectiveEquipmentPersons(output.Persons, context)
            : undefined,
        ProtectiveEquipmentModelVersion: output.ProtectiveEquipmentModelVersion !== undefined && output.ProtectiveEquipmentModelVersion !== null
            ? output.ProtectiveEquipmentModelVersion
            : undefined,
        Summary: output.Summary !== undefined && output.Summary !== null
            ? deserializeAws_json1_1ProtectiveEquipmentSummary(output.Summary, context)
            : undefined,
    };
};
var deserializeAws_json1_1DetectTextResponse = function (output, context) {
    return {
        TextDetections: output.TextDetections !== undefined && output.TextDetections !== null
            ? deserializeAws_json1_1TextDetectionList(output.TextDetections, context)
            : undefined,
        TextModelVersion: output.TextModelVersion !== undefined && output.TextModelVersion !== null ? output.TextModelVersion : undefined,
    };
};
var deserializeAws_json1_1Emotion = function (output, context) {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
var deserializeAws_json1_1Emotions = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Emotion(entry, context);
    });
};
var deserializeAws_json1_1EquipmentDetection = function (output, context) {
    return {
        BoundingBox: output.BoundingBox !== undefined && output.BoundingBox !== null
            ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
            : undefined,
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        CoversBodyPart: output.CoversBodyPart !== undefined && output.CoversBodyPart !== null
            ? deserializeAws_json1_1CoversBodyPart(output.CoversBodyPart, context)
            : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
var deserializeAws_json1_1EquipmentDetections = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1EquipmentDetection(entry, context);
    });
};
var deserializeAws_json1_1EvaluationResult = function (output, context) {
    return {
        F1Score: output.F1Score !== undefined && output.F1Score !== null ? output.F1Score : undefined,
        Summary: output.Summary !== undefined && output.Summary !== null
            ? deserializeAws_json1_1Summary(output.Summary, context)
            : undefined,
    };
};
var deserializeAws_json1_1Eyeglasses = function (output, context) {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
var deserializeAws_json1_1EyeOpen = function (output, context) {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
var deserializeAws_json1_1Face = function (output, context) {
    return {
        BoundingBox: output.BoundingBox !== undefined && output.BoundingBox !== null
            ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
            : undefined,
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        ExternalImageId: output.ExternalImageId !== undefined && output.ExternalImageId !== null ? output.ExternalImageId : undefined,
        FaceId: output.FaceId !== undefined && output.FaceId !== null ? output.FaceId : undefined,
        ImageId: output.ImageId !== undefined && output.ImageId !== null ? output.ImageId : undefined,
    };
};
var deserializeAws_json1_1FaceDetail = function (output, context) {
    return {
        AgeRange: output.AgeRange !== undefined && output.AgeRange !== null
            ? deserializeAws_json1_1AgeRange(output.AgeRange, context)
            : undefined,
        Beard: output.Beard !== undefined && output.Beard !== null
            ? deserializeAws_json1_1Beard(output.Beard, context)
            : undefined,
        BoundingBox: output.BoundingBox !== undefined && output.BoundingBox !== null
            ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
            : undefined,
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Emotions: output.Emotions !== undefined && output.Emotions !== null
            ? deserializeAws_json1_1Emotions(output.Emotions, context)
            : undefined,
        Eyeglasses: output.Eyeglasses !== undefined && output.Eyeglasses !== null
            ? deserializeAws_json1_1Eyeglasses(output.Eyeglasses, context)
            : undefined,
        EyesOpen: output.EyesOpen !== undefined && output.EyesOpen !== null
            ? deserializeAws_json1_1EyeOpen(output.EyesOpen, context)
            : undefined,
        Gender: output.Gender !== undefined && output.Gender !== null
            ? deserializeAws_json1_1Gender(output.Gender, context)
            : undefined,
        Landmarks: output.Landmarks !== undefined && output.Landmarks !== null
            ? deserializeAws_json1_1Landmarks(output.Landmarks, context)
            : undefined,
        MouthOpen: output.MouthOpen !== undefined && output.MouthOpen !== null
            ? deserializeAws_json1_1MouthOpen(output.MouthOpen, context)
            : undefined,
        Mustache: output.Mustache !== undefined && output.Mustache !== null
            ? deserializeAws_json1_1Mustache(output.Mustache, context)
            : undefined,
        Pose: output.Pose !== undefined && output.Pose !== null ? deserializeAws_json1_1Pose(output.Pose, context) : undefined,
        Quality: output.Quality !== undefined && output.Quality !== null
            ? deserializeAws_json1_1ImageQuality(output.Quality, context)
            : undefined,
        Smile: output.Smile !== undefined && output.Smile !== null
            ? deserializeAws_json1_1Smile(output.Smile, context)
            : undefined,
        Sunglasses: output.Sunglasses !== undefined && output.Sunglasses !== null
            ? deserializeAws_json1_1Sunglasses(output.Sunglasses, context)
            : undefined,
    };
};
var deserializeAws_json1_1FaceDetailList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1FaceDetail(entry, context);
    });
};
var deserializeAws_json1_1FaceDetection = function (output, context) {
    return {
        Face: output.Face !== undefined && output.Face !== null
            ? deserializeAws_json1_1FaceDetail(output.Face, context)
            : undefined,
        Timestamp: output.Timestamp !== undefined && output.Timestamp !== null ? output.Timestamp : undefined,
    };
};
var deserializeAws_json1_1FaceDetections = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1FaceDetection(entry, context);
    });
};
var deserializeAws_json1_1FaceIdList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var deserializeAws_json1_1FaceList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Face(entry, context);
    });
};
var deserializeAws_json1_1FaceMatch = function (output, context) {
    return {
        Face: output.Face !== undefined && output.Face !== null ? deserializeAws_json1_1Face(output.Face, context) : undefined,
        Similarity: output.Similarity !== undefined && output.Similarity !== null ? output.Similarity : undefined,
    };
};
var deserializeAws_json1_1FaceMatchList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1FaceMatch(entry, context);
    });
};
var deserializeAws_json1_1FaceModelVersionList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var deserializeAws_json1_1FaceRecord = function (output, context) {
    return {
        Face: output.Face !== undefined && output.Face !== null ? deserializeAws_json1_1Face(output.Face, context) : undefined,
        FaceDetail: output.FaceDetail !== undefined && output.FaceDetail !== null
            ? deserializeAws_json1_1FaceDetail(output.FaceDetail, context)
            : undefined,
    };
};
var deserializeAws_json1_1FaceRecordList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1FaceRecord(entry, context);
    });
};
var deserializeAws_json1_1FaceSearchSettings = function (output, context) {
    return {
        CollectionId: output.CollectionId !== undefined && output.CollectionId !== null ? output.CollectionId : undefined,
        FaceMatchThreshold: output.FaceMatchThreshold !== undefined && output.FaceMatchThreshold !== null
            ? output.FaceMatchThreshold
            : undefined,
    };
};
var deserializeAws_json1_1Gender = function (output, context) {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
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
var deserializeAws_json1_1GetCelebrityInfoResponse = function (output, context) {
    return {
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        Urls: output.Urls !== undefined && output.Urls !== null ? deserializeAws_json1_1Urls(output.Urls, context) : undefined,
    };
};
var deserializeAws_json1_1GetCelebrityRecognitionResponse = function (output, context) {
    return {
        Celebrities: output.Celebrities !== undefined && output.Celebrities !== null
            ? deserializeAws_json1_1CelebrityRecognitions(output.Celebrities, context)
            : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        StatusMessage: output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
        VideoMetadata: output.VideoMetadata !== undefined && output.VideoMetadata !== null
            ? deserializeAws_json1_1VideoMetadata(output.VideoMetadata, context)
            : undefined,
    };
};
var deserializeAws_json1_1GetContentModerationResponse = function (output, context) {
    return {
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
        ModerationLabels: output.ModerationLabels !== undefined && output.ModerationLabels !== null
            ? deserializeAws_json1_1ContentModerationDetections(output.ModerationLabels, context)
            : undefined,
        ModerationModelVersion: output.ModerationModelVersion !== undefined && output.ModerationModelVersion !== null
            ? output.ModerationModelVersion
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        StatusMessage: output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
        VideoMetadata: output.VideoMetadata !== undefined && output.VideoMetadata !== null
            ? deserializeAws_json1_1VideoMetadata(output.VideoMetadata, context)
            : undefined,
    };
};
var deserializeAws_json1_1GetFaceDetectionResponse = function (output, context) {
    return {
        Faces: output.Faces !== undefined && output.Faces !== null
            ? deserializeAws_json1_1FaceDetections(output.Faces, context)
            : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        StatusMessage: output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
        VideoMetadata: output.VideoMetadata !== undefined && output.VideoMetadata !== null
            ? deserializeAws_json1_1VideoMetadata(output.VideoMetadata, context)
            : undefined,
    };
};
var deserializeAws_json1_1GetFaceSearchResponse = function (output, context) {
    return {
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        Persons: output.Persons !== undefined && output.Persons !== null
            ? deserializeAws_json1_1PersonMatches(output.Persons, context)
            : undefined,
        StatusMessage: output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
        VideoMetadata: output.VideoMetadata !== undefined && output.VideoMetadata !== null
            ? deserializeAws_json1_1VideoMetadata(output.VideoMetadata, context)
            : undefined,
    };
};
var deserializeAws_json1_1GetLabelDetectionResponse = function (output, context) {
    return {
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
        LabelModelVersion: output.LabelModelVersion !== undefined && output.LabelModelVersion !== null
            ? output.LabelModelVersion
            : undefined,
        Labels: output.Labels !== undefined && output.Labels !== null
            ? deserializeAws_json1_1LabelDetections(output.Labels, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        StatusMessage: output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
        VideoMetadata: output.VideoMetadata !== undefined && output.VideoMetadata !== null
            ? deserializeAws_json1_1VideoMetadata(output.VideoMetadata, context)
            : undefined,
    };
};
var deserializeAws_json1_1GetPersonTrackingResponse = function (output, context) {
    return {
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        Persons: output.Persons !== undefined && output.Persons !== null
            ? deserializeAws_json1_1PersonDetections(output.Persons, context)
            : undefined,
        StatusMessage: output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
        VideoMetadata: output.VideoMetadata !== undefined && output.VideoMetadata !== null
            ? deserializeAws_json1_1VideoMetadata(output.VideoMetadata, context)
            : undefined,
    };
};
var deserializeAws_json1_1GetSegmentDetectionResponse = function (output, context) {
    return {
        AudioMetadata: output.AudioMetadata !== undefined && output.AudioMetadata !== null
            ? deserializeAws_json1_1AudioMetadataList(output.AudioMetadata, context)
            : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        Segments: output.Segments !== undefined && output.Segments !== null
            ? deserializeAws_json1_1SegmentDetections(output.Segments, context)
            : undefined,
        SelectedSegmentTypes: output.SelectedSegmentTypes !== undefined && output.SelectedSegmentTypes !== null
            ? deserializeAws_json1_1SegmentTypesInfo(output.SelectedSegmentTypes, context)
            : undefined,
        StatusMessage: output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
        VideoMetadata: output.VideoMetadata !== undefined && output.VideoMetadata !== null
            ? deserializeAws_json1_1VideoMetadataList(output.VideoMetadata, context)
            : undefined,
    };
};
var deserializeAws_json1_1GetTextDetectionResponse = function (output, context) {
    return {
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        StatusMessage: output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
        TextDetections: output.TextDetections !== undefined && output.TextDetections !== null
            ? deserializeAws_json1_1TextDetectionResults(output.TextDetections, context)
            : undefined,
        TextModelVersion: output.TextModelVersion !== undefined && output.TextModelVersion !== null ? output.TextModelVersion : undefined,
        VideoMetadata: output.VideoMetadata !== undefined && output.VideoMetadata !== null
            ? deserializeAws_json1_1VideoMetadata(output.VideoMetadata, context)
            : undefined,
    };
};
var deserializeAws_json1_1GroundTruthManifest = function (output, context) {
    return {
        S3Object: output.S3Object !== undefined && output.S3Object !== null
            ? deserializeAws_json1_1S3Object(output.S3Object, context)
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
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
        QuotaCode: output.QuotaCode !== undefined && output.QuotaCode !== null ? output.QuotaCode : undefined,
        ResourceType: output.ResourceType !== undefined && output.ResourceType !== null ? output.ResourceType : undefined,
        ServiceCode: output.ServiceCode !== undefined && output.ServiceCode !== null ? output.ServiceCode : undefined,
    };
};
var deserializeAws_json1_1IdempotentParameterMismatchException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1ImageQuality = function (output, context) {
    return {
        Brightness: output.Brightness !== undefined && output.Brightness !== null ? output.Brightness : undefined,
        Sharpness: output.Sharpness !== undefined && output.Sharpness !== null ? output.Sharpness : undefined,
    };
};
var deserializeAws_json1_1ImageTooLargeException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1IndexFacesResponse = function (output, context) {
    return {
        FaceModelVersion: output.FaceModelVersion !== undefined && output.FaceModelVersion !== null ? output.FaceModelVersion : undefined,
        FaceRecords: output.FaceRecords !== undefined && output.FaceRecords !== null
            ? deserializeAws_json1_1FaceRecordList(output.FaceRecords, context)
            : undefined,
        OrientationCorrection: output.OrientationCorrection !== undefined && output.OrientationCorrection !== null
            ? output.OrientationCorrection
            : undefined,
        UnindexedFaces: output.UnindexedFaces !== undefined && output.UnindexedFaces !== null
            ? deserializeAws_json1_1UnindexedFaces(output.UnindexedFaces, context)
            : undefined,
    };
};
var deserializeAws_json1_1Instance = function (output, context) {
    return {
        BoundingBox: output.BoundingBox !== undefined && output.BoundingBox !== null
            ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
            : undefined,
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    };
};
var deserializeAws_json1_1Instances = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Instance(entry, context);
    });
};
var deserializeAws_json1_1InternalServerError = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1InvalidImageFormatException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1InvalidPaginationTokenException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1InvalidParameterException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1InvalidS3ObjectException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1KinesisDataStream = function (output, context) {
    return {
        Arn: output.Arn !== undefined && output.Arn !== null ? output.Arn : undefined,
    };
};
var deserializeAws_json1_1KinesisVideoStream = function (output, context) {
    return {
        Arn: output.Arn !== undefined && output.Arn !== null ? output.Arn : undefined,
    };
};
var deserializeAws_json1_1Label = function (output, context) {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Instances: output.Instances !== undefined && output.Instances !== null
            ? deserializeAws_json1_1Instances(output.Instances, context)
            : undefined,
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        Parents: output.Parents !== undefined && output.Parents !== null
            ? deserializeAws_json1_1Parents(output.Parents, context)
            : undefined,
    };
};
var deserializeAws_json1_1LabelDetection = function (output, context) {
    return {
        Label: output.Label !== undefined && output.Label !== null
            ? deserializeAws_json1_1Label(output.Label, context)
            : undefined,
        Timestamp: output.Timestamp !== undefined && output.Timestamp !== null ? output.Timestamp : undefined,
    };
};
var deserializeAws_json1_1LabelDetections = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1LabelDetection(entry, context);
    });
};
var deserializeAws_json1_1Labels = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Label(entry, context);
    });
};
var deserializeAws_json1_1Landmark = function (output, context) {
    return {
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
        X: output.X !== undefined && output.X !== null ? output.X : undefined,
        Y: output.Y !== undefined && output.Y !== null ? output.Y : undefined,
    };
};
var deserializeAws_json1_1Landmarks = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Landmark(entry, context);
    });
};
var deserializeAws_json1_1LimitExceededException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1ListCollectionsResponse = function (output, context) {
    return {
        CollectionIds: output.CollectionIds !== undefined && output.CollectionIds !== null
            ? deserializeAws_json1_1CollectionIdList(output.CollectionIds, context)
            : undefined,
        FaceModelVersions: output.FaceModelVersions !== undefined && output.FaceModelVersions !== null
            ? deserializeAws_json1_1FaceModelVersionList(output.FaceModelVersions, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    };
};
var deserializeAws_json1_1ListFacesResponse = function (output, context) {
    return {
        FaceModelVersion: output.FaceModelVersion !== undefined && output.FaceModelVersion !== null ? output.FaceModelVersion : undefined,
        Faces: output.Faces !== undefined && output.Faces !== null
            ? deserializeAws_json1_1FaceList(output.Faces, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    };
};
var deserializeAws_json1_1ListStreamProcessorsResponse = function (output, context) {
    return {
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        StreamProcessors: output.StreamProcessors !== undefined && output.StreamProcessors !== null
            ? deserializeAws_json1_1StreamProcessorList(output.StreamProcessors, context)
            : undefined,
    };
};
var deserializeAws_json1_1ModerationLabel = function (output, context) {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        ParentName: output.ParentName !== undefined && output.ParentName !== null ? output.ParentName : undefined,
    };
};
var deserializeAws_json1_1ModerationLabels = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ModerationLabel(entry, context);
    });
};
var deserializeAws_json1_1MouthOpen = function (output, context) {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
var deserializeAws_json1_1Mustache = function (output, context) {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
var deserializeAws_json1_1OutputConfig = function (output, context) {
    return {
        S3Bucket: output.S3Bucket !== undefined && output.S3Bucket !== null ? output.S3Bucket : undefined,
        S3KeyPrefix: output.S3KeyPrefix !== undefined && output.S3KeyPrefix !== null ? output.S3KeyPrefix : undefined,
    };
};
var deserializeAws_json1_1Parent = function (output, context) {
    return {
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
    };
};
var deserializeAws_json1_1Parents = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Parent(entry, context);
    });
};
var deserializeAws_json1_1PersonDetail = function (output, context) {
    return {
        BoundingBox: output.BoundingBox !== undefined && output.BoundingBox !== null
            ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
            : undefined,
        Face: output.Face !== undefined && output.Face !== null
            ? deserializeAws_json1_1FaceDetail(output.Face, context)
            : undefined,
        Index: output.Index !== undefined && output.Index !== null ? output.Index : undefined,
    };
};
var deserializeAws_json1_1PersonDetection = function (output, context) {
    return {
        Person: output.Person !== undefined && output.Person !== null
            ? deserializeAws_json1_1PersonDetail(output.Person, context)
            : undefined,
        Timestamp: output.Timestamp !== undefined && output.Timestamp !== null ? output.Timestamp : undefined,
    };
};
var deserializeAws_json1_1PersonDetections = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1PersonDetection(entry, context);
    });
};
var deserializeAws_json1_1PersonMatch = function (output, context) {
    return {
        FaceMatches: output.FaceMatches !== undefined && output.FaceMatches !== null
            ? deserializeAws_json1_1FaceMatchList(output.FaceMatches, context)
            : undefined,
        Person: output.Person !== undefined && output.Person !== null
            ? deserializeAws_json1_1PersonDetail(output.Person, context)
            : undefined,
        Timestamp: output.Timestamp !== undefined && output.Timestamp !== null ? output.Timestamp : undefined,
    };
};
var deserializeAws_json1_1PersonMatches = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1PersonMatch(entry, context);
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
var deserializeAws_json1_1Pose = function (output, context) {
    return {
        Pitch: output.Pitch !== undefined && output.Pitch !== null ? output.Pitch : undefined,
        Roll: output.Roll !== undefined && output.Roll !== null ? output.Roll : undefined,
        Yaw: output.Yaw !== undefined && output.Yaw !== null ? output.Yaw : undefined,
    };
};
var deserializeAws_json1_1ProjectDescription = function (output, context) {
    return {
        CreationTimestamp: output.CreationTimestamp !== undefined && output.CreationTimestamp !== null
            ? new Date(Math.round(output.CreationTimestamp * 1000))
            : undefined,
        ProjectArn: output.ProjectArn !== undefined && output.ProjectArn !== null ? output.ProjectArn : undefined,
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
    };
};
var deserializeAws_json1_1ProjectDescriptions = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ProjectDescription(entry, context);
    });
};
var deserializeAws_json1_1ProjectVersionDescription = function (output, context) {
    return {
        BillableTrainingTimeInSeconds: output.BillableTrainingTimeInSeconds !== undefined && output.BillableTrainingTimeInSeconds !== null
            ? output.BillableTrainingTimeInSeconds
            : undefined,
        CreationTimestamp: output.CreationTimestamp !== undefined && output.CreationTimestamp !== null
            ? new Date(Math.round(output.CreationTimestamp * 1000))
            : undefined,
        EvaluationResult: output.EvaluationResult !== undefined && output.EvaluationResult !== null
            ? deserializeAws_json1_1EvaluationResult(output.EvaluationResult, context)
            : undefined,
        ManifestSummary: output.ManifestSummary !== undefined && output.ManifestSummary !== null
            ? deserializeAws_json1_1GroundTruthManifest(output.ManifestSummary, context)
            : undefined,
        MinInferenceUnits: output.MinInferenceUnits !== undefined && output.MinInferenceUnits !== null
            ? output.MinInferenceUnits
            : undefined,
        OutputConfig: output.OutputConfig !== undefined && output.OutputConfig !== null
            ? deserializeAws_json1_1OutputConfig(output.OutputConfig, context)
            : undefined,
        ProjectVersionArn: output.ProjectVersionArn !== undefined && output.ProjectVersionArn !== null
            ? output.ProjectVersionArn
            : undefined,
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
        StatusMessage: output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
        TestingDataResult: output.TestingDataResult !== undefined && output.TestingDataResult !== null
            ? deserializeAws_json1_1TestingDataResult(output.TestingDataResult, context)
            : undefined,
        TrainingDataResult: output.TrainingDataResult !== undefined && output.TrainingDataResult !== null
            ? deserializeAws_json1_1TrainingDataResult(output.TrainingDataResult, context)
            : undefined,
        TrainingEndTimestamp: output.TrainingEndTimestamp !== undefined && output.TrainingEndTimestamp !== null
            ? new Date(Math.round(output.TrainingEndTimestamp * 1000))
            : undefined,
    };
};
var deserializeAws_json1_1ProjectVersionDescriptions = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ProjectVersionDescription(entry, context);
    });
};
var deserializeAws_json1_1ProtectiveEquipmentBodyPart = function (output, context) {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        EquipmentDetections: output.EquipmentDetections !== undefined && output.EquipmentDetections !== null
            ? deserializeAws_json1_1EquipmentDetections(output.EquipmentDetections, context)
            : undefined,
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
    };
};
var deserializeAws_json1_1ProtectiveEquipmentPerson = function (output, context) {
    return {
        BodyParts: output.BodyParts !== undefined && output.BodyParts !== null
            ? deserializeAws_json1_1BodyParts(output.BodyParts, context)
            : undefined,
        BoundingBox: output.BoundingBox !== undefined && output.BoundingBox !== null
            ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
            : undefined,
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Id: output.Id !== undefined && output.Id !== null ? output.Id : undefined,
    };
};
var deserializeAws_json1_1ProtectiveEquipmentPersonIds = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var deserializeAws_json1_1ProtectiveEquipmentPersons = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ProtectiveEquipmentPerson(entry, context);
    });
};
var deserializeAws_json1_1ProtectiveEquipmentSummary = function (output, context) {
    return {
        PersonsIndeterminate: output.PersonsIndeterminate !== undefined && output.PersonsIndeterminate !== null
            ? deserializeAws_json1_1ProtectiveEquipmentPersonIds(output.PersonsIndeterminate, context)
            : undefined,
        PersonsWithRequiredEquipment: output.PersonsWithRequiredEquipment !== undefined && output.PersonsWithRequiredEquipment !== null
            ? deserializeAws_json1_1ProtectiveEquipmentPersonIds(output.PersonsWithRequiredEquipment, context)
            : undefined,
        PersonsWithoutRequiredEquipment: output.PersonsWithoutRequiredEquipment !== undefined && output.PersonsWithoutRequiredEquipment !== null
            ? deserializeAws_json1_1ProtectiveEquipmentPersonIds(output.PersonsWithoutRequiredEquipment, context)
            : undefined,
    };
};
var deserializeAws_json1_1ProvisionedThroughputExceededException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1Reasons = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var deserializeAws_json1_1RecognizeCelebritiesResponse = function (output, context) {
    return {
        CelebrityFaces: output.CelebrityFaces !== undefined && output.CelebrityFaces !== null
            ? deserializeAws_json1_1CelebrityList(output.CelebrityFaces, context)
            : undefined,
        OrientationCorrection: output.OrientationCorrection !== undefined && output.OrientationCorrection !== null
            ? output.OrientationCorrection
            : undefined,
        UnrecognizedFaces: output.UnrecognizedFaces !== undefined && output.UnrecognizedFaces !== null
            ? deserializeAws_json1_1ComparedFaceList(output.UnrecognizedFaces, context)
            : undefined,
    };
};
var deserializeAws_json1_1ResourceAlreadyExistsException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1ResourceInUseException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1ResourceNotFoundException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1ResourceNotReadyException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1S3Object = function (output, context) {
    return {
        Bucket: output.Bucket !== undefined && output.Bucket !== null ? output.Bucket : undefined,
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        Version: output.Version !== undefined && output.Version !== null ? output.Version : undefined,
    };
};
var deserializeAws_json1_1SearchFacesByImageResponse = function (output, context) {
    return {
        FaceMatches: output.FaceMatches !== undefined && output.FaceMatches !== null
            ? deserializeAws_json1_1FaceMatchList(output.FaceMatches, context)
            : undefined,
        FaceModelVersion: output.FaceModelVersion !== undefined && output.FaceModelVersion !== null ? output.FaceModelVersion : undefined,
        SearchedFaceBoundingBox: output.SearchedFaceBoundingBox !== undefined && output.SearchedFaceBoundingBox !== null
            ? deserializeAws_json1_1BoundingBox(output.SearchedFaceBoundingBox, context)
            : undefined,
        SearchedFaceConfidence: output.SearchedFaceConfidence !== undefined && output.SearchedFaceConfidence !== null
            ? output.SearchedFaceConfidence
            : undefined,
    };
};
var deserializeAws_json1_1SearchFacesResponse = function (output, context) {
    return {
        FaceMatches: output.FaceMatches !== undefined && output.FaceMatches !== null
            ? deserializeAws_json1_1FaceMatchList(output.FaceMatches, context)
            : undefined,
        FaceModelVersion: output.FaceModelVersion !== undefined && output.FaceModelVersion !== null ? output.FaceModelVersion : undefined,
        SearchedFaceId: output.SearchedFaceId !== undefined && output.SearchedFaceId !== null ? output.SearchedFaceId : undefined,
    };
};
var deserializeAws_json1_1SegmentDetection = function (output, context) {
    return {
        DurationMillis: output.DurationMillis !== undefined && output.DurationMillis !== null ? output.DurationMillis : undefined,
        DurationSMPTE: output.DurationSMPTE !== undefined && output.DurationSMPTE !== null ? output.DurationSMPTE : undefined,
        EndTimecodeSMPTE: output.EndTimecodeSMPTE !== undefined && output.EndTimecodeSMPTE !== null ? output.EndTimecodeSMPTE : undefined,
        EndTimestampMillis: output.EndTimestampMillis !== undefined && output.EndTimestampMillis !== null
            ? output.EndTimestampMillis
            : undefined,
        ShotSegment: output.ShotSegment !== undefined && output.ShotSegment !== null
            ? deserializeAws_json1_1ShotSegment(output.ShotSegment, context)
            : undefined,
        StartTimecodeSMPTE: output.StartTimecodeSMPTE !== undefined && output.StartTimecodeSMPTE !== null
            ? output.StartTimecodeSMPTE
            : undefined,
        StartTimestampMillis: output.StartTimestampMillis !== undefined && output.StartTimestampMillis !== null
            ? output.StartTimestampMillis
            : undefined,
        TechnicalCueSegment: output.TechnicalCueSegment !== undefined && output.TechnicalCueSegment !== null
            ? deserializeAws_json1_1TechnicalCueSegment(output.TechnicalCueSegment, context)
            : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
var deserializeAws_json1_1SegmentDetections = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1SegmentDetection(entry, context);
    });
};
var deserializeAws_json1_1SegmentTypeInfo = function (output, context) {
    return {
        ModelVersion: output.ModelVersion !== undefined && output.ModelVersion !== null ? output.ModelVersion : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
var deserializeAws_json1_1SegmentTypesInfo = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1SegmentTypeInfo(entry, context);
    });
};
var deserializeAws_json1_1ServiceQuotaExceededException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1ShotSegment = function (output, context) {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Index: output.Index !== undefined && output.Index !== null ? output.Index : undefined,
    };
};
var deserializeAws_json1_1Smile = function (output, context) {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
var deserializeAws_json1_1StartCelebrityRecognitionResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
    };
};
var deserializeAws_json1_1StartContentModerationResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
    };
};
var deserializeAws_json1_1StartFaceDetectionResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
    };
};
var deserializeAws_json1_1StartFaceSearchResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
    };
};
var deserializeAws_json1_1StartLabelDetectionResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
    };
};
var deserializeAws_json1_1StartPersonTrackingResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
    };
};
var deserializeAws_json1_1StartProjectVersionResponse = function (output, context) {
    return {
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
    };
};
var deserializeAws_json1_1StartSegmentDetectionResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
    };
};
var deserializeAws_json1_1StartStreamProcessorResponse = function (output, context) {
    return {};
};
var deserializeAws_json1_1StartTextDetectionResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
    };
};
var deserializeAws_json1_1StopProjectVersionResponse = function (output, context) {
    return {
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
    };
};
var deserializeAws_json1_1StopStreamProcessorResponse = function (output, context) {
    return {};
};
var deserializeAws_json1_1StreamProcessor = function (output, context) {
    return {
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
    };
};
var deserializeAws_json1_1StreamProcessorInput = function (output, context) {
    return {
        KinesisVideoStream: output.KinesisVideoStream !== undefined && output.KinesisVideoStream !== null
            ? deserializeAws_json1_1KinesisVideoStream(output.KinesisVideoStream, context)
            : undefined,
    };
};
var deserializeAws_json1_1StreamProcessorList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1StreamProcessor(entry, context);
    });
};
var deserializeAws_json1_1StreamProcessorOutput = function (output, context) {
    return {
        KinesisDataStream: output.KinesisDataStream !== undefined && output.KinesisDataStream !== null
            ? deserializeAws_json1_1KinesisDataStream(output.KinesisDataStream, context)
            : undefined,
    };
};
var deserializeAws_json1_1StreamProcessorSettings = function (output, context) {
    return {
        FaceSearch: output.FaceSearch !== undefined && output.FaceSearch !== null
            ? deserializeAws_json1_1FaceSearchSettings(output.FaceSearch, context)
            : undefined,
    };
};
var deserializeAws_json1_1Summary = function (output, context) {
    return {
        S3Object: output.S3Object !== undefined && output.S3Object !== null
            ? deserializeAws_json1_1S3Object(output.S3Object, context)
            : undefined,
    };
};
var deserializeAws_json1_1Sunglasses = function (output, context) {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
var deserializeAws_json1_1TechnicalCueSegment = function (output, context) {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
var deserializeAws_json1_1TestingData = function (output, context) {
    return {
        Assets: output.Assets !== undefined && output.Assets !== null
            ? deserializeAws_json1_1Assets(output.Assets, context)
            : undefined,
        AutoCreate: output.AutoCreate !== undefined && output.AutoCreate !== null ? output.AutoCreate : undefined,
    };
};
var deserializeAws_json1_1TestingDataResult = function (output, context) {
    return {
        Input: output.Input !== undefined && output.Input !== null
            ? deserializeAws_json1_1TestingData(output.Input, context)
            : undefined,
        Output: output.Output !== undefined && output.Output !== null
            ? deserializeAws_json1_1TestingData(output.Output, context)
            : undefined,
        Validation: output.Validation !== undefined && output.Validation !== null
            ? deserializeAws_json1_1ValidationData(output.Validation, context)
            : undefined,
    };
};
var deserializeAws_json1_1TextDetection = function (output, context) {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        DetectedText: output.DetectedText !== undefined && output.DetectedText !== null ? output.DetectedText : undefined,
        Geometry: output.Geometry !== undefined && output.Geometry !== null
            ? deserializeAws_json1_1Geometry(output.Geometry, context)
            : undefined,
        Id: output.Id !== undefined && output.Id !== null ? output.Id : undefined,
        ParentId: output.ParentId !== undefined && output.ParentId !== null ? output.ParentId : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
var deserializeAws_json1_1TextDetectionList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1TextDetection(entry, context);
    });
};
var deserializeAws_json1_1TextDetectionResult = function (output, context) {
    return {
        TextDetection: output.TextDetection !== undefined && output.TextDetection !== null
            ? deserializeAws_json1_1TextDetection(output.TextDetection, context)
            : undefined,
        Timestamp: output.Timestamp !== undefined && output.Timestamp !== null ? output.Timestamp : undefined,
    };
};
var deserializeAws_json1_1TextDetectionResults = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1TextDetectionResult(entry, context);
    });
};
var deserializeAws_json1_1ThrottlingException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1TrainingData = function (output, context) {
    return {
        Assets: output.Assets !== undefined && output.Assets !== null
            ? deserializeAws_json1_1Assets(output.Assets, context)
            : undefined,
    };
};
var deserializeAws_json1_1TrainingDataResult = function (output, context) {
    return {
        Input: output.Input !== undefined && output.Input !== null
            ? deserializeAws_json1_1TrainingData(output.Input, context)
            : undefined,
        Output: output.Output !== undefined && output.Output !== null
            ? deserializeAws_json1_1TrainingData(output.Output, context)
            : undefined,
        Validation: output.Validation !== undefined && output.Validation !== null
            ? deserializeAws_json1_1ValidationData(output.Validation, context)
            : undefined,
    };
};
var deserializeAws_json1_1UnindexedFace = function (output, context) {
    return {
        FaceDetail: output.FaceDetail !== undefined && output.FaceDetail !== null
            ? deserializeAws_json1_1FaceDetail(output.FaceDetail, context)
            : undefined,
        Reasons: output.Reasons !== undefined && output.Reasons !== null
            ? deserializeAws_json1_1Reasons(output.Reasons, context)
            : undefined,
    };
};
var deserializeAws_json1_1UnindexedFaces = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1UnindexedFace(entry, context);
    });
};
var deserializeAws_json1_1Urls = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var deserializeAws_json1_1ValidationData = function (output, context) {
    return {
        Assets: output.Assets !== undefined && output.Assets !== null
            ? deserializeAws_json1_1Assets(output.Assets, context)
            : undefined,
    };
};
var deserializeAws_json1_1VideoMetadata = function (output, context) {
    return {
        Codec: output.Codec !== undefined && output.Codec !== null ? output.Codec : undefined,
        DurationMillis: output.DurationMillis !== undefined && output.DurationMillis !== null ? output.DurationMillis : undefined,
        Format: output.Format !== undefined && output.Format !== null ? output.Format : undefined,
        FrameHeight: output.FrameHeight !== undefined && output.FrameHeight !== null ? output.FrameHeight : undefined,
        FrameRate: output.FrameRate !== undefined && output.FrameRate !== null ? output.FrameRate : undefined,
        FrameWidth: output.FrameWidth !== undefined && output.FrameWidth !== null ? output.FrameWidth : undefined,
    };
};
var deserializeAws_json1_1VideoMetadataList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1VideoMetadata(entry, context);
    });
};
var deserializeAws_json1_1VideoTooLargeException = function (output, context) {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
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
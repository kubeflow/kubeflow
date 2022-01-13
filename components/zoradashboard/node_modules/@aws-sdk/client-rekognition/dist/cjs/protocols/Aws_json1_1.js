"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeAws_json1_1CreateCollectionCommand = exports.deserializeAws_json1_1CompareFacesCommand = exports.serializeAws_json1_1StopStreamProcessorCommand = exports.serializeAws_json1_1StopProjectVersionCommand = exports.serializeAws_json1_1StartTextDetectionCommand = exports.serializeAws_json1_1StartStreamProcessorCommand = exports.serializeAws_json1_1StartSegmentDetectionCommand = exports.serializeAws_json1_1StartProjectVersionCommand = exports.serializeAws_json1_1StartPersonTrackingCommand = exports.serializeAws_json1_1StartLabelDetectionCommand = exports.serializeAws_json1_1StartFaceSearchCommand = exports.serializeAws_json1_1StartFaceDetectionCommand = exports.serializeAws_json1_1StartContentModerationCommand = exports.serializeAws_json1_1StartCelebrityRecognitionCommand = exports.serializeAws_json1_1SearchFacesByImageCommand = exports.serializeAws_json1_1SearchFacesCommand = exports.serializeAws_json1_1RecognizeCelebritiesCommand = exports.serializeAws_json1_1ListStreamProcessorsCommand = exports.serializeAws_json1_1ListFacesCommand = exports.serializeAws_json1_1ListCollectionsCommand = exports.serializeAws_json1_1IndexFacesCommand = exports.serializeAws_json1_1GetTextDetectionCommand = exports.serializeAws_json1_1GetSegmentDetectionCommand = exports.serializeAws_json1_1GetPersonTrackingCommand = exports.serializeAws_json1_1GetLabelDetectionCommand = exports.serializeAws_json1_1GetFaceSearchCommand = exports.serializeAws_json1_1GetFaceDetectionCommand = exports.serializeAws_json1_1GetContentModerationCommand = exports.serializeAws_json1_1GetCelebrityRecognitionCommand = exports.serializeAws_json1_1GetCelebrityInfoCommand = exports.serializeAws_json1_1DetectTextCommand = exports.serializeAws_json1_1DetectProtectiveEquipmentCommand = exports.serializeAws_json1_1DetectModerationLabelsCommand = exports.serializeAws_json1_1DetectLabelsCommand = exports.serializeAws_json1_1DetectFacesCommand = exports.serializeAws_json1_1DetectCustomLabelsCommand = exports.serializeAws_json1_1DescribeStreamProcessorCommand = exports.serializeAws_json1_1DescribeProjectVersionsCommand = exports.serializeAws_json1_1DescribeProjectsCommand = exports.serializeAws_json1_1DescribeCollectionCommand = exports.serializeAws_json1_1DeleteStreamProcessorCommand = exports.serializeAws_json1_1DeleteProjectVersionCommand = exports.serializeAws_json1_1DeleteProjectCommand = exports.serializeAws_json1_1DeleteFacesCommand = exports.serializeAws_json1_1DeleteCollectionCommand = exports.serializeAws_json1_1CreateStreamProcessorCommand = exports.serializeAws_json1_1CreateProjectVersionCommand = exports.serializeAws_json1_1CreateProjectCommand = exports.serializeAws_json1_1CreateCollectionCommand = exports.serializeAws_json1_1CompareFacesCommand = void 0;
exports.deserializeAws_json1_1StopStreamProcessorCommand = exports.deserializeAws_json1_1StopProjectVersionCommand = exports.deserializeAws_json1_1StartTextDetectionCommand = exports.deserializeAws_json1_1StartStreamProcessorCommand = exports.deserializeAws_json1_1StartSegmentDetectionCommand = exports.deserializeAws_json1_1StartProjectVersionCommand = exports.deserializeAws_json1_1StartPersonTrackingCommand = exports.deserializeAws_json1_1StartLabelDetectionCommand = exports.deserializeAws_json1_1StartFaceSearchCommand = exports.deserializeAws_json1_1StartFaceDetectionCommand = exports.deserializeAws_json1_1StartContentModerationCommand = exports.deserializeAws_json1_1StartCelebrityRecognitionCommand = exports.deserializeAws_json1_1SearchFacesByImageCommand = exports.deserializeAws_json1_1SearchFacesCommand = exports.deserializeAws_json1_1RecognizeCelebritiesCommand = exports.deserializeAws_json1_1ListStreamProcessorsCommand = exports.deserializeAws_json1_1ListFacesCommand = exports.deserializeAws_json1_1ListCollectionsCommand = exports.deserializeAws_json1_1IndexFacesCommand = exports.deserializeAws_json1_1GetTextDetectionCommand = exports.deserializeAws_json1_1GetSegmentDetectionCommand = exports.deserializeAws_json1_1GetPersonTrackingCommand = exports.deserializeAws_json1_1GetLabelDetectionCommand = exports.deserializeAws_json1_1GetFaceSearchCommand = exports.deserializeAws_json1_1GetFaceDetectionCommand = exports.deserializeAws_json1_1GetContentModerationCommand = exports.deserializeAws_json1_1GetCelebrityRecognitionCommand = exports.deserializeAws_json1_1GetCelebrityInfoCommand = exports.deserializeAws_json1_1DetectTextCommand = exports.deserializeAws_json1_1DetectProtectiveEquipmentCommand = exports.deserializeAws_json1_1DetectModerationLabelsCommand = exports.deserializeAws_json1_1DetectLabelsCommand = exports.deserializeAws_json1_1DetectFacesCommand = exports.deserializeAws_json1_1DetectCustomLabelsCommand = exports.deserializeAws_json1_1DescribeStreamProcessorCommand = exports.deserializeAws_json1_1DescribeProjectVersionsCommand = exports.deserializeAws_json1_1DescribeProjectsCommand = exports.deserializeAws_json1_1DescribeCollectionCommand = exports.deserializeAws_json1_1DeleteStreamProcessorCommand = exports.deserializeAws_json1_1DeleteProjectVersionCommand = exports.deserializeAws_json1_1DeleteProjectCommand = exports.deserializeAws_json1_1DeleteFacesCommand = exports.deserializeAws_json1_1DeleteCollectionCommand = exports.deserializeAws_json1_1CreateStreamProcessorCommand = exports.deserializeAws_json1_1CreateProjectVersionCommand = exports.deserializeAws_json1_1CreateProjectCommand = void 0;
const protocol_http_1 = require("@aws-sdk/protocol-http");
const smithy_client_1 = require("@aws-sdk/smithy-client");
const serializeAws_json1_1CompareFacesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.CompareFaces",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1CompareFacesRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1CompareFacesCommand = serializeAws_json1_1CompareFacesCommand;
const serializeAws_json1_1CreateCollectionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.CreateCollection",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1CreateCollectionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1CreateCollectionCommand = serializeAws_json1_1CreateCollectionCommand;
const serializeAws_json1_1CreateProjectCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.CreateProject",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1CreateProjectRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1CreateProjectCommand = serializeAws_json1_1CreateProjectCommand;
const serializeAws_json1_1CreateProjectVersionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.CreateProjectVersion",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1CreateProjectVersionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1CreateProjectVersionCommand = serializeAws_json1_1CreateProjectVersionCommand;
const serializeAws_json1_1CreateStreamProcessorCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.CreateStreamProcessor",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1CreateStreamProcessorRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1CreateStreamProcessorCommand = serializeAws_json1_1CreateStreamProcessorCommand;
const serializeAws_json1_1DeleteCollectionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.DeleteCollection",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteCollectionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteCollectionCommand = serializeAws_json1_1DeleteCollectionCommand;
const serializeAws_json1_1DeleteFacesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.DeleteFaces",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteFacesRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteFacesCommand = serializeAws_json1_1DeleteFacesCommand;
const serializeAws_json1_1DeleteProjectCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.DeleteProject",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteProjectRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteProjectCommand = serializeAws_json1_1DeleteProjectCommand;
const serializeAws_json1_1DeleteProjectVersionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.DeleteProjectVersion",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteProjectVersionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteProjectVersionCommand = serializeAws_json1_1DeleteProjectVersionCommand;
const serializeAws_json1_1DeleteStreamProcessorCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.DeleteStreamProcessor",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteStreamProcessorRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteStreamProcessorCommand = serializeAws_json1_1DeleteStreamProcessorCommand;
const serializeAws_json1_1DescribeCollectionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.DescribeCollection",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeCollectionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeCollectionCommand = serializeAws_json1_1DescribeCollectionCommand;
const serializeAws_json1_1DescribeProjectsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.DescribeProjects",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeProjectsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeProjectsCommand = serializeAws_json1_1DescribeProjectsCommand;
const serializeAws_json1_1DescribeProjectVersionsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.DescribeProjectVersions",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeProjectVersionsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeProjectVersionsCommand = serializeAws_json1_1DescribeProjectVersionsCommand;
const serializeAws_json1_1DescribeStreamProcessorCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.DescribeStreamProcessor",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeStreamProcessorRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeStreamProcessorCommand = serializeAws_json1_1DescribeStreamProcessorCommand;
const serializeAws_json1_1DetectCustomLabelsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.DetectCustomLabels",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DetectCustomLabelsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DetectCustomLabelsCommand = serializeAws_json1_1DetectCustomLabelsCommand;
const serializeAws_json1_1DetectFacesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.DetectFaces",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DetectFacesRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DetectFacesCommand = serializeAws_json1_1DetectFacesCommand;
const serializeAws_json1_1DetectLabelsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.DetectLabels",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DetectLabelsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DetectLabelsCommand = serializeAws_json1_1DetectLabelsCommand;
const serializeAws_json1_1DetectModerationLabelsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.DetectModerationLabels",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DetectModerationLabelsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DetectModerationLabelsCommand = serializeAws_json1_1DetectModerationLabelsCommand;
const serializeAws_json1_1DetectProtectiveEquipmentCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.DetectProtectiveEquipment",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DetectProtectiveEquipmentRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DetectProtectiveEquipmentCommand = serializeAws_json1_1DetectProtectiveEquipmentCommand;
const serializeAws_json1_1DetectTextCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.DetectText",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DetectTextRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DetectTextCommand = serializeAws_json1_1DetectTextCommand;
const serializeAws_json1_1GetCelebrityInfoCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.GetCelebrityInfo",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetCelebrityInfoRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetCelebrityInfoCommand = serializeAws_json1_1GetCelebrityInfoCommand;
const serializeAws_json1_1GetCelebrityRecognitionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.GetCelebrityRecognition",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetCelebrityRecognitionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetCelebrityRecognitionCommand = serializeAws_json1_1GetCelebrityRecognitionCommand;
const serializeAws_json1_1GetContentModerationCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.GetContentModeration",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetContentModerationRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetContentModerationCommand = serializeAws_json1_1GetContentModerationCommand;
const serializeAws_json1_1GetFaceDetectionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.GetFaceDetection",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetFaceDetectionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetFaceDetectionCommand = serializeAws_json1_1GetFaceDetectionCommand;
const serializeAws_json1_1GetFaceSearchCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.GetFaceSearch",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetFaceSearchRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetFaceSearchCommand = serializeAws_json1_1GetFaceSearchCommand;
const serializeAws_json1_1GetLabelDetectionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.GetLabelDetection",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetLabelDetectionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetLabelDetectionCommand = serializeAws_json1_1GetLabelDetectionCommand;
const serializeAws_json1_1GetPersonTrackingCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.GetPersonTracking",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetPersonTrackingRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetPersonTrackingCommand = serializeAws_json1_1GetPersonTrackingCommand;
const serializeAws_json1_1GetSegmentDetectionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.GetSegmentDetection",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetSegmentDetectionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetSegmentDetectionCommand = serializeAws_json1_1GetSegmentDetectionCommand;
const serializeAws_json1_1GetTextDetectionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.GetTextDetection",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1GetTextDetectionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1GetTextDetectionCommand = serializeAws_json1_1GetTextDetectionCommand;
const serializeAws_json1_1IndexFacesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.IndexFaces",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1IndexFacesRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1IndexFacesCommand = serializeAws_json1_1IndexFacesCommand;
const serializeAws_json1_1ListCollectionsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.ListCollections",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListCollectionsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListCollectionsCommand = serializeAws_json1_1ListCollectionsCommand;
const serializeAws_json1_1ListFacesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.ListFaces",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListFacesRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListFacesCommand = serializeAws_json1_1ListFacesCommand;
const serializeAws_json1_1ListStreamProcessorsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.ListStreamProcessors",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListStreamProcessorsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListStreamProcessorsCommand = serializeAws_json1_1ListStreamProcessorsCommand;
const serializeAws_json1_1RecognizeCelebritiesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.RecognizeCelebrities",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1RecognizeCelebritiesRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1RecognizeCelebritiesCommand = serializeAws_json1_1RecognizeCelebritiesCommand;
const serializeAws_json1_1SearchFacesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.SearchFaces",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1SearchFacesRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1SearchFacesCommand = serializeAws_json1_1SearchFacesCommand;
const serializeAws_json1_1SearchFacesByImageCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.SearchFacesByImage",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1SearchFacesByImageRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1SearchFacesByImageCommand = serializeAws_json1_1SearchFacesByImageCommand;
const serializeAws_json1_1StartCelebrityRecognitionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.StartCelebrityRecognition",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartCelebrityRecognitionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartCelebrityRecognitionCommand = serializeAws_json1_1StartCelebrityRecognitionCommand;
const serializeAws_json1_1StartContentModerationCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.StartContentModeration",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartContentModerationRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartContentModerationCommand = serializeAws_json1_1StartContentModerationCommand;
const serializeAws_json1_1StartFaceDetectionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.StartFaceDetection",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartFaceDetectionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartFaceDetectionCommand = serializeAws_json1_1StartFaceDetectionCommand;
const serializeAws_json1_1StartFaceSearchCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.StartFaceSearch",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartFaceSearchRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartFaceSearchCommand = serializeAws_json1_1StartFaceSearchCommand;
const serializeAws_json1_1StartLabelDetectionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.StartLabelDetection",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartLabelDetectionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartLabelDetectionCommand = serializeAws_json1_1StartLabelDetectionCommand;
const serializeAws_json1_1StartPersonTrackingCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.StartPersonTracking",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartPersonTrackingRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartPersonTrackingCommand = serializeAws_json1_1StartPersonTrackingCommand;
const serializeAws_json1_1StartProjectVersionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.StartProjectVersion",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartProjectVersionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartProjectVersionCommand = serializeAws_json1_1StartProjectVersionCommand;
const serializeAws_json1_1StartSegmentDetectionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.StartSegmentDetection",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartSegmentDetectionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartSegmentDetectionCommand = serializeAws_json1_1StartSegmentDetectionCommand;
const serializeAws_json1_1StartStreamProcessorCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.StartStreamProcessor",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartStreamProcessorRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartStreamProcessorCommand = serializeAws_json1_1StartStreamProcessorCommand;
const serializeAws_json1_1StartTextDetectionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.StartTextDetection",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartTextDetectionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartTextDetectionCommand = serializeAws_json1_1StartTextDetectionCommand;
const serializeAws_json1_1StopProjectVersionCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.StopProjectVersion",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StopProjectVersionRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StopProjectVersionCommand = serializeAws_json1_1StopProjectVersionCommand;
const serializeAws_json1_1StopStreamProcessorCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "RekognitionService.StopStreamProcessor",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StopStreamProcessorRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StopStreamProcessorCommand = serializeAws_json1_1StopStreamProcessorCommand;
const deserializeAws_json1_1CompareFacesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1CompareFacesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1CompareFacesResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1CompareFacesCommand = deserializeAws_json1_1CompareFacesCommand;
const deserializeAws_json1_1CompareFacesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ImageTooLargeException":
        case "com.amazonaws.rekognition#ImageTooLargeException":
            response = {
                ...(await deserializeAws_json1_1ImageTooLargeExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidImageFormatException":
        case "com.amazonaws.rekognition#InvalidImageFormatException":
            response = {
                ...(await deserializeAws_json1_1InvalidImageFormatExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.rekognition#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1CreateCollectionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1CreateCollectionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1CreateCollectionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1CreateCollectionCommand = deserializeAws_json1_1CreateCollectionCommand;
const deserializeAws_json1_1CreateCollectionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceAlreadyExistsException":
        case "com.amazonaws.rekognition#ResourceAlreadyExistsException":
            response = {
                ...(await deserializeAws_json1_1ResourceAlreadyExistsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1CreateProjectCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1CreateProjectCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1CreateProjectResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1CreateProjectCommand = deserializeAws_json1_1CreateProjectCommand;
const deserializeAws_json1_1CreateProjectCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.rekognition#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.rekognition#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1CreateProjectVersionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1CreateProjectVersionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1CreateProjectVersionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1CreateProjectVersionCommand = deserializeAws_json1_1CreateProjectVersionCommand;
const deserializeAws_json1_1CreateProjectVersionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.rekognition#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.rekognition#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1CreateStreamProcessorCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1CreateStreamProcessorCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1CreateStreamProcessorResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1CreateStreamProcessorCommand = deserializeAws_json1_1CreateStreamProcessorCommand;
const deserializeAws_json1_1CreateStreamProcessorCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.rekognition#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.rekognition#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1DeleteCollectionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteCollectionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DeleteCollectionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteCollectionCommand = deserializeAws_json1_1DeleteCollectionCommand;
const deserializeAws_json1_1DeleteCollectionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1DeleteFacesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteFacesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DeleteFacesResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteFacesCommand = deserializeAws_json1_1DeleteFacesCommand;
const deserializeAws_json1_1DeleteFacesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1DeleteProjectCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteProjectCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DeleteProjectResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteProjectCommand = deserializeAws_json1_1DeleteProjectCommand;
const deserializeAws_json1_1DeleteProjectCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.rekognition#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1DeleteProjectVersionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteProjectVersionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DeleteProjectVersionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteProjectVersionCommand = deserializeAws_json1_1DeleteProjectVersionCommand;
const deserializeAws_json1_1DeleteProjectVersionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.rekognition#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1DeleteStreamProcessorCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteStreamProcessorCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DeleteStreamProcessorResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteStreamProcessorCommand = deserializeAws_json1_1DeleteStreamProcessorCommand;
const deserializeAws_json1_1DeleteStreamProcessorCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.rekognition#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1DescribeCollectionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeCollectionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeCollectionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeCollectionCommand = deserializeAws_json1_1DescribeCollectionCommand;
const deserializeAws_json1_1DescribeCollectionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1DescribeProjectsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeProjectsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeProjectsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeProjectsCommand = deserializeAws_json1_1DescribeProjectsCommand;
const deserializeAws_json1_1DescribeProjectsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidPaginationTokenException":
        case "com.amazonaws.rekognition#InvalidPaginationTokenException":
            response = {
                ...(await deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1DescribeProjectVersionsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeProjectVersionsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeProjectVersionsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeProjectVersionsCommand = deserializeAws_json1_1DescribeProjectVersionsCommand;
const deserializeAws_json1_1DescribeProjectVersionsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidPaginationTokenException":
        case "com.amazonaws.rekognition#InvalidPaginationTokenException":
            response = {
                ...(await deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1DescribeStreamProcessorCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeStreamProcessorCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeStreamProcessorResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeStreamProcessorCommand = deserializeAws_json1_1DescribeStreamProcessorCommand;
const deserializeAws_json1_1DescribeStreamProcessorCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1DetectCustomLabelsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DetectCustomLabelsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DetectCustomLabelsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DetectCustomLabelsCommand = deserializeAws_json1_1DetectCustomLabelsCommand;
const deserializeAws_json1_1DetectCustomLabelsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ImageTooLargeException":
        case "com.amazonaws.rekognition#ImageTooLargeException":
            response = {
                ...(await deserializeAws_json1_1ImageTooLargeExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidImageFormatException":
        case "com.amazonaws.rekognition#InvalidImageFormatException":
            response = {
                ...(await deserializeAws_json1_1InvalidImageFormatExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.rekognition#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.rekognition#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotReadyException":
        case "com.amazonaws.rekognition#ResourceNotReadyException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotReadyExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1DetectFacesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DetectFacesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DetectFacesResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DetectFacesCommand = deserializeAws_json1_1DetectFacesCommand;
const deserializeAws_json1_1DetectFacesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ImageTooLargeException":
        case "com.amazonaws.rekognition#ImageTooLargeException":
            response = {
                ...(await deserializeAws_json1_1ImageTooLargeExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidImageFormatException":
        case "com.amazonaws.rekognition#InvalidImageFormatException":
            response = {
                ...(await deserializeAws_json1_1InvalidImageFormatExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.rekognition#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1DetectLabelsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DetectLabelsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DetectLabelsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DetectLabelsCommand = deserializeAws_json1_1DetectLabelsCommand;
const deserializeAws_json1_1DetectLabelsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ImageTooLargeException":
        case "com.amazonaws.rekognition#ImageTooLargeException":
            response = {
                ...(await deserializeAws_json1_1ImageTooLargeExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidImageFormatException":
        case "com.amazonaws.rekognition#InvalidImageFormatException":
            response = {
                ...(await deserializeAws_json1_1InvalidImageFormatExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.rekognition#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1DetectModerationLabelsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DetectModerationLabelsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DetectModerationLabelsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DetectModerationLabelsCommand = deserializeAws_json1_1DetectModerationLabelsCommand;
const deserializeAws_json1_1DetectModerationLabelsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "HumanLoopQuotaExceededException":
        case "com.amazonaws.rekognition#HumanLoopQuotaExceededException":
            response = {
                ...(await deserializeAws_json1_1HumanLoopQuotaExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ImageTooLargeException":
        case "com.amazonaws.rekognition#ImageTooLargeException":
            response = {
                ...(await deserializeAws_json1_1ImageTooLargeExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidImageFormatException":
        case "com.amazonaws.rekognition#InvalidImageFormatException":
            response = {
                ...(await deserializeAws_json1_1InvalidImageFormatExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.rekognition#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1DetectProtectiveEquipmentCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DetectProtectiveEquipmentCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DetectProtectiveEquipmentResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DetectProtectiveEquipmentCommand = deserializeAws_json1_1DetectProtectiveEquipmentCommand;
const deserializeAws_json1_1DetectProtectiveEquipmentCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ImageTooLargeException":
        case "com.amazonaws.rekognition#ImageTooLargeException":
            response = {
                ...(await deserializeAws_json1_1ImageTooLargeExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidImageFormatException":
        case "com.amazonaws.rekognition#InvalidImageFormatException":
            response = {
                ...(await deserializeAws_json1_1InvalidImageFormatExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.rekognition#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1DetectTextCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DetectTextCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DetectTextResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DetectTextCommand = deserializeAws_json1_1DetectTextCommand;
const deserializeAws_json1_1DetectTextCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ImageTooLargeException":
        case "com.amazonaws.rekognition#ImageTooLargeException":
            response = {
                ...(await deserializeAws_json1_1ImageTooLargeExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidImageFormatException":
        case "com.amazonaws.rekognition#InvalidImageFormatException":
            response = {
                ...(await deserializeAws_json1_1InvalidImageFormatExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.rekognition#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1GetCelebrityInfoCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetCelebrityInfoCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetCelebrityInfoResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetCelebrityInfoCommand = deserializeAws_json1_1GetCelebrityInfoCommand;
const deserializeAws_json1_1GetCelebrityInfoCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1GetCelebrityRecognitionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetCelebrityRecognitionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetCelebrityRecognitionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetCelebrityRecognitionCommand = deserializeAws_json1_1GetCelebrityRecognitionCommand;
const deserializeAws_json1_1GetCelebrityRecognitionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidPaginationTokenException":
        case "com.amazonaws.rekognition#InvalidPaginationTokenException":
            response = {
                ...(await deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1GetContentModerationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetContentModerationCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetContentModerationResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetContentModerationCommand = deserializeAws_json1_1GetContentModerationCommand;
const deserializeAws_json1_1GetContentModerationCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidPaginationTokenException":
        case "com.amazonaws.rekognition#InvalidPaginationTokenException":
            response = {
                ...(await deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1GetFaceDetectionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetFaceDetectionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetFaceDetectionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetFaceDetectionCommand = deserializeAws_json1_1GetFaceDetectionCommand;
const deserializeAws_json1_1GetFaceDetectionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidPaginationTokenException":
        case "com.amazonaws.rekognition#InvalidPaginationTokenException":
            response = {
                ...(await deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1GetFaceSearchCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetFaceSearchCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetFaceSearchResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetFaceSearchCommand = deserializeAws_json1_1GetFaceSearchCommand;
const deserializeAws_json1_1GetFaceSearchCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidPaginationTokenException":
        case "com.amazonaws.rekognition#InvalidPaginationTokenException":
            response = {
                ...(await deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1GetLabelDetectionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetLabelDetectionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetLabelDetectionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetLabelDetectionCommand = deserializeAws_json1_1GetLabelDetectionCommand;
const deserializeAws_json1_1GetLabelDetectionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidPaginationTokenException":
        case "com.amazonaws.rekognition#InvalidPaginationTokenException":
            response = {
                ...(await deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1GetPersonTrackingCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetPersonTrackingCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetPersonTrackingResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetPersonTrackingCommand = deserializeAws_json1_1GetPersonTrackingCommand;
const deserializeAws_json1_1GetPersonTrackingCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidPaginationTokenException":
        case "com.amazonaws.rekognition#InvalidPaginationTokenException":
            response = {
                ...(await deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1GetSegmentDetectionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetSegmentDetectionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetSegmentDetectionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetSegmentDetectionCommand = deserializeAws_json1_1GetSegmentDetectionCommand;
const deserializeAws_json1_1GetSegmentDetectionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidPaginationTokenException":
        case "com.amazonaws.rekognition#InvalidPaginationTokenException":
            response = {
                ...(await deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1GetTextDetectionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1GetTextDetectionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1GetTextDetectionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1GetTextDetectionCommand = deserializeAws_json1_1GetTextDetectionCommand;
const deserializeAws_json1_1GetTextDetectionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidPaginationTokenException":
        case "com.amazonaws.rekognition#InvalidPaginationTokenException":
            response = {
                ...(await deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1IndexFacesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1IndexFacesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1IndexFacesResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1IndexFacesCommand = deserializeAws_json1_1IndexFacesCommand;
const deserializeAws_json1_1IndexFacesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ImageTooLargeException":
        case "com.amazonaws.rekognition#ImageTooLargeException":
            response = {
                ...(await deserializeAws_json1_1ImageTooLargeExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidImageFormatException":
        case "com.amazonaws.rekognition#InvalidImageFormatException":
            response = {
                ...(await deserializeAws_json1_1InvalidImageFormatExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.rekognition#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ServiceQuotaExceededException":
        case "com.amazonaws.rekognition#ServiceQuotaExceededException":
            response = {
                ...(await deserializeAws_json1_1ServiceQuotaExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1ListCollectionsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListCollectionsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListCollectionsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListCollectionsCommand = deserializeAws_json1_1ListCollectionsCommand;
const deserializeAws_json1_1ListCollectionsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidPaginationTokenException":
        case "com.amazonaws.rekognition#InvalidPaginationTokenException":
            response = {
                ...(await deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1ListFacesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListFacesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListFacesResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListFacesCommand = deserializeAws_json1_1ListFacesCommand;
const deserializeAws_json1_1ListFacesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidPaginationTokenException":
        case "com.amazonaws.rekognition#InvalidPaginationTokenException":
            response = {
                ...(await deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1ListStreamProcessorsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListStreamProcessorsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListStreamProcessorsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListStreamProcessorsCommand = deserializeAws_json1_1ListStreamProcessorsCommand;
const deserializeAws_json1_1ListStreamProcessorsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidPaginationTokenException":
        case "com.amazonaws.rekognition#InvalidPaginationTokenException":
            response = {
                ...(await deserializeAws_json1_1InvalidPaginationTokenExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1RecognizeCelebritiesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1RecognizeCelebritiesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1RecognizeCelebritiesResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1RecognizeCelebritiesCommand = deserializeAws_json1_1RecognizeCelebritiesCommand;
const deserializeAws_json1_1RecognizeCelebritiesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ImageTooLargeException":
        case "com.amazonaws.rekognition#ImageTooLargeException":
            response = {
                ...(await deserializeAws_json1_1ImageTooLargeExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidImageFormatException":
        case "com.amazonaws.rekognition#InvalidImageFormatException":
            response = {
                ...(await deserializeAws_json1_1InvalidImageFormatExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.rekognition#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1SearchFacesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1SearchFacesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1SearchFacesResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1SearchFacesCommand = deserializeAws_json1_1SearchFacesCommand;
const deserializeAws_json1_1SearchFacesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1SearchFacesByImageCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1SearchFacesByImageCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1SearchFacesByImageResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1SearchFacesByImageCommand = deserializeAws_json1_1SearchFacesByImageCommand;
const deserializeAws_json1_1SearchFacesByImageCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ImageTooLargeException":
        case "com.amazonaws.rekognition#ImageTooLargeException":
            response = {
                ...(await deserializeAws_json1_1ImageTooLargeExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidImageFormatException":
        case "com.amazonaws.rekognition#InvalidImageFormatException":
            response = {
                ...(await deserializeAws_json1_1InvalidImageFormatExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.rekognition#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1StartCelebrityRecognitionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartCelebrityRecognitionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartCelebrityRecognitionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartCelebrityRecognitionCommand = deserializeAws_json1_1StartCelebrityRecognitionCommand;
const deserializeAws_json1_1StartCelebrityRecognitionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "IdempotentParameterMismatchException":
        case "com.amazonaws.rekognition#IdempotentParameterMismatchException":
            response = {
                ...(await deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.rekognition#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.rekognition#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
            response = {
                ...(await deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "VideoTooLargeException":
        case "com.amazonaws.rekognition#VideoTooLargeException":
            response = {
                ...(await deserializeAws_json1_1VideoTooLargeExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1StartContentModerationCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartContentModerationCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartContentModerationResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartContentModerationCommand = deserializeAws_json1_1StartContentModerationCommand;
const deserializeAws_json1_1StartContentModerationCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "IdempotentParameterMismatchException":
        case "com.amazonaws.rekognition#IdempotentParameterMismatchException":
            response = {
                ...(await deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.rekognition#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.rekognition#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
            response = {
                ...(await deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "VideoTooLargeException":
        case "com.amazonaws.rekognition#VideoTooLargeException":
            response = {
                ...(await deserializeAws_json1_1VideoTooLargeExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1StartFaceDetectionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartFaceDetectionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartFaceDetectionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartFaceDetectionCommand = deserializeAws_json1_1StartFaceDetectionCommand;
const deserializeAws_json1_1StartFaceDetectionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "IdempotentParameterMismatchException":
        case "com.amazonaws.rekognition#IdempotentParameterMismatchException":
            response = {
                ...(await deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.rekognition#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.rekognition#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
            response = {
                ...(await deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "VideoTooLargeException":
        case "com.amazonaws.rekognition#VideoTooLargeException":
            response = {
                ...(await deserializeAws_json1_1VideoTooLargeExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1StartFaceSearchCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartFaceSearchCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartFaceSearchResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartFaceSearchCommand = deserializeAws_json1_1StartFaceSearchCommand;
const deserializeAws_json1_1StartFaceSearchCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "IdempotentParameterMismatchException":
        case "com.amazonaws.rekognition#IdempotentParameterMismatchException":
            response = {
                ...(await deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.rekognition#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.rekognition#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
            response = {
                ...(await deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "VideoTooLargeException":
        case "com.amazonaws.rekognition#VideoTooLargeException":
            response = {
                ...(await deserializeAws_json1_1VideoTooLargeExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1StartLabelDetectionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartLabelDetectionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartLabelDetectionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartLabelDetectionCommand = deserializeAws_json1_1StartLabelDetectionCommand;
const deserializeAws_json1_1StartLabelDetectionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "IdempotentParameterMismatchException":
        case "com.amazonaws.rekognition#IdempotentParameterMismatchException":
            response = {
                ...(await deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.rekognition#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.rekognition#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
            response = {
                ...(await deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "VideoTooLargeException":
        case "com.amazonaws.rekognition#VideoTooLargeException":
            response = {
                ...(await deserializeAws_json1_1VideoTooLargeExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1StartPersonTrackingCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartPersonTrackingCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartPersonTrackingResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartPersonTrackingCommand = deserializeAws_json1_1StartPersonTrackingCommand;
const deserializeAws_json1_1StartPersonTrackingCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "IdempotentParameterMismatchException":
        case "com.amazonaws.rekognition#IdempotentParameterMismatchException":
            response = {
                ...(await deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.rekognition#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.rekognition#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
            response = {
                ...(await deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "VideoTooLargeException":
        case "com.amazonaws.rekognition#VideoTooLargeException":
            response = {
                ...(await deserializeAws_json1_1VideoTooLargeExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1StartProjectVersionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartProjectVersionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartProjectVersionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartProjectVersionCommand = deserializeAws_json1_1StartProjectVersionCommand;
const deserializeAws_json1_1StartProjectVersionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.rekognition#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.rekognition#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1StartSegmentDetectionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartSegmentDetectionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartSegmentDetectionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartSegmentDetectionCommand = deserializeAws_json1_1StartSegmentDetectionCommand;
const deserializeAws_json1_1StartSegmentDetectionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "IdempotentParameterMismatchException":
        case "com.amazonaws.rekognition#IdempotentParameterMismatchException":
            response = {
                ...(await deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.rekognition#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.rekognition#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
            response = {
                ...(await deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "VideoTooLargeException":
        case "com.amazonaws.rekognition#VideoTooLargeException":
            response = {
                ...(await deserializeAws_json1_1VideoTooLargeExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1StartStreamProcessorCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartStreamProcessorCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartStreamProcessorResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartStreamProcessorCommand = deserializeAws_json1_1StartStreamProcessorCommand;
const deserializeAws_json1_1StartStreamProcessorCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.rekognition#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1StartTextDetectionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartTextDetectionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartTextDetectionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartTextDetectionCommand = deserializeAws_json1_1StartTextDetectionCommand;
const deserializeAws_json1_1StartTextDetectionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "IdempotentParameterMismatchException":
        case "com.amazonaws.rekognition#IdempotentParameterMismatchException":
            response = {
                ...(await deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidS3ObjectException":
        case "com.amazonaws.rekognition#InvalidS3ObjectException":
            response = {
                ...(await deserializeAws_json1_1InvalidS3ObjectExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "LimitExceededException":
        case "com.amazonaws.rekognition#LimitExceededException":
            response = {
                ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
            response = {
                ...(await deserializeAws_json1_1ThrottlingExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "VideoTooLargeException":
        case "com.amazonaws.rekognition#VideoTooLargeException":
            response = {
                ...(await deserializeAws_json1_1VideoTooLargeExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1StopProjectVersionCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StopProjectVersionCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StopProjectVersionResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StopProjectVersionCommand = deserializeAws_json1_1StopProjectVersionCommand;
const deserializeAws_json1_1StopProjectVersionCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.rekognition#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1StopStreamProcessorCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StopStreamProcessorCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StopStreamProcessorResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StopStreamProcessorCommand = deserializeAws_json1_1StopStreamProcessorCommand;
const deserializeAws_json1_1StopStreamProcessorCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.rekognition#AccessDeniedException":
            response = {
                ...(await deserializeAws_json1_1AccessDeniedExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerError":
        case "com.amazonaws.rekognition#InternalServerError":
            response = {
                ...(await deserializeAws_json1_1InternalServerErrorResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidParameterException":
        case "com.amazonaws.rekognition#InvalidParameterException":
            response = {
                ...(await deserializeAws_json1_1InvalidParameterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ProvisionedThroughputExceededException":
        case "com.amazonaws.rekognition#ProvisionedThroughputExceededException":
            response = {
                ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.rekognition#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.rekognition#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ThrottlingException":
        case "com.amazonaws.rekognition#ThrottlingException":
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
const deserializeAws_json1_1ImageTooLargeExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ImageTooLargeException(body, context);
    const contents = {
        name: "ImageTooLargeException",
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
const deserializeAws_json1_1InvalidImageFormatExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1InvalidImageFormatException(body, context);
    const contents = {
        name: "InvalidImageFormatException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1InvalidPaginationTokenExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1InvalidPaginationTokenException(body, context);
    const contents = {
        name: "InvalidPaginationTokenException",
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
const deserializeAws_json1_1ResourceNotReadyExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ResourceNotReadyException(body, context);
    const contents = {
        name: "ResourceNotReadyException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1ServiceQuotaExceededExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ServiceQuotaExceededException(body, context);
    const contents = {
        name: "ServiceQuotaExceededException",
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
const deserializeAws_json1_1VideoTooLargeExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1VideoTooLargeException(body, context);
    const contents = {
        name: "VideoTooLargeException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const serializeAws_json1_1Asset = (input, context) => {
    return {
        ...(input.GroundTruthManifest !== undefined &&
            input.GroundTruthManifest !== null && {
            GroundTruthManifest: serializeAws_json1_1GroundTruthManifest(input.GroundTruthManifest, context),
        }),
    };
};
const serializeAws_json1_1Assets = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1Asset(entry, context);
    });
};
const serializeAws_json1_1Attributes = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1BoundingBox = (input, context) => {
    return {
        ...(input.Height !== undefined && input.Height !== null && { Height: input.Height }),
        ...(input.Left !== undefined && input.Left !== null && { Left: input.Left }),
        ...(input.Top !== undefined && input.Top !== null && { Top: input.Top }),
        ...(input.Width !== undefined && input.Width !== null && { Width: input.Width }),
    };
};
const serializeAws_json1_1CompareFacesRequest = (input, context) => {
    return {
        ...(input.QualityFilter !== undefined && input.QualityFilter !== null && { QualityFilter: input.QualityFilter }),
        ...(input.SimilarityThreshold !== undefined &&
            input.SimilarityThreshold !== null && { SimilarityThreshold: input.SimilarityThreshold }),
        ...(input.SourceImage !== undefined &&
            input.SourceImage !== null && { SourceImage: serializeAws_json1_1Image(input.SourceImage, context) }),
        ...(input.TargetImage !== undefined &&
            input.TargetImage !== null && { TargetImage: serializeAws_json1_1Image(input.TargetImage, context) }),
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
const serializeAws_json1_1CreateCollectionRequest = (input, context) => {
    return {
        ...(input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId }),
    };
};
const serializeAws_json1_1CreateProjectRequest = (input, context) => {
    return {
        ...(input.ProjectName !== undefined && input.ProjectName !== null && { ProjectName: input.ProjectName }),
    };
};
const serializeAws_json1_1CreateProjectVersionRequest = (input, context) => {
    return {
        ...(input.OutputConfig !== undefined &&
            input.OutputConfig !== null && { OutputConfig: serializeAws_json1_1OutputConfig(input.OutputConfig, context) }),
        ...(input.ProjectArn !== undefined && input.ProjectArn !== null && { ProjectArn: input.ProjectArn }),
        ...(input.TestingData !== undefined &&
            input.TestingData !== null && { TestingData: serializeAws_json1_1TestingData(input.TestingData, context) }),
        ...(input.TrainingData !== undefined &&
            input.TrainingData !== null && { TrainingData: serializeAws_json1_1TrainingData(input.TrainingData, context) }),
        ...(input.VersionName !== undefined && input.VersionName !== null && { VersionName: input.VersionName }),
    };
};
const serializeAws_json1_1CreateStreamProcessorRequest = (input, context) => {
    return {
        ...(input.Input !== undefined &&
            input.Input !== null && { Input: serializeAws_json1_1StreamProcessorInput(input.Input, context) }),
        ...(input.Name !== undefined && input.Name !== null && { Name: input.Name }),
        ...(input.Output !== undefined &&
            input.Output !== null && { Output: serializeAws_json1_1StreamProcessorOutput(input.Output, context) }),
        ...(input.RoleArn !== undefined && input.RoleArn !== null && { RoleArn: input.RoleArn }),
        ...(input.Settings !== undefined &&
            input.Settings !== null && { Settings: serializeAws_json1_1StreamProcessorSettings(input.Settings, context) }),
    };
};
const serializeAws_json1_1DeleteCollectionRequest = (input, context) => {
    return {
        ...(input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId }),
    };
};
const serializeAws_json1_1DeleteFacesRequest = (input, context) => {
    return {
        ...(input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId }),
        ...(input.FaceIds !== undefined &&
            input.FaceIds !== null && { FaceIds: serializeAws_json1_1FaceIdList(input.FaceIds, context) }),
    };
};
const serializeAws_json1_1DeleteProjectRequest = (input, context) => {
    return {
        ...(input.ProjectArn !== undefined && input.ProjectArn !== null && { ProjectArn: input.ProjectArn }),
    };
};
const serializeAws_json1_1DeleteProjectVersionRequest = (input, context) => {
    return {
        ...(input.ProjectVersionArn !== undefined &&
            input.ProjectVersionArn !== null && { ProjectVersionArn: input.ProjectVersionArn }),
    };
};
const serializeAws_json1_1DeleteStreamProcessorRequest = (input, context) => {
    return {
        ...(input.Name !== undefined && input.Name !== null && { Name: input.Name }),
    };
};
const serializeAws_json1_1DescribeCollectionRequest = (input, context) => {
    return {
        ...(input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId }),
    };
};
const serializeAws_json1_1DescribeProjectsRequest = (input, context) => {
    return {
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1DescribeProjectVersionsRequest = (input, context) => {
    return {
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
        ...(input.ProjectArn !== undefined && input.ProjectArn !== null && { ProjectArn: input.ProjectArn }),
        ...(input.VersionNames !== undefined &&
            input.VersionNames !== null && { VersionNames: serializeAws_json1_1VersionNames(input.VersionNames, context) }),
    };
};
const serializeAws_json1_1DescribeStreamProcessorRequest = (input, context) => {
    return {
        ...(input.Name !== undefined && input.Name !== null && { Name: input.Name }),
    };
};
const serializeAws_json1_1DetectCustomLabelsRequest = (input, context) => {
    return {
        ...(input.Image !== undefined &&
            input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.MinConfidence !== undefined && input.MinConfidence !== null && { MinConfidence: input.MinConfidence }),
        ...(input.ProjectVersionArn !== undefined &&
            input.ProjectVersionArn !== null && { ProjectVersionArn: input.ProjectVersionArn }),
    };
};
const serializeAws_json1_1DetectFacesRequest = (input, context) => {
    return {
        ...(input.Attributes !== undefined &&
            input.Attributes !== null && { Attributes: serializeAws_json1_1Attributes(input.Attributes, context) }),
        ...(input.Image !== undefined &&
            input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) }),
    };
};
const serializeAws_json1_1DetectionFilter = (input, context) => {
    return {
        ...(input.MinBoundingBoxHeight !== undefined &&
            input.MinBoundingBoxHeight !== null && { MinBoundingBoxHeight: input.MinBoundingBoxHeight }),
        ...(input.MinBoundingBoxWidth !== undefined &&
            input.MinBoundingBoxWidth !== null && { MinBoundingBoxWidth: input.MinBoundingBoxWidth }),
        ...(input.MinConfidence !== undefined && input.MinConfidence !== null && { MinConfidence: input.MinConfidence }),
    };
};
const serializeAws_json1_1DetectLabelsRequest = (input, context) => {
    return {
        ...(input.Image !== undefined &&
            input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) }),
        ...(input.MaxLabels !== undefined && input.MaxLabels !== null && { MaxLabels: input.MaxLabels }),
        ...(input.MinConfidence !== undefined && input.MinConfidence !== null && { MinConfidence: input.MinConfidence }),
    };
};
const serializeAws_json1_1DetectModerationLabelsRequest = (input, context) => {
    return {
        ...(input.HumanLoopConfig !== undefined &&
            input.HumanLoopConfig !== null && {
            HumanLoopConfig: serializeAws_json1_1HumanLoopConfig(input.HumanLoopConfig, context),
        }),
        ...(input.Image !== undefined &&
            input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) }),
        ...(input.MinConfidence !== undefined && input.MinConfidence !== null && { MinConfidence: input.MinConfidence }),
    };
};
const serializeAws_json1_1DetectProtectiveEquipmentRequest = (input, context) => {
    return {
        ...(input.Image !== undefined &&
            input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) }),
        ...(input.SummarizationAttributes !== undefined &&
            input.SummarizationAttributes !== null && {
            SummarizationAttributes: serializeAws_json1_1ProtectiveEquipmentSummarizationAttributes(input.SummarizationAttributes, context),
        }),
    };
};
const serializeAws_json1_1DetectTextFilters = (input, context) => {
    return {
        ...(input.RegionsOfInterest !== undefined &&
            input.RegionsOfInterest !== null && {
            RegionsOfInterest: serializeAws_json1_1RegionsOfInterest(input.RegionsOfInterest, context),
        }),
        ...(input.WordFilter !== undefined &&
            input.WordFilter !== null && { WordFilter: serializeAws_json1_1DetectionFilter(input.WordFilter, context) }),
    };
};
const serializeAws_json1_1DetectTextRequest = (input, context) => {
    return {
        ...(input.Filters !== undefined &&
            input.Filters !== null && { Filters: serializeAws_json1_1DetectTextFilters(input.Filters, context) }),
        ...(input.Image !== undefined &&
            input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) }),
    };
};
const serializeAws_json1_1FaceIdList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1FaceSearchSettings = (input, context) => {
    return {
        ...(input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId }),
        ...(input.FaceMatchThreshold !== undefined &&
            input.FaceMatchThreshold !== null && { FaceMatchThreshold: input.FaceMatchThreshold }),
    };
};
const serializeAws_json1_1GetCelebrityInfoRequest = (input, context) => {
    return {
        ...(input.Id !== undefined && input.Id !== null && { Id: input.Id }),
    };
};
const serializeAws_json1_1GetCelebrityRecognitionRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
        ...(input.SortBy !== undefined && input.SortBy !== null && { SortBy: input.SortBy }),
    };
};
const serializeAws_json1_1GetContentModerationRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
        ...(input.SortBy !== undefined && input.SortBy !== null && { SortBy: input.SortBy }),
    };
};
const serializeAws_json1_1GetFaceDetectionRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1GetFaceSearchRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
        ...(input.SortBy !== undefined && input.SortBy !== null && { SortBy: input.SortBy }),
    };
};
const serializeAws_json1_1GetLabelDetectionRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
        ...(input.SortBy !== undefined && input.SortBy !== null && { SortBy: input.SortBy }),
    };
};
const serializeAws_json1_1GetPersonTrackingRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
        ...(input.SortBy !== undefined && input.SortBy !== null && { SortBy: input.SortBy }),
    };
};
const serializeAws_json1_1GetSegmentDetectionRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1GetTextDetectionRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1GroundTruthManifest = (input, context) => {
    return {
        ...(input.S3Object !== undefined &&
            input.S3Object !== null && { S3Object: serializeAws_json1_1S3Object(input.S3Object, context) }),
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
const serializeAws_json1_1Image = (input, context) => {
    return {
        ...(input.Bytes !== undefined && input.Bytes !== null && { Bytes: context.base64Encoder(input.Bytes) }),
        ...(input.S3Object !== undefined &&
            input.S3Object !== null && { S3Object: serializeAws_json1_1S3Object(input.S3Object, context) }),
    };
};
const serializeAws_json1_1IndexFacesRequest = (input, context) => {
    return {
        ...(input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId }),
        ...(input.DetectionAttributes !== undefined &&
            input.DetectionAttributes !== null && {
            DetectionAttributes: serializeAws_json1_1Attributes(input.DetectionAttributes, context),
        }),
        ...(input.ExternalImageId !== undefined &&
            input.ExternalImageId !== null && { ExternalImageId: input.ExternalImageId }),
        ...(input.Image !== undefined &&
            input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) }),
        ...(input.MaxFaces !== undefined && input.MaxFaces !== null && { MaxFaces: input.MaxFaces }),
        ...(input.QualityFilter !== undefined && input.QualityFilter !== null && { QualityFilter: input.QualityFilter }),
    };
};
const serializeAws_json1_1KinesisDataStream = (input, context) => {
    return {
        ...(input.Arn !== undefined && input.Arn !== null && { Arn: input.Arn }),
    };
};
const serializeAws_json1_1KinesisVideoStream = (input, context) => {
    return {
        ...(input.Arn !== undefined && input.Arn !== null && { Arn: input.Arn }),
    };
};
const serializeAws_json1_1ListCollectionsRequest = (input, context) => {
    return {
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1ListFacesRequest = (input, context) => {
    return {
        ...(input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1ListStreamProcessorsRequest = (input, context) => {
    return {
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
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
        ...(input.S3KeyPrefix !== undefined && input.S3KeyPrefix !== null && { S3KeyPrefix: input.S3KeyPrefix }),
    };
};
const serializeAws_json1_1ProtectiveEquipmentSummarizationAttributes = (input, context) => {
    return {
        ...(input.MinConfidence !== undefined && input.MinConfidence !== null && { MinConfidence: input.MinConfidence }),
        ...(input.RequiredEquipmentTypes !== undefined &&
            input.RequiredEquipmentTypes !== null && {
            RequiredEquipmentTypes: serializeAws_json1_1ProtectiveEquipmentTypes(input.RequiredEquipmentTypes, context),
        }),
    };
};
const serializeAws_json1_1ProtectiveEquipmentTypes = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1RecognizeCelebritiesRequest = (input, context) => {
    return {
        ...(input.Image !== undefined &&
            input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) }),
    };
};
const serializeAws_json1_1RegionOfInterest = (input, context) => {
    return {
        ...(input.BoundingBox !== undefined &&
            input.BoundingBox !== null && { BoundingBox: serializeAws_json1_1BoundingBox(input.BoundingBox, context) }),
    };
};
const serializeAws_json1_1RegionsOfInterest = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1RegionOfInterest(entry, context);
    });
};
const serializeAws_json1_1S3Object = (input, context) => {
    return {
        ...(input.Bucket !== undefined && input.Bucket !== null && { Bucket: input.Bucket }),
        ...(input.Name !== undefined && input.Name !== null && { Name: input.Name }),
        ...(input.Version !== undefined && input.Version !== null && { Version: input.Version }),
    };
};
const serializeAws_json1_1SearchFacesByImageRequest = (input, context) => {
    return {
        ...(input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId }),
        ...(input.FaceMatchThreshold !== undefined &&
            input.FaceMatchThreshold !== null && { FaceMatchThreshold: input.FaceMatchThreshold }),
        ...(input.Image !== undefined &&
            input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) }),
        ...(input.MaxFaces !== undefined && input.MaxFaces !== null && { MaxFaces: input.MaxFaces }),
        ...(input.QualityFilter !== undefined && input.QualityFilter !== null && { QualityFilter: input.QualityFilter }),
    };
};
const serializeAws_json1_1SearchFacesRequest = (input, context) => {
    return {
        ...(input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId }),
        ...(input.FaceId !== undefined && input.FaceId !== null && { FaceId: input.FaceId }),
        ...(input.FaceMatchThreshold !== undefined &&
            input.FaceMatchThreshold !== null && { FaceMatchThreshold: input.FaceMatchThreshold }),
        ...(input.MaxFaces !== undefined && input.MaxFaces !== null && { MaxFaces: input.MaxFaces }),
    };
};
const serializeAws_json1_1SegmentTypes = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1StartCelebrityRecognitionRequest = (input, context) => {
    return {
        ...(input.ClientRequestToken !== undefined &&
            input.ClientRequestToken !== null && { ClientRequestToken: input.ClientRequestToken }),
        ...(input.JobTag !== undefined && input.JobTag !== null && { JobTag: input.JobTag }),
        ...(input.NotificationChannel !== undefined &&
            input.NotificationChannel !== null && {
            NotificationChannel: serializeAws_json1_1NotificationChannel(input.NotificationChannel, context),
        }),
        ...(input.Video !== undefined &&
            input.Video !== null && { Video: serializeAws_json1_1Video(input.Video, context) }),
    };
};
const serializeAws_json1_1StartContentModerationRequest = (input, context) => {
    return {
        ...(input.ClientRequestToken !== undefined &&
            input.ClientRequestToken !== null && { ClientRequestToken: input.ClientRequestToken }),
        ...(input.JobTag !== undefined && input.JobTag !== null && { JobTag: input.JobTag }),
        ...(input.MinConfidence !== undefined && input.MinConfidence !== null && { MinConfidence: input.MinConfidence }),
        ...(input.NotificationChannel !== undefined &&
            input.NotificationChannel !== null && {
            NotificationChannel: serializeAws_json1_1NotificationChannel(input.NotificationChannel, context),
        }),
        ...(input.Video !== undefined &&
            input.Video !== null && { Video: serializeAws_json1_1Video(input.Video, context) }),
    };
};
const serializeAws_json1_1StartFaceDetectionRequest = (input, context) => {
    return {
        ...(input.ClientRequestToken !== undefined &&
            input.ClientRequestToken !== null && { ClientRequestToken: input.ClientRequestToken }),
        ...(input.FaceAttributes !== undefined &&
            input.FaceAttributes !== null && { FaceAttributes: input.FaceAttributes }),
        ...(input.JobTag !== undefined && input.JobTag !== null && { JobTag: input.JobTag }),
        ...(input.NotificationChannel !== undefined &&
            input.NotificationChannel !== null && {
            NotificationChannel: serializeAws_json1_1NotificationChannel(input.NotificationChannel, context),
        }),
        ...(input.Video !== undefined &&
            input.Video !== null && { Video: serializeAws_json1_1Video(input.Video, context) }),
    };
};
const serializeAws_json1_1StartFaceSearchRequest = (input, context) => {
    return {
        ...(input.ClientRequestToken !== undefined &&
            input.ClientRequestToken !== null && { ClientRequestToken: input.ClientRequestToken }),
        ...(input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId }),
        ...(input.FaceMatchThreshold !== undefined &&
            input.FaceMatchThreshold !== null && { FaceMatchThreshold: input.FaceMatchThreshold }),
        ...(input.JobTag !== undefined && input.JobTag !== null && { JobTag: input.JobTag }),
        ...(input.NotificationChannel !== undefined &&
            input.NotificationChannel !== null && {
            NotificationChannel: serializeAws_json1_1NotificationChannel(input.NotificationChannel, context),
        }),
        ...(input.Video !== undefined &&
            input.Video !== null && { Video: serializeAws_json1_1Video(input.Video, context) }),
    };
};
const serializeAws_json1_1StartLabelDetectionRequest = (input, context) => {
    return {
        ...(input.ClientRequestToken !== undefined &&
            input.ClientRequestToken !== null && { ClientRequestToken: input.ClientRequestToken }),
        ...(input.JobTag !== undefined && input.JobTag !== null && { JobTag: input.JobTag }),
        ...(input.MinConfidence !== undefined && input.MinConfidence !== null && { MinConfidence: input.MinConfidence }),
        ...(input.NotificationChannel !== undefined &&
            input.NotificationChannel !== null && {
            NotificationChannel: serializeAws_json1_1NotificationChannel(input.NotificationChannel, context),
        }),
        ...(input.Video !== undefined &&
            input.Video !== null && { Video: serializeAws_json1_1Video(input.Video, context) }),
    };
};
const serializeAws_json1_1StartPersonTrackingRequest = (input, context) => {
    return {
        ...(input.ClientRequestToken !== undefined &&
            input.ClientRequestToken !== null && { ClientRequestToken: input.ClientRequestToken }),
        ...(input.JobTag !== undefined && input.JobTag !== null && { JobTag: input.JobTag }),
        ...(input.NotificationChannel !== undefined &&
            input.NotificationChannel !== null && {
            NotificationChannel: serializeAws_json1_1NotificationChannel(input.NotificationChannel, context),
        }),
        ...(input.Video !== undefined &&
            input.Video !== null && { Video: serializeAws_json1_1Video(input.Video, context) }),
    };
};
const serializeAws_json1_1StartProjectVersionRequest = (input, context) => {
    return {
        ...(input.MinInferenceUnits !== undefined &&
            input.MinInferenceUnits !== null && { MinInferenceUnits: input.MinInferenceUnits }),
        ...(input.ProjectVersionArn !== undefined &&
            input.ProjectVersionArn !== null && { ProjectVersionArn: input.ProjectVersionArn }),
    };
};
const serializeAws_json1_1StartSegmentDetectionFilters = (input, context) => {
    return {
        ...(input.ShotFilter !== undefined &&
            input.ShotFilter !== null && {
            ShotFilter: serializeAws_json1_1StartShotDetectionFilter(input.ShotFilter, context),
        }),
        ...(input.TechnicalCueFilter !== undefined &&
            input.TechnicalCueFilter !== null && {
            TechnicalCueFilter: serializeAws_json1_1StartTechnicalCueDetectionFilter(input.TechnicalCueFilter, context),
        }),
    };
};
const serializeAws_json1_1StartSegmentDetectionRequest = (input, context) => {
    return {
        ...(input.ClientRequestToken !== undefined &&
            input.ClientRequestToken !== null && { ClientRequestToken: input.ClientRequestToken }),
        ...(input.Filters !== undefined &&
            input.Filters !== null && { Filters: serializeAws_json1_1StartSegmentDetectionFilters(input.Filters, context) }),
        ...(input.JobTag !== undefined && input.JobTag !== null && { JobTag: input.JobTag }),
        ...(input.NotificationChannel !== undefined &&
            input.NotificationChannel !== null && {
            NotificationChannel: serializeAws_json1_1NotificationChannel(input.NotificationChannel, context),
        }),
        ...(input.SegmentTypes !== undefined &&
            input.SegmentTypes !== null && { SegmentTypes: serializeAws_json1_1SegmentTypes(input.SegmentTypes, context) }),
        ...(input.Video !== undefined &&
            input.Video !== null && { Video: serializeAws_json1_1Video(input.Video, context) }),
    };
};
const serializeAws_json1_1StartShotDetectionFilter = (input, context) => {
    return {
        ...(input.MinSegmentConfidence !== undefined &&
            input.MinSegmentConfidence !== null && { MinSegmentConfidence: input.MinSegmentConfidence }),
    };
};
const serializeAws_json1_1StartStreamProcessorRequest = (input, context) => {
    return {
        ...(input.Name !== undefined && input.Name !== null && { Name: input.Name }),
    };
};
const serializeAws_json1_1StartTechnicalCueDetectionFilter = (input, context) => {
    return {
        ...(input.MinSegmentConfidence !== undefined &&
            input.MinSegmentConfidence !== null && { MinSegmentConfidence: input.MinSegmentConfidence }),
    };
};
const serializeAws_json1_1StartTextDetectionFilters = (input, context) => {
    return {
        ...(input.RegionsOfInterest !== undefined &&
            input.RegionsOfInterest !== null && {
            RegionsOfInterest: serializeAws_json1_1RegionsOfInterest(input.RegionsOfInterest, context),
        }),
        ...(input.WordFilter !== undefined &&
            input.WordFilter !== null && { WordFilter: serializeAws_json1_1DetectionFilter(input.WordFilter, context) }),
    };
};
const serializeAws_json1_1StartTextDetectionRequest = (input, context) => {
    return {
        ...(input.ClientRequestToken !== undefined &&
            input.ClientRequestToken !== null && { ClientRequestToken: input.ClientRequestToken }),
        ...(input.Filters !== undefined &&
            input.Filters !== null && { Filters: serializeAws_json1_1StartTextDetectionFilters(input.Filters, context) }),
        ...(input.JobTag !== undefined && input.JobTag !== null && { JobTag: input.JobTag }),
        ...(input.NotificationChannel !== undefined &&
            input.NotificationChannel !== null && {
            NotificationChannel: serializeAws_json1_1NotificationChannel(input.NotificationChannel, context),
        }),
        ...(input.Video !== undefined &&
            input.Video !== null && { Video: serializeAws_json1_1Video(input.Video, context) }),
    };
};
const serializeAws_json1_1StopProjectVersionRequest = (input, context) => {
    return {
        ...(input.ProjectVersionArn !== undefined &&
            input.ProjectVersionArn !== null && { ProjectVersionArn: input.ProjectVersionArn }),
    };
};
const serializeAws_json1_1StopStreamProcessorRequest = (input, context) => {
    return {
        ...(input.Name !== undefined && input.Name !== null && { Name: input.Name }),
    };
};
const serializeAws_json1_1StreamProcessorInput = (input, context) => {
    return {
        ...(input.KinesisVideoStream !== undefined &&
            input.KinesisVideoStream !== null && {
            KinesisVideoStream: serializeAws_json1_1KinesisVideoStream(input.KinesisVideoStream, context),
        }),
    };
};
const serializeAws_json1_1StreamProcessorOutput = (input, context) => {
    return {
        ...(input.KinesisDataStream !== undefined &&
            input.KinesisDataStream !== null && {
            KinesisDataStream: serializeAws_json1_1KinesisDataStream(input.KinesisDataStream, context),
        }),
    };
};
const serializeAws_json1_1StreamProcessorSettings = (input, context) => {
    return {
        ...(input.FaceSearch !== undefined &&
            input.FaceSearch !== null && { FaceSearch: serializeAws_json1_1FaceSearchSettings(input.FaceSearch, context) }),
    };
};
const serializeAws_json1_1TestingData = (input, context) => {
    return {
        ...(input.Assets !== undefined &&
            input.Assets !== null && { Assets: serializeAws_json1_1Assets(input.Assets, context) }),
        ...(input.AutoCreate !== undefined && input.AutoCreate !== null && { AutoCreate: input.AutoCreate }),
    };
};
const serializeAws_json1_1TrainingData = (input, context) => {
    return {
        ...(input.Assets !== undefined &&
            input.Assets !== null && { Assets: serializeAws_json1_1Assets(input.Assets, context) }),
    };
};
const serializeAws_json1_1VersionNames = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1Video = (input, context) => {
    return {
        ...(input.S3Object !== undefined &&
            input.S3Object !== null && { S3Object: serializeAws_json1_1S3Object(input.S3Object, context) }),
    };
};
const deserializeAws_json1_1AccessDeniedException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1AgeRange = (output, context) => {
    return {
        High: output.High !== undefined && output.High !== null ? output.High : undefined,
        Low: output.Low !== undefined && output.Low !== null ? output.Low : undefined,
    };
};
const deserializeAws_json1_1Asset = (output, context) => {
    return {
        GroundTruthManifest: output.GroundTruthManifest !== undefined && output.GroundTruthManifest !== null
            ? deserializeAws_json1_1GroundTruthManifest(output.GroundTruthManifest, context)
            : undefined,
    };
};
const deserializeAws_json1_1Assets = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Asset(entry, context);
    });
};
const deserializeAws_json1_1AudioMetadata = (output, context) => {
    return {
        Codec: output.Codec !== undefined && output.Codec !== null ? output.Codec : undefined,
        DurationMillis: output.DurationMillis !== undefined && output.DurationMillis !== null ? output.DurationMillis : undefined,
        NumberOfChannels: output.NumberOfChannels !== undefined && output.NumberOfChannels !== null ? output.NumberOfChannels : undefined,
        SampleRate: output.SampleRate !== undefined && output.SampleRate !== null ? output.SampleRate : undefined,
    };
};
const deserializeAws_json1_1AudioMetadataList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1AudioMetadata(entry, context);
    });
};
const deserializeAws_json1_1Beard = (output, context) => {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
const deserializeAws_json1_1BodyParts = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ProtectiveEquipmentBodyPart(entry, context);
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
const deserializeAws_json1_1Celebrity = (output, context) => {
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
const deserializeAws_json1_1CelebrityDetail = (output, context) => {
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
const deserializeAws_json1_1CelebrityList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Celebrity(entry, context);
    });
};
const deserializeAws_json1_1CelebrityRecognition = (output, context) => {
    return {
        Celebrity: output.Celebrity !== undefined && output.Celebrity !== null
            ? deserializeAws_json1_1CelebrityDetail(output.Celebrity, context)
            : undefined,
        Timestamp: output.Timestamp !== undefined && output.Timestamp !== null ? output.Timestamp : undefined,
    };
};
const deserializeAws_json1_1CelebrityRecognitions = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1CelebrityRecognition(entry, context);
    });
};
const deserializeAws_json1_1CollectionIdList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1ComparedFace = (output, context) => {
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
const deserializeAws_json1_1ComparedFaceList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ComparedFace(entry, context);
    });
};
const deserializeAws_json1_1ComparedSourceImageFace = (output, context) => {
    return {
        BoundingBox: output.BoundingBox !== undefined && output.BoundingBox !== null
            ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
            : undefined,
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    };
};
const deserializeAws_json1_1CompareFacesMatch = (output, context) => {
    return {
        Face: output.Face !== undefined && output.Face !== null
            ? deserializeAws_json1_1ComparedFace(output.Face, context)
            : undefined,
        Similarity: output.Similarity !== undefined && output.Similarity !== null ? output.Similarity : undefined,
    };
};
const deserializeAws_json1_1CompareFacesMatchList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1CompareFacesMatch(entry, context);
    });
};
const deserializeAws_json1_1CompareFacesResponse = (output, context) => {
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
const deserializeAws_json1_1CompareFacesUnmatchList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ComparedFace(entry, context);
    });
};
const deserializeAws_json1_1ContentModerationDetection = (output, context) => {
    return {
        ModerationLabel: output.ModerationLabel !== undefined && output.ModerationLabel !== null
            ? deserializeAws_json1_1ModerationLabel(output.ModerationLabel, context)
            : undefined,
        Timestamp: output.Timestamp !== undefined && output.Timestamp !== null ? output.Timestamp : undefined,
    };
};
const deserializeAws_json1_1ContentModerationDetections = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ContentModerationDetection(entry, context);
    });
};
const deserializeAws_json1_1CoversBodyPart = (output, context) => {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
const deserializeAws_json1_1CreateCollectionResponse = (output, context) => {
    return {
        CollectionArn: output.CollectionArn !== undefined && output.CollectionArn !== null ? output.CollectionArn : undefined,
        FaceModelVersion: output.FaceModelVersion !== undefined && output.FaceModelVersion !== null ? output.FaceModelVersion : undefined,
        StatusCode: output.StatusCode !== undefined && output.StatusCode !== null ? output.StatusCode : undefined,
    };
};
const deserializeAws_json1_1CreateProjectResponse = (output, context) => {
    return {
        ProjectArn: output.ProjectArn !== undefined && output.ProjectArn !== null ? output.ProjectArn : undefined,
    };
};
const deserializeAws_json1_1CreateProjectVersionResponse = (output, context) => {
    return {
        ProjectVersionArn: output.ProjectVersionArn !== undefined && output.ProjectVersionArn !== null
            ? output.ProjectVersionArn
            : undefined,
    };
};
const deserializeAws_json1_1CreateStreamProcessorResponse = (output, context) => {
    return {
        StreamProcessorArn: output.StreamProcessorArn !== undefined && output.StreamProcessorArn !== null
            ? output.StreamProcessorArn
            : undefined,
    };
};
const deserializeAws_json1_1CustomLabel = (output, context) => {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Geometry: output.Geometry !== undefined && output.Geometry !== null
            ? deserializeAws_json1_1Geometry(output.Geometry, context)
            : undefined,
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
    };
};
const deserializeAws_json1_1CustomLabels = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1CustomLabel(entry, context);
    });
};
const deserializeAws_json1_1DeleteCollectionResponse = (output, context) => {
    return {
        StatusCode: output.StatusCode !== undefined && output.StatusCode !== null ? output.StatusCode : undefined,
    };
};
const deserializeAws_json1_1DeleteFacesResponse = (output, context) => {
    return {
        DeletedFaces: output.DeletedFaces !== undefined && output.DeletedFaces !== null
            ? deserializeAws_json1_1FaceIdList(output.DeletedFaces, context)
            : undefined,
    };
};
const deserializeAws_json1_1DeleteProjectResponse = (output, context) => {
    return {
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
    };
};
const deserializeAws_json1_1DeleteProjectVersionResponse = (output, context) => {
    return {
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
    };
};
const deserializeAws_json1_1DeleteStreamProcessorResponse = (output, context) => {
    return {};
};
const deserializeAws_json1_1DescribeCollectionResponse = (output, context) => {
    return {
        CollectionARN: output.CollectionARN !== undefined && output.CollectionARN !== null ? output.CollectionARN : undefined,
        CreationTimestamp: output.CreationTimestamp !== undefined && output.CreationTimestamp !== null
            ? new Date(Math.round(output.CreationTimestamp * 1000))
            : undefined,
        FaceCount: output.FaceCount !== undefined && output.FaceCount !== null ? output.FaceCount : undefined,
        FaceModelVersion: output.FaceModelVersion !== undefined && output.FaceModelVersion !== null ? output.FaceModelVersion : undefined,
    };
};
const deserializeAws_json1_1DescribeProjectsResponse = (output, context) => {
    return {
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        ProjectDescriptions: output.ProjectDescriptions !== undefined && output.ProjectDescriptions !== null
            ? deserializeAws_json1_1ProjectDescriptions(output.ProjectDescriptions, context)
            : undefined,
    };
};
const deserializeAws_json1_1DescribeProjectVersionsResponse = (output, context) => {
    return {
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        ProjectVersionDescriptions: output.ProjectVersionDescriptions !== undefined && output.ProjectVersionDescriptions !== null
            ? deserializeAws_json1_1ProjectVersionDescriptions(output.ProjectVersionDescriptions, context)
            : undefined,
    };
};
const deserializeAws_json1_1DescribeStreamProcessorResponse = (output, context) => {
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
const deserializeAws_json1_1DetectCustomLabelsResponse = (output, context) => {
    return {
        CustomLabels: output.CustomLabels !== undefined && output.CustomLabels !== null
            ? deserializeAws_json1_1CustomLabels(output.CustomLabels, context)
            : undefined,
    };
};
const deserializeAws_json1_1DetectFacesResponse = (output, context) => {
    return {
        FaceDetails: output.FaceDetails !== undefined && output.FaceDetails !== null
            ? deserializeAws_json1_1FaceDetailList(output.FaceDetails, context)
            : undefined,
        OrientationCorrection: output.OrientationCorrection !== undefined && output.OrientationCorrection !== null
            ? output.OrientationCorrection
            : undefined,
    };
};
const deserializeAws_json1_1DetectLabelsResponse = (output, context) => {
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
const deserializeAws_json1_1DetectModerationLabelsResponse = (output, context) => {
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
const deserializeAws_json1_1DetectProtectiveEquipmentResponse = (output, context) => {
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
const deserializeAws_json1_1DetectTextResponse = (output, context) => {
    return {
        TextDetections: output.TextDetections !== undefined && output.TextDetections !== null
            ? deserializeAws_json1_1TextDetectionList(output.TextDetections, context)
            : undefined,
        TextModelVersion: output.TextModelVersion !== undefined && output.TextModelVersion !== null ? output.TextModelVersion : undefined,
    };
};
const deserializeAws_json1_1Emotion = (output, context) => {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
const deserializeAws_json1_1Emotions = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Emotion(entry, context);
    });
};
const deserializeAws_json1_1EquipmentDetection = (output, context) => {
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
const deserializeAws_json1_1EquipmentDetections = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1EquipmentDetection(entry, context);
    });
};
const deserializeAws_json1_1EvaluationResult = (output, context) => {
    return {
        F1Score: output.F1Score !== undefined && output.F1Score !== null ? output.F1Score : undefined,
        Summary: output.Summary !== undefined && output.Summary !== null
            ? deserializeAws_json1_1Summary(output.Summary, context)
            : undefined,
    };
};
const deserializeAws_json1_1Eyeglasses = (output, context) => {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
const deserializeAws_json1_1EyeOpen = (output, context) => {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
const deserializeAws_json1_1Face = (output, context) => {
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
const deserializeAws_json1_1FaceDetail = (output, context) => {
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
const deserializeAws_json1_1FaceDetailList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1FaceDetail(entry, context);
    });
};
const deserializeAws_json1_1FaceDetection = (output, context) => {
    return {
        Face: output.Face !== undefined && output.Face !== null
            ? deserializeAws_json1_1FaceDetail(output.Face, context)
            : undefined,
        Timestamp: output.Timestamp !== undefined && output.Timestamp !== null ? output.Timestamp : undefined,
    };
};
const deserializeAws_json1_1FaceDetections = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1FaceDetection(entry, context);
    });
};
const deserializeAws_json1_1FaceIdList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1FaceList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Face(entry, context);
    });
};
const deserializeAws_json1_1FaceMatch = (output, context) => {
    return {
        Face: output.Face !== undefined && output.Face !== null ? deserializeAws_json1_1Face(output.Face, context) : undefined,
        Similarity: output.Similarity !== undefined && output.Similarity !== null ? output.Similarity : undefined,
    };
};
const deserializeAws_json1_1FaceMatchList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1FaceMatch(entry, context);
    });
};
const deserializeAws_json1_1FaceModelVersionList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1FaceRecord = (output, context) => {
    return {
        Face: output.Face !== undefined && output.Face !== null ? deserializeAws_json1_1Face(output.Face, context) : undefined,
        FaceDetail: output.FaceDetail !== undefined && output.FaceDetail !== null
            ? deserializeAws_json1_1FaceDetail(output.FaceDetail, context)
            : undefined,
    };
};
const deserializeAws_json1_1FaceRecordList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1FaceRecord(entry, context);
    });
};
const deserializeAws_json1_1FaceSearchSettings = (output, context) => {
    return {
        CollectionId: output.CollectionId !== undefined && output.CollectionId !== null ? output.CollectionId : undefined,
        FaceMatchThreshold: output.FaceMatchThreshold !== undefined && output.FaceMatchThreshold !== null
            ? output.FaceMatchThreshold
            : undefined,
    };
};
const deserializeAws_json1_1Gender = (output, context) => {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
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
const deserializeAws_json1_1GetCelebrityInfoResponse = (output, context) => {
    return {
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        Urls: output.Urls !== undefined && output.Urls !== null ? deserializeAws_json1_1Urls(output.Urls, context) : undefined,
    };
};
const deserializeAws_json1_1GetCelebrityRecognitionResponse = (output, context) => {
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
const deserializeAws_json1_1GetContentModerationResponse = (output, context) => {
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
const deserializeAws_json1_1GetFaceDetectionResponse = (output, context) => {
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
const deserializeAws_json1_1GetFaceSearchResponse = (output, context) => {
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
const deserializeAws_json1_1GetLabelDetectionResponse = (output, context) => {
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
const deserializeAws_json1_1GetPersonTrackingResponse = (output, context) => {
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
const deserializeAws_json1_1GetSegmentDetectionResponse = (output, context) => {
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
const deserializeAws_json1_1GetTextDetectionResponse = (output, context) => {
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
const deserializeAws_json1_1GroundTruthManifest = (output, context) => {
    return {
        S3Object: output.S3Object !== undefined && output.S3Object !== null
            ? deserializeAws_json1_1S3Object(output.S3Object, context)
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
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
        QuotaCode: output.QuotaCode !== undefined && output.QuotaCode !== null ? output.QuotaCode : undefined,
        ResourceType: output.ResourceType !== undefined && output.ResourceType !== null ? output.ResourceType : undefined,
        ServiceCode: output.ServiceCode !== undefined && output.ServiceCode !== null ? output.ServiceCode : undefined,
    };
};
const deserializeAws_json1_1IdempotentParameterMismatchException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1ImageQuality = (output, context) => {
    return {
        Brightness: output.Brightness !== undefined && output.Brightness !== null ? output.Brightness : undefined,
        Sharpness: output.Sharpness !== undefined && output.Sharpness !== null ? output.Sharpness : undefined,
    };
};
const deserializeAws_json1_1ImageTooLargeException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1IndexFacesResponse = (output, context) => {
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
const deserializeAws_json1_1Instance = (output, context) => {
    return {
        BoundingBox: output.BoundingBox !== undefined && output.BoundingBox !== null
            ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
            : undefined,
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    };
};
const deserializeAws_json1_1Instances = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Instance(entry, context);
    });
};
const deserializeAws_json1_1InternalServerError = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1InvalidImageFormatException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1InvalidPaginationTokenException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1InvalidParameterException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1InvalidS3ObjectException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1KinesisDataStream = (output, context) => {
    return {
        Arn: output.Arn !== undefined && output.Arn !== null ? output.Arn : undefined,
    };
};
const deserializeAws_json1_1KinesisVideoStream = (output, context) => {
    return {
        Arn: output.Arn !== undefined && output.Arn !== null ? output.Arn : undefined,
    };
};
const deserializeAws_json1_1Label = (output, context) => {
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
const deserializeAws_json1_1LabelDetection = (output, context) => {
    return {
        Label: output.Label !== undefined && output.Label !== null
            ? deserializeAws_json1_1Label(output.Label, context)
            : undefined,
        Timestamp: output.Timestamp !== undefined && output.Timestamp !== null ? output.Timestamp : undefined,
    };
};
const deserializeAws_json1_1LabelDetections = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1LabelDetection(entry, context);
    });
};
const deserializeAws_json1_1Labels = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Label(entry, context);
    });
};
const deserializeAws_json1_1Landmark = (output, context) => {
    return {
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
        X: output.X !== undefined && output.X !== null ? output.X : undefined,
        Y: output.Y !== undefined && output.Y !== null ? output.Y : undefined,
    };
};
const deserializeAws_json1_1Landmarks = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Landmark(entry, context);
    });
};
const deserializeAws_json1_1LimitExceededException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1ListCollectionsResponse = (output, context) => {
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
const deserializeAws_json1_1ListFacesResponse = (output, context) => {
    return {
        FaceModelVersion: output.FaceModelVersion !== undefined && output.FaceModelVersion !== null ? output.FaceModelVersion : undefined,
        Faces: output.Faces !== undefined && output.Faces !== null
            ? deserializeAws_json1_1FaceList(output.Faces, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    };
};
const deserializeAws_json1_1ListStreamProcessorsResponse = (output, context) => {
    return {
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        StreamProcessors: output.StreamProcessors !== undefined && output.StreamProcessors !== null
            ? deserializeAws_json1_1StreamProcessorList(output.StreamProcessors, context)
            : undefined,
    };
};
const deserializeAws_json1_1ModerationLabel = (output, context) => {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        ParentName: output.ParentName !== undefined && output.ParentName !== null ? output.ParentName : undefined,
    };
};
const deserializeAws_json1_1ModerationLabels = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ModerationLabel(entry, context);
    });
};
const deserializeAws_json1_1MouthOpen = (output, context) => {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
const deserializeAws_json1_1Mustache = (output, context) => {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
const deserializeAws_json1_1OutputConfig = (output, context) => {
    return {
        S3Bucket: output.S3Bucket !== undefined && output.S3Bucket !== null ? output.S3Bucket : undefined,
        S3KeyPrefix: output.S3KeyPrefix !== undefined && output.S3KeyPrefix !== null ? output.S3KeyPrefix : undefined,
    };
};
const deserializeAws_json1_1Parent = (output, context) => {
    return {
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
    };
};
const deserializeAws_json1_1Parents = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Parent(entry, context);
    });
};
const deserializeAws_json1_1PersonDetail = (output, context) => {
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
const deserializeAws_json1_1PersonDetection = (output, context) => {
    return {
        Person: output.Person !== undefined && output.Person !== null
            ? deserializeAws_json1_1PersonDetail(output.Person, context)
            : undefined,
        Timestamp: output.Timestamp !== undefined && output.Timestamp !== null ? output.Timestamp : undefined,
    };
};
const deserializeAws_json1_1PersonDetections = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1PersonDetection(entry, context);
    });
};
const deserializeAws_json1_1PersonMatch = (output, context) => {
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
const deserializeAws_json1_1PersonMatches = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1PersonMatch(entry, context);
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
const deserializeAws_json1_1Pose = (output, context) => {
    return {
        Pitch: output.Pitch !== undefined && output.Pitch !== null ? output.Pitch : undefined,
        Roll: output.Roll !== undefined && output.Roll !== null ? output.Roll : undefined,
        Yaw: output.Yaw !== undefined && output.Yaw !== null ? output.Yaw : undefined,
    };
};
const deserializeAws_json1_1ProjectDescription = (output, context) => {
    return {
        CreationTimestamp: output.CreationTimestamp !== undefined && output.CreationTimestamp !== null
            ? new Date(Math.round(output.CreationTimestamp * 1000))
            : undefined,
        ProjectArn: output.ProjectArn !== undefined && output.ProjectArn !== null ? output.ProjectArn : undefined,
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
    };
};
const deserializeAws_json1_1ProjectDescriptions = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ProjectDescription(entry, context);
    });
};
const deserializeAws_json1_1ProjectVersionDescription = (output, context) => {
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
const deserializeAws_json1_1ProjectVersionDescriptions = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ProjectVersionDescription(entry, context);
    });
};
const deserializeAws_json1_1ProtectiveEquipmentBodyPart = (output, context) => {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        EquipmentDetections: output.EquipmentDetections !== undefined && output.EquipmentDetections !== null
            ? deserializeAws_json1_1EquipmentDetections(output.EquipmentDetections, context)
            : undefined,
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
    };
};
const deserializeAws_json1_1ProtectiveEquipmentPerson = (output, context) => {
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
const deserializeAws_json1_1ProtectiveEquipmentPersonIds = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1ProtectiveEquipmentPersons = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1ProtectiveEquipmentPerson(entry, context);
    });
};
const deserializeAws_json1_1ProtectiveEquipmentSummary = (output, context) => {
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
const deserializeAws_json1_1ProvisionedThroughputExceededException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1Reasons = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1RecognizeCelebritiesResponse = (output, context) => {
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
const deserializeAws_json1_1ResourceAlreadyExistsException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1ResourceInUseException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1ResourceNotFoundException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1ResourceNotReadyException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1S3Object = (output, context) => {
    return {
        Bucket: output.Bucket !== undefined && output.Bucket !== null ? output.Bucket : undefined,
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        Version: output.Version !== undefined && output.Version !== null ? output.Version : undefined,
    };
};
const deserializeAws_json1_1SearchFacesByImageResponse = (output, context) => {
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
const deserializeAws_json1_1SearchFacesResponse = (output, context) => {
    return {
        FaceMatches: output.FaceMatches !== undefined && output.FaceMatches !== null
            ? deserializeAws_json1_1FaceMatchList(output.FaceMatches, context)
            : undefined,
        FaceModelVersion: output.FaceModelVersion !== undefined && output.FaceModelVersion !== null ? output.FaceModelVersion : undefined,
        SearchedFaceId: output.SearchedFaceId !== undefined && output.SearchedFaceId !== null ? output.SearchedFaceId : undefined,
    };
};
const deserializeAws_json1_1SegmentDetection = (output, context) => {
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
const deserializeAws_json1_1SegmentDetections = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1SegmentDetection(entry, context);
    });
};
const deserializeAws_json1_1SegmentTypeInfo = (output, context) => {
    return {
        ModelVersion: output.ModelVersion !== undefined && output.ModelVersion !== null ? output.ModelVersion : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
const deserializeAws_json1_1SegmentTypesInfo = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1SegmentTypeInfo(entry, context);
    });
};
const deserializeAws_json1_1ServiceQuotaExceededException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1ShotSegment = (output, context) => {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Index: output.Index !== undefined && output.Index !== null ? output.Index : undefined,
    };
};
const deserializeAws_json1_1Smile = (output, context) => {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
const deserializeAws_json1_1StartCelebrityRecognitionResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
    };
};
const deserializeAws_json1_1StartContentModerationResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
    };
};
const deserializeAws_json1_1StartFaceDetectionResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
    };
};
const deserializeAws_json1_1StartFaceSearchResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
    };
};
const deserializeAws_json1_1StartLabelDetectionResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
    };
};
const deserializeAws_json1_1StartPersonTrackingResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
    };
};
const deserializeAws_json1_1StartProjectVersionResponse = (output, context) => {
    return {
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
    };
};
const deserializeAws_json1_1StartSegmentDetectionResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
    };
};
const deserializeAws_json1_1StartStreamProcessorResponse = (output, context) => {
    return {};
};
const deserializeAws_json1_1StartTextDetectionResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
    };
};
const deserializeAws_json1_1StopProjectVersionResponse = (output, context) => {
    return {
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
    };
};
const deserializeAws_json1_1StopStreamProcessorResponse = (output, context) => {
    return {};
};
const deserializeAws_json1_1StreamProcessor = (output, context) => {
    return {
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
    };
};
const deserializeAws_json1_1StreamProcessorInput = (output, context) => {
    return {
        KinesisVideoStream: output.KinesisVideoStream !== undefined && output.KinesisVideoStream !== null
            ? deserializeAws_json1_1KinesisVideoStream(output.KinesisVideoStream, context)
            : undefined,
    };
};
const deserializeAws_json1_1StreamProcessorList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1StreamProcessor(entry, context);
    });
};
const deserializeAws_json1_1StreamProcessorOutput = (output, context) => {
    return {
        KinesisDataStream: output.KinesisDataStream !== undefined && output.KinesisDataStream !== null
            ? deserializeAws_json1_1KinesisDataStream(output.KinesisDataStream, context)
            : undefined,
    };
};
const deserializeAws_json1_1StreamProcessorSettings = (output, context) => {
    return {
        FaceSearch: output.FaceSearch !== undefined && output.FaceSearch !== null
            ? deserializeAws_json1_1FaceSearchSettings(output.FaceSearch, context)
            : undefined,
    };
};
const deserializeAws_json1_1Summary = (output, context) => {
    return {
        S3Object: output.S3Object !== undefined && output.S3Object !== null
            ? deserializeAws_json1_1S3Object(output.S3Object, context)
            : undefined,
    };
};
const deserializeAws_json1_1Sunglasses = (output, context) => {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
const deserializeAws_json1_1TechnicalCueSegment = (output, context) => {
    return {
        Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
const deserializeAws_json1_1TestingData = (output, context) => {
    return {
        Assets: output.Assets !== undefined && output.Assets !== null
            ? deserializeAws_json1_1Assets(output.Assets, context)
            : undefined,
        AutoCreate: output.AutoCreate !== undefined && output.AutoCreate !== null ? output.AutoCreate : undefined,
    };
};
const deserializeAws_json1_1TestingDataResult = (output, context) => {
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
const deserializeAws_json1_1TextDetection = (output, context) => {
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
const deserializeAws_json1_1TextDetectionList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1TextDetection(entry, context);
    });
};
const deserializeAws_json1_1TextDetectionResult = (output, context) => {
    return {
        TextDetection: output.TextDetection !== undefined && output.TextDetection !== null
            ? deserializeAws_json1_1TextDetection(output.TextDetection, context)
            : undefined,
        Timestamp: output.Timestamp !== undefined && output.Timestamp !== null ? output.Timestamp : undefined,
    };
};
const deserializeAws_json1_1TextDetectionResults = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1TextDetectionResult(entry, context);
    });
};
const deserializeAws_json1_1ThrottlingException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1TrainingData = (output, context) => {
    return {
        Assets: output.Assets !== undefined && output.Assets !== null
            ? deserializeAws_json1_1Assets(output.Assets, context)
            : undefined,
    };
};
const deserializeAws_json1_1TrainingDataResult = (output, context) => {
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
const deserializeAws_json1_1UnindexedFace = (output, context) => {
    return {
        FaceDetail: output.FaceDetail !== undefined && output.FaceDetail !== null
            ? deserializeAws_json1_1FaceDetail(output.FaceDetail, context)
            : undefined,
        Reasons: output.Reasons !== undefined && output.Reasons !== null
            ? deserializeAws_json1_1Reasons(output.Reasons, context)
            : undefined,
    };
};
const deserializeAws_json1_1UnindexedFaces = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1UnindexedFace(entry, context);
    });
};
const deserializeAws_json1_1Urls = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1ValidationData = (output, context) => {
    return {
        Assets: output.Assets !== undefined && output.Assets !== null
            ? deserializeAws_json1_1Assets(output.Assets, context)
            : undefined,
    };
};
const deserializeAws_json1_1VideoMetadata = (output, context) => {
    return {
        Codec: output.Codec !== undefined && output.Codec !== null ? output.Codec : undefined,
        DurationMillis: output.DurationMillis !== undefined && output.DurationMillis !== null ? output.DurationMillis : undefined,
        Format: output.Format !== undefined && output.Format !== null ? output.Format : undefined,
        FrameHeight: output.FrameHeight !== undefined && output.FrameHeight !== null ? output.FrameHeight : undefined,
        FrameRate: output.FrameRate !== undefined && output.FrameRate !== null ? output.FrameRate : undefined,
        FrameWidth: output.FrameWidth !== undefined && output.FrameWidth !== null ? output.FrameWidth : undefined,
    };
};
const deserializeAws_json1_1VideoMetadataList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1VideoMetadata(entry, context);
    });
};
const deserializeAws_json1_1VideoTooLargeException = (output, context) => {
    return {
        Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
        Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
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
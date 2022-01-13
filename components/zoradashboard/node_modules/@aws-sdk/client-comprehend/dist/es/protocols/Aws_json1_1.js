import { __assign, __awaiter, __generator } from "tslib";
import { HttpRequest as __HttpRequest } from "@aws-sdk/protocol-http";
import { v4 as generateIdempotencyToken } from "uuid";
export var serializeAws_json1_1BatchDetectDominantLanguageCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.BatchDetectDominantLanguage",
        };
        body = JSON.stringify(serializeAws_json1_1BatchDetectDominantLanguageRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1BatchDetectEntitiesCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.BatchDetectEntities",
        };
        body = JSON.stringify(serializeAws_json1_1BatchDetectEntitiesRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1BatchDetectKeyPhrasesCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.BatchDetectKeyPhrases",
        };
        body = JSON.stringify(serializeAws_json1_1BatchDetectKeyPhrasesRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1BatchDetectSentimentCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.BatchDetectSentiment",
        };
        body = JSON.stringify(serializeAws_json1_1BatchDetectSentimentRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1BatchDetectSyntaxCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.BatchDetectSyntax",
        };
        body = JSON.stringify(serializeAws_json1_1BatchDetectSyntaxRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1ClassifyDocumentCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.ClassifyDocument",
        };
        body = JSON.stringify(serializeAws_json1_1ClassifyDocumentRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1CreateDocumentClassifierCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.CreateDocumentClassifier",
        };
        body = JSON.stringify(serializeAws_json1_1CreateDocumentClassifierRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1CreateEndpointCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.CreateEndpoint",
        };
        body = JSON.stringify(serializeAws_json1_1CreateEndpointRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1CreateEntityRecognizerCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.CreateEntityRecognizer",
        };
        body = JSON.stringify(serializeAws_json1_1CreateEntityRecognizerRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DeleteDocumentClassifierCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.DeleteDocumentClassifier",
        };
        body = JSON.stringify(serializeAws_json1_1DeleteDocumentClassifierRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DeleteEndpointCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.DeleteEndpoint",
        };
        body = JSON.stringify(serializeAws_json1_1DeleteEndpointRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DeleteEntityRecognizerCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.DeleteEntityRecognizer",
        };
        body = JSON.stringify(serializeAws_json1_1DeleteEntityRecognizerRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DescribeDocumentClassificationJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.DescribeDocumentClassificationJob",
        };
        body = JSON.stringify(serializeAws_json1_1DescribeDocumentClassificationJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DescribeDocumentClassifierCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.DescribeDocumentClassifier",
        };
        body = JSON.stringify(serializeAws_json1_1DescribeDocumentClassifierRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DescribeDominantLanguageDetectionJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.DescribeDominantLanguageDetectionJob",
        };
        body = JSON.stringify(serializeAws_json1_1DescribeDominantLanguageDetectionJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DescribeEndpointCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.DescribeEndpoint",
        };
        body = JSON.stringify(serializeAws_json1_1DescribeEndpointRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DescribeEntitiesDetectionJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.DescribeEntitiesDetectionJob",
        };
        body = JSON.stringify(serializeAws_json1_1DescribeEntitiesDetectionJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DescribeEntityRecognizerCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.DescribeEntityRecognizer",
        };
        body = JSON.stringify(serializeAws_json1_1DescribeEntityRecognizerRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DescribeEventsDetectionJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.DescribeEventsDetectionJob",
        };
        body = JSON.stringify(serializeAws_json1_1DescribeEventsDetectionJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DescribeKeyPhrasesDetectionJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.DescribeKeyPhrasesDetectionJob",
        };
        body = JSON.stringify(serializeAws_json1_1DescribeKeyPhrasesDetectionJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DescribePiiEntitiesDetectionJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.DescribePiiEntitiesDetectionJob",
        };
        body = JSON.stringify(serializeAws_json1_1DescribePiiEntitiesDetectionJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DescribeSentimentDetectionJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.DescribeSentimentDetectionJob",
        };
        body = JSON.stringify(serializeAws_json1_1DescribeSentimentDetectionJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DescribeTopicsDetectionJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.DescribeTopicsDetectionJob",
        };
        body = JSON.stringify(serializeAws_json1_1DescribeTopicsDetectionJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DetectDominantLanguageCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.DetectDominantLanguage",
        };
        body = JSON.stringify(serializeAws_json1_1DetectDominantLanguageRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DetectEntitiesCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.DetectEntities",
        };
        body = JSON.stringify(serializeAws_json1_1DetectEntitiesRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DetectKeyPhrasesCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.DetectKeyPhrases",
        };
        body = JSON.stringify(serializeAws_json1_1DetectKeyPhrasesRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DetectPiiEntitiesCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.DetectPiiEntities",
        };
        body = JSON.stringify(serializeAws_json1_1DetectPiiEntitiesRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DetectSentimentCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.DetectSentiment",
        };
        body = JSON.stringify(serializeAws_json1_1DetectSentimentRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1DetectSyntaxCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.DetectSyntax",
        };
        body = JSON.stringify(serializeAws_json1_1DetectSyntaxRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1ListDocumentClassificationJobsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.ListDocumentClassificationJobs",
        };
        body = JSON.stringify(serializeAws_json1_1ListDocumentClassificationJobsRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1ListDocumentClassifiersCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.ListDocumentClassifiers",
        };
        body = JSON.stringify(serializeAws_json1_1ListDocumentClassifiersRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1ListDominantLanguageDetectionJobsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.ListDominantLanguageDetectionJobs",
        };
        body = JSON.stringify(serializeAws_json1_1ListDominantLanguageDetectionJobsRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1ListEndpointsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.ListEndpoints",
        };
        body = JSON.stringify(serializeAws_json1_1ListEndpointsRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1ListEntitiesDetectionJobsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.ListEntitiesDetectionJobs",
        };
        body = JSON.stringify(serializeAws_json1_1ListEntitiesDetectionJobsRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1ListEntityRecognizersCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.ListEntityRecognizers",
        };
        body = JSON.stringify(serializeAws_json1_1ListEntityRecognizersRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1ListEventsDetectionJobsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.ListEventsDetectionJobs",
        };
        body = JSON.stringify(serializeAws_json1_1ListEventsDetectionJobsRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1ListKeyPhrasesDetectionJobsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.ListKeyPhrasesDetectionJobs",
        };
        body = JSON.stringify(serializeAws_json1_1ListKeyPhrasesDetectionJobsRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1ListPiiEntitiesDetectionJobsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.ListPiiEntitiesDetectionJobs",
        };
        body = JSON.stringify(serializeAws_json1_1ListPiiEntitiesDetectionJobsRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1ListSentimentDetectionJobsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.ListSentimentDetectionJobs",
        };
        body = JSON.stringify(serializeAws_json1_1ListSentimentDetectionJobsRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1ListTagsForResourceCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.ListTagsForResource",
        };
        body = JSON.stringify(serializeAws_json1_1ListTagsForResourceRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1ListTopicsDetectionJobsCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.ListTopicsDetectionJobs",
        };
        body = JSON.stringify(serializeAws_json1_1ListTopicsDetectionJobsRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartDocumentClassificationJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.StartDocumentClassificationJob",
        };
        body = JSON.stringify(serializeAws_json1_1StartDocumentClassificationJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartDominantLanguageDetectionJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.StartDominantLanguageDetectionJob",
        };
        body = JSON.stringify(serializeAws_json1_1StartDominantLanguageDetectionJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartEntitiesDetectionJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.StartEntitiesDetectionJob",
        };
        body = JSON.stringify(serializeAws_json1_1StartEntitiesDetectionJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartEventsDetectionJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.StartEventsDetectionJob",
        };
        body = JSON.stringify(serializeAws_json1_1StartEventsDetectionJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartKeyPhrasesDetectionJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.StartKeyPhrasesDetectionJob",
        };
        body = JSON.stringify(serializeAws_json1_1StartKeyPhrasesDetectionJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartPiiEntitiesDetectionJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.StartPiiEntitiesDetectionJob",
        };
        body = JSON.stringify(serializeAws_json1_1StartPiiEntitiesDetectionJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartSentimentDetectionJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.StartSentimentDetectionJob",
        };
        body = JSON.stringify(serializeAws_json1_1StartSentimentDetectionJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StartTopicsDetectionJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.StartTopicsDetectionJob",
        };
        body = JSON.stringify(serializeAws_json1_1StartTopicsDetectionJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StopDominantLanguageDetectionJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.StopDominantLanguageDetectionJob",
        };
        body = JSON.stringify(serializeAws_json1_1StopDominantLanguageDetectionJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StopEntitiesDetectionJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.StopEntitiesDetectionJob",
        };
        body = JSON.stringify(serializeAws_json1_1StopEntitiesDetectionJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StopEventsDetectionJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.StopEventsDetectionJob",
        };
        body = JSON.stringify(serializeAws_json1_1StopEventsDetectionJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StopKeyPhrasesDetectionJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.StopKeyPhrasesDetectionJob",
        };
        body = JSON.stringify(serializeAws_json1_1StopKeyPhrasesDetectionJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StopPiiEntitiesDetectionJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.StopPiiEntitiesDetectionJob",
        };
        body = JSON.stringify(serializeAws_json1_1StopPiiEntitiesDetectionJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StopSentimentDetectionJobCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.StopSentimentDetectionJob",
        };
        body = JSON.stringify(serializeAws_json1_1StopSentimentDetectionJobRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StopTrainingDocumentClassifierCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.StopTrainingDocumentClassifier",
        };
        body = JSON.stringify(serializeAws_json1_1StopTrainingDocumentClassifierRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1StopTrainingEntityRecognizerCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.StopTrainingEntityRecognizer",
        };
        body = JSON.stringify(serializeAws_json1_1StopTrainingEntityRecognizerRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1TagResourceCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.TagResource",
        };
        body = JSON.stringify(serializeAws_json1_1TagResourceRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1UntagResourceCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.UntagResource",
        };
        body = JSON.stringify(serializeAws_json1_1UntagResourceRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var serializeAws_json1_1UpdateEndpointCommand = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, body;
    return __generator(this, function (_a) {
        headers = {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "Comprehend_20171127.UpdateEndpoint",
        };
        body = JSON.stringify(serializeAws_json1_1UpdateEndpointRequest(input, context));
        return [2 /*return*/, buildHttpRpcRequest(context, headers, "/", undefined, body)];
    });
}); };
export var deserializeAws_json1_1BatchDetectDominantLanguageCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1BatchDetectDominantLanguageCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1BatchDetectDominantLanguageResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1BatchDetectDominantLanguageCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "BatchSizeLimitExceededException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#BatchSizeLimitExceededException": return [3 /*break*/, 2];
                    case "InternalServerException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 4];
                    case "InvalidRequestException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 6];
                    case "TextSizeLimitExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TextSizeLimitExceededException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1BatchSizeLimitExceededExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1BatchDetectEntitiesCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1BatchDetectEntitiesCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1BatchDetectEntitiesResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1BatchDetectEntitiesCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "BatchSizeLimitExceededException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#BatchSizeLimitExceededException": return [3 /*break*/, 2];
                    case "InternalServerException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 4];
                    case "InvalidRequestException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 6];
                    case "TextSizeLimitExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TextSizeLimitExceededException": return [3 /*break*/, 8];
                    case "UnsupportedLanguageException": return [3 /*break*/, 10];
                    case "com.amazonaws.comprehend#UnsupportedLanguageException": return [3 /*break*/, 10];
                }
                return [3 /*break*/, 12];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1BatchSizeLimitExceededExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1BatchDetectKeyPhrasesCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1BatchDetectKeyPhrasesCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1BatchDetectKeyPhrasesResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1BatchDetectKeyPhrasesCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "BatchSizeLimitExceededException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#BatchSizeLimitExceededException": return [3 /*break*/, 2];
                    case "InternalServerException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 4];
                    case "InvalidRequestException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 6];
                    case "TextSizeLimitExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TextSizeLimitExceededException": return [3 /*break*/, 8];
                    case "UnsupportedLanguageException": return [3 /*break*/, 10];
                    case "com.amazonaws.comprehend#UnsupportedLanguageException": return [3 /*break*/, 10];
                }
                return [3 /*break*/, 12];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1BatchSizeLimitExceededExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1BatchDetectSentimentCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1BatchDetectSentimentCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1BatchDetectSentimentResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1BatchDetectSentimentCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "BatchSizeLimitExceededException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#BatchSizeLimitExceededException": return [3 /*break*/, 2];
                    case "InternalServerException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 4];
                    case "InvalidRequestException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 6];
                    case "TextSizeLimitExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TextSizeLimitExceededException": return [3 /*break*/, 8];
                    case "UnsupportedLanguageException": return [3 /*break*/, 10];
                    case "com.amazonaws.comprehend#UnsupportedLanguageException": return [3 /*break*/, 10];
                }
                return [3 /*break*/, 12];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1BatchSizeLimitExceededExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1BatchDetectSyntaxCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1BatchDetectSyntaxCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1BatchDetectSyntaxResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1BatchDetectSyntaxCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "BatchSizeLimitExceededException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#BatchSizeLimitExceededException": return [3 /*break*/, 2];
                    case "InternalServerException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 4];
                    case "InvalidRequestException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 6];
                    case "TextSizeLimitExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TextSizeLimitExceededException": return [3 /*break*/, 8];
                    case "UnsupportedLanguageException": return [3 /*break*/, 10];
                    case "com.amazonaws.comprehend#UnsupportedLanguageException": return [3 /*break*/, 10];
                }
                return [3 /*break*/, 12];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1BatchSizeLimitExceededExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1ClassifyDocumentCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1ClassifyDocumentCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1ClassifyDocumentResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1ClassifyDocumentCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "ResourceUnavailableException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#ResourceUnavailableException": return [3 /*break*/, 6];
                    case "TextSizeLimitExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TextSizeLimitExceededException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceUnavailableExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1CreateDocumentClassifierCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1CreateDocumentClassifierCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1CreateDocumentClassifierResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1CreateDocumentClassifierCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "KmsKeyValidationException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#KmsKeyValidationException": return [3 /*break*/, 6];
                    case "ResourceInUseException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#ResourceInUseException": return [3 /*break*/, 8];
                    case "ResourceLimitExceededException": return [3 /*break*/, 10];
                    case "com.amazonaws.comprehend#ResourceLimitExceededException": return [3 /*break*/, 10];
                    case "TooManyRequestsException": return [3 /*break*/, 12];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 12];
                    case "TooManyTagsException": return [3 /*break*/, 14];
                    case "com.amazonaws.comprehend#TooManyTagsException": return [3 /*break*/, 14];
                    case "UnsupportedLanguageException": return [3 /*break*/, 16];
                    case "com.amazonaws.comprehend#UnsupportedLanguageException": return [3 /*break*/, 16];
                }
                return [3 /*break*/, 18];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1KmsKeyValidationExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceLimitExceededExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyTagsExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 16:
                _k = [{}];
                return [4 /*yield*/, deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1CreateEndpointCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1CreateEndpointCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1CreateEndpointResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1CreateEndpointCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "ResourceInUseException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#ResourceInUseException": return [3 /*break*/, 6];
                    case "ResourceLimitExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#ResourceLimitExceededException": return [3 /*break*/, 8];
                    case "ResourceNotFoundException": return [3 /*break*/, 10];
                    case "com.amazonaws.comprehend#ResourceNotFoundException": return [3 /*break*/, 10];
                    case "ResourceUnavailableException": return [3 /*break*/, 12];
                    case "com.amazonaws.comprehend#ResourceUnavailableException": return [3 /*break*/, 12];
                    case "TooManyRequestsException": return [3 /*break*/, 14];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 14];
                    case "TooManyTagsException": return [3 /*break*/, 16];
                    case "com.amazonaws.comprehend#TooManyTagsException": return [3 /*break*/, 16];
                }
                return [3 /*break*/, 18];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceLimitExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceUnavailableExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 16:
                _k = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyTagsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1CreateEntityRecognizerCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1CreateEntityRecognizerCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1CreateEntityRecognizerResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1CreateEntityRecognizerCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "KmsKeyValidationException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#KmsKeyValidationException": return [3 /*break*/, 6];
                    case "ResourceInUseException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#ResourceInUseException": return [3 /*break*/, 8];
                    case "ResourceLimitExceededException": return [3 /*break*/, 10];
                    case "com.amazonaws.comprehend#ResourceLimitExceededException": return [3 /*break*/, 10];
                    case "TooManyRequestsException": return [3 /*break*/, 12];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 12];
                    case "TooManyTagsException": return [3 /*break*/, 14];
                    case "com.amazonaws.comprehend#TooManyTagsException": return [3 /*break*/, 14];
                    case "UnsupportedLanguageException": return [3 /*break*/, 16];
                    case "com.amazonaws.comprehend#UnsupportedLanguageException": return [3 /*break*/, 16];
                }
                return [3 /*break*/, 18];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1KmsKeyValidationExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceLimitExceededExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyTagsExceptionResponse(parsedOutput, context)];
            case 15:
                response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([(_m.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 19];
            case 16:
                _k = [{}];
                return [4 /*yield*/, deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DeleteDocumentClassifierCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DeleteDocumentClassifierCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DeleteDocumentClassifierResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DeleteDocumentClassifierCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "ResourceInUseException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#ResourceInUseException": return [3 /*break*/, 6];
                    case "ResourceNotFoundException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#ResourceNotFoundException": return [3 /*break*/, 8];
                    case "ResourceUnavailableException": return [3 /*break*/, 10];
                    case "com.amazonaws.comprehend#ResourceUnavailableException": return [3 /*break*/, 10];
                    case "TooManyRequestsException": return [3 /*break*/, 12];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 12];
                }
                return [3 /*break*/, 14];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceUnavailableExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DeleteEndpointCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DeleteEndpointCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DeleteEndpointResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DeleteEndpointCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "ResourceInUseException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#ResourceInUseException": return [3 /*break*/, 6];
                    case "ResourceNotFoundException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#ResourceNotFoundException": return [3 /*break*/, 8];
                    case "TooManyRequestsException": return [3 /*break*/, 10];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 10];
                }
                return [3 /*break*/, 12];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DeleteEntityRecognizerCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DeleteEntityRecognizerCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DeleteEntityRecognizerResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DeleteEntityRecognizerCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "ResourceInUseException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#ResourceInUseException": return [3 /*break*/, 6];
                    case "ResourceNotFoundException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#ResourceNotFoundException": return [3 /*break*/, 8];
                    case "ResourceUnavailableException": return [3 /*break*/, 10];
                    case "com.amazonaws.comprehend#ResourceUnavailableException": return [3 /*break*/, 10];
                    case "TooManyRequestsException": return [3 /*break*/, 12];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 12];
                }
                return [3 /*break*/, 14];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceUnavailableExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DescribeDocumentClassificationJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DescribeDocumentClassificationJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DescribeDocumentClassificationJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DescribeDocumentClassificationJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "JobNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#JobNotFoundException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DescribeDocumentClassifierCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DescribeDocumentClassifierCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DescribeDocumentClassifierResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DescribeDocumentClassifierCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "ResourceNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#ResourceNotFoundException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DescribeDominantLanguageDetectionJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DescribeDominantLanguageDetectionJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DescribeDominantLanguageDetectionJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DescribeDominantLanguageDetectionJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "JobNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#JobNotFoundException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DescribeEndpointCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DescribeEndpointCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DescribeEndpointResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DescribeEndpointCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "ResourceNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#ResourceNotFoundException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DescribeEntitiesDetectionJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DescribeEntitiesDetectionJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DescribeEntitiesDetectionJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DescribeEntitiesDetectionJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "JobNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#JobNotFoundException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DescribeEntityRecognizerCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DescribeEntityRecognizerCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DescribeEntityRecognizerResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DescribeEntityRecognizerCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "ResourceNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#ResourceNotFoundException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DescribeEventsDetectionJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DescribeEventsDetectionJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DescribeEventsDetectionJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DescribeEventsDetectionJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "JobNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#JobNotFoundException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DescribeKeyPhrasesDetectionJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DescribeKeyPhrasesDetectionJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DescribeKeyPhrasesDetectionJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DescribeKeyPhrasesDetectionJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "JobNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#JobNotFoundException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DescribePiiEntitiesDetectionJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DescribePiiEntitiesDetectionJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DescribePiiEntitiesDetectionJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DescribePiiEntitiesDetectionJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "JobNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#JobNotFoundException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DescribeSentimentDetectionJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DescribeSentimentDetectionJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DescribeSentimentDetectionJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DescribeSentimentDetectionJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "JobNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#JobNotFoundException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DescribeTopicsDetectionJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DescribeTopicsDetectionJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DescribeTopicsDetectionJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DescribeTopicsDetectionJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "JobNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#JobNotFoundException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DetectDominantLanguageCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DetectDominantLanguageCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DetectDominantLanguageResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DetectDominantLanguageCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "TextSizeLimitExceededException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#TextSizeLimitExceededException": return [3 /*break*/, 6];
                }
                return [3 /*break*/, 8];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_g.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 9];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_g.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 9];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DetectEntitiesCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DetectEntitiesCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DetectEntitiesResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DetectEntitiesCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "ResourceUnavailableException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#ResourceUnavailableException": return [3 /*break*/, 6];
                    case "TextSizeLimitExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TextSizeLimitExceededException": return [3 /*break*/, 8];
                    case "UnsupportedLanguageException": return [3 /*break*/, 10];
                    case "com.amazonaws.comprehend#UnsupportedLanguageException": return [3 /*break*/, 10];
                }
                return [3 /*break*/, 12];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceUnavailableExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DetectKeyPhrasesCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DetectKeyPhrasesCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DetectKeyPhrasesResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DetectKeyPhrasesCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "TextSizeLimitExceededException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#TextSizeLimitExceededException": return [3 /*break*/, 6];
                    case "UnsupportedLanguageException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#UnsupportedLanguageException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DetectPiiEntitiesCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DetectPiiEntitiesCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DetectPiiEntitiesResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DetectPiiEntitiesCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "TextSizeLimitExceededException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#TextSizeLimitExceededException": return [3 /*break*/, 6];
                    case "UnsupportedLanguageException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#UnsupportedLanguageException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DetectSentimentCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DetectSentimentCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DetectSentimentResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DetectSentimentCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "TextSizeLimitExceededException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#TextSizeLimitExceededException": return [3 /*break*/, 6];
                    case "UnsupportedLanguageException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#UnsupportedLanguageException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1DetectSyntaxCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1DetectSyntaxCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1DetectSyntaxResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1DetectSyntaxCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "TextSizeLimitExceededException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#TextSizeLimitExceededException": return [3 /*break*/, 6];
                    case "UnsupportedLanguageException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#UnsupportedLanguageException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1ListDocumentClassificationJobsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1ListDocumentClassificationJobsCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1ListDocumentClassificationJobsResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1ListDocumentClassificationJobsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidFilterException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidFilterException": return [3 /*break*/, 4];
                    case "InvalidRequestException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1ListDocumentClassifiersCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1ListDocumentClassifiersCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1ListDocumentClassifiersResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1ListDocumentClassifiersCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidFilterException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidFilterException": return [3 /*break*/, 4];
                    case "InvalidRequestException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1ListDominantLanguageDetectionJobsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1ListDominantLanguageDetectionJobsCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1ListDominantLanguageDetectionJobsResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1ListDominantLanguageDetectionJobsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidFilterException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidFilterException": return [3 /*break*/, 4];
                    case "InvalidRequestException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1ListEndpointsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1ListEndpointsCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1ListEndpointsResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1ListEndpointsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "TooManyRequestsException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 6];
                }
                return [3 /*break*/, 8];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_g.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 9];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_g.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 9];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1ListEntitiesDetectionJobsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1ListEntitiesDetectionJobsCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1ListEntitiesDetectionJobsResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1ListEntitiesDetectionJobsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidFilterException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidFilterException": return [3 /*break*/, 4];
                    case "InvalidRequestException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1ListEntityRecognizersCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1ListEntityRecognizersCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1ListEntityRecognizersResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1ListEntityRecognizersCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidFilterException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidFilterException": return [3 /*break*/, 4];
                    case "InvalidRequestException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1ListEventsDetectionJobsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1ListEventsDetectionJobsCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1ListEventsDetectionJobsResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1ListEventsDetectionJobsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidFilterException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidFilterException": return [3 /*break*/, 4];
                    case "InvalidRequestException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1ListKeyPhrasesDetectionJobsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1ListKeyPhrasesDetectionJobsCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1ListKeyPhrasesDetectionJobsResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1ListKeyPhrasesDetectionJobsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidFilterException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidFilterException": return [3 /*break*/, 4];
                    case "InvalidRequestException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1ListPiiEntitiesDetectionJobsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1ListPiiEntitiesDetectionJobsCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1ListPiiEntitiesDetectionJobsResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1ListPiiEntitiesDetectionJobsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidFilterException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidFilterException": return [3 /*break*/, 4];
                    case "InvalidRequestException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1ListSentimentDetectionJobsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1ListSentimentDetectionJobsCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1ListSentimentDetectionJobsResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1ListSentimentDetectionJobsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidFilterException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidFilterException": return [3 /*break*/, 4];
                    case "InvalidRequestException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1ListTagsForResourceCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1ListTagsForResourceCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1ListTagsForResourceResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1ListTagsForResourceCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "ResourceNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#ResourceNotFoundException": return [3 /*break*/, 6];
                }
                return [3 /*break*/, 8];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_g.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 9];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1ListTopicsDetectionJobsCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1ListTopicsDetectionJobsCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1ListTopicsDetectionJobsResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1ListTopicsDetectionJobsCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidFilterException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidFilterException": return [3 /*break*/, 4];
                    case "InvalidRequestException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StartDocumentClassificationJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartDocumentClassificationJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartDocumentClassificationJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartDocumentClassificationJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "KmsKeyValidationException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#KmsKeyValidationException": return [3 /*break*/, 6];
                    case "ResourceNotFoundException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#ResourceNotFoundException": return [3 /*break*/, 8];
                    case "ResourceUnavailableException": return [3 /*break*/, 10];
                    case "com.amazonaws.comprehend#ResourceUnavailableException": return [3 /*break*/, 10];
                    case "TooManyRequestsException": return [3 /*break*/, 12];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 12];
                }
                return [3 /*break*/, 14];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1KmsKeyValidationExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceUnavailableExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StartDominantLanguageDetectionJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartDominantLanguageDetectionJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartDominantLanguageDetectionJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartDominantLanguageDetectionJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "KmsKeyValidationException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#KmsKeyValidationException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1KmsKeyValidationExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StartEntitiesDetectionJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartEntitiesDetectionJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartEntitiesDetectionJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartEntitiesDetectionJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "KmsKeyValidationException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#KmsKeyValidationException": return [3 /*break*/, 6];
                    case "ResourceNotFoundException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#ResourceNotFoundException": return [3 /*break*/, 8];
                    case "ResourceUnavailableException": return [3 /*break*/, 10];
                    case "com.amazonaws.comprehend#ResourceUnavailableException": return [3 /*break*/, 10];
                    case "TooManyRequestsException": return [3 /*break*/, 12];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 12];
                }
                return [3 /*break*/, 14];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1KmsKeyValidationExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceUnavailableExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_k.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 15];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StartEventsDetectionJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartEventsDetectionJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartEventsDetectionJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartEventsDetectionJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "KmsKeyValidationException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#KmsKeyValidationException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1KmsKeyValidationExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StartKeyPhrasesDetectionJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartKeyPhrasesDetectionJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartKeyPhrasesDetectionJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartKeyPhrasesDetectionJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "KmsKeyValidationException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#KmsKeyValidationException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1KmsKeyValidationExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StartPiiEntitiesDetectionJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartPiiEntitiesDetectionJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartPiiEntitiesDetectionJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartPiiEntitiesDetectionJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "KmsKeyValidationException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#KmsKeyValidationException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1KmsKeyValidationExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StartSentimentDetectionJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartSentimentDetectionJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartSentimentDetectionJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartSentimentDetectionJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "KmsKeyValidationException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#KmsKeyValidationException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1KmsKeyValidationExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StartTopicsDetectionJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StartTopicsDetectionJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StartTopicsDetectionJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StartTopicsDetectionJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "KmsKeyValidationException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#KmsKeyValidationException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1KmsKeyValidationExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StopDominantLanguageDetectionJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StopDominantLanguageDetectionJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StopDominantLanguageDetectionJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StopDominantLanguageDetectionJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "JobNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#JobNotFoundException": return [3 /*break*/, 6];
                }
                return [3 /*break*/, 8];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_g.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 9];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_g.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 9];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StopEntitiesDetectionJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StopEntitiesDetectionJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StopEntitiesDetectionJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StopEntitiesDetectionJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "JobNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#JobNotFoundException": return [3 /*break*/, 6];
                }
                return [3 /*break*/, 8];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_g.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 9];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_g.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 9];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StopEventsDetectionJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StopEventsDetectionJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StopEventsDetectionJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StopEventsDetectionJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "JobNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#JobNotFoundException": return [3 /*break*/, 6];
                }
                return [3 /*break*/, 8];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_g.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 9];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_g.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 9];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StopKeyPhrasesDetectionJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StopKeyPhrasesDetectionJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StopKeyPhrasesDetectionJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StopKeyPhrasesDetectionJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "JobNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#JobNotFoundException": return [3 /*break*/, 6];
                }
                return [3 /*break*/, 8];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_g.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 9];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_g.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 9];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StopPiiEntitiesDetectionJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StopPiiEntitiesDetectionJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StopPiiEntitiesDetectionJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StopPiiEntitiesDetectionJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "JobNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#JobNotFoundException": return [3 /*break*/, 6];
                }
                return [3 /*break*/, 8];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_g.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 9];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_g.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 9];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StopSentimentDetectionJobCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StopSentimentDetectionJobCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StopSentimentDetectionJobResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StopSentimentDetectionJobCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "JobNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#JobNotFoundException": return [3 /*break*/, 6];
                }
                return [3 /*break*/, 8];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_g.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 9];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_g.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 9];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StopTrainingDocumentClassifierCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StopTrainingDocumentClassifierCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StopTrainingDocumentClassifierResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StopTrainingDocumentClassifierCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "ResourceNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#ResourceNotFoundException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1StopTrainingEntityRecognizerCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1StopTrainingEntityRecognizerCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1StopTrainingEntityRecognizerResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1StopTrainingEntityRecognizerCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "ResourceNotFoundException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#ResourceNotFoundException": return [3 /*break*/, 6];
                    case "TooManyRequestsException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_h.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 11];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
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
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1TagResourceCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1TagResourceCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1TagResourceResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1TagResourceCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "ConcurrentModificationException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#ConcurrentModificationException": return [3 /*break*/, 2];
                    case "InternalServerException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 4];
                    case "InvalidRequestException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 6];
                    case "ResourceNotFoundException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#ResourceNotFoundException": return [3 /*break*/, 8];
                    case "TooManyTagsException": return [3 /*break*/, 10];
                    case "com.amazonaws.comprehend#TooManyTagsException": return [3 /*break*/, 10];
                }
                return [3 /*break*/, 12];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ConcurrentModificationExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyTagsExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1UntagResourceCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1UntagResourceCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1UntagResourceResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1UntagResourceCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "ConcurrentModificationException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#ConcurrentModificationException": return [3 /*break*/, 2];
                    case "InternalServerException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 4];
                    case "InvalidRequestException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 6];
                    case "ResourceNotFoundException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#ResourceNotFoundException": return [3 /*break*/, 8];
                    case "TooManyTagKeysException": return [3 /*break*/, 10];
                    case "com.amazonaws.comprehend#TooManyTagKeysException": return [3 /*break*/, 10];
                }
                return [3 /*break*/, 12];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ConcurrentModificationExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_j.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 13];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyTagKeysExceptionResponse(parsedOutput, context)];
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
export var deserializeAws_json1_1UpdateEndpointCommand = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contents, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (output.statusCode >= 300) {
                    return [2 /*return*/, deserializeAws_json1_1UpdateEndpointCommandError(output, context)];
                }
                return [4 /*yield*/, parseBody(output.body, context)];
            case 1:
                data = _a.sent();
                contents = {};
                contents = deserializeAws_json1_1UpdateEndpointResponse(data, context);
                response = __assign({ $metadata: deserializeMetadata(output) }, contents);
                return [2 /*return*/, Promise.resolve(response)];
        }
    });
}); };
var deserializeAws_json1_1UpdateEndpointCommandError = function (output, context) { return __awaiter(void 0, void 0, void 0, function () {
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
                    case "InternalServerException": return [3 /*break*/, 2];
                    case "com.amazonaws.comprehend#InternalServerException": return [3 /*break*/, 2];
                    case "InvalidRequestException": return [3 /*break*/, 4];
                    case "com.amazonaws.comprehend#InvalidRequestException": return [3 /*break*/, 4];
                    case "ResourceInUseException": return [3 /*break*/, 6];
                    case "com.amazonaws.comprehend#ResourceInUseException": return [3 /*break*/, 6];
                    case "ResourceLimitExceededException": return [3 /*break*/, 8];
                    case "com.amazonaws.comprehend#ResourceLimitExceededException": return [3 /*break*/, 8];
                    case "ResourceNotFoundException": return [3 /*break*/, 10];
                    case "com.amazonaws.comprehend#ResourceNotFoundException": return [3 /*break*/, 10];
                    case "ResourceUnavailableException": return [3 /*break*/, 12];
                    case "com.amazonaws.comprehend#ResourceUnavailableException": return [3 /*break*/, 12];
                    case "TooManyRequestsException": return [3 /*break*/, 14];
                    case "com.amazonaws.comprehend#TooManyRequestsException": return [3 /*break*/, 14];
                }
                return [3 /*break*/, 16];
            case 2:
                _c = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)];
            case 3:
                response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 4:
                _d = [{}];
                return [4 /*yield*/, deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)];
            case 5:
                response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 6:
                _e = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)];
            case 7:
                response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 8:
                _f = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceLimitExceededExceptionResponse(parsedOutput, context)];
            case 9:
                response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 10:
                _g = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)];
            case 11:
                response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 12:
                _h = [{}];
                return [4 /*yield*/, deserializeAws_json1_1ResourceUnavailableExceptionResponse(parsedOutput, context)];
            case 13:
                response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([(_l.sent())])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
                return [3 /*break*/, 17];
            case 14:
                _j = [{}];
                return [4 /*yield*/, deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)];
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
var deserializeAws_json1_1BatchSizeLimitExceededExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1BatchSizeLimitExceededException(body, context);
        contents = __assign({ name: "BatchSizeLimitExceededException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
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
var deserializeAws_json1_1InternalServerExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1InternalServerException(body, context);
        contents = __assign({ name: "InternalServerException", $fault: "server", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1InvalidFilterExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1InvalidFilterException(body, context);
        contents = __assign({ name: "InvalidFilterException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1InvalidRequestExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1InvalidRequestException(body, context);
        contents = __assign({ name: "InvalidRequestException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1JobNotFoundExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1JobNotFoundException(body, context);
        contents = __assign({ name: "JobNotFoundException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1KmsKeyValidationExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1KmsKeyValidationException(body, context);
        contents = __assign({ name: "KmsKeyValidationException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
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
var deserializeAws_json1_1ResourceLimitExceededExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1ResourceLimitExceededException(body, context);
        contents = __assign({ name: "ResourceLimitExceededException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
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
var deserializeAws_json1_1ResourceUnavailableExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1ResourceUnavailableException(body, context);
        contents = __assign({ name: "ResourceUnavailableException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1TextSizeLimitExceededExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1TextSizeLimitExceededException(body, context);
        contents = __assign({ name: "TextSizeLimitExceededException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1TooManyRequestsExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1TooManyRequestsException(body, context);
        contents = __assign({ name: "TooManyRequestsException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1TooManyTagKeysExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1TooManyTagKeysException(body, context);
        contents = __assign({ name: "TooManyTagKeysException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1TooManyTagsExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1TooManyTagsException(body, context);
        contents = __assign({ name: "TooManyTagsException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var deserializeAws_json1_1UnsupportedLanguageExceptionResponse = function (parsedOutput, context) { return __awaiter(void 0, void 0, void 0, function () {
    var body, deserialized, contents;
    return __generator(this, function (_a) {
        body = parsedOutput.body;
        deserialized = deserializeAws_json1_1UnsupportedLanguageException(body, context);
        contents = __assign({ name: "UnsupportedLanguageException", $fault: "client", $metadata: deserializeMetadata(parsedOutput) }, deserialized);
        return [2 /*return*/, contents];
    });
}); };
var serializeAws_json1_1AttributeNamesList = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var serializeAws_json1_1AugmentedManifestsListItem = function (input, context) {
    return __assign(__assign({}, (input.AttributeNames !== undefined &&
        input.AttributeNames !== null && {
        AttributeNames: serializeAws_json1_1AttributeNamesList(input.AttributeNames, context),
    })), (input.S3Uri !== undefined && input.S3Uri !== null && { S3Uri: input.S3Uri }));
};
var serializeAws_json1_1BatchDetectDominantLanguageRequest = function (input, context) {
    return __assign({}, (input.TextList !== undefined &&
        input.TextList !== null && { TextList: serializeAws_json1_1CustomerInputStringList(input.TextList, context) }));
};
var serializeAws_json1_1BatchDetectEntitiesRequest = function (input, context) {
    return __assign(__assign({}, (input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode })), (input.TextList !== undefined &&
        input.TextList !== null && { TextList: serializeAws_json1_1CustomerInputStringList(input.TextList, context) }));
};
var serializeAws_json1_1BatchDetectKeyPhrasesRequest = function (input, context) {
    return __assign(__assign({}, (input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode })), (input.TextList !== undefined &&
        input.TextList !== null && { TextList: serializeAws_json1_1CustomerInputStringList(input.TextList, context) }));
};
var serializeAws_json1_1BatchDetectSentimentRequest = function (input, context) {
    return __assign(__assign({}, (input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode })), (input.TextList !== undefined &&
        input.TextList !== null && { TextList: serializeAws_json1_1CustomerInputStringList(input.TextList, context) }));
};
var serializeAws_json1_1BatchDetectSyntaxRequest = function (input, context) {
    return __assign(__assign({}, (input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode })), (input.TextList !== undefined &&
        input.TextList !== null && { TextList: serializeAws_json1_1CustomerInputStringList(input.TextList, context) }));
};
var serializeAws_json1_1ClassifyDocumentRequest = function (input, context) {
    return __assign(__assign({}, (input.EndpointArn !== undefined && input.EndpointArn !== null && { EndpointArn: input.EndpointArn })), (input.Text !== undefined && input.Text !== null && { Text: input.Text }));
};
var serializeAws_json1_1CreateDocumentClassifierRequest = function (input, context) {
    var _a;
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({ ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : generateIdempotencyToken() }, (input.DataAccessRoleArn !== undefined &&
        input.DataAccessRoleArn !== null && { DataAccessRoleArn: input.DataAccessRoleArn })), (input.DocumentClassifierName !== undefined &&
        input.DocumentClassifierName !== null && { DocumentClassifierName: input.DocumentClassifierName })), (input.InputDataConfig !== undefined &&
        input.InputDataConfig !== null && {
        InputDataConfig: serializeAws_json1_1DocumentClassifierInputDataConfig(input.InputDataConfig, context),
    })), (input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode })), (input.Mode !== undefined && input.Mode !== null && { Mode: input.Mode })), (input.OutputDataConfig !== undefined &&
        input.OutputDataConfig !== null && {
        OutputDataConfig: serializeAws_json1_1DocumentClassifierOutputDataConfig(input.OutputDataConfig, context),
    })), (input.Tags !== undefined && input.Tags !== null && { Tags: serializeAws_json1_1TagList(input.Tags, context) })), (input.VolumeKmsKeyId !== undefined &&
        input.VolumeKmsKeyId !== null && { VolumeKmsKeyId: input.VolumeKmsKeyId })), (input.VpcConfig !== undefined &&
        input.VpcConfig !== null && { VpcConfig: serializeAws_json1_1VpcConfig(input.VpcConfig, context) }));
};
var serializeAws_json1_1CreateEndpointRequest = function (input, context) {
    var _a;
    return __assign(__assign(__assign(__assign({ ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : generateIdempotencyToken() }, (input.DesiredInferenceUnits !== undefined &&
        input.DesiredInferenceUnits !== null && { DesiredInferenceUnits: input.DesiredInferenceUnits })), (input.EndpointName !== undefined && input.EndpointName !== null && { EndpointName: input.EndpointName })), (input.ModelArn !== undefined && input.ModelArn !== null && { ModelArn: input.ModelArn })), (input.Tags !== undefined && input.Tags !== null && { Tags: serializeAws_json1_1TagList(input.Tags, context) }));
};
var serializeAws_json1_1CreateEntityRecognizerRequest = function (input, context) {
    var _a;
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign({ ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : generateIdempotencyToken() }, (input.DataAccessRoleArn !== undefined &&
        input.DataAccessRoleArn !== null && { DataAccessRoleArn: input.DataAccessRoleArn })), (input.InputDataConfig !== undefined &&
        input.InputDataConfig !== null && {
        InputDataConfig: serializeAws_json1_1EntityRecognizerInputDataConfig(input.InputDataConfig, context),
    })), (input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode })), (input.RecognizerName !== undefined &&
        input.RecognizerName !== null && { RecognizerName: input.RecognizerName })), (input.Tags !== undefined && input.Tags !== null && { Tags: serializeAws_json1_1TagList(input.Tags, context) })), (input.VolumeKmsKeyId !== undefined &&
        input.VolumeKmsKeyId !== null && { VolumeKmsKeyId: input.VolumeKmsKeyId })), (input.VpcConfig !== undefined &&
        input.VpcConfig !== null && { VpcConfig: serializeAws_json1_1VpcConfig(input.VpcConfig, context) }));
};
var serializeAws_json1_1CustomerInputStringList = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var serializeAws_json1_1DeleteDocumentClassifierRequest = function (input, context) {
    return __assign({}, (input.DocumentClassifierArn !== undefined &&
        input.DocumentClassifierArn !== null && { DocumentClassifierArn: input.DocumentClassifierArn }));
};
var serializeAws_json1_1DeleteEndpointRequest = function (input, context) {
    return __assign({}, (input.EndpointArn !== undefined && input.EndpointArn !== null && { EndpointArn: input.EndpointArn }));
};
var serializeAws_json1_1DeleteEntityRecognizerRequest = function (input, context) {
    return __assign({}, (input.EntityRecognizerArn !== undefined &&
        input.EntityRecognizerArn !== null && { EntityRecognizerArn: input.EntityRecognizerArn }));
};
var serializeAws_json1_1DescribeDocumentClassificationJobRequest = function (input, context) {
    return __assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }));
};
var serializeAws_json1_1DescribeDocumentClassifierRequest = function (input, context) {
    return __assign({}, (input.DocumentClassifierArn !== undefined &&
        input.DocumentClassifierArn !== null && { DocumentClassifierArn: input.DocumentClassifierArn }));
};
var serializeAws_json1_1DescribeDominantLanguageDetectionJobRequest = function (input, context) {
    return __assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }));
};
var serializeAws_json1_1DescribeEndpointRequest = function (input, context) {
    return __assign({}, (input.EndpointArn !== undefined && input.EndpointArn !== null && { EndpointArn: input.EndpointArn }));
};
var serializeAws_json1_1DescribeEntitiesDetectionJobRequest = function (input, context) {
    return __assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }));
};
var serializeAws_json1_1DescribeEntityRecognizerRequest = function (input, context) {
    return __assign({}, (input.EntityRecognizerArn !== undefined &&
        input.EntityRecognizerArn !== null && { EntityRecognizerArn: input.EntityRecognizerArn }));
};
var serializeAws_json1_1DescribeEventsDetectionJobRequest = function (input, context) {
    return __assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }));
};
var serializeAws_json1_1DescribeKeyPhrasesDetectionJobRequest = function (input, context) {
    return __assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }));
};
var serializeAws_json1_1DescribePiiEntitiesDetectionJobRequest = function (input, context) {
    return __assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }));
};
var serializeAws_json1_1DescribeSentimentDetectionJobRequest = function (input, context) {
    return __assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }));
};
var serializeAws_json1_1DescribeTopicsDetectionJobRequest = function (input, context) {
    return __assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }));
};
var serializeAws_json1_1DetectDominantLanguageRequest = function (input, context) {
    return __assign({}, (input.Text !== undefined && input.Text !== null && { Text: input.Text }));
};
var serializeAws_json1_1DetectEntitiesRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.EndpointArn !== undefined && input.EndpointArn !== null && { EndpointArn: input.EndpointArn })), (input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode })), (input.Text !== undefined && input.Text !== null && { Text: input.Text }));
};
var serializeAws_json1_1DetectKeyPhrasesRequest = function (input, context) {
    return __assign(__assign({}, (input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode })), (input.Text !== undefined && input.Text !== null && { Text: input.Text }));
};
var serializeAws_json1_1DetectPiiEntitiesRequest = function (input, context) {
    return __assign(__assign({}, (input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode })), (input.Text !== undefined && input.Text !== null && { Text: input.Text }));
};
var serializeAws_json1_1DetectSentimentRequest = function (input, context) {
    return __assign(__assign({}, (input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode })), (input.Text !== undefined && input.Text !== null && { Text: input.Text }));
};
var serializeAws_json1_1DetectSyntaxRequest = function (input, context) {
    return __assign(__assign({}, (input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode })), (input.Text !== undefined && input.Text !== null && { Text: input.Text }));
};
var serializeAws_json1_1DocumentClassificationJobFilter = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName })), (input.JobStatus !== undefined && input.JobStatus !== null && { JobStatus: input.JobStatus })), (input.SubmitTimeAfter !== undefined &&
        input.SubmitTimeAfter !== null && { SubmitTimeAfter: Math.round(input.SubmitTimeAfter.getTime() / 1000) })), (input.SubmitTimeBefore !== undefined &&
        input.SubmitTimeBefore !== null && { SubmitTimeBefore: Math.round(input.SubmitTimeBefore.getTime() / 1000) }));
};
var serializeAws_json1_1DocumentClassifierAugmentedManifestsList = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1AugmentedManifestsListItem(entry, context);
    });
};
var serializeAws_json1_1DocumentClassifierFilter = function (input, context) {
    return __assign(__assign(__assign({}, (input.Status !== undefined && input.Status !== null && { Status: input.Status })), (input.SubmitTimeAfter !== undefined &&
        input.SubmitTimeAfter !== null && { SubmitTimeAfter: Math.round(input.SubmitTimeAfter.getTime() / 1000) })), (input.SubmitTimeBefore !== undefined &&
        input.SubmitTimeBefore !== null && { SubmitTimeBefore: Math.round(input.SubmitTimeBefore.getTime() / 1000) }));
};
var serializeAws_json1_1DocumentClassifierInputDataConfig = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.AugmentedManifests !== undefined &&
        input.AugmentedManifests !== null && {
        AugmentedManifests: serializeAws_json1_1DocumentClassifierAugmentedManifestsList(input.AugmentedManifests, context),
    })), (input.DataFormat !== undefined && input.DataFormat !== null && { DataFormat: input.DataFormat })), (input.LabelDelimiter !== undefined &&
        input.LabelDelimiter !== null && { LabelDelimiter: input.LabelDelimiter })), (input.S3Uri !== undefined && input.S3Uri !== null && { S3Uri: input.S3Uri }));
};
var serializeAws_json1_1DocumentClassifierOutputDataConfig = function (input, context) {
    return __assign(__assign({}, (input.KmsKeyId !== undefined && input.KmsKeyId !== null && { KmsKeyId: input.KmsKeyId })), (input.S3Uri !== undefined && input.S3Uri !== null && { S3Uri: input.S3Uri }));
};
var serializeAws_json1_1DominantLanguageDetectionJobFilter = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName })), (input.JobStatus !== undefined && input.JobStatus !== null && { JobStatus: input.JobStatus })), (input.SubmitTimeAfter !== undefined &&
        input.SubmitTimeAfter !== null && { SubmitTimeAfter: Math.round(input.SubmitTimeAfter.getTime() / 1000) })), (input.SubmitTimeBefore !== undefined &&
        input.SubmitTimeBefore !== null && { SubmitTimeBefore: Math.round(input.SubmitTimeBefore.getTime() / 1000) }));
};
var serializeAws_json1_1EndpointFilter = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.CreationTimeAfter !== undefined &&
        input.CreationTimeAfter !== null && { CreationTimeAfter: Math.round(input.CreationTimeAfter.getTime() / 1000) })), (input.CreationTimeBefore !== undefined &&
        input.CreationTimeBefore !== null && {
        CreationTimeBefore: Math.round(input.CreationTimeBefore.getTime() / 1000),
    })), (input.ModelArn !== undefined && input.ModelArn !== null && { ModelArn: input.ModelArn })), (input.Status !== undefined && input.Status !== null && { Status: input.Status }));
};
var serializeAws_json1_1EntitiesDetectionJobFilter = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName })), (input.JobStatus !== undefined && input.JobStatus !== null && { JobStatus: input.JobStatus })), (input.SubmitTimeAfter !== undefined &&
        input.SubmitTimeAfter !== null && { SubmitTimeAfter: Math.round(input.SubmitTimeAfter.getTime() / 1000) })), (input.SubmitTimeBefore !== undefined &&
        input.SubmitTimeBefore !== null && { SubmitTimeBefore: Math.round(input.SubmitTimeBefore.getTime() / 1000) }));
};
var serializeAws_json1_1EntityRecognizerAnnotations = function (input, context) {
    return __assign({}, (input.S3Uri !== undefined && input.S3Uri !== null && { S3Uri: input.S3Uri }));
};
var serializeAws_json1_1EntityRecognizerAugmentedManifestsList = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1AugmentedManifestsListItem(entry, context);
    });
};
var serializeAws_json1_1EntityRecognizerDocuments = function (input, context) {
    return __assign({}, (input.S3Uri !== undefined && input.S3Uri !== null && { S3Uri: input.S3Uri }));
};
var serializeAws_json1_1EntityRecognizerEntityList = function (input, context) {
    return __assign({}, (input.S3Uri !== undefined && input.S3Uri !== null && { S3Uri: input.S3Uri }));
};
var serializeAws_json1_1EntityRecognizerFilter = function (input, context) {
    return __assign(__assign(__assign({}, (input.Status !== undefined && input.Status !== null && { Status: input.Status })), (input.SubmitTimeAfter !== undefined &&
        input.SubmitTimeAfter !== null && { SubmitTimeAfter: Math.round(input.SubmitTimeAfter.getTime() / 1000) })), (input.SubmitTimeBefore !== undefined &&
        input.SubmitTimeBefore !== null && { SubmitTimeBefore: Math.round(input.SubmitTimeBefore.getTime() / 1000) }));
};
var serializeAws_json1_1EntityRecognizerInputDataConfig = function (input, context) {
    return __assign(__assign(__assign(__assign(__assign(__assign({}, (input.Annotations !== undefined &&
        input.Annotations !== null && {
        Annotations: serializeAws_json1_1EntityRecognizerAnnotations(input.Annotations, context),
    })), (input.AugmentedManifests !== undefined &&
        input.AugmentedManifests !== null && {
        AugmentedManifests: serializeAws_json1_1EntityRecognizerAugmentedManifestsList(input.AugmentedManifests, context),
    })), (input.DataFormat !== undefined && input.DataFormat !== null && { DataFormat: input.DataFormat })), (input.Documents !== undefined &&
        input.Documents !== null && {
        Documents: serializeAws_json1_1EntityRecognizerDocuments(input.Documents, context),
    })), (input.EntityList !== undefined &&
        input.EntityList !== null && {
        EntityList: serializeAws_json1_1EntityRecognizerEntityList(input.EntityList, context),
    })), (input.EntityTypes !== undefined &&
        input.EntityTypes !== null && { EntityTypes: serializeAws_json1_1EntityTypesList(input.EntityTypes, context) }));
};
var serializeAws_json1_1EntityTypesList = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1EntityTypesListItem(entry, context);
    });
};
var serializeAws_json1_1EntityTypesListItem = function (input, context) {
    return __assign({}, (input.Type !== undefined && input.Type !== null && { Type: input.Type }));
};
var serializeAws_json1_1EventsDetectionJobFilter = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName })), (input.JobStatus !== undefined && input.JobStatus !== null && { JobStatus: input.JobStatus })), (input.SubmitTimeAfter !== undefined &&
        input.SubmitTimeAfter !== null && { SubmitTimeAfter: Math.round(input.SubmitTimeAfter.getTime() / 1000) })), (input.SubmitTimeBefore !== undefined &&
        input.SubmitTimeBefore !== null && { SubmitTimeBefore: Math.round(input.SubmitTimeBefore.getTime() / 1000) }));
};
var serializeAws_json1_1InputDataConfig = function (input, context) {
    return __assign(__assign({}, (input.InputFormat !== undefined && input.InputFormat !== null && { InputFormat: input.InputFormat })), (input.S3Uri !== undefined && input.S3Uri !== null && { S3Uri: input.S3Uri }));
};
var serializeAws_json1_1KeyPhrasesDetectionJobFilter = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName })), (input.JobStatus !== undefined && input.JobStatus !== null && { JobStatus: input.JobStatus })), (input.SubmitTimeAfter !== undefined &&
        input.SubmitTimeAfter !== null && { SubmitTimeAfter: Math.round(input.SubmitTimeAfter.getTime() / 1000) })), (input.SubmitTimeBefore !== undefined &&
        input.SubmitTimeBefore !== null && { SubmitTimeBefore: Math.round(input.SubmitTimeBefore.getTime() / 1000) }));
};
var serializeAws_json1_1ListDocumentClassificationJobsRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.Filter !== undefined &&
        input.Filter !== null && { Filter: serializeAws_json1_1DocumentClassificationJobFilter(input.Filter, context) })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }));
};
var serializeAws_json1_1ListDocumentClassifiersRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.Filter !== undefined &&
        input.Filter !== null && { Filter: serializeAws_json1_1DocumentClassifierFilter(input.Filter, context) })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }));
};
var serializeAws_json1_1ListDominantLanguageDetectionJobsRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.Filter !== undefined &&
        input.Filter !== null && {
        Filter: serializeAws_json1_1DominantLanguageDetectionJobFilter(input.Filter, context),
    })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }));
};
var serializeAws_json1_1ListEndpointsRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.Filter !== undefined &&
        input.Filter !== null && { Filter: serializeAws_json1_1EndpointFilter(input.Filter, context) })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }));
};
var serializeAws_json1_1ListEntitiesDetectionJobsRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.Filter !== undefined &&
        input.Filter !== null && { Filter: serializeAws_json1_1EntitiesDetectionJobFilter(input.Filter, context) })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }));
};
var serializeAws_json1_1ListEntityRecognizersRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.Filter !== undefined &&
        input.Filter !== null && { Filter: serializeAws_json1_1EntityRecognizerFilter(input.Filter, context) })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }));
};
var serializeAws_json1_1ListEventsDetectionJobsRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.Filter !== undefined &&
        input.Filter !== null && { Filter: serializeAws_json1_1EventsDetectionJobFilter(input.Filter, context) })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }));
};
var serializeAws_json1_1ListKeyPhrasesDetectionJobsRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.Filter !== undefined &&
        input.Filter !== null && { Filter: serializeAws_json1_1KeyPhrasesDetectionJobFilter(input.Filter, context) })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }));
};
var serializeAws_json1_1ListOfPiiEntityTypes = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var serializeAws_json1_1ListPiiEntitiesDetectionJobsRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.Filter !== undefined &&
        input.Filter !== null && { Filter: serializeAws_json1_1PiiEntitiesDetectionJobFilter(input.Filter, context) })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }));
};
var serializeAws_json1_1ListSentimentDetectionJobsRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.Filter !== undefined &&
        input.Filter !== null && { Filter: serializeAws_json1_1SentimentDetectionJobFilter(input.Filter, context) })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }));
};
var serializeAws_json1_1ListTagsForResourceRequest = function (input, context) {
    return __assign({}, (input.ResourceArn !== undefined && input.ResourceArn !== null && { ResourceArn: input.ResourceArn }));
};
var serializeAws_json1_1ListTopicsDetectionJobsRequest = function (input, context) {
    return __assign(__assign(__assign({}, (input.Filter !== undefined &&
        input.Filter !== null && { Filter: serializeAws_json1_1TopicsDetectionJobFilter(input.Filter, context) })), (input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults })), (input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }));
};
var serializeAws_json1_1OutputDataConfig = function (input, context) {
    return __assign(__assign({}, (input.KmsKeyId !== undefined && input.KmsKeyId !== null && { KmsKeyId: input.KmsKeyId })), (input.S3Uri !== undefined && input.S3Uri !== null && { S3Uri: input.S3Uri }));
};
var serializeAws_json1_1PiiEntitiesDetectionJobFilter = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName })), (input.JobStatus !== undefined && input.JobStatus !== null && { JobStatus: input.JobStatus })), (input.SubmitTimeAfter !== undefined &&
        input.SubmitTimeAfter !== null && { SubmitTimeAfter: Math.round(input.SubmitTimeAfter.getTime() / 1000) })), (input.SubmitTimeBefore !== undefined &&
        input.SubmitTimeBefore !== null && { SubmitTimeBefore: Math.round(input.SubmitTimeBefore.getTime() / 1000) }));
};
var serializeAws_json1_1RedactionConfig = function (input, context) {
    return __assign(__assign(__assign({}, (input.MaskCharacter !== undefined && input.MaskCharacter !== null && { MaskCharacter: input.MaskCharacter })), (input.MaskMode !== undefined && input.MaskMode !== null && { MaskMode: input.MaskMode })), (input.PiiEntityTypes !== undefined &&
        input.PiiEntityTypes !== null && {
        PiiEntityTypes: serializeAws_json1_1ListOfPiiEntityTypes(input.PiiEntityTypes, context),
    }));
};
var serializeAws_json1_1SecurityGroupIds = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var serializeAws_json1_1SentimentDetectionJobFilter = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName })), (input.JobStatus !== undefined && input.JobStatus !== null && { JobStatus: input.JobStatus })), (input.SubmitTimeAfter !== undefined &&
        input.SubmitTimeAfter !== null && { SubmitTimeAfter: Math.round(input.SubmitTimeAfter.getTime() / 1000) })), (input.SubmitTimeBefore !== undefined &&
        input.SubmitTimeBefore !== null && { SubmitTimeBefore: Math.round(input.SubmitTimeBefore.getTime() / 1000) }));
};
var serializeAws_json1_1StartDocumentClassificationJobRequest = function (input, context) {
    var _a;
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign({ ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : generateIdempotencyToken() }, (input.DataAccessRoleArn !== undefined &&
        input.DataAccessRoleArn !== null && { DataAccessRoleArn: input.DataAccessRoleArn })), (input.DocumentClassifierArn !== undefined &&
        input.DocumentClassifierArn !== null && { DocumentClassifierArn: input.DocumentClassifierArn })), (input.InputDataConfig !== undefined &&
        input.InputDataConfig !== null && {
        InputDataConfig: serializeAws_json1_1InputDataConfig(input.InputDataConfig, context),
    })), (input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName })), (input.OutputDataConfig !== undefined &&
        input.OutputDataConfig !== null && {
        OutputDataConfig: serializeAws_json1_1OutputDataConfig(input.OutputDataConfig, context),
    })), (input.VolumeKmsKeyId !== undefined &&
        input.VolumeKmsKeyId !== null && { VolumeKmsKeyId: input.VolumeKmsKeyId })), (input.VpcConfig !== undefined &&
        input.VpcConfig !== null && { VpcConfig: serializeAws_json1_1VpcConfig(input.VpcConfig, context) }));
};
var serializeAws_json1_1StartDominantLanguageDetectionJobRequest = function (input, context) {
    var _a;
    return __assign(__assign(__assign(__assign(__assign(__assign({ ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : generateIdempotencyToken() }, (input.DataAccessRoleArn !== undefined &&
        input.DataAccessRoleArn !== null && { DataAccessRoleArn: input.DataAccessRoleArn })), (input.InputDataConfig !== undefined &&
        input.InputDataConfig !== null && {
        InputDataConfig: serializeAws_json1_1InputDataConfig(input.InputDataConfig, context),
    })), (input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName })), (input.OutputDataConfig !== undefined &&
        input.OutputDataConfig !== null && {
        OutputDataConfig: serializeAws_json1_1OutputDataConfig(input.OutputDataConfig, context),
    })), (input.VolumeKmsKeyId !== undefined &&
        input.VolumeKmsKeyId !== null && { VolumeKmsKeyId: input.VolumeKmsKeyId })), (input.VpcConfig !== undefined &&
        input.VpcConfig !== null && { VpcConfig: serializeAws_json1_1VpcConfig(input.VpcConfig, context) }));
};
var serializeAws_json1_1StartEntitiesDetectionJobRequest = function (input, context) {
    var _a;
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({ ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : generateIdempotencyToken() }, (input.DataAccessRoleArn !== undefined &&
        input.DataAccessRoleArn !== null && { DataAccessRoleArn: input.DataAccessRoleArn })), (input.EntityRecognizerArn !== undefined &&
        input.EntityRecognizerArn !== null && { EntityRecognizerArn: input.EntityRecognizerArn })), (input.InputDataConfig !== undefined &&
        input.InputDataConfig !== null && {
        InputDataConfig: serializeAws_json1_1InputDataConfig(input.InputDataConfig, context),
    })), (input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName })), (input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode })), (input.OutputDataConfig !== undefined &&
        input.OutputDataConfig !== null && {
        OutputDataConfig: serializeAws_json1_1OutputDataConfig(input.OutputDataConfig, context),
    })), (input.VolumeKmsKeyId !== undefined &&
        input.VolumeKmsKeyId !== null && { VolumeKmsKeyId: input.VolumeKmsKeyId })), (input.VpcConfig !== undefined &&
        input.VpcConfig !== null && { VpcConfig: serializeAws_json1_1VpcConfig(input.VpcConfig, context) }));
};
var serializeAws_json1_1StartEventsDetectionJobRequest = function (input, context) {
    var _a;
    return __assign(__assign(__assign(__assign(__assign(__assign({ ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : generateIdempotencyToken() }, (input.DataAccessRoleArn !== undefined &&
        input.DataAccessRoleArn !== null && { DataAccessRoleArn: input.DataAccessRoleArn })), (input.InputDataConfig !== undefined &&
        input.InputDataConfig !== null && {
        InputDataConfig: serializeAws_json1_1InputDataConfig(input.InputDataConfig, context),
    })), (input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName })), (input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode })), (input.OutputDataConfig !== undefined &&
        input.OutputDataConfig !== null && {
        OutputDataConfig: serializeAws_json1_1OutputDataConfig(input.OutputDataConfig, context),
    })), (input.TargetEventTypes !== undefined &&
        input.TargetEventTypes !== null && {
        TargetEventTypes: serializeAws_json1_1TargetEventTypes(input.TargetEventTypes, context),
    }));
};
var serializeAws_json1_1StartKeyPhrasesDetectionJobRequest = function (input, context) {
    var _a;
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign({ ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : generateIdempotencyToken() }, (input.DataAccessRoleArn !== undefined &&
        input.DataAccessRoleArn !== null && { DataAccessRoleArn: input.DataAccessRoleArn })), (input.InputDataConfig !== undefined &&
        input.InputDataConfig !== null && {
        InputDataConfig: serializeAws_json1_1InputDataConfig(input.InputDataConfig, context),
    })), (input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName })), (input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode })), (input.OutputDataConfig !== undefined &&
        input.OutputDataConfig !== null && {
        OutputDataConfig: serializeAws_json1_1OutputDataConfig(input.OutputDataConfig, context),
    })), (input.VolumeKmsKeyId !== undefined &&
        input.VolumeKmsKeyId !== null && { VolumeKmsKeyId: input.VolumeKmsKeyId })), (input.VpcConfig !== undefined &&
        input.VpcConfig !== null && { VpcConfig: serializeAws_json1_1VpcConfig(input.VpcConfig, context) }));
};
var serializeAws_json1_1StartPiiEntitiesDetectionJobRequest = function (input, context) {
    var _a;
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign({ ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : generateIdempotencyToken() }, (input.DataAccessRoleArn !== undefined &&
        input.DataAccessRoleArn !== null && { DataAccessRoleArn: input.DataAccessRoleArn })), (input.InputDataConfig !== undefined &&
        input.InputDataConfig !== null && {
        InputDataConfig: serializeAws_json1_1InputDataConfig(input.InputDataConfig, context),
    })), (input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName })), (input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode })), (input.Mode !== undefined && input.Mode !== null && { Mode: input.Mode })), (input.OutputDataConfig !== undefined &&
        input.OutputDataConfig !== null && {
        OutputDataConfig: serializeAws_json1_1OutputDataConfig(input.OutputDataConfig, context),
    })), (input.RedactionConfig !== undefined &&
        input.RedactionConfig !== null && {
        RedactionConfig: serializeAws_json1_1RedactionConfig(input.RedactionConfig, context),
    }));
};
var serializeAws_json1_1StartSentimentDetectionJobRequest = function (input, context) {
    var _a;
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign({ ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : generateIdempotencyToken() }, (input.DataAccessRoleArn !== undefined &&
        input.DataAccessRoleArn !== null && { DataAccessRoleArn: input.DataAccessRoleArn })), (input.InputDataConfig !== undefined &&
        input.InputDataConfig !== null && {
        InputDataConfig: serializeAws_json1_1InputDataConfig(input.InputDataConfig, context),
    })), (input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName })), (input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode })), (input.OutputDataConfig !== undefined &&
        input.OutputDataConfig !== null && {
        OutputDataConfig: serializeAws_json1_1OutputDataConfig(input.OutputDataConfig, context),
    })), (input.VolumeKmsKeyId !== undefined &&
        input.VolumeKmsKeyId !== null && { VolumeKmsKeyId: input.VolumeKmsKeyId })), (input.VpcConfig !== undefined &&
        input.VpcConfig !== null && { VpcConfig: serializeAws_json1_1VpcConfig(input.VpcConfig, context) }));
};
var serializeAws_json1_1StartTopicsDetectionJobRequest = function (input, context) {
    var _a;
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign({ ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : generateIdempotencyToken() }, (input.DataAccessRoleArn !== undefined &&
        input.DataAccessRoleArn !== null && { DataAccessRoleArn: input.DataAccessRoleArn })), (input.InputDataConfig !== undefined &&
        input.InputDataConfig !== null && {
        InputDataConfig: serializeAws_json1_1InputDataConfig(input.InputDataConfig, context),
    })), (input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName })), (input.NumberOfTopics !== undefined &&
        input.NumberOfTopics !== null && { NumberOfTopics: input.NumberOfTopics })), (input.OutputDataConfig !== undefined &&
        input.OutputDataConfig !== null && {
        OutputDataConfig: serializeAws_json1_1OutputDataConfig(input.OutputDataConfig, context),
    })), (input.VolumeKmsKeyId !== undefined &&
        input.VolumeKmsKeyId !== null && { VolumeKmsKeyId: input.VolumeKmsKeyId })), (input.VpcConfig !== undefined &&
        input.VpcConfig !== null && { VpcConfig: serializeAws_json1_1VpcConfig(input.VpcConfig, context) }));
};
var serializeAws_json1_1StopDominantLanguageDetectionJobRequest = function (input, context) {
    return __assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }));
};
var serializeAws_json1_1StopEntitiesDetectionJobRequest = function (input, context) {
    return __assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }));
};
var serializeAws_json1_1StopEventsDetectionJobRequest = function (input, context) {
    return __assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }));
};
var serializeAws_json1_1StopKeyPhrasesDetectionJobRequest = function (input, context) {
    return __assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }));
};
var serializeAws_json1_1StopPiiEntitiesDetectionJobRequest = function (input, context) {
    return __assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }));
};
var serializeAws_json1_1StopSentimentDetectionJobRequest = function (input, context) {
    return __assign({}, (input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }));
};
var serializeAws_json1_1StopTrainingDocumentClassifierRequest = function (input, context) {
    return __assign({}, (input.DocumentClassifierArn !== undefined &&
        input.DocumentClassifierArn !== null && { DocumentClassifierArn: input.DocumentClassifierArn }));
};
var serializeAws_json1_1StopTrainingEntityRecognizerRequest = function (input, context) {
    return __assign({}, (input.EntityRecognizerArn !== undefined &&
        input.EntityRecognizerArn !== null && { EntityRecognizerArn: input.EntityRecognizerArn }));
};
var serializeAws_json1_1Subnets = function (input, context) {
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
var serializeAws_json1_1TagList = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1Tag(entry, context);
    });
};
var serializeAws_json1_1TagResourceRequest = function (input, context) {
    return __assign(__assign({}, (input.ResourceArn !== undefined && input.ResourceArn !== null && { ResourceArn: input.ResourceArn })), (input.Tags !== undefined && input.Tags !== null && { Tags: serializeAws_json1_1TagList(input.Tags, context) }));
};
var serializeAws_json1_1TargetEventTypes = function (input, context) {
    return input
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var serializeAws_json1_1TopicsDetectionJobFilter = function (input, context) {
    return __assign(__assign(__assign(__assign({}, (input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName })), (input.JobStatus !== undefined && input.JobStatus !== null && { JobStatus: input.JobStatus })), (input.SubmitTimeAfter !== undefined &&
        input.SubmitTimeAfter !== null && { SubmitTimeAfter: Math.round(input.SubmitTimeAfter.getTime() / 1000) })), (input.SubmitTimeBefore !== undefined &&
        input.SubmitTimeBefore !== null && { SubmitTimeBefore: Math.round(input.SubmitTimeBefore.getTime() / 1000) }));
};
var serializeAws_json1_1UntagResourceRequest = function (input, context) {
    return __assign(__assign({}, (input.ResourceArn !== undefined && input.ResourceArn !== null && { ResourceArn: input.ResourceArn })), (input.TagKeys !== undefined &&
        input.TagKeys !== null && { TagKeys: serializeAws_json1_1TagKeyList(input.TagKeys, context) }));
};
var serializeAws_json1_1UpdateEndpointRequest = function (input, context) {
    return __assign(__assign({}, (input.DesiredInferenceUnits !== undefined &&
        input.DesiredInferenceUnits !== null && { DesiredInferenceUnits: input.DesiredInferenceUnits })), (input.EndpointArn !== undefined && input.EndpointArn !== null && { EndpointArn: input.EndpointArn }));
};
var serializeAws_json1_1VpcConfig = function (input, context) {
    return __assign(__assign({}, (input.SecurityGroupIds !== undefined &&
        input.SecurityGroupIds !== null && {
        SecurityGroupIds: serializeAws_json1_1SecurityGroupIds(input.SecurityGroupIds, context),
    })), (input.Subnets !== undefined &&
        input.Subnets !== null && { Subnets: serializeAws_json1_1Subnets(input.Subnets, context) }));
};
var deserializeAws_json1_1AttributeNamesList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var deserializeAws_json1_1AugmentedManifestsListItem = function (output, context) {
    return {
        AttributeNames: output.AttributeNames !== undefined && output.AttributeNames !== null
            ? deserializeAws_json1_1AttributeNamesList(output.AttributeNames, context)
            : undefined,
        S3Uri: output.S3Uri !== undefined && output.S3Uri !== null ? output.S3Uri : undefined,
    };
};
var deserializeAws_json1_1BatchDetectDominantLanguageItemResult = function (output, context) {
    return {
        Index: output.Index !== undefined && output.Index !== null ? output.Index : undefined,
        Languages: output.Languages !== undefined && output.Languages !== null
            ? deserializeAws_json1_1ListOfDominantLanguages(output.Languages, context)
            : undefined,
    };
};
var deserializeAws_json1_1BatchDetectDominantLanguageResponse = function (output, context) {
    return {
        ErrorList: output.ErrorList !== undefined && output.ErrorList !== null
            ? deserializeAws_json1_1BatchItemErrorList(output.ErrorList, context)
            : undefined,
        ResultList: output.ResultList !== undefined && output.ResultList !== null
            ? deserializeAws_json1_1ListOfDetectDominantLanguageResult(output.ResultList, context)
            : undefined,
    };
};
var deserializeAws_json1_1BatchDetectEntitiesItemResult = function (output, context) {
    return {
        Entities: output.Entities !== undefined && output.Entities !== null
            ? deserializeAws_json1_1ListOfEntities(output.Entities, context)
            : undefined,
        Index: output.Index !== undefined && output.Index !== null ? output.Index : undefined,
    };
};
var deserializeAws_json1_1BatchDetectEntitiesResponse = function (output, context) {
    return {
        ErrorList: output.ErrorList !== undefined && output.ErrorList !== null
            ? deserializeAws_json1_1BatchItemErrorList(output.ErrorList, context)
            : undefined,
        ResultList: output.ResultList !== undefined && output.ResultList !== null
            ? deserializeAws_json1_1ListOfDetectEntitiesResult(output.ResultList, context)
            : undefined,
    };
};
var deserializeAws_json1_1BatchDetectKeyPhrasesItemResult = function (output, context) {
    return {
        Index: output.Index !== undefined && output.Index !== null ? output.Index : undefined,
        KeyPhrases: output.KeyPhrases !== undefined && output.KeyPhrases !== null
            ? deserializeAws_json1_1ListOfKeyPhrases(output.KeyPhrases, context)
            : undefined,
    };
};
var deserializeAws_json1_1BatchDetectKeyPhrasesResponse = function (output, context) {
    return {
        ErrorList: output.ErrorList !== undefined && output.ErrorList !== null
            ? deserializeAws_json1_1BatchItemErrorList(output.ErrorList, context)
            : undefined,
        ResultList: output.ResultList !== undefined && output.ResultList !== null
            ? deserializeAws_json1_1ListOfDetectKeyPhrasesResult(output.ResultList, context)
            : undefined,
    };
};
var deserializeAws_json1_1BatchDetectSentimentItemResult = function (output, context) {
    return {
        Index: output.Index !== undefined && output.Index !== null ? output.Index : undefined,
        Sentiment: output.Sentiment !== undefined && output.Sentiment !== null ? output.Sentiment : undefined,
        SentimentScore: output.SentimentScore !== undefined && output.SentimentScore !== null
            ? deserializeAws_json1_1SentimentScore(output.SentimentScore, context)
            : undefined,
    };
};
var deserializeAws_json1_1BatchDetectSentimentResponse = function (output, context) {
    return {
        ErrorList: output.ErrorList !== undefined && output.ErrorList !== null
            ? deserializeAws_json1_1BatchItemErrorList(output.ErrorList, context)
            : undefined,
        ResultList: output.ResultList !== undefined && output.ResultList !== null
            ? deserializeAws_json1_1ListOfDetectSentimentResult(output.ResultList, context)
            : undefined,
    };
};
var deserializeAws_json1_1BatchDetectSyntaxItemResult = function (output, context) {
    return {
        Index: output.Index !== undefined && output.Index !== null ? output.Index : undefined,
        SyntaxTokens: output.SyntaxTokens !== undefined && output.SyntaxTokens !== null
            ? deserializeAws_json1_1ListOfSyntaxTokens(output.SyntaxTokens, context)
            : undefined,
    };
};
var deserializeAws_json1_1BatchDetectSyntaxResponse = function (output, context) {
    return {
        ErrorList: output.ErrorList !== undefined && output.ErrorList !== null
            ? deserializeAws_json1_1BatchItemErrorList(output.ErrorList, context)
            : undefined,
        ResultList: output.ResultList !== undefined && output.ResultList !== null
            ? deserializeAws_json1_1ListOfDetectSyntaxResult(output.ResultList, context)
            : undefined,
    };
};
var deserializeAws_json1_1BatchItemError = function (output, context) {
    return {
        ErrorCode: output.ErrorCode !== undefined && output.ErrorCode !== null ? output.ErrorCode : undefined,
        ErrorMessage: output.ErrorMessage !== undefined && output.ErrorMessage !== null ? output.ErrorMessage : undefined,
        Index: output.Index !== undefined && output.Index !== null ? output.Index : undefined,
    };
};
var deserializeAws_json1_1BatchItemErrorList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1BatchItemError(entry, context);
    });
};
var deserializeAws_json1_1BatchSizeLimitExceededException = function (output, context) {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1ClassifierEvaluationMetrics = function (output, context) {
    return {
        Accuracy: output.Accuracy !== undefined && output.Accuracy !== null ? output.Accuracy : undefined,
        F1Score: output.F1Score !== undefined && output.F1Score !== null ? output.F1Score : undefined,
        HammingLoss: output.HammingLoss !== undefined && output.HammingLoss !== null ? output.HammingLoss : undefined,
        MicroF1Score: output.MicroF1Score !== undefined && output.MicroF1Score !== null ? output.MicroF1Score : undefined,
        MicroPrecision: output.MicroPrecision !== undefined && output.MicroPrecision !== null ? output.MicroPrecision : undefined,
        MicroRecall: output.MicroRecall !== undefined && output.MicroRecall !== null ? output.MicroRecall : undefined,
        Precision: output.Precision !== undefined && output.Precision !== null ? output.Precision : undefined,
        Recall: output.Recall !== undefined && output.Recall !== null ? output.Recall : undefined,
    };
};
var deserializeAws_json1_1ClassifierMetadata = function (output, context) {
    return {
        EvaluationMetrics: output.EvaluationMetrics !== undefined && output.EvaluationMetrics !== null
            ? deserializeAws_json1_1ClassifierEvaluationMetrics(output.EvaluationMetrics, context)
            : undefined,
        NumberOfLabels: output.NumberOfLabels !== undefined && output.NumberOfLabels !== null ? output.NumberOfLabels : undefined,
        NumberOfTestDocuments: output.NumberOfTestDocuments !== undefined && output.NumberOfTestDocuments !== null
            ? output.NumberOfTestDocuments
            : undefined,
        NumberOfTrainedDocuments: output.NumberOfTrainedDocuments !== undefined && output.NumberOfTrainedDocuments !== null
            ? output.NumberOfTrainedDocuments
            : undefined,
    };
};
var deserializeAws_json1_1ClassifyDocumentResponse = function (output, context) {
    return {
        Classes: output.Classes !== undefined && output.Classes !== null
            ? deserializeAws_json1_1ListOfClasses(output.Classes, context)
            : undefined,
        Labels: output.Labels !== undefined && output.Labels !== null
            ? deserializeAws_json1_1ListOfLabels(output.Labels, context)
            : undefined,
    };
};
var deserializeAws_json1_1ConcurrentModificationException = function (output, context) {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1CreateDocumentClassifierResponse = function (output, context) {
    return {
        DocumentClassifierArn: output.DocumentClassifierArn !== undefined && output.DocumentClassifierArn !== null
            ? output.DocumentClassifierArn
            : undefined,
    };
};
var deserializeAws_json1_1CreateEndpointResponse = function (output, context) {
    return {
        EndpointArn: output.EndpointArn !== undefined && output.EndpointArn !== null ? output.EndpointArn : undefined,
    };
};
var deserializeAws_json1_1CreateEntityRecognizerResponse = function (output, context) {
    return {
        EntityRecognizerArn: output.EntityRecognizerArn !== undefined && output.EntityRecognizerArn !== null
            ? output.EntityRecognizerArn
            : undefined,
    };
};
var deserializeAws_json1_1DeleteDocumentClassifierResponse = function (output, context) {
    return {};
};
var deserializeAws_json1_1DeleteEndpointResponse = function (output, context) {
    return {};
};
var deserializeAws_json1_1DeleteEntityRecognizerResponse = function (output, context) {
    return {};
};
var deserializeAws_json1_1DescribeDocumentClassificationJobResponse = function (output, context) {
    return {
        DocumentClassificationJobProperties: output.DocumentClassificationJobProperties !== undefined && output.DocumentClassificationJobProperties !== null
            ? deserializeAws_json1_1DocumentClassificationJobProperties(output.DocumentClassificationJobProperties, context)
            : undefined,
    };
};
var deserializeAws_json1_1DescribeDocumentClassifierResponse = function (output, context) {
    return {
        DocumentClassifierProperties: output.DocumentClassifierProperties !== undefined && output.DocumentClassifierProperties !== null
            ? deserializeAws_json1_1DocumentClassifierProperties(output.DocumentClassifierProperties, context)
            : undefined,
    };
};
var deserializeAws_json1_1DescribeDominantLanguageDetectionJobResponse = function (output, context) {
    return {
        DominantLanguageDetectionJobProperties: output.DominantLanguageDetectionJobProperties !== undefined &&
            output.DominantLanguageDetectionJobProperties !== null
            ? deserializeAws_json1_1DominantLanguageDetectionJobProperties(output.DominantLanguageDetectionJobProperties, context)
            : undefined,
    };
};
var deserializeAws_json1_1DescribeEndpointResponse = function (output, context) {
    return {
        EndpointProperties: output.EndpointProperties !== undefined && output.EndpointProperties !== null
            ? deserializeAws_json1_1EndpointProperties(output.EndpointProperties, context)
            : undefined,
    };
};
var deserializeAws_json1_1DescribeEntitiesDetectionJobResponse = function (output, context) {
    return {
        EntitiesDetectionJobProperties: output.EntitiesDetectionJobProperties !== undefined && output.EntitiesDetectionJobProperties !== null
            ? deserializeAws_json1_1EntitiesDetectionJobProperties(output.EntitiesDetectionJobProperties, context)
            : undefined,
    };
};
var deserializeAws_json1_1DescribeEntityRecognizerResponse = function (output, context) {
    return {
        EntityRecognizerProperties: output.EntityRecognizerProperties !== undefined && output.EntityRecognizerProperties !== null
            ? deserializeAws_json1_1EntityRecognizerProperties(output.EntityRecognizerProperties, context)
            : undefined,
    };
};
var deserializeAws_json1_1DescribeEventsDetectionJobResponse = function (output, context) {
    return {
        EventsDetectionJobProperties: output.EventsDetectionJobProperties !== undefined && output.EventsDetectionJobProperties !== null
            ? deserializeAws_json1_1EventsDetectionJobProperties(output.EventsDetectionJobProperties, context)
            : undefined,
    };
};
var deserializeAws_json1_1DescribeKeyPhrasesDetectionJobResponse = function (output, context) {
    return {
        KeyPhrasesDetectionJobProperties: output.KeyPhrasesDetectionJobProperties !== undefined && output.KeyPhrasesDetectionJobProperties !== null
            ? deserializeAws_json1_1KeyPhrasesDetectionJobProperties(output.KeyPhrasesDetectionJobProperties, context)
            : undefined,
    };
};
var deserializeAws_json1_1DescribePiiEntitiesDetectionJobResponse = function (output, context) {
    return {
        PiiEntitiesDetectionJobProperties: output.PiiEntitiesDetectionJobProperties !== undefined && output.PiiEntitiesDetectionJobProperties !== null
            ? deserializeAws_json1_1PiiEntitiesDetectionJobProperties(output.PiiEntitiesDetectionJobProperties, context)
            : undefined,
    };
};
var deserializeAws_json1_1DescribeSentimentDetectionJobResponse = function (output, context) {
    return {
        SentimentDetectionJobProperties: output.SentimentDetectionJobProperties !== undefined && output.SentimentDetectionJobProperties !== null
            ? deserializeAws_json1_1SentimentDetectionJobProperties(output.SentimentDetectionJobProperties, context)
            : undefined,
    };
};
var deserializeAws_json1_1DescribeTopicsDetectionJobResponse = function (output, context) {
    return {
        TopicsDetectionJobProperties: output.TopicsDetectionJobProperties !== undefined && output.TopicsDetectionJobProperties !== null
            ? deserializeAws_json1_1TopicsDetectionJobProperties(output.TopicsDetectionJobProperties, context)
            : undefined,
    };
};
var deserializeAws_json1_1DetectDominantLanguageResponse = function (output, context) {
    return {
        Languages: output.Languages !== undefined && output.Languages !== null
            ? deserializeAws_json1_1ListOfDominantLanguages(output.Languages, context)
            : undefined,
    };
};
var deserializeAws_json1_1DetectEntitiesResponse = function (output, context) {
    return {
        Entities: output.Entities !== undefined && output.Entities !== null
            ? deserializeAws_json1_1ListOfEntities(output.Entities, context)
            : undefined,
    };
};
var deserializeAws_json1_1DetectKeyPhrasesResponse = function (output, context) {
    return {
        KeyPhrases: output.KeyPhrases !== undefined && output.KeyPhrases !== null
            ? deserializeAws_json1_1ListOfKeyPhrases(output.KeyPhrases, context)
            : undefined,
    };
};
var deserializeAws_json1_1DetectPiiEntitiesResponse = function (output, context) {
    return {
        Entities: output.Entities !== undefined && output.Entities !== null
            ? deserializeAws_json1_1ListOfPiiEntities(output.Entities, context)
            : undefined,
    };
};
var deserializeAws_json1_1DetectSentimentResponse = function (output, context) {
    return {
        Sentiment: output.Sentiment !== undefined && output.Sentiment !== null ? output.Sentiment : undefined,
        SentimentScore: output.SentimentScore !== undefined && output.SentimentScore !== null
            ? deserializeAws_json1_1SentimentScore(output.SentimentScore, context)
            : undefined,
    };
};
var deserializeAws_json1_1DetectSyntaxResponse = function (output, context) {
    return {
        SyntaxTokens: output.SyntaxTokens !== undefined && output.SyntaxTokens !== null
            ? deserializeAws_json1_1ListOfSyntaxTokens(output.SyntaxTokens, context)
            : undefined,
    };
};
var deserializeAws_json1_1DocumentClass = function (output, context) {
    return {
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        Score: output.Score !== undefined && output.Score !== null ? output.Score : undefined,
    };
};
var deserializeAws_json1_1DocumentClassificationJobProperties = function (output, context) {
    return {
        DataAccessRoleArn: output.DataAccessRoleArn !== undefined && output.DataAccessRoleArn !== null
            ? output.DataAccessRoleArn
            : undefined,
        DocumentClassifierArn: output.DocumentClassifierArn !== undefined && output.DocumentClassifierArn !== null
            ? output.DocumentClassifierArn
            : undefined,
        EndTime: output.EndTime !== undefined && output.EndTime !== null ? new Date(Math.round(output.EndTime * 1000)) : undefined,
        InputDataConfig: output.InputDataConfig !== undefined && output.InputDataConfig !== null
            ? deserializeAws_json1_1InputDataConfig(output.InputDataConfig, context)
            : undefined,
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobName: output.JobName !== undefined && output.JobName !== null ? output.JobName : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
        OutputDataConfig: output.OutputDataConfig !== undefined && output.OutputDataConfig !== null
            ? deserializeAws_json1_1OutputDataConfig(output.OutputDataConfig, context)
            : undefined,
        SubmitTime: output.SubmitTime !== undefined && output.SubmitTime !== null
            ? new Date(Math.round(output.SubmitTime * 1000))
            : undefined,
        VolumeKmsKeyId: output.VolumeKmsKeyId !== undefined && output.VolumeKmsKeyId !== null ? output.VolumeKmsKeyId : undefined,
        VpcConfig: output.VpcConfig !== undefined && output.VpcConfig !== null
            ? deserializeAws_json1_1VpcConfig(output.VpcConfig, context)
            : undefined,
    };
};
var deserializeAws_json1_1DocumentClassificationJobPropertiesList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1DocumentClassificationJobProperties(entry, context);
    });
};
var deserializeAws_json1_1DocumentClassifierAugmentedManifestsList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1AugmentedManifestsListItem(entry, context);
    });
};
var deserializeAws_json1_1DocumentClassifierInputDataConfig = function (output, context) {
    return {
        AugmentedManifests: output.AugmentedManifests !== undefined && output.AugmentedManifests !== null
            ? deserializeAws_json1_1DocumentClassifierAugmentedManifestsList(output.AugmentedManifests, context)
            : undefined,
        DataFormat: output.DataFormat !== undefined && output.DataFormat !== null ? output.DataFormat : undefined,
        LabelDelimiter: output.LabelDelimiter !== undefined && output.LabelDelimiter !== null ? output.LabelDelimiter : undefined,
        S3Uri: output.S3Uri !== undefined && output.S3Uri !== null ? output.S3Uri : undefined,
    };
};
var deserializeAws_json1_1DocumentClassifierOutputDataConfig = function (output, context) {
    return {
        KmsKeyId: output.KmsKeyId !== undefined && output.KmsKeyId !== null ? output.KmsKeyId : undefined,
        S3Uri: output.S3Uri !== undefined && output.S3Uri !== null ? output.S3Uri : undefined,
    };
};
var deserializeAws_json1_1DocumentClassifierProperties = function (output, context) {
    return {
        ClassifierMetadata: output.ClassifierMetadata !== undefined && output.ClassifierMetadata !== null
            ? deserializeAws_json1_1ClassifierMetadata(output.ClassifierMetadata, context)
            : undefined,
        DataAccessRoleArn: output.DataAccessRoleArn !== undefined && output.DataAccessRoleArn !== null
            ? output.DataAccessRoleArn
            : undefined,
        DocumentClassifierArn: output.DocumentClassifierArn !== undefined && output.DocumentClassifierArn !== null
            ? output.DocumentClassifierArn
            : undefined,
        EndTime: output.EndTime !== undefined && output.EndTime !== null ? new Date(Math.round(output.EndTime * 1000)) : undefined,
        InputDataConfig: output.InputDataConfig !== undefined && output.InputDataConfig !== null
            ? deserializeAws_json1_1DocumentClassifierInputDataConfig(output.InputDataConfig, context)
            : undefined,
        LanguageCode: output.LanguageCode !== undefined && output.LanguageCode !== null ? output.LanguageCode : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
        Mode: output.Mode !== undefined && output.Mode !== null ? output.Mode : undefined,
        OutputDataConfig: output.OutputDataConfig !== undefined && output.OutputDataConfig !== null
            ? deserializeAws_json1_1DocumentClassifierOutputDataConfig(output.OutputDataConfig, context)
            : undefined,
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
        SubmitTime: output.SubmitTime !== undefined && output.SubmitTime !== null
            ? new Date(Math.round(output.SubmitTime * 1000))
            : undefined,
        TrainingEndTime: output.TrainingEndTime !== undefined && output.TrainingEndTime !== null
            ? new Date(Math.round(output.TrainingEndTime * 1000))
            : undefined,
        TrainingStartTime: output.TrainingStartTime !== undefined && output.TrainingStartTime !== null
            ? new Date(Math.round(output.TrainingStartTime * 1000))
            : undefined,
        VolumeKmsKeyId: output.VolumeKmsKeyId !== undefined && output.VolumeKmsKeyId !== null ? output.VolumeKmsKeyId : undefined,
        VpcConfig: output.VpcConfig !== undefined && output.VpcConfig !== null
            ? deserializeAws_json1_1VpcConfig(output.VpcConfig, context)
            : undefined,
    };
};
var deserializeAws_json1_1DocumentClassifierPropertiesList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1DocumentClassifierProperties(entry, context);
    });
};
var deserializeAws_json1_1DocumentLabel = function (output, context) {
    return {
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        Score: output.Score !== undefined && output.Score !== null ? output.Score : undefined,
    };
};
var deserializeAws_json1_1DominantLanguage = function (output, context) {
    return {
        LanguageCode: output.LanguageCode !== undefined && output.LanguageCode !== null ? output.LanguageCode : undefined,
        Score: output.Score !== undefined && output.Score !== null ? output.Score : undefined,
    };
};
var deserializeAws_json1_1DominantLanguageDetectionJobProperties = function (output, context) {
    return {
        DataAccessRoleArn: output.DataAccessRoleArn !== undefined && output.DataAccessRoleArn !== null
            ? output.DataAccessRoleArn
            : undefined,
        EndTime: output.EndTime !== undefined && output.EndTime !== null ? new Date(Math.round(output.EndTime * 1000)) : undefined,
        InputDataConfig: output.InputDataConfig !== undefined && output.InputDataConfig !== null
            ? deserializeAws_json1_1InputDataConfig(output.InputDataConfig, context)
            : undefined,
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobName: output.JobName !== undefined && output.JobName !== null ? output.JobName : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
        OutputDataConfig: output.OutputDataConfig !== undefined && output.OutputDataConfig !== null
            ? deserializeAws_json1_1OutputDataConfig(output.OutputDataConfig, context)
            : undefined,
        SubmitTime: output.SubmitTime !== undefined && output.SubmitTime !== null
            ? new Date(Math.round(output.SubmitTime * 1000))
            : undefined,
        VolumeKmsKeyId: output.VolumeKmsKeyId !== undefined && output.VolumeKmsKeyId !== null ? output.VolumeKmsKeyId : undefined,
        VpcConfig: output.VpcConfig !== undefined && output.VpcConfig !== null
            ? deserializeAws_json1_1VpcConfig(output.VpcConfig, context)
            : undefined,
    };
};
var deserializeAws_json1_1DominantLanguageDetectionJobPropertiesList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1DominantLanguageDetectionJobProperties(entry, context);
    });
};
var deserializeAws_json1_1EndpointProperties = function (output, context) {
    return {
        CreationTime: output.CreationTime !== undefined && output.CreationTime !== null
            ? new Date(Math.round(output.CreationTime * 1000))
            : undefined,
        CurrentInferenceUnits: output.CurrentInferenceUnits !== undefined && output.CurrentInferenceUnits !== null
            ? output.CurrentInferenceUnits
            : undefined,
        DesiredInferenceUnits: output.DesiredInferenceUnits !== undefined && output.DesiredInferenceUnits !== null
            ? output.DesiredInferenceUnits
            : undefined,
        EndpointArn: output.EndpointArn !== undefined && output.EndpointArn !== null ? output.EndpointArn : undefined,
        LastModifiedTime: output.LastModifiedTime !== undefined && output.LastModifiedTime !== null
            ? new Date(Math.round(output.LastModifiedTime * 1000))
            : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
        ModelArn: output.ModelArn !== undefined && output.ModelArn !== null ? output.ModelArn : undefined,
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
    };
};
var deserializeAws_json1_1EndpointPropertiesList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1EndpointProperties(entry, context);
    });
};
var deserializeAws_json1_1EntitiesDetectionJobProperties = function (output, context) {
    return {
        DataAccessRoleArn: output.DataAccessRoleArn !== undefined && output.DataAccessRoleArn !== null
            ? output.DataAccessRoleArn
            : undefined,
        EndTime: output.EndTime !== undefined && output.EndTime !== null ? new Date(Math.round(output.EndTime * 1000)) : undefined,
        EntityRecognizerArn: output.EntityRecognizerArn !== undefined && output.EntityRecognizerArn !== null
            ? output.EntityRecognizerArn
            : undefined,
        InputDataConfig: output.InputDataConfig !== undefined && output.InputDataConfig !== null
            ? deserializeAws_json1_1InputDataConfig(output.InputDataConfig, context)
            : undefined,
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobName: output.JobName !== undefined && output.JobName !== null ? output.JobName : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
        LanguageCode: output.LanguageCode !== undefined && output.LanguageCode !== null ? output.LanguageCode : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
        OutputDataConfig: output.OutputDataConfig !== undefined && output.OutputDataConfig !== null
            ? deserializeAws_json1_1OutputDataConfig(output.OutputDataConfig, context)
            : undefined,
        SubmitTime: output.SubmitTime !== undefined && output.SubmitTime !== null
            ? new Date(Math.round(output.SubmitTime * 1000))
            : undefined,
        VolumeKmsKeyId: output.VolumeKmsKeyId !== undefined && output.VolumeKmsKeyId !== null ? output.VolumeKmsKeyId : undefined,
        VpcConfig: output.VpcConfig !== undefined && output.VpcConfig !== null
            ? deserializeAws_json1_1VpcConfig(output.VpcConfig, context)
            : undefined,
    };
};
var deserializeAws_json1_1EntitiesDetectionJobPropertiesList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1EntitiesDetectionJobProperties(entry, context);
    });
};
var deserializeAws_json1_1Entity = function (output, context) {
    return {
        BeginOffset: output.BeginOffset !== undefined && output.BeginOffset !== null ? output.BeginOffset : undefined,
        EndOffset: output.EndOffset !== undefined && output.EndOffset !== null ? output.EndOffset : undefined,
        Score: output.Score !== undefined && output.Score !== null ? output.Score : undefined,
        Text: output.Text !== undefined && output.Text !== null ? output.Text : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
var deserializeAws_json1_1EntityRecognizerAnnotations = function (output, context) {
    return {
        S3Uri: output.S3Uri !== undefined && output.S3Uri !== null ? output.S3Uri : undefined,
    };
};
var deserializeAws_json1_1EntityRecognizerAugmentedManifestsList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1AugmentedManifestsListItem(entry, context);
    });
};
var deserializeAws_json1_1EntityRecognizerDocuments = function (output, context) {
    return {
        S3Uri: output.S3Uri !== undefined && output.S3Uri !== null ? output.S3Uri : undefined,
    };
};
var deserializeAws_json1_1EntityRecognizerEntityList = function (output, context) {
    return {
        S3Uri: output.S3Uri !== undefined && output.S3Uri !== null ? output.S3Uri : undefined,
    };
};
var deserializeAws_json1_1EntityRecognizerEvaluationMetrics = function (output, context) {
    return {
        F1Score: output.F1Score !== undefined && output.F1Score !== null ? output.F1Score : undefined,
        Precision: output.Precision !== undefined && output.Precision !== null ? output.Precision : undefined,
        Recall: output.Recall !== undefined && output.Recall !== null ? output.Recall : undefined,
    };
};
var deserializeAws_json1_1EntityRecognizerInputDataConfig = function (output, context) {
    return {
        Annotations: output.Annotations !== undefined && output.Annotations !== null
            ? deserializeAws_json1_1EntityRecognizerAnnotations(output.Annotations, context)
            : undefined,
        AugmentedManifests: output.AugmentedManifests !== undefined && output.AugmentedManifests !== null
            ? deserializeAws_json1_1EntityRecognizerAugmentedManifestsList(output.AugmentedManifests, context)
            : undefined,
        DataFormat: output.DataFormat !== undefined && output.DataFormat !== null ? output.DataFormat : undefined,
        Documents: output.Documents !== undefined && output.Documents !== null
            ? deserializeAws_json1_1EntityRecognizerDocuments(output.Documents, context)
            : undefined,
        EntityList: output.EntityList !== undefined && output.EntityList !== null
            ? deserializeAws_json1_1EntityRecognizerEntityList(output.EntityList, context)
            : undefined,
        EntityTypes: output.EntityTypes !== undefined && output.EntityTypes !== null
            ? deserializeAws_json1_1EntityTypesList(output.EntityTypes, context)
            : undefined,
    };
};
var deserializeAws_json1_1EntityRecognizerMetadata = function (output, context) {
    return {
        EntityTypes: output.EntityTypes !== undefined && output.EntityTypes !== null
            ? deserializeAws_json1_1EntityRecognizerMetadataEntityTypesList(output.EntityTypes, context)
            : undefined,
        EvaluationMetrics: output.EvaluationMetrics !== undefined && output.EvaluationMetrics !== null
            ? deserializeAws_json1_1EntityRecognizerEvaluationMetrics(output.EvaluationMetrics, context)
            : undefined,
        NumberOfTestDocuments: output.NumberOfTestDocuments !== undefined && output.NumberOfTestDocuments !== null
            ? output.NumberOfTestDocuments
            : undefined,
        NumberOfTrainedDocuments: output.NumberOfTrainedDocuments !== undefined && output.NumberOfTrainedDocuments !== null
            ? output.NumberOfTrainedDocuments
            : undefined,
    };
};
var deserializeAws_json1_1EntityRecognizerMetadataEntityTypesList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1EntityRecognizerMetadataEntityTypesListItem(entry, context);
    });
};
var deserializeAws_json1_1EntityRecognizerMetadataEntityTypesListItem = function (output, context) {
    return {
        EvaluationMetrics: output.EvaluationMetrics !== undefined && output.EvaluationMetrics !== null
            ? deserializeAws_json1_1EntityTypesEvaluationMetrics(output.EvaluationMetrics, context)
            : undefined,
        NumberOfTrainMentions: output.NumberOfTrainMentions !== undefined && output.NumberOfTrainMentions !== null
            ? output.NumberOfTrainMentions
            : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
var deserializeAws_json1_1EntityRecognizerProperties = function (output, context) {
    return {
        DataAccessRoleArn: output.DataAccessRoleArn !== undefined && output.DataAccessRoleArn !== null
            ? output.DataAccessRoleArn
            : undefined,
        EndTime: output.EndTime !== undefined && output.EndTime !== null ? new Date(Math.round(output.EndTime * 1000)) : undefined,
        EntityRecognizerArn: output.EntityRecognizerArn !== undefined && output.EntityRecognizerArn !== null
            ? output.EntityRecognizerArn
            : undefined,
        InputDataConfig: output.InputDataConfig !== undefined && output.InputDataConfig !== null
            ? deserializeAws_json1_1EntityRecognizerInputDataConfig(output.InputDataConfig, context)
            : undefined,
        LanguageCode: output.LanguageCode !== undefined && output.LanguageCode !== null ? output.LanguageCode : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
        RecognizerMetadata: output.RecognizerMetadata !== undefined && output.RecognizerMetadata !== null
            ? deserializeAws_json1_1EntityRecognizerMetadata(output.RecognizerMetadata, context)
            : undefined,
        Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
        SubmitTime: output.SubmitTime !== undefined && output.SubmitTime !== null
            ? new Date(Math.round(output.SubmitTime * 1000))
            : undefined,
        TrainingEndTime: output.TrainingEndTime !== undefined && output.TrainingEndTime !== null
            ? new Date(Math.round(output.TrainingEndTime * 1000))
            : undefined,
        TrainingStartTime: output.TrainingStartTime !== undefined && output.TrainingStartTime !== null
            ? new Date(Math.round(output.TrainingStartTime * 1000))
            : undefined,
        VolumeKmsKeyId: output.VolumeKmsKeyId !== undefined && output.VolumeKmsKeyId !== null ? output.VolumeKmsKeyId : undefined,
        VpcConfig: output.VpcConfig !== undefined && output.VpcConfig !== null
            ? deserializeAws_json1_1VpcConfig(output.VpcConfig, context)
            : undefined,
    };
};
var deserializeAws_json1_1EntityRecognizerPropertiesList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1EntityRecognizerProperties(entry, context);
    });
};
var deserializeAws_json1_1EntityTypesEvaluationMetrics = function (output, context) {
    return {
        F1Score: output.F1Score !== undefined && output.F1Score !== null ? output.F1Score : undefined,
        Precision: output.Precision !== undefined && output.Precision !== null ? output.Precision : undefined,
        Recall: output.Recall !== undefined && output.Recall !== null ? output.Recall : undefined,
    };
};
var deserializeAws_json1_1EntityTypesList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1EntityTypesListItem(entry, context);
    });
};
var deserializeAws_json1_1EntityTypesListItem = function (output, context) {
    return {
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
var deserializeAws_json1_1EventsDetectionJobProperties = function (output, context) {
    return {
        DataAccessRoleArn: output.DataAccessRoleArn !== undefined && output.DataAccessRoleArn !== null
            ? output.DataAccessRoleArn
            : undefined,
        EndTime: output.EndTime !== undefined && output.EndTime !== null ? new Date(Math.round(output.EndTime * 1000)) : undefined,
        InputDataConfig: output.InputDataConfig !== undefined && output.InputDataConfig !== null
            ? deserializeAws_json1_1InputDataConfig(output.InputDataConfig, context)
            : undefined,
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobName: output.JobName !== undefined && output.JobName !== null ? output.JobName : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
        LanguageCode: output.LanguageCode !== undefined && output.LanguageCode !== null ? output.LanguageCode : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
        OutputDataConfig: output.OutputDataConfig !== undefined && output.OutputDataConfig !== null
            ? deserializeAws_json1_1OutputDataConfig(output.OutputDataConfig, context)
            : undefined,
        SubmitTime: output.SubmitTime !== undefined && output.SubmitTime !== null
            ? new Date(Math.round(output.SubmitTime * 1000))
            : undefined,
        TargetEventTypes: output.TargetEventTypes !== undefined && output.TargetEventTypes !== null
            ? deserializeAws_json1_1TargetEventTypes(output.TargetEventTypes, context)
            : undefined,
    };
};
var deserializeAws_json1_1EventsDetectionJobPropertiesList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1EventsDetectionJobProperties(entry, context);
    });
};
var deserializeAws_json1_1InputDataConfig = function (output, context) {
    return {
        InputFormat: output.InputFormat !== undefined && output.InputFormat !== null ? output.InputFormat : undefined,
        S3Uri: output.S3Uri !== undefined && output.S3Uri !== null ? output.S3Uri : undefined,
    };
};
var deserializeAws_json1_1InternalServerException = function (output, context) {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1InvalidFilterException = function (output, context) {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1InvalidRequestException = function (output, context) {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1JobNotFoundException = function (output, context) {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1KeyPhrase = function (output, context) {
    return {
        BeginOffset: output.BeginOffset !== undefined && output.BeginOffset !== null ? output.BeginOffset : undefined,
        EndOffset: output.EndOffset !== undefined && output.EndOffset !== null ? output.EndOffset : undefined,
        Score: output.Score !== undefined && output.Score !== null ? output.Score : undefined,
        Text: output.Text !== undefined && output.Text !== null ? output.Text : undefined,
    };
};
var deserializeAws_json1_1KeyPhrasesDetectionJobProperties = function (output, context) {
    return {
        DataAccessRoleArn: output.DataAccessRoleArn !== undefined && output.DataAccessRoleArn !== null
            ? output.DataAccessRoleArn
            : undefined,
        EndTime: output.EndTime !== undefined && output.EndTime !== null ? new Date(Math.round(output.EndTime * 1000)) : undefined,
        InputDataConfig: output.InputDataConfig !== undefined && output.InputDataConfig !== null
            ? deserializeAws_json1_1InputDataConfig(output.InputDataConfig, context)
            : undefined,
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobName: output.JobName !== undefined && output.JobName !== null ? output.JobName : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
        LanguageCode: output.LanguageCode !== undefined && output.LanguageCode !== null ? output.LanguageCode : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
        OutputDataConfig: output.OutputDataConfig !== undefined && output.OutputDataConfig !== null
            ? deserializeAws_json1_1OutputDataConfig(output.OutputDataConfig, context)
            : undefined,
        SubmitTime: output.SubmitTime !== undefined && output.SubmitTime !== null
            ? new Date(Math.round(output.SubmitTime * 1000))
            : undefined,
        VolumeKmsKeyId: output.VolumeKmsKeyId !== undefined && output.VolumeKmsKeyId !== null ? output.VolumeKmsKeyId : undefined,
        VpcConfig: output.VpcConfig !== undefined && output.VpcConfig !== null
            ? deserializeAws_json1_1VpcConfig(output.VpcConfig, context)
            : undefined,
    };
};
var deserializeAws_json1_1KeyPhrasesDetectionJobPropertiesList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1KeyPhrasesDetectionJobProperties(entry, context);
    });
};
var deserializeAws_json1_1KmsKeyValidationException = function (output, context) {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1ListDocumentClassificationJobsResponse = function (output, context) {
    return {
        DocumentClassificationJobPropertiesList: output.DocumentClassificationJobPropertiesList !== undefined &&
            output.DocumentClassificationJobPropertiesList !== null
            ? deserializeAws_json1_1DocumentClassificationJobPropertiesList(output.DocumentClassificationJobPropertiesList, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    };
};
var deserializeAws_json1_1ListDocumentClassifiersResponse = function (output, context) {
    return {
        DocumentClassifierPropertiesList: output.DocumentClassifierPropertiesList !== undefined && output.DocumentClassifierPropertiesList !== null
            ? deserializeAws_json1_1DocumentClassifierPropertiesList(output.DocumentClassifierPropertiesList, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    };
};
var deserializeAws_json1_1ListDominantLanguageDetectionJobsResponse = function (output, context) {
    return {
        DominantLanguageDetectionJobPropertiesList: output.DominantLanguageDetectionJobPropertiesList !== undefined &&
            output.DominantLanguageDetectionJobPropertiesList !== null
            ? deserializeAws_json1_1DominantLanguageDetectionJobPropertiesList(output.DominantLanguageDetectionJobPropertiesList, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    };
};
var deserializeAws_json1_1ListEndpointsResponse = function (output, context) {
    return {
        EndpointPropertiesList: output.EndpointPropertiesList !== undefined && output.EndpointPropertiesList !== null
            ? deserializeAws_json1_1EndpointPropertiesList(output.EndpointPropertiesList, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    };
};
var deserializeAws_json1_1ListEntitiesDetectionJobsResponse = function (output, context) {
    return {
        EntitiesDetectionJobPropertiesList: output.EntitiesDetectionJobPropertiesList !== undefined && output.EntitiesDetectionJobPropertiesList !== null
            ? deserializeAws_json1_1EntitiesDetectionJobPropertiesList(output.EntitiesDetectionJobPropertiesList, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    };
};
var deserializeAws_json1_1ListEntityRecognizersResponse = function (output, context) {
    return {
        EntityRecognizerPropertiesList: output.EntityRecognizerPropertiesList !== undefined && output.EntityRecognizerPropertiesList !== null
            ? deserializeAws_json1_1EntityRecognizerPropertiesList(output.EntityRecognizerPropertiesList, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    };
};
var deserializeAws_json1_1ListEventsDetectionJobsResponse = function (output, context) {
    return {
        EventsDetectionJobPropertiesList: output.EventsDetectionJobPropertiesList !== undefined && output.EventsDetectionJobPropertiesList !== null
            ? deserializeAws_json1_1EventsDetectionJobPropertiesList(output.EventsDetectionJobPropertiesList, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    };
};
var deserializeAws_json1_1ListKeyPhrasesDetectionJobsResponse = function (output, context) {
    return {
        KeyPhrasesDetectionJobPropertiesList: output.KeyPhrasesDetectionJobPropertiesList !== undefined && output.KeyPhrasesDetectionJobPropertiesList !== null
            ? deserializeAws_json1_1KeyPhrasesDetectionJobPropertiesList(output.KeyPhrasesDetectionJobPropertiesList, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    };
};
var deserializeAws_json1_1ListOfClasses = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1DocumentClass(entry, context);
    });
};
var deserializeAws_json1_1ListOfDetectDominantLanguageResult = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1BatchDetectDominantLanguageItemResult(entry, context);
    });
};
var deserializeAws_json1_1ListOfDetectEntitiesResult = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1BatchDetectEntitiesItemResult(entry, context);
    });
};
var deserializeAws_json1_1ListOfDetectKeyPhrasesResult = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1BatchDetectKeyPhrasesItemResult(entry, context);
    });
};
var deserializeAws_json1_1ListOfDetectSentimentResult = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1BatchDetectSentimentItemResult(entry, context);
    });
};
var deserializeAws_json1_1ListOfDetectSyntaxResult = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1BatchDetectSyntaxItemResult(entry, context);
    });
};
var deserializeAws_json1_1ListOfDominantLanguages = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1DominantLanguage(entry, context);
    });
};
var deserializeAws_json1_1ListOfEntities = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Entity(entry, context);
    });
};
var deserializeAws_json1_1ListOfKeyPhrases = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1KeyPhrase(entry, context);
    });
};
var deserializeAws_json1_1ListOfLabels = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1DocumentLabel(entry, context);
    });
};
var deserializeAws_json1_1ListOfPiiEntities = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1PiiEntity(entry, context);
    });
};
var deserializeAws_json1_1ListOfPiiEntityTypes = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var deserializeAws_json1_1ListOfSyntaxTokens = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1SyntaxToken(entry, context);
    });
};
var deserializeAws_json1_1ListPiiEntitiesDetectionJobsResponse = function (output, context) {
    return {
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        PiiEntitiesDetectionJobPropertiesList: output.PiiEntitiesDetectionJobPropertiesList !== undefined &&
            output.PiiEntitiesDetectionJobPropertiesList !== null
            ? deserializeAws_json1_1PiiEntitiesDetectionJobPropertiesList(output.PiiEntitiesDetectionJobPropertiesList, context)
            : undefined,
    };
};
var deserializeAws_json1_1ListSentimentDetectionJobsResponse = function (output, context) {
    return {
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        SentimentDetectionJobPropertiesList: output.SentimentDetectionJobPropertiesList !== undefined && output.SentimentDetectionJobPropertiesList !== null
            ? deserializeAws_json1_1SentimentDetectionJobPropertiesList(output.SentimentDetectionJobPropertiesList, context)
            : undefined,
    };
};
var deserializeAws_json1_1ListTagsForResourceResponse = function (output, context) {
    return {
        ResourceArn: output.ResourceArn !== undefined && output.ResourceArn !== null ? output.ResourceArn : undefined,
        Tags: output.Tags !== undefined && output.Tags !== null
            ? deserializeAws_json1_1TagList(output.Tags, context)
            : undefined,
    };
};
var deserializeAws_json1_1ListTopicsDetectionJobsResponse = function (output, context) {
    return {
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        TopicsDetectionJobPropertiesList: output.TopicsDetectionJobPropertiesList !== undefined && output.TopicsDetectionJobPropertiesList !== null
            ? deserializeAws_json1_1TopicsDetectionJobPropertiesList(output.TopicsDetectionJobPropertiesList, context)
            : undefined,
    };
};
var deserializeAws_json1_1OutputDataConfig = function (output, context) {
    return {
        KmsKeyId: output.KmsKeyId !== undefined && output.KmsKeyId !== null ? output.KmsKeyId : undefined,
        S3Uri: output.S3Uri !== undefined && output.S3Uri !== null ? output.S3Uri : undefined,
    };
};
var deserializeAws_json1_1PartOfSpeechTag = function (output, context) {
    return {
        Score: output.Score !== undefined && output.Score !== null ? output.Score : undefined,
        Tag: output.Tag !== undefined && output.Tag !== null ? output.Tag : undefined,
    };
};
var deserializeAws_json1_1PiiEntitiesDetectionJobProperties = function (output, context) {
    return {
        DataAccessRoleArn: output.DataAccessRoleArn !== undefined && output.DataAccessRoleArn !== null
            ? output.DataAccessRoleArn
            : undefined,
        EndTime: output.EndTime !== undefined && output.EndTime !== null ? new Date(Math.round(output.EndTime * 1000)) : undefined,
        InputDataConfig: output.InputDataConfig !== undefined && output.InputDataConfig !== null
            ? deserializeAws_json1_1InputDataConfig(output.InputDataConfig, context)
            : undefined,
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobName: output.JobName !== undefined && output.JobName !== null ? output.JobName : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
        LanguageCode: output.LanguageCode !== undefined && output.LanguageCode !== null ? output.LanguageCode : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
        Mode: output.Mode !== undefined && output.Mode !== null ? output.Mode : undefined,
        OutputDataConfig: output.OutputDataConfig !== undefined && output.OutputDataConfig !== null
            ? deserializeAws_json1_1PiiOutputDataConfig(output.OutputDataConfig, context)
            : undefined,
        RedactionConfig: output.RedactionConfig !== undefined && output.RedactionConfig !== null
            ? deserializeAws_json1_1RedactionConfig(output.RedactionConfig, context)
            : undefined,
        SubmitTime: output.SubmitTime !== undefined && output.SubmitTime !== null
            ? new Date(Math.round(output.SubmitTime * 1000))
            : undefined,
    };
};
var deserializeAws_json1_1PiiEntitiesDetectionJobPropertiesList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1PiiEntitiesDetectionJobProperties(entry, context);
    });
};
var deserializeAws_json1_1PiiEntity = function (output, context) {
    return {
        BeginOffset: output.BeginOffset !== undefined && output.BeginOffset !== null ? output.BeginOffset : undefined,
        EndOffset: output.EndOffset !== undefined && output.EndOffset !== null ? output.EndOffset : undefined,
        Score: output.Score !== undefined && output.Score !== null ? output.Score : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
var deserializeAws_json1_1PiiOutputDataConfig = function (output, context) {
    return {
        KmsKeyId: output.KmsKeyId !== undefined && output.KmsKeyId !== null ? output.KmsKeyId : undefined,
        S3Uri: output.S3Uri !== undefined && output.S3Uri !== null ? output.S3Uri : undefined,
    };
};
var deserializeAws_json1_1RedactionConfig = function (output, context) {
    return {
        MaskCharacter: output.MaskCharacter !== undefined && output.MaskCharacter !== null ? output.MaskCharacter : undefined,
        MaskMode: output.MaskMode !== undefined && output.MaskMode !== null ? output.MaskMode : undefined,
        PiiEntityTypes: output.PiiEntityTypes !== undefined && output.PiiEntityTypes !== null
            ? deserializeAws_json1_1ListOfPiiEntityTypes(output.PiiEntityTypes, context)
            : undefined,
    };
};
var deserializeAws_json1_1ResourceInUseException = function (output, context) {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1ResourceLimitExceededException = function (output, context) {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1ResourceNotFoundException = function (output, context) {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1ResourceUnavailableException = function (output, context) {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1SecurityGroupIds = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var deserializeAws_json1_1SentimentDetectionJobProperties = function (output, context) {
    return {
        DataAccessRoleArn: output.DataAccessRoleArn !== undefined && output.DataAccessRoleArn !== null
            ? output.DataAccessRoleArn
            : undefined,
        EndTime: output.EndTime !== undefined && output.EndTime !== null ? new Date(Math.round(output.EndTime * 1000)) : undefined,
        InputDataConfig: output.InputDataConfig !== undefined && output.InputDataConfig !== null
            ? deserializeAws_json1_1InputDataConfig(output.InputDataConfig, context)
            : undefined,
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobName: output.JobName !== undefined && output.JobName !== null ? output.JobName : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
        LanguageCode: output.LanguageCode !== undefined && output.LanguageCode !== null ? output.LanguageCode : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
        OutputDataConfig: output.OutputDataConfig !== undefined && output.OutputDataConfig !== null
            ? deserializeAws_json1_1OutputDataConfig(output.OutputDataConfig, context)
            : undefined,
        SubmitTime: output.SubmitTime !== undefined && output.SubmitTime !== null
            ? new Date(Math.round(output.SubmitTime * 1000))
            : undefined,
        VolumeKmsKeyId: output.VolumeKmsKeyId !== undefined && output.VolumeKmsKeyId !== null ? output.VolumeKmsKeyId : undefined,
        VpcConfig: output.VpcConfig !== undefined && output.VpcConfig !== null
            ? deserializeAws_json1_1VpcConfig(output.VpcConfig, context)
            : undefined,
    };
};
var deserializeAws_json1_1SentimentDetectionJobPropertiesList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1SentimentDetectionJobProperties(entry, context);
    });
};
var deserializeAws_json1_1SentimentScore = function (output, context) {
    return {
        Mixed: output.Mixed !== undefined && output.Mixed !== null ? output.Mixed : undefined,
        Negative: output.Negative !== undefined && output.Negative !== null ? output.Negative : undefined,
        Neutral: output.Neutral !== undefined && output.Neutral !== null ? output.Neutral : undefined,
        Positive: output.Positive !== undefined && output.Positive !== null ? output.Positive : undefined,
    };
};
var deserializeAws_json1_1StartDocumentClassificationJobResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
var deserializeAws_json1_1StartDominantLanguageDetectionJobResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
var deserializeAws_json1_1StartEntitiesDetectionJobResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
var deserializeAws_json1_1StartEventsDetectionJobResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
var deserializeAws_json1_1StartKeyPhrasesDetectionJobResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
var deserializeAws_json1_1StartPiiEntitiesDetectionJobResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
var deserializeAws_json1_1StartSentimentDetectionJobResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
var deserializeAws_json1_1StartTopicsDetectionJobResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
var deserializeAws_json1_1StopDominantLanguageDetectionJobResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
var deserializeAws_json1_1StopEntitiesDetectionJobResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
var deserializeAws_json1_1StopEventsDetectionJobResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
var deserializeAws_json1_1StopKeyPhrasesDetectionJobResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
var deserializeAws_json1_1StopPiiEntitiesDetectionJobResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
var deserializeAws_json1_1StopSentimentDetectionJobResponse = function (output, context) {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
var deserializeAws_json1_1StopTrainingDocumentClassifierResponse = function (output, context) {
    return {};
};
var deserializeAws_json1_1StopTrainingEntityRecognizerResponse = function (output, context) {
    return {};
};
var deserializeAws_json1_1Subnets = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var deserializeAws_json1_1SyntaxToken = function (output, context) {
    return {
        BeginOffset: output.BeginOffset !== undefined && output.BeginOffset !== null ? output.BeginOffset : undefined,
        EndOffset: output.EndOffset !== undefined && output.EndOffset !== null ? output.EndOffset : undefined,
        PartOfSpeech: output.PartOfSpeech !== undefined && output.PartOfSpeech !== null
            ? deserializeAws_json1_1PartOfSpeechTag(output.PartOfSpeech, context)
            : undefined,
        Text: output.Text !== undefined && output.Text !== null ? output.Text : undefined,
        TokenId: output.TokenId !== undefined && output.TokenId !== null ? output.TokenId : undefined,
    };
};
var deserializeAws_json1_1Tag = function (output, context) {
    return {
        Key: output.Key !== undefined && output.Key !== null ? output.Key : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
var deserializeAws_json1_1TagList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Tag(entry, context);
    });
};
var deserializeAws_json1_1TagResourceResponse = function (output, context) {
    return {};
};
var deserializeAws_json1_1TargetEventTypes = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
var deserializeAws_json1_1TextSizeLimitExceededException = function (output, context) {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1TooManyRequestsException = function (output, context) {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1TooManyTagKeysException = function (output, context) {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1TooManyTagsException = function (output, context) {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1TopicsDetectionJobProperties = function (output, context) {
    return {
        DataAccessRoleArn: output.DataAccessRoleArn !== undefined && output.DataAccessRoleArn !== null
            ? output.DataAccessRoleArn
            : undefined,
        EndTime: output.EndTime !== undefined && output.EndTime !== null ? new Date(Math.round(output.EndTime * 1000)) : undefined,
        InputDataConfig: output.InputDataConfig !== undefined && output.InputDataConfig !== null
            ? deserializeAws_json1_1InputDataConfig(output.InputDataConfig, context)
            : undefined,
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobName: output.JobName !== undefined && output.JobName !== null ? output.JobName : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
        NumberOfTopics: output.NumberOfTopics !== undefined && output.NumberOfTopics !== null ? output.NumberOfTopics : undefined,
        OutputDataConfig: output.OutputDataConfig !== undefined && output.OutputDataConfig !== null
            ? deserializeAws_json1_1OutputDataConfig(output.OutputDataConfig, context)
            : undefined,
        SubmitTime: output.SubmitTime !== undefined && output.SubmitTime !== null
            ? new Date(Math.round(output.SubmitTime * 1000))
            : undefined,
        VolumeKmsKeyId: output.VolumeKmsKeyId !== undefined && output.VolumeKmsKeyId !== null ? output.VolumeKmsKeyId : undefined,
        VpcConfig: output.VpcConfig !== undefined && output.VpcConfig !== null
            ? deserializeAws_json1_1VpcConfig(output.VpcConfig, context)
            : undefined,
    };
};
var deserializeAws_json1_1TopicsDetectionJobPropertiesList = function (output, context) {
    return (output || [])
        .filter(function (e) { return e != null; })
        .map(function (entry) {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1TopicsDetectionJobProperties(entry, context);
    });
};
var deserializeAws_json1_1UnsupportedLanguageException = function (output, context) {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
var deserializeAws_json1_1UntagResourceResponse = function (output, context) {
    return {};
};
var deserializeAws_json1_1UpdateEndpointResponse = function (output, context) {
    return {};
};
var deserializeAws_json1_1VpcConfig = function (output, context) {
    return {
        SecurityGroupIds: output.SecurityGroupIds !== undefined && output.SecurityGroupIds !== null
            ? deserializeAws_json1_1SecurityGroupIds(output.SecurityGroupIds, context)
            : undefined,
        Subnets: output.Subnets !== undefined && output.Subnets !== null
            ? deserializeAws_json1_1Subnets(output.Subnets, context)
            : undefined,
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
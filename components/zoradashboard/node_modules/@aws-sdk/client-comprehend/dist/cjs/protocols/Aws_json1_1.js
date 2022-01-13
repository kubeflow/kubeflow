"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeAws_json1_1StopDominantLanguageDetectionJobCommand = exports.serializeAws_json1_1StartTopicsDetectionJobCommand = exports.serializeAws_json1_1StartSentimentDetectionJobCommand = exports.serializeAws_json1_1StartPiiEntitiesDetectionJobCommand = exports.serializeAws_json1_1StartKeyPhrasesDetectionJobCommand = exports.serializeAws_json1_1StartEventsDetectionJobCommand = exports.serializeAws_json1_1StartEntitiesDetectionJobCommand = exports.serializeAws_json1_1StartDominantLanguageDetectionJobCommand = exports.serializeAws_json1_1StartDocumentClassificationJobCommand = exports.serializeAws_json1_1ListTopicsDetectionJobsCommand = exports.serializeAws_json1_1ListTagsForResourceCommand = exports.serializeAws_json1_1ListSentimentDetectionJobsCommand = exports.serializeAws_json1_1ListPiiEntitiesDetectionJobsCommand = exports.serializeAws_json1_1ListKeyPhrasesDetectionJobsCommand = exports.serializeAws_json1_1ListEventsDetectionJobsCommand = exports.serializeAws_json1_1ListEntityRecognizersCommand = exports.serializeAws_json1_1ListEntitiesDetectionJobsCommand = exports.serializeAws_json1_1ListEndpointsCommand = exports.serializeAws_json1_1ListDominantLanguageDetectionJobsCommand = exports.serializeAws_json1_1ListDocumentClassifiersCommand = exports.serializeAws_json1_1ListDocumentClassificationJobsCommand = exports.serializeAws_json1_1DetectSyntaxCommand = exports.serializeAws_json1_1DetectSentimentCommand = exports.serializeAws_json1_1DetectPiiEntitiesCommand = exports.serializeAws_json1_1DetectKeyPhrasesCommand = exports.serializeAws_json1_1DetectEntitiesCommand = exports.serializeAws_json1_1DetectDominantLanguageCommand = exports.serializeAws_json1_1DescribeTopicsDetectionJobCommand = exports.serializeAws_json1_1DescribeSentimentDetectionJobCommand = exports.serializeAws_json1_1DescribePiiEntitiesDetectionJobCommand = exports.serializeAws_json1_1DescribeKeyPhrasesDetectionJobCommand = exports.serializeAws_json1_1DescribeEventsDetectionJobCommand = exports.serializeAws_json1_1DescribeEntityRecognizerCommand = exports.serializeAws_json1_1DescribeEntitiesDetectionJobCommand = exports.serializeAws_json1_1DescribeEndpointCommand = exports.serializeAws_json1_1DescribeDominantLanguageDetectionJobCommand = exports.serializeAws_json1_1DescribeDocumentClassifierCommand = exports.serializeAws_json1_1DescribeDocumentClassificationJobCommand = exports.serializeAws_json1_1DeleteEntityRecognizerCommand = exports.serializeAws_json1_1DeleteEndpointCommand = exports.serializeAws_json1_1DeleteDocumentClassifierCommand = exports.serializeAws_json1_1CreateEntityRecognizerCommand = exports.serializeAws_json1_1CreateEndpointCommand = exports.serializeAws_json1_1CreateDocumentClassifierCommand = exports.serializeAws_json1_1ClassifyDocumentCommand = exports.serializeAws_json1_1BatchDetectSyntaxCommand = exports.serializeAws_json1_1BatchDetectSentimentCommand = exports.serializeAws_json1_1BatchDetectKeyPhrasesCommand = exports.serializeAws_json1_1BatchDetectEntitiesCommand = exports.serializeAws_json1_1BatchDetectDominantLanguageCommand = void 0;
exports.deserializeAws_json1_1ListTagsForResourceCommand = exports.deserializeAws_json1_1ListSentimentDetectionJobsCommand = exports.deserializeAws_json1_1ListPiiEntitiesDetectionJobsCommand = exports.deserializeAws_json1_1ListKeyPhrasesDetectionJobsCommand = exports.deserializeAws_json1_1ListEventsDetectionJobsCommand = exports.deserializeAws_json1_1ListEntityRecognizersCommand = exports.deserializeAws_json1_1ListEntitiesDetectionJobsCommand = exports.deserializeAws_json1_1ListEndpointsCommand = exports.deserializeAws_json1_1ListDominantLanguageDetectionJobsCommand = exports.deserializeAws_json1_1ListDocumentClassifiersCommand = exports.deserializeAws_json1_1ListDocumentClassificationJobsCommand = exports.deserializeAws_json1_1DetectSyntaxCommand = exports.deserializeAws_json1_1DetectSentimentCommand = exports.deserializeAws_json1_1DetectPiiEntitiesCommand = exports.deserializeAws_json1_1DetectKeyPhrasesCommand = exports.deserializeAws_json1_1DetectEntitiesCommand = exports.deserializeAws_json1_1DetectDominantLanguageCommand = exports.deserializeAws_json1_1DescribeTopicsDetectionJobCommand = exports.deserializeAws_json1_1DescribeSentimentDetectionJobCommand = exports.deserializeAws_json1_1DescribePiiEntitiesDetectionJobCommand = exports.deserializeAws_json1_1DescribeKeyPhrasesDetectionJobCommand = exports.deserializeAws_json1_1DescribeEventsDetectionJobCommand = exports.deserializeAws_json1_1DescribeEntityRecognizerCommand = exports.deserializeAws_json1_1DescribeEntitiesDetectionJobCommand = exports.deserializeAws_json1_1DescribeEndpointCommand = exports.deserializeAws_json1_1DescribeDominantLanguageDetectionJobCommand = exports.deserializeAws_json1_1DescribeDocumentClassifierCommand = exports.deserializeAws_json1_1DescribeDocumentClassificationJobCommand = exports.deserializeAws_json1_1DeleteEntityRecognizerCommand = exports.deserializeAws_json1_1DeleteEndpointCommand = exports.deserializeAws_json1_1DeleteDocumentClassifierCommand = exports.deserializeAws_json1_1CreateEntityRecognizerCommand = exports.deserializeAws_json1_1CreateEndpointCommand = exports.deserializeAws_json1_1CreateDocumentClassifierCommand = exports.deserializeAws_json1_1ClassifyDocumentCommand = exports.deserializeAws_json1_1BatchDetectSyntaxCommand = exports.deserializeAws_json1_1BatchDetectSentimentCommand = exports.deserializeAws_json1_1BatchDetectKeyPhrasesCommand = exports.deserializeAws_json1_1BatchDetectEntitiesCommand = exports.deserializeAws_json1_1BatchDetectDominantLanguageCommand = exports.serializeAws_json1_1UpdateEndpointCommand = exports.serializeAws_json1_1UntagResourceCommand = exports.serializeAws_json1_1TagResourceCommand = exports.serializeAws_json1_1StopTrainingEntityRecognizerCommand = exports.serializeAws_json1_1StopTrainingDocumentClassifierCommand = exports.serializeAws_json1_1StopSentimentDetectionJobCommand = exports.serializeAws_json1_1StopPiiEntitiesDetectionJobCommand = exports.serializeAws_json1_1StopKeyPhrasesDetectionJobCommand = exports.serializeAws_json1_1StopEventsDetectionJobCommand = exports.serializeAws_json1_1StopEntitiesDetectionJobCommand = void 0;
exports.deserializeAws_json1_1UpdateEndpointCommand = exports.deserializeAws_json1_1UntagResourceCommand = exports.deserializeAws_json1_1TagResourceCommand = exports.deserializeAws_json1_1StopTrainingEntityRecognizerCommand = exports.deserializeAws_json1_1StopTrainingDocumentClassifierCommand = exports.deserializeAws_json1_1StopSentimentDetectionJobCommand = exports.deserializeAws_json1_1StopPiiEntitiesDetectionJobCommand = exports.deserializeAws_json1_1StopKeyPhrasesDetectionJobCommand = exports.deserializeAws_json1_1StopEventsDetectionJobCommand = exports.deserializeAws_json1_1StopEntitiesDetectionJobCommand = exports.deserializeAws_json1_1StopDominantLanguageDetectionJobCommand = exports.deserializeAws_json1_1StartTopicsDetectionJobCommand = exports.deserializeAws_json1_1StartSentimentDetectionJobCommand = exports.deserializeAws_json1_1StartPiiEntitiesDetectionJobCommand = exports.deserializeAws_json1_1StartKeyPhrasesDetectionJobCommand = exports.deserializeAws_json1_1StartEventsDetectionJobCommand = exports.deserializeAws_json1_1StartEntitiesDetectionJobCommand = exports.deserializeAws_json1_1StartDominantLanguageDetectionJobCommand = exports.deserializeAws_json1_1StartDocumentClassificationJobCommand = exports.deserializeAws_json1_1ListTopicsDetectionJobsCommand = void 0;
const protocol_http_1 = require("@aws-sdk/protocol-http");
const uuid_1 = require("uuid");
const serializeAws_json1_1BatchDetectDominantLanguageCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.BatchDetectDominantLanguage",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1BatchDetectDominantLanguageRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1BatchDetectDominantLanguageCommand = serializeAws_json1_1BatchDetectDominantLanguageCommand;
const serializeAws_json1_1BatchDetectEntitiesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.BatchDetectEntities",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1BatchDetectEntitiesRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1BatchDetectEntitiesCommand = serializeAws_json1_1BatchDetectEntitiesCommand;
const serializeAws_json1_1BatchDetectKeyPhrasesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.BatchDetectKeyPhrases",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1BatchDetectKeyPhrasesRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1BatchDetectKeyPhrasesCommand = serializeAws_json1_1BatchDetectKeyPhrasesCommand;
const serializeAws_json1_1BatchDetectSentimentCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.BatchDetectSentiment",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1BatchDetectSentimentRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1BatchDetectSentimentCommand = serializeAws_json1_1BatchDetectSentimentCommand;
const serializeAws_json1_1BatchDetectSyntaxCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.BatchDetectSyntax",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1BatchDetectSyntaxRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1BatchDetectSyntaxCommand = serializeAws_json1_1BatchDetectSyntaxCommand;
const serializeAws_json1_1ClassifyDocumentCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.ClassifyDocument",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ClassifyDocumentRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ClassifyDocumentCommand = serializeAws_json1_1ClassifyDocumentCommand;
const serializeAws_json1_1CreateDocumentClassifierCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.CreateDocumentClassifier",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1CreateDocumentClassifierRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1CreateDocumentClassifierCommand = serializeAws_json1_1CreateDocumentClassifierCommand;
const serializeAws_json1_1CreateEndpointCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.CreateEndpoint",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1CreateEndpointRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1CreateEndpointCommand = serializeAws_json1_1CreateEndpointCommand;
const serializeAws_json1_1CreateEntityRecognizerCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.CreateEntityRecognizer",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1CreateEntityRecognizerRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1CreateEntityRecognizerCommand = serializeAws_json1_1CreateEntityRecognizerCommand;
const serializeAws_json1_1DeleteDocumentClassifierCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.DeleteDocumentClassifier",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteDocumentClassifierRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteDocumentClassifierCommand = serializeAws_json1_1DeleteDocumentClassifierCommand;
const serializeAws_json1_1DeleteEndpointCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.DeleteEndpoint",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteEndpointRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteEndpointCommand = serializeAws_json1_1DeleteEndpointCommand;
const serializeAws_json1_1DeleteEntityRecognizerCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.DeleteEntityRecognizer",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DeleteEntityRecognizerRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DeleteEntityRecognizerCommand = serializeAws_json1_1DeleteEntityRecognizerCommand;
const serializeAws_json1_1DescribeDocumentClassificationJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.DescribeDocumentClassificationJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeDocumentClassificationJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeDocumentClassificationJobCommand = serializeAws_json1_1DescribeDocumentClassificationJobCommand;
const serializeAws_json1_1DescribeDocumentClassifierCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.DescribeDocumentClassifier",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeDocumentClassifierRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeDocumentClassifierCommand = serializeAws_json1_1DescribeDocumentClassifierCommand;
const serializeAws_json1_1DescribeDominantLanguageDetectionJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.DescribeDominantLanguageDetectionJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeDominantLanguageDetectionJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeDominantLanguageDetectionJobCommand = serializeAws_json1_1DescribeDominantLanguageDetectionJobCommand;
const serializeAws_json1_1DescribeEndpointCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.DescribeEndpoint",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeEndpointRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeEndpointCommand = serializeAws_json1_1DescribeEndpointCommand;
const serializeAws_json1_1DescribeEntitiesDetectionJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.DescribeEntitiesDetectionJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeEntitiesDetectionJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeEntitiesDetectionJobCommand = serializeAws_json1_1DescribeEntitiesDetectionJobCommand;
const serializeAws_json1_1DescribeEntityRecognizerCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.DescribeEntityRecognizer",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeEntityRecognizerRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeEntityRecognizerCommand = serializeAws_json1_1DescribeEntityRecognizerCommand;
const serializeAws_json1_1DescribeEventsDetectionJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.DescribeEventsDetectionJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeEventsDetectionJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeEventsDetectionJobCommand = serializeAws_json1_1DescribeEventsDetectionJobCommand;
const serializeAws_json1_1DescribeKeyPhrasesDetectionJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.DescribeKeyPhrasesDetectionJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeKeyPhrasesDetectionJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeKeyPhrasesDetectionJobCommand = serializeAws_json1_1DescribeKeyPhrasesDetectionJobCommand;
const serializeAws_json1_1DescribePiiEntitiesDetectionJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.DescribePiiEntitiesDetectionJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribePiiEntitiesDetectionJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribePiiEntitiesDetectionJobCommand = serializeAws_json1_1DescribePiiEntitiesDetectionJobCommand;
const serializeAws_json1_1DescribeSentimentDetectionJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.DescribeSentimentDetectionJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeSentimentDetectionJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeSentimentDetectionJobCommand = serializeAws_json1_1DescribeSentimentDetectionJobCommand;
const serializeAws_json1_1DescribeTopicsDetectionJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.DescribeTopicsDetectionJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DescribeTopicsDetectionJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DescribeTopicsDetectionJobCommand = serializeAws_json1_1DescribeTopicsDetectionJobCommand;
const serializeAws_json1_1DetectDominantLanguageCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.DetectDominantLanguage",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DetectDominantLanguageRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DetectDominantLanguageCommand = serializeAws_json1_1DetectDominantLanguageCommand;
const serializeAws_json1_1DetectEntitiesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.DetectEntities",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DetectEntitiesRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DetectEntitiesCommand = serializeAws_json1_1DetectEntitiesCommand;
const serializeAws_json1_1DetectKeyPhrasesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.DetectKeyPhrases",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DetectKeyPhrasesRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DetectKeyPhrasesCommand = serializeAws_json1_1DetectKeyPhrasesCommand;
const serializeAws_json1_1DetectPiiEntitiesCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.DetectPiiEntities",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DetectPiiEntitiesRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DetectPiiEntitiesCommand = serializeAws_json1_1DetectPiiEntitiesCommand;
const serializeAws_json1_1DetectSentimentCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.DetectSentiment",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DetectSentimentRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DetectSentimentCommand = serializeAws_json1_1DetectSentimentCommand;
const serializeAws_json1_1DetectSyntaxCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.DetectSyntax",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1DetectSyntaxRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1DetectSyntaxCommand = serializeAws_json1_1DetectSyntaxCommand;
const serializeAws_json1_1ListDocumentClassificationJobsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.ListDocumentClassificationJobs",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListDocumentClassificationJobsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListDocumentClassificationJobsCommand = serializeAws_json1_1ListDocumentClassificationJobsCommand;
const serializeAws_json1_1ListDocumentClassifiersCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.ListDocumentClassifiers",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListDocumentClassifiersRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListDocumentClassifiersCommand = serializeAws_json1_1ListDocumentClassifiersCommand;
const serializeAws_json1_1ListDominantLanguageDetectionJobsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.ListDominantLanguageDetectionJobs",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListDominantLanguageDetectionJobsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListDominantLanguageDetectionJobsCommand = serializeAws_json1_1ListDominantLanguageDetectionJobsCommand;
const serializeAws_json1_1ListEndpointsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.ListEndpoints",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListEndpointsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListEndpointsCommand = serializeAws_json1_1ListEndpointsCommand;
const serializeAws_json1_1ListEntitiesDetectionJobsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.ListEntitiesDetectionJobs",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListEntitiesDetectionJobsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListEntitiesDetectionJobsCommand = serializeAws_json1_1ListEntitiesDetectionJobsCommand;
const serializeAws_json1_1ListEntityRecognizersCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.ListEntityRecognizers",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListEntityRecognizersRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListEntityRecognizersCommand = serializeAws_json1_1ListEntityRecognizersCommand;
const serializeAws_json1_1ListEventsDetectionJobsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.ListEventsDetectionJobs",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListEventsDetectionJobsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListEventsDetectionJobsCommand = serializeAws_json1_1ListEventsDetectionJobsCommand;
const serializeAws_json1_1ListKeyPhrasesDetectionJobsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.ListKeyPhrasesDetectionJobs",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListKeyPhrasesDetectionJobsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListKeyPhrasesDetectionJobsCommand = serializeAws_json1_1ListKeyPhrasesDetectionJobsCommand;
const serializeAws_json1_1ListPiiEntitiesDetectionJobsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.ListPiiEntitiesDetectionJobs",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListPiiEntitiesDetectionJobsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListPiiEntitiesDetectionJobsCommand = serializeAws_json1_1ListPiiEntitiesDetectionJobsCommand;
const serializeAws_json1_1ListSentimentDetectionJobsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.ListSentimentDetectionJobs",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListSentimentDetectionJobsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListSentimentDetectionJobsCommand = serializeAws_json1_1ListSentimentDetectionJobsCommand;
const serializeAws_json1_1ListTagsForResourceCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.ListTagsForResource",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListTagsForResourceRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListTagsForResourceCommand = serializeAws_json1_1ListTagsForResourceCommand;
const serializeAws_json1_1ListTopicsDetectionJobsCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.ListTopicsDetectionJobs",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1ListTopicsDetectionJobsRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1ListTopicsDetectionJobsCommand = serializeAws_json1_1ListTopicsDetectionJobsCommand;
const serializeAws_json1_1StartDocumentClassificationJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.StartDocumentClassificationJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartDocumentClassificationJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartDocumentClassificationJobCommand = serializeAws_json1_1StartDocumentClassificationJobCommand;
const serializeAws_json1_1StartDominantLanguageDetectionJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.StartDominantLanguageDetectionJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartDominantLanguageDetectionJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartDominantLanguageDetectionJobCommand = serializeAws_json1_1StartDominantLanguageDetectionJobCommand;
const serializeAws_json1_1StartEntitiesDetectionJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.StartEntitiesDetectionJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartEntitiesDetectionJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartEntitiesDetectionJobCommand = serializeAws_json1_1StartEntitiesDetectionJobCommand;
const serializeAws_json1_1StartEventsDetectionJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.StartEventsDetectionJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartEventsDetectionJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartEventsDetectionJobCommand = serializeAws_json1_1StartEventsDetectionJobCommand;
const serializeAws_json1_1StartKeyPhrasesDetectionJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.StartKeyPhrasesDetectionJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartKeyPhrasesDetectionJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartKeyPhrasesDetectionJobCommand = serializeAws_json1_1StartKeyPhrasesDetectionJobCommand;
const serializeAws_json1_1StartPiiEntitiesDetectionJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.StartPiiEntitiesDetectionJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartPiiEntitiesDetectionJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartPiiEntitiesDetectionJobCommand = serializeAws_json1_1StartPiiEntitiesDetectionJobCommand;
const serializeAws_json1_1StartSentimentDetectionJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.StartSentimentDetectionJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartSentimentDetectionJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartSentimentDetectionJobCommand = serializeAws_json1_1StartSentimentDetectionJobCommand;
const serializeAws_json1_1StartTopicsDetectionJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.StartTopicsDetectionJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StartTopicsDetectionJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StartTopicsDetectionJobCommand = serializeAws_json1_1StartTopicsDetectionJobCommand;
const serializeAws_json1_1StopDominantLanguageDetectionJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.StopDominantLanguageDetectionJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StopDominantLanguageDetectionJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StopDominantLanguageDetectionJobCommand = serializeAws_json1_1StopDominantLanguageDetectionJobCommand;
const serializeAws_json1_1StopEntitiesDetectionJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.StopEntitiesDetectionJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StopEntitiesDetectionJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StopEntitiesDetectionJobCommand = serializeAws_json1_1StopEntitiesDetectionJobCommand;
const serializeAws_json1_1StopEventsDetectionJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.StopEventsDetectionJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StopEventsDetectionJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StopEventsDetectionJobCommand = serializeAws_json1_1StopEventsDetectionJobCommand;
const serializeAws_json1_1StopKeyPhrasesDetectionJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.StopKeyPhrasesDetectionJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StopKeyPhrasesDetectionJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StopKeyPhrasesDetectionJobCommand = serializeAws_json1_1StopKeyPhrasesDetectionJobCommand;
const serializeAws_json1_1StopPiiEntitiesDetectionJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.StopPiiEntitiesDetectionJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StopPiiEntitiesDetectionJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StopPiiEntitiesDetectionJobCommand = serializeAws_json1_1StopPiiEntitiesDetectionJobCommand;
const serializeAws_json1_1StopSentimentDetectionJobCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.StopSentimentDetectionJob",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StopSentimentDetectionJobRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StopSentimentDetectionJobCommand = serializeAws_json1_1StopSentimentDetectionJobCommand;
const serializeAws_json1_1StopTrainingDocumentClassifierCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.StopTrainingDocumentClassifier",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StopTrainingDocumentClassifierRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StopTrainingDocumentClassifierCommand = serializeAws_json1_1StopTrainingDocumentClassifierCommand;
const serializeAws_json1_1StopTrainingEntityRecognizerCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.StopTrainingEntityRecognizer",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1StopTrainingEntityRecognizerRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1StopTrainingEntityRecognizerCommand = serializeAws_json1_1StopTrainingEntityRecognizerCommand;
const serializeAws_json1_1TagResourceCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.TagResource",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1TagResourceRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1TagResourceCommand = serializeAws_json1_1TagResourceCommand;
const serializeAws_json1_1UntagResourceCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.UntagResource",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1UntagResourceRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1UntagResourceCommand = serializeAws_json1_1UntagResourceCommand;
const serializeAws_json1_1UpdateEndpointCommand = async (input, context) => {
    const headers = {
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "Comprehend_20171127.UpdateEndpoint",
    };
    let body;
    body = JSON.stringify(serializeAws_json1_1UpdateEndpointRequest(input, context));
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
exports.serializeAws_json1_1UpdateEndpointCommand = serializeAws_json1_1UpdateEndpointCommand;
const deserializeAws_json1_1BatchDetectDominantLanguageCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1BatchDetectDominantLanguageCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1BatchDetectDominantLanguageResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1BatchDetectDominantLanguageCommand = deserializeAws_json1_1BatchDetectDominantLanguageCommand;
const deserializeAws_json1_1BatchDetectDominantLanguageCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "BatchSizeLimitExceededException":
        case "com.amazonaws.comprehend#BatchSizeLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1BatchSizeLimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TextSizeLimitExceededException":
        case "com.amazonaws.comprehend#TextSizeLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1BatchDetectEntitiesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1BatchDetectEntitiesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1BatchDetectEntitiesResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1BatchDetectEntitiesCommand = deserializeAws_json1_1BatchDetectEntitiesCommand;
const deserializeAws_json1_1BatchDetectEntitiesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "BatchSizeLimitExceededException":
        case "com.amazonaws.comprehend#BatchSizeLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1BatchSizeLimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TextSizeLimitExceededException":
        case "com.amazonaws.comprehend#TextSizeLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnsupportedLanguageException":
        case "com.amazonaws.comprehend#UnsupportedLanguageException":
            response = {
                ...(await deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1BatchDetectKeyPhrasesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1BatchDetectKeyPhrasesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1BatchDetectKeyPhrasesResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1BatchDetectKeyPhrasesCommand = deserializeAws_json1_1BatchDetectKeyPhrasesCommand;
const deserializeAws_json1_1BatchDetectKeyPhrasesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "BatchSizeLimitExceededException":
        case "com.amazonaws.comprehend#BatchSizeLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1BatchSizeLimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TextSizeLimitExceededException":
        case "com.amazonaws.comprehend#TextSizeLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnsupportedLanguageException":
        case "com.amazonaws.comprehend#UnsupportedLanguageException":
            response = {
                ...(await deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1BatchDetectSentimentCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1BatchDetectSentimentCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1BatchDetectSentimentResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1BatchDetectSentimentCommand = deserializeAws_json1_1BatchDetectSentimentCommand;
const deserializeAws_json1_1BatchDetectSentimentCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "BatchSizeLimitExceededException":
        case "com.amazonaws.comprehend#BatchSizeLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1BatchSizeLimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TextSizeLimitExceededException":
        case "com.amazonaws.comprehend#TextSizeLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnsupportedLanguageException":
        case "com.amazonaws.comprehend#UnsupportedLanguageException":
            response = {
                ...(await deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1BatchDetectSyntaxCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1BatchDetectSyntaxCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1BatchDetectSyntaxResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1BatchDetectSyntaxCommand = deserializeAws_json1_1BatchDetectSyntaxCommand;
const deserializeAws_json1_1BatchDetectSyntaxCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "BatchSizeLimitExceededException":
        case "com.amazonaws.comprehend#BatchSizeLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1BatchSizeLimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TextSizeLimitExceededException":
        case "com.amazonaws.comprehend#TextSizeLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnsupportedLanguageException":
        case "com.amazonaws.comprehend#UnsupportedLanguageException":
            response = {
                ...(await deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1ClassifyDocumentCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ClassifyDocumentCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ClassifyDocumentResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ClassifyDocumentCommand = deserializeAws_json1_1ClassifyDocumentCommand;
const deserializeAws_json1_1ClassifyDocumentCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceUnavailableException":
        case "com.amazonaws.comprehend#ResourceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ResourceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TextSizeLimitExceededException":
        case "com.amazonaws.comprehend#TextSizeLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1CreateDocumentClassifierCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1CreateDocumentClassifierCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1CreateDocumentClassifierResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1CreateDocumentClassifierCommand = deserializeAws_json1_1CreateDocumentClassifierCommand;
const deserializeAws_json1_1CreateDocumentClassifierCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KmsKeyValidationException":
        case "com.amazonaws.comprehend#KmsKeyValidationException":
            response = {
                ...(await deserializeAws_json1_1KmsKeyValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.comprehend#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceLimitExceededException":
        case "com.amazonaws.comprehend#ResourceLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1ResourceLimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
            response = {
                ...(await deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyTagsException":
        case "com.amazonaws.comprehend#TooManyTagsException":
            response = {
                ...(await deserializeAws_json1_1TooManyTagsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnsupportedLanguageException":
        case "com.amazonaws.comprehend#UnsupportedLanguageException":
            response = {
                ...(await deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1CreateEndpointCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1CreateEndpointCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1CreateEndpointResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1CreateEndpointCommand = deserializeAws_json1_1CreateEndpointCommand;
const deserializeAws_json1_1CreateEndpointCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.comprehend#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceLimitExceededException":
        case "com.amazonaws.comprehend#ResourceLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1ResourceLimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.comprehend#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceUnavailableException":
        case "com.amazonaws.comprehend#ResourceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ResourceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
            response = {
                ...(await deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyTagsException":
        case "com.amazonaws.comprehend#TooManyTagsException":
            response = {
                ...(await deserializeAws_json1_1TooManyTagsExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1CreateEntityRecognizerCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1CreateEntityRecognizerCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1CreateEntityRecognizerResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1CreateEntityRecognizerCommand = deserializeAws_json1_1CreateEntityRecognizerCommand;
const deserializeAws_json1_1CreateEntityRecognizerCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KmsKeyValidationException":
        case "com.amazonaws.comprehend#KmsKeyValidationException":
            response = {
                ...(await deserializeAws_json1_1KmsKeyValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.comprehend#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceLimitExceededException":
        case "com.amazonaws.comprehend#ResourceLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1ResourceLimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
            response = {
                ...(await deserializeAws_json1_1TooManyRequestsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyTagsException":
        case "com.amazonaws.comprehend#TooManyTagsException":
            response = {
                ...(await deserializeAws_json1_1TooManyTagsExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnsupportedLanguageException":
        case "com.amazonaws.comprehend#UnsupportedLanguageException":
            response = {
                ...(await deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1DeleteDocumentClassifierCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteDocumentClassifierCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DeleteDocumentClassifierResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteDocumentClassifierCommand = deserializeAws_json1_1DeleteDocumentClassifierCommand;
const deserializeAws_json1_1DeleteDocumentClassifierCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.comprehend#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.comprehend#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceUnavailableException":
        case "com.amazonaws.comprehend#ResourceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ResourceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1DeleteEndpointCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteEndpointCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DeleteEndpointResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteEndpointCommand = deserializeAws_json1_1DeleteEndpointCommand;
const deserializeAws_json1_1DeleteEndpointCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.comprehend#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.comprehend#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1DeleteEntityRecognizerCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DeleteEntityRecognizerCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DeleteEntityRecognizerResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DeleteEntityRecognizerCommand = deserializeAws_json1_1DeleteEntityRecognizerCommand;
const deserializeAws_json1_1DeleteEntityRecognizerCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.comprehend#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.comprehend#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceUnavailableException":
        case "com.amazonaws.comprehend#ResourceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ResourceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1DescribeDocumentClassificationJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeDocumentClassificationJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeDocumentClassificationJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeDocumentClassificationJobCommand = deserializeAws_json1_1DescribeDocumentClassificationJobCommand;
const deserializeAws_json1_1DescribeDocumentClassificationJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "JobNotFoundException":
        case "com.amazonaws.comprehend#JobNotFoundException":
            response = {
                ...(await deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1DescribeDocumentClassifierCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeDocumentClassifierCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeDocumentClassifierResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeDocumentClassifierCommand = deserializeAws_json1_1DescribeDocumentClassifierCommand;
const deserializeAws_json1_1DescribeDocumentClassifierCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.comprehend#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1DescribeDominantLanguageDetectionJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeDominantLanguageDetectionJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeDominantLanguageDetectionJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeDominantLanguageDetectionJobCommand = deserializeAws_json1_1DescribeDominantLanguageDetectionJobCommand;
const deserializeAws_json1_1DescribeDominantLanguageDetectionJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "JobNotFoundException":
        case "com.amazonaws.comprehend#JobNotFoundException":
            response = {
                ...(await deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1DescribeEndpointCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeEndpointCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeEndpointResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeEndpointCommand = deserializeAws_json1_1DescribeEndpointCommand;
const deserializeAws_json1_1DescribeEndpointCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.comprehend#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1DescribeEntitiesDetectionJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeEntitiesDetectionJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeEntitiesDetectionJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeEntitiesDetectionJobCommand = deserializeAws_json1_1DescribeEntitiesDetectionJobCommand;
const deserializeAws_json1_1DescribeEntitiesDetectionJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "JobNotFoundException":
        case "com.amazonaws.comprehend#JobNotFoundException":
            response = {
                ...(await deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1DescribeEntityRecognizerCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeEntityRecognizerCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeEntityRecognizerResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeEntityRecognizerCommand = deserializeAws_json1_1DescribeEntityRecognizerCommand;
const deserializeAws_json1_1DescribeEntityRecognizerCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.comprehend#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1DescribeEventsDetectionJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeEventsDetectionJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeEventsDetectionJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeEventsDetectionJobCommand = deserializeAws_json1_1DescribeEventsDetectionJobCommand;
const deserializeAws_json1_1DescribeEventsDetectionJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "JobNotFoundException":
        case "com.amazonaws.comprehend#JobNotFoundException":
            response = {
                ...(await deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1DescribeKeyPhrasesDetectionJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeKeyPhrasesDetectionJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeKeyPhrasesDetectionJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeKeyPhrasesDetectionJobCommand = deserializeAws_json1_1DescribeKeyPhrasesDetectionJobCommand;
const deserializeAws_json1_1DescribeKeyPhrasesDetectionJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "JobNotFoundException":
        case "com.amazonaws.comprehend#JobNotFoundException":
            response = {
                ...(await deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1DescribePiiEntitiesDetectionJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribePiiEntitiesDetectionJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribePiiEntitiesDetectionJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribePiiEntitiesDetectionJobCommand = deserializeAws_json1_1DescribePiiEntitiesDetectionJobCommand;
const deserializeAws_json1_1DescribePiiEntitiesDetectionJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "JobNotFoundException":
        case "com.amazonaws.comprehend#JobNotFoundException":
            response = {
                ...(await deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1DescribeSentimentDetectionJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeSentimentDetectionJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeSentimentDetectionJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeSentimentDetectionJobCommand = deserializeAws_json1_1DescribeSentimentDetectionJobCommand;
const deserializeAws_json1_1DescribeSentimentDetectionJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "JobNotFoundException":
        case "com.amazonaws.comprehend#JobNotFoundException":
            response = {
                ...(await deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1DescribeTopicsDetectionJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DescribeTopicsDetectionJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DescribeTopicsDetectionJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DescribeTopicsDetectionJobCommand = deserializeAws_json1_1DescribeTopicsDetectionJobCommand;
const deserializeAws_json1_1DescribeTopicsDetectionJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "JobNotFoundException":
        case "com.amazonaws.comprehend#JobNotFoundException":
            response = {
                ...(await deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1DetectDominantLanguageCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DetectDominantLanguageCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DetectDominantLanguageResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DetectDominantLanguageCommand = deserializeAws_json1_1DetectDominantLanguageCommand;
const deserializeAws_json1_1DetectDominantLanguageCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TextSizeLimitExceededException":
        case "com.amazonaws.comprehend#TextSizeLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1DetectEntitiesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DetectEntitiesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DetectEntitiesResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DetectEntitiesCommand = deserializeAws_json1_1DetectEntitiesCommand;
const deserializeAws_json1_1DetectEntitiesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceUnavailableException":
        case "com.amazonaws.comprehend#ResourceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ResourceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TextSizeLimitExceededException":
        case "com.amazonaws.comprehend#TextSizeLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnsupportedLanguageException":
        case "com.amazonaws.comprehend#UnsupportedLanguageException":
            response = {
                ...(await deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1DetectKeyPhrasesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DetectKeyPhrasesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DetectKeyPhrasesResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DetectKeyPhrasesCommand = deserializeAws_json1_1DetectKeyPhrasesCommand;
const deserializeAws_json1_1DetectKeyPhrasesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TextSizeLimitExceededException":
        case "com.amazonaws.comprehend#TextSizeLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnsupportedLanguageException":
        case "com.amazonaws.comprehend#UnsupportedLanguageException":
            response = {
                ...(await deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1DetectPiiEntitiesCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DetectPiiEntitiesCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DetectPiiEntitiesResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DetectPiiEntitiesCommand = deserializeAws_json1_1DetectPiiEntitiesCommand;
const deserializeAws_json1_1DetectPiiEntitiesCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TextSizeLimitExceededException":
        case "com.amazonaws.comprehend#TextSizeLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnsupportedLanguageException":
        case "com.amazonaws.comprehend#UnsupportedLanguageException":
            response = {
                ...(await deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1DetectSentimentCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DetectSentimentCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DetectSentimentResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DetectSentimentCommand = deserializeAws_json1_1DetectSentimentCommand;
const deserializeAws_json1_1DetectSentimentCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TextSizeLimitExceededException":
        case "com.amazonaws.comprehend#TextSizeLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnsupportedLanguageException":
        case "com.amazonaws.comprehend#UnsupportedLanguageException":
            response = {
                ...(await deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1DetectSyntaxCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1DetectSyntaxCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1DetectSyntaxResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1DetectSyntaxCommand = deserializeAws_json1_1DetectSyntaxCommand;
const deserializeAws_json1_1DetectSyntaxCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TextSizeLimitExceededException":
        case "com.amazonaws.comprehend#TextSizeLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1TextSizeLimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "UnsupportedLanguageException":
        case "com.amazonaws.comprehend#UnsupportedLanguageException":
            response = {
                ...(await deserializeAws_json1_1UnsupportedLanguageExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1ListDocumentClassificationJobsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListDocumentClassificationJobsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListDocumentClassificationJobsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListDocumentClassificationJobsCommand = deserializeAws_json1_1ListDocumentClassificationJobsCommand;
const deserializeAws_json1_1ListDocumentClassificationJobsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidFilterException":
        case "com.amazonaws.comprehend#InvalidFilterException":
            response = {
                ...(await deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1ListDocumentClassifiersCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListDocumentClassifiersCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListDocumentClassifiersResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListDocumentClassifiersCommand = deserializeAws_json1_1ListDocumentClassifiersCommand;
const deserializeAws_json1_1ListDocumentClassifiersCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidFilterException":
        case "com.amazonaws.comprehend#InvalidFilterException":
            response = {
                ...(await deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1ListDominantLanguageDetectionJobsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListDominantLanguageDetectionJobsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListDominantLanguageDetectionJobsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListDominantLanguageDetectionJobsCommand = deserializeAws_json1_1ListDominantLanguageDetectionJobsCommand;
const deserializeAws_json1_1ListDominantLanguageDetectionJobsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidFilterException":
        case "com.amazonaws.comprehend#InvalidFilterException":
            response = {
                ...(await deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1ListEndpointsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListEndpointsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListEndpointsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListEndpointsCommand = deserializeAws_json1_1ListEndpointsCommand;
const deserializeAws_json1_1ListEndpointsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1ListEntitiesDetectionJobsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListEntitiesDetectionJobsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListEntitiesDetectionJobsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListEntitiesDetectionJobsCommand = deserializeAws_json1_1ListEntitiesDetectionJobsCommand;
const deserializeAws_json1_1ListEntitiesDetectionJobsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidFilterException":
        case "com.amazonaws.comprehend#InvalidFilterException":
            response = {
                ...(await deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1ListEntityRecognizersCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListEntityRecognizersCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListEntityRecognizersResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListEntityRecognizersCommand = deserializeAws_json1_1ListEntityRecognizersCommand;
const deserializeAws_json1_1ListEntityRecognizersCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidFilterException":
        case "com.amazonaws.comprehend#InvalidFilterException":
            response = {
                ...(await deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1ListEventsDetectionJobsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListEventsDetectionJobsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListEventsDetectionJobsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListEventsDetectionJobsCommand = deserializeAws_json1_1ListEventsDetectionJobsCommand;
const deserializeAws_json1_1ListEventsDetectionJobsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidFilterException":
        case "com.amazonaws.comprehend#InvalidFilterException":
            response = {
                ...(await deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1ListKeyPhrasesDetectionJobsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListKeyPhrasesDetectionJobsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListKeyPhrasesDetectionJobsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListKeyPhrasesDetectionJobsCommand = deserializeAws_json1_1ListKeyPhrasesDetectionJobsCommand;
const deserializeAws_json1_1ListKeyPhrasesDetectionJobsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidFilterException":
        case "com.amazonaws.comprehend#InvalidFilterException":
            response = {
                ...(await deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1ListPiiEntitiesDetectionJobsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListPiiEntitiesDetectionJobsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListPiiEntitiesDetectionJobsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListPiiEntitiesDetectionJobsCommand = deserializeAws_json1_1ListPiiEntitiesDetectionJobsCommand;
const deserializeAws_json1_1ListPiiEntitiesDetectionJobsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidFilterException":
        case "com.amazonaws.comprehend#InvalidFilterException":
            response = {
                ...(await deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1ListSentimentDetectionJobsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListSentimentDetectionJobsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListSentimentDetectionJobsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListSentimentDetectionJobsCommand = deserializeAws_json1_1ListSentimentDetectionJobsCommand;
const deserializeAws_json1_1ListSentimentDetectionJobsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidFilterException":
        case "com.amazonaws.comprehend#InvalidFilterException":
            response = {
                ...(await deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1ListTagsForResourceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListTagsForResourceCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListTagsForResourceResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListTagsForResourceCommand = deserializeAws_json1_1ListTagsForResourceCommand;
const deserializeAws_json1_1ListTagsForResourceCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.comprehend#ResourceNotFoundException":
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
const deserializeAws_json1_1ListTopicsDetectionJobsCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1ListTopicsDetectionJobsCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1ListTopicsDetectionJobsResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1ListTopicsDetectionJobsCommand = deserializeAws_json1_1ListTopicsDetectionJobsCommand;
const deserializeAws_json1_1ListTopicsDetectionJobsCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidFilterException":
        case "com.amazonaws.comprehend#InvalidFilterException":
            response = {
                ...(await deserializeAws_json1_1InvalidFilterExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1StartDocumentClassificationJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartDocumentClassificationJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartDocumentClassificationJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartDocumentClassificationJobCommand = deserializeAws_json1_1StartDocumentClassificationJobCommand;
const deserializeAws_json1_1StartDocumentClassificationJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KmsKeyValidationException":
        case "com.amazonaws.comprehend#KmsKeyValidationException":
            response = {
                ...(await deserializeAws_json1_1KmsKeyValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.comprehend#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceUnavailableException":
        case "com.amazonaws.comprehend#ResourceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ResourceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1StartDominantLanguageDetectionJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartDominantLanguageDetectionJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartDominantLanguageDetectionJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartDominantLanguageDetectionJobCommand = deserializeAws_json1_1StartDominantLanguageDetectionJobCommand;
const deserializeAws_json1_1StartDominantLanguageDetectionJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KmsKeyValidationException":
        case "com.amazonaws.comprehend#KmsKeyValidationException":
            response = {
                ...(await deserializeAws_json1_1KmsKeyValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1StartEntitiesDetectionJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartEntitiesDetectionJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartEntitiesDetectionJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartEntitiesDetectionJobCommand = deserializeAws_json1_1StartEntitiesDetectionJobCommand;
const deserializeAws_json1_1StartEntitiesDetectionJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KmsKeyValidationException":
        case "com.amazonaws.comprehend#KmsKeyValidationException":
            response = {
                ...(await deserializeAws_json1_1KmsKeyValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.comprehend#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceUnavailableException":
        case "com.amazonaws.comprehend#ResourceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ResourceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1StartEventsDetectionJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartEventsDetectionJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartEventsDetectionJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartEventsDetectionJobCommand = deserializeAws_json1_1StartEventsDetectionJobCommand;
const deserializeAws_json1_1StartEventsDetectionJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KmsKeyValidationException":
        case "com.amazonaws.comprehend#KmsKeyValidationException":
            response = {
                ...(await deserializeAws_json1_1KmsKeyValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1StartKeyPhrasesDetectionJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartKeyPhrasesDetectionJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartKeyPhrasesDetectionJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartKeyPhrasesDetectionJobCommand = deserializeAws_json1_1StartKeyPhrasesDetectionJobCommand;
const deserializeAws_json1_1StartKeyPhrasesDetectionJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KmsKeyValidationException":
        case "com.amazonaws.comprehend#KmsKeyValidationException":
            response = {
                ...(await deserializeAws_json1_1KmsKeyValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1StartPiiEntitiesDetectionJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartPiiEntitiesDetectionJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartPiiEntitiesDetectionJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartPiiEntitiesDetectionJobCommand = deserializeAws_json1_1StartPiiEntitiesDetectionJobCommand;
const deserializeAws_json1_1StartPiiEntitiesDetectionJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KmsKeyValidationException":
        case "com.amazonaws.comprehend#KmsKeyValidationException":
            response = {
                ...(await deserializeAws_json1_1KmsKeyValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1StartSentimentDetectionJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartSentimentDetectionJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartSentimentDetectionJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartSentimentDetectionJobCommand = deserializeAws_json1_1StartSentimentDetectionJobCommand;
const deserializeAws_json1_1StartSentimentDetectionJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KmsKeyValidationException":
        case "com.amazonaws.comprehend#KmsKeyValidationException":
            response = {
                ...(await deserializeAws_json1_1KmsKeyValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1StartTopicsDetectionJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StartTopicsDetectionJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StartTopicsDetectionJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StartTopicsDetectionJobCommand = deserializeAws_json1_1StartTopicsDetectionJobCommand;
const deserializeAws_json1_1StartTopicsDetectionJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "KmsKeyValidationException":
        case "com.amazonaws.comprehend#KmsKeyValidationException":
            response = {
                ...(await deserializeAws_json1_1KmsKeyValidationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1StopDominantLanguageDetectionJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StopDominantLanguageDetectionJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StopDominantLanguageDetectionJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StopDominantLanguageDetectionJobCommand = deserializeAws_json1_1StopDominantLanguageDetectionJobCommand;
const deserializeAws_json1_1StopDominantLanguageDetectionJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "JobNotFoundException":
        case "com.amazonaws.comprehend#JobNotFoundException":
            response = {
                ...(await deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1StopEntitiesDetectionJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StopEntitiesDetectionJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StopEntitiesDetectionJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StopEntitiesDetectionJobCommand = deserializeAws_json1_1StopEntitiesDetectionJobCommand;
const deserializeAws_json1_1StopEntitiesDetectionJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "JobNotFoundException":
        case "com.amazonaws.comprehend#JobNotFoundException":
            response = {
                ...(await deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1StopEventsDetectionJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StopEventsDetectionJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StopEventsDetectionJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StopEventsDetectionJobCommand = deserializeAws_json1_1StopEventsDetectionJobCommand;
const deserializeAws_json1_1StopEventsDetectionJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "JobNotFoundException":
        case "com.amazonaws.comprehend#JobNotFoundException":
            response = {
                ...(await deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1StopKeyPhrasesDetectionJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StopKeyPhrasesDetectionJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StopKeyPhrasesDetectionJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StopKeyPhrasesDetectionJobCommand = deserializeAws_json1_1StopKeyPhrasesDetectionJobCommand;
const deserializeAws_json1_1StopKeyPhrasesDetectionJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "JobNotFoundException":
        case "com.amazonaws.comprehend#JobNotFoundException":
            response = {
                ...(await deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1StopPiiEntitiesDetectionJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StopPiiEntitiesDetectionJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StopPiiEntitiesDetectionJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StopPiiEntitiesDetectionJobCommand = deserializeAws_json1_1StopPiiEntitiesDetectionJobCommand;
const deserializeAws_json1_1StopPiiEntitiesDetectionJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "JobNotFoundException":
        case "com.amazonaws.comprehend#JobNotFoundException":
            response = {
                ...(await deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1StopSentimentDetectionJobCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StopSentimentDetectionJobCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StopSentimentDetectionJobResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StopSentimentDetectionJobCommand = deserializeAws_json1_1StopSentimentDetectionJobCommand;
const deserializeAws_json1_1StopSentimentDetectionJobCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "JobNotFoundException":
        case "com.amazonaws.comprehend#JobNotFoundException":
            response = {
                ...(await deserializeAws_json1_1JobNotFoundExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1StopTrainingDocumentClassifierCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StopTrainingDocumentClassifierCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StopTrainingDocumentClassifierResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StopTrainingDocumentClassifierCommand = deserializeAws_json1_1StopTrainingDocumentClassifierCommand;
const deserializeAws_json1_1StopTrainingDocumentClassifierCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.comprehend#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1StopTrainingEntityRecognizerCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1StopTrainingEntityRecognizerCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1StopTrainingEntityRecognizerResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1StopTrainingEntityRecognizerCommand = deserializeAws_json1_1StopTrainingEntityRecognizerCommand;
const deserializeAws_json1_1StopTrainingEntityRecognizerCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.comprehend#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1TagResourceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1TagResourceCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1TagResourceResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1TagResourceCommand = deserializeAws_json1_1TagResourceCommand;
const deserializeAws_json1_1TagResourceCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "ConcurrentModificationException":
        case "com.amazonaws.comprehend#ConcurrentModificationException":
            response = {
                ...(await deserializeAws_json1_1ConcurrentModificationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.comprehend#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyTagsException":
        case "com.amazonaws.comprehend#TooManyTagsException":
            response = {
                ...(await deserializeAws_json1_1TooManyTagsExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1UntagResourceCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1UntagResourceCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1UntagResourceResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1UntagResourceCommand = deserializeAws_json1_1UntagResourceCommand;
const deserializeAws_json1_1UntagResourceCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "ConcurrentModificationException":
        case "com.amazonaws.comprehend#ConcurrentModificationException":
            response = {
                ...(await deserializeAws_json1_1ConcurrentModificationExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.comprehend#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyTagKeysException":
        case "com.amazonaws.comprehend#TooManyTagKeysException":
            response = {
                ...(await deserializeAws_json1_1TooManyTagKeysExceptionResponse(parsedOutput, context)),
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
const deserializeAws_json1_1UpdateEndpointCommand = async (output, context) => {
    if (output.statusCode >= 300) {
        return deserializeAws_json1_1UpdateEndpointCommandError(output, context);
    }
    const data = await parseBody(output.body, context);
    let contents = {};
    contents = deserializeAws_json1_1UpdateEndpointResponse(data, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents,
    };
    return Promise.resolve(response);
};
exports.deserializeAws_json1_1UpdateEndpointCommand = deserializeAws_json1_1UpdateEndpointCommand;
const deserializeAws_json1_1UpdateEndpointCommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseBody(output.body, context),
    };
    let response;
    let errorCode = "UnknownError";
    errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
    switch (errorCode) {
        case "InternalServerException":
        case "com.amazonaws.comprehend#InternalServerException":
            response = {
                ...(await deserializeAws_json1_1InternalServerExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "InvalidRequestException":
        case "com.amazonaws.comprehend#InvalidRequestException":
            response = {
                ...(await deserializeAws_json1_1InvalidRequestExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceInUseException":
        case "com.amazonaws.comprehend#ResourceInUseException":
            response = {
                ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceLimitExceededException":
        case "com.amazonaws.comprehend#ResourceLimitExceededException":
            response = {
                ...(await deserializeAws_json1_1ResourceLimitExceededExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceNotFoundException":
        case "com.amazonaws.comprehend#ResourceNotFoundException":
            response = {
                ...(await deserializeAws_json1_1ResourceNotFoundExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "ResourceUnavailableException":
        case "com.amazonaws.comprehend#ResourceUnavailableException":
            response = {
                ...(await deserializeAws_json1_1ResourceUnavailableExceptionResponse(parsedOutput, context)),
                name: errorCode,
                $metadata: deserializeMetadata(output),
            };
            break;
        case "TooManyRequestsException":
        case "com.amazonaws.comprehend#TooManyRequestsException":
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
const deserializeAws_json1_1BatchSizeLimitExceededExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1BatchSizeLimitExceededException(body, context);
    const contents = {
        name: "BatchSizeLimitExceededException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
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
const deserializeAws_json1_1JobNotFoundExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1JobNotFoundException(body, context);
    const contents = {
        name: "JobNotFoundException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1KmsKeyValidationExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1KmsKeyValidationException(body, context);
    const contents = {
        name: "KmsKeyValidationException",
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
const deserializeAws_json1_1ResourceLimitExceededExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ResourceLimitExceededException(body, context);
    const contents = {
        name: "ResourceLimitExceededException",
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
const deserializeAws_json1_1ResourceUnavailableExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1ResourceUnavailableException(body, context);
    const contents = {
        name: "ResourceUnavailableException",
        $fault: "client",
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
const deserializeAws_json1_1TooManyTagKeysExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1TooManyTagKeysException(body, context);
    const contents = {
        name: "TooManyTagKeysException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1TooManyTagsExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1TooManyTagsException(body, context);
    const contents = {
        name: "TooManyTagsException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const deserializeAws_json1_1UnsupportedLanguageExceptionResponse = async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = deserializeAws_json1_1UnsupportedLanguageException(body, context);
    const contents = {
        name: "UnsupportedLanguageException",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized,
    };
    return contents;
};
const serializeAws_json1_1AttributeNamesList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1AugmentedManifestsListItem = (input, context) => {
    return {
        ...(input.AttributeNames !== undefined &&
            input.AttributeNames !== null && {
            AttributeNames: serializeAws_json1_1AttributeNamesList(input.AttributeNames, context),
        }),
        ...(input.S3Uri !== undefined && input.S3Uri !== null && { S3Uri: input.S3Uri }),
    };
};
const serializeAws_json1_1BatchDetectDominantLanguageRequest = (input, context) => {
    return {
        ...(input.TextList !== undefined &&
            input.TextList !== null && { TextList: serializeAws_json1_1CustomerInputStringList(input.TextList, context) }),
    };
};
const serializeAws_json1_1BatchDetectEntitiesRequest = (input, context) => {
    return {
        ...(input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode }),
        ...(input.TextList !== undefined &&
            input.TextList !== null && { TextList: serializeAws_json1_1CustomerInputStringList(input.TextList, context) }),
    };
};
const serializeAws_json1_1BatchDetectKeyPhrasesRequest = (input, context) => {
    return {
        ...(input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode }),
        ...(input.TextList !== undefined &&
            input.TextList !== null && { TextList: serializeAws_json1_1CustomerInputStringList(input.TextList, context) }),
    };
};
const serializeAws_json1_1BatchDetectSentimentRequest = (input, context) => {
    return {
        ...(input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode }),
        ...(input.TextList !== undefined &&
            input.TextList !== null && { TextList: serializeAws_json1_1CustomerInputStringList(input.TextList, context) }),
    };
};
const serializeAws_json1_1BatchDetectSyntaxRequest = (input, context) => {
    return {
        ...(input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode }),
        ...(input.TextList !== undefined &&
            input.TextList !== null && { TextList: serializeAws_json1_1CustomerInputStringList(input.TextList, context) }),
    };
};
const serializeAws_json1_1ClassifyDocumentRequest = (input, context) => {
    return {
        ...(input.EndpointArn !== undefined && input.EndpointArn !== null && { EndpointArn: input.EndpointArn }),
        ...(input.Text !== undefined && input.Text !== null && { Text: input.Text }),
    };
};
const serializeAws_json1_1CreateDocumentClassifierRequest = (input, context) => {
    var _a;
    return {
        ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : uuid_1.v4(),
        ...(input.DataAccessRoleArn !== undefined &&
            input.DataAccessRoleArn !== null && { DataAccessRoleArn: input.DataAccessRoleArn }),
        ...(input.DocumentClassifierName !== undefined &&
            input.DocumentClassifierName !== null && { DocumentClassifierName: input.DocumentClassifierName }),
        ...(input.InputDataConfig !== undefined &&
            input.InputDataConfig !== null && {
            InputDataConfig: serializeAws_json1_1DocumentClassifierInputDataConfig(input.InputDataConfig, context),
        }),
        ...(input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode }),
        ...(input.Mode !== undefined && input.Mode !== null && { Mode: input.Mode }),
        ...(input.OutputDataConfig !== undefined &&
            input.OutputDataConfig !== null && {
            OutputDataConfig: serializeAws_json1_1DocumentClassifierOutputDataConfig(input.OutputDataConfig, context),
        }),
        ...(input.Tags !== undefined && input.Tags !== null && { Tags: serializeAws_json1_1TagList(input.Tags, context) }),
        ...(input.VolumeKmsKeyId !== undefined &&
            input.VolumeKmsKeyId !== null && { VolumeKmsKeyId: input.VolumeKmsKeyId }),
        ...(input.VpcConfig !== undefined &&
            input.VpcConfig !== null && { VpcConfig: serializeAws_json1_1VpcConfig(input.VpcConfig, context) }),
    };
};
const serializeAws_json1_1CreateEndpointRequest = (input, context) => {
    var _a;
    return {
        ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : uuid_1.v4(),
        ...(input.DesiredInferenceUnits !== undefined &&
            input.DesiredInferenceUnits !== null && { DesiredInferenceUnits: input.DesiredInferenceUnits }),
        ...(input.EndpointName !== undefined && input.EndpointName !== null && { EndpointName: input.EndpointName }),
        ...(input.ModelArn !== undefined && input.ModelArn !== null && { ModelArn: input.ModelArn }),
        ...(input.Tags !== undefined && input.Tags !== null && { Tags: serializeAws_json1_1TagList(input.Tags, context) }),
    };
};
const serializeAws_json1_1CreateEntityRecognizerRequest = (input, context) => {
    var _a;
    return {
        ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : uuid_1.v4(),
        ...(input.DataAccessRoleArn !== undefined &&
            input.DataAccessRoleArn !== null && { DataAccessRoleArn: input.DataAccessRoleArn }),
        ...(input.InputDataConfig !== undefined &&
            input.InputDataConfig !== null && {
            InputDataConfig: serializeAws_json1_1EntityRecognizerInputDataConfig(input.InputDataConfig, context),
        }),
        ...(input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode }),
        ...(input.RecognizerName !== undefined &&
            input.RecognizerName !== null && { RecognizerName: input.RecognizerName }),
        ...(input.Tags !== undefined && input.Tags !== null && { Tags: serializeAws_json1_1TagList(input.Tags, context) }),
        ...(input.VolumeKmsKeyId !== undefined &&
            input.VolumeKmsKeyId !== null && { VolumeKmsKeyId: input.VolumeKmsKeyId }),
        ...(input.VpcConfig !== undefined &&
            input.VpcConfig !== null && { VpcConfig: serializeAws_json1_1VpcConfig(input.VpcConfig, context) }),
    };
};
const serializeAws_json1_1CustomerInputStringList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1DeleteDocumentClassifierRequest = (input, context) => {
    return {
        ...(input.DocumentClassifierArn !== undefined &&
            input.DocumentClassifierArn !== null && { DocumentClassifierArn: input.DocumentClassifierArn }),
    };
};
const serializeAws_json1_1DeleteEndpointRequest = (input, context) => {
    return {
        ...(input.EndpointArn !== undefined && input.EndpointArn !== null && { EndpointArn: input.EndpointArn }),
    };
};
const serializeAws_json1_1DeleteEntityRecognizerRequest = (input, context) => {
    return {
        ...(input.EntityRecognizerArn !== undefined &&
            input.EntityRecognizerArn !== null && { EntityRecognizerArn: input.EntityRecognizerArn }),
    };
};
const serializeAws_json1_1DescribeDocumentClassificationJobRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    };
};
const serializeAws_json1_1DescribeDocumentClassifierRequest = (input, context) => {
    return {
        ...(input.DocumentClassifierArn !== undefined &&
            input.DocumentClassifierArn !== null && { DocumentClassifierArn: input.DocumentClassifierArn }),
    };
};
const serializeAws_json1_1DescribeDominantLanguageDetectionJobRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    };
};
const serializeAws_json1_1DescribeEndpointRequest = (input, context) => {
    return {
        ...(input.EndpointArn !== undefined && input.EndpointArn !== null && { EndpointArn: input.EndpointArn }),
    };
};
const serializeAws_json1_1DescribeEntitiesDetectionJobRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    };
};
const serializeAws_json1_1DescribeEntityRecognizerRequest = (input, context) => {
    return {
        ...(input.EntityRecognizerArn !== undefined &&
            input.EntityRecognizerArn !== null && { EntityRecognizerArn: input.EntityRecognizerArn }),
    };
};
const serializeAws_json1_1DescribeEventsDetectionJobRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    };
};
const serializeAws_json1_1DescribeKeyPhrasesDetectionJobRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    };
};
const serializeAws_json1_1DescribePiiEntitiesDetectionJobRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    };
};
const serializeAws_json1_1DescribeSentimentDetectionJobRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    };
};
const serializeAws_json1_1DescribeTopicsDetectionJobRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    };
};
const serializeAws_json1_1DetectDominantLanguageRequest = (input, context) => {
    return {
        ...(input.Text !== undefined && input.Text !== null && { Text: input.Text }),
    };
};
const serializeAws_json1_1DetectEntitiesRequest = (input, context) => {
    return {
        ...(input.EndpointArn !== undefined && input.EndpointArn !== null && { EndpointArn: input.EndpointArn }),
        ...(input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode }),
        ...(input.Text !== undefined && input.Text !== null && { Text: input.Text }),
    };
};
const serializeAws_json1_1DetectKeyPhrasesRequest = (input, context) => {
    return {
        ...(input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode }),
        ...(input.Text !== undefined && input.Text !== null && { Text: input.Text }),
    };
};
const serializeAws_json1_1DetectPiiEntitiesRequest = (input, context) => {
    return {
        ...(input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode }),
        ...(input.Text !== undefined && input.Text !== null && { Text: input.Text }),
    };
};
const serializeAws_json1_1DetectSentimentRequest = (input, context) => {
    return {
        ...(input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode }),
        ...(input.Text !== undefined && input.Text !== null && { Text: input.Text }),
    };
};
const serializeAws_json1_1DetectSyntaxRequest = (input, context) => {
    return {
        ...(input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode }),
        ...(input.Text !== undefined && input.Text !== null && { Text: input.Text }),
    };
};
const serializeAws_json1_1DocumentClassificationJobFilter = (input, context) => {
    return {
        ...(input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName }),
        ...(input.JobStatus !== undefined && input.JobStatus !== null && { JobStatus: input.JobStatus }),
        ...(input.SubmitTimeAfter !== undefined &&
            input.SubmitTimeAfter !== null && { SubmitTimeAfter: Math.round(input.SubmitTimeAfter.getTime() / 1000) }),
        ...(input.SubmitTimeBefore !== undefined &&
            input.SubmitTimeBefore !== null && { SubmitTimeBefore: Math.round(input.SubmitTimeBefore.getTime() / 1000) }),
    };
};
const serializeAws_json1_1DocumentClassifierAugmentedManifestsList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1AugmentedManifestsListItem(entry, context);
    });
};
const serializeAws_json1_1DocumentClassifierFilter = (input, context) => {
    return {
        ...(input.Status !== undefined && input.Status !== null && { Status: input.Status }),
        ...(input.SubmitTimeAfter !== undefined &&
            input.SubmitTimeAfter !== null && { SubmitTimeAfter: Math.round(input.SubmitTimeAfter.getTime() / 1000) }),
        ...(input.SubmitTimeBefore !== undefined &&
            input.SubmitTimeBefore !== null && { SubmitTimeBefore: Math.round(input.SubmitTimeBefore.getTime() / 1000) }),
    };
};
const serializeAws_json1_1DocumentClassifierInputDataConfig = (input, context) => {
    return {
        ...(input.AugmentedManifests !== undefined &&
            input.AugmentedManifests !== null && {
            AugmentedManifests: serializeAws_json1_1DocumentClassifierAugmentedManifestsList(input.AugmentedManifests, context),
        }),
        ...(input.DataFormat !== undefined && input.DataFormat !== null && { DataFormat: input.DataFormat }),
        ...(input.LabelDelimiter !== undefined &&
            input.LabelDelimiter !== null && { LabelDelimiter: input.LabelDelimiter }),
        ...(input.S3Uri !== undefined && input.S3Uri !== null && { S3Uri: input.S3Uri }),
    };
};
const serializeAws_json1_1DocumentClassifierOutputDataConfig = (input, context) => {
    return {
        ...(input.KmsKeyId !== undefined && input.KmsKeyId !== null && { KmsKeyId: input.KmsKeyId }),
        ...(input.S3Uri !== undefined && input.S3Uri !== null && { S3Uri: input.S3Uri }),
    };
};
const serializeAws_json1_1DominantLanguageDetectionJobFilter = (input, context) => {
    return {
        ...(input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName }),
        ...(input.JobStatus !== undefined && input.JobStatus !== null && { JobStatus: input.JobStatus }),
        ...(input.SubmitTimeAfter !== undefined &&
            input.SubmitTimeAfter !== null && { SubmitTimeAfter: Math.round(input.SubmitTimeAfter.getTime() / 1000) }),
        ...(input.SubmitTimeBefore !== undefined &&
            input.SubmitTimeBefore !== null && { SubmitTimeBefore: Math.round(input.SubmitTimeBefore.getTime() / 1000) }),
    };
};
const serializeAws_json1_1EndpointFilter = (input, context) => {
    return {
        ...(input.CreationTimeAfter !== undefined &&
            input.CreationTimeAfter !== null && { CreationTimeAfter: Math.round(input.CreationTimeAfter.getTime() / 1000) }),
        ...(input.CreationTimeBefore !== undefined &&
            input.CreationTimeBefore !== null && {
            CreationTimeBefore: Math.round(input.CreationTimeBefore.getTime() / 1000),
        }),
        ...(input.ModelArn !== undefined && input.ModelArn !== null && { ModelArn: input.ModelArn }),
        ...(input.Status !== undefined && input.Status !== null && { Status: input.Status }),
    };
};
const serializeAws_json1_1EntitiesDetectionJobFilter = (input, context) => {
    return {
        ...(input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName }),
        ...(input.JobStatus !== undefined && input.JobStatus !== null && { JobStatus: input.JobStatus }),
        ...(input.SubmitTimeAfter !== undefined &&
            input.SubmitTimeAfter !== null && { SubmitTimeAfter: Math.round(input.SubmitTimeAfter.getTime() / 1000) }),
        ...(input.SubmitTimeBefore !== undefined &&
            input.SubmitTimeBefore !== null && { SubmitTimeBefore: Math.round(input.SubmitTimeBefore.getTime() / 1000) }),
    };
};
const serializeAws_json1_1EntityRecognizerAnnotations = (input, context) => {
    return {
        ...(input.S3Uri !== undefined && input.S3Uri !== null && { S3Uri: input.S3Uri }),
    };
};
const serializeAws_json1_1EntityRecognizerAugmentedManifestsList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1AugmentedManifestsListItem(entry, context);
    });
};
const serializeAws_json1_1EntityRecognizerDocuments = (input, context) => {
    return {
        ...(input.S3Uri !== undefined && input.S3Uri !== null && { S3Uri: input.S3Uri }),
    };
};
const serializeAws_json1_1EntityRecognizerEntityList = (input, context) => {
    return {
        ...(input.S3Uri !== undefined && input.S3Uri !== null && { S3Uri: input.S3Uri }),
    };
};
const serializeAws_json1_1EntityRecognizerFilter = (input, context) => {
    return {
        ...(input.Status !== undefined && input.Status !== null && { Status: input.Status }),
        ...(input.SubmitTimeAfter !== undefined &&
            input.SubmitTimeAfter !== null && { SubmitTimeAfter: Math.round(input.SubmitTimeAfter.getTime() / 1000) }),
        ...(input.SubmitTimeBefore !== undefined &&
            input.SubmitTimeBefore !== null && { SubmitTimeBefore: Math.round(input.SubmitTimeBefore.getTime() / 1000) }),
    };
};
const serializeAws_json1_1EntityRecognizerInputDataConfig = (input, context) => {
    return {
        ...(input.Annotations !== undefined &&
            input.Annotations !== null && {
            Annotations: serializeAws_json1_1EntityRecognizerAnnotations(input.Annotations, context),
        }),
        ...(input.AugmentedManifests !== undefined &&
            input.AugmentedManifests !== null && {
            AugmentedManifests: serializeAws_json1_1EntityRecognizerAugmentedManifestsList(input.AugmentedManifests, context),
        }),
        ...(input.DataFormat !== undefined && input.DataFormat !== null && { DataFormat: input.DataFormat }),
        ...(input.Documents !== undefined &&
            input.Documents !== null && {
            Documents: serializeAws_json1_1EntityRecognizerDocuments(input.Documents, context),
        }),
        ...(input.EntityList !== undefined &&
            input.EntityList !== null && {
            EntityList: serializeAws_json1_1EntityRecognizerEntityList(input.EntityList, context),
        }),
        ...(input.EntityTypes !== undefined &&
            input.EntityTypes !== null && { EntityTypes: serializeAws_json1_1EntityTypesList(input.EntityTypes, context) }),
    };
};
const serializeAws_json1_1EntityTypesList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1EntityTypesListItem(entry, context);
    });
};
const serializeAws_json1_1EntityTypesListItem = (input, context) => {
    return {
        ...(input.Type !== undefined && input.Type !== null && { Type: input.Type }),
    };
};
const serializeAws_json1_1EventsDetectionJobFilter = (input, context) => {
    return {
        ...(input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName }),
        ...(input.JobStatus !== undefined && input.JobStatus !== null && { JobStatus: input.JobStatus }),
        ...(input.SubmitTimeAfter !== undefined &&
            input.SubmitTimeAfter !== null && { SubmitTimeAfter: Math.round(input.SubmitTimeAfter.getTime() / 1000) }),
        ...(input.SubmitTimeBefore !== undefined &&
            input.SubmitTimeBefore !== null && { SubmitTimeBefore: Math.round(input.SubmitTimeBefore.getTime() / 1000) }),
    };
};
const serializeAws_json1_1InputDataConfig = (input, context) => {
    return {
        ...(input.InputFormat !== undefined && input.InputFormat !== null && { InputFormat: input.InputFormat }),
        ...(input.S3Uri !== undefined && input.S3Uri !== null && { S3Uri: input.S3Uri }),
    };
};
const serializeAws_json1_1KeyPhrasesDetectionJobFilter = (input, context) => {
    return {
        ...(input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName }),
        ...(input.JobStatus !== undefined && input.JobStatus !== null && { JobStatus: input.JobStatus }),
        ...(input.SubmitTimeAfter !== undefined &&
            input.SubmitTimeAfter !== null && { SubmitTimeAfter: Math.round(input.SubmitTimeAfter.getTime() / 1000) }),
        ...(input.SubmitTimeBefore !== undefined &&
            input.SubmitTimeBefore !== null && { SubmitTimeBefore: Math.round(input.SubmitTimeBefore.getTime() / 1000) }),
    };
};
const serializeAws_json1_1ListDocumentClassificationJobsRequest = (input, context) => {
    return {
        ...(input.Filter !== undefined &&
            input.Filter !== null && { Filter: serializeAws_json1_1DocumentClassificationJobFilter(input.Filter, context) }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1ListDocumentClassifiersRequest = (input, context) => {
    return {
        ...(input.Filter !== undefined &&
            input.Filter !== null && { Filter: serializeAws_json1_1DocumentClassifierFilter(input.Filter, context) }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1ListDominantLanguageDetectionJobsRequest = (input, context) => {
    return {
        ...(input.Filter !== undefined &&
            input.Filter !== null && {
            Filter: serializeAws_json1_1DominantLanguageDetectionJobFilter(input.Filter, context),
        }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1ListEndpointsRequest = (input, context) => {
    return {
        ...(input.Filter !== undefined &&
            input.Filter !== null && { Filter: serializeAws_json1_1EndpointFilter(input.Filter, context) }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1ListEntitiesDetectionJobsRequest = (input, context) => {
    return {
        ...(input.Filter !== undefined &&
            input.Filter !== null && { Filter: serializeAws_json1_1EntitiesDetectionJobFilter(input.Filter, context) }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1ListEntityRecognizersRequest = (input, context) => {
    return {
        ...(input.Filter !== undefined &&
            input.Filter !== null && { Filter: serializeAws_json1_1EntityRecognizerFilter(input.Filter, context) }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1ListEventsDetectionJobsRequest = (input, context) => {
    return {
        ...(input.Filter !== undefined &&
            input.Filter !== null && { Filter: serializeAws_json1_1EventsDetectionJobFilter(input.Filter, context) }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1ListKeyPhrasesDetectionJobsRequest = (input, context) => {
    return {
        ...(input.Filter !== undefined &&
            input.Filter !== null && { Filter: serializeAws_json1_1KeyPhrasesDetectionJobFilter(input.Filter, context) }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1ListOfPiiEntityTypes = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1ListPiiEntitiesDetectionJobsRequest = (input, context) => {
    return {
        ...(input.Filter !== undefined &&
            input.Filter !== null && { Filter: serializeAws_json1_1PiiEntitiesDetectionJobFilter(input.Filter, context) }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1ListSentimentDetectionJobsRequest = (input, context) => {
    return {
        ...(input.Filter !== undefined &&
            input.Filter !== null && { Filter: serializeAws_json1_1SentimentDetectionJobFilter(input.Filter, context) }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1ListTagsForResourceRequest = (input, context) => {
    return {
        ...(input.ResourceArn !== undefined && input.ResourceArn !== null && { ResourceArn: input.ResourceArn }),
    };
};
const serializeAws_json1_1ListTopicsDetectionJobsRequest = (input, context) => {
    return {
        ...(input.Filter !== undefined &&
            input.Filter !== null && { Filter: serializeAws_json1_1TopicsDetectionJobFilter(input.Filter, context) }),
        ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
        ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    };
};
const serializeAws_json1_1OutputDataConfig = (input, context) => {
    return {
        ...(input.KmsKeyId !== undefined && input.KmsKeyId !== null && { KmsKeyId: input.KmsKeyId }),
        ...(input.S3Uri !== undefined && input.S3Uri !== null && { S3Uri: input.S3Uri }),
    };
};
const serializeAws_json1_1PiiEntitiesDetectionJobFilter = (input, context) => {
    return {
        ...(input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName }),
        ...(input.JobStatus !== undefined && input.JobStatus !== null && { JobStatus: input.JobStatus }),
        ...(input.SubmitTimeAfter !== undefined &&
            input.SubmitTimeAfter !== null && { SubmitTimeAfter: Math.round(input.SubmitTimeAfter.getTime() / 1000) }),
        ...(input.SubmitTimeBefore !== undefined &&
            input.SubmitTimeBefore !== null && { SubmitTimeBefore: Math.round(input.SubmitTimeBefore.getTime() / 1000) }),
    };
};
const serializeAws_json1_1RedactionConfig = (input, context) => {
    return {
        ...(input.MaskCharacter !== undefined && input.MaskCharacter !== null && { MaskCharacter: input.MaskCharacter }),
        ...(input.MaskMode !== undefined && input.MaskMode !== null && { MaskMode: input.MaskMode }),
        ...(input.PiiEntityTypes !== undefined &&
            input.PiiEntityTypes !== null && {
            PiiEntityTypes: serializeAws_json1_1ListOfPiiEntityTypes(input.PiiEntityTypes, context),
        }),
    };
};
const serializeAws_json1_1SecurityGroupIds = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1SentimentDetectionJobFilter = (input, context) => {
    return {
        ...(input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName }),
        ...(input.JobStatus !== undefined && input.JobStatus !== null && { JobStatus: input.JobStatus }),
        ...(input.SubmitTimeAfter !== undefined &&
            input.SubmitTimeAfter !== null && { SubmitTimeAfter: Math.round(input.SubmitTimeAfter.getTime() / 1000) }),
        ...(input.SubmitTimeBefore !== undefined &&
            input.SubmitTimeBefore !== null && { SubmitTimeBefore: Math.round(input.SubmitTimeBefore.getTime() / 1000) }),
    };
};
const serializeAws_json1_1StartDocumentClassificationJobRequest = (input, context) => {
    var _a;
    return {
        ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : uuid_1.v4(),
        ...(input.DataAccessRoleArn !== undefined &&
            input.DataAccessRoleArn !== null && { DataAccessRoleArn: input.DataAccessRoleArn }),
        ...(input.DocumentClassifierArn !== undefined &&
            input.DocumentClassifierArn !== null && { DocumentClassifierArn: input.DocumentClassifierArn }),
        ...(input.InputDataConfig !== undefined &&
            input.InputDataConfig !== null && {
            InputDataConfig: serializeAws_json1_1InputDataConfig(input.InputDataConfig, context),
        }),
        ...(input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName }),
        ...(input.OutputDataConfig !== undefined &&
            input.OutputDataConfig !== null && {
            OutputDataConfig: serializeAws_json1_1OutputDataConfig(input.OutputDataConfig, context),
        }),
        ...(input.VolumeKmsKeyId !== undefined &&
            input.VolumeKmsKeyId !== null && { VolumeKmsKeyId: input.VolumeKmsKeyId }),
        ...(input.VpcConfig !== undefined &&
            input.VpcConfig !== null && { VpcConfig: serializeAws_json1_1VpcConfig(input.VpcConfig, context) }),
    };
};
const serializeAws_json1_1StartDominantLanguageDetectionJobRequest = (input, context) => {
    var _a;
    return {
        ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : uuid_1.v4(),
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
        ...(input.VolumeKmsKeyId !== undefined &&
            input.VolumeKmsKeyId !== null && { VolumeKmsKeyId: input.VolumeKmsKeyId }),
        ...(input.VpcConfig !== undefined &&
            input.VpcConfig !== null && { VpcConfig: serializeAws_json1_1VpcConfig(input.VpcConfig, context) }),
    };
};
const serializeAws_json1_1StartEntitiesDetectionJobRequest = (input, context) => {
    var _a;
    return {
        ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : uuid_1.v4(),
        ...(input.DataAccessRoleArn !== undefined &&
            input.DataAccessRoleArn !== null && { DataAccessRoleArn: input.DataAccessRoleArn }),
        ...(input.EntityRecognizerArn !== undefined &&
            input.EntityRecognizerArn !== null && { EntityRecognizerArn: input.EntityRecognizerArn }),
        ...(input.InputDataConfig !== undefined &&
            input.InputDataConfig !== null && {
            InputDataConfig: serializeAws_json1_1InputDataConfig(input.InputDataConfig, context),
        }),
        ...(input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName }),
        ...(input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode }),
        ...(input.OutputDataConfig !== undefined &&
            input.OutputDataConfig !== null && {
            OutputDataConfig: serializeAws_json1_1OutputDataConfig(input.OutputDataConfig, context),
        }),
        ...(input.VolumeKmsKeyId !== undefined &&
            input.VolumeKmsKeyId !== null && { VolumeKmsKeyId: input.VolumeKmsKeyId }),
        ...(input.VpcConfig !== undefined &&
            input.VpcConfig !== null && { VpcConfig: serializeAws_json1_1VpcConfig(input.VpcConfig, context) }),
    };
};
const serializeAws_json1_1StartEventsDetectionJobRequest = (input, context) => {
    var _a;
    return {
        ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : uuid_1.v4(),
        ...(input.DataAccessRoleArn !== undefined &&
            input.DataAccessRoleArn !== null && { DataAccessRoleArn: input.DataAccessRoleArn }),
        ...(input.InputDataConfig !== undefined &&
            input.InputDataConfig !== null && {
            InputDataConfig: serializeAws_json1_1InputDataConfig(input.InputDataConfig, context),
        }),
        ...(input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName }),
        ...(input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode }),
        ...(input.OutputDataConfig !== undefined &&
            input.OutputDataConfig !== null && {
            OutputDataConfig: serializeAws_json1_1OutputDataConfig(input.OutputDataConfig, context),
        }),
        ...(input.TargetEventTypes !== undefined &&
            input.TargetEventTypes !== null && {
            TargetEventTypes: serializeAws_json1_1TargetEventTypes(input.TargetEventTypes, context),
        }),
    };
};
const serializeAws_json1_1StartKeyPhrasesDetectionJobRequest = (input, context) => {
    var _a;
    return {
        ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : uuid_1.v4(),
        ...(input.DataAccessRoleArn !== undefined &&
            input.DataAccessRoleArn !== null && { DataAccessRoleArn: input.DataAccessRoleArn }),
        ...(input.InputDataConfig !== undefined &&
            input.InputDataConfig !== null && {
            InputDataConfig: serializeAws_json1_1InputDataConfig(input.InputDataConfig, context),
        }),
        ...(input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName }),
        ...(input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode }),
        ...(input.OutputDataConfig !== undefined &&
            input.OutputDataConfig !== null && {
            OutputDataConfig: serializeAws_json1_1OutputDataConfig(input.OutputDataConfig, context),
        }),
        ...(input.VolumeKmsKeyId !== undefined &&
            input.VolumeKmsKeyId !== null && { VolumeKmsKeyId: input.VolumeKmsKeyId }),
        ...(input.VpcConfig !== undefined &&
            input.VpcConfig !== null && { VpcConfig: serializeAws_json1_1VpcConfig(input.VpcConfig, context) }),
    };
};
const serializeAws_json1_1StartPiiEntitiesDetectionJobRequest = (input, context) => {
    var _a;
    return {
        ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : uuid_1.v4(),
        ...(input.DataAccessRoleArn !== undefined &&
            input.DataAccessRoleArn !== null && { DataAccessRoleArn: input.DataAccessRoleArn }),
        ...(input.InputDataConfig !== undefined &&
            input.InputDataConfig !== null && {
            InputDataConfig: serializeAws_json1_1InputDataConfig(input.InputDataConfig, context),
        }),
        ...(input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName }),
        ...(input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode }),
        ...(input.Mode !== undefined && input.Mode !== null && { Mode: input.Mode }),
        ...(input.OutputDataConfig !== undefined &&
            input.OutputDataConfig !== null && {
            OutputDataConfig: serializeAws_json1_1OutputDataConfig(input.OutputDataConfig, context),
        }),
        ...(input.RedactionConfig !== undefined &&
            input.RedactionConfig !== null && {
            RedactionConfig: serializeAws_json1_1RedactionConfig(input.RedactionConfig, context),
        }),
    };
};
const serializeAws_json1_1StartSentimentDetectionJobRequest = (input, context) => {
    var _a;
    return {
        ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : uuid_1.v4(),
        ...(input.DataAccessRoleArn !== undefined &&
            input.DataAccessRoleArn !== null && { DataAccessRoleArn: input.DataAccessRoleArn }),
        ...(input.InputDataConfig !== undefined &&
            input.InputDataConfig !== null && {
            InputDataConfig: serializeAws_json1_1InputDataConfig(input.InputDataConfig, context),
        }),
        ...(input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName }),
        ...(input.LanguageCode !== undefined && input.LanguageCode !== null && { LanguageCode: input.LanguageCode }),
        ...(input.OutputDataConfig !== undefined &&
            input.OutputDataConfig !== null && {
            OutputDataConfig: serializeAws_json1_1OutputDataConfig(input.OutputDataConfig, context),
        }),
        ...(input.VolumeKmsKeyId !== undefined &&
            input.VolumeKmsKeyId !== null && { VolumeKmsKeyId: input.VolumeKmsKeyId }),
        ...(input.VpcConfig !== undefined &&
            input.VpcConfig !== null && { VpcConfig: serializeAws_json1_1VpcConfig(input.VpcConfig, context) }),
    };
};
const serializeAws_json1_1StartTopicsDetectionJobRequest = (input, context) => {
    var _a;
    return {
        ClientRequestToken: (_a = input.ClientRequestToken) !== null && _a !== void 0 ? _a : uuid_1.v4(),
        ...(input.DataAccessRoleArn !== undefined &&
            input.DataAccessRoleArn !== null && { DataAccessRoleArn: input.DataAccessRoleArn }),
        ...(input.InputDataConfig !== undefined &&
            input.InputDataConfig !== null && {
            InputDataConfig: serializeAws_json1_1InputDataConfig(input.InputDataConfig, context),
        }),
        ...(input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName }),
        ...(input.NumberOfTopics !== undefined &&
            input.NumberOfTopics !== null && { NumberOfTopics: input.NumberOfTopics }),
        ...(input.OutputDataConfig !== undefined &&
            input.OutputDataConfig !== null && {
            OutputDataConfig: serializeAws_json1_1OutputDataConfig(input.OutputDataConfig, context),
        }),
        ...(input.VolumeKmsKeyId !== undefined &&
            input.VolumeKmsKeyId !== null && { VolumeKmsKeyId: input.VolumeKmsKeyId }),
        ...(input.VpcConfig !== undefined &&
            input.VpcConfig !== null && { VpcConfig: serializeAws_json1_1VpcConfig(input.VpcConfig, context) }),
    };
};
const serializeAws_json1_1StopDominantLanguageDetectionJobRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    };
};
const serializeAws_json1_1StopEntitiesDetectionJobRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    };
};
const serializeAws_json1_1StopEventsDetectionJobRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    };
};
const serializeAws_json1_1StopKeyPhrasesDetectionJobRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    };
};
const serializeAws_json1_1StopPiiEntitiesDetectionJobRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    };
};
const serializeAws_json1_1StopSentimentDetectionJobRequest = (input, context) => {
    return {
        ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    };
};
const serializeAws_json1_1StopTrainingDocumentClassifierRequest = (input, context) => {
    return {
        ...(input.DocumentClassifierArn !== undefined &&
            input.DocumentClassifierArn !== null && { DocumentClassifierArn: input.DocumentClassifierArn }),
    };
};
const serializeAws_json1_1StopTrainingEntityRecognizerRequest = (input, context) => {
    return {
        ...(input.EntityRecognizerArn !== undefined &&
            input.EntityRecognizerArn !== null && { EntityRecognizerArn: input.EntityRecognizerArn }),
    };
};
const serializeAws_json1_1Subnets = (input, context) => {
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
const serializeAws_json1_1TagList = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return serializeAws_json1_1Tag(entry, context);
    });
};
const serializeAws_json1_1TagResourceRequest = (input, context) => {
    return {
        ...(input.ResourceArn !== undefined && input.ResourceArn !== null && { ResourceArn: input.ResourceArn }),
        ...(input.Tags !== undefined && input.Tags !== null && { Tags: serializeAws_json1_1TagList(input.Tags, context) }),
    };
};
const serializeAws_json1_1TargetEventTypes = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const serializeAws_json1_1TopicsDetectionJobFilter = (input, context) => {
    return {
        ...(input.JobName !== undefined && input.JobName !== null && { JobName: input.JobName }),
        ...(input.JobStatus !== undefined && input.JobStatus !== null && { JobStatus: input.JobStatus }),
        ...(input.SubmitTimeAfter !== undefined &&
            input.SubmitTimeAfter !== null && { SubmitTimeAfter: Math.round(input.SubmitTimeAfter.getTime() / 1000) }),
        ...(input.SubmitTimeBefore !== undefined &&
            input.SubmitTimeBefore !== null && { SubmitTimeBefore: Math.round(input.SubmitTimeBefore.getTime() / 1000) }),
    };
};
const serializeAws_json1_1UntagResourceRequest = (input, context) => {
    return {
        ...(input.ResourceArn !== undefined && input.ResourceArn !== null && { ResourceArn: input.ResourceArn }),
        ...(input.TagKeys !== undefined &&
            input.TagKeys !== null && { TagKeys: serializeAws_json1_1TagKeyList(input.TagKeys, context) }),
    };
};
const serializeAws_json1_1UpdateEndpointRequest = (input, context) => {
    return {
        ...(input.DesiredInferenceUnits !== undefined &&
            input.DesiredInferenceUnits !== null && { DesiredInferenceUnits: input.DesiredInferenceUnits }),
        ...(input.EndpointArn !== undefined && input.EndpointArn !== null && { EndpointArn: input.EndpointArn }),
    };
};
const serializeAws_json1_1VpcConfig = (input, context) => {
    return {
        ...(input.SecurityGroupIds !== undefined &&
            input.SecurityGroupIds !== null && {
            SecurityGroupIds: serializeAws_json1_1SecurityGroupIds(input.SecurityGroupIds, context),
        }),
        ...(input.Subnets !== undefined &&
            input.Subnets !== null && { Subnets: serializeAws_json1_1Subnets(input.Subnets, context) }),
    };
};
const deserializeAws_json1_1AttributeNamesList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1AugmentedManifestsListItem = (output, context) => {
    return {
        AttributeNames: output.AttributeNames !== undefined && output.AttributeNames !== null
            ? deserializeAws_json1_1AttributeNamesList(output.AttributeNames, context)
            : undefined,
        S3Uri: output.S3Uri !== undefined && output.S3Uri !== null ? output.S3Uri : undefined,
    };
};
const deserializeAws_json1_1BatchDetectDominantLanguageItemResult = (output, context) => {
    return {
        Index: output.Index !== undefined && output.Index !== null ? output.Index : undefined,
        Languages: output.Languages !== undefined && output.Languages !== null
            ? deserializeAws_json1_1ListOfDominantLanguages(output.Languages, context)
            : undefined,
    };
};
const deserializeAws_json1_1BatchDetectDominantLanguageResponse = (output, context) => {
    return {
        ErrorList: output.ErrorList !== undefined && output.ErrorList !== null
            ? deserializeAws_json1_1BatchItemErrorList(output.ErrorList, context)
            : undefined,
        ResultList: output.ResultList !== undefined && output.ResultList !== null
            ? deserializeAws_json1_1ListOfDetectDominantLanguageResult(output.ResultList, context)
            : undefined,
    };
};
const deserializeAws_json1_1BatchDetectEntitiesItemResult = (output, context) => {
    return {
        Entities: output.Entities !== undefined && output.Entities !== null
            ? deserializeAws_json1_1ListOfEntities(output.Entities, context)
            : undefined,
        Index: output.Index !== undefined && output.Index !== null ? output.Index : undefined,
    };
};
const deserializeAws_json1_1BatchDetectEntitiesResponse = (output, context) => {
    return {
        ErrorList: output.ErrorList !== undefined && output.ErrorList !== null
            ? deserializeAws_json1_1BatchItemErrorList(output.ErrorList, context)
            : undefined,
        ResultList: output.ResultList !== undefined && output.ResultList !== null
            ? deserializeAws_json1_1ListOfDetectEntitiesResult(output.ResultList, context)
            : undefined,
    };
};
const deserializeAws_json1_1BatchDetectKeyPhrasesItemResult = (output, context) => {
    return {
        Index: output.Index !== undefined && output.Index !== null ? output.Index : undefined,
        KeyPhrases: output.KeyPhrases !== undefined && output.KeyPhrases !== null
            ? deserializeAws_json1_1ListOfKeyPhrases(output.KeyPhrases, context)
            : undefined,
    };
};
const deserializeAws_json1_1BatchDetectKeyPhrasesResponse = (output, context) => {
    return {
        ErrorList: output.ErrorList !== undefined && output.ErrorList !== null
            ? deserializeAws_json1_1BatchItemErrorList(output.ErrorList, context)
            : undefined,
        ResultList: output.ResultList !== undefined && output.ResultList !== null
            ? deserializeAws_json1_1ListOfDetectKeyPhrasesResult(output.ResultList, context)
            : undefined,
    };
};
const deserializeAws_json1_1BatchDetectSentimentItemResult = (output, context) => {
    return {
        Index: output.Index !== undefined && output.Index !== null ? output.Index : undefined,
        Sentiment: output.Sentiment !== undefined && output.Sentiment !== null ? output.Sentiment : undefined,
        SentimentScore: output.SentimentScore !== undefined && output.SentimentScore !== null
            ? deserializeAws_json1_1SentimentScore(output.SentimentScore, context)
            : undefined,
    };
};
const deserializeAws_json1_1BatchDetectSentimentResponse = (output, context) => {
    return {
        ErrorList: output.ErrorList !== undefined && output.ErrorList !== null
            ? deserializeAws_json1_1BatchItemErrorList(output.ErrorList, context)
            : undefined,
        ResultList: output.ResultList !== undefined && output.ResultList !== null
            ? deserializeAws_json1_1ListOfDetectSentimentResult(output.ResultList, context)
            : undefined,
    };
};
const deserializeAws_json1_1BatchDetectSyntaxItemResult = (output, context) => {
    return {
        Index: output.Index !== undefined && output.Index !== null ? output.Index : undefined,
        SyntaxTokens: output.SyntaxTokens !== undefined && output.SyntaxTokens !== null
            ? deserializeAws_json1_1ListOfSyntaxTokens(output.SyntaxTokens, context)
            : undefined,
    };
};
const deserializeAws_json1_1BatchDetectSyntaxResponse = (output, context) => {
    return {
        ErrorList: output.ErrorList !== undefined && output.ErrorList !== null
            ? deserializeAws_json1_1BatchItemErrorList(output.ErrorList, context)
            : undefined,
        ResultList: output.ResultList !== undefined && output.ResultList !== null
            ? deserializeAws_json1_1ListOfDetectSyntaxResult(output.ResultList, context)
            : undefined,
    };
};
const deserializeAws_json1_1BatchItemError = (output, context) => {
    return {
        ErrorCode: output.ErrorCode !== undefined && output.ErrorCode !== null ? output.ErrorCode : undefined,
        ErrorMessage: output.ErrorMessage !== undefined && output.ErrorMessage !== null ? output.ErrorMessage : undefined,
        Index: output.Index !== undefined && output.Index !== null ? output.Index : undefined,
    };
};
const deserializeAws_json1_1BatchItemErrorList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1BatchItemError(entry, context);
    });
};
const deserializeAws_json1_1BatchSizeLimitExceededException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1ClassifierEvaluationMetrics = (output, context) => {
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
const deserializeAws_json1_1ClassifierMetadata = (output, context) => {
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
const deserializeAws_json1_1ClassifyDocumentResponse = (output, context) => {
    return {
        Classes: output.Classes !== undefined && output.Classes !== null
            ? deserializeAws_json1_1ListOfClasses(output.Classes, context)
            : undefined,
        Labels: output.Labels !== undefined && output.Labels !== null
            ? deserializeAws_json1_1ListOfLabels(output.Labels, context)
            : undefined,
    };
};
const deserializeAws_json1_1ConcurrentModificationException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1CreateDocumentClassifierResponse = (output, context) => {
    return {
        DocumentClassifierArn: output.DocumentClassifierArn !== undefined && output.DocumentClassifierArn !== null
            ? output.DocumentClassifierArn
            : undefined,
    };
};
const deserializeAws_json1_1CreateEndpointResponse = (output, context) => {
    return {
        EndpointArn: output.EndpointArn !== undefined && output.EndpointArn !== null ? output.EndpointArn : undefined,
    };
};
const deserializeAws_json1_1CreateEntityRecognizerResponse = (output, context) => {
    return {
        EntityRecognizerArn: output.EntityRecognizerArn !== undefined && output.EntityRecognizerArn !== null
            ? output.EntityRecognizerArn
            : undefined,
    };
};
const deserializeAws_json1_1DeleteDocumentClassifierResponse = (output, context) => {
    return {};
};
const deserializeAws_json1_1DeleteEndpointResponse = (output, context) => {
    return {};
};
const deserializeAws_json1_1DeleteEntityRecognizerResponse = (output, context) => {
    return {};
};
const deserializeAws_json1_1DescribeDocumentClassificationJobResponse = (output, context) => {
    return {
        DocumentClassificationJobProperties: output.DocumentClassificationJobProperties !== undefined && output.DocumentClassificationJobProperties !== null
            ? deserializeAws_json1_1DocumentClassificationJobProperties(output.DocumentClassificationJobProperties, context)
            : undefined,
    };
};
const deserializeAws_json1_1DescribeDocumentClassifierResponse = (output, context) => {
    return {
        DocumentClassifierProperties: output.DocumentClassifierProperties !== undefined && output.DocumentClassifierProperties !== null
            ? deserializeAws_json1_1DocumentClassifierProperties(output.DocumentClassifierProperties, context)
            : undefined,
    };
};
const deserializeAws_json1_1DescribeDominantLanguageDetectionJobResponse = (output, context) => {
    return {
        DominantLanguageDetectionJobProperties: output.DominantLanguageDetectionJobProperties !== undefined &&
            output.DominantLanguageDetectionJobProperties !== null
            ? deserializeAws_json1_1DominantLanguageDetectionJobProperties(output.DominantLanguageDetectionJobProperties, context)
            : undefined,
    };
};
const deserializeAws_json1_1DescribeEndpointResponse = (output, context) => {
    return {
        EndpointProperties: output.EndpointProperties !== undefined && output.EndpointProperties !== null
            ? deserializeAws_json1_1EndpointProperties(output.EndpointProperties, context)
            : undefined,
    };
};
const deserializeAws_json1_1DescribeEntitiesDetectionJobResponse = (output, context) => {
    return {
        EntitiesDetectionJobProperties: output.EntitiesDetectionJobProperties !== undefined && output.EntitiesDetectionJobProperties !== null
            ? deserializeAws_json1_1EntitiesDetectionJobProperties(output.EntitiesDetectionJobProperties, context)
            : undefined,
    };
};
const deserializeAws_json1_1DescribeEntityRecognizerResponse = (output, context) => {
    return {
        EntityRecognizerProperties: output.EntityRecognizerProperties !== undefined && output.EntityRecognizerProperties !== null
            ? deserializeAws_json1_1EntityRecognizerProperties(output.EntityRecognizerProperties, context)
            : undefined,
    };
};
const deserializeAws_json1_1DescribeEventsDetectionJobResponse = (output, context) => {
    return {
        EventsDetectionJobProperties: output.EventsDetectionJobProperties !== undefined && output.EventsDetectionJobProperties !== null
            ? deserializeAws_json1_1EventsDetectionJobProperties(output.EventsDetectionJobProperties, context)
            : undefined,
    };
};
const deserializeAws_json1_1DescribeKeyPhrasesDetectionJobResponse = (output, context) => {
    return {
        KeyPhrasesDetectionJobProperties: output.KeyPhrasesDetectionJobProperties !== undefined && output.KeyPhrasesDetectionJobProperties !== null
            ? deserializeAws_json1_1KeyPhrasesDetectionJobProperties(output.KeyPhrasesDetectionJobProperties, context)
            : undefined,
    };
};
const deserializeAws_json1_1DescribePiiEntitiesDetectionJobResponse = (output, context) => {
    return {
        PiiEntitiesDetectionJobProperties: output.PiiEntitiesDetectionJobProperties !== undefined && output.PiiEntitiesDetectionJobProperties !== null
            ? deserializeAws_json1_1PiiEntitiesDetectionJobProperties(output.PiiEntitiesDetectionJobProperties, context)
            : undefined,
    };
};
const deserializeAws_json1_1DescribeSentimentDetectionJobResponse = (output, context) => {
    return {
        SentimentDetectionJobProperties: output.SentimentDetectionJobProperties !== undefined && output.SentimentDetectionJobProperties !== null
            ? deserializeAws_json1_1SentimentDetectionJobProperties(output.SentimentDetectionJobProperties, context)
            : undefined,
    };
};
const deserializeAws_json1_1DescribeTopicsDetectionJobResponse = (output, context) => {
    return {
        TopicsDetectionJobProperties: output.TopicsDetectionJobProperties !== undefined && output.TopicsDetectionJobProperties !== null
            ? deserializeAws_json1_1TopicsDetectionJobProperties(output.TopicsDetectionJobProperties, context)
            : undefined,
    };
};
const deserializeAws_json1_1DetectDominantLanguageResponse = (output, context) => {
    return {
        Languages: output.Languages !== undefined && output.Languages !== null
            ? deserializeAws_json1_1ListOfDominantLanguages(output.Languages, context)
            : undefined,
    };
};
const deserializeAws_json1_1DetectEntitiesResponse = (output, context) => {
    return {
        Entities: output.Entities !== undefined && output.Entities !== null
            ? deserializeAws_json1_1ListOfEntities(output.Entities, context)
            : undefined,
    };
};
const deserializeAws_json1_1DetectKeyPhrasesResponse = (output, context) => {
    return {
        KeyPhrases: output.KeyPhrases !== undefined && output.KeyPhrases !== null
            ? deserializeAws_json1_1ListOfKeyPhrases(output.KeyPhrases, context)
            : undefined,
    };
};
const deserializeAws_json1_1DetectPiiEntitiesResponse = (output, context) => {
    return {
        Entities: output.Entities !== undefined && output.Entities !== null
            ? deserializeAws_json1_1ListOfPiiEntities(output.Entities, context)
            : undefined,
    };
};
const deserializeAws_json1_1DetectSentimentResponse = (output, context) => {
    return {
        Sentiment: output.Sentiment !== undefined && output.Sentiment !== null ? output.Sentiment : undefined,
        SentimentScore: output.SentimentScore !== undefined && output.SentimentScore !== null
            ? deserializeAws_json1_1SentimentScore(output.SentimentScore, context)
            : undefined,
    };
};
const deserializeAws_json1_1DetectSyntaxResponse = (output, context) => {
    return {
        SyntaxTokens: output.SyntaxTokens !== undefined && output.SyntaxTokens !== null
            ? deserializeAws_json1_1ListOfSyntaxTokens(output.SyntaxTokens, context)
            : undefined,
    };
};
const deserializeAws_json1_1DocumentClass = (output, context) => {
    return {
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        Score: output.Score !== undefined && output.Score !== null ? output.Score : undefined,
    };
};
const deserializeAws_json1_1DocumentClassificationJobProperties = (output, context) => {
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
const deserializeAws_json1_1DocumentClassificationJobPropertiesList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1DocumentClassificationJobProperties(entry, context);
    });
};
const deserializeAws_json1_1DocumentClassifierAugmentedManifestsList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1AugmentedManifestsListItem(entry, context);
    });
};
const deserializeAws_json1_1DocumentClassifierInputDataConfig = (output, context) => {
    return {
        AugmentedManifests: output.AugmentedManifests !== undefined && output.AugmentedManifests !== null
            ? deserializeAws_json1_1DocumentClassifierAugmentedManifestsList(output.AugmentedManifests, context)
            : undefined,
        DataFormat: output.DataFormat !== undefined && output.DataFormat !== null ? output.DataFormat : undefined,
        LabelDelimiter: output.LabelDelimiter !== undefined && output.LabelDelimiter !== null ? output.LabelDelimiter : undefined,
        S3Uri: output.S3Uri !== undefined && output.S3Uri !== null ? output.S3Uri : undefined,
    };
};
const deserializeAws_json1_1DocumentClassifierOutputDataConfig = (output, context) => {
    return {
        KmsKeyId: output.KmsKeyId !== undefined && output.KmsKeyId !== null ? output.KmsKeyId : undefined,
        S3Uri: output.S3Uri !== undefined && output.S3Uri !== null ? output.S3Uri : undefined,
    };
};
const deserializeAws_json1_1DocumentClassifierProperties = (output, context) => {
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
const deserializeAws_json1_1DocumentClassifierPropertiesList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1DocumentClassifierProperties(entry, context);
    });
};
const deserializeAws_json1_1DocumentLabel = (output, context) => {
    return {
        Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
        Score: output.Score !== undefined && output.Score !== null ? output.Score : undefined,
    };
};
const deserializeAws_json1_1DominantLanguage = (output, context) => {
    return {
        LanguageCode: output.LanguageCode !== undefined && output.LanguageCode !== null ? output.LanguageCode : undefined,
        Score: output.Score !== undefined && output.Score !== null ? output.Score : undefined,
    };
};
const deserializeAws_json1_1DominantLanguageDetectionJobProperties = (output, context) => {
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
const deserializeAws_json1_1DominantLanguageDetectionJobPropertiesList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1DominantLanguageDetectionJobProperties(entry, context);
    });
};
const deserializeAws_json1_1EndpointProperties = (output, context) => {
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
const deserializeAws_json1_1EndpointPropertiesList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1EndpointProperties(entry, context);
    });
};
const deserializeAws_json1_1EntitiesDetectionJobProperties = (output, context) => {
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
const deserializeAws_json1_1EntitiesDetectionJobPropertiesList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1EntitiesDetectionJobProperties(entry, context);
    });
};
const deserializeAws_json1_1Entity = (output, context) => {
    return {
        BeginOffset: output.BeginOffset !== undefined && output.BeginOffset !== null ? output.BeginOffset : undefined,
        EndOffset: output.EndOffset !== undefined && output.EndOffset !== null ? output.EndOffset : undefined,
        Score: output.Score !== undefined && output.Score !== null ? output.Score : undefined,
        Text: output.Text !== undefined && output.Text !== null ? output.Text : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
const deserializeAws_json1_1EntityRecognizerAnnotations = (output, context) => {
    return {
        S3Uri: output.S3Uri !== undefined && output.S3Uri !== null ? output.S3Uri : undefined,
    };
};
const deserializeAws_json1_1EntityRecognizerAugmentedManifestsList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1AugmentedManifestsListItem(entry, context);
    });
};
const deserializeAws_json1_1EntityRecognizerDocuments = (output, context) => {
    return {
        S3Uri: output.S3Uri !== undefined && output.S3Uri !== null ? output.S3Uri : undefined,
    };
};
const deserializeAws_json1_1EntityRecognizerEntityList = (output, context) => {
    return {
        S3Uri: output.S3Uri !== undefined && output.S3Uri !== null ? output.S3Uri : undefined,
    };
};
const deserializeAws_json1_1EntityRecognizerEvaluationMetrics = (output, context) => {
    return {
        F1Score: output.F1Score !== undefined && output.F1Score !== null ? output.F1Score : undefined,
        Precision: output.Precision !== undefined && output.Precision !== null ? output.Precision : undefined,
        Recall: output.Recall !== undefined && output.Recall !== null ? output.Recall : undefined,
    };
};
const deserializeAws_json1_1EntityRecognizerInputDataConfig = (output, context) => {
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
const deserializeAws_json1_1EntityRecognizerMetadata = (output, context) => {
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
const deserializeAws_json1_1EntityRecognizerMetadataEntityTypesList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1EntityRecognizerMetadataEntityTypesListItem(entry, context);
    });
};
const deserializeAws_json1_1EntityRecognizerMetadataEntityTypesListItem = (output, context) => {
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
const deserializeAws_json1_1EntityRecognizerProperties = (output, context) => {
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
const deserializeAws_json1_1EntityRecognizerPropertiesList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1EntityRecognizerProperties(entry, context);
    });
};
const deserializeAws_json1_1EntityTypesEvaluationMetrics = (output, context) => {
    return {
        F1Score: output.F1Score !== undefined && output.F1Score !== null ? output.F1Score : undefined,
        Precision: output.Precision !== undefined && output.Precision !== null ? output.Precision : undefined,
        Recall: output.Recall !== undefined && output.Recall !== null ? output.Recall : undefined,
    };
};
const deserializeAws_json1_1EntityTypesList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1EntityTypesListItem(entry, context);
    });
};
const deserializeAws_json1_1EntityTypesListItem = (output, context) => {
    return {
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
const deserializeAws_json1_1EventsDetectionJobProperties = (output, context) => {
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
const deserializeAws_json1_1EventsDetectionJobPropertiesList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1EventsDetectionJobProperties(entry, context);
    });
};
const deserializeAws_json1_1InputDataConfig = (output, context) => {
    return {
        InputFormat: output.InputFormat !== undefined && output.InputFormat !== null ? output.InputFormat : undefined,
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
const deserializeAws_json1_1InvalidRequestException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1JobNotFoundException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1KeyPhrase = (output, context) => {
    return {
        BeginOffset: output.BeginOffset !== undefined && output.BeginOffset !== null ? output.BeginOffset : undefined,
        EndOffset: output.EndOffset !== undefined && output.EndOffset !== null ? output.EndOffset : undefined,
        Score: output.Score !== undefined && output.Score !== null ? output.Score : undefined,
        Text: output.Text !== undefined && output.Text !== null ? output.Text : undefined,
    };
};
const deserializeAws_json1_1KeyPhrasesDetectionJobProperties = (output, context) => {
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
const deserializeAws_json1_1KeyPhrasesDetectionJobPropertiesList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1KeyPhrasesDetectionJobProperties(entry, context);
    });
};
const deserializeAws_json1_1KmsKeyValidationException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1ListDocumentClassificationJobsResponse = (output, context) => {
    return {
        DocumentClassificationJobPropertiesList: output.DocumentClassificationJobPropertiesList !== undefined &&
            output.DocumentClassificationJobPropertiesList !== null
            ? deserializeAws_json1_1DocumentClassificationJobPropertiesList(output.DocumentClassificationJobPropertiesList, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    };
};
const deserializeAws_json1_1ListDocumentClassifiersResponse = (output, context) => {
    return {
        DocumentClassifierPropertiesList: output.DocumentClassifierPropertiesList !== undefined && output.DocumentClassifierPropertiesList !== null
            ? deserializeAws_json1_1DocumentClassifierPropertiesList(output.DocumentClassifierPropertiesList, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    };
};
const deserializeAws_json1_1ListDominantLanguageDetectionJobsResponse = (output, context) => {
    return {
        DominantLanguageDetectionJobPropertiesList: output.DominantLanguageDetectionJobPropertiesList !== undefined &&
            output.DominantLanguageDetectionJobPropertiesList !== null
            ? deserializeAws_json1_1DominantLanguageDetectionJobPropertiesList(output.DominantLanguageDetectionJobPropertiesList, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    };
};
const deserializeAws_json1_1ListEndpointsResponse = (output, context) => {
    return {
        EndpointPropertiesList: output.EndpointPropertiesList !== undefined && output.EndpointPropertiesList !== null
            ? deserializeAws_json1_1EndpointPropertiesList(output.EndpointPropertiesList, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    };
};
const deserializeAws_json1_1ListEntitiesDetectionJobsResponse = (output, context) => {
    return {
        EntitiesDetectionJobPropertiesList: output.EntitiesDetectionJobPropertiesList !== undefined && output.EntitiesDetectionJobPropertiesList !== null
            ? deserializeAws_json1_1EntitiesDetectionJobPropertiesList(output.EntitiesDetectionJobPropertiesList, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    };
};
const deserializeAws_json1_1ListEntityRecognizersResponse = (output, context) => {
    return {
        EntityRecognizerPropertiesList: output.EntityRecognizerPropertiesList !== undefined && output.EntityRecognizerPropertiesList !== null
            ? deserializeAws_json1_1EntityRecognizerPropertiesList(output.EntityRecognizerPropertiesList, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    };
};
const deserializeAws_json1_1ListEventsDetectionJobsResponse = (output, context) => {
    return {
        EventsDetectionJobPropertiesList: output.EventsDetectionJobPropertiesList !== undefined && output.EventsDetectionJobPropertiesList !== null
            ? deserializeAws_json1_1EventsDetectionJobPropertiesList(output.EventsDetectionJobPropertiesList, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    };
};
const deserializeAws_json1_1ListKeyPhrasesDetectionJobsResponse = (output, context) => {
    return {
        KeyPhrasesDetectionJobPropertiesList: output.KeyPhrasesDetectionJobPropertiesList !== undefined && output.KeyPhrasesDetectionJobPropertiesList !== null
            ? deserializeAws_json1_1KeyPhrasesDetectionJobPropertiesList(output.KeyPhrasesDetectionJobPropertiesList, context)
            : undefined,
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    };
};
const deserializeAws_json1_1ListOfClasses = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1DocumentClass(entry, context);
    });
};
const deserializeAws_json1_1ListOfDetectDominantLanguageResult = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1BatchDetectDominantLanguageItemResult(entry, context);
    });
};
const deserializeAws_json1_1ListOfDetectEntitiesResult = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1BatchDetectEntitiesItemResult(entry, context);
    });
};
const deserializeAws_json1_1ListOfDetectKeyPhrasesResult = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1BatchDetectKeyPhrasesItemResult(entry, context);
    });
};
const deserializeAws_json1_1ListOfDetectSentimentResult = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1BatchDetectSentimentItemResult(entry, context);
    });
};
const deserializeAws_json1_1ListOfDetectSyntaxResult = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1BatchDetectSyntaxItemResult(entry, context);
    });
};
const deserializeAws_json1_1ListOfDominantLanguages = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1DominantLanguage(entry, context);
    });
};
const deserializeAws_json1_1ListOfEntities = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Entity(entry, context);
    });
};
const deserializeAws_json1_1ListOfKeyPhrases = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1KeyPhrase(entry, context);
    });
};
const deserializeAws_json1_1ListOfLabels = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1DocumentLabel(entry, context);
    });
};
const deserializeAws_json1_1ListOfPiiEntities = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1PiiEntity(entry, context);
    });
};
const deserializeAws_json1_1ListOfPiiEntityTypes = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1ListOfSyntaxTokens = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1SyntaxToken(entry, context);
    });
};
const deserializeAws_json1_1ListPiiEntitiesDetectionJobsResponse = (output, context) => {
    return {
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        PiiEntitiesDetectionJobPropertiesList: output.PiiEntitiesDetectionJobPropertiesList !== undefined &&
            output.PiiEntitiesDetectionJobPropertiesList !== null
            ? deserializeAws_json1_1PiiEntitiesDetectionJobPropertiesList(output.PiiEntitiesDetectionJobPropertiesList, context)
            : undefined,
    };
};
const deserializeAws_json1_1ListSentimentDetectionJobsResponse = (output, context) => {
    return {
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        SentimentDetectionJobPropertiesList: output.SentimentDetectionJobPropertiesList !== undefined && output.SentimentDetectionJobPropertiesList !== null
            ? deserializeAws_json1_1SentimentDetectionJobPropertiesList(output.SentimentDetectionJobPropertiesList, context)
            : undefined,
    };
};
const deserializeAws_json1_1ListTagsForResourceResponse = (output, context) => {
    return {
        ResourceArn: output.ResourceArn !== undefined && output.ResourceArn !== null ? output.ResourceArn : undefined,
        Tags: output.Tags !== undefined && output.Tags !== null
            ? deserializeAws_json1_1TagList(output.Tags, context)
            : undefined,
    };
};
const deserializeAws_json1_1ListTopicsDetectionJobsResponse = (output, context) => {
    return {
        NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
        TopicsDetectionJobPropertiesList: output.TopicsDetectionJobPropertiesList !== undefined && output.TopicsDetectionJobPropertiesList !== null
            ? deserializeAws_json1_1TopicsDetectionJobPropertiesList(output.TopicsDetectionJobPropertiesList, context)
            : undefined,
    };
};
const deserializeAws_json1_1OutputDataConfig = (output, context) => {
    return {
        KmsKeyId: output.KmsKeyId !== undefined && output.KmsKeyId !== null ? output.KmsKeyId : undefined,
        S3Uri: output.S3Uri !== undefined && output.S3Uri !== null ? output.S3Uri : undefined,
    };
};
const deserializeAws_json1_1PartOfSpeechTag = (output, context) => {
    return {
        Score: output.Score !== undefined && output.Score !== null ? output.Score : undefined,
        Tag: output.Tag !== undefined && output.Tag !== null ? output.Tag : undefined,
    };
};
const deserializeAws_json1_1PiiEntitiesDetectionJobProperties = (output, context) => {
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
const deserializeAws_json1_1PiiEntitiesDetectionJobPropertiesList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1PiiEntitiesDetectionJobProperties(entry, context);
    });
};
const deserializeAws_json1_1PiiEntity = (output, context) => {
    return {
        BeginOffset: output.BeginOffset !== undefined && output.BeginOffset !== null ? output.BeginOffset : undefined,
        EndOffset: output.EndOffset !== undefined && output.EndOffset !== null ? output.EndOffset : undefined,
        Score: output.Score !== undefined && output.Score !== null ? output.Score : undefined,
        Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    };
};
const deserializeAws_json1_1PiiOutputDataConfig = (output, context) => {
    return {
        KmsKeyId: output.KmsKeyId !== undefined && output.KmsKeyId !== null ? output.KmsKeyId : undefined,
        S3Uri: output.S3Uri !== undefined && output.S3Uri !== null ? output.S3Uri : undefined,
    };
};
const deserializeAws_json1_1RedactionConfig = (output, context) => {
    return {
        MaskCharacter: output.MaskCharacter !== undefined && output.MaskCharacter !== null ? output.MaskCharacter : undefined,
        MaskMode: output.MaskMode !== undefined && output.MaskMode !== null ? output.MaskMode : undefined,
        PiiEntityTypes: output.PiiEntityTypes !== undefined && output.PiiEntityTypes !== null
            ? deserializeAws_json1_1ListOfPiiEntityTypes(output.PiiEntityTypes, context)
            : undefined,
    };
};
const deserializeAws_json1_1ResourceInUseException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1ResourceLimitExceededException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1ResourceNotFoundException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1ResourceUnavailableException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1SecurityGroupIds = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1SentimentDetectionJobProperties = (output, context) => {
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
const deserializeAws_json1_1SentimentDetectionJobPropertiesList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1SentimentDetectionJobProperties(entry, context);
    });
};
const deserializeAws_json1_1SentimentScore = (output, context) => {
    return {
        Mixed: output.Mixed !== undefined && output.Mixed !== null ? output.Mixed : undefined,
        Negative: output.Negative !== undefined && output.Negative !== null ? output.Negative : undefined,
        Neutral: output.Neutral !== undefined && output.Neutral !== null ? output.Neutral : undefined,
        Positive: output.Positive !== undefined && output.Positive !== null ? output.Positive : undefined,
    };
};
const deserializeAws_json1_1StartDocumentClassificationJobResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
const deserializeAws_json1_1StartDominantLanguageDetectionJobResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
const deserializeAws_json1_1StartEntitiesDetectionJobResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
const deserializeAws_json1_1StartEventsDetectionJobResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
const deserializeAws_json1_1StartKeyPhrasesDetectionJobResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
const deserializeAws_json1_1StartPiiEntitiesDetectionJobResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
const deserializeAws_json1_1StartSentimentDetectionJobResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
const deserializeAws_json1_1StartTopicsDetectionJobResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
const deserializeAws_json1_1StopDominantLanguageDetectionJobResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
const deserializeAws_json1_1StopEntitiesDetectionJobResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
const deserializeAws_json1_1StopEventsDetectionJobResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
const deserializeAws_json1_1StopKeyPhrasesDetectionJobResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
const deserializeAws_json1_1StopPiiEntitiesDetectionJobResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
const deserializeAws_json1_1StopSentimentDetectionJobResponse = (output, context) => {
    return {
        JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
        JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    };
};
const deserializeAws_json1_1StopTrainingDocumentClassifierResponse = (output, context) => {
    return {};
};
const deserializeAws_json1_1StopTrainingEntityRecognizerResponse = (output, context) => {
    return {};
};
const deserializeAws_json1_1Subnets = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1SyntaxToken = (output, context) => {
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
const deserializeAws_json1_1Tag = (output, context) => {
    return {
        Key: output.Key !== undefined && output.Key !== null ? output.Key : undefined,
        Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
    };
};
const deserializeAws_json1_1TagList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1Tag(entry, context);
    });
};
const deserializeAws_json1_1TagResourceResponse = (output, context) => {
    return {};
};
const deserializeAws_json1_1TargetEventTypes = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return entry;
    });
};
const deserializeAws_json1_1TextSizeLimitExceededException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1TooManyRequestsException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1TooManyTagKeysException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1TooManyTagsException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1TopicsDetectionJobProperties = (output, context) => {
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
const deserializeAws_json1_1TopicsDetectionJobPropertiesList = (output, context) => {
    return (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        if (entry === null) {
            return null;
        }
        return deserializeAws_json1_1TopicsDetectionJobProperties(entry, context);
    });
};
const deserializeAws_json1_1UnsupportedLanguageException = (output, context) => {
    return {
        Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    };
};
const deserializeAws_json1_1UntagResourceResponse = (output, context) => {
    return {};
};
const deserializeAws_json1_1UpdateEndpointResponse = (output, context) => {
    return {};
};
const deserializeAws_json1_1VpcConfig = (output, context) => {
    return {
        SecurityGroupIds: output.SecurityGroupIds !== undefined && output.SecurityGroupIds !== null
            ? deserializeAws_json1_1SecurityGroupIds(output.SecurityGroupIds, context)
            : undefined,
        Subnets: output.Subnets !== undefined && output.Subnets !== null
            ? deserializeAws_json1_1Subnets(output.Subnets, context)
            : undefined,
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
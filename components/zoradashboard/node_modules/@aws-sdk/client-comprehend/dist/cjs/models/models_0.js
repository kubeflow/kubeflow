"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceInUseException = exports.KmsKeyValidationException = exports.CreateDocumentClassifierResponse = exports.CreateDocumentClassifierRequest = exports.VpcConfig = exports.Tag = exports.DocumentClassifierOutputDataConfig = exports.DocumentClassifierMode = exports.DocumentClassifierInputDataConfig = exports.DocumentClassifierDataFormat = exports.ResourceUnavailableException = exports.ClassifyDocumentResponse = exports.DocumentLabel = exports.DocumentClass = exports.ClassifyDocumentRequest = exports.ClassifierMetadata = exports.ClassifierEvaluationMetrics = exports.BatchDetectSyntaxResponse = exports.BatchDetectSyntaxItemResult = exports.SyntaxToken = exports.PartOfSpeechTag = exports.PartOfSpeechTagType = exports.BatchDetectSyntaxRequest = exports.SyntaxLanguageCode = exports.BatchDetectSentimentResponse = exports.BatchDetectSentimentItemResult = exports.SentimentScore = exports.SentimentType = exports.BatchDetectSentimentRequest = exports.BatchDetectKeyPhrasesResponse = exports.BatchDetectKeyPhrasesItemResult = exports.KeyPhrase = exports.BatchDetectKeyPhrasesRequest = exports.UnsupportedLanguageException = exports.BatchDetectEntitiesResponse = exports.BatchDetectEntitiesItemResult = exports.Entity = exports.EntityType = exports.BatchDetectEntitiesRequest = exports.LanguageCode = exports.TextSizeLimitExceededException = exports.InvalidRequestException = exports.InternalServerException = exports.BatchSizeLimitExceededException = exports.BatchDetectDominantLanguageResponse = exports.BatchDetectDominantLanguageItemResult = exports.DominantLanguage = exports.BatchItemError = exports.BatchDetectDominantLanguageRequest = exports.AugmentedManifestsListItem = void 0;
exports.DescribeEventsDetectionJobRequest = exports.DescribeEntityRecognizerResponse = exports.EntityRecognizerProperties = exports.EntityRecognizerMetadata = exports.EntityRecognizerEvaluationMetrics = exports.EntityRecognizerMetadataEntityTypesListItem = exports.EntityTypesEvaluationMetrics = exports.DescribeEntityRecognizerRequest = exports.DescribeEntitiesDetectionJobResponse = exports.EntitiesDetectionJobProperties = exports.DescribeEntitiesDetectionJobRequest = exports.DescribeEndpointResponse = exports.EndpointProperties = exports.EndpointStatus = exports.DescribeEndpointRequest = exports.DescribeDominantLanguageDetectionJobResponse = exports.DominantLanguageDetectionJobProperties = exports.DescribeDominantLanguageDetectionJobRequest = exports.DescribeDocumentClassifierResponse = exports.DocumentClassifierProperties = exports.ModelStatus = exports.DescribeDocumentClassifierRequest = exports.JobNotFoundException = exports.DescribeDocumentClassificationJobResponse = exports.DocumentClassificationJobProperties = exports.OutputDataConfig = exports.JobStatus = exports.InputDataConfig = exports.InputFormat = exports.DescribeDocumentClassificationJobRequest = exports.DeleteEntityRecognizerResponse = exports.DeleteEntityRecognizerRequest = exports.DeleteEndpointResponse = exports.DeleteEndpointRequest = exports.DeleteDocumentClassifierResponse = exports.DeleteDocumentClassifierRequest = exports.CreateEntityRecognizerResponse = exports.CreateEntityRecognizerRequest = exports.EntityRecognizerInputDataConfig = exports.EntityTypesListItem = exports.EntityRecognizerEntityList = exports.EntityRecognizerDocuments = exports.EntityRecognizerDataFormat = exports.EntityRecognizerAnnotations = exports.ResourceNotFoundException = exports.CreateEndpointResponse = exports.CreateEndpointRequest = exports.TooManyTagsException = exports.TooManyRequestsException = exports.ResourceLimitExceededException = void 0;
exports.ListEntityRecognizersRequest = exports.EntityRecognizerFilter = exports.ListEntitiesDetectionJobsResponse = exports.ListEntitiesDetectionJobsRequest = exports.EntitiesDetectionJobFilter = exports.ListEndpointsResponse = exports.ListEndpointsRequest = exports.EndpointFilter = exports.ListDominantLanguageDetectionJobsResponse = exports.ListDominantLanguageDetectionJobsRequest = exports.DominantLanguageDetectionJobFilter = exports.ListDocumentClassifiersResponse = exports.ListDocumentClassifiersRequest = exports.DocumentClassifierFilter = exports.ListDocumentClassificationJobsResponse = exports.ListDocumentClassificationJobsRequest = exports.DocumentClassificationJobFilter = exports.InvalidFilterException = exports.DetectSyntaxResponse = exports.DetectSyntaxRequest = exports.DetectSentimentResponse = exports.DetectSentimentRequest = exports.DetectPiiEntitiesResponse = exports.PiiEntity = exports.DetectPiiEntitiesRequest = exports.DetectKeyPhrasesResponse = exports.DetectKeyPhrasesRequest = exports.DetectEntitiesResponse = exports.DetectEntitiesRequest = exports.DetectDominantLanguageResponse = exports.DetectDominantLanguageRequest = exports.DescribeTopicsDetectionJobResponse = exports.TopicsDetectionJobProperties = exports.DescribeTopicsDetectionJobRequest = exports.DescribeSentimentDetectionJobResponse = exports.SentimentDetectionJobProperties = exports.DescribeSentimentDetectionJobRequest = exports.DescribePiiEntitiesDetectionJobResponse = exports.PiiEntitiesDetectionJobProperties = exports.RedactionConfig = exports.PiiEntityType = exports.PiiEntitiesDetectionMaskMode = exports.PiiOutputDataConfig = exports.PiiEntitiesDetectionMode = exports.DescribePiiEntitiesDetectionJobRequest = exports.DescribeKeyPhrasesDetectionJobResponse = exports.KeyPhrasesDetectionJobProperties = exports.DescribeKeyPhrasesDetectionJobRequest = exports.DescribeEventsDetectionJobResponse = exports.EventsDetectionJobProperties = void 0;
exports.StopTrainingEntityRecognizerResponse = exports.StopTrainingEntityRecognizerRequest = exports.StopTrainingDocumentClassifierResponse = exports.StopTrainingDocumentClassifierRequest = exports.StopSentimentDetectionJobResponse = exports.StopSentimentDetectionJobRequest = exports.StopPiiEntitiesDetectionJobResponse = exports.StopPiiEntitiesDetectionJobRequest = exports.StopKeyPhrasesDetectionJobResponse = exports.StopKeyPhrasesDetectionJobRequest = exports.StopEventsDetectionJobResponse = exports.StopEventsDetectionJobRequest = exports.StopEntitiesDetectionJobResponse = exports.StopEntitiesDetectionJobRequest = exports.StopDominantLanguageDetectionJobResponse = exports.StopDominantLanguageDetectionJobRequest = exports.StartTopicsDetectionJobResponse = exports.StartTopicsDetectionJobRequest = exports.StartSentimentDetectionJobResponse = exports.StartSentimentDetectionJobRequest = exports.StartPiiEntitiesDetectionJobResponse = exports.StartPiiEntitiesDetectionJobRequest = exports.StartKeyPhrasesDetectionJobResponse = exports.StartKeyPhrasesDetectionJobRequest = exports.StartEventsDetectionJobResponse = exports.StartEventsDetectionJobRequest = exports.StartEntitiesDetectionJobResponse = exports.StartEntitiesDetectionJobRequest = exports.StartDominantLanguageDetectionJobResponse = exports.StartDominantLanguageDetectionJobRequest = exports.StartDocumentClassificationJobResponse = exports.StartDocumentClassificationJobRequest = exports.ListTopicsDetectionJobsResponse = exports.ListTopicsDetectionJobsRequest = exports.TopicsDetectionJobFilter = exports.ListTagsForResourceResponse = exports.ListTagsForResourceRequest = exports.ListSentimentDetectionJobsResponse = exports.ListSentimentDetectionJobsRequest = exports.SentimentDetectionJobFilter = exports.ListPiiEntitiesDetectionJobsResponse = exports.ListPiiEntitiesDetectionJobsRequest = exports.PiiEntitiesDetectionJobFilter = exports.ListKeyPhrasesDetectionJobsResponse = exports.ListKeyPhrasesDetectionJobsRequest = exports.KeyPhrasesDetectionJobFilter = exports.ListEventsDetectionJobsResponse = exports.ListEventsDetectionJobsRequest = exports.EventsDetectionJobFilter = exports.ListEntityRecognizersResponse = void 0;
exports.UpdateEndpointResponse = exports.UpdateEndpointRequest = exports.UntagResourceResponse = exports.UntagResourceRequest = exports.TooManyTagKeysException = exports.TagResourceResponse = exports.TagResourceRequest = exports.ConcurrentModificationException = void 0;
const smithy_client_1 = require("@aws-sdk/smithy-client");
var AugmentedManifestsListItem;
(function (AugmentedManifestsListItem) {
    AugmentedManifestsListItem.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AugmentedManifestsListItem = exports.AugmentedManifestsListItem || (exports.AugmentedManifestsListItem = {}));
var BatchDetectDominantLanguageRequest;
(function (BatchDetectDominantLanguageRequest) {
    BatchDetectDominantLanguageRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.TextList && { TextList: smithy_client_1.SENSITIVE_STRING }),
    });
})(BatchDetectDominantLanguageRequest = exports.BatchDetectDominantLanguageRequest || (exports.BatchDetectDominantLanguageRequest = {}));
var BatchItemError;
(function (BatchItemError) {
    BatchItemError.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BatchItemError = exports.BatchItemError || (exports.BatchItemError = {}));
var DominantLanguage;
(function (DominantLanguage) {
    DominantLanguage.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DominantLanguage = exports.DominantLanguage || (exports.DominantLanguage = {}));
var BatchDetectDominantLanguageItemResult;
(function (BatchDetectDominantLanguageItemResult) {
    BatchDetectDominantLanguageItemResult.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BatchDetectDominantLanguageItemResult = exports.BatchDetectDominantLanguageItemResult || (exports.BatchDetectDominantLanguageItemResult = {}));
var BatchDetectDominantLanguageResponse;
(function (BatchDetectDominantLanguageResponse) {
    BatchDetectDominantLanguageResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BatchDetectDominantLanguageResponse = exports.BatchDetectDominantLanguageResponse || (exports.BatchDetectDominantLanguageResponse = {}));
var BatchSizeLimitExceededException;
(function (BatchSizeLimitExceededException) {
    BatchSizeLimitExceededException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BatchSizeLimitExceededException = exports.BatchSizeLimitExceededException || (exports.BatchSizeLimitExceededException = {}));
var InternalServerException;
(function (InternalServerException) {
    InternalServerException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InternalServerException = exports.InternalServerException || (exports.InternalServerException = {}));
var InvalidRequestException;
(function (InvalidRequestException) {
    InvalidRequestException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidRequestException = exports.InvalidRequestException || (exports.InvalidRequestException = {}));
var TextSizeLimitExceededException;
(function (TextSizeLimitExceededException) {
    TextSizeLimitExceededException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TextSizeLimitExceededException = exports.TextSizeLimitExceededException || (exports.TextSizeLimitExceededException = {}));
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["AR"] = "ar";
    LanguageCode["DE"] = "de";
    LanguageCode["EN"] = "en";
    LanguageCode["ES"] = "es";
    LanguageCode["FR"] = "fr";
    LanguageCode["HI"] = "hi";
    LanguageCode["IT"] = "it";
    LanguageCode["JA"] = "ja";
    LanguageCode["KO"] = "ko";
    LanguageCode["PT"] = "pt";
    LanguageCode["ZH"] = "zh";
    LanguageCode["ZH_TW"] = "zh-TW";
})(LanguageCode = exports.LanguageCode || (exports.LanguageCode = {}));
var BatchDetectEntitiesRequest;
(function (BatchDetectEntitiesRequest) {
    BatchDetectEntitiesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.TextList && { TextList: smithy_client_1.SENSITIVE_STRING }),
    });
})(BatchDetectEntitiesRequest = exports.BatchDetectEntitiesRequest || (exports.BatchDetectEntitiesRequest = {}));
var EntityType;
(function (EntityType) {
    EntityType["COMMERCIAL_ITEM"] = "COMMERCIAL_ITEM";
    EntityType["DATE"] = "DATE";
    EntityType["EVENT"] = "EVENT";
    EntityType["LOCATION"] = "LOCATION";
    EntityType["ORGANIZATION"] = "ORGANIZATION";
    EntityType["OTHER"] = "OTHER";
    EntityType["PERSON"] = "PERSON";
    EntityType["QUANTITY"] = "QUANTITY";
    EntityType["TITLE"] = "TITLE";
})(EntityType = exports.EntityType || (exports.EntityType = {}));
var Entity;
(function (Entity) {
    Entity.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Entity = exports.Entity || (exports.Entity = {}));
var BatchDetectEntitiesItemResult;
(function (BatchDetectEntitiesItemResult) {
    BatchDetectEntitiesItemResult.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BatchDetectEntitiesItemResult = exports.BatchDetectEntitiesItemResult || (exports.BatchDetectEntitiesItemResult = {}));
var BatchDetectEntitiesResponse;
(function (BatchDetectEntitiesResponse) {
    BatchDetectEntitiesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BatchDetectEntitiesResponse = exports.BatchDetectEntitiesResponse || (exports.BatchDetectEntitiesResponse = {}));
var UnsupportedLanguageException;
(function (UnsupportedLanguageException) {
    UnsupportedLanguageException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UnsupportedLanguageException = exports.UnsupportedLanguageException || (exports.UnsupportedLanguageException = {}));
var BatchDetectKeyPhrasesRequest;
(function (BatchDetectKeyPhrasesRequest) {
    BatchDetectKeyPhrasesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.TextList && { TextList: smithy_client_1.SENSITIVE_STRING }),
    });
})(BatchDetectKeyPhrasesRequest = exports.BatchDetectKeyPhrasesRequest || (exports.BatchDetectKeyPhrasesRequest = {}));
var KeyPhrase;
(function (KeyPhrase) {
    KeyPhrase.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KeyPhrase = exports.KeyPhrase || (exports.KeyPhrase = {}));
var BatchDetectKeyPhrasesItemResult;
(function (BatchDetectKeyPhrasesItemResult) {
    BatchDetectKeyPhrasesItemResult.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BatchDetectKeyPhrasesItemResult = exports.BatchDetectKeyPhrasesItemResult || (exports.BatchDetectKeyPhrasesItemResult = {}));
var BatchDetectKeyPhrasesResponse;
(function (BatchDetectKeyPhrasesResponse) {
    BatchDetectKeyPhrasesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BatchDetectKeyPhrasesResponse = exports.BatchDetectKeyPhrasesResponse || (exports.BatchDetectKeyPhrasesResponse = {}));
var BatchDetectSentimentRequest;
(function (BatchDetectSentimentRequest) {
    BatchDetectSentimentRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.TextList && { TextList: smithy_client_1.SENSITIVE_STRING }),
    });
})(BatchDetectSentimentRequest = exports.BatchDetectSentimentRequest || (exports.BatchDetectSentimentRequest = {}));
var SentimentType;
(function (SentimentType) {
    SentimentType["MIXED"] = "MIXED";
    SentimentType["NEGATIVE"] = "NEGATIVE";
    SentimentType["NEUTRAL"] = "NEUTRAL";
    SentimentType["POSITIVE"] = "POSITIVE";
})(SentimentType = exports.SentimentType || (exports.SentimentType = {}));
var SentimentScore;
(function (SentimentScore) {
    SentimentScore.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SentimentScore = exports.SentimentScore || (exports.SentimentScore = {}));
var BatchDetectSentimentItemResult;
(function (BatchDetectSentimentItemResult) {
    BatchDetectSentimentItemResult.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BatchDetectSentimentItemResult = exports.BatchDetectSentimentItemResult || (exports.BatchDetectSentimentItemResult = {}));
var BatchDetectSentimentResponse;
(function (BatchDetectSentimentResponse) {
    BatchDetectSentimentResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BatchDetectSentimentResponse = exports.BatchDetectSentimentResponse || (exports.BatchDetectSentimentResponse = {}));
var SyntaxLanguageCode;
(function (SyntaxLanguageCode) {
    SyntaxLanguageCode["DE"] = "de";
    SyntaxLanguageCode["EN"] = "en";
    SyntaxLanguageCode["ES"] = "es";
    SyntaxLanguageCode["FR"] = "fr";
    SyntaxLanguageCode["IT"] = "it";
    SyntaxLanguageCode["PT"] = "pt";
})(SyntaxLanguageCode = exports.SyntaxLanguageCode || (exports.SyntaxLanguageCode = {}));
var BatchDetectSyntaxRequest;
(function (BatchDetectSyntaxRequest) {
    BatchDetectSyntaxRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.TextList && { TextList: smithy_client_1.SENSITIVE_STRING }),
    });
})(BatchDetectSyntaxRequest = exports.BatchDetectSyntaxRequest || (exports.BatchDetectSyntaxRequest = {}));
var PartOfSpeechTagType;
(function (PartOfSpeechTagType) {
    PartOfSpeechTagType["ADJ"] = "ADJ";
    PartOfSpeechTagType["ADP"] = "ADP";
    PartOfSpeechTagType["ADV"] = "ADV";
    PartOfSpeechTagType["AUX"] = "AUX";
    PartOfSpeechTagType["CCONJ"] = "CCONJ";
    PartOfSpeechTagType["CONJ"] = "CONJ";
    PartOfSpeechTagType["DET"] = "DET";
    PartOfSpeechTagType["INTJ"] = "INTJ";
    PartOfSpeechTagType["NOUN"] = "NOUN";
    PartOfSpeechTagType["NUM"] = "NUM";
    PartOfSpeechTagType["O"] = "O";
    PartOfSpeechTagType["PART"] = "PART";
    PartOfSpeechTagType["PRON"] = "PRON";
    PartOfSpeechTagType["PROPN"] = "PROPN";
    PartOfSpeechTagType["PUNCT"] = "PUNCT";
    PartOfSpeechTagType["SCONJ"] = "SCONJ";
    PartOfSpeechTagType["SYM"] = "SYM";
    PartOfSpeechTagType["VERB"] = "VERB";
})(PartOfSpeechTagType = exports.PartOfSpeechTagType || (exports.PartOfSpeechTagType = {}));
var PartOfSpeechTag;
(function (PartOfSpeechTag) {
    PartOfSpeechTag.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PartOfSpeechTag = exports.PartOfSpeechTag || (exports.PartOfSpeechTag = {}));
var SyntaxToken;
(function (SyntaxToken) {
    SyntaxToken.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SyntaxToken = exports.SyntaxToken || (exports.SyntaxToken = {}));
var BatchDetectSyntaxItemResult;
(function (BatchDetectSyntaxItemResult) {
    BatchDetectSyntaxItemResult.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BatchDetectSyntaxItemResult = exports.BatchDetectSyntaxItemResult || (exports.BatchDetectSyntaxItemResult = {}));
var BatchDetectSyntaxResponse;
(function (BatchDetectSyntaxResponse) {
    BatchDetectSyntaxResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BatchDetectSyntaxResponse = exports.BatchDetectSyntaxResponse || (exports.BatchDetectSyntaxResponse = {}));
var ClassifierEvaluationMetrics;
(function (ClassifierEvaluationMetrics) {
    ClassifierEvaluationMetrics.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ClassifierEvaluationMetrics = exports.ClassifierEvaluationMetrics || (exports.ClassifierEvaluationMetrics = {}));
var ClassifierMetadata;
(function (ClassifierMetadata) {
    ClassifierMetadata.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ClassifierMetadata = exports.ClassifierMetadata || (exports.ClassifierMetadata = {}));
var ClassifyDocumentRequest;
(function (ClassifyDocumentRequest) {
    ClassifyDocumentRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Text && { Text: smithy_client_1.SENSITIVE_STRING }),
    });
})(ClassifyDocumentRequest = exports.ClassifyDocumentRequest || (exports.ClassifyDocumentRequest = {}));
var DocumentClass;
(function (DocumentClass) {
    DocumentClass.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DocumentClass = exports.DocumentClass || (exports.DocumentClass = {}));
var DocumentLabel;
(function (DocumentLabel) {
    DocumentLabel.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DocumentLabel = exports.DocumentLabel || (exports.DocumentLabel = {}));
var ClassifyDocumentResponse;
(function (ClassifyDocumentResponse) {
    ClassifyDocumentResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ClassifyDocumentResponse = exports.ClassifyDocumentResponse || (exports.ClassifyDocumentResponse = {}));
var ResourceUnavailableException;
(function (ResourceUnavailableException) {
    ResourceUnavailableException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResourceUnavailableException = exports.ResourceUnavailableException || (exports.ResourceUnavailableException = {}));
var DocumentClassifierDataFormat;
(function (DocumentClassifierDataFormat) {
    DocumentClassifierDataFormat["AUGMENTED_MANIFEST"] = "AUGMENTED_MANIFEST";
    DocumentClassifierDataFormat["COMPREHEND_CSV"] = "COMPREHEND_CSV";
})(DocumentClassifierDataFormat = exports.DocumentClassifierDataFormat || (exports.DocumentClassifierDataFormat = {}));
var DocumentClassifierInputDataConfig;
(function (DocumentClassifierInputDataConfig) {
    DocumentClassifierInputDataConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DocumentClassifierInputDataConfig = exports.DocumentClassifierInputDataConfig || (exports.DocumentClassifierInputDataConfig = {}));
var DocumentClassifierMode;
(function (DocumentClassifierMode) {
    DocumentClassifierMode["MULTI_CLASS"] = "MULTI_CLASS";
    DocumentClassifierMode["MULTI_LABEL"] = "MULTI_LABEL";
})(DocumentClassifierMode = exports.DocumentClassifierMode || (exports.DocumentClassifierMode = {}));
var DocumentClassifierOutputDataConfig;
(function (DocumentClassifierOutputDataConfig) {
    DocumentClassifierOutputDataConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DocumentClassifierOutputDataConfig = exports.DocumentClassifierOutputDataConfig || (exports.DocumentClassifierOutputDataConfig = {}));
var Tag;
(function (Tag) {
    Tag.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Tag = exports.Tag || (exports.Tag = {}));
var VpcConfig;
(function (VpcConfig) {
    VpcConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(VpcConfig = exports.VpcConfig || (exports.VpcConfig = {}));
var CreateDocumentClassifierRequest;
(function (CreateDocumentClassifierRequest) {
    CreateDocumentClassifierRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateDocumentClassifierRequest = exports.CreateDocumentClassifierRequest || (exports.CreateDocumentClassifierRequest = {}));
var CreateDocumentClassifierResponse;
(function (CreateDocumentClassifierResponse) {
    CreateDocumentClassifierResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateDocumentClassifierResponse = exports.CreateDocumentClassifierResponse || (exports.CreateDocumentClassifierResponse = {}));
var KmsKeyValidationException;
(function (KmsKeyValidationException) {
    KmsKeyValidationException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KmsKeyValidationException = exports.KmsKeyValidationException || (exports.KmsKeyValidationException = {}));
var ResourceInUseException;
(function (ResourceInUseException) {
    ResourceInUseException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResourceInUseException = exports.ResourceInUseException || (exports.ResourceInUseException = {}));
var ResourceLimitExceededException;
(function (ResourceLimitExceededException) {
    ResourceLimitExceededException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResourceLimitExceededException = exports.ResourceLimitExceededException || (exports.ResourceLimitExceededException = {}));
var TooManyRequestsException;
(function (TooManyRequestsException) {
    TooManyRequestsException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TooManyRequestsException = exports.TooManyRequestsException || (exports.TooManyRequestsException = {}));
var TooManyTagsException;
(function (TooManyTagsException) {
    TooManyTagsException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TooManyTagsException = exports.TooManyTagsException || (exports.TooManyTagsException = {}));
var CreateEndpointRequest;
(function (CreateEndpointRequest) {
    CreateEndpointRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateEndpointRequest = exports.CreateEndpointRequest || (exports.CreateEndpointRequest = {}));
var CreateEndpointResponse;
(function (CreateEndpointResponse) {
    CreateEndpointResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateEndpointResponse = exports.CreateEndpointResponse || (exports.CreateEndpointResponse = {}));
var ResourceNotFoundException;
(function (ResourceNotFoundException) {
    ResourceNotFoundException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResourceNotFoundException = exports.ResourceNotFoundException || (exports.ResourceNotFoundException = {}));
var EntityRecognizerAnnotations;
(function (EntityRecognizerAnnotations) {
    EntityRecognizerAnnotations.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EntityRecognizerAnnotations = exports.EntityRecognizerAnnotations || (exports.EntityRecognizerAnnotations = {}));
var EntityRecognizerDataFormat;
(function (EntityRecognizerDataFormat) {
    EntityRecognizerDataFormat["AUGMENTED_MANIFEST"] = "AUGMENTED_MANIFEST";
    EntityRecognizerDataFormat["COMPREHEND_CSV"] = "COMPREHEND_CSV";
})(EntityRecognizerDataFormat = exports.EntityRecognizerDataFormat || (exports.EntityRecognizerDataFormat = {}));
var EntityRecognizerDocuments;
(function (EntityRecognizerDocuments) {
    EntityRecognizerDocuments.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EntityRecognizerDocuments = exports.EntityRecognizerDocuments || (exports.EntityRecognizerDocuments = {}));
var EntityRecognizerEntityList;
(function (EntityRecognizerEntityList) {
    EntityRecognizerEntityList.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EntityRecognizerEntityList = exports.EntityRecognizerEntityList || (exports.EntityRecognizerEntityList = {}));
var EntityTypesListItem;
(function (EntityTypesListItem) {
    EntityTypesListItem.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EntityTypesListItem = exports.EntityTypesListItem || (exports.EntityTypesListItem = {}));
var EntityRecognizerInputDataConfig;
(function (EntityRecognizerInputDataConfig) {
    EntityRecognizerInputDataConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EntityRecognizerInputDataConfig = exports.EntityRecognizerInputDataConfig || (exports.EntityRecognizerInputDataConfig = {}));
var CreateEntityRecognizerRequest;
(function (CreateEntityRecognizerRequest) {
    CreateEntityRecognizerRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateEntityRecognizerRequest = exports.CreateEntityRecognizerRequest || (exports.CreateEntityRecognizerRequest = {}));
var CreateEntityRecognizerResponse;
(function (CreateEntityRecognizerResponse) {
    CreateEntityRecognizerResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateEntityRecognizerResponse = exports.CreateEntityRecognizerResponse || (exports.CreateEntityRecognizerResponse = {}));
var DeleteDocumentClassifierRequest;
(function (DeleteDocumentClassifierRequest) {
    DeleteDocumentClassifierRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteDocumentClassifierRequest = exports.DeleteDocumentClassifierRequest || (exports.DeleteDocumentClassifierRequest = {}));
var DeleteDocumentClassifierResponse;
(function (DeleteDocumentClassifierResponse) {
    DeleteDocumentClassifierResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteDocumentClassifierResponse = exports.DeleteDocumentClassifierResponse || (exports.DeleteDocumentClassifierResponse = {}));
var DeleteEndpointRequest;
(function (DeleteEndpointRequest) {
    DeleteEndpointRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteEndpointRequest = exports.DeleteEndpointRequest || (exports.DeleteEndpointRequest = {}));
var DeleteEndpointResponse;
(function (DeleteEndpointResponse) {
    DeleteEndpointResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteEndpointResponse = exports.DeleteEndpointResponse || (exports.DeleteEndpointResponse = {}));
var DeleteEntityRecognizerRequest;
(function (DeleteEntityRecognizerRequest) {
    DeleteEntityRecognizerRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteEntityRecognizerRequest = exports.DeleteEntityRecognizerRequest || (exports.DeleteEntityRecognizerRequest = {}));
var DeleteEntityRecognizerResponse;
(function (DeleteEntityRecognizerResponse) {
    DeleteEntityRecognizerResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteEntityRecognizerResponse = exports.DeleteEntityRecognizerResponse || (exports.DeleteEntityRecognizerResponse = {}));
var DescribeDocumentClassificationJobRequest;
(function (DescribeDocumentClassificationJobRequest) {
    DescribeDocumentClassificationJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeDocumentClassificationJobRequest = exports.DescribeDocumentClassificationJobRequest || (exports.DescribeDocumentClassificationJobRequest = {}));
var InputFormat;
(function (InputFormat) {
    InputFormat["ONE_DOC_PER_FILE"] = "ONE_DOC_PER_FILE";
    InputFormat["ONE_DOC_PER_LINE"] = "ONE_DOC_PER_LINE";
})(InputFormat = exports.InputFormat || (exports.InputFormat = {}));
var InputDataConfig;
(function (InputDataConfig) {
    InputDataConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InputDataConfig = exports.InputDataConfig || (exports.InputDataConfig = {}));
var JobStatus;
(function (JobStatus) {
    JobStatus["COMPLETED"] = "COMPLETED";
    JobStatus["FAILED"] = "FAILED";
    JobStatus["IN_PROGRESS"] = "IN_PROGRESS";
    JobStatus["STOPPED"] = "STOPPED";
    JobStatus["STOP_REQUESTED"] = "STOP_REQUESTED";
    JobStatus["SUBMITTED"] = "SUBMITTED";
})(JobStatus = exports.JobStatus || (exports.JobStatus = {}));
var OutputDataConfig;
(function (OutputDataConfig) {
    OutputDataConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(OutputDataConfig = exports.OutputDataConfig || (exports.OutputDataConfig = {}));
var DocumentClassificationJobProperties;
(function (DocumentClassificationJobProperties) {
    DocumentClassificationJobProperties.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DocumentClassificationJobProperties = exports.DocumentClassificationJobProperties || (exports.DocumentClassificationJobProperties = {}));
var DescribeDocumentClassificationJobResponse;
(function (DescribeDocumentClassificationJobResponse) {
    DescribeDocumentClassificationJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeDocumentClassificationJobResponse = exports.DescribeDocumentClassificationJobResponse || (exports.DescribeDocumentClassificationJobResponse = {}));
var JobNotFoundException;
(function (JobNotFoundException) {
    JobNotFoundException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(JobNotFoundException = exports.JobNotFoundException || (exports.JobNotFoundException = {}));
var DescribeDocumentClassifierRequest;
(function (DescribeDocumentClassifierRequest) {
    DescribeDocumentClassifierRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeDocumentClassifierRequest = exports.DescribeDocumentClassifierRequest || (exports.DescribeDocumentClassifierRequest = {}));
var ModelStatus;
(function (ModelStatus) {
    ModelStatus["DELETING"] = "DELETING";
    ModelStatus["IN_ERROR"] = "IN_ERROR";
    ModelStatus["STOPPED"] = "STOPPED";
    ModelStatus["STOP_REQUESTED"] = "STOP_REQUESTED";
    ModelStatus["SUBMITTED"] = "SUBMITTED";
    ModelStatus["TRAINED"] = "TRAINED";
    ModelStatus["TRAINING"] = "TRAINING";
})(ModelStatus = exports.ModelStatus || (exports.ModelStatus = {}));
var DocumentClassifierProperties;
(function (DocumentClassifierProperties) {
    DocumentClassifierProperties.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.ClassifierMetadata && { ClassifierMetadata: smithy_client_1.SENSITIVE_STRING }),
    });
})(DocumentClassifierProperties = exports.DocumentClassifierProperties || (exports.DocumentClassifierProperties = {}));
var DescribeDocumentClassifierResponse;
(function (DescribeDocumentClassifierResponse) {
    DescribeDocumentClassifierResponse.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.DocumentClassifierProperties && {
            DocumentClassifierProperties: DocumentClassifierProperties.filterSensitiveLog(obj.DocumentClassifierProperties),
        }),
    });
})(DescribeDocumentClassifierResponse = exports.DescribeDocumentClassifierResponse || (exports.DescribeDocumentClassifierResponse = {}));
var DescribeDominantLanguageDetectionJobRequest;
(function (DescribeDominantLanguageDetectionJobRequest) {
    DescribeDominantLanguageDetectionJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeDominantLanguageDetectionJobRequest = exports.DescribeDominantLanguageDetectionJobRequest || (exports.DescribeDominantLanguageDetectionJobRequest = {}));
var DominantLanguageDetectionJobProperties;
(function (DominantLanguageDetectionJobProperties) {
    DominantLanguageDetectionJobProperties.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DominantLanguageDetectionJobProperties = exports.DominantLanguageDetectionJobProperties || (exports.DominantLanguageDetectionJobProperties = {}));
var DescribeDominantLanguageDetectionJobResponse;
(function (DescribeDominantLanguageDetectionJobResponse) {
    DescribeDominantLanguageDetectionJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeDominantLanguageDetectionJobResponse = exports.DescribeDominantLanguageDetectionJobResponse || (exports.DescribeDominantLanguageDetectionJobResponse = {}));
var DescribeEndpointRequest;
(function (DescribeEndpointRequest) {
    DescribeEndpointRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeEndpointRequest = exports.DescribeEndpointRequest || (exports.DescribeEndpointRequest = {}));
var EndpointStatus;
(function (EndpointStatus) {
    EndpointStatus["CREATING"] = "CREATING";
    EndpointStatus["DELETING"] = "DELETING";
    EndpointStatus["FAILED"] = "FAILED";
    EndpointStatus["IN_SERVICE"] = "IN_SERVICE";
    EndpointStatus["UPDATING"] = "UPDATING";
})(EndpointStatus = exports.EndpointStatus || (exports.EndpointStatus = {}));
var EndpointProperties;
(function (EndpointProperties) {
    EndpointProperties.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EndpointProperties = exports.EndpointProperties || (exports.EndpointProperties = {}));
var DescribeEndpointResponse;
(function (DescribeEndpointResponse) {
    DescribeEndpointResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeEndpointResponse = exports.DescribeEndpointResponse || (exports.DescribeEndpointResponse = {}));
var DescribeEntitiesDetectionJobRequest;
(function (DescribeEntitiesDetectionJobRequest) {
    DescribeEntitiesDetectionJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeEntitiesDetectionJobRequest = exports.DescribeEntitiesDetectionJobRequest || (exports.DescribeEntitiesDetectionJobRequest = {}));
var EntitiesDetectionJobProperties;
(function (EntitiesDetectionJobProperties) {
    EntitiesDetectionJobProperties.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EntitiesDetectionJobProperties = exports.EntitiesDetectionJobProperties || (exports.EntitiesDetectionJobProperties = {}));
var DescribeEntitiesDetectionJobResponse;
(function (DescribeEntitiesDetectionJobResponse) {
    DescribeEntitiesDetectionJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeEntitiesDetectionJobResponse = exports.DescribeEntitiesDetectionJobResponse || (exports.DescribeEntitiesDetectionJobResponse = {}));
var DescribeEntityRecognizerRequest;
(function (DescribeEntityRecognizerRequest) {
    DescribeEntityRecognizerRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeEntityRecognizerRequest = exports.DescribeEntityRecognizerRequest || (exports.DescribeEntityRecognizerRequest = {}));
var EntityTypesEvaluationMetrics;
(function (EntityTypesEvaluationMetrics) {
    EntityTypesEvaluationMetrics.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EntityTypesEvaluationMetrics = exports.EntityTypesEvaluationMetrics || (exports.EntityTypesEvaluationMetrics = {}));
var EntityRecognizerMetadataEntityTypesListItem;
(function (EntityRecognizerMetadataEntityTypesListItem) {
    EntityRecognizerMetadataEntityTypesListItem.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EntityRecognizerMetadataEntityTypesListItem = exports.EntityRecognizerMetadataEntityTypesListItem || (exports.EntityRecognizerMetadataEntityTypesListItem = {}));
var EntityRecognizerEvaluationMetrics;
(function (EntityRecognizerEvaluationMetrics) {
    EntityRecognizerEvaluationMetrics.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EntityRecognizerEvaluationMetrics = exports.EntityRecognizerEvaluationMetrics || (exports.EntityRecognizerEvaluationMetrics = {}));
var EntityRecognizerMetadata;
(function (EntityRecognizerMetadata) {
    EntityRecognizerMetadata.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EntityRecognizerMetadata = exports.EntityRecognizerMetadata || (exports.EntityRecognizerMetadata = {}));
var EntityRecognizerProperties;
(function (EntityRecognizerProperties) {
    EntityRecognizerProperties.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.RecognizerMetadata && { RecognizerMetadata: smithy_client_1.SENSITIVE_STRING }),
    });
})(EntityRecognizerProperties = exports.EntityRecognizerProperties || (exports.EntityRecognizerProperties = {}));
var DescribeEntityRecognizerResponse;
(function (DescribeEntityRecognizerResponse) {
    DescribeEntityRecognizerResponse.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.EntityRecognizerProperties && {
            EntityRecognizerProperties: EntityRecognizerProperties.filterSensitiveLog(obj.EntityRecognizerProperties),
        }),
    });
})(DescribeEntityRecognizerResponse = exports.DescribeEntityRecognizerResponse || (exports.DescribeEntityRecognizerResponse = {}));
var DescribeEventsDetectionJobRequest;
(function (DescribeEventsDetectionJobRequest) {
    DescribeEventsDetectionJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeEventsDetectionJobRequest = exports.DescribeEventsDetectionJobRequest || (exports.DescribeEventsDetectionJobRequest = {}));
var EventsDetectionJobProperties;
(function (EventsDetectionJobProperties) {
    EventsDetectionJobProperties.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EventsDetectionJobProperties = exports.EventsDetectionJobProperties || (exports.EventsDetectionJobProperties = {}));
var DescribeEventsDetectionJobResponse;
(function (DescribeEventsDetectionJobResponse) {
    DescribeEventsDetectionJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeEventsDetectionJobResponse = exports.DescribeEventsDetectionJobResponse || (exports.DescribeEventsDetectionJobResponse = {}));
var DescribeKeyPhrasesDetectionJobRequest;
(function (DescribeKeyPhrasesDetectionJobRequest) {
    DescribeKeyPhrasesDetectionJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeKeyPhrasesDetectionJobRequest = exports.DescribeKeyPhrasesDetectionJobRequest || (exports.DescribeKeyPhrasesDetectionJobRequest = {}));
var KeyPhrasesDetectionJobProperties;
(function (KeyPhrasesDetectionJobProperties) {
    KeyPhrasesDetectionJobProperties.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KeyPhrasesDetectionJobProperties = exports.KeyPhrasesDetectionJobProperties || (exports.KeyPhrasesDetectionJobProperties = {}));
var DescribeKeyPhrasesDetectionJobResponse;
(function (DescribeKeyPhrasesDetectionJobResponse) {
    DescribeKeyPhrasesDetectionJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeKeyPhrasesDetectionJobResponse = exports.DescribeKeyPhrasesDetectionJobResponse || (exports.DescribeKeyPhrasesDetectionJobResponse = {}));
var DescribePiiEntitiesDetectionJobRequest;
(function (DescribePiiEntitiesDetectionJobRequest) {
    DescribePiiEntitiesDetectionJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribePiiEntitiesDetectionJobRequest = exports.DescribePiiEntitiesDetectionJobRequest || (exports.DescribePiiEntitiesDetectionJobRequest = {}));
var PiiEntitiesDetectionMode;
(function (PiiEntitiesDetectionMode) {
    PiiEntitiesDetectionMode["ONLY_OFFSETS"] = "ONLY_OFFSETS";
    PiiEntitiesDetectionMode["ONLY_REDACTION"] = "ONLY_REDACTION";
})(PiiEntitiesDetectionMode = exports.PiiEntitiesDetectionMode || (exports.PiiEntitiesDetectionMode = {}));
var PiiOutputDataConfig;
(function (PiiOutputDataConfig) {
    PiiOutputDataConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PiiOutputDataConfig = exports.PiiOutputDataConfig || (exports.PiiOutputDataConfig = {}));
var PiiEntitiesDetectionMaskMode;
(function (PiiEntitiesDetectionMaskMode) {
    PiiEntitiesDetectionMaskMode["MASK"] = "MASK";
    PiiEntitiesDetectionMaskMode["REPLACE_WITH_PII_ENTITY_TYPE"] = "REPLACE_WITH_PII_ENTITY_TYPE";
})(PiiEntitiesDetectionMaskMode = exports.PiiEntitiesDetectionMaskMode || (exports.PiiEntitiesDetectionMaskMode = {}));
var PiiEntityType;
(function (PiiEntityType) {
    PiiEntityType["ADDRESS"] = "ADDRESS";
    PiiEntityType["AGE"] = "AGE";
    PiiEntityType["ALL"] = "ALL";
    PiiEntityType["AWS_ACCESS_KEY"] = "AWS_ACCESS_KEY";
    PiiEntityType["AWS_SECRET_KEY"] = "AWS_SECRET_KEY";
    PiiEntityType["BANK_ACCOUNT_NUMBER"] = "BANK_ACCOUNT_NUMBER";
    PiiEntityType["BANK_ROUTING"] = "BANK_ROUTING";
    PiiEntityType["CREDIT_DEBIT_CVV"] = "CREDIT_DEBIT_CVV";
    PiiEntityType["CREDIT_DEBIT_EXPIRY"] = "CREDIT_DEBIT_EXPIRY";
    PiiEntityType["CREDIT_DEBIT_NUMBER"] = "CREDIT_DEBIT_NUMBER";
    PiiEntityType["DATE_TIME"] = "DATE_TIME";
    PiiEntityType["DRIVER_ID"] = "DRIVER_ID";
    PiiEntityType["EMAIL"] = "EMAIL";
    PiiEntityType["IP_ADDRESS"] = "IP_ADDRESS";
    PiiEntityType["MAC_ADDRESS"] = "MAC_ADDRESS";
    PiiEntityType["NAME"] = "NAME";
    PiiEntityType["PASSPORT_NUMBER"] = "PASSPORT_NUMBER";
    PiiEntityType["PASSWORD"] = "PASSWORD";
    PiiEntityType["PHONE"] = "PHONE";
    PiiEntityType["PIN"] = "PIN";
    PiiEntityType["SSN"] = "SSN";
    PiiEntityType["URL"] = "URL";
    PiiEntityType["USERNAME"] = "USERNAME";
})(PiiEntityType = exports.PiiEntityType || (exports.PiiEntityType = {}));
var RedactionConfig;
(function (RedactionConfig) {
    RedactionConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RedactionConfig = exports.RedactionConfig || (exports.RedactionConfig = {}));
var PiiEntitiesDetectionJobProperties;
(function (PiiEntitiesDetectionJobProperties) {
    PiiEntitiesDetectionJobProperties.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PiiEntitiesDetectionJobProperties = exports.PiiEntitiesDetectionJobProperties || (exports.PiiEntitiesDetectionJobProperties = {}));
var DescribePiiEntitiesDetectionJobResponse;
(function (DescribePiiEntitiesDetectionJobResponse) {
    DescribePiiEntitiesDetectionJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribePiiEntitiesDetectionJobResponse = exports.DescribePiiEntitiesDetectionJobResponse || (exports.DescribePiiEntitiesDetectionJobResponse = {}));
var DescribeSentimentDetectionJobRequest;
(function (DescribeSentimentDetectionJobRequest) {
    DescribeSentimentDetectionJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeSentimentDetectionJobRequest = exports.DescribeSentimentDetectionJobRequest || (exports.DescribeSentimentDetectionJobRequest = {}));
var SentimentDetectionJobProperties;
(function (SentimentDetectionJobProperties) {
    SentimentDetectionJobProperties.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SentimentDetectionJobProperties = exports.SentimentDetectionJobProperties || (exports.SentimentDetectionJobProperties = {}));
var DescribeSentimentDetectionJobResponse;
(function (DescribeSentimentDetectionJobResponse) {
    DescribeSentimentDetectionJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeSentimentDetectionJobResponse = exports.DescribeSentimentDetectionJobResponse || (exports.DescribeSentimentDetectionJobResponse = {}));
var DescribeTopicsDetectionJobRequest;
(function (DescribeTopicsDetectionJobRequest) {
    DescribeTopicsDetectionJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeTopicsDetectionJobRequest = exports.DescribeTopicsDetectionJobRequest || (exports.DescribeTopicsDetectionJobRequest = {}));
var TopicsDetectionJobProperties;
(function (TopicsDetectionJobProperties) {
    TopicsDetectionJobProperties.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TopicsDetectionJobProperties = exports.TopicsDetectionJobProperties || (exports.TopicsDetectionJobProperties = {}));
var DescribeTopicsDetectionJobResponse;
(function (DescribeTopicsDetectionJobResponse) {
    DescribeTopicsDetectionJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeTopicsDetectionJobResponse = exports.DescribeTopicsDetectionJobResponse || (exports.DescribeTopicsDetectionJobResponse = {}));
var DetectDominantLanguageRequest;
(function (DetectDominantLanguageRequest) {
    DetectDominantLanguageRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Text && { Text: smithy_client_1.SENSITIVE_STRING }),
    });
})(DetectDominantLanguageRequest = exports.DetectDominantLanguageRequest || (exports.DetectDominantLanguageRequest = {}));
var DetectDominantLanguageResponse;
(function (DetectDominantLanguageResponse) {
    DetectDominantLanguageResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectDominantLanguageResponse = exports.DetectDominantLanguageResponse || (exports.DetectDominantLanguageResponse = {}));
var DetectEntitiesRequest;
(function (DetectEntitiesRequest) {
    DetectEntitiesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Text && { Text: smithy_client_1.SENSITIVE_STRING }),
    });
})(DetectEntitiesRequest = exports.DetectEntitiesRequest || (exports.DetectEntitiesRequest = {}));
var DetectEntitiesResponse;
(function (DetectEntitiesResponse) {
    DetectEntitiesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectEntitiesResponse = exports.DetectEntitiesResponse || (exports.DetectEntitiesResponse = {}));
var DetectKeyPhrasesRequest;
(function (DetectKeyPhrasesRequest) {
    DetectKeyPhrasesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Text && { Text: smithy_client_1.SENSITIVE_STRING }),
    });
})(DetectKeyPhrasesRequest = exports.DetectKeyPhrasesRequest || (exports.DetectKeyPhrasesRequest = {}));
var DetectKeyPhrasesResponse;
(function (DetectKeyPhrasesResponse) {
    DetectKeyPhrasesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectKeyPhrasesResponse = exports.DetectKeyPhrasesResponse || (exports.DetectKeyPhrasesResponse = {}));
var DetectPiiEntitiesRequest;
(function (DetectPiiEntitiesRequest) {
    DetectPiiEntitiesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectPiiEntitiesRequest = exports.DetectPiiEntitiesRequest || (exports.DetectPiiEntitiesRequest = {}));
var PiiEntity;
(function (PiiEntity) {
    PiiEntity.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PiiEntity = exports.PiiEntity || (exports.PiiEntity = {}));
var DetectPiiEntitiesResponse;
(function (DetectPiiEntitiesResponse) {
    DetectPiiEntitiesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectPiiEntitiesResponse = exports.DetectPiiEntitiesResponse || (exports.DetectPiiEntitiesResponse = {}));
var DetectSentimentRequest;
(function (DetectSentimentRequest) {
    DetectSentimentRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Text && { Text: smithy_client_1.SENSITIVE_STRING }),
    });
})(DetectSentimentRequest = exports.DetectSentimentRequest || (exports.DetectSentimentRequest = {}));
var DetectSentimentResponse;
(function (DetectSentimentResponse) {
    DetectSentimentResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectSentimentResponse = exports.DetectSentimentResponse || (exports.DetectSentimentResponse = {}));
var DetectSyntaxRequest;
(function (DetectSyntaxRequest) {
    DetectSyntaxRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.Text && { Text: smithy_client_1.SENSITIVE_STRING }),
    });
})(DetectSyntaxRequest = exports.DetectSyntaxRequest || (exports.DetectSyntaxRequest = {}));
var DetectSyntaxResponse;
(function (DetectSyntaxResponse) {
    DetectSyntaxResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectSyntaxResponse = exports.DetectSyntaxResponse || (exports.DetectSyntaxResponse = {}));
var InvalidFilterException;
(function (InvalidFilterException) {
    InvalidFilterException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidFilterException = exports.InvalidFilterException || (exports.InvalidFilterException = {}));
var DocumentClassificationJobFilter;
(function (DocumentClassificationJobFilter) {
    DocumentClassificationJobFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DocumentClassificationJobFilter = exports.DocumentClassificationJobFilter || (exports.DocumentClassificationJobFilter = {}));
var ListDocumentClassificationJobsRequest;
(function (ListDocumentClassificationJobsRequest) {
    ListDocumentClassificationJobsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListDocumentClassificationJobsRequest = exports.ListDocumentClassificationJobsRequest || (exports.ListDocumentClassificationJobsRequest = {}));
var ListDocumentClassificationJobsResponse;
(function (ListDocumentClassificationJobsResponse) {
    ListDocumentClassificationJobsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListDocumentClassificationJobsResponse = exports.ListDocumentClassificationJobsResponse || (exports.ListDocumentClassificationJobsResponse = {}));
var DocumentClassifierFilter;
(function (DocumentClassifierFilter) {
    DocumentClassifierFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DocumentClassifierFilter = exports.DocumentClassifierFilter || (exports.DocumentClassifierFilter = {}));
var ListDocumentClassifiersRequest;
(function (ListDocumentClassifiersRequest) {
    ListDocumentClassifiersRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListDocumentClassifiersRequest = exports.ListDocumentClassifiersRequest || (exports.ListDocumentClassifiersRequest = {}));
var ListDocumentClassifiersResponse;
(function (ListDocumentClassifiersResponse) {
    ListDocumentClassifiersResponse.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.DocumentClassifierPropertiesList && {
            DocumentClassifierPropertiesList: obj.DocumentClassifierPropertiesList.map((item) => DocumentClassifierProperties.filterSensitiveLog(item)),
        }),
    });
})(ListDocumentClassifiersResponse = exports.ListDocumentClassifiersResponse || (exports.ListDocumentClassifiersResponse = {}));
var DominantLanguageDetectionJobFilter;
(function (DominantLanguageDetectionJobFilter) {
    DominantLanguageDetectionJobFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DominantLanguageDetectionJobFilter = exports.DominantLanguageDetectionJobFilter || (exports.DominantLanguageDetectionJobFilter = {}));
var ListDominantLanguageDetectionJobsRequest;
(function (ListDominantLanguageDetectionJobsRequest) {
    ListDominantLanguageDetectionJobsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListDominantLanguageDetectionJobsRequest = exports.ListDominantLanguageDetectionJobsRequest || (exports.ListDominantLanguageDetectionJobsRequest = {}));
var ListDominantLanguageDetectionJobsResponse;
(function (ListDominantLanguageDetectionJobsResponse) {
    ListDominantLanguageDetectionJobsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListDominantLanguageDetectionJobsResponse = exports.ListDominantLanguageDetectionJobsResponse || (exports.ListDominantLanguageDetectionJobsResponse = {}));
var EndpointFilter;
(function (EndpointFilter) {
    EndpointFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EndpointFilter = exports.EndpointFilter || (exports.EndpointFilter = {}));
var ListEndpointsRequest;
(function (ListEndpointsRequest) {
    ListEndpointsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListEndpointsRequest = exports.ListEndpointsRequest || (exports.ListEndpointsRequest = {}));
var ListEndpointsResponse;
(function (ListEndpointsResponse) {
    ListEndpointsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListEndpointsResponse = exports.ListEndpointsResponse || (exports.ListEndpointsResponse = {}));
var EntitiesDetectionJobFilter;
(function (EntitiesDetectionJobFilter) {
    EntitiesDetectionJobFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EntitiesDetectionJobFilter = exports.EntitiesDetectionJobFilter || (exports.EntitiesDetectionJobFilter = {}));
var ListEntitiesDetectionJobsRequest;
(function (ListEntitiesDetectionJobsRequest) {
    ListEntitiesDetectionJobsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListEntitiesDetectionJobsRequest = exports.ListEntitiesDetectionJobsRequest || (exports.ListEntitiesDetectionJobsRequest = {}));
var ListEntitiesDetectionJobsResponse;
(function (ListEntitiesDetectionJobsResponse) {
    ListEntitiesDetectionJobsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListEntitiesDetectionJobsResponse = exports.ListEntitiesDetectionJobsResponse || (exports.ListEntitiesDetectionJobsResponse = {}));
var EntityRecognizerFilter;
(function (EntityRecognizerFilter) {
    EntityRecognizerFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EntityRecognizerFilter = exports.EntityRecognizerFilter || (exports.EntityRecognizerFilter = {}));
var ListEntityRecognizersRequest;
(function (ListEntityRecognizersRequest) {
    ListEntityRecognizersRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListEntityRecognizersRequest = exports.ListEntityRecognizersRequest || (exports.ListEntityRecognizersRequest = {}));
var ListEntityRecognizersResponse;
(function (ListEntityRecognizersResponse) {
    ListEntityRecognizersResponse.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.EntityRecognizerPropertiesList && {
            EntityRecognizerPropertiesList: obj.EntityRecognizerPropertiesList.map((item) => EntityRecognizerProperties.filterSensitiveLog(item)),
        }),
    });
})(ListEntityRecognizersResponse = exports.ListEntityRecognizersResponse || (exports.ListEntityRecognizersResponse = {}));
var EventsDetectionJobFilter;
(function (EventsDetectionJobFilter) {
    EventsDetectionJobFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EventsDetectionJobFilter = exports.EventsDetectionJobFilter || (exports.EventsDetectionJobFilter = {}));
var ListEventsDetectionJobsRequest;
(function (ListEventsDetectionJobsRequest) {
    ListEventsDetectionJobsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListEventsDetectionJobsRequest = exports.ListEventsDetectionJobsRequest || (exports.ListEventsDetectionJobsRequest = {}));
var ListEventsDetectionJobsResponse;
(function (ListEventsDetectionJobsResponse) {
    ListEventsDetectionJobsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListEventsDetectionJobsResponse = exports.ListEventsDetectionJobsResponse || (exports.ListEventsDetectionJobsResponse = {}));
var KeyPhrasesDetectionJobFilter;
(function (KeyPhrasesDetectionJobFilter) {
    KeyPhrasesDetectionJobFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KeyPhrasesDetectionJobFilter = exports.KeyPhrasesDetectionJobFilter || (exports.KeyPhrasesDetectionJobFilter = {}));
var ListKeyPhrasesDetectionJobsRequest;
(function (ListKeyPhrasesDetectionJobsRequest) {
    ListKeyPhrasesDetectionJobsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListKeyPhrasesDetectionJobsRequest = exports.ListKeyPhrasesDetectionJobsRequest || (exports.ListKeyPhrasesDetectionJobsRequest = {}));
var ListKeyPhrasesDetectionJobsResponse;
(function (ListKeyPhrasesDetectionJobsResponse) {
    ListKeyPhrasesDetectionJobsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListKeyPhrasesDetectionJobsResponse = exports.ListKeyPhrasesDetectionJobsResponse || (exports.ListKeyPhrasesDetectionJobsResponse = {}));
var PiiEntitiesDetectionJobFilter;
(function (PiiEntitiesDetectionJobFilter) {
    PiiEntitiesDetectionJobFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PiiEntitiesDetectionJobFilter = exports.PiiEntitiesDetectionJobFilter || (exports.PiiEntitiesDetectionJobFilter = {}));
var ListPiiEntitiesDetectionJobsRequest;
(function (ListPiiEntitiesDetectionJobsRequest) {
    ListPiiEntitiesDetectionJobsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListPiiEntitiesDetectionJobsRequest = exports.ListPiiEntitiesDetectionJobsRequest || (exports.ListPiiEntitiesDetectionJobsRequest = {}));
var ListPiiEntitiesDetectionJobsResponse;
(function (ListPiiEntitiesDetectionJobsResponse) {
    ListPiiEntitiesDetectionJobsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListPiiEntitiesDetectionJobsResponse = exports.ListPiiEntitiesDetectionJobsResponse || (exports.ListPiiEntitiesDetectionJobsResponse = {}));
var SentimentDetectionJobFilter;
(function (SentimentDetectionJobFilter) {
    SentimentDetectionJobFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SentimentDetectionJobFilter = exports.SentimentDetectionJobFilter || (exports.SentimentDetectionJobFilter = {}));
var ListSentimentDetectionJobsRequest;
(function (ListSentimentDetectionJobsRequest) {
    ListSentimentDetectionJobsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListSentimentDetectionJobsRequest = exports.ListSentimentDetectionJobsRequest || (exports.ListSentimentDetectionJobsRequest = {}));
var ListSentimentDetectionJobsResponse;
(function (ListSentimentDetectionJobsResponse) {
    ListSentimentDetectionJobsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListSentimentDetectionJobsResponse = exports.ListSentimentDetectionJobsResponse || (exports.ListSentimentDetectionJobsResponse = {}));
var ListTagsForResourceRequest;
(function (ListTagsForResourceRequest) {
    ListTagsForResourceRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListTagsForResourceRequest = exports.ListTagsForResourceRequest || (exports.ListTagsForResourceRequest = {}));
var ListTagsForResourceResponse;
(function (ListTagsForResourceResponse) {
    ListTagsForResourceResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListTagsForResourceResponse = exports.ListTagsForResourceResponse || (exports.ListTagsForResourceResponse = {}));
var TopicsDetectionJobFilter;
(function (TopicsDetectionJobFilter) {
    TopicsDetectionJobFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TopicsDetectionJobFilter = exports.TopicsDetectionJobFilter || (exports.TopicsDetectionJobFilter = {}));
var ListTopicsDetectionJobsRequest;
(function (ListTopicsDetectionJobsRequest) {
    ListTopicsDetectionJobsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListTopicsDetectionJobsRequest = exports.ListTopicsDetectionJobsRequest || (exports.ListTopicsDetectionJobsRequest = {}));
var ListTopicsDetectionJobsResponse;
(function (ListTopicsDetectionJobsResponse) {
    ListTopicsDetectionJobsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListTopicsDetectionJobsResponse = exports.ListTopicsDetectionJobsResponse || (exports.ListTopicsDetectionJobsResponse = {}));
var StartDocumentClassificationJobRequest;
(function (StartDocumentClassificationJobRequest) {
    StartDocumentClassificationJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartDocumentClassificationJobRequest = exports.StartDocumentClassificationJobRequest || (exports.StartDocumentClassificationJobRequest = {}));
var StartDocumentClassificationJobResponse;
(function (StartDocumentClassificationJobResponse) {
    StartDocumentClassificationJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartDocumentClassificationJobResponse = exports.StartDocumentClassificationJobResponse || (exports.StartDocumentClassificationJobResponse = {}));
var StartDominantLanguageDetectionJobRequest;
(function (StartDominantLanguageDetectionJobRequest) {
    StartDominantLanguageDetectionJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartDominantLanguageDetectionJobRequest = exports.StartDominantLanguageDetectionJobRequest || (exports.StartDominantLanguageDetectionJobRequest = {}));
var StartDominantLanguageDetectionJobResponse;
(function (StartDominantLanguageDetectionJobResponse) {
    StartDominantLanguageDetectionJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartDominantLanguageDetectionJobResponse = exports.StartDominantLanguageDetectionJobResponse || (exports.StartDominantLanguageDetectionJobResponse = {}));
var StartEntitiesDetectionJobRequest;
(function (StartEntitiesDetectionJobRequest) {
    StartEntitiesDetectionJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartEntitiesDetectionJobRequest = exports.StartEntitiesDetectionJobRequest || (exports.StartEntitiesDetectionJobRequest = {}));
var StartEntitiesDetectionJobResponse;
(function (StartEntitiesDetectionJobResponse) {
    StartEntitiesDetectionJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartEntitiesDetectionJobResponse = exports.StartEntitiesDetectionJobResponse || (exports.StartEntitiesDetectionJobResponse = {}));
var StartEventsDetectionJobRequest;
(function (StartEventsDetectionJobRequest) {
    StartEventsDetectionJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartEventsDetectionJobRequest = exports.StartEventsDetectionJobRequest || (exports.StartEventsDetectionJobRequest = {}));
var StartEventsDetectionJobResponse;
(function (StartEventsDetectionJobResponse) {
    StartEventsDetectionJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartEventsDetectionJobResponse = exports.StartEventsDetectionJobResponse || (exports.StartEventsDetectionJobResponse = {}));
var StartKeyPhrasesDetectionJobRequest;
(function (StartKeyPhrasesDetectionJobRequest) {
    StartKeyPhrasesDetectionJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartKeyPhrasesDetectionJobRequest = exports.StartKeyPhrasesDetectionJobRequest || (exports.StartKeyPhrasesDetectionJobRequest = {}));
var StartKeyPhrasesDetectionJobResponse;
(function (StartKeyPhrasesDetectionJobResponse) {
    StartKeyPhrasesDetectionJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartKeyPhrasesDetectionJobResponse = exports.StartKeyPhrasesDetectionJobResponse || (exports.StartKeyPhrasesDetectionJobResponse = {}));
var StartPiiEntitiesDetectionJobRequest;
(function (StartPiiEntitiesDetectionJobRequest) {
    StartPiiEntitiesDetectionJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartPiiEntitiesDetectionJobRequest = exports.StartPiiEntitiesDetectionJobRequest || (exports.StartPiiEntitiesDetectionJobRequest = {}));
var StartPiiEntitiesDetectionJobResponse;
(function (StartPiiEntitiesDetectionJobResponse) {
    StartPiiEntitiesDetectionJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartPiiEntitiesDetectionJobResponse = exports.StartPiiEntitiesDetectionJobResponse || (exports.StartPiiEntitiesDetectionJobResponse = {}));
var StartSentimentDetectionJobRequest;
(function (StartSentimentDetectionJobRequest) {
    StartSentimentDetectionJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartSentimentDetectionJobRequest = exports.StartSentimentDetectionJobRequest || (exports.StartSentimentDetectionJobRequest = {}));
var StartSentimentDetectionJobResponse;
(function (StartSentimentDetectionJobResponse) {
    StartSentimentDetectionJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartSentimentDetectionJobResponse = exports.StartSentimentDetectionJobResponse || (exports.StartSentimentDetectionJobResponse = {}));
var StartTopicsDetectionJobRequest;
(function (StartTopicsDetectionJobRequest) {
    StartTopicsDetectionJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartTopicsDetectionJobRequest = exports.StartTopicsDetectionJobRequest || (exports.StartTopicsDetectionJobRequest = {}));
var StartTopicsDetectionJobResponse;
(function (StartTopicsDetectionJobResponse) {
    StartTopicsDetectionJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartTopicsDetectionJobResponse = exports.StartTopicsDetectionJobResponse || (exports.StartTopicsDetectionJobResponse = {}));
var StopDominantLanguageDetectionJobRequest;
(function (StopDominantLanguageDetectionJobRequest) {
    StopDominantLanguageDetectionJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopDominantLanguageDetectionJobRequest = exports.StopDominantLanguageDetectionJobRequest || (exports.StopDominantLanguageDetectionJobRequest = {}));
var StopDominantLanguageDetectionJobResponse;
(function (StopDominantLanguageDetectionJobResponse) {
    StopDominantLanguageDetectionJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopDominantLanguageDetectionJobResponse = exports.StopDominantLanguageDetectionJobResponse || (exports.StopDominantLanguageDetectionJobResponse = {}));
var StopEntitiesDetectionJobRequest;
(function (StopEntitiesDetectionJobRequest) {
    StopEntitiesDetectionJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopEntitiesDetectionJobRequest = exports.StopEntitiesDetectionJobRequest || (exports.StopEntitiesDetectionJobRequest = {}));
var StopEntitiesDetectionJobResponse;
(function (StopEntitiesDetectionJobResponse) {
    StopEntitiesDetectionJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopEntitiesDetectionJobResponse = exports.StopEntitiesDetectionJobResponse || (exports.StopEntitiesDetectionJobResponse = {}));
var StopEventsDetectionJobRequest;
(function (StopEventsDetectionJobRequest) {
    StopEventsDetectionJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopEventsDetectionJobRequest = exports.StopEventsDetectionJobRequest || (exports.StopEventsDetectionJobRequest = {}));
var StopEventsDetectionJobResponse;
(function (StopEventsDetectionJobResponse) {
    StopEventsDetectionJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopEventsDetectionJobResponse = exports.StopEventsDetectionJobResponse || (exports.StopEventsDetectionJobResponse = {}));
var StopKeyPhrasesDetectionJobRequest;
(function (StopKeyPhrasesDetectionJobRequest) {
    StopKeyPhrasesDetectionJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopKeyPhrasesDetectionJobRequest = exports.StopKeyPhrasesDetectionJobRequest || (exports.StopKeyPhrasesDetectionJobRequest = {}));
var StopKeyPhrasesDetectionJobResponse;
(function (StopKeyPhrasesDetectionJobResponse) {
    StopKeyPhrasesDetectionJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopKeyPhrasesDetectionJobResponse = exports.StopKeyPhrasesDetectionJobResponse || (exports.StopKeyPhrasesDetectionJobResponse = {}));
var StopPiiEntitiesDetectionJobRequest;
(function (StopPiiEntitiesDetectionJobRequest) {
    StopPiiEntitiesDetectionJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopPiiEntitiesDetectionJobRequest = exports.StopPiiEntitiesDetectionJobRequest || (exports.StopPiiEntitiesDetectionJobRequest = {}));
var StopPiiEntitiesDetectionJobResponse;
(function (StopPiiEntitiesDetectionJobResponse) {
    StopPiiEntitiesDetectionJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopPiiEntitiesDetectionJobResponse = exports.StopPiiEntitiesDetectionJobResponse || (exports.StopPiiEntitiesDetectionJobResponse = {}));
var StopSentimentDetectionJobRequest;
(function (StopSentimentDetectionJobRequest) {
    StopSentimentDetectionJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopSentimentDetectionJobRequest = exports.StopSentimentDetectionJobRequest || (exports.StopSentimentDetectionJobRequest = {}));
var StopSentimentDetectionJobResponse;
(function (StopSentimentDetectionJobResponse) {
    StopSentimentDetectionJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopSentimentDetectionJobResponse = exports.StopSentimentDetectionJobResponse || (exports.StopSentimentDetectionJobResponse = {}));
var StopTrainingDocumentClassifierRequest;
(function (StopTrainingDocumentClassifierRequest) {
    StopTrainingDocumentClassifierRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopTrainingDocumentClassifierRequest = exports.StopTrainingDocumentClassifierRequest || (exports.StopTrainingDocumentClassifierRequest = {}));
var StopTrainingDocumentClassifierResponse;
(function (StopTrainingDocumentClassifierResponse) {
    StopTrainingDocumentClassifierResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopTrainingDocumentClassifierResponse = exports.StopTrainingDocumentClassifierResponse || (exports.StopTrainingDocumentClassifierResponse = {}));
var StopTrainingEntityRecognizerRequest;
(function (StopTrainingEntityRecognizerRequest) {
    StopTrainingEntityRecognizerRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopTrainingEntityRecognizerRequest = exports.StopTrainingEntityRecognizerRequest || (exports.StopTrainingEntityRecognizerRequest = {}));
var StopTrainingEntityRecognizerResponse;
(function (StopTrainingEntityRecognizerResponse) {
    StopTrainingEntityRecognizerResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopTrainingEntityRecognizerResponse = exports.StopTrainingEntityRecognizerResponse || (exports.StopTrainingEntityRecognizerResponse = {}));
var ConcurrentModificationException;
(function (ConcurrentModificationException) {
    ConcurrentModificationException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ConcurrentModificationException = exports.ConcurrentModificationException || (exports.ConcurrentModificationException = {}));
var TagResourceRequest;
(function (TagResourceRequest) {
    TagResourceRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TagResourceRequest = exports.TagResourceRequest || (exports.TagResourceRequest = {}));
var TagResourceResponse;
(function (TagResourceResponse) {
    TagResourceResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TagResourceResponse = exports.TagResourceResponse || (exports.TagResourceResponse = {}));
var TooManyTagKeysException;
(function (TooManyTagKeysException) {
    TooManyTagKeysException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TooManyTagKeysException = exports.TooManyTagKeysException || (exports.TooManyTagKeysException = {}));
var UntagResourceRequest;
(function (UntagResourceRequest) {
    UntagResourceRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UntagResourceRequest = exports.UntagResourceRequest || (exports.UntagResourceRequest = {}));
var UntagResourceResponse;
(function (UntagResourceResponse) {
    UntagResourceResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UntagResourceResponse = exports.UntagResourceResponse || (exports.UntagResourceResponse = {}));
var UpdateEndpointRequest;
(function (UpdateEndpointRequest) {
    UpdateEndpointRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateEndpointRequest = exports.UpdateEndpointRequest || (exports.UpdateEndpointRequest = {}));
var UpdateEndpointResponse;
(function (UpdateEndpointResponse) {
    UpdateEndpointResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateEndpointResponse = exports.UpdateEndpointResponse || (exports.UpdateEndpointResponse = {}));
//# sourceMappingURL=models_0.js.map
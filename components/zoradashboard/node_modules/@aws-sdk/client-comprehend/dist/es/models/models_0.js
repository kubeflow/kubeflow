import { __assign } from "tslib";
import { SENSITIVE_STRING } from "@aws-sdk/smithy-client";
export var AugmentedManifestsListItem;
(function (AugmentedManifestsListItem) {
    AugmentedManifestsListItem.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AugmentedManifestsListItem || (AugmentedManifestsListItem = {}));
export var BatchDetectDominantLanguageRequest;
(function (BatchDetectDominantLanguageRequest) {
    BatchDetectDominantLanguageRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.TextList && { TextList: SENSITIVE_STRING }))); };
})(BatchDetectDominantLanguageRequest || (BatchDetectDominantLanguageRequest = {}));
export var BatchItemError;
(function (BatchItemError) {
    BatchItemError.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(BatchItemError || (BatchItemError = {}));
export var DominantLanguage;
(function (DominantLanguage) {
    DominantLanguage.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DominantLanguage || (DominantLanguage = {}));
export var BatchDetectDominantLanguageItemResult;
(function (BatchDetectDominantLanguageItemResult) {
    BatchDetectDominantLanguageItemResult.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(BatchDetectDominantLanguageItemResult || (BatchDetectDominantLanguageItemResult = {}));
export var BatchDetectDominantLanguageResponse;
(function (BatchDetectDominantLanguageResponse) {
    BatchDetectDominantLanguageResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(BatchDetectDominantLanguageResponse || (BatchDetectDominantLanguageResponse = {}));
export var BatchSizeLimitExceededException;
(function (BatchSizeLimitExceededException) {
    BatchSizeLimitExceededException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(BatchSizeLimitExceededException || (BatchSizeLimitExceededException = {}));
export var InternalServerException;
(function (InternalServerException) {
    InternalServerException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InternalServerException || (InternalServerException = {}));
export var InvalidRequestException;
(function (InvalidRequestException) {
    InvalidRequestException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InvalidRequestException || (InvalidRequestException = {}));
export var TextSizeLimitExceededException;
(function (TextSizeLimitExceededException) {
    TextSizeLimitExceededException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TextSizeLimitExceededException || (TextSizeLimitExceededException = {}));
export var LanguageCode;
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
})(LanguageCode || (LanguageCode = {}));
export var BatchDetectEntitiesRequest;
(function (BatchDetectEntitiesRequest) {
    BatchDetectEntitiesRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.TextList && { TextList: SENSITIVE_STRING }))); };
})(BatchDetectEntitiesRequest || (BatchDetectEntitiesRequest = {}));
export var EntityType;
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
})(EntityType || (EntityType = {}));
export var Entity;
(function (Entity) {
    Entity.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Entity || (Entity = {}));
export var BatchDetectEntitiesItemResult;
(function (BatchDetectEntitiesItemResult) {
    BatchDetectEntitiesItemResult.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(BatchDetectEntitiesItemResult || (BatchDetectEntitiesItemResult = {}));
export var BatchDetectEntitiesResponse;
(function (BatchDetectEntitiesResponse) {
    BatchDetectEntitiesResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(BatchDetectEntitiesResponse || (BatchDetectEntitiesResponse = {}));
export var UnsupportedLanguageException;
(function (UnsupportedLanguageException) {
    UnsupportedLanguageException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UnsupportedLanguageException || (UnsupportedLanguageException = {}));
export var BatchDetectKeyPhrasesRequest;
(function (BatchDetectKeyPhrasesRequest) {
    BatchDetectKeyPhrasesRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.TextList && { TextList: SENSITIVE_STRING }))); };
})(BatchDetectKeyPhrasesRequest || (BatchDetectKeyPhrasesRequest = {}));
export var KeyPhrase;
(function (KeyPhrase) {
    KeyPhrase.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(KeyPhrase || (KeyPhrase = {}));
export var BatchDetectKeyPhrasesItemResult;
(function (BatchDetectKeyPhrasesItemResult) {
    BatchDetectKeyPhrasesItemResult.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(BatchDetectKeyPhrasesItemResult || (BatchDetectKeyPhrasesItemResult = {}));
export var BatchDetectKeyPhrasesResponse;
(function (BatchDetectKeyPhrasesResponse) {
    BatchDetectKeyPhrasesResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(BatchDetectKeyPhrasesResponse || (BatchDetectKeyPhrasesResponse = {}));
export var BatchDetectSentimentRequest;
(function (BatchDetectSentimentRequest) {
    BatchDetectSentimentRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.TextList && { TextList: SENSITIVE_STRING }))); };
})(BatchDetectSentimentRequest || (BatchDetectSentimentRequest = {}));
export var SentimentType;
(function (SentimentType) {
    SentimentType["MIXED"] = "MIXED";
    SentimentType["NEGATIVE"] = "NEGATIVE";
    SentimentType["NEUTRAL"] = "NEUTRAL";
    SentimentType["POSITIVE"] = "POSITIVE";
})(SentimentType || (SentimentType = {}));
export var SentimentScore;
(function (SentimentScore) {
    SentimentScore.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SentimentScore || (SentimentScore = {}));
export var BatchDetectSentimentItemResult;
(function (BatchDetectSentimentItemResult) {
    BatchDetectSentimentItemResult.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(BatchDetectSentimentItemResult || (BatchDetectSentimentItemResult = {}));
export var BatchDetectSentimentResponse;
(function (BatchDetectSentimentResponse) {
    BatchDetectSentimentResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(BatchDetectSentimentResponse || (BatchDetectSentimentResponse = {}));
export var SyntaxLanguageCode;
(function (SyntaxLanguageCode) {
    SyntaxLanguageCode["DE"] = "de";
    SyntaxLanguageCode["EN"] = "en";
    SyntaxLanguageCode["ES"] = "es";
    SyntaxLanguageCode["FR"] = "fr";
    SyntaxLanguageCode["IT"] = "it";
    SyntaxLanguageCode["PT"] = "pt";
})(SyntaxLanguageCode || (SyntaxLanguageCode = {}));
export var BatchDetectSyntaxRequest;
(function (BatchDetectSyntaxRequest) {
    BatchDetectSyntaxRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.TextList && { TextList: SENSITIVE_STRING }))); };
})(BatchDetectSyntaxRequest || (BatchDetectSyntaxRequest = {}));
export var PartOfSpeechTagType;
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
})(PartOfSpeechTagType || (PartOfSpeechTagType = {}));
export var PartOfSpeechTag;
(function (PartOfSpeechTag) {
    PartOfSpeechTag.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PartOfSpeechTag || (PartOfSpeechTag = {}));
export var SyntaxToken;
(function (SyntaxToken) {
    SyntaxToken.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SyntaxToken || (SyntaxToken = {}));
export var BatchDetectSyntaxItemResult;
(function (BatchDetectSyntaxItemResult) {
    BatchDetectSyntaxItemResult.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(BatchDetectSyntaxItemResult || (BatchDetectSyntaxItemResult = {}));
export var BatchDetectSyntaxResponse;
(function (BatchDetectSyntaxResponse) {
    BatchDetectSyntaxResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(BatchDetectSyntaxResponse || (BatchDetectSyntaxResponse = {}));
export var ClassifierEvaluationMetrics;
(function (ClassifierEvaluationMetrics) {
    ClassifierEvaluationMetrics.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ClassifierEvaluationMetrics || (ClassifierEvaluationMetrics = {}));
export var ClassifierMetadata;
(function (ClassifierMetadata) {
    ClassifierMetadata.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ClassifierMetadata || (ClassifierMetadata = {}));
export var ClassifyDocumentRequest;
(function (ClassifyDocumentRequest) {
    ClassifyDocumentRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.Text && { Text: SENSITIVE_STRING }))); };
})(ClassifyDocumentRequest || (ClassifyDocumentRequest = {}));
export var DocumentClass;
(function (DocumentClass) {
    DocumentClass.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DocumentClass || (DocumentClass = {}));
export var DocumentLabel;
(function (DocumentLabel) {
    DocumentLabel.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DocumentLabel || (DocumentLabel = {}));
export var ClassifyDocumentResponse;
(function (ClassifyDocumentResponse) {
    ClassifyDocumentResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ClassifyDocumentResponse || (ClassifyDocumentResponse = {}));
export var ResourceUnavailableException;
(function (ResourceUnavailableException) {
    ResourceUnavailableException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ResourceUnavailableException || (ResourceUnavailableException = {}));
export var DocumentClassifierDataFormat;
(function (DocumentClassifierDataFormat) {
    DocumentClassifierDataFormat["AUGMENTED_MANIFEST"] = "AUGMENTED_MANIFEST";
    DocumentClassifierDataFormat["COMPREHEND_CSV"] = "COMPREHEND_CSV";
})(DocumentClassifierDataFormat || (DocumentClassifierDataFormat = {}));
export var DocumentClassifierInputDataConfig;
(function (DocumentClassifierInputDataConfig) {
    DocumentClassifierInputDataConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DocumentClassifierInputDataConfig || (DocumentClassifierInputDataConfig = {}));
export var DocumentClassifierMode;
(function (DocumentClassifierMode) {
    DocumentClassifierMode["MULTI_CLASS"] = "MULTI_CLASS";
    DocumentClassifierMode["MULTI_LABEL"] = "MULTI_LABEL";
})(DocumentClassifierMode || (DocumentClassifierMode = {}));
export var DocumentClassifierOutputDataConfig;
(function (DocumentClassifierOutputDataConfig) {
    DocumentClassifierOutputDataConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DocumentClassifierOutputDataConfig || (DocumentClassifierOutputDataConfig = {}));
export var Tag;
(function (Tag) {
    Tag.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Tag || (Tag = {}));
export var VpcConfig;
(function (VpcConfig) {
    VpcConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(VpcConfig || (VpcConfig = {}));
export var CreateDocumentClassifierRequest;
(function (CreateDocumentClassifierRequest) {
    CreateDocumentClassifierRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateDocumentClassifierRequest || (CreateDocumentClassifierRequest = {}));
export var CreateDocumentClassifierResponse;
(function (CreateDocumentClassifierResponse) {
    CreateDocumentClassifierResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateDocumentClassifierResponse || (CreateDocumentClassifierResponse = {}));
export var KmsKeyValidationException;
(function (KmsKeyValidationException) {
    KmsKeyValidationException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(KmsKeyValidationException || (KmsKeyValidationException = {}));
export var ResourceInUseException;
(function (ResourceInUseException) {
    ResourceInUseException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ResourceInUseException || (ResourceInUseException = {}));
export var ResourceLimitExceededException;
(function (ResourceLimitExceededException) {
    ResourceLimitExceededException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ResourceLimitExceededException || (ResourceLimitExceededException = {}));
export var TooManyRequestsException;
(function (TooManyRequestsException) {
    TooManyRequestsException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TooManyRequestsException || (TooManyRequestsException = {}));
export var TooManyTagsException;
(function (TooManyTagsException) {
    TooManyTagsException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TooManyTagsException || (TooManyTagsException = {}));
export var CreateEndpointRequest;
(function (CreateEndpointRequest) {
    CreateEndpointRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateEndpointRequest || (CreateEndpointRequest = {}));
export var CreateEndpointResponse;
(function (CreateEndpointResponse) {
    CreateEndpointResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateEndpointResponse || (CreateEndpointResponse = {}));
export var ResourceNotFoundException;
(function (ResourceNotFoundException) {
    ResourceNotFoundException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ResourceNotFoundException || (ResourceNotFoundException = {}));
export var EntityRecognizerAnnotations;
(function (EntityRecognizerAnnotations) {
    EntityRecognizerAnnotations.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(EntityRecognizerAnnotations || (EntityRecognizerAnnotations = {}));
export var EntityRecognizerDataFormat;
(function (EntityRecognizerDataFormat) {
    EntityRecognizerDataFormat["AUGMENTED_MANIFEST"] = "AUGMENTED_MANIFEST";
    EntityRecognizerDataFormat["COMPREHEND_CSV"] = "COMPREHEND_CSV";
})(EntityRecognizerDataFormat || (EntityRecognizerDataFormat = {}));
export var EntityRecognizerDocuments;
(function (EntityRecognizerDocuments) {
    EntityRecognizerDocuments.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(EntityRecognizerDocuments || (EntityRecognizerDocuments = {}));
export var EntityRecognizerEntityList;
(function (EntityRecognizerEntityList) {
    EntityRecognizerEntityList.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(EntityRecognizerEntityList || (EntityRecognizerEntityList = {}));
export var EntityTypesListItem;
(function (EntityTypesListItem) {
    EntityTypesListItem.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(EntityTypesListItem || (EntityTypesListItem = {}));
export var EntityRecognizerInputDataConfig;
(function (EntityRecognizerInputDataConfig) {
    EntityRecognizerInputDataConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(EntityRecognizerInputDataConfig || (EntityRecognizerInputDataConfig = {}));
export var CreateEntityRecognizerRequest;
(function (CreateEntityRecognizerRequest) {
    CreateEntityRecognizerRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateEntityRecognizerRequest || (CreateEntityRecognizerRequest = {}));
export var CreateEntityRecognizerResponse;
(function (CreateEntityRecognizerResponse) {
    CreateEntityRecognizerResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateEntityRecognizerResponse || (CreateEntityRecognizerResponse = {}));
export var DeleteDocumentClassifierRequest;
(function (DeleteDocumentClassifierRequest) {
    DeleteDocumentClassifierRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteDocumentClassifierRequest || (DeleteDocumentClassifierRequest = {}));
export var DeleteDocumentClassifierResponse;
(function (DeleteDocumentClassifierResponse) {
    DeleteDocumentClassifierResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteDocumentClassifierResponse || (DeleteDocumentClassifierResponse = {}));
export var DeleteEndpointRequest;
(function (DeleteEndpointRequest) {
    DeleteEndpointRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteEndpointRequest || (DeleteEndpointRequest = {}));
export var DeleteEndpointResponse;
(function (DeleteEndpointResponse) {
    DeleteEndpointResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteEndpointResponse || (DeleteEndpointResponse = {}));
export var DeleteEntityRecognizerRequest;
(function (DeleteEntityRecognizerRequest) {
    DeleteEntityRecognizerRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteEntityRecognizerRequest || (DeleteEntityRecognizerRequest = {}));
export var DeleteEntityRecognizerResponse;
(function (DeleteEntityRecognizerResponse) {
    DeleteEntityRecognizerResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteEntityRecognizerResponse || (DeleteEntityRecognizerResponse = {}));
export var DescribeDocumentClassificationJobRequest;
(function (DescribeDocumentClassificationJobRequest) {
    DescribeDocumentClassificationJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeDocumentClassificationJobRequest || (DescribeDocumentClassificationJobRequest = {}));
export var InputFormat;
(function (InputFormat) {
    InputFormat["ONE_DOC_PER_FILE"] = "ONE_DOC_PER_FILE";
    InputFormat["ONE_DOC_PER_LINE"] = "ONE_DOC_PER_LINE";
})(InputFormat || (InputFormat = {}));
export var InputDataConfig;
(function (InputDataConfig) {
    InputDataConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InputDataConfig || (InputDataConfig = {}));
export var JobStatus;
(function (JobStatus) {
    JobStatus["COMPLETED"] = "COMPLETED";
    JobStatus["FAILED"] = "FAILED";
    JobStatus["IN_PROGRESS"] = "IN_PROGRESS";
    JobStatus["STOPPED"] = "STOPPED";
    JobStatus["STOP_REQUESTED"] = "STOP_REQUESTED";
    JobStatus["SUBMITTED"] = "SUBMITTED";
})(JobStatus || (JobStatus = {}));
export var OutputDataConfig;
(function (OutputDataConfig) {
    OutputDataConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(OutputDataConfig || (OutputDataConfig = {}));
export var DocumentClassificationJobProperties;
(function (DocumentClassificationJobProperties) {
    DocumentClassificationJobProperties.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DocumentClassificationJobProperties || (DocumentClassificationJobProperties = {}));
export var DescribeDocumentClassificationJobResponse;
(function (DescribeDocumentClassificationJobResponse) {
    DescribeDocumentClassificationJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeDocumentClassificationJobResponse || (DescribeDocumentClassificationJobResponse = {}));
export var JobNotFoundException;
(function (JobNotFoundException) {
    JobNotFoundException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(JobNotFoundException || (JobNotFoundException = {}));
export var DescribeDocumentClassifierRequest;
(function (DescribeDocumentClassifierRequest) {
    DescribeDocumentClassifierRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeDocumentClassifierRequest || (DescribeDocumentClassifierRequest = {}));
export var ModelStatus;
(function (ModelStatus) {
    ModelStatus["DELETING"] = "DELETING";
    ModelStatus["IN_ERROR"] = "IN_ERROR";
    ModelStatus["STOPPED"] = "STOPPED";
    ModelStatus["STOP_REQUESTED"] = "STOP_REQUESTED";
    ModelStatus["SUBMITTED"] = "SUBMITTED";
    ModelStatus["TRAINED"] = "TRAINED";
    ModelStatus["TRAINING"] = "TRAINING";
})(ModelStatus || (ModelStatus = {}));
export var DocumentClassifierProperties;
(function (DocumentClassifierProperties) {
    DocumentClassifierProperties.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.ClassifierMetadata && { ClassifierMetadata: SENSITIVE_STRING }))); };
})(DocumentClassifierProperties || (DocumentClassifierProperties = {}));
export var DescribeDocumentClassifierResponse;
(function (DescribeDocumentClassifierResponse) {
    DescribeDocumentClassifierResponse.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.DocumentClassifierProperties && {
        DocumentClassifierProperties: DocumentClassifierProperties.filterSensitiveLog(obj.DocumentClassifierProperties),
    }))); };
})(DescribeDocumentClassifierResponse || (DescribeDocumentClassifierResponse = {}));
export var DescribeDominantLanguageDetectionJobRequest;
(function (DescribeDominantLanguageDetectionJobRequest) {
    DescribeDominantLanguageDetectionJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeDominantLanguageDetectionJobRequest || (DescribeDominantLanguageDetectionJobRequest = {}));
export var DominantLanguageDetectionJobProperties;
(function (DominantLanguageDetectionJobProperties) {
    DominantLanguageDetectionJobProperties.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DominantLanguageDetectionJobProperties || (DominantLanguageDetectionJobProperties = {}));
export var DescribeDominantLanguageDetectionJobResponse;
(function (DescribeDominantLanguageDetectionJobResponse) {
    DescribeDominantLanguageDetectionJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeDominantLanguageDetectionJobResponse || (DescribeDominantLanguageDetectionJobResponse = {}));
export var DescribeEndpointRequest;
(function (DescribeEndpointRequest) {
    DescribeEndpointRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeEndpointRequest || (DescribeEndpointRequest = {}));
export var EndpointStatus;
(function (EndpointStatus) {
    EndpointStatus["CREATING"] = "CREATING";
    EndpointStatus["DELETING"] = "DELETING";
    EndpointStatus["FAILED"] = "FAILED";
    EndpointStatus["IN_SERVICE"] = "IN_SERVICE";
    EndpointStatus["UPDATING"] = "UPDATING";
})(EndpointStatus || (EndpointStatus = {}));
export var EndpointProperties;
(function (EndpointProperties) {
    EndpointProperties.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(EndpointProperties || (EndpointProperties = {}));
export var DescribeEndpointResponse;
(function (DescribeEndpointResponse) {
    DescribeEndpointResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeEndpointResponse || (DescribeEndpointResponse = {}));
export var DescribeEntitiesDetectionJobRequest;
(function (DescribeEntitiesDetectionJobRequest) {
    DescribeEntitiesDetectionJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeEntitiesDetectionJobRequest || (DescribeEntitiesDetectionJobRequest = {}));
export var EntitiesDetectionJobProperties;
(function (EntitiesDetectionJobProperties) {
    EntitiesDetectionJobProperties.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(EntitiesDetectionJobProperties || (EntitiesDetectionJobProperties = {}));
export var DescribeEntitiesDetectionJobResponse;
(function (DescribeEntitiesDetectionJobResponse) {
    DescribeEntitiesDetectionJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeEntitiesDetectionJobResponse || (DescribeEntitiesDetectionJobResponse = {}));
export var DescribeEntityRecognizerRequest;
(function (DescribeEntityRecognizerRequest) {
    DescribeEntityRecognizerRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeEntityRecognizerRequest || (DescribeEntityRecognizerRequest = {}));
export var EntityTypesEvaluationMetrics;
(function (EntityTypesEvaluationMetrics) {
    EntityTypesEvaluationMetrics.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(EntityTypesEvaluationMetrics || (EntityTypesEvaluationMetrics = {}));
export var EntityRecognizerMetadataEntityTypesListItem;
(function (EntityRecognizerMetadataEntityTypesListItem) {
    EntityRecognizerMetadataEntityTypesListItem.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(EntityRecognizerMetadataEntityTypesListItem || (EntityRecognizerMetadataEntityTypesListItem = {}));
export var EntityRecognizerEvaluationMetrics;
(function (EntityRecognizerEvaluationMetrics) {
    EntityRecognizerEvaluationMetrics.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(EntityRecognizerEvaluationMetrics || (EntityRecognizerEvaluationMetrics = {}));
export var EntityRecognizerMetadata;
(function (EntityRecognizerMetadata) {
    EntityRecognizerMetadata.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(EntityRecognizerMetadata || (EntityRecognizerMetadata = {}));
export var EntityRecognizerProperties;
(function (EntityRecognizerProperties) {
    EntityRecognizerProperties.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.RecognizerMetadata && { RecognizerMetadata: SENSITIVE_STRING }))); };
})(EntityRecognizerProperties || (EntityRecognizerProperties = {}));
export var DescribeEntityRecognizerResponse;
(function (DescribeEntityRecognizerResponse) {
    DescribeEntityRecognizerResponse.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.EntityRecognizerProperties && {
        EntityRecognizerProperties: EntityRecognizerProperties.filterSensitiveLog(obj.EntityRecognizerProperties),
    }))); };
})(DescribeEntityRecognizerResponse || (DescribeEntityRecognizerResponse = {}));
export var DescribeEventsDetectionJobRequest;
(function (DescribeEventsDetectionJobRequest) {
    DescribeEventsDetectionJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeEventsDetectionJobRequest || (DescribeEventsDetectionJobRequest = {}));
export var EventsDetectionJobProperties;
(function (EventsDetectionJobProperties) {
    EventsDetectionJobProperties.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(EventsDetectionJobProperties || (EventsDetectionJobProperties = {}));
export var DescribeEventsDetectionJobResponse;
(function (DescribeEventsDetectionJobResponse) {
    DescribeEventsDetectionJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeEventsDetectionJobResponse || (DescribeEventsDetectionJobResponse = {}));
export var DescribeKeyPhrasesDetectionJobRequest;
(function (DescribeKeyPhrasesDetectionJobRequest) {
    DescribeKeyPhrasesDetectionJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeKeyPhrasesDetectionJobRequest || (DescribeKeyPhrasesDetectionJobRequest = {}));
export var KeyPhrasesDetectionJobProperties;
(function (KeyPhrasesDetectionJobProperties) {
    KeyPhrasesDetectionJobProperties.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(KeyPhrasesDetectionJobProperties || (KeyPhrasesDetectionJobProperties = {}));
export var DescribeKeyPhrasesDetectionJobResponse;
(function (DescribeKeyPhrasesDetectionJobResponse) {
    DescribeKeyPhrasesDetectionJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeKeyPhrasesDetectionJobResponse || (DescribeKeyPhrasesDetectionJobResponse = {}));
export var DescribePiiEntitiesDetectionJobRequest;
(function (DescribePiiEntitiesDetectionJobRequest) {
    DescribePiiEntitiesDetectionJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribePiiEntitiesDetectionJobRequest || (DescribePiiEntitiesDetectionJobRequest = {}));
export var PiiEntitiesDetectionMode;
(function (PiiEntitiesDetectionMode) {
    PiiEntitiesDetectionMode["ONLY_OFFSETS"] = "ONLY_OFFSETS";
    PiiEntitiesDetectionMode["ONLY_REDACTION"] = "ONLY_REDACTION";
})(PiiEntitiesDetectionMode || (PiiEntitiesDetectionMode = {}));
export var PiiOutputDataConfig;
(function (PiiOutputDataConfig) {
    PiiOutputDataConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PiiOutputDataConfig || (PiiOutputDataConfig = {}));
export var PiiEntitiesDetectionMaskMode;
(function (PiiEntitiesDetectionMaskMode) {
    PiiEntitiesDetectionMaskMode["MASK"] = "MASK";
    PiiEntitiesDetectionMaskMode["REPLACE_WITH_PII_ENTITY_TYPE"] = "REPLACE_WITH_PII_ENTITY_TYPE";
})(PiiEntitiesDetectionMaskMode || (PiiEntitiesDetectionMaskMode = {}));
export var PiiEntityType;
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
})(PiiEntityType || (PiiEntityType = {}));
export var RedactionConfig;
(function (RedactionConfig) {
    RedactionConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(RedactionConfig || (RedactionConfig = {}));
export var PiiEntitiesDetectionJobProperties;
(function (PiiEntitiesDetectionJobProperties) {
    PiiEntitiesDetectionJobProperties.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PiiEntitiesDetectionJobProperties || (PiiEntitiesDetectionJobProperties = {}));
export var DescribePiiEntitiesDetectionJobResponse;
(function (DescribePiiEntitiesDetectionJobResponse) {
    DescribePiiEntitiesDetectionJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribePiiEntitiesDetectionJobResponse || (DescribePiiEntitiesDetectionJobResponse = {}));
export var DescribeSentimentDetectionJobRequest;
(function (DescribeSentimentDetectionJobRequest) {
    DescribeSentimentDetectionJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeSentimentDetectionJobRequest || (DescribeSentimentDetectionJobRequest = {}));
export var SentimentDetectionJobProperties;
(function (SentimentDetectionJobProperties) {
    SentimentDetectionJobProperties.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SentimentDetectionJobProperties || (SentimentDetectionJobProperties = {}));
export var DescribeSentimentDetectionJobResponse;
(function (DescribeSentimentDetectionJobResponse) {
    DescribeSentimentDetectionJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeSentimentDetectionJobResponse || (DescribeSentimentDetectionJobResponse = {}));
export var DescribeTopicsDetectionJobRequest;
(function (DescribeTopicsDetectionJobRequest) {
    DescribeTopicsDetectionJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeTopicsDetectionJobRequest || (DescribeTopicsDetectionJobRequest = {}));
export var TopicsDetectionJobProperties;
(function (TopicsDetectionJobProperties) {
    TopicsDetectionJobProperties.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TopicsDetectionJobProperties || (TopicsDetectionJobProperties = {}));
export var DescribeTopicsDetectionJobResponse;
(function (DescribeTopicsDetectionJobResponse) {
    DescribeTopicsDetectionJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeTopicsDetectionJobResponse || (DescribeTopicsDetectionJobResponse = {}));
export var DetectDominantLanguageRequest;
(function (DetectDominantLanguageRequest) {
    DetectDominantLanguageRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.Text && { Text: SENSITIVE_STRING }))); };
})(DetectDominantLanguageRequest || (DetectDominantLanguageRequest = {}));
export var DetectDominantLanguageResponse;
(function (DetectDominantLanguageResponse) {
    DetectDominantLanguageResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DetectDominantLanguageResponse || (DetectDominantLanguageResponse = {}));
export var DetectEntitiesRequest;
(function (DetectEntitiesRequest) {
    DetectEntitiesRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.Text && { Text: SENSITIVE_STRING }))); };
})(DetectEntitiesRequest || (DetectEntitiesRequest = {}));
export var DetectEntitiesResponse;
(function (DetectEntitiesResponse) {
    DetectEntitiesResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DetectEntitiesResponse || (DetectEntitiesResponse = {}));
export var DetectKeyPhrasesRequest;
(function (DetectKeyPhrasesRequest) {
    DetectKeyPhrasesRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.Text && { Text: SENSITIVE_STRING }))); };
})(DetectKeyPhrasesRequest || (DetectKeyPhrasesRequest = {}));
export var DetectKeyPhrasesResponse;
(function (DetectKeyPhrasesResponse) {
    DetectKeyPhrasesResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DetectKeyPhrasesResponse || (DetectKeyPhrasesResponse = {}));
export var DetectPiiEntitiesRequest;
(function (DetectPiiEntitiesRequest) {
    DetectPiiEntitiesRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DetectPiiEntitiesRequest || (DetectPiiEntitiesRequest = {}));
export var PiiEntity;
(function (PiiEntity) {
    PiiEntity.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PiiEntity || (PiiEntity = {}));
export var DetectPiiEntitiesResponse;
(function (DetectPiiEntitiesResponse) {
    DetectPiiEntitiesResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DetectPiiEntitiesResponse || (DetectPiiEntitiesResponse = {}));
export var DetectSentimentRequest;
(function (DetectSentimentRequest) {
    DetectSentimentRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.Text && { Text: SENSITIVE_STRING }))); };
})(DetectSentimentRequest || (DetectSentimentRequest = {}));
export var DetectSentimentResponse;
(function (DetectSentimentResponse) {
    DetectSentimentResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DetectSentimentResponse || (DetectSentimentResponse = {}));
export var DetectSyntaxRequest;
(function (DetectSyntaxRequest) {
    DetectSyntaxRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.Text && { Text: SENSITIVE_STRING }))); };
})(DetectSyntaxRequest || (DetectSyntaxRequest = {}));
export var DetectSyntaxResponse;
(function (DetectSyntaxResponse) {
    DetectSyntaxResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DetectSyntaxResponse || (DetectSyntaxResponse = {}));
export var InvalidFilterException;
(function (InvalidFilterException) {
    InvalidFilterException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InvalidFilterException || (InvalidFilterException = {}));
export var DocumentClassificationJobFilter;
(function (DocumentClassificationJobFilter) {
    DocumentClassificationJobFilter.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DocumentClassificationJobFilter || (DocumentClassificationJobFilter = {}));
export var ListDocumentClassificationJobsRequest;
(function (ListDocumentClassificationJobsRequest) {
    ListDocumentClassificationJobsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListDocumentClassificationJobsRequest || (ListDocumentClassificationJobsRequest = {}));
export var ListDocumentClassificationJobsResponse;
(function (ListDocumentClassificationJobsResponse) {
    ListDocumentClassificationJobsResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListDocumentClassificationJobsResponse || (ListDocumentClassificationJobsResponse = {}));
export var DocumentClassifierFilter;
(function (DocumentClassifierFilter) {
    DocumentClassifierFilter.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DocumentClassifierFilter || (DocumentClassifierFilter = {}));
export var ListDocumentClassifiersRequest;
(function (ListDocumentClassifiersRequest) {
    ListDocumentClassifiersRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListDocumentClassifiersRequest || (ListDocumentClassifiersRequest = {}));
export var ListDocumentClassifiersResponse;
(function (ListDocumentClassifiersResponse) {
    ListDocumentClassifiersResponse.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.DocumentClassifierPropertiesList && {
        DocumentClassifierPropertiesList: obj.DocumentClassifierPropertiesList.map(function (item) {
            return DocumentClassifierProperties.filterSensitiveLog(item);
        }),
    }))); };
})(ListDocumentClassifiersResponse || (ListDocumentClassifiersResponse = {}));
export var DominantLanguageDetectionJobFilter;
(function (DominantLanguageDetectionJobFilter) {
    DominantLanguageDetectionJobFilter.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DominantLanguageDetectionJobFilter || (DominantLanguageDetectionJobFilter = {}));
export var ListDominantLanguageDetectionJobsRequest;
(function (ListDominantLanguageDetectionJobsRequest) {
    ListDominantLanguageDetectionJobsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListDominantLanguageDetectionJobsRequest || (ListDominantLanguageDetectionJobsRequest = {}));
export var ListDominantLanguageDetectionJobsResponse;
(function (ListDominantLanguageDetectionJobsResponse) {
    ListDominantLanguageDetectionJobsResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListDominantLanguageDetectionJobsResponse || (ListDominantLanguageDetectionJobsResponse = {}));
export var EndpointFilter;
(function (EndpointFilter) {
    EndpointFilter.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(EndpointFilter || (EndpointFilter = {}));
export var ListEndpointsRequest;
(function (ListEndpointsRequest) {
    ListEndpointsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListEndpointsRequest || (ListEndpointsRequest = {}));
export var ListEndpointsResponse;
(function (ListEndpointsResponse) {
    ListEndpointsResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListEndpointsResponse || (ListEndpointsResponse = {}));
export var EntitiesDetectionJobFilter;
(function (EntitiesDetectionJobFilter) {
    EntitiesDetectionJobFilter.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(EntitiesDetectionJobFilter || (EntitiesDetectionJobFilter = {}));
export var ListEntitiesDetectionJobsRequest;
(function (ListEntitiesDetectionJobsRequest) {
    ListEntitiesDetectionJobsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListEntitiesDetectionJobsRequest || (ListEntitiesDetectionJobsRequest = {}));
export var ListEntitiesDetectionJobsResponse;
(function (ListEntitiesDetectionJobsResponse) {
    ListEntitiesDetectionJobsResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListEntitiesDetectionJobsResponse || (ListEntitiesDetectionJobsResponse = {}));
export var EntityRecognizerFilter;
(function (EntityRecognizerFilter) {
    EntityRecognizerFilter.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(EntityRecognizerFilter || (EntityRecognizerFilter = {}));
export var ListEntityRecognizersRequest;
(function (ListEntityRecognizersRequest) {
    ListEntityRecognizersRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListEntityRecognizersRequest || (ListEntityRecognizersRequest = {}));
export var ListEntityRecognizersResponse;
(function (ListEntityRecognizersResponse) {
    ListEntityRecognizersResponse.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.EntityRecognizerPropertiesList && {
        EntityRecognizerPropertiesList: obj.EntityRecognizerPropertiesList.map(function (item) {
            return EntityRecognizerProperties.filterSensitiveLog(item);
        }),
    }))); };
})(ListEntityRecognizersResponse || (ListEntityRecognizersResponse = {}));
export var EventsDetectionJobFilter;
(function (EventsDetectionJobFilter) {
    EventsDetectionJobFilter.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(EventsDetectionJobFilter || (EventsDetectionJobFilter = {}));
export var ListEventsDetectionJobsRequest;
(function (ListEventsDetectionJobsRequest) {
    ListEventsDetectionJobsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListEventsDetectionJobsRequest || (ListEventsDetectionJobsRequest = {}));
export var ListEventsDetectionJobsResponse;
(function (ListEventsDetectionJobsResponse) {
    ListEventsDetectionJobsResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListEventsDetectionJobsResponse || (ListEventsDetectionJobsResponse = {}));
export var KeyPhrasesDetectionJobFilter;
(function (KeyPhrasesDetectionJobFilter) {
    KeyPhrasesDetectionJobFilter.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(KeyPhrasesDetectionJobFilter || (KeyPhrasesDetectionJobFilter = {}));
export var ListKeyPhrasesDetectionJobsRequest;
(function (ListKeyPhrasesDetectionJobsRequest) {
    ListKeyPhrasesDetectionJobsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListKeyPhrasesDetectionJobsRequest || (ListKeyPhrasesDetectionJobsRequest = {}));
export var ListKeyPhrasesDetectionJobsResponse;
(function (ListKeyPhrasesDetectionJobsResponse) {
    ListKeyPhrasesDetectionJobsResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListKeyPhrasesDetectionJobsResponse || (ListKeyPhrasesDetectionJobsResponse = {}));
export var PiiEntitiesDetectionJobFilter;
(function (PiiEntitiesDetectionJobFilter) {
    PiiEntitiesDetectionJobFilter.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(PiiEntitiesDetectionJobFilter || (PiiEntitiesDetectionJobFilter = {}));
export var ListPiiEntitiesDetectionJobsRequest;
(function (ListPiiEntitiesDetectionJobsRequest) {
    ListPiiEntitiesDetectionJobsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListPiiEntitiesDetectionJobsRequest || (ListPiiEntitiesDetectionJobsRequest = {}));
export var ListPiiEntitiesDetectionJobsResponse;
(function (ListPiiEntitiesDetectionJobsResponse) {
    ListPiiEntitiesDetectionJobsResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListPiiEntitiesDetectionJobsResponse || (ListPiiEntitiesDetectionJobsResponse = {}));
export var SentimentDetectionJobFilter;
(function (SentimentDetectionJobFilter) {
    SentimentDetectionJobFilter.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(SentimentDetectionJobFilter || (SentimentDetectionJobFilter = {}));
export var ListSentimentDetectionJobsRequest;
(function (ListSentimentDetectionJobsRequest) {
    ListSentimentDetectionJobsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListSentimentDetectionJobsRequest || (ListSentimentDetectionJobsRequest = {}));
export var ListSentimentDetectionJobsResponse;
(function (ListSentimentDetectionJobsResponse) {
    ListSentimentDetectionJobsResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListSentimentDetectionJobsResponse || (ListSentimentDetectionJobsResponse = {}));
export var ListTagsForResourceRequest;
(function (ListTagsForResourceRequest) {
    ListTagsForResourceRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListTagsForResourceRequest || (ListTagsForResourceRequest = {}));
export var ListTagsForResourceResponse;
(function (ListTagsForResourceResponse) {
    ListTagsForResourceResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListTagsForResourceResponse || (ListTagsForResourceResponse = {}));
export var TopicsDetectionJobFilter;
(function (TopicsDetectionJobFilter) {
    TopicsDetectionJobFilter.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TopicsDetectionJobFilter || (TopicsDetectionJobFilter = {}));
export var ListTopicsDetectionJobsRequest;
(function (ListTopicsDetectionJobsRequest) {
    ListTopicsDetectionJobsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListTopicsDetectionJobsRequest || (ListTopicsDetectionJobsRequest = {}));
export var ListTopicsDetectionJobsResponse;
(function (ListTopicsDetectionJobsResponse) {
    ListTopicsDetectionJobsResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListTopicsDetectionJobsResponse || (ListTopicsDetectionJobsResponse = {}));
export var StartDocumentClassificationJobRequest;
(function (StartDocumentClassificationJobRequest) {
    StartDocumentClassificationJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartDocumentClassificationJobRequest || (StartDocumentClassificationJobRequest = {}));
export var StartDocumentClassificationJobResponse;
(function (StartDocumentClassificationJobResponse) {
    StartDocumentClassificationJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartDocumentClassificationJobResponse || (StartDocumentClassificationJobResponse = {}));
export var StartDominantLanguageDetectionJobRequest;
(function (StartDominantLanguageDetectionJobRequest) {
    StartDominantLanguageDetectionJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartDominantLanguageDetectionJobRequest || (StartDominantLanguageDetectionJobRequest = {}));
export var StartDominantLanguageDetectionJobResponse;
(function (StartDominantLanguageDetectionJobResponse) {
    StartDominantLanguageDetectionJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartDominantLanguageDetectionJobResponse || (StartDominantLanguageDetectionJobResponse = {}));
export var StartEntitiesDetectionJobRequest;
(function (StartEntitiesDetectionJobRequest) {
    StartEntitiesDetectionJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartEntitiesDetectionJobRequest || (StartEntitiesDetectionJobRequest = {}));
export var StartEntitiesDetectionJobResponse;
(function (StartEntitiesDetectionJobResponse) {
    StartEntitiesDetectionJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartEntitiesDetectionJobResponse || (StartEntitiesDetectionJobResponse = {}));
export var StartEventsDetectionJobRequest;
(function (StartEventsDetectionJobRequest) {
    StartEventsDetectionJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartEventsDetectionJobRequest || (StartEventsDetectionJobRequest = {}));
export var StartEventsDetectionJobResponse;
(function (StartEventsDetectionJobResponse) {
    StartEventsDetectionJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartEventsDetectionJobResponse || (StartEventsDetectionJobResponse = {}));
export var StartKeyPhrasesDetectionJobRequest;
(function (StartKeyPhrasesDetectionJobRequest) {
    StartKeyPhrasesDetectionJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartKeyPhrasesDetectionJobRequest || (StartKeyPhrasesDetectionJobRequest = {}));
export var StartKeyPhrasesDetectionJobResponse;
(function (StartKeyPhrasesDetectionJobResponse) {
    StartKeyPhrasesDetectionJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartKeyPhrasesDetectionJobResponse || (StartKeyPhrasesDetectionJobResponse = {}));
export var StartPiiEntitiesDetectionJobRequest;
(function (StartPiiEntitiesDetectionJobRequest) {
    StartPiiEntitiesDetectionJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartPiiEntitiesDetectionJobRequest || (StartPiiEntitiesDetectionJobRequest = {}));
export var StartPiiEntitiesDetectionJobResponse;
(function (StartPiiEntitiesDetectionJobResponse) {
    StartPiiEntitiesDetectionJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartPiiEntitiesDetectionJobResponse || (StartPiiEntitiesDetectionJobResponse = {}));
export var StartSentimentDetectionJobRequest;
(function (StartSentimentDetectionJobRequest) {
    StartSentimentDetectionJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartSentimentDetectionJobRequest || (StartSentimentDetectionJobRequest = {}));
export var StartSentimentDetectionJobResponse;
(function (StartSentimentDetectionJobResponse) {
    StartSentimentDetectionJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartSentimentDetectionJobResponse || (StartSentimentDetectionJobResponse = {}));
export var StartTopicsDetectionJobRequest;
(function (StartTopicsDetectionJobRequest) {
    StartTopicsDetectionJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartTopicsDetectionJobRequest || (StartTopicsDetectionJobRequest = {}));
export var StartTopicsDetectionJobResponse;
(function (StartTopicsDetectionJobResponse) {
    StartTopicsDetectionJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartTopicsDetectionJobResponse || (StartTopicsDetectionJobResponse = {}));
export var StopDominantLanguageDetectionJobRequest;
(function (StopDominantLanguageDetectionJobRequest) {
    StopDominantLanguageDetectionJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StopDominantLanguageDetectionJobRequest || (StopDominantLanguageDetectionJobRequest = {}));
export var StopDominantLanguageDetectionJobResponse;
(function (StopDominantLanguageDetectionJobResponse) {
    StopDominantLanguageDetectionJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StopDominantLanguageDetectionJobResponse || (StopDominantLanguageDetectionJobResponse = {}));
export var StopEntitiesDetectionJobRequest;
(function (StopEntitiesDetectionJobRequest) {
    StopEntitiesDetectionJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StopEntitiesDetectionJobRequest || (StopEntitiesDetectionJobRequest = {}));
export var StopEntitiesDetectionJobResponse;
(function (StopEntitiesDetectionJobResponse) {
    StopEntitiesDetectionJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StopEntitiesDetectionJobResponse || (StopEntitiesDetectionJobResponse = {}));
export var StopEventsDetectionJobRequest;
(function (StopEventsDetectionJobRequest) {
    StopEventsDetectionJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StopEventsDetectionJobRequest || (StopEventsDetectionJobRequest = {}));
export var StopEventsDetectionJobResponse;
(function (StopEventsDetectionJobResponse) {
    StopEventsDetectionJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StopEventsDetectionJobResponse || (StopEventsDetectionJobResponse = {}));
export var StopKeyPhrasesDetectionJobRequest;
(function (StopKeyPhrasesDetectionJobRequest) {
    StopKeyPhrasesDetectionJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StopKeyPhrasesDetectionJobRequest || (StopKeyPhrasesDetectionJobRequest = {}));
export var StopKeyPhrasesDetectionJobResponse;
(function (StopKeyPhrasesDetectionJobResponse) {
    StopKeyPhrasesDetectionJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StopKeyPhrasesDetectionJobResponse || (StopKeyPhrasesDetectionJobResponse = {}));
export var StopPiiEntitiesDetectionJobRequest;
(function (StopPiiEntitiesDetectionJobRequest) {
    StopPiiEntitiesDetectionJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StopPiiEntitiesDetectionJobRequest || (StopPiiEntitiesDetectionJobRequest = {}));
export var StopPiiEntitiesDetectionJobResponse;
(function (StopPiiEntitiesDetectionJobResponse) {
    StopPiiEntitiesDetectionJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StopPiiEntitiesDetectionJobResponse || (StopPiiEntitiesDetectionJobResponse = {}));
export var StopSentimentDetectionJobRequest;
(function (StopSentimentDetectionJobRequest) {
    StopSentimentDetectionJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StopSentimentDetectionJobRequest || (StopSentimentDetectionJobRequest = {}));
export var StopSentimentDetectionJobResponse;
(function (StopSentimentDetectionJobResponse) {
    StopSentimentDetectionJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StopSentimentDetectionJobResponse || (StopSentimentDetectionJobResponse = {}));
export var StopTrainingDocumentClassifierRequest;
(function (StopTrainingDocumentClassifierRequest) {
    StopTrainingDocumentClassifierRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StopTrainingDocumentClassifierRequest || (StopTrainingDocumentClassifierRequest = {}));
export var StopTrainingDocumentClassifierResponse;
(function (StopTrainingDocumentClassifierResponse) {
    StopTrainingDocumentClassifierResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StopTrainingDocumentClassifierResponse || (StopTrainingDocumentClassifierResponse = {}));
export var StopTrainingEntityRecognizerRequest;
(function (StopTrainingEntityRecognizerRequest) {
    StopTrainingEntityRecognizerRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StopTrainingEntityRecognizerRequest || (StopTrainingEntityRecognizerRequest = {}));
export var StopTrainingEntityRecognizerResponse;
(function (StopTrainingEntityRecognizerResponse) {
    StopTrainingEntityRecognizerResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StopTrainingEntityRecognizerResponse || (StopTrainingEntityRecognizerResponse = {}));
export var ConcurrentModificationException;
(function (ConcurrentModificationException) {
    ConcurrentModificationException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ConcurrentModificationException || (ConcurrentModificationException = {}));
export var TagResourceRequest;
(function (TagResourceRequest) {
    TagResourceRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TagResourceRequest || (TagResourceRequest = {}));
export var TagResourceResponse;
(function (TagResourceResponse) {
    TagResourceResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TagResourceResponse || (TagResourceResponse = {}));
export var TooManyTagKeysException;
(function (TooManyTagKeysException) {
    TooManyTagKeysException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TooManyTagKeysException || (TooManyTagKeysException = {}));
export var UntagResourceRequest;
(function (UntagResourceRequest) {
    UntagResourceRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UntagResourceRequest || (UntagResourceRequest = {}));
export var UntagResourceResponse;
(function (UntagResourceResponse) {
    UntagResourceResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UntagResourceResponse || (UntagResourceResponse = {}));
export var UpdateEndpointRequest;
(function (UpdateEndpointRequest) {
    UpdateEndpointRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateEndpointRequest || (UpdateEndpointRequest = {}));
export var UpdateEndpointResponse;
(function (UpdateEndpointResponse) {
    UpdateEndpointResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateEndpointResponse || (UpdateEndpointResponse = {}));
//# sourceMappingURL=models_0.js.map
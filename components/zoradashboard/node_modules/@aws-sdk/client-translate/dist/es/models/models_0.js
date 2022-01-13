import { __assign } from "tslib";
import { SENSITIVE_STRING } from "@aws-sdk/smithy-client";
export var Term;
(function (Term) {
    Term.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Term || (Term = {}));
export var AppliedTerminology;
(function (AppliedTerminology) {
    AppliedTerminology.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AppliedTerminology || (AppliedTerminology = {}));
export var ConflictException;
(function (ConflictException) {
    ConflictException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ConflictException || (ConflictException = {}));
export var EncryptionKeyType;
(function (EncryptionKeyType) {
    EncryptionKeyType["KMS"] = "KMS";
})(EncryptionKeyType || (EncryptionKeyType = {}));
export var EncryptionKey;
(function (EncryptionKey) {
    EncryptionKey.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(EncryptionKey || (EncryptionKey = {}));
export var ParallelDataFormat;
(function (ParallelDataFormat) {
    ParallelDataFormat["CSV"] = "CSV";
    ParallelDataFormat["TMX"] = "TMX";
    ParallelDataFormat["TSV"] = "TSV";
})(ParallelDataFormat || (ParallelDataFormat = {}));
export var ParallelDataConfig;
(function (ParallelDataConfig) {
    ParallelDataConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ParallelDataConfig || (ParallelDataConfig = {}));
export var CreateParallelDataRequest;
(function (CreateParallelDataRequest) {
    CreateParallelDataRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateParallelDataRequest || (CreateParallelDataRequest = {}));
export var ParallelDataStatus;
(function (ParallelDataStatus) {
    ParallelDataStatus["ACTIVE"] = "ACTIVE";
    ParallelDataStatus["CREATING"] = "CREATING";
    ParallelDataStatus["DELETING"] = "DELETING";
    ParallelDataStatus["FAILED"] = "FAILED";
    ParallelDataStatus["UPDATING"] = "UPDATING";
})(ParallelDataStatus || (ParallelDataStatus = {}));
export var CreateParallelDataResponse;
(function (CreateParallelDataResponse) {
    CreateParallelDataResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(CreateParallelDataResponse || (CreateParallelDataResponse = {}));
export var InternalServerException;
(function (InternalServerException) {
    InternalServerException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InternalServerException || (InternalServerException = {}));
export var InvalidParameterValueException;
(function (InvalidParameterValueException) {
    InvalidParameterValueException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InvalidParameterValueException || (InvalidParameterValueException = {}));
export var InvalidRequestException;
(function (InvalidRequestException) {
    InvalidRequestException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InvalidRequestException || (InvalidRequestException = {}));
export var LimitExceededException;
(function (LimitExceededException) {
    LimitExceededException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LimitExceededException || (LimitExceededException = {}));
export var TooManyRequestsException;
(function (TooManyRequestsException) {
    TooManyRequestsException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TooManyRequestsException || (TooManyRequestsException = {}));
export var ConcurrentModificationException;
(function (ConcurrentModificationException) {
    ConcurrentModificationException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ConcurrentModificationException || (ConcurrentModificationException = {}));
export var DeleteParallelDataRequest;
(function (DeleteParallelDataRequest) {
    DeleteParallelDataRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteParallelDataRequest || (DeleteParallelDataRequest = {}));
export var DeleteParallelDataResponse;
(function (DeleteParallelDataResponse) {
    DeleteParallelDataResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteParallelDataResponse || (DeleteParallelDataResponse = {}));
export var ResourceNotFoundException;
(function (ResourceNotFoundException) {
    ResourceNotFoundException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ResourceNotFoundException || (ResourceNotFoundException = {}));
export var DeleteTerminologyRequest;
(function (DeleteTerminologyRequest) {
    DeleteTerminologyRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DeleteTerminologyRequest || (DeleteTerminologyRequest = {}));
export var DescribeTextTranslationJobRequest;
(function (DescribeTextTranslationJobRequest) {
    DescribeTextTranslationJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeTextTranslationJobRequest || (DescribeTextTranslationJobRequest = {}));
export var InputDataConfig;
(function (InputDataConfig) {
    InputDataConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InputDataConfig || (InputDataConfig = {}));
export var JobDetails;
(function (JobDetails) {
    JobDetails.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(JobDetails || (JobDetails = {}));
export var JobStatus;
(function (JobStatus) {
    JobStatus["COMPLETED"] = "COMPLETED";
    JobStatus["COMPLETED_WITH_ERROR"] = "COMPLETED_WITH_ERROR";
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
export var TextTranslationJobProperties;
(function (TextTranslationJobProperties) {
    TextTranslationJobProperties.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TextTranslationJobProperties || (TextTranslationJobProperties = {}));
export var DescribeTextTranslationJobResponse;
(function (DescribeTextTranslationJobResponse) {
    DescribeTextTranslationJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DescribeTextTranslationJobResponse || (DescribeTextTranslationJobResponse = {}));
export var GetParallelDataRequest;
(function (GetParallelDataRequest) {
    GetParallelDataRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetParallelDataRequest || (GetParallelDataRequest = {}));
export var ParallelDataDataLocation;
(function (ParallelDataDataLocation) {
    ParallelDataDataLocation.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ParallelDataDataLocation || (ParallelDataDataLocation = {}));
export var ParallelDataProperties;
(function (ParallelDataProperties) {
    ParallelDataProperties.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ParallelDataProperties || (ParallelDataProperties = {}));
export var GetParallelDataResponse;
(function (GetParallelDataResponse) {
    GetParallelDataResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetParallelDataResponse || (GetParallelDataResponse = {}));
export var TerminologyDataFormat;
(function (TerminologyDataFormat) {
    TerminologyDataFormat["CSV"] = "CSV";
    TerminologyDataFormat["TMX"] = "TMX";
})(TerminologyDataFormat || (TerminologyDataFormat = {}));
export var GetTerminologyRequest;
(function (GetTerminologyRequest) {
    GetTerminologyRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetTerminologyRequest || (GetTerminologyRequest = {}));
export var TerminologyDataLocation;
(function (TerminologyDataLocation) {
    TerminologyDataLocation.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TerminologyDataLocation || (TerminologyDataLocation = {}));
export var TerminologyProperties;
(function (TerminologyProperties) {
    TerminologyProperties.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TerminologyProperties || (TerminologyProperties = {}));
export var GetTerminologyResponse;
(function (GetTerminologyResponse) {
    GetTerminologyResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetTerminologyResponse || (GetTerminologyResponse = {}));
export var MergeStrategy;
(function (MergeStrategy) {
    MergeStrategy["OVERWRITE"] = "OVERWRITE";
})(MergeStrategy || (MergeStrategy = {}));
export var TerminologyData;
(function (TerminologyData) {
    TerminologyData.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.File && { File: SENSITIVE_STRING }))); };
})(TerminologyData || (TerminologyData = {}));
export var ImportTerminologyRequest;
(function (ImportTerminologyRequest) {
    ImportTerminologyRequest.filterSensitiveLog = function (obj) { return (__assign(__assign({}, obj), (obj.TerminologyData && { TerminologyData: TerminologyData.filterSensitiveLog(obj.TerminologyData) }))); };
})(ImportTerminologyRequest || (ImportTerminologyRequest = {}));
export var ImportTerminologyResponse;
(function (ImportTerminologyResponse) {
    ImportTerminologyResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ImportTerminologyResponse || (ImportTerminologyResponse = {}));
export var ListParallelDataRequest;
(function (ListParallelDataRequest) {
    ListParallelDataRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListParallelDataRequest || (ListParallelDataRequest = {}));
export var ListParallelDataResponse;
(function (ListParallelDataResponse) {
    ListParallelDataResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListParallelDataResponse || (ListParallelDataResponse = {}));
export var ListTerminologiesRequest;
(function (ListTerminologiesRequest) {
    ListTerminologiesRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListTerminologiesRequest || (ListTerminologiesRequest = {}));
export var ListTerminologiesResponse;
(function (ListTerminologiesResponse) {
    ListTerminologiesResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListTerminologiesResponse || (ListTerminologiesResponse = {}));
export var InvalidFilterException;
(function (InvalidFilterException) {
    InvalidFilterException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InvalidFilterException || (InvalidFilterException = {}));
export var TextTranslationJobFilter;
(function (TextTranslationJobFilter) {
    TextTranslationJobFilter.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TextTranslationJobFilter || (TextTranslationJobFilter = {}));
export var ListTextTranslationJobsRequest;
(function (ListTextTranslationJobsRequest) {
    ListTextTranslationJobsRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListTextTranslationJobsRequest || (ListTextTranslationJobsRequest = {}));
export var ListTextTranslationJobsResponse;
(function (ListTextTranslationJobsResponse) {
    ListTextTranslationJobsResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ListTextTranslationJobsResponse || (ListTextTranslationJobsResponse = {}));
export var StartTextTranslationJobRequest;
(function (StartTextTranslationJobRequest) {
    StartTextTranslationJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartTextTranslationJobRequest || (StartTextTranslationJobRequest = {}));
export var StartTextTranslationJobResponse;
(function (StartTextTranslationJobResponse) {
    StartTextTranslationJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartTextTranslationJobResponse || (StartTextTranslationJobResponse = {}));
export var UnsupportedLanguagePairException;
(function (UnsupportedLanguagePairException) {
    UnsupportedLanguagePairException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UnsupportedLanguagePairException || (UnsupportedLanguagePairException = {}));
export var StopTextTranslationJobRequest;
(function (StopTextTranslationJobRequest) {
    StopTextTranslationJobRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StopTextTranslationJobRequest || (StopTextTranslationJobRequest = {}));
export var StopTextTranslationJobResponse;
(function (StopTextTranslationJobResponse) {
    StopTextTranslationJobResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StopTextTranslationJobResponse || (StopTextTranslationJobResponse = {}));
export var DetectedLanguageLowConfidenceException;
(function (DetectedLanguageLowConfidenceException) {
    DetectedLanguageLowConfidenceException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DetectedLanguageLowConfidenceException || (DetectedLanguageLowConfidenceException = {}));
export var ServiceUnavailableException;
(function (ServiceUnavailableException) {
    ServiceUnavailableException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ServiceUnavailableException || (ServiceUnavailableException = {}));
export var TextSizeLimitExceededException;
(function (TextSizeLimitExceededException) {
    TextSizeLimitExceededException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TextSizeLimitExceededException || (TextSizeLimitExceededException = {}));
export var TranslateTextRequest;
(function (TranslateTextRequest) {
    TranslateTextRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TranslateTextRequest || (TranslateTextRequest = {}));
export var TranslateTextResponse;
(function (TranslateTextResponse) {
    TranslateTextResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(TranslateTextResponse || (TranslateTextResponse = {}));
export var UpdateParallelDataRequest;
(function (UpdateParallelDataRequest) {
    UpdateParallelDataRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateParallelDataRequest || (UpdateParallelDataRequest = {}));
export var UpdateParallelDataResponse;
(function (UpdateParallelDataResponse) {
    UpdateParallelDataResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UpdateParallelDataResponse || (UpdateParallelDataResponse = {}));
//# sourceMappingURL=models_0.js.map
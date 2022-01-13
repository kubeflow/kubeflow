"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartTextTranslationJobResponse = exports.StartTextTranslationJobRequest = exports.ListTextTranslationJobsResponse = exports.ListTextTranslationJobsRequest = exports.TextTranslationJobFilter = exports.InvalidFilterException = exports.ListTerminologiesResponse = exports.ListTerminologiesRequest = exports.ListParallelDataResponse = exports.ListParallelDataRequest = exports.ImportTerminologyResponse = exports.ImportTerminologyRequest = exports.TerminologyData = exports.MergeStrategy = exports.GetTerminologyResponse = exports.TerminologyProperties = exports.TerminologyDataLocation = exports.GetTerminologyRequest = exports.TerminologyDataFormat = exports.GetParallelDataResponse = exports.ParallelDataProperties = exports.ParallelDataDataLocation = exports.GetParallelDataRequest = exports.DescribeTextTranslationJobResponse = exports.TextTranslationJobProperties = exports.OutputDataConfig = exports.JobStatus = exports.JobDetails = exports.InputDataConfig = exports.DescribeTextTranslationJobRequest = exports.DeleteTerminologyRequest = exports.ResourceNotFoundException = exports.DeleteParallelDataResponse = exports.DeleteParallelDataRequest = exports.ConcurrentModificationException = exports.TooManyRequestsException = exports.LimitExceededException = exports.InvalidRequestException = exports.InvalidParameterValueException = exports.InternalServerException = exports.CreateParallelDataResponse = exports.ParallelDataStatus = exports.CreateParallelDataRequest = exports.ParallelDataConfig = exports.ParallelDataFormat = exports.EncryptionKey = exports.EncryptionKeyType = exports.ConflictException = exports.AppliedTerminology = exports.Term = void 0;
exports.UpdateParallelDataResponse = exports.UpdateParallelDataRequest = exports.TranslateTextResponse = exports.TranslateTextRequest = exports.TextSizeLimitExceededException = exports.ServiceUnavailableException = exports.DetectedLanguageLowConfidenceException = exports.StopTextTranslationJobResponse = exports.StopTextTranslationJobRequest = exports.UnsupportedLanguagePairException = void 0;
const smithy_client_1 = require("@aws-sdk/smithy-client");
var Term;
(function (Term) {
    Term.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Term = exports.Term || (exports.Term = {}));
var AppliedTerminology;
(function (AppliedTerminology) {
    AppliedTerminology.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AppliedTerminology = exports.AppliedTerminology || (exports.AppliedTerminology = {}));
var ConflictException;
(function (ConflictException) {
    ConflictException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ConflictException = exports.ConflictException || (exports.ConflictException = {}));
var EncryptionKeyType;
(function (EncryptionKeyType) {
    EncryptionKeyType["KMS"] = "KMS";
})(EncryptionKeyType = exports.EncryptionKeyType || (exports.EncryptionKeyType = {}));
var EncryptionKey;
(function (EncryptionKey) {
    EncryptionKey.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EncryptionKey = exports.EncryptionKey || (exports.EncryptionKey = {}));
var ParallelDataFormat;
(function (ParallelDataFormat) {
    ParallelDataFormat["CSV"] = "CSV";
    ParallelDataFormat["TMX"] = "TMX";
    ParallelDataFormat["TSV"] = "TSV";
})(ParallelDataFormat = exports.ParallelDataFormat || (exports.ParallelDataFormat = {}));
var ParallelDataConfig;
(function (ParallelDataConfig) {
    ParallelDataConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ParallelDataConfig = exports.ParallelDataConfig || (exports.ParallelDataConfig = {}));
var CreateParallelDataRequest;
(function (CreateParallelDataRequest) {
    CreateParallelDataRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateParallelDataRequest = exports.CreateParallelDataRequest || (exports.CreateParallelDataRequest = {}));
var ParallelDataStatus;
(function (ParallelDataStatus) {
    ParallelDataStatus["ACTIVE"] = "ACTIVE";
    ParallelDataStatus["CREATING"] = "CREATING";
    ParallelDataStatus["DELETING"] = "DELETING";
    ParallelDataStatus["FAILED"] = "FAILED";
    ParallelDataStatus["UPDATING"] = "UPDATING";
})(ParallelDataStatus = exports.ParallelDataStatus || (exports.ParallelDataStatus = {}));
var CreateParallelDataResponse;
(function (CreateParallelDataResponse) {
    CreateParallelDataResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateParallelDataResponse = exports.CreateParallelDataResponse || (exports.CreateParallelDataResponse = {}));
var InternalServerException;
(function (InternalServerException) {
    InternalServerException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InternalServerException = exports.InternalServerException || (exports.InternalServerException = {}));
var InvalidParameterValueException;
(function (InvalidParameterValueException) {
    InvalidParameterValueException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidParameterValueException = exports.InvalidParameterValueException || (exports.InvalidParameterValueException = {}));
var InvalidRequestException;
(function (InvalidRequestException) {
    InvalidRequestException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidRequestException = exports.InvalidRequestException || (exports.InvalidRequestException = {}));
var LimitExceededException;
(function (LimitExceededException) {
    LimitExceededException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LimitExceededException = exports.LimitExceededException || (exports.LimitExceededException = {}));
var TooManyRequestsException;
(function (TooManyRequestsException) {
    TooManyRequestsException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TooManyRequestsException = exports.TooManyRequestsException || (exports.TooManyRequestsException = {}));
var ConcurrentModificationException;
(function (ConcurrentModificationException) {
    ConcurrentModificationException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ConcurrentModificationException = exports.ConcurrentModificationException || (exports.ConcurrentModificationException = {}));
var DeleteParallelDataRequest;
(function (DeleteParallelDataRequest) {
    DeleteParallelDataRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteParallelDataRequest = exports.DeleteParallelDataRequest || (exports.DeleteParallelDataRequest = {}));
var DeleteParallelDataResponse;
(function (DeleteParallelDataResponse) {
    DeleteParallelDataResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteParallelDataResponse = exports.DeleteParallelDataResponse || (exports.DeleteParallelDataResponse = {}));
var ResourceNotFoundException;
(function (ResourceNotFoundException) {
    ResourceNotFoundException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResourceNotFoundException = exports.ResourceNotFoundException || (exports.ResourceNotFoundException = {}));
var DeleteTerminologyRequest;
(function (DeleteTerminologyRequest) {
    DeleteTerminologyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteTerminologyRequest = exports.DeleteTerminologyRequest || (exports.DeleteTerminologyRequest = {}));
var DescribeTextTranslationJobRequest;
(function (DescribeTextTranslationJobRequest) {
    DescribeTextTranslationJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeTextTranslationJobRequest = exports.DescribeTextTranslationJobRequest || (exports.DescribeTextTranslationJobRequest = {}));
var InputDataConfig;
(function (InputDataConfig) {
    InputDataConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InputDataConfig = exports.InputDataConfig || (exports.InputDataConfig = {}));
var JobDetails;
(function (JobDetails) {
    JobDetails.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(JobDetails = exports.JobDetails || (exports.JobDetails = {}));
var JobStatus;
(function (JobStatus) {
    JobStatus["COMPLETED"] = "COMPLETED";
    JobStatus["COMPLETED_WITH_ERROR"] = "COMPLETED_WITH_ERROR";
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
var TextTranslationJobProperties;
(function (TextTranslationJobProperties) {
    TextTranslationJobProperties.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TextTranslationJobProperties = exports.TextTranslationJobProperties || (exports.TextTranslationJobProperties = {}));
var DescribeTextTranslationJobResponse;
(function (DescribeTextTranslationJobResponse) {
    DescribeTextTranslationJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeTextTranslationJobResponse = exports.DescribeTextTranslationJobResponse || (exports.DescribeTextTranslationJobResponse = {}));
var GetParallelDataRequest;
(function (GetParallelDataRequest) {
    GetParallelDataRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetParallelDataRequest = exports.GetParallelDataRequest || (exports.GetParallelDataRequest = {}));
var ParallelDataDataLocation;
(function (ParallelDataDataLocation) {
    ParallelDataDataLocation.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ParallelDataDataLocation = exports.ParallelDataDataLocation || (exports.ParallelDataDataLocation = {}));
var ParallelDataProperties;
(function (ParallelDataProperties) {
    ParallelDataProperties.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ParallelDataProperties = exports.ParallelDataProperties || (exports.ParallelDataProperties = {}));
var GetParallelDataResponse;
(function (GetParallelDataResponse) {
    GetParallelDataResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetParallelDataResponse = exports.GetParallelDataResponse || (exports.GetParallelDataResponse = {}));
var TerminologyDataFormat;
(function (TerminologyDataFormat) {
    TerminologyDataFormat["CSV"] = "CSV";
    TerminologyDataFormat["TMX"] = "TMX";
})(TerminologyDataFormat = exports.TerminologyDataFormat || (exports.TerminologyDataFormat = {}));
var GetTerminologyRequest;
(function (GetTerminologyRequest) {
    GetTerminologyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetTerminologyRequest = exports.GetTerminologyRequest || (exports.GetTerminologyRequest = {}));
var TerminologyDataLocation;
(function (TerminologyDataLocation) {
    TerminologyDataLocation.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TerminologyDataLocation = exports.TerminologyDataLocation || (exports.TerminologyDataLocation = {}));
var TerminologyProperties;
(function (TerminologyProperties) {
    TerminologyProperties.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TerminologyProperties = exports.TerminologyProperties || (exports.TerminologyProperties = {}));
var GetTerminologyResponse;
(function (GetTerminologyResponse) {
    GetTerminologyResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetTerminologyResponse = exports.GetTerminologyResponse || (exports.GetTerminologyResponse = {}));
var MergeStrategy;
(function (MergeStrategy) {
    MergeStrategy["OVERWRITE"] = "OVERWRITE";
})(MergeStrategy = exports.MergeStrategy || (exports.MergeStrategy = {}));
var TerminologyData;
(function (TerminologyData) {
    TerminologyData.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.File && { File: smithy_client_1.SENSITIVE_STRING }),
    });
})(TerminologyData = exports.TerminologyData || (exports.TerminologyData = {}));
var ImportTerminologyRequest;
(function (ImportTerminologyRequest) {
    ImportTerminologyRequest.filterSensitiveLog = (obj) => ({
        ...obj,
        ...(obj.TerminologyData && { TerminologyData: TerminologyData.filterSensitiveLog(obj.TerminologyData) }),
    });
})(ImportTerminologyRequest = exports.ImportTerminologyRequest || (exports.ImportTerminologyRequest = {}));
var ImportTerminologyResponse;
(function (ImportTerminologyResponse) {
    ImportTerminologyResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ImportTerminologyResponse = exports.ImportTerminologyResponse || (exports.ImportTerminologyResponse = {}));
var ListParallelDataRequest;
(function (ListParallelDataRequest) {
    ListParallelDataRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListParallelDataRequest = exports.ListParallelDataRequest || (exports.ListParallelDataRequest = {}));
var ListParallelDataResponse;
(function (ListParallelDataResponse) {
    ListParallelDataResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListParallelDataResponse = exports.ListParallelDataResponse || (exports.ListParallelDataResponse = {}));
var ListTerminologiesRequest;
(function (ListTerminologiesRequest) {
    ListTerminologiesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListTerminologiesRequest = exports.ListTerminologiesRequest || (exports.ListTerminologiesRequest = {}));
var ListTerminologiesResponse;
(function (ListTerminologiesResponse) {
    ListTerminologiesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListTerminologiesResponse = exports.ListTerminologiesResponse || (exports.ListTerminologiesResponse = {}));
var InvalidFilterException;
(function (InvalidFilterException) {
    InvalidFilterException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidFilterException = exports.InvalidFilterException || (exports.InvalidFilterException = {}));
var TextTranslationJobFilter;
(function (TextTranslationJobFilter) {
    TextTranslationJobFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TextTranslationJobFilter = exports.TextTranslationJobFilter || (exports.TextTranslationJobFilter = {}));
var ListTextTranslationJobsRequest;
(function (ListTextTranslationJobsRequest) {
    ListTextTranslationJobsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListTextTranslationJobsRequest = exports.ListTextTranslationJobsRequest || (exports.ListTextTranslationJobsRequest = {}));
var ListTextTranslationJobsResponse;
(function (ListTextTranslationJobsResponse) {
    ListTextTranslationJobsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListTextTranslationJobsResponse = exports.ListTextTranslationJobsResponse || (exports.ListTextTranslationJobsResponse = {}));
var StartTextTranslationJobRequest;
(function (StartTextTranslationJobRequest) {
    StartTextTranslationJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartTextTranslationJobRequest = exports.StartTextTranslationJobRequest || (exports.StartTextTranslationJobRequest = {}));
var StartTextTranslationJobResponse;
(function (StartTextTranslationJobResponse) {
    StartTextTranslationJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartTextTranslationJobResponse = exports.StartTextTranslationJobResponse || (exports.StartTextTranslationJobResponse = {}));
var UnsupportedLanguagePairException;
(function (UnsupportedLanguagePairException) {
    UnsupportedLanguagePairException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UnsupportedLanguagePairException = exports.UnsupportedLanguagePairException || (exports.UnsupportedLanguagePairException = {}));
var StopTextTranslationJobRequest;
(function (StopTextTranslationJobRequest) {
    StopTextTranslationJobRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopTextTranslationJobRequest = exports.StopTextTranslationJobRequest || (exports.StopTextTranslationJobRequest = {}));
var StopTextTranslationJobResponse;
(function (StopTextTranslationJobResponse) {
    StopTextTranslationJobResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopTextTranslationJobResponse = exports.StopTextTranslationJobResponse || (exports.StopTextTranslationJobResponse = {}));
var DetectedLanguageLowConfidenceException;
(function (DetectedLanguageLowConfidenceException) {
    DetectedLanguageLowConfidenceException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectedLanguageLowConfidenceException = exports.DetectedLanguageLowConfidenceException || (exports.DetectedLanguageLowConfidenceException = {}));
var ServiceUnavailableException;
(function (ServiceUnavailableException) {
    ServiceUnavailableException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ServiceUnavailableException = exports.ServiceUnavailableException || (exports.ServiceUnavailableException = {}));
var TextSizeLimitExceededException;
(function (TextSizeLimitExceededException) {
    TextSizeLimitExceededException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TextSizeLimitExceededException = exports.TextSizeLimitExceededException || (exports.TextSizeLimitExceededException = {}));
var TranslateTextRequest;
(function (TranslateTextRequest) {
    TranslateTextRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TranslateTextRequest = exports.TranslateTextRequest || (exports.TranslateTextRequest = {}));
var TranslateTextResponse;
(function (TranslateTextResponse) {
    TranslateTextResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TranslateTextResponse = exports.TranslateTextResponse || (exports.TranslateTextResponse = {}));
var UpdateParallelDataRequest;
(function (UpdateParallelDataRequest) {
    UpdateParallelDataRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateParallelDataRequest = exports.UpdateParallelDataRequest || (exports.UpdateParallelDataRequest = {}));
var UpdateParallelDataResponse;
(function (UpdateParallelDataResponse) {
    UpdateParallelDataResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UpdateParallelDataResponse = exports.UpdateParallelDataResponse || (exports.UpdateParallelDataResponse = {}));
//# sourceMappingURL=models_0.js.map
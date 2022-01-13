"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartDocumentTextDetectionResponse = exports.StartDocumentTextDetectionRequest = exports.StartDocumentAnalysisResponse = exports.StartDocumentAnalysisRequest = exports.OutputConfig = exports.NotificationChannel = exports.LimitExceededException = exports.InvalidKMSKeyException = exports.IdempotentParameterMismatchException = exports.GetDocumentTextDetectionResponse = exports.GetDocumentTextDetectionRequest = exports.InvalidJobIdException = exports.GetDocumentAnalysisResponse = exports.Warning = exports.JobStatus = exports.GetDocumentAnalysisRequest = exports.DocumentLocation = exports.DetectDocumentTextResponse = exports.DetectDocumentTextRequest = exports.UnsupportedDocumentException = exports.ThrottlingException = exports.ProvisionedThroughputExceededException = exports.InvalidS3ObjectException = exports.InvalidParameterException = exports.InternalServerError = exports.HumanLoopQuotaExceededException = exports.DocumentTooLargeException = exports.BadDocumentException = exports.AnalyzeDocumentResponse = exports.HumanLoopActivationOutput = exports.DocumentMetadata = exports.Block = exports.TextType = exports.SelectionStatus = exports.Relationship = exports.RelationshipType = exports.Geometry = exports.Point = exports.BoundingBox = exports.EntityType = exports.BlockType = exports.AnalyzeDocumentRequest = exports.HumanLoopConfig = exports.HumanLoopDataAttributes = exports.ContentClassifier = exports.FeatureType = exports.Document = exports.S3Object = exports.AccessDeniedException = void 0;
var AccessDeniedException;
(function (AccessDeniedException) {
    AccessDeniedException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AccessDeniedException = exports.AccessDeniedException || (exports.AccessDeniedException = {}));
var S3Object;
(function (S3Object) {
    S3Object.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(S3Object = exports.S3Object || (exports.S3Object = {}));
var Document;
(function (Document) {
    Document.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Document = exports.Document || (exports.Document = {}));
var FeatureType;
(function (FeatureType) {
    FeatureType["FORMS"] = "FORMS";
    FeatureType["TABLES"] = "TABLES";
})(FeatureType = exports.FeatureType || (exports.FeatureType = {}));
var ContentClassifier;
(function (ContentClassifier) {
    ContentClassifier["FREE_OF_ADULT_CONTENT"] = "FreeOfAdultContent";
    ContentClassifier["FREE_OF_PERSONALLY_IDENTIFIABLE_INFORMATION"] = "FreeOfPersonallyIdentifiableInformation";
})(ContentClassifier = exports.ContentClassifier || (exports.ContentClassifier = {}));
var HumanLoopDataAttributes;
(function (HumanLoopDataAttributes) {
    HumanLoopDataAttributes.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(HumanLoopDataAttributes = exports.HumanLoopDataAttributes || (exports.HumanLoopDataAttributes = {}));
var HumanLoopConfig;
(function (HumanLoopConfig) {
    HumanLoopConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(HumanLoopConfig = exports.HumanLoopConfig || (exports.HumanLoopConfig = {}));
var AnalyzeDocumentRequest;
(function (AnalyzeDocumentRequest) {
    AnalyzeDocumentRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AnalyzeDocumentRequest = exports.AnalyzeDocumentRequest || (exports.AnalyzeDocumentRequest = {}));
var BlockType;
(function (BlockType) {
    BlockType["CELL"] = "CELL";
    BlockType["KEY_VALUE_SET"] = "KEY_VALUE_SET";
    BlockType["LINE"] = "LINE";
    BlockType["PAGE"] = "PAGE";
    BlockType["SELECTION_ELEMENT"] = "SELECTION_ELEMENT";
    BlockType["TABLE"] = "TABLE";
    BlockType["WORD"] = "WORD";
})(BlockType = exports.BlockType || (exports.BlockType = {}));
var EntityType;
(function (EntityType) {
    EntityType["KEY"] = "KEY";
    EntityType["VALUE"] = "VALUE";
})(EntityType = exports.EntityType || (exports.EntityType = {}));
var BoundingBox;
(function (BoundingBox) {
    BoundingBox.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BoundingBox = exports.BoundingBox || (exports.BoundingBox = {}));
var Point;
(function (Point) {
    Point.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Point = exports.Point || (exports.Point = {}));
var Geometry;
(function (Geometry) {
    Geometry.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Geometry = exports.Geometry || (exports.Geometry = {}));
var RelationshipType;
(function (RelationshipType) {
    RelationshipType["CHILD"] = "CHILD";
    RelationshipType["COMPLEX_FEATURES"] = "COMPLEX_FEATURES";
    RelationshipType["VALUE"] = "VALUE";
})(RelationshipType = exports.RelationshipType || (exports.RelationshipType = {}));
var Relationship;
(function (Relationship) {
    Relationship.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Relationship = exports.Relationship || (exports.Relationship = {}));
var SelectionStatus;
(function (SelectionStatus) {
    SelectionStatus["NOT_SELECTED"] = "NOT_SELECTED";
    SelectionStatus["SELECTED"] = "SELECTED";
})(SelectionStatus = exports.SelectionStatus || (exports.SelectionStatus = {}));
var TextType;
(function (TextType) {
    TextType["HANDWRITING"] = "HANDWRITING";
    TextType["PRINTED"] = "PRINTED";
})(TextType = exports.TextType || (exports.TextType = {}));
var Block;
(function (Block) {
    Block.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Block = exports.Block || (exports.Block = {}));
var DocumentMetadata;
(function (DocumentMetadata) {
    DocumentMetadata.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DocumentMetadata = exports.DocumentMetadata || (exports.DocumentMetadata = {}));
var HumanLoopActivationOutput;
(function (HumanLoopActivationOutput) {
    HumanLoopActivationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(HumanLoopActivationOutput = exports.HumanLoopActivationOutput || (exports.HumanLoopActivationOutput = {}));
var AnalyzeDocumentResponse;
(function (AnalyzeDocumentResponse) {
    AnalyzeDocumentResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AnalyzeDocumentResponse = exports.AnalyzeDocumentResponse || (exports.AnalyzeDocumentResponse = {}));
var BadDocumentException;
(function (BadDocumentException) {
    BadDocumentException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BadDocumentException = exports.BadDocumentException || (exports.BadDocumentException = {}));
var DocumentTooLargeException;
(function (DocumentTooLargeException) {
    DocumentTooLargeException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DocumentTooLargeException = exports.DocumentTooLargeException || (exports.DocumentTooLargeException = {}));
var HumanLoopQuotaExceededException;
(function (HumanLoopQuotaExceededException) {
    HumanLoopQuotaExceededException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(HumanLoopQuotaExceededException = exports.HumanLoopQuotaExceededException || (exports.HumanLoopQuotaExceededException = {}));
var InternalServerError;
(function (InternalServerError) {
    InternalServerError.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InternalServerError = exports.InternalServerError || (exports.InternalServerError = {}));
var InvalidParameterException;
(function (InvalidParameterException) {
    InvalidParameterException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidParameterException = exports.InvalidParameterException || (exports.InvalidParameterException = {}));
var InvalidS3ObjectException;
(function (InvalidS3ObjectException) {
    InvalidS3ObjectException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidS3ObjectException = exports.InvalidS3ObjectException || (exports.InvalidS3ObjectException = {}));
var ProvisionedThroughputExceededException;
(function (ProvisionedThroughputExceededException) {
    ProvisionedThroughputExceededException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ProvisionedThroughputExceededException = exports.ProvisionedThroughputExceededException || (exports.ProvisionedThroughputExceededException = {}));
var ThrottlingException;
(function (ThrottlingException) {
    ThrottlingException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ThrottlingException = exports.ThrottlingException || (exports.ThrottlingException = {}));
var UnsupportedDocumentException;
(function (UnsupportedDocumentException) {
    UnsupportedDocumentException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UnsupportedDocumentException = exports.UnsupportedDocumentException || (exports.UnsupportedDocumentException = {}));
var DetectDocumentTextRequest;
(function (DetectDocumentTextRequest) {
    DetectDocumentTextRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectDocumentTextRequest = exports.DetectDocumentTextRequest || (exports.DetectDocumentTextRequest = {}));
var DetectDocumentTextResponse;
(function (DetectDocumentTextResponse) {
    DetectDocumentTextResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectDocumentTextResponse = exports.DetectDocumentTextResponse || (exports.DetectDocumentTextResponse = {}));
var DocumentLocation;
(function (DocumentLocation) {
    DocumentLocation.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DocumentLocation = exports.DocumentLocation || (exports.DocumentLocation = {}));
var GetDocumentAnalysisRequest;
(function (GetDocumentAnalysisRequest) {
    GetDocumentAnalysisRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetDocumentAnalysisRequest = exports.GetDocumentAnalysisRequest || (exports.GetDocumentAnalysisRequest = {}));
var JobStatus;
(function (JobStatus) {
    JobStatus["FAILED"] = "FAILED";
    JobStatus["IN_PROGRESS"] = "IN_PROGRESS";
    JobStatus["PARTIAL_SUCCESS"] = "PARTIAL_SUCCESS";
    JobStatus["SUCCEEDED"] = "SUCCEEDED";
})(JobStatus = exports.JobStatus || (exports.JobStatus = {}));
var Warning;
(function (Warning) {
    Warning.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Warning = exports.Warning || (exports.Warning = {}));
var GetDocumentAnalysisResponse;
(function (GetDocumentAnalysisResponse) {
    GetDocumentAnalysisResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetDocumentAnalysisResponse = exports.GetDocumentAnalysisResponse || (exports.GetDocumentAnalysisResponse = {}));
var InvalidJobIdException;
(function (InvalidJobIdException) {
    InvalidJobIdException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidJobIdException = exports.InvalidJobIdException || (exports.InvalidJobIdException = {}));
var GetDocumentTextDetectionRequest;
(function (GetDocumentTextDetectionRequest) {
    GetDocumentTextDetectionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetDocumentTextDetectionRequest = exports.GetDocumentTextDetectionRequest || (exports.GetDocumentTextDetectionRequest = {}));
var GetDocumentTextDetectionResponse;
(function (GetDocumentTextDetectionResponse) {
    GetDocumentTextDetectionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetDocumentTextDetectionResponse = exports.GetDocumentTextDetectionResponse || (exports.GetDocumentTextDetectionResponse = {}));
var IdempotentParameterMismatchException;
(function (IdempotentParameterMismatchException) {
    IdempotentParameterMismatchException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IdempotentParameterMismatchException = exports.IdempotentParameterMismatchException || (exports.IdempotentParameterMismatchException = {}));
var InvalidKMSKeyException;
(function (InvalidKMSKeyException) {
    InvalidKMSKeyException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidKMSKeyException = exports.InvalidKMSKeyException || (exports.InvalidKMSKeyException = {}));
var LimitExceededException;
(function (LimitExceededException) {
    LimitExceededException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LimitExceededException = exports.LimitExceededException || (exports.LimitExceededException = {}));
var NotificationChannel;
(function (NotificationChannel) {
    NotificationChannel.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(NotificationChannel = exports.NotificationChannel || (exports.NotificationChannel = {}));
var OutputConfig;
(function (OutputConfig) {
    OutputConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(OutputConfig = exports.OutputConfig || (exports.OutputConfig = {}));
var StartDocumentAnalysisRequest;
(function (StartDocumentAnalysisRequest) {
    StartDocumentAnalysisRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartDocumentAnalysisRequest = exports.StartDocumentAnalysisRequest || (exports.StartDocumentAnalysisRequest = {}));
var StartDocumentAnalysisResponse;
(function (StartDocumentAnalysisResponse) {
    StartDocumentAnalysisResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartDocumentAnalysisResponse = exports.StartDocumentAnalysisResponse || (exports.StartDocumentAnalysisResponse = {}));
var StartDocumentTextDetectionRequest;
(function (StartDocumentTextDetectionRequest) {
    StartDocumentTextDetectionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartDocumentTextDetectionRequest = exports.StartDocumentTextDetectionRequest || (exports.StartDocumentTextDetectionRequest = {}));
var StartDocumentTextDetectionResponse;
(function (StartDocumentTextDetectionResponse) {
    StartDocumentTextDetectionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartDocumentTextDetectionResponse = exports.StartDocumentTextDetectionResponse || (exports.StartDocumentTextDetectionResponse = {}));
//# sourceMappingURL=models_0.js.map
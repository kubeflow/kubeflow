import { __assign } from "tslib";
export var AccessDeniedException;
(function (AccessDeniedException) {
    AccessDeniedException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AccessDeniedException || (AccessDeniedException = {}));
export var S3Object;
(function (S3Object) {
    S3Object.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(S3Object || (S3Object = {}));
export var Document;
(function (Document) {
    Document.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Document || (Document = {}));
export var FeatureType;
(function (FeatureType) {
    FeatureType["FORMS"] = "FORMS";
    FeatureType["TABLES"] = "TABLES";
})(FeatureType || (FeatureType = {}));
export var ContentClassifier;
(function (ContentClassifier) {
    ContentClassifier["FREE_OF_ADULT_CONTENT"] = "FreeOfAdultContent";
    ContentClassifier["FREE_OF_PERSONALLY_IDENTIFIABLE_INFORMATION"] = "FreeOfPersonallyIdentifiableInformation";
})(ContentClassifier || (ContentClassifier = {}));
export var HumanLoopDataAttributes;
(function (HumanLoopDataAttributes) {
    HumanLoopDataAttributes.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(HumanLoopDataAttributes || (HumanLoopDataAttributes = {}));
export var HumanLoopConfig;
(function (HumanLoopConfig) {
    HumanLoopConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(HumanLoopConfig || (HumanLoopConfig = {}));
export var AnalyzeDocumentRequest;
(function (AnalyzeDocumentRequest) {
    AnalyzeDocumentRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AnalyzeDocumentRequest || (AnalyzeDocumentRequest = {}));
export var BlockType;
(function (BlockType) {
    BlockType["CELL"] = "CELL";
    BlockType["KEY_VALUE_SET"] = "KEY_VALUE_SET";
    BlockType["LINE"] = "LINE";
    BlockType["PAGE"] = "PAGE";
    BlockType["SELECTION_ELEMENT"] = "SELECTION_ELEMENT";
    BlockType["TABLE"] = "TABLE";
    BlockType["WORD"] = "WORD";
})(BlockType || (BlockType = {}));
export var EntityType;
(function (EntityType) {
    EntityType["KEY"] = "KEY";
    EntityType["VALUE"] = "VALUE";
})(EntityType || (EntityType = {}));
export var BoundingBox;
(function (BoundingBox) {
    BoundingBox.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(BoundingBox || (BoundingBox = {}));
export var Point;
(function (Point) {
    Point.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Point || (Point = {}));
export var Geometry;
(function (Geometry) {
    Geometry.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Geometry || (Geometry = {}));
export var RelationshipType;
(function (RelationshipType) {
    RelationshipType["CHILD"] = "CHILD";
    RelationshipType["COMPLEX_FEATURES"] = "COMPLEX_FEATURES";
    RelationshipType["VALUE"] = "VALUE";
})(RelationshipType || (RelationshipType = {}));
export var Relationship;
(function (Relationship) {
    Relationship.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Relationship || (Relationship = {}));
export var SelectionStatus;
(function (SelectionStatus) {
    SelectionStatus["NOT_SELECTED"] = "NOT_SELECTED";
    SelectionStatus["SELECTED"] = "SELECTED";
})(SelectionStatus || (SelectionStatus = {}));
export var TextType;
(function (TextType) {
    TextType["HANDWRITING"] = "HANDWRITING";
    TextType["PRINTED"] = "PRINTED";
})(TextType || (TextType = {}));
export var Block;
(function (Block) {
    Block.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Block || (Block = {}));
export var DocumentMetadata;
(function (DocumentMetadata) {
    DocumentMetadata.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DocumentMetadata || (DocumentMetadata = {}));
export var HumanLoopActivationOutput;
(function (HumanLoopActivationOutput) {
    HumanLoopActivationOutput.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(HumanLoopActivationOutput || (HumanLoopActivationOutput = {}));
export var AnalyzeDocumentResponse;
(function (AnalyzeDocumentResponse) {
    AnalyzeDocumentResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(AnalyzeDocumentResponse || (AnalyzeDocumentResponse = {}));
export var BadDocumentException;
(function (BadDocumentException) {
    BadDocumentException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(BadDocumentException || (BadDocumentException = {}));
export var DocumentTooLargeException;
(function (DocumentTooLargeException) {
    DocumentTooLargeException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DocumentTooLargeException || (DocumentTooLargeException = {}));
export var HumanLoopQuotaExceededException;
(function (HumanLoopQuotaExceededException) {
    HumanLoopQuotaExceededException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(HumanLoopQuotaExceededException || (HumanLoopQuotaExceededException = {}));
export var InternalServerError;
(function (InternalServerError) {
    InternalServerError.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InternalServerError || (InternalServerError = {}));
export var InvalidParameterException;
(function (InvalidParameterException) {
    InvalidParameterException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InvalidParameterException || (InvalidParameterException = {}));
export var InvalidS3ObjectException;
(function (InvalidS3ObjectException) {
    InvalidS3ObjectException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InvalidS3ObjectException || (InvalidS3ObjectException = {}));
export var ProvisionedThroughputExceededException;
(function (ProvisionedThroughputExceededException) {
    ProvisionedThroughputExceededException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ProvisionedThroughputExceededException || (ProvisionedThroughputExceededException = {}));
export var ThrottlingException;
(function (ThrottlingException) {
    ThrottlingException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(ThrottlingException || (ThrottlingException = {}));
export var UnsupportedDocumentException;
(function (UnsupportedDocumentException) {
    UnsupportedDocumentException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(UnsupportedDocumentException || (UnsupportedDocumentException = {}));
export var DetectDocumentTextRequest;
(function (DetectDocumentTextRequest) {
    DetectDocumentTextRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DetectDocumentTextRequest || (DetectDocumentTextRequest = {}));
export var DetectDocumentTextResponse;
(function (DetectDocumentTextResponse) {
    DetectDocumentTextResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DetectDocumentTextResponse || (DetectDocumentTextResponse = {}));
export var DocumentLocation;
(function (DocumentLocation) {
    DocumentLocation.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(DocumentLocation || (DocumentLocation = {}));
export var GetDocumentAnalysisRequest;
(function (GetDocumentAnalysisRequest) {
    GetDocumentAnalysisRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetDocumentAnalysisRequest || (GetDocumentAnalysisRequest = {}));
export var JobStatus;
(function (JobStatus) {
    JobStatus["FAILED"] = "FAILED";
    JobStatus["IN_PROGRESS"] = "IN_PROGRESS";
    JobStatus["PARTIAL_SUCCESS"] = "PARTIAL_SUCCESS";
    JobStatus["SUCCEEDED"] = "SUCCEEDED";
})(JobStatus || (JobStatus = {}));
export var Warning;
(function (Warning) {
    Warning.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(Warning || (Warning = {}));
export var GetDocumentAnalysisResponse;
(function (GetDocumentAnalysisResponse) {
    GetDocumentAnalysisResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetDocumentAnalysisResponse || (GetDocumentAnalysisResponse = {}));
export var InvalidJobIdException;
(function (InvalidJobIdException) {
    InvalidJobIdException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InvalidJobIdException || (InvalidJobIdException = {}));
export var GetDocumentTextDetectionRequest;
(function (GetDocumentTextDetectionRequest) {
    GetDocumentTextDetectionRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetDocumentTextDetectionRequest || (GetDocumentTextDetectionRequest = {}));
export var GetDocumentTextDetectionResponse;
(function (GetDocumentTextDetectionResponse) {
    GetDocumentTextDetectionResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(GetDocumentTextDetectionResponse || (GetDocumentTextDetectionResponse = {}));
export var IdempotentParameterMismatchException;
(function (IdempotentParameterMismatchException) {
    IdempotentParameterMismatchException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(IdempotentParameterMismatchException || (IdempotentParameterMismatchException = {}));
export var InvalidKMSKeyException;
(function (InvalidKMSKeyException) {
    InvalidKMSKeyException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(InvalidKMSKeyException || (InvalidKMSKeyException = {}));
export var LimitExceededException;
(function (LimitExceededException) {
    LimitExceededException.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(LimitExceededException || (LimitExceededException = {}));
export var NotificationChannel;
(function (NotificationChannel) {
    NotificationChannel.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(NotificationChannel || (NotificationChannel = {}));
export var OutputConfig;
(function (OutputConfig) {
    OutputConfig.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(OutputConfig || (OutputConfig = {}));
export var StartDocumentAnalysisRequest;
(function (StartDocumentAnalysisRequest) {
    StartDocumentAnalysisRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartDocumentAnalysisRequest || (StartDocumentAnalysisRequest = {}));
export var StartDocumentAnalysisResponse;
(function (StartDocumentAnalysisResponse) {
    StartDocumentAnalysisResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartDocumentAnalysisResponse || (StartDocumentAnalysisResponse = {}));
export var StartDocumentTextDetectionRequest;
(function (StartDocumentTextDetectionRequest) {
    StartDocumentTextDetectionRequest.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartDocumentTextDetectionRequest || (StartDocumentTextDetectionRequest = {}));
export var StartDocumentTextDetectionResponse;
(function (StartDocumentTextDetectionResponse) {
    StartDocumentTextDetectionResponse.filterSensitiveLog = function (obj) { return (__assign({}, obj)); };
})(StartDocumentTextDetectionResponse || (StartDocumentTextDetectionResponse = {}));
//# sourceMappingURL=models_0.js.map
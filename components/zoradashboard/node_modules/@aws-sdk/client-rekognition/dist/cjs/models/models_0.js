"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModerationDetection = exports.ModerationLabel = exports.ContentClassifier = exports.ThrottlingException = exports.ProvisionedThroughputExceededException = exports.InvalidS3ObjectException = exports.InvalidParameterException = exports.InvalidImageFormatException = exports.InternalServerError = exports.ImageTooLargeException = exports.CompareFacesResponse = exports.OrientationCorrection = exports.CompareFacesMatch = exports.CompareFacesRequest = exports.Image = exports.QualityFilter = exports.ComparedSourceImageFace = exports.CelebrityRecognitionSortBy = exports.CelebrityRecognition = exports.CelebrityDetail = exports.FaceDetail = exports.Sunglasses = exports.Smile = exports.Mustache = exports.MouthOpen = exports.Gender = exports.GenderType = exports.EyeOpen = exports.Eyeglasses = exports.Emotion = exports.Celebrity = exports.ComparedFace = exports.ImageQuality = exports.Pose = exports.Landmark = exports.LandmarkType = exports.ProtectiveEquipmentBodyPart = exports.EquipmentDetection = exports.ProtectiveEquipmentType = exports.CoversBodyPart = exports.BoundingBox = exports.BodyPart = exports.Beard = exports.AudioMetadata = exports.Attribute = exports.Asset = exports.GroundTruthManifest = exports.S3Object = exports.AgeRange = exports.AccessDeniedException = void 0;
exports.ProjectVersionDescription = exports.TrainingDataResult = exports.TestingDataResult = exports.ValidationData = exports.EvaluationResult = exports.Summary = exports.DescribeProjectVersionsRequest = exports.InvalidPaginationTokenException = exports.DescribeProjectsResponse = exports.ProjectDescription = exports.DescribeProjectsRequest = exports.DescribeCollectionResponse = exports.DescribeCollectionRequest = exports.DeleteStreamProcessorResponse = exports.DeleteStreamProcessorRequest = exports.DeleteProjectVersionResponse = exports.ProjectVersionStatus = exports.DeleteProjectVersionRequest = exports.DeleteProjectResponse = exports.ProjectStatus = exports.DeleteProjectRequest = exports.DeleteFacesResponse = exports.DeleteFacesRequest = exports.DeleteCollectionResponse = exports.DeleteCollectionRequest = exports.CustomLabel = exports.Geometry = exports.Point = exports.CreateStreamProcessorResponse = exports.CreateStreamProcessorRequest = exports.StreamProcessorSettings = exports.FaceSearchSettings = exports.StreamProcessorOutput = exports.KinesisDataStream = exports.StreamProcessorInput = exports.KinesisVideoStream = exports.ResourceNotFoundException = exports.CreateProjectVersionResponse = exports.CreateProjectVersionRequest = exports.TrainingData = exports.TestingData = exports.OutputConfig = exports.ResourceInUseException = exports.LimitExceededException = exports.CreateProjectResponse = exports.CreateProjectRequest = exports.ResourceAlreadyExistsException = exports.CreateCollectionResponse = exports.CreateCollectionRequest = exports.ContentModerationSortBy = void 0;
exports.PersonDetail = exports.GetFaceSearchRequest = exports.GetFaceDetectionResponse = exports.GetFaceDetectionRequest = exports.GetContentModerationResponse = exports.GetContentModerationRequest = exports.GetCelebrityRecognitionResponse = exports.VideoMetadata = exports.VideoJobStatus = exports.GetCelebrityRecognitionRequest = exports.GetCelebrityInfoResponse = exports.GetCelebrityInfoRequest = exports.FaceSearchSortBy = exports.FaceRecord = exports.FaceMatch = exports.FaceDetection = exports.FaceAttributes = exports.Face = exports.DetectTextResponse = exports.TextDetection = exports.TextTypes = exports.DetectTextRequest = exports.DetectTextFilters = exports.RegionOfInterest = exports.DetectProtectiveEquipmentResponse = exports.ProtectiveEquipmentSummary = exports.ProtectiveEquipmentPerson = exports.DetectProtectiveEquipmentRequest = exports.ProtectiveEquipmentSummarizationAttributes = exports.HumanLoopQuotaExceededException = exports.DetectModerationLabelsResponse = exports.HumanLoopActivationOutput = exports.DetectModerationLabelsRequest = exports.HumanLoopConfig = exports.HumanLoopDataAttributes = exports.DetectLabelsResponse = exports.Label = exports.Parent = exports.Instance = exports.DetectLabelsRequest = exports.DetectionFilter = exports.DetectFacesResponse = exports.DetectFacesRequest = exports.ResourceNotReadyException = exports.DetectCustomLabelsResponse = exports.DetectCustomLabelsRequest = exports.DescribeStreamProcessorResponse = exports.StreamProcessorStatus = exports.DescribeStreamProcessorRequest = exports.DescribeProjectVersionsResponse = void 0;
exports.StartFaceSearchRequest = exports.StartFaceDetectionResponse = exports.StartFaceDetectionRequest = exports.StartContentModerationResponse = exports.StartContentModerationRequest = exports.VideoTooLargeException = exports.StartCelebrityRecognitionResponse = exports.StartCelebrityRecognitionRequest = exports.Video = exports.SearchFacesByImageResponse = exports.SearchFacesByImageRequest = exports.SearchFacesResponse = exports.SearchFacesRequest = exports.RecognizeCelebritiesResponse = exports.RecognizeCelebritiesRequest = exports.NotificationChannel = exports.ListStreamProcessorsResponse = exports.StreamProcessor = exports.ListStreamProcessorsRequest = exports.ListFacesResponse = exports.ListFacesRequest = exports.ListCollectionsResponse = exports.ListCollectionsRequest = exports.ServiceQuotaExceededException = exports.IndexFacesResponse = exports.UnindexedFace = exports.Reason = exports.IndexFacesRequest = exports.IdempotentParameterMismatchException = exports.GetTextDetectionResponse = exports.TextDetectionResult = exports.GetTextDetectionRequest = exports.GetSegmentDetectionResponse = exports.SegmentTypeInfo = exports.SegmentDetection = exports.SegmentType = exports.TechnicalCueSegment = exports.TechnicalCueType = exports.ShotSegment = exports.GetSegmentDetectionRequest = exports.GetPersonTrackingResponse = exports.PersonDetection = exports.GetPersonTrackingRequest = exports.PersonTrackingSortBy = exports.GetLabelDetectionResponse = exports.LabelDetection = exports.GetLabelDetectionRequest = exports.LabelDetectionSortBy = exports.GetFaceSearchResponse = exports.PersonMatch = void 0;
exports.StopStreamProcessorResponse = exports.StopStreamProcessorRequest = exports.StopProjectVersionResponse = exports.StopProjectVersionRequest = exports.StartTextDetectionResponse = exports.StartTextDetectionRequest = exports.StartTextDetectionFilters = exports.StartStreamProcessorResponse = exports.StartStreamProcessorRequest = exports.StartSegmentDetectionResponse = exports.StartSegmentDetectionRequest = exports.StartSegmentDetectionFilters = exports.StartTechnicalCueDetectionFilter = exports.StartShotDetectionFilter = exports.StartProjectVersionResponse = exports.StartProjectVersionRequest = exports.StartPersonTrackingResponse = exports.StartPersonTrackingRequest = exports.StartLabelDetectionResponse = exports.StartLabelDetectionRequest = exports.StartFaceSearchResponse = void 0;
var AccessDeniedException;
(function (AccessDeniedException) {
    AccessDeniedException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AccessDeniedException = exports.AccessDeniedException || (exports.AccessDeniedException = {}));
var AgeRange;
(function (AgeRange) {
    AgeRange.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AgeRange = exports.AgeRange || (exports.AgeRange = {}));
var S3Object;
(function (S3Object) {
    S3Object.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(S3Object = exports.S3Object || (exports.S3Object = {}));
var GroundTruthManifest;
(function (GroundTruthManifest) {
    GroundTruthManifest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GroundTruthManifest = exports.GroundTruthManifest || (exports.GroundTruthManifest = {}));
var Asset;
(function (Asset) {
    Asset.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Asset = exports.Asset || (exports.Asset = {}));
var Attribute;
(function (Attribute) {
    Attribute["ALL"] = "ALL";
    Attribute["DEFAULT"] = "DEFAULT";
})(Attribute = exports.Attribute || (exports.Attribute = {}));
var AudioMetadata;
(function (AudioMetadata) {
    AudioMetadata.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(AudioMetadata = exports.AudioMetadata || (exports.AudioMetadata = {}));
var Beard;
(function (Beard) {
    Beard.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Beard = exports.Beard || (exports.Beard = {}));
var BodyPart;
(function (BodyPart) {
    BodyPart["FACE"] = "FACE";
    BodyPart["HEAD"] = "HEAD";
    BodyPart["LEFT_HAND"] = "LEFT_HAND";
    BodyPart["RIGHT_HAND"] = "RIGHT_HAND";
})(BodyPart = exports.BodyPart || (exports.BodyPart = {}));
var BoundingBox;
(function (BoundingBox) {
    BoundingBox.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(BoundingBox = exports.BoundingBox || (exports.BoundingBox = {}));
var CoversBodyPart;
(function (CoversBodyPart) {
    CoversBodyPart.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CoversBodyPart = exports.CoversBodyPart || (exports.CoversBodyPart = {}));
var ProtectiveEquipmentType;
(function (ProtectiveEquipmentType) {
    ProtectiveEquipmentType["FACE_COVER"] = "FACE_COVER";
    ProtectiveEquipmentType["HAND_COVER"] = "HAND_COVER";
    ProtectiveEquipmentType["HEAD_COVER"] = "HEAD_COVER";
})(ProtectiveEquipmentType = exports.ProtectiveEquipmentType || (exports.ProtectiveEquipmentType = {}));
var EquipmentDetection;
(function (EquipmentDetection) {
    EquipmentDetection.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EquipmentDetection = exports.EquipmentDetection || (exports.EquipmentDetection = {}));
var ProtectiveEquipmentBodyPart;
(function (ProtectiveEquipmentBodyPart) {
    ProtectiveEquipmentBodyPart.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ProtectiveEquipmentBodyPart = exports.ProtectiveEquipmentBodyPart || (exports.ProtectiveEquipmentBodyPart = {}));
var LandmarkType;
(function (LandmarkType) {
    LandmarkType["chinBottom"] = "chinBottom";
    LandmarkType["eyeLeft"] = "eyeLeft";
    LandmarkType["eyeRight"] = "eyeRight";
    LandmarkType["leftEyeBrowLeft"] = "leftEyeBrowLeft";
    LandmarkType["leftEyeBrowRight"] = "leftEyeBrowRight";
    LandmarkType["leftEyeBrowUp"] = "leftEyeBrowUp";
    LandmarkType["leftEyeDown"] = "leftEyeDown";
    LandmarkType["leftEyeLeft"] = "leftEyeLeft";
    LandmarkType["leftEyeRight"] = "leftEyeRight";
    LandmarkType["leftEyeUp"] = "leftEyeUp";
    LandmarkType["leftPupil"] = "leftPupil";
    LandmarkType["midJawlineLeft"] = "midJawlineLeft";
    LandmarkType["midJawlineRight"] = "midJawlineRight";
    LandmarkType["mouthDown"] = "mouthDown";
    LandmarkType["mouthLeft"] = "mouthLeft";
    LandmarkType["mouthRight"] = "mouthRight";
    LandmarkType["mouthUp"] = "mouthUp";
    LandmarkType["nose"] = "nose";
    LandmarkType["noseLeft"] = "noseLeft";
    LandmarkType["noseRight"] = "noseRight";
    LandmarkType["rightEyeBrowLeft"] = "rightEyeBrowLeft";
    LandmarkType["rightEyeBrowRight"] = "rightEyeBrowRight";
    LandmarkType["rightEyeBrowUp"] = "rightEyeBrowUp";
    LandmarkType["rightEyeDown"] = "rightEyeDown";
    LandmarkType["rightEyeLeft"] = "rightEyeLeft";
    LandmarkType["rightEyeRight"] = "rightEyeRight";
    LandmarkType["rightEyeUp"] = "rightEyeUp";
    LandmarkType["rightPupil"] = "rightPupil";
    LandmarkType["upperJawlineLeft"] = "upperJawlineLeft";
    LandmarkType["upperJawlineRight"] = "upperJawlineRight";
})(LandmarkType = exports.LandmarkType || (exports.LandmarkType = {}));
var Landmark;
(function (Landmark) {
    Landmark.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Landmark = exports.Landmark || (exports.Landmark = {}));
var Pose;
(function (Pose) {
    Pose.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Pose = exports.Pose || (exports.Pose = {}));
var ImageQuality;
(function (ImageQuality) {
    ImageQuality.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ImageQuality = exports.ImageQuality || (exports.ImageQuality = {}));
var ComparedFace;
(function (ComparedFace) {
    ComparedFace.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ComparedFace = exports.ComparedFace || (exports.ComparedFace = {}));
var Celebrity;
(function (Celebrity) {
    Celebrity.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Celebrity = exports.Celebrity || (exports.Celebrity = {}));
var Emotion;
(function (Emotion) {
    Emotion.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Emotion = exports.Emotion || (exports.Emotion = {}));
var Eyeglasses;
(function (Eyeglasses) {
    Eyeglasses.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Eyeglasses = exports.Eyeglasses || (exports.Eyeglasses = {}));
var EyeOpen;
(function (EyeOpen) {
    EyeOpen.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EyeOpen = exports.EyeOpen || (exports.EyeOpen = {}));
var GenderType;
(function (GenderType) {
    GenderType["Female"] = "Female";
    GenderType["Male"] = "Male";
})(GenderType = exports.GenderType || (exports.GenderType = {}));
var Gender;
(function (Gender) {
    Gender.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Gender = exports.Gender || (exports.Gender = {}));
var MouthOpen;
(function (MouthOpen) {
    MouthOpen.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(MouthOpen = exports.MouthOpen || (exports.MouthOpen = {}));
var Mustache;
(function (Mustache) {
    Mustache.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Mustache = exports.Mustache || (exports.Mustache = {}));
var Smile;
(function (Smile) {
    Smile.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Smile = exports.Smile || (exports.Smile = {}));
var Sunglasses;
(function (Sunglasses) {
    Sunglasses.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Sunglasses = exports.Sunglasses || (exports.Sunglasses = {}));
var FaceDetail;
(function (FaceDetail) {
    FaceDetail.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(FaceDetail = exports.FaceDetail || (exports.FaceDetail = {}));
var CelebrityDetail;
(function (CelebrityDetail) {
    CelebrityDetail.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CelebrityDetail = exports.CelebrityDetail || (exports.CelebrityDetail = {}));
var CelebrityRecognition;
(function (CelebrityRecognition) {
    CelebrityRecognition.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CelebrityRecognition = exports.CelebrityRecognition || (exports.CelebrityRecognition = {}));
var CelebrityRecognitionSortBy;
(function (CelebrityRecognitionSortBy) {
    CelebrityRecognitionSortBy["ID"] = "ID";
    CelebrityRecognitionSortBy["TIMESTAMP"] = "TIMESTAMP";
})(CelebrityRecognitionSortBy = exports.CelebrityRecognitionSortBy || (exports.CelebrityRecognitionSortBy = {}));
var ComparedSourceImageFace;
(function (ComparedSourceImageFace) {
    ComparedSourceImageFace.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ComparedSourceImageFace = exports.ComparedSourceImageFace || (exports.ComparedSourceImageFace = {}));
var QualityFilter;
(function (QualityFilter) {
    QualityFilter["AUTO"] = "AUTO";
    QualityFilter["HIGH"] = "HIGH";
    QualityFilter["LOW"] = "LOW";
    QualityFilter["MEDIUM"] = "MEDIUM";
    QualityFilter["NONE"] = "NONE";
})(QualityFilter = exports.QualityFilter || (exports.QualityFilter = {}));
var Image;
(function (Image) {
    Image.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Image = exports.Image || (exports.Image = {}));
var CompareFacesRequest;
(function (CompareFacesRequest) {
    CompareFacesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CompareFacesRequest = exports.CompareFacesRequest || (exports.CompareFacesRequest = {}));
var CompareFacesMatch;
(function (CompareFacesMatch) {
    CompareFacesMatch.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CompareFacesMatch = exports.CompareFacesMatch || (exports.CompareFacesMatch = {}));
var OrientationCorrection;
(function (OrientationCorrection) {
    OrientationCorrection["ROTATE_0"] = "ROTATE_0";
    OrientationCorrection["ROTATE_180"] = "ROTATE_180";
    OrientationCorrection["ROTATE_270"] = "ROTATE_270";
    OrientationCorrection["ROTATE_90"] = "ROTATE_90";
})(OrientationCorrection = exports.OrientationCorrection || (exports.OrientationCorrection = {}));
var CompareFacesResponse;
(function (CompareFacesResponse) {
    CompareFacesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CompareFacesResponse = exports.CompareFacesResponse || (exports.CompareFacesResponse = {}));
var ImageTooLargeException;
(function (ImageTooLargeException) {
    ImageTooLargeException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ImageTooLargeException = exports.ImageTooLargeException || (exports.ImageTooLargeException = {}));
var InternalServerError;
(function (InternalServerError) {
    InternalServerError.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InternalServerError = exports.InternalServerError || (exports.InternalServerError = {}));
var InvalidImageFormatException;
(function (InvalidImageFormatException) {
    InvalidImageFormatException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidImageFormatException = exports.InvalidImageFormatException || (exports.InvalidImageFormatException = {}));
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
var ContentClassifier;
(function (ContentClassifier) {
    ContentClassifier["FREE_OF_ADULT_CONTENT"] = "FreeOfAdultContent";
    ContentClassifier["FREE_OF_PERSONALLY_IDENTIFIABLE_INFORMATION"] = "FreeOfPersonallyIdentifiableInformation";
})(ContentClassifier = exports.ContentClassifier || (exports.ContentClassifier = {}));
var ModerationLabel;
(function (ModerationLabel) {
    ModerationLabel.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ModerationLabel = exports.ModerationLabel || (exports.ModerationLabel = {}));
var ContentModerationDetection;
(function (ContentModerationDetection) {
    ContentModerationDetection.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ContentModerationDetection = exports.ContentModerationDetection || (exports.ContentModerationDetection = {}));
var ContentModerationSortBy;
(function (ContentModerationSortBy) {
    ContentModerationSortBy["NAME"] = "NAME";
    ContentModerationSortBy["TIMESTAMP"] = "TIMESTAMP";
})(ContentModerationSortBy = exports.ContentModerationSortBy || (exports.ContentModerationSortBy = {}));
var CreateCollectionRequest;
(function (CreateCollectionRequest) {
    CreateCollectionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateCollectionRequest = exports.CreateCollectionRequest || (exports.CreateCollectionRequest = {}));
var CreateCollectionResponse;
(function (CreateCollectionResponse) {
    CreateCollectionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateCollectionResponse = exports.CreateCollectionResponse || (exports.CreateCollectionResponse = {}));
var ResourceAlreadyExistsException;
(function (ResourceAlreadyExistsException) {
    ResourceAlreadyExistsException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResourceAlreadyExistsException = exports.ResourceAlreadyExistsException || (exports.ResourceAlreadyExistsException = {}));
var CreateProjectRequest;
(function (CreateProjectRequest) {
    CreateProjectRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateProjectRequest = exports.CreateProjectRequest || (exports.CreateProjectRequest = {}));
var CreateProjectResponse;
(function (CreateProjectResponse) {
    CreateProjectResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateProjectResponse = exports.CreateProjectResponse || (exports.CreateProjectResponse = {}));
var LimitExceededException;
(function (LimitExceededException) {
    LimitExceededException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LimitExceededException = exports.LimitExceededException || (exports.LimitExceededException = {}));
var ResourceInUseException;
(function (ResourceInUseException) {
    ResourceInUseException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResourceInUseException = exports.ResourceInUseException || (exports.ResourceInUseException = {}));
var OutputConfig;
(function (OutputConfig) {
    OutputConfig.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(OutputConfig = exports.OutputConfig || (exports.OutputConfig = {}));
var TestingData;
(function (TestingData) {
    TestingData.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TestingData = exports.TestingData || (exports.TestingData = {}));
var TrainingData;
(function (TrainingData) {
    TrainingData.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TrainingData = exports.TrainingData || (exports.TrainingData = {}));
var CreateProjectVersionRequest;
(function (CreateProjectVersionRequest) {
    CreateProjectVersionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateProjectVersionRequest = exports.CreateProjectVersionRequest || (exports.CreateProjectVersionRequest = {}));
var CreateProjectVersionResponse;
(function (CreateProjectVersionResponse) {
    CreateProjectVersionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateProjectVersionResponse = exports.CreateProjectVersionResponse || (exports.CreateProjectVersionResponse = {}));
var ResourceNotFoundException;
(function (ResourceNotFoundException) {
    ResourceNotFoundException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResourceNotFoundException = exports.ResourceNotFoundException || (exports.ResourceNotFoundException = {}));
var KinesisVideoStream;
(function (KinesisVideoStream) {
    KinesisVideoStream.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KinesisVideoStream = exports.KinesisVideoStream || (exports.KinesisVideoStream = {}));
var StreamProcessorInput;
(function (StreamProcessorInput) {
    StreamProcessorInput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StreamProcessorInput = exports.StreamProcessorInput || (exports.StreamProcessorInput = {}));
var KinesisDataStream;
(function (KinesisDataStream) {
    KinesisDataStream.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(KinesisDataStream = exports.KinesisDataStream || (exports.KinesisDataStream = {}));
var StreamProcessorOutput;
(function (StreamProcessorOutput) {
    StreamProcessorOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StreamProcessorOutput = exports.StreamProcessorOutput || (exports.StreamProcessorOutput = {}));
var FaceSearchSettings;
(function (FaceSearchSettings) {
    FaceSearchSettings.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(FaceSearchSettings = exports.FaceSearchSettings || (exports.FaceSearchSettings = {}));
var StreamProcessorSettings;
(function (StreamProcessorSettings) {
    StreamProcessorSettings.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StreamProcessorSettings = exports.StreamProcessorSettings || (exports.StreamProcessorSettings = {}));
var CreateStreamProcessorRequest;
(function (CreateStreamProcessorRequest) {
    CreateStreamProcessorRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateStreamProcessorRequest = exports.CreateStreamProcessorRequest || (exports.CreateStreamProcessorRequest = {}));
var CreateStreamProcessorResponse;
(function (CreateStreamProcessorResponse) {
    CreateStreamProcessorResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CreateStreamProcessorResponse = exports.CreateStreamProcessorResponse || (exports.CreateStreamProcessorResponse = {}));
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
var CustomLabel;
(function (CustomLabel) {
    CustomLabel.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(CustomLabel = exports.CustomLabel || (exports.CustomLabel = {}));
var DeleteCollectionRequest;
(function (DeleteCollectionRequest) {
    DeleteCollectionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteCollectionRequest = exports.DeleteCollectionRequest || (exports.DeleteCollectionRequest = {}));
var DeleteCollectionResponse;
(function (DeleteCollectionResponse) {
    DeleteCollectionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteCollectionResponse = exports.DeleteCollectionResponse || (exports.DeleteCollectionResponse = {}));
var DeleteFacesRequest;
(function (DeleteFacesRequest) {
    DeleteFacesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteFacesRequest = exports.DeleteFacesRequest || (exports.DeleteFacesRequest = {}));
var DeleteFacesResponse;
(function (DeleteFacesResponse) {
    DeleteFacesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteFacesResponse = exports.DeleteFacesResponse || (exports.DeleteFacesResponse = {}));
var DeleteProjectRequest;
(function (DeleteProjectRequest) {
    DeleteProjectRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteProjectRequest = exports.DeleteProjectRequest || (exports.DeleteProjectRequest = {}));
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["CREATED"] = "CREATED";
    ProjectStatus["CREATING"] = "CREATING";
    ProjectStatus["DELETING"] = "DELETING";
})(ProjectStatus = exports.ProjectStatus || (exports.ProjectStatus = {}));
var DeleteProjectResponse;
(function (DeleteProjectResponse) {
    DeleteProjectResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteProjectResponse = exports.DeleteProjectResponse || (exports.DeleteProjectResponse = {}));
var DeleteProjectVersionRequest;
(function (DeleteProjectVersionRequest) {
    DeleteProjectVersionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteProjectVersionRequest = exports.DeleteProjectVersionRequest || (exports.DeleteProjectVersionRequest = {}));
var ProjectVersionStatus;
(function (ProjectVersionStatus) {
    ProjectVersionStatus["DELETING"] = "DELETING";
    ProjectVersionStatus["FAILED"] = "FAILED";
    ProjectVersionStatus["RUNNING"] = "RUNNING";
    ProjectVersionStatus["STARTING"] = "STARTING";
    ProjectVersionStatus["STOPPED"] = "STOPPED";
    ProjectVersionStatus["STOPPING"] = "STOPPING";
    ProjectVersionStatus["TRAINING_COMPLETED"] = "TRAINING_COMPLETED";
    ProjectVersionStatus["TRAINING_FAILED"] = "TRAINING_FAILED";
    ProjectVersionStatus["TRAINING_IN_PROGRESS"] = "TRAINING_IN_PROGRESS";
})(ProjectVersionStatus = exports.ProjectVersionStatus || (exports.ProjectVersionStatus = {}));
var DeleteProjectVersionResponse;
(function (DeleteProjectVersionResponse) {
    DeleteProjectVersionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteProjectVersionResponse = exports.DeleteProjectVersionResponse || (exports.DeleteProjectVersionResponse = {}));
var DeleteStreamProcessorRequest;
(function (DeleteStreamProcessorRequest) {
    DeleteStreamProcessorRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteStreamProcessorRequest = exports.DeleteStreamProcessorRequest || (exports.DeleteStreamProcessorRequest = {}));
var DeleteStreamProcessorResponse;
(function (DeleteStreamProcessorResponse) {
    DeleteStreamProcessorResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DeleteStreamProcessorResponse = exports.DeleteStreamProcessorResponse || (exports.DeleteStreamProcessorResponse = {}));
var DescribeCollectionRequest;
(function (DescribeCollectionRequest) {
    DescribeCollectionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeCollectionRequest = exports.DescribeCollectionRequest || (exports.DescribeCollectionRequest = {}));
var DescribeCollectionResponse;
(function (DescribeCollectionResponse) {
    DescribeCollectionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeCollectionResponse = exports.DescribeCollectionResponse || (exports.DescribeCollectionResponse = {}));
var DescribeProjectsRequest;
(function (DescribeProjectsRequest) {
    DescribeProjectsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeProjectsRequest = exports.DescribeProjectsRequest || (exports.DescribeProjectsRequest = {}));
var ProjectDescription;
(function (ProjectDescription) {
    ProjectDescription.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ProjectDescription = exports.ProjectDescription || (exports.ProjectDescription = {}));
var DescribeProjectsResponse;
(function (DescribeProjectsResponse) {
    DescribeProjectsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeProjectsResponse = exports.DescribeProjectsResponse || (exports.DescribeProjectsResponse = {}));
var InvalidPaginationTokenException;
(function (InvalidPaginationTokenException) {
    InvalidPaginationTokenException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(InvalidPaginationTokenException = exports.InvalidPaginationTokenException || (exports.InvalidPaginationTokenException = {}));
var DescribeProjectVersionsRequest;
(function (DescribeProjectVersionsRequest) {
    DescribeProjectVersionsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeProjectVersionsRequest = exports.DescribeProjectVersionsRequest || (exports.DescribeProjectVersionsRequest = {}));
var Summary;
(function (Summary) {
    Summary.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Summary = exports.Summary || (exports.Summary = {}));
var EvaluationResult;
(function (EvaluationResult) {
    EvaluationResult.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(EvaluationResult = exports.EvaluationResult || (exports.EvaluationResult = {}));
var ValidationData;
(function (ValidationData) {
    ValidationData.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ValidationData = exports.ValidationData || (exports.ValidationData = {}));
var TestingDataResult;
(function (TestingDataResult) {
    TestingDataResult.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TestingDataResult = exports.TestingDataResult || (exports.TestingDataResult = {}));
var TrainingDataResult;
(function (TrainingDataResult) {
    TrainingDataResult.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TrainingDataResult = exports.TrainingDataResult || (exports.TrainingDataResult = {}));
var ProjectVersionDescription;
(function (ProjectVersionDescription) {
    ProjectVersionDescription.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ProjectVersionDescription = exports.ProjectVersionDescription || (exports.ProjectVersionDescription = {}));
var DescribeProjectVersionsResponse;
(function (DescribeProjectVersionsResponse) {
    DescribeProjectVersionsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeProjectVersionsResponse = exports.DescribeProjectVersionsResponse || (exports.DescribeProjectVersionsResponse = {}));
var DescribeStreamProcessorRequest;
(function (DescribeStreamProcessorRequest) {
    DescribeStreamProcessorRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeStreamProcessorRequest = exports.DescribeStreamProcessorRequest || (exports.DescribeStreamProcessorRequest = {}));
var StreamProcessorStatus;
(function (StreamProcessorStatus) {
    StreamProcessorStatus["FAILED"] = "FAILED";
    StreamProcessorStatus["RUNNING"] = "RUNNING";
    StreamProcessorStatus["STARTING"] = "STARTING";
    StreamProcessorStatus["STOPPED"] = "STOPPED";
    StreamProcessorStatus["STOPPING"] = "STOPPING";
})(StreamProcessorStatus = exports.StreamProcessorStatus || (exports.StreamProcessorStatus = {}));
var DescribeStreamProcessorResponse;
(function (DescribeStreamProcessorResponse) {
    DescribeStreamProcessorResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DescribeStreamProcessorResponse = exports.DescribeStreamProcessorResponse || (exports.DescribeStreamProcessorResponse = {}));
var DetectCustomLabelsRequest;
(function (DetectCustomLabelsRequest) {
    DetectCustomLabelsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectCustomLabelsRequest = exports.DetectCustomLabelsRequest || (exports.DetectCustomLabelsRequest = {}));
var DetectCustomLabelsResponse;
(function (DetectCustomLabelsResponse) {
    DetectCustomLabelsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectCustomLabelsResponse = exports.DetectCustomLabelsResponse || (exports.DetectCustomLabelsResponse = {}));
var ResourceNotReadyException;
(function (ResourceNotReadyException) {
    ResourceNotReadyException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ResourceNotReadyException = exports.ResourceNotReadyException || (exports.ResourceNotReadyException = {}));
var DetectFacesRequest;
(function (DetectFacesRequest) {
    DetectFacesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectFacesRequest = exports.DetectFacesRequest || (exports.DetectFacesRequest = {}));
var DetectFacesResponse;
(function (DetectFacesResponse) {
    DetectFacesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectFacesResponse = exports.DetectFacesResponse || (exports.DetectFacesResponse = {}));
var DetectionFilter;
(function (DetectionFilter) {
    DetectionFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectionFilter = exports.DetectionFilter || (exports.DetectionFilter = {}));
var DetectLabelsRequest;
(function (DetectLabelsRequest) {
    DetectLabelsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectLabelsRequest = exports.DetectLabelsRequest || (exports.DetectLabelsRequest = {}));
var Instance;
(function (Instance) {
    Instance.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Instance = exports.Instance || (exports.Instance = {}));
var Parent;
(function (Parent) {
    Parent.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Parent = exports.Parent || (exports.Parent = {}));
var Label;
(function (Label) {
    Label.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Label = exports.Label || (exports.Label = {}));
var DetectLabelsResponse;
(function (DetectLabelsResponse) {
    DetectLabelsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectLabelsResponse = exports.DetectLabelsResponse || (exports.DetectLabelsResponse = {}));
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
var DetectModerationLabelsRequest;
(function (DetectModerationLabelsRequest) {
    DetectModerationLabelsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectModerationLabelsRequest = exports.DetectModerationLabelsRequest || (exports.DetectModerationLabelsRequest = {}));
var HumanLoopActivationOutput;
(function (HumanLoopActivationOutput) {
    HumanLoopActivationOutput.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(HumanLoopActivationOutput = exports.HumanLoopActivationOutput || (exports.HumanLoopActivationOutput = {}));
var DetectModerationLabelsResponse;
(function (DetectModerationLabelsResponse) {
    DetectModerationLabelsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectModerationLabelsResponse = exports.DetectModerationLabelsResponse || (exports.DetectModerationLabelsResponse = {}));
var HumanLoopQuotaExceededException;
(function (HumanLoopQuotaExceededException) {
    HumanLoopQuotaExceededException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(HumanLoopQuotaExceededException = exports.HumanLoopQuotaExceededException || (exports.HumanLoopQuotaExceededException = {}));
var ProtectiveEquipmentSummarizationAttributes;
(function (ProtectiveEquipmentSummarizationAttributes) {
    ProtectiveEquipmentSummarizationAttributes.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ProtectiveEquipmentSummarizationAttributes = exports.ProtectiveEquipmentSummarizationAttributes || (exports.ProtectiveEquipmentSummarizationAttributes = {}));
var DetectProtectiveEquipmentRequest;
(function (DetectProtectiveEquipmentRequest) {
    DetectProtectiveEquipmentRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectProtectiveEquipmentRequest = exports.DetectProtectiveEquipmentRequest || (exports.DetectProtectiveEquipmentRequest = {}));
var ProtectiveEquipmentPerson;
(function (ProtectiveEquipmentPerson) {
    ProtectiveEquipmentPerson.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ProtectiveEquipmentPerson = exports.ProtectiveEquipmentPerson || (exports.ProtectiveEquipmentPerson = {}));
var ProtectiveEquipmentSummary;
(function (ProtectiveEquipmentSummary) {
    ProtectiveEquipmentSummary.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ProtectiveEquipmentSummary = exports.ProtectiveEquipmentSummary || (exports.ProtectiveEquipmentSummary = {}));
var DetectProtectiveEquipmentResponse;
(function (DetectProtectiveEquipmentResponse) {
    DetectProtectiveEquipmentResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectProtectiveEquipmentResponse = exports.DetectProtectiveEquipmentResponse || (exports.DetectProtectiveEquipmentResponse = {}));
var RegionOfInterest;
(function (RegionOfInterest) {
    RegionOfInterest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RegionOfInterest = exports.RegionOfInterest || (exports.RegionOfInterest = {}));
var DetectTextFilters;
(function (DetectTextFilters) {
    DetectTextFilters.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectTextFilters = exports.DetectTextFilters || (exports.DetectTextFilters = {}));
var DetectTextRequest;
(function (DetectTextRequest) {
    DetectTextRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectTextRequest = exports.DetectTextRequest || (exports.DetectTextRequest = {}));
var TextTypes;
(function (TextTypes) {
    TextTypes["LINE"] = "LINE";
    TextTypes["WORD"] = "WORD";
})(TextTypes = exports.TextTypes || (exports.TextTypes = {}));
var TextDetection;
(function (TextDetection) {
    TextDetection.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TextDetection = exports.TextDetection || (exports.TextDetection = {}));
var DetectTextResponse;
(function (DetectTextResponse) {
    DetectTextResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(DetectTextResponse = exports.DetectTextResponse || (exports.DetectTextResponse = {}));
var Face;
(function (Face) {
    Face.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Face = exports.Face || (exports.Face = {}));
var FaceAttributes;
(function (FaceAttributes) {
    FaceAttributes["ALL"] = "ALL";
    FaceAttributes["DEFAULT"] = "DEFAULT";
})(FaceAttributes = exports.FaceAttributes || (exports.FaceAttributes = {}));
var FaceDetection;
(function (FaceDetection) {
    FaceDetection.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(FaceDetection = exports.FaceDetection || (exports.FaceDetection = {}));
var FaceMatch;
(function (FaceMatch) {
    FaceMatch.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(FaceMatch = exports.FaceMatch || (exports.FaceMatch = {}));
var FaceRecord;
(function (FaceRecord) {
    FaceRecord.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(FaceRecord = exports.FaceRecord || (exports.FaceRecord = {}));
var FaceSearchSortBy;
(function (FaceSearchSortBy) {
    FaceSearchSortBy["INDEX"] = "INDEX";
    FaceSearchSortBy["TIMESTAMP"] = "TIMESTAMP";
})(FaceSearchSortBy = exports.FaceSearchSortBy || (exports.FaceSearchSortBy = {}));
var GetCelebrityInfoRequest;
(function (GetCelebrityInfoRequest) {
    GetCelebrityInfoRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetCelebrityInfoRequest = exports.GetCelebrityInfoRequest || (exports.GetCelebrityInfoRequest = {}));
var GetCelebrityInfoResponse;
(function (GetCelebrityInfoResponse) {
    GetCelebrityInfoResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetCelebrityInfoResponse = exports.GetCelebrityInfoResponse || (exports.GetCelebrityInfoResponse = {}));
var GetCelebrityRecognitionRequest;
(function (GetCelebrityRecognitionRequest) {
    GetCelebrityRecognitionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetCelebrityRecognitionRequest = exports.GetCelebrityRecognitionRequest || (exports.GetCelebrityRecognitionRequest = {}));
var VideoJobStatus;
(function (VideoJobStatus) {
    VideoJobStatus["FAILED"] = "FAILED";
    VideoJobStatus["IN_PROGRESS"] = "IN_PROGRESS";
    VideoJobStatus["SUCCEEDED"] = "SUCCEEDED";
})(VideoJobStatus = exports.VideoJobStatus || (exports.VideoJobStatus = {}));
var VideoMetadata;
(function (VideoMetadata) {
    VideoMetadata.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(VideoMetadata = exports.VideoMetadata || (exports.VideoMetadata = {}));
var GetCelebrityRecognitionResponse;
(function (GetCelebrityRecognitionResponse) {
    GetCelebrityRecognitionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetCelebrityRecognitionResponse = exports.GetCelebrityRecognitionResponse || (exports.GetCelebrityRecognitionResponse = {}));
var GetContentModerationRequest;
(function (GetContentModerationRequest) {
    GetContentModerationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetContentModerationRequest = exports.GetContentModerationRequest || (exports.GetContentModerationRequest = {}));
var GetContentModerationResponse;
(function (GetContentModerationResponse) {
    GetContentModerationResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetContentModerationResponse = exports.GetContentModerationResponse || (exports.GetContentModerationResponse = {}));
var GetFaceDetectionRequest;
(function (GetFaceDetectionRequest) {
    GetFaceDetectionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetFaceDetectionRequest = exports.GetFaceDetectionRequest || (exports.GetFaceDetectionRequest = {}));
var GetFaceDetectionResponse;
(function (GetFaceDetectionResponse) {
    GetFaceDetectionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetFaceDetectionResponse = exports.GetFaceDetectionResponse || (exports.GetFaceDetectionResponse = {}));
var GetFaceSearchRequest;
(function (GetFaceSearchRequest) {
    GetFaceSearchRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetFaceSearchRequest = exports.GetFaceSearchRequest || (exports.GetFaceSearchRequest = {}));
var PersonDetail;
(function (PersonDetail) {
    PersonDetail.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PersonDetail = exports.PersonDetail || (exports.PersonDetail = {}));
var PersonMatch;
(function (PersonMatch) {
    PersonMatch.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PersonMatch = exports.PersonMatch || (exports.PersonMatch = {}));
var GetFaceSearchResponse;
(function (GetFaceSearchResponse) {
    GetFaceSearchResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetFaceSearchResponse = exports.GetFaceSearchResponse || (exports.GetFaceSearchResponse = {}));
var LabelDetectionSortBy;
(function (LabelDetectionSortBy) {
    LabelDetectionSortBy["NAME"] = "NAME";
    LabelDetectionSortBy["TIMESTAMP"] = "TIMESTAMP";
})(LabelDetectionSortBy = exports.LabelDetectionSortBy || (exports.LabelDetectionSortBy = {}));
var GetLabelDetectionRequest;
(function (GetLabelDetectionRequest) {
    GetLabelDetectionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetLabelDetectionRequest = exports.GetLabelDetectionRequest || (exports.GetLabelDetectionRequest = {}));
var LabelDetection;
(function (LabelDetection) {
    LabelDetection.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(LabelDetection = exports.LabelDetection || (exports.LabelDetection = {}));
var GetLabelDetectionResponse;
(function (GetLabelDetectionResponse) {
    GetLabelDetectionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetLabelDetectionResponse = exports.GetLabelDetectionResponse || (exports.GetLabelDetectionResponse = {}));
var PersonTrackingSortBy;
(function (PersonTrackingSortBy) {
    PersonTrackingSortBy["INDEX"] = "INDEX";
    PersonTrackingSortBy["TIMESTAMP"] = "TIMESTAMP";
})(PersonTrackingSortBy = exports.PersonTrackingSortBy || (exports.PersonTrackingSortBy = {}));
var GetPersonTrackingRequest;
(function (GetPersonTrackingRequest) {
    GetPersonTrackingRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetPersonTrackingRequest = exports.GetPersonTrackingRequest || (exports.GetPersonTrackingRequest = {}));
var PersonDetection;
(function (PersonDetection) {
    PersonDetection.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(PersonDetection = exports.PersonDetection || (exports.PersonDetection = {}));
var GetPersonTrackingResponse;
(function (GetPersonTrackingResponse) {
    GetPersonTrackingResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetPersonTrackingResponse = exports.GetPersonTrackingResponse || (exports.GetPersonTrackingResponse = {}));
var GetSegmentDetectionRequest;
(function (GetSegmentDetectionRequest) {
    GetSegmentDetectionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetSegmentDetectionRequest = exports.GetSegmentDetectionRequest || (exports.GetSegmentDetectionRequest = {}));
var ShotSegment;
(function (ShotSegment) {
    ShotSegment.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ShotSegment = exports.ShotSegment || (exports.ShotSegment = {}));
var TechnicalCueType;
(function (TechnicalCueType) {
    TechnicalCueType["BLACK_FRAMES"] = "BlackFrames";
    TechnicalCueType["COLOR_BARS"] = "ColorBars";
    TechnicalCueType["END_CREDITS"] = "EndCredits";
})(TechnicalCueType = exports.TechnicalCueType || (exports.TechnicalCueType = {}));
var TechnicalCueSegment;
(function (TechnicalCueSegment) {
    TechnicalCueSegment.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TechnicalCueSegment = exports.TechnicalCueSegment || (exports.TechnicalCueSegment = {}));
var SegmentType;
(function (SegmentType) {
    SegmentType["SHOT"] = "SHOT";
    SegmentType["TECHNICAL_CUE"] = "TECHNICAL_CUE";
})(SegmentType = exports.SegmentType || (exports.SegmentType = {}));
var SegmentDetection;
(function (SegmentDetection) {
    SegmentDetection.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SegmentDetection = exports.SegmentDetection || (exports.SegmentDetection = {}));
var SegmentTypeInfo;
(function (SegmentTypeInfo) {
    SegmentTypeInfo.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SegmentTypeInfo = exports.SegmentTypeInfo || (exports.SegmentTypeInfo = {}));
var GetSegmentDetectionResponse;
(function (GetSegmentDetectionResponse) {
    GetSegmentDetectionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetSegmentDetectionResponse = exports.GetSegmentDetectionResponse || (exports.GetSegmentDetectionResponse = {}));
var GetTextDetectionRequest;
(function (GetTextDetectionRequest) {
    GetTextDetectionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetTextDetectionRequest = exports.GetTextDetectionRequest || (exports.GetTextDetectionRequest = {}));
var TextDetectionResult;
(function (TextDetectionResult) {
    TextDetectionResult.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(TextDetectionResult = exports.TextDetectionResult || (exports.TextDetectionResult = {}));
var GetTextDetectionResponse;
(function (GetTextDetectionResponse) {
    GetTextDetectionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(GetTextDetectionResponse = exports.GetTextDetectionResponse || (exports.GetTextDetectionResponse = {}));
var IdempotentParameterMismatchException;
(function (IdempotentParameterMismatchException) {
    IdempotentParameterMismatchException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IdempotentParameterMismatchException = exports.IdempotentParameterMismatchException || (exports.IdempotentParameterMismatchException = {}));
var IndexFacesRequest;
(function (IndexFacesRequest) {
    IndexFacesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IndexFacesRequest = exports.IndexFacesRequest || (exports.IndexFacesRequest = {}));
var Reason;
(function (Reason) {
    Reason["EXCEEDS_MAX_FACES"] = "EXCEEDS_MAX_FACES";
    Reason["EXTREME_POSE"] = "EXTREME_POSE";
    Reason["LOW_BRIGHTNESS"] = "LOW_BRIGHTNESS";
    Reason["LOW_CONFIDENCE"] = "LOW_CONFIDENCE";
    Reason["LOW_FACE_QUALITY"] = "LOW_FACE_QUALITY";
    Reason["LOW_SHARPNESS"] = "LOW_SHARPNESS";
    Reason["SMALL_BOUNDING_BOX"] = "SMALL_BOUNDING_BOX";
})(Reason = exports.Reason || (exports.Reason = {}));
var UnindexedFace;
(function (UnindexedFace) {
    UnindexedFace.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(UnindexedFace = exports.UnindexedFace || (exports.UnindexedFace = {}));
var IndexFacesResponse;
(function (IndexFacesResponse) {
    IndexFacesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(IndexFacesResponse = exports.IndexFacesResponse || (exports.IndexFacesResponse = {}));
var ServiceQuotaExceededException;
(function (ServiceQuotaExceededException) {
    ServiceQuotaExceededException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ServiceQuotaExceededException = exports.ServiceQuotaExceededException || (exports.ServiceQuotaExceededException = {}));
var ListCollectionsRequest;
(function (ListCollectionsRequest) {
    ListCollectionsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListCollectionsRequest = exports.ListCollectionsRequest || (exports.ListCollectionsRequest = {}));
var ListCollectionsResponse;
(function (ListCollectionsResponse) {
    ListCollectionsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListCollectionsResponse = exports.ListCollectionsResponse || (exports.ListCollectionsResponse = {}));
var ListFacesRequest;
(function (ListFacesRequest) {
    ListFacesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListFacesRequest = exports.ListFacesRequest || (exports.ListFacesRequest = {}));
var ListFacesResponse;
(function (ListFacesResponse) {
    ListFacesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListFacesResponse = exports.ListFacesResponse || (exports.ListFacesResponse = {}));
var ListStreamProcessorsRequest;
(function (ListStreamProcessorsRequest) {
    ListStreamProcessorsRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListStreamProcessorsRequest = exports.ListStreamProcessorsRequest || (exports.ListStreamProcessorsRequest = {}));
var StreamProcessor;
(function (StreamProcessor) {
    StreamProcessor.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StreamProcessor = exports.StreamProcessor || (exports.StreamProcessor = {}));
var ListStreamProcessorsResponse;
(function (ListStreamProcessorsResponse) {
    ListStreamProcessorsResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(ListStreamProcessorsResponse = exports.ListStreamProcessorsResponse || (exports.ListStreamProcessorsResponse = {}));
var NotificationChannel;
(function (NotificationChannel) {
    NotificationChannel.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(NotificationChannel = exports.NotificationChannel || (exports.NotificationChannel = {}));
var RecognizeCelebritiesRequest;
(function (RecognizeCelebritiesRequest) {
    RecognizeCelebritiesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RecognizeCelebritiesRequest = exports.RecognizeCelebritiesRequest || (exports.RecognizeCelebritiesRequest = {}));
var RecognizeCelebritiesResponse;
(function (RecognizeCelebritiesResponse) {
    RecognizeCelebritiesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(RecognizeCelebritiesResponse = exports.RecognizeCelebritiesResponse || (exports.RecognizeCelebritiesResponse = {}));
var SearchFacesRequest;
(function (SearchFacesRequest) {
    SearchFacesRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SearchFacesRequest = exports.SearchFacesRequest || (exports.SearchFacesRequest = {}));
var SearchFacesResponse;
(function (SearchFacesResponse) {
    SearchFacesResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SearchFacesResponse = exports.SearchFacesResponse || (exports.SearchFacesResponse = {}));
var SearchFacesByImageRequest;
(function (SearchFacesByImageRequest) {
    SearchFacesByImageRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SearchFacesByImageRequest = exports.SearchFacesByImageRequest || (exports.SearchFacesByImageRequest = {}));
var SearchFacesByImageResponse;
(function (SearchFacesByImageResponse) {
    SearchFacesByImageResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(SearchFacesByImageResponse = exports.SearchFacesByImageResponse || (exports.SearchFacesByImageResponse = {}));
var Video;
(function (Video) {
    Video.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(Video = exports.Video || (exports.Video = {}));
var StartCelebrityRecognitionRequest;
(function (StartCelebrityRecognitionRequest) {
    StartCelebrityRecognitionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartCelebrityRecognitionRequest = exports.StartCelebrityRecognitionRequest || (exports.StartCelebrityRecognitionRequest = {}));
var StartCelebrityRecognitionResponse;
(function (StartCelebrityRecognitionResponse) {
    StartCelebrityRecognitionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartCelebrityRecognitionResponse = exports.StartCelebrityRecognitionResponse || (exports.StartCelebrityRecognitionResponse = {}));
var VideoTooLargeException;
(function (VideoTooLargeException) {
    VideoTooLargeException.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(VideoTooLargeException = exports.VideoTooLargeException || (exports.VideoTooLargeException = {}));
var StartContentModerationRequest;
(function (StartContentModerationRequest) {
    StartContentModerationRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartContentModerationRequest = exports.StartContentModerationRequest || (exports.StartContentModerationRequest = {}));
var StartContentModerationResponse;
(function (StartContentModerationResponse) {
    StartContentModerationResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartContentModerationResponse = exports.StartContentModerationResponse || (exports.StartContentModerationResponse = {}));
var StartFaceDetectionRequest;
(function (StartFaceDetectionRequest) {
    StartFaceDetectionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartFaceDetectionRequest = exports.StartFaceDetectionRequest || (exports.StartFaceDetectionRequest = {}));
var StartFaceDetectionResponse;
(function (StartFaceDetectionResponse) {
    StartFaceDetectionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartFaceDetectionResponse = exports.StartFaceDetectionResponse || (exports.StartFaceDetectionResponse = {}));
var StartFaceSearchRequest;
(function (StartFaceSearchRequest) {
    StartFaceSearchRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartFaceSearchRequest = exports.StartFaceSearchRequest || (exports.StartFaceSearchRequest = {}));
var StartFaceSearchResponse;
(function (StartFaceSearchResponse) {
    StartFaceSearchResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartFaceSearchResponse = exports.StartFaceSearchResponse || (exports.StartFaceSearchResponse = {}));
var StartLabelDetectionRequest;
(function (StartLabelDetectionRequest) {
    StartLabelDetectionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartLabelDetectionRequest = exports.StartLabelDetectionRequest || (exports.StartLabelDetectionRequest = {}));
var StartLabelDetectionResponse;
(function (StartLabelDetectionResponse) {
    StartLabelDetectionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartLabelDetectionResponse = exports.StartLabelDetectionResponse || (exports.StartLabelDetectionResponse = {}));
var StartPersonTrackingRequest;
(function (StartPersonTrackingRequest) {
    StartPersonTrackingRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartPersonTrackingRequest = exports.StartPersonTrackingRequest || (exports.StartPersonTrackingRequest = {}));
var StartPersonTrackingResponse;
(function (StartPersonTrackingResponse) {
    StartPersonTrackingResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartPersonTrackingResponse = exports.StartPersonTrackingResponse || (exports.StartPersonTrackingResponse = {}));
var StartProjectVersionRequest;
(function (StartProjectVersionRequest) {
    StartProjectVersionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartProjectVersionRequest = exports.StartProjectVersionRequest || (exports.StartProjectVersionRequest = {}));
var StartProjectVersionResponse;
(function (StartProjectVersionResponse) {
    StartProjectVersionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartProjectVersionResponse = exports.StartProjectVersionResponse || (exports.StartProjectVersionResponse = {}));
var StartShotDetectionFilter;
(function (StartShotDetectionFilter) {
    StartShotDetectionFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartShotDetectionFilter = exports.StartShotDetectionFilter || (exports.StartShotDetectionFilter = {}));
var StartTechnicalCueDetectionFilter;
(function (StartTechnicalCueDetectionFilter) {
    StartTechnicalCueDetectionFilter.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartTechnicalCueDetectionFilter = exports.StartTechnicalCueDetectionFilter || (exports.StartTechnicalCueDetectionFilter = {}));
var StartSegmentDetectionFilters;
(function (StartSegmentDetectionFilters) {
    StartSegmentDetectionFilters.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartSegmentDetectionFilters = exports.StartSegmentDetectionFilters || (exports.StartSegmentDetectionFilters = {}));
var StartSegmentDetectionRequest;
(function (StartSegmentDetectionRequest) {
    StartSegmentDetectionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartSegmentDetectionRequest = exports.StartSegmentDetectionRequest || (exports.StartSegmentDetectionRequest = {}));
var StartSegmentDetectionResponse;
(function (StartSegmentDetectionResponse) {
    StartSegmentDetectionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartSegmentDetectionResponse = exports.StartSegmentDetectionResponse || (exports.StartSegmentDetectionResponse = {}));
var StartStreamProcessorRequest;
(function (StartStreamProcessorRequest) {
    StartStreamProcessorRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartStreamProcessorRequest = exports.StartStreamProcessorRequest || (exports.StartStreamProcessorRequest = {}));
var StartStreamProcessorResponse;
(function (StartStreamProcessorResponse) {
    StartStreamProcessorResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartStreamProcessorResponse = exports.StartStreamProcessorResponse || (exports.StartStreamProcessorResponse = {}));
var StartTextDetectionFilters;
(function (StartTextDetectionFilters) {
    StartTextDetectionFilters.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartTextDetectionFilters = exports.StartTextDetectionFilters || (exports.StartTextDetectionFilters = {}));
var StartTextDetectionRequest;
(function (StartTextDetectionRequest) {
    StartTextDetectionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartTextDetectionRequest = exports.StartTextDetectionRequest || (exports.StartTextDetectionRequest = {}));
var StartTextDetectionResponse;
(function (StartTextDetectionResponse) {
    StartTextDetectionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StartTextDetectionResponse = exports.StartTextDetectionResponse || (exports.StartTextDetectionResponse = {}));
var StopProjectVersionRequest;
(function (StopProjectVersionRequest) {
    StopProjectVersionRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopProjectVersionRequest = exports.StopProjectVersionRequest || (exports.StopProjectVersionRequest = {}));
var StopProjectVersionResponse;
(function (StopProjectVersionResponse) {
    StopProjectVersionResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopProjectVersionResponse = exports.StopProjectVersionResponse || (exports.StopProjectVersionResponse = {}));
var StopStreamProcessorRequest;
(function (StopStreamProcessorRequest) {
    StopStreamProcessorRequest.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopStreamProcessorRequest = exports.StopStreamProcessorRequest || (exports.StopStreamProcessorRequest = {}));
var StopStreamProcessorResponse;
(function (StopStreamProcessorResponse) {
    StopStreamProcessorResponse.filterSensitiveLog = (obj) => ({
        ...obj,
    });
})(StopStreamProcessorResponse = exports.StopStreamProcessorResponse || (exports.StopStreamProcessorResponse = {}));
//# sourceMappingURL=models_0.js.map
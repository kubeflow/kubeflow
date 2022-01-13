import { CompareFacesCommandInput, CompareFacesCommandOutput } from "../commands/CompareFacesCommand";
import { CreateCollectionCommandInput, CreateCollectionCommandOutput } from "../commands/CreateCollectionCommand";
import { CreateProjectCommandInput, CreateProjectCommandOutput } from "../commands/CreateProjectCommand";
import {
  CreateProjectVersionCommandInput,
  CreateProjectVersionCommandOutput,
} from "../commands/CreateProjectVersionCommand";
import {
  CreateStreamProcessorCommandInput,
  CreateStreamProcessorCommandOutput,
} from "../commands/CreateStreamProcessorCommand";
import { DeleteCollectionCommandInput, DeleteCollectionCommandOutput } from "../commands/DeleteCollectionCommand";
import { DeleteFacesCommandInput, DeleteFacesCommandOutput } from "../commands/DeleteFacesCommand";
import { DeleteProjectCommandInput, DeleteProjectCommandOutput } from "../commands/DeleteProjectCommand";
import {
  DeleteProjectVersionCommandInput,
  DeleteProjectVersionCommandOutput,
} from "../commands/DeleteProjectVersionCommand";
import {
  DeleteStreamProcessorCommandInput,
  DeleteStreamProcessorCommandOutput,
} from "../commands/DeleteStreamProcessorCommand";
import { DescribeCollectionCommandInput, DescribeCollectionCommandOutput } from "../commands/DescribeCollectionCommand";
import {
  DescribeProjectVersionsCommandInput,
  DescribeProjectVersionsCommandOutput,
} from "../commands/DescribeProjectVersionsCommand";
import { DescribeProjectsCommandInput, DescribeProjectsCommandOutput } from "../commands/DescribeProjectsCommand";
import {
  DescribeStreamProcessorCommandInput,
  DescribeStreamProcessorCommandOutput,
} from "../commands/DescribeStreamProcessorCommand";
import { DetectCustomLabelsCommandInput, DetectCustomLabelsCommandOutput } from "../commands/DetectCustomLabelsCommand";
import { DetectFacesCommandInput, DetectFacesCommandOutput } from "../commands/DetectFacesCommand";
import { DetectLabelsCommandInput, DetectLabelsCommandOutput } from "../commands/DetectLabelsCommand";
import {
  DetectModerationLabelsCommandInput,
  DetectModerationLabelsCommandOutput,
} from "../commands/DetectModerationLabelsCommand";
import {
  DetectProtectiveEquipmentCommandInput,
  DetectProtectiveEquipmentCommandOutput,
} from "../commands/DetectProtectiveEquipmentCommand";
import { DetectTextCommandInput, DetectTextCommandOutput } from "../commands/DetectTextCommand";
import { GetCelebrityInfoCommandInput, GetCelebrityInfoCommandOutput } from "../commands/GetCelebrityInfoCommand";
import {
  GetCelebrityRecognitionCommandInput,
  GetCelebrityRecognitionCommandOutput,
} from "../commands/GetCelebrityRecognitionCommand";
import {
  GetContentModerationCommandInput,
  GetContentModerationCommandOutput,
} from "../commands/GetContentModerationCommand";
import { GetFaceDetectionCommandInput, GetFaceDetectionCommandOutput } from "../commands/GetFaceDetectionCommand";
import { GetFaceSearchCommandInput, GetFaceSearchCommandOutput } from "../commands/GetFaceSearchCommand";
import { GetLabelDetectionCommandInput, GetLabelDetectionCommandOutput } from "../commands/GetLabelDetectionCommand";
import { GetPersonTrackingCommandInput, GetPersonTrackingCommandOutput } from "../commands/GetPersonTrackingCommand";
import {
  GetSegmentDetectionCommandInput,
  GetSegmentDetectionCommandOutput,
} from "../commands/GetSegmentDetectionCommand";
import { GetTextDetectionCommandInput, GetTextDetectionCommandOutput } from "../commands/GetTextDetectionCommand";
import { IndexFacesCommandInput, IndexFacesCommandOutput } from "../commands/IndexFacesCommand";
import { ListCollectionsCommandInput, ListCollectionsCommandOutput } from "../commands/ListCollectionsCommand";
import { ListFacesCommandInput, ListFacesCommandOutput } from "../commands/ListFacesCommand";
import {
  ListStreamProcessorsCommandInput,
  ListStreamProcessorsCommandOutput,
} from "../commands/ListStreamProcessorsCommand";
import {
  RecognizeCelebritiesCommandInput,
  RecognizeCelebritiesCommandOutput,
} from "../commands/RecognizeCelebritiesCommand";
import { SearchFacesByImageCommandInput, SearchFacesByImageCommandOutput } from "../commands/SearchFacesByImageCommand";
import { SearchFacesCommandInput, SearchFacesCommandOutput } from "../commands/SearchFacesCommand";
import {
  StartCelebrityRecognitionCommandInput,
  StartCelebrityRecognitionCommandOutput,
} from "../commands/StartCelebrityRecognitionCommand";
import {
  StartContentModerationCommandInput,
  StartContentModerationCommandOutput,
} from "../commands/StartContentModerationCommand";
import { StartFaceDetectionCommandInput, StartFaceDetectionCommandOutput } from "../commands/StartFaceDetectionCommand";
import { StartFaceSearchCommandInput, StartFaceSearchCommandOutput } from "../commands/StartFaceSearchCommand";
import {
  StartLabelDetectionCommandInput,
  StartLabelDetectionCommandOutput,
} from "../commands/StartLabelDetectionCommand";
import {
  StartPersonTrackingCommandInput,
  StartPersonTrackingCommandOutput,
} from "../commands/StartPersonTrackingCommand";
import {
  StartProjectVersionCommandInput,
  StartProjectVersionCommandOutput,
} from "../commands/StartProjectVersionCommand";
import {
  StartSegmentDetectionCommandInput,
  StartSegmentDetectionCommandOutput,
} from "../commands/StartSegmentDetectionCommand";
import {
  StartStreamProcessorCommandInput,
  StartStreamProcessorCommandOutput,
} from "../commands/StartStreamProcessorCommand";
import { StartTextDetectionCommandInput, StartTextDetectionCommandOutput } from "../commands/StartTextDetectionCommand";
import { StopProjectVersionCommandInput, StopProjectVersionCommandOutput } from "../commands/StopProjectVersionCommand";
import {
  StopStreamProcessorCommandInput,
  StopStreamProcessorCommandOutput,
} from "../commands/StopStreamProcessorCommand";
import {
  AccessDeniedException,
  AgeRange,
  Asset,
  Attribute,
  AudioMetadata,
  Beard,
  BoundingBox,
  Celebrity,
  CelebrityDetail,
  CelebrityRecognition,
  CompareFacesMatch,
  CompareFacesRequest,
  CompareFacesResponse,
  ComparedFace,
  ComparedSourceImageFace,
  ContentClassifier,
  ContentModerationDetection,
  CoversBodyPart,
  CreateCollectionRequest,
  CreateCollectionResponse,
  CreateProjectRequest,
  CreateProjectResponse,
  CreateProjectVersionRequest,
  CreateProjectVersionResponse,
  CreateStreamProcessorRequest,
  CreateStreamProcessorResponse,
  CustomLabel,
  DeleteCollectionRequest,
  DeleteCollectionResponse,
  DeleteFacesRequest,
  DeleteFacesResponse,
  DeleteProjectRequest,
  DeleteProjectResponse,
  DeleteProjectVersionRequest,
  DeleteProjectVersionResponse,
  DeleteStreamProcessorRequest,
  DeleteStreamProcessorResponse,
  DescribeCollectionRequest,
  DescribeCollectionResponse,
  DescribeProjectVersionsRequest,
  DescribeProjectVersionsResponse,
  DescribeProjectsRequest,
  DescribeProjectsResponse,
  DescribeStreamProcessorRequest,
  DescribeStreamProcessorResponse,
  DetectCustomLabelsRequest,
  DetectCustomLabelsResponse,
  DetectFacesRequest,
  DetectFacesResponse,
  DetectLabelsRequest,
  DetectLabelsResponse,
  DetectModerationLabelsRequest,
  DetectModerationLabelsResponse,
  DetectProtectiveEquipmentRequest,
  DetectProtectiveEquipmentResponse,
  DetectTextFilters,
  DetectTextRequest,
  DetectTextResponse,
  DetectionFilter,
  Emotion,
  EquipmentDetection,
  EvaluationResult,
  EyeOpen,
  Eyeglasses,
  Face,
  FaceDetail,
  FaceDetection,
  FaceMatch,
  FaceRecord,
  FaceSearchSettings,
  Gender,
  Geometry,
  GetCelebrityInfoRequest,
  GetCelebrityInfoResponse,
  GetCelebrityRecognitionRequest,
  GetCelebrityRecognitionResponse,
  GetContentModerationRequest,
  GetContentModerationResponse,
  GetFaceDetectionRequest,
  GetFaceDetectionResponse,
  GetFaceSearchRequest,
  GetFaceSearchResponse,
  GetLabelDetectionRequest,
  GetLabelDetectionResponse,
  GetPersonTrackingRequest,
  GetPersonTrackingResponse,
  GetSegmentDetectionRequest,
  GetSegmentDetectionResponse,
  GetTextDetectionRequest,
  GetTextDetectionResponse,
  GroundTruthManifest,
  HumanLoopActivationOutput,
  HumanLoopConfig,
  HumanLoopDataAttributes,
  HumanLoopQuotaExceededException,
  IdempotentParameterMismatchException,
  Image,
  ImageQuality,
  ImageTooLargeException,
  IndexFacesRequest,
  IndexFacesResponse,
  Instance,
  InternalServerError,
  InvalidImageFormatException,
  InvalidPaginationTokenException,
  InvalidParameterException,
  InvalidS3ObjectException,
  KinesisDataStream,
  KinesisVideoStream,
  Label,
  LabelDetection,
  Landmark,
  LimitExceededException,
  ListCollectionsRequest,
  ListCollectionsResponse,
  ListFacesRequest,
  ListFacesResponse,
  ListStreamProcessorsRequest,
  ListStreamProcessorsResponse,
  ModerationLabel,
  MouthOpen,
  Mustache,
  NotificationChannel,
  OutputConfig,
  Parent,
  PersonDetail,
  PersonDetection,
  PersonMatch,
  Point,
  Pose,
  ProjectDescription,
  ProjectVersionDescription,
  ProtectiveEquipmentBodyPart,
  ProtectiveEquipmentPerson,
  ProtectiveEquipmentSummarizationAttributes,
  ProtectiveEquipmentSummary,
  ProtectiveEquipmentType,
  ProvisionedThroughputExceededException,
  Reason,
  RecognizeCelebritiesRequest,
  RecognizeCelebritiesResponse,
  RegionOfInterest,
  ResourceAlreadyExistsException,
  ResourceInUseException,
  ResourceNotFoundException,
  ResourceNotReadyException,
  S3Object,
  SearchFacesByImageRequest,
  SearchFacesByImageResponse,
  SearchFacesRequest,
  SearchFacesResponse,
  SegmentDetection,
  SegmentType,
  SegmentTypeInfo,
  ServiceQuotaExceededException,
  ShotSegment,
  Smile,
  StartCelebrityRecognitionRequest,
  StartCelebrityRecognitionResponse,
  StartContentModerationRequest,
  StartContentModerationResponse,
  StartFaceDetectionRequest,
  StartFaceDetectionResponse,
  StartFaceSearchRequest,
  StartFaceSearchResponse,
  StartLabelDetectionRequest,
  StartLabelDetectionResponse,
  StartPersonTrackingRequest,
  StartPersonTrackingResponse,
  StartProjectVersionRequest,
  StartProjectVersionResponse,
  StartSegmentDetectionFilters,
  StartSegmentDetectionRequest,
  StartSegmentDetectionResponse,
  StartShotDetectionFilter,
  StartStreamProcessorRequest,
  StartStreamProcessorResponse,
  StartTechnicalCueDetectionFilter,
  StartTextDetectionFilters,
  StartTextDetectionRequest,
  StartTextDetectionResponse,
  StopProjectVersionRequest,
  StopProjectVersionResponse,
  StopStreamProcessorRequest,
  StopStreamProcessorResponse,
  StreamProcessor,
  StreamProcessorInput,
  StreamProcessorOutput,
  StreamProcessorSettings,
  Summary,
  Sunglasses,
  TechnicalCueSegment,
  TestingData,
  TestingDataResult,
  TextDetection,
  TextDetectionResult,
  ThrottlingException,
  TrainingData,
  TrainingDataResult,
  UnindexedFace,
  ValidationData,
  Video,
  VideoMetadata,
  VideoTooLargeException,
} from "../models/models_0";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@aws-sdk/protocol-http";
import { LazyJsonString as __LazyJsonString, SmithyException as __SmithyException } from "@aws-sdk/smithy-client";
import {
  Endpoint as __Endpoint,
  HeaderBag as __HeaderBag,
  MetadataBearer as __MetadataBearer,
  ResponseMetadata as __ResponseMetadata,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

export const serializeAws_json1_1CompareFacesCommand = async (
  input: CompareFacesCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.CompareFaces",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1CompareFacesRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1CreateCollectionCommand = async (
  input: CreateCollectionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.CreateCollection",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1CreateCollectionRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1CreateProjectCommand = async (
  input: CreateProjectCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.CreateProject",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1CreateProjectRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1CreateProjectVersionCommand = async (
  input: CreateProjectVersionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.CreateProjectVersion",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1CreateProjectVersionRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1CreateStreamProcessorCommand = async (
  input: CreateStreamProcessorCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.CreateStreamProcessor",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1CreateStreamProcessorRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DeleteCollectionCommand = async (
  input: DeleteCollectionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.DeleteCollection",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DeleteCollectionRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DeleteFacesCommand = async (
  input: DeleteFacesCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.DeleteFaces",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DeleteFacesRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DeleteProjectCommand = async (
  input: DeleteProjectCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.DeleteProject",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DeleteProjectRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DeleteProjectVersionCommand = async (
  input: DeleteProjectVersionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.DeleteProjectVersion",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DeleteProjectVersionRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DeleteStreamProcessorCommand = async (
  input: DeleteStreamProcessorCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.DeleteStreamProcessor",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DeleteStreamProcessorRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DescribeCollectionCommand = async (
  input: DescribeCollectionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.DescribeCollection",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DescribeCollectionRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DescribeProjectsCommand = async (
  input: DescribeProjectsCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.DescribeProjects",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DescribeProjectsRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DescribeProjectVersionsCommand = async (
  input: DescribeProjectVersionsCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.DescribeProjectVersions",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DescribeProjectVersionsRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DescribeStreamProcessorCommand = async (
  input: DescribeStreamProcessorCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.DescribeStreamProcessor",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DescribeStreamProcessorRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DetectCustomLabelsCommand = async (
  input: DetectCustomLabelsCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.DetectCustomLabels",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DetectCustomLabelsRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DetectFacesCommand = async (
  input: DetectFacesCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.DetectFaces",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DetectFacesRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DetectLabelsCommand = async (
  input: DetectLabelsCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.DetectLabels",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DetectLabelsRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DetectModerationLabelsCommand = async (
  input: DetectModerationLabelsCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.DetectModerationLabels",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DetectModerationLabelsRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DetectProtectiveEquipmentCommand = async (
  input: DetectProtectiveEquipmentCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.DetectProtectiveEquipment",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DetectProtectiveEquipmentRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DetectTextCommand = async (
  input: DetectTextCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.DetectText",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DetectTextRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1GetCelebrityInfoCommand = async (
  input: GetCelebrityInfoCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.GetCelebrityInfo",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1GetCelebrityInfoRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1GetCelebrityRecognitionCommand = async (
  input: GetCelebrityRecognitionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.GetCelebrityRecognition",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1GetCelebrityRecognitionRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1GetContentModerationCommand = async (
  input: GetContentModerationCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.GetContentModeration",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1GetContentModerationRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1GetFaceDetectionCommand = async (
  input: GetFaceDetectionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.GetFaceDetection",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1GetFaceDetectionRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1GetFaceSearchCommand = async (
  input: GetFaceSearchCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.GetFaceSearch",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1GetFaceSearchRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1GetLabelDetectionCommand = async (
  input: GetLabelDetectionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.GetLabelDetection",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1GetLabelDetectionRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1GetPersonTrackingCommand = async (
  input: GetPersonTrackingCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.GetPersonTracking",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1GetPersonTrackingRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1GetSegmentDetectionCommand = async (
  input: GetSegmentDetectionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.GetSegmentDetection",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1GetSegmentDetectionRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1GetTextDetectionCommand = async (
  input: GetTextDetectionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.GetTextDetection",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1GetTextDetectionRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1IndexFacesCommand = async (
  input: IndexFacesCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.IndexFaces",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1IndexFacesRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1ListCollectionsCommand = async (
  input: ListCollectionsCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.ListCollections",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1ListCollectionsRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1ListFacesCommand = async (
  input: ListFacesCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.ListFaces",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1ListFacesRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1ListStreamProcessorsCommand = async (
  input: ListStreamProcessorsCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.ListStreamProcessors",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1ListStreamProcessorsRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1RecognizeCelebritiesCommand = async (
  input: RecognizeCelebritiesCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.RecognizeCelebrities",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1RecognizeCelebritiesRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1SearchFacesCommand = async (
  input: SearchFacesCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.SearchFaces",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1SearchFacesRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1SearchFacesByImageCommand = async (
  input: SearchFacesByImageCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.SearchFacesByImage",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1SearchFacesByImageRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1StartCelebrityRecognitionCommand = async (
  input: StartCelebrityRecognitionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.StartCelebrityRecognition",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1StartCelebrityRecognitionRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1StartContentModerationCommand = async (
  input: StartContentModerationCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.StartContentModeration",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1StartContentModerationRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1StartFaceDetectionCommand = async (
  input: StartFaceDetectionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.StartFaceDetection",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1StartFaceDetectionRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1StartFaceSearchCommand = async (
  input: StartFaceSearchCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.StartFaceSearch",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1StartFaceSearchRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1StartLabelDetectionCommand = async (
  input: StartLabelDetectionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.StartLabelDetection",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1StartLabelDetectionRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1StartPersonTrackingCommand = async (
  input: StartPersonTrackingCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.StartPersonTracking",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1StartPersonTrackingRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1StartProjectVersionCommand = async (
  input: StartProjectVersionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.StartProjectVersion",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1StartProjectVersionRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1StartSegmentDetectionCommand = async (
  input: StartSegmentDetectionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.StartSegmentDetection",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1StartSegmentDetectionRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1StartStreamProcessorCommand = async (
  input: StartStreamProcessorCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.StartStreamProcessor",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1StartStreamProcessorRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1StartTextDetectionCommand = async (
  input: StartTextDetectionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.StartTextDetection",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1StartTextDetectionRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1StopProjectVersionCommand = async (
  input: StopProjectVersionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.StopProjectVersion",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1StopProjectVersionRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1StopStreamProcessorCommand = async (
  input: StopStreamProcessorCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "RekognitionService.StopStreamProcessor",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1StopStreamProcessorRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const deserializeAws_json1_1CompareFacesCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<CompareFacesCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1CompareFacesCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1CompareFacesResponse(data, context);
  const response: CompareFacesCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1CompareFacesCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<CompareFacesCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1CreateCollectionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<CreateCollectionCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1CreateCollectionCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1CreateCollectionResponse(data, context);
  const response: CreateCollectionCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1CreateCollectionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<CreateCollectionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1CreateProjectCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<CreateProjectCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1CreateProjectCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1CreateProjectResponse(data, context);
  const response: CreateProjectCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1CreateProjectCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<CreateProjectCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1CreateProjectVersionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<CreateProjectVersionCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1CreateProjectVersionCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1CreateProjectVersionResponse(data, context);
  const response: CreateProjectVersionCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1CreateProjectVersionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<CreateProjectVersionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1CreateStreamProcessorCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<CreateStreamProcessorCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1CreateStreamProcessorCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1CreateStreamProcessorResponse(data, context);
  const response: CreateStreamProcessorCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1CreateStreamProcessorCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<CreateStreamProcessorCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DeleteCollectionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DeleteCollectionCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DeleteCollectionCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1DeleteCollectionResponse(data, context);
  const response: DeleteCollectionCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DeleteCollectionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DeleteCollectionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DeleteFacesCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DeleteFacesCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DeleteFacesCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1DeleteFacesResponse(data, context);
  const response: DeleteFacesCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DeleteFacesCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DeleteFacesCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DeleteProjectCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DeleteProjectCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DeleteProjectCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1DeleteProjectResponse(data, context);
  const response: DeleteProjectCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DeleteProjectCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DeleteProjectCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DeleteProjectVersionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DeleteProjectVersionCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DeleteProjectVersionCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1DeleteProjectVersionResponse(data, context);
  const response: DeleteProjectVersionCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DeleteProjectVersionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DeleteProjectVersionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DeleteStreamProcessorCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DeleteStreamProcessorCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DeleteStreamProcessorCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1DeleteStreamProcessorResponse(data, context);
  const response: DeleteStreamProcessorCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DeleteStreamProcessorCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DeleteStreamProcessorCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DescribeCollectionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DescribeCollectionCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DescribeCollectionCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1DescribeCollectionResponse(data, context);
  const response: DescribeCollectionCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DescribeCollectionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DescribeCollectionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DescribeProjectsCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DescribeProjectsCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DescribeProjectsCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1DescribeProjectsResponse(data, context);
  const response: DescribeProjectsCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DescribeProjectsCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DescribeProjectsCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DescribeProjectVersionsCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DescribeProjectVersionsCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DescribeProjectVersionsCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1DescribeProjectVersionsResponse(data, context);
  const response: DescribeProjectVersionsCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DescribeProjectVersionsCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DescribeProjectVersionsCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DescribeStreamProcessorCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DescribeStreamProcessorCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DescribeStreamProcessorCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1DescribeStreamProcessorResponse(data, context);
  const response: DescribeStreamProcessorCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DescribeStreamProcessorCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DescribeStreamProcessorCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DetectCustomLabelsCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DetectCustomLabelsCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DetectCustomLabelsCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1DetectCustomLabelsResponse(data, context);
  const response: DetectCustomLabelsCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DetectCustomLabelsCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DetectCustomLabelsCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DetectFacesCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DetectFacesCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DetectFacesCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1DetectFacesResponse(data, context);
  const response: DetectFacesCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DetectFacesCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DetectFacesCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DetectLabelsCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DetectLabelsCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DetectLabelsCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1DetectLabelsResponse(data, context);
  const response: DetectLabelsCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DetectLabelsCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DetectLabelsCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DetectModerationLabelsCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DetectModerationLabelsCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DetectModerationLabelsCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1DetectModerationLabelsResponse(data, context);
  const response: DetectModerationLabelsCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DetectModerationLabelsCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DetectModerationLabelsCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DetectProtectiveEquipmentCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DetectProtectiveEquipmentCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DetectProtectiveEquipmentCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1DetectProtectiveEquipmentResponse(data, context);
  const response: DetectProtectiveEquipmentCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DetectProtectiveEquipmentCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DetectProtectiveEquipmentCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DetectTextCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DetectTextCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DetectTextCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1DetectTextResponse(data, context);
  const response: DetectTextCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DetectTextCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DetectTextCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1GetCelebrityInfoCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetCelebrityInfoCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1GetCelebrityInfoCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1GetCelebrityInfoResponse(data, context);
  const response: GetCelebrityInfoCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1GetCelebrityInfoCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetCelebrityInfoCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1GetCelebrityRecognitionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetCelebrityRecognitionCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1GetCelebrityRecognitionCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1GetCelebrityRecognitionResponse(data, context);
  const response: GetCelebrityRecognitionCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1GetCelebrityRecognitionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetCelebrityRecognitionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1GetContentModerationCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetContentModerationCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1GetContentModerationCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1GetContentModerationResponse(data, context);
  const response: GetContentModerationCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1GetContentModerationCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetContentModerationCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1GetFaceDetectionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetFaceDetectionCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1GetFaceDetectionCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1GetFaceDetectionResponse(data, context);
  const response: GetFaceDetectionCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1GetFaceDetectionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetFaceDetectionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1GetFaceSearchCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetFaceSearchCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1GetFaceSearchCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1GetFaceSearchResponse(data, context);
  const response: GetFaceSearchCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1GetFaceSearchCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetFaceSearchCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1GetLabelDetectionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetLabelDetectionCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1GetLabelDetectionCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1GetLabelDetectionResponse(data, context);
  const response: GetLabelDetectionCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1GetLabelDetectionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetLabelDetectionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1GetPersonTrackingCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetPersonTrackingCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1GetPersonTrackingCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1GetPersonTrackingResponse(data, context);
  const response: GetPersonTrackingCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1GetPersonTrackingCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetPersonTrackingCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1GetSegmentDetectionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetSegmentDetectionCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1GetSegmentDetectionCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1GetSegmentDetectionResponse(data, context);
  const response: GetSegmentDetectionCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1GetSegmentDetectionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetSegmentDetectionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1GetTextDetectionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetTextDetectionCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1GetTextDetectionCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1GetTextDetectionResponse(data, context);
  const response: GetTextDetectionCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1GetTextDetectionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetTextDetectionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1IndexFacesCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<IndexFacesCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1IndexFacesCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1IndexFacesResponse(data, context);
  const response: IndexFacesCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1IndexFacesCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<IndexFacesCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1ListCollectionsCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<ListCollectionsCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1ListCollectionsCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1ListCollectionsResponse(data, context);
  const response: ListCollectionsCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1ListCollectionsCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<ListCollectionsCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1ListFacesCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<ListFacesCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1ListFacesCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1ListFacesResponse(data, context);
  const response: ListFacesCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1ListFacesCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<ListFacesCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1ListStreamProcessorsCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<ListStreamProcessorsCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1ListStreamProcessorsCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1ListStreamProcessorsResponse(data, context);
  const response: ListStreamProcessorsCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1ListStreamProcessorsCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<ListStreamProcessorsCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1RecognizeCelebritiesCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<RecognizeCelebritiesCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1RecognizeCelebritiesCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1RecognizeCelebritiesResponse(data, context);
  const response: RecognizeCelebritiesCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1RecognizeCelebritiesCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<RecognizeCelebritiesCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1SearchFacesCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<SearchFacesCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1SearchFacesCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1SearchFacesResponse(data, context);
  const response: SearchFacesCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1SearchFacesCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<SearchFacesCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1SearchFacesByImageCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<SearchFacesByImageCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1SearchFacesByImageCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1SearchFacesByImageResponse(data, context);
  const response: SearchFacesByImageCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1SearchFacesByImageCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<SearchFacesByImageCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1StartCelebrityRecognitionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartCelebrityRecognitionCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1StartCelebrityRecognitionCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1StartCelebrityRecognitionResponse(data, context);
  const response: StartCelebrityRecognitionCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1StartCelebrityRecognitionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartCelebrityRecognitionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1StartContentModerationCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartContentModerationCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1StartContentModerationCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1StartContentModerationResponse(data, context);
  const response: StartContentModerationCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1StartContentModerationCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartContentModerationCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1StartFaceDetectionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartFaceDetectionCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1StartFaceDetectionCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1StartFaceDetectionResponse(data, context);
  const response: StartFaceDetectionCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1StartFaceDetectionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartFaceDetectionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1StartFaceSearchCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartFaceSearchCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1StartFaceSearchCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1StartFaceSearchResponse(data, context);
  const response: StartFaceSearchCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1StartFaceSearchCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartFaceSearchCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1StartLabelDetectionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartLabelDetectionCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1StartLabelDetectionCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1StartLabelDetectionResponse(data, context);
  const response: StartLabelDetectionCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1StartLabelDetectionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartLabelDetectionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1StartPersonTrackingCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartPersonTrackingCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1StartPersonTrackingCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1StartPersonTrackingResponse(data, context);
  const response: StartPersonTrackingCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1StartPersonTrackingCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartPersonTrackingCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1StartProjectVersionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartProjectVersionCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1StartProjectVersionCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1StartProjectVersionResponse(data, context);
  const response: StartProjectVersionCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1StartProjectVersionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartProjectVersionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1StartSegmentDetectionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartSegmentDetectionCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1StartSegmentDetectionCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1StartSegmentDetectionResponse(data, context);
  const response: StartSegmentDetectionCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1StartSegmentDetectionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartSegmentDetectionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1StartStreamProcessorCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartStreamProcessorCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1StartStreamProcessorCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1StartStreamProcessorResponse(data, context);
  const response: StartStreamProcessorCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1StartStreamProcessorCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartStreamProcessorCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1StartTextDetectionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartTextDetectionCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1StartTextDetectionCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1StartTextDetectionResponse(data, context);
  const response: StartTextDetectionCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1StartTextDetectionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartTextDetectionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1StopProjectVersionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StopProjectVersionCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1StopProjectVersionCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1StopProjectVersionResponse(data, context);
  const response: StopProjectVersionCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1StopProjectVersionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StopProjectVersionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1StopStreamProcessorCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StopStreamProcessorCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1StopStreamProcessorCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1StopStreamProcessorResponse(data, context);
  const response: StopStreamProcessorCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1StopStreamProcessorCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StopStreamProcessorCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

const deserializeAws_json1_1AccessDeniedExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<AccessDeniedException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1AccessDeniedException(body, context);
  const contents: AccessDeniedException = {
    name: "AccessDeniedException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1HumanLoopQuotaExceededExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<HumanLoopQuotaExceededException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1HumanLoopQuotaExceededException(body, context);
  const contents: HumanLoopQuotaExceededException = {
    name: "HumanLoopQuotaExceededException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1IdempotentParameterMismatchExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<IdempotentParameterMismatchException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1IdempotentParameterMismatchException(body, context);
  const contents: IdempotentParameterMismatchException = {
    name: "IdempotentParameterMismatchException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1ImageTooLargeExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<ImageTooLargeException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1ImageTooLargeException(body, context);
  const contents: ImageTooLargeException = {
    name: "ImageTooLargeException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1InternalServerErrorResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<InternalServerError> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1InternalServerError(body, context);
  const contents: InternalServerError = {
    name: "InternalServerError",
    $fault: "server",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1InvalidImageFormatExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<InvalidImageFormatException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1InvalidImageFormatException(body, context);
  const contents: InvalidImageFormatException = {
    name: "InvalidImageFormatException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1InvalidPaginationTokenExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<InvalidPaginationTokenException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1InvalidPaginationTokenException(body, context);
  const contents: InvalidPaginationTokenException = {
    name: "InvalidPaginationTokenException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1InvalidParameterExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<InvalidParameterException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1InvalidParameterException(body, context);
  const contents: InvalidParameterException = {
    name: "InvalidParameterException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1InvalidS3ObjectExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<InvalidS3ObjectException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1InvalidS3ObjectException(body, context);
  const contents: InvalidS3ObjectException = {
    name: "InvalidS3ObjectException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1LimitExceededExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<LimitExceededException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1LimitExceededException(body, context);
  const contents: LimitExceededException = {
    name: "LimitExceededException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<ProvisionedThroughputExceededException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1ProvisionedThroughputExceededException(body, context);
  const contents: ProvisionedThroughputExceededException = {
    name: "ProvisionedThroughputExceededException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1ResourceAlreadyExistsExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<ResourceAlreadyExistsException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1ResourceAlreadyExistsException(body, context);
  const contents: ResourceAlreadyExistsException = {
    name: "ResourceAlreadyExistsException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1ResourceInUseExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<ResourceInUseException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1ResourceInUseException(body, context);
  const contents: ResourceInUseException = {
    name: "ResourceInUseException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1ResourceNotFoundExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<ResourceNotFoundException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1ResourceNotFoundException(body, context);
  const contents: ResourceNotFoundException = {
    name: "ResourceNotFoundException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1ResourceNotReadyExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<ResourceNotReadyException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1ResourceNotReadyException(body, context);
  const contents: ResourceNotReadyException = {
    name: "ResourceNotReadyException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1ServiceQuotaExceededExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<ServiceQuotaExceededException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1ServiceQuotaExceededException(body, context);
  const contents: ServiceQuotaExceededException = {
    name: "ServiceQuotaExceededException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1ThrottlingExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<ThrottlingException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1ThrottlingException(body, context);
  const contents: ThrottlingException = {
    name: "ThrottlingException",
    $fault: "server",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1VideoTooLargeExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<VideoTooLargeException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1VideoTooLargeException(body, context);
  const contents: VideoTooLargeException = {
    name: "VideoTooLargeException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const serializeAws_json1_1Asset = (input: Asset, context: __SerdeContext): any => {
  return {
    ...(input.GroundTruthManifest !== undefined &&
      input.GroundTruthManifest !== null && {
        GroundTruthManifest: serializeAws_json1_1GroundTruthManifest(input.GroundTruthManifest, context),
      }),
  };
};

const serializeAws_json1_1Assets = (input: Asset[], context: __SerdeContext): any => {
  return input
    .filter((e: any) => e != null)
    .map((entry) => {
      if (entry === null) {
        return null as any;
      }
      return serializeAws_json1_1Asset(entry, context);
    });
};

const serializeAws_json1_1Attributes = (input: (Attribute | string)[], context: __SerdeContext): any => {
  return input
    .filter((e: any) => e != null)
    .map((entry) => {
      if (entry === null) {
        return null as any;
      }
      return entry;
    });
};

const serializeAws_json1_1BoundingBox = (input: BoundingBox, context: __SerdeContext): any => {
  return {
    ...(input.Height !== undefined && input.Height !== null && { Height: input.Height }),
    ...(input.Left !== undefined && input.Left !== null && { Left: input.Left }),
    ...(input.Top !== undefined && input.Top !== null && { Top: input.Top }),
    ...(input.Width !== undefined && input.Width !== null && { Width: input.Width }),
  };
};

const serializeAws_json1_1CompareFacesRequest = (input: CompareFacesRequest, context: __SerdeContext): any => {
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

const serializeAws_json1_1ContentClassifiers = (
  input: (ContentClassifier | string)[],
  context: __SerdeContext
): any => {
  return input
    .filter((e: any) => e != null)
    .map((entry) => {
      if (entry === null) {
        return null as any;
      }
      return entry;
    });
};

const serializeAws_json1_1CreateCollectionRequest = (input: CreateCollectionRequest, context: __SerdeContext): any => {
  return {
    ...(input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId }),
  };
};

const serializeAws_json1_1CreateProjectRequest = (input: CreateProjectRequest, context: __SerdeContext): any => {
  return {
    ...(input.ProjectName !== undefined && input.ProjectName !== null && { ProjectName: input.ProjectName }),
  };
};

const serializeAws_json1_1CreateProjectVersionRequest = (
  input: CreateProjectVersionRequest,
  context: __SerdeContext
): any => {
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

const serializeAws_json1_1CreateStreamProcessorRequest = (
  input: CreateStreamProcessorRequest,
  context: __SerdeContext
): any => {
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

const serializeAws_json1_1DeleteCollectionRequest = (input: DeleteCollectionRequest, context: __SerdeContext): any => {
  return {
    ...(input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId }),
  };
};

const serializeAws_json1_1DeleteFacesRequest = (input: DeleteFacesRequest, context: __SerdeContext): any => {
  return {
    ...(input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId }),
    ...(input.FaceIds !== undefined &&
      input.FaceIds !== null && { FaceIds: serializeAws_json1_1FaceIdList(input.FaceIds, context) }),
  };
};

const serializeAws_json1_1DeleteProjectRequest = (input: DeleteProjectRequest, context: __SerdeContext): any => {
  return {
    ...(input.ProjectArn !== undefined && input.ProjectArn !== null && { ProjectArn: input.ProjectArn }),
  };
};

const serializeAws_json1_1DeleteProjectVersionRequest = (
  input: DeleteProjectVersionRequest,
  context: __SerdeContext
): any => {
  return {
    ...(input.ProjectVersionArn !== undefined &&
      input.ProjectVersionArn !== null && { ProjectVersionArn: input.ProjectVersionArn }),
  };
};

const serializeAws_json1_1DeleteStreamProcessorRequest = (
  input: DeleteStreamProcessorRequest,
  context: __SerdeContext
): any => {
  return {
    ...(input.Name !== undefined && input.Name !== null && { Name: input.Name }),
  };
};

const serializeAws_json1_1DescribeCollectionRequest = (
  input: DescribeCollectionRequest,
  context: __SerdeContext
): any => {
  return {
    ...(input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId }),
  };
};

const serializeAws_json1_1DescribeProjectsRequest = (input: DescribeProjectsRequest, context: __SerdeContext): any => {
  return {
    ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
    ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
  };
};

const serializeAws_json1_1DescribeProjectVersionsRequest = (
  input: DescribeProjectVersionsRequest,
  context: __SerdeContext
): any => {
  return {
    ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
    ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    ...(input.ProjectArn !== undefined && input.ProjectArn !== null && { ProjectArn: input.ProjectArn }),
    ...(input.VersionNames !== undefined &&
      input.VersionNames !== null && { VersionNames: serializeAws_json1_1VersionNames(input.VersionNames, context) }),
  };
};

const serializeAws_json1_1DescribeStreamProcessorRequest = (
  input: DescribeStreamProcessorRequest,
  context: __SerdeContext
): any => {
  return {
    ...(input.Name !== undefined && input.Name !== null && { Name: input.Name }),
  };
};

const serializeAws_json1_1DetectCustomLabelsRequest = (
  input: DetectCustomLabelsRequest,
  context: __SerdeContext
): any => {
  return {
    ...(input.Image !== undefined &&
      input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) }),
    ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
    ...(input.MinConfidence !== undefined && input.MinConfidence !== null && { MinConfidence: input.MinConfidence }),
    ...(input.ProjectVersionArn !== undefined &&
      input.ProjectVersionArn !== null && { ProjectVersionArn: input.ProjectVersionArn }),
  };
};

const serializeAws_json1_1DetectFacesRequest = (input: DetectFacesRequest, context: __SerdeContext): any => {
  return {
    ...(input.Attributes !== undefined &&
      input.Attributes !== null && { Attributes: serializeAws_json1_1Attributes(input.Attributes, context) }),
    ...(input.Image !== undefined &&
      input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) }),
  };
};

const serializeAws_json1_1DetectionFilter = (input: DetectionFilter, context: __SerdeContext): any => {
  return {
    ...(input.MinBoundingBoxHeight !== undefined &&
      input.MinBoundingBoxHeight !== null && { MinBoundingBoxHeight: input.MinBoundingBoxHeight }),
    ...(input.MinBoundingBoxWidth !== undefined &&
      input.MinBoundingBoxWidth !== null && { MinBoundingBoxWidth: input.MinBoundingBoxWidth }),
    ...(input.MinConfidence !== undefined && input.MinConfidence !== null && { MinConfidence: input.MinConfidence }),
  };
};

const serializeAws_json1_1DetectLabelsRequest = (input: DetectLabelsRequest, context: __SerdeContext): any => {
  return {
    ...(input.Image !== undefined &&
      input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) }),
    ...(input.MaxLabels !== undefined && input.MaxLabels !== null && { MaxLabels: input.MaxLabels }),
    ...(input.MinConfidence !== undefined && input.MinConfidence !== null && { MinConfidence: input.MinConfidence }),
  };
};

const serializeAws_json1_1DetectModerationLabelsRequest = (
  input: DetectModerationLabelsRequest,
  context: __SerdeContext
): any => {
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

const serializeAws_json1_1DetectProtectiveEquipmentRequest = (
  input: DetectProtectiveEquipmentRequest,
  context: __SerdeContext
): any => {
  return {
    ...(input.Image !== undefined &&
      input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) }),
    ...(input.SummarizationAttributes !== undefined &&
      input.SummarizationAttributes !== null && {
        SummarizationAttributes: serializeAws_json1_1ProtectiveEquipmentSummarizationAttributes(
          input.SummarizationAttributes,
          context
        ),
      }),
  };
};

const serializeAws_json1_1DetectTextFilters = (input: DetectTextFilters, context: __SerdeContext): any => {
  return {
    ...(input.RegionsOfInterest !== undefined &&
      input.RegionsOfInterest !== null && {
        RegionsOfInterest: serializeAws_json1_1RegionsOfInterest(input.RegionsOfInterest, context),
      }),
    ...(input.WordFilter !== undefined &&
      input.WordFilter !== null && { WordFilter: serializeAws_json1_1DetectionFilter(input.WordFilter, context) }),
  };
};

const serializeAws_json1_1DetectTextRequest = (input: DetectTextRequest, context: __SerdeContext): any => {
  return {
    ...(input.Filters !== undefined &&
      input.Filters !== null && { Filters: serializeAws_json1_1DetectTextFilters(input.Filters, context) }),
    ...(input.Image !== undefined &&
      input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) }),
  };
};

const serializeAws_json1_1FaceIdList = (input: string[], context: __SerdeContext): any => {
  return input
    .filter((e: any) => e != null)
    .map((entry) => {
      if (entry === null) {
        return null as any;
      }
      return entry;
    });
};

const serializeAws_json1_1FaceSearchSettings = (input: FaceSearchSettings, context: __SerdeContext): any => {
  return {
    ...(input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId }),
    ...(input.FaceMatchThreshold !== undefined &&
      input.FaceMatchThreshold !== null && { FaceMatchThreshold: input.FaceMatchThreshold }),
  };
};

const serializeAws_json1_1GetCelebrityInfoRequest = (input: GetCelebrityInfoRequest, context: __SerdeContext): any => {
  return {
    ...(input.Id !== undefined && input.Id !== null && { Id: input.Id }),
  };
};

const serializeAws_json1_1GetCelebrityRecognitionRequest = (
  input: GetCelebrityRecognitionRequest,
  context: __SerdeContext
): any => {
  return {
    ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
    ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    ...(input.SortBy !== undefined && input.SortBy !== null && { SortBy: input.SortBy }),
  };
};

const serializeAws_json1_1GetContentModerationRequest = (
  input: GetContentModerationRequest,
  context: __SerdeContext
): any => {
  return {
    ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
    ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    ...(input.SortBy !== undefined && input.SortBy !== null && { SortBy: input.SortBy }),
  };
};

const serializeAws_json1_1GetFaceDetectionRequest = (input: GetFaceDetectionRequest, context: __SerdeContext): any => {
  return {
    ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
    ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
  };
};

const serializeAws_json1_1GetFaceSearchRequest = (input: GetFaceSearchRequest, context: __SerdeContext): any => {
  return {
    ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
    ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    ...(input.SortBy !== undefined && input.SortBy !== null && { SortBy: input.SortBy }),
  };
};

const serializeAws_json1_1GetLabelDetectionRequest = (
  input: GetLabelDetectionRequest,
  context: __SerdeContext
): any => {
  return {
    ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
    ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    ...(input.SortBy !== undefined && input.SortBy !== null && { SortBy: input.SortBy }),
  };
};

const serializeAws_json1_1GetPersonTrackingRequest = (
  input: GetPersonTrackingRequest,
  context: __SerdeContext
): any => {
  return {
    ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
    ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    ...(input.SortBy !== undefined && input.SortBy !== null && { SortBy: input.SortBy }),
  };
};

const serializeAws_json1_1GetSegmentDetectionRequest = (
  input: GetSegmentDetectionRequest,
  context: __SerdeContext
): any => {
  return {
    ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
    ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
  };
};

const serializeAws_json1_1GetTextDetectionRequest = (input: GetTextDetectionRequest, context: __SerdeContext): any => {
  return {
    ...(input.JobId !== undefined && input.JobId !== null && { JobId: input.JobId }),
    ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
    ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
  };
};

const serializeAws_json1_1GroundTruthManifest = (input: GroundTruthManifest, context: __SerdeContext): any => {
  return {
    ...(input.S3Object !== undefined &&
      input.S3Object !== null && { S3Object: serializeAws_json1_1S3Object(input.S3Object, context) }),
  };
};

const serializeAws_json1_1HumanLoopConfig = (input: HumanLoopConfig, context: __SerdeContext): any => {
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

const serializeAws_json1_1HumanLoopDataAttributes = (input: HumanLoopDataAttributes, context: __SerdeContext): any => {
  return {
    ...(input.ContentClassifiers !== undefined &&
      input.ContentClassifiers !== null && {
        ContentClassifiers: serializeAws_json1_1ContentClassifiers(input.ContentClassifiers, context),
      }),
  };
};

const serializeAws_json1_1Image = (input: Image, context: __SerdeContext): any => {
  return {
    ...(input.Bytes !== undefined && input.Bytes !== null && { Bytes: context.base64Encoder(input.Bytes) }),
    ...(input.S3Object !== undefined &&
      input.S3Object !== null && { S3Object: serializeAws_json1_1S3Object(input.S3Object, context) }),
  };
};

const serializeAws_json1_1IndexFacesRequest = (input: IndexFacesRequest, context: __SerdeContext): any => {
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

const serializeAws_json1_1KinesisDataStream = (input: KinesisDataStream, context: __SerdeContext): any => {
  return {
    ...(input.Arn !== undefined && input.Arn !== null && { Arn: input.Arn }),
  };
};

const serializeAws_json1_1KinesisVideoStream = (input: KinesisVideoStream, context: __SerdeContext): any => {
  return {
    ...(input.Arn !== undefined && input.Arn !== null && { Arn: input.Arn }),
  };
};

const serializeAws_json1_1ListCollectionsRequest = (input: ListCollectionsRequest, context: __SerdeContext): any => {
  return {
    ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
    ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
  };
};

const serializeAws_json1_1ListFacesRequest = (input: ListFacesRequest, context: __SerdeContext): any => {
  return {
    ...(input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId }),
    ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
    ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
  };
};

const serializeAws_json1_1ListStreamProcessorsRequest = (
  input: ListStreamProcessorsRequest,
  context: __SerdeContext
): any => {
  return {
    ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
    ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
  };
};

const serializeAws_json1_1NotificationChannel = (input: NotificationChannel, context: __SerdeContext): any => {
  return {
    ...(input.RoleArn !== undefined && input.RoleArn !== null && { RoleArn: input.RoleArn }),
    ...(input.SNSTopicArn !== undefined && input.SNSTopicArn !== null && { SNSTopicArn: input.SNSTopicArn }),
  };
};

const serializeAws_json1_1OutputConfig = (input: OutputConfig, context: __SerdeContext): any => {
  return {
    ...(input.S3Bucket !== undefined && input.S3Bucket !== null && { S3Bucket: input.S3Bucket }),
    ...(input.S3KeyPrefix !== undefined && input.S3KeyPrefix !== null && { S3KeyPrefix: input.S3KeyPrefix }),
  };
};

const serializeAws_json1_1ProtectiveEquipmentSummarizationAttributes = (
  input: ProtectiveEquipmentSummarizationAttributes,
  context: __SerdeContext
): any => {
  return {
    ...(input.MinConfidence !== undefined && input.MinConfidence !== null && { MinConfidence: input.MinConfidence }),
    ...(input.RequiredEquipmentTypes !== undefined &&
      input.RequiredEquipmentTypes !== null && {
        RequiredEquipmentTypes: serializeAws_json1_1ProtectiveEquipmentTypes(input.RequiredEquipmentTypes, context),
      }),
  };
};

const serializeAws_json1_1ProtectiveEquipmentTypes = (
  input: (ProtectiveEquipmentType | string)[],
  context: __SerdeContext
): any => {
  return input
    .filter((e: any) => e != null)
    .map((entry) => {
      if (entry === null) {
        return null as any;
      }
      return entry;
    });
};

const serializeAws_json1_1RecognizeCelebritiesRequest = (
  input: RecognizeCelebritiesRequest,
  context: __SerdeContext
): any => {
  return {
    ...(input.Image !== undefined &&
      input.Image !== null && { Image: serializeAws_json1_1Image(input.Image, context) }),
  };
};

const serializeAws_json1_1RegionOfInterest = (input: RegionOfInterest, context: __SerdeContext): any => {
  return {
    ...(input.BoundingBox !== undefined &&
      input.BoundingBox !== null && { BoundingBox: serializeAws_json1_1BoundingBox(input.BoundingBox, context) }),
  };
};

const serializeAws_json1_1RegionsOfInterest = (input: RegionOfInterest[], context: __SerdeContext): any => {
  return input
    .filter((e: any) => e != null)
    .map((entry) => {
      if (entry === null) {
        return null as any;
      }
      return serializeAws_json1_1RegionOfInterest(entry, context);
    });
};

const serializeAws_json1_1S3Object = (input: S3Object, context: __SerdeContext): any => {
  return {
    ...(input.Bucket !== undefined && input.Bucket !== null && { Bucket: input.Bucket }),
    ...(input.Name !== undefined && input.Name !== null && { Name: input.Name }),
    ...(input.Version !== undefined && input.Version !== null && { Version: input.Version }),
  };
};

const serializeAws_json1_1SearchFacesByImageRequest = (
  input: SearchFacesByImageRequest,
  context: __SerdeContext
): any => {
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

const serializeAws_json1_1SearchFacesRequest = (input: SearchFacesRequest, context: __SerdeContext): any => {
  return {
    ...(input.CollectionId !== undefined && input.CollectionId !== null && { CollectionId: input.CollectionId }),
    ...(input.FaceId !== undefined && input.FaceId !== null && { FaceId: input.FaceId }),
    ...(input.FaceMatchThreshold !== undefined &&
      input.FaceMatchThreshold !== null && { FaceMatchThreshold: input.FaceMatchThreshold }),
    ...(input.MaxFaces !== undefined && input.MaxFaces !== null && { MaxFaces: input.MaxFaces }),
  };
};

const serializeAws_json1_1SegmentTypes = (input: (SegmentType | string)[], context: __SerdeContext): any => {
  return input
    .filter((e: any) => e != null)
    .map((entry) => {
      if (entry === null) {
        return null as any;
      }
      return entry;
    });
};

const serializeAws_json1_1StartCelebrityRecognitionRequest = (
  input: StartCelebrityRecognitionRequest,
  context: __SerdeContext
): any => {
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

const serializeAws_json1_1StartContentModerationRequest = (
  input: StartContentModerationRequest,
  context: __SerdeContext
): any => {
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

const serializeAws_json1_1StartFaceDetectionRequest = (
  input: StartFaceDetectionRequest,
  context: __SerdeContext
): any => {
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

const serializeAws_json1_1StartFaceSearchRequest = (input: StartFaceSearchRequest, context: __SerdeContext): any => {
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

const serializeAws_json1_1StartLabelDetectionRequest = (
  input: StartLabelDetectionRequest,
  context: __SerdeContext
): any => {
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

const serializeAws_json1_1StartPersonTrackingRequest = (
  input: StartPersonTrackingRequest,
  context: __SerdeContext
): any => {
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

const serializeAws_json1_1StartProjectVersionRequest = (
  input: StartProjectVersionRequest,
  context: __SerdeContext
): any => {
  return {
    ...(input.MinInferenceUnits !== undefined &&
      input.MinInferenceUnits !== null && { MinInferenceUnits: input.MinInferenceUnits }),
    ...(input.ProjectVersionArn !== undefined &&
      input.ProjectVersionArn !== null && { ProjectVersionArn: input.ProjectVersionArn }),
  };
};

const serializeAws_json1_1StartSegmentDetectionFilters = (
  input: StartSegmentDetectionFilters,
  context: __SerdeContext
): any => {
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

const serializeAws_json1_1StartSegmentDetectionRequest = (
  input: StartSegmentDetectionRequest,
  context: __SerdeContext
): any => {
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

const serializeAws_json1_1StartShotDetectionFilter = (
  input: StartShotDetectionFilter,
  context: __SerdeContext
): any => {
  return {
    ...(input.MinSegmentConfidence !== undefined &&
      input.MinSegmentConfidence !== null && { MinSegmentConfidence: input.MinSegmentConfidence }),
  };
};

const serializeAws_json1_1StartStreamProcessorRequest = (
  input: StartStreamProcessorRequest,
  context: __SerdeContext
): any => {
  return {
    ...(input.Name !== undefined && input.Name !== null && { Name: input.Name }),
  };
};

const serializeAws_json1_1StartTechnicalCueDetectionFilter = (
  input: StartTechnicalCueDetectionFilter,
  context: __SerdeContext
): any => {
  return {
    ...(input.MinSegmentConfidence !== undefined &&
      input.MinSegmentConfidence !== null && { MinSegmentConfidence: input.MinSegmentConfidence }),
  };
};

const serializeAws_json1_1StartTextDetectionFilters = (
  input: StartTextDetectionFilters,
  context: __SerdeContext
): any => {
  return {
    ...(input.RegionsOfInterest !== undefined &&
      input.RegionsOfInterest !== null && {
        RegionsOfInterest: serializeAws_json1_1RegionsOfInterest(input.RegionsOfInterest, context),
      }),
    ...(input.WordFilter !== undefined &&
      input.WordFilter !== null && { WordFilter: serializeAws_json1_1DetectionFilter(input.WordFilter, context) }),
  };
};

const serializeAws_json1_1StartTextDetectionRequest = (
  input: StartTextDetectionRequest,
  context: __SerdeContext
): any => {
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

const serializeAws_json1_1StopProjectVersionRequest = (
  input: StopProjectVersionRequest,
  context: __SerdeContext
): any => {
  return {
    ...(input.ProjectVersionArn !== undefined &&
      input.ProjectVersionArn !== null && { ProjectVersionArn: input.ProjectVersionArn }),
  };
};

const serializeAws_json1_1StopStreamProcessorRequest = (
  input: StopStreamProcessorRequest,
  context: __SerdeContext
): any => {
  return {
    ...(input.Name !== undefined && input.Name !== null && { Name: input.Name }),
  };
};

const serializeAws_json1_1StreamProcessorInput = (input: StreamProcessorInput, context: __SerdeContext): any => {
  return {
    ...(input.KinesisVideoStream !== undefined &&
      input.KinesisVideoStream !== null && {
        KinesisVideoStream: serializeAws_json1_1KinesisVideoStream(input.KinesisVideoStream, context),
      }),
  };
};

const serializeAws_json1_1StreamProcessorOutput = (input: StreamProcessorOutput, context: __SerdeContext): any => {
  return {
    ...(input.KinesisDataStream !== undefined &&
      input.KinesisDataStream !== null && {
        KinesisDataStream: serializeAws_json1_1KinesisDataStream(input.KinesisDataStream, context),
      }),
  };
};

const serializeAws_json1_1StreamProcessorSettings = (input: StreamProcessorSettings, context: __SerdeContext): any => {
  return {
    ...(input.FaceSearch !== undefined &&
      input.FaceSearch !== null && { FaceSearch: serializeAws_json1_1FaceSearchSettings(input.FaceSearch, context) }),
  };
};

const serializeAws_json1_1TestingData = (input: TestingData, context: __SerdeContext): any => {
  return {
    ...(input.Assets !== undefined &&
      input.Assets !== null && { Assets: serializeAws_json1_1Assets(input.Assets, context) }),
    ...(input.AutoCreate !== undefined && input.AutoCreate !== null && { AutoCreate: input.AutoCreate }),
  };
};

const serializeAws_json1_1TrainingData = (input: TrainingData, context: __SerdeContext): any => {
  return {
    ...(input.Assets !== undefined &&
      input.Assets !== null && { Assets: serializeAws_json1_1Assets(input.Assets, context) }),
  };
};

const serializeAws_json1_1VersionNames = (input: string[], context: __SerdeContext): any => {
  return input
    .filter((e: any) => e != null)
    .map((entry) => {
      if (entry === null) {
        return null as any;
      }
      return entry;
    });
};

const serializeAws_json1_1Video = (input: Video, context: __SerdeContext): any => {
  return {
    ...(input.S3Object !== undefined &&
      input.S3Object !== null && { S3Object: serializeAws_json1_1S3Object(input.S3Object, context) }),
  };
};

const deserializeAws_json1_1AccessDeniedException = (output: any, context: __SerdeContext): AccessDeniedException => {
  return {
    Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
    Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
    Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
  } as any;
};

const deserializeAws_json1_1AgeRange = (output: any, context: __SerdeContext): AgeRange => {
  return {
    High: output.High !== undefined && output.High !== null ? output.High : undefined,
    Low: output.Low !== undefined && output.Low !== null ? output.Low : undefined,
  } as any;
};

const deserializeAws_json1_1Asset = (output: any, context: __SerdeContext): Asset => {
  return {
    GroundTruthManifest:
      output.GroundTruthManifest !== undefined && output.GroundTruthManifest !== null
        ? deserializeAws_json1_1GroundTruthManifest(output.GroundTruthManifest, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1Assets = (output: any, context: __SerdeContext): Asset[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1Asset(entry, context);
    });
};

const deserializeAws_json1_1AudioMetadata = (output: any, context: __SerdeContext): AudioMetadata => {
  return {
    Codec: output.Codec !== undefined && output.Codec !== null ? output.Codec : undefined,
    DurationMillis:
      output.DurationMillis !== undefined && output.DurationMillis !== null ? output.DurationMillis : undefined,
    NumberOfChannels:
      output.NumberOfChannels !== undefined && output.NumberOfChannels !== null ? output.NumberOfChannels : undefined,
    SampleRate: output.SampleRate !== undefined && output.SampleRate !== null ? output.SampleRate : undefined,
  } as any;
};

const deserializeAws_json1_1AudioMetadataList = (output: any, context: __SerdeContext): AudioMetadata[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1AudioMetadata(entry, context);
    });
};

const deserializeAws_json1_1Beard = (output: any, context: __SerdeContext): Beard => {
  return {
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
  } as any;
};

const deserializeAws_json1_1BodyParts = (output: any, context: __SerdeContext): ProtectiveEquipmentBodyPart[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1ProtectiveEquipmentBodyPart(entry, context);
    });
};

const deserializeAws_json1_1BoundingBox = (output: any, context: __SerdeContext): BoundingBox => {
  return {
    Height: output.Height !== undefined && output.Height !== null ? output.Height : undefined,
    Left: output.Left !== undefined && output.Left !== null ? output.Left : undefined,
    Top: output.Top !== undefined && output.Top !== null ? output.Top : undefined,
    Width: output.Width !== undefined && output.Width !== null ? output.Width : undefined,
  } as any;
};

const deserializeAws_json1_1Celebrity = (output: any, context: __SerdeContext): Celebrity => {
  return {
    Face:
      output.Face !== undefined && output.Face !== null
        ? deserializeAws_json1_1ComparedFace(output.Face, context)
        : undefined,
    Id: output.Id !== undefined && output.Id !== null ? output.Id : undefined,
    MatchConfidence:
      output.MatchConfidence !== undefined && output.MatchConfidence !== null ? output.MatchConfidence : undefined,
    Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
    Urls:
      output.Urls !== undefined && output.Urls !== null ? deserializeAws_json1_1Urls(output.Urls, context) : undefined,
  } as any;
};

const deserializeAws_json1_1CelebrityDetail = (output: any, context: __SerdeContext): CelebrityDetail => {
  return {
    BoundingBox:
      output.BoundingBox !== undefined && output.BoundingBox !== null
        ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
        : undefined,
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    Face:
      output.Face !== undefined && output.Face !== null
        ? deserializeAws_json1_1FaceDetail(output.Face, context)
        : undefined,
    Id: output.Id !== undefined && output.Id !== null ? output.Id : undefined,
    Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
    Urls:
      output.Urls !== undefined && output.Urls !== null ? deserializeAws_json1_1Urls(output.Urls, context) : undefined,
  } as any;
};

const deserializeAws_json1_1CelebrityList = (output: any, context: __SerdeContext): Celebrity[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1Celebrity(entry, context);
    });
};

const deserializeAws_json1_1CelebrityRecognition = (output: any, context: __SerdeContext): CelebrityRecognition => {
  return {
    Celebrity:
      output.Celebrity !== undefined && output.Celebrity !== null
        ? deserializeAws_json1_1CelebrityDetail(output.Celebrity, context)
        : undefined,
    Timestamp: output.Timestamp !== undefined && output.Timestamp !== null ? output.Timestamp : undefined,
  } as any;
};

const deserializeAws_json1_1CelebrityRecognitions = (output: any, context: __SerdeContext): CelebrityRecognition[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1CelebrityRecognition(entry, context);
    });
};

const deserializeAws_json1_1CollectionIdList = (output: any, context: __SerdeContext): string[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return entry;
    });
};

const deserializeAws_json1_1ComparedFace = (output: any, context: __SerdeContext): ComparedFace => {
  return {
    BoundingBox:
      output.BoundingBox !== undefined && output.BoundingBox !== null
        ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
        : undefined,
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    Landmarks:
      output.Landmarks !== undefined && output.Landmarks !== null
        ? deserializeAws_json1_1Landmarks(output.Landmarks, context)
        : undefined,
    Pose:
      output.Pose !== undefined && output.Pose !== null ? deserializeAws_json1_1Pose(output.Pose, context) : undefined,
    Quality:
      output.Quality !== undefined && output.Quality !== null
        ? deserializeAws_json1_1ImageQuality(output.Quality, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1ComparedFaceList = (output: any, context: __SerdeContext): ComparedFace[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1ComparedFace(entry, context);
    });
};

const deserializeAws_json1_1ComparedSourceImageFace = (
  output: any,
  context: __SerdeContext
): ComparedSourceImageFace => {
  return {
    BoundingBox:
      output.BoundingBox !== undefined && output.BoundingBox !== null
        ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
        : undefined,
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
  } as any;
};

const deserializeAws_json1_1CompareFacesMatch = (output: any, context: __SerdeContext): CompareFacesMatch => {
  return {
    Face:
      output.Face !== undefined && output.Face !== null
        ? deserializeAws_json1_1ComparedFace(output.Face, context)
        : undefined,
    Similarity: output.Similarity !== undefined && output.Similarity !== null ? output.Similarity : undefined,
  } as any;
};

const deserializeAws_json1_1CompareFacesMatchList = (output: any, context: __SerdeContext): CompareFacesMatch[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1CompareFacesMatch(entry, context);
    });
};

const deserializeAws_json1_1CompareFacesResponse = (output: any, context: __SerdeContext): CompareFacesResponse => {
  return {
    FaceMatches:
      output.FaceMatches !== undefined && output.FaceMatches !== null
        ? deserializeAws_json1_1CompareFacesMatchList(output.FaceMatches, context)
        : undefined,
    SourceImageFace:
      output.SourceImageFace !== undefined && output.SourceImageFace !== null
        ? deserializeAws_json1_1ComparedSourceImageFace(output.SourceImageFace, context)
        : undefined,
    SourceImageOrientationCorrection:
      output.SourceImageOrientationCorrection !== undefined && output.SourceImageOrientationCorrection !== null
        ? output.SourceImageOrientationCorrection
        : undefined,
    TargetImageOrientationCorrection:
      output.TargetImageOrientationCorrection !== undefined && output.TargetImageOrientationCorrection !== null
        ? output.TargetImageOrientationCorrection
        : undefined,
    UnmatchedFaces:
      output.UnmatchedFaces !== undefined && output.UnmatchedFaces !== null
        ? deserializeAws_json1_1CompareFacesUnmatchList(output.UnmatchedFaces, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1CompareFacesUnmatchList = (output: any, context: __SerdeContext): ComparedFace[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1ComparedFace(entry, context);
    });
};

const deserializeAws_json1_1ContentModerationDetection = (
  output: any,
  context: __SerdeContext
): ContentModerationDetection => {
  return {
    ModerationLabel:
      output.ModerationLabel !== undefined && output.ModerationLabel !== null
        ? deserializeAws_json1_1ModerationLabel(output.ModerationLabel, context)
        : undefined,
    Timestamp: output.Timestamp !== undefined && output.Timestamp !== null ? output.Timestamp : undefined,
  } as any;
};

const deserializeAws_json1_1ContentModerationDetections = (
  output: any,
  context: __SerdeContext
): ContentModerationDetection[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1ContentModerationDetection(entry, context);
    });
};

const deserializeAws_json1_1CoversBodyPart = (output: any, context: __SerdeContext): CoversBodyPart => {
  return {
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
  } as any;
};

const deserializeAws_json1_1CreateCollectionResponse = (
  output: any,
  context: __SerdeContext
): CreateCollectionResponse => {
  return {
    CollectionArn:
      output.CollectionArn !== undefined && output.CollectionArn !== null ? output.CollectionArn : undefined,
    FaceModelVersion:
      output.FaceModelVersion !== undefined && output.FaceModelVersion !== null ? output.FaceModelVersion : undefined,
    StatusCode: output.StatusCode !== undefined && output.StatusCode !== null ? output.StatusCode : undefined,
  } as any;
};

const deserializeAws_json1_1CreateProjectResponse = (output: any, context: __SerdeContext): CreateProjectResponse => {
  return {
    ProjectArn: output.ProjectArn !== undefined && output.ProjectArn !== null ? output.ProjectArn : undefined,
  } as any;
};

const deserializeAws_json1_1CreateProjectVersionResponse = (
  output: any,
  context: __SerdeContext
): CreateProjectVersionResponse => {
  return {
    ProjectVersionArn:
      output.ProjectVersionArn !== undefined && output.ProjectVersionArn !== null
        ? output.ProjectVersionArn
        : undefined,
  } as any;
};

const deserializeAws_json1_1CreateStreamProcessorResponse = (
  output: any,
  context: __SerdeContext
): CreateStreamProcessorResponse => {
  return {
    StreamProcessorArn:
      output.StreamProcessorArn !== undefined && output.StreamProcessorArn !== null
        ? output.StreamProcessorArn
        : undefined,
  } as any;
};

const deserializeAws_json1_1CustomLabel = (output: any, context: __SerdeContext): CustomLabel => {
  return {
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    Geometry:
      output.Geometry !== undefined && output.Geometry !== null
        ? deserializeAws_json1_1Geometry(output.Geometry, context)
        : undefined,
    Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
  } as any;
};

const deserializeAws_json1_1CustomLabels = (output: any, context: __SerdeContext): CustomLabel[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1CustomLabel(entry, context);
    });
};

const deserializeAws_json1_1DeleteCollectionResponse = (
  output: any,
  context: __SerdeContext
): DeleteCollectionResponse => {
  return {
    StatusCode: output.StatusCode !== undefined && output.StatusCode !== null ? output.StatusCode : undefined,
  } as any;
};

const deserializeAws_json1_1DeleteFacesResponse = (output: any, context: __SerdeContext): DeleteFacesResponse => {
  return {
    DeletedFaces:
      output.DeletedFaces !== undefined && output.DeletedFaces !== null
        ? deserializeAws_json1_1FaceIdList(output.DeletedFaces, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1DeleteProjectResponse = (output: any, context: __SerdeContext): DeleteProjectResponse => {
  return {
    Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
  } as any;
};

const deserializeAws_json1_1DeleteProjectVersionResponse = (
  output: any,
  context: __SerdeContext
): DeleteProjectVersionResponse => {
  return {
    Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
  } as any;
};

const deserializeAws_json1_1DeleteStreamProcessorResponse = (
  output: any,
  context: __SerdeContext
): DeleteStreamProcessorResponse => {
  return {} as any;
};

const deserializeAws_json1_1DescribeCollectionResponse = (
  output: any,
  context: __SerdeContext
): DescribeCollectionResponse => {
  return {
    CollectionARN:
      output.CollectionARN !== undefined && output.CollectionARN !== null ? output.CollectionARN : undefined,
    CreationTimestamp:
      output.CreationTimestamp !== undefined && output.CreationTimestamp !== null
        ? new Date(Math.round(output.CreationTimestamp * 1000))
        : undefined,
    FaceCount: output.FaceCount !== undefined && output.FaceCount !== null ? output.FaceCount : undefined,
    FaceModelVersion:
      output.FaceModelVersion !== undefined && output.FaceModelVersion !== null ? output.FaceModelVersion : undefined,
  } as any;
};

const deserializeAws_json1_1DescribeProjectsResponse = (
  output: any,
  context: __SerdeContext
): DescribeProjectsResponse => {
  return {
    NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    ProjectDescriptions:
      output.ProjectDescriptions !== undefined && output.ProjectDescriptions !== null
        ? deserializeAws_json1_1ProjectDescriptions(output.ProjectDescriptions, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1DescribeProjectVersionsResponse = (
  output: any,
  context: __SerdeContext
): DescribeProjectVersionsResponse => {
  return {
    NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    ProjectVersionDescriptions:
      output.ProjectVersionDescriptions !== undefined && output.ProjectVersionDescriptions !== null
        ? deserializeAws_json1_1ProjectVersionDescriptions(output.ProjectVersionDescriptions, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1DescribeStreamProcessorResponse = (
  output: any,
  context: __SerdeContext
): DescribeStreamProcessorResponse => {
  return {
    CreationTimestamp:
      output.CreationTimestamp !== undefined && output.CreationTimestamp !== null
        ? new Date(Math.round(output.CreationTimestamp * 1000))
        : undefined,
    Input:
      output.Input !== undefined && output.Input !== null
        ? deserializeAws_json1_1StreamProcessorInput(output.Input, context)
        : undefined,
    LastUpdateTimestamp:
      output.LastUpdateTimestamp !== undefined && output.LastUpdateTimestamp !== null
        ? new Date(Math.round(output.LastUpdateTimestamp * 1000))
        : undefined,
    Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
    Output:
      output.Output !== undefined && output.Output !== null
        ? deserializeAws_json1_1StreamProcessorOutput(output.Output, context)
        : undefined,
    RoleArn: output.RoleArn !== undefined && output.RoleArn !== null ? output.RoleArn : undefined,
    Settings:
      output.Settings !== undefined && output.Settings !== null
        ? deserializeAws_json1_1StreamProcessorSettings(output.Settings, context)
        : undefined,
    Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
    StatusMessage:
      output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
    StreamProcessorArn:
      output.StreamProcessorArn !== undefined && output.StreamProcessorArn !== null
        ? output.StreamProcessorArn
        : undefined,
  } as any;
};

const deserializeAws_json1_1DetectCustomLabelsResponse = (
  output: any,
  context: __SerdeContext
): DetectCustomLabelsResponse => {
  return {
    CustomLabels:
      output.CustomLabels !== undefined && output.CustomLabels !== null
        ? deserializeAws_json1_1CustomLabels(output.CustomLabels, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1DetectFacesResponse = (output: any, context: __SerdeContext): DetectFacesResponse => {
  return {
    FaceDetails:
      output.FaceDetails !== undefined && output.FaceDetails !== null
        ? deserializeAws_json1_1FaceDetailList(output.FaceDetails, context)
        : undefined,
    OrientationCorrection:
      output.OrientationCorrection !== undefined && output.OrientationCorrection !== null
        ? output.OrientationCorrection
        : undefined,
  } as any;
};

const deserializeAws_json1_1DetectLabelsResponse = (output: any, context: __SerdeContext): DetectLabelsResponse => {
  return {
    LabelModelVersion:
      output.LabelModelVersion !== undefined && output.LabelModelVersion !== null
        ? output.LabelModelVersion
        : undefined,
    Labels:
      output.Labels !== undefined && output.Labels !== null
        ? deserializeAws_json1_1Labels(output.Labels, context)
        : undefined,
    OrientationCorrection:
      output.OrientationCorrection !== undefined && output.OrientationCorrection !== null
        ? output.OrientationCorrection
        : undefined,
  } as any;
};

const deserializeAws_json1_1DetectModerationLabelsResponse = (
  output: any,
  context: __SerdeContext
): DetectModerationLabelsResponse => {
  return {
    HumanLoopActivationOutput:
      output.HumanLoopActivationOutput !== undefined && output.HumanLoopActivationOutput !== null
        ? deserializeAws_json1_1HumanLoopActivationOutput(output.HumanLoopActivationOutput, context)
        : undefined,
    ModerationLabels:
      output.ModerationLabels !== undefined && output.ModerationLabels !== null
        ? deserializeAws_json1_1ModerationLabels(output.ModerationLabels, context)
        : undefined,
    ModerationModelVersion:
      output.ModerationModelVersion !== undefined && output.ModerationModelVersion !== null
        ? output.ModerationModelVersion
        : undefined,
  } as any;
};

const deserializeAws_json1_1DetectProtectiveEquipmentResponse = (
  output: any,
  context: __SerdeContext
): DetectProtectiveEquipmentResponse => {
  return {
    Persons:
      output.Persons !== undefined && output.Persons !== null
        ? deserializeAws_json1_1ProtectiveEquipmentPersons(output.Persons, context)
        : undefined,
    ProtectiveEquipmentModelVersion:
      output.ProtectiveEquipmentModelVersion !== undefined && output.ProtectiveEquipmentModelVersion !== null
        ? output.ProtectiveEquipmentModelVersion
        : undefined,
    Summary:
      output.Summary !== undefined && output.Summary !== null
        ? deserializeAws_json1_1ProtectiveEquipmentSummary(output.Summary, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1DetectTextResponse = (output: any, context: __SerdeContext): DetectTextResponse => {
  return {
    TextDetections:
      output.TextDetections !== undefined && output.TextDetections !== null
        ? deserializeAws_json1_1TextDetectionList(output.TextDetections, context)
        : undefined,
    TextModelVersion:
      output.TextModelVersion !== undefined && output.TextModelVersion !== null ? output.TextModelVersion : undefined,
  } as any;
};

const deserializeAws_json1_1Emotion = (output: any, context: __SerdeContext): Emotion => {
  return {
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
  } as any;
};

const deserializeAws_json1_1Emotions = (output: any, context: __SerdeContext): Emotion[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1Emotion(entry, context);
    });
};

const deserializeAws_json1_1EquipmentDetection = (output: any, context: __SerdeContext): EquipmentDetection => {
  return {
    BoundingBox:
      output.BoundingBox !== undefined && output.BoundingBox !== null
        ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
        : undefined,
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    CoversBodyPart:
      output.CoversBodyPart !== undefined && output.CoversBodyPart !== null
        ? deserializeAws_json1_1CoversBodyPart(output.CoversBodyPart, context)
        : undefined,
    Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
  } as any;
};

const deserializeAws_json1_1EquipmentDetections = (output: any, context: __SerdeContext): EquipmentDetection[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1EquipmentDetection(entry, context);
    });
};

const deserializeAws_json1_1EvaluationResult = (output: any, context: __SerdeContext): EvaluationResult => {
  return {
    F1Score: output.F1Score !== undefined && output.F1Score !== null ? output.F1Score : undefined,
    Summary:
      output.Summary !== undefined && output.Summary !== null
        ? deserializeAws_json1_1Summary(output.Summary, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1Eyeglasses = (output: any, context: __SerdeContext): Eyeglasses => {
  return {
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
  } as any;
};

const deserializeAws_json1_1EyeOpen = (output: any, context: __SerdeContext): EyeOpen => {
  return {
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
  } as any;
};

const deserializeAws_json1_1Face = (output: any, context: __SerdeContext): Face => {
  return {
    BoundingBox:
      output.BoundingBox !== undefined && output.BoundingBox !== null
        ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
        : undefined,
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    ExternalImageId:
      output.ExternalImageId !== undefined && output.ExternalImageId !== null ? output.ExternalImageId : undefined,
    FaceId: output.FaceId !== undefined && output.FaceId !== null ? output.FaceId : undefined,
    ImageId: output.ImageId !== undefined && output.ImageId !== null ? output.ImageId : undefined,
  } as any;
};

const deserializeAws_json1_1FaceDetail = (output: any, context: __SerdeContext): FaceDetail => {
  return {
    AgeRange:
      output.AgeRange !== undefined && output.AgeRange !== null
        ? deserializeAws_json1_1AgeRange(output.AgeRange, context)
        : undefined,
    Beard:
      output.Beard !== undefined && output.Beard !== null
        ? deserializeAws_json1_1Beard(output.Beard, context)
        : undefined,
    BoundingBox:
      output.BoundingBox !== undefined && output.BoundingBox !== null
        ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
        : undefined,
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    Emotions:
      output.Emotions !== undefined && output.Emotions !== null
        ? deserializeAws_json1_1Emotions(output.Emotions, context)
        : undefined,
    Eyeglasses:
      output.Eyeglasses !== undefined && output.Eyeglasses !== null
        ? deserializeAws_json1_1Eyeglasses(output.Eyeglasses, context)
        : undefined,
    EyesOpen:
      output.EyesOpen !== undefined && output.EyesOpen !== null
        ? deserializeAws_json1_1EyeOpen(output.EyesOpen, context)
        : undefined,
    Gender:
      output.Gender !== undefined && output.Gender !== null
        ? deserializeAws_json1_1Gender(output.Gender, context)
        : undefined,
    Landmarks:
      output.Landmarks !== undefined && output.Landmarks !== null
        ? deserializeAws_json1_1Landmarks(output.Landmarks, context)
        : undefined,
    MouthOpen:
      output.MouthOpen !== undefined && output.MouthOpen !== null
        ? deserializeAws_json1_1MouthOpen(output.MouthOpen, context)
        : undefined,
    Mustache:
      output.Mustache !== undefined && output.Mustache !== null
        ? deserializeAws_json1_1Mustache(output.Mustache, context)
        : undefined,
    Pose:
      output.Pose !== undefined && output.Pose !== null ? deserializeAws_json1_1Pose(output.Pose, context) : undefined,
    Quality:
      output.Quality !== undefined && output.Quality !== null
        ? deserializeAws_json1_1ImageQuality(output.Quality, context)
        : undefined,
    Smile:
      output.Smile !== undefined && output.Smile !== null
        ? deserializeAws_json1_1Smile(output.Smile, context)
        : undefined,
    Sunglasses:
      output.Sunglasses !== undefined && output.Sunglasses !== null
        ? deserializeAws_json1_1Sunglasses(output.Sunglasses, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1FaceDetailList = (output: any, context: __SerdeContext): FaceDetail[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1FaceDetail(entry, context);
    });
};

const deserializeAws_json1_1FaceDetection = (output: any, context: __SerdeContext): FaceDetection => {
  return {
    Face:
      output.Face !== undefined && output.Face !== null
        ? deserializeAws_json1_1FaceDetail(output.Face, context)
        : undefined,
    Timestamp: output.Timestamp !== undefined && output.Timestamp !== null ? output.Timestamp : undefined,
  } as any;
};

const deserializeAws_json1_1FaceDetections = (output: any, context: __SerdeContext): FaceDetection[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1FaceDetection(entry, context);
    });
};

const deserializeAws_json1_1FaceIdList = (output: any, context: __SerdeContext): string[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return entry;
    });
};

const deserializeAws_json1_1FaceList = (output: any, context: __SerdeContext): Face[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1Face(entry, context);
    });
};

const deserializeAws_json1_1FaceMatch = (output: any, context: __SerdeContext): FaceMatch => {
  return {
    Face:
      output.Face !== undefined && output.Face !== null ? deserializeAws_json1_1Face(output.Face, context) : undefined,
    Similarity: output.Similarity !== undefined && output.Similarity !== null ? output.Similarity : undefined,
  } as any;
};

const deserializeAws_json1_1FaceMatchList = (output: any, context: __SerdeContext): FaceMatch[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1FaceMatch(entry, context);
    });
};

const deserializeAws_json1_1FaceModelVersionList = (output: any, context: __SerdeContext): string[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return entry;
    });
};

const deserializeAws_json1_1FaceRecord = (output: any, context: __SerdeContext): FaceRecord => {
  return {
    Face:
      output.Face !== undefined && output.Face !== null ? deserializeAws_json1_1Face(output.Face, context) : undefined,
    FaceDetail:
      output.FaceDetail !== undefined && output.FaceDetail !== null
        ? deserializeAws_json1_1FaceDetail(output.FaceDetail, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1FaceRecordList = (output: any, context: __SerdeContext): FaceRecord[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1FaceRecord(entry, context);
    });
};

const deserializeAws_json1_1FaceSearchSettings = (output: any, context: __SerdeContext): FaceSearchSettings => {
  return {
    CollectionId: output.CollectionId !== undefined && output.CollectionId !== null ? output.CollectionId : undefined,
    FaceMatchThreshold:
      output.FaceMatchThreshold !== undefined && output.FaceMatchThreshold !== null
        ? output.FaceMatchThreshold
        : undefined,
  } as any;
};

const deserializeAws_json1_1Gender = (output: any, context: __SerdeContext): Gender => {
  return {
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
  } as any;
};

const deserializeAws_json1_1Geometry = (output: any, context: __SerdeContext): Geometry => {
  return {
    BoundingBox:
      output.BoundingBox !== undefined && output.BoundingBox !== null
        ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
        : undefined,
    Polygon:
      output.Polygon !== undefined && output.Polygon !== null
        ? deserializeAws_json1_1Polygon(output.Polygon, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1GetCelebrityInfoResponse = (
  output: any,
  context: __SerdeContext
): GetCelebrityInfoResponse => {
  return {
    Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
    Urls:
      output.Urls !== undefined && output.Urls !== null ? deserializeAws_json1_1Urls(output.Urls, context) : undefined,
  } as any;
};

const deserializeAws_json1_1GetCelebrityRecognitionResponse = (
  output: any,
  context: __SerdeContext
): GetCelebrityRecognitionResponse => {
  return {
    Celebrities:
      output.Celebrities !== undefined && output.Celebrities !== null
        ? deserializeAws_json1_1CelebrityRecognitions(output.Celebrities, context)
        : undefined,
    JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    StatusMessage:
      output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
    VideoMetadata:
      output.VideoMetadata !== undefined && output.VideoMetadata !== null
        ? deserializeAws_json1_1VideoMetadata(output.VideoMetadata, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1GetContentModerationResponse = (
  output: any,
  context: __SerdeContext
): GetContentModerationResponse => {
  return {
    JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    ModerationLabels:
      output.ModerationLabels !== undefined && output.ModerationLabels !== null
        ? deserializeAws_json1_1ContentModerationDetections(output.ModerationLabels, context)
        : undefined,
    ModerationModelVersion:
      output.ModerationModelVersion !== undefined && output.ModerationModelVersion !== null
        ? output.ModerationModelVersion
        : undefined,
    NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    StatusMessage:
      output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
    VideoMetadata:
      output.VideoMetadata !== undefined && output.VideoMetadata !== null
        ? deserializeAws_json1_1VideoMetadata(output.VideoMetadata, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1GetFaceDetectionResponse = (
  output: any,
  context: __SerdeContext
): GetFaceDetectionResponse => {
  return {
    Faces:
      output.Faces !== undefined && output.Faces !== null
        ? deserializeAws_json1_1FaceDetections(output.Faces, context)
        : undefined,
    JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    StatusMessage:
      output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
    VideoMetadata:
      output.VideoMetadata !== undefined && output.VideoMetadata !== null
        ? deserializeAws_json1_1VideoMetadata(output.VideoMetadata, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1GetFaceSearchResponse = (output: any, context: __SerdeContext): GetFaceSearchResponse => {
  return {
    JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    Persons:
      output.Persons !== undefined && output.Persons !== null
        ? deserializeAws_json1_1PersonMatches(output.Persons, context)
        : undefined,
    StatusMessage:
      output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
    VideoMetadata:
      output.VideoMetadata !== undefined && output.VideoMetadata !== null
        ? deserializeAws_json1_1VideoMetadata(output.VideoMetadata, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1GetLabelDetectionResponse = (
  output: any,
  context: __SerdeContext
): GetLabelDetectionResponse => {
  return {
    JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    LabelModelVersion:
      output.LabelModelVersion !== undefined && output.LabelModelVersion !== null
        ? output.LabelModelVersion
        : undefined,
    Labels:
      output.Labels !== undefined && output.Labels !== null
        ? deserializeAws_json1_1LabelDetections(output.Labels, context)
        : undefined,
    NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    StatusMessage:
      output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
    VideoMetadata:
      output.VideoMetadata !== undefined && output.VideoMetadata !== null
        ? deserializeAws_json1_1VideoMetadata(output.VideoMetadata, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1GetPersonTrackingResponse = (
  output: any,
  context: __SerdeContext
): GetPersonTrackingResponse => {
  return {
    JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    Persons:
      output.Persons !== undefined && output.Persons !== null
        ? deserializeAws_json1_1PersonDetections(output.Persons, context)
        : undefined,
    StatusMessage:
      output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
    VideoMetadata:
      output.VideoMetadata !== undefined && output.VideoMetadata !== null
        ? deserializeAws_json1_1VideoMetadata(output.VideoMetadata, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1GetSegmentDetectionResponse = (
  output: any,
  context: __SerdeContext
): GetSegmentDetectionResponse => {
  return {
    AudioMetadata:
      output.AudioMetadata !== undefined && output.AudioMetadata !== null
        ? deserializeAws_json1_1AudioMetadataList(output.AudioMetadata, context)
        : undefined,
    JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    Segments:
      output.Segments !== undefined && output.Segments !== null
        ? deserializeAws_json1_1SegmentDetections(output.Segments, context)
        : undefined,
    SelectedSegmentTypes:
      output.SelectedSegmentTypes !== undefined && output.SelectedSegmentTypes !== null
        ? deserializeAws_json1_1SegmentTypesInfo(output.SelectedSegmentTypes, context)
        : undefined,
    StatusMessage:
      output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
    VideoMetadata:
      output.VideoMetadata !== undefined && output.VideoMetadata !== null
        ? deserializeAws_json1_1VideoMetadataList(output.VideoMetadata, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1GetTextDetectionResponse = (
  output: any,
  context: __SerdeContext
): GetTextDetectionResponse => {
  return {
    JobStatus: output.JobStatus !== undefined && output.JobStatus !== null ? output.JobStatus : undefined,
    NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    StatusMessage:
      output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
    TextDetections:
      output.TextDetections !== undefined && output.TextDetections !== null
        ? deserializeAws_json1_1TextDetectionResults(output.TextDetections, context)
        : undefined,
    TextModelVersion:
      output.TextModelVersion !== undefined && output.TextModelVersion !== null ? output.TextModelVersion : undefined,
    VideoMetadata:
      output.VideoMetadata !== undefined && output.VideoMetadata !== null
        ? deserializeAws_json1_1VideoMetadata(output.VideoMetadata, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1GroundTruthManifest = (output: any, context: __SerdeContext): GroundTruthManifest => {
  return {
    S3Object:
      output.S3Object !== undefined && output.S3Object !== null
        ? deserializeAws_json1_1S3Object(output.S3Object, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1HumanLoopActivationOutput = (
  output: any,
  context: __SerdeContext
): HumanLoopActivationOutput => {
  return {
    HumanLoopActivationConditionsEvaluationResults:
      output.HumanLoopActivationConditionsEvaluationResults !== undefined &&
      output.HumanLoopActivationConditionsEvaluationResults !== null
        ? new __LazyJsonString(output.HumanLoopActivationConditionsEvaluationResults)
        : undefined,
    HumanLoopActivationReasons:
      output.HumanLoopActivationReasons !== undefined && output.HumanLoopActivationReasons !== null
        ? deserializeAws_json1_1HumanLoopActivationReasons(output.HumanLoopActivationReasons, context)
        : undefined,
    HumanLoopArn: output.HumanLoopArn !== undefined && output.HumanLoopArn !== null ? output.HumanLoopArn : undefined,
  } as any;
};

const deserializeAws_json1_1HumanLoopActivationReasons = (output: any, context: __SerdeContext): string[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return entry;
    });
};

const deserializeAws_json1_1HumanLoopQuotaExceededException = (
  output: any,
  context: __SerdeContext
): HumanLoopQuotaExceededException => {
  return {
    Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
    Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
    Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
    QuotaCode: output.QuotaCode !== undefined && output.QuotaCode !== null ? output.QuotaCode : undefined,
    ResourceType: output.ResourceType !== undefined && output.ResourceType !== null ? output.ResourceType : undefined,
    ServiceCode: output.ServiceCode !== undefined && output.ServiceCode !== null ? output.ServiceCode : undefined,
  } as any;
};

const deserializeAws_json1_1IdempotentParameterMismatchException = (
  output: any,
  context: __SerdeContext
): IdempotentParameterMismatchException => {
  return {
    Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
    Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
    Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
  } as any;
};

const deserializeAws_json1_1ImageQuality = (output: any, context: __SerdeContext): ImageQuality => {
  return {
    Brightness: output.Brightness !== undefined && output.Brightness !== null ? output.Brightness : undefined,
    Sharpness: output.Sharpness !== undefined && output.Sharpness !== null ? output.Sharpness : undefined,
  } as any;
};

const deserializeAws_json1_1ImageTooLargeException = (output: any, context: __SerdeContext): ImageTooLargeException => {
  return {
    Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
    Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
    Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
  } as any;
};

const deserializeAws_json1_1IndexFacesResponse = (output: any, context: __SerdeContext): IndexFacesResponse => {
  return {
    FaceModelVersion:
      output.FaceModelVersion !== undefined && output.FaceModelVersion !== null ? output.FaceModelVersion : undefined,
    FaceRecords:
      output.FaceRecords !== undefined && output.FaceRecords !== null
        ? deserializeAws_json1_1FaceRecordList(output.FaceRecords, context)
        : undefined,
    OrientationCorrection:
      output.OrientationCorrection !== undefined && output.OrientationCorrection !== null
        ? output.OrientationCorrection
        : undefined,
    UnindexedFaces:
      output.UnindexedFaces !== undefined && output.UnindexedFaces !== null
        ? deserializeAws_json1_1UnindexedFaces(output.UnindexedFaces, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1Instance = (output: any, context: __SerdeContext): Instance => {
  return {
    BoundingBox:
      output.BoundingBox !== undefined && output.BoundingBox !== null
        ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
        : undefined,
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
  } as any;
};

const deserializeAws_json1_1Instances = (output: any, context: __SerdeContext): Instance[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1Instance(entry, context);
    });
};

const deserializeAws_json1_1InternalServerError = (output: any, context: __SerdeContext): InternalServerError => {
  return {
    Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
    Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
    Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
  } as any;
};

const deserializeAws_json1_1InvalidImageFormatException = (
  output: any,
  context: __SerdeContext
): InvalidImageFormatException => {
  return {
    Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
    Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
    Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
  } as any;
};

const deserializeAws_json1_1InvalidPaginationTokenException = (
  output: any,
  context: __SerdeContext
): InvalidPaginationTokenException => {
  return {
    Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
    Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
    Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
  } as any;
};

const deserializeAws_json1_1InvalidParameterException = (
  output: any,
  context: __SerdeContext
): InvalidParameterException => {
  return {
    Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
    Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
    Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
  } as any;
};

const deserializeAws_json1_1InvalidS3ObjectException = (
  output: any,
  context: __SerdeContext
): InvalidS3ObjectException => {
  return {
    Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
    Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
    Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
  } as any;
};

const deserializeAws_json1_1KinesisDataStream = (output: any, context: __SerdeContext): KinesisDataStream => {
  return {
    Arn: output.Arn !== undefined && output.Arn !== null ? output.Arn : undefined,
  } as any;
};

const deserializeAws_json1_1KinesisVideoStream = (output: any, context: __SerdeContext): KinesisVideoStream => {
  return {
    Arn: output.Arn !== undefined && output.Arn !== null ? output.Arn : undefined,
  } as any;
};

const deserializeAws_json1_1Label = (output: any, context: __SerdeContext): Label => {
  return {
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    Instances:
      output.Instances !== undefined && output.Instances !== null
        ? deserializeAws_json1_1Instances(output.Instances, context)
        : undefined,
    Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
    Parents:
      output.Parents !== undefined && output.Parents !== null
        ? deserializeAws_json1_1Parents(output.Parents, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1LabelDetection = (output: any, context: __SerdeContext): LabelDetection => {
  return {
    Label:
      output.Label !== undefined && output.Label !== null
        ? deserializeAws_json1_1Label(output.Label, context)
        : undefined,
    Timestamp: output.Timestamp !== undefined && output.Timestamp !== null ? output.Timestamp : undefined,
  } as any;
};

const deserializeAws_json1_1LabelDetections = (output: any, context: __SerdeContext): LabelDetection[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1LabelDetection(entry, context);
    });
};

const deserializeAws_json1_1Labels = (output: any, context: __SerdeContext): Label[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1Label(entry, context);
    });
};

const deserializeAws_json1_1Landmark = (output: any, context: __SerdeContext): Landmark => {
  return {
    Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
    X: output.X !== undefined && output.X !== null ? output.X : undefined,
    Y: output.Y !== undefined && output.Y !== null ? output.Y : undefined,
  } as any;
};

const deserializeAws_json1_1Landmarks = (output: any, context: __SerdeContext): Landmark[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1Landmark(entry, context);
    });
};

const deserializeAws_json1_1LimitExceededException = (output: any, context: __SerdeContext): LimitExceededException => {
  return {
    Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
    Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
    Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
  } as any;
};

const deserializeAws_json1_1ListCollectionsResponse = (
  output: any,
  context: __SerdeContext
): ListCollectionsResponse => {
  return {
    CollectionIds:
      output.CollectionIds !== undefined && output.CollectionIds !== null
        ? deserializeAws_json1_1CollectionIdList(output.CollectionIds, context)
        : undefined,
    FaceModelVersions:
      output.FaceModelVersions !== undefined && output.FaceModelVersions !== null
        ? deserializeAws_json1_1FaceModelVersionList(output.FaceModelVersions, context)
        : undefined,
    NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
  } as any;
};

const deserializeAws_json1_1ListFacesResponse = (output: any, context: __SerdeContext): ListFacesResponse => {
  return {
    FaceModelVersion:
      output.FaceModelVersion !== undefined && output.FaceModelVersion !== null ? output.FaceModelVersion : undefined,
    Faces:
      output.Faces !== undefined && output.Faces !== null
        ? deserializeAws_json1_1FaceList(output.Faces, context)
        : undefined,
    NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
  } as any;
};

const deserializeAws_json1_1ListStreamProcessorsResponse = (
  output: any,
  context: __SerdeContext
): ListStreamProcessorsResponse => {
  return {
    NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    StreamProcessors:
      output.StreamProcessors !== undefined && output.StreamProcessors !== null
        ? deserializeAws_json1_1StreamProcessorList(output.StreamProcessors, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1ModerationLabel = (output: any, context: __SerdeContext): ModerationLabel => {
  return {
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
    ParentName: output.ParentName !== undefined && output.ParentName !== null ? output.ParentName : undefined,
  } as any;
};

const deserializeAws_json1_1ModerationLabels = (output: any, context: __SerdeContext): ModerationLabel[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1ModerationLabel(entry, context);
    });
};

const deserializeAws_json1_1MouthOpen = (output: any, context: __SerdeContext): MouthOpen => {
  return {
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
  } as any;
};

const deserializeAws_json1_1Mustache = (output: any, context: __SerdeContext): Mustache => {
  return {
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
  } as any;
};

const deserializeAws_json1_1OutputConfig = (output: any, context: __SerdeContext): OutputConfig => {
  return {
    S3Bucket: output.S3Bucket !== undefined && output.S3Bucket !== null ? output.S3Bucket : undefined,
    S3KeyPrefix: output.S3KeyPrefix !== undefined && output.S3KeyPrefix !== null ? output.S3KeyPrefix : undefined,
  } as any;
};

const deserializeAws_json1_1Parent = (output: any, context: __SerdeContext): Parent => {
  return {
    Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
  } as any;
};

const deserializeAws_json1_1Parents = (output: any, context: __SerdeContext): Parent[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1Parent(entry, context);
    });
};

const deserializeAws_json1_1PersonDetail = (output: any, context: __SerdeContext): PersonDetail => {
  return {
    BoundingBox:
      output.BoundingBox !== undefined && output.BoundingBox !== null
        ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
        : undefined,
    Face:
      output.Face !== undefined && output.Face !== null
        ? deserializeAws_json1_1FaceDetail(output.Face, context)
        : undefined,
    Index: output.Index !== undefined && output.Index !== null ? output.Index : undefined,
  } as any;
};

const deserializeAws_json1_1PersonDetection = (output: any, context: __SerdeContext): PersonDetection => {
  return {
    Person:
      output.Person !== undefined && output.Person !== null
        ? deserializeAws_json1_1PersonDetail(output.Person, context)
        : undefined,
    Timestamp: output.Timestamp !== undefined && output.Timestamp !== null ? output.Timestamp : undefined,
  } as any;
};

const deserializeAws_json1_1PersonDetections = (output: any, context: __SerdeContext): PersonDetection[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1PersonDetection(entry, context);
    });
};

const deserializeAws_json1_1PersonMatch = (output: any, context: __SerdeContext): PersonMatch => {
  return {
    FaceMatches:
      output.FaceMatches !== undefined && output.FaceMatches !== null
        ? deserializeAws_json1_1FaceMatchList(output.FaceMatches, context)
        : undefined,
    Person:
      output.Person !== undefined && output.Person !== null
        ? deserializeAws_json1_1PersonDetail(output.Person, context)
        : undefined,
    Timestamp: output.Timestamp !== undefined && output.Timestamp !== null ? output.Timestamp : undefined,
  } as any;
};

const deserializeAws_json1_1PersonMatches = (output: any, context: __SerdeContext): PersonMatch[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1PersonMatch(entry, context);
    });
};

const deserializeAws_json1_1Point = (output: any, context: __SerdeContext): Point => {
  return {
    X: output.X !== undefined && output.X !== null ? output.X : undefined,
    Y: output.Y !== undefined && output.Y !== null ? output.Y : undefined,
  } as any;
};

const deserializeAws_json1_1Polygon = (output: any, context: __SerdeContext): Point[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1Point(entry, context);
    });
};

const deserializeAws_json1_1Pose = (output: any, context: __SerdeContext): Pose => {
  return {
    Pitch: output.Pitch !== undefined && output.Pitch !== null ? output.Pitch : undefined,
    Roll: output.Roll !== undefined && output.Roll !== null ? output.Roll : undefined,
    Yaw: output.Yaw !== undefined && output.Yaw !== null ? output.Yaw : undefined,
  } as any;
};

const deserializeAws_json1_1ProjectDescription = (output: any, context: __SerdeContext): ProjectDescription => {
  return {
    CreationTimestamp:
      output.CreationTimestamp !== undefined && output.CreationTimestamp !== null
        ? new Date(Math.round(output.CreationTimestamp * 1000))
        : undefined,
    ProjectArn: output.ProjectArn !== undefined && output.ProjectArn !== null ? output.ProjectArn : undefined,
    Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
  } as any;
};

const deserializeAws_json1_1ProjectDescriptions = (output: any, context: __SerdeContext): ProjectDescription[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1ProjectDescription(entry, context);
    });
};

const deserializeAws_json1_1ProjectVersionDescription = (
  output: any,
  context: __SerdeContext
): ProjectVersionDescription => {
  return {
    BillableTrainingTimeInSeconds:
      output.BillableTrainingTimeInSeconds !== undefined && output.BillableTrainingTimeInSeconds !== null
        ? output.BillableTrainingTimeInSeconds
        : undefined,
    CreationTimestamp:
      output.CreationTimestamp !== undefined && output.CreationTimestamp !== null
        ? new Date(Math.round(output.CreationTimestamp * 1000))
        : undefined,
    EvaluationResult:
      output.EvaluationResult !== undefined && output.EvaluationResult !== null
        ? deserializeAws_json1_1EvaluationResult(output.EvaluationResult, context)
        : undefined,
    ManifestSummary:
      output.ManifestSummary !== undefined && output.ManifestSummary !== null
        ? deserializeAws_json1_1GroundTruthManifest(output.ManifestSummary, context)
        : undefined,
    MinInferenceUnits:
      output.MinInferenceUnits !== undefined && output.MinInferenceUnits !== null
        ? output.MinInferenceUnits
        : undefined,
    OutputConfig:
      output.OutputConfig !== undefined && output.OutputConfig !== null
        ? deserializeAws_json1_1OutputConfig(output.OutputConfig, context)
        : undefined,
    ProjectVersionArn:
      output.ProjectVersionArn !== undefined && output.ProjectVersionArn !== null
        ? output.ProjectVersionArn
        : undefined,
    Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
    StatusMessage:
      output.StatusMessage !== undefined && output.StatusMessage !== null ? output.StatusMessage : undefined,
    TestingDataResult:
      output.TestingDataResult !== undefined && output.TestingDataResult !== null
        ? deserializeAws_json1_1TestingDataResult(output.TestingDataResult, context)
        : undefined,
    TrainingDataResult:
      output.TrainingDataResult !== undefined && output.TrainingDataResult !== null
        ? deserializeAws_json1_1TrainingDataResult(output.TrainingDataResult, context)
        : undefined,
    TrainingEndTimestamp:
      output.TrainingEndTimestamp !== undefined && output.TrainingEndTimestamp !== null
        ? new Date(Math.round(output.TrainingEndTimestamp * 1000))
        : undefined,
  } as any;
};

const deserializeAws_json1_1ProjectVersionDescriptions = (
  output: any,
  context: __SerdeContext
): ProjectVersionDescription[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1ProjectVersionDescription(entry, context);
    });
};

const deserializeAws_json1_1ProtectiveEquipmentBodyPart = (
  output: any,
  context: __SerdeContext
): ProtectiveEquipmentBodyPart => {
  return {
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    EquipmentDetections:
      output.EquipmentDetections !== undefined && output.EquipmentDetections !== null
        ? deserializeAws_json1_1EquipmentDetections(output.EquipmentDetections, context)
        : undefined,
    Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
  } as any;
};

const deserializeAws_json1_1ProtectiveEquipmentPerson = (
  output: any,
  context: __SerdeContext
): ProtectiveEquipmentPerson => {
  return {
    BodyParts:
      output.BodyParts !== undefined && output.BodyParts !== null
        ? deserializeAws_json1_1BodyParts(output.BodyParts, context)
        : undefined,
    BoundingBox:
      output.BoundingBox !== undefined && output.BoundingBox !== null
        ? deserializeAws_json1_1BoundingBox(output.BoundingBox, context)
        : undefined,
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    Id: output.Id !== undefined && output.Id !== null ? output.Id : undefined,
  } as any;
};

const deserializeAws_json1_1ProtectiveEquipmentPersonIds = (output: any, context: __SerdeContext): number[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return entry;
    });
};

const deserializeAws_json1_1ProtectiveEquipmentPersons = (
  output: any,
  context: __SerdeContext
): ProtectiveEquipmentPerson[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1ProtectiveEquipmentPerson(entry, context);
    });
};

const deserializeAws_json1_1ProtectiveEquipmentSummary = (
  output: any,
  context: __SerdeContext
): ProtectiveEquipmentSummary => {
  return {
    PersonsIndeterminate:
      output.PersonsIndeterminate !== undefined && output.PersonsIndeterminate !== null
        ? deserializeAws_json1_1ProtectiveEquipmentPersonIds(output.PersonsIndeterminate, context)
        : undefined,
    PersonsWithRequiredEquipment:
      output.PersonsWithRequiredEquipment !== undefined && output.PersonsWithRequiredEquipment !== null
        ? deserializeAws_json1_1ProtectiveEquipmentPersonIds(output.PersonsWithRequiredEquipment, context)
        : undefined,
    PersonsWithoutRequiredEquipment:
      output.PersonsWithoutRequiredEquipment !== undefined && output.PersonsWithoutRequiredEquipment !== null
        ? deserializeAws_json1_1ProtectiveEquipmentPersonIds(output.PersonsWithoutRequiredEquipment, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1ProvisionedThroughputExceededException = (
  output: any,
  context: __SerdeContext
): ProvisionedThroughputExceededException => {
  return {
    Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
    Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
    Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
  } as any;
};

const deserializeAws_json1_1Reasons = (output: any, context: __SerdeContext): (Reason | string)[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return entry;
    });
};

const deserializeAws_json1_1RecognizeCelebritiesResponse = (
  output: any,
  context: __SerdeContext
): RecognizeCelebritiesResponse => {
  return {
    CelebrityFaces:
      output.CelebrityFaces !== undefined && output.CelebrityFaces !== null
        ? deserializeAws_json1_1CelebrityList(output.CelebrityFaces, context)
        : undefined,
    OrientationCorrection:
      output.OrientationCorrection !== undefined && output.OrientationCorrection !== null
        ? output.OrientationCorrection
        : undefined,
    UnrecognizedFaces:
      output.UnrecognizedFaces !== undefined && output.UnrecognizedFaces !== null
        ? deserializeAws_json1_1ComparedFaceList(output.UnrecognizedFaces, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1ResourceAlreadyExistsException = (
  output: any,
  context: __SerdeContext
): ResourceAlreadyExistsException => {
  return {
    Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
    Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
    Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
  } as any;
};

const deserializeAws_json1_1ResourceInUseException = (output: any, context: __SerdeContext): ResourceInUseException => {
  return {
    Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
    Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
    Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
  } as any;
};

const deserializeAws_json1_1ResourceNotFoundException = (
  output: any,
  context: __SerdeContext
): ResourceNotFoundException => {
  return {
    Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
    Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
    Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
  } as any;
};

const deserializeAws_json1_1ResourceNotReadyException = (
  output: any,
  context: __SerdeContext
): ResourceNotReadyException => {
  return {
    Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
    Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
    Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
  } as any;
};

const deserializeAws_json1_1S3Object = (output: any, context: __SerdeContext): S3Object => {
  return {
    Bucket: output.Bucket !== undefined && output.Bucket !== null ? output.Bucket : undefined,
    Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
    Version: output.Version !== undefined && output.Version !== null ? output.Version : undefined,
  } as any;
};

const deserializeAws_json1_1SearchFacesByImageResponse = (
  output: any,
  context: __SerdeContext
): SearchFacesByImageResponse => {
  return {
    FaceMatches:
      output.FaceMatches !== undefined && output.FaceMatches !== null
        ? deserializeAws_json1_1FaceMatchList(output.FaceMatches, context)
        : undefined,
    FaceModelVersion:
      output.FaceModelVersion !== undefined && output.FaceModelVersion !== null ? output.FaceModelVersion : undefined,
    SearchedFaceBoundingBox:
      output.SearchedFaceBoundingBox !== undefined && output.SearchedFaceBoundingBox !== null
        ? deserializeAws_json1_1BoundingBox(output.SearchedFaceBoundingBox, context)
        : undefined,
    SearchedFaceConfidence:
      output.SearchedFaceConfidence !== undefined && output.SearchedFaceConfidence !== null
        ? output.SearchedFaceConfidence
        : undefined,
  } as any;
};

const deserializeAws_json1_1SearchFacesResponse = (output: any, context: __SerdeContext): SearchFacesResponse => {
  return {
    FaceMatches:
      output.FaceMatches !== undefined && output.FaceMatches !== null
        ? deserializeAws_json1_1FaceMatchList(output.FaceMatches, context)
        : undefined,
    FaceModelVersion:
      output.FaceModelVersion !== undefined && output.FaceModelVersion !== null ? output.FaceModelVersion : undefined,
    SearchedFaceId:
      output.SearchedFaceId !== undefined && output.SearchedFaceId !== null ? output.SearchedFaceId : undefined,
  } as any;
};

const deserializeAws_json1_1SegmentDetection = (output: any, context: __SerdeContext): SegmentDetection => {
  return {
    DurationMillis:
      output.DurationMillis !== undefined && output.DurationMillis !== null ? output.DurationMillis : undefined,
    DurationSMPTE:
      output.DurationSMPTE !== undefined && output.DurationSMPTE !== null ? output.DurationSMPTE : undefined,
    EndTimecodeSMPTE:
      output.EndTimecodeSMPTE !== undefined && output.EndTimecodeSMPTE !== null ? output.EndTimecodeSMPTE : undefined,
    EndTimestampMillis:
      output.EndTimestampMillis !== undefined && output.EndTimestampMillis !== null
        ? output.EndTimestampMillis
        : undefined,
    ShotSegment:
      output.ShotSegment !== undefined && output.ShotSegment !== null
        ? deserializeAws_json1_1ShotSegment(output.ShotSegment, context)
        : undefined,
    StartTimecodeSMPTE:
      output.StartTimecodeSMPTE !== undefined && output.StartTimecodeSMPTE !== null
        ? output.StartTimecodeSMPTE
        : undefined,
    StartTimestampMillis:
      output.StartTimestampMillis !== undefined && output.StartTimestampMillis !== null
        ? output.StartTimestampMillis
        : undefined,
    TechnicalCueSegment:
      output.TechnicalCueSegment !== undefined && output.TechnicalCueSegment !== null
        ? deserializeAws_json1_1TechnicalCueSegment(output.TechnicalCueSegment, context)
        : undefined,
    Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
  } as any;
};

const deserializeAws_json1_1SegmentDetections = (output: any, context: __SerdeContext): SegmentDetection[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1SegmentDetection(entry, context);
    });
};

const deserializeAws_json1_1SegmentTypeInfo = (output: any, context: __SerdeContext): SegmentTypeInfo => {
  return {
    ModelVersion: output.ModelVersion !== undefined && output.ModelVersion !== null ? output.ModelVersion : undefined,
    Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
  } as any;
};

const deserializeAws_json1_1SegmentTypesInfo = (output: any, context: __SerdeContext): SegmentTypeInfo[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1SegmentTypeInfo(entry, context);
    });
};

const deserializeAws_json1_1ServiceQuotaExceededException = (
  output: any,
  context: __SerdeContext
): ServiceQuotaExceededException => {
  return {
    Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
    Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
    Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
  } as any;
};

const deserializeAws_json1_1ShotSegment = (output: any, context: __SerdeContext): ShotSegment => {
  return {
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    Index: output.Index !== undefined && output.Index !== null ? output.Index : undefined,
  } as any;
};

const deserializeAws_json1_1Smile = (output: any, context: __SerdeContext): Smile => {
  return {
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
  } as any;
};

const deserializeAws_json1_1StartCelebrityRecognitionResponse = (
  output: any,
  context: __SerdeContext
): StartCelebrityRecognitionResponse => {
  return {
    JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
  } as any;
};

const deserializeAws_json1_1StartContentModerationResponse = (
  output: any,
  context: __SerdeContext
): StartContentModerationResponse => {
  return {
    JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
  } as any;
};

const deserializeAws_json1_1StartFaceDetectionResponse = (
  output: any,
  context: __SerdeContext
): StartFaceDetectionResponse => {
  return {
    JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
  } as any;
};

const deserializeAws_json1_1StartFaceSearchResponse = (
  output: any,
  context: __SerdeContext
): StartFaceSearchResponse => {
  return {
    JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
  } as any;
};

const deserializeAws_json1_1StartLabelDetectionResponse = (
  output: any,
  context: __SerdeContext
): StartLabelDetectionResponse => {
  return {
    JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
  } as any;
};

const deserializeAws_json1_1StartPersonTrackingResponse = (
  output: any,
  context: __SerdeContext
): StartPersonTrackingResponse => {
  return {
    JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
  } as any;
};

const deserializeAws_json1_1StartProjectVersionResponse = (
  output: any,
  context: __SerdeContext
): StartProjectVersionResponse => {
  return {
    Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
  } as any;
};

const deserializeAws_json1_1StartSegmentDetectionResponse = (
  output: any,
  context: __SerdeContext
): StartSegmentDetectionResponse => {
  return {
    JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
  } as any;
};

const deserializeAws_json1_1StartStreamProcessorResponse = (
  output: any,
  context: __SerdeContext
): StartStreamProcessorResponse => {
  return {} as any;
};

const deserializeAws_json1_1StartTextDetectionResponse = (
  output: any,
  context: __SerdeContext
): StartTextDetectionResponse => {
  return {
    JobId: output.JobId !== undefined && output.JobId !== null ? output.JobId : undefined,
  } as any;
};

const deserializeAws_json1_1StopProjectVersionResponse = (
  output: any,
  context: __SerdeContext
): StopProjectVersionResponse => {
  return {
    Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
  } as any;
};

const deserializeAws_json1_1StopStreamProcessorResponse = (
  output: any,
  context: __SerdeContext
): StopStreamProcessorResponse => {
  return {} as any;
};

const deserializeAws_json1_1StreamProcessor = (output: any, context: __SerdeContext): StreamProcessor => {
  return {
    Name: output.Name !== undefined && output.Name !== null ? output.Name : undefined,
    Status: output.Status !== undefined && output.Status !== null ? output.Status : undefined,
  } as any;
};

const deserializeAws_json1_1StreamProcessorInput = (output: any, context: __SerdeContext): StreamProcessorInput => {
  return {
    KinesisVideoStream:
      output.KinesisVideoStream !== undefined && output.KinesisVideoStream !== null
        ? deserializeAws_json1_1KinesisVideoStream(output.KinesisVideoStream, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1StreamProcessorList = (output: any, context: __SerdeContext): StreamProcessor[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1StreamProcessor(entry, context);
    });
};

const deserializeAws_json1_1StreamProcessorOutput = (output: any, context: __SerdeContext): StreamProcessorOutput => {
  return {
    KinesisDataStream:
      output.KinesisDataStream !== undefined && output.KinesisDataStream !== null
        ? deserializeAws_json1_1KinesisDataStream(output.KinesisDataStream, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1StreamProcessorSettings = (
  output: any,
  context: __SerdeContext
): StreamProcessorSettings => {
  return {
    FaceSearch:
      output.FaceSearch !== undefined && output.FaceSearch !== null
        ? deserializeAws_json1_1FaceSearchSettings(output.FaceSearch, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1Summary = (output: any, context: __SerdeContext): Summary => {
  return {
    S3Object:
      output.S3Object !== undefined && output.S3Object !== null
        ? deserializeAws_json1_1S3Object(output.S3Object, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1Sunglasses = (output: any, context: __SerdeContext): Sunglasses => {
  return {
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
  } as any;
};

const deserializeAws_json1_1TechnicalCueSegment = (output: any, context: __SerdeContext): TechnicalCueSegment => {
  return {
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
  } as any;
};

const deserializeAws_json1_1TestingData = (output: any, context: __SerdeContext): TestingData => {
  return {
    Assets:
      output.Assets !== undefined && output.Assets !== null
        ? deserializeAws_json1_1Assets(output.Assets, context)
        : undefined,
    AutoCreate: output.AutoCreate !== undefined && output.AutoCreate !== null ? output.AutoCreate : undefined,
  } as any;
};

const deserializeAws_json1_1TestingDataResult = (output: any, context: __SerdeContext): TestingDataResult => {
  return {
    Input:
      output.Input !== undefined && output.Input !== null
        ? deserializeAws_json1_1TestingData(output.Input, context)
        : undefined,
    Output:
      output.Output !== undefined && output.Output !== null
        ? deserializeAws_json1_1TestingData(output.Output, context)
        : undefined,
    Validation:
      output.Validation !== undefined && output.Validation !== null
        ? deserializeAws_json1_1ValidationData(output.Validation, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1TextDetection = (output: any, context: __SerdeContext): TextDetection => {
  return {
    Confidence: output.Confidence !== undefined && output.Confidence !== null ? output.Confidence : undefined,
    DetectedText: output.DetectedText !== undefined && output.DetectedText !== null ? output.DetectedText : undefined,
    Geometry:
      output.Geometry !== undefined && output.Geometry !== null
        ? deserializeAws_json1_1Geometry(output.Geometry, context)
        : undefined,
    Id: output.Id !== undefined && output.Id !== null ? output.Id : undefined,
    ParentId: output.ParentId !== undefined && output.ParentId !== null ? output.ParentId : undefined,
    Type: output.Type !== undefined && output.Type !== null ? output.Type : undefined,
  } as any;
};

const deserializeAws_json1_1TextDetectionList = (output: any, context: __SerdeContext): TextDetection[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1TextDetection(entry, context);
    });
};

const deserializeAws_json1_1TextDetectionResult = (output: any, context: __SerdeContext): TextDetectionResult => {
  return {
    TextDetection:
      output.TextDetection !== undefined && output.TextDetection !== null
        ? deserializeAws_json1_1TextDetection(output.TextDetection, context)
        : undefined,
    Timestamp: output.Timestamp !== undefined && output.Timestamp !== null ? output.Timestamp : undefined,
  } as any;
};

const deserializeAws_json1_1TextDetectionResults = (output: any, context: __SerdeContext): TextDetectionResult[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1TextDetectionResult(entry, context);
    });
};

const deserializeAws_json1_1ThrottlingException = (output: any, context: __SerdeContext): ThrottlingException => {
  return {
    Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
    Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
    Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
  } as any;
};

const deserializeAws_json1_1TrainingData = (output: any, context: __SerdeContext): TrainingData => {
  return {
    Assets:
      output.Assets !== undefined && output.Assets !== null
        ? deserializeAws_json1_1Assets(output.Assets, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1TrainingDataResult = (output: any, context: __SerdeContext): TrainingDataResult => {
  return {
    Input:
      output.Input !== undefined && output.Input !== null
        ? deserializeAws_json1_1TrainingData(output.Input, context)
        : undefined,
    Output:
      output.Output !== undefined && output.Output !== null
        ? deserializeAws_json1_1TrainingData(output.Output, context)
        : undefined,
    Validation:
      output.Validation !== undefined && output.Validation !== null
        ? deserializeAws_json1_1ValidationData(output.Validation, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1UnindexedFace = (output: any, context: __SerdeContext): UnindexedFace => {
  return {
    FaceDetail:
      output.FaceDetail !== undefined && output.FaceDetail !== null
        ? deserializeAws_json1_1FaceDetail(output.FaceDetail, context)
        : undefined,
    Reasons:
      output.Reasons !== undefined && output.Reasons !== null
        ? deserializeAws_json1_1Reasons(output.Reasons, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1UnindexedFaces = (output: any, context: __SerdeContext): UnindexedFace[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1UnindexedFace(entry, context);
    });
};

const deserializeAws_json1_1Urls = (output: any, context: __SerdeContext): string[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return entry;
    });
};

const deserializeAws_json1_1ValidationData = (output: any, context: __SerdeContext): ValidationData => {
  return {
    Assets:
      output.Assets !== undefined && output.Assets !== null
        ? deserializeAws_json1_1Assets(output.Assets, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1VideoMetadata = (output: any, context: __SerdeContext): VideoMetadata => {
  return {
    Codec: output.Codec !== undefined && output.Codec !== null ? output.Codec : undefined,
    DurationMillis:
      output.DurationMillis !== undefined && output.DurationMillis !== null ? output.DurationMillis : undefined,
    Format: output.Format !== undefined && output.Format !== null ? output.Format : undefined,
    FrameHeight: output.FrameHeight !== undefined && output.FrameHeight !== null ? output.FrameHeight : undefined,
    FrameRate: output.FrameRate !== undefined && output.FrameRate !== null ? output.FrameRate : undefined,
    FrameWidth: output.FrameWidth !== undefined && output.FrameWidth !== null ? output.FrameWidth : undefined,
  } as any;
};

const deserializeAws_json1_1VideoMetadataList = (output: any, context: __SerdeContext): VideoMetadata[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1VideoMetadata(entry, context);
    });
};

const deserializeAws_json1_1VideoTooLargeException = (output: any, context: __SerdeContext): VideoTooLargeException => {
  return {
    Code: output.Code !== undefined && output.Code !== null ? output.Code : undefined,
    Logref: output.Logref !== undefined && output.Logref !== null ? output.Logref : undefined,
    Message: output.Message !== undefined && output.Message !== null ? output.Message : undefined,
  } as any;
};

const deserializeMetadata = (output: __HttpResponse): __ResponseMetadata => ({
  httpStatusCode: output.statusCode,
  requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"],
  extendedRequestId: output.headers["x-amz-id-2"],
  cfId: output.headers["x-amz-cf-id"],
});

// Collect low-level response body stream to Uint8Array.
const collectBody = (streamBody: any = new Uint8Array(), context: __SerdeContext): Promise<Uint8Array> => {
  if (streamBody instanceof Uint8Array) {
    return Promise.resolve(streamBody);
  }
  return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};

// Encode Uint8Array data into string with utf-8.
const collectBodyString = (streamBody: any, context: __SerdeContext): Promise<string> =>
  collectBody(streamBody, context).then((body) => context.utf8Encoder(body));

const buildHttpRpcRequest = async (
  context: __SerdeContext,
  headers: __HeaderBag,
  path: string,
  resolvedHostname: string | undefined,
  body: any
): Promise<__HttpRequest> => {
  const { hostname, protocol = "https", port } = await context.endpoint();
  const contents: any = {
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
  return new __HttpRequest(contents);
};

const parseBody = (streamBody: any, context: __SerdeContext): any =>
  collectBodyString(streamBody, context).then((encoded) => {
    if (encoded.length) {
      return JSON.parse(encoded);
    }
    return {};
  });

/**
 * Load an error code for the aws.rest-json-1.1 protocol.
 */
const loadRestJsonErrorCode = (output: __HttpResponse, data: any): string => {
  const findKey = (object: any, key: string) => Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase());

  const sanitizeErrorCode = (rawValue: string): string => {
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

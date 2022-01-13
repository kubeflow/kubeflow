import { AddTagsToStreamCommandInput, AddTagsToStreamCommandOutput } from "../commands/AddTagsToStreamCommand";
import { CreateStreamCommandInput, CreateStreamCommandOutput } from "../commands/CreateStreamCommand";
import {
  DecreaseStreamRetentionPeriodCommandInput,
  DecreaseStreamRetentionPeriodCommandOutput,
} from "../commands/DecreaseStreamRetentionPeriodCommand";
import { DeleteStreamCommandInput, DeleteStreamCommandOutput } from "../commands/DeleteStreamCommand";
import {
  DeregisterStreamConsumerCommandInput,
  DeregisterStreamConsumerCommandOutput,
} from "../commands/DeregisterStreamConsumerCommand";
import { DescribeLimitsCommandInput, DescribeLimitsCommandOutput } from "../commands/DescribeLimitsCommand";
import { DescribeStreamCommandInput, DescribeStreamCommandOutput } from "../commands/DescribeStreamCommand";
import {
  DescribeStreamConsumerCommandInput,
  DescribeStreamConsumerCommandOutput,
} from "../commands/DescribeStreamConsumerCommand";
import {
  DescribeStreamSummaryCommandInput,
  DescribeStreamSummaryCommandOutput,
} from "../commands/DescribeStreamSummaryCommand";
import {
  DisableEnhancedMonitoringCommandInput,
  DisableEnhancedMonitoringCommandOutput,
} from "../commands/DisableEnhancedMonitoringCommand";
import {
  EnableEnhancedMonitoringCommandInput,
  EnableEnhancedMonitoringCommandOutput,
} from "../commands/EnableEnhancedMonitoringCommand";
import { GetRecordsCommandInput, GetRecordsCommandOutput } from "../commands/GetRecordsCommand";
import { GetShardIteratorCommandInput, GetShardIteratorCommandOutput } from "../commands/GetShardIteratorCommand";
import {
  IncreaseStreamRetentionPeriodCommandInput,
  IncreaseStreamRetentionPeriodCommandOutput,
} from "../commands/IncreaseStreamRetentionPeriodCommand";
import { ListShardsCommandInput, ListShardsCommandOutput } from "../commands/ListShardsCommand";
import {
  ListStreamConsumersCommandInput,
  ListStreamConsumersCommandOutput,
} from "../commands/ListStreamConsumersCommand";
import { ListStreamsCommandInput, ListStreamsCommandOutput } from "../commands/ListStreamsCommand";
import { ListTagsForStreamCommandInput, ListTagsForStreamCommandOutput } from "../commands/ListTagsForStreamCommand";
import { MergeShardsCommandInput, MergeShardsCommandOutput } from "../commands/MergeShardsCommand";
import { PutRecordCommandInput, PutRecordCommandOutput } from "../commands/PutRecordCommand";
import { PutRecordsCommandInput, PutRecordsCommandOutput } from "../commands/PutRecordsCommand";
import {
  RegisterStreamConsumerCommandInput,
  RegisterStreamConsumerCommandOutput,
} from "../commands/RegisterStreamConsumerCommand";
import {
  RemoveTagsFromStreamCommandInput,
  RemoveTagsFromStreamCommandOutput,
} from "../commands/RemoveTagsFromStreamCommand";
import { SplitShardCommandInput, SplitShardCommandOutput } from "../commands/SplitShardCommand";
import {
  StartStreamEncryptionCommandInput,
  StartStreamEncryptionCommandOutput,
} from "../commands/StartStreamEncryptionCommand";
import {
  StopStreamEncryptionCommandInput,
  StopStreamEncryptionCommandOutput,
} from "../commands/StopStreamEncryptionCommand";
import { SubscribeToShardCommandInput, SubscribeToShardCommandOutput } from "../commands/SubscribeToShardCommand";
import { UpdateShardCountCommandInput, UpdateShardCountCommandOutput } from "../commands/UpdateShardCountCommand";
import {
  AddTagsToStreamInput,
  ChildShard,
  Consumer,
  ConsumerDescription,
  CreateStreamInput,
  DecreaseStreamRetentionPeriodInput,
  DeleteStreamInput,
  DeregisterStreamConsumerInput,
  DescribeLimitsInput,
  DescribeLimitsOutput,
  DescribeStreamConsumerInput,
  DescribeStreamConsumerOutput,
  DescribeStreamInput,
  DescribeStreamOutput,
  DescribeStreamSummaryInput,
  DescribeStreamSummaryOutput,
  DisableEnhancedMonitoringInput,
  EnableEnhancedMonitoringInput,
  EnhancedMetrics,
  EnhancedMonitoringOutput,
  ExpiredIteratorException,
  ExpiredNextTokenException,
  GetRecordsInput,
  GetRecordsOutput,
  GetShardIteratorInput,
  GetShardIteratorOutput,
  HashKeyRange,
  IncreaseStreamRetentionPeriodInput,
  InternalFailureException,
  InvalidArgumentException,
  KMSAccessDeniedException,
  KMSDisabledException,
  KMSInvalidStateException,
  KMSNotFoundException,
  KMSOptInRequired,
  KMSThrottlingException,
  LimitExceededException,
  ListShardsInput,
  ListShardsOutput,
  ListStreamConsumersInput,
  ListStreamConsumersOutput,
  ListStreamsInput,
  ListStreamsOutput,
  ListTagsForStreamInput,
  ListTagsForStreamOutput,
  MergeShardsInput,
  MetricsName,
  ProvisionedThroughputExceededException,
  PutRecordInput,
  PutRecordOutput,
  PutRecordsInput,
  PutRecordsOutput,
  PutRecordsRequestEntry,
  PutRecordsResultEntry,
  RegisterStreamConsumerInput,
  RegisterStreamConsumerOutput,
  RemoveTagsFromStreamInput,
  ResourceInUseException,
  ResourceNotFoundException,
  SequenceNumberRange,
  Shard,
  ShardFilter,
  SplitShardInput,
  StartStreamEncryptionInput,
  StartingPosition,
  StopStreamEncryptionInput,
  StreamDescription,
  StreamDescriptionSummary,
  SubscribeToShardEvent,
  SubscribeToShardEventStream,
  SubscribeToShardInput,
  SubscribeToShardOutput,
  Tag,
  UpdateShardCountInput,
  UpdateShardCountOutput,
  _Record,
} from "../models/models_0";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@aws-sdk/protocol-http";
import { SmithyException as __SmithyException } from "@aws-sdk/smithy-client";
import {
  Endpoint as __Endpoint,
  HeaderBag as __HeaderBag,
  MetadataBearer as __MetadataBearer,
  ResponseMetadata as __ResponseMetadata,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

export const serializeAws_json1_1AddTagsToStreamCommand = async (
  input: AddTagsToStreamCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.AddTagsToStream",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1AddTagsToStreamInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1CreateStreamCommand = async (
  input: CreateStreamCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.CreateStream",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1CreateStreamInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DecreaseStreamRetentionPeriodCommand = async (
  input: DecreaseStreamRetentionPeriodCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.DecreaseStreamRetentionPeriod",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DecreaseStreamRetentionPeriodInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DeleteStreamCommand = async (
  input: DeleteStreamCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.DeleteStream",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DeleteStreamInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DeregisterStreamConsumerCommand = async (
  input: DeregisterStreamConsumerCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.DeregisterStreamConsumer",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DeregisterStreamConsumerInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DescribeLimitsCommand = async (
  input: DescribeLimitsCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.DescribeLimits",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DescribeLimitsInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DescribeStreamCommand = async (
  input: DescribeStreamCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.DescribeStream",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DescribeStreamInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DescribeStreamConsumerCommand = async (
  input: DescribeStreamConsumerCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.DescribeStreamConsumer",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DescribeStreamConsumerInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DescribeStreamSummaryCommand = async (
  input: DescribeStreamSummaryCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.DescribeStreamSummary",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DescribeStreamSummaryInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1DisableEnhancedMonitoringCommand = async (
  input: DisableEnhancedMonitoringCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.DisableEnhancedMonitoring",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1DisableEnhancedMonitoringInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1EnableEnhancedMonitoringCommand = async (
  input: EnableEnhancedMonitoringCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.EnableEnhancedMonitoring",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1EnableEnhancedMonitoringInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1GetRecordsCommand = async (
  input: GetRecordsCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.GetRecords",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1GetRecordsInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1GetShardIteratorCommand = async (
  input: GetShardIteratorCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.GetShardIterator",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1GetShardIteratorInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1IncreaseStreamRetentionPeriodCommand = async (
  input: IncreaseStreamRetentionPeriodCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.IncreaseStreamRetentionPeriod",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1IncreaseStreamRetentionPeriodInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1ListShardsCommand = async (
  input: ListShardsCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.ListShards",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1ListShardsInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1ListStreamConsumersCommand = async (
  input: ListStreamConsumersCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.ListStreamConsumers",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1ListStreamConsumersInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1ListStreamsCommand = async (
  input: ListStreamsCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.ListStreams",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1ListStreamsInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1ListTagsForStreamCommand = async (
  input: ListTagsForStreamCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.ListTagsForStream",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1ListTagsForStreamInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1MergeShardsCommand = async (
  input: MergeShardsCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.MergeShards",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1MergeShardsInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1PutRecordCommand = async (
  input: PutRecordCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.PutRecord",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1PutRecordInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1PutRecordsCommand = async (
  input: PutRecordsCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.PutRecords",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1PutRecordsInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1RegisterStreamConsumerCommand = async (
  input: RegisterStreamConsumerCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.RegisterStreamConsumer",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1RegisterStreamConsumerInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1RemoveTagsFromStreamCommand = async (
  input: RemoveTagsFromStreamCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.RemoveTagsFromStream",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1RemoveTagsFromStreamInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1SplitShardCommand = async (
  input: SplitShardCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.SplitShard",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1SplitShardInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1StartStreamEncryptionCommand = async (
  input: StartStreamEncryptionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.StartStreamEncryption",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1StartStreamEncryptionInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1StopStreamEncryptionCommand = async (
  input: StopStreamEncryptionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.StopStreamEncryption",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1StopStreamEncryptionInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1SubscribeToShardCommand = async (
  input: SubscribeToShardCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.SubscribeToShard",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1SubscribeToShardInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const serializeAws_json1_1UpdateShardCountCommand = async (
  input: UpdateShardCountCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": "Kinesis_20131202.UpdateShardCount",
  };
  let body: any;
  body = JSON.stringify(serializeAws_json1_1UpdateShardCountInput(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
};

export const deserializeAws_json1_1AddTagsToStreamCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<AddTagsToStreamCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1AddTagsToStreamCommandError(output, context);
  }
  await collectBody(output.body, context);
  const response: AddTagsToStreamCommandOutput = {
    $metadata: deserializeMetadata(output),
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1AddTagsToStreamCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<AddTagsToStreamCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceInUseException":
    case "com.amazonaws.kinesis#ResourceInUseException":
      response = {
        ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1CreateStreamCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<CreateStreamCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1CreateStreamCommandError(output, context);
  }
  await collectBody(output.body, context);
  const response: CreateStreamCommandOutput = {
    $metadata: deserializeMetadata(output),
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1CreateStreamCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<CreateStreamCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceInUseException":
    case "com.amazonaws.kinesis#ResourceInUseException":
      response = {
        ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
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

export const deserializeAws_json1_1DecreaseStreamRetentionPeriodCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DecreaseStreamRetentionPeriodCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DecreaseStreamRetentionPeriodCommandError(output, context);
  }
  await collectBody(output.body, context);
  const response: DecreaseStreamRetentionPeriodCommandOutput = {
    $metadata: deserializeMetadata(output),
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DecreaseStreamRetentionPeriodCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DecreaseStreamRetentionPeriodCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceInUseException":
    case "com.amazonaws.kinesis#ResourceInUseException":
      response = {
        ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DeleteStreamCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DeleteStreamCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DeleteStreamCommandError(output, context);
  }
  await collectBody(output.body, context);
  const response: DeleteStreamCommandOutput = {
    $metadata: deserializeMetadata(output),
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DeleteStreamCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DeleteStreamCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceInUseException":
    case "com.amazonaws.kinesis#ResourceInUseException":
      response = {
        ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DeregisterStreamConsumerCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DeregisterStreamConsumerCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DeregisterStreamConsumerCommandError(output, context);
  }
  await collectBody(output.body, context);
  const response: DeregisterStreamConsumerCommandOutput = {
    $metadata: deserializeMetadata(output),
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DeregisterStreamConsumerCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DeregisterStreamConsumerCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DescribeLimitsCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DescribeLimitsCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DescribeLimitsCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1DescribeLimitsOutput(data, context);
  const response: DescribeLimitsCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DescribeLimitsCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DescribeLimitsCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
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

export const deserializeAws_json1_1DescribeStreamCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DescribeStreamCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DescribeStreamCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1DescribeStreamOutput(data, context);
  const response: DescribeStreamCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DescribeStreamCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DescribeStreamCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DescribeStreamConsumerCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DescribeStreamConsumerCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DescribeStreamConsumerCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1DescribeStreamConsumerOutput(data, context);
  const response: DescribeStreamConsumerCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DescribeStreamConsumerCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DescribeStreamConsumerCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DescribeStreamSummaryCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DescribeStreamSummaryCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DescribeStreamSummaryCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1DescribeStreamSummaryOutput(data, context);
  const response: DescribeStreamSummaryCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DescribeStreamSummaryCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DescribeStreamSummaryCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1DisableEnhancedMonitoringCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DisableEnhancedMonitoringCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1DisableEnhancedMonitoringCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1EnhancedMonitoringOutput(data, context);
  const response: DisableEnhancedMonitoringCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1DisableEnhancedMonitoringCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DisableEnhancedMonitoringCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceInUseException":
    case "com.amazonaws.kinesis#ResourceInUseException":
      response = {
        ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1EnableEnhancedMonitoringCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<EnableEnhancedMonitoringCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1EnableEnhancedMonitoringCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1EnhancedMonitoringOutput(data, context);
  const response: EnableEnhancedMonitoringCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1EnableEnhancedMonitoringCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<EnableEnhancedMonitoringCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceInUseException":
    case "com.amazonaws.kinesis#ResourceInUseException":
      response = {
        ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1GetRecordsCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetRecordsCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1GetRecordsCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1GetRecordsOutput(data, context);
  const response: GetRecordsCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1GetRecordsCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetRecordsCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "ExpiredIteratorException":
    case "com.amazonaws.kinesis#ExpiredIteratorException":
      response = {
        ...(await deserializeAws_json1_1ExpiredIteratorExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSAccessDeniedException":
    case "com.amazonaws.kinesis#KMSAccessDeniedException":
      response = {
        ...(await deserializeAws_json1_1KMSAccessDeniedExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSDisabledException":
    case "com.amazonaws.kinesis#KMSDisabledException":
      response = {
        ...(await deserializeAws_json1_1KMSDisabledExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSInvalidStateException":
    case "com.amazonaws.kinesis#KMSInvalidStateException":
      response = {
        ...(await deserializeAws_json1_1KMSInvalidStateExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSNotFoundException":
    case "com.amazonaws.kinesis#KMSNotFoundException":
      response = {
        ...(await deserializeAws_json1_1KMSNotFoundExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSOptInRequired":
    case "com.amazonaws.kinesis#KMSOptInRequired":
      response = {
        ...(await deserializeAws_json1_1KMSOptInRequiredResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSThrottlingException":
    case "com.amazonaws.kinesis#KMSThrottlingException":
      response = {
        ...(await deserializeAws_json1_1KMSThrottlingExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ProvisionedThroughputExceededException":
    case "com.amazonaws.kinesis#ProvisionedThroughputExceededException":
      response = {
        ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1GetShardIteratorCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetShardIteratorCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1GetShardIteratorCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1GetShardIteratorOutput(data, context);
  const response: GetShardIteratorCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1GetShardIteratorCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetShardIteratorCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ProvisionedThroughputExceededException":
    case "com.amazonaws.kinesis#ProvisionedThroughputExceededException":
      response = {
        ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1IncreaseStreamRetentionPeriodCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<IncreaseStreamRetentionPeriodCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1IncreaseStreamRetentionPeriodCommandError(output, context);
  }
  await collectBody(output.body, context);
  const response: IncreaseStreamRetentionPeriodCommandOutput = {
    $metadata: deserializeMetadata(output),
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1IncreaseStreamRetentionPeriodCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<IncreaseStreamRetentionPeriodCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceInUseException":
    case "com.amazonaws.kinesis#ResourceInUseException":
      response = {
        ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1ListShardsCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<ListShardsCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1ListShardsCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1ListShardsOutput(data, context);
  const response: ListShardsCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1ListShardsCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<ListShardsCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "ExpiredNextTokenException":
    case "com.amazonaws.kinesis#ExpiredNextTokenException":
      response = {
        ...(await deserializeAws_json1_1ExpiredNextTokenExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceInUseException":
    case "com.amazonaws.kinesis#ResourceInUseException":
      response = {
        ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1ListStreamConsumersCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<ListStreamConsumersCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1ListStreamConsumersCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1ListStreamConsumersOutput(data, context);
  const response: ListStreamConsumersCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1ListStreamConsumersCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<ListStreamConsumersCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "ExpiredNextTokenException":
    case "com.amazonaws.kinesis#ExpiredNextTokenException":
      response = {
        ...(await deserializeAws_json1_1ExpiredNextTokenExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceInUseException":
    case "com.amazonaws.kinesis#ResourceInUseException":
      response = {
        ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1ListStreamsCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<ListStreamsCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1ListStreamsCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1ListStreamsOutput(data, context);
  const response: ListStreamsCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1ListStreamsCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<ListStreamsCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
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

export const deserializeAws_json1_1ListTagsForStreamCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<ListTagsForStreamCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1ListTagsForStreamCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1ListTagsForStreamOutput(data, context);
  const response: ListTagsForStreamCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1ListTagsForStreamCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<ListTagsForStreamCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1MergeShardsCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<MergeShardsCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1MergeShardsCommandError(output, context);
  }
  await collectBody(output.body, context);
  const response: MergeShardsCommandOutput = {
    $metadata: deserializeMetadata(output),
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1MergeShardsCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<MergeShardsCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceInUseException":
    case "com.amazonaws.kinesis#ResourceInUseException":
      response = {
        ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1PutRecordCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<PutRecordCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1PutRecordCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1PutRecordOutput(data, context);
  const response: PutRecordCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1PutRecordCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<PutRecordCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSAccessDeniedException":
    case "com.amazonaws.kinesis#KMSAccessDeniedException":
      response = {
        ...(await deserializeAws_json1_1KMSAccessDeniedExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSDisabledException":
    case "com.amazonaws.kinesis#KMSDisabledException":
      response = {
        ...(await deserializeAws_json1_1KMSDisabledExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSInvalidStateException":
    case "com.amazonaws.kinesis#KMSInvalidStateException":
      response = {
        ...(await deserializeAws_json1_1KMSInvalidStateExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSNotFoundException":
    case "com.amazonaws.kinesis#KMSNotFoundException":
      response = {
        ...(await deserializeAws_json1_1KMSNotFoundExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSOptInRequired":
    case "com.amazonaws.kinesis#KMSOptInRequired":
      response = {
        ...(await deserializeAws_json1_1KMSOptInRequiredResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSThrottlingException":
    case "com.amazonaws.kinesis#KMSThrottlingException":
      response = {
        ...(await deserializeAws_json1_1KMSThrottlingExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ProvisionedThroughputExceededException":
    case "com.amazonaws.kinesis#ProvisionedThroughputExceededException":
      response = {
        ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1PutRecordsCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<PutRecordsCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1PutRecordsCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1PutRecordsOutput(data, context);
  const response: PutRecordsCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1PutRecordsCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<PutRecordsCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSAccessDeniedException":
    case "com.amazonaws.kinesis#KMSAccessDeniedException":
      response = {
        ...(await deserializeAws_json1_1KMSAccessDeniedExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSDisabledException":
    case "com.amazonaws.kinesis#KMSDisabledException":
      response = {
        ...(await deserializeAws_json1_1KMSDisabledExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSInvalidStateException":
    case "com.amazonaws.kinesis#KMSInvalidStateException":
      response = {
        ...(await deserializeAws_json1_1KMSInvalidStateExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSNotFoundException":
    case "com.amazonaws.kinesis#KMSNotFoundException":
      response = {
        ...(await deserializeAws_json1_1KMSNotFoundExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSOptInRequired":
    case "com.amazonaws.kinesis#KMSOptInRequired":
      response = {
        ...(await deserializeAws_json1_1KMSOptInRequiredResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSThrottlingException":
    case "com.amazonaws.kinesis#KMSThrottlingException":
      response = {
        ...(await deserializeAws_json1_1KMSThrottlingExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ProvisionedThroughputExceededException":
    case "com.amazonaws.kinesis#ProvisionedThroughputExceededException":
      response = {
        ...(await deserializeAws_json1_1ProvisionedThroughputExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1RegisterStreamConsumerCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<RegisterStreamConsumerCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1RegisterStreamConsumerCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1RegisterStreamConsumerOutput(data, context);
  const response: RegisterStreamConsumerCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1RegisterStreamConsumerCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<RegisterStreamConsumerCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceInUseException":
    case "com.amazonaws.kinesis#ResourceInUseException":
      response = {
        ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1RemoveTagsFromStreamCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<RemoveTagsFromStreamCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1RemoveTagsFromStreamCommandError(output, context);
  }
  await collectBody(output.body, context);
  const response: RemoveTagsFromStreamCommandOutput = {
    $metadata: deserializeMetadata(output),
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1RemoveTagsFromStreamCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<RemoveTagsFromStreamCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceInUseException":
    case "com.amazonaws.kinesis#ResourceInUseException":
      response = {
        ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1SplitShardCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<SplitShardCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1SplitShardCommandError(output, context);
  }
  await collectBody(output.body, context);
  const response: SplitShardCommandOutput = {
    $metadata: deserializeMetadata(output),
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1SplitShardCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<SplitShardCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceInUseException":
    case "com.amazonaws.kinesis#ResourceInUseException":
      response = {
        ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1StartStreamEncryptionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartStreamEncryptionCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1StartStreamEncryptionCommandError(output, context);
  }
  await collectBody(output.body, context);
  const response: StartStreamEncryptionCommandOutput = {
    $metadata: deserializeMetadata(output),
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1StartStreamEncryptionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StartStreamEncryptionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSAccessDeniedException":
    case "com.amazonaws.kinesis#KMSAccessDeniedException":
      response = {
        ...(await deserializeAws_json1_1KMSAccessDeniedExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSDisabledException":
    case "com.amazonaws.kinesis#KMSDisabledException":
      response = {
        ...(await deserializeAws_json1_1KMSDisabledExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSInvalidStateException":
    case "com.amazonaws.kinesis#KMSInvalidStateException":
      response = {
        ...(await deserializeAws_json1_1KMSInvalidStateExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSNotFoundException":
    case "com.amazonaws.kinesis#KMSNotFoundException":
      response = {
        ...(await deserializeAws_json1_1KMSNotFoundExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSOptInRequired":
    case "com.amazonaws.kinesis#KMSOptInRequired":
      response = {
        ...(await deserializeAws_json1_1KMSOptInRequiredResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "KMSThrottlingException":
    case "com.amazonaws.kinesis#KMSThrottlingException":
      response = {
        ...(await deserializeAws_json1_1KMSThrottlingExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceInUseException":
    case "com.amazonaws.kinesis#ResourceInUseException":
      response = {
        ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1StopStreamEncryptionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StopStreamEncryptionCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1StopStreamEncryptionCommandError(output, context);
  }
  await collectBody(output.body, context);
  const response: StopStreamEncryptionCommandOutput = {
    $metadata: deserializeMetadata(output),
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1StopStreamEncryptionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<StopStreamEncryptionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceInUseException":
    case "com.amazonaws.kinesis#ResourceInUseException":
      response = {
        ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1SubscribeToShardCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<SubscribeToShardCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1SubscribeToShardCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1SubscribeToShardOutput(data, context);
  const response: SubscribeToShardCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1SubscribeToShardCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<SubscribeToShardCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceInUseException":
    case "com.amazonaws.kinesis#ResourceInUseException":
      response = {
        ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

export const deserializeAws_json1_1UpdateShardCountCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<UpdateShardCountCommandOutput> => {
  if (output.statusCode >= 300) {
    return deserializeAws_json1_1UpdateShardCountCommandError(output, context);
  }
  const data: any = await parseBody(output.body, context);
  let contents: any = {};
  contents = deserializeAws_json1_1UpdateShardCountOutput(data, context);
  const response: UpdateShardCountCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return Promise.resolve(response);
};

const deserializeAws_json1_1UpdateShardCountCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<UpdateShardCountCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidArgumentException":
    case "com.amazonaws.kinesis#InvalidArgumentException":
      response = {
        ...(await deserializeAws_json1_1InvalidArgumentExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.kinesis#LimitExceededException":
      response = {
        ...(await deserializeAws_json1_1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceInUseException":
    case "com.amazonaws.kinesis#ResourceInUseException":
      response = {
        ...(await deserializeAws_json1_1ResourceInUseExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ResourceNotFoundException":
    case "com.amazonaws.kinesis#ResourceNotFoundException":
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
      } as any;
  }
  const message = response.message || response.Message || errorCode;
  response.message = message;
  delete response.Message;
  return Promise.reject(Object.assign(new Error(message), response));
};

const deserializeAws_json1_1ExpiredIteratorExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<ExpiredIteratorException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1ExpiredIteratorException(body, context);
  const contents: ExpiredIteratorException = {
    name: "ExpiredIteratorException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1ExpiredNextTokenExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<ExpiredNextTokenException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1ExpiredNextTokenException(body, context);
  const contents: ExpiredNextTokenException = {
    name: "ExpiredNextTokenException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1InvalidArgumentExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<InvalidArgumentException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1InvalidArgumentException(body, context);
  const contents: InvalidArgumentException = {
    name: "InvalidArgumentException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1KMSAccessDeniedExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<KMSAccessDeniedException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1KMSAccessDeniedException(body, context);
  const contents: KMSAccessDeniedException = {
    name: "KMSAccessDeniedException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1KMSDisabledExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<KMSDisabledException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1KMSDisabledException(body, context);
  const contents: KMSDisabledException = {
    name: "KMSDisabledException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1KMSInvalidStateExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<KMSInvalidStateException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1KMSInvalidStateException(body, context);
  const contents: KMSInvalidStateException = {
    name: "KMSInvalidStateException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1KMSNotFoundExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<KMSNotFoundException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1KMSNotFoundException(body, context);
  const contents: KMSNotFoundException = {
    name: "KMSNotFoundException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1KMSOptInRequiredResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<KMSOptInRequired> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1KMSOptInRequired(body, context);
  const contents: KMSOptInRequired = {
    name: "KMSOptInRequired",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized,
  };
  return contents;
};

const deserializeAws_json1_1KMSThrottlingExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<KMSThrottlingException> => {
  const body = parsedOutput.body;
  const deserialized: any = deserializeAws_json1_1KMSThrottlingException(body, context);
  const contents: KMSThrottlingException = {
    name: "KMSThrottlingException",
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

const serializeAws_json1_1AddTagsToStreamInput = (input: AddTagsToStreamInput, context: __SerdeContext): any => {
  return {
    ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
    ...(input.Tags !== undefined && input.Tags !== null && { Tags: serializeAws_json1_1TagMap(input.Tags, context) }),
  };
};

const serializeAws_json1_1CreateStreamInput = (input: CreateStreamInput, context: __SerdeContext): any => {
  return {
    ...(input.ShardCount !== undefined && input.ShardCount !== null && { ShardCount: input.ShardCount }),
    ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
  };
};

const serializeAws_json1_1DecreaseStreamRetentionPeriodInput = (
  input: DecreaseStreamRetentionPeriodInput,
  context: __SerdeContext
): any => {
  return {
    ...(input.RetentionPeriodHours !== undefined &&
      input.RetentionPeriodHours !== null && { RetentionPeriodHours: input.RetentionPeriodHours }),
    ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
  };
};

const serializeAws_json1_1DeleteStreamInput = (input: DeleteStreamInput, context: __SerdeContext): any => {
  return {
    ...(input.EnforceConsumerDeletion !== undefined &&
      input.EnforceConsumerDeletion !== null && { EnforceConsumerDeletion: input.EnforceConsumerDeletion }),
    ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
  };
};

const serializeAws_json1_1DeregisterStreamConsumerInput = (
  input: DeregisterStreamConsumerInput,
  context: __SerdeContext
): any => {
  return {
    ...(input.ConsumerARN !== undefined && input.ConsumerARN !== null && { ConsumerARN: input.ConsumerARN }),
    ...(input.ConsumerName !== undefined && input.ConsumerName !== null && { ConsumerName: input.ConsumerName }),
    ...(input.StreamARN !== undefined && input.StreamARN !== null && { StreamARN: input.StreamARN }),
  };
};

const serializeAws_json1_1DescribeLimitsInput = (input: DescribeLimitsInput, context: __SerdeContext): any => {
  return {};
};

const serializeAws_json1_1DescribeStreamConsumerInput = (
  input: DescribeStreamConsumerInput,
  context: __SerdeContext
): any => {
  return {
    ...(input.ConsumerARN !== undefined && input.ConsumerARN !== null && { ConsumerARN: input.ConsumerARN }),
    ...(input.ConsumerName !== undefined && input.ConsumerName !== null && { ConsumerName: input.ConsumerName }),
    ...(input.StreamARN !== undefined && input.StreamARN !== null && { StreamARN: input.StreamARN }),
  };
};

const serializeAws_json1_1DescribeStreamInput = (input: DescribeStreamInput, context: __SerdeContext): any => {
  return {
    ...(input.ExclusiveStartShardId !== undefined &&
      input.ExclusiveStartShardId !== null && { ExclusiveStartShardId: input.ExclusiveStartShardId }),
    ...(input.Limit !== undefined && input.Limit !== null && { Limit: input.Limit }),
    ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
  };
};

const serializeAws_json1_1DescribeStreamSummaryInput = (
  input: DescribeStreamSummaryInput,
  context: __SerdeContext
): any => {
  return {
    ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
  };
};

const serializeAws_json1_1DisableEnhancedMonitoringInput = (
  input: DisableEnhancedMonitoringInput,
  context: __SerdeContext
): any => {
  return {
    ...(input.ShardLevelMetrics !== undefined &&
      input.ShardLevelMetrics !== null && {
        ShardLevelMetrics: serializeAws_json1_1MetricsNameList(input.ShardLevelMetrics, context),
      }),
    ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
  };
};

const serializeAws_json1_1EnableEnhancedMonitoringInput = (
  input: EnableEnhancedMonitoringInput,
  context: __SerdeContext
): any => {
  return {
    ...(input.ShardLevelMetrics !== undefined &&
      input.ShardLevelMetrics !== null && {
        ShardLevelMetrics: serializeAws_json1_1MetricsNameList(input.ShardLevelMetrics, context),
      }),
    ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
  };
};

const serializeAws_json1_1GetRecordsInput = (input: GetRecordsInput, context: __SerdeContext): any => {
  return {
    ...(input.Limit !== undefined && input.Limit !== null && { Limit: input.Limit }),
    ...(input.ShardIterator !== undefined && input.ShardIterator !== null && { ShardIterator: input.ShardIterator }),
  };
};

const serializeAws_json1_1GetShardIteratorInput = (input: GetShardIteratorInput, context: __SerdeContext): any => {
  return {
    ...(input.ShardId !== undefined && input.ShardId !== null && { ShardId: input.ShardId }),
    ...(input.ShardIteratorType !== undefined &&
      input.ShardIteratorType !== null && { ShardIteratorType: input.ShardIteratorType }),
    ...(input.StartingSequenceNumber !== undefined &&
      input.StartingSequenceNumber !== null && { StartingSequenceNumber: input.StartingSequenceNumber }),
    ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
    ...(input.Timestamp !== undefined &&
      input.Timestamp !== null && { Timestamp: Math.round(input.Timestamp.getTime() / 1000) }),
  };
};

const serializeAws_json1_1IncreaseStreamRetentionPeriodInput = (
  input: IncreaseStreamRetentionPeriodInput,
  context: __SerdeContext
): any => {
  return {
    ...(input.RetentionPeriodHours !== undefined &&
      input.RetentionPeriodHours !== null && { RetentionPeriodHours: input.RetentionPeriodHours }),
    ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
  };
};

const serializeAws_json1_1ListShardsInput = (input: ListShardsInput, context: __SerdeContext): any => {
  return {
    ...(input.ExclusiveStartShardId !== undefined &&
      input.ExclusiveStartShardId !== null && { ExclusiveStartShardId: input.ExclusiveStartShardId }),
    ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
    ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    ...(input.ShardFilter !== undefined &&
      input.ShardFilter !== null && { ShardFilter: serializeAws_json1_1ShardFilter(input.ShardFilter, context) }),
    ...(input.StreamCreationTimestamp !== undefined &&
      input.StreamCreationTimestamp !== null && {
        StreamCreationTimestamp: Math.round(input.StreamCreationTimestamp.getTime() / 1000),
      }),
    ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
  };
};

const serializeAws_json1_1ListStreamConsumersInput = (
  input: ListStreamConsumersInput,
  context: __SerdeContext
): any => {
  return {
    ...(input.MaxResults !== undefined && input.MaxResults !== null && { MaxResults: input.MaxResults }),
    ...(input.NextToken !== undefined && input.NextToken !== null && { NextToken: input.NextToken }),
    ...(input.StreamARN !== undefined && input.StreamARN !== null && { StreamARN: input.StreamARN }),
    ...(input.StreamCreationTimestamp !== undefined &&
      input.StreamCreationTimestamp !== null && {
        StreamCreationTimestamp: Math.round(input.StreamCreationTimestamp.getTime() / 1000),
      }),
  };
};

const serializeAws_json1_1ListStreamsInput = (input: ListStreamsInput, context: __SerdeContext): any => {
  return {
    ...(input.ExclusiveStartStreamName !== undefined &&
      input.ExclusiveStartStreamName !== null && { ExclusiveStartStreamName: input.ExclusiveStartStreamName }),
    ...(input.Limit !== undefined && input.Limit !== null && { Limit: input.Limit }),
  };
};

const serializeAws_json1_1ListTagsForStreamInput = (input: ListTagsForStreamInput, context: __SerdeContext): any => {
  return {
    ...(input.ExclusiveStartTagKey !== undefined &&
      input.ExclusiveStartTagKey !== null && { ExclusiveStartTagKey: input.ExclusiveStartTagKey }),
    ...(input.Limit !== undefined && input.Limit !== null && { Limit: input.Limit }),
    ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
  };
};

const serializeAws_json1_1MergeShardsInput = (input: MergeShardsInput, context: __SerdeContext): any => {
  return {
    ...(input.AdjacentShardToMerge !== undefined &&
      input.AdjacentShardToMerge !== null && { AdjacentShardToMerge: input.AdjacentShardToMerge }),
    ...(input.ShardToMerge !== undefined && input.ShardToMerge !== null && { ShardToMerge: input.ShardToMerge }),
    ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
  };
};

const serializeAws_json1_1MetricsNameList = (input: (MetricsName | string)[], context: __SerdeContext): any => {
  return input
    .filter((e: any) => e != null)
    .map((entry) => {
      if (entry === null) {
        return null as any;
      }
      return entry;
    });
};

const serializeAws_json1_1PutRecordInput = (input: PutRecordInput, context: __SerdeContext): any => {
  return {
    ...(input.Data !== undefined && input.Data !== null && { Data: context.base64Encoder(input.Data) }),
    ...(input.ExplicitHashKey !== undefined &&
      input.ExplicitHashKey !== null && { ExplicitHashKey: input.ExplicitHashKey }),
    ...(input.PartitionKey !== undefined && input.PartitionKey !== null && { PartitionKey: input.PartitionKey }),
    ...(input.SequenceNumberForOrdering !== undefined &&
      input.SequenceNumberForOrdering !== null && { SequenceNumberForOrdering: input.SequenceNumberForOrdering }),
    ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
  };
};

const serializeAws_json1_1PutRecordsInput = (input: PutRecordsInput, context: __SerdeContext): any => {
  return {
    ...(input.Records !== undefined &&
      input.Records !== null && { Records: serializeAws_json1_1PutRecordsRequestEntryList(input.Records, context) }),
    ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
  };
};

const serializeAws_json1_1PutRecordsRequestEntry = (input: PutRecordsRequestEntry, context: __SerdeContext): any => {
  return {
    ...(input.Data !== undefined && input.Data !== null && { Data: context.base64Encoder(input.Data) }),
    ...(input.ExplicitHashKey !== undefined &&
      input.ExplicitHashKey !== null && { ExplicitHashKey: input.ExplicitHashKey }),
    ...(input.PartitionKey !== undefined && input.PartitionKey !== null && { PartitionKey: input.PartitionKey }),
  };
};

const serializeAws_json1_1PutRecordsRequestEntryList = (
  input: PutRecordsRequestEntry[],
  context: __SerdeContext
): any => {
  return input
    .filter((e: any) => e != null)
    .map((entry) => {
      if (entry === null) {
        return null as any;
      }
      return serializeAws_json1_1PutRecordsRequestEntry(entry, context);
    });
};

const serializeAws_json1_1RegisterStreamConsumerInput = (
  input: RegisterStreamConsumerInput,
  context: __SerdeContext
): any => {
  return {
    ...(input.ConsumerName !== undefined && input.ConsumerName !== null && { ConsumerName: input.ConsumerName }),
    ...(input.StreamARN !== undefined && input.StreamARN !== null && { StreamARN: input.StreamARN }),
  };
};

const serializeAws_json1_1RemoveTagsFromStreamInput = (
  input: RemoveTagsFromStreamInput,
  context: __SerdeContext
): any => {
  return {
    ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
    ...(input.TagKeys !== undefined &&
      input.TagKeys !== null && { TagKeys: serializeAws_json1_1TagKeyList(input.TagKeys, context) }),
  };
};

const serializeAws_json1_1ShardFilter = (input: ShardFilter, context: __SerdeContext): any => {
  return {
    ...(input.ShardId !== undefined && input.ShardId !== null && { ShardId: input.ShardId }),
    ...(input.Timestamp !== undefined &&
      input.Timestamp !== null && { Timestamp: Math.round(input.Timestamp.getTime() / 1000) }),
    ...(input.Type !== undefined && input.Type !== null && { Type: input.Type }),
  };
};

const serializeAws_json1_1SplitShardInput = (input: SplitShardInput, context: __SerdeContext): any => {
  return {
    ...(input.NewStartingHashKey !== undefined &&
      input.NewStartingHashKey !== null && { NewStartingHashKey: input.NewStartingHashKey }),
    ...(input.ShardToSplit !== undefined && input.ShardToSplit !== null && { ShardToSplit: input.ShardToSplit }),
    ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
  };
};

const serializeAws_json1_1StartingPosition = (input: StartingPosition, context: __SerdeContext): any => {
  return {
    ...(input.SequenceNumber !== undefined &&
      input.SequenceNumber !== null && { SequenceNumber: input.SequenceNumber }),
    ...(input.Timestamp !== undefined &&
      input.Timestamp !== null && { Timestamp: Math.round(input.Timestamp.getTime() / 1000) }),
    ...(input.Type !== undefined && input.Type !== null && { Type: input.Type }),
  };
};

const serializeAws_json1_1StartStreamEncryptionInput = (
  input: StartStreamEncryptionInput,
  context: __SerdeContext
): any => {
  return {
    ...(input.EncryptionType !== undefined &&
      input.EncryptionType !== null && { EncryptionType: input.EncryptionType }),
    ...(input.KeyId !== undefined && input.KeyId !== null && { KeyId: input.KeyId }),
    ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
  };
};

const serializeAws_json1_1StopStreamEncryptionInput = (
  input: StopStreamEncryptionInput,
  context: __SerdeContext
): any => {
  return {
    ...(input.EncryptionType !== undefined &&
      input.EncryptionType !== null && { EncryptionType: input.EncryptionType }),
    ...(input.KeyId !== undefined && input.KeyId !== null && { KeyId: input.KeyId }),
    ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
  };
};

const serializeAws_json1_1SubscribeToShardInput = (input: SubscribeToShardInput, context: __SerdeContext): any => {
  return {
    ...(input.ConsumerARN !== undefined && input.ConsumerARN !== null && { ConsumerARN: input.ConsumerARN }),
    ...(input.ShardId !== undefined && input.ShardId !== null && { ShardId: input.ShardId }),
    ...(input.StartingPosition !== undefined &&
      input.StartingPosition !== null && {
        StartingPosition: serializeAws_json1_1StartingPosition(input.StartingPosition, context),
      }),
  };
};

const serializeAws_json1_1TagKeyList = (input: string[], context: __SerdeContext): any => {
  return input
    .filter((e: any) => e != null)
    .map((entry) => {
      if (entry === null) {
        return null as any;
      }
      return entry;
    });
};

const serializeAws_json1_1TagMap = (input: { [key: string]: string }, context: __SerdeContext): any => {
  return Object.entries(input).reduce((acc: { [key: string]: string }, [key, value]: [string, any]) => {
    if (value === null) {
      return acc;
    }
    return {
      ...acc,
      [key]: value,
    };
  }, {});
};

const serializeAws_json1_1UpdateShardCountInput = (input: UpdateShardCountInput, context: __SerdeContext): any => {
  return {
    ...(input.ScalingType !== undefined && input.ScalingType !== null && { ScalingType: input.ScalingType }),
    ...(input.StreamName !== undefined && input.StreamName !== null && { StreamName: input.StreamName }),
    ...(input.TargetShardCount !== undefined &&
      input.TargetShardCount !== null && { TargetShardCount: input.TargetShardCount }),
  };
};

const deserializeAws_json1_1ChildShard = (output: any, context: __SerdeContext): ChildShard => {
  return {
    HashKeyRange:
      output.HashKeyRange !== undefined && output.HashKeyRange !== null
        ? deserializeAws_json1_1HashKeyRange(output.HashKeyRange, context)
        : undefined,
    ParentShards:
      output.ParentShards !== undefined && output.ParentShards !== null
        ? deserializeAws_json1_1ShardIdList(output.ParentShards, context)
        : undefined,
    ShardId: output.ShardId !== undefined && output.ShardId !== null ? output.ShardId : undefined,
  } as any;
};

const deserializeAws_json1_1ChildShardList = (output: any, context: __SerdeContext): ChildShard[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1ChildShard(entry, context);
    });
};

const deserializeAws_json1_1Consumer = (output: any, context: __SerdeContext): Consumer => {
  return {
    ConsumerARN: output.ConsumerARN !== undefined && output.ConsumerARN !== null ? output.ConsumerARN : undefined,
    ConsumerCreationTimestamp:
      output.ConsumerCreationTimestamp !== undefined && output.ConsumerCreationTimestamp !== null
        ? new Date(Math.round(output.ConsumerCreationTimestamp * 1000))
        : undefined,
    ConsumerName: output.ConsumerName !== undefined && output.ConsumerName !== null ? output.ConsumerName : undefined,
    ConsumerStatus:
      output.ConsumerStatus !== undefined && output.ConsumerStatus !== null ? output.ConsumerStatus : undefined,
  } as any;
};

const deserializeAws_json1_1ConsumerDescription = (output: any, context: __SerdeContext): ConsumerDescription => {
  return {
    ConsumerARN: output.ConsumerARN !== undefined && output.ConsumerARN !== null ? output.ConsumerARN : undefined,
    ConsumerCreationTimestamp:
      output.ConsumerCreationTimestamp !== undefined && output.ConsumerCreationTimestamp !== null
        ? new Date(Math.round(output.ConsumerCreationTimestamp * 1000))
        : undefined,
    ConsumerName: output.ConsumerName !== undefined && output.ConsumerName !== null ? output.ConsumerName : undefined,
    ConsumerStatus:
      output.ConsumerStatus !== undefined && output.ConsumerStatus !== null ? output.ConsumerStatus : undefined,
    StreamARN: output.StreamARN !== undefined && output.StreamARN !== null ? output.StreamARN : undefined,
  } as any;
};

const deserializeAws_json1_1ConsumerList = (output: any, context: __SerdeContext): Consumer[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1Consumer(entry, context);
    });
};

const deserializeAws_json1_1DescribeLimitsOutput = (output: any, context: __SerdeContext): DescribeLimitsOutput => {
  return {
    OpenShardCount:
      output.OpenShardCount !== undefined && output.OpenShardCount !== null ? output.OpenShardCount : undefined,
    ShardLimit: output.ShardLimit !== undefined && output.ShardLimit !== null ? output.ShardLimit : undefined,
  } as any;
};

const deserializeAws_json1_1DescribeStreamConsumerOutput = (
  output: any,
  context: __SerdeContext
): DescribeStreamConsumerOutput => {
  return {
    ConsumerDescription:
      output.ConsumerDescription !== undefined && output.ConsumerDescription !== null
        ? deserializeAws_json1_1ConsumerDescription(output.ConsumerDescription, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1DescribeStreamOutput = (output: any, context: __SerdeContext): DescribeStreamOutput => {
  return {
    StreamDescription:
      output.StreamDescription !== undefined && output.StreamDescription !== null
        ? deserializeAws_json1_1StreamDescription(output.StreamDescription, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1DescribeStreamSummaryOutput = (
  output: any,
  context: __SerdeContext
): DescribeStreamSummaryOutput => {
  return {
    StreamDescriptionSummary:
      output.StreamDescriptionSummary !== undefined && output.StreamDescriptionSummary !== null
        ? deserializeAws_json1_1StreamDescriptionSummary(output.StreamDescriptionSummary, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1EnhancedMetrics = (output: any, context: __SerdeContext): EnhancedMetrics => {
  return {
    ShardLevelMetrics:
      output.ShardLevelMetrics !== undefined && output.ShardLevelMetrics !== null
        ? deserializeAws_json1_1MetricsNameList(output.ShardLevelMetrics, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1EnhancedMonitoringList = (output: any, context: __SerdeContext): EnhancedMetrics[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1EnhancedMetrics(entry, context);
    });
};

const deserializeAws_json1_1EnhancedMonitoringOutput = (
  output: any,
  context: __SerdeContext
): EnhancedMonitoringOutput => {
  return {
    CurrentShardLevelMetrics:
      output.CurrentShardLevelMetrics !== undefined && output.CurrentShardLevelMetrics !== null
        ? deserializeAws_json1_1MetricsNameList(output.CurrentShardLevelMetrics, context)
        : undefined,
    DesiredShardLevelMetrics:
      output.DesiredShardLevelMetrics !== undefined && output.DesiredShardLevelMetrics !== null
        ? deserializeAws_json1_1MetricsNameList(output.DesiredShardLevelMetrics, context)
        : undefined,
    StreamName: output.StreamName !== undefined && output.StreamName !== null ? output.StreamName : undefined,
  } as any;
};

const deserializeAws_json1_1ExpiredIteratorException = (
  output: any,
  context: __SerdeContext
): ExpiredIteratorException => {
  return {
    message: output.message !== undefined && output.message !== null ? output.message : undefined,
  } as any;
};

const deserializeAws_json1_1ExpiredNextTokenException = (
  output: any,
  context: __SerdeContext
): ExpiredNextTokenException => {
  return {
    message: output.message !== undefined && output.message !== null ? output.message : undefined,
  } as any;
};

const deserializeAws_json1_1GetRecordsOutput = (output: any, context: __SerdeContext): GetRecordsOutput => {
  return {
    ChildShards:
      output.ChildShards !== undefined && output.ChildShards !== null
        ? deserializeAws_json1_1ChildShardList(output.ChildShards, context)
        : undefined,
    MillisBehindLatest:
      output.MillisBehindLatest !== undefined && output.MillisBehindLatest !== null
        ? output.MillisBehindLatest
        : undefined,
    NextShardIterator:
      output.NextShardIterator !== undefined && output.NextShardIterator !== null
        ? output.NextShardIterator
        : undefined,
    Records:
      output.Records !== undefined && output.Records !== null
        ? deserializeAws_json1_1RecordList(output.Records, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1GetShardIteratorOutput = (output: any, context: __SerdeContext): GetShardIteratorOutput => {
  return {
    ShardIterator:
      output.ShardIterator !== undefined && output.ShardIterator !== null ? output.ShardIterator : undefined,
  } as any;
};

const deserializeAws_json1_1HashKeyRange = (output: any, context: __SerdeContext): HashKeyRange => {
  return {
    EndingHashKey:
      output.EndingHashKey !== undefined && output.EndingHashKey !== null ? output.EndingHashKey : undefined,
    StartingHashKey:
      output.StartingHashKey !== undefined && output.StartingHashKey !== null ? output.StartingHashKey : undefined,
  } as any;
};

const deserializeAws_json1_1InternalFailureException = (
  output: any,
  context: __SerdeContext
): InternalFailureException => {
  return {
    message: output.message !== undefined && output.message !== null ? output.message : undefined,
  } as any;
};

const deserializeAws_json1_1InvalidArgumentException = (
  output: any,
  context: __SerdeContext
): InvalidArgumentException => {
  return {
    message: output.message !== undefined && output.message !== null ? output.message : undefined,
  } as any;
};

const deserializeAws_json1_1KMSAccessDeniedException = (
  output: any,
  context: __SerdeContext
): KMSAccessDeniedException => {
  return {
    message: output.message !== undefined && output.message !== null ? output.message : undefined,
  } as any;
};

const deserializeAws_json1_1KMSDisabledException = (output: any, context: __SerdeContext): KMSDisabledException => {
  return {
    message: output.message !== undefined && output.message !== null ? output.message : undefined,
  } as any;
};

const deserializeAws_json1_1KMSInvalidStateException = (
  output: any,
  context: __SerdeContext
): KMSInvalidStateException => {
  return {
    message: output.message !== undefined && output.message !== null ? output.message : undefined,
  } as any;
};

const deserializeAws_json1_1KMSNotFoundException = (output: any, context: __SerdeContext): KMSNotFoundException => {
  return {
    message: output.message !== undefined && output.message !== null ? output.message : undefined,
  } as any;
};

const deserializeAws_json1_1KMSOptInRequired = (output: any, context: __SerdeContext): KMSOptInRequired => {
  return {
    message: output.message !== undefined && output.message !== null ? output.message : undefined,
  } as any;
};

const deserializeAws_json1_1KMSThrottlingException = (output: any, context: __SerdeContext): KMSThrottlingException => {
  return {
    message: output.message !== undefined && output.message !== null ? output.message : undefined,
  } as any;
};

const deserializeAws_json1_1LimitExceededException = (output: any, context: __SerdeContext): LimitExceededException => {
  return {
    message: output.message !== undefined && output.message !== null ? output.message : undefined,
  } as any;
};

const deserializeAws_json1_1ListShardsOutput = (output: any, context: __SerdeContext): ListShardsOutput => {
  return {
    NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
    Shards:
      output.Shards !== undefined && output.Shards !== null
        ? deserializeAws_json1_1ShardList(output.Shards, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1ListStreamConsumersOutput = (
  output: any,
  context: __SerdeContext
): ListStreamConsumersOutput => {
  return {
    Consumers:
      output.Consumers !== undefined && output.Consumers !== null
        ? deserializeAws_json1_1ConsumerList(output.Consumers, context)
        : undefined,
    NextToken: output.NextToken !== undefined && output.NextToken !== null ? output.NextToken : undefined,
  } as any;
};

const deserializeAws_json1_1ListStreamsOutput = (output: any, context: __SerdeContext): ListStreamsOutput => {
  return {
    HasMoreStreams:
      output.HasMoreStreams !== undefined && output.HasMoreStreams !== null ? output.HasMoreStreams : undefined,
    StreamNames:
      output.StreamNames !== undefined && output.StreamNames !== null
        ? deserializeAws_json1_1StreamNameList(output.StreamNames, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1ListTagsForStreamOutput = (
  output: any,
  context: __SerdeContext
): ListTagsForStreamOutput => {
  return {
    HasMoreTags: output.HasMoreTags !== undefined && output.HasMoreTags !== null ? output.HasMoreTags : undefined,
    Tags:
      output.Tags !== undefined && output.Tags !== null
        ? deserializeAws_json1_1TagList(output.Tags, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1MetricsNameList = (output: any, context: __SerdeContext): (MetricsName | string)[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return entry;
    });
};

const deserializeAws_json1_1ProvisionedThroughputExceededException = (
  output: any,
  context: __SerdeContext
): ProvisionedThroughputExceededException => {
  return {
    message: output.message !== undefined && output.message !== null ? output.message : undefined,
  } as any;
};

const deserializeAws_json1_1PutRecordOutput = (output: any, context: __SerdeContext): PutRecordOutput => {
  return {
    EncryptionType:
      output.EncryptionType !== undefined && output.EncryptionType !== null ? output.EncryptionType : undefined,
    SequenceNumber:
      output.SequenceNumber !== undefined && output.SequenceNumber !== null ? output.SequenceNumber : undefined,
    ShardId: output.ShardId !== undefined && output.ShardId !== null ? output.ShardId : undefined,
  } as any;
};

const deserializeAws_json1_1PutRecordsOutput = (output: any, context: __SerdeContext): PutRecordsOutput => {
  return {
    EncryptionType:
      output.EncryptionType !== undefined && output.EncryptionType !== null ? output.EncryptionType : undefined,
    FailedRecordCount:
      output.FailedRecordCount !== undefined && output.FailedRecordCount !== null
        ? output.FailedRecordCount
        : undefined,
    Records:
      output.Records !== undefined && output.Records !== null
        ? deserializeAws_json1_1PutRecordsResultEntryList(output.Records, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1PutRecordsResultEntry = (output: any, context: __SerdeContext): PutRecordsResultEntry => {
  return {
    ErrorCode: output.ErrorCode !== undefined && output.ErrorCode !== null ? output.ErrorCode : undefined,
    ErrorMessage: output.ErrorMessage !== undefined && output.ErrorMessage !== null ? output.ErrorMessage : undefined,
    SequenceNumber:
      output.SequenceNumber !== undefined && output.SequenceNumber !== null ? output.SequenceNumber : undefined,
    ShardId: output.ShardId !== undefined && output.ShardId !== null ? output.ShardId : undefined,
  } as any;
};

const deserializeAws_json1_1PutRecordsResultEntryList = (
  output: any,
  context: __SerdeContext
): PutRecordsResultEntry[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1PutRecordsResultEntry(entry, context);
    });
};

const deserializeAws_json1_1_Record = (output: any, context: __SerdeContext): _Record => {
  return {
    ApproximateArrivalTimestamp:
      output.ApproximateArrivalTimestamp !== undefined && output.ApproximateArrivalTimestamp !== null
        ? new Date(Math.round(output.ApproximateArrivalTimestamp * 1000))
        : undefined,
    Data: output.Data !== undefined && output.Data !== null ? context.base64Decoder(output.Data) : undefined,
    EncryptionType:
      output.EncryptionType !== undefined && output.EncryptionType !== null ? output.EncryptionType : undefined,
    PartitionKey: output.PartitionKey !== undefined && output.PartitionKey !== null ? output.PartitionKey : undefined,
    SequenceNumber:
      output.SequenceNumber !== undefined && output.SequenceNumber !== null ? output.SequenceNumber : undefined,
  } as any;
};

const deserializeAws_json1_1RecordList = (output: any, context: __SerdeContext): _Record[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1_Record(entry, context);
    });
};

const deserializeAws_json1_1RegisterStreamConsumerOutput = (
  output: any,
  context: __SerdeContext
): RegisterStreamConsumerOutput => {
  return {
    Consumer:
      output.Consumer !== undefined && output.Consumer !== null
        ? deserializeAws_json1_1Consumer(output.Consumer, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1ResourceInUseException = (output: any, context: __SerdeContext): ResourceInUseException => {
  return {
    message: output.message !== undefined && output.message !== null ? output.message : undefined,
  } as any;
};

const deserializeAws_json1_1ResourceNotFoundException = (
  output: any,
  context: __SerdeContext
): ResourceNotFoundException => {
  return {
    message: output.message !== undefined && output.message !== null ? output.message : undefined,
  } as any;
};

const deserializeAws_json1_1SequenceNumberRange = (output: any, context: __SerdeContext): SequenceNumberRange => {
  return {
    EndingSequenceNumber:
      output.EndingSequenceNumber !== undefined && output.EndingSequenceNumber !== null
        ? output.EndingSequenceNumber
        : undefined,
    StartingSequenceNumber:
      output.StartingSequenceNumber !== undefined && output.StartingSequenceNumber !== null
        ? output.StartingSequenceNumber
        : undefined,
  } as any;
};

const deserializeAws_json1_1Shard = (output: any, context: __SerdeContext): Shard => {
  return {
    AdjacentParentShardId:
      output.AdjacentParentShardId !== undefined && output.AdjacentParentShardId !== null
        ? output.AdjacentParentShardId
        : undefined,
    HashKeyRange:
      output.HashKeyRange !== undefined && output.HashKeyRange !== null
        ? deserializeAws_json1_1HashKeyRange(output.HashKeyRange, context)
        : undefined,
    ParentShardId:
      output.ParentShardId !== undefined && output.ParentShardId !== null ? output.ParentShardId : undefined,
    SequenceNumberRange:
      output.SequenceNumberRange !== undefined && output.SequenceNumberRange !== null
        ? deserializeAws_json1_1SequenceNumberRange(output.SequenceNumberRange, context)
        : undefined,
    ShardId: output.ShardId !== undefined && output.ShardId !== null ? output.ShardId : undefined,
  } as any;
};

const deserializeAws_json1_1ShardIdList = (output: any, context: __SerdeContext): string[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return entry;
    });
};

const deserializeAws_json1_1ShardList = (output: any, context: __SerdeContext): Shard[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1Shard(entry, context);
    });
};

const deserializeAws_json1_1StreamDescription = (output: any, context: __SerdeContext): StreamDescription => {
  return {
    EncryptionType:
      output.EncryptionType !== undefined && output.EncryptionType !== null ? output.EncryptionType : undefined,
    EnhancedMonitoring:
      output.EnhancedMonitoring !== undefined && output.EnhancedMonitoring !== null
        ? deserializeAws_json1_1EnhancedMonitoringList(output.EnhancedMonitoring, context)
        : undefined,
    HasMoreShards:
      output.HasMoreShards !== undefined && output.HasMoreShards !== null ? output.HasMoreShards : undefined,
    KeyId: output.KeyId !== undefined && output.KeyId !== null ? output.KeyId : undefined,
    RetentionPeriodHours:
      output.RetentionPeriodHours !== undefined && output.RetentionPeriodHours !== null
        ? output.RetentionPeriodHours
        : undefined,
    Shards:
      output.Shards !== undefined && output.Shards !== null
        ? deserializeAws_json1_1ShardList(output.Shards, context)
        : undefined,
    StreamARN: output.StreamARN !== undefined && output.StreamARN !== null ? output.StreamARN : undefined,
    StreamCreationTimestamp:
      output.StreamCreationTimestamp !== undefined && output.StreamCreationTimestamp !== null
        ? new Date(Math.round(output.StreamCreationTimestamp * 1000))
        : undefined,
    StreamName: output.StreamName !== undefined && output.StreamName !== null ? output.StreamName : undefined,
    StreamStatus: output.StreamStatus !== undefined && output.StreamStatus !== null ? output.StreamStatus : undefined,
  } as any;
};

const deserializeAws_json1_1StreamDescriptionSummary = (
  output: any,
  context: __SerdeContext
): StreamDescriptionSummary => {
  return {
    ConsumerCount:
      output.ConsumerCount !== undefined && output.ConsumerCount !== null ? output.ConsumerCount : undefined,
    EncryptionType:
      output.EncryptionType !== undefined && output.EncryptionType !== null ? output.EncryptionType : undefined,
    EnhancedMonitoring:
      output.EnhancedMonitoring !== undefined && output.EnhancedMonitoring !== null
        ? deserializeAws_json1_1EnhancedMonitoringList(output.EnhancedMonitoring, context)
        : undefined,
    KeyId: output.KeyId !== undefined && output.KeyId !== null ? output.KeyId : undefined,
    OpenShardCount:
      output.OpenShardCount !== undefined && output.OpenShardCount !== null ? output.OpenShardCount : undefined,
    RetentionPeriodHours:
      output.RetentionPeriodHours !== undefined && output.RetentionPeriodHours !== null
        ? output.RetentionPeriodHours
        : undefined,
    StreamARN: output.StreamARN !== undefined && output.StreamARN !== null ? output.StreamARN : undefined,
    StreamCreationTimestamp:
      output.StreamCreationTimestamp !== undefined && output.StreamCreationTimestamp !== null
        ? new Date(Math.round(output.StreamCreationTimestamp * 1000))
        : undefined,
    StreamName: output.StreamName !== undefined && output.StreamName !== null ? output.StreamName : undefined,
    StreamStatus: output.StreamStatus !== undefined && output.StreamStatus !== null ? output.StreamStatus : undefined,
  } as any;
};

const deserializeAws_json1_1StreamNameList = (output: any, context: __SerdeContext): string[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return entry;
    });
};

const deserializeAws_json1_1SubscribeToShardEvent = (output: any, context: __SerdeContext): SubscribeToShardEvent => {
  return {
    ChildShards:
      output.ChildShards !== undefined && output.ChildShards !== null
        ? deserializeAws_json1_1ChildShardList(output.ChildShards, context)
        : undefined,
    ContinuationSequenceNumber:
      output.ContinuationSequenceNumber !== undefined && output.ContinuationSequenceNumber !== null
        ? output.ContinuationSequenceNumber
        : undefined,
    MillisBehindLatest:
      output.MillisBehindLatest !== undefined && output.MillisBehindLatest !== null
        ? output.MillisBehindLatest
        : undefined,
    Records:
      output.Records !== undefined && output.Records !== null
        ? deserializeAws_json1_1RecordList(output.Records, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1SubscribeToShardEventStream = (
  output: any,
  context: __SerdeContext
): SubscribeToShardEventStream => {
  if (output.InternalFailureException !== undefined && output.InternalFailureException !== null) {
    return {
      InternalFailureException: deserializeAws_json1_1InternalFailureException(
        output.InternalFailureException,
        context
      ),
    };
  }
  if (output.KMSAccessDeniedException !== undefined && output.KMSAccessDeniedException !== null) {
    return {
      KMSAccessDeniedException: deserializeAws_json1_1KMSAccessDeniedException(
        output.KMSAccessDeniedException,
        context
      ),
    };
  }
  if (output.KMSDisabledException !== undefined && output.KMSDisabledException !== null) {
    return {
      KMSDisabledException: deserializeAws_json1_1KMSDisabledException(output.KMSDisabledException, context),
    };
  }
  if (output.KMSInvalidStateException !== undefined && output.KMSInvalidStateException !== null) {
    return {
      KMSInvalidStateException: deserializeAws_json1_1KMSInvalidStateException(
        output.KMSInvalidStateException,
        context
      ),
    };
  }
  if (output.KMSNotFoundException !== undefined && output.KMSNotFoundException !== null) {
    return {
      KMSNotFoundException: deserializeAws_json1_1KMSNotFoundException(output.KMSNotFoundException, context),
    };
  }
  if (output.KMSOptInRequired !== undefined && output.KMSOptInRequired !== null) {
    return {
      KMSOptInRequired: deserializeAws_json1_1KMSOptInRequired(output.KMSOptInRequired, context),
    };
  }
  if (output.KMSThrottlingException !== undefined && output.KMSThrottlingException !== null) {
    return {
      KMSThrottlingException: deserializeAws_json1_1KMSThrottlingException(output.KMSThrottlingException, context),
    };
  }
  if (output.ResourceInUseException !== undefined && output.ResourceInUseException !== null) {
    return {
      ResourceInUseException: deserializeAws_json1_1ResourceInUseException(output.ResourceInUseException, context),
    };
  }
  if (output.ResourceNotFoundException !== undefined && output.ResourceNotFoundException !== null) {
    return {
      ResourceNotFoundException: deserializeAws_json1_1ResourceNotFoundException(
        output.ResourceNotFoundException,
        context
      ),
    };
  }
  if (output.SubscribeToShardEvent !== undefined && output.SubscribeToShardEvent !== null) {
    return {
      SubscribeToShardEvent: deserializeAws_json1_1SubscribeToShardEvent(output.SubscribeToShardEvent, context),
    };
  }
  return { $unknown: Object.entries(output)[0] };
};

const deserializeAws_json1_1SubscribeToShardOutput = (output: any, context: __SerdeContext): SubscribeToShardOutput => {
  return {
    EventStream:
      output.EventStream !== undefined && output.EventStream !== null
        ? deserializeAws_json1_1SubscribeToShardEventStream(output.EventStream, context)
        : undefined,
  } as any;
};

const deserializeAws_json1_1Tag = (output: any, context: __SerdeContext): Tag => {
  return {
    Key: output.Key !== undefined && output.Key !== null ? output.Key : undefined,
    Value: output.Value !== undefined && output.Value !== null ? output.Value : undefined,
  } as any;
};

const deserializeAws_json1_1TagList = (output: any, context: __SerdeContext): Tag[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_json1_1Tag(entry, context);
    });
};

const deserializeAws_json1_1UpdateShardCountOutput = (output: any, context: __SerdeContext): UpdateShardCountOutput => {
  return {
    CurrentShardCount:
      output.CurrentShardCount !== undefined && output.CurrentShardCount !== null
        ? output.CurrentShardCount
        : undefined,
    StreamName: output.StreamName !== undefined && output.StreamName !== null ? output.StreamName : undefined,
    TargetShardCount:
      output.TargetShardCount !== undefined && output.TargetShardCount !== null ? output.TargetShardCount : undefined,
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

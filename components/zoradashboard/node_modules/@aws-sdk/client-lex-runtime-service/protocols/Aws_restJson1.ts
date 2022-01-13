import { DeleteSessionCommandInput, DeleteSessionCommandOutput } from "../commands/DeleteSessionCommand";
import { GetSessionCommandInput, GetSessionCommandOutput } from "../commands/GetSessionCommand";
import { PostContentCommandInput, PostContentCommandOutput } from "../commands/PostContentCommand";
import { PostTextCommandInput, PostTextCommandOutput } from "../commands/PostTextCommand";
import { PutSessionCommandInput, PutSessionCommandOutput } from "../commands/PutSessionCommand";
import {
  ActiveContext,
  ActiveContextTimeToLive,
  BadGatewayException,
  BadRequestException,
  Button,
  ConflictException,
  DependencyFailedException,
  DialogAction,
  GenericAttachment,
  IntentConfidence,
  IntentSummary,
  InternalFailureException,
  LimitExceededException,
  LoopDetectedException,
  NotAcceptableException,
  NotFoundException,
  PredictedIntent,
  RequestTimeoutException,
  ResponseCard,
  SentimentResponse,
  UnsupportedMediaTypeException,
} from "../models/models_0";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@aws-sdk/protocol-http";
import {
  LazyJsonString as __LazyJsonString,
  SmithyException as __SmithyException,
  extendedEncodeURIComponent as __extendedEncodeURIComponent,
} from "@aws-sdk/smithy-client";
import {
  Endpoint as __Endpoint,
  MetadataBearer as __MetadataBearer,
  ResponseMetadata as __ResponseMetadata,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

export const serializeAws_restJson1DeleteSessionCommand = async (
  input: DeleteSessionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: any = {};
  let resolvedPath = "/bot/{botName}/alias/{botAlias}/user/{userId}/session";
  if (input.botName !== undefined) {
    const labelValue: string = input.botName;
    if (labelValue.length <= 0) {
      throw new Error("Empty value provided for input HTTP label: botName.");
    }
    resolvedPath = resolvedPath.replace("{botName}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error("No value provided for input HTTP label: botName.");
  }
  if (input.botAlias !== undefined) {
    const labelValue: string = input.botAlias;
    if (labelValue.length <= 0) {
      throw new Error("Empty value provided for input HTTP label: botAlias.");
    }
    resolvedPath = resolvedPath.replace("{botAlias}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error("No value provided for input HTTP label: botAlias.");
  }
  if (input.userId !== undefined) {
    const labelValue: string = input.userId;
    if (labelValue.length <= 0) {
      throw new Error("Empty value provided for input HTTP label: userId.");
    }
    resolvedPath = resolvedPath.replace("{userId}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error("No value provided for input HTTP label: userId.");
  }
  let body: any;
  const { hostname, protocol = "https", port } = await context.endpoint();
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "DELETE",
    headers,
    path: resolvedPath,
    body,
  });
};

export const serializeAws_restJson1GetSessionCommand = async (
  input: GetSessionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: any = {};
  let resolvedPath = "/bot/{botName}/alias/{botAlias}/user/{userId}/session";
  if (input.botName !== undefined) {
    const labelValue: string = input.botName;
    if (labelValue.length <= 0) {
      throw new Error("Empty value provided for input HTTP label: botName.");
    }
    resolvedPath = resolvedPath.replace("{botName}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error("No value provided for input HTTP label: botName.");
  }
  if (input.botAlias !== undefined) {
    const labelValue: string = input.botAlias;
    if (labelValue.length <= 0) {
      throw new Error("Empty value provided for input HTTP label: botAlias.");
    }
    resolvedPath = resolvedPath.replace("{botAlias}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error("No value provided for input HTTP label: botAlias.");
  }
  if (input.userId !== undefined) {
    const labelValue: string = input.userId;
    if (labelValue.length <= 0) {
      throw new Error("Empty value provided for input HTTP label: userId.");
    }
    resolvedPath = resolvedPath.replace("{userId}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error("No value provided for input HTTP label: userId.");
  }
  const query: any = {
    ...(input.checkpointLabelFilter !== undefined && { checkpointLabelFilter: input.checkpointLabelFilter }),
  };
  let body: any;
  const { hostname, protocol = "https", port } = await context.endpoint();
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "GET",
    headers,
    path: resolvedPath,
    query,
    body,
  });
};

export const serializeAws_restJson1PostContentCommand = async (
  input: PostContentCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: any = {
    "content-type": "application/octet-stream",
    "x-amz-content-sha256": "UNSIGNED-PAYLOAD",
    ...(isSerializableHeaderValue(input.sessionAttributes) && {
      "x-amz-lex-session-attributes": Buffer.from(__LazyJsonString.fromObject(input.sessionAttributes!)).toString(
        "base64"
      ),
    }),
    ...(isSerializableHeaderValue(input.requestAttributes) && {
      "x-amz-lex-request-attributes": Buffer.from(__LazyJsonString.fromObject(input.requestAttributes!)).toString(
        "base64"
      ),
    }),
    ...(isSerializableHeaderValue(input.contentType) && { "content-type": input.contentType! }),
    ...(isSerializableHeaderValue(input.accept) && { accept: input.accept! }),
    ...(isSerializableHeaderValue(input.activeContexts) && {
      "x-amz-lex-active-contexts": Buffer.from(__LazyJsonString.fromObject(input.activeContexts!)).toString("base64"),
    }),
  };
  let resolvedPath = "/bot/{botName}/alias/{botAlias}/user/{userId}/content";
  if (input.botName !== undefined) {
    const labelValue: string = input.botName;
    if (labelValue.length <= 0) {
      throw new Error("Empty value provided for input HTTP label: botName.");
    }
    resolvedPath = resolvedPath.replace("{botName}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error("No value provided for input HTTP label: botName.");
  }
  if (input.botAlias !== undefined) {
    const labelValue: string = input.botAlias;
    if (labelValue.length <= 0) {
      throw new Error("Empty value provided for input HTTP label: botAlias.");
    }
    resolvedPath = resolvedPath.replace("{botAlias}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error("No value provided for input HTTP label: botAlias.");
  }
  if (input.userId !== undefined) {
    const labelValue: string = input.userId;
    if (labelValue.length <= 0) {
      throw new Error("Empty value provided for input HTTP label: userId.");
    }
    resolvedPath = resolvedPath.replace("{userId}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error("No value provided for input HTTP label: userId.");
  }
  let body: any;
  if (input.inputStream !== undefined) {
    body = input.inputStream;
  }
  const { hostname, protocol = "https", port } = await context.endpoint();
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "POST",
    headers,
    path: resolvedPath,
    body,
  });
};

export const serializeAws_restJson1PostTextCommand = async (
  input: PostTextCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: any = {
    "content-type": "application/json",
  };
  let resolvedPath = "/bot/{botName}/alias/{botAlias}/user/{userId}/text";
  if (input.botName !== undefined) {
    const labelValue: string = input.botName;
    if (labelValue.length <= 0) {
      throw new Error("Empty value provided for input HTTP label: botName.");
    }
    resolvedPath = resolvedPath.replace("{botName}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error("No value provided for input HTTP label: botName.");
  }
  if (input.botAlias !== undefined) {
    const labelValue: string = input.botAlias;
    if (labelValue.length <= 0) {
      throw new Error("Empty value provided for input HTTP label: botAlias.");
    }
    resolvedPath = resolvedPath.replace("{botAlias}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error("No value provided for input HTTP label: botAlias.");
  }
  if (input.userId !== undefined) {
    const labelValue: string = input.userId;
    if (labelValue.length <= 0) {
      throw new Error("Empty value provided for input HTTP label: userId.");
    }
    resolvedPath = resolvedPath.replace("{userId}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error("No value provided for input HTTP label: userId.");
  }
  let body: any;
  body = JSON.stringify({
    ...(input.activeContexts !== undefined &&
      input.activeContexts !== null && {
        activeContexts: serializeAws_restJson1ActiveContextsList(input.activeContexts, context),
      }),
    ...(input.inputText !== undefined && input.inputText !== null && { inputText: input.inputText }),
    ...(input.requestAttributes !== undefined &&
      input.requestAttributes !== null && {
        requestAttributes: serializeAws_restJson1StringMap(input.requestAttributes, context),
      }),
    ...(input.sessionAttributes !== undefined &&
      input.sessionAttributes !== null && {
        sessionAttributes: serializeAws_restJson1StringMap(input.sessionAttributes, context),
      }),
  });
  const { hostname, protocol = "https", port } = await context.endpoint();
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "POST",
    headers,
    path: resolvedPath,
    body,
  });
};

export const serializeAws_restJson1PutSessionCommand = async (
  input: PutSessionCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: any = {
    "content-type": "application/json",
    ...(isSerializableHeaderValue(input.accept) && { accept: input.accept! }),
  };
  let resolvedPath = "/bot/{botName}/alias/{botAlias}/user/{userId}/session";
  if (input.botName !== undefined) {
    const labelValue: string = input.botName;
    if (labelValue.length <= 0) {
      throw new Error("Empty value provided for input HTTP label: botName.");
    }
    resolvedPath = resolvedPath.replace("{botName}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error("No value provided for input HTTP label: botName.");
  }
  if (input.botAlias !== undefined) {
    const labelValue: string = input.botAlias;
    if (labelValue.length <= 0) {
      throw new Error("Empty value provided for input HTTP label: botAlias.");
    }
    resolvedPath = resolvedPath.replace("{botAlias}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error("No value provided for input HTTP label: botAlias.");
  }
  if (input.userId !== undefined) {
    const labelValue: string = input.userId;
    if (labelValue.length <= 0) {
      throw new Error("Empty value provided for input HTTP label: userId.");
    }
    resolvedPath = resolvedPath.replace("{userId}", __extendedEncodeURIComponent(labelValue));
  } else {
    throw new Error("No value provided for input HTTP label: userId.");
  }
  let body: any;
  body = JSON.stringify({
    ...(input.activeContexts !== undefined &&
      input.activeContexts !== null && {
        activeContexts: serializeAws_restJson1ActiveContextsList(input.activeContexts, context),
      }),
    ...(input.dialogAction !== undefined &&
      input.dialogAction !== null && { dialogAction: serializeAws_restJson1DialogAction(input.dialogAction, context) }),
    ...(input.recentIntentSummaryView !== undefined &&
      input.recentIntentSummaryView !== null && {
        recentIntentSummaryView: serializeAws_restJson1IntentSummaryList(input.recentIntentSummaryView, context),
      }),
    ...(input.sessionAttributes !== undefined &&
      input.sessionAttributes !== null && {
        sessionAttributes: serializeAws_restJson1StringMap(input.sessionAttributes, context),
      }),
  });
  const { hostname, protocol = "https", port } = await context.endpoint();
  return new __HttpRequest({
    protocol,
    hostname,
    port,
    method: "POST",
    headers,
    path: resolvedPath,
    body,
  });
};

export const deserializeAws_restJson1DeleteSessionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DeleteSessionCommandOutput> => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return deserializeAws_restJson1DeleteSessionCommandError(output, context);
  }
  const contents: DeleteSessionCommandOutput = {
    $metadata: deserializeMetadata(output),
    botAlias: undefined,
    botName: undefined,
    sessionId: undefined,
    userId: undefined,
  };
  const data: any = await parseBody(output.body, context);
  if (data.botAlias !== undefined && data.botAlias !== null) {
    contents.botAlias = data.botAlias;
  }
  if (data.botName !== undefined && data.botName !== null) {
    contents.botName = data.botName;
  }
  if (data.sessionId !== undefined && data.sessionId !== null) {
    contents.sessionId = data.sessionId;
  }
  if (data.userId !== undefined && data.userId !== null) {
    contents.userId = data.userId;
  }
  return Promise.resolve(contents);
};

const deserializeAws_restJson1DeleteSessionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<DeleteSessionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "BadRequestException":
    case "com.amazonaws.lexruntimeservice#BadRequestException":
      response = {
        ...(await deserializeAws_restJson1BadRequestExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ConflictException":
    case "com.amazonaws.lexruntimeservice#ConflictException":
      response = {
        ...(await deserializeAws_restJson1ConflictExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "InternalFailureException":
    case "com.amazonaws.lexruntimeservice#InternalFailureException":
      response = {
        ...(await deserializeAws_restJson1InternalFailureExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.lexruntimeservice#LimitExceededException":
      response = {
        ...(await deserializeAws_restJson1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "NotFoundException":
    case "com.amazonaws.lexruntimeservice#NotFoundException":
      response = {
        ...(await deserializeAws_restJson1NotFoundExceptionResponse(parsedOutput, context)),
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

export const deserializeAws_restJson1GetSessionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetSessionCommandOutput> => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return deserializeAws_restJson1GetSessionCommandError(output, context);
  }
  const contents: GetSessionCommandOutput = {
    $metadata: deserializeMetadata(output),
    activeContexts: undefined,
    dialogAction: undefined,
    recentIntentSummaryView: undefined,
    sessionAttributes: undefined,
    sessionId: undefined,
  };
  const data: any = await parseBody(output.body, context);
  if (data.activeContexts !== undefined && data.activeContexts !== null) {
    contents.activeContexts = deserializeAws_restJson1ActiveContextsList(data.activeContexts, context);
  }
  if (data.dialogAction !== undefined && data.dialogAction !== null) {
    contents.dialogAction = deserializeAws_restJson1DialogAction(data.dialogAction, context);
  }
  if (data.recentIntentSummaryView !== undefined && data.recentIntentSummaryView !== null) {
    contents.recentIntentSummaryView = deserializeAws_restJson1IntentSummaryList(data.recentIntentSummaryView, context);
  }
  if (data.sessionAttributes !== undefined && data.sessionAttributes !== null) {
    contents.sessionAttributes = deserializeAws_restJson1StringMap(data.sessionAttributes, context);
  }
  if (data.sessionId !== undefined && data.sessionId !== null) {
    contents.sessionId = data.sessionId;
  }
  return Promise.resolve(contents);
};

const deserializeAws_restJson1GetSessionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<GetSessionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "BadRequestException":
    case "com.amazonaws.lexruntimeservice#BadRequestException":
      response = {
        ...(await deserializeAws_restJson1BadRequestExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "InternalFailureException":
    case "com.amazonaws.lexruntimeservice#InternalFailureException":
      response = {
        ...(await deserializeAws_restJson1InternalFailureExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.lexruntimeservice#LimitExceededException":
      response = {
        ...(await deserializeAws_restJson1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "NotFoundException":
    case "com.amazonaws.lexruntimeservice#NotFoundException":
      response = {
        ...(await deserializeAws_restJson1NotFoundExceptionResponse(parsedOutput, context)),
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

export const deserializeAws_restJson1PostContentCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<PostContentCommandOutput> => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return deserializeAws_restJson1PostContentCommandError(output, context);
  }
  const contents: PostContentCommandOutput = {
    $metadata: deserializeMetadata(output),
    activeContexts: undefined,
    alternativeIntents: undefined,
    audioStream: undefined,
    botVersion: undefined,
    contentType: undefined,
    dialogState: undefined,
    inputTranscript: undefined,
    intentName: undefined,
    message: undefined,
    messageFormat: undefined,
    nluIntentConfidence: undefined,
    sentimentResponse: undefined,
    sessionAttributes: undefined,
    sessionId: undefined,
    slotToElicit: undefined,
    slots: undefined,
  };
  if (output.headers["content-type"] !== undefined) {
    contents.contentType = output.headers["content-type"];
  }
  if (output.headers["x-amz-lex-intent-name"] !== undefined) {
    contents.intentName = output.headers["x-amz-lex-intent-name"];
  }
  if (output.headers["x-amz-lex-nlu-intent-confidence"] !== undefined) {
    contents.nluIntentConfidence = new __LazyJsonString(
      Buffer.from(output.headers["x-amz-lex-nlu-intent-confidence"], "base64").toString("ascii")
    );
  }
  if (output.headers["x-amz-lex-alternative-intents"] !== undefined) {
    contents.alternativeIntents = new __LazyJsonString(
      Buffer.from(output.headers["x-amz-lex-alternative-intents"], "base64").toString("ascii")
    );
  }
  if (output.headers["x-amz-lex-slots"] !== undefined) {
    contents.slots = new __LazyJsonString(Buffer.from(output.headers["x-amz-lex-slots"], "base64").toString("ascii"));
  }
  if (output.headers["x-amz-lex-session-attributes"] !== undefined) {
    contents.sessionAttributes = new __LazyJsonString(
      Buffer.from(output.headers["x-amz-lex-session-attributes"], "base64").toString("ascii")
    );
  }
  if (output.headers["x-amz-lex-sentiment"] !== undefined) {
    contents.sentimentResponse = output.headers["x-amz-lex-sentiment"];
  }
  if (output.headers["x-amz-lex-message"] !== undefined) {
    contents.message = output.headers["x-amz-lex-message"];
  }
  if (output.headers["x-amz-lex-message-format"] !== undefined) {
    contents.messageFormat = output.headers["x-amz-lex-message-format"];
  }
  if (output.headers["x-amz-lex-dialog-state"] !== undefined) {
    contents.dialogState = output.headers["x-amz-lex-dialog-state"];
  }
  if (output.headers["x-amz-lex-slot-to-elicit"] !== undefined) {
    contents.slotToElicit = output.headers["x-amz-lex-slot-to-elicit"];
  }
  if (output.headers["x-amz-lex-input-transcript"] !== undefined) {
    contents.inputTranscript = output.headers["x-amz-lex-input-transcript"];
  }
  if (output.headers["x-amz-lex-bot-version"] !== undefined) {
    contents.botVersion = output.headers["x-amz-lex-bot-version"];
  }
  if (output.headers["x-amz-lex-session-id"] !== undefined) {
    contents.sessionId = output.headers["x-amz-lex-session-id"];
  }
  if (output.headers["x-amz-lex-active-contexts"] !== undefined) {
    contents.activeContexts = new __LazyJsonString(
      Buffer.from(output.headers["x-amz-lex-active-contexts"], "base64").toString("ascii")
    );
  }
  const data: any = output.body;
  contents.audioStream = data;
  return Promise.resolve(contents);
};

const deserializeAws_restJson1PostContentCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<PostContentCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "BadGatewayException":
    case "com.amazonaws.lexruntimeservice#BadGatewayException":
      response = {
        ...(await deserializeAws_restJson1BadGatewayExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "BadRequestException":
    case "com.amazonaws.lexruntimeservice#BadRequestException":
      response = {
        ...(await deserializeAws_restJson1BadRequestExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ConflictException":
    case "com.amazonaws.lexruntimeservice#ConflictException":
      response = {
        ...(await deserializeAws_restJson1ConflictExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "DependencyFailedException":
    case "com.amazonaws.lexruntimeservice#DependencyFailedException":
      response = {
        ...(await deserializeAws_restJson1DependencyFailedExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "InternalFailureException":
    case "com.amazonaws.lexruntimeservice#InternalFailureException":
      response = {
        ...(await deserializeAws_restJson1InternalFailureExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.lexruntimeservice#LimitExceededException":
      response = {
        ...(await deserializeAws_restJson1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LoopDetectedException":
    case "com.amazonaws.lexruntimeservice#LoopDetectedException":
      response = {
        ...(await deserializeAws_restJson1LoopDetectedExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "NotAcceptableException":
    case "com.amazonaws.lexruntimeservice#NotAcceptableException":
      response = {
        ...(await deserializeAws_restJson1NotAcceptableExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "NotFoundException":
    case "com.amazonaws.lexruntimeservice#NotFoundException":
      response = {
        ...(await deserializeAws_restJson1NotFoundExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "RequestTimeoutException":
    case "com.amazonaws.lexruntimeservice#RequestTimeoutException":
      response = {
        ...(await deserializeAws_restJson1RequestTimeoutExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "UnsupportedMediaTypeException":
    case "com.amazonaws.lexruntimeservice#UnsupportedMediaTypeException":
      response = {
        ...(await deserializeAws_restJson1UnsupportedMediaTypeExceptionResponse(parsedOutput, context)),
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

export const deserializeAws_restJson1PostTextCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<PostTextCommandOutput> => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return deserializeAws_restJson1PostTextCommandError(output, context);
  }
  const contents: PostTextCommandOutput = {
    $metadata: deserializeMetadata(output),
    activeContexts: undefined,
    alternativeIntents: undefined,
    botVersion: undefined,
    dialogState: undefined,
    intentName: undefined,
    message: undefined,
    messageFormat: undefined,
    nluIntentConfidence: undefined,
    responseCard: undefined,
    sentimentResponse: undefined,
    sessionAttributes: undefined,
    sessionId: undefined,
    slotToElicit: undefined,
    slots: undefined,
  };
  const data: any = await parseBody(output.body, context);
  if (data.activeContexts !== undefined && data.activeContexts !== null) {
    contents.activeContexts = deserializeAws_restJson1ActiveContextsList(data.activeContexts, context);
  }
  if (data.alternativeIntents !== undefined && data.alternativeIntents !== null) {
    contents.alternativeIntents = deserializeAws_restJson1IntentList(data.alternativeIntents, context);
  }
  if (data.botVersion !== undefined && data.botVersion !== null) {
    contents.botVersion = data.botVersion;
  }
  if (data.dialogState !== undefined && data.dialogState !== null) {
    contents.dialogState = data.dialogState;
  }
  if (data.intentName !== undefined && data.intentName !== null) {
    contents.intentName = data.intentName;
  }
  if (data.message !== undefined && data.message !== null) {
    contents.message = data.message;
  }
  if (data.messageFormat !== undefined && data.messageFormat !== null) {
    contents.messageFormat = data.messageFormat;
  }
  if (data.nluIntentConfidence !== undefined && data.nluIntentConfidence !== null) {
    contents.nluIntentConfidence = deserializeAws_restJson1IntentConfidence(data.nluIntentConfidence, context);
  }
  if (data.responseCard !== undefined && data.responseCard !== null) {
    contents.responseCard = deserializeAws_restJson1ResponseCard(data.responseCard, context);
  }
  if (data.sentimentResponse !== undefined && data.sentimentResponse !== null) {
    contents.sentimentResponse = deserializeAws_restJson1SentimentResponse(data.sentimentResponse, context);
  }
  if (data.sessionAttributes !== undefined && data.sessionAttributes !== null) {
    contents.sessionAttributes = deserializeAws_restJson1StringMap(data.sessionAttributes, context);
  }
  if (data.sessionId !== undefined && data.sessionId !== null) {
    contents.sessionId = data.sessionId;
  }
  if (data.slotToElicit !== undefined && data.slotToElicit !== null) {
    contents.slotToElicit = data.slotToElicit;
  }
  if (data.slots !== undefined && data.slots !== null) {
    contents.slots = deserializeAws_restJson1StringMap(data.slots, context);
  }
  return Promise.resolve(contents);
};

const deserializeAws_restJson1PostTextCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<PostTextCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "BadGatewayException":
    case "com.amazonaws.lexruntimeservice#BadGatewayException":
      response = {
        ...(await deserializeAws_restJson1BadGatewayExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "BadRequestException":
    case "com.amazonaws.lexruntimeservice#BadRequestException":
      response = {
        ...(await deserializeAws_restJson1BadRequestExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ConflictException":
    case "com.amazonaws.lexruntimeservice#ConflictException":
      response = {
        ...(await deserializeAws_restJson1ConflictExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "DependencyFailedException":
    case "com.amazonaws.lexruntimeservice#DependencyFailedException":
      response = {
        ...(await deserializeAws_restJson1DependencyFailedExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "InternalFailureException":
    case "com.amazonaws.lexruntimeservice#InternalFailureException":
      response = {
        ...(await deserializeAws_restJson1InternalFailureExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.lexruntimeservice#LimitExceededException":
      response = {
        ...(await deserializeAws_restJson1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LoopDetectedException":
    case "com.amazonaws.lexruntimeservice#LoopDetectedException":
      response = {
        ...(await deserializeAws_restJson1LoopDetectedExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "NotFoundException":
    case "com.amazonaws.lexruntimeservice#NotFoundException":
      response = {
        ...(await deserializeAws_restJson1NotFoundExceptionResponse(parsedOutput, context)),
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

export const deserializeAws_restJson1PutSessionCommand = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<PutSessionCommandOutput> => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return deserializeAws_restJson1PutSessionCommandError(output, context);
  }
  const contents: PutSessionCommandOutput = {
    $metadata: deserializeMetadata(output),
    activeContexts: undefined,
    audioStream: undefined,
    contentType: undefined,
    dialogState: undefined,
    intentName: undefined,
    message: undefined,
    messageFormat: undefined,
    sessionAttributes: undefined,
    sessionId: undefined,
    slotToElicit: undefined,
    slots: undefined,
  };
  if (output.headers["content-type"] !== undefined) {
    contents.contentType = output.headers["content-type"];
  }
  if (output.headers["x-amz-lex-intent-name"] !== undefined) {
    contents.intentName = output.headers["x-amz-lex-intent-name"];
  }
  if (output.headers["x-amz-lex-slots"] !== undefined) {
    contents.slots = new __LazyJsonString(Buffer.from(output.headers["x-amz-lex-slots"], "base64").toString("ascii"));
  }
  if (output.headers["x-amz-lex-session-attributes"] !== undefined) {
    contents.sessionAttributes = new __LazyJsonString(
      Buffer.from(output.headers["x-amz-lex-session-attributes"], "base64").toString("ascii")
    );
  }
  if (output.headers["x-amz-lex-message"] !== undefined) {
    contents.message = output.headers["x-amz-lex-message"];
  }
  if (output.headers["x-amz-lex-message-format"] !== undefined) {
    contents.messageFormat = output.headers["x-amz-lex-message-format"];
  }
  if (output.headers["x-amz-lex-dialog-state"] !== undefined) {
    contents.dialogState = output.headers["x-amz-lex-dialog-state"];
  }
  if (output.headers["x-amz-lex-slot-to-elicit"] !== undefined) {
    contents.slotToElicit = output.headers["x-amz-lex-slot-to-elicit"];
  }
  if (output.headers["x-amz-lex-session-id"] !== undefined) {
    contents.sessionId = output.headers["x-amz-lex-session-id"];
  }
  if (output.headers["x-amz-lex-active-contexts"] !== undefined) {
    contents.activeContexts = new __LazyJsonString(
      Buffer.from(output.headers["x-amz-lex-active-contexts"], "base64").toString("ascii")
    );
  }
  const data: any = output.body;
  contents.audioStream = data;
  return Promise.resolve(contents);
};

const deserializeAws_restJson1PutSessionCommandError = async (
  output: __HttpResponse,
  context: __SerdeContext
): Promise<PutSessionCommandOutput> => {
  const parsedOutput: any = {
    ...output,
    body: await parseBody(output.body, context),
  };
  let response: __SmithyException & __MetadataBearer & { [key: string]: any };
  let errorCode: string = "UnknownError";
  errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "BadGatewayException":
    case "com.amazonaws.lexruntimeservice#BadGatewayException":
      response = {
        ...(await deserializeAws_restJson1BadGatewayExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "BadRequestException":
    case "com.amazonaws.lexruntimeservice#BadRequestException":
      response = {
        ...(await deserializeAws_restJson1BadRequestExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "ConflictException":
    case "com.amazonaws.lexruntimeservice#ConflictException":
      response = {
        ...(await deserializeAws_restJson1ConflictExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "DependencyFailedException":
    case "com.amazonaws.lexruntimeservice#DependencyFailedException":
      response = {
        ...(await deserializeAws_restJson1DependencyFailedExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "InternalFailureException":
    case "com.amazonaws.lexruntimeservice#InternalFailureException":
      response = {
        ...(await deserializeAws_restJson1InternalFailureExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "LimitExceededException":
    case "com.amazonaws.lexruntimeservice#LimitExceededException":
      response = {
        ...(await deserializeAws_restJson1LimitExceededExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "NotAcceptableException":
    case "com.amazonaws.lexruntimeservice#NotAcceptableException":
      response = {
        ...(await deserializeAws_restJson1NotAcceptableExceptionResponse(parsedOutput, context)),
        name: errorCode,
        $metadata: deserializeMetadata(output),
      };
      break;
    case "NotFoundException":
    case "com.amazonaws.lexruntimeservice#NotFoundException":
      response = {
        ...(await deserializeAws_restJson1NotFoundExceptionResponse(parsedOutput, context)),
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

const deserializeAws_restJson1BadGatewayExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<BadGatewayException> => {
  const contents: BadGatewayException = {
    name: "BadGatewayException",
    $fault: "server",
    $metadata: deserializeMetadata(parsedOutput),
    Message: undefined,
  };
  const data: any = parsedOutput.body;
  if (data.Message !== undefined && data.Message !== null) {
    contents.Message = data.Message;
  }
  return contents;
};

const deserializeAws_restJson1BadRequestExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<BadRequestException> => {
  const contents: BadRequestException = {
    name: "BadRequestException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    message: undefined,
  };
  const data: any = parsedOutput.body;
  if (data.message !== undefined && data.message !== null) {
    contents.message = data.message;
  }
  return contents;
};

const deserializeAws_restJson1ConflictExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<ConflictException> => {
  const contents: ConflictException = {
    name: "ConflictException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    message: undefined,
  };
  const data: any = parsedOutput.body;
  if (data.message !== undefined && data.message !== null) {
    contents.message = data.message;
  }
  return contents;
};

const deserializeAws_restJson1DependencyFailedExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<DependencyFailedException> => {
  const contents: DependencyFailedException = {
    name: "DependencyFailedException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    Message: undefined,
  };
  const data: any = parsedOutput.body;
  if (data.Message !== undefined && data.Message !== null) {
    contents.Message = data.Message;
  }
  return contents;
};

const deserializeAws_restJson1InternalFailureExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<InternalFailureException> => {
  const contents: InternalFailureException = {
    name: "InternalFailureException",
    $fault: "server",
    $metadata: deserializeMetadata(parsedOutput),
    message: undefined,
  };
  const data: any = parsedOutput.body;
  if (data.message !== undefined && data.message !== null) {
    contents.message = data.message;
  }
  return contents;
};

const deserializeAws_restJson1LimitExceededExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<LimitExceededException> => {
  const contents: LimitExceededException = {
    name: "LimitExceededException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    message: undefined,
    retryAfterSeconds: undefined,
  };
  if (parsedOutput.headers["retry-after"] !== undefined) {
    contents.retryAfterSeconds = parsedOutput.headers["retry-after"];
  }
  const data: any = parsedOutput.body;
  if (data.message !== undefined && data.message !== null) {
    contents.message = data.message;
  }
  return contents;
};

const deserializeAws_restJson1LoopDetectedExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<LoopDetectedException> => {
  const contents: LoopDetectedException = {
    name: "LoopDetectedException",
    $fault: "server",
    $metadata: deserializeMetadata(parsedOutput),
    Message: undefined,
  };
  const data: any = parsedOutput.body;
  if (data.Message !== undefined && data.Message !== null) {
    contents.Message = data.Message;
  }
  return contents;
};

const deserializeAws_restJson1NotAcceptableExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<NotAcceptableException> => {
  const contents: NotAcceptableException = {
    name: "NotAcceptableException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    message: undefined,
  };
  const data: any = parsedOutput.body;
  if (data.message !== undefined && data.message !== null) {
    contents.message = data.message;
  }
  return contents;
};

const deserializeAws_restJson1NotFoundExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<NotFoundException> => {
  const contents: NotFoundException = {
    name: "NotFoundException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    message: undefined,
  };
  const data: any = parsedOutput.body;
  if (data.message !== undefined && data.message !== null) {
    contents.message = data.message;
  }
  return contents;
};

const deserializeAws_restJson1RequestTimeoutExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<RequestTimeoutException> => {
  const contents: RequestTimeoutException = {
    name: "RequestTimeoutException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    message: undefined,
  };
  const data: any = parsedOutput.body;
  if (data.message !== undefined && data.message !== null) {
    contents.message = data.message;
  }
  return contents;
};

const deserializeAws_restJson1UnsupportedMediaTypeExceptionResponse = async (
  parsedOutput: any,
  context: __SerdeContext
): Promise<UnsupportedMediaTypeException> => {
  const contents: UnsupportedMediaTypeException = {
    name: "UnsupportedMediaTypeException",
    $fault: "client",
    $metadata: deserializeMetadata(parsedOutput),
    message: undefined,
  };
  const data: any = parsedOutput.body;
  if (data.message !== undefined && data.message !== null) {
    contents.message = data.message;
  }
  return contents;
};

const serializeAws_restJson1ActiveContext = (input: ActiveContext, context: __SerdeContext): any => {
  return {
    ...(input.name !== undefined && input.name !== null && { name: input.name }),
    ...(input.parameters !== undefined &&
      input.parameters !== null && {
        parameters: serializeAws_restJson1ActiveContextParametersMap(input.parameters, context),
      }),
    ...(input.timeToLive !== undefined &&
      input.timeToLive !== null && {
        timeToLive: serializeAws_restJson1ActiveContextTimeToLive(input.timeToLive, context),
      }),
  };
};

const serializeAws_restJson1ActiveContextParametersMap = (
  input: { [key: string]: string },
  context: __SerdeContext
): any => {
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

const serializeAws_restJson1ActiveContextsList = (input: ActiveContext[], context: __SerdeContext): any => {
  return input
    .filter((e: any) => e != null)
    .map((entry) => {
      if (entry === null) {
        return null as any;
      }
      return serializeAws_restJson1ActiveContext(entry, context);
    });
};

const serializeAws_restJson1ActiveContextTimeToLive = (
  input: ActiveContextTimeToLive,
  context: __SerdeContext
): any => {
  return {
    ...(input.timeToLiveInSeconds !== undefined &&
      input.timeToLiveInSeconds !== null && { timeToLiveInSeconds: input.timeToLiveInSeconds }),
    ...(input.turnsToLive !== undefined && input.turnsToLive !== null && { turnsToLive: input.turnsToLive }),
  };
};

const serializeAws_restJson1DialogAction = (input: DialogAction, context: __SerdeContext): any => {
  return {
    ...(input.fulfillmentState !== undefined &&
      input.fulfillmentState !== null && { fulfillmentState: input.fulfillmentState }),
    ...(input.intentName !== undefined && input.intentName !== null && { intentName: input.intentName }),
    ...(input.message !== undefined && input.message !== null && { message: input.message }),
    ...(input.messageFormat !== undefined && input.messageFormat !== null && { messageFormat: input.messageFormat }),
    ...(input.slotToElicit !== undefined && input.slotToElicit !== null && { slotToElicit: input.slotToElicit }),
    ...(input.slots !== undefined &&
      input.slots !== null && { slots: serializeAws_restJson1StringMap(input.slots, context) }),
    ...(input.type !== undefined && input.type !== null && { type: input.type }),
  };
};

const serializeAws_restJson1IntentSummary = (input: IntentSummary, context: __SerdeContext): any => {
  return {
    ...(input.checkpointLabel !== undefined &&
      input.checkpointLabel !== null && { checkpointLabel: input.checkpointLabel }),
    ...(input.confirmationStatus !== undefined &&
      input.confirmationStatus !== null && { confirmationStatus: input.confirmationStatus }),
    ...(input.dialogActionType !== undefined &&
      input.dialogActionType !== null && { dialogActionType: input.dialogActionType }),
    ...(input.fulfillmentState !== undefined &&
      input.fulfillmentState !== null && { fulfillmentState: input.fulfillmentState }),
    ...(input.intentName !== undefined && input.intentName !== null && { intentName: input.intentName }),
    ...(input.slotToElicit !== undefined && input.slotToElicit !== null && { slotToElicit: input.slotToElicit }),
    ...(input.slots !== undefined &&
      input.slots !== null && { slots: serializeAws_restJson1StringMap(input.slots, context) }),
  };
};

const serializeAws_restJson1IntentSummaryList = (input: IntentSummary[], context: __SerdeContext): any => {
  return input
    .filter((e: any) => e != null)
    .map((entry) => {
      if (entry === null) {
        return null as any;
      }
      return serializeAws_restJson1IntentSummary(entry, context);
    });
};

const serializeAws_restJson1StringMap = (input: { [key: string]: string }, context: __SerdeContext): any => {
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

const deserializeAws_restJson1ActiveContext = (output: any, context: __SerdeContext): ActiveContext => {
  return {
    name: output.name !== undefined && output.name !== null ? output.name : undefined,
    parameters:
      output.parameters !== undefined && output.parameters !== null
        ? deserializeAws_restJson1ActiveContextParametersMap(output.parameters, context)
        : undefined,
    timeToLive:
      output.timeToLive !== undefined && output.timeToLive !== null
        ? deserializeAws_restJson1ActiveContextTimeToLive(output.timeToLive, context)
        : undefined,
  } as any;
};

const deserializeAws_restJson1ActiveContextParametersMap = (
  output: any,
  context: __SerdeContext
): { [key: string]: string } => {
  return Object.entries(output).reduce((acc: { [key: string]: string }, [key, value]: [string, any]) => {
    if (value === null) {
      return acc;
    }
    return {
      ...acc,
      [key]: value,
    };
  }, {});
};

const deserializeAws_restJson1ActiveContextsList = (output: any, context: __SerdeContext): ActiveContext[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_restJson1ActiveContext(entry, context);
    });
};

const deserializeAws_restJson1ActiveContextTimeToLive = (
  output: any,
  context: __SerdeContext
): ActiveContextTimeToLive => {
  return {
    timeToLiveInSeconds:
      output.timeToLiveInSeconds !== undefined && output.timeToLiveInSeconds !== null
        ? output.timeToLiveInSeconds
        : undefined,
    turnsToLive: output.turnsToLive !== undefined && output.turnsToLive !== null ? output.turnsToLive : undefined,
  } as any;
};

const deserializeAws_restJson1Button = (output: any, context: __SerdeContext): Button => {
  return {
    text: output.text !== undefined && output.text !== null ? output.text : undefined,
    value: output.value !== undefined && output.value !== null ? output.value : undefined,
  } as any;
};

const deserializeAws_restJson1DialogAction = (output: any, context: __SerdeContext): DialogAction => {
  return {
    fulfillmentState:
      output.fulfillmentState !== undefined && output.fulfillmentState !== null ? output.fulfillmentState : undefined,
    intentName: output.intentName !== undefined && output.intentName !== null ? output.intentName : undefined,
    message: output.message !== undefined && output.message !== null ? output.message : undefined,
    messageFormat:
      output.messageFormat !== undefined && output.messageFormat !== null ? output.messageFormat : undefined,
    slotToElicit: output.slotToElicit !== undefined && output.slotToElicit !== null ? output.slotToElicit : undefined,
    slots:
      output.slots !== undefined && output.slots !== null
        ? deserializeAws_restJson1StringMap(output.slots, context)
        : undefined,
    type: output.type !== undefined && output.type !== null ? output.type : undefined,
  } as any;
};

const deserializeAws_restJson1GenericAttachment = (output: any, context: __SerdeContext): GenericAttachment => {
  return {
    attachmentLinkUrl:
      output.attachmentLinkUrl !== undefined && output.attachmentLinkUrl !== null
        ? output.attachmentLinkUrl
        : undefined,
    buttons:
      output.buttons !== undefined && output.buttons !== null
        ? deserializeAws_restJson1listOfButtons(output.buttons, context)
        : undefined,
    imageUrl: output.imageUrl !== undefined && output.imageUrl !== null ? output.imageUrl : undefined,
    subTitle: output.subTitle !== undefined && output.subTitle !== null ? output.subTitle : undefined,
    title: output.title !== undefined && output.title !== null ? output.title : undefined,
  } as any;
};

const deserializeAws_restJson1genericAttachmentList = (output: any, context: __SerdeContext): GenericAttachment[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_restJson1GenericAttachment(entry, context);
    });
};

const deserializeAws_restJson1IntentConfidence = (output: any, context: __SerdeContext): IntentConfidence => {
  return {
    score: output.score !== undefined && output.score !== null ? output.score : undefined,
  } as any;
};

const deserializeAws_restJson1IntentList = (output: any, context: __SerdeContext): PredictedIntent[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_restJson1PredictedIntent(entry, context);
    });
};

const deserializeAws_restJson1IntentSummary = (output: any, context: __SerdeContext): IntentSummary => {
  return {
    checkpointLabel:
      output.checkpointLabel !== undefined && output.checkpointLabel !== null ? output.checkpointLabel : undefined,
    confirmationStatus:
      output.confirmationStatus !== undefined && output.confirmationStatus !== null
        ? output.confirmationStatus
        : undefined,
    dialogActionType:
      output.dialogActionType !== undefined && output.dialogActionType !== null ? output.dialogActionType : undefined,
    fulfillmentState:
      output.fulfillmentState !== undefined && output.fulfillmentState !== null ? output.fulfillmentState : undefined,
    intentName: output.intentName !== undefined && output.intentName !== null ? output.intentName : undefined,
    slotToElicit: output.slotToElicit !== undefined && output.slotToElicit !== null ? output.slotToElicit : undefined,
    slots:
      output.slots !== undefined && output.slots !== null
        ? deserializeAws_restJson1StringMap(output.slots, context)
        : undefined,
  } as any;
};

const deserializeAws_restJson1IntentSummaryList = (output: any, context: __SerdeContext): IntentSummary[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_restJson1IntentSummary(entry, context);
    });
};

const deserializeAws_restJson1listOfButtons = (output: any, context: __SerdeContext): Button[] => {
  return (output || [])
    .filter((e: any) => e != null)
    .map((entry: any) => {
      if (entry === null) {
        return null as any;
      }
      return deserializeAws_restJson1Button(entry, context);
    });
};

const deserializeAws_restJson1PredictedIntent = (output: any, context: __SerdeContext): PredictedIntent => {
  return {
    intentName: output.intentName !== undefined && output.intentName !== null ? output.intentName : undefined,
    nluIntentConfidence:
      output.nluIntentConfidence !== undefined && output.nluIntentConfidence !== null
        ? deserializeAws_restJson1IntentConfidence(output.nluIntentConfidence, context)
        : undefined,
    slots:
      output.slots !== undefined && output.slots !== null
        ? deserializeAws_restJson1StringMap(output.slots, context)
        : undefined,
  } as any;
};

const deserializeAws_restJson1ResponseCard = (output: any, context: __SerdeContext): ResponseCard => {
  return {
    contentType: output.contentType !== undefined && output.contentType !== null ? output.contentType : undefined,
    genericAttachments:
      output.genericAttachments !== undefined && output.genericAttachments !== null
        ? deserializeAws_restJson1genericAttachmentList(output.genericAttachments, context)
        : undefined,
    version: output.version !== undefined && output.version !== null ? output.version : undefined,
  } as any;
};

const deserializeAws_restJson1SentimentResponse = (output: any, context: __SerdeContext): SentimentResponse => {
  return {
    sentimentLabel:
      output.sentimentLabel !== undefined && output.sentimentLabel !== null ? output.sentimentLabel : undefined,
    sentimentScore:
      output.sentimentScore !== undefined && output.sentimentScore !== null ? output.sentimentScore : undefined,
  } as any;
};

const deserializeAws_restJson1StringMap = (output: any, context: __SerdeContext): { [key: string]: string } => {
  return Object.entries(output).reduce((acc: { [key: string]: string }, [key, value]: [string, any]) => {
    if (value === null) {
      return acc;
    }
    return {
      ...acc,
      [key]: value,
    };
  }, {});
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

const isSerializableHeaderValue = (value: any): boolean =>
  value !== undefined &&
  value !== null &&
  value !== "" &&
  (!Object.getOwnPropertyNames(value).includes("length") || value.length != 0) &&
  (!Object.getOwnPropertyNames(value).includes("size") || value.size != 0);

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

import { HttpResponse } from "@aws-sdk/protocol-http";
import { DeserializeMiddleware, Encoder, Pluggable, RelativeMiddlewareOptions, StreamCollector } from "@aws-sdk/types";

type PreviouslyResolved = {
  streamCollector: StreamCollector;
  utf8Encoder: Encoder;
};

/**
 * In case of an internal error/terminated connection, S3 operations may return 200 errors. CopyObject, UploadPartCopy,
 * CompleteMultipartUpload may return empty payload or payload with only xml Preamble.
 * @internal
 */
export const throw200ExceptionsMiddleware = (config: PreviouslyResolved): DeserializeMiddleware<any, any> => (
  next
) => async (args) => {
  const result = await next(args);
  const { response } = result;
  if (!HttpResponse.isInstance(response)) return result;
  const { statusCode, body } = response;
  if (statusCode < 200 && statusCode >= 300) return result;

  // Throw 2XX response that's either an error or has empty body.
  const bodyBytes = await collectBody(body, config);
  const bodyString = await collectBodyString(bodyBytes, config);
  if (bodyBytes.length === 0) {
    const err = new Error("S3 aborted request");
    err.name = "InternalError";
    throw err;
  }
  if (bodyString && bodyString.match("<Error>")) {
    // Set the error code to 4XX so that error deserializer can parse them
    response.statusCode = 400;
  }

  // Body stream is consumed and paused at this point. So replace the response.body to the collected bytes.
  // So that the deserializer can consume the body as normal.
  response.body = bodyBytes;
  return result;
};

// Collect low-level response body stream to Uint8Array.
const collectBody = (streamBody: any = new Uint8Array(), context: PreviouslyResolved): Promise<Uint8Array> => {
  if (streamBody instanceof Uint8Array) {
    return Promise.resolve(streamBody);
  }
  return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};

// Encode Uint8Array data into string with utf-8.
const collectBodyString = (streamBody: any, context: PreviouslyResolved): Promise<string> =>
  collectBody(streamBody, context).then((body) => context.utf8Encoder(body));

/**
 * @internal
 */
export const throw200ExceptionsMiddlewareOptions: RelativeMiddlewareOptions = {
  relation: "after",
  toMiddleware: "deserializerMiddleware",
  tags: ["THROW_200_EXCEPTIONS", "S3"],
  name: "throw200ExceptionsMiddleware",
  override: true,
};

/**
 *
 * @internal
 */
export const getThrow200ExceptionsPlugin = (config: PreviouslyResolved): Pluggable<any, any> => ({
  applyToStack: (clientStack) => {
    clientStack.addRelativeTo(throw200ExceptionsMiddleware(config), throw200ExceptionsMiddlewareOptions);
  },
});

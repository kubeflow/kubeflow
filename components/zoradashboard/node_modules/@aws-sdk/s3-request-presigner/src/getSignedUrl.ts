import { HttpRequest } from "@aws-sdk/protocol-http";
import { Client, Command } from "@aws-sdk/smithy-client";
import { BuildMiddleware, MetadataBearer, RequestPresigningArguments } from "@aws-sdk/types";
import { formatUrl } from "@aws-sdk/util-format-url";

import { S3RequestPresigner } from "./presigner";

export const getSignedUrl = async <
  InputTypesUnion extends object,
  InputType extends InputTypesUnion,
  OutputType extends MetadataBearer = MetadataBearer
>(
  client: Client<any, InputTypesUnion, MetadataBearer, any>,
  command: Command<InputType, OutputType, any, InputTypesUnion, MetadataBearer>,
  options: RequestPresigningArguments = {}
): Promise<string> => {
  const s3Presigner = new S3RequestPresigner({ ...client.config });
  const presignInterceptMiddleware: BuildMiddleware<InputTypesUnion, MetadataBearer> = (next, context) => async (
    args
  ) => {
    const { request } = args;
    if (!HttpRequest.isInstance(request)) {
      throw new Error("Request to be presigned is not an valid HTTP request.");
    }
    // Retry information headers are not meaningful in presigned URLs
    delete request.headers["amz-sdk-invocation-id"];
    delete request.headers["amz-sdk-request"];

    const presigned = await s3Presigner.presign(request, {
      ...options,
      signingRegion: options.signingRegion ?? context["signing_region"],
      signingService: options.signingService ?? context["signing_service"],
    });
    return {
      // Intercept the middleware stack by returning fake response
      response: {},
      output: {
        $metadata: { httpStatusCode: 200 },
        presigned,
      },
    } as any;
  };
  const middlewareName = "presignInterceptMiddleware";
  client.middlewareStack.addRelativeTo(presignInterceptMiddleware, {
    name: middlewareName,
    relation: "before",
    toMiddleware: "awsAuthMiddleware",
    override: true,
  });

  let presigned: HttpRequest;
  try {
    const output = await client.send(command);
    //@ts-ignore the output is faked, so it's not actually OutputType
    presigned = output.presigned;
  } finally {
    client.middlewareStack.remove(middlewareName);
  }

  return formatUrl(presigned);
};

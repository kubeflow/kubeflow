import { HttpRequest } from "@aws-sdk/protocol-http";
import {
  BuildHandler,
  BuildHandlerArguments,
  BuildHandlerOptions,
  BuildHandlerOutput,
  BuildMiddleware,
  MetadataBearer,
  Pluggable,
  Provider,
} from "@aws-sdk/types";

type PreviouslyResolved = {
  region: Provider<string>;
  isCustomEndpoint: boolean;
};

/**
 * @internal
 */
export const useRegionalEndpointMiddleware = (config: PreviouslyResolved): BuildMiddleware<any, any> => <
  Output extends MetadataBearer
>(
  next: BuildHandler<any, Output>
): BuildHandler<any, Output> => async (args: BuildHandlerArguments<any>): Promise<BuildHandlerOutput<Output>> => {
  const { request } = args;
  if (!HttpRequest.isInstance(request) || config.isCustomEndpoint) return next({ ...args });
  if (request.hostname === "s3.amazonaws.com") {
    request.hostname = "s3.us-east-1.amazonaws.com";
  } else if ("aws-global" === (await config.region())) {
    request.hostname = "s3.amazonaws.com";
  }
  return next({ ...args });
};

/**
 * @internal
 */
export const useRegionalEndpointMiddlewareOptions: BuildHandlerOptions = {
  step: "build",
  tags: ["USE_REGIONAL_ENDPOINT", "S3"],
  name: "useRegionalEndpointMiddleware",
  override: true,
};

/**
 * @internal
 */
export const getUseRegionalEndpointPlugin = (config: PreviouslyResolved): Pluggable<any, any> => ({
  applyToStack: (clientStack) => {
    clientStack.add(useRegionalEndpointMiddleware(config), useRegionalEndpointMiddlewareOptions);
  },
});

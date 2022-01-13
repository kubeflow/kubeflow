import {
  InitializeHandler,
  InitializeHandlerArguments,
  InitializeHandlerOptions,
  InitializeHandlerOutput,
  InitializeMiddleware,
  MetadataBearer,
  Pluggable,
} from "@aws-sdk/types";

import { LocationConstraintResolvedConfig } from "./configuration";

/**
 * This middleware modifies the input on S3 CreateBucket requests.  If the LocationConstraint has not been set, this
 * middleware will set a LocationConstraint to match the configured region.  The CreateBucketConfiguration will be
 * removed entirely on requests to the us-east-1 region.
 */

export function locationConstraintMiddleware(
  options: LocationConstraintResolvedConfig
): InitializeMiddleware<any, any> {
  return <Output extends MetadataBearer>(
    next: InitializeHandler<any, Output>
  ): InitializeHandler<any, Output> => async (
    args: InitializeHandlerArguments<any>
  ): Promise<InitializeHandlerOutput<Output>> => {
    const { CreateBucketConfiguration } = args.input;
    //After region config resolution, region is a Provider<string>
    const region = await options.region();
    if (!CreateBucketConfiguration || !CreateBucketConfiguration.LocationConstraint) {
      args = {
        ...args,
        input: {
          ...args.input,
          CreateBucketConfiguration: region === "us-east-1" ? undefined : { LocationConstraint: region },
        },
      };
    }

    return next(args);
  };
}

export const locationConstraintMiddlewareOptions: InitializeHandlerOptions = {
  step: "initialize",
  tags: ["LOCATION_CONSTRAINT", "CREATE_BUCKET_CONFIGURATION"],
  name: "locationConstraintMiddleware",
  override: true,
};

export const getLocationConstraintPlugin = (config: LocationConstraintResolvedConfig): Pluggable<any, any> => ({
  applyToStack: (clientStack) => {
    clientStack.add(locationConstraintMiddleware(config), locationConstraintMiddlewareOptions);
  },
});

import {
  InitializeHandler,
  InitializeHandlerArguments,
  InitializeHandlerOptions,
  InitializeHandlerOutput,
  InitializeMiddleware,
  MetadataBearer,
  Pluggable,
} from "@aws-sdk/types";
import { validate as validateArn } from "@aws-sdk/util-arn-parser";

/**
 * @internal
 */
export function validateBucketNameMiddleware(): InitializeMiddleware<any, any> {
  return <Output extends MetadataBearer>(
    next: InitializeHandler<any, Output>
  ): InitializeHandler<any, Output> => async (
    args: InitializeHandlerArguments<any>
  ): Promise<InitializeHandlerOutput<Output>> => {
    const {
      input: { Bucket },
    } = args;
    if (typeof Bucket === "string" && !validateArn(Bucket) && Bucket.indexOf("/") >= 0) {
      const err = new Error(`Bucket name shouldn't contain '/', received '${Bucket}'`);
      err.name = "InvalidBucketName";
      throw err;
    }
    return next({ ...args });
  };
}

/**
 * @internal
 */
export const validateBucketNameMiddlewareOptions: InitializeHandlerOptions = {
  step: "initialize",
  tags: ["VALIDATE_BUCKET_NAME"],
  name: "validateBucketNameMiddleware",
  override: true,
};

/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getValidateBucketNamePlugin = (unused: any): Pluggable<any, any> => ({
  applyToStack: (clientStack) => {
    clientStack.add(validateBucketNameMiddleware(), validateBucketNameMiddlewareOptions);
  },
});

import { S3Client } from "../S3Client";
import { HeadObjectCommand, HeadObjectCommandInput } from "../commands/HeadObjectCommand";
import { WaiterConfiguration, WaiterResult, WaiterState, createWaiter } from "@aws-sdk/util-waiter";

const checkState = async (client: S3Client, input: HeadObjectCommandInput): Promise<WaiterResult> => {
  try {
    let result: any = await client.send(new HeadObjectCommand(input));
    return { state: WaiterState.SUCCESS };
  } catch (exception) {}
  return { state: WaiterState.RETRY };
};
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to HeadObjectCommand for polling.
 */
export const waitForObjectExists = async (
  params: WaiterConfiguration<S3Client>,
  input: HeadObjectCommandInput
): Promise<WaiterResult> => {
  const serviceDefaults = { minDelay: 5, maxDelay: 120 };
  return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
